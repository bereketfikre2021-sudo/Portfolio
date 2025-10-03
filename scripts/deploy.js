import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting deployment process...');

try {
  // Check if we're on the main branch
  const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  if (currentBranch !== 'main') {
    console.error('❌ Error: Must be on main branch to deploy');
    console.log(`Current branch: ${currentBranch}`);
    process.exit(1);
  }

  // Check if dist folder exists
  const fs = await import('fs');
  const distPath = path.join(__dirname, '../dist');
  if (!fs.existsSync(distPath)) {
    console.error('❌ Error: dist folder not found. Please run "npm run build" first.');
    process.exit(1);
  }

  // Check git status
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
  if (gitStatus.trim()) {
    console.log('📝 Uncommitted changes detected:');
    console.log(gitStatus);
    console.log('Please commit your changes before deploying.');
    process.exit(1);
  }

  // Push to GitHub
  console.log('📤 Pushing to GitHub...');
  execSync('git push origin main', { stdio: 'inherit' });

  console.log('✅ Deployment initiated!');
  console.log('🌐 Your site will be available at: https://bereketfikre2021-sudo.github.io/Portfolio/');
  console.log('📊 Check the Actions tab in your GitHub repository for deployment status.');

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}
