import React, { useState, useEffect } from 'react';

const BottomNav = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = document.querySelectorAll('section[id]');
          const isMobile = window.innerWidth <= 768;
          const scrollPos = window.pageYOffset + (isMobile ? 50 : 150);

          sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
              setActiveSection(sectionId || 'home');
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    { href: '#services', label: 'Services', section: 'services', icon: (
      <svg className="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    )},
    { href: '#portfolio', label: 'Portfolio', section: 'portfolio', icon: (
      <svg className="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M9 21V9"/>
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
      {navItems.map((item) => (
        <a
          key={item.section}
          href={item.href}
          className={`bottom-nav-item ${activeSection === item.section ? 'active' : ''}`}
          aria-label={item.label}
          onClick={(e) => handleNavClick(e, item.href)}
        >
          {item.icon}
          <span className="bottom-nav-label">{item.label}</span>
        </a>
      ))}
    </nav>
  );
};

export default BottomNav;



