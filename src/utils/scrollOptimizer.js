// Simple Scroll Optimizer for better CI compatibility
class ScrollOptimizer {
  constructor() {
    this.listeners = new Map();
    this.ticking = false;
    this.lastScrollTime = 0;
    this.SCROLL_THROTTLE = 16; // ~60fps
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    this.setupScrollListener();
    this.isInitialized = true;
  }

  setupScrollListener() {
    const handleScroll = () => {
      const now = Date.now();
      
      if (!this.ticking && (now - this.lastScrollTime) > this.SCROLL_THROTTLE) {
        requestAnimationFrame(() => {
          this.executeListeners();
          this.ticking = false;
          this.lastScrollTime = now;
        });
        this.ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  executeListeners() {
    this.listeners.forEach((callback, id) => {
      try {
        callback();
      } catch (error) {
        console.warn(`Scroll listener ${id} error:`, error);
      }
    });
  }

  addListener(id, callback) {
    this.listeners.set(id, callback);
    this.init();
  }

  removeListener(id) {
    this.listeners.delete(id);
  }

  getScrollPosition() {
    return {
      scrollY: window.pageYOffset,
      scrollX: window.pageXOffset,
      maxScroll: document.documentElement.scrollHeight - window.innerHeight,
      percentage: Math.round((window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100)
    };
  }

  isInViewport(element, threshold = 0.1) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    
    return (
      rect.top < windowHeight * (1 - threshold) &&
      rect.bottom > windowHeight * threshold &&
      rect.left < windowWidth * (1 - threshold) &&
      rect.right > windowWidth * threshold
    );
  }

  destroy() {
    this.listeners.clear();
    this.isInitialized = false;
  }
}

// Create singleton instance
const scrollOptimizer = new ScrollOptimizer();

export default scrollOptimizer;