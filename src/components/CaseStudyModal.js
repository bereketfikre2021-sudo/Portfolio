import React, { useContext, useEffect } from 'react';
import { ModalContext } from '../context/ModalContext';

const CaseStudyModal = () => {
  const { caseStudyModal, closeCaseStudyModal } = useContext(ModalContext);

  const caseStudyData = {
    'andegna-tshirt': {
      image: '/assets/Portfolio/Andegna-Tshirt-d5d4e074.webp',
      category: 'Furniture',
      title: 'Corporate Apparel Design – Driver\'s T-Shirt for Andegna Furniture',
      description: 'Branded t-shirt design for Andegna Furniture\'s delivery team, created to reflect professionalism, brand consistency, and day-to-day wearability. Corporate apparel design that enhances brand visibility while maintaining comfort and functionality for delivery personnel.',
      type: 'Apparel Design',
      date: '2024',
      client: 'Andegna Furniture',
      challenge: {
        heading: 'The Challenge',
        text: 'Create professional branded apparel that maintains brand consistency while being practical for daily delivery operations. The design needed to work in various environments, withstand daily wear, and enhance brand visibility without compromising comfort or functionality for delivery personnel.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a clean, professional design that incorporates the brand logo and colors strategically placed for maximum visibility. The design ensures comfort and durability for delivery personnel while maintaining a professional appearance. The t-shirt design works seamlessly across different lighting conditions and environments, ensuring brand recognition at every customer touchpoint.'
      },
      results: {
        heading: 'The Results',
        text: 'The branded apparel successfully increased brand visibility and enhanced the professional appearance of the delivery team. This improvement in brand presentation has positively influenced customer perception and brand recognition, creating a more cohesive brand experience throughout the customer journey.'
      },
      deliverables: ['T-Shirt Design', 'Brand Guidelines', 'Color Specifications', 'Print Specifications']
    },
    'andegna-wood-metal': {
      image: '/assets/Portfolio/Office Signage For Andegna Furniture.webp',
      category: 'Corporate',
      title: 'Office Signage Design - Andegna Wood And Metal Works',
      description: 'Professional signage design including office wall graphics, roll-up banner displays, and environmental graphics for impactful corporate communication. This comprehensive signage system creates a cohesive brand experience throughout the office environment.',
      type: 'Environmental Design',
      date: '2024',
      client: 'Andegna Wood And Metal Works',
      challenge: {
        heading: 'The Challenge',
        text: 'Design a comprehensive signage system that reflects the company\'s expertise in wood and metal works while maintaining professional corporate aesthetics. The signage needed to enhance wayfinding, communicate the brand effectively, and create a cohesive visual experience throughout the office space.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I created a unified signage system using materials and design elements that echo the company\'s core business. The design incorporates wood and metal textures in the visual language, creating a connection between the company\'s services and its visual identity. The signage system includes wall graphics, roll-up banners, and environmental graphics that work together to create a cohesive brand experience.'
      },
      results: {
        heading: 'The Results',
        text: 'The comprehensive signage system enhanced brand presence and professional image throughout the office. It improved wayfinding for visitors and employees, and created a cohesive brand experience that reinforces the company\'s expertise and professionalism to clients and stakeholders.'
      },
      deliverables: ['Office Wall Graphics', 'Roll-up Banners', 'Environmental Graphics', 'Signage Guidelines']
    },
    'swan-clothing': {
      image: '/assets/Portfolio/Full brand identity for swan clothing.webp',
      category: 'Fashion',
      title: 'Brand Identity - Swan Clothing',
      description: 'Complete brand identity package including logo design, product packaging mockups, and comprehensive brand guidelines for a modern fashion brand. This project established a strong visual identity that resonates with the target audience and sets the brand apart in the competitive fashion market.',
      type: 'Brand Identity',
      date: '2024',
      client: 'Swan Clothing',
      challenge: {
        heading: 'The Challenge',
        text: 'Create a distinctive brand identity for a new fashion brand that stands out in a competitive market while appealing to the target demographic. The identity needed to reflect the brand\'s values, resonate with fashion-conscious consumers, and work across various applications from packaging to digital platforms.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a modern, elegant brand identity with a sophisticated color palette and typography that reflects the brand\'s values. The logo design is versatile and memorable, working effectively across different applications. The brand guidelines ensure consistent application across all touchpoints, from product packaging to social media, creating a cohesive brand experience.'
      },
      results: {
        heading: 'The Results',
        text: 'The brand identity successfully established a strong brand presence in the fashion market. It increased brand recognition and created a foundation for consistent brand communication across all touchpoints. The cohesive visual identity has helped the brand stand out in a competitive market and connect with its target audience.'
      },
      deliverables: ['Logo Design', 'Brand Guidelines', 'Packaging Design', 'Color Palette', 'Typography System']
    },
    'maleda-coffee': {
      image: '/assets/Portfolio/Maleda-Coffee-7b6d183c.webp',
      category: 'Beverage',
      title: 'Maleda Coffee',
      description: 'Premium coffee brand identity with rich visual storytelling, packaging design, and complete brand experience from bean to cup. The identity reflects the artisanal quality and heritage of Ethiopian coffee culture, creating an emotional connection with coffee enthusiasts.',
      type: 'Brand Identity & Packaging',
      date: '2024',
      client: 'Maleda Coffee',
      challenge: {
        heading: 'The Challenge',
        text: 'Create a premium coffee brand identity that honors Ethiopian coffee heritage while appealing to modern consumers and standing out in a crowded market. The identity needed to tell the story of the coffee\'s origin, convey quality, and create an emotional connection with coffee enthusiasts.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a rich, authentic brand identity that combines traditional Ethiopian coffee culture with modern design aesthetics. The packaging design tells the story of the coffee\'s origin and quality through visual storytelling. The color palette and typography reflect the premium nature of the product while honoring its cultural heritage.'
      },
      results: {
        heading: 'The Results',
        text: 'The brand identity successfully established premium brand positioning in the coffee market. It increased consumer engagement and created a memorable brand experience that differentiates the product. The authentic storytelling approach has resonated with coffee enthusiasts, creating a strong emotional connection with the brand.'
      },
      deliverables: ['Brand Identity', 'Packaging Design', 'Logo Design', 'Brand Guidelines', 'Visual Storytelling']
    },
    'yat-construction': {
      image: '/assets/Portfolio/YAT-Construction-PLC-8e3605ca.webp',
      category: 'Corporate',
      title: 'Company Logo Rebranding - Y.A.T Construction PLC',
      description: 'Complete logo rebranding and stationery design including professional letterheads, business cards, envelopes, and folders for cohesive corporate identity with modern brand transformation. This rebranding project modernized the company\'s visual identity while maintaining trust and credibility.',
      type: 'Corporate Rebranding',
      date: '2024',
      client: 'Y.A.T Construction PLC',
      challenge: {
        heading: 'The Challenge',
        text: 'Modernize the company\'s brand identity while maintaining the trust and credibility established over years of operation. The rebrand needed to reflect the company\'s expertise and reliability while creating a more contemporary and professional appearance that appeals to modern clients.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I created a contemporary logo design that reflects the company\'s expertise and reliability in the construction industry. The new identity maintains the trust associated with the established brand while introducing modern design elements. A comprehensive stationery system ensures consistent brand communication across all business touchpoints, from letterheads to business cards.'
      },
      results: {
        heading: 'The Results',
        text: 'The rebranding successfully refreshed the company\'s brand image while maintaining its credibility. The modernized identity improved the professional appearance and created a cohesive brand system that enhances credibility and brand recognition. The new identity better reflects the company\'s expertise and appeals to both existing and potential clients.'
      },
      deliverables: ['Logo Design', 'Stationery Design', 'Business Cards', 'Letterheads', 'Brand Guidelines']
    },
    'alta': {
      image: '/assets/Portfolio/Full brand identity for Alta Counseling.webp',
      category: 'Healthcare',
      title: 'Company Logo Rebranding - Alta Counseling',
      description: 'Complete company logo rebranding including full stationery design, roll-up banners, and website banner. Comprehensive brand identity overhaul with modern design elements and cohesive visual system for a healthcare counseling service.',
      type: 'Healthcare Rebranding',
      date: '2024',
      client: 'Alta Counseling',
      challenge: {
        heading: 'The Challenge',
        text: 'Rebrand a healthcare counseling service to reflect modern therapeutic approaches while maintaining a professional, trustworthy appearance. The identity needed to balance professionalism with approachability, conveying care and expertise to both clients and healthcare professionals.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a warm, approachable brand identity that balances professionalism with accessibility. The design uses colors and design elements that convey care and expertise, creating a welcoming yet professional appearance. The comprehensive visual system includes stationery, banners, and digital assets that work together to create a cohesive brand experience.'
      },
      results: {
        heading: 'The Results',
        text: 'The rebranding successfully modernized the brand image while maintaining its professional and trustworthy appearance. It improved client perception and created a cohesive brand system that reflects the organization\'s values and approach to care. The new identity better communicates the service\'s commitment to providing compassionate, professional counseling services.'
      },
      deliverables: ['Logo Design', 'Stationery Design', 'Roll-up Banners', 'Website Assets', 'Brand Guidelines']
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && caseStudyModal.isOpen) {
        closeCaseStudyModal();
      }
    };

    const handlePopState = () => {
      if (caseStudyModal.isOpen) {
        closeCaseStudyModal();
      }
    };

    if (caseStudyModal.isOpen) {
      window.history.pushState({ modal: 'caseStudy' }, '');
      window.addEventListener('popstate', handlePopState);
    }

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [caseStudyModal.isOpen, closeCaseStudyModal]);

  if (!caseStudyModal.isOpen || !caseStudyModal.caseStudyId) return null;

  const caseStudy = caseStudyData[caseStudyModal.caseStudyId];
  if (!caseStudy) return null;

  return (
    <div 
      className={`case-study-modal ${caseStudyModal.isOpen ? 'active' : ''}`}
      role="dialog"
      aria-labelledby="caseStudyModalTitle"
      aria-modal="true"
    >
      <div className="modal-overlay" onClick={closeCaseStudyModal}></div>
      <div className="case-study-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="case-study-modal-close" aria-label="Close modal" onClick={closeCaseStudyModal}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="case-study-modal-content">
          <div className="case-study-modal-header">
            <div className="case-study-modal-image-wrapper">
              <img 
                id="caseStudyModalImage"
                src={`${process.env.PUBLIC_URL || ''}${caseStudy.image}`} 
                alt={`${caseStudy.title} - ${caseStudy.category} case study by Bereket Fikre. ${caseStudy.description}`} 
                className="case-study-modal-image"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 90vw"
              />
            </div>
            <div className="case-study-modal-header-content">
              <span id="caseStudyModalCategory" className="case-study-modal-category">{caseStudy.category}</span>
              <h2 id="caseStudyModalTitle" className="case-study-modal-title">{caseStudy.title}</h2>
              <div className="case-study-modal-meta">
                <div className="case-study-meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span>{caseStudy.date}</span>
                </div>
                <div className="case-study-meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span>{caseStudy.client}</span>
                </div>
                <div className="case-study-meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                  <span>{caseStudy.type}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="case-study-modal-body">
            <div className="case-study-modal-intro">
              <p className="case-study-modal-description">{caseStudy.description}</p>
            </div>
            <div className="case-study-modal-article">
              {caseStudy.challenge && (
                <div className="case-study-article-section">
                  <div className="case-study-section-header">
                    <div className="case-study-section-icon challenge-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                    </div>
                    <h3 className="case-study-section-heading">{caseStudy.challenge.heading}</h3>
                  </div>
                  <p className="case-study-section-text">{caseStudy.challenge.text}</p>
                </div>
              )}
              {caseStudy.solution && (
                <div className="case-study-article-section">
                  <div className="case-study-section-header">
                    <div className="case-study-section-icon solution-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <h3 className="case-study-section-heading">{caseStudy.solution.heading}</h3>
                  </div>
                  <p className="case-study-section-text">{caseStudy.solution.text}</p>
                </div>
              )}
              {caseStudy.results && (
                <div className="case-study-article-section">
                  <div className="case-study-section-header">
                    <div className="case-study-section-icon results-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                      </svg>
                    </div>
                    <h3 className="case-study-section-heading">{caseStudy.results.heading}</h3>
                  </div>
                  <p className="case-study-section-text">{caseStudy.results.text}</p>
                </div>
              )}
            </div>
            {caseStudy.deliverables && caseStudy.deliverables.length > 0 && (
              <div className="case-study-modal-deliverables">
                <h3 className="case-study-deliverables-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                  Project Deliverables
                </h3>
                <ul className="case-study-deliverables-list">
                  {caseStudy.deliverables.map((deliverable, index) => (
                    <li key={index} className="case-study-deliverable-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span>{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyModal;

