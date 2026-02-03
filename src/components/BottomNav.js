import React, { useState, useEffect, useRef } from 'react';

const moreDropdownItems = [
  { href: '#case-studies', label: 'Case Studies', section: 'case-studies' },
  { href: '#blog', label: 'Blog', section: 'blog' }
];

const BottomNav = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const moreDropdownRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    let cachedSectionData = new Map();
    let lastWindowWidth = window.innerWidth;
    
    // Cache section data to avoid forced reflows
    const updateSectionCache = () => {
      const sections = document.querySelectorAll('section[id]');
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
          // Re-cache if window width changed
          if (Math.abs(currentWidth - lastWindowWidth) > 50) {
            updateSectionCache();
            lastWindowWidth = currentWidth;
          }
          
          if (cachedSectionData.size === 0) {
            updateSectionCache();
          }
          
          const isMobile = currentWidth <= 768;
          const scrollPos = window.pageYOffset + (isMobile ? 50 : 150);

          // Use cached data to avoid forced reflows
          for (const [sectionId, data] of cachedSectionData.entries()) {
            if (scrollPos >= data.top && scrollPos < data.top + data.height) {
              setActiveSection(sectionId || 'home');
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

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      requestAnimationFrame(() => {
        const isMobile = window.innerWidth <= 768;
        const offsetTop = isMobile ? target.offsetTop - 20 : target.offsetTop - 100;
        window.scrollTo({
          top: Math.max(0, offsetTop),
          behavior: 'smooth'
        });
      });
    }
  };

  const handleMoreItemClick = (e, href) => {
    setMoreDropdownOpen(false);
    handleNavClick(e, href);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(e.target)) {
        setMoreDropdownOpen(false);
      }
    };
    if (moreDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [moreDropdownOpen]);

  useEffect(() => {
    if (moreDropdownOpen) {
      const closeOnScroll = () => setMoreDropdownOpen(false);
      window.addEventListener('scroll', closeOnScroll, { passive: true });
      return () => window.removeEventListener('scroll', closeOnScroll);
    }
  }, [moreDropdownOpen]);

  const navItems = [
    { href: '#home', label: 'Home', section: 'home', icon: (
      <svg className="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    )},
    { href: '#about', label: 'About', section: 'about', icon: (
      <svg className="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    )},
    { href: '#portfolio', label: 'Portfolio', section: 'portfolio', icon: (
      <svg className="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M9 21V9"/>
      </svg>
    )},
    { href: '#case-studies', label: 'More', section: 'more', icon: (
      <svg className="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
      </svg>
    )},
    { href: '#contact', label: 'Contact', section: 'contact', icon: (
      <svg className="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    )}
  ];

  return (
    <nav className="bottom-nav" id="bottomNav">
      {navItems.map((item) => {
        const isActive = activeSection === item.section || (item.section === 'more' && (activeSection === 'case-studies' || activeSection === 'blog'));
        const isMore = item.section === 'more';

        if (isMore) {
          return (
            <div key={item.section} className="bottom-nav-more-wrap" ref={moreDropdownRef}>
              <button
                type="button"
                className={`bottom-nav-item ${isActive ? 'active' : ''} ${moreDropdownOpen ? 'open' : ''}`}
                aria-label={moreDropdownOpen ? 'Close more menu' : 'Open more menu'}
                aria-expanded={moreDropdownOpen}
                aria-haspopup="true"
                aria-controls="bottom-nav-more-menu"
                onClick={(e) => {
                  e.preventDefault();
                  setMoreDropdownOpen((open) => !open);
                }}
              >
                {item.icon}
                <span className="bottom-nav-label">{item.label}</span>
              </button>
              <ul
                id="bottom-nav-more-menu"
                className={`bottom-nav-dropdown ${moreDropdownOpen ? 'open' : ''}`}
                role="menu"
                aria-label="More sections"
              >
                {moreDropdownItems.map((sub) => (
                  <li key={sub.section} role="none">
                    <a
                      href={sub.href}
                      role="menuitem"
                      className={`bottom-nav-dropdown-link ${activeSection === sub.section ? 'active' : ''}`}
                      onClick={(e) => handleMoreItemClick(e, sub.href)}
                      aria-label={`Go to ${sub.label} section`}
                    >
                      {sub.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        return (
          <a
            key={item.section}
            href={item.href}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            aria-label={`Go to ${item.label}`}
            aria-current={isActive ? 'location' : undefined}
            onClick={(e) => handleNavClick(e, item.href)}
          >
            {item.icon}
            <span className="bottom-nav-label">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
};

export default BottomNav;



