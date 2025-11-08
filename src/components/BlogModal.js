import React, { useContext, useEffect } from 'react';
import { ModalContext } from '../context/ModalContext';

const BlogModal = () => {
  const { blogModal, closeBlogModal } = useContext(ModalContext);

  const blogData = {
    'finix': {
      image: '/assets/Portfolio/Finix-e442443e.webp',
      category: 'Digital Marketing',
      title: 'Finix Web Asset Collection',
      description: 'Comprehensive web asset collection including website banners, digital marketing materials, and promotional graphics for engaging online presence. This project showcases the importance of cohesive digital assets in building a strong online brand presence.',
      type: 'Web',
      content: 'In today\'s digital landscape, having a cohesive collection of web assets is crucial for brand consistency. This project involved creating a comprehensive set of digital marketing materials that work seamlessly across various platforms and devices. From website banners to social media graphics, each asset was designed to maintain brand identity while optimizing for different digital contexts.',
      date: '2024',
      tags: ['Web Design', 'Digital Marketing', 'Brand Consistency']
    },
    'medavail': {
      image: '/assets/Portfolio/Medavail-0d27baad.webp',
      category: 'Healthcare',
      title: 'Company Logo Rebranding - Medavail Pharmaceuticals',
      description: 'Complete company logo rebranding including office signage, stationery design, and social media templates. Comprehensive brand identity transformation with modern design elements and cohesive visual system for pharmaceutical company.',
      type: 'Rebranding',
      content: 'Rebranding a pharmaceutical company requires careful consideration of trust, professionalism, and modern healthcare aesthetics. This project involved transforming the brand identity while maintaining the credibility and trust that patients and healthcare professionals expect. The new identity reflects innovation in healthcare while maintaining a professional, trustworthy appearance.',
      date: '2024',
      tags: ['Healthcare', 'Rebranding', 'Corporate Identity']
    },
    'niqat-menu': {
      image: '/assets/Portfolio/Niqat-Menu-6b07a3f4.webp',
      category: 'Cafe',
      title: 'Cafe Menu & Brochure Design - Niqat Coffee',
      description: 'Complete cafe menu design including trifold layout and modern typography. Professional menu design that enhances customer experience with elegant print presentation and clear visual hierarchy.',
      type: 'Menu Design',
      content: 'Menu design is an art form that combines functionality with aesthetics. A well-designed menu not only presents information clearly but also enhances the dining experience and reflects the cafe\'s brand personality. This project focused on creating a menu that is both beautiful and functional, with clear typography, logical organization, and visual appeal that matches the cafe\'s atmosphere.',
      date: '2024',
      tags: ['Menu Design', 'Print Design', 'Typography']
    },
    'rollup-banners': {
      image: '/assets/Portfolio/Rollup-Banners-68a13cab.webp',
      category: 'Events',
      title: 'Rollup Banners for Different Companies',
      description: 'Professional rollup banner designs for various companies, featuring modern layouts, compelling visuals, and brand-consistent messaging. High-quality print-ready designs that effectively communicate company information and enhance brand visibility at events and exhibitions.',
      type: 'Banners',
      content: 'Rollup banners are essential marketing tools for events, exhibitions, and trade shows. Effective banner design requires understanding the event context, target audience, and key messaging. This collection showcases various approaches to banner design, each tailored to the specific company\'s brand and communication goals. The designs balance visual impact with clear information delivery.',
      date: '2024',
      tags: ['Banner Design', 'Event Marketing', 'Print Design']
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && blogModal.isOpen) {
        closeBlogModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [blogModal.isOpen, closeBlogModal]);

  if (!blogModal.isOpen || !blogModal.blogId) return null;

  const post = blogData[blogModal.blogId];
  if (!post) return null;

  return (
    <div 
      className={`portfolio-modal ${blogModal.isOpen ? 'active' : ''}`}
      role="dialog"
      aria-labelledby="modalTitle"
      aria-modal="true"
    >
      <div className="modal-overlay" onClick={closeBlogModal}></div>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" aria-label="Close modal" onClick={closeBlogModal}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="modal-content">
          <div className="modal-image-wrapper">
            <img 
              id="modalImage"
              src={`${process.env.PUBLIC_URL || ''}${post.image}`} 
              alt={`${post.title} - ${post.category} blog post by Bereket Fikre. ${post.description}`} 
              className="modal-image"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 768px) 100vw, 90vw"
            />
          </div>
          <div className="modal-body">
            <span id="modalCategory" className="modal-category">{post.category}</span>
            <h2 id="modalTitle" className="modal-title">{post.title}</h2>
            <div className="blog-meta">
              <span className="blog-date">{post.date}</span>
              {post.tags && (
                <div className="blog-tags">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="blog-tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
            <div id="modalDescription" className="modal-description">
              <p>{post.description}</p>
            </div>
            {post.content && (
              <div className="blog-content">
                <p>{post.content}</p>
              </div>
            )}
            <div className="modal-details">
              <div className="modal-detail-item">
                <span className="detail-label">Category</span>
                <span id="modalCategoryFull" className="detail-value">{post.category}</span>
              </div>
              <div className="modal-detail-item">
                <span className="detail-label">Post Type</span>
                <span id="modalType" className="detail-value">{post.type}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;

