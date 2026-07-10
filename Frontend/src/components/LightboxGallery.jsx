import React, { useEffect, useState } from 'react';

const LightboxGallery = ({ images, currentIndex, isOpen, onClose, projectTitle }) => {
  const [activeIndex, setActiveIndex] = useState(currentIndex || 0);

  useEffect(() => {
    setActiveIndex(currentIndex || 0);
  }, [currentIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isOpen || !images || images.length === 0) return null;

  const currentImage = images[activeIndex];

  return (
    <div 
      className="lightbox-gallery"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Image gallery for ${projectTitle || 'project'}`}
    >
      <div className="lightbox-overlay"></div>
      <button 
        className="lightbox-close"
        onClick={onClose}
        aria-label="Close gallery"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      
      {images.length > 1 && (
        <>
          <button 
            className="lightbox-nav lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            aria-label="Previous image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button 
            className="lightbox-nav lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </>
      )}

      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-image-wrapper">
          <img 
            src={currentImage.src || currentImage} 
            alt={currentImage.alt || `${projectTitle} - Image ${activeIndex + 1}`}
            className="lightbox-image"
            loading="eager"
          />
        </div>
        {images.length > 1 && (
          <div className="lightbox-counter">
            {activeIndex + 1} / {images.length}
          </div>
        )}
        {images.length > 1 && (
          <div className="lightbox-thumbnails">
            {images.map((img, idx) => (
              <button
                key={idx}
                className={`lightbox-thumb ${idx === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(idx)}
                aria-label={`View image ${idx + 1}`}
              >
                <img 
                  src={img.thumb || img.src || img} 
                  alt={`Thumbnail ${idx + 1}`}
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LightboxGallery;






