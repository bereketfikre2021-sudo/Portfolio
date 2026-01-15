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
      title: 'Brand Identity Design',
      description: 'Creating complete brand identities that define how a brand looks, feels, and communicates. This includes logos, color systems, typography, and visual guidelines built for consistency and long-term use.'
    },
    {
      id: '2',
      number: '02',
      icon: (
        <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v4l3 3"/>
        </svg>
      ),
      title: 'Logo Design',
      description: 'Designing distinctive, meaningful logos that reflect a brand\'s personality and work seamlessly across digital and print platforms.'
    },
    {
      id: '3',
      number: '03',
      icon: (
        <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M3 9h18M9 21V9"/>
        </svg>
      ),
      title: 'Visual Identity Systems',
      description: 'Developing cohesive visual systems that ensure consistency across all brand touchpoints, from marketing materials to digital content and physical applications.'
    },
    {
      id: '4',
      number: '04',
      icon: (
        <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 0 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
      ),
      title: 'Marketing & Campaign Design',
      description: 'Designing creative visuals for campaigns, promotions, and brand communications that align with strategic goals and strengthen brand recognition.'
    },
    {
      id: '5',
      number: '05',
      icon: (
        <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
        </svg>
      ),
      title: 'Print Design',
      description: 'Designing professional print materials such as catalogs, brochures, posters, banners, and branded assets with a strong focus on layout, readability, and production quality.'
    },
    {
      id: '6',
      number: '06',
      icon: (
        <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/>
        </svg>
      ),
      title: 'Digital & Social Media Design',
      description: 'Creating clear, engaging digital visuals for social media and online platforms while maintaining strong brand consistency.'
    },
    {
      id: '7',
      number: '07',
      icon: (
        <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      ),
      title: 'Art Direction & Visual Guidance',
      description: 'Providing visual direction for product presentation, photography, and creative assets to ensure high-quality, cohesive results.'
    },
    {
      id: '8',
      number: '08',
      icon: (
        <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/>
        </svg>
      ),
      title: 'Brand Applications & Assets',
      description: 'Designing real-world brand applications such as uniforms, merchandise, signage, and internal materials that extend the brand beyond the screen.'
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
                <p>{service.description}</p>
              </div>
              <div className="service-card-footer">
                <a 
                  href="#" 
                  className="service-link" 
                  data-service-link={service.id} 
                  onClick={(e) => {
                    e.preventDefault();
                    openServiceModal(service.id);
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






