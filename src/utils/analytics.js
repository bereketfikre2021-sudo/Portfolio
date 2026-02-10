/**
 * Google Analytics 4 (GA4) integration.
 * Set REACT_APP_GA_MEASUREMENT_ID in .env (e.g. G-XXXXXXXXXX) to enable.
 * Only loads in production.
 */

const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

export function initGoogleAnalytics() {
  if (!GA_MEASUREMENT_ID || process.env.NODE_ENV !== 'production') return;

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: true,
    anonymize_ip: true,
  });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

/**
 * Send a custom event to GA4 (optional).
 * Example: trackEvent('click_contact', { method: 'phone' });
 */
export function trackEvent(eventName, params = {}) {
  if (typeof window.gtag === 'function' && GA_MEASUREMENT_ID) {
    window.gtag('event', eventName, params);
  }
}
