import React, { useEffect, useRef, useState } from 'react';
import { useCounterAnimation } from '../hooks/useCounterAnimation';

const Hero = () => {
  const statsRef = useRef(null);
  const heroRef = useRef(null);
  const [projectsCount] = useCounterAnimation(50, statsRef);
  const [clientsCount] = useCounterAnimation(30, statsRef);
  const [yearsCount] = useCounterAnimation(5, statsRef);

  // Enhanced parallax effect for hero section
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!heroRef.current || ticking) return;
      
      ticking = true;
      requestAnimationFrame(() => {
        if (!heroRef.current) {
          ticking = false;
          return;
        }
        
        const scrolled = window.pageYOffset;
        const hero = heroRef.current;
        const heroContent = hero.querySelector('.hero-content');
        const heroImage = hero.querySelector('.hero-image-container');
        const heroBlobs = hero.querySelectorAll('.hero-blob');
        const heroLeft = hero.querySelector('.hero-left');
        const heroRight = hero.querySelector('.hero-right');

        // Hero content - slower parallax for depth
        if (heroContent) {
          const contentY = scrolled * 0.25;
          heroContent.style.transform = `translateY(${contentY}px)`;
        }

        // Left side (text content) - subtle movement
        if (heroLeft) {
          const leftY = scrolled * 0.2;
          const leftX = scrolled * 0.05;
          heroLeft.style.transform = `translate(${leftX}px, ${leftY}px)`;
        }

        // Right side (image) - faster parallax for foreground effect
        if (heroRight) {
          const rightY = scrolled * 0.4;
          const rightX = scrolled * -0.03;
          heroRight.style.transform = `translate(${rightX}px, ${rightY}px)`;
        }

        // Hero image - enhanced parallax with scale
        if (heroImage) {
          const imageY = scrolled * 0.6;
          const imageScale = 1 + (scrolled * 0.0001);
          heroImage.style.transform = `translateY(${imageY}px) scale(${Math.min(imageScale, 1.05)})`;
        }

        // Background blobs - varied speeds for layered depth
        heroBlobs.forEach((blob, index) => {
          const baseSpeed = 0.15 + (index * 0.08);
          const rotationSpeed = 0.03 + (index * 0.02);
          const horizontalOffset = (index % 2 === 0 ? 1 : -1) * scrolled * 0.02;
          
          blob.style.transform = `
            translate(${horizontalOffset}px, ${scrolled * baseSpeed}px) 
            rotate(${scrolled * rotationSpeed}deg)
            scale(${1 + (scrolled * 0.00005)})
          `;
        });

        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <section id="home" className="hero" ref={heroRef}>
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
              href="tel:+251923988838" 
              className="btn btn-outline" 
              aria-label="Call me to discuss your project"
            >
              <span className="btn-text">Let's Talk</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
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
          <div className="hero-image-container" data-parallax="true">
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
                fetchpriority="high"
                decoding="async"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                srcSet={`${process.env.PUBLIC_URL || ''}/assets/Bereket-Fikre-1.webp 800w, ${process.env.PUBLIC_URL || ''}/assets/Bereket-Fikre-1.webp 1600w`}
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
    </section>
  );
};

export default Hero;


