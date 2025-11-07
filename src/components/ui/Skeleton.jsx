import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeProvider';

/**
 * Skeleton Loader Component
 * Provides minimal, brand-colored skeleton loaders for various content types
 */
export const Skeleton = ({ 
  className = '', 
  variant = 'default',
  width,
  height,
  rounded = 'md',
  ...props 
}) => {
  const { resolvedTheme } = useTheme();
  
  const baseStyles = {
    background: resolvedTheme === 'light' 
      ? 'linear-gradient(90deg, #E7F2EF 25%, rgba(138,234,146,0.1) 50%, #E7F2EF 75%)'
      : 'linear-gradient(90deg, #19183B 25%, rgba(138,234,146,0.1) 50%, #19183B 75%)',
    backgroundSize: '200% 100%',
    width: width || '100%',
    height: height || '1rem',
  };

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };

  return (
    <motion.div
      className={`${roundedClasses[rounded]} ${className}`}
      style={baseStyles}
      animate={{
        backgroundPosition: ['0% 0%', '200% 0%', '0% 0%'],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear',
      }}
      {...props}
    />
  );
};

/**
 * Portfolio Card Skeleton
 */
export const PortfolioCardSkeleton = () => {
  const { resolvedTheme } = useTheme();
  
  return (
    <div 
      className="relative overflow-hidden h-full flex flex-col rounded-lg"
      style={{
        background: resolvedTheme === 'light' ? '#E7F2EF' : '#19183B',
        border: '1px solid rgba(138,234,146,0.1)',
      }}
    >
      {/* Image Skeleton */}
      <Skeleton 
        className="w-full aspect-video" 
        height="200px"
        rounded="lg"
      />
      
      {/* Content Skeleton */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <Skeleton height="24px" width="70%" rounded="md" />
          <Skeleton height="16px" width="50%" rounded="md" />
        </div>
        
        {/* Tags Skeleton */}
        <div className="flex flex-wrap gap-2 pt-2">
          <Skeleton height="24px" width="60px" rounded="full" />
          <Skeleton height="24px" width="80px" rounded="full" />
          <Skeleton height="24px" width="70px" rounded="full" />
        </div>
        
        {/* Button Skeleton */}
        <Skeleton height="44px" width="100%" rounded="lg" className="mt-6" />
      </div>
    </div>
  );
};

/**
 * Portfolio Grid Skeleton
 */
export const PortfolioGridSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <PortfolioCardSkeleton key={index} />
      ))}
    </div>
  );
};

/**
 * Text Skeleton - for paragraphs
 */
export const TextSkeleton = ({ lines = 3, className = '' }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton 
          key={index} 
          height="16px" 
          width={index === lines - 1 ? '80%' : '100%'}
          rounded="md"
        />
      ))}
    </div>
  );
};

/**
 * Form Field Skeleton
 */
export const FormFieldSkeleton = () => {
  return (
    <div className="space-y-2">
      <Skeleton height="16px" width="120px" rounded="md" />
      <Skeleton height="44px" width="100%" rounded="md" />
    </div>
  );
};

/**
 * Form Skeleton
 */
export const FormSkeleton = ({ fields = 5 }) => {
  return (
    <div className="space-y-6">
      {Array.from({ length: fields }).map((_, index) => (
        <FormFieldSkeleton key={index} />
      ))}
      <Skeleton height="48px" width="100%" rounded="lg" />
    </div>
  );
};

export default Skeleton;

