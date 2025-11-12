import { useState, useEffect, useRef } from 'react';

export const useCounterAnimation = (target, containerRef) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);
  const rafId = useRef(null);
  const timeoutId = useRef(null);
  const lastDisplayedValue = useRef(0);

  useEffect(() => {
    if (hasAnimated.current) return;

    const startAnimation = () => {
      const duration = 2000; // 2 seconds
      const startTime = performance.now();
      
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic for smooth deceleration
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(eased * target);
        
        // Only update if the integer value has changed to prevent glitching
        if (currentValue !== lastDisplayedValue.current && currentValue <= target) {
          lastDisplayedValue.current = currentValue;
          setCount(currentValue);
        }
        
        // Continue or finish
        if (progress < 1) {
          rafId.current = requestAnimationFrame(animate);
        } else {
          // Ensure final value is exact
          if (lastDisplayedValue.current !== target) {
            lastDisplayedValue.current = target;
            setCount(target);
          }
          rafId.current = null;
        }
      };
      
      rafId.current = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            observer.disconnect();
            
            // Start animation after a brief delay for smooth entry
            timeoutId.current = setTimeout(() => {
              startAnimation();
            }, 200);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px' }
    );

    if (containerRef?.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [containerRef, target]);

  return [count];
};






