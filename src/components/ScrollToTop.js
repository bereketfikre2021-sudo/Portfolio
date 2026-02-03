import React, { useEffect, useRef, useState } from 'react';
import { useScroll } from '../context/ScrollContext';

const ScrollToTop = () => {
  const { scrollPercent, isScrollToTopVisible } = useScroll();
  const progressCircleRef = useRef(null);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth <= 768);

  useEffect(() => {
    let resizeTicking = false;
    const handleResize = () => {
      if (!resizeTicking) {
        requestAnimationFrame(() => {
          setIsMobile(window.innerWidth <= 768);
          resizeTicking = false;
        });
        resizeTicking = true;
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const el = progressCircleRef.current;
    if (!el) return;
    const radius = isMobile ? 23 : 26;
    const circumference = 2 * Math.PI * radius;
    el.style.strokeDashoffset = circumference - (scrollPercent / 100) * circumference;
  }, [scrollPercent, isMobile]);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const radius = isMobile ? 23 : 26;
  const circumference = 2 * Math.PI * radius;

  return (
    <button
      className={`scroll-to-top ${isScrollToTopVisible ? 'visible' : ''}`}
      id="scrollToTop"
      aria-label="Scroll to top of page"
      aria-keyshortcuts="Home"
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
        <span className="scroll-percentage">{Math.round(scrollPercent)}%</span>
      </div>
      <svg className="scroll-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
};

export default ScrollToTop;
