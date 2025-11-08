import React, { useContext, useEffect } from 'react';
import { ModalContext } from '../context/ModalContext';

const ServicesModal = () => {
  const { serviceModal, closeServiceModal } = useContext(ModalContext);

  const serviceData = {
    '1': {
      number: '01',
      icon: (
        <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 0 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
      ),
      category: 'Design Service',
      title: 'Graphic Design',
      description: 'Eye-catching visuals for print and digital media. From social media graphics to comprehensive packaging design, I create visuals that captivate audiences and communicate your message effectively. Every design is crafted with attention to detail and brand consistency.',
      features: [
        'Print Design',
        'Social Media Graphics',
        'Packaging Design',
        'Illustration & Artwork',
        'Brochures & Flyers',
        'Business Cards & Stationery'
      ],
      type: 'Print & Digital Design',
      deliveryTime: '7-14 Business Days'
    },
    '2': {
      number: '02',
      icon: (
        <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      ),
      category: 'Branding Service',
      title: 'Brand Identity',
      description: 'Building memorable brand identities that stand out in the marketplace. I create complete visual systems from logo design to comprehensive brand guidelines. Your brand identity will be cohesive, professional, and perfectly aligned with your business goals.',
      features: [
        'Logo Design',
        'Brand Guidelines',
        'Visual Identity System',
        'Brand Strategy',
        'Color Palette & Typography',
        'Brand Applications'
      ],
      type: 'Complete Branding',
      deliveryTime: '14-21 Business Days'
    },
    '3': {
      number: '03',
      icon: (
        <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M3 9h18M9 21V9"/>
        </svg>
      ),
      category: 'Digital Service',
      title: 'UI/UX Design',
      description: 'Creating intuitive user experiences that engage and convert. From wireframes to polished interfaces, I design digital products that users love. Every interaction is carefully crafted for optimal usability and delightful experiences.',
      features: [
        'User Research',
        'Wireframing & Prototyping',
        'Design Systems',
        'Usability Testing',
        'Interface Design',
        'Interaction Design'
      ],
      type: 'User Experience Design',
      deliveryTime: '21-30 Business Days'
    },
    '4': {
      number: '04',
      icon: (
        <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      ),
      category: 'Web Service',
      title: 'Web Design',
      description: 'Modern, responsive websites that deliver exceptional experiences. Built for performance and beauty, I create websites that not only look stunning but also perform flawlessly across all devices. Your online presence will be professional, fast, and conversion-focused.',
      features: [
        'Responsive Design',
        'E-commerce Solutions',
        'Landing Pages',
        'Portfolio Websites',
        'Web Applications',
        'Performance Optimization'
      ],
      type: 'Web Development Ready',
      deliveryTime: '14-28 Business Days'
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && serviceModal.isOpen) {
        closeServiceModal();
      }
    };

    const handlePopState = () => {
      if (serviceModal.isOpen) {
        closeServiceModal();
      }
    };

    if (serviceModal.isOpen) {
      window.history.pushState({ modal: 'service' }, '');
      window.addEventListener('popstate', handlePopState);
    }

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [serviceModal.isOpen, closeServiceModal]);

  if (!serviceModal.isOpen || !serviceModal.serviceId) return null;

  const service = serviceData[serviceModal.serviceId];
  if (!service) return null;

  return (
    <div 
      className={`services-modal ${serviceModal.isOpen ? 'active' : ''}`}
      role="dialog"
      aria-labelledby="serviceModalTitle"
      aria-modal="true"
    >
      <div className="modal-overlay" onClick={closeServiceModal}></div>
      <div className="service-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="service-modal-close" aria-label="Close modal" onClick={closeServiceModal}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="service-modal-content">
          <div className="service-modal-header">
            <span id="serviceModalNumber" className="service-modal-number">{service.number}</span>
            <div id="serviceModalIcon" className="service-modal-icon-wrapper">
              {service.icon}
            </div>
          </div>
          <div className="service-modal-body">
            <span id="serviceModalCategory" className="service-modal-category">{service.category}</span>
            <h2 id="serviceModalTitle" className="service-modal-title">{service.title}</h2>
            <div id="serviceModalDescription" className="service-modal-description">
              <p>{service.description}</p>
            </div>
            <div className="service-modal-features">
              <h3 className="service-features-title">What's Included</h3>
              <ul id="serviceModalFeatures" className="service-modal-features-list">
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="service-modal-details">
              <div className="service-modal-detail-item">
                <span className="detail-label">Service Type</span>
                <span id="serviceModalType" className="detail-value">{service.type}</span>
              </div>
              <div className="service-modal-detail-item">
                <span className="detail-label">Delivery Time</span>
                <span id="serviceModalTime" className="detail-value">{service.deliveryTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesModal;






