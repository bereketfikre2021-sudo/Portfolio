// Bundle analysis utilities for development and production
import logger from './logger.js';

class BundleAnalyzer {
  constructor() {
    this.metrics = {
      loadTime: 0,
      resourceCount: 0,
      totalSize: 0,
      jsSize: 0,
      cssSize: 0,
      imageSize: 0,
      fontSize: 0,
      chunks: []
    };
  }

  // Analyze current page resources
  analyzeResources() {
    const resources = performance.getEntriesByType('resource');
    const navigation = performance.getEntriesByType('navigation')[0];
    
    this.metrics.loadTime = navigation ? navigation.loadEventEnd - navigation.fetchStart : 0;
    this.metrics.resourceCount = resources.length;
    
    let totalSize = 0;
    let jsSize = 0;
    let cssSize = 0;
    let imageSize = 0;
    let fontSize = 0;
    
    resources.forEach(resource => {
      const size = resource.transferSize || 0;
      totalSize += size;
      
      if (resource.name.includes('.js')) {
        jsSize += size;
      } else if (resource.name.includes('.css')) {
        cssSize += size;
      } else if (resource.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
        imageSize += size;
      } else if (resource.name.match(/\.(woff|woff2|ttf|otf)$/i)) {
        fontSize += size;
      }
    });
    
    this.metrics.totalSize = totalSize;
    this.metrics.jsSize = jsSize;
    this.metrics.cssSize = cssSize;
    this.metrics.imageSize = imageSize;
    this.metrics.fontSize = fontSize;
    
    return this.metrics;
  }

  // Analyze JavaScript chunks
  analyzeChunks() {
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const chunks = [];
    
    scripts.forEach(script => {
      const src = script.src;
      const size = this.getResourceSize(src);
      
      chunks.push({
        name: this.extractChunkName(src),
        src,
        size,
        type: 'js'
      });
    });
    
    this.metrics.chunks = chunks;
    return chunks;
  }

  // Get resource size (approximate)
  getResourceSize(url) {
    const resource = performance.getEntriesByName(url)[0];
    return resource ? resource.transferSize : 0;
  }

  // Extract chunk name from URL
  extractChunkName(url) {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    return filename.split('-')[0] || 'unknown';
  }

  // Generate performance report
  generateReport() {
    this.analyzeResources();
    this.analyzeChunks();
    
    const report = {
      ...this.metrics,
      recommendations: this.getRecommendations(),
      score: this.calculateScore()
    };
    
    return report;
  }

  // Calculate performance score
  calculateScore() {
    let score = 100;
    
    // Deduct points for large bundle size
    if (this.metrics.jsSize > 500000) score -= 20; // 500KB
    if (this.metrics.jsSize > 1000000) score -= 30; // 1MB
    
    // Deduct points for too many resources
    if (this.metrics.resourceCount > 50) score -= 10;
    if (this.metrics.resourceCount > 100) score -= 20;
    
    // Deduct points for slow load time
    if (this.metrics.loadTime > 3000) score -= 15;
    if (this.metrics.loadTime > 5000) score -= 25;
    
    return Math.max(0, score);
  }

  // Get optimization recommendations
  getRecommendations() {
    const recommendations = [];
    
    if (this.metrics.jsSize > 500000) {
      recommendations.push('Consider code splitting to reduce JavaScript bundle size');
    }
    
    if (this.metrics.resourceCount > 50) {
      recommendations.push('Reduce number of HTTP requests by combining resources');
    }
    
    if (this.metrics.loadTime > 3000) {
      recommendations.push('Optimize loading performance with lazy loading and preloading');
    }
    
    if (this.metrics.imageSize > this.metrics.jsSize) {
      recommendations.push('Optimize images and consider using WebP format');
    }
    
    if (this.metrics.chunks.length > 10) {
      recommendations.push('Consider consolidating small chunks to reduce HTTP requests');
    }
    
    return recommendations;
  }

  // Log report to console
  logReport() {
    const report = this.generateReport();
    
    logger.log('📊 Bundle Analysis Report');
    logger.log('Load Time:', `${report.loadTime}ms`);
    logger.log('Total Size:', this.formatBytes(report.totalSize));
    logger.log('JavaScript:', this.formatBytes(report.jsSize));
    logger.log('CSS:', this.formatBytes(report.cssSize));
    logger.log('Images:', this.formatBytes(report.imageSize));
    logger.log('Fonts:', this.formatBytes(report.fontSize));
    logger.log('Resources:', report.resourceCount);
    logger.log('Performance Score:', `${report.score}/100`);
    
    if (report.recommendations.length > 0) {
      logger.log('💡 Recommendations');
      report.recommendations.forEach(rec => logger.log('•', rec));
    }
    
    return report;
  }

  // Format bytes to human readable format
  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Monitor bundle size changes
  startMonitoring(interval = 30000) {
    setInterval(() => {
      this.logReport();
    }, interval);
  }
}

// Create global instance
const bundleAnalyzer = new BundleAnalyzer();

// Auto-analyze on page load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      bundleAnalyzer.logReport();
    }, 1000);
  });
}

export default bundleAnalyzer;
export { BundleAnalyzer };
