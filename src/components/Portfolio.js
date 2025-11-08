import React, { useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext';

const Portfolio = () => {
  const { openPortfolioModal } = useContext(ModalContext);
  const [activeFilter, setActiveFilter] = useState('all');

  const services = [
    { id: 'all', label: 'All Works' },
    { id: 'graphic-design', label: 'Graphic Design' },
    { id: 'brand-identity', label: 'Brand Identity' },
    { id: 'ui-ux-design', label: 'UI/UX Design' },
    { id: 'web-design', label: 'Web Design' }
  ];

  const projects = [
    {
      id: 'andegna-tshirt',
      image: '/assets/Portfolio/Andegna-Tshirt-d5d4e074.webp',
      category: 'Apparel Design · Corporate Branding',
      title: 'Corporate Apparel Design – Driver\'s T-Shirt for Andegna Furniture',
      description: 'Branded t-shirt design for Andegna Furniture\'s delivery team, created to reflect professionalism, brand consistency, and day-to-day wearability.',
      service: 'graphic-design'
    },
    {
      id: 'andegna-wood-metal',
      image: '/assets/Portfolio/Andegna-b3d5f6c0.webp',
      category: 'Environmental Design · Corporate',
      title: 'Office Signage Design - Andegna Wood And Metal Works',
      description: 'Professional signage design including office wall graphics, roll-up banner displays, and environmental graphics for impactful corporate communication.',
      service: 'graphic-design'
    },
    {
      id: 'finix',
      image: '/assets/Portfolio/Finix-e442443e.webp',
      category: 'Web Design · Digital Marketing',
      title: 'Finix Web Asset Collection',
      description: 'Comprehensive web asset collection including website banners, digital marketing materials, and promotional graphics for engaging online presence.',
      service: 'web-design'
    },
    {
      id: 'swan-clothing',
      image: '/assets/Portfolio/swan-clothing-208aede7.webp',
      category: 'Brand Identity · Fashion',
      title: 'Brand Identity - Swan Clothing',
      description: 'Complete brand identity package including logo design, product packaging mockups, and comprehensive brand guidelines for a modern fashion brand.',
      service: 'brand-identity'
    },
    {
      id: 'maleda-coffee',
      image: '/assets/Portfolio/Maleda-Coffee-7b6d183c.webp',
      category: 'Beverage',
      title: 'Maleda Coffee',
      description: 'Premium coffee brand identity with rich visual storytelling, packaging design, and complete brand experience from bean to cup.',
      service: 'brand-identity'
    },
    {
      id: 'yat-construction',
      image: '/assets/Portfolio/YAT-Construction-PLC-8e3605ca.webp',
      category: 'Logo Rebranding · Stationery Design · Corporate',
      title: 'Company Logo Rebranding - Y.A.T Construction PLC',
      description: 'Complete logo rebranding and stationery design including professional letterheads, business cards, envelopes, and folders for cohesive corporate identity.',
      service: 'brand-identity'
    },
    {
      id: 'alta',
      image: '/assets/Portfolio/Alta-145bd5fa.webp',
      category: 'Brand Identity · Corporate Rebranding',
      title: 'Company Logo Rebranding - Alta Counseling',
      description: 'Complete company logo rebranding including full stationery design, roll-up banners, and website banner.',
      service: 'brand-identity'
    },
    {
      id: 'medavail',
      image: '/assets/Portfolio/Medavail-0d27baad.webp',
      category: 'Brand Identity · Corporate Rebranding',
      title: 'Company Logo Rebranding - Medavail Pharmaceuticals',
      description: 'Complete company logo rebranding including office signage, stationery design, and social media templates.',
      service: 'brand-identity'
    },
    {
      id: 'niqat-menu',
      image: '/assets/Portfolio/Niqat-Menu-6b07a3f4.webp',
      category: 'Menu Design · Print Design',
      title: 'Cafe Menu & Brochure Design - Niqat Coffee',
      description: 'Complete cafe menu design including trifold layout and modern typography.',
      service: 'graphic-design'
    },
    {
      id: 'rollup-banners',
      image: '/assets/Portfolio/Rollup-Banners-68a13cab.webp',
      category: 'Banner Design · Print Design',
      title: 'Rollup Banners for Different Companies',
      description: 'Professional rollup banner designs for various companies, featuring modern layouts, compelling visuals, and brand-consistent messaging.',
      service: 'graphic-design'
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.service === activeFilter);

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <div className="section-intro">
          <span className="section-number">03</span>
          <div className="section-header">
            <span className="section-label">Selected Work</span>
            <h2 className="section-title">
              <span className="title-main">Featured</span>
              <span className="title-accent">Projects</span>
            </h2>
          </div>
        </div>

        <div className="portfolio-filters" role="tablist" aria-label="Filter portfolio projects by service">
          {services.map((service) => (
            <button
              key={service.id}
              className={`portfolio-filter-btn ${activeFilter === service.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(service.id)}
              role="tab"
              aria-selected={activeFilter === service.id}
            >
              {service.label}
            </button>
          ))}
        </div>
        
        <div className="portfolio-grid-modern">
          {filteredProjects.map((project) => (
            <article 
              key={project.id} 
              className="portfolio-item-modern" 
              data-project={project.id}
              onClick={() => openPortfolioModal(project.id)}
            >
              <div className="portfolio-image-small">
                <img 
                  src={`${process.env.PUBLIC_URL || ''}${project.image}`} 
                  alt={`${project.title} - ${project.category} project by Bereket Fikre`} 
                  className="portfolio-thumb" 
                  loading="lazy" 
                  width="600" 
                  height="400"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="portfolio-content">
                <span className="portfolio-category-modern">{project.category}</span>
                <h3>{project.title}</h3>
                <a 
                  href="#" 
                  className="portfolio-link-modern"
                  onClick={(e) => {
                    e.preventDefault();
                    openPortfolioModal(project.id);
                  }}
                  aria-label={`View ${project.title} project`}
                >
                  <span>View Project</span>
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

export default Portfolio;


