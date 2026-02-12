import React, { useRef } from 'react';
import { useTextTypingAnimation } from '../hooks/useTextTypingAnimation';

const Hero = () => {
  const titleRef = useRef(null);
  
  // Typing animation for hero title
  const [firstWord, isFirstTyping] = useTextTypingAnimation('Creating', 300, 60);
  const [secondWord, isSecondTyping] = useTextTypingAnimation('Extraordinary', 1200, 60);
  const [thirdWord, isThirdTyping] = useTextTypingAnimation('Experiences', 2200, 60);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      // Use requestAnimationFrame to batch layout reads
      requestAnimationFrame(() => {
      const isMobile = window.innerWidth <= 768;
      const offsetTop = isMobile ? target.offsetTop - 20 : target.offsetTop - 100;
      window.scrollTo({
        top: Math.max(0, offsetTop),
        behavior: 'smooth'
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
          <div className="hero-badge">
            <span className="badge-dot"></span>
            <span className="badge-text">Available for Projects</span>
          </div>
          
          <h1 className="hero-title" ref={titleRef}>
            <span className="title-word" data-word="Creating">
              {firstWord}
              {isFirstTyping && <span className="typing-cursor">|</span>}
            </span>
            <span className="title-word" data-word="Extraordinary">
              {secondWord}
              {isSecondTyping && <span className="typing-cursor">|</span>}
            </span>
            <span className="title-word highlight" data-word="Experiences">
              {thirdWord}
              {isThirdTyping && <span className="typing-cursor">|</span>}
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
              href={`${process.env.PUBLIC_URL || ''}/Bereket-Fikre-CV.pdf`}
              className="btn btn-outline btn-cv"
              download="Bereket-Fikre-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Bereket Fikre CV (PDF)"
            >
              <span className="btn-text">Download CV</span>
              <span className="btn-arrow" aria-hidden="true">↓</span>
            </a>
          </div>
          
          <div className="hero-stats">
            <div className="stat-box">
              <span className="stat-number" data-target="50">50+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-box">
              <span className="stat-number" data-target="30">30+</span>
              <span className="stat-label">Clients</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-box">
              <span className="stat-number" data-target="5">5+</span>
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


