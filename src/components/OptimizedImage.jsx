import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height, 
  priority = false,
  placeholder = 'blur',
  quality = 75,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Generate responsive image URLs with multiple sizes
  const generateImageUrls = (originalSrc) => {
    const baseUrl = originalSrc.replace(/\.[^/.]+$/, '');
    const extension = originalSrc.split('.').pop();
    
    // Generate responsive srcset for different screen sizes
    // Assuming images are available in multiple sizes (you may need to adjust based on your setup)
    const generateSrcSet = (format) => {
      // Common responsive breakpoints: 400w, 800w, 1200w, 1600w, 1920w
      const widths = [400, 800, 1200, 1600, 1920];
      return widths
        .map(w => `${baseUrl}-${w}w.${format} ${w}w`)
        .join(', ');
    };
    
    return {
      webp: `${baseUrl}.webp`,
      webpSrcSet: generateSrcSet('webp'),
      fallback: originalSrc,
      fallbackSrcSet: generateSrcSet(extension),
      placeholder: `${baseUrl}-placeholder.webp`,
      // Individual sizes for srcset
      sizes: {
        small: `${baseUrl}-400w.webp`,
        medium: `${baseUrl}-800w.webp`,
        large: `${baseUrl}-1200w.webp`,
        xlarge: `${baseUrl}-1600w.webp`,
        xxlarge: `${baseUrl}-1920w.webp`
      }
    };
  };

  const imageUrls = generateImageUrls(src);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  // Generate blur placeholder
  const generateBlurDataURL = (width = 10, height = 10) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    
    // Create a simple gradient placeholder
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#1a1a1a');
    gradient.addColorStop(1, '#2a2a2a');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    return canvas.toDataURL();
  };

  const blurDataURL = generateBlurDataURL(width, height);

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
      {...props}
    >
      {/* Blur Placeholder */}
      {!isLoaded && placeholder === 'blur' && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"
          style={{
            backgroundImage: `url(${blurDataURL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px)',
            transform: 'scale(1.1)'
          }}
        />
      )}

      {/* Loading Skeleton */}
      {!isLoaded && placeholder === 'skeleton' && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse"
        />
      )}

      {/* Actual Image with Responsive srcset */}
      {isInView && (
        <picture>
          {/* WebP Source with responsive srcset */}
          <source
            srcSet={imageUrls.webpSrcSet || imageUrls.webp}
            type="image/webp"
            sizes={sizes}
            onLoad={handleLoad}
            onError={handleError}
          />
          
          {/* Fallback Image with responsive srcset */}
          <motion.img
            src={hasError ? imageUrls.fallback : imageUrls.webp}
            srcSet={hasError ? imageUrls.fallbackSrcSet : imageUrls.webpSrcSet || imageUrls.webp}
            alt={alt}
            width={width}
            height={height}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            sizes={sizes}
            fetchpriority={priority ? 'high' : 'low'}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              aspectRatio: width && height ? `${width} / ${height}` : undefined
            }}
          />
        </picture>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-400">
          <div className="text-center">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs">Image unavailable</p>
          </div>
        </div>
      )}

      {/* Loading Indicator */}
      {!isLoaded && !hasError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full"
          />
        </motion.div>
      )}
    </div>
  );
};

export default OptimizedImage;

        </div>
      )}

      {/* Loading Indicator */}
      {!isLoaded && !hasError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full"
          />
        </motion.div>
      )}
    </div>
  );
};

export default OptimizedImage;
