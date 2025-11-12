import React, { useEffect, useRef } from 'react';

const About = () => {
  const skillsRef = useRef(null);

  useEffect(() => {
    const skillBars = skillsRef.current?.querySelectorAll('.skill-progress');
    if (!skillBars) return;

    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progress = entry.target;
            // Read from data attribute first to avoid forced reflow from getComputedStyle
            // This avoids forced reflow by reading attribute before any style reads/writes
            const targetWidth = progress.getAttribute('data-width') || '100%';
            
            // Batch all DOM writes together using requestAnimationFrame
            // This ensures we don't read layout properties after writes
            requestAnimationFrame(() => {
              progress.style.width = '0%';
              // Use double requestAnimationFrame to ensure browser has painted before animating
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  progress.style.width = targetWidth;
                });
              });
            });
            skillObserver.unobserve(progress);
          }
        });
      },
      { threshold: 0.5 }
    );

    skillBars.forEach((bar) => skillObserver.observe(bar));

    return () => {
      skillBars.forEach((bar) => skillObserver.unobserve(bar));
    };
  }, []);

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-intro">
          <span className="section-number">01</span>
          <div className="section-header">
            <span className="section-label">About Me</span>
            <h2 className="section-title">
              <span className="title-main">Creative</span>
              <span className="title-accent">Visionary</span>
            </h2>
          </div>
        </div>
        
        <div className="about-grid">
          <div className="about-text-block">
            <div className="text-block-header">
              <h3>Hello, I'm Bereket</h3>
              <div className="divider-short"></div>
            </div>
            <p className="text-large">
              I'm a graphic designer and brand builder with a focus on creating visual identities that are not just beautiful but intentional, strategic, and built to last.
            </p>
            <p className="text-body">
              Whether it's crafting a logo, developing a full brand system, or designing digital and print assets, I work closely with clients to turn ideas into visuals that truly represent who they are.
            </p>
            <p className="text-body">
              I combine design thinking with brand strategy to help businesses of all sizes show up clearly, confidently, and consistently. From startups to rebrands, I build brands that look right and feel right.
            </p>
            <p className="text-body" style={{ fontStyle: 'italic', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-light-10)' }}>
              Let's make something that sticks with meaning, style, and purpose.
            </p>
            <p className="text-body" style={{ marginTop: '0.5rem', fontWeight: 600, color: 'var(--color-light)' }}>
              Bereket Fikre (Graphic Designer, Brand builder)
            </p>
            
            <div className="about-features">
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <div className="feature-content">
                  <h4>Strategic Design</h4>
                  <p>Data-driven decisions meet creative vision</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <div className="feature-content">
                  <h4>Brand Focus</h4>
                  <p>Building memorable brand identities</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <div className="feature-content">
                  <h4>User-Centered</h4>
                  <p>Designs that users love and understand</p>
                </div>
              </div>
            </div>
            
            <div className="about-social">
              <h4 className="social-title">Connect With Me</h4>
              <div className="social-modern">
                <a href="https://dribbble.com/bereket-fikre" target="_blank" rel="noopener noreferrer" className="social-item" aria-label="Dribbble - View Bereket Fikre's design portfolio">
                  <img src={`${process.env.PUBLIC_URL || ''}/assets/dribble-svgrepo-com.svg`} alt="Dribbble - View Bereket Fikre's design portfolio" className="social-icon-img" loading="lazy" width="18" height="18" decoding="async" sizes="18px" />
                </a>
                <a href="https://www.behance.net/bereketfikre" target="_blank" rel="noopener noreferrer" className="social-item" aria-label="Behance - View Bereket Fikre's portfolio">
                  <img src={`${process.env.PUBLIC_URL || ''}/assets/behance-svgrepo-com.svg`} alt="Behance - View Bereket Fikre's portfolio" className="social-icon-img" loading="lazy" width="24" height="24" decoding="async" sizes="24px" />
                </a>
                <a href="https://www.freelancer.com/u/bereketfikre" target="_blank" rel="noopener noreferrer" className="social-item" aria-label="Freelancer - View Bereket Fikre's profile">
                  <img src={`${process.env.PUBLIC_URL || ''}/assets/freelancer-svgrepo-com.svg`} alt="Freelancer - View Bereket Fikre's profile" className="social-icon-img" loading="lazy" width="24" height="24" decoding="async" sizes="24px" />
                </a>
                <a href="https://www.upwork.com/freelancers/~019189891a0638d811?mp_source=share" target="_blank" rel="noopener noreferrer" className="social-item" aria-label="Upwork - View Bereket Fikre's profile">
                  <img src={`${process.env.PUBLIC_URL || ''}/assets/upwork-svgrepo-com.svg`} alt="Upwork - View Bereket Fikre's profile" className="social-icon-img" loading="lazy" width="24" height="24" decoding="async" sizes="24px" />
                </a>
                <a href="https://www.linkedin.com/in/bereket-fikre-graphic-designer" target="_blank" rel="noopener noreferrer" className="social-item" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="https://github.com/bereketfikre2021-sudo" target="_blank" rel="noopener noreferrer" className="social-item" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="about-visual-block">
            <div className="image-card-modern">
              <div className="card-backdrop"></div>
              <img 
                src={`${process.env.PUBLIC_URL || ''}/assets/Bereket-Fikre-2.webp`} 
                alt="Bereket Fikre - Professional Graphic Designer and Brand Identity Specialist working on creative design projects" 
                className="card-image" 
                width="600" 
                height="800" 
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 50vw"
                srcSet={`${process.env.PUBLIC_URL || ''}/assets/Bereket-Fikre-2.webp 600w, ${process.env.PUBLIC_URL || ''}/assets/Bereket-Fikre-2.webp 1200w`}
              />
              <div className="card-accent"></div>
            </div>
            
            <div className="skills-showcase" ref={skillsRef}>
              <h4 className="skills-title">Core Expertise</h4>
              <div className="skills-list">
                <div className="skill-item" data-skill="Graphic Design">
                  <span className="skill-name">Graphic Design</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="92%" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div className="skill-item" data-skill="Brand Identity">
                  <span className="skill-name">Brand Identity</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="98%" style={{ width: '98%' }}></div>
                  </div>
                </div>
                <div className="skill-item" data-skill="UI/UX Design">
                  <span className="skill-name">UI/UX Design</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="95%" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div className="skill-item" data-skill="Web Design">
                  <span className="skill-name">Web Design</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="90%" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;


