import React, { useContext, useEffect, useRef } from 'react';
import { ModalContext } from '../context/ModalContext';
import { useFocusTrap } from '../hooks/useFocusTrap';

const ServicesModal = () => {
  const { serviceModal, closeServiceModal } = useContext(ModalContext);
  const modalRef = useRef(null);
  useFocusTrap(serviceModal?.isOpen, modalRef);
  
  const serviceData = {
    '1': {
      number: '01',
      icon: (
        <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      ),
      category: 'Branding Service',
      title: 'Brand Identity',
      description: 'Logo design, visual systems, brand consistency',
      features: [
        'Logo Design',
        'Visual Systems',
        'Brand Consistency',
        'Brand Guidelines',
        'Color Palette & Typography',
        'Brand Applications'
      ],
      type: 'Complete Branding',
      deliveryTime: '14-21 Business Days'
    },
    '3': {
      number: '02',
      icon: (
        <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/>
        </svg>
      ),
      category: 'Digital Service',
      title: 'Digital Design',
      description: 'Social media visuals, campaigns, content creation',
      features: [
        'Social Media Visuals',
        'Digital Campaigns',
        'Content Creation',
        'Web Visuals',
        'Digital Branding',
        'Online Marketing Materials'
      ],
      type: 'Digital Design',
      deliveryTime: '7-14 Business Days'
    },
    '4': {
      number: '03',
      icon: (
        <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
        </svg>
      ),
      category: 'Print Service',
      title: 'Print & Marketing',
      description: 'Catalogs, brochures, brand collateral',
      features: [
        'Catalogs',
        'Brochures',
        'Brand Collateral',
        'Print Marketing Materials',
        'Brand Applications',
        'Marketing Design'
      ],
      type: 'Print & Marketing Design',
      deliveryTime: '7-14 Business Days'
    },
    '2': {
      number: '04',
      icon: (
        <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      ),
      category: 'Creative Service',
      title: 'Creative Direction',
      description: 'Concept development, visual storytelling, art direction',
      features: [
        'Concept Development',
        'Visual Storytelling',
        'Art Direction',
        'Campaign Direction',
        'Creative Strategy',
        'Visual Communication'
      ],
      type: 'Creative Leadership',
      deliveryTime: '7-14 Business Days'
    }
  };

  // Announce modal opening to screen readers
  useEffect(() => {
    if (serviceModal?.isOpen && serviceModal?.serviceId) {
      const service = serviceData[serviceModal.serviceId];
      if (service) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
          liveRegion.textContent = `Opened service: ${service.title}`;
          setTimeout(() => {
            liveRegion.textContent = '';
          }, 1000);
        }
      }
    }
  }, [serviceModal?.isOpen, serviceModal?.serviceId]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && serviceModal?.isOpen) {
        closeServiceModal();
      }
    };

    const handlePopState = () => {
      if (serviceModal?.isOpen) {
        closeServiceModal();
      }
    };

    if (serviceModal?.isOpen) {
      window.history.pushState({ modal: 'service' }, '');
      window.addEventListener('popstate', handlePopState);
    }

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [serviceModal?.isOpen, closeServiceModal]);

  if (!serviceModal?.isOpen || !serviceModal?.serviceId) return null;

  const service = serviceData[serviceModal.serviceId];
  if (!service) {
    console.warn('Service not found for ID:', serviceModal.serviceId);
    return null;
  }

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="serviceModalTitle"
      aria-describedby="service-modal-description" 
      className={`services-modal ${serviceModal?.isOpen ? 'active' : ''}`}
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






