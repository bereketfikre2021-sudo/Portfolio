import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate HTML with correct base path for production
const isProduction = process.env.NODE_ENV === 'production';
const basePath = ''; // Deploy to root, no subdirectory needed

// Read the current index.html
const htmlPath = path.join(__dirname, '../index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Replace paths - but exclude favicon and static assets that should be in root
if (basePath) {
  // Replace paths for images, CSS, JS, but NOT favicon files
  htmlContent = htmlContent.replace(
    /href="\/(?!Portfolio\/)(?!favicon|apple-touch-icon|android-chrome|site\.webmanifest)/g, 
    `href="${basePath}/`
  );
  
  htmlContent = htmlContent.replace(
    /content="\/(?!Portfolio\/)(?!favicon|apple-touch-icon|android-chrome|site\.webmanifest)/g, 
    `content="${basePath}/`
  );
  
  // Also replace src attributes for images
  htmlContent = htmlContent.replace(
    /src="\/(?!Portfolio\/)(?!favicon|apple-touch-icon|android-chrome|site\.webmanifest)/g, 
    `src="${basePath}/`
  );
}

// Write back to index.html with error handling
try {
  fs.writeFileSync(htmlPath, htmlContent);
} catch (error) {
  console.warn(`Warning: Could not update ${htmlPath}: ${error.message}`);
  console.warn('Continuing with build...');
}

console.log(`Updated HTML with base path: ${basePath || 'none'}`);
