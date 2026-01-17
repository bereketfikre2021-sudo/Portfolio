import React, { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';

const Services = () => {
  const { openServiceModal } = useContext(ModalContext);

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
      description: 'Logo design, visual identity systems, brand guidelines, sub-brand development'
    },
    {
      id: '2',
      number: '02',
      icon: (
        <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      ),
      title: 'Creative Direction',
      description: 'Concept development, visual storytelling, art direction for campaigns and shoots'
    },
    {
      id: '3',
      number: '03',
      icon: (
        <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/>
        </svg>
      ),
      title: 'Digital Design',
      description: 'Social media visuals, digital campaigns, web and interface visuals'
    },
    {
      id: '4',
      number: '04',
      icon: (
        <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
        </svg>
      ),
      title: 'Print & Marketing',
      description: 'Catalogs, brochures, flyers, banners, brand collateral'
    },
    {
      id: '5',
      number: '05',
      icon: (
        <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/>
        </svg>
      ),
      title: 'Content & Visual Production',
      description: 'Product photography, photo editing, video and motion basics'
    }
  ];

  return (
    <section id="services" className="services" aria-labelledby="services-heading">
      <div className="container">
        <div className="section-intro" data-aos="fade-up">
          <span className="section-number">02</span>
          <div className="section-header">
            <span className="section-label">What I Do</span>
            <h2 id="services-heading" className="section-title">
              <span className="title-main">Services</span>
            </h2>
          </div>
        </div>
        
        <div className="services-grid-modern">
          {services.map((service, index) => (
            <article key={service.id} className="service-card-modern" data-service={service.id} data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="service-card-header">
                <div className="service-number">{service.number}</div>
                <div className="service-icon-wrapper">
                  {service.icon}
                </div>
              </div>
              <div className="service-card-body">
                <h3>{service.title}</h3>
              </div>
              <div className="service-card-footer">
                <a 
                  href="#" 
                  className="service-link" 
                  data-service-link={service.id} 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (openServiceModal) {
                      openServiceModal(service.id);
                    } else {
                      console.error('openServiceModal is not defined');
                    }
                  }}
                  aria-label={`Learn more about ${service.title} service`}
                >
                  <span>Learn More</span>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
              <div className="service-hover-effect"></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;






