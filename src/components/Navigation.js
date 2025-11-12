import React, { useEffect, useState, useRef } from 'react';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [portfolioDropdownOpen, setPortfolioDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    let cachedSections = null;
    let cachedSectionData = new Map();
    let lastWindowWidth = window.innerWidth;
    
    // Cache section data to avoid forced reflows
    const updateSectionCache = () => {
      const sections = document.querySelectorAll('section[id]');
      cachedSections = sections;
      cachedSectionData.clear();
      sections.forEach(section => {
        const id = section.getAttribute('id');
        if (id) {
          cachedSectionData.set(id, {
            top: section.offsetTop,
            height: section.offsetHeight
          });
        }
      });
    };
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentWidth = window.innerWidth;
          // Re-cache if window width changed (responsive breakpoint)
          if (Math.abs(currentWidth - lastWindowWidth) > 50) {
            updateSectionCache();
            lastWindowWidth = currentWidth;
          }
          
          const isMobile = currentWidth <= 768;
          if (!isMobile) {
            setScrolled(window.pageYOffset > 50);
          }

          // Use cached section data to avoid forced reflows
          if (!cachedSections || cachedSectionData.size === 0) {
            updateSectionCache();
          }
          
          const scrollPos = window.pageYOffset + (isMobile ? 50 : 150);
          
          for (const [sectionId, data] of cachedSectionData.entries()) {
            if (scrollPos >= data.top && scrollPos < data.top + data.height) {
              setActiveSection(sectionId);
              break;
            }
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial cache update after a short delay to ensure DOM is ready
    const initTimeout = setTimeout(updateSectionCache, 100);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateSectionCache, { passive: true });
    handleScroll();

    return () => {
      clearTimeout(initTimeout);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateSectionCache);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setPortfolioDropdownOpen(false);
      }
    };

    if (portfolioDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [portfolioDropdownOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const isMobile = window.innerWidth <= 768;
      const offsetTop = isMobile ? target.offsetTop - 20 : target.offsetTop - 100;
      window.scrollTo({
        top: Math.max(0, offsetTop),
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { href: '#home', label: 'Home', section: 'home' },
    { href: '#about', label: 'About', section: 'about' },
    { href: '#services', label: 'Services', section: 'services' },
    { 
      href: '#portfolio', 
      label: 'Portfolio', 
      section: 'portfolio',
      hasDropdown: true,
      dropdownItems: [
        { href: '#portfolio', label: 'Featured Works', section: 'portfolio' },
        { href: '#case-studies', label: 'Case Studies', section: 'case-studies' },
        { href: '#blog', label: 'Blog', section: 'blog' }
      ]
    },
    { href: '#contact', label: 'Contact', section: 'contact' }
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            aria-label="Go to home"
          >
            <img 
              src={`${process.env.PUBLIC_URL || ''}/assets/Logo.svg`} 
              alt="Bereket Fikre - Creative Graphic Designer and Brand Builder Logo" 
              className="logo-image" 
              width="150" 
              height="48"
              decoding="async"
              sizes="150px"
              fetchPriority="high"
            />
          </a>
        </div>
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
                      className={`nav-link ${activeSection === link.section || activeSection === 'case-studies' || activeSection === 'blog' ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setPortfolioDropdownOpen(!portfolioDropdownOpen);
                      }}
                      onMouseEnter={() => setPortfolioDropdownOpen(true)}
                      aria-label={`${link.label} menu`}
                      aria-expanded={portfolioDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>{link.label}</span>
                      <svg 
                        width="12" 
                        height="12" 
                        viewBox="0 0 12 12" 
                        fill="none" 
                        className={`dropdown-arrow ${portfolioDropdownOpen ? 'open' : ''}`}
                        aria-hidden="true"
                      >
                        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                    <ul className={`nav-dropdown ${portfolioDropdownOpen ? 'open' : ''}`}>
                      {link.dropdownItems.map(dropdownItem => (
                        <li key={dropdownItem.section}>
                          <a 
                            href={dropdownItem.href} 
                            className={`nav-dropdown-link ${activeSection === dropdownItem.section ? 'active' : ''}`}
                            onClick={(e) => {
                              handleNavClick(e, dropdownItem.href);
                              setPortfolioDropdownOpen(false);
                            }}
                            aria-label={`Go to ${dropdownItem.label} section`}
                          >
                            <span>{dropdownItem.label}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <a 
                    href={link.href} 
                    className={`nav-link ${activeSection === link.section ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                    aria-label={`Go to ${link.label} section`}
                  >
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


