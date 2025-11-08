import React, { useEffect, useState } from 'react';

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    
    const updateProgress = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const scrollPercent = documentHeight > windowHeight 
            ? Math.min(100, (scrollTop / (documentHeight - windowHeight)) * 100)
            : 0;
          setProgress(scrollPercent);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('load', updateProgress);
    updateProgress();

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('load', updateProgress);
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



