import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate manifest with correct base path for production
const isProduction = process.env.NODE_ENV === 'production';
const basePath = isProduction ? '/Portfolio' : '';

const manifest = {
  "name": "Bereket Fikre - Creative Designer Portfolio",
  "short_name": "Bereket Fikre",
  "description": "Professional Creative Designer specializing in UI/UX design, brand identity, graphic design, and digital marketing",
  "start_url": basePath ? `${basePath}/` : "/",
  "display": "standalone",
  "background_color": "#101027",
  "theme_color": "#101027",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": `${basePath}/favicon-16x16.png`,
      "sizes": "16x16",
      "type": "image/png"
    },
    {
      "src": `${basePath}/favicon-32x32.png`,
      "sizes": "32x32",
      "type": "image/png"
    },
    {
      "src": `${basePath}/apple-touch-icon.png`,
      "sizes": "180x180",
      "type": "image/png"
    },
    {
      "src": `${basePath}/android-chrome-192x192.png`,
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": `${basePath}/android-chrome-512x512.png`,
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "categories": ["design", "portfolio", "business"],
  "lang": "en",
  "dir": "ltr"
};

// Write to public directory
const outputPath = path.join(__dirname, '../public/site.webmanifest');
fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));

console.log(`Generated manifest with base path: ${basePath || 'none'}`);
