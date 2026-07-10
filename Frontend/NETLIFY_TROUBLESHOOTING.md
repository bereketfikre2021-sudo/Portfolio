# Netlify Deployment Troubleshooting

## Common Issues and Solutions

### Issue 1: Build Command Fails
**Error**: `npm ci` fails or build command fails

**Solution**: 
- Netlify automatically runs `npm install` before the build command
- The build command in `netlify.toml` is now simplified to just `npm run build`
- If `npm ci` fails, Netlify will fall back to `npm install`

### Issue 2: Node Version Not Found
**Error**: Node version 18 not available

**Solution**:
- Check Netlify's available Node versions in Site Settings → Build & Deploy → Environment
- You can also specify Node version in Netlify dashboard instead of netlify.toml
- Try Node 16 or 20 if 18 is not available

### Issue 3: Build Timeout
**Error**: Build takes too long and times out

**Solution**:
- Netlify free tier has 15-minute build timeout
- Optimize build by removing unnecessary dependencies
- Check build logs for slow operations

### Issue 4: Missing Dependencies
**Error**: Module not found or dependency errors

**Solution**:
- Ensure `package-lock.json` is committed to Git
- Check that all dependencies are in `package.json`
- Try clearing Netlify build cache: Site Settings → Build & Deploy → Clear cache and retry deploy

### Issue 5: Asset Path Issues
**Error**: Images or assets not loading

**Solution**:
- All images use absolute paths starting with `/assets/...`
- Ensure images are in `public/assets/` folder
- Check that paths don't have double slashes

### Issue 6: MIME Type Errors (Refused to apply style / execute script)
**Error**: `Refused to apply style from '.../main.xxx.css' because its MIME type ('text/html') is not a supported stylesheet MIME type`

**Cause**: Cached `index.html` references old asset hashes that no longer exist. When the browser requests them, Netlify's SPA fallback serves `index.html` instead, causing wrong MIME type.

**Solution**:
1. **Service worker fix (v1.0.1)**: The service worker was caching `index.html` and serving it first, causing users to get stale HTML with old asset hashes. It now uses **network-first** for HTML so users always get fresh content after deploys.
2. **Clear Netlify build cache**: Site Settings → Build & Deploy → Clear cache and retry deploy
3. **Trigger a fresh deploy**: Deploys → Trigger deploy → Deploy site
4. **Unregister old service worker**: After deploying, users with the old SW need to either:
   - Hard refresh (Ctrl+Shift+R / Cmd+Shift+R) twice, or
   - DevTools → Application → Service Workers → Unregister, then refresh
5. The `netlify.toml` has `force = false` on the SPA redirect and no-cache headers on `index.html`

## Current Configuration

**Build Command**: `npm run build`
**Publish Directory**: `build`
**Node Version**: 18 (specified in netlify.toml)

## Manual Build Test

Test the build locally before deploying:

```bash
# Clean install
npm ci

# Build
npm run build

# Test build folder
cd build
# Serve locally to test
npx serve -s .
```

## Netlify Dashboard Settings

If deployment still fails, check these in Netlify Dashboard:

1. **Site Settings → Build & Deploy → Build settings**:
   - Build command: `npm run build`
   - Publish directory: `build`
   - Node version: 18 (or latest LTS)

2. **Site Settings → Build & Deploy → Environment variables**:
   - No environment variables needed for this project

3. **Site Settings → Build & Deploy → Build log**:
   - Check the actual error message
   - Look for specific module or command failures

## Alternative Build Command

If `npm run build` fails, try this in Netlify dashboard:
```
npm install && npm run build
```

## Check Build Logs

1. Go to Netlify Dashboard
2. Click on your site
3. Go to "Deploys" tab
4. Click on the failed deploy
5. Check the build log for specific errors

## Quick Fixes

1. **Clear Netlify cache**: Site Settings → Build & Deploy → Clear cache
2. **Redeploy**: Trigger a new deploy from the Deploys tab
3. **Check package-lock.json**: Ensure it's committed and up to date
4. **Verify Node version**: Try Node 16 or 20 if 18 fails

