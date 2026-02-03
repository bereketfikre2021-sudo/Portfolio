# Performance notes

This file summarizes what’s in place and what you can do next for Lighthouse / Core Web Vitals.

## Done in code

- **Forced reflow**: Layout reads (`getBoundingClientRect`, `offsetTop`, `scrollHeight`, etc.) are batched in `requestAnimationFrame` and resize handlers are throttled with rAF in Navigation, BottomNav, ScrollProgress/ScrollToTop (via ScrollContext), Tooltip, RippleButton, useCounterAnimation, Contact, and Blog.
- **Main-thread work**: AOS is lazy-loaded (`import('aos')`) and init runs in `requestIdleCallback` (or `setTimeout` fallback) so it doesn’t block LCP. One shared scroll listener in `ScrollContext` drives both scroll progress and scroll-to-top; scroll state updates are throttled (only when scroll percent changes by >1.5% or scroll-to-top visibility flips) to reduce re-renders.
- **LCP**: Hero image is preloaded with `fetchpriority="high"`, has explicit dimensions, and critical CSS in `public/index.html` includes `.hero-image-container` and `.hero-image-container .image-wrapper { aspect-ratio: 4/5 }` to avoid layout shift when the full stylesheet loads.
- **Network**: Critical resources (LCP image, logo, fonts) are preloaded/preconnected in `public/index.html`; fonts load asynchronously.

## Optional next steps

- **Reduce unused CSS**: The app uses one large CSS bundle. To trim unused rules you can run a post-build step (e.g. PurgeCSS or similar) or move to a setup that code-splits CSS by route/component. With Create React App this usually means a custom build (e.g. CRACO) or eject.
- **Avoid excessive DOM size**: Keep sections and lists lean; if you add long lists (e.g. portfolio or blog), consider virtualizing them or paginating so the DOM doesn’t grow too large.
- **Largest Contentful Paint element**: The LCP element is the hero image. Keeping it preloaded, with fixed dimensions and stable container (aspect-ratio) in critical CSS, keeps LCP stable. If you change the hero (e.g. video or different image), re-check LCP and preload the new asset.

After changes, re-run Lighthouse (Performance) and check the “Reduce unused CSS”, “Avoid an excessive DOM size”, and “Largest Contentful Paint element” sections to confirm improvements.
