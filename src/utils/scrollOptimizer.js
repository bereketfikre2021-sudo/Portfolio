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

  // Cache layout values to prevent forced reflows
  _cachedScrollPosition = null;
  _cacheTimestamp = 0;
  _CACHE_DURATION = 16; // ~60fps

  getScrollPosition() {
    const now = Date.now();
    
    // Return cached value if still fresh
    if (this._cachedScrollPosition && (now - this._cacheTimestamp) < this._CACHE_DURATION) {
      return this._cachedScrollPosition;
    }
    
    // Batch all layout reads together to prevent forced reflow
    const scrollY = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
    const scrollX = window.pageXOffset || window.scrollX || document.documentElement.scrollLeft;
    const scrollHeight = document.documentElement.scrollHeight;
    const innerHeight = window.innerHeight || document.documentElement.clientHeight;
    const maxScroll = scrollHeight - innerHeight;
    
    this._cachedScrollPosition = {
      scrollY,
      scrollX,
      maxScroll,
      percentage: maxScroll > 0 ? Math.round((scrollY / maxScroll) * 100) : 0
    };
    
    this._cacheTimestamp = now;
    return this._cachedScrollPosition;
  }

  isInViewport(element, threshold = 0.1) {
    if (!element) return false;
    
    // Batch all layout reads together
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
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