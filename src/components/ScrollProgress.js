import React, { useEffect, useState } from 'react';

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    let cachedScrollHeight = 0;
    let cachedClientHeight = 0;
    let recalculateTimeout = null;
    
    // Cache document dimensions to avoid forced reflows
    const updateCache = () => {
      // Wait a bit for lazy-loaded content to render
      // Get the maximum scroll height from both body and documentElement
      const bodyScrollHeight = document.body.scrollHeight;
      const documentScrollHeight = document.documentElement.scrollHeight;
      const bodyOffsetHeight = document.body.offsetHeight;
      const documentOffsetHeight = document.documentElement.offsetHeight;
      
      // Use the maximum of all these values to ensure we get the full height
      cachedScrollHeight = Math.max(
        bodyScrollHeight,
        documentScrollHeight,
        bodyOffsetHeight,
        documentOffsetHeight
      );
      cachedClientHeight = window.innerHeight || document.documentElement.clientHeight;
    };
    
    const updateProgress = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Get current scroll position
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
          
          // Recalculate cache periodically to account for lazy-loaded content
          if (cachedScrollHeight === 0 || recalculateTimeout === null) {
            updateCache();
            // Recalculate every 500ms to catch lazy-loaded content
            recalculateTimeout = setTimeout(() => {
              updateCache();
              recalculateTimeout = null;
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



