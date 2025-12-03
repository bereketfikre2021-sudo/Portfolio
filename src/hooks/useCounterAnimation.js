import { useState, useEffect, useRef } from 'react';

export const useCounterAnimation = (target, containerRef) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);
  const rafId = useRef(null);
  const observerRef = useRef(null);
  const lastDisplayedValue = useRef(0);
  const isAnimating = useRef(false);

  useEffect(() => {
    // Prevent re-animation if already animated
    if (hasAnimated.current || isAnimating.current) return;

    const startAnimation = () => {
      // Prevent multiple simultaneous animations
      if (isAnimating.current || hasAnimated.current) return;
      isAnimating.current = true;
      hasAnimated.current = true;
      
      const duration = 2000; // 2 seconds
      const startTime = performance.now();
      
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic for smooth deceleration
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(eased * target);
        
        // Only update if the integer value has changed to prevent glitching
        if (currentValue !== lastDisplayedValue.current) {
          // Clamp value to ensure it never exceeds target
          const clampedValue = Math.min(currentValue, target);
          lastDisplayedValue.current = clampedValue;
          setCount(clampedValue);
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
          isAnimating.current = false;
          rafId.current = null;
        }
      };
      
      // Reset to 0 before starting
      lastDisplayedValue.current = 0;
      setCount(0);
      
      rafId.current = requestAnimationFrame(animate);
    };

    // Check if element is visible on mount (for hero section which is always visible)
    const checkAndStart = () => {
      const container = containerRef?.current;
      if (!container) {
        // If container not ready, try again after a short delay
        setTimeout(checkAndStart, 100);
        return;
      }

      const rect = container.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible) {
        // Element is visible, start animation after a delay
        setTimeout(() => {
          startAnimation();
        }, 1000);
      } else {
        // Element not visible, use IntersectionObserver
        observerRef.current = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && !hasAnimated.current && !isAnimating.current) {
                hasAnimated.current = true;
                if (observerRef.current) {
                  observerRef.current.disconnect();
                }
                
                // Start animation immediately using requestAnimationFrame
                requestAnimationFrame(() => {
                  startAnimation();
                });
              }
            });
          },
          { threshold: 0.2, rootMargin: '0px' }
        );

        if (observerRef.current) {
          observerRef.current.observe(container);
        }
      }
    };

    // Check visibility after component mounts
    requestAnimationFrame(() => {
      checkAndStart();
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      isAnimating.current = false;
    };
  }, [target]); // Removed containerRef from dependencies - refs are stable

  return [count];
};






