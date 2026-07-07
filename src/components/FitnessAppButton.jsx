import React, { useState, useEffect, useRef, useCallback } from 'react';

export const FITNESS_APP_URL = 'https://fit-trackpro.bereketfikre.et/';

export const FITNESS_APP_LOGO = encodeURI(
  `${process.env.PUBLIC_URL || ''}/assets/fitness track pro.png?v=2`
);

const FitnessAppFloatingButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);
  const panelId = 'fitness-app-side-panel';

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const closePanel = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closePanel();
    };

    const handlePointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        closePanel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isOpen, closePanel]);

  useEffect(() => {
    if (!isVisible) setIsOpen(false);
  }, [isVisible]);

  const togglePanel = () => {
    setIsOpen((open) => !open);
  };

  return (
    <div
      ref={rootRef}
      className={`fitness-app-side ${isVisible ? 'is-visible' : ''} ${isOpen ? 'is-open' : ''}`}
    >
      <button
        type="button"
        className="fitness-app-side-tab"
        onClick={togglePanel}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={isOpen ? 'Close Fitness Track Pro menu' : 'Open Fitness Track Pro menu'}
        title={isOpen ? 'Close' : 'Fitness Track Pro'}
      >
        <img
          src={FITNESS_APP_LOGO}
          alt=""
          className="fitness-app-side-tab-logo"
          width="40"
          height="40"
          loading="lazy"
          decoding="async"
        />
        <span className="fitness-app-side-tab-chevron" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 6L9 12L15 18" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      <div
        id={panelId}
        className="fitness-app-side-panel"
        role="dialog"
        aria-modal="false"
        aria-labelledby="fitness-app-side-title"
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          className="fitness-app-side-close"
          onClick={closePanel}
          aria-label="Close Fitness Track Pro menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6L18 18M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>

        <div className="fitness-app-side-panel-inner">
          <div className="fitness-app-side-panel-head">
            <img
              src={FITNESS_APP_LOGO}
              alt=""
              className="fitness-app-side-panel-logo"
              width="48"
              height="48"
              loading="lazy"
              decoding="async"
            />
            <div className="fitness-app-side-panel-copy">
              <span className="fitness-app-side-kicker">Side project</span>
              <h2 id="fitness-app-side-title" className="fitness-app-side-name">
                Fitness Track Pro
              </h2>
            </div>
          </div>
          <p className="fitness-app-side-desc">
            Custom workout tracking app — log sets, track progress, and stay consistent.
          </p>
          <a
            href={FITNESS_APP_URL}
            className="fitness-app-side-cta"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closePanel}
          >
            <span>Open app</span>
            <span className="fitness-app-side-cta-arrow" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H9M17 7V15" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FitnessAppFloatingButton;
