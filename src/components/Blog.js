import React, { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';

const Blog = () => {
  const { openBlogModal } = useContext(ModalContext);

  const blogPosts = [
    {
      id: 'design-principles',
      image: '/assets/Portfolio/Design principles.webp',
      category: 'Design Principles · Fundamentals',
      title: 'Essential Graphic Design Principles Every Designer Should Master',
      description: 'Explore the fundamental principles of graphic design including balance, contrast, hierarchy, and alignment. Learn how these core concepts form the foundation of effective visual communication.'
    },
    {
      id: 'design-trends-2025',
      image: '/assets/Portfolio/Graphic Design Trends 2025.webp',
      category: 'Trends · 2025',
      title: 'Graphic Design Trends 2025: What\'s Shaping the Future',
      description: 'Discover the latest graphic design trends for 2025, from bold typography to sustainable design practices. Stay ahead with insights into emerging visual styles and techniques.'
    },
    {
      id: 'brand-identity',
      image: '/assets/Portfolio/Branding.webp',
      category: 'Brand Design · Identity',
      title: 'Building Strong Brand Identities: A Complete Guide',
      description: 'Learn how to create cohesive brand identities that resonate with audiences. Discover the essential elements of brand design and how to build memorable visual systems that communicate your brand\'s values and personality.'
    }
  ];

  return (
    <section id="blog" className="case-studies">
      <div className="container">
        <div className="section-intro">
          <span className="section-number">04</span>
          <div className="section-header">
            <span className="section-label">Design Insights</span>
            <h2 className="section-title">
              <span className="title-main">Design</span>
              <span className="title-accent">Blog</span>
            </h2>
          </div>
        </div>
        
        <div className="case-studies-grid">
          {blogPosts.map((post) => (
            <article 
              key={post.id} 
              className="case-study-card" 
              data-project={post.id}
              onClick={() => openBlogModal(post.id)}
            >
              <div className="case-study-image">
                <img 
                  src={`${process.env.PUBLIC_URL || ''}${post.image}`} 
                  alt={`${post.title} - ${post.category} blog post by Bereket Fikre`} 
                  className="case-study-thumb" 
                  loading="lazy" 
                  width="600" 
                  height="400"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="case-study-overlay"></div>
              </div>
              <div className="case-study-content">
                <span className="case-study-category">{post.category}</span>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <a 
                  href="#" 
                  className="case-study-link"
                  onClick={(e) => {
                    e.preventDefault();
                    openBlogModal(post.id);
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

