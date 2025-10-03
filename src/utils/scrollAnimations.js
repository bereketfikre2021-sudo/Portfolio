// Advanced scroll-triggered animations and parallax effects
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

class ScrollAnimations {
  constructor() {
    this.observers = new Map();
    this.parallaxElements = new Map();
    this.animationQueue = [];
    this.isAnimating = false;
  }

  // Initialize scroll animations
  init() {
    this.setupIntersectionObserver();
    this.setupParallaxScroll();
    this.setupScrollProgress();
    this.setupRevealAnimations();
  }

  // Setup intersection observer for scroll-triggered animations
  setupIntersectionObserver() {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: [0, 0.1, 0.5, 0.9, 1]
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const element = entry.target;
        const animationType = element.dataset.animation;
        const delay = parseInt(element.dataset.delay) || 0;
        const duration = parseInt(element.dataset.duration) || 0.6;

        if (entry.isIntersecting) {
          this.animateElement(element, animationType, delay, duration);
        } else if (entry.intersectionRatio < 0.1) {
          this.resetElement(element);
        }
      });
    }, observerOptions);

    // Observe all elements with animation attributes
    document.querySelectorAll('[data-animation]').forEach(el => {
      this.intersectionObserver.observe(el);
    });
  }

  // Animate element based on type
  animateElement(element, animationType, delay, duration) {
    const animations = {
      'fade-in': {
        opacity: [0, 1],
        transition: { duration, delay, ease: 'easeOut' }
      },
      'slide-up': {
        opacity: [0, 1],
        y: [50, 0],
        transition: { duration, delay, ease: 'easeOut' }
      },
      'slide-down': {
        opacity: [0, 1],
        y: [-50, 0],
        transition: { duration, delay, ease: 'easeOut' }
      },
      'slide-left': {
        opacity: [0, 1],
        x: [50, 0],
        transition: { duration, delay, ease: 'easeOut' }
      },
      'slide-right': {
        opacity: [0, 1],
        x: [-50, 0],
        transition: { duration, delay, ease: 'easeOut' }
      },
      'scale-up': {
        opacity: [0, 1],
        scale: [0.8, 1],
        transition: { duration, delay, ease: 'easeOut' }
      },
      'rotate-in': {
        opacity: [0, 1],
        rotate: [180, 0],
        scale: [0.8, 1],
        transition: { duration, delay, ease: 'easeOut' }
      },
      'bounce-in': {
        opacity: [0, 1],
        scale: [0.3, 1.1, 1],
        transition: { 
          duration, 
          delay, 
          ease: [0.68, -0.55, 0.265, 1.55] 
        }
      },
      'flip-in': {
        opacity: [0, 1],
        rotateY: [90, 0],
        transition: { duration, delay, ease: 'easeOut' }
      },
      'zoom-in': {
        opacity: [0, 1],
        scale: [0.5, 1],
        transition: { duration, delay, ease: 'easeOut' }
      }
    };

    const animation = animations[animationType];
    if (animation) {
      // Use Framer Motion if available, otherwise use CSS
      if (window.motion) {
        this.animateWithFramerMotion(element, animation);
      } else {
        this.animateWithCSS(element, animation);
      }
    }
  }

  // Animate with Framer Motion
  animateWithFramerMotion(element, animation) {
    const motionElement = motion(element);
    motionElement.animate(animation);
  }

  // Animate with CSS
  animateWithCSS(element, animation) {
    const { opacity, x, y, scale, rotate, rotateY } = animation;
    const { duration, delay, ease } = animation.transition;

    // Set initial state
    element.style.opacity = opacity ? opacity[0] : 1;
    if (x) element.style.transform = `translateX(${x[0]}px)`;
    if (y) element.style.transform = `translateY(${y[0]}px)`;
    if (scale) element.style.transform = `scale(${scale[0]})`;
    if (rotate) element.style.transform = `rotate(${rotate[0]}deg)`;
    if (rotateY) element.style.transform = `rotateY(${rotateY[0]}deg)`;

    // Animate to final state
    setTimeout(() => {
      element.style.transition = `all ${duration}s ${ease}`;
      element.style.opacity = opacity ? opacity[1] : 1;
      if (x) element.style.transform = `translateX(${x[1]}px)`;
      if (y) element.style.transform = `translateY(${y[1]}px)`;
      if (scale) element.style.transform = `scale(${scale[1]})`;
      if (rotate) element.style.transform = `rotate(${rotate[1]}deg)`;
      if (rotateY) element.style.transform = `rotateY(${rotateY[1]}deg)`;
    }, delay * 1000);
  }

  // Reset element to initial state
  resetElement(element) {
    const animationType = element.dataset.animation;
    const resetAnimations = {
      'fade-in': { opacity: 0 },
      'slide-up': { opacity: 0, y: 50 },
      'slide-down': { opacity: 0, y: -50 },
      'slide-left': { opacity: 0, x: 50 },
      'slide-right': { opacity: 0, x: -50 },
      'scale-up': { opacity: 0, scale: 0.8 },
      'rotate-in': { opacity: 0, rotate: 180, scale: 0.8 },
      'bounce-in': { opacity: 0, scale: 0.3 },
      'flip-in': { opacity: 0, rotateY: 90 },
      'zoom-in': { opacity: 0, scale: 0.5 }
    };

    const reset = resetAnimations[animationType];
    if (reset) {
      Object.assign(element.style, reset);
    }
  }

  // Setup parallax scroll effects
  setupParallaxScroll() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.dataset.parallax) || 0.5;
      this.parallaxElements.set(element, { speed, offset: 0 });
    });

    // Throttled scroll handler with debouncing
    let ticking = false;
    let lastScrollTime = 0;
    const SCROLL_THROTTLE = 16; // ~60fps
    
    const handleScroll = () => {
      const now = Date.now();
      if (!ticking && (now - lastScrollTime) > SCROLL_THROTTLE) {
        requestAnimationFrame(() => {
          this.updateParallaxElements();
          ticking = false;
          lastScrollTime = now;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // Update parallax elements
  updateParallaxElements() {
    const scrollY = window.pageYOffset;
    
    this.parallaxElements.forEach((config, element) => {
      const rect = element.getBoundingClientRect();
      const speed = config.speed;
      
      // Only animate if element is in viewport
      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        const yPos = -(scrollY * speed);
        element.style.transform = `translateY(${yPos}px)`;
      }
    });
  }

  // Setup scroll progress indicator
  setupScrollProgress() {
    const progressBar = document.querySelector('[data-scroll-progress]');
    if (!progressBar) return;

    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      progressBar.style.width = `${scrollPercent}%`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
  }

  // Setup reveal animations for text
  setupRevealAnimations() {
    const textElements = document.querySelectorAll('[data-reveal-text]');
    
    textElements.forEach(element => {
      const text = element.textContent;
      const words = text.split(' ');
      
      element.innerHTML = words.map(word => 
        `<span class="reveal-word" style="opacity: 0; transform: translateY(20px);">${word}</span>`
      ).join(' ');

      const wordElements = element.querySelectorAll('.reveal-word');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            wordElements.forEach((word, index) => {
              setTimeout(() => {
                word.style.transition = 'all 0.6s ease-out';
                word.style.opacity = '1';
                word.style.transform = 'translateY(0)';
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      });

      observer.observe(element);
    });
  }

  // Create staggered animation for lists
  createStaggeredAnimation(container, animationType = 'slide-up', stagger = 0.1) {
    const items = container.querySelectorAll('[data-stagger-item]');
    
    items.forEach((item, index) => {
      item.dataset.animation = animationType;
      item.dataset.delay = index * stagger;
      this.intersectionObserver.observe(item);
    });
  }

  // Create typewriter effect
  createTypewriterEffect(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    };
    
    typeWriter();
  }

  // Create counter animation
  createCounterAnimation(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const counter = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(counter);
      }
      element.textContent = Math.floor(current);
    }, 16);
  }

  // Create morphing animation
  createMorphingAnimation(element, shapes, duration = 1000) {
    let currentShape = 0;
    
    const morph = () => {
      element.style.clipPath = shapes[currentShape];
      currentShape = (currentShape + 1) % shapes.length;
    };
    
    setInterval(morph, duration);
  }

  // Cleanup
  destroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    
    this.parallaxElements.clear();
    this.observers.clear();
  }
}

// Create global instance
const scrollAnimations = new ScrollAnimations();

// Auto-initialize
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    scrollAnimations.init();
  });
}

export default scrollAnimations;
export { ScrollAnimations };
