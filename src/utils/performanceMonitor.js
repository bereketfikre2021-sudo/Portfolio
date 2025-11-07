// Advanced performance monitoring with real-time metrics and optimization recommendations
import logger from './logger.js';

class PerformanceMonitor {
  constructor() {
    this.metrics = {
      loadTime: 0,
      firstContentfulPaint: 0,
      largestContentfulPaint: 0,
      firstInputDelay: 0,
      cumulativeLayoutShift: 0,
      timeToInteractive: 0,
      totalBlockingTime: 0,
      speedIndex: 0
    };
    this.observers = new Map();
    this.thresholds = {
      fcp: 1800, // First Contentful Paint
      lcp: 2500, // Largest Contentful Paint
      fid: 100,  // First Input Delay
      cls: 0.1,  // Cumulative Layout Shift
      tti: 3800, // Time to Interactive
      tbt: 200   // Total Blocking Time
    };
    this.isMonitoring = false;
  }

  // Initialize performance monitoring
  init() {
    this.setupCoreWebVitals();
    this.setupPerformanceObserver();
    this.setupResourceMonitoring();
    this.setupNavigationTiming();
    this.setupUserTiming();
    this.startMonitoring();
  }

  // Setup Core Web Vitals monitoring
  setupCoreWebVitals() {
    // First Contentful Paint (FCP)
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcpEntry = entries[entries.length - 1];
      this.metrics.firstContentfulPaint = fcpEntry.startTime;
      this.recordMetric('fcp', fcpEntry.startTime);
    }).observe({ entryTypes: ['paint'] });

    // Largest Contentful Paint (LCP)
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.largestContentfulPaint = lastEntry.startTime;
      this.recordMetric('lcp', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay (FID)
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        this.metrics.firstInputDelay = entry.processingStart - entry.startTime;
        this.recordMetric('fid', this.metrics.firstInputDelay);
      });
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      this.metrics.cumulativeLayoutShift = clsValue;
      this.recordMetric('cls', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
  }

  // Setup performance observer for custom metrics
  setupPerformanceObserver() {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        this.analyzePerformanceEntry(entry);
      });
    });

    observer.observe({ 
      entryTypes: ['navigation', 'resource', 'measure', 'mark'] 
    });

    this.observers.set('main', observer);
  }

  // Analyze performance entry
  analyzePerformanceEntry(entry) {
    switch (entry.entryType) {
      case 'navigation':
        this.analyzeNavigationTiming(entry);
        break;
      case 'resource':
        this.analyzeResourceTiming(entry);
        break;
      case 'measure':
        this.analyzeUserTiming(entry);
        break;
    }
  }

  // Analyze navigation timing
  analyzeNavigationTiming(entry) {
    this.metrics.loadTime = entry.loadEventEnd - entry.fetchStart;
    this.metrics.timeToInteractive = this.calculateTTI(entry);
    this.metrics.totalBlockingTime = this.calculateTBT(entry);

    this.recordMetric('loadTime', this.metrics.loadTime);
    this.recordMetric('tti', this.metrics.timeToInteractive);
    this.recordMetric('tbt', this.metrics.totalBlockingTime);
  }

  // Calculate Time to Interactive (TTI)
  calculateTTI(navigationEntry) {
    // Simplified TTI calculation
    const domContentLoaded = navigationEntry.domContentLoadedEventEnd - navigationEntry.fetchStart;
    const loadComplete = navigationEntry.loadEventEnd - navigationEntry.fetchStart;
    
    return Math.max(domContentLoaded, loadComplete);
  }

  // Calculate Total Blocking Time (TBT)
  calculateTBT(navigationEntry) {
    // Simplified TBT calculation
    const domProcessing = navigationEntry.domContentLoadedEventEnd - navigationEntry.domContentLoadedEventStart;
    const loadProcessing = navigationEntry.loadEventEnd - navigationEntry.loadEventStart;
    
    return domProcessing + loadProcessing;
  }

  // Analyze resource timing
  analyzeResourceTiming(entry) {
    const resource = {
      name: entry.name,
      duration: entry.duration,
      size: entry.transferSize,
      type: this.getResourceType(entry.name),
      startTime: entry.startTime,
      endTime: entry.responseEnd
    };

    // Check for slow resources
    if (resource.duration > 1000) {
      this.recordSlowResource(resource);
    }

    // Check for large resources
    if (resource.size > 500000) {
      this.recordLargeResource(resource);
    }

    // Check for render-blocking resources
    if (this.isRenderBlocking(resource)) {
      this.recordRenderBlockingResource(resource);
    }
  }

  // Get resource type
  getResourceType(url) {
    if (url.includes('.js')) return 'script';
    if (url.includes('.css')) return 'style';
    if (url.includes('.woff')) return 'font';
    if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) return 'image';
    if (url.match(/\.(mp4|webm|ogg)$/)) return 'video';
    return 'other';
  }

  // Check if resource is render-blocking
  isRenderBlocking(resource) {
    return resource.type === 'script' || resource.type === 'style';
  }

  // Record slow resource
  recordSlowResource(resource) {
    logger.warn('Slow resource detected:', resource);
    this.sendPerformanceEvent('slow_resource', resource);
  }

  // Record large resource
  recordLargeResource(resource) {
    logger.warn('Large resource detected:', resource);
    this.sendPerformanceEvent('large_resource', resource);
  }

  // Record render-blocking resource
  recordRenderBlockingResource(resource) {
    logger.warn('Render-blocking resource detected:', resource);
    this.sendPerformanceEvent('render_blocking_resource', resource);
  }

  // Analyze user timing
  analyzeUserTiming(entry) {
    this.recordMetric(entry.name, entry.duration);
  }

  // Setup resource monitoring
  setupResourceMonitoring() {
    const resourceObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        this.monitorResourcePerformance(entry);
      });
    });

    resourceObserver.observe({ entryTypes: ['resource'] });
    this.observers.set('resource', resourceObserver);
  }

  // Monitor resource performance
  monitorResourcePerformance(entry) {
    const metrics = {
      name: entry.name,
      duration: entry.duration,
      size: entry.transferSize,
      dns: entry.domainLookupEnd - entry.domainLookupStart,
      tcp: entry.connectEnd - entry.connectStart,
      ssl: entry.secureConnectionStart > 0 ? entry.connectEnd - entry.secureConnectionStart : 0,
      ttfb: entry.responseStart - entry.requestStart,
      download: entry.responseEnd - entry.responseStart
    };

    // Analyze resource performance
    this.analyzeResourceMetrics(metrics);
  }

  // Analyze resource metrics
  analyzeResourceMetrics(metrics) {
    const issues = [];

    if (metrics.dns > 100) {
      issues.push('Slow DNS lookup');
    }

    if (metrics.tcp > 200) {
      issues.push('Slow TCP connection');
    }

    if (metrics.ssl > 300) {
      issues.push('Slow SSL handshake');
    }

    if (metrics.ttfb > 500) {
      issues.push('Slow Time to First Byte');
    }

    if (metrics.download > 1000) {
      issues.push('Slow download');
    }

    if (issues.length > 0) {
      this.recordResourceIssues(metrics, issues);
    }
  }

  // Record resource issues
  recordResourceIssues(metrics, issues) {
    logger.warn('Resource performance issues:', { metrics, issues });
    this.sendPerformanceEvent('resource_issues', { metrics, issues });
  }

  // Setup navigation timing
  setupNavigationTiming() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
          this.analyzeNavigationTiming(navigation);
        }
      }, 1000);
    });
  }

  // Setup user timing
  setupUserTiming() {
    // Mark important milestones
    this.markMilestone('dom_ready', () => {
      return document.readyState === 'interactive';
    });

    this.markMilestone('page_loaded', () => {
      return document.readyState === 'complete';
    });
  }

  // Mark milestone
  markMilestone(name, condition) {
    const checkMilestone = () => {
      if (condition()) {
        performance.mark(name);
        this.recordMetric(name, performance.now());
      } else {
        setTimeout(checkMilestone, 100);
      }
    };

    checkMilestone();
  }

  // Record metric
  recordMetric(name, value) {
    this.metrics[name] = value;
    
    // Check against thresholds
    if (this.thresholds[name]) {
      const threshold = this.thresholds[name];
      const isGood = value <= threshold;
      
      this.sendPerformanceEvent('metric', {
        name,
        value,
        threshold,
        isGood,
        timestamp: Date.now()
      });
    }
  }

  // Send performance event
  sendPerformanceEvent(type, data) {
    const event = {
      type,
      data,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    // Send to analytics
    if (window.gtag) {
      window.gtag('event', 'performance_metric', {
        event_category: 'performance',
        event_label: type,
        value: data.value || 0
      });
    }

    // Store locally
    this.storePerformanceEvent(event);
  }

  // Store performance event
  storePerformanceEvent(event) {
    try {
      const events = JSON.parse(localStorage.getItem('performance_events') || '[]');
      events.push(event);
      
      // Keep only last 50 events
      if (events.length > 50) {
        events.splice(0, events.length - 50);
      }
      
      localStorage.setItem('performance_events', JSON.stringify(events));
    } catch (error) {
      logger.warn('Failed to store performance event:', error);
    }
  }

  // Start monitoring
  startMonitoring() {
    this.isMonitoring = true;
    
    // Monitor performance every 10 seconds
    this.monitoringInterval = setInterval(() => {
      this.collectPerformanceData();
    }, 10000);

    // Monitor memory usage
    this.memoryMonitoringInterval = setInterval(() => {
      this.monitorMemoryUsage();
    }, 30000);
  }

  // Stop monitoring
  stopMonitoring() {
    this.isMonitoring = false;
    
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
    }
    
    if (this.memoryMonitoringInterval) {
      clearInterval(this.memoryMonitoringInterval);
    }
    
    // Cleanup observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }

  // Collect performance data
  collectPerformanceData() {
    const data = {
      timestamp: Date.now(),
      metrics: { ...this.metrics },
      memory: this.getMemoryInfo(),
      connection: this.getConnectionInfo(),
      viewport: this.getViewportInfo()
    };

    this.sendPerformanceEvent('performance_data', data);
  }

  // Get memory info
  getMemoryInfo() {
    if ('memory' in performance) {
      return {
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize,
        limit: performance.memory.jsHeapSizeLimit
      };
    }
    return null;
  }

  // Monitor memory usage
  monitorMemoryUsage() {
    const memoryInfo = this.getMemoryInfo();
    if (memoryInfo) {
      const usagePercent = (memoryInfo.used / memoryInfo.limit) * 100;
      
      if (usagePercent > 80) {
        logger.warn('High memory usage detected:', usagePercent + '%');
        this.sendPerformanceEvent('high_memory_usage', {
          usage: usagePercent,
          memory: memoryInfo
        });
      }
    }
  }

  // Get connection info
  getConnectionInfo() {
    if ('connection' in navigator) {
      return {
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink,
        rtt: navigator.connection.rtt,
        saveData: navigator.connection.saveData
      };
    }
    return null;
  }

  // Get viewport info
  getViewportInfo() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio
    };
  }

  // Get performance score
  getPerformanceScore() {
    const scores = {
      fcp: this.getScore(this.metrics.firstContentfulPaint, this.thresholds.fcp),
      lcp: this.getScore(this.metrics.largestContentfulPaint, this.thresholds.lcp),
      fid: this.getScore(this.metrics.firstInputDelay, this.thresholds.fid, true),
      cls: this.getScore(this.metrics.cumulativeLayoutShift, this.thresholds.cls, true),
      tti: this.getScore(this.metrics.timeToInteractive, this.thresholds.tti),
      tbt: this.getScore(this.metrics.totalBlockingTime, this.thresholds.tbt)
    };

    const overallScore = Object.values(scores).reduce((sum, score) => sum + score, 0) / Object.keys(scores).length;
    
    return {
      overall: Math.round(overallScore),
      scores,
      metrics: this.metrics
    };
  }

  // Get score for metric
  getScore(value, threshold, reverse = false) {
    if (!value || !threshold) return 0;
    
    const ratio = value / threshold;
    const score = reverse ? Math.max(0, 100 - (ratio * 100)) : Math.max(0, 100 - (ratio * 100));
    
    return Math.min(100, Math.max(0, score));
  }

  // Get optimization recommendations
  getOptimizationRecommendations() {
    const recommendations = [];
    const score = this.getPerformanceScore();

    if (score.scores.fcp < 50) {
      recommendations.push({
        type: 'fcp',
        priority: 'high',
        message: 'Optimize First Contentful Paint by reducing render-blocking resources',
        action: 'Minify CSS, inline critical CSS, defer non-critical CSS'
      });
    }

    if (score.scores.lcp < 50) {
      recommendations.push({
        type: 'lcp',
        priority: 'high',
        message: 'Optimize Largest Contentful Paint by improving image loading',
        action: 'Use WebP images, implement lazy loading, optimize image sizes'
      });
    }

    if (score.scores.fid < 50) {
      recommendations.push({
        type: 'fid',
        priority: 'medium',
        message: 'Reduce First Input Delay by optimizing JavaScript',
        action: 'Code split, defer non-critical JS, use web workers'
      });
    }

    if (score.scores.cls < 50) {
      recommendations.push({
        type: 'cls',
        priority: 'medium',
        message: 'Reduce Cumulative Layout Shift by stabilizing layout',
        action: 'Set image dimensions, reserve space for dynamic content'
      });
    }

    if (score.scores.tti < 50) {
      recommendations.push({
        type: 'tti',
        priority: 'high',
        message: 'Improve Time to Interactive by reducing JavaScript execution time',
        action: 'Minify JS, remove unused code, optimize bundle size'
      });
    }

    if (score.scores.tbt < 50) {
      recommendations.push({
        type: 'tbt',
        priority: 'medium',
        message: 'Reduce Total Blocking Time by optimizing long tasks',
        action: 'Break up long tasks, use requestIdleCallback, optimize loops'
      });
    }

    return recommendations;
  }

  // Get performance report
  getPerformanceReport() {
    return {
      score: this.getPerformanceScore(),
      recommendations: this.getOptimizationRecommendations(),
      metrics: this.metrics,
      timestamp: Date.now()
    };
  }
}

// Create global instance
const performanceMonitor = new PerformanceMonitor();

// Auto-initialize
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    performanceMonitor.init();
  });
}

export default performanceMonitor;
export { PerformanceMonitor };

export { PerformanceMonitor };
