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
          <path d="M4 19.5A2.5 2.5 0 0 0 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
      ),
      title: 'Graphic Design',
      description: 'Eye-catching visuals for print and digital. From social media to packaging design.',
      features: ['Print Design', 'Social Media Graphics', 'Packaging', 'Illustration']
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
      title: 'Brand Identity',
      description: 'Building memorable brand identities that stand out. Complete visual systems from logo to guidelines.',
      features: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Brand Strategy']
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
      title: 'UI/UX Design',
      description: 'Creating intuitive user experiences that engage and convert. From wireframes to polished interfaces.',
      features: ['User Research', 'Wireframing & Prototyping', 'Design Systems', 'Usability Testing']
    },
    {
      id: '4',
      number: '04',
      icon: (
        <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      ),
      title: 'Web Design',
      description: 'Modern, responsive websites that deliver exceptional experiences. Built for performance and beauty.',
      features: ['Responsive Design', 'E-commerce Solutions', 'Landing Pages', 'Portfolio Sites']
    }
  ];

  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-intro">
          <span className="section-number">02</span>
          <div className="section-header">
            <span className="section-label">What I Do</span>
            <h2 className="section-title">
              <span className="title-main">Design</span>
              <span className="title-accent">Services</span>
            </h2>
          </div>
        </div>
        
        <div className="services-grid-modern">
          {services.map((service) => (
            <article key={service.id} className="service-card-modern" data-service={service.id}>
              <div className="service-card-header">
                <div className="service-number">{service.number}</div>
                <div className="service-icon-wrapper">
                  {service.icon}
                </div>
              </div>
              <div className="service-card-body">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
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






