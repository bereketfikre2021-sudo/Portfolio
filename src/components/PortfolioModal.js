import React, { useContext, useEffect } from 'react';
import { ModalContext } from '../context/ModalContext';

const PortfolioModal = () => {
  const { portfolioModal, closePortfolioModal } = useContext(ModalContext);

  const projectData = {
    'andegna-tshirt': {
      image: '/assets/Portfolio/Andegna-Tshirt-d5d4e074.webp',
      category: 'Furniture',
      title: 'Corporate Apparel Design – Driver\'s T-Shirt for Andegna Furniture',
      description: 'Branded t-shirt design for Andegna Furniture\'s delivery team, created to reflect professionalism, brand consistency, and day-to-day wearability. Corporate apparel design that enhances brand visibility while maintaining comfort and functionality for delivery personnel.',
      type: 'Apparel'
    },
    'andegna-wood-metal': {
      image: '/assets/Portfolio/Andegna-b3d5f6c0.webp',
      category: 'Corporate',
      title: 'Office Signage Design - Andegna Wood And Metal Works',
      description: 'Professional signage design including office wall graphics, roll-up banner displays, and environmental graphics for impactful corporate communication.',
      type: 'Signage'
    },
    'finix': {
      image: '/assets/Portfolio/Finix-e442443e.webp',
      category: 'Digital Marketing',
      title: 'Finix Web Asset Collection',
      description: 'Comprehensive web asset collection including website banners, digital marketing materials, and promotional graphics for engaging online presence.',
      type: 'Web'
    },
    'swan-clothing': {
      image: '/assets/Portfolio/swan-clothing-208aede7.webp',
      category: 'Fashion',
      title: 'Brand Identity - Swan Clothing',
      description: 'Complete brand identity package including logo design, product packaging mockups, and comprehensive brand guidelines for a modern fashion brand.',
      type: 'Branding'
    },
    'maleda-coffee': {
      image: '/assets/Portfolio/Maleda-Coffee-7b6d183c.webp',
      category: 'Beverage',
      title: 'Maleda Coffee',
      description: 'Premium coffee brand identity with rich visual storytelling, packaging design, and complete brand experience from bean to cup. The identity reflects the artisanal quality and heritage of Ethiopian coffee culture.',
      type: 'Packaging Design'
    },
    'yat-construction': {
      image: '/assets/Portfolio/YAT-Construction-PLC-8e3605ca.webp',
      category: 'Corporate',
      title: 'Company Logo Rebranding - Y.A.T Construction PLC',
      description: 'Complete logo rebranding and stationery design including professional letterheads, business cards, envelopes, and folders for cohesive corporate identity with modern brand transformation.',
      type: 'Logo Rebranding'
    },
    'alta': {
      image: '/assets/Portfolio/Alta-145bd5fa.webp',
      category: 'Healthcare',
      title: 'Company Logo Rebranding - Alta Counseling',
      description: 'Complete company logo rebranding including full stationery design, roll-up banners, and website banner. Comprehensive brand identity overhaul with modern design elements and cohesive visual system.',
      type: 'Rebranding'
    },
    'medavail': {
      image: '/assets/Portfolio/Medavail-0d27baad.webp',
      category: 'Healthcare',
      title: 'Company Logo Rebranding - Medavail Pharmaceuticals',
      description: 'Complete company logo rebranding including office signage, stationery design, and social media templates. Comprehensive brand identity transformation with modern design elements and cohesive visual system for pharmaceutical company.',
      type: 'Rebranding'
    },
    'niqat-menu': {
      image: '/assets/Portfolio/Niqat-Menu-6b07a3f4.webp',
      category: 'Cafe',
      title: 'Cafe Menu & Brochure Design - Niqat Coffee',
      description: 'Complete cafe menu design including trifold layout and modern typography. Professional menu design that enhances customer experience with elegant print presentation and clear visual hierarchy.',
      type: 'Menu Design'
    },
    'rollup-banners': {
      image: '/assets/Portfolio/Rollup-Banners-68a13cab.webp',
      category: 'Events',
      title: 'Rollup Banners for Different Companies',
      description: 'Professional rollup banner designs for various companies, featuring modern layouts, compelling visuals, and brand-consistent messaging. High-quality print-ready designs that effectively communicate company information and enhance brand visibility at events and exhibitions.',
      type: 'Banners'
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && portfolioModal.isOpen) {
        closePortfolioModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [portfolioModal.isOpen, closePortfolioModal]);

  if (!portfolioModal.isOpen || !portfolioModal.projectId) return null;

  const project = projectData[portfolioModal.projectId];
  if (!project) return null;

  return (
    <div 
      className={`portfolio-modal ${portfolioModal.isOpen ? 'active' : ''}`}
      role="dialog"
      aria-labelledby="modalTitle"
      aria-modal="true"
    >
      <div className="modal-overlay" onClick={closePortfolioModal}></div>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" aria-label="Close modal" onClick={closePortfolioModal}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="modal-content">
          <div className="modal-image-wrapper">
            <img 
              id="modalImage"
              src={`${process.env.PUBLIC_URL || ''}${project.image}`} 
              alt={`${project.title} - ${project.category} project by Bereket Fikre. ${project.description}`} 
              className="modal-image"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 768px) 100vw, 90vw"
            />
          </div>
          <div className="modal-body">
            <span id="modalCategory" className="modal-category">{project.category}</span>
            <h2 id="modalTitle" className="modal-title">{project.title}</h2>
            <div id="modalDescription" className="modal-description">
              <p>{project.description}</p>
            </div>
            <div className="modal-details">
              <div className="modal-detail-item">
                <span className="detail-label">Category</span>
                <span id="modalCategoryFull" className="detail-value">{project.category}</span>
              </div>
              <div className="modal-detail-item">
                <span className="detail-label">Project Type</span>
                <span id="modalType" className="detail-value">{project.type}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;


