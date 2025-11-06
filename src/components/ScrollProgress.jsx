import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import scrollOptimizer from '@/utils/scrollOptimizer.js';

const ScrollProgress = ({ 
  position = 'top',
  height = '4px',
  color = '#8AEA92',
  backgroundColor = 'rgba(255, 255, 255, 0.1)',
  showPercentage = false,
  className = '',
  ...props 
}) => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const { scrollYProgress } = useScroll();
  const { resolvedTheme } = useTheme();
  
  // Smooth spring animation for progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const updateScrollPercentage = () => {
      const scrollData = scrollOptimizer.getScrollPosition();
      setScrollPercentage(scrollData.percentage);
    };

    scrollOptimizer.addListener('scrollProgress', updateScrollPercentage);
    updateScrollPercentage(); // Initial call

    return () => {
      scrollOptimizer.removeListener('scrollProgress');
    };
  }, []);

  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return { top: 0, left: 0, right: 0 };
      case 'bottom':
        return { bottom: 0, left: 0, right: 0 };
      case 'left':
        return { top: 0, left: 0, bottom: 0, width: height, height: '100vh' };
      case 'right':
        return { top: 0, right: 0, bottom: 0, width: height, height: '100vh' };
      default:
        return { top: 0, left: 0, right: 0 };
    }
  };

  const getProgressBarStyles = () => {
    if (position === 'left' || position === 'right') {
      return {
        height: scaleX,
        width: '100%',
        backgroundColor: color,
        transformOrigin: position === 'left' ? 'bottom' : 'top'
      };
    }
    
    return {
      width: scaleX,
      height: '100%',
      backgroundColor: color,
      transformOrigin: 'left'
    };
  };

  return (
    <div
      className={`fixed z-50 ${className}`}
      style={{
        ...getPositionStyles(),
        height: position === 'left' || position === 'right' ? '100vh' : height,
        backgroundColor: position === 'left' || position === 'right' ? backgroundColor : 'transparent'
      }}
      {...props}
    >
      {/* Background bar for horizontal progress */}
      {(position === 'top' || position === 'bottom') && (
        <div
          className="absolute inset-0"
          style={{ backgroundColor }}
        />
      )}
      
      {/* Progress bar */}
      <motion.div
        className="absolute"
        style={getProgressBarStyles()}
      />
      
      {/* Percentage display */}
      {showPercentage && (
        <motion.div
          className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full backdrop-blur-sm ${
            resolvedTheme === 'light'
              ? 'bg-accent text-black border border-accent/30'
              : 'bg-primary/80 text-accent'
          }`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          {scrollPercentage}%
        </motion.div>
      )}
    </div>
  );
};

// Circular scroll progress
export const CircularScrollProgress = ({ 
  size = 60,
  strokeWidth = 4,
  color = '#8AEA92',
  backgroundColor = 'rgba(255, 255, 255, 0.1)',
  showPercentage = true,
  className = '',
  ...props 
}) => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const { scrollYProgress } = useScroll();
  const { resolvedTheme } = useTheme();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const updateScrollPercentage = () => {
      const scrollData = scrollOptimizer.getScrollPosition();
      setScrollPercentage(scrollData.percentage);
    };

    scrollOptimizer.addListener('circularProgress', updateScrollPercentage);
    updateScrollPercentage();

    return () => {
      scrollOptimizer.removeListener('circularProgress');
    };
  }, []);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (scrollPercentage / 100 * circumference);

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 ${className}`}
      {...props}
    >
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={resolvedTheme === 'light' ? '#8AEA92' : backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={resolvedTheme === 'light' ? '#8AEA92' : color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          style={{ strokeDashoffset }}
        />
      </svg>
      
      {/* Percentage text */}
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-xs font-medium ${
            resolvedTheme === 'light'
              ? 'text-black'
              : 'text-accent'
          }`}>
            {scrollPercentage}%
          </span>
        </div>
      )}
    </div>
  );
};

// Reading progress for articles
export const ReadingProgress = ({ 
  target,
  color = '#8AEA92',
  height = '3px',
  className = '',
  ...props 
}) => {
  const [progress, setProgress] = useState(0);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const targetElement = target ? document.querySelector(target) : document.body;
    if (!targetElement) return;

    let rafId = null;
    let ticking = false;

    const updateProgress = () => {
      if (ticking) return;
      ticking = true;
      
      // Batch all layout reads in requestAnimationFrame to prevent forced reflow
      rafId = requestAnimationFrame(() => {
        // Batch all layout property reads together
        const scrollTop = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
        const docHeight = targetElement.scrollHeight || targetElement.offsetHeight;
        const winHeight = window.innerHeight || document.documentElement.clientHeight;
        
        const scrollPercent = docHeight > winHeight ? scrollTop / (docHeight - winHeight) : 0;
        const progress = Math.min(100, Math.max(0, scrollPercent * 100));
        
        setProgress(progress);
        ticking = false;
      });
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    
    // Initial update with RAF
    updateProgress();

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [target]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 ${className}`}
      style={{ height }}
      {...props}
    >
      <motion.div
        className="h-full"
        style={{ 
          backgroundColor: color,
          width: `${progress}%`
        }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
};

// Scroll to top button
export const ScrollToTop = ({ 
  threshold = 300,
  className = '',
  ...props 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollData = scrollOptimizer.getScrollPosition();
      if (scrollData.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    scrollOptimizer.addListener('scrollToTop', toggleVisibility);
    return () => {
      scrollOptimizer.removeListener('scrollToTop');
    };
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.button
      className={`fixed bottom-4 left-4 z-50 p-3 rounded-full backdrop-blur-sm transition-colors ${className} ${
        resolvedTheme === 'light'
          ? 'bg-accent text-black border border-accent/30 hover:bg-accent/80 hover:shadow-lg'
          : 'bg-accent/20 text-accent border border-accent/30 hover:bg-accent/30'
      }`}
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      {...props}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </motion.button>
  );
};

export default ScrollProgress;
