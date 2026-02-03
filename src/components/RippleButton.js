import React, { useRef } from 'react';

const RippleButton = ({ children, className = '', onClick, ...props }) => {
  const buttonRef = useRef(null);

  const createRipple = (event) => {
    const button = buttonRef.current;
    if (!button) return;
    const clientX = event.clientX;
    const clientY = event.clientY;
    // Batch layout read in rAF to avoid forced reflow, then do DOM writes
    requestAnimationFrame(() => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = clientX - rect.left - size / 2;
      const y = clientY - rect.top - size / 2;

      const ripple = document.createElement('span');
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.classList.add('ripple-effect');

      buttonRef.current.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
    if (onClick) onClick(event);
  };

  return (
    <button
      ref={buttonRef}
      className={`ripple-button ${className}`}
      onClick={createRipple}
      {...props}
    >
      {children}
    </button>
  );
};

export default RippleButton;






