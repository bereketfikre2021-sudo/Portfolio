import React, { useEffect, useRef, useState } from 'react';
import { useCounterAnimation } from '../hooks/useCounterAnimation';

const Hero = () => {
  const statsRef = useRef(null);
  const [projectsCount] = useCounterAnimation(50, statsRef);
  const [clientsCount] = useCounterAnimation(30, statsRef);
  const [yearsCount] = useCounterAnimation(5, statsRef);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const isMobile = window.innerWidth <= 768;
      const offsetTop = isMobile ? target.offsetTop - 20 : target.offsetTop - 100;
      window.scrollTo({
        top: Math.max(0, offsetTop),
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="hero-gradient-overlay"></div>
        <div className="hero-blob blob-1"></div>
        <div className="hero-blob blob-2"></div>
        <div className="hero-blob blob-3"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-left">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            <span className="badge-text">Available for Projects</span>
          </div>
          
          <h1 className="hero-title">
            <span className="title-word" data-word="Creating">Creating</span>
            <span className="title-word" data-word="Extraordinary">Extraordinary</span>
            <span className="title-word highlight" data-word="Experiences">Experiences</span>
          </h1>
          
          <div className="hero-subtitle">
            <p className="subtitle-line">I'm <strong>Bereket Fikre</strong>, a creative designer</p>
            <p className="subtitle-line">specializing in <strong>brand identity</strong>, <strong>UI/UX</strong>, and <strong>digital experiences</strong></p>
          </div>
          
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
              aria-label="Let's talk about your project"
            >
              <span className="btn-text">Let's Talk</span>
            </a>
          </div>
          
          <div className="hero-stats" ref={statsRef}>
            <div className="stat-box">
              <span className="stat-number" data-target="50">{projectsCount}+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-box">
              <span className="stat-number" data-target="30">{clientsCount}+</span>
              <span className="stat-label">Clients</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-box">
              <span className="stat-number" data-target="5">{yearsCount}+</span>
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
                alt="Bereket Fikre - Creative Graphic Designer and Brand Builder specializing in brand identity, UI/UX design, and digital experiences" 
                className="hero-image" 
                width="800" 
                height="1000" 
                loading="eager" 
                fetchPriority="high"
                decoding="async"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              />
              <div className="image-overlay"></div>
            </div>
            <div className="floating-label floating-label-1">
              <div className="label-dot"></div>
              <span>Brand Design</span>
            </div>
            <div className="floating-label floating-label-2">
              <div className="label-dot"></div>
              <span>UI/UX Expert</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="scroll-hint">
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
};

export default Hero;


