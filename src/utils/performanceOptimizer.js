// Performance optimization utilities
import logger from './logger.js';

class PerformanceOptimizer {
  constructor() {
    this.observers = new Map();
    this.preloadedResources = new Set();
    this.criticalResources = new Set();
  }

  // Preload critical resources
  preloadResource(href, as = 'script', crossorigin = false) {
    if (this.preloadedResources.has(href)) return;
    
    // Skip hero image preloads - hero image was removed
    if (href && href.includes('hero') && href.includes('image')) {
      return;
    }

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    
    if (crossorigin) {
      link.crossOrigin = 'anonymous';
    }

    document.head.appendChild(link);
    this.preloadedResources.add(href);
  }

  // Prefetch resources for future navigation
  prefetchResource(href) {
    if (this.preloadedResources.has(href)) return;

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
    this.preloadedResources.add(href);
  }

  // Optimize images with intersection observer
  optimizeImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length === 0) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    images.forEach(img => imageObserver.observe(img));
    this.observers.set('images', imageObserver);
  }

  // Optimize animations with reduced motion preference
  optimizeAnimations() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
      document.documentElement.style.setProperty('--animation-iteration-count', '1');
    }
  }

  // Optimize fonts loading
  optimizeFonts() {
    // Preload critical fonts
    const criticalFonts = [
      '/fonts/inter-var.woff2',
      '/fonts/inter-var.woff'
    ];

    criticalFonts.forEach(font => {
      this.preloadResource(font, 'font', true);
    });

    // Use font-display: swap for better performance
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Inter';
        font-display: swap;
        src: url('/fonts/inter-var.woff2') format('woff2');
      }
    `;
    document.head.appendChild(style);
  }

  // Optimize third-party scripts
  optimizeThirdPartyScripts() {
    // Defer non-critical scripts
    const scripts = document.querySelectorAll('script[src]');
    scripts.forEach(script => {
      if (!script.hasAttribute('defer') && !script.hasAttribute('async')) {
        // Check if script is critical
        const isCritical = script.src.includes('analytics') || 
                          script.src.includes('gtag') ||
                          script.src.includes('formspree');
        
        if (!isCritical) {
          script.defer = true;
        }
      }
    });
  }

  // Optimize CSS delivery
  optimizeCSS() {
    // Inline critical CSS
    const criticalCSS = `
      /* Critical CSS for above-the-fold content */
      body { margin: 0; font-family: 'Inter', sans-serif; }
      .hero { min-height: 100vh; display: flex; align-items: center; }
      .header { position: fixed; top: 0; left: 0; right: 0; z-index: 50; }
    `;

    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.insertBefore(style, document.head.firstChild);

    // Preload non-critical CSS
    const nonCriticalCSS = [
      '/styles/animations.css',
      '/styles/components.css'
    ];

    nonCriticalCSS.forEach(css => {
      this.prefetchResource(css);
    });
  }

  // Optimize bundle loading
  optimizeBundleLoading() {
    // Preload critical chunks
    const criticalChunks = [
      '/assets/react-vendor-[hash].js',
      '/assets/framer-motion-[hash].js'
    ];

    criticalChunks.forEach(chunk => {
      this.preloadResource(chunk, 'script');
    });

    // Prefetch non-critical chunks
    const nonCriticalChunks = [
      '/assets/tools-[hash].js',
      '/assets/optimization-[hash].js'
    ];

    nonCriticalChunks.forEach(chunk => {
      this.prefetchResource(chunk);
    });
  }

  // Optimize network requests
  optimizeNetworkRequests() {
    // Implement request deduplication
    const requestCache = new Map();
    
    const originalFetch = window.fetch;
    window.fetch = async (url, options) => {
      const cacheKey = `${url}-${JSON.stringify(options)}`;
      
      if (requestCache.has(cacheKey)) {
        return requestCache.get(cacheKey);
      }

      const promise = originalFetch(url, options);
      requestCache.set(cacheKey, promise);
      
      // Clear cache after 5 minutes
      setTimeout(() => {
        requestCache.delete(cacheKey);
      }, 300000);

      return promise;
    };
  }

  // Optimize memory usage
  optimizeMemoryUsage() {
    // Clean up unused observers
    const cleanup = () => {
      this.observers.forEach((observer, key) => {
        if (observer.disconnect) {
          observer.disconnect();
        }
      });
      this.observers.clear();
    };

    // Clean up on page unload
    window.addEventListener('beforeunload', cleanup);
    
    // Clean up unused resources periodically
    setInterval(() => {
      // Force garbage collection if available
      if (window.gc) {
        window.gc();
      }
    }, 60000); // Every minute
  }

  // Initialize all optimizations
  init() {
    // Run optimizations after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.runOptimizations());
    } else {
      this.runOptimizations();
    }
  }

  // Run all performance optimizations
  runOptimizations() {
    try {
      this.optimizeImages();
      this.optimizeAnimations();
      this.optimizeFonts();
      this.optimizeThirdPartyScripts();
      this.optimizeCSS();
      this.optimizeBundleLoading();
      this.optimizeNetworkRequests();
      this.optimizeMemoryUsage();
      
      logger.log('🚀 Performance optimizations applied');
    } catch (error) {
      logger.error('Performance optimization error:', error);
    }
  }

  // Get performance metrics
  getMetrics() {
    const navigation = performance.getEntriesByType('navigation')[0];
    const resources = performance.getEntriesByType('resource');
    
    return {
      loadTime: navigation ? navigation.loadEventEnd - navigation.fetchStart : 0,
      domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.fetchStart : 0,
      firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
      firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
      resourceCount: resources.length,
      totalSize: resources.reduce((sum, resource) => sum + (resource.transferSize || 0), 0)
    };
  }
}

// Create global instance
const performanceOptimizer = new PerformanceOptimizer();

// Auto-initialize
if (typeof window !== 'undefined') {
  performanceOptimizer.init();
}

export default performanceOptimizer;
export { PerformanceOptimizer };

export { PerformanceOptimizer };
