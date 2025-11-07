import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone, Monitor, Wifi, WifiOff } from 'lucide-react';
import logger from '../utils/logger';

const PWAInstaller = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || 
        window.navigator.standalone === true) {
      setIsInstalled(true);
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Show install prompt immediately if not dismissed
      if (!localStorage.getItem('pwa-install-dismissed')) {
        setShowInstallPrompt(true);
      }
    };

    // Show install prompt after a short delay if not dismissed and no deferredPrompt
    const timer = setTimeout(() => {
      if (!localStorage.getItem('pwa-install-dismissed') && !deferredPrompt) {
        setShowInstallPrompt(true);
      }
    }, 5000); // Show after 5 seconds

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    // Listen for online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstallClick = async () => {
    try {
      if (deferredPrompt) {
        // Use the browser's install prompt
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
          logger.log('PWA installation accepted');
          setIsInstalled(true);
        } else {
          logger.log('PWA installation dismissed');
        }
        
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
      } else {
        // Check if we can trigger install manually
        if ('serviceWorker' in navigator && 'PushManager' in window) {
          // Try to trigger install prompt
          const installEvent = new Event('beforeinstallprompt');
          window.dispatchEvent(installEvent);
          
          // If that doesn't work, show instructions
          setTimeout(() => {
            if (!deferredPrompt) {
              showInstallInstructions();
            }
          }, 1000);
        } else {
          showInstallInstructions();
        }
      }
    } catch (error) {
      logger.error('Install error:', error);
      showInstallInstructions();
    }
  };

  const showInstallInstructions = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    let instructions = '';
    
    if (userAgent.includes('chrome') || userAgent.includes('edge')) {
      instructions = 'Chrome/Edge: Look for the install icon (⊕) in the address bar and click it, or go to Menu > Install App';
    } else if (userAgent.includes('safari')) {
      instructions = 'Safari: Tap the Share button (□↗) and select "Add to Home Screen"';
    } else if (userAgent.includes('firefox')) {
      instructions = 'Firefox: Look for the install icon in the address bar or go to Menu > Install';
    } else {
      instructions = 'Look for an install option in your browser menu or address bar';
    }
    
    alert(`To install this app:\n\n${instructions}\n\nThis will add the app to your home screen or desktop for quick access.`);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Don't show any floating install buttons - install is now in Tools dropdown
  return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50"
      >
        <div className="bg-primary/95 backdrop-blur-sm border border-accent/20 rounded-2xl p-4 shadow-2xl">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
              <Download className="w-6 h-6 text-accent" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-light mb-1">
                Install App
              </h3>
              <p className="text-sm text-accent/80 mb-3">
                Install this website as an app for quick access and offline functionality.
              </p>
              
              <div className="flex gap-2">
                <button
                  onClick={handleInstallClick}
                  className="flex-1 bg-accent text-primary px-4 py-2 rounded-lg font-semibold hover:bg-accent/90 transition-colors text-sm"
                >
                  Install
                </button>
                <button
                  onClick={handleDismiss}
                  className="px-4 py-2 text-accent/80 hover:text-accent transition-colors text-sm"
                >
                  Later
                </button>
              </div>
            </div>
            
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 p-1 hover:bg-accent/10 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-accent/60" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Offline indicator component
export const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="bg-red-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
        <WifiOff className="w-4 h-4" />
        <span className="text-sm font-medium">You're offline</span>
      </div>
    </motion.div>
  );
};

// Service Worker registration
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          logger.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          logger.log('SW registration failed: ', registrationError);
        });
    });
  }
};

export default PWAInstaller;

