# Manual Netlify Deployment Guide

## Method 1: Drag and Drop (Easiest)

1. **Build your project** (if not already done):
   ```powershell
   npm run build
   ```

2. **Go to Netlify Dashboard**:
   - Visit: https://app.netlify.com
   - Sign in or create a free account

3. **Deploy manually**:
   - On the Netlify dashboard, look for the **"Sites"** section
   - Find the area that says **"Want to deploy a new site without connecting to Git? Drag and drop your site output folder here"**
   - **Drag and drop** your `build` folder directly onto the Netlify dashboard
   - Wait for the deployment to complete (usually takes 30-60 seconds)

4. **Your site is live!**
   - Netlify will give you a random URL like: `https://random-name-123.netlify.app`
   - You can customize this in **Site settings** → **Change site name**

## Method 2: Using Netlify CLI (Advanced)

1. **Install Netlify CLI**:
   ```powershell
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```powershell
   netlify login
   ```
   This will open your browser to authenticate.

3. **Initialize Netlify** (if first time):
   ```powershell
   cd "C:\Users\BK\Documents\Bereket Fikre Portfolio Website"
   netlify init
   ```
   - Choose "Create & configure a new site"
   - Follow the prompts

4. **Deploy**:
   ```powershell
   netlify deploy --prod --dir=build
   ```

## Method 3: Connect to GitHub (Recommended for Continuous Deployment)

1. **Push your code to GitHub** (if not already done):
   ```powershell
   git add .
   git commit -m "Prepare for Netlify deployment"
   git push origin master
   ```

2. **In Netlify Dashboard**:
   - Click **"Add new site"** → **"Import an existing project"**
   - Choose **"Deploy with GitHub"**
   - Authorize Netlify to access your GitHub account
   - Select your repository: `bereketfikre2021-sudo/Portfolio`

3. **Configure build settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
   - Click **"Deploy site"**

4. **Automatic deployments**:
   - Every time you push to your repository, Netlify will automatically rebuild and deploy

## Important Configuration Files

### netlify.toml (Optional but recommended)
Create this file in your project root:
```toml
[build]
  publish = "build"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### _redirects file (Required for React Router)
The `_redirects` file should be in your `public` folder and will be copied to `build`:
```
/*    /index.html   200
```

## After Deployment

1. **Custom Domain** (Optional):
   - Go to **Site settings** → **Domain management**
   - Click **"Add custom domain"**
   - Follow the DNS configuration instructions

2. **Environment Variables** (if needed):
   - Go to **Site settings** → **Environment variables**
   - Add any required environment variables

3. **Form Handling** (if you have forms):
   - Netlify automatically handles form submissions
   - Forms need `netlify` attribute or `data-netlify="true"`

## Troubleshooting

### Issue: 404 errors on page refresh
**Solution**: Ensure the `_redirects` file exists in your `public` folder with:
```
/*    /index.html   200
```

### Issue: Assets not loading
**Solution**: Check that all paths in your code use relative paths, not absolute paths starting with `/`

### Issue: Build fails
**Solution**: 
- Check build logs in Netlify dashboard
- Ensure `package.json` has correct build script
- Try building locally first: `npm run build`

## Quick Start Checklist

- [ ] Build folder exists and is up to date (`npm run build`)
- [ ] `_redirects` file is in `public` folder (for React Router support)
- [ ] All assets are in the `build` folder
- [ ] Test the build locally before deploying

---

**Your site will be live at**: `https://your-site-name.netlify.app`

