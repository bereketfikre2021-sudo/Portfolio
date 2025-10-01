import React, { useEffect } from 'react';

const CriticalResourceHints = () => {
  useEffect(() => {
    // Add critical resource hints to document head
    const addResourceHint = (href, rel, as, crossorigin = false) => {
      // Check if hint already exists
      const existing = document.querySelector(`link[href="${href}"]`);
      if (existing) return;

      const link = document.createElement('link');
      link.rel = rel;
      link.href = href;
      
      if (as) link.as = as;
      if (crossorigin) link.crossOrigin = 'anonymous';
      
      // Add fetchpriority for critical resources
      if (rel === 'preload') {
        link.setAttribute('fetchpriority', 'high');
      }

      document.head.appendChild(link);
    };

    // Critical CSS - DISABLED (file doesn't exist)
    // addResourceHint('/styles/critical.css', 'preload', 'style');
    
    // Critical fonts - DISABLED (files don't exist)
    // addResourceHint('/fonts/inter-var.woff2', 'preload', 'font', true);
    // addResourceHint('/fonts/inter-var.woff', 'preload', 'font', true);
    
    // Critical images (above the fold) - DISABLED FOR TEST APP
    // addResourceHint('/img/Bereket-Fikre.webp', 'preload', 'image');
    // addResourceHint('/img/Logo.webp', 'preload', 'image');
    
    // Critical JavaScript chunks
    addResourceHint('/assets/react-vendor-[hash].js', 'preload', 'script');
    addResourceHint('/assets/framer-motion-[hash].js', 'preload', 'script');

    // DNS prefetch for external domains
    const dnsPrefetchDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.google-analytics.com',
      'https://www.googletagmanager.com'
    ];

    dnsPrefetchDomains.forEach(domain => {
      addResourceHint(domain, 'dns-prefetch');
    });

    // Preconnect to critical third-party origins
    const preconnectOrigins = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];

    preconnectOrigins.forEach(origin => {
      addResourceHint(origin, 'preconnect', null, true);
    });

    // Module preload for critical ES modules
    const modulePreloads = [
      '/assets/main-[hash].js',
      '/assets/vendor-[hash].js'
    ];

    modulePreloads.forEach(module => {
      addResourceHint(module, 'modulepreload');
    });

  }, []);

  return null; // This component doesn't render anything
};

export default CriticalResourceHints;
