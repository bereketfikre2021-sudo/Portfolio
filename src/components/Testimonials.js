import React, { useState, useEffect, useRef } from 'react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoPlayInterval = useRef(null);

  // Ensure testimonials section is visible on mobile when AOS is disabled
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    
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
  }, []);

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

  // Determine slides to show based on screen size
  useEffect(() => {
    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setSlidesToShow(1);
      } else if (width <= 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, []);

  // Normalize currentIndex when slidesToShow changes (for desktop pagination)
  useEffect(() => {
    if (slidesToShow === 3) {
      // On desktop, ensure currentIndex is a multiple of 3 (page boundary)
      setCurrentIndex((prevIndex) => {
        const normalizedIndex = Math.floor(prevIndex / 3) * 3;
        const maxIndex = testimonials.length - slidesToShow;
        return Math.min(normalizedIndex, maxIndex);
      });
    }
  }, [slidesToShow, testimonials.length]);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = slidesToShow === 3 ? 6000 : 4000; // 6 seconds for desktop, 4 seconds for mobile/tablet
      const step = slidesToShow === 3 ? 3 : 1; // Advance by 3 cards (full page) on desktop, 1 card on mobile/tablet
      
      autoPlayInterval.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const maxIndex = testimonials.length - slidesToShow;
          const nextIndex = prevIndex + step;
          return nextIndex > maxIndex ? 0 : nextIndex;
        });
      }, interval);
    } else {
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current);
      }
    }

    return () => {
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current);
      }
    };
  }, [isAutoPlaying, slidesToShow, testimonials.length]);

  const nextSlide = () => {
    const maxIndex = testimonials.length - slidesToShow;
    const step = slidesToShow === 3 ? 3 : 1; // Advance by 3 cards (full page) on desktop, 1 card on mobile/tablet
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + step;
      return nextIndex > maxIndex ? 0 : nextIndex;
    });
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    const maxIndex = testimonials.length - slidesToShow;
    const step = slidesToShow === 3 ? 3 : 1; // Go back by 3 cards (full page) on desktop, 1 card on mobile/tablet
    setCurrentIndex((prevIndex) => {
      const prevIndexNew = prevIndex - step;
      return prevIndexNew < 0 ? maxIndex : prevIndexNew;
    });
    setIsAutoPlaying(false);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Calculate pagination for desktop (pages of 3) vs mobile/tablet (individual cards)
  const maxIndex = Math.max(0, testimonials.length - slidesToShow);
  const totalPages = slidesToShow === 3 
    ? Math.ceil(testimonials.length / 3) 
    : maxIndex + 1;
  const currentPage = slidesToShow === 3 
    ? Math.floor(currentIndex / 3) 
    : currentIndex;

  const goToPage = (pageIndex) => {
    if (slidesToShow === 3) {
      setCurrentIndex(pageIndex * 3);
    } else {
      setCurrentIndex(pageIndex);
    }
    setIsAutoPlaying(false);
  };

  return (
    <section id="testimonials" className="testimonials" aria-labelledby="testimonials-heading">
      <div className="container">
        <div className="section-intro" data-aos="fade-up">
          <span className="section-number">06</span>
          <div className="section-header">
            <span className="section-label">Client Feedback</span>
            <h2 className="section-title">
              <span className="title-main">What</span>
              <span className="title-accent">Clients Say</span>
            </h2>
          </div>
        </div>
        
        <div 
          className="testimonials-carousel-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div 
            className="testimonials-carousel"
            style={{
              transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
              transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          >
            {testimonials.map((testimonial, idx) => (
              <article key={idx} className="testimonial-card">
                <div className="testimonial-image">
                  <img 
                    src={`${process.env.PUBLIC_URL || ''}${testimonial.image}`} 
                    alt={`${testimonial.name}, ${testimonial.role} - Client testimonial`} 
                    className="testimonial-img" 
                    loading="lazy" 
                    width="120" 
                    height="120"
                    decoding="async"
                    sizes="120px"
                  />
                </div>
                <div className="testimonial-content">
                  <div className="testimonial-quote">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" fill="currentColor" opacity="0.2"/>
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" fill="currentColor" opacity="0.2"/>
                    </svg>
                  </div>
                  <div className="testimonial-rating">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="testimonial-text">{testimonial.text}</p>
                  <div className="testimonial-author">
                    <h3>{testimonial.name}</h3>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button 
            className="testimonial-nav-btn testimonial-nav-prev"
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button 
            className="testimonial-nav-btn testimonial-nav-next"
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>

        {/* Dot Indicators - Show pages for desktop, individual cards for mobile/tablet */}
        <div className="testimonials-dots">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              className={`testimonial-dot ${currentPage === idx ? 'active' : ''}`}
              onClick={() => goToPage(idx)}
              aria-label={slidesToShow === 3 ? `Go to page ${idx + 1}` : `Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;


