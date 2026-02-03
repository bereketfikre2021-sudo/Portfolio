import React from 'react';
import { useScroll } from '../context/ScrollContext';

const ScrollProgress = () => {
  const { scrollPercent } = useScroll();
  return (
    <div className="scroll-progress-left" id="scrollProgress">
      <div className="scroll-progress-bar" style={{ height: `${scrollPercent}%` }} />
      <div className="scroll-progress-percentage">{Math.round(scrollPercent)}%</div>
    </div>
  );
};

export default ScrollProgress;
