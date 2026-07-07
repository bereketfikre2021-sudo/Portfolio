import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FITNESS_APP_URL, DATING_APP_URL, FITNESS_APP_LOGO } from '../data/appUrls';

export { FITNESS_APP_URL, DATING_APP_URL, FITNESS_APP_LOGO };

const apps = [
  {
    id: 'fitness',
    name: 'Fitness Track Pro',
    url: FITNESS_APP_URL,
    logo: (
      <img
        src={FITNESS_APP_LOGO}
        alt=""
        className="app-row-logo app-row-logo--img"
        width="32"
        height="32"
        loading="lazy"
        decoding="async"
      />
    ),
  },
  {
    id: 'dating',
    name: 'Dating Invitation Pro',
    url: DATING_APP_URL,
    logo: (
      <span className="app-row-logo app-row-logo--heart" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </span>
    ),
  },
];

const AppsGridIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18" aria-hidden="true">
    <rect x="2"  y="2"  width="6" height="6" rx="1.5"/>
    <rect x="12" y="2"  width="6" height="6" rx="1.5"/>
    <rect x="2"  y="12" width="6" height="6" rx="1.5"/>
    <rect x="12" y="12" width="6" height="6" rx="1.5"/>
  </svg>
);

const FitnessAppFloatingButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen]       = useState(false);
  const rootRef = useRef(null);
  const panelId = 'apps-side-panel';

  useEffect(() => {
    const onScroll = () =>
      setIsVisible((window.pageYOffset || document.documentElement.scrollTop) > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey     = (e) => { if (e.key === 'Escape') close(); };
    const onPointer = (e) => { if (rootRef.current && !rootRef.current.contains(e.target)) close(); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [isOpen, close]);

  useEffect(() => { if (!isVisible) close(); }, [isVisible, close]);

  return (
    <div
      ref={rootRef}
      className={`apps-float ${isVisible ? 'is-visible' : ''} ${isOpen ? 'is-open' : ''}`}
    >
      {/* Tab */}
      <button
        type="button"
        className="apps-float-tab"
        onClick={() => setIsOpen((o) => !o)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={isOpen ? 'Close apps' : 'My apps'}
      >
        <AppsGridIcon />
        <span className="apps-float-tab-label">Apps</span>
        <span className="apps-float-tab-chevron" aria-hidden="true">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2.5">
            <path d="M15 6L9 12L15 18" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>

      {/* Dropdown panel */}
      <div
        id={panelId}
        className="apps-float-panel"
        role="menu"
        aria-label="My apps"
        aria-hidden={!isOpen}
      >
        {apps.map((app) => (
          <a
            key={app.id}
            href={app.url}
            className={`apps-float-row apps-float-row--${app.id}`}
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            onClick={close}
            aria-label={`Open ${app.name} (new tab)`}
          >
            {app.logo}
            <span className="apps-float-row-name">{app.name}</span>
            <span className="apps-float-row-arrow" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H9M17 7V15" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default FitnessAppFloatingButton;
