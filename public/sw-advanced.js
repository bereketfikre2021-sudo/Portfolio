// Advanced Service Worker DISABLED FOR TEST APP
console.log('Advanced Service Worker DISABLED - Test app mode');

// Immediately unregister and skip waiting
self.addEventListener('install', (event) => {
  console.log('Advanced Service Worker install - DISABLED');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Advanced Service Worker activate - DISABLED');
  event.waitUntil(self.clients.claim());
});

// Disable all fetch events
self.addEventListener('fetch', (event) => {
  // Do nothing - let browser handle all requests normally
  return;
});