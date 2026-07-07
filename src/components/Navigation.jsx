import React, { useEffect, useState, useRef, useCallback } from 'react';
import { FITNESS_APP_URL, DATING_APP_URL, FITNESS_APP_LOGO } from '../data/appUrls';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [portfolioDropdownOpen, setPortfolioDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    let cachedSectionData = new Map();
    let lastWindowWidth = window.innerWidth;

    const updateSectionCache = () => {
      cachedSectionData.clear();
      document.querySelectorAll('section[id]').forEach(section => {
        const id = section.getAttribute('id');
        if (id) cachedSectionData.set(id, { top: section.offsetTop, height: section.offsetHeight });
      });
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const currentWidth = window.innerWidth;
        if (Math.abs(currentWidth - lastWindowWidth) > 50) {
          updateSectionCache();
          lastWindowWidth = currentWidth;
        }
        if (!cachedSectionData.size) updateSectionCache();

        const isMobile = currentWidth <= 768;
        if (!isMobile) setScrolled(window.pageYOffset > 50);

        const scrollPos = window.pageYOffset + (isMobile ? 50 : 150);
        for (const [id, data] of cachedSectionData.entries()) {
          if (scrollPos >= data.top && scrollPos < data.top + data.height) {
            setActiveSection(id);
            break;
          }
        }
        ticking = false;
      });
    };

    requestAnimationFrame(() => { updateSectionCache(); handleScroll(); });

    let resizeTicking = false;
    const handleResize = () => {
      if (resizeTicking) return;
      resizeTicking = true;
      requestAnimationFrame(() => { updateSectionCache(); resizeTicking = false; });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!portfolioDropdownOpen) return;
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setPortfolioDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [portfolioDropdownOpen]);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setPortfolioDropdownOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    requestAnimationFrame(() => {
      const isMobile = window.innerWidth <= 768;
      const offset = isMobile ? target.offsetTop - 20 : target.offsetTop - 80;
      window.scrollTo({ top: Math.max(0, offset), behavior: 'smooth' });
    });
  }, []);

  const navLinks = [
    { href: '#home',     label: 'Home',     section: 'home',     number: '01' },
    { href: '#about',    label: 'About',    section: 'about',    number: '02' },
    { href: '#services', label: 'Services', section: 'services', number: '03' },
    {
      href: '#portfolio', label: 'Portfolio', section: 'portfolio', number: '04',
      hasDropdown: true,
      dropdownItems: [
        { href: '#portfolio',    label: 'Featured Works', section: 'portfolio' },
        { href: '#case-studies', label: 'Case Studies',  section: 'case-studies' },
        { href: '#blog',         label: 'Blog',          section: 'blog' },
        { divider: true },
        { href: FITNESS_APP_URL, label: 'Fitness Track Pro', external: true, icon: 'fitness' },
        { href: DATING_APP_URL,  label: 'Dating Pro',        external: true, icon: 'heart'   },
      ],
    },
    { href: '#contact', label: 'Contact', section: 'contact', number: '05' },
  ];

  return (
    <nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      id="navbar"
      aria-label="Main navigation"
    >
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo">
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} aria-label="Go to home">
            <img
              src={`${process.env.PUBLIC_URL || ''}/assets/Logo.svg`}
              alt="Bereket Fikre — Senior Graphic Designer"
              className="logo-image"
              width="150"
              height="48"
              decoding="async"
              fetchpriority="high"
            />
          </a>
        </div>

        {/* Desktop nav links — hidden on mobile, bottom nav handles mobile */}
        <div className="nav-links-wrapper">
          <ul className="nav-menu" id="navMenu">
            {navLinks.map((link, index) => (
              <li
                key={link.section}
                className={link.hasDropdown ? 'nav-item-dropdown' : ''}
                ref={link.hasDropdown && index === 3 ? dropdownRef : null}
              >
                {link.hasDropdown ? (
                  <>
                    <a
                      href={link.href}
                      className={`nav-link ${activeSection === link.section || activeSection === 'blog' || activeSection === 'case-studies' ? 'active' : ''}`}
                      onClick={(e) => { e.preventDefault(); setPortfolioDropdownOpen(v => !v); }}
                      onMouseEnter={() => setPortfolioDropdownOpen(true)}
                      onMouseLeave={() => setPortfolioDropdownOpen(false)}
                      aria-expanded={portfolioDropdownOpen}
                      aria-haspopup="true"
                      aria-controls="portfolio-dropdown-menu"
                    >
                      <span className="nav-number">{link.number}</span>
                      <span>{link.label}</span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                        className={`dropdown-arrow ${portfolioDropdownOpen ? 'open' : ''}`}
                        aria-hidden="true"
                      >
                        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                    <ul
                      id="portfolio-dropdown-menu"
                      className={`nav-dropdown ${portfolioDropdownOpen ? 'open' : ''}`}
                      role="menu"
                      aria-label="Portfolio sections"
                      onMouseEnter={() => setPortfolioDropdownOpen(true)}
                      onMouseLeave={() => setPortfolioDropdownOpen(false)}
                    >
                      {link.dropdownItems.map((item, i) =>
                        item.divider ? (
                          <li key={`divider-${i}`} role="none" className="nav-dropdown-divider" aria-hidden="true" />
                        ) : item.external ? (
                          <li key={item.href} role="none">
                            <a
                              href={item.href}
                              role="menuitem"
                              className="nav-dropdown-link nav-dropdown-link--app"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setPortfolioDropdownOpen(false)}
                            >
                              {item.icon === 'fitness' && (
                                <img
                                  src={FITNESS_APP_LOGO}
                                  alt=""
                                  className="nav-dropdown-app-icon"
                                  width="16"
                                  height="16"
                                  loading="lazy"
                                  decoding="async"
                                />
                              )}
                              {item.icon === 'heart' && (
                                <span className="nav-dropdown-app-icon nav-dropdown-app-icon--heart" aria-hidden="true">
                                  <svg viewBox="0 0 24 24" fill="currentColor" width="11" height="11">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                  </svg>
                                </span>
                              )}
                              {item.label}
                              <svg className="nav-dropdown-external-icon" viewBox="0 0 24 24" fill="none"
                                   stroke="currentColor" strokeWidth="2" width="10" height="10" aria-hidden="true">
                                <path d="M7 17L17 7M17 7H9M17 7V15" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </a>
                          </li>
                        ) : (
                          <li key={item.section} role="none">
                            <a
                              href={item.href}
                              role="menuitem"
                              className={`nav-dropdown-link ${activeSection === item.section ? 'active' : ''}`}
                              onClick={(e) => handleNavClick(e, item.href)}
                            >
                              {item.label}
                            </a>
                          </li>
                        )
                      )}
                    </ul>
                  </>
                ) : (
                  <a
                    href={link.href}
                    className={`nav-link ${activeSection === link.section ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                    aria-label={`Go to ${link.label}`}
                    aria-current={activeSection === link.section ? 'location' : undefined}
                  >
                    <span className="nav-number">{link.number}</span>
                    <span>{link.label}</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
          <div className="nav-line"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
