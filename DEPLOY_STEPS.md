# Quick Deployment Steps

## Option 1: Use PowerShell Script (Easiest)

1. **Run the deployment script**:
   ```powershell
   .\deploy-to-github.ps1
   ```
   Follow the prompts to deploy your site.

## Option 2: Manual Git Commands

### Step 1: Initialize Git (if needed)
```powershell
cd "C:\Users\BK\Documents\Bereket Fikre Portfolio Website"
git init
```

### Step 2: Create a New Branch (to protect main)
```powershell
git checkout -b deploy-static-site
```

### Step 3: Add Remote Repository
```powershell
git remote add origin https://github.com/bereketfikre2021-sudo/Portfolio.git
```
(Or update if exists: `git remote set-url origin https://github.com/bereketfikre2021-sudo/Portfolio.git`)

### Step 4: Stage All Files
```powershell
git add .
```

### Step 5: Commit
```powershell
git commit -m "Deploy optimized portfolio website with SEO improvements"
```

### Step 6: Push to GitHub
```powershell
git push -u origin deploy-static-site
```

### Step 7: Enable GitHub Pages

1. Go to: https://github.com/bereketfikre2021-sudo/Portfolio/settings/pages
2. Under **Source**, select:
   - Branch: `deploy-static-site` (or your branch)
   - Folder: `/` (root)
3. Click **Save**
4. Your site will be live at: `https://bereketfikre2021-sudo.github.io/Portfolio/`

## Important Files Included

✅ `index.html` - Main HTML (SEO optimized)
✅ `styles.css` - Stylesheet
✅ `script.js` - JavaScript  
✅ `assets/` - All images
✅ `robots.txt` - SEO
✅ `sitemap.xml` - SEO
✅ `.htaccess` - Apache config
✅ `.gitignore` - Excludes node_modules

## Before Deploying

⚠️ **Important**: Update the domain URL in `index.html`:
- Replace `https://bereketfikre.com/` with your actual domain
- Or use `https://bereketfikre2021-sudo.github.io/Portfolio/` for GitHub Pages

Search for "bereketfikre.com" in index.html and replace with your actual URL.

## What Gets Deployed

All files EXCEPT:
- `node_modules/` (excluded by .gitignore)
- Hidden system files

## Testing

After deployment, test:
- ✅ Site loads correctly
- ✅ All images display
- ✅ Navigation works
- ✅ Contact form works
- ✅ Mobile responsive
- ✅ SEO meta tags (use browser dev tools)








