// Service Worker for Bereket Fikre Portfolio
// Skip service worker in development mode
const isDevelopment = self.location.hostname === 'localhost' || 
                      self.location.hostname === '127.0.0.1' ||
                      (self.location.port !== '' && self.location.port !== '443' && self.location.port !== '80');

if (isDevelopment) {
  // In development, immediately unregister and skip all functionality
  self.addEventListener('install', (event) => {
    event.waitUntil(
      self.skipWaiting().then(() => {
        return self.registration.unregister();
      })
    );
  });
  self.addEventListener('activate', (event) => {
    event.waitUntil(
      self.clients.claim().then(() => {
        return self.registration.unregister();
      })
    );
  });
  // Don't intercept any fetches in development
  self.addEventListener('fetch', () => {
    return; // Let all requests pass through
  });
} else {
  // Production service worker
  const CACHE_NAME = 'bereket-fikre-v1';
  const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/favicon.ico',
    '/favicon.svg',
    '/favicon-16x16.png',
    '/favicon-32x32.png',
    '/apple-touch-icon.png',
    '/android-chrome-192x192.png',
    '/android-chrome-512x512.png'
  ];

  // Install event - cache resources
  self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => {
          console.log('Opened cache');
          return cache.addAll(urlsToCache);
        })
        .then(() => {
          console.log('Service Worker installed');
          return self.skipWaiting();
        })
        .catch((error) => {
          console.log('Service Worker install failed:', error);
          return self.skipWaiting();
        })
    );
  });

  // Activate event - clean up old caches
  self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }).then(() => {
        console.log('Service Worker activated');
        return self.clients.claim();
      })
      .catch((error) => {
        console.log('Service Worker activate failed:', error);
        return self.clients.claim();
      })
    );
  });

  // Fetch event - serve from cache, fallback to network
  self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    
    // Skip service worker for development files (Vite dev server)
    if (url.pathname.startsWith('/src/') || 
        url.pathname.includes('node_modules') ||
        url.hostname === 'localhost' && url.port !== '443' && url.port !== '80') {
      // In development, let requests pass through without interception
      return;
    }
    
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
      return;
    }
    
    // Skip external requests (cross-origin)
    if (url.origin !== location.origin) {
      return;
    }
    
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          // Return cached version or fetch from network
          if (response) {
            return response;
          }
          
          // Fetch from network with error handling
          return fetch(event.request).catch((error) => {
            console.log('Fetch failed for:', event.request.url, error);
            // Return a basic response for failed requests
            return new Response('Network error', {
              status: 408,
              statusText: 'Request Timeout'
            });
          });
        })
    );
  });
} // Close the else block for production service worker

// Handle push notifications (for future use)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/android-chrome-192x192.png',
      badge: '/favicon-32x32.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});