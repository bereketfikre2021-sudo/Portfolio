/**
 * compress-images.js
 * Re-compresses all portfolio webp/png/jpg images in-place using sharp.
 * - Max 1400px wide for portfolio images
 * - WebP quality 78
 * - Skips images already under 100 KB
 * - Skips hero/profile images
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PORTFOLIO_DIR = path.join(__dirname, '../public/assets/Portfolio');
const ASSETS_DIR    = path.join(__dirname, '../public/assets');

const SKIP = new Set([
  'Bereket-Fikre-1.webp',
  'Bereket-Fikre-2.webp',
  'Bereket-Fikre.webp',
]);

const SETTINGS = {
  portfolio: { maxWidth: 1400, maxHeight: 1800, quality: 78 },
  root:      { maxWidth: 1200, maxHeight: 630,  quality: 82 },
};

function getAllImages(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllImages(full, results);
    } else if (/\.(webp|jpg|jpeg|png)$/i.test(entry.name) && !SKIP.has(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

async function compress(filePath, settings) {
  const before = fs.statSync(filePath).size;
  if (before < 100 * 1024) return null; // already small enough

  try {
    const img = sharp(filePath);
    const meta = await img.metadata();

    const needsResize = meta.width > settings.maxWidth || meta.height > settings.maxHeight;
    const pipeline = needsResize
      ? img.resize(settings.maxWidth, settings.maxHeight, { fit: 'inside', withoutEnlargement: true })
      : img;

    // Compress to buffer — avoids Windows EPERM on locked files
    const buffer = await pipeline.webp({ quality: settings.quality, effort: 4 }).toBuffer();
    const after = buffer.length;

    if (after < before) {
      const outPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      // Write to a side file first, then copy over — works around Windows file locks
      const sidePath = outPath + '.__compressed';
      fs.writeFileSync(sidePath, buffer);
      try {
        fs.copyFileSync(sidePath, outPath);
        fs.unlinkSync(sidePath);
      } catch {
        // If copy fails (file truly locked), leave side file for manual replacement
        return { before, after, saved: before - after, sideFile: sidePath };
      }
      return { before, after, saved: before - after };
    }
    return null;
  } catch (err) {
    console.error(`  ERROR: ${path.basename(filePath)}: ${err.message}`);
    return null;
  }
}

async function main() {
  const portfolioImages = getAllImages(PORTFOLIO_DIR);
  const rootImages = fs.readdirSync(ASSETS_DIR)
    .filter(f => /\.(webp|jpg|jpeg|png)$/i.test(f) && !SKIP.has(f))
    .map(f => path.join(ASSETS_DIR, f));

  const all = [
    ...portfolioImages.map(f => ({ path: f, settings: SETTINGS.portfolio })),
    ...rootImages.map(f => ({ path: f, settings: SETTINGS.root })),
  ];

  console.log(`\nCompressing ${all.length} images...\n`);
  let totalSaved = 0;
  let compressed = 0;

  for (const { path: f, settings } of all) {
    const result = await compress(f, settings);
    if (result) {
      const savedKB  = Math.round(result.saved / 1024);
      const beforeKB = Math.round(result.before / 1024);
      const afterKB  = Math.round(result.after / 1024);
      const tag = result.sideFile ? ' [SIDE]' : '';
      console.log(`  + ${path.basename(f).padEnd(58)} ${String(beforeKB).padStart(4)} KB -> ${String(afterKB).padStart(4)} KB  (-${savedKB} KB)${tag}`);
      totalSaved += result.saved;
      compressed++;
    }
  }

  const line = '-'.repeat(72);
  console.log(`\n${line}`);
  console.log(`Compressed : ${compressed} files`);
  console.log(`Total saved: ${Math.round(totalSaved / 1024)} KB  (${(totalSaved / 1024 / 1024).toFixed(1)} MB)`);
  console.log(`${line}\n`);
}

main();
