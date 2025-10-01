import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = '/img/placeholder.webp',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
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
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`} {...props}>
      {/* Blur Placeholder */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-accent/10 to-secondary/10 flex items-center justify-center"
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-accent/40 border-t-accent rounded-full animate-spin"></div>
        </div>
      </motion.div>

      {/* Actual Image */}
      {isInView && (
        <motion.img
          src={hasError ? placeholder : src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
        />
      )}

      {/* Loading Skeleton */}
      {!isLoaded && isInView && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            backgroundSize: '200% 100%'
          }}
        />
      )}
    </div>
  );
};

export default LazyImage;
