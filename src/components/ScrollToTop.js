import React, { useState, useEffect, useRef } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const progressCircleRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    let cachedScrollHeight = 0;
    let cachedClientHeight = 0;
    let cachedIsMobile = window.innerWidth <= 768;
    let recalculateTimeout = null;
    
    // Cache layout properties to avoid forced reflows
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
      const windowWidth = window.innerWidth;
      const clientHeight = docEl.clientHeight;
      
      // Use the maximum of all these values to ensure we get the full height
      cachedScrollHeight = Math.max(
        bodyScrollHeight,
        documentScrollHeight,
        bodyOffsetHeight,
        documentOffsetHeight
      );
      cachedClientHeight = windowHeight || clientHeight;
      cachedIsMobile = windowWidth <= 768;
    };
    
    const updateScrollProgress = () => {
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
          const scrollableHeight = cachedScrollHeight - cachedClientHeight;
          
          // Calculate progress percentage
          let percent = 0;
          if (scrollableHeight > 0) {
            percent = Math.min(100, Math.max(0, Math.round((scrollTop / scrollableHeight) * 100)));
          }
          
          setScrollPercent(percent);
          setIsVisible(scrollTop > 300);

          // Update circle progress using cached values
          if (progressCircleRef.current) {
            const radius = cachedIsMobile ? 23 : 26;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (percent / 100) * circumference;
            progressCircleRef.current.style.strokeDashoffset = offset;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      updateCache();
      updateScrollProgress();
    };

    // Initial cache update with delay to allow lazy-loaded content
    const initialTimeout = setTimeout(() => {
      updateCache();
      updateScrollProgress();
    }, 1000);

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('load', () => {
      setTimeout(() => {
        updateCache();
        updateScrollProgress();
      }, 500);
    });
    
    // Also listen for when images/content finish loading
    if (document.readyState === 'complete') {
      setTimeout(() => {
        updateCache();
        updateScrollProgress();
      }, 1000);
    }

    return () => {
      clearTimeout(initialTimeout);
      if (recalculateTimeout) {
        clearTimeout(recalculateTimeout);
      }
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const isMobile = window.innerWidth <= 768;
  const radius = isMobile ? 23 : 26;
  const circumference = 2 * Math.PI * radius;

  return (
    <button 
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
      id="scrollToTop"
      aria-label="Scroll to top"
      onClick={scrollToTop}
    >
      <div className="scroll-progress-circle">
        <svg className="progress-ring" width={isMobile ? 56 : 60} height={isMobile ? 56 : 60}>
          <circle
            ref={progressCircleRef}
            className="progress-ring-circle"
            cx={isMobile ? 28 : 30}
            cy={isMobile ? 28 : 30}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="3"
            style={{ strokeDasharray: circumference }}
          />
        </svg>
        <span className="scroll-percentage">{scrollPercent}%</span>
      </div>
      <svg className="scroll-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
    </button>
  );
};

export default ScrollToTop;



