// Layout Optimizer - Prevents forced reflows by batching layout reads
class LayoutOptimizer {
  constructor() {
    this.pendingReads = [];
    this.pendingWrites = [];
    this.rafId = null;
    this.ticking = false;
  }

  // Batch layout reads to prevent forced reflow
  // Usage: layoutOptimizer.read(() => element.getBoundingClientRect())
  read(callback) {
    return new Promise((resolve) => {
      this.pendingReads.push(() => {
        const result = callback();
        resolve(result);
      });

      this.scheduleFlush();
    });
  }

  // Batch DOM writes to prevent forced reflow
  // Usage: layoutOptimizer.write(() => element.style.width = '100px')
  write(callback) {
    this.pendingWrites.push(callback);
    this.scheduleFlush();
  }

  // Schedule a flush of pending reads and writes
  scheduleFlush() {
    if (this.ticking) return;
    this.ticking = true;

    this.rafId = requestAnimationFrame(() => {
      this.flush();
    });
  }

  // Flush all pending reads and writes
  flush() {
    // First, batch all reads together (read phase)
    const readResults = this.pendingReads.map(read => read());
    this.pendingReads = [];

    // Then, batch all writes together (write phase)
    this.pendingWrites.forEach(write => write());
    this.pendingWrites = [];

    this.ticking = false;
    return readResults;
  }

  // Batch multiple layout reads together
  // Usage: layoutOptimizer.batchReads([
  //   () => element1.getBoundingClientRect(),
  //   () => element2.offsetWidth,
  //   () => window.scrollY
  // ])
  batchReads(readCallbacks) {
    return new Promise((resolve) => {
      this.pendingReads.push(() => {
        const results = readCallbacks.map(callback => callback());
        resolve(results);
      });

      this.scheduleFlush();
    });
  }

  // Get element's bounding rect without causing forced reflow
  getBoundingRect(element) {
    if (!element) return null;
    
    return new Promise((resolve) => {
      this.read(() => {
        const rect = element.getBoundingClientRect();
        resolve({
          top: rect.top,
          right: rect.right,
          bottom: rect.bottom,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          x: rect.x,
          y: rect.y
        });
      });
    });
  }

  // Get scroll position without causing forced reflow
  getScrollPosition() {
    return new Promise((resolve) => {
      this.read(() => {
        resolve({
          scrollY: window.pageYOffset || window.scrollY || document.documentElement.scrollTop,
          scrollX: window.pageXOffset || window.scrollX || document.documentElement.scrollLeft,
          scrollHeight: document.documentElement.scrollHeight,
          scrollWidth: document.documentElement.scrollWidth,
          innerHeight: window.innerHeight || document.documentElement.clientHeight,
          innerWidth: window.innerWidth || document.documentElement.clientWidth
        });
      });
    });
  }

  // Check if element is in viewport without causing forced reflow
  isInViewport(element, threshold = 0.1) {
    if (!element) return Promise.resolve(false);

    return new Promise((resolve) => {
      this.batchReads([
        () => element.getBoundingClientRect(),
        () => window.innerHeight || document.documentElement.clientHeight,
        () => window.innerWidth || document.documentElement.clientWidth
      ]).then(([rect, windowHeight, windowWidth]) => {
        const isVisible = (
          rect.top < windowHeight * (1 - threshold) &&
          rect.bottom > windowHeight * threshold &&
          rect.left < windowWidth * (1 - threshold) &&
          rect.right > windowWidth * threshold
        );
        resolve(isVisible);
      });
    });
  }

  // Cleanup
  destroy() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.pendingReads = [];
    this.pendingWrites = [];
    this.ticking = false;
  }
}

// Create singleton instance
const layoutOptimizer = new LayoutOptimizer();

export default layoutOptimizer;

