import { useEffect, useRef } from 'react';

/**
 * Custom hook for screen reader announcements
 * Creates a live region for dynamic content announcements
 */
export const useLiveRegion = (message, priority = 'polite') => {
  const liveRegionRef = useRef(null);

  useEffect(() => {
    // Create live region if it doesn't exist
    if (!liveRegionRef.current) {
      let liveRegion = document.getElementById('live-region');
      if (!liveRegion) {
        liveRegion = document.createElement('div');
        liveRegion.id = 'live-region';
        liveRegion.setAttribute('role', 'status');
        liveRegion.setAttribute('aria-live', priority);
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        document.body.appendChild(liveRegion);
      }
      liveRegionRef.current = liveRegion;
    }

    // Announce message
    if (message && liveRegionRef.current) {
      liveRegionRef.current.textContent = message;
      // Clear after announcement to allow re-announcement of same message
      setTimeout(() => {
        if (liveRegionRef.current) {
          liveRegionRef.current.textContent = '';
        }
      }, 1000);
    }
  }, [message, priority]);

  return liveRegionRef;
};

export default useLiveRegion;






