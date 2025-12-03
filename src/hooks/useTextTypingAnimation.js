import { useState, useEffect, useRef } from 'react';

export const useTextTypingAnimation = (text, delay = 0, typingSpeed = 50) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const hasAnimated = useRef(false);
  const rafId = useRef(null);
  const isAnimating = useRef(false);
  const currentIndex = useRef(0);
  const startTimerRef = useRef(null);

  useEffect(() => {
    // Reset when text changes
    hasAnimated.current = false;
    isAnimating.current = false;
    currentIndex.current = 0;
    setDisplayedText('');
    setIsTyping(false);

    if (!text) return;

    const startAnimation = () => {
      // Prevent multiple simultaneous animations
      if (isAnimating.current || hasAnimated.current) return;
      isAnimating.current = true;
      hasAnimated.current = true;
      currentIndex.current = 0;
      setDisplayedText('');
      setIsTyping(true);

      const typeNextCharacter = () => {
        if (currentIndex.current < text.length) {
          setDisplayedText(text.substring(0, currentIndex.current + 1));
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

    // Start animation after the specified delay
    startTimerRef.current = setTimeout(() => {
      startAnimation();
    }, delay);

    return () => {
      if (startTimerRef.current) {
        clearTimeout(startTimerRef.current);
        startTimerRef.current = null;
      }
      if (rafId.current) {
        clearTimeout(rafId.current);
        rafId.current = null;
      }
      isAnimating.current = false;
    };
  }, [text, delay, typingSpeed]);

  return [displayedText, isTyping];
};

