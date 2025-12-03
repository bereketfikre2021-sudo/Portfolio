import React, { useContext, useEffect, useRef } from 'react';
import { ModalContext } from '../context/ModalContext';
import { useFocusTrap } from '../hooks/useFocusTrap';

const BlogModal = () => {
  const { blogModal, closeBlogModal } = useContext(ModalContext);
  const modalRef = useRef(null);
  useFocusTrap(blogModal?.isOpen, modalRef);
  
  // Announce modal opening to screen readers
  useEffect(() => {
    if (blogModal?.isOpen && blogModal?.postId) {
      const post = blogData[blogModal.postId];
      if (post) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
          liveRegion.textContent = `Opened blog post: ${post.title}`;
          setTimeout(() => {
            liveRegion.textContent = '';
          }, 1000);
        }
      }
    }
  }, [blogModal?.isOpen, blogModal?.postId]);

  const blogData = {
    'design-principles': {
      image: '/assets/Portfolio/Design principles.webp',
      category: 'Design Principles',
      title: 'Essential Graphic Design Principles Every Designer Should Master',
      description: 'Graphic design is built on fundamental principles that guide visual communication. These core concepts help designers create effective, aesthetically pleasing, and functional designs that communicate messages clearly and powerfully.',
      date: 'January 2025',
      author: 'Bereket Fikre',
      type: 'Design Education',
      sections: [
        {
          heading: 'Balance: Creating Visual Stability',
          text: 'Balance is the distribution of visual weight in a design. Whether symmetrical or asymmetrical, balance ensures that elements don\'t feel lopsided or overwhelming. Symmetrical balance creates formal, stable compositions, while asymmetrical balance uses contrast to create dynamic, engaging layouts that still feel harmonious.'
        },
        {
          heading: 'Contrast: Making Elements Stand Out',
          text: 'Contrast is one of the most powerful tools in a designer\'s toolkit. By using contrasting colors, sizes, shapes, or textures, designers can create visual hierarchy and draw attention to key elements. High contrast ensures readability and helps important information stand out, while subtle contrast can create depth and sophistication.'
        },
        {
          heading: 'Hierarchy: Guiding the Eye',
          text: 'Visual hierarchy determines the order in which the human eye perceives information. Through size, color, spacing, and positioning, designers guide viewers through content in a logical sequence. Effective hierarchy ensures that the most important information is noticed first, creating a clear path for the viewer\'s attention.'
        },
        {
          heading: 'Alignment: Creating Order',
          text: 'Alignment creates visual connections between elements, making designs appear organized and cohesive. Proper alignment creates a clean, professional look and helps establish relationships between different parts of a design. Consistent alignment throughout a project creates unity and makes content easier to scan and understand.'
        },
        {
          heading: 'Repetition: Building Consistency',
          text: 'Repetition strengthens designs by creating consistency and unity. Repeating visual elements like colors, fonts, shapes, or patterns creates rhythm and helps establish brand identity. Consistent repetition makes designs feel cohesive and professional, while strategic variation keeps them interesting and dynamic.'
        },
        {
          heading: 'Proportion: Creating Visual Relationships',
          text: 'Proportion refers to the size relationship between elements in a design. Effective use of proportion creates visual harmony and helps establish importance. Large elements draw attention, while smaller elements provide supporting details. The golden ratio and rule of thirds are classic proportional systems that help designers create balanced, aesthetically pleasing compositions that feel natural to the human eye.'
        },
        {
          heading: 'Movement: Guiding Visual Flow',
          text: 'Movement in design guides the viewer\'s eye through a composition in a deliberate path. This can be achieved through lines, shapes, color gradients, or the positioning of elements. Effective movement creates a visual journey that leads viewers from the most important information to supporting details, ensuring that messages are communicated in the intended order and that nothing important is overlooked.'
        }
      ],
      insights: [
        'Mastering these principles is the foundation of great design',
        'Balance and contrast work together to create visual interest',
        'Hierarchy is essential for effective communication',
        'Consistent alignment creates professional, polished designs',
        'Repetition builds brand recognition and visual consistency',
        'Proportion creates harmonious relationships between elements',
        'Movement guides viewers through your design in a deliberate flow'
      ]
    },
    'design-trends-2025': {
      image: '/assets/Portfolio/Graphic Design Trends 2025.webp',
      category: 'Design Trends',
      title: 'Graphic Design Trends 2025: What\'s Shaping the Future',
      description: 'The graphic design landscape continues to evolve, with 2025 bringing fresh perspectives on visual communication. From bold typography to sustainable design practices, these trends reflect our changing world and the ways designers are responding to new challenges and opportunities.',
      date: 'January 2025',
      author: 'Bereket Fikre',
      type: 'Trend Analysis',
      sections: [
        {
          heading: 'Bold Typography and Expressive Letterforms',
          text: '2025 sees a return to bold, expressive typography that makes a statement. Designers are embracing custom letterforms, oversized text, and typography as the primary visual element. This trend reflects a desire for authenticity and personality in brand communication, moving away from safe, generic type choices toward more distinctive and memorable typographic solutions.'
        },
        {
          heading: 'Sustainable and Eco-Conscious Design',
          text: 'Environmental awareness is driving design decisions, with brands prioritizing sustainable materials, minimal packaging, and eco-friendly production methods. Designers are creating visuals that communicate environmental values while maintaining aesthetic appeal. This includes using earth tones, natural textures, and imagery that connects brands to sustainability narratives.'
        },
        {
          heading: 'Nostalgic Retro Aesthetics',
          text: 'Nostalgia continues to influence design, with 90s and early 2000s aesthetics making a comeback. This includes vibrant color palettes, pixel art, and design elements that evoke memories of earlier digital eras. However, modern designers are reinterpreting these styles with contemporary sensibilities, creating fresh takes on familiar visual languages.'
        },
        {
          heading: 'Minimalism with Purpose',
          text: 'While minimalism remains popular, 2025 sees a shift toward purposeful minimalism—designs that are clean and simple but with intentional, meaningful elements. Every element serves a function, and white space is used strategically to create focus and breathing room. This approach values clarity and user experience over decorative elements.'
        },
        {
          heading: 'Dynamic Motion and Animation',
          text: 'As digital platforms continue to dominate, motion design becomes increasingly important. Subtle animations, micro-interactions, and dynamic graphics help brands stand out in crowded digital spaces. Motion adds personality and engagement, making static designs feel alive and responsive to user interaction.'
        }
      ],
      insights: [
        'Typography is becoming the hero element in many designs',
        'Sustainability is no longer optional—it\'s essential',
        'Nostalgia creates emotional connections with audiences',
        'Purposeful minimalism focuses on clarity and function',
        'Motion design adds personality and engagement to digital experiences'
      ]
    },
    'brand-identity': {
      image: '/assets/Portfolio/Branding.webp',
      category: 'Brand Design',
      title: 'Building Strong Brand Identities: A Complete Guide',
      description: 'A strong brand identity is the foundation of successful businesses. It goes beyond logos and colors to create a cohesive visual system that communicates your brand\'s values, personality, and promise. Learn how to build memorable brand identities that resonate with audiences and stand the test of time.',
      date: 'January 2025',
      author: 'Bereket Fikre',
      type: 'Brand Strategy',
      sections: [
        {
          heading: 'Understanding Brand Identity vs. Brand Image',
          text: 'Brand identity is what you create—the visual and verbal elements that represent your brand, including logos, colors, typography, and messaging. Brand image is how audiences perceive your brand based on their experiences. A successful brand identity aligns these two, ensuring that what you communicate matches how you\'re perceived. This alignment builds trust and creates lasting connections with your audience.'
        },
        {
          heading: 'The Core Elements of Brand Identity',
          text: 'Every strong brand identity consists of essential elements working together: the logo serves as the visual anchor, typography establishes voice and personality, color palette evokes emotions and associations, imagery style creates visual consistency, and brand voice communicates your unique perspective. These elements must work harmoniously across all touchpoints to create a unified brand experience that audiences recognize and remember.'
        },
        {
          heading: 'Research and Strategy: The Foundation',
          text: 'Before designing, thorough research is essential. Understand your target audience, analyze competitors, define your brand\'s unique value proposition, and clarify your brand personality. This strategic foundation ensures that every design decision serves a purpose and connects with your intended audience. Without strategy, even beautiful designs can miss the mark and fail to communicate effectively.'
        },
        {
          heading: 'Creating Visual Consistency',
          text: 'Consistency is key to building brand recognition. Develop comprehensive brand guidelines that document logo usage, color specifications, typography rules, spacing guidelines, and application examples. These guidelines ensure that your brand looks cohesive whether it appears on a business card, website, or billboard. Consistent application builds trust and makes your brand instantly recognizable across all platforms and touchpoints.'
        },
        {
          heading: 'Adapting Across Media and Platforms',
          text: 'Modern brands exist across multiple platforms—from print materials to digital interfaces, social media to physical spaces. A flexible brand identity adapts to different contexts while maintaining core visual elements. This might mean creating logo variations for different sizes, adapting color palettes for digital vs. print, or developing platform-specific guidelines. The goal is maintaining brand recognition while optimizing for each medium\'s unique requirements and constraints.'
        }
      ],
      insights: [
        'Brand identity is what you create; brand image is how you\'re perceived',
        'Strategic research ensures design decisions serve a clear purpose',
        'Visual consistency builds recognition and trust over time',
        'Comprehensive brand guidelines maintain quality across all applications',
        'Flexible brand systems adapt to different media while staying consistent'
      ]
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && blogModal.isOpen) {
        closeBlogModal();
      }
    };

    const handlePopState = () => {
      if (blogModal.isOpen) {
        closeBlogModal();
      }
    };

    if (blogModal.isOpen) {
      window.history.pushState({ modal: 'blog' }, '');
      window.addEventListener('popstate', handlePopState);
    }

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [blogModal.isOpen, closeBlogModal]);

  if (!blogModal.isOpen || !blogModal.blogId) return null;

  const post = blogData[blogModal.blogId];
  if (!post) return null;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = post.title;

  return (
    <div 
      ref={modalRef}
      className={`case-study-modal ${blogModal.isOpen ? 'active' : ''}`}
      role="dialog"
      aria-labelledby="blogModalTitle"
      aria-describedby="blogModalDescription"
      aria-modal="true"
    >
      <div className="modal-overlay" onClick={closeBlogModal}></div>
      <div className="case-study-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="case-study-modal-close" aria-label="Close modal" onClick={closeBlogModal}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="case-study-modal-content">
          <div className="case-study-modal-header">
            <div className="case-study-modal-image-wrapper">
              <img 
                id="blogModalImage"
                src={`${process.env.PUBLIC_URL || ''}${post.image}`} 
                alt={`${post.title} - ${post.category} blog post by Bereket Fikre. ${post.description}`} 
                className="case-study-modal-image"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 90vw"
              />
            </div>
            <div className="case-study-modal-header-content">
              <span id="blogModalCategory" className="case-study-modal-category">{post.category}</span>
              <h2 id="blogModalTitle" className="case-study-modal-title">{post.title}</h2>
              <div className="case-study-modal-meta">
                <div className="case-study-meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span>{post.date}</span>
                </div>
                <div className="case-study-meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span>{post.author}</span>
                </div>
                <div className="case-study-meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                  <span>{post.type}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="case-study-modal-body">
            <div className="case-study-modal-intro">
              <p className="case-study-modal-description">{post.description}</p>
            </div>
            <div className="case-study-modal-article">
              {post.sections.map((section, index) => (
                <div key={index} className="case-study-article-section">
                  <div className="case-study-section-header">
                    <div className="case-study-section-icon solution-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <h3 className="case-study-section-heading">{section.heading}</h3>
                  </div>
                  <p className="case-study-section-text">{section.text}</p>
                </div>
              ))}
            </div>
            {post.insights && post.insights.length > 0 && (
              <div className="case-study-modal-deliverables">
                <h3 className="case-study-deliverables-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 11l3 3L22 4"/>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                  </svg>
                  Key Insights
                </h3>
                <ul className="case-study-deliverables-list">
                  {post.insights.map((insight, index) => (
                    <li key={index} className="case-study-deliverable-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="blog-social-share">
              <h4 className="blog-share-title">Share this article</h4>
              <div className="blog-share-buttons">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-share-btn blog-share-twitter"
                  aria-label="Share on Twitter"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                  </svg>
                  <span>Twitter</span>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-share-btn blog-share-linkedin"
                  aria-label="Share on LinkedIn"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-share-btn blog-share-facebook"
                  aria-label="Share on Facebook"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
                <button
                  onClick={(e) => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(shareUrl);
                      const btn = e.currentTarget;
                      const span = btn.querySelector('span');
                      const originalText = span.textContent;
                      span.textContent = 'Copied!';
                      setTimeout(() => {
                        span.textContent = originalText;
                      }, 2000);
                    }
                  }}
                  className="blog-share-btn blog-share-copy"
                  aria-label="Copy link"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                  <span>Copy Link</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;

