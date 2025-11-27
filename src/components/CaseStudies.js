import React, { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';

const CaseStudies = () => {
  const { openCaseStudyModal } = useContext(ModalContext);

  const caseStudies = [
    {
      id: 'swan-clothing',
      image: '/assets/Portfolio/Full brand identity for swan clothing.webp',
      category: 'Brand Identity · Fashion',
      title: 'Brand Identity - Swan Clothing',
      description: 'Complete brand identity package including logo design, product packaging mockups, and comprehensive brand guidelines for a modern fashion brand.'
    },
    {
      id: 'maleda-coffee',
      image: '/assets/Portfolio/Maleda-Coffee-7b6d183c.webp',
      category: 'Beverage',
      title: 'Maleda Coffee',
      description: 'Premium coffee brand identity with rich visual storytelling, packaging design, and complete brand experience from bean to cup.'
    },
    {
      id: 'yat-construction',
      image: '/assets/Portfolio/YAT-Construction-PLC-8e3605ca.webp',
      category: 'Logo Rebranding · Stationery Design · Corporate',
      title: 'Company Logo Rebranding - Y.A.T Construction PLC',
      description: 'Complete logo rebranding and stationery design including professional letterheads, business cards, envelopes, and folders for cohesive corporate identity.'
    }
  ];

  return (
    <section id="case-studies" className="case-studies">
      <div className="container">
        <div className="section-intro">
          <span className="section-number">04</span>
          <div className="section-header">
            <span className="section-label">In-Depth Analysis</span>
            <h2 className="section-title">
              <span className="title-main">Case</span>
              <span className="title-accent">Studies</span>
            </h2>
          </div>
        </div>
        
        <div className="case-studies-grid">
          {caseStudies.map((caseStudy) => (
            <article 
              key={caseStudy.id} 
              className="case-study-card" 
              data-project={caseStudy.id}
              onClick={() => openCaseStudyModal(caseStudy.id)}
            >
              <div className="case-study-image">
                <img 
                  src={`${process.env.PUBLIC_URL || ''}${caseStudy.image}`} 
                  alt={`${caseStudy.title} - ${caseStudy.category} case study by Bereket Fikre`} 
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
                <p>{caseStudy.description}</p>
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

