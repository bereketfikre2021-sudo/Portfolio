import React, { useEffect, useState, useMemo, useContext } from 'react';
import { useTextTypingAnimation } from '../hooks/useTextTypingAnimation';
import apiFetch from '../utils/api';
import { trackCTA } from '../utils/analytics';
import { ModalContext } from '../context/ModalContext';

// Hardcoded fallbacks — used while API loads or if it fails
const DEFAULTS = {
  line1Prefix:    'Creating ',
  line1Highlight: 'Extraordinary',
  line2:          'Experiences',
  heroImage:      null,
  stats: {
    projects: { value: '100+', label: 'Projects' },
    clients:  { value: '50+',  label: 'Clients'  },
    years:    { value: '5+',   label: 'Years'    },
  },
};

const TYPING_SPEED  = 42;
const START_DELAY   = 550;
const PAUSE_BETWEEN = 200;

const TypingCursor = () => (
  <span className="typing-cursor" aria-hidden="true">|</span>
);

const Hero = () => {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [siteSettings, setSiteSettings] = useState(null);
  const { openProjectRequestModal } = useContext(ModalContext);

  // Fetch site settings (hero text + stats + image) — falls back to defaults
  useEffect(() => {
    apiFetch('/site-settings')
      .then((data) => { if (data) setSiteSettings(data); })
      .catch(() => {}); // silently keep defaults
  }, []);

  // Derived values — prefer API data, fall back to hardcoded defaults
  const line1Prefix    = siteSettings?.heroLine1Prefix    ?? DEFAULTS.line1Prefix;
  const line1Highlight = siteSettings?.heroLine1Highlight ?? DEFAULTS.line1Highlight;
  const line2          = siteSettings?.heroLine2          ?? DEFAULTS.line2;
  const heroImageSrc   = siteSettings?.heroImage          ?? null;

  const stats = useMemo(() => [
    {
      value: siteSettings?.statProjectsValue ?? DEFAULTS.stats.projects.value,
      label: siteSettings?.statProjectsLabel ?? DEFAULTS.stats.projects.label,
    },
    {
      value: siteSettings?.statClientsValue  ?? DEFAULTS.stats.clients.value,
      label: siteSettings?.statClientsLabel  ?? DEFAULTS.stats.clients.label,
    },
    {
      value: siteSettings?.statYearsValue    ?? DEFAULTS.stats.years.value,
      label: siteSettings?.statYearsLabel    ?? DEFAULTS.stats.years.label,
    },
  ], [siteSettings]);

  // Typing animation delays recalculated when text changes
  const delayExtra       = START_DELAY + line1Prefix.length    * TYPING_SPEED + PAUSE_BETWEEN;
  const delayExperiences = delayExtra  + line1Highlight.length * TYPING_SPEED + PAUSE_BETWEEN;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const [creating,      isTypingCreating]     = useTextTypingAnimation(line1Prefix,    START_DELAY,       TYPING_SPEED);
  const [extraordinary, isTypingExtra]        = useTextTypingAnimation(line1Highlight, delayExtra,        TYPING_SPEED);
  const [experiences,   isTypingExperiences]  = useTextTypingAnimation(line2,          delayExperiences,  TYPING_SPEED);

  const showStaticTitle = reduceMotion;

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      requestAnimationFrame(() => {
        const isMobile = window.innerWidth <= 768;
        const offsetTop = isMobile ? target.offsetTop - 20 : target.offsetTop - 100;
        window.scrollTo({ top: Math.max(0, offsetTop), behavior: 'smooth' });
      });
    }
  };

  // Resolved image source: API image takes priority, local fallback otherwise
  const imgSrc    = heroImageSrc || `${process.env.PUBLIC_URL || ''}/assets/Bereket-Fikre-1.webp`;
  const imgSrcSet = heroImageSrc
    ? `${heroImageSrc} 800w, ${heroImageSrc} 1600w`
    : `${process.env.PUBLIC_URL || ''}/assets/Bereket-Fikre-1.webp 800w, ${process.env.PUBLIC_URL || ''}/assets/Bereket-Fikre-1.webp 1600w`;

  return (
    <section id="home" className="hero" aria-label="Hero section - Introduction">
      <div className="hero-background">
        <div className="hero-gradient-overlay"></div>
        <div className="hero-blob blob-1"></div>
        <div className="hero-blob blob-2"></div>
        <div className="hero-blob blob-3"></div>
      </div>

      <div className="hero-content">
        <div className="hero-left">
          <h1
            className="hero-title hero-title-compact hero-title-typing"
            aria-label={`${line1Prefix}${line1Highlight} ${line2}`}
          >
            <span className="title-line">
              {showStaticTitle ? (
                <>
                  {line1Prefix}
                  <span className="title-word highlight">{line1Highlight}</span>
                </>
              ) : (
                <>
                  <span>{creating}</span>
                  {isTypingCreating && creating.length < line1Prefix.length && <TypingCursor />}
                  {extraordinary.length > 0 && (
                    <span className="title-word highlight">{extraordinary}</span>
                  )}
                  {isTypingExtra && extraordinary.length < line1Highlight.length && <TypingCursor />}
                </>
              )}
            </span>
            <span className="title-line title-line-accent">
              {showStaticTitle ? (
                line2
              ) : (
                <>
                  <span>{experiences}</span>
                  {isTypingExperiences && experiences.length < line2.length && <TypingCursor />}
                </>
              )}
            </span>
          </h1>

          <div className="hero-actions">
            <a
              href="#portfolio"
              className="btn btn-primary"
              onClick={(e) => { handleNavClick(e, '#portfolio'); trackCTA('Explore Work', 'hero'); }}
              aria-label="Explore my work portfolio"
            >
              <span className="btn-text">Explore Work</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
              <div className="btn-shine"></div>
            </a>
            <button
              className="btn btn-outline"
              onClick={() => { openProjectRequestModal(); trackCTA('Request a Quote', 'hero'); }}
              aria-label="Request a project quote"
              type="button"
            >
              <span className="btn-text">Request a Quote</span>
            </button>
          </div>

          <div className="hero-stats">
            {stats.map((stat, i) => (
              <React.Fragment key={stat.label}>
                {i > 0 && <div className="stat-divider"></div>}
                <div className="stat-box">
                  <span className="stat-number">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-image-container">
            <div className="image-frame">
              <div className="frame-corner frame-corner-tl"></div>
              <div className="frame-corner frame-corner-tr"></div>
              <div className="frame-corner frame-corner-bl"></div>
              <div className="frame-corner frame-corner-br"></div>
            </div>
            <div className="image-wrapper">
              <img
                src={imgSrc}
                alt="Bereket Fikre, Graphic and brand designer, visual story teller"
                className="hero-image"
                width="800"
                height="1000"
                loading="eager"
                fetchpriority="high"
                decoding="async"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                srcSet={imgSrcSet}
              />
              <div className="image-overlay"></div>
            </div>
            <div className="floating-label floating-label-1">
              <div className="label-dot"></div>
              <span>Graphic & Brand Designer</span>
            </div>
            <div className="floating-label floating-label-3">
              <div className="label-dot"></div>
              <span>Visual Storyteller</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
