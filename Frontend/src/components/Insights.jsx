import React, { useContext, useEffect, useState } from 'react';
import { ModalContext } from '../context/ModalContext';
import apiFetch from '../utils/api';
import { trackCaseStudyView, trackBlogView } from '../utils/analytics';

// Hardcoded fallback data (shown until API responds)
const FALLBACK_CASE_STUDIES = [
  {
    id: 'medavail-pharmaceuticals-company-profile',
    image: '/assets/Portfolio/Case%20Studies/Company%20Profile%20-%20Medavail%20Pharmaceuticals.webp',
    category: 'Company Profile Design',
    title: 'Medavail Pharmaceuticals',
    description: 'Company profile design for Medavail Pharmaceuticals, an Ethiopia-based pharmaceutical and medical equipment import company.'
  },
  {
    id: 'alta-counseling',
    image: '/assets/Portfolio/Case%20Studies/Alta%20Counseling.webp',
    category: 'Brand Identity Redesign',
    title: 'Alta Counseling',
    description: 'Brand identity redesign for Alta Counseling focused on clarity, trust, and consistency through a calm, professional visual system.'
  },
  {
    id: 'niqat-coffee',
    image: '/assets/Portfolio/Case%20Studies/Social%20Media%20Design%20for%20niqat%20coffee.webp',
    category: 'Social Media Campaign & Brand Presence',
    title: 'Niqat Coffee',
    description: 'Social media campaign and content design for Niqat Coffee, building brand presence, visual consistency, and audience engagement from scratch.'
  },
  {
    id: 'andegna-furniture-catalog',
    image: '/assets/Portfolio/Case%20Studies/Andegna%20Cataloge.webp',
    category: 'Product Catalog Design',
    title: 'Andegna Furniture',
    description: 'Product catalog design and visual direction for Andegna Furniture.',
    tabletOnly: true
  }
];

const FALLBACK_BLOG_POSTS = [
  {
    id: 'design-principles',
    image: '/assets/Portfolio/Blog/Design%20principles.webp',
    category: 'Design Principles · Fundamentals',
    title: 'Essential Graphic Design Principles Every Designer Should Master',
    description: 'Explore the 7 fundamental principles of graphic design.'
  },
  {
    id: 'design-trends-2026',
    image: '/assets/Portfolio/Blog/Graphic%20Design%20Trends%202026.webp',
    category: 'Trends · 2026',
    title: 'Graphic Design Trends 2026: What\'s Shaping the Future',
    description: 'Discover the latest graphic design trends for 2026.'
  },
  {
    id: 'brand-identity',
    image: '/assets/Portfolio/Blog/Branding.webp',
    category: 'Brand Design · Identity',
    title: 'Building Strong Brand Identities: A Complete Guide',
    description: 'Learn how to create cohesive brand identities that resonate with audiences.'
  },
  {
    id: 'consistency-luxury-branding',
    image: '/assets/Portfolio/Blog/Consistency.webp',
    category: 'Brand Design · Strategy',
    title: 'Why Consistency Is the Real Luxury in Branding',
    description: 'Consistency is often mistaken for repetition. In reality, it\'s discipline.',
    tabletOnly: true
  }
];

const Insights = () => {
  const { openCaseStudyModal, openBlogModal } = useContext(ModalContext);
  const [activeTab, setActiveTab] = useState('case-studies');
  const [caseStudies, setCaseStudies] = useState(FALLBACK_CASE_STUDIES);
  const [blogPosts,   setBlogPosts]   = useState(FALLBACK_BLOG_POSTS);

  // Fetch insights from backend — fall back to hardcoded data if API fails
  useEffect(() => {
    apiFetch('/insights?status=PUBLISHED&limit=10&type=CASE_STUDY&sortBy=publishDate&order=asc')
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCaseStudies(data.map((item, i) => ({
            id:         item.slug || item.id,
            image:      item.coverImage || FALLBACK_CASE_STUDIES[i]?.image || '',
            category:   item.category,
            title:      item.title,
            description: item.excerpt,
            tabletOnly: i === 3, // 4th item is tablet-only (matches original layout)
          })));
        }
      })
      .catch(() => {});

    apiFetch('/insights?status=PUBLISHED&limit=10&type=BLOG_POST&sortBy=publishDate&order=asc')
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setBlogPosts(data.map((item, i) => ({
            id:         item.slug || item.id,
            image:      item.coverImage || FALLBACK_BLOG_POSTS[i]?.image || '',
            category:   item.category,
            title:      item.title,
            description: item.excerpt,
            tabletOnly: i === 3,
          })));
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      const insightsSection = document.getElementById('insights');
      if (insightsSection) {
        const aosElements = insightsSection.querySelectorAll('[data-aos]');
        aosElements.forEach((el) => {
          el.style.opacity = '1';
          el.style.visibility = 'visible';
          el.style.transform = 'none';
          el.style.pointerEvents = 'auto';
        });

        const sectionIntro = insightsSection.querySelector('.section-intro');
        if (sectionIntro) {
          sectionIntro.style.opacity = '1';
          sectionIntro.style.visibility = 'visible';
          sectionIntro.style.display = 'flex';
        }
      }
      return;
    }

    const refreshAOS = () => {
      if (!window.AOS) return;
      window.AOS.refresh();
      const insightsSection = document.getElementById('insights');
      if (!insightsSection) return;
      requestAnimationFrame(() => {
        const rect = insightsSection.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        if (isInViewport) {
          const aosElements = insightsSection.querySelectorAll('[data-aos]');
          aosElements.forEach((el) => {
            if (window.AOS) window.AOS.animate(el);
          });
        }
      });
    };

    refreshAOS();
    const timer1 = setTimeout(refreshAOS, 100);
    const timer2 = setTimeout(refreshAOS, 300);
    requestAnimationFrame(() => setTimeout(refreshAOS, 50));

    const handleScroll = () => refreshAOS();
    window.addEventListener('scroll', handleScroll, { passive: true, once: true });

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeTab]);

  const handleOpenBlog = (postId, postTitle) => {
    try {
      trackBlogView(postTitle || postId);
      if (openBlogModal) openBlogModal(postId);
    } catch (error) {
      if (import.meta.env.DEV) console.error('Error opening blog modal:', error);
    }
  };

  return (
    <section id="insights" className="insights case-studies" aria-labelledby="insights-heading">
      <div className="container">
        <div className="section-intro" data-aos="fade-up">
          <span className="section-number desktop-number">05</span>
          <span className="section-number mobile-number">05</span>
          <div className="section-header">
            <span className="section-label">Design Insights</span>
            <h2 id="insights-heading" className="section-title">
              <span className="title-main">Project</span>
              <span className="title-accent">Insights</span>
            </h2>
          </div>
        </div>

        <div className="insights-tabs" role="tablist" aria-label="Project insights">
          <button
            type="button"
            role="tab"
            id="insights-tab-case-studies"
            className={`insights-tab${activeTab === 'case-studies' ? ' active' : ''}`}
            aria-selected={activeTab === 'case-studies'}
            aria-controls="insights-panel-case-studies"
            onClick={() => setActiveTab('case-studies')}
          >
            Case Studies
          </button>
          <button
            type="button"
            role="tab"
            id="insights-tab-blog"
            className={`insights-tab${activeTab === 'blog' ? ' active' : ''}`}
            aria-selected={activeTab === 'blog'}
            aria-controls="insights-panel-blog"
            onClick={() => setActiveTab('blog')}
          >
            Design Blog
          </button>
        </div>

        <div
          id="insights-panel-case-studies"
          role="tabpanel"
          className="insights-panel insights-panel--case-studies"
          aria-labelledby="insights-tab-case-studies"
          hidden={activeTab !== 'case-studies'}
        >
          <div className="case-studies-cards-grid">
            {caseStudies.map((caseStudy) => (
              <article
                key={caseStudy.id}
                className={`case-study-tile${caseStudy.tabletOnly ? ' case-study-tile-tablet-only' : ''}`}
                data-project={caseStudy.id}
                onClick={() => { trackCaseStudyView(caseStudy.title); openCaseStudyModal(caseStudy.id); }}
              >
                <div className="case-study-tile-image">
                  <img
                    src={caseStudy.image && caseStudy.image.startsWith('http') ? caseStudy.image : `${process.env.PUBLIC_URL || ''}${caseStudy.image}`}
                    alt={`${caseStudy.title} - ${caseStudy.description}`}
                    className="case-study-tile-thumb"
                    loading="lazy"
                    width="600"
                    height="400"
                    decoding="async"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="case-study-tile-overlay"></div>
                </div>
                <div className="case-study-tile-content">
                  <span className="case-study-tile-category">{caseStudy.category}</span>
                  <h3>{caseStudy.title}</h3>
                  <a
                    href="#"
                    className="case-study-tile-link"
                    onClick={(e) => {
                      e.preventDefault();
                      openCaseStudyModal(caseStudy.id);
                    }}
                    aria-label={`View ${caseStudy.title} case study`}
                  >
                    <span>View Case Study</span>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div
          id="insights-panel-blog"
          role="tabpanel"
          className="insights-panel insights-panel--blog blog-section"
          aria-labelledby="insights-tab-blog"
          hidden={activeTab !== 'blog'}
        >
          <div className="blog-grid">
            {blogPosts.map((post, index) => (
              <article
                key={post.id}
                className={`blog-card${post.tabletOnly ? ' blog-card-tablet-only' : ''}`}
                data-project={post.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                onClick={() => handleOpenBlog(post.id, post.title)}
              >
                <div className="blog-card-image">
                  <img
                    src={post.image && post.image.startsWith('http') ? post.image : `${process.env.PUBLIC_URL || ''}${post.image}`}
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
                      handleOpenBlog(post.id, post.title);
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
      </div>
    </section>
  );
};

export default Insights;
