import React, { useState, useEffect, useRef } from 'react';

// Testimonials data - declared outside component to avoid hoisting issues
const testimonials = [
    {
      name: 'Abenezer Alemayehu',
      role: 'CEO & Founder',
      image: '/assets/Testimonials/Abenezer Alemayehu.webp',
      text: 'Bereket delivered exceptional brand identity work that perfectly captured our vision. The attention to detail and creative approach exceeded our expectations.'
    },
    {
      name: 'Tesfahun Tsegaye',
      role: 'Creative Director',
      image: '/assets/Testimonials/Tesfahun Tsegaye.webp',
      text: 'Working with Bereket was a seamless experience. His designs are modern, professional, and truly elevated our brand presence in the market.'
    },
    {
      name: 'Mikiyas Yosef',
      role: 'Brand Manager',
      image: '/assets/Testimonials/Mikiyas Yosef.webp',
      text: 'Bereket\'s creative expertise transformed our brand identity completely. The results speak for themselves - professional, impactful, and truly outstanding work.'
    },
    {
      name: 'Dagmawi Yeshiwas',
      role: 'Marketing Director',
      image: '/assets/Testimonials/Dagmawi Yeshiwas.webp',
      text: 'Outstanding design work from Bereket. His ability to understand our brand needs and translate them into stunning visuals is remarkable. Highly recommended!'
    },
    {
      name: 'Gedyon Megersa',
      role: 'CEO',
      image: '/assets/Testimonials/Gedyon Megersa.webp',
      text: 'As CEO, I\'ve worked with many designers, but Bereket stands out. His strategic approach to brand identity directly impacted our business growth.'
    },
    {
      name: 'Kassaye Getachew',
      role: 'Business Owner',
      image: '/assets/Testimonials/Kassaye Getachew.webp',
      text: 'The brand identity designed by Bereket exceeded all our expectations. His creative approach and attention to detail brought our vision to life perfectly.'
    }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [isMobile, setIsMobile] = useState(false);
  const autoPlayInterval = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Ensure testimonials section is visible on mobile when AOS is disabled
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setSlidesToShow(mobile ? 1 : 3);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    if (isMobile) {
      // Force visibility on mobile
      const testimonialsSection = document.getElementById('testimonials');
      if (testimonialsSection) {
        const aosElements = testimonialsSection.querySelectorAll('[data-aos]');
        aosElements.forEach((el) => {
          el.style.opacity = '1';
          el.style.visibility = 'visible';
          el.style.transform = 'none';
          el.style.pointerEvents = 'auto';
        });
      }
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current);
      }
    };
  }, [isMobile]);

  // Auto-play for desktop only
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

  // Desktop carousel functions
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
    setCurrentIndex((prev) => (prev - 1 + (testimonials.length - slidesToShow + 1)) % (testimonials.length - slidesToShow + 1));
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

  const totalPages = Math.ceil(testimonials.length / slidesToShow);
  const currentPage = Math.floor(currentIndex / slidesToShow) + 1;

  // Touch handlers for mobile swipe (not used for continuous scroll, but kept for compatibility)
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


  const renderTestimonialCard = (testimonial, idx) => (
    <article key={idx} className="testimonial-card">
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
        <p className="testimonial-text">{testimonial.text}</p>
        <div className="testimonial-author">
          <div className="testimonial-avatar">
            <img
              src={`${process.env.PUBLIC_URL || ''}${testimonial.image}`}
              alt={`${testimonial.name}, ${testimonial.role}`}
              className="testimonial-avatar-img"
              loading="lazy"
              width="56"
              height="56"
              decoding="async"
            />
          </div>
          <div className="testimonial-author-info">
            <h3>{testimonial.name}</h3>
            <span>{testimonial.role}</span>
          </div>
        </div>
      </div>
    </article>
  );

  return (
    <section id="testimonials" className="testimonials" aria-labelledby="testimonials-heading">
      <div className="container">
        <div className="section-intro" data-aos="fade-up">
          <span className="section-number desktop-number">07</span>
          <span className="section-number mobile-number">05</span>
          <div className="section-header">
            <span className="section-label">Client Feedback</span>
            <h2 id="testimonials-heading" className="section-title">
              <span className="title-main">What</span>
              <span className="title-accent">Clients Say</span>
            </h2>
          </div>
        </div>
        
        <div className="testimonials-carousel-wrapper">
          {/* Desktop: Carousel with navigation */}
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
              {testimonials.map((t, idx) => renderTestimonialCard(t, idx))}
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
            
            {/* Desktop: Dot indicators */}
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
          
          {/* Mobile: Single card with dots (no horizontal scroll strip) */}
          <div 
            className="testimonials-mobile-view mobile-only"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="testimonials-mobile-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {testimonials.map((t, idx) => renderTestimonialCard(t, idx))}
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
    </section>
  );
};

export default Testimonials;


