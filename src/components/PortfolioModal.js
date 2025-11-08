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
      image: '/assets/Portfolio/Andegna-b3d5f6c0.webp',
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
    'finix': {
      image: '/assets/Portfolio/Finix-e442443e.webp',
      category: 'Digital Marketing',
      title: 'Finix Web Asset Collection',
      description: 'Comprehensive web asset collection including website banners, digital marketing materials, and promotional graphics for engaging online presence. This collection creates a cohesive digital brand experience across all online platforms.',
      type: 'Digital Assets',
      date: '2024',
      client: 'Finix',
      challenge: {
        heading: 'The Challenge',
        text: 'Create a comprehensive collection of web assets that work across various digital platforms while maintaining brand consistency. The assets needed to be versatile, engaging, and effective in communicating the brand message in different digital contexts.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a cohesive collection of web assets including website banners, digital marketing materials, and promotional graphics. Each asset was designed to work seamlessly across different platforms while maintaining brand consistency. The collection includes various formats and sizes optimized for different digital channels.'
      },
      results: {
        heading: 'The Results',
        text: 'The web asset collection successfully created a cohesive digital brand experience across all online platforms. It improved brand recognition and engagement, making it easier for the brand to communicate effectively in the digital space.'
      },
      deliverables: ['Website Banners', 'Digital Marketing Materials', 'Promotional Graphics', 'Social Media Assets']
    },
    'swan-clothing': {
      image: '/assets/Portfolio/swan-clothing-208aede7.webp',
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
      image: '/assets/Portfolio/Alta-145bd5fa.webp',
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
    },
    'medavail': {
      image: '/assets/Portfolio/Medavail-0d27baad.webp',
      category: 'Healthcare',
      title: 'Company Logo Rebranding - Medavail Pharmaceuticals',
      description: 'Complete company logo rebranding including office signage, stationery design, and social media templates. Comprehensive brand identity transformation with modern design elements and cohesive visual system for a pharmaceutical company.',
      type: 'Pharmaceutical Rebranding',
      date: '2024',
      client: 'Medavail Pharmaceuticals',
      challenge: {
        heading: 'The Challenge',
        text: 'Rebrand a pharmaceutical company to reflect modern healthcare values while maintaining trust and credibility in a highly regulated industry. The identity needed to convey professionalism, innovation, and reliability while appealing to both healthcare professionals and patients.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I created a modern, professional brand identity that balances innovation with trust. The design uses clean, medical-inspired aesthetics that convey reliability and expertise. The comprehensive visual system includes office signage, stationery, and social media templates that work together to create a cohesive brand experience across all touchpoints.'
      },
      results: {
        heading: 'The Results',
        text: 'The rebranding successfully modernized the company\'s brand image while maintaining trust and credibility in the pharmaceutical industry. It improved brand recognition and created a cohesive visual system that reflects the company\'s commitment to innovation and quality healthcare solutions.'
      },
      deliverables: ['Logo Design', 'Office Signage', 'Stationery Design', 'Social Media Templates', 'Brand Guidelines']
    },
    'niqat-menu': {
      image: '/assets/Portfolio/Niqat-Menu-6b07a3f4.webp',
      category: 'Cafe',
      title: 'Cafe Menu & Brochure Design - Niqat Coffee',
      description: 'Complete cafe menu design including trifold layout and modern typography. Professional menu design that enhances customer experience with elegant print presentation and clear visual hierarchy.',
      type: 'Menu Design',
      date: '2024',
      client: 'Niqat Coffee',
      challenge: {
        heading: 'The Challenge',
        text: 'Create an elegant cafe menu design that enhances the customer experience while effectively communicating the menu offerings. The design needed to be visually appealing, easy to read, and reflect the cafe\'s brand identity and coffee culture.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a sophisticated menu design with a trifold layout that maximizes space while maintaining visual elegance. The typography and layout create clear visual hierarchy, making it easy for customers to navigate the menu. The design incorporates the cafe\'s brand identity while highlighting the coffee offerings and food items.'
      },
      results: {
        heading: 'The Results',
        text: 'The menu design successfully enhanced the customer experience and improved menu readability. It created an elegant presentation that reflects the cafe\'s brand identity and coffee culture, making it easier for customers to explore and order from the menu.'
      },
      deliverables: ['Menu Design', 'Brochure Design', 'Print Specifications', 'Brand Guidelines']
    },
    'rollup-banners': {
      image: '/assets/Portfolio/Rollup-Banners-68a13cab.webp',
      category: 'Events',
      title: 'Rollup Banners for Different Companies',
      description: 'Professional rollup banner designs for various companies, featuring modern layouts, compelling visuals, and brand-consistent messaging. High-quality print-ready designs that effectively communicate company information and enhance brand visibility at events and exhibitions.',
      type: 'Banner Design',
      date: '2024',
      client: 'Multiple Clients',
      challenge: {
        heading: 'The Challenge',
        text: 'Create professional rollup banner designs for various companies that effectively communicate their brand message at events and exhibitions. Each banner needed to be visually compelling, brand-consistent, and optimized for print while standing out in crowded event spaces.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a collection of professional rollup banner designs with modern layouts and compelling visuals. Each banner was customized to reflect the client\'s brand identity while maintaining effective communication of key information. The designs are optimized for print and create strong visual impact in event environments.'
      },
      results: {
        heading: 'The Results',
        text: 'The rollup banner designs successfully enhanced brand visibility at events and exhibitions. They effectively communicated company information and created a professional presence that helped companies stand out in crowded event spaces.'
      },
      deliverables: ['Rollup Banner Designs', 'Print Specifications', 'Brand Guidelines', 'Multiple Variations']
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && portfolioModal.isOpen) {
        closePortfolioModal();
      }
    };

    const handlePopState = () => {
      if (portfolioModal.isOpen) {
        closePortfolioModal();
      }
    };

    if (portfolioModal.isOpen) {
      window.history.pushState({ modal: 'portfolio' }, '');
      window.addEventListener('popstate', handlePopState);
    }

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [portfolioModal.isOpen, closePortfolioModal]);

  if (!portfolioModal.isOpen || !portfolioModal.projectId) return null;

  const project = projectData[portfolioModal.projectId];
  if (!project) return null;

  return (
    <div 
      className={`portfolio-modal ${portfolioModal.isOpen ? 'active' : ''}`}
      role="dialog"
      aria-labelledby="portfolioModalTitle"
      aria-modal="true"
    >
      <div className="modal-overlay" onClick={closePortfolioModal}></div>
      <div className="portfolio-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="portfolio-modal-close" aria-label="Close modal" onClick={closePortfolioModal}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="portfolio-modal-content">
          <div className="portfolio-modal-header">
            <div className="portfolio-modal-image-wrapper">
              <img 
                id="portfolioModalImage"
                src={`${process.env.PUBLIC_URL || ''}${project.image}`} 
                alt={`${project.title} - ${project.category} project by Bereket Fikre. ${project.description}`} 
                className="portfolio-modal-image"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 90vw"
              />
            </div>
            <div className="portfolio-modal-header-content">
              <span id="portfolioModalCategory" className="portfolio-modal-category">{project.category}</span>
              <h2 id="portfolioModalTitle" className="portfolio-modal-title">{project.title}</h2>
              <div className="portfolio-modal-meta">
                <div className="portfolio-meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span>{project.date}</span>
                </div>
                <div className="portfolio-meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span>{project.client}</span>
                </div>
                <div className="portfolio-meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                  <span>{project.type}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="portfolio-modal-body">
            <div className="portfolio-modal-intro">
              <p className="portfolio-modal-description">{project.description}</p>
            </div>
            <div className="portfolio-modal-article">
              {project.challenge && (
                <div className="portfolio-article-section">
                  <div className="portfolio-section-header">
                    <div className="portfolio-section-icon challenge-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                    </div>
                    <h3 className="portfolio-section-heading">{project.challenge.heading}</h3>
                  </div>
                  <p className="portfolio-section-text">{project.challenge.text}</p>
                </div>
              )}
              {project.solution && (
                <div className="portfolio-article-section">
                  <div className="portfolio-section-header">
                    <div className="portfolio-section-icon solution-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <h3 className="portfolio-section-heading">{project.solution.heading}</h3>
                  </div>
                  <p className="portfolio-section-text">{project.solution.text}</p>
                </div>
              )}
              {project.results && (
                <div className="portfolio-article-section">
                  <div className="portfolio-section-header">
                    <div className="portfolio-section-icon results-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                      </svg>
                    </div>
                    <h3 className="portfolio-section-heading">{project.results.heading}</h3>
                  </div>
                  <p className="portfolio-section-text">{project.results.text}</p>
                </div>
              )}
            </div>
            {project.deliverables && project.deliverables.length > 0 && (
              <div className="portfolio-modal-deliverables">
                <h3 className="portfolio-deliverables-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                  Project Deliverables
                </h3>
                <ul className="portfolio-deliverables-list">
                  {project.deliverables.map((deliverable, index) => (
                    <li key={index} className="portfolio-deliverable-item">
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

export default PortfolioModal;


