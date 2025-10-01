import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate HTML with correct base path for production
const isProduction = process.env.NODE_ENV === 'production';
const basePath = isProduction ? '/Portfolio' : '';

// Read the current index.html
const htmlPath = path.join(__dirname, '../index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Replace favicon paths - only if not already using base path
if (basePath) {
  htmlContent = htmlContent.replace(
    /href="\/(?!Portfolio\/)/g, 
    `href="${basePath}/`
  );
  
  htmlContent = htmlContent.replace(
    /content="\/(?!Portfolio\/)/g, 
    `content="${basePath}/`
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
