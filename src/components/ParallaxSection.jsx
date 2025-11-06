import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ParallaxSection = ({ 
  children, 
  speed = 0.5, 
  direction = 'up',
  className = '',
  ...props 
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  // Create smooth spring animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform based on direction
  const getTransform = () => {
    switch (direction) {
      case 'up':
        return useTransform(smoothProgress, [0, 1], ['0%', '-50%']);
      case 'down':
        return useTransform(smoothProgress, [0, 1], ['0%', '50%']);
      case 'left':
        return useTransform(smoothProgress, [0, 1], ['0%', '-50%']);
      case 'right':
        return useTransform(smoothProgress, [0, 1], ['0%', '50%']);
      case 'scale':
        return useTransform(smoothProgress, [0, 1], [1, 1.1]);
      case 'rotate':
        return useTransform(smoothProgress, [0, 1], [0, 360]);
      default:
        return useTransform(smoothProgress, [0, 1], ['0%', '-50%']);
    }
  };

  const transform = getTransform();

  // Apply transform based on direction
  const getTransformStyle = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { y: transform };
      case 'left':
      case 'right':
        return { x: transform };
      case 'scale':
        return { scale: transform };
      case 'rotate':
        return { rotate: transform };
      default:
        return { y: transform };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`parallax-section ${className}`}
      style={getTransformStyle()}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Parallax background component
export const ParallaxBackground = ({ 
  children, 
  speed = 0.3, 
  className = '',
  ...props 
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <motion.div
      ref={ref}
      className={`parallax-background ${className}`}
      style={{ y }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Parallax text component
export const ParallaxText = ({ 
  text, 
  speed = 0.5, 
  direction = 'up',
  className = '',
  ...props 
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const transform = useTransform(scrollYProgress, [0, 1], ['0%', '-100%']);

  return (
    <motion.div
      ref={ref}
      className={`parallax-text ${className}`}
      style={{ y: transform }}
      {...props}
    >
      {text}
    </motion.div>
  );
};

// Parallax image component
export const ParallaxImage = ({ 
  src, 
  alt, 
  speed = 0.5, 
  direction = 'up',
  className = '',
  ...props 
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const transform = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  return (
    <motion.div
      ref={ref}
      className={`parallax-image ${className}`}
      style={{ y: transform }}
      {...props}
    >
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </motion.div>
  );
};

// Parallax container with multiple layers
export const ParallaxContainer = ({ 
  children, 
  layers = [],
  className = '',
  ...props 
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  return (
    <div ref={ref} className={`parallax-container ${className}`} {...props}>
      {layers.map((layer, index) => (
        <motion.div
          key={index}
          className="parallax-layer"
          style={{
            y: useTransform(scrollYProgress, [0, 1], ['0%', `${layer.speed * 100}%`]),
            zIndex: layer.zIndex || index
          }}
        >
          {layer.content}
        </motion.div>
      ))}
      {children}
    </div>
  );
};

// Scroll-triggered reveal component
export const RevealOnScroll = ({ 
  children, 
  animation = 'fadeIn',
  delay = 0,
  duration = 0.6,
  className = '',
  ...props 
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'start 0.2']
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  const getAnimationStyle = () => {
    switch (animation) {
      case 'fadeIn':
        return { opacity };
      case 'slideUp':
        return { opacity, y };
      case 'slideDown':
        return { opacity, y: useTransform(scrollYProgress, [0, 1], [-50, 0]) };
      case 'slideLeft':
        return { opacity, x: useTransform(scrollYProgress, [0, 1], [50, 0]) };
      case 'slideRight':
        return { opacity, x: useTransform(scrollYProgress, [0, 1], [-50, 0]) };
      case 'scale':
        return { 
          opacity, 
          scale: useTransform(scrollYProgress, [0, 1], [0.8, 1]) 
        };
      default:
        return { opacity };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`reveal-on-scroll ${className}`}
      style={getAnimationStyle()}
      transition={{ delay, duration }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Staggered reveal component
export const StaggeredReveal = ({ 
  children, 
  stagger = 0.1,
  animation = 'slideUp',
  className = '',
  ...props 
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'start 0.2']
  });

  const childrenArray = React.Children.toArray(children);

  return (
    <div ref={containerRef} className={`staggered-reveal ${className}`} {...props}>
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            delay: index * stagger,
            duration: 0.6,
            ease: 'easeOut'
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
};

export default ParallaxSection;
