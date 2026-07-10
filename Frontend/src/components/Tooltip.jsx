import React, { useState, useRef, useEffect } from 'react';

const Tooltip = ({ text, children, position = 'top', delay = 200 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState({});
  const tooltipRef = useRef(null);
  const triggerRef = useRef(null);
  const timeoutRef = useRef(null);

  const showTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      updateTooltipPosition();
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const updateTooltipPosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;
    // Batch layout reads in rAF to avoid forced reflow (read after any pending layout)
    requestAnimationFrame(() => {
      if (!triggerRef.current || !tooltipRef.current) return;
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = triggerRect.top + scrollY - tooltipRect.height - 8;
        left = triggerRect.left + scrollX + (triggerRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'bottom':
        top = triggerRect.bottom + scrollY + 8;
        left = triggerRect.left + scrollX + (triggerRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'left':
        top = triggerRect.top + scrollY + (triggerRect.height / 2) - (tooltipRect.height / 2);
        left = triggerRect.left + scrollX - tooltipRect.width - 8;
        break;
      case 'right':
        top = triggerRect.top + scrollY + (triggerRect.height / 2) - (tooltipRect.height / 2);
        left = triggerRect.right + scrollX + 8;
        break;
      default:
        top = triggerRect.top + scrollY - tooltipRect.height - 8;
        left = triggerRect.left + scrollX + (triggerRect.width / 2) - (tooltipRect.width / 2);
    }

    // Keep tooltip within viewport
    const padding = 8;
    if (left < padding) left = padding;
    if (left + tooltipRect.width > window.innerWidth - padding) {
      left = window.innerWidth - tooltipRect.width - padding;
    }
    if (top < scrollY + padding) {
      top = scrollY + padding;
      // If top doesn't work, try bottom
      if (position === 'top') {
        top = triggerRect.bottom + scrollY + 8;
      }
    }

    setTooltipStyle({ top: `${top}px`, left: `${left}px` });
    });
  };

  useEffect(() => {
    if (isVisible) {
      updateTooltipPosition();
      let scrollResizeTicking = false;
      const onScrollResize = () => {
        if (!scrollResizeTicking) {
          requestAnimationFrame(() => {
            updateTooltipPosition();
            scrollResizeTicking = false;
          });
          scrollResizeTicking = true;
        }
      };
      window.addEventListener('scroll', onScrollResize, { passive: true, capture: true });
      window.addEventListener('resize', onScrollResize);

      return () => {
        window.removeEventListener('scroll', onScrollResize, true);
        window.removeEventListener('resize', onScrollResize);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [isVisible]);

  return (
    <span
      ref={triggerRef}
      className="tooltip-wrapper"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {isVisible && (
        <span
          ref={tooltipRef}
          className={`tooltip tooltip-${position}`}
          style={tooltipStyle}
          role="tooltip"
        >
          {text}
        </span>
      )}
    </span>
  );
};

export default Tooltip;






