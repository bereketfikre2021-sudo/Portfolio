import React, { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';

const CaseStudies = () => {
  const { openCaseStudyModal } = useContext(ModalContext);

  const caseStudies = [
    {
      id: 'medavail-pharmaceuticals-company-profile',
      image: '/assets/Portfolio/Company%20Profile%20-%20Medavail%20Pharmaceuticals.webp',
      category: 'Company Profile Design',
      title: 'Company Profile – Medavail Pharmaceuticals',
      description: 'Company profile design for Medavail Pharmaceuticals, an Ethiopia-based pharmaceutical and medical equipment import company. The profile communicates Medavail\'s vision, credibility, and operational strength to partners and stakeholders.'
    },
    {
      id: 'alta-counseling',
      image: '/assets/Portfolio/Alta%20Counseling.webp',
      category: 'Brand Identity Redesign',
      title: 'Alta Counseling',
      description: 'Brand identity redesign for Alta Counseling focused on clarity, trust, and consistency through a calm, professional visual system.'
    },
    {
      id: 'niqat-coffee',
      image: '/assets/Portfolio/Social Media Design for niqat coffee.webp',
      category: 'Social Media Campaign & Brand Presence',
      title: 'Niqat Coffee',
      description: 'Social media campaign and content design for Niqat Coffee, building brand presence, visual consistency, and audience engagement from scratch.'
    },
    {
      id: 'andegna-furniture-catalog',
      image: '/assets/Portfolio/Andegna Cataloge.webp',
      category: 'Product Catalog Design',
      title: 'Andegna Furniture',
      description: 'Product catalog design and visual direction for Andegna Furniture—clear, professional presentation of a wide range of furniture products for easy browsing and a premium, consistent brand look.',
      tabletOnly: true
    }
  ];

  return (
    <section id="case-studies" className="case-studies"  aria-labelledby="case-studies-heading">
      <div className="container">
        <div className="section-intro">
          <span className="section-number desktop-number">04</span>
          <div className="section-header">
            <span className="section-label">In-Depth Analysis</span>
            <h2 id="case-studies-heading" className="section-title">
              <span className="title-main">Case</span>
              <span className="title-accent">Studies</span>
            </h2>
          </div>
        </div>
        
        <div className="case-studies-grid">
          {caseStudies.map((caseStudy) => (
            <article 
              key={caseStudy.id} 
              className={`case-study-card${caseStudy.tabletOnly ? ' case-study-card-tablet-only' : ''}`}
              data-project={caseStudy.id}
              onClick={() => openCaseStudyModal(caseStudy.id)}
            >
              <div className="case-study-image">
                <img 
                  src={`${process.env.PUBLIC_URL || ''}${caseStudy.image}`} 
                  alt={`${caseStudy.title} - ${caseStudy.description}`} 
                  className="case-study-thumb" 
                  loading="lazy" 
                  width="600" 
                  height="400"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="case-study-overlay"></div>
              </div>
              <div className="case-study-content">
                <span className="case-study-category">{caseStudy.category}</span>
                <h3>{caseStudy.title}</h3>
                <a 
                  href="#" 
                  className="case-study-link"
                  onClick={(e) => {
                    e.preventDefault();
                    openCaseStudyModal(caseStudy.id);
                  }}
                  aria-label={`View ${caseStudy.title} case study`}
                >
                  <span>View Case Study</span>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;

