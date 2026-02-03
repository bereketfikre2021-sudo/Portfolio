import React, { useEffect, useRef, useContext } from 'react';
import { ModalContext } from '../context/ModalContext';

const servicesData = [
  {
    id: '1',
    number: '01',
    icon: (
      <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    title: 'Brand Identity',
    description: 'Logo design, visual systems, brand consistency'
  },
  {
    id: '3',
    number: '02',
    icon: (
      <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/>
      </svg>
    ),
    title: 'Digital Design',
    description: 'Social media visuals, campaigns, content creation'
  },
  {
    id: '4',
    number: '03',
    icon: (
      <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
      </svg>
    ),
    title: 'Print & Marketing',
    description: 'Catalogs, brochures, brand collateral'
  },
  {
    id: '2',
    number: '04',
    icon: (
      <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    title: 'Creative Direction',
    description: 'Concept development, visual storytelling, art direction'
  }
];

const About = () => {
  const toolsRef = useRef(null);
  const { openServiceModal } = useContext(ModalContext);

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
          <span className="section-number desktop-number">01</span>
          <span className="section-number mobile-number">01</span>
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
            <div className="floating-label floating-label-3">
              <div className="label-dot"></div>
              <span>Strategic Design</span>
            </div>
            <div className="floating-label floating-label-4">
              <div className="label-dot"></div>
              <span>User-Centered</span>
            </div>
            <div className="floating-label floating-label-5">
              <div className="label-dot"></div>
              <span>Brand Focus</span>
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
              <span className="skill-name">Strategic Design Thinking</span>
            </div>
          </div>
        </div>

        <div className="about-services" data-aos="fade-up" data-aos-delay="200">
          <h4 className="skills-title">Services</h4>
          <div className="services-list-minimal">
            {servicesData.map((service, index) => (
              <article
                key={service.id}
                className="service-item-minimal"
                data-service={service.id}
                onClick={() => openServiceModal?.(service.id)}
              >
                <div className="service-item-content">
                  <div className="service-item-left">
                    <span className="service-item-number">{service.number}</span>
                    <div className="service-item-icon">{service.icon}</div>
                    <h3 className="service-item-title">{service.title}</h3>
                  </div>
                  <div className="service-item-right">
                    <button
                      type="button"
                      className="service-item-link"
                      data-service-link={service.id}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openServiceModal?.(service.id);
                      }}
                      aria-label={`Learn more about ${service.title} service`}
                    >
                      <span>Learn More</span>
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;


