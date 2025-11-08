import React, { useContext, useEffect } from 'react';
import { ModalContext } from '../context/ModalContext';

const CaseStudyModal = () => {
  const { caseStudyModal, closeCaseStudyModal } = useContext(ModalContext);

  const caseStudyData = {
    'andegna-tshirt': {
      image: '/assets/Portfolio/Andegna-Tshirt-d5d4e074.webp',
      category: 'Furniture',
      title: 'Corporate Apparel Design – Driver\'s T-Shirt for Andegna Furniture',
      description: 'Branded t-shirt design for Andegna Furniture\'s delivery team, created to reflect professionalism, brand consistency, and day-to-day wearability. Corporate apparel design that enhances brand visibility while maintaining comfort and functionality for delivery personnel. This project involved understanding the brand identity, creating designs that work in various environments, and ensuring durability for daily use.',
      type: 'Apparel',
      challenge: 'Create professional branded apparel that maintains brand consistency while being practical for daily delivery operations.',
      solution: 'Developed a clean, professional design that incorporates the brand logo and colors while ensuring comfort and durability for delivery personnel.',
      results: 'Increased brand visibility and professional appearance of delivery team, enhancing customer perception and brand recognition.'
    },
    'andegna-wood-metal': {
      image: '/assets/Portfolio/Andegna-b3d5f6c0.webp',
      category: 'Corporate',
      title: 'Office Signage Design - Andegna Wood And Metal Works',
      description: 'Professional signage design including office wall graphics, roll-up banner displays, and environmental graphics for impactful corporate communication. This comprehensive signage system creates a cohesive brand experience throughout the office environment.',
      type: 'Signage',
      challenge: 'Design a comprehensive signage system that reflects the company\'s expertise in wood and metal works while maintaining professional corporate aesthetics.',
      solution: 'Created a unified signage system using materials and design elements that echo the company\'s core business, incorporating wood and metal textures in the visual design.',
      results: 'Enhanced brand presence and professional image, improved wayfinding, and created a cohesive brand experience for clients and employees.'
    },
    'swan-clothing': {
      image: '/assets/Portfolio/swan-clothing-208aede7.webp',
      category: 'Fashion',
      title: 'Brand Identity - Swan Clothing',
      description: 'Complete brand identity package including logo design, product packaging mockups, and comprehensive brand guidelines for a modern fashion brand. This project established a strong visual identity that resonates with the target audience and sets the brand apart in the competitive fashion market.',
      type: 'Branding',
      challenge: 'Create a distinctive brand identity for a new fashion brand that stands out in a competitive market while appealing to the target demographic.',
      solution: 'Developed a modern, elegant brand identity with a sophisticated color palette and typography that reflects the brand\'s values and appeals to fashion-conscious consumers.',
      results: 'Established a strong brand presence, increased brand recognition, and created a foundation for consistent brand communication across all touchpoints.'
    },
    'maleda-coffee': {
      image: '/assets/Portfolio/Maleda-Coffee-7b6d183c.webp',
      category: 'Beverage',
      title: 'Maleda Coffee',
      description: 'Premium coffee brand identity with rich visual storytelling, packaging design, and complete brand experience from bean to cup. The identity reflects the artisanal quality and heritage of Ethiopian coffee culture, creating an emotional connection with coffee enthusiasts.',
      type: 'Packaging Design',
      challenge: 'Create a premium coffee brand identity that honors Ethiopian coffee heritage while appealing to modern consumers and standing out in a crowded market.',
      solution: 'Developed a rich, authentic brand identity that combines traditional Ethiopian coffee culture with modern design aesthetics, creating packaging that tells the story of the coffee\'s origin and quality.',
      results: 'Established premium brand positioning, increased consumer engagement, and created a memorable brand experience that differentiates the product in the market.'
    },
    'yat-construction': {
      image: '/assets/Portfolio/YAT-Construction-PLC-8e3605ca.webp',
      category: 'Corporate',
      title: 'Company Logo Rebranding - Y.A.T Construction PLC',
      description: 'Complete logo rebranding and stationery design including professional letterheads, business cards, envelopes, and folders for cohesive corporate identity with modern brand transformation. This rebranding project modernized the company\'s visual identity while maintaining trust and credibility.',
      type: 'Logo Rebranding',
      challenge: 'Modernize the company\'s brand identity while maintaining the trust and credibility established over years of operation.',
      solution: 'Created a contemporary logo design that reflects the company\'s expertise and reliability, with a comprehensive stationery system that ensures consistent brand communication.',
      results: 'Refreshed brand image, improved professional appearance, and created a cohesive brand system that enhances credibility and brand recognition.'
    },
    'alta': {
      image: '/assets/Portfolio/Alta-145bd5fa.webp',
      category: 'Healthcare',
      title: 'Company Logo Rebranding - Alta Counseling',
      description: 'Complete company logo rebranding including full stationery design, roll-up banners, and website banner. Comprehensive brand identity overhaul with modern design elements and cohesive visual system for a healthcare counseling service.',
      type: 'Rebranding',
      challenge: 'Rebrand a healthcare counseling service to reflect modern therapeutic approaches while maintaining a professional, trustworthy appearance.',
      solution: 'Developed a warm, approachable brand identity that balances professionalism with accessibility, using colors and design elements that convey care and expertise.',
      results: 'Modernized brand image, improved client perception, and created a cohesive brand system that reflects the organization\'s values and approach to care.'
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && caseStudyModal.isOpen) {
        closeCaseStudyModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [caseStudyModal.isOpen, closeCaseStudyModal]);

  if (!caseStudyModal.isOpen || !caseStudyModal.caseStudyId) return null;

  const caseStudy = caseStudyData[caseStudyModal.caseStudyId];
  if (!caseStudy) return null;

  return (
    <div 
      className={`portfolio-modal ${caseStudyModal.isOpen ? 'active' : ''}`}
      role="dialog"
      aria-labelledby="modalTitle"
      aria-modal="true"
    >
      <div className="modal-overlay" onClick={closeCaseStudyModal}></div>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" aria-label="Close modal" onClick={closeCaseStudyModal}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="modal-content">
          <div className="modal-image-wrapper">
            <img 
              id="modalImage"
              src={`${process.env.PUBLIC_URL || ''}${caseStudy.image}`} 
              alt={`${caseStudy.title} - ${caseStudy.category} case study by Bereket Fikre. ${caseStudy.description}`} 
              className="modal-image"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 768px) 100vw, 90vw"
            />
          </div>
          <div className="modal-body">
            <span id="modalCategory" className="modal-category">{caseStudy.category}</span>
            <h2 id="modalTitle" className="modal-title">{caseStudy.title}</h2>
            <div id="modalDescription" className="modal-description">
              <p>{caseStudy.description}</p>
            </div>
            <div className="modal-details">
              <div className="modal-detail-item">
                <span className="detail-label">Category</span>
                <span id="modalCategoryFull" className="detail-value">{caseStudy.category}</span>
              </div>
              <div className="modal-detail-item">
                <span className="detail-label">Project Type</span>
                <span id="modalType" className="detail-value">{caseStudy.type}</span>
              </div>
            </div>
            {caseStudy.challenge && (
              <div className="case-study-section">
                <h3 className="case-study-heading">Challenge</h3>
                <p className="case-study-text">{caseStudy.challenge}</p>
              </div>
            )}
            {caseStudy.solution && (
              <div className="case-study-section">
                <h3 className="case-study-heading">Solution</h3>
                <p className="case-study-text">{caseStudy.solution}</p>
              </div>
            )}
            {caseStudy.results && (
              <div className="case-study-section">
                <h3 className="case-study-heading">Results</h3>
                <p className="case-study-text">{caseStudy.results}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyModal;

