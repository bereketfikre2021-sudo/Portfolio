# Social Sharing & Open Graph Setup Guide

## Current Configuration

The website is configured with comprehensive Open Graph and Twitter Card meta tags for optimal social media sharing.

### Preview Image

**Current Image:** `/assets/Bereket-Fikre-1.webp`

**Recommended:** Create a dedicated social sharing image with the following specifications:

#### Optimal Social Sharing Image Specifications:
- **Dimensions:** 1200 x 630 pixels (1.91:1 aspect ratio)
- **Format:** PNG or JPG (WebP works but PNG/JPG is more widely supported)
- **File Size:** Under 1MB (ideally 200-500KB)
- **Content:** Should include:
  - Your name: "Bereket Fikre"
  - Tagline: "Creative Designer"
  - Key services: "Brand Identity • UI/UX Design • Graphic Design"
  - Your photo or portfolio highlight
  - Website URL: "bereketfikre.com"
  - Brand colors: #19183B (dark) and #A1C2BD (mint green)

#### Where to Place the Image:
1. Create the optimized image
2. Save it as `og-image.png` or `og-image.jpg` in `/public/assets/`
3. Update the meta tags in `public/index.html`:
   ```html
   <meta property="og:image" content="https://bereketfikre.com/assets/og-image.png">
   <meta name="twitter:image" content="https://bereketfikre.com/assets/og-image.png">
   ```

### Testing Your Social Sharing

#### Facebook Sharing Debugger:
1. Go to: https://developers.facebook.com/tools/debug/
2. Enter your URL: `https://bereketfikre.com`
3. Click "Scrape Again" to refresh cache
4. Check the preview

#### Twitter Card Validator:
1. Go to: https://cards-dev.twitter.com/validator
2. Enter your URL: `https://bereketfikre.com`
3. Check the preview

#### LinkedIn Post Inspector:
1. Go to: https://www.linkedin.com/post-inspector/
2. Enter your URL: `https://bereketfikre.com`
3. Check the preview

### Current Meta Tags Status

✅ **Open Graph Tags:** Complete
- og:title
- og:description
- og:image
- og:url
- og:type
- og:site_name
- og:locale

✅ **Twitter Card Tags:** Complete
- twitter:card (summary_large_image)
- twitter:title
- twitter:description
- twitter:image
- twitter:site
- twitter:creator

✅ **Additional Social Tags:** Complete
- LinkedIn support
- Pinterest support
- Mobile optimization

### Important Notes

1. **Image URL Must Be Absolute:** All image URLs use `https://bereketfikre.com/` (not relative paths)
2. **Image Must Be Publicly Accessible:** The image must be accessible without authentication
3. **Cache Clearing:** Social media platforms cache previews. Use their debuggers to refresh
4. **HTTPS Required:** All URLs must use HTTPS for secure sharing

### Quick Fixes if Preview Not Showing

1. **Check Image Accessibility:**
   - Visit: `https://bereketfikre.com/assets/Bereket-Fikre-1.webp` directly
   - Should load without errors

2. **Verify Meta Tags:**
   - View page source
   - Check that all og:image and twitter:image tags are present
   - Ensure URLs are absolute (start with https://)

3. **Clear Social Media Cache:**
   - Use Facebook Debugger to clear cache
   - Use Twitter Card Validator to refresh
   - Wait a few minutes after clearing

4. **Check Image Format:**
   - Some platforms prefer PNG/JPG over WebP
   - Consider creating a PNG version for maximum compatibility

### Next Steps

1. Create optimized social sharing image (1200x630px)
2. Upload to `/public/assets/og-image.png`
3. Update meta tags in `public/index.html`
4. Test with social media debuggers
5. Share and verify preview appears correctly






