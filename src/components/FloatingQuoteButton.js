import React, { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';

const FloatingQuoteButton = () => {
  const { openProjectRequestModal } = useContext(ModalContext);

  const handleClick = (e) => {
    e.preventDefault();
    if (openProjectRequestModal) {
      openProjectRequestModal();
    }
  };

  return (
    <button
      className="floating-cta floating-quote-button"
      onClick={handleClick}
      aria-label="Get a project quote"
    >
      <div className="floating-cta-pulse"></div>
      <div className="floating-cta-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="9" y1="15" x2="15" y2="15"/>
          <line x1="9" y1="18" x2="15" y2="18"/>
        </svg>
      </div>
      <span className="floating-cta-text">Get Quote</span>
    </button>
  );
};

export default FloatingQuoteButton;

