import React, { useState, useEffect, useRef } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const progressCircleRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    let cachedDocumentHeight = 0;
    let cachedWindowHeight = window.innerHeight;
    let cachedIsMobile = window.innerWidth <= 768;
    
    // Cache layout properties to avoid forced reflows
    const updateCache = () => {
      cachedDocumentHeight = document.documentElement.scrollHeight;
      cachedWindowHeight = window.innerHeight;
      cachedIsMobile = window.innerWidth <= 768;
    };
    
    const updateScrollProgress = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Only read scroll position (non-layout property)
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          
          // Update cache only when needed
          if (cachedDocumentHeight === 0) {
            updateCache();
          }
          
          const scrollableHeight = cachedDocumentHeight - cachedWindowHeight;
          const percent = scrollableHeight > 0 
            ? Math.min(100, Math.round((scrollTop / scrollableHeight) * 100))
            : 0;
          
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

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    updateScrollProgress();

    return () => {
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



