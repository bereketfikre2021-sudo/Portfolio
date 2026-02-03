import React, { useEffect, useState, useRef } from 'react';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const moreDropdownRef = useRef(null);

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

    // Initial cache update - use requestAnimationFrame instead of delay
    requestAnimationFrame(() => {
      updateSectionCache();
      handleScroll();
    });
    
    let resizeTicking = false;
    const handleResize = () => {
      if (!resizeTicking) {
        requestAnimationFrame(() => {
          updateSectionCache();
          resizeTicking = false;
        });
        resizeTicking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target)) {
        setMoreDropdownOpen(false);
      }
    };

    if (moreDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [moreDropdownOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      // Batch layout reads in requestAnimationFrame to avoid forced reflow
      requestAnimationFrame(() => {
        // Read all layout properties together in one batch
        const isMobile = window.innerWidth <= 768;
        const offsetTop = target.offsetTop;
        const scrollOffset = isMobile ? offsetTop - 20 : offsetTop - 100;
        window.scrollTo({
          top: Math.max(0, scrollOffset),
          behavior: 'smooth'
        });
      });
    }
  };

  const navLinks = [
    { href: '#home', label: 'Home', section: 'home' },
    { href: '#about', label: 'About', section: 'about' },
    { href: '#portfolio', label: 'Portfolio', section: 'portfolio' },
    {
      href: '#case-studies',
      label: 'More',
      section: 'more',
      hasDropdown: true,
      dropdownItems: [
        { href: '#case-studies', label: 'Case Studies', section: 'case-studies' },
        { href: '#blog', label: 'Blog', section: 'blog' }
      ]
    },
    { href: '#contact', label: 'Contact', section: 'contact' }
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar" aria-label="Main navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            aria-label="Go to home"
          >
            <img 
              src={`${process.env.PUBLIC_URL || ''}/assets/Logo.svg`} 
              alt="Bereket Fikre - Senior Graphic Designer and Brand Builder Logo" 
              className="logo-image" 
              width="150" 
              height="48"
              decoding="async"
              sizes="150px"
              fetchpriority="high"
            />
          </a>
        </div>
        <div className="nav-links-wrapper">
          <ul className="nav-menu" id="navMenu">
            {navLinks.map((link, index) => (
              <li 
                key={link.section} 
                className={link.hasDropdown ? 'nav-item-dropdown' : ''}
                ref={link.hasDropdown ? moreDropdownRef : null}
              >
                {link.hasDropdown ? (
                  <>
                    <a 
                      href={link.href} 
                      className={`nav-link ${activeSection === 'blog' || activeSection === 'case-studies' ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setMoreDropdownOpen(!moreDropdownOpen);
                      }}
                      onMouseEnter={() => setMoreDropdownOpen(true)}
                      aria-label={`${link.label} submenu`}
                      aria-expanded={moreDropdownOpen}
                      aria-haspopup="true"
                      aria-controls="more-dropdown-menu"
                    >
                      <span>{link.label}</span>
                      <svg 
                        width="12" 
                        height="12" 
                        viewBox="0 0 12 12" 
                        fill="none" 
                        className={`dropdown-arrow ${moreDropdownOpen ? 'open' : ''}`}
                        aria-hidden="true"
                      >
                        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                    <ul id="more-dropdown-menu" className={`nav-dropdown ${moreDropdownOpen ? 'open' : ''}`} role="menu" aria-label="More sections">
                      {link.dropdownItems.map(dropdownItem => (
                        <li key={dropdownItem.section} role="none">
                          <a 
                            href={dropdownItem.href} 
                            role="menuitem"
                            className={`nav-dropdown-link ${activeSection === dropdownItem.section ? 'active' : ''}`}
                            onClick={(e) => {
                              handleNavClick(e, dropdownItem.href);
                              setMoreDropdownOpen(false);
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


