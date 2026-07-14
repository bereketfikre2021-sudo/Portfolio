import React, { useState, useEffect, useRef } from 'react';
import { trustedCompanies as FALLBACK_COMPANIES } from '../data/trustedCompanies';
import apiFetch from '../utils/api';

const Partners = () => {
  const [companies, setCompanies] = useState(FALLBACK_COMPANIES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [isMobile, setIsMobile] = useState(false);
  const autoPlayInterval = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Fetch partners + testimonials from backend — fall back to hardcoded data
  useEffect(() => {
    Promise.all([
      apiFetch('/partners?limit=50&isActive=true'),
      apiFetch('/testimonials?limit=50&isActive=true'),
    ])
      .then(([partnersData, testimonialsData]) => {
        if (!Array.isArray(partnersData) || partnersData.length === 0) return;
        // Merge: build companies array matching the shape the JSX expects
        const merged = partnersData.map((p) => {
          // Find matching testimonial by company name
          const t = Array.isArray(testimonialsData)
            ? testimonialsData.find((t) => t.company === p.companyName || t.clientName.includes(p.companyName))
            : null;
          return {
            name:        p.companyName,
            logo:        p.logo || null,      // Cloudinary URL or null (falls back to local path)
            url:         p.website || null,
            testimonial: t ? t.testimonial : undefined,
          };
        });
        setCompanies(merged);
      })
      .catch(() => {
        // API unavailable — silently keep the hardcoded fallback
      });
  }, []);

  // Derived from state (replaces module-level const)
  const testimonials = companies.filter((c) => c.testimonial);
  const logoMarquee  = [...companies, ...companies, ...companies, ...companies];

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setSlidesToShow(mobile ? 1 : 3);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (window.innerWidth <= 768) {
      const partnersSection = document.getElementById('partners');
      if (partnersSection) {
        const aosElements = partnersSection.querySelectorAll('[data-aos]');
        aosElements.forEach((el) => {
          el.style.opacity = '1';
          el.style.visibility = 'visible';
          el.style.transform = 'none';
          el.style.pointerEvents = 'auto';
        });

        const sectionIntro = partnersSection.querySelector('.section-intro');
        if (sectionIntro) {
          sectionIntro.style.opacity = '1';
          sectionIntro.style.visibility = 'visible';
          sectionIntro.style.display = 'flex';
        }
      }
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isMobile && autoPlayInterval.current === null) {
      autoPlayInterval.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % (testimonials.length - slidesToShow + 1));
      }, 5000);
    }

    return () => {
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current);
        autoPlayInterval.current = null;
      }
    };
  }, [isMobile, slidesToShow]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (testimonials.length - slidesToShow + 1));
    if (autoPlayInterval.current) {
      clearInterval(autoPlayInterval.current);
      autoPlayInterval.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % (testimonials.length - slidesToShow + 1));
      }, 5000);
    }
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + (testimonials.length - slidesToShow + 1)) %
        (testimonials.length - slidesToShow + 1)
    );
    if (autoPlayInterval.current) {
      clearInterval(autoPlayInterval.current);
      autoPlayInterval.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % (testimonials.length - slidesToShow + 1));
      }, 5000);
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    if (autoPlayInterval.current) {
      clearInterval(autoPlayInterval.current);
      autoPlayInterval.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % (testimonials.length - slidesToShow + 1));
      }, 5000);
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isMobile) {
      if (isLeftSwipe) setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      if (isRightSwipe) setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    } else {
      if (isLeftSwipe) nextSlide();
      if (isRightSwipe) prevSlide();
    }
  };

  const renderTestimonialCard = (company, idx) => (
    <article key={idx} className="testimonial-card testimonial-card--company">
      <div className="testimonial-content">
        <div className="testimonial-quote">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" fill="currentColor" opacity="0.25"/>
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" fill="currentColor" opacity="0.25"/>
          </svg>
        </div>
        <div className="testimonial-rating">
          {[...Array(5)].map((_, i) => (
            <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          ))}
        </div>
        <p className="testimonial-text">{company.testimonial}</p>
        <div className="testimonial-author testimonial-author--company">
          <div className="testimonial-avatar testimonial-avatar--logo">
            <img
              src={company.logo && company.logo.startsWith('http') ? company.logo : `${process.env.PUBLIC_URL || ''}${company.logo}`}
              alt={`${company.name} logo`}
              className="testimonial-avatar-img testimonial-avatar-img--logo"
              loading="lazy"
              width="56"
              height="56"
              decoding="async"
            />
          </div>
          <div className="testimonial-author-info">
            <h3>{company.name}</h3>
          </div>
        </div>
      </div>
    </article>
  );

  const renderLogoCard = (company, idx) => {
    const content = (
      <>
        <div className="trusted-card-inner">
          <div className="trusted-logo-wrapper">
            <img
              src={company.logo && company.logo.startsWith('http') ? company.logo : `${process.env.PUBLIC_URL || ''}${company.logo}`}
              alt={`${company.name} company logo - Trusted partner of Bereket Fikre`}
              className="trusted-logo"
              loading="lazy"
              width="160"
              height="160"
              decoding="async"
              sizes="(max-width: 480px) 100px, (max-width: 768px) 120px, (max-width: 1024px) 140px, 160px"
            />
          </div>
        </div>
        <span className="trusted-company-name">{company.name}</span>
      </>
    );

    return (
      <div key={idx} className="trusted-by-card">
        {company.url ? (
          <a
            href={company.url}
            target="_blank"
            rel="noopener noreferrer"
            className="trusted-card-link"
            aria-label={`Visit ${company.name} website (opens in new window)`}
          >
            {content}
          </a>
        ) : (
          <div className="trusted-card-link" aria-label={`${company.name} - Trusted partner`}>
            {content}
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="partners" className="partners" aria-labelledby="partners-heading">
      <div className="container">
        <div className="section-intro" data-aos="fade-up">
          <span className="section-number desktop-number">06</span>
          <span className="section-number mobile-number">06</span>
          <div className="section-header">
            <span className="section-label">Our Partners</span>
            <h2 id="partners-heading" className="section-title">
              <span className="title-main">Trusted</span>
              <span className="title-accent">Partners</span>
            </h2>
          </div>
        </div>

        <div className="partners-testimonials">
          <h3 className="partners-subheading">What Partners Say</h3>
          <div className="testimonials-carousel-wrapper">
            <div className="testimonials-carousel-desktop">
              <button
                className="testimonial-nav-btn testimonial-nav-prev desktop-only"
                onClick={prevSlide}
                aria-label="Previous testimonial"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div
                className="testimonials-carousel-track desktop-carousel"
                style={{ transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)` }}
              >
                {testimonials.map((company, idx) => renderTestimonialCard(company, idx))}
              </div>

              <button
                className="testimonial-nav-btn testimonial-nav-next desktop-only"
                onClick={nextSlide}
                aria-label="Next testimonial"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="testimonials-dots desktop-only">
                {Array.from({ length: testimonials.length - slidesToShow + 1 }).map((_, idx) => (
                  <button
                    key={idx}
                    className={`testimonial-dot ${idx === currentIndex ? 'active' : ''}`}
                    onClick={() => goToSlide(idx)}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            <div
              className="testimonials-mobile-view mobile-only"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="testimonials-mobile-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {testimonials.map((company, idx) => renderTestimonialCard(company, idx))}
              </div>
              <div className="testimonials-dots testimonials-dots-mobile">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    className={`testimonial-dot ${idx === currentIndex ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="partners-logos" aria-label="Partner logos">
          <h3 className="partners-subheading">Trusted By</h3>
          <div className="trusted-by-grid">
            <div className="trusted-by-track">
              {logoMarquee.map((company, idx) => renderLogoCard(company, idx))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
