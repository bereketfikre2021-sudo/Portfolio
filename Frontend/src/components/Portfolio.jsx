import React, { useContext, useState, useMemo, useEffect, useRef } from 'react';
import { ModalContext } from '../context/ModalContext';
import { STATIC_PROJECTS } from '../data/staticProjects';

// Map admin category values → frontend service filter keys
const CATEGORY_TO_SERVICE = {
  'Brand Identity':                  'brand-identity-design',
  'Digital Design · Social Media':   'marketing-campaign-design',
  'Digital Design · Web Banners':    'digital-social-media-design',
  'Print & Marketing':               'print-design',
  'Creative Direction':              'art-direction-visual-guidance',
  'Recent Projects':                 'recent-project',
  'brand-identity-design':           'brand-identity-design',
  'marketing-campaign-design':       'marketing-campaign-design',
  'digital-social-media-media':      'digital-social-media-design',
  'print-design':                    'print-design',
  'brand-applications-assets':       'brand-applications-assets',
  'art-direction-visual-guidance':   'art-direction-visual-guidance',
};

// Projects array - exported for use in PortfolioModal
export let portfolioProjects = [...STATIC_PROJECTS];

const MOBILE_BREAKPOINT = 768;
const WEB_BANNERS_MOBILE_IDS = ['finix-banner-1', 'finix-banner-2', 'finix-banner-3'];

const Portfolio = () => {
  const { openPortfolioModal } = useContext(ModalContext);
  const [activeFilter, setActiveFilter] = useState('recent');
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT
  );
  // Start with static data — always visible immediately
  const [allProjects, setAllProjects] = useState(STATIC_PROJECTS);
  const [apiLoaded, setApiLoaded] = useState(false);
  const filtersRef = useRef(null);

  // Silently fetch from API and upgrade static data when available.
  // Uses AbortController so each attempt times out after 15 s rather than
  // hanging indefinitely. Retries up to 5 times with increasing delays to
  // cover Render's free-tier cold-start (can be 30–90 s).
  useEffect(() => {
    if (apiLoaded) return;
    let cancelled = false;
    const DELAYS = [0, 8000, 15000, 20000, 25000]; // total ~68 s of retries

    const attempt = async (idx) => {
      if (cancelled || idx >= DELAYS.length) return;
      if (DELAYS[idx] > 0) {
        await new Promise((r) => setTimeout(r, DELAYS[idx]));
      }
      if (cancelled) return;

      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 15000); // 15 s timeout per attempt

      try {
        const res = await fetch(
          `${
            (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) ||
            'http://localhost:5000/api'
          }/projects?status=PUBLISHED&limit=100&sortBy=displayOrder&order=asc`,
          { signal: controller.signal, headers: { 'Content-Type': 'application/json' } }
        );
        clearTimeout(timer);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const data = json.data;
        if (cancelled) return;
        if (!Array.isArray(data) || data.length === 0) return; // keep static
        const mapped = data.map((p) => ({
          id:          p.slug,
          image:       p.thumbnail || '',
          category:    p.category,
          title:       p.title,
          description: p.shortDescription,
          service:     CATEGORY_TO_SERVICE[p.category] || 'print-design',
          company:     p.title.split(' - ').pop() || 'Various Clients',
          featured:    p.featured,
          _apiId:      p.id,
        }));
        portfolioProjects.length = 0;
        mapped.forEach((p) => portfolioProjects.push(p));
        setAllProjects(mapped);
        setApiLoaded(true);
      } catch {
        clearTimeout(timer);
        if (cancelled) return;
        attempt(idx + 1); // retry
      }
    };

    attempt(0);
    return () => { cancelled = true; };
  }, [apiLoaded]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const services = [
    { id: 'recent',             label: 'Recent Projects'    },
    { id: 'brand-identity',     label: 'Brand Identity'     },
    { id: 'digital-design',     label: 'Digital Design'     },
    { id: 'print-marketing',    label: 'Print & Marketing'  },
    { id: 'creative-direction', label: 'Creative Direction' },
  ];

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'recent') {
      const featured = allProjects.filter((p) => p.featured);
      return featured.length > 0 ? featured : allProjects.slice(0, 6);
    }
    if (activeFilter === 'brand-identity') {
      return allProjects.filter(
        (p) => !p.featured &&
          (p.service === 'brand-identity-design' || p.service === 'logo-design' || p.service === 'visual-identity-systems')
      );
    }
    if (activeFilter === 'creative-direction') {
      return allProjects.filter((p) => !p.featured && p.service === 'art-direction-visual-guidance');
    }
    if (activeFilter === 'digital-design') {
      return allProjects.filter((p) => !p.featured &&
        (p.service === 'digital-social-media-design' || p.service === 'marketing-campaign-design')
      );
    }
    if (activeFilter === 'print-marketing') {
      return allProjects.filter((p) => !p.featured &&
        (p.service === 'print-design' || p.service === 'brand-applications-assets')
      );
    }
    return [];
  }, [activeFilter, allProjects]);

  const digitalDesignGroups = useMemo(() => {
    if (activeFilter !== 'digital-design') return { socialMedia: [], webBanners: [] };
    const allDigital = allProjects.filter(
      (p) => !p.featured &&
        (p.service === 'digital-social-media-design' || p.service === 'marketing-campaign-design')
    );
    const socialMediaAll = allDigital.filter((p) => p.service === 'marketing-campaign-design');
    const webBannersAll  = allDigital.filter((p) => p.service === 'digital-social-media-design');
    return { socialMedia: socialMediaAll, webBanners: webBannersAll };
  }, [activeFilter, allProjects]);

  // Scroll active filter button into view on mobile
  useEffect(() => {
    const timer = setTimeout(() => {
      if (filtersRef.current && window.innerWidth <= 768) {
        const btn = filtersRef.current.querySelector('.portfolio-filter-btn.active');
        if (btn) {
          const isFirst = btn === filtersRef.current.querySelector('.portfolio-filter-btn:first-child');
          if (isFirst) filtersRef.current.scrollLeft = 0;
          else btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [activeFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filtersRef.current && window.innerWidth <= 768) filtersRef.current.scrollLeft = 0;
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Reusable project card renderer
  const renderCard = (project, extraClass = '') => (
    <article
      key={project.id}
      className={`portfolio-item-modern ${extraClass}`}
      data-project={project.id}
      role="listitem"
      tabIndex={0}
      onClick={() => openPortfolioModal(project.id)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPortfolioModal(project.id); } }}
      aria-label={`${project.title} - ${project.category}. Click to view project details`}
    >
      <div className="portfolio-image-small">
        <img
          src={project.image && project.image.startsWith('http') ? project.image : project.image}
          alt={`${project.title} - ${project.category} project by Bereket Fikre`}
          className="portfolio-thumb"
          loading="lazy"
          width="600"
          height="400"
          decoding="async"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={(e) => {
            e.target.style.display = 'none';
            const c = e.target.closest('.portfolio-image-small');
            if (c) { c.style.minHeight = '200px'; c.style.background = 'var(--bg-primary)'; }
          }}
        />
      </div>
      <div className="portfolio-content">
        <span className="portfolio-category-modern">{project.category}</span>
        <h3>{project.title}</h3>
        <p className="portfolio-card-description">{project.description}</p>
        <a href="#" className="portfolio-link-modern"
          onClick={(e) => { e.preventDefault(); openPortfolioModal(project.id); }}
          aria-label={`View ${project.title} project`}
        >
          <span>View Project</span>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </article>
  );

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
            {digitalDesignGroups.socialMedia.length > 0 && (
              <div className="digital-design-section">
                <h3 className="digital-design-section-title">Social Media Visuals</h3>
                <div className="portfolio-grid-modern portfolio-grid-square" role="list" aria-live="polite" aria-atomic="false">
                  {digitalDesignGroups.socialMedia.map((p) => renderCard(p, 'portfolio-item-square'))}
                </div>
              </div>
            )}
            {digitalDesignGroups.webBanners.length > 0 && (
              <div className="digital-design-section">
                <h3 className="digital-design-section-title">Web & Campaign Banners</h3>
                <div className="portfolio-grid-modern portfolio-grid-wide" role="list" aria-live="polite" aria-atomic="false">
                  {(isMobile
                    ? WEB_BANNERS_MOBILE_IDS.map((id) => digitalDesignGroups.webBanners.find((p) => p.id === id)).filter(Boolean)
                    : digitalDesignGroups.webBanners
                  ).map((p) => renderCard(p, 'portfolio-item-wide'))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div id="portfolio-grid" className="portfolio-grid-modern" role="list" aria-live="polite" aria-atomic="false">
            {(activeFilter === 'creative-direction' && isMobile
              ? filteredProjects.slice(0, 3)
              : filteredProjects
            ).map((p) => renderCard(p))}
            {filteredProjects.length === 0 && (
              <p className="portfolio-empty-state" role="status">
                No projects in this category yet — check back soon.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
