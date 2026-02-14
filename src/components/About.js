import React from 'react';

const CORE_SKILLS = [
  'Brand Identity',
  'Logo Design',
  'Creative Direction',
  'Strategic Design',
];

const TOOLS = [
  { name: 'Photoshop', percent: 95, icon: 'adobephotoshop' },
  { name: 'Illustrator', percent: 98, icon: 'adobeillustrator' },
  { name: 'InDesign', percent: 92, icon: 'adobeindesign' },
  { name: 'Figma', percent: 80, icon: 'figma' },
  { name: 'Framer', percent: 85, icon: 'framer' },
  { name: 'Affinity Designer', percent: 90, icon: 'affinitydesigner' },
];

const About = () => {
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
          <div className="about-text-block" data-aos="fade-up" data-aos-delay="100">
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
          </div>
          
          <div className="about-bottom-row desktop-only">
            <div className="skills-showcase skills-minimal" data-aos="fade-up" data-aos-delay="150" role="region" aria-label="Core expertise">
              <span className="skills-minimal-label">Core Expertise</span>
              <div className="skills-minimal-tags">
                {CORE_SKILLS.map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            <div className="tools-showcase tools-minimal" data-aos="fade-up" data-aos-delay="200" role="region" aria-label="Design tools">
              <span className="tools-minimal-label">Tools</span>
              <div className="tools-circles">
                {TOOLS.map((tool, i) => (
                  <div key={i} className="tool-circle-item" title={`${tool.name} ${tool.percent}%`}>
                    <div className="tool-circle-wrap">
                      <svg className="tool-circle-svg" viewBox="0 0 36 36">
                        <defs>
                          <linearGradient id={`tool-gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#b4e8c9" />
                            <stop offset="100%" stopColor="#7dd4a8" />
                          </linearGradient>
                        </defs>
                        <path
                          className="tool-circle-bg"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="tool-circle-progress"
                          stroke={`url(#tool-gradient-${i})`}
                          strokeDasharray={`${tool.percent}, 100`}
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <span className="tool-circle-percent">{tool.percent}%</span>
                    </div>
                    <img
                      src={`${process.env.PUBLIC_URL || ''}/assets/Tools/${tool.icon}.svg`}
                      alt={tool.name}
                      className="tool-circle-logo"
                      width="20"
                      height="20"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="about-bottom-row-mobile mobile-only">
            <div className="skills-mobile">
              <span className="skills-mobile-label">Core Expertise</span>
              <div className="skills-mobile-tags">
                {CORE_SKILLS.map((skill, i) => (
                  <span key={i} className="skill-tag-mobile">{skill}</span>
                ))}
              </div>
            </div>
            <div className="tools-mobile">
              <span className="tools-mobile-label">Tools</span>
              <div className="tools-mobile-circles">
                {TOOLS.map((tool, i) => (
                  <div key={i} className="tool-circle-item" title={`${tool.name} ${tool.percent}%`}>
                    <div className="tool-circle-wrap">
                      <svg className="tool-circle-svg" viewBox="0 0 36 36">
                        <defs>
                          <linearGradient id={`tool-mobile-gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#b4e8c9" />
                            <stop offset="100%" stopColor="#7dd4a8" />
                          </linearGradient>
                        </defs>
                        <path
                          className="tool-circle-bg"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="tool-circle-progress"
                          stroke={`url(#tool-mobile-gradient-${i})`}
                          strokeDasharray={`${tool.percent}, 100`}
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <span className="tool-circle-percent">{tool.percent}%</span>
                    </div>
                    <img
                      src={`${process.env.PUBLIC_URL || ''}/assets/Tools/${tool.icon}.svg`}
                      alt={tool.name}
                      className="tool-circle-logo"
                      width="16"
                      height="16"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;


