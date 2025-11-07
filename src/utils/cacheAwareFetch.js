// Cache-aware fetch utility with advanced caching strategies
import advancedCache from './advancedCache';
import logger from './logger.js';

class CacheAwareFetch {
  constructor() {
    this.requestQueue = new Map();
    this.retryAttempts = 3;
    this.retryDelay = 1000;
  }

  // Main fetch method with caching
  async fetch(url, options = {}) {
    const {
      cache = 'default',
      ttl = 24 * 60 * 60 * 1000, // 24 hours
      retry = true,
      timeout = 10000,
      ...fetchOptions
    } = options;

    // Check cache first
    if (cache !== 'no-cache') {
      const cachedResponse = await advancedCache.getCachedAPIResponse(url);
      if (cachedResponse) {
        return this.createResponseFromCache(cachedResponse);
      }
    }

    // Check if request is already in progress
    if (this.requestQueue.has(url)) {
      return this.requestQueue.get(url);
    }

    // Create fetch promise
    const fetchPromise = this.performFetch(url, fetchOptions, timeout, retry);
    this.requestQueue.set(url, fetchPromise);

    try {
      const response = await fetchPromise;
      
      // Cache successful responses
      if (response.ok && cache !== 'no-cache') {
        const responseData = await response.clone().json().catch(() => response.clone().text());
        await advancedCache.cacheAPIResponse(url, responseData, ttl);
      }
      
      return response;
    } finally {
      this.requestQueue.delete(url);
    }
  }

  // Perform actual fetch with retry logic
  async performFetch(url, options, timeout, retry) {
    let lastError;
    
    for (let attempt = 0; attempt < (retry ? this.retryAttempts : 1); attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        
        const response = await fetch(url, {
          ...options,
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        return response;
      } catch (error) {
        lastError = error;
        
        if (attempt < this.retryAttempts - 1) {
          await this.delay(this.retryDelay * Math.pow(2, attempt));
        }
      }
    }
    
    throw lastError;
  }

  // Create response from cached data
  createResponseFromCache(data) {
    return new Response(JSON.stringify(data), {
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-Type': 'application/json',
        'X-Cache': 'HIT'
      }
    });
  }

  // Delay utility
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Fetch with offline fallback
  async fetchWithOfflineFallback(url, options = {}) {
    try {
      return await this.fetch(url, options);
    } catch (error) {
      if (!navigator.onLine) {
        // Try to get cached data when offline
        const cachedData = await advancedCache.getCachedAPIResponse(url);
        if (cachedData) {
          return this.createResponseFromCache(cachedData);
        }
      }
      throw error;
    }
  }

  // Batch fetch multiple URLs
  async batchFetch(urls, options = {}) {
    const promises = urls.map(url => this.fetch(url, options));
    return Promise.allSettled(promises);
  }

  // Prefetch resources
  async prefetch(urls, options = {}) {
    const prefetchOptions = {
      ...options,
      cache: 'force-cache',
      priority: 'low'
    };
    
    const promises = urls.map(url => this.fetch(url, prefetchOptions));
    return Promise.allSettled(promises);
  }

  // Fetch with background sync
  async fetchWithBackgroundSync(url, options = {}) {
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        await registration.sync.register('background-fetch');
        
        // Store request for background sync
        await this.storeBackgroundRequest(url, options);
        
        // Try immediate fetch
        return await this.fetch(url, options);
      } catch (error) {
        logger.warn('Background sync failed, falling back to regular fetch:', error);
        return await this.fetch(url, options);
      }
    }
    
    return await this.fetch(url, options);
  }

  // Store request for background sync
  async storeBackgroundRequest(url, options) {
    const request = {
      url,
      options,
      timestamp: Date.now(),
      retryCount: 0
    };
    
    // Store in IndexedDB for background sync
    try {
      await advancedCache.setPersistentCache('backgroundRequests', url, request);
    } catch (error) {
      logger.warn('Failed to store background request:', error);
    }
  }

  // Get cached image with fallback
  async getCachedImage(url) {
    // Try to get from cache first
    const cachedBlob = await advancedCache.getCachedImage(url);
    if (cachedBlob) {
      return URL.createObjectURL(cachedBlob);
    }
    
    // Fetch and cache image
    try {
      const response = await this.fetch(url, { cache: 'force-cache' });
      const blob = await response.blob();
      
      // Cache the image
      await advancedCache.cacheImage(url, blob);
      
      return URL.createObjectURL(blob);
    } catch (error) {
      logger.error('Failed to fetch image:', error);
      return null;
    }
  }

  // Clear cache for specific URL
  async clearCache(url) {
    const key = advancedCache.generateCacheKey(url);
    
    // Clear from memory cache
    advancedCache.memoryCache.delete(key);
    
    // Clear from persistent cache
    try {
      await advancedCache.deletePersistentCache('apiResponses', key);
    } catch (error) {
      logger.warn('Failed to clear persistent cache:', error);
    }
  }

  // Get cache statistics
  getCacheStats() {
    return advancedCache.getCacheStats();
  }
}

// Create global instance
const cacheAwareFetch = new CacheAwareFetch();

// Export both class and instance
export default cacheAwareFetch;
export { CacheAwareFetch };

