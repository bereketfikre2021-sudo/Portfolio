/**
 * Creates og-image.png for social media sharing (Open Graph, Twitter Cards).
 * Uses PNG format for maximum compatibility across Facebook, LinkedIn, Twitter, etc.
 * Dimensions: 1200x630 (recommended by Facebook for optimal display)
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = path.join(__dirname, '../public/assets/Bereket-Fikre-1.webp');
const outputPath = path.join(__dirname, '../public/assets/og-image.png');

async function createOgImage() {
  try {
    if (!fs.existsSync(inputPath)) {
      console.warn('create-og-image: Source image not found at', inputPath, '- skipping.');
      process.exit(0);
      return;
    }
    await sharp(inputPath)
      .resize(1200, 630, { fit: 'cover', position: 'center' })
      .png()
      .toFile(outputPath);
    console.log('create-og-image: Created og-image.png (1200x630) for social sharing');
  } catch (err) {
    console.error('create-og-image: Error creating og-image:', err.message);
    process.exit(1);
  }
}

createOgImage();
