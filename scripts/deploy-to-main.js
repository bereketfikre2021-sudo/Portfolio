/**
 * Deploy to main branch - pushes only changed files (incremental), not a full force push.
 * Uses a persistent deploy folder to maintain git history.
 * Set NETLIFY_BUILD_HOOK_URL to auto-trigger Netlify after push (see NETLIFY_AUTO_DEPLOY_FIX.md).
 */

const fs = require('fs');
const path = require('path');

// Load .env.deploy if it exists (for NETLIFY_BUILD_HOOK_URL)
const envDeployPath = path.join(__dirname, '..', '.env.deploy');
if (fs.existsSync(envDeployPath)) {
  fs.readFileSync(envDeployPath, 'utf8').split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) process.env[match[1].trim()] = match[2].trim();
  });
}
const { execSync } = require('child_process');

const projectRoot = path.join(__dirname, '..');
const buildDir = path.join(projectRoot, 'build');
const deployDir = path.join(projectRoot, 'deploy-to-main');
const remoteUrl = 'https://github.com/bereketfikre2021-sudo/Portfolio.git';

// Ensure build exists
if (!fs.existsSync(buildDir)) {
  console.error('Error: build folder not found. Run "npm run build" first.');
  process.exit(1);
}

// Create deploy folder and init git if needed
if (!fs.existsSync(deployDir)) {
  console.log('Creating deploy folder and initializing git...');
  fs.mkdirSync(deployDir, { recursive: true });
  execSync('git init', { cwd: deployDir });
  try {
    execSync(`git remote add origin ${remoteUrl}`, { cwd: deployDir });
  } catch (e) {
    if (!e.message.includes('already exists')) throw e;
  }
}

// Copy build contents to deploy (preserve .git)
const copyDir = (src, dest) => {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
};

// Remove files in deploy that no longer exist in build
const removeDeleted = (src, dest) => {
  if (!fs.existsSync(dest)) return;
  const entries = fs.readdirSync(dest, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === '.git') continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (!fs.existsSync(srcPath)) {
      fs.rmSync(destPath, { recursive: true });
    } else if (entry.isDirectory()) {
      removeDeleted(srcPath, destPath);
    }
  }
};

console.log('Syncing build to deploy folder...');
removeDeleted(buildDir, deployDir);
copyDir(buildDir, deployDir);

// Git add, commit, push (only changes - no force on subsequent deploys)
const cwd = deployDir;
try {
  execSync('git add -A', { cwd });
  const status = execSync('git status --short', { cwd, encoding: 'utf8' });
  if (!status.trim()) {
    console.log('No changes to deploy.');
    process.exit(0);
  }
  execSync('git commit -m "Deploy updates"', { cwd });
  execSync('git branch -M main', { cwd });
  try {
    execSync('git push origin main', { cwd });
  } catch (pushErr) {
    // First deploy or divergent history - force push once
    if (pushErr.message && pushErr.message.includes('rejected')) {
      console.log('Initial sync - pushing...');
      execSync('git push -f origin main', { cwd });
    } else {
      throw pushErr;
    }
  }
  console.log('Deployed successfully. Only changed files were pushed.');

  // Trigger Netlify build hook if configured (fixes webhook not detecting push)
  const buildHookUrl = process.env.NETLIFY_BUILD_HOOK_URL;
  if (buildHookUrl) {
    console.log('Triggering Netlify deploy...');
    const url = new URL(buildHookUrl);
    const req = require('https').request({
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, (res) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        console.log('Netlify deploy triggered successfully.');
      } else {
        console.warn('Netlify build hook returned status:', res.statusCode);
      }
    });
    req.on('error', (e) => console.warn('Netlify build hook failed:', e.message));
    req.write('{}');
    req.end();
  } else {
    console.log('Tip: Set NETLIFY_BUILD_HOOK_URL to auto-trigger Netlify after push.');
  }
} catch (err) {
  if (err.message && (err.message.includes('nothing to commit') || err.message.includes('no changes added'))) {
    console.log('No changes to deploy.');
  } else {
    throw err;
  }
}
