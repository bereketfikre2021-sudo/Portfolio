import React, { useEffect } from 'react';

const Contact = () => {
  // Ensure Contact section is visible on mobile and desktop when AOS is disabled or not working
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    const ensureVisibility = () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const aosElements = contactSection.querySelectorAll('[data-aos]');
        aosElements.forEach((el) => {
          el.style.opacity = '1';
          el.style.visibility = 'visible';
          el.style.transform = 'none';
          el.style.pointerEvents = 'auto';
        });

        const sectionIntro = contactSection.querySelector('.section-intro');
        if (sectionIntro) {
          sectionIntro.style.opacity = '1';
          sectionIntro.style.visibility = 'visible';
          sectionIntro.style.display = 'flex';
        }

        const contentWrapper = contactSection.querySelector('.contact-content-wrapper');
        if (contentWrapper) {
          contentWrapper.style.opacity = '1';
          contentWrapper.style.visibility = 'visible';
          contentWrapper.style.display = 'flex';
        }
      }
    };

    if (isMobile) {
      ensureVisibility();
      return;
    }

    const refreshAOS = () => {
      if (!window.AOS) return;
      window.AOS.refresh();
      const contactSection = document.getElementById('contact');
      if (!contactSection) return;
      requestAnimationFrame(() => {
        const rect = contactSection.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        if (isInViewport) {
          const aosElements = contactSection.querySelectorAll('[data-aos]');
          aosElements.forEach((el) => {
            if (window.AOS) window.AOS.animate(el);
          });
        }
      });
    };

    refreshAOS();
    const timer1 = setTimeout(refreshAOS, 100);
    const timer2 = setTimeout(refreshAOS, 300);
    const fallbackTimer = setTimeout(ensureVisibility, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <section id="contact" className="contact" aria-labelledby="contact-heading">
      <div className="container">
        <div className="section-intro" data-aos="fade-up">
          <span className="section-number desktop-number">10</span>
          <span className="section-number mobile-number">07</span>
          <div className="section-header">
            <span className="section-label">Get in Touch</span>
            <h2 id="contact-heading" className="section-title">
              <span className="title-main">Let's Create Something</span>
              <span className="title-accent">Amazing</span>
            </h2>
          </div>
        </div>

        <div className="contact-content-wrapper">
          <div className="contact-info-wrapper">
            <div className="contact-info-cards">
              <a href="tel:+251923988838" className="contact-info-card" aria-label="Call +251 923 988 838">
                <div className="contact-info-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div className="contact-info-content">
                  <span className="contact-info-label">Phone</span>
                  <span className="contact-info-value">+251 923 988 838</span>
                </div>
                <div className="contact-info-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </a>
              
              <a href="https://t.me/Believeandforward" target="_blank" rel="noopener noreferrer" className="contact-info-card" aria-label="Open Telegram chat (opens in new window)">
                <div className="contact-info-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.54-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                </div>
                <div className="contact-info-content">
                  <span className="contact-info-label">Telegram</span>
                  <span className="contact-info-value">@Believeandforward</span>
                </div>
                <div className="contact-info-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </a>
              
              <a href="mailto:bereketfikre2021@gmail.com" className="contact-info-card" aria-label="Send email to Bereket Fikre">
                <div className="contact-info-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div className="contact-info-content">
                  <span className="contact-info-label">Email</span>
                  <span className="contact-info-value">bereketfikre2021@gmail.com</span>
                </div>
                <div className="contact-info-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;





