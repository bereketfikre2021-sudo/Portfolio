import React, { useContext, useState, useRef } from 'react';
import { ModalContext } from '../context/ModalContext';

const Portfolio = () => {
  const { openPortfolioModal } = useContext(ModalContext);
  const [activeFilter, setActiveFilter] = useState('branding');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
  const previewRef = useRef(null);

  const services = [
    { id: 'branding', label: 'Branding' },
    { id: 'marketing-advertising', label: 'Marketing & Advertising Design' },
    { id: 'digital-web', label: 'Digital & Web Design' },
    { id: 'print-layout', label: 'Print Layout Design' },
    { id: 'packaging-label', label: 'Product & Packaging Design' },
    { id: 'ui-ux', label: 'UI/UX Design' },
    { id: 'environmental', label: 'Signage Design' }
  ];

  const projects = [
    // Brand Identity Projects
    {
      id: 'swan-clothing',
      image: '/assets/Portfolio/Full brand identity for swan clothing.webp',
      category: 'Brand Identity · Fashion',
      title: 'Full Brand Identity - Swan Clothing',
      description: 'Complete brand identity package including logo design, product packaging mockups, and comprehensive brand guidelines for a modern fashion brand.',
      service: 'branding',
      company: 'Swan Clothing'
    },
    {
      id: 'alta-counseling',
      image: '/assets/Portfolio/Full brand identity for Alta Counseling.webp',
      category: 'Stationery Design · Healthcare',
      title: 'Stationery Design - Alta Counseling',
      description: 'Complete stationery design including professional letterheads, business cards, envelopes, and folders for a healthcare counseling service.',
      service: 'print-layout',
      company: 'Alta Counseling'
    },
    {
      id: 'dayer-engineering',
      image: '/assets/Portfolio/Full Brand Identity Dayer Enginnering PLC.webp',
      category: 'Brand Identity · Engineering',
      title: 'Full Brand Identity - Dayer Engineering PLC',
      description: 'Comprehensive brand identity system including logo design, brand guidelines, and corporate materials for an engineering company.',
      service: 'branding',
      company: 'Dayer Engineering PLC'
    },
    {
      id: 'blu-hart-karaoke',
      image: '/assets/Portfolio/karaoke event social media.webp',
      category: 'Social Media Design · Event Marketing',
      title: 'Karaoke Event Social Media - Blu Hart',
      description: 'Social media design collection for a karaoke event, featuring engaging posts and promotional graphics to drive event attendance and engagement.',
      service: 'marketing-advertising',
      company: 'Blu Hart'
    },
    {
      id: 'zewd-architectural',
      image: '/assets/Portfolio/Logo Design for Zewd Architectural Designs.webp',
      category: 'Office Wall Design · Architecture',
      title: 'Logo Office Wall Design - Zewd Architectural Designs',
      description: 'Professional logo office wall design for an architectural firm, featuring wall graphics and environmental graphics that reflect precision, creativity, and modern design principles.',
      service: 'environmental',
      company: 'Zewd Architectural Designs'
    },
    {
      id: 'yat-construction',
      image: '/assets/Portfolio/YAT-Construction-PLC-8e3605ca.webp',
      category: 'Stationery Design · Corporate',
      title: 'Stationery Design - Y.A.T Construction PLC',
      description: 'Complete stationery design including professional letterheads, business cards, envelopes, and folders for cohesive corporate identity.',
      service: 'print-layout',
      company: 'Y.A.T Construction PLC'
    },
    {
      id: 'maleda-coffee',
      image: '/assets/Portfolio/Maleda-Coffee-7b6d183c.webp',
      category: 'Brand Identity · Beverage',
      title: 'Brand Identity - Maleda Coffee',
      description: 'Premium coffee brand identity with rich visual storytelling, packaging design, and complete brand experience from bean to cup.',
      service: 'branding',
      company: 'Maleda Coffee'
    },
    // Graphic Design Projects
    {
      id: 'maleda-packaging',
      image: '/assets/Portfolio/Packaging For Maleda Coffee.webp',
      category: 'Packaging Design · Beverage',
      title: 'Product Packaging Design - Maleda Coffee',
      description: 'Premium packaging design for coffee products, combining visual appeal with functional design for retail and distribution.',
      service: 'packaging-label',
      company: 'Maleda Coffee'
    },
    {
      id: 'andegna-signage',
      image: '/assets/Portfolio/Office Signage For Andegna Furniture.webp',
      category: 'Environmental Design · Corporate',
      title: 'Office Signage Design - Andegna Furniture',
      description: 'Professional office signage design including wall graphics and environmental graphics for impactful corporate communication.',
      service: 'environmental',
      company: 'Andegna Furniture'
    },
    {
      id: 'medavail-signage',
      image: '/assets/Portfolio/Office Signage Medavail-.webp',
      category: 'Environmental Design · Healthcare',
      title: 'Office Signage Design - Medavail Pharmaceuticals',
      description: 'Professional office signage design for a pharmaceutical company, creating a cohesive brand experience in the workplace.',
      service: 'environmental',
      company: 'Medavail Pharmaceuticals'
    },
    {
      id: 'maleda-signage',
      image: '/assets/Portfolio/Signage for maleda\'.webp',
      category: 'Environmental Design · Beverage',
      title: 'Signage Design - Maleda Coffee',
      description: 'Professional signage design for Maleda Coffee, creating a cohesive brand experience in retail and commercial spaces.',
      service: 'environmental',
      company: 'Maleda Coffee'
    },
    {
      id: 'barnas-signage',
      image: '/assets/Portfolio/Barnas signage.webp',
      category: 'Environmental Design · Corporate',
      title: 'Logo Signage Design - Barnas',
      description: 'Professional logo signage design for Barnas, featuring wall graphics and environmental graphics that create a cohesive brand experience.',
      service: 'environmental',
      company: 'Barnas'
    },
    {
      id: 'andegna-tshirt',
      image: '/assets/Portfolio/Andegna-Tshirt-d5d4e074.webp',
      category: 'Apparel Design · Corporate Branding',
      title: 'Corporate Apparel Design – Driver\'s T-Shirt for Andegna Furniture',
      description: 'Branded t-shirt design for Andegna Furniture\'s delivery team, created to reflect professionalism, brand consistency, and day-to-day wearability.',
      service: 'packaging-label',
      company: 'Andegna Furniture'
    },
    {
      id: 'lensa-packaging',
      image: '/assets/Portfolio/Product Packaging for Lensa Fashion.webp',
      category: 'Packaging Design · Fashion',
      title: 'Product Packaging Design - Lensa Fashion',
      description: 'Elegant product packaging design for a fashion brand, creating an unboxing experience that reflects brand quality and style.',
      service: 'packaging-label',
      company: 'Lensa Fashion'
    },
    {
      id: 'niqat-apparel',
      image: '/assets/Portfolio/Apparel Design for Niqat Coffee.webp',
      category: 'Apparel Design · Coffee',
      title: 'Apparel Design - Niqat Coffee',
      description: 'Branded apparel design for Niqat Coffee, including t-shirts and merchandise that reflect the brand\'s identity and coffee culture.',
      service: 'packaging-label',
      company: 'Niqat Coffee'
    },
    {
      id: 'alta-apparel',
      image: '/assets/Portfolio/Apparel Design for Alta conseling.webp',
      category: 'Apparel Design · Healthcare',
      title: 'Apparel Design - Alta Counseling',
      description: 'Professional apparel design for Alta Counseling, featuring branded t-shirts and merchandise that reflect the healthcare organization\'s identity.',
      service: 'packaging-label',
      company: 'Alta Counseling'
    },
    {
      id: 'swan-apparel',
      image: '/assets/Portfolio/Apparel Design for Swan clothing.webp',
      category: 'Apparel Design · Fashion',
      title: 'Apparel Design - Swan Clothing',
      description: 'Fashion-forward apparel design for Swan Clothing, featuring branded t-shirts and merchandise that reflect the fashion brand\'s identity.',
      service: 'packaging-label',
      company: 'Swan Clothing'
    },
    {
      id: 'yat-apparel',
      image: '/assets/Portfolio/Apparel Design for Yat Construction.webp',
      category: 'Apparel Design · Corporate',
      title: 'Apparel Design - Y.A.T Construction PLC',
      description: 'Professional apparel design for Y.A.T Construction PLC, featuring branded t-shirts and merchandise for corporate branding.',
      service: 'packaging-label',
      company: 'Y.A.T Construction PLC'
    },
    {
      id: 'alta-apparel-2',
      image: '/assets/Portfolio/Apparel Design for Alta conseling-2.webp',
      category: 'Apparel Design · Healthcare',
      title: 'Apparel Design Collection - Alta Counseling',
      description: 'Additional apparel design collection for Alta Counseling, including various merchandise items that maintain brand consistency.',
      service: 'packaging-label',
      company: 'Alta Counseling'
    },
    {
      id: 'swan-apparel-2',
      image: '/assets/Portfolio/Apparel Design for Swan clothing-2.webp',
      category: 'Apparel Design · Fashion',
      title: 'Apparel Design Series - Swan Clothing',
      description: 'Additional apparel design series for Swan Clothing, including various merchandise items that maintain brand consistency.',
      service: 'packaging-label',
      company: 'Swan Clothing'
    },
    {
      id: 'swan-apparel-3',
      image: '/assets/Portfolio/Apparel Design for Swan clothing-3.webp',
      category: 'Apparel Design · Fashion',
      title: 'Apparel Design Collection - Swan Clothing',
      description: 'Comprehensive apparel design collection for Swan Clothing, featuring branded merchandise that reflects the fashion brand\'s identity.',
      service: 'packaging-label',
      company: 'Swan Clothing'
    },
    {
      id: 'niqat-menu',
      image: '/assets/Portfolio/Menu & Broshure for niqat coffee.webp',
      category: 'Menu Design · Print Design',
      title: 'Cafe Menu & Brochure Design - Niqat Coffee',
      description: 'Complete cafe menu design including trifold layout and modern typography for an elegant dining experience.',
      service: 'print-layout',
      company: 'Niqat Coffee'
    },
    {
      id: 'raba-calendar',
      image: '/assets/Portfolio/calendar for raba construction.webp',
      category: 'Calendar Design · Print Design',
      title: 'Calendar Design - Raba Construction',
      description: 'Professional calendar design for Raba Construction, featuring branded layouts and functional date organization for corporate use.',
      service: 'print-layout',
      company: 'Raba Construction'
    },
    {
      id: 'niqat-social',
      image: '/assets/Portfolio/Social Media Design for niqat coffee.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Design - Niqat Coffee',
      description: 'Comprehensive social media design collection including posts, stories, and promotional graphics for engaging online presence.',
      service: 'marketing-advertising',
      company: 'Niqat Coffee'
    },
    {
      id: 'finix-social-1',
      image: '/assets/Portfolio/Social Media Design For Finix Bet.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Design - Finix Bet',
      description: 'Engaging social media design collection for Finix Bet, including posts, stories, and promotional graphics for online engagement.',
      service: 'marketing-advertising',
      company: 'Finix Bet'
    },
    {
      id: 'ace-stainless-1',
      image: '/assets/Portfolio/Social Media Design For Ace Stainless Still.webp',
      category: 'Social Media Design · Manufacturing',
      title: 'Social Media Design - Ace Stainless Steel',
      description: 'Professional social media design collection for a stainless steel manufacturing company, showcasing products and services.',
      service: 'marketing-advertising',
      company: 'Ace Stainless Steel'
    },
    {
      id: 'niqat-social-2',
      image: '/assets/Portfolio/Social Media Design for niqat coffee-2.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Design Series - Niqat Coffee',
      description: 'Social media design assets featuring promotional graphics and engaging visual content for digital marketing campaigns.',
      service: 'marketing-advertising',
      company: 'Niqat Coffee'
    },
    {
      id: 'finix-social-2',
      image: '/assets/Portfolio/Social Media Design For Finix Bet-2.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Design Series - Finix Bet',
      description: 'Social media design assets featuring promotional graphics and engaging visual content for digital marketing campaigns.',
      service: 'marketing-advertising',
      company: 'Finix Bet'
    },
    {
      id: 'niqat-social-3',
      image: '/assets/Portfolio/Social Media Design for niqat coffee-3.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Design Collection - Niqat Coffee',
      description: 'Comprehensive social media design collection with various formats and styles for consistent brand communication.',
      service: 'marketing-advertising',
      company: 'Niqat Coffee'
    },
    {
      id: 'finix-social-3',
      image: '/assets/Portfolio/Social Media Design For Finix Bet-3.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Design Collection - Finix Bet',
      description: 'Comprehensive social media design collection with various formats and styles for consistent brand communication.',
      service: 'marketing-advertising',
      company: 'Finix Bet'
    },
    {
      id: 'ace-stainless-2',
      image: '/assets/Portfolio/Social Media Design For Ace Stainless Still-2.webp',
      category: 'Social Media Design · Manufacturing',
      title: 'Social Media Design Collection - Ace Stainless Steel',
      description: 'Additional social media design assets including product showcases and promotional graphics for digital marketing campaigns.',
      service: 'marketing-advertising',
      company: 'Ace Stainless Steel'
    },
    {
      id: 'niqat-social-4',
      image: '/assets/Portfolio/Social Media Design for niqat coffee-4.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Graphics - Niqat Coffee',
      description: 'Professional social media graphics designed for maximum engagement and brand visibility across digital platforms.',
      service: 'marketing-advertising',
      company: 'Niqat Coffee'
    },
    {
      id: 'finix-social-4',
      image: '/assets/Portfolio/Social Media Design For Finix Bet-4.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Graphics - Finix Bet',
      description: 'Professional social media graphics designed for maximum engagement and brand visibility across digital platforms.',
      service: 'marketing-advertising',
      company: 'Finix Bet'
    },
    {
      id: 'niqat-social-5',
      image: '/assets/Portfolio/Social Media Design for niqat coffee-5.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Design Assets - Niqat Coffee',
      description: 'Digital marketing assets including social media posts and promotional graphics for online campaigns.',
      service: 'marketing-advertising',
      company: 'Niqat Coffee'
    },
    {
      id: 'finix-social-5',
      image: '/assets/Portfolio/Social Media Design For Finix Bet-5.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Design Assets - Finix Bet',
      description: 'Digital marketing assets including social media posts and promotional graphics for online campaigns.',
      service: 'marketing-advertising',
      company: 'Finix Bet'
    },
    {
      id: 'niqat-social-6',
      image: '/assets/Portfolio/Social Media Design for niqat coffee-6.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Content - Niqat Coffee',
      description: 'Engaging social media content design featuring modern layouts and compelling visuals for digital marketing.',
      service: 'marketing-advertising',
      company: 'Niqat Coffee'
    },
    {
      id: 'finix-social-6',
      image: '/assets/Portfolio/Social Media Design For Finix Bet-6.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Content - Finix Bet',
      description: 'Engaging social media content design featuring modern layouts and compelling visuals for digital marketing.',
      service: 'marketing-advertising',
      company: 'Finix Bet'
    },
    {
      id: 'niqat-social-7',
      image: '/assets/Portfolio/Social Media Design for niqat coffee-7.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Design Series - Niqat Coffee',
      description: 'Professional social media design series with consistent branding and engaging visual content.',
      service: 'marketing-advertising',
      company: 'Niqat Coffee'
    },
    {
      id: 'finix-social-7',
      image: '/assets/Portfolio/Social Media Design For Finix Bet-7.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Design Series - Finix Bet',
      description: 'Professional social media design series with consistent branding and engaging visual content.',
      service: 'marketing-advertising',
      company: 'Finix Bet'
    },
    {
      id: 'niqat-social-8',
      image: '/assets/Portfolio/Social Media Design for niqat coffee-8.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Graphics Collection - Niqat Coffee',
      description: 'Comprehensive collection of social media graphics designed for various digital marketing campaigns and promotions.',
      service: 'marketing-advertising',
      company: 'Niqat Coffee'
    },
    {
      id: 'finix-social-8',
      image: '/assets/Portfolio/Social Media Design For Finix Bet-8.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Graphics Collection - Finix Bet',
      description: 'Comprehensive collection of social media graphics designed for various digital marketing campaigns and promotions.',
      service: 'marketing-advertising',
      company: 'Finix Bet'
    },
    {
      id: 'niqat-social-9',
      image: '/assets/Portfolio/Social Media Design for niqat coffee-9.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Design Assets - Niqat Coffee',
      description: 'Professional social media design assets featuring promotional graphics and engaging visual content.',
      service: 'marketing-advertising',
      company: 'Niqat Coffee'
    },
    {
      id: 'finix-social-9',
      image: '/assets/Portfolio/Social Media Design For Finix Bet-9.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Design Assets - Finix Bet',
      description: 'Professional social media design assets featuring promotional graphics and engaging visual content.',
      service: 'marketing-advertising',
      company: 'Finix Bet'
    },
    {
      id: 'niqat-social-10',
      image: '/assets/Portfolio/Social Media Design for niqat coffee-10.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Content Design - Niqat Coffee',
      description: 'Engaging social media content design with modern aesthetics and compelling visuals for digital engagement.',
      service: 'marketing-advertising',
      company: 'Niqat Coffee'
    },
    {
      id: 'finix-social-10',
      image: '/assets/Portfolio/Social Media Design For Finix Bet-10.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Content Design - Finix Bet',
      description: 'Engaging social media content design with modern aesthetics and compelling visuals for digital engagement.',
      service: 'marketing-advertising',
      company: 'Finix Bet'
    },
    {
      id: 'niqat-social-11',
      image: '/assets/Portfolio/Social Media Design for niqat coffee-11.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Design - Niqat Coffee',
      description: 'Professional social media design collection for Niqat Coffee, featuring engaging posts and promotional graphics for digital marketing campaigns.',
      service: 'marketing-advertising',
      company: 'Niqat Coffee'
    },
    {
      id: 'rollup-banners',
      image: '/assets/Portfolio/Rollup-Banners-68a13cab.webp',
      category: 'Banner Design · Print Design',
      title: 'Rollup Banners for Different Companies',
      description: 'Professional rollup banner designs for various companies, featuring modern layouts, compelling visuals, and brand-consistent messaging.',
      service: 'environmental',
      company: 'Multiple Clients'
    },
    // Web Design Projects
    {
      id: 'finix-banner-1',
      image: '/assets/Portfolio/Website Banner For Finix Bet.webp',
      category: 'Web Design · Digital Marketing',
      title: 'Website Banner Design - Finix Bet',
      description: 'Professional website banner design for Finix Bet, optimized for web display and digital marketing campaigns.',
      service: 'digital-web',
      company: 'Finix Bet'
    },
    {
      id: 'finix-banner-2',
      image: '/assets/Portfolio/Website Banner For Finix Bet-2.webp',
      category: 'Web Design · Digital Marketing',
      title: 'Website Banner Collection - Finix Bet',
      description: 'Website banner design featuring modern layouts and engaging visuals for effective online presence.',
      service: 'digital-web',
      company: 'Finix Bet'
    },
    {
      id: 'finix-banner-3',
      image: '/assets/Portfolio/Website Banner For Finix Bet-3.webp',
      category: 'Web Design · Digital Marketing',
      title: 'Web Banner Design - Finix Bet',
      description: 'Professional web banner design optimized for various screen sizes and digital platforms.',
      service: 'digital-web',
      company: 'Finix Bet'
    },
    {
      id: 'finix-banner-4',
      image: '/assets/Portfolio/Website Banner For Finix Bet-4.webp',
      category: 'Web Design · Digital Marketing',
      title: 'Website Banner Series - Finix Bet',
      description: 'Comprehensive website banner series designed for consistent brand communication across digital platforms.',
      service: 'digital-web',
      company: 'Finix Bet'
    },
    {
      id: 'finix-banner-5',
      image: '/assets/Portfolio/Website Banner For Finix Bet-5.webp',
      category: 'Web Design · Digital Marketing',
      title: 'Web Banner Assets - Finix Bet',
      description: 'Professional web banner assets featuring modern design and engaging visuals for digital marketing.',
      service: 'digital-web',
      company: 'Finix Bet'
    },
    {
      id: 'finix-banner-6',
      image: '/assets/Portfolio/Website Banner For Finix Bet-6.webp',
      category: 'Web Design · Digital Marketing',
      title: 'Website Banner Design - Finix Bet',
      description: 'Engaging website banner design with compelling visuals and clear messaging for online campaigns.',
      service: 'digital-web',
      company: 'Finix Bet'
    },
    {
      id: 'finix-banner-7',
      image: '/assets/Portfolio/Website Banner For Finix Bet-7.webp',
      category: 'Web Design · Digital Marketing',
      title: 'Web Banner Collection - Finix Bet',
      description: 'Professional web banner collection designed for various digital marketing campaigns and promotions.',
      service: 'digital-web',
      company: 'Finix Bet'
    },
    {
      id: 'finix-banner-8',
      image: '/assets/Portfolio/Website Banner For Finix Bet-8.webp',
      category: 'Web Design · Digital Marketing',
      title: 'Website Banner Series - Finix Bet',
      description: 'Comprehensive website banner series with consistent branding and engaging visual content.',
      service: 'digital-web',
      company: 'Finix Bet'
    },
    {
      id: 'finix-banner-9',
      image: '/assets/Portfolio/Website Banner For Finix Bet-9.webp',
      category: 'Web Design · Digital Marketing',
      title: 'Web Banner Design Assets - Finix Bet',
      description: 'Professional web banner design assets optimized for various screen sizes and digital platforms.',
      service: 'digital-web',
      company: 'Finix Bet'
    },
    {
      id: 'finix-banner-10',
      image: '/assets/Portfolio/Website Banner For Finix Bet-10.webp',
      category: 'Web Design · Digital Marketing',
      title: 'Website Banner Collection - Finix Bet',
      description: 'Engaging website banner collection featuring modern design and compelling visuals for digital marketing.',
      service: 'digital-web',
      company: 'Finix Bet'
    },
    // UI/UX Design Projects
    {
      id: 'havana-plc',
      image: '/assets/Portfolio/Ui Ux Design for Havana Plc.webp',
      category: 'UI/UX Design · Corporate',
      title: 'UI/UX Design - Havana PLC',
      description: 'Complete UI/UX design solution including user research, wireframing, prototyping, and polished interface design for a corporate platform.',
      service: 'ui-ux',
      company: 'Havana PLC'
    },
  ];

  const filteredProjects = projects.filter(project => project.service === activeFilter);

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <div className="section-intro" data-aos="fade-up">
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
        
        <div className="portfolio-grid-modern" role="list">
          {filteredProjects.map((project, index) => (
            <article 
              key={project.id} 
              className="portfolio-item-modern" 
              data-project={project.id}
              role="listitem"
              tabIndex={0}
              data-aos="fade-up"
              data-aos-delay={index % 6 * 50}
              onClick={() => openPortfolioModal(project.id)}
              onMouseEnter={(e) => {
                setHoveredProject(project.id);
                const rect = e.currentTarget.getBoundingClientRect();
                setPreviewPosition({
                  x: rect.left + rect.width / 2,
                  y: rect.top
                });
              }}
              onMouseMove={(e) => {
                if (hoveredProject === project.id) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setPreviewPosition({
                    x: e.clientX,
                    y: rect.top - 20
                  });
                }
              }}
              onMouseLeave={() => setHoveredProject(null)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openPortfolioModal(project.id);
                }
              }}
              aria-label={`${project.title} - ${project.category}. Click to view project details`}
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
                {hoveredProject === project.id && (
                  <div 
                    className="portfolio-hover-preview"
                    ref={previewRef}
                    style={{
                      left: `${previewPosition.x}px`,
                      top: `${previewPosition.y}px`,
                      transform: 'translate(-50%, -100%)'
                    }}
                  >
                    <img 
                      src={`${process.env.PUBLIC_URL || ''}${project.image}`} 
                      alt={`${project.title} preview`}
                      loading="eager"
                    />
                    <div className="preview-content">
                      <span className="preview-category">{project.category}</span>
                      <h4 className="preview-title">{project.title}</h4>
                    </div>
                  </div>
                )}
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


