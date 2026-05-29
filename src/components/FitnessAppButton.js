import React, { useState, useEffect } from 'react';

export const FITNESS_APP_URL = 'https://fitness-trackpro.netlify.app/';

export const FITNESS_APP_LOGO = encodeURI(
  `${process.env.PUBLIC_URL || ''}/assets/fitness track pro.png?v=2`
);

const FitnessAppFloatingButton = () => {
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <a
      href={FITNESS_APP_URL}
      className={`fitness-app-float ${isVisible ? 'is-visible' : ''}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open Fitness Track Pro — custom workout tracking app (opens in new window)"
      title="Open Fitness Track Pro"
    >
      <span className="fitness-app-float-glow" aria-hidden="true" />
      <span className="fitness-app-float-body">
        <span className="fitness-app-float-logo-wrap">
          <img
            src={FITNESS_APP_LOGO}
            alt=""
            className="fitness-app-float-logo"
            width="48"
            height="48"
            loading="lazy"
            decoding="async"
          />
        </span>
        <span className="fitness-app-float-copy">
          <span className="fitness-app-float-kicker">Side project</span>
          <span className="fitness-app-float-name">Fitness Track Pro</span>
        </span>
        <span className="fitness-app-float-arrow" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 17L17 7M17 7H9M17 7V15" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </span>
    </a>
  );
};

export default FitnessAppFloatingButton;
