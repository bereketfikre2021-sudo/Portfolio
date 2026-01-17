import React, { useEffect, useRef } from 'react';

const About = () => {
  const toolsRef = useRef(null);

  useEffect(() => {
    const toolBars = toolsRef.current?.querySelectorAll('.tool-progress');
    if (!toolBars) return;

    const toolObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progress = entry.target;
            const targetWidth = progress.getAttribute('data-width') || '100%';
            
            const animateWidth = () => {
              progress.style.width = '0%';
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  progress.style.width = targetWidth;
                });
              });
            };
            
            if (typeof requestIdleCallback !== 'undefined') {
              requestIdleCallback(animateWidth, { timeout: 1000 });
            } else {
              requestAnimationFrame(animateWidth);
            }
            toolObserver.unobserve(progress);
          }
        });
      },
      { threshold: 0.5 }
    );

    toolBars.forEach((bar) => toolObserver.observe(bar));

    return () => {
      toolBars.forEach((bar) => toolObserver.unobserve(bar));
    };
  }, []);

  return (
    <section id="about" className="about" aria-labelledby="about-heading">
      <div className="container">
        <div className="section-intro" data-aos="fade-up">
          <span className="section-number">01</span>
          <div className="section-header">
            <span className="section-label">About Me</span>
            <h2 id="about-heading" className="section-title">
              <span className="title-main">Creative</span>
              <span className="title-accent">Visionary</span>
            </h2>
          </div>
        </div>
        
        <div className="about-grid">
          <div className="about-text-block" data-aos="fade-right" data-aos-delay="100">
            <div className="text-block-header desktop-only">
              <h3>Hello, I'm Bereket</h3>
              <div className="divider-short"></div>
            </div>
            <p className="text-large desktop-only">
              I design intentional, strategic visual identities that help brands communicate clearly and consistently.
            </p>
            <p className="text-large mobile-only">
              Senior Graphic Designer and Brand Builder focused on creating intentional, consistent visual identities across digital and print.
            </p>
            
            <div className="signature" style={{ marginTop: '2rem' }}>
              <img 
                src={`${process.env.PUBLIC_URL || ''}/assets/Logo.svg`} 
                alt="Bereket Fikre signature logo - Brand identity designer and visual systems specialist" 
                className="signature-logo"
                width="120"
                height="36"
                loading="lazy"
                decoding="async"
              />
            </div>
            
            <div className="tools-showcase desktop-only" ref={toolsRef} data-aos="fade-up" data-aos-delay="150">
              <h4 className="tools-title">Tools</h4>
              <div className="tools-list">
                <div className="tool-item" data-tool="Adobe Photoshop">
                  <span className="tool-name">Adobe Photoshop</span>
                  <div className="tool-bar">
                    <div className="tool-progress" data-width="95%" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div className="tool-item" data-tool="Adobe Illustrator">
                  <span className="tool-name">Adobe Illustrator</span>
                  <div className="tool-bar">
                    <div className="tool-progress" data-width="98%" style={{ width: '98%' }}></div>
                  </div>
                </div>
                <div className="tool-item" data-tool="Adobe InDesign">
                  <span className="tool-name">Adobe InDesign</span>
                  <div className="tool-bar">
                    <div className="tool-progress" data-width="92%" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div className="tool-item" data-tool="Affinity Designer">
                  <span className="tool-name">Affinity Designer</span>
                  <div className="tool-bar">
                    <div className="tool-progress" data-width="90%" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div className="tool-item" data-tool="Framer">
                  <span className="tool-name">Framer</span>
                  <div className="tool-bar">
                    <div className="tool-progress" data-width="85%" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="tool-item" data-tool="Figma">
                  <span className="tool-name">Figma</span>
                  <div className="tool-bar">
                    <div className="tool-progress" data-width="80%" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="about-visual-block" data-aos="fade-left" data-aos-delay="200">
            <div className="image-card-modern">
              <div className="card-backdrop"></div>
              <img 
                src={`${process.env.PUBLIC_URL || ''}/assets/Bereket-Fikre-2.webp`} 
                alt="Bereket Fikre, Senior Graphic Designer and Brand Builder, working on brand identity and visual design projects in Addis Ababa, Ethiopia" 
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
            
          </div>
        </div>
        
        <div className="about-features-fullwidth desktop-only" data-aos="fade-up" data-aos-delay="300">
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
        
        <div className="skills-showcase desktop-only" data-aos="fade-up" data-aos-delay="300">
          <h4 className="skills-title">Core Expertise</h4>
          <div className="skills-list">
            <div className="skill-item">
              <span className="skill-name">Brand Identity & Logo Design</span>
            </div>
            <div className="skill-item">
              <span className="skill-name">Visual Systems & Brand Consistency</span>
            </div>
            <div className="skill-item">
              <span className="skill-name">Creative Direction & Visual Storytelling</span>
            </div>
            <div className="skill-item">
              <span className="skill-name">Digital & Print Design</span>
            </div>
            <div className="skill-item">
              <span className="skill-name">Social Media Visuals</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;


