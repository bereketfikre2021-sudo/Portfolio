import React, { useEffect, useState } from 'react';

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    let cachedScrollHeight = 0;
    let cachedClientHeight = 0;
    
    // Cache document dimensions to avoid forced reflows
    const updateCache = () => {
      // Get the maximum scroll height from both body and documentElement
      const bodyScrollHeight = document.body.scrollHeight;
      const documentScrollHeight = document.documentElement.scrollHeight;
      cachedScrollHeight = Math.max(bodyScrollHeight, documentScrollHeight);
      cachedClientHeight = window.innerHeight || document.documentElement.clientHeight;
    };
    
    const updateProgress = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Get current scroll position
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
          
          // Update cache if needed (on load/resize)
          if (cachedScrollHeight === 0) {
            updateCache();
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

    // Initial cache update
    updateCache();
    
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('load', () => {
      updateCache();
      updateProgress();
    });
    
    // Initial update
    updateProgress();

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleResize);
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



