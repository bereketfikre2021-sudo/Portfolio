import React, { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';

const Blog = () => {
  const { openBlogModal } = useContext(ModalContext);

  const blogPosts = [
    {
      id: 'finix',
      image: '/assets/Portfolio/Finix-e442443e.webp',
      category: 'Web Design · Digital Marketing',
      title: 'Finix Web Asset Collection',
      description: 'Comprehensive web asset collection including website banners, digital marketing materials, and promotional graphics for engaging online presence.'
    },
    {
      id: 'medavail',
      image: '/assets/Portfolio/Medavail-0d27baad.webp',
      category: 'Brand Identity · Corporate Rebranding',
      title: 'Company Logo Rebranding - Medavail Pharmaceuticals',
      description: 'Complete company logo rebranding including office signage, stationery design, and social media templates.'
    },
    {
      id: 'niqat-menu',
      image: '/assets/Portfolio/Niqat-Menu-6b07a3f4.webp',
      category: 'Menu Design · Print Design',
      title: 'Cafe Menu & Brochure Design - Niqat Coffee',
      description: 'Complete cafe menu design including trifold layout and modern typography.'
    }
  ];

  return (
    <section id="blog" className="blog">
      <div className="container">
        <div className="section-intro">
          <span className="section-number">05</span>
          <div className="section-header">
            <span className="section-label">Design Insights</span>
            <h2 className="section-title">
              <span className="title-main">Design</span>
              <span className="title-accent">Blog</span>
            </h2>
          </div>
        </div>
        
        <div className="portfolio-grid-modern">
          {blogPosts.map((post) => (
            <article 
              key={post.id} 
              className="portfolio-item-modern" 
              data-project={post.id}
              onClick={() => openBlogModal(post.id)}
            >
              <div className="portfolio-image-small">
                <img 
                  src={`${process.env.PUBLIC_URL || ''}${post.image}`} 
                  alt={`${post.title} - ${post.category} blog post by Bereket Fikre`} 
                  className="portfolio-thumb" 
                  loading="lazy" 
                  width="600" 
                  height="400"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="portfolio-content">
                <span className="portfolio-category-modern">{post.category}</span>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <a 
                  href="#" 
                  className="portfolio-link-modern"
                  onClick={(e) => {
                    e.preventDefault();
                    openBlogModal(post.id);
                  }}
                >
                  <span>Read More</span>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
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

