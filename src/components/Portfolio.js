import React, { useContext, useState, useMemo, useEffect, useRef } from 'react';
import { ModalContext } from '../context/ModalContext';

// Projects array - exported for use in PortfolioModal
export const portfolioProjects = [
    // Brand Identity Projects
    {
      id: 'swan-clothing',
      image: '/assets/Portfolio/Full brand identity for swan clothing.webp',
      category: 'Brand Identity · Fashion',
      title: 'Full Brand Identity - Swan Clothing',
      description: 'Complete brand identity package including logo design, product packaging mockups, and comprehensive brand guidelines for a modern fashion brand.',
      service: 'brand-identity-design',
      company: 'Swan Clothing'
    },
    {
      id: 'dayer-engineering',
      image: '/assets/Portfolio/Full Brand Identity Dayer Enginnering PLC.webp',
      category: 'Brand Identity · Engineering',
      title: 'Full Brand Identity - Dayer Engineering PLC',
      description: 'Comprehensive brand identity system including logo design, brand guidelines, and corporate materials for an engineering company.',
      service: 'brand-identity-design',
      company: 'Dayer Engineering PLC'
    },
    {
      id: 'zewd-architectural',
      image: '/assets/Portfolio/Logo Design for Zewd Architectural Designs.webp',
      category: 'Logo Design · Architecture',
      title: 'Logo Design - Zewd Architectural Designs',
      description: 'Professional logo design for an architectural firm, featuring a distinctive mark that reflects precision, creativity, and modern design principles.',
      service: 'logo-design',
      company: 'Zewd Architectural Designs'
    },
    {
      id: 'maleda-coffee',
      image: '/assets/Portfolio/Maleda-Coffee-7b6d183c.webp',
      category: 'Brand Identity · Beverage',
      title: 'Brand Identity - Maleda Coffee',
      description: 'Premium coffee brand identity with rich visual storytelling, packaging design, and complete brand experience from bean to cup.',
      service: 'brand-identity-design',
      company: 'Maleda Coffee'
    },
    // Print & Marketing Projects - From Print and marketing folder
    {
      id: 'ptgr-flyer',
      image: '/assets/Portfolio/Print%20and%20marketing/A5%20Flyer%20-%20PTGR.webp',
      category: 'Print Design · Marketing',
      title: 'A5 Flyer Design - PTGR',
      description: 'Professional A5 flyer design featuring modern layouts, compelling visuals, and clear messaging for marketing campaigns.',
      service: 'print-design',
      company: 'PTGR'
    },
    {
      id: 'yat-construction-stationery',
      image: '/assets/Portfolio/Print%20and%20marketing/YAT-Construction-PLC-8e3605ca.webp',
      category: 'Stationery Design · Corporate',
      title: 'Stationery Design - Y.A.T Construction PLC',
      description: 'Complete stationery design including professional letterheads, business cards, envelopes, and folders for cohesive corporate identity.',
      service: 'print-design',
      company: 'Y.A.T Construction PLC'
    },
    {
      id: 'medavail-signage',
      image: '/assets/Portfolio/Print%20and%20marketing/Office%20Signage%20Medavail-.webp',
      category: 'Environmental Design · Healthcare',
      title: 'Office Signage Design - Medavail Pharmaceuticals',
      description: 'Professional office signage design for a pharmaceutical company, creating a cohesive brand experience in the workplace.',
      service: 'brand-applications-assets',
      company: 'Medavail Pharmaceuticals'
    },
    {
      id: 'maleda-packaging',
      image: '/assets/Portfolio/Print%20and%20marketing/Packaging%20For%20Maleda%20Coffee.webp',
      category: 'Packaging Design · Beverage',
      title: 'Product Packaging Design - Maleda Coffee',
      description: 'Premium packaging design for coffee products, combining visual appeal with functional design for retail and distribution.',
      service: 'brand-applications-assets',
      company: 'Maleda Coffee'
    },
    {
      id: 'dumas-packaging',
      image: '/assets/Portfolio/Print%20and%20marketing/Product%20%26%20Packaging%20-%20Dumas.webp',
      category: 'Packaging Design · Real Estate',
      title: 'Product & Packaging Design - Dumas Properties',
      description: 'Professional product and packaging design for real estate materials, creating a cohesive brand experience.',
      service: 'brand-applications-assets',
      company: 'Dumas Properties'
    },
    {
      id: 'raya-packaging',
      image: '/assets/Portfolio/Print%20and%20marketing/Product%20%26%20Packaging%20-%20Raya.webp',
      category: 'Packaging Design · Hospitality',
      title: 'Product & Packaging Design - Raya Hotel',
      description: 'Elegant product and packaging design for hospitality materials, reflecting brand quality and style.',
      service: 'brand-applications-assets',
      company: 'Raya Hotel & Convention Center'
    },
    // Social Media Design Projects - From Social media folder
    {
      id: 'blu-hart-karaoke',
      image: '/assets/Portfolio/Social%20media/karaoke%20event%20social%20media.webp',
      category: 'Social Media Design · Event Marketing',
      title: 'Karaoke Event Social Media - Blu Hart',
      description: 'Social media design collection for a karaoke event, featuring engaging posts and promotional graphics to drive event attendance and engagement.',
      service: 'marketing-campaign-design',
      company: 'Blu Hart'
    },
    {
      id: 'ace-stainless-social',
      image: '/assets/Portfolio/Social%20media/Social%20Media%20Design%20For%20Ace%20Stainless%20Still.webp',
      category: 'Social Media Design · Manufacturing',
      title: 'Social Media Design - Ace Stainless Steel',
      description: 'Professional social media design collection for a stainless steel manufacturing company, showcasing products and services.',
      service: 'marketing-campaign-design',
      company: 'Ace Stainless Steel'
    },
    {
      id: 'awra-designs-social',
      image: '/assets/Portfolio/Social%20media/Social%20Media%20Design%20For%20Awra%20Designs.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Design - Awra Designs',
      description: 'Professional social media design collection for Awra Designs, featuring engaging posts and promotional graphics for digital marketing campaigns.',
      service: 'marketing-campaign-design',
      company: 'Awra Designs'
    },
    {
      id: 'finix-social-8',
      image: '/assets/Portfolio/Social%20media/Social%20Media%20Design%20For%20Finix%20Bet-8.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Graphics Collection - Finix Bet',
      description: 'Comprehensive collection of social media graphics designed for various digital marketing campaigns and promotions.',
      service: 'marketing-campaign-design',
      company: 'Finix Bet'
    },
    {
      id: 'niqat-social-8',
      image: '/assets/Portfolio/Social%20media/Social%20Media%20Design%20for%20niqat%20coffee-8.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Graphics Collection - Niqat Coffee',
      description: 'Comprehensive collection of social media graphics designed for various digital marketing campaigns and promotions.',
      service: 'marketing-campaign-design',
      company: 'Niqat Coffee'
    },
    {
      id: 'prime-ethiopia-social',
      image: '/assets/Portfolio/Social%20media/Social%20Media%20Design%20For%20Prime%20Ethiopia.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Design - Prime Ethiopia',
      description: 'Professional social media design collection for Prime Ethiopia, featuring engaging posts and promotional graphics for digital marketing campaigns.',
      service: 'marketing-campaign-design',
      company: 'Prime Ethiopia'
    },
    {
      id: 'ptgr-social-template',
      image: '/assets/Portfolio/Social%20media/Social%20Media%20Template%20-%20PTGR.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Template - PTGR',
      description: 'Professional social media template design featuring modern layouts and engaging visual content for consistent brand communication.',
      service: 'marketing-campaign-design',
      company: 'PTGR'
    },
    {
      id: 'task-plug-social-template-2',
      image: '/assets/Portfolio/Social%20media/Social%20Media%20Template%20-%20Task%20Plug-2.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Template Series - Task Plug',
      description: 'Additional social media template design featuring promotional graphics and engaging visual content for digital marketing.',
      service: 'marketing-campaign-design',
      company: 'Task Plug'
    },
    {
      id: 'rollup-banners',
      image: '/assets/Portfolio/Rollup-Banners-68a13cab.webp',
      category: 'Banner Design · Print Design',
      title: 'Rollup Banners for Different Companies',
      description: 'Professional rollup banner designs for various companies, featuring modern layouts, compelling visuals, and brand-consistent messaging.',
      service: 'brand-applications-assets',
      company: 'Multiple Clients'
    },
    // Web Banner Projects - From Web banners folder
    {
      id: 'finix-banner-1',
      image: '/assets/Portfolio/Web%20banners/Website%20Banner%20For%20Finix%20Bet.webp',
      category: 'Web Design · Digital Marketing',
      title: 'Website Banner Design - Finix Bet',
      description: 'Professional website banner design for Finix Bet, optimized for web display and digital marketing campaigns.',
      service: 'digital-social-media-design',
      company: 'Finix Bet'
    },
    {
      id: 'finix-banner-2',
      image: '/assets/Portfolio/Web%20banners/Website%20Banner%20For%20Finix%20Bet-2.webp',
      category: 'Web Design · Digital Marketing',
      title: 'Website Banner Collection - Finix Bet',
      description: 'Website banner design featuring modern layouts and engaging visuals for effective online presence.',
      service: 'digital-social-media-design',
      company: 'Finix Bet'
    },
    {
      id: 'finix-banner-3',
      image: '/assets/Portfolio/Web%20banners/Website%20Banner%20For%20Finix%20Bet-3.webp',
      category: 'Web Design · Digital Marketing',
      title: 'Web Banner Design - Finix Bet',
      description: 'Professional web banner design optimized for various screen sizes and digital platforms.',
      service: 'digital-social-media-design',
      company: 'Finix Bet'
    },
    {
      id: 'finix-banner-4',
      image: '/assets/Portfolio/Web%20banners/Website%20Banner%20For%20Finix%20Bet-4.webp',
      category: 'Web Design · Digital Marketing',
      title: 'Website Banner Series - Finix Bet',
      description: 'Comprehensive website banner series designed for consistent brand communication across digital platforms.',
      service: 'digital-social-media-design',
      company: 'Finix Bet'
    },
    {
      id: 'finix-banner-5',
      image: '/assets/Portfolio/Web%20banners/Website%20Banner%20For%20Finix%20Bet-5.webp',
      category: 'Web Design · Digital Marketing',
      title: 'Web Banner Assets - Finix Bet',
      description: 'Professional web banner assets featuring modern design and engaging visuals for digital marketing.',
      service: 'digital-social-media-design',
      company: 'Finix Bet'
    },
    {
      id: 'finix-banner-10',
      image: '/assets/Portfolio/Web%20banners/Website%20Banner%20For%20Finix%20Bet-10.webp',
      category: 'Web Design · Digital Marketing',
      title: 'Website Banner Collection - Finix Bet',
      description: 'Engaging website banner collection featuring modern design and compelling visuals for digital marketing.',
      service: 'digital-social-media-design',
      company: 'Finix Bet'
    },
    // Art Direction Projects
    {
      id: 'art-direction-1',
      image: '/assets/Portfolio/Art Direction.webp',
      category: 'Art Direction · Visual Guidance',
      title: 'Art Direction & Visual Guidance - Project 1',
      description: 'Comprehensive art direction and visual guidance for product presentation, photography, and creative assets. This project involved developing a cohesive visual language across multiple touchpoints, ensuring brand consistency and high-quality execution. The art direction encompassed styling, composition, color palette selection, and overall aesthetic direction for product photography and marketing materials.',
      service: 'art-direction-visual-guidance',
      company: 'Various Clients'
    },
    {
      id: 'art-direction-2',
      image: '/assets/Portfolio/Art Direction-1 copy.webp',
      category: 'Art Direction · Visual Guidance',
      title: 'Art Direction & Visual Guidance - Project 2',
      description: 'Professional art direction and visual guidance for creative campaigns and brand storytelling. This project focused on establishing visual narratives that align with brand identity, including direction for photography shoots, video production, and digital content creation. The guidance ensured all visual elements work harmoniously to communicate the brand message effectively.',
      service: 'art-direction-visual-guidance',
      company: 'Various Clients'
    },
    {
      id: 'art-direction-3',
      image: '/assets/Portfolio/Art Direction-2 copy.webp',
      category: 'Art Direction · Visual Guidance',
      title: 'Art Direction & Visual Guidance - Project 3',
      description: 'Strategic art direction for product launches and marketing initiatives. This project involved creating comprehensive visual guidelines for product photography, including lighting, composition, background selection, and styling direction. The art direction ensured consistent visual quality across all product presentations and marketing channels.',
      service: 'art-direction-visual-guidance',
      company: 'Various Clients'
    },
    {
      id: 'art-direction-4',
      image: '/assets/Portfolio/Art Direction-3 copy.webp',
      category: 'Art Direction · Visual Guidance',
      title: 'Art Direction & Visual Guidance - Project 4',
      description: 'Comprehensive art direction for brand campaigns and visual communication. This project encompassed developing creative concepts, visual style guides, and direction for photography and videography teams. The guidance ensured all creative assets maintain brand integrity while achieving compelling visual storytelling that resonates with target audiences.',
      service: 'art-direction-visual-guidance',
      company: 'Various Clients'
    },
    {
      id: 'art-direction-5',
      image: '/assets/Portfolio/Art Direction-4 copy.webp',
      category: 'Art Direction · Visual Guidance',
      title: 'Art Direction & Visual Guidance - Project 5',
      description: 'Professional art direction for digital and print marketing materials. This project involved establishing visual direction for social media content, advertising campaigns, and promotional materials. The art direction included color palette selection, typography guidance, layout composition, and overall aesthetic direction to ensure cohesive brand presentation across all platforms.',
      service: 'art-direction-visual-guidance',
      company: 'Various Clients'
    },
    {
      id: 'art-direction-6',
      image: '/assets/Portfolio/Art Direction-5 copy.webp',
      category: 'Art Direction · Visual Guidance',
      title: 'Art Direction & Visual Guidance - Project 6',
      description: 'Strategic art direction for brand identity and visual systems. This project focused on creating comprehensive visual guidelines that extend beyond logo design to encompass photography style, illustration direction, and overall creative execution. The art direction ensured all brand touchpoints maintain visual consistency and brand alignment.',
      service: 'art-direction-visual-guidance',
      company: 'Various Clients'
    },
    {
      id: 'art-direction-7',
      image: '/assets/Portfolio/Art Direction-6 copy.webp',
      category: 'Art Direction · Visual Guidance',
      title: 'Art Direction & Visual Guidance - Project 7',
      description: 'Comprehensive art direction for creative projects and visual campaigns. This project involved developing visual concepts, directing photography sessions, and providing guidance for post-production processes. The art direction ensured high-quality visual outcomes that align with brand values and effectively communicate the intended message to target audiences.',
      service: 'art-direction-visual-guidance',
      company: 'Various Clients'
    },
    {
      id: 'art-direction-8',
      image: '/assets/Portfolio/Art Direction-7 copy.webp',
      category: 'Art Direction · Visual Guidance',
      title: 'Art Direction & Visual Guidance - Project 8',
      description: 'Professional art direction for product photography and visual content creation. This project encompassed styling direction, composition guidelines, lighting specifications, and overall aesthetic direction for product shoots. The art direction ensured consistent visual quality and brand alignment across all product imagery used in marketing and e-commerce platforms.',
      service: 'art-direction-visual-guidance',
      company: 'Various Clients'
    },
    {
      id: 'art-direction-9',
      image: '/assets/Portfolio/Art Direction-8 copy.webp',
      category: 'Art Direction · Visual Guidance',
      title: 'Art Direction & Visual Guidance - Project 9',
      description: 'Strategic art direction for brand campaigns and visual storytelling initiatives. This project involved creating comprehensive visual guidelines, directing creative teams, and ensuring brand consistency across all visual touchpoints. The art direction encompassed photography direction, video production guidance, and digital content creation to deliver cohesive and impactful brand experiences.',
      service: 'art-direction-visual-guidance',
      company: 'Various Clients'
    },
    // New Branding Projects
    {
      id: 'dumas-properties-branding',
      image: '/assets/Portfolio/Branding Dumas Properties.webp',
      category: 'Brand Identity · Real Estate',
      title: 'Full Brand Identity - Dumas Properties',
      description: 'Complete brand identity package including logo design, brand guidelines, comprehensive visual identity system, color palette, typography, and brand applications for a real estate company. The identity reflects trust, professionalism, and modern real estate excellence.',
      service: 'brand-identity-design',
      company: 'Dumas Properties'
    },
    {
      id: 'raya-hotel-branding',
      image: '/assets/Portfolio/Branding Raya Hotel & Convention Center.webp',
      category: 'Brand Identity · Hospitality',
      title: 'Full Brand Identity - Raya Hotel & Convention Center',
      description: 'Comprehensive brand identity system including logo design, brand guidelines, visual identity, color palette, typography, and complete brand applications for a hospitality and convention center. The identity captures elegance, luxury, and exceptional hospitality experiences.',
      service: 'brand-identity-design',
      company: 'Raya Hotel & Convention Center'
    },
    // New Print & Layout Projects
];

const Portfolio = () => {
  const { openPortfolioModal } = useContext(ModalContext);
  const [activeFilter, setActiveFilter] = useState('brand-identity');
  const filtersRef = useRef(null);

  const services = [
    { id: 'brand-identity', label: 'Brand Identity' },
    { id: 'digital-design', label: 'Digital Design' },
    { id: 'print-marketing', label: 'Print & Marketing' },
    { id: 'creative-direction', label: 'Creative Direction' }
  ];

  // Shuffle function to randomize project order (only once on mount)
  const shuffledProjects = useMemo(() => {
    const shuffled = [...portfolioProjects];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  // Helper function to shuffle projects ensuring no same company items are adjacent
  const shuffleWithCompanySeparation = (projects) => {
    if (projects.length <= 1) return projects;

    // Group projects by company
    const companyGroups = {};
    projects.forEach(project => {
      const company = project.company || 'Unknown';
      if (!companyGroups[company]) {
        companyGroups[company] = [];
      }
      companyGroups[company].push(project);
    });

    const companies = Object.keys(companyGroups);
    const shuffled = [];
    const companyIndices = {};
    companies.forEach(company => {
      companyIndices[company] = 0;
      // Shuffle each company's projects
      for (let i = companyGroups[company].length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [companyGroups[company][i], companyGroups[company][j]] = [companyGroups[company][j], companyGroups[company][i]];
      }
    });

    // Interleave companies to avoid adjacent same-company items
    let totalItems = projects.length;
    let lastCompany = null;
    
    while (shuffled.length < totalItems) {
      let found = false;
      
      // Try to find a company different from the last one
      for (const company of companies) {
        if (companyIndices[company] < companyGroups[company].length && company !== lastCompany) {
          shuffled.push(companyGroups[company][companyIndices[company]]);
          companyIndices[company]++;
          lastCompany = company;
          found = true;
          break;
        }
      }
      
      // If no different company found, use any available company
      if (!found) {
        for (const company of companies) {
          if (companyIndices[company] < companyGroups[company].length) {
            shuffled.push(companyGroups[company][companyIndices[company]]);
            companyIndices[company]++;
            lastCompany = company;
            break;
          }
        }
      }
    }

    return shuffled;
  };

  // Helper function to select max 6 items with company variety
  const selectWithVariety = (projects, maxItems = 6) => {
    if (projects.length <= maxItems) {
      return shuffleWithCompanySeparation(projects);
    }

    // Group projects by company
    const companyGroups = {};
    projects.forEach(project => {
      const company = project.company || 'Unknown';
      if (!companyGroups[company]) {
        companyGroups[company] = [];
      }
      companyGroups[company].push(project);
    });

    const selected = [];
    const usedCompanies = new Set();

    // First pass: Select one item from each company (max variety)
    const companies = Object.keys(companyGroups);
    for (const company of companies) {
      if (selected.length >= maxItems) break;
      if (companyGroups[company].length > 0) {
        selected.push(companyGroups[company][0]);
        usedCompanies.add(company);
        companyGroups[company].shift(); // Remove used item
      }
    }

    // Second pass: Fill remaining slots from any company if needed
    if (selected.length < maxItems) {
      const remaining = projects.filter(p => !selected.includes(p));
      const needed = maxItems - selected.length;
      selected.push(...remaining.slice(0, needed));
    }

    // Shuffle the selected items to avoid same company being adjacent
    return shuffleWithCompanySeparation(selected.slice(0, maxItems));
  };

  // Filter projects based on active filter category
  const filteredProjects = useMemo(() => {
    let filtered = [];
    
    if (activeFilter === 'brand-identity') {
      // Brand Identity: Logo design, visual systems, brand consistency
      filtered = shuffledProjects.filter(project => 
        project.service === 'brand-identity-design' ||
        project.service === 'logo-design' ||
        project.service === 'visual-identity-systems'
      );
    } else if (activeFilter === 'creative-direction') {
      // Creative Direction: Concept development, visual storytelling, art direction
      filtered = shuffledProjects.filter(project => 
        project.service === 'art-direction-visual-guidance'
      );
      // Sort art direction projects by ID to maintain numerical order (1-9)
      filtered.sort((a, b) => {
        const numA = parseInt(a.id.match(/\d+/)?.[0] || '0');
        const numB = parseInt(b.id.match(/\d+/)?.[0] || '0');
        return numA - numB;
      });
    } else if (activeFilter === 'digital-design') {
      // Digital Design: Social media visuals, campaigns, content creation
      filtered = shuffledProjects.filter(project => 
        project.service === 'digital-social-media-design' ||
        project.service === 'marketing-campaign-design'
      );
    } else if (activeFilter === 'print-marketing') {
      // Print & Marketing: Catalogs, brochures, brand collateral
      filtered = shuffledProjects.filter(project => 
        project.service === 'print-design' ||
        project.service === 'brand-applications-assets'
      );
    }
    
    // Limit to 6 items with company variety (already shuffled to avoid same company adjacent)
    return selectWithVariety(filtered, 6);
  }, [shuffledProjects, activeFilter]);

  // Separate Digital Design projects into Social Media and Web Banners
  const digitalDesignGroups = useMemo(() => {
    if (activeFilter !== 'digital-design') {
      return { socialMedia: [], webBanners: [] };
    }
    
    // Get all digital design projects first
    const allDigital = shuffledProjects.filter(project => 
      project.service === 'digital-social-media-design' ||
      project.service === 'marketing-campaign-design'
    );
    
    const socialMediaAll = allDigital.filter(project => 
      project.service === 'marketing-campaign-design'
    );
    const webBannersAll = allDigital.filter(project => 
      project.service === 'digital-social-media-design'
    );
    
    // For Social Media: Show all items shuffled to avoid same company adjacent
    const socialMedia = shuffleWithCompanySeparation(socialMediaAll);
    
    // For Web Banners: Show all items shuffled to avoid same company adjacent
    const webBanners = shuffleWithCompanySeparation(webBannersAll);
    
    return { socialMedia, webBanners };
  }, [shuffledProjects, activeFilter]);

  // Scroll active filter into view on mobile
  useEffect(() => {
    const scrollActiveFilter = () => {
      if (filtersRef.current && window.innerWidth <= 768) {
        const activeButton = filtersRef.current.querySelector('.portfolio-filter-btn.active');
        if (activeButton) {
          // For first filter (Brand Identity), scroll to start, for others center
          const isFirstFilter = activeButton === filtersRef.current.querySelector('.portfolio-filter-btn:first-child');
          activeButton.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: isFirstFilter ? 'start' : 'center'
          });
        }
      }
    };

    // Scroll on mount and when filter changes
    const timer = setTimeout(scrollActiveFilter, 300);
    return () => clearTimeout(timer);
  }, [activeFilter]);

  // Also scroll on initial mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (filtersRef.current && window.innerWidth <= 768) {
        const activeButton = filtersRef.current.querySelector('.portfolio-filter-btn.active');
        if (activeButton) {
          // For first filter (Brand Identity), scroll to start
          const isFirstFilter = activeButton === filtersRef.current.querySelector('.portfolio-filter-btn:first-child');
          activeButton.scrollIntoView({
            behavior: 'auto',
            block: 'nearest',
            inline: isFirstFilter ? 'start' : 'center'
          });
        }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="portfolio" className="portfolio" aria-labelledby="portfolio-heading">
      <div className="container">
        <div className="section-intro">
          <span className="section-number desktop-number">03</span>
          <span className="section-number mobile-number">03</span>
          <div className="section-header">
            <span className="section-label">Selected Work</span>
            <h2 id="portfolio-heading" className="section-title">
              <span className="title-main">Featured</span>
              <span className="title-accent">Projects</span>
            </h2>
          </div>
        </div>

        <div ref={filtersRef} className="portfolio-filters" role="tablist" aria-label="Filter portfolio projects by service">
          {services.map((service) => (
            <button
              key={service.id}
              className={`portfolio-filter-btn ${activeFilter === service.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(service.id)}
              role="tab"
              aria-selected={activeFilter === service.id}
              aria-controls="portfolio-grid"
              tabIndex={activeFilter === service.id ? 0 : -1}
            >
              {service.label}
            </button>
          ))}
        </div>
        
        {activeFilter === 'digital-design' ? (
          <>
            {/* Social Media Visuals Section */}
            {digitalDesignGroups.socialMedia.length > 0 && (
              <div className="digital-design-section">
                <h3 className="digital-design-section-title">Social Media Visuals</h3>
                <div className="portfolio-grid-modern portfolio-grid-square" role="list" aria-live="polite" aria-atomic="false">
                  {digitalDesignGroups.socialMedia.map((project) => (
                    <article 
                      key={project.id} 
                      className="portfolio-item-modern portfolio-item-square" 
                      data-project={project.id}
                      role="listitem"
                      tabIndex={0}
                      onClick={() => openPortfolioModal(project.id)}
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
                          height="600"
                          decoding="async"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            const container = e.target.closest('.portfolio-image-small');
                            if (container) {
                              container.style.minHeight = '200px';
                              container.style.background = 'var(--bg-primary)';
                            }
                          }}
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
            )}

            {/* Web & Campaign Banners Section */}
            {digitalDesignGroups.webBanners.length > 0 && (
              <div className="digital-design-section">
                <h3 className="digital-design-section-title">Web & Campaign Banners</h3>
                <div className="portfolio-grid-modern portfolio-grid-wide" role="list" aria-live="polite" aria-atomic="false">
                  {digitalDesignGroups.webBanners.map((project) => (
                    <article 
                      key={project.id} 
                      className="portfolio-item-modern portfolio-item-wide" 
                      data-project={project.id}
                      role="listitem"
                      tabIndex={0}
                      onClick={() => openPortfolioModal(project.id)}
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
                          width="1200" 
                          height="400"
                          decoding="async"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            const container = e.target.closest('.portfolio-image-small');
                            if (container) {
                              container.style.minHeight = '200px';
                              container.style.background = 'var(--bg-primary)';
                            }
                          }}
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
            )}
          </>
        ) : (
          <div id="portfolio-grid" className="portfolio-grid-modern" role="list" aria-live="polite" aria-atomic="false">
            {filteredProjects.map((project, index) => (
              <article 
                key={project.id} 
                className="portfolio-item-modern" 
                data-project={project.id}
                role="listitem"
                tabIndex={0}
                onClick={() => openPortfolioModal(project.id)}
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
                    onError={(e) => {
                      // Fallback: hide broken image gracefully
                      e.target.style.display = 'none';
                      const container = e.target.closest('.portfolio-image-small');
                      if (container) {
                        container.style.minHeight = '200px';
                        container.style.background = 'var(--bg-primary)';
                      }
                    }}
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
        )}
      </div>
    </section>
  );
};

export default Portfolio;


