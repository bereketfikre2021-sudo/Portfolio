// Advanced analytics with heatmap tracking and user journey analysis
import logger from './logger.js';

class AdvancedAnalytics {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.userId = this.getUserId();
    this.pageLoaded = Date.now();
    this.events = [];
    this.heatmapData = [];
    this.userJourney = [];
    this.scrollDepth = 0;
    this.maxScrollDepth = 0;
    this.timeOnPage = 0;
    this.interactions = [];
    this.performance = {};
    this.isTracking = true;
  }

  // Initialize analytics tracking
  init() {
    if (!this.isTracking) return;

    this.setupEventTracking();
    this.setupHeatmapTracking();
    this.setupScrollTracking();
    this.setupPerformanceTracking();
    this.setupUserJourneyTracking();
    this.setupEngagementTracking();
    this.startSession();
  }

  // Generate unique session ID
  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Get or create user ID
  getUserId() {
    let userId = localStorage.getItem('analytics_user_id');
    if (!userId) {
      userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('analytics_user_id', userId);
    }
    return userId;
  }

  // Setup event tracking
  setupEventTracking() {
    // Track page views
    this.trackEvent('page_view', {
      url: window.location.pathname + window.location.hash,
      title: document.title,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      timestamp: Date.now()
    });

    // Track clicks
    document.addEventListener('click', (e) => {
      this.trackClick(e);
    });

    // Track form interactions
    document.addEventListener('input', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        this.trackFormInteraction(e);
      }
    });

    // Track navigation
    window.addEventListener('popstate', (e) => {
      this.trackNavigation();
    });

    // Track visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.trackEvent('page_hidden', { timestamp: Date.now() });
      } else {
        this.trackEvent('page_visible', { timestamp: Date.now() });
      }
    });

    // Track page unload
    window.addEventListener('beforeunload', () => {
      this.endSession();
    });
  }

  // Setup heatmap tracking
  setupHeatmapTracking() {
    let lastMoveTime = 0;
    const moveThrottle = 100; // Track mouse movements every 100ms

    document.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - lastMoveTime > moveThrottle) {
        this.recordHeatmapData(e.clientX, e.clientY, 'move');
        lastMoveTime = now;
      }
    });

    document.addEventListener('click', (e) => {
      this.recordHeatmapData(e.clientX, e.clientY, 'click');
    });

    document.addEventListener('scroll', () => {
      this.recordScrollData();
    });
  }

  // Record heatmap data
  recordHeatmapData(x, y, type) {
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    const relativeX = x / viewport.width;
    const relativeY = y / viewport.height;

    this.heatmapData.push({
      x: relativeX,
      y: relativeY,
      type,
      timestamp: Date.now(),
      viewport,
      url: window.location.pathname + window.location.hash
    });

    // Limit heatmap data size
    if (this.heatmapData.length > 1000) {
      this.heatmapData = this.heatmapData.slice(-800);
    }
  }

  // Setup scroll tracking
  setupScrollTracking() {
    let scrollTimeout;

    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      this.scrollDepth = scrollPercent;
      this.maxScrollDepth = Math.max(this.maxScrollDepth, scrollPercent);

      scrollTimeout = setTimeout(() => {
        this.trackEvent('scroll_depth', {
          depth: scrollPercent,
          maxDepth: this.maxScrollDepth,
          timestamp: Date.now()
        });
      }, 250);
    });
  }

  // Record scroll data
  recordScrollData() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    
    this.trackEvent('scroll_position', {
      scrollTop,
      scrollPercent: Math.round((scrollTop / (docHeight - windowHeight)) * 100),
      timestamp: Date.now()
    });
  }

  // Setup performance tracking
  setupPerformanceTracking() {
    // Track page load performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        const paint = performance.getEntriesByType('paint');
        
        this.performance = {
          loadTime: navigation ? navigation.loadEventEnd - navigation.fetchStart : 0,
          domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.fetchStart : 0,
          firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
          firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
          resources: performance.getEntriesByType('resource').length
        };

        this.trackEvent('performance', this.performance);
      }, 1000);
    });

    // Track Core Web Vitals
    this.trackWebVitals();
  }

  // Track Core Web Vitals
  trackWebVitals() {
    // LCP (Largest Contentful Paint)
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.trackEvent('lcp', { value: lastEntry.startTime });
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // FID (First Input Delay)
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        this.trackEvent('fid', { value: entry.processingStart - entry.startTime });
      });
    }).observe({ entryTypes: ['first-input'] });

    // CLS (Cumulative Layout Shift)
    let clsValue = 0;
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      this.trackEvent('cls', { value: clsValue });
    }).observe({ entryTypes: ['layout-shift'] });
  }

  // Setup user journey tracking
  setupUserJourneyTracking() {
    // Track section views
    this.setupIntersectionObserver();
    
    // Track time spent on sections
    this.trackSectionTime();
  }

  // Setup intersection observer for sections
  setupIntersectionObserver() {
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.trackSectionView(entry.target.id);
        }
      });
    }, {
      threshold: 0.5
    });

    sections.forEach(section => observer.observe(section));
  }

  // Track section views
  trackSectionView(sectionId) {
    const now = Date.now();
    
    this.userJourney.push({
      section: sectionId,
      timestamp: now,
      timeFromStart: now - this.pageLoaded
    });

    this.trackEvent('section_view', {
      section: sectionId,
      timestamp: now,
      journey: this.userJourney.length
    });
  }

  // Track time spent on sections
  trackSectionTime() {
    let currentSection = null;
    let sectionStartTime = null;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          if (currentSection && sectionStartTime) {
            const timeSpent = Date.now() - sectionStartTime;
            this.trackEvent('section_time', {
              section: currentSection,
              timeSpent,
              timestamp: Date.now()
            });
          }
          
          currentSection = entry.target.id;
          sectionStartTime = Date.now();
        }
      });
    }, {
      threshold: 0.5
    });

    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });
  }

  // Setup engagement tracking
  setupEngagementTracking() {
    let engagementScore = 0;
    let lastActivity = Date.now();

    // Track user activity
    const activityEvents = ['click', 'scroll', 'keydown', 'mousemove'];
    
    activityEvents.forEach(event => {
      document.addEventListener(event, () => {
        lastActivity = Date.now();
        engagementScore += 1;
      }, { passive: true });
    });

    // Calculate engagement periodically
    setInterval(() => {
      const timeIdle = Date.now() - lastActivity;
      const isEngaged = timeIdle < 30000; // Active within last 30 seconds
      
      this.trackEvent('engagement', {
        score: engagementScore,
        isEngaged,
        timeIdle,
        timestamp: Date.now()
      });
    }, 10000); // Every 10 seconds
  }

  // Track click events
  trackClick(event) {
    const element = event.target;
    const rect = element.getBoundingClientRect();
    
    this.trackEvent('click', {
      element: element.tagName.toLowerCase(),
      className: element.className,
      id: element.id,
      text: element.textContent?.substring(0, 100),
      x: event.clientX,
      y: event.clientY,
      elementX: rect.left,
      elementY: rect.top,
      elementWidth: rect.width,
      elementHeight: rect.height,
      timestamp: Date.now()
    });

    // Track specific interactions
    if (element.tagName === 'A') {
      this.trackEvent('link_click', {
        href: element.href,
        text: element.textContent,
        timestamp: Date.now()
      });
    }

    if (element.tagName === 'BUTTON') {
      this.trackEvent('button_click', {
        text: element.textContent,
        type: element.type,
        timestamp: Date.now()
      });
    }
  }

  // Track form interactions
  trackFormInteraction(event) {
    const element = event.target;
    
    this.trackEvent('form_interaction', {
      element: element.tagName.toLowerCase(),
      type: element.type,
      name: element.name,
      id: element.id,
      value: element.value?.length || 0, // Track length, not actual value for privacy
      timestamp: Date.now()
    });
  }

  // Track navigation
  trackNavigation() {
    this.trackEvent('navigation', {
      from: document.referrer,
      to: window.location.pathname + window.location.hash,
      timestamp: Date.now()
    });
  }

  // Track custom events
  trackEvent(eventName, data = {}) {
    const event = {
      name: eventName,
      data,
      sessionId: this.sessionId,
      userId: this.userId,
      url: window.location.pathname + window.location.hash,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };

    this.events.push(event);

    // Send to analytics service
    this.sendToAnalytics(event);

    // Store locally
    this.storeLocally(event);
  }

  // Send data to analytics service
  async sendToAnalytics(event) {
    try {
      // Send to Google Analytics if available
      if (window.gtag) {
        window.gtag('event', event.name, {
          custom_parameter: JSON.stringify(event.data),
          session_id: this.sessionId,
          user_id: this.userId
        });
      }

      // Send to custom analytics endpoint
      if (navigator.onLine) {
        await fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(event)
        }).catch(error => {
          logger.warn('Analytics send failed:', error);
        });
      }
    } catch (error) {
      logger.warn('Analytics error:', error);
    }
  }

  // Store analytics data locally
  storeLocally(event) {
    try {
      const localData = JSON.parse(localStorage.getItem('analytics_events') || '[]');
      localData.push(event);
      
      // Keep only last 100 events
      if (localData.length > 100) {
        localData.splice(0, localData.length - 100);
      }
      
      localStorage.setItem('analytics_events', JSON.stringify(localData));
    } catch (error) {
      logger.warn('Local storage error:', error);
    }
  }

  // Start analytics session
  startSession() {
    this.trackEvent('session_start', {
      sessionId: this.sessionId,
      userId: this.userId,
      timestamp: Date.now(),
      url: window.location.pathname + window.location.hash,
      referrer: document.referrer
    });
  }

  // End analytics session
  endSession() {
    this.timeOnPage = Date.now() - this.pageLoaded;
    
    this.trackEvent('session_end', {
      sessionId: this.sessionId,
      userId: this.userId,
      timeOnPage: this.timeOnPage,
      maxScrollDepth: this.maxScrollDepth,
      interactions: this.events.length,
      timestamp: Date.now()
    });

    // Send final batch of data
    this.sendBatchData();
  }

  // Send batch data
  async sendBatchData() {
    const batchData = {
      sessionId: this.sessionId,
      userId: this.userId,
      events: this.events,
      heatmapData: this.heatmapData,
      userJourney: this.userJourney,
      performance: this.performance,
      summary: {
        timeOnPage: this.timeOnPage,
        maxScrollDepth: this.maxScrollDepth,
        totalInteractions: this.events.length,
        sections: [...new Set(this.userJourney.map(j => j.section))]
      }
    };

    try {
      if (navigator.onLine && navigator.sendBeacon) {
        navigator.sendBeacon('/api/analytics/batch', JSON.stringify(batchData));
      }
    } catch (error) {
      logger.warn('Batch send failed:', error);
    }
  }

  // Get analytics summary
  getAnalyticsSummary() {
    const uniqueSections = [...new Set(this.userJourney.map(j => j.section))];
    const clickEvents = this.events.filter(e => e.name === 'click');
    const formEvents = this.events.filter(e => e.name === 'form_interaction');

    return {
      sessionId: this.sessionId,
      userId: this.userId,
      timeOnPage: Date.now() - this.pageLoaded,
      scrollDepth: this.scrollDepth,
      maxScrollDepth: this.maxScrollDepth,
      totalEvents: this.events.length,
      clicks: clickEvents.length,
      formInteractions: formEvents.length,
      sectionsViewed: uniqueSections.length,
      sections: uniqueSections,
      heatmapPoints: this.heatmapData.length,
      performance: this.performance
    };
  }

  // Generate heatmap visualization data
  getHeatmapData() {
    return this.heatmapData.map(point => ({
      x: point.x,
      y: point.y,
      intensity: point.type === 'click' ? 1 : 0.3
    }));
  }

  // Get user journey data
  getUserJourneyData() {
    return this.userJourney.map((step, index) => ({
      step: index + 1,
      section: step.section,
      timeFromStart: step.timeFromStart,
      timestamp: step.timestamp
    }));
  }

  // Privacy controls
  enableTracking() {
    this.isTracking = true;
    localStorage.setItem('analytics_enabled', 'true');
  }

  disableTracking() {
    this.isTracking = false;
    localStorage.setItem('analytics_enabled', 'false');
    this.clearLocalData();
  }

  clearLocalData() {
    localStorage.removeItem('analytics_events');
    localStorage.removeItem('analytics_user_id');
    this.events = [];
    this.heatmapData = [];
    this.userJourney = [];
  }
}

// Create global instance
const advancedAnalytics = new AdvancedAnalytics();

// Auto-initialize
if (typeof window !== 'undefined') {
  // Check if tracking is enabled
  const trackingEnabled = localStorage.getItem('analytics_enabled');
  if (trackingEnabled === null || trackingEnabled === 'true') {
    document.addEventListener('DOMContentLoaded', () => {
      advancedAnalytics.init();
    });
  }
}

export default advancedAnalytics;
export { AdvancedAnalytics };

export { AdvancedAnalytics };
