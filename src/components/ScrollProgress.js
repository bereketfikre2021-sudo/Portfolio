import React, { useEffect, useState } from 'react';

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    let cachedScrollHeight = 0;
    let cachedClientHeight = 0;
    let recalculateTimeout = null;
    
    // Cache document dimensions to avoid forced reflows
    // Batch all layout property reads together to minimize forced reflows
    const updateCache = () => {
      // Batch all layout reads together in one operation to avoid multiple forced reflows
      const body = document.body;
      const docEl = document.documentElement;
      
      // Read all layout properties in one batch
      const bodyScrollHeight = body.scrollHeight;
      const documentScrollHeight = docEl.scrollHeight;
      const bodyOffsetHeight = body.offsetHeight;
      const documentOffsetHeight = docEl.offsetHeight;
      const windowHeight = window.innerHeight;
      const clientHeight = docEl.clientHeight;
      
      // Use the maximum of all these values to ensure we get the full height
      cachedScrollHeight = Math.max(
        bodyScrollHeight,
        documentScrollHeight,
        bodyOffsetHeight,
        documentOffsetHeight
      );
      cachedClientHeight = windowHeight || clientHeight;
    };
    
    const updateProgress = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Get current scroll position
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
          
          // Recalculate cache periodically to account for lazy-loaded content
          // Only recalculate when needed, not on every scroll event
          if (cachedScrollHeight === 0) {
            updateCache();
          } else if (recalculateTimeout === null) {
            // Recalculate every 500ms to catch lazy-loaded content
            // Use requestIdleCallback if available for non-critical updates
            recalculateTimeout = setTimeout(() => {
              if (typeof requestIdleCallback !== 'undefined') {
                requestIdleCallback(() => {
                  updateCache();
                  recalculateTimeout = null;
                }, { timeout: 1000 });
              } else {
                updateCache();
                recalculateTimeout = null;
              }
            }, 500);
          }
          
          // Calculate scrollable distance
          const scrollableDistance = cachedScrollHeight - cachedClientHeight;
          
          // Calculate progress percentage
          // Only show progress if there's actually scrollable content
          let scrollPercent = 0;
          if (scrollableDistance > 0) {
            scrollPercent = Math.min(100, Math.max(0, (scrollTop / scrollableDistance) * 100));
          }
          
          setProgress(scrollPercent);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      updateCache();
      updateProgress();
    };

    // Initial cache update with delay to allow lazy-loaded content
    const initialTimeout = setTimeout(() => {
      updateCache();
      updateProgress();
    }, 1000);
    
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('load', () => {
      setTimeout(() => {
        updateCache();
        updateProgress();
      }, 500);
    });
    
    // Also listen for when images/content finish loading
    if (document.readyState === 'complete') {
      setTimeout(() => {
        updateCache();
        updateProgress();
      }, 1000);
    }

    return () => {
      clearTimeout(initialTimeout);
      if (recalculateTimeout) {
        clearTimeout(recalculateTimeout);
      }
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      className="scroll-progress" 
      id="scrollProgress"
      style={{ width: `${progress}%` }}
    />
  );
};

export default ScrollProgress;



