import React, { useCallback, useEffect, useState } from 'react';

const DISMISS_KEY = 'pwa-install-dismissed';

function isStandaloneMode() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  );
}

function isIosSafari() {
  const ua = window.navigator.userAgent;
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS|Chrome|CriOS/.test(ua);
  return isIOS && isSafari;
}

const PwaInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [delayElapsed, setDelayElapsed] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [installed, setInstalled] = useState(false);

  const isStandalone = isStandaloneMode();
  const isIos = isIosSafari();
  const canPrompt = Boolean(deferredPrompt);
  const showBanner =
    delayElapsed &&
    !isStandalone &&
    !dismissed &&
    !installed &&
    (canPrompt || isIos);

  useEffect(() => {
    if (isStandaloneMode()) return undefined;

    if (sessionStorage.getItem(DISMISS_KEY) === '1') {
      setDismissed(true);
      return undefined;
    }

    const delayTimer = window.setTimeout(() => setDelayElapsed(true), 2000);

    const onBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const onAppInstalled = () => {
      setInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onAppInstalled);

    return () => {
      window.clearTimeout(delayTimer);
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onAppInstalled);
    };
  }, []);

  const handleDismiss = useCallback(() => {
    sessionStorage.setItem(DISMISS_KEY, '1');
    setDismissed(true);
  }, []);

  const handleInstall = useCallback(async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      if (outcome === 'accepted') {
        setInstalled(true);
      }
      return;
    }

    if (isIos) {
      handleDismiss();
    }
  }, [deferredPrompt, isIos, handleDismiss]);

  if (!showBanner) return null;

  return (
    <div
      className="pwa-install-banner"
      role="region"
      aria-label="Install app"
    >
      <div className="pwa-install-banner-inner">
        <img
          src={`${process.env.PUBLIC_URL || ''}/android-chrome-192x192.png`}
          alt=""
          className="pwa-install-banner-icon"
          width="40"
          height="40"
          decoding="async"
        />
        <div className="pwa-install-banner-copy">
          <p className="pwa-install-banner-title">Install Portfolio App</p>
          <p className="pwa-install-banner-desc">
            {isIos && !canPrompt
              ? 'Tap Share, then "Add to Home Screen" for quick access.'
              : 'Add to your home screen for a faster, app-like experience.'}
          </p>
        </div>
        <div className="pwa-install-banner-actions">
          <button
            type="button"
            className="pwa-install-banner-install"
            onClick={handleInstall}
          >
            {isIos && !canPrompt ? 'Got it' : 'Install'}
          </button>
          <button
            type="button"
            className="pwa-install-banner-dismiss"
            onClick={handleDismiss}
            aria-label="Dismiss install prompt"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6 6L18 18M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PwaInstallPrompt;
