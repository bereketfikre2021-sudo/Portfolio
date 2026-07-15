import React, { useEffect } from 'react';
import { ModalProvider } from './context/ModalContext';
import { ScrollProvider } from './context/ScrollContext';
import ErrorBoundary from './components/ErrorBoundary';
import AppContent from './components/AppContent';
import { initGoogleAnalytics } from './utils/analytics';
import { usePageTracking } from './hooks/usePageTracking';

function App() {
  // Initialise GA4 once on mount (production only, no-op otherwise)
  useEffect(() => {
    initGoogleAnalytics();
  }, []);

  // Track page views on every navigation
  usePageTracking();

  useEffect(() => {
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      const registerSW = () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
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
      <ScrollProvider>
        <ModalProvider>
          <AppContent />
        </ModalProvider>
      </ScrollProvider>
    </ErrorBoundary>
  );
}

export default App;
