import React, { useContext, useState, useMemo, useEffect, useRef } from 'react';
import { ModalContext } from '../context/ModalContext';
import apiFetch from '../utils/api';

// Latest project IDs - shown when "Latest" filter is selected (from Latest folder)
// These are the FALLBACK slugs — replaced by featured:true from API
const RECENT_PROJECT_IDS = [
  'toco-premium-coffee-packaging',
  'toco-rollup-banner',
  'prime-ethiopia-flyer',
  'ptgr-trifold',
  'company-profile-cci-utop-goozam',
  'course-outline-cci',
];

// Map admin category values → frontend service filter keys
const CATEGORY_TO_SERVICE = {
  'Brand Identity':                  'brand-identity-design',
  'Digital Design · Social Media':   'marketing-campaign-design',
  'Digital Design · Web Banners':    'digital-social-media-design',
  'Print & Marketing':               'print-design',
  'Creative Direction':              'art-direction-visual-guidance',
  'Recent Projects':                 'recent-project',
  // Legacy service key pass-through (for items already using service keys)
  'brand-identity-design':           'brand-identity-design',
  'marketing-campaign-design':       'marketing-campaign-design',
  'digital-social-media-media':      'digital-social-media-design',
  'print-design':                    'print-design',
  'brand-applications-assets':       'brand-applications-assets',
  'art-direction-visual-guidance':   'art-direction-visual-guidance',
};

// Resolve image src — handles both Cloudinary URLs and local /assets/ paths
const resolveImage = (thumbnail, localPath) => {
  if (thumbnail && thumbnail.startsWith('http')) return thumbnail;
  return localPath || thumbnail || '';
};

// Projects array - exported for use in PortfolioModal
// Starts as empty array; populated from API on mount; PortfolioModal reads this
export let portfolioProjects = [];

const MOBILE_BREAKPOINT = 768;
const WEB_BANNERS_MOBILE_MAX = 3;
const WEB_BANNERS_MOBILE_IDS = ['finix-banner-1', 'finix-banner-2', 'finix-banner-3'];
const SOCIAL_MEDIA_ORDER = [
  'blu-hart-karaoke',
  'ace-stainless-social',
  'awra-designs-social',
  'digital-deresegn-social-post',
  'niqat-social-8',
  'task-plug-social-template-2',
  'prime-ethiopia-social',
  'prime-ethiopia-social-8'
];

const Portfolio = () => {
  const { openPortfolioModal } = useContext(ModalContext);
  const [activeFilter, setActiveFilter] = useState('recent');
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT);
  const [allProjects, setAllProjects] = useState([]);
  const filtersRef = useRef(null);

  // Fetch all published projects from backend
  useEffect(() => {
    apiFetch('/projects?status=PUBLISHED&limit=100&sortBy=displayOrder&order=asc')
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) return;
        const mapped = data.map((p) => ({
          id:          p.slug,                                          // slug used as ID for modal lookup
          image:       p.thumbnail || '',                              // Cloudinary URL (no local fallback needed — admin uploads images)
          category:    p.category,                                     // e.g. 'Brand Identity', 'Print & Marketing'
          title:       p.title,
          description: p.shortDescription,
          service:     CATEGORY_TO_SERVICE[p.category] || 'print-design',
          company:     p.title.split(' - ').pop() || 'Various Clients', // extract company from title as best-effort
          featured:    p.featured,
          _apiId:      p.id,                                           // original UUID for gallery fetch
        }));
        // Update the exported array so PortfolioModal can read it
        portfolioProjects.length = 0;
        mapped.forEach((p) => portfolioProjects.push(p));
        setAllProjects(mapped);
      })
      .catch(() => {
        // API unavailable — allProjects stays empty, filteredProjects will be empty
      });
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const services = [
    { id: 'recent', label: 'Latest' },
    { id: 'brand-identity', label: 'Brand Identity' },
    { id: 'digital-design', label: 'Digital Design' },
    { id: 'print-marketing', label: 'Print & Marketing' },
    { id: 'creative-direction', label: 'Creative Direction' }
  ];

  // Shuffle function to randomize project order (re-runs when allProjects loads from API)
  const shuffledProjects = useMemo(() => {
    const shuffled = [...allProjects];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [allProjects]);

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
    
    if (activeFilter === 'recent') {
      // Show projects marked as featured (Recent Projects) from API
      // Fall back to RECENT_PROJECT_IDS order if available
      const featuredProjects = allProjects.filter(p => p.featured);
      if (featuredProjects.length > 0) return featuredProjects;
      filtered = RECENT_PROJECT_IDS.map((id) =>
        allProjects.find((p) => p.id === id)
      ).filter(Boolean);
      return filtered;
    } else if (activeFilter === 'brand-identity') {
      // Brand Identity: Logo design, visual systems, brand consistency (exclude Recent Projects)
      filtered = shuffledProjects.filter(project => 
        !project.featured &&
        (project.service === 'brand-identity-design' ||
        project.service === 'logo-design' ||
        project.service === 'visual-identity-systems')
      );
      // Show all brand identity projects (no cap)
      return filtered;
    } else if (activeFilter === 'creative-direction') {
      // Creative Direction: Concept development, visual storytelling, art direction (exclude Latest-only projects)
      filtered = allProjects.filter(project => 
        !project.featured &&
        project.service === 'art-direction-visual-guidance'
      );
      // Sort creative direction projects by ID to maintain numerical order (1-6)
      // Projects are already in order in the array, but sort to ensure correct sequence
      filtered.sort((a, b) => {
        // Extract the number at the end of the ID (e.g., 'creative-direction-1' -> 1)
        const matchA = a.id.match(/-(\d+)$/);
        const matchB = b.id.match(/-(\d+)$/);
        const numA = matchA ? parseInt(matchA[1]) : 0;
        const numB = matchB ? parseInt(matchB[1]) : 0;
        return numA - numB;
      });
      // Return sorted array directly for creative direction (no shuffling)
      return filtered;
    } else if (activeFilter === 'digital-design') {
      // Digital Design: Social media visuals, campaigns, content creation (exclude Recent Projects)
      filtered = shuffledProjects.filter(project => 
        !project.featured &&
        (project.service === 'digital-social-media-design' ||
        project.service === 'marketing-campaign-design')
      );
    } else if (activeFilter === 'print-marketing') {
      // Print & Marketing: Catalogs, brochures, brand collateral (exclude Recent Projects)
      filtered = shuffledProjects.filter(project => 
        !project.featured &&
        (project.service === 'print-design' ||
        project.service === 'brand-applications-assets')
      );
    }
    
    // Limit to 6 items with company variety
    return selectWithVariety(filtered, 6);
  }, [shuffledProjects, activeFilter, allProjects]);

  // Separate Digital Design projects into Social Media and Web Banners
  const digitalDesignGroups = useMemo(() => {
    if (activeFilter !== 'digital-design') {
      return { socialMedia: [], webBanners: [] };
    }
    
    // Get all digital design projects (exclude Recent Projects)
    const allDigital = shuffledProjects.filter(project => 
      !project.featured &&
      (project.service === 'digital-social-media-design' ||
      project.service === 'marketing-campaign-design')
    );
    
    const socialMediaAll = allDigital.filter(project => 
      project.service === 'marketing-campaign-design'
    );
    const webBannersAll = allDigital.filter(project => 
      project.service === 'digital-social-media-design'
    );
    
    // Keep social media ordering stable
    const socialMedia = [
      ...SOCIAL_MEDIA_ORDER.map((id) => socialMediaAll.find((p) => p.id === id)).filter(Boolean),
      ...socialMediaAll.filter((p) => !SOCIAL_MEDIA_ORDER.includes(p.id))
    ];
    
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
          if (isFirstFilter) {
            // Ensure first filter is at the start
            filtersRef.current.scrollLeft = 0;
          } else {
            activeButton.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
              inline: 'center'
            });
          }
        }
      }
    };

    // Scroll on mount and when filter changes
    const timer = setTimeout(scrollActiveFilter, 300);
    return () => clearTimeout(timer);
  }, [activeFilter]);

  // Also scroll on initial mount - ensure first filter is visible
  useEffect(() => {
    const timer = setTimeout(() => {
      if (filtersRef.current && window.innerWidth <= 768) {
        // Reset scroll to start to show first filter (Brand Identity)
        filtersRef.current.scrollLeft = 0;
        
        const activeButton = filtersRef.current.querySelector('.portfolio-filter-btn.active');
        if (activeButton) {
          // For first filter (Brand Identity), scroll to start
          const isFirstFilter = activeButton === filtersRef.current.querySelector('.portfolio-filter-btn:first-child');
          if (isFirstFilter) {
            // Ensure first filter is at the start
            filtersRef.current.scrollLeft = 0;
          } else {
            activeButton.scrollIntoView({
              behavior: 'auto',
              block: 'nearest',
              inline: 'center'
            });
          }
        }
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="portfolio" className="portfolio" aria-labelledby="portfolio-heading">
      <div className="container">
        <div className="section-intro">
          <span className="section-number desktop-number">04</span>
          <span className="section-number mobile-number">04</span>
          <div className="section-header">
            <span className="section-label">Selected Work</span>
            <h2 id="portfolio-heading" className="section-title">
              <span className="title-main">Featured</span>
              <span className="title-accent">Projects</span>
            </h2>
          </div>
        </div>

        <div ref={filtersRef} className="portfolio-filters" role="group" aria-label="Filter portfolio projects by service">
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              className={`portfolio-filter-btn ${activeFilter === service.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(service.id)}
              aria-pressed={activeFilter === service.id}
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
                          src={project.image && project.image.startsWith('http') ? project.image : `${process.env.PUBLIC_URL || ''}${project.image}`} 
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
                        <p className="portfolio-card-description">{project.description}</p>
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
                  {(isMobile
                    ? WEB_BANNERS_MOBILE_IDS
                        .map(id => digitalDesignGroups.webBanners.find(p => p.id === id))
                        .filter(Boolean)
                    : digitalDesignGroups.webBanners
                  ).map((project) => (
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
                          src={project.image && project.image.startsWith('http') ? project.image : `${process.env.PUBLIC_URL || ''}${project.image}`} 
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
                        <p className="portfolio-card-description">{project.description}</p>
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
            {(activeFilter === 'creative-direction' && isMobile ? filteredProjects.slice(0, 3) : filteredProjects).map((project, index) => (
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
                    src={project.image && project.image.startsWith('http') ? project.image : `${process.env.PUBLIC_URL || ''}${project.image}`} 
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
                  <p className="portfolio-card-description">{project.description}</p>
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


