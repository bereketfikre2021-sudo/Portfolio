import { useState, useEffect, useRef } from 'react';

export const useCounterAnimation = (target, containerRef) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);
  const animationFrameId = useRef(null);
  const startTime = useRef(null);

  useEffect(() => {
    if (hasAnimated.current) return;

    const animateCounter = () => {
      const duration = 2000; // 2 seconds
      startTime.current = null;

      const animate = (currentTime) => {
        if (!startTime.current) {
          startTime.current = currentTime;
        }

        const elapsed = currentTime - startTime.current;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * target);

        setCount(current);

        if (progress < 1) {
          animationFrameId.current = requestAnimationFrame(animate);
        } else {
          setCount(target);
          animationFrameId.current = null;
        }
      };

      animationFrameId.current = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            animateCounter();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef?.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [containerRef, target]);

  return [count];
};






