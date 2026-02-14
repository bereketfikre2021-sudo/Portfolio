import React, { useState, useEffect } from 'react';

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, [isMobile]);

  const services = [
    {
      id: '1',
      number: '01',
      icon: (
        <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
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
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      ),
      title: 'Creative Direction',
      description: 'Concept development, visual storytelling, art direction'
    }
  ];

  return (
    <section id="services" className="services" aria-labelledby="services-heading">
      <div className="container">
        <div className="section-intro" data-aos="fade-up">
          <span className="section-number desktop-number">02</span>
          <span className="section-number mobile-number">02</span>
          <div className="section-header">
            <span className="section-label">What I Do</span>
            <h2 id="services-heading" className="section-title">
              <span className="title-main">Services</span>
            </h2>
          </div>
        </div>
        
        <div className={`services-list-minimal ${isMobile ? 'services-carousel' : ''}`}>
          <div 
            className="services-carousel-track" 
            style={isMobile ? { transform: `translateX(-${activeIndex * 100}%)` } : undefined}
          >
            {services.map((service, index) => (
              <article 
                key={service.id} 
                className="service-item-minimal" 
                data-service={service.id} 
                data-aos={!isMobile ? 'fade-up' : undefined} 
                data-aos-delay={!isMobile ? index * 100 : undefined}
              >
                <div className="service-item-content">
                  <div className="service-item-left">
                    <span className="service-item-number">{service.number}</span>
                    <div className="service-item-icon">
                      {service.icon}
                    </div>
                    <h3 className="service-item-title">{service.title}</h3>
                  </div>
                  <div className="service-item-right">
                    <ul className="service-item-description-list">
                      {service.description.split(',').map((item, i) => (
                        <li key={i}>{item.trim()}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {isMobile && (
            <div className="services-carousel-dots" aria-hidden="true">
              {services.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`services-carousel-dot ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;






