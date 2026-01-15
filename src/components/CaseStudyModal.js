import React, { useContext, useEffect } from 'react';
import { ModalContext } from '../context/ModalContext';

const CaseStudyModal = () => {
  const { caseStudyModal, closeCaseStudyModal } = useContext(ModalContext);

  const caseStudyData = {
    'andegna-wood-metal': {
      image: '/assets/Portfolio/Office Signage For Andegna Furniture.webp',
      category: 'Brand Identity & Logo Design',
      title: 'Andegna Wood & Metal Works',
      description: 'Logo and brand identity design for Andegna Wood & Metal Works, creating a strong, professional visual identity aligned with the parent brand.',
      type: 'Brand Identity',
      date: '2024',
      client: 'Andegna Wood & Metal Works',
      challenge: {
        heading: 'Challenge',
        text: 'No existing brand identity for the sister company. Needed visual distinction without breaking alignment with Andegna Furniture. Brand had to feel durable, professional, and industry-appropriate.'
      },
      solution: {
        heading: 'Solution',
        text: 'I designed a logo and brand identity that balanced boldness and simplicity, reflecting the company\'s focus on wood and metal craftsmanship. The visual direction was intentionally clean and structured to ensure versatility across physical and digital applications. The identity was developed to work seamlessly alongside the parent brand while giving Andegna Wood & Metal Works its own recognizable presence.'
      },
      results: {
        heading: 'Outcome',
        text: 'The new brand identity gave Andegna Wood & Metal Works a clear and professional visual presence. The logo provided a strong foundation for future brand applications while maintaining consistency within the broader Andegna brand family.'
      },
      deliverables: ['Brand identity concept development', 'Logo design and refinement', 'Visual system alignment with parent brand', 'Preparation of brand-ready assets']
    },
    'alta-counseling': {
      image: '/assets/Portfolio/Full brand identity for Alta Counseling.webp',
      category: 'Brand Identity Redesign',
      title: 'Alta Counseling',
      description: 'Brand identity redesign for Alta Counseling focused on clarity, trust, and consistency through a calm, professional visual system.',
      type: 'Brand Identity',
      date: '2024',
      client: 'Alta Counseling',
      challenge: {
        heading: 'Challenge',
        text: 'Existing brand lacked clarity and emotional alignment. Visual identity did not reflect the sensitivity and professionalism of the service. Inconsistent use of colors, typography, and visual elements.'
      },
      solution: {
        heading: 'Solution',
        text: 'I led a full rebranding process focused on simplicity, emotional balance, and consistency. The new visual identity was designed to feel warm and reassuring while maintaining a clean, professional tone suitable for a counseling practice.'
      },
      results: {
        heading: 'Outcome',
        text: 'The redesigned identity gave Alta Counseling a clearer and more confident visual presence. The new brand helped communicate trust, professionalism, and care, aligning the visual language with the values of the service.'
      },
      deliverables: ['Brand identity concept development', 'Logo design and visual system', 'Color palette and typography selection', 'Brand consistency across applications']
    },
    'niqat-coffee': {
      image: '/assets/Portfolio/Social Media Design for niqat coffee.webp',
      category: 'Social Media Campaign & Brand Presence',
      title: 'Niqat Coffee',
      description: 'Social media campaign and content design for Niqat Coffee, building brand presence, visual consistency, and audience engagement from scratch.',
      type: 'Social Media Design',
      date: '2024',
      client: 'Niqat Coffee',
      challenge: {
        heading: 'Challenge',
        text: 'No existing social media presence. Low brand awareness online. Need for consistent content direction and visual identity.'
      },
      solution: {
        heading: 'Solution',
        text: 'I created Niqat Coffee\'s social media accounts and developed a clear content direction focused on brand storytelling, product highlights, and audience engagement. The visuals were designed to be consistent, recognizable, and aligned with the brand\'s tone.'
      },
      results: {
        heading: 'Outcome',
        text: 'The campaign established a recognizable brand presence on social media and led to increased engagement through consistent, visually cohesive content. Niqat Coffee gained stronger visibility and interaction with its audience.'
      },
      deliverables: ['Social media account setup', 'Content strategy and visual direction', 'Graphic design for posts and stories', 'Ongoing content creation and optimization']
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

