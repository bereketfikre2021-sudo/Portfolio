import React, { useEffect, useState } from 'react';
import { useTextTypingAnimation } from '../hooks/useTextTypingAnimation';
import apiFetch from '../utils/api';

const LINE1_PREFIX = 'Creating ';
const LINE1_HIGHLIGHT = 'Extraordinary';
const LINE2 = 'Experiences';
const TYPING_SPEED = 42;
const START_DELAY = 550; // slight delay so hero image paints first
const PAUSE_BETWEEN = 200;

const delayExtra =
  START_DELAY + LINE1_PREFIX.length * TYPING_SPEED + PAUSE_BETWEEN;
const delayExperiences =
  delayExtra + LINE1_HIGHLIGHT.length * TYPING_SPEED + PAUSE_BETWEEN;

const TypingCursor = () => (
  <span className="typing-cursor" aria-hidden="true">
    |
  </span>
);

const Hero = () => {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [stats, setStats] = useState({ projects: '50+', clients: '30+', years: '5+' });

  // Fetch live stats from backend — falls back to hardcoded values if API is unavailable
  useEffect(() => {
    apiFetch('/admin/dashboard')
      .then((data) => {
        if (!data?.stats) return;
        const projects = data.stats.projects?.published ?? data.stats.projects?.total ?? 50;
        setStats({
          projects: `${projects}+`,
          clients:  '30+', // no client count in DB — keep static
          years:    `${new Date().getFullYear() - 2019}+`,
        });
      })
      .catch(() => {}); // silently keep defaults
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const [creating, isTypingCreating] = useTextTypingAnimation(
    LINE1_PREFIX,
    START_DELAY,
    TYPING_SPEED
  );
  const [extraordinary, isTypingExtra] = useTextTypingAnimation(
    LINE1_HIGHLIGHT,
    delayExtra,
    TYPING_SPEED
  );
  const [experiences, isTypingExperiences] = useTextTypingAnimation(
    LINE2,
    delayExperiences,
    TYPING_SPEED
  );

  const showStaticTitle = reduceMotion;

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      requestAnimationFrame(() => {
        const isMobile = window.innerWidth <= 768;
        const offsetTop = isMobile ? target.offsetTop - 20 : target.offsetTop - 100;
        window.scrollTo({
          top: Math.max(0, offsetTop),
          behavior: 'smooth',
        });
      });
    }
  };

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
            aria-label="Creating Extraordinary Experiences"
          >
            <span className="title-line">
              {showStaticTitle ? (
                <>
                  Creating{' '}
                  <span className="title-word highlight">Extraordinary</span>
                </>
              ) : (
                <>
                  <span>{creating}</span>
                  {isTypingCreating && creating.length < LINE1_PREFIX.length && (
                    <TypingCursor />
                  )}
                  {extraordinary.length > 0 && (
                    <span className="title-word highlight">{extraordinary}</span>
                  )}
                  {isTypingExtra && extraordinary.length < LINE1_HIGHLIGHT.length && (
                    <TypingCursor />
                  )}
                </>
              )}
            </span>
            <span className="title-line title-line-accent">
              {showStaticTitle ? (
                LINE2
              ) : (
                <>
                  <span>{experiences}</span>
                  {isTypingExperiences &&
                    experiences.length < LINE2.length && <TypingCursor />}
                </>
              )}
            </span>
          </h1>

          <div className="hero-actions">
            <a
              href="#portfolio"
              className="btn btn-primary"
              onClick={(e) => handleNavClick(e, '#portfolio')}
              aria-label="Explore my work portfolio"
            >
              <span className="btn-text">Explore Work</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
              <div className="btn-shine"></div>
            </a>
            <a
              href="#contact"
              className="btn btn-outline"
              onClick={(e) => handleNavClick(e, '#contact')}
              aria-label="Get in touch"
            >
              <span className="btn-text">Get in Touch</span>
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat-box">
              <span className="stat-number">{stats.projects}</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-box">
              <span className="stat-number">{stats.clients}</span>
              <span className="stat-label">Clients</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-box">
              <span className="stat-number">{stats.years}</span>
              <span className="stat-label">Years</span>
            </div>
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
                src={`${process.env.PUBLIC_URL || ''}/assets/Bereket-Fikre-1.webp`}
                alt="Bereket Fikre, Graphic and brand designer, visual story teller"
                className="hero-image"
                width="800"
                height="1000"
                loading="eager"
                fetchpriority="high"
                decoding="async"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                srcSet={`${process.env.PUBLIC_URL || ''}/assets/Bereket-Fikre-1.webp 800w, ${process.env.PUBLIC_URL || ''}/assets/Bereket-Fikre-1.webp 1600w`}
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
