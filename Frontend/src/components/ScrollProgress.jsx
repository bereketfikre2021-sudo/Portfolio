import React from 'react';
import { useScroll } from '../context/ScrollContext';

const ScrollProgress = () => {
  const { scrollPercent, isScrollToTopVisible } = useScroll();
  const rounded = Math.round(scrollPercent);

  return (
    <div
      className={`scroll-progress-side ${isScrollToTopVisible ? 'is-visible' : ''}`}
      id="scrollProgress"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={rounded}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-hidden={!isScrollToTopVisible}
    >
      <div className="scroll-progress-side-tab">
        <div className="scroll-progress-side-track" aria-hidden="true">
          <div
            className="scroll-progress-side-fill"
            style={{ height: `${scrollPercent}%` }}
          />
        </div>
        <span className="scroll-progress-side-percent">{rounded}%</span>
      </div>
    </div>
  );
};

export default ScrollProgress;
