// Service Worker for Bereket Fikre Portfolio
// Version 1.0.1 - Network-first for HTML to prevent stale asset references after deploys
const CACHE_NAME = 'bereket-fikre-portfolio-v1.0.1';
const RUNTIME_CACHE = 'runtime-cache-v1';

// Assets to precache (exclude index.html - use network-first so deploys work)
const PRECACHE_ASSETS = [
  '/assets/Bereket-Fikre-1.webp',
  '/assets/Logo.svg',
  '/manifest.json'
];

// Install event - cache static assets only (not HTML)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE)
          .map((cacheName) => caches.delete(cacheName))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - network-first for HTML, cache-first for hashed assets
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  const isHtmlRequest = event.request.mode === 'navigate' ||
    event.request.destination === 'document' ||
    event.request.url.endsWith('/') ||
    event.request.url.endsWith('.html');

  // HTML: network-first so users always get fresh index.html with correct asset hashes
  if (isHtmlRequest) {
    event.respondWith(
      fetch(event.request)
        .then((response) => response)
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Static assets: cache-first (hashed URLs change on deploy, so safe)
  event.respondWith(
    caches.match(event.request)
      .then((cached) => cached || fetch(event.request)
        .then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            const clone = response.clone();
            if (event.request.url.includes('/assets/') || event.request.url.includes('/static/')) {
              caches.open(RUNTIME_CACHE).then((cache) => cache.put(event.request, clone));
            }
          }
          return response;
        }))
  );
});






