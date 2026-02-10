import React, { useContext, useEffect } from 'react';
import { ModalContext } from '../context/ModalContext';

const Blog = () => {
  const modalContext = useContext(ModalContext);
  
  // Safely get openBlogModal with fallback
  const openBlogModal = modalContext?.openBlogModal || (() => {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Blog modal context not available');
    }
  });

  // Refresh AOS after component mounts to ensure animations work
  useEffect(() => {
    // On mobile, ensure elements are visible immediately since AOS is disabled
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      // Force visibility on mobile
      const blogSection = document.getElementById('blog');
      if (blogSection) {
        const aosElements = blogSection.querySelectorAll('[data-aos]');
        aosElements.forEach((el) => {
          el.style.opacity = '1';
          el.style.visibility = 'visible';
          el.style.transform = 'none';
          el.style.pointerEvents = 'auto';
        });
      }
      return;
    }
    
    // Desktop: Use AOS animations (layout read in rAF to avoid forced reflow)
    const refreshAOS = () => {
      if (!window.AOS) return;
      window.AOS.refresh();
      const blogSection = document.getElementById('blog');
      if (!blogSection) return;
      requestAnimationFrame(() => {
        const rect = blogSection.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        if (isInViewport) {
          const aosElements = blogSection.querySelectorAll('[data-aos]');
          aosElements.forEach((el) => {
            if (window.AOS) window.AOS.animate(el);
          });
        }
      });
    };
    
    // Immediate refresh
    refreshAOS();
    
    // Refresh after a short delay
    const timer1 = setTimeout(refreshAOS, 100);
    
    // Refresh after DOM is fully ready
    const timer2 = setTimeout(refreshAOS, 300);
    
    // Also refresh on next frame
    requestAnimationFrame(() => {
      setTimeout(refreshAOS, 50);
    });
    
    // Refresh on scroll to catch any missed elements
    const handleScroll = () => {
      refreshAOS();
    };
    window.addEventListener('scroll', handleScroll, { passive: true, once: true });
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const blogPosts = [
    {
      id: 'design-principles',
      image: '/assets/Portfolio/Blog/Design%20principles.webp',
      category: 'Design Principles · Fundamentals',
      title: 'Essential Graphic Design Principles Every Designer Should Master',
      description: 'Explore the 7 fundamental principles of graphic design including balance, contrast, hierarchy, alignment, repetition, proportion, and movement. Learn how these core concepts form the foundation of effective visual communication.'
    },
    {
      id: 'design-trends-2026',
      image: '/assets/Portfolio/Blog/Graphic%20Design%20Trends%202025.webp',
      category: 'Trends · 2026',
      title: 'Graphic Design Trends 2026: What\'s Shaping the Future',
      description: 'Discover the latest graphic design trends for 2026, from bold typography to sustainable design practices. Stay ahead with insights into emerging visual styles and techniques.'
    },
    {
      id: 'brand-identity',
      image: '/assets/Portfolio/Blog/Branding.webp',
      category: 'Brand Design · Identity',
      title: 'Building Strong Brand Identities: A Complete Guide',
      description: 'Learn how to create cohesive brand identities that resonate with audiences. Discover the essential elements of brand design and how to build memorable visual systems that communicate your brand\'s values and personality.'
    },
    {
      id: 'consistency-luxury-branding',
      image: '/assets/Portfolio/Blog/Consistency.webp',
      category: 'Brand Design · Strategy',
      title: 'Why Consistency Is the Real Luxury in Branding',
      description: 'Consistency is often mistaken for repetition. In reality, it\'s discipline. Strong brands don\'t rely on constant reinvention; they rely on systems that work everywhere.',
      tabletOnly: true
    }
  ];

  return (
    <section id="blog" className="case-studies blog-section" aria-labelledby="blog-heading">
      <div className="container">
        <div className="section-intro" data-aos="fade-up">
          <span className="section-number desktop-number">05</span>
          <div className="section-header">
            <span className="section-label">Design Insights</span>
            <h2 id="blog-heading" className="section-title">
              <span className="title-main">Design</span>
              <span className="title-accent">Blog</span>
            </h2>
          </div>
        </div>
        
        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <article 
              key={post.id} 
              className={`blog-card${post.tabletOnly ? ' blog-card-tablet-only' : ''}`}
              data-project={post.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              onClick={() => {
                try {
                  if (openBlogModal) {
                    openBlogModal(post.id);
                  }
                } catch (error) {
                  if (process.env.NODE_ENV === 'development') {
                    console.error('Error opening blog modal:', error);
                  }
                }
              }}
            >
              <div className="blog-card-image">
                <img 
                  src={`${process.env.PUBLIC_URL || ''}${post.image}`} 
                  alt={`${post.title} - ${post.category} blog post by Bereket Fikre`} 
                  className="blog-card-thumb" 
                  loading="lazy" 
                  width="600" 
                  height="400"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="blog-card-overlay"></div>
              </div>
              <div className="blog-card-content">
                <span className="blog-card-category">{post.category}</span>
                <h3>{post.title}</h3>
                <a 
                  href="#" 
                  className="blog-card-link"
                  onClick={(e) => {
                    e.preventDefault();
                    try {
                      if (openBlogModal) {
                        openBlogModal(post.id);
                      }
                    } catch (error) {
                      if (process.env.NODE_ENV === 'development') {
                        console.error('Error opening blog modal:', error);
                      }
                    }
                  }}
                  aria-label={`Read ${post.title} blog post`}
                >
                  <span>Read Article</span>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;

