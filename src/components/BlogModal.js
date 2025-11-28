import React, { useContext, useEffect } from 'react';
import { ModalContext } from '../context/ModalContext';

const BlogModal = () => {
  const { blogModal, closeBlogModal } = useContext(ModalContext);

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
        }
      ],
      insights: [
        'Mastering these principles is the foundation of great design',
        'Balance and contrast work together to create visual interest',
        'Hierarchy is essential for effective communication',
        'Consistent alignment creates professional, polished designs',
        'Repetition builds brand recognition and visual consistency'
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

  return (
    <div 
      className={`case-study-modal ${blogModal.isOpen ? 'active' : ''}`}
      role="dialog"
      aria-labelledby="blogModalTitle"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;

