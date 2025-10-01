// Advanced resource optimization with critical resource hints and preloading strategies
class ResourceOptimizer {
  constructor() {
    this.preloadedResources = new Set();
    this.criticalResources = new Set();
    this.deferredResources = new Set();
    this.connectionType = this.getConnectionType();
    this.isSlowConnection = this.connectionType === 'slow-2g' || this.connectionType === '2g';
  }

  // Initialize resource optimization
  init() {
    this.setupCriticalResourceHints();
    this.setupPreloadingStrategies();
    this.setupResourcePrioritization();
    this.setupLazyLoadingOptimization();
    this.setupConnectionAdaptiveLoading();
  }

  // Get connection type
  getConnectionType() {
    if ('connection' in navigator) {
      return navigator.connection.effectiveType || '4g';
    }
    return '4g';
  }

  // Setup critical resource hints
  setupCriticalResourceHints() {
    // Critical CSS - DISABLED (file doesn't exist)
    // this.addResourceHint('/styles/critical.css', 'preload', 'style');
    
    // Critical fonts - DISABLED (files don't exist)
    // this.addResourceHint('/fonts/inter-var.woff2', 'preload', 'font', true);
    // this.addResourceHint('/fonts/inter-var.woff', 'preload', 'font', true);
    
    // Critical images (above the fold) - DISABLED FOR TEST APP
    // this.addResourceHint('/img/Bereket-Fikre.webp', 'preload', 'image');
    // this.addResourceHint('/img/Logo.webp', 'preload', 'image');
    
    // Critical JavaScript chunks
    this.addResourceHint('/assets/react-vendor-[hash].js', 'preload', 'script');
    this.addResourceHint('/assets/framer-motion-[hash].js', 'preload', 'script');
  }

  // Add resource hint
  addResourceHint(href, rel, as, crossorigin = false) {
    if (this.preloadedResources.has(href)) return;

    const link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    
    if (as) link.as = as;
    if (crossorigin) link.crossOrigin = 'anonymous';
    
    // Add fetchpriority for critical resources
    if (rel === 'preload') {
      link.setAttribute('fetchpriority', 'high');
    }

    document.head.appendChild(link);
    this.preloadedResources.add(href);
  }

  // Setup preloading strategies
  setupPreloadingStrategies() {
    // Preload on user interaction
    this.setupInteractionPreloading();
    
    // Preload on hover
    this.setupHoverPreloading();
    
    // Preload on scroll
    this.setupScrollPreloading();
    
    // Preload on idle
    this.setupIdlePreloading();
  }

  // Setup interaction-based preloading
  setupInteractionPreloading() {
    const preloadOnInteraction = () => {
      // Preload non-critical resources on first user interaction
      this.preloadNonCriticalResources();
      
      // Remove event listeners after first interaction
      document.removeEventListener('mousedown', preloadOnInteraction);
      document.removeEventListener('touchstart', preloadOnInteraction);
      document.removeEventListener('keydown', preloadOnInteraction);
    };

    document.addEventListener('mousedown', preloadOnInteraction, { once: true });
    document.addEventListener('touchstart', preloadOnInteraction, { once: true });
    document.addEventListener('keydown', preloadOnInteraction, { once: true });
  }

  // Preload non-critical resources
  preloadNonCriticalResources() {
    const nonCriticalResources = [
      { href: '/assets/tools-[hash].js', as: 'script' },
      { href: '/assets/optimization-[hash].js', as: 'script' },
      { href: '/styles/animations.css', as: 'style' },
      { href: '/img/portfolio-bg.webp', as: 'image' }
    ];

    nonCriticalResources.forEach(resource => {
      this.addResourceHint(resource.href, 'prefetch', resource.as);
    });
  }

  // Setup hover-based preloading
  setupHoverPreloading() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          this.preloadSectionResources(targetSection);
        }
      }, { once: true });
    });
  }

  // Preload section resources
  preloadSectionResources(section) {
    const images = section.querySelectorAll('img[data-src]');
    const videos = section.querySelectorAll('video[data-src]');
    
    images.forEach(img => {
      if (img.dataset.src) {
        this.addResourceHint(img.dataset.src, 'preload', 'image');
      }
    });
    
    videos.forEach(video => {
      if (video.dataset.src) {
        this.addResourceHint(video.dataset.src, 'preload', 'video');
      }
    });
  }

  // Setup scroll-based preloading
  setupScrollPreloading() {
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
        this.preloadVisibleResources();
      }, 100);
    }, { passive: true });
  }

  // Preload visible resources
  preloadVisibleResources() {
    const visibleElements = this.getVisibleElements();
    
    visibleElements.forEach(element => {
      if (element.tagName === 'IMG' && element.dataset.src) {
        this.addResourceHint(element.dataset.src, 'preload', 'image');
      }
      
      if (element.tagName === 'VIDEO' && element.dataset.src) {
        this.addResourceHint(element.dataset.src, 'preload', 'video');
      }
    });
  }

  // Get visible elements
  getVisibleElements() {
    const elements = document.querySelectorAll('[data-src]');
    const visible = [];
    
    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        visible.push(element);
      }
    });
    
    return visible;
  }

  // Setup idle-based preloading
  setupIdlePreloading() {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        this.preloadIdleResources();
      });
    } else {
      setTimeout(() => {
        this.preloadIdleResources();
      }, 2000);
    }
  }

  // Preload idle resources
  preloadIdleResources() {
    const idleResources = [
      { href: '/assets/blog-[hash].js', as: 'script' },
      { href: '/assets/case-study-[hash].js', as: 'script' },
      { href: '/img/gallery-bg.webp', as: 'image' }
    ];

    idleResources.forEach(resource => {
      this.addResourceHint(resource.href, 'prefetch', resource.as);
    });
  }

  // Setup resource prioritization
  setupResourcePrioritization() {
    // High priority resources
    const highPrioritySelectors = [
      'img[data-priority="high"]',
      'video[data-priority="high"]',
      '.hero img',
      '.above-fold img'
    ];

    highPrioritySelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        element.setAttribute('fetchpriority', 'high');
      });
    });

    // Low priority resources
    const lowPrioritySelectors = [
      'img[data-priority="low"]',
      'video[data-priority="low"]',
      '.below-fold img',
      '.lazy img'
    ];

    lowPrioritySelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        element.setAttribute('fetchpriority', 'low');
      });
    });
  }

  // Setup lazy loading optimization
  setupLazyLoadingOptimization() {
    // Optimize lazy loading for different connection types
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    lazyImages.forEach(img => {
      if (this.isSlowConnection) {
        // Increase root margin for slow connections
        img.setAttribute('data-loading-distance', '200px');
      } else {
        // Standard root margin for fast connections
        img.setAttribute('data-loading-distance', '100px');
      }
    });
  }

  // Setup connection-adaptive loading
  setupConnectionAdaptiveLoading() {
    if (this.isSlowConnection) {
      // Disable non-critical animations
      document.documentElement.classList.add('slow-connection');
      
      // Reduce image quality
      this.adaptImageQuality('low');
      
      // Defer non-critical scripts
      this.deferNonCriticalScripts();
    } else {
      // Enable all features for fast connections
      document.documentElement.classList.add('fast-connection');
    }
  }

  // Adapt image quality based on connection
  adaptImageQuality(quality) {
    const images = document.querySelectorAll('img[data-src]');
    
    images.forEach(img => {
      const src = img.dataset.src;
      if (src) {
        // Modify image URL to request lower quality
        const qualityParam = quality === 'low' ? '?q=60' : '?q=80';
        img.dataset.src = src + qualityParam;
      }
    });
  }

  // Defer non-critical scripts
  deferNonCriticalScripts() {
    const scripts = document.querySelectorAll('script[data-defer]');
    
    scripts.forEach(script => {
      script.defer = true;
    });
  }

  // Preload specific resource
  preloadResource(href, as, crossorigin = false) {
    this.addResourceHint(href, 'preload', as, crossorigin);
  }

  // Prefetch specific resource
  prefetchResource(href, as) {
    this.addResourceHint(href, 'prefetch', as);
  }

  // Get resource loading status
  getResourceStatus() {
    return {
      preloaded: this.preloadedResources.size,
      critical: this.criticalResources.size,
      deferred: this.deferredResources.size,
      connectionType: this.connectionType,
      isSlowConnection: this.isSlowConnection
    };
  }

  // Optimize resource loading for specific section
  optimizeSection(sectionId) {
    const section = document.querySelector(`#${sectionId}`);
    if (!section) return;

    // Preload section images
    const images = section.querySelectorAll('img[data-src]');
    images.forEach(img => {
      if (img.dataset.src) {
        this.preloadResource(img.dataset.src, 'image');
      }
    });

    // Preload section scripts
    const scripts = section.querySelectorAll('script[data-src]');
    scripts.forEach(script => {
      if (script.dataset.src) {
        this.preloadResource(script.dataset.src, 'script');
      }
    });
  }

  // Monitor resource loading performance
  monitorResourcePerformance() {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        if (entry.entryType === 'resource') {
          this.analyzeResourcePerformance(entry);
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });
  }

  // Analyze resource performance
  analyzeResourcePerformance(entry) {
    const resource = {
      name: entry.name,
      duration: entry.duration,
      size: entry.transferSize,
      type: this.getResourceType(entry.name),
      priority: entry.renderBlockingStatus
    };

    // Log slow resources
    if (resource.duration > 1000) {
      console.warn('Slow resource detected:', resource);
    }

    // Log large resources
    if (resource.size > 500000) {
      console.warn('Large resource detected:', resource);
    }
  }

  // Get resource type from URL
  getResourceType(url) {
    if (url.includes('.js')) return 'script';
    if (url.includes('.css')) return 'style';
    if (url.includes('.woff')) return 'font';
    if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) return 'image';
    if (url.match(/\.(mp4|webm|ogg)$/)) return 'video';
    return 'other';
  }

  // Cleanup resources
  cleanup() {
    // Remove unused preloaded resources
    const unusedResources = Array.from(this.preloadedResources).filter(href => {
      const link = document.querySelector(`link[href="${href}"]`);
      return !link || !link.sheet;
    });

    unusedResources.forEach(href => {
      const link = document.querySelector(`link[href="${href}"]`);
      if (link) {
        link.remove();
        this.preloadedResources.delete(href);
      }
    });
  }
}

// Create global instance
const resourceOptimizer = new ResourceOptimizer();

// Auto-initialize
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    resourceOptimizer.init();
  });
}

export default resourceOptimizer;
export { ResourceOptimizer };
