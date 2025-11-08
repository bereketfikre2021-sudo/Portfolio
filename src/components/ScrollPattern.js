import React, { useEffect, useState } from 'react';

const ScrollPattern = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let ticking = false;
    
    const handlePatternReveal = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.pageYOffset;
          const windowHeight = window.innerHeight;
          const triggerPoint = windowHeight * 0.3;
          setIsActive(scrollY > triggerPoint);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handlePatternReveal, { passive: true });
    handlePatternReveal();

    return () => {
      window.removeEventListener('scroll', handlePatternReveal);
    };
  }, []);

  return (
    <div className={`scroll-pattern ${isActive ? 'active' : ''}`} id="scrollPattern">
      <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <path className="scroll-pattern-shape" d="M0,300 Q400,200 800,250 T1600,300 L1920,300 L1920,0 L0,0 Z" />
        <path className="scroll-pattern-shape" d="M0,600 Q600,500 1200,550 T1920,600 L1920,400 L0,400 Z" />
        <path className="scroll-pattern-shape" d="M0,900 Q500,800 1000,850 T1920,900 L1920,700 L0,700 Z" />
        <path className="scroll-pattern-shape" d="M0,1200 Q700,1100 1400,1150 T1920,1200 L1920,1000 L0,1000 Z" />
        <path className="scroll-pattern-shape" d="M0,1500 Q800,1400 1600,1450 T1920,1500 L1920,1300 L0,1300 Z" />
      </svg>
    </div>
  );
};

export default ScrollPattern;



