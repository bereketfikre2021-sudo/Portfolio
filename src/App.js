import React, { useEffect } from 'react';
import { ModalProvider } from './context/ModalContext';
import ErrorBoundary from './components/ErrorBoundary';
import AppContent from './components/AppContent';

function App() {
  // Performance optimization: Register service worker (images already preloaded in index.html)
  useEffect(() => {
    // Register service worker for PWA (if available) - deferred to not block initial render
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      // Use requestIdleCallback for non-critical work, fallback to setTimeout
      const registerSW = () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            if (process.env.NODE_ENV === 'development') {
              console.log('SW registered: ', registration);
            }
          })
          .catch(() => {
            // Silently fail - service worker is optional
          });
      };
      
      if ('requestIdleCallback' in window) {
        requestIdleCallback(registerSW, { timeout: 2000 });
      } else {
        setTimeout(registerSW, 2000);
      }
    }
  }, []);

  return (
    <ErrorBoundary>
      <ModalProvider>
        <AppContent />
      </ModalProvider>
    </ErrorBoundary>
  );
}

export default App;
