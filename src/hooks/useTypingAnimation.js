import { useState, useEffect, useRef } from 'react';

export const useTypingAnimation = (target, containerRef, suffix = '+') => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const hasAnimated = useRef(false);
  const rafId = useRef(null);
  const observerRef = useRef(null);
  const isAnimating = useRef(false);
  const currentIndex = useRef(0);
  const startTimerRef = useRef(null);

  useEffect(() => {
    // Prevent re-animation if already animated
    if (hasAnimated.current || isAnimating.current) return;

    const targetString = target.toString() + suffix;
    const typingSpeed = 80; // milliseconds per character

    const startAnimation = () => {
      // Prevent multiple simultaneous animations
      if (isAnimating.current || hasAnimated.current) return;
      isAnimating.current = true;
      hasAnimated.current = true;
      currentIndex.current = 0;
      setDisplayedText('');
      setIsTyping(true);

      const typeNextCharacter = () => {
        if (currentIndex.current < targetString.length) {
          setDisplayedText(targetString.substring(0, currentIndex.current + 1));
          currentIndex.current += 1;
          
          // Use setTimeout for typing effect
          const timeoutId = setTimeout(typeNextCharacter, typingSpeed);
          rafId.current = timeoutId;
        } else {
          // Animation complete - hide cursor after a brief delay
          setTimeout(() => {
            setIsTyping(false);
          }, 500);
          isAnimating.current = false;
          rafId.current = null;
        }
      };

      // Start typing immediately
      typeNextCharacter();
    };

    // Simple approach: start animation after a delay since hero is always visible
    startTimerRef.current = setTimeout(() => {
      const container = containerRef?.current;
      if (container && !hasAnimated.current) {
        startAnimation();
      }
    }, 1000); // Start after 1 second

    // Fallback: also check with IntersectionObserver for scroll scenarios
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current && !isAnimating.current) {
            if (startTimerRef.current) {
              clearTimeout(startTimerRef.current);
              startTimerRef.current = null;
            }
            startAnimation();
            if (observerRef.current) {
              observerRef.current.disconnect();
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px' }
    );

    const container = containerRef?.current;
    if (container && observerRef.current) {
      observerRef.current.observe(container);
    }

    return () => {
      if (startTimerRef.current) {
        clearTimeout(startTimerRef.current);
        startTimerRef.current = null;
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (rafId.current) {
        clearTimeout(rafId.current);
        rafId.current = null;
      }
      isAnimating.current = false;
    };
  }, [target, suffix]); // Removed containerRef from dependencies

  return [displayedText, isTyping];
};

