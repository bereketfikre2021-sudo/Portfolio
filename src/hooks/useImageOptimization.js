import { useState, useEffect } from 'react';

export const useImageOptimization = (src, options = {}) => {
  const [imageState, setImageState] = useState({
    isLoaded: false,
    hasError: false,
    isInView: options.priority || false
  });

  const {
    priority = false,
    quality = 75,
    width,
    height
  } = options;

  // Generate optimized image URLs
  const generateOptimizedUrls = (originalSrc) => {
    const baseUrl = originalSrc.replace(/\.[^/.]+$/, '');
    const extension = originalSrc.split('.').pop();
    
    return {
      webp: `${baseUrl}.webp`,
      fallback: originalSrc,
      placeholder: `${baseUrl}-placeholder.webp`,
      // Generate different sizes for responsive images
      sizes: {
        small: `${baseUrl}-small.webp`,
        medium: `${baseUrl}-medium.webp`,
        large: `${baseUrl}-large.webp`
      }
    };
  };

  const imageUrls = generateOptimizedUrls(src);

  // Preload critical images
  useEffect(() => {
    if (priority && src) {
      // Skip hero image preloads - hero image was removed
      // Check for both 'hero image' and 'hero%20image' (URL encoded)
      if (src.includes('hero') && (src.includes('image') || src.includes('hero%20image') || src.includes('hero image'))) {
        return;
      }
      
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = imageUrls.webp;
      link.type = 'image/webp';
      link.crossOrigin = 'anonymous'; // Fix credentials mode mismatch
      document.head.appendChild(link);

      return () => {
        // Safely remove link if it still exists
        const existingLink = document.querySelector(`link[href="${imageUrls.webp}"]`);
        if (existingLink && existingLink.parentNode) {
          existingLink.parentNode.removeChild(existingLink);
        }
      };
    }
  }, [priority, src, imageUrls.webp]);

  const handleLoad = () => {
    setImageState(prev => ({ ...prev, isLoaded: true }));
  };

  const handleError = () => {
    setImageState(prev => ({ 
      ...prev, 
      hasError: true, 
      isLoaded: true 
    }));
  };

  const setInView = (inView) => {
    setImageState(prev => ({ ...prev, isInView: inView }));
  };

  return {
    ...imageState,
    imageUrls,
    handleLoad,
    handleError,
    setInView
  };
};

// Hook for managing multiple images
export const useImageGallery = (images, options = {}) => {
  const [galleryState, setGalleryState] = useState(
    images.map((_, index) => ({
      isLoaded: false,
      hasError: false,
      isInView: index < 3 // Load first 3 images immediately
    }))
  );

  const updateImageState = (index, updates) => {
    setGalleryState(prev => 
      prev.map((state, i) => 
        i === index ? { ...state, ...updates } : state
      )
    );
  };

  const preloadNextImages = (currentIndex) => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < images.length && !galleryState[nextIndex].isInView) {
      updateImageState(nextIndex, { isInView: true });
    }
  };

  return {
    galleryState,
    updateImageState,
    preloadNextImages
  };
};

// Utility function for generating responsive image sets
export const generateResponsiveImageSet = (baseSrc, sizes = [320, 640, 1024, 1920]) => {
  const baseUrl = baseSrc.replace(/\.[^/.]+$/, '');
  const extension = baseSrc.split('.').pop();
  
  return sizes.map(size => ({
    size,
    webp: `${baseUrl}-${size}w.webp`,
    fallback: `${baseUrl}-${size}w.${extension}`,
    descriptor: `${size}w`
  }));
};

// Utility function for generating blur data URL
export const generateBlurDataURL = (width = 10, height = 10, color = '#1a1a1a') => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  
  // Create a simple gradient placeholder
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, color + '80');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL();
};
