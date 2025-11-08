# Deployment Guide for Netlify

## Image Loading on Netlify

All images are correctly configured to load on Netlify:

1. **Image Paths**: All images use absolute paths starting with `/assets/...`
2. **PUBLIC_URL**: `process.env.PUBLIC_URL` is empty in production, so paths resolve correctly
3. **Build Process**: Images in `public/assets/` are copied to `build/assets/` during build
4. **Netlify Serving**: Netlify serves from `build/` folder, so `/assets/...` paths work correctly

## NPM Dependencies

1. **package-lock.json**: Now tracked in Git for consistent dependency versions
2. **.npmrc**: Created for consistent npm installs
3. **netlify.toml**: Uses `npm ci` for clean installs from package-lock.json

## Build Configuration

- **Build Command**: `npm ci && npm run build`
- **Publish Directory**: `build`
- **Node Version**: 18 (specified in netlify.toml)

## Image Path Examples

All images use this pattern:
```javascript
src={`${process.env.PUBLIC_URL || ''}${imagePath}`}
```

Where `imagePath` is an absolute path like `/assets/Portfolio/image.webp`

This results in `/assets/Portfolio/image.webp` in production, which works correctly on Netlify.

## Caching Headers

Netlify is configured with cache headers for:
- `/assets/*` - 1 year cache
- `/*.js` - 1 year cache
- `/*.css` - 1 year cache
- `/*.webp` - 1 year cache
- `/*.svg` - 1 year cache

## Deployment Steps

1. Push code to Git repository
2. Connect repository to Netlify
3. Netlify will automatically:
   - Run `npm ci` to install dependencies
   - Run `npm run build` to build the project
   - Deploy from `build/` folder
4. All images will load correctly from `/assets/...` paths
