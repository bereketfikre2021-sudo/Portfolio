// Advanced caching strategies for improved performance
import logger from './logger.js';

class AdvancedCache {
  constructor() {
    this.cache = new Map();
    this.memoryCache = new Map();
    this.indexedDBCache = null;
    this.cacheVersion = '1.0.0';
    this.maxMemorySize = 50 * 1024 * 1024; // 50MB
    this.maxMemoryItems = 100;
    this.ttl = 24 * 60 * 60 * 1000; // 24 hours
  }

  // Initialize IndexedDB for persistent caching
  async initIndexedDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('PortfolioCache', 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.indexedDBCache = request.result;
        resolve(this.indexedDBCache);
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // Create object stores for different types of data
        if (!db.objectStoreNames.contains('apiResponses')) {
          const apiStore = db.createObjectStore('apiResponses', { keyPath: 'key' });
          apiStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
        
        if (!db.objectStoreNames.contains('images')) {
          const imageStore = db.createObjectStore('images', { keyPath: 'url' });
          imageStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
        
        if (!db.objectStoreNames.contains('components')) {
          const componentStore = db.createObjectStore('components', { keyPath: 'name' });
          componentStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
    });
  }

  // Memory cache with LRU eviction
  setMemoryCache(key, value, ttl = this.ttl) {
    const item = {
      value,
      timestamp: Date.now(),
      ttl,
      accessCount: 0,
      lastAccessed: Date.now()
    };

    // Check if we need to evict items
    if (this.memoryCache.size >= this.maxMemoryItems) {
      this.evictLRU();
    }

    this.memoryCache.set(key, item);
  }

  getMemoryCache(key) {
    const item = this.memoryCache.get(key);
    
    if (!item) return null;
    
    // Check if expired
    if (Date.now() - item.timestamp > item.ttl) {
      this.memoryCache.delete(key);
      return null;
    }
    
    // Update access info
    item.accessCount++;
    item.lastAccessed = Date.now();
    
    return item.value;
  }

  // LRU eviction strategy
  evictLRU() {
    let oldestKey = null;
    let oldestTime = Date.now();
    
    for (const [key, item] of this.memoryCache.entries()) {
      if (item.lastAccessed < oldestTime) {
        oldestTime = item.lastAccessed;
        oldestKey = key;
      }
    }
    
    if (oldestKey) {
      this.memoryCache.delete(oldestKey);
    }
  }

  // IndexedDB persistent cache
  async setPersistentCache(storeName, key, value, ttl = this.ttl) {
    if (!this.indexedDBCache) {
      await this.initIndexedDB();
    }

    const transaction = this.indexedDBCache.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    
    const item = {
      key,
      value,
      timestamp: Date.now(),
      ttl,
      version: this.cacheVersion
    };

    return new Promise((resolve, reject) => {
      const request = store.put(item);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getPersistentCache(storeName, key) {
    if (!this.indexedDBCache) {
      await this.initIndexedDB();
    }

    const transaction = this.indexedDBCache.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.get(key);
      request.onsuccess = () => {
        const item = request.result;
        
        if (!item) {
          resolve(null);
          return;
        }
        
        // Check if expired
        if (Date.now() - item.timestamp > item.ttl) {
          // Delete expired item
          this.deletePersistentCache(storeName, key);
          resolve(null);
          return;
        }
        
        resolve(item.value);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async deletePersistentCache(storeName, key) {
    if (!this.indexedDBCache) return;

    const transaction = this.indexedDBCache.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.delete(key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Cache API responses
  async cacheAPIResponse(url, response, ttl = this.ttl) {
    const key = this.generateCacheKey(url);
    
    // Store in memory cache for immediate access
    this.setMemoryCache(key, response, ttl);
    
    // Store in persistent cache for offline access
    try {
      await this.setPersistentCache('apiResponses', key, response, ttl);
    } catch (error) {
      logger.warn('Failed to cache API response:', error);
    }
  }

  async getCachedAPIResponse(url) {
    const key = this.generateCacheKey(url);
    
    // Try memory cache first
    let response = this.getMemoryCache(key);
    
    if (response) {
      return response;
    }
    
    // Try persistent cache
    try {
      response = await this.getPersistentCache('apiResponses', key);
      if (response) {
        // Store back in memory cache
        this.setMemoryCache(key, response);
        return response;
      }
    } catch (error) {
      logger.warn('Failed to get cached API response:', error);
    }
    
    return null;
  }

  // Cache images
  async cacheImage(url, blob) {
    const key = this.generateCacheKey(url);
    
    // Store in memory cache
    this.setMemoryCache(key, blob);
    
    // Store in persistent cache
    try {
      await this.setPersistentCache('images', key, blob);
    } catch (error) {
      logger.warn('Failed to cache image:', error);
    }
  }

  async getCachedImage(url) {
    const key = this.generateCacheKey(url);
    
    // Try memory cache first
    let blob = this.getMemoryCache(key);
    
    if (blob) {
      return blob;
    }
    
    // Try persistent cache
    try {
      blob = await this.getPersistentCache('images', key);
      if (blob) {
        // Store back in memory cache
        this.setMemoryCache(key, blob);
        return blob;
      }
    } catch (error) {
      logger.warn('Failed to get cached image:', error);
    }
    
    return null;
  }

  // Cache component data
  async cacheComponentData(componentName, data, ttl = this.ttl) {
    const key = this.generateCacheKey(componentName);
    
    // Store in memory cache
    this.setMemoryCache(key, data, ttl);
    
    // Store in persistent cache
    try {
      await this.setPersistentCache('components', key, data, ttl);
    } catch (error) {
      logger.warn('Failed to cache component data:', error);
    }
  }

  async getCachedComponentData(componentName) {
    const key = this.generateCacheKey(componentName);
    
    // Try memory cache first
    let data = this.getMemoryCache(key);
    
    if (data) {
      return data;
    }
    
    // Try persistent cache
    try {
      data = await this.getPersistentCache('components', key);
      if (data) {
        // Store back in memory cache
        this.setMemoryCache(key, data);
        return data;
      }
    } catch (error) {
      logger.warn('Failed to get cached component data:', error);
    }
    
    return null;
  }

  // Generate cache key
  generateCacheKey(input) {
    if (typeof input === 'string') {
      return btoa(input).replace(/[^a-zA-Z0-9]/g, '');
    }
    return btoa(JSON.stringify(input)).replace(/[^a-zA-Z0-9]/g, '');
  }

  // Clear expired cache entries
  async clearExpiredCache() {
    const now = Date.now();
    
    // Clear expired memory cache
    for (const [key, item] of this.memoryCache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.memoryCache.delete(key);
      }
    }
    
    // Clear expired persistent cache
    if (this.indexedDBCache) {
      const stores = ['apiResponses', 'images', 'components'];
      
      for (const storeName of stores) {
        const transaction = this.indexedDBCache.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const index = store.index('timestamp');
        
        const range = IDBKeyRange.upperBound(now - this.ttl);
        const request = index.openCursor(range);
        
        request.onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor) {
            cursor.delete();
            cursor.continue();
          }
        };
      }
    }
  }

  // Clear all cache
  async clearAllCache() {
    // Clear memory cache
    this.memoryCache.clear();
    
    // Clear persistent cache
    if (this.indexedDBCache) {
      const stores = ['apiResponses', 'images', 'components'];
      
      for (const storeName of stores) {
        const transaction = this.indexedDBCache.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        store.clear();
      }
    }
  }

  // Get cache statistics
  getCacheStats() {
    return {
      memoryCacheSize: this.memoryCache.size,
      memoryCacheItems: Array.from(this.memoryCache.keys()),
      totalMemoryUsage: this.calculateMemoryUsage(),
      cacheVersion: this.cacheVersion
    };
  }

  // Calculate memory usage
  calculateMemoryUsage() {
    let totalSize = 0;
    
    for (const [key, item] of this.memoryCache.entries()) {
      totalSize += key.length * 2; // Unicode characters
      totalSize += JSON.stringify(item.value).length * 2;
      totalSize += 24; // Object overhead
    }
    
    return totalSize;
  }

  // Initialize cache with cleanup
  async init() {
    try {
      await this.initIndexedDB();
      await this.clearExpiredCache();
      
      // Set up periodic cleanup
      setInterval(() => {
        this.clearExpiredCache();
      }, 60 * 60 * 1000); // Every hour
      
      logger.log('🗄️ Advanced cache initialized');
    } catch (error) {
      logger.error('Failed to initialize cache:', error);
    }
  }
}

// Create global instance
const advancedCache = new AdvancedCache();

// Auto-initialize
if (typeof window !== 'undefined') {
  advancedCache.init();
}

export default advancedCache;
export { AdvancedCache };

export { AdvancedCache };
