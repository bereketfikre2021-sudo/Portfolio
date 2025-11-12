import React, { useEffect, useState } from 'react';

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    let cachedDocumentHeight = 0;
    let cachedWindowHeight = window.innerHeight;
    
    // Cache document height to avoid forced reflows
    const updateCache = () => {
      cachedDocumentHeight = document.documentElement.scrollHeight;
      cachedWindowHeight = window.innerHeight;
    };
    
    const updateProgress = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Only read layout properties once per frame
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          
          // Update cache only when needed (on load/resize)
          if (cachedDocumentHeight === 0) {
            updateCache();
          }
          
          const scrollPercent = cachedDocumentHeight > cachedWindowHeight 
            ? Math.min(100, (scrollTop / (cachedDocumentHeight - cachedWindowHeight)) * 100)
            : 0;
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

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('load', () => {
      updateCache();
      updateProgress();
    });
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



