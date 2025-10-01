import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, BellOff, Download, Share, Wifi, WifiOff, Settings, CheckCircle, AlertCircle, Info, X, RefreshCw } from 'lucide-react';

const AdvancedPWA = ({ isOpen, onClose }) => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState('default');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showNotificationPrompt, setShowNotificationPrompt] = useState(false);
  const [backgroundSyncSupported, setBackgroundSyncSupported] = useState(false);
  const [pushSubscription, setPushSubscription] = useState(null);

  useEffect(() => {
    // Check if app is installed
    if (window.matchMedia('(display-mode: standalone)').matches || 
        window.navigator.standalone === true) {
      setIsInstalled(true);
    }

    // Check notification permission
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }

    // Check background sync support
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      setBackgroundSyncSupported(true);
    }

    // Listen for online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      
      if (permission === 'granted') {
        // Subscribe to push notifications
        await subscribeToPushNotifications();
        setShowNotificationPrompt(false);
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const subscribeToPushNotifications = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'YOUR_VAPID_PUBLIC_KEY' // Replace with your VAPID key
      });
      
      setPushSubscription(subscription);
      
      // Send subscription to your server
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
      });
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
    }
  };

  const sendTestNotification = () => {
    if (notificationPermission === 'granted') {
      new Notification('Test Notification', {
        body: 'This is a test notification from your portfolio!',
        icon: '/favicon-192x192.png',
        badge: '/favicon-192x192.png',
        tag: 'test-notification',
        requireInteraction: true,
        actions: [
          {
            action: 'view',
            title: 'View Portfolio'
          },
          {
            action: 'dismiss',
            title: 'Dismiss'
          }
        ]
      });
    }
  };

  const shareContent = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Bereket Fikre - Creative Designer',
          text: 'Check out this amazing creative designer portfolio!',
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const installApp = async () => {
    if (window.deferredPrompt) {
      window.deferredPrompt.prompt();
      const { outcome } = await window.deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      
      window.deferredPrompt = null;
    }
  };

  const syncOfflineData = async () => {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      try {
        const registration = await navigator.serviceWorker.ready;
        await registration.sync.register('offline-data-sync');
        console.log('Background sync registered');
      } catch (error) {
        console.error('Background sync failed:', error);
      }
    }
  };

  return (
    <>
      {/* PWA Status Indicator */}
      <div className="fixed top-20 right-4 z-40">
        <AnimatePresence>
          {!isOnline && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-red-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
            >
              <WifiOff className="w-4 h-4" />
              <span className="text-sm font-medium">You're offline</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Install button disabled - now available in Tools dropdown */}
        {false && isOnline && !isInstalled && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-accent/90 backdrop-blur-sm text-primary px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Install App</span>
            <button
              onClick={installApp}
              className="ml-2 px-2 py-1 bg-primary/20 rounded text-xs hover:bg-primary/30 transition-colors"
            >
              Install
            </button>
          </motion.div>
        )}
      </div>

      {/* Compact Notification Permission Prompt */}
      <AnimatePresence>
        {showNotificationPrompt && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-20 right-4 z-50 w-64 bg-primary/95 backdrop-blur-sm border border-accent/20 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-3">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center">
                  <Bell className="w-3 h-3 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-light mb-1">Stay Updated</h3>
                  <p className="text-xs text-accent/80 mb-3">
                    Get notified about new content.
                  </p>
                  <div className="flex gap-1">
                    <Button
                      onClick={requestNotificationPermission}
                      className="bg-accent text-primary hover:bg-accent/90 text-xs py-1"
                      size="sm"
                    >
                      Enable
                    </Button>
                    <Button
                      onClick={() => setShowNotificationPrompt(false)}
                      variant="outline"
                      className="border-accent/30 text-accent hover:bg-accent/10 text-xs py-1"
                      size="sm"
                    >
                      Later
                    </Button>
                  </div>
                </div>
                <button
                  onClick={() => setShowNotificationPrompt(false)}
                  className="p-1 hover:bg-accent/10 rounded-full transition-colors"
                >
                  <X className="w-3 h-3 text-accent/60" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PWA Features Panel */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed bottom-4 right-4 z-40">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="w-56 bg-primary/95 backdrop-blur-sm border border-accent/20 rounded-xl shadow-lg overflow-hidden"
            >
          <div className="p-3 border-b border-accent/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-full flex items-center justify-center">
                  <Settings className="w-3 h-3 text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-light">PWA Features</h3>
                  <p className="text-xs text-accent/60">Advanced</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-accent/10 rounded-full transition-colors"
              >
                <X className="w-3 h-3 text-accent/60" />
              </button>
            </div>
          </div>

          <div className="p-3 space-y-2">
            {/* Compact Status Items */}
            <div className="flex items-center justify-between p-2 bg-primary/30 rounded text-xs">
              <div className="flex items-center gap-2">
                <Download className="w-3 h-3 text-accent" />
                <span className="text-light">App</span>
              </div>
              <Badge className={isInstalled ? 'bg-green-500/20 text-green-400 text-xs' : 'bg-yellow-500/20 text-yellow-400 text-xs'}>
                {isInstalled ? '✓' : '○'}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-2 bg-primary/30 rounded text-xs">
              <div className="flex items-center gap-2">
                {notificationPermission === 'granted' ? (
                  <Bell className="w-3 h-3 text-green-400" />
                ) : (
                  <BellOff className="w-3 h-3 text-accent" />
                )}
                <span className="text-light">Notifications</span>
              </div>
              <Badge className={
                notificationPermission === 'granted' 
                  ? 'bg-green-500/20 text-green-400 text-xs' 
                  : notificationPermission === 'denied'
                  ? 'bg-red-500/20 text-red-400 text-xs'
                  : 'bg-yellow-500/20 text-yellow-400 text-xs'
              }>
                {notificationPermission === 'granted' ? '✓' : 
                 notificationPermission === 'denied' ? '✗' : '○'}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-2 bg-primary/30 rounded text-xs">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-3 h-3 text-accent" />
                <span className="text-light">Sync</span>
              </div>
              <Badge className={backgroundSyncSupported ? 'bg-green-500/20 text-green-400 text-xs' : 'bg-red-500/20 text-red-400 text-xs'}>
                {backgroundSyncSupported ? '✓' : '✗'}
              </Badge>
            </div>

            {/* Compact Action Buttons */}
            <div className="space-y-1 pt-1">
              {notificationPermission !== 'granted' && (
                <Button
                  onClick={() => setShowNotificationPrompt(true)}
                  className="w-full bg-accent/20 text-accent hover:bg-accent/30 border border-accent/30 text-xs py-1"
                  size="sm"
                >
                  <Bell className="w-3 h-3 mr-1" />
                  Enable
                </Button>
              )}

              <Button
                onClick={shareContent}
                className="w-full bg-secondary/20 text-accent hover:bg-secondary/30 border border-secondary/30 text-xs py-1"
                size="sm"
              >
                <Share className="w-3 h-3 mr-1" />
                Share
              </Button>
            </div>
          </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

// Enhanced service worker with advanced features
export const registerAdvancedServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw-advanced.js')
        .then((registration) => {
          console.log('Advanced SW registered: ', registration);
          
          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available, show update notification
                showUpdateNotification();
              }
            });
          });
        })
        .catch((registrationError) => {
          console.log('Advanced SW registration failed: ', registrationError);
        });
    });
  }
};

const showUpdateNotification = () => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Portfolio Updated', {
      body: 'New content is available. Refresh to see the latest updates!',
      icon: '/favicon-192x192.png',
      tag: 'update-notification',
      requireInteraction: true,
      actions: [
        {
          action: 'refresh',
          title: 'Refresh Now'
        },
        {
          action: 'dismiss',
          title: 'Later'
        }
      ]
    });
  }
};

export default AdvancedPWA;
