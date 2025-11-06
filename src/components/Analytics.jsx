import { useEffect } from 'react';

// Google Analytics 4 Configuration
const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 tracking ID

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
      // Use first-party cookies only to avoid third-party cookie issues
      cookie_flags: 'SameSite=None;Secure',
      // Disable advertising features to reduce cookie usage
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      // Use anonymized IP
      anonymize_ip: true,
    });
  }
};

// Track page views
export const trackPageView = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const trackEvent = (action, category, label, value) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track form submissions
export const trackFormSubmission = (formName) => {
  trackEvent('form_submit', 'engagement', formName);
};

// Track button clicks
export const trackButtonClick = (buttonName, location) => {
  trackEvent('click', 'button', `${buttonName}_${location}`);
};

// Track portfolio project views
export const trackProjectView = (projectName) => {
  trackEvent('view_item', 'portfolio', projectName);
};

// Track blog post reads
export const trackBlogRead = (postTitle) => {
  trackEvent('read_article', 'blog', postTitle);
};

// Track contact interactions
export const trackContactInteraction = (method) => {
  trackEvent('contact', 'engagement', method);
};

// Track scroll depth
export const trackScrollDepth = (depth) => {
  trackEvent('scroll', 'engagement', `depth_${depth}%`);
};

// Analytics Component
const Analytics = () => {
  useEffect(() => {
    // Initialize Google Analytics
    initGA();

    // Track page view on mount
    trackPageView(window.location.pathname);

    // Track scroll depth
    let maxScrollDepth = 0;
    const trackScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      if (scrollPercent > maxScrollDepth && scrollPercent % 25 === 0) {
        maxScrollDepth = scrollPercent;
        trackScrollDepth(scrollPercent);
      }
    };

    // Track time on page
    const startTime = Date.now();
    const trackTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (timeSpent > 30) { // Track after 30 seconds
        trackEvent('time_on_page', 'engagement', '30_seconds');
      }
    };

    // Add event listeners
    window.addEventListener('scroll', trackScroll);
    window.addEventListener('beforeunload', trackTimeOnPage);

    // Track clicks on external links
    const trackExternalLinks = (e) => {
      const link = e.target.closest('a');
      if (link && link.hostname !== window.location.hostname) {
        trackEvent('click', 'external_link', link.href);
      }
    };

    document.addEventListener('click', trackExternalLinks);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', trackScroll);
      window.removeEventListener('beforeunload', trackTimeOnPage);
      document.removeEventListener('click', trackExternalLinks);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default Analytics;
