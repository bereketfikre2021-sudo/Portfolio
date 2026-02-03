import React, { useEffect } from 'react';
import { ModalProvider } from './context/ModalContext';
import { ScrollProvider } from './context/ScrollContext';
import ErrorBoundary from './components/ErrorBoundary';
import AppContent from './components/AppContent';

function App() {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
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
