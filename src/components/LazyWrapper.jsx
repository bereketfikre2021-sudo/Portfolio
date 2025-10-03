import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';

// Loading component with animation
const LoadingSpinner = ({ className = '' }) => (
  <motion.div
    className={`flex items-center justify-center p-8 ${className}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </motion.div>
);

// Error boundary for lazy components
class LazyErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Lazy component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center p-8 text-center">
          <div className="text-accent/60">
            <p className="text-sm">Failed to load component</p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="mt-2 px-3 py-1 bg-accent/20 text-accent rounded-md text-xs hover:bg-accent/30 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for lazy loading with error boundary
const withLazyLoading = (importFunc, fallback = null) => {
  const LazyComponent = lazy(importFunc);
  
  return (props) => (
    <LazyErrorBoundary>
      <Suspense fallback={fallback || <LoadingSpinner />}>
        <LazyComponent {...props} />
      </Suspense>
    </LazyErrorBoundary>
  );
};

// Pre-configured lazy components for common use cases
export const LazyTools = withLazyLoading(
  () => import('./AnalyticsDashboard.jsx'),
  <LoadingSpinner className="h-32" />
);

export const LazyAI = withLazyLoading(
  () => import('./AIPersonalization.jsx'),
  <LoadingSpinner className="h-32" />
);

export const LazyPWA = withLazyLoading(
  () => import('./AdvancedPWA.jsx'),
  <LoadingSpinner className="h-32" />
);

export const LazyPerformance = withLazyLoading(
  () => import('./PerformanceMonitor.jsx'),
  <LoadingSpinner className="h-32" />
);

export const LazyBlog = withLazyLoading(
  () => import('./Blog.jsx'),
  <LoadingSpinner className="h-64" />
);

export const LazyCaseStudy = withLazyLoading(
  () => import('./CaseStudy.jsx'),
  <LoadingSpinner className="h-64" />
);

export const LazyNewsletter = withLazyLoading(
  () => import('./NewsletterSignup.jsx'),
  <LoadingSpinner className="h-32" />
);

export const LazyAnimations = withLazyLoading(
  () => import('./AnimatedElements.jsx'),
  <LoadingSpinner className="h-32" />
);

export const LazyAnalytics = withLazyLoading(
  () => import('./Analytics.jsx'),
  <LoadingSpinner className="h-32" />
);

export const LazyProjectGallery = withLazyLoading(
  () => import('./ProjectGallery.jsx'),
  <LoadingSpinner className="h-64" />
);

export const LazyNewsletterSignup = withLazyLoading(
  () => import('./NewsletterSignup.jsx'),
  <LoadingSpinner className="h-32" />
);

export const LazyAccessibilitySettings = withLazyLoading(
  () => import('./AccessibilitySettings.jsx'),
  <LoadingSpinner className="h-32" />
);

export const LazyAdvancedAnimations = withLazyLoading(
  () => import('./AdvancedAnimations.jsx'),
  <LoadingSpinner className="h-32" />
);

export const LazyPerformanceDashboard = withLazyLoading(
  () => import('./PerformanceDashboard.jsx'),
  <LoadingSpinner className="h-32" />
);

export const LazySEOManager = withLazyLoading(
  () => import('./SEOManager.jsx'),
  <LoadingSpinner className="h-32" />
);

export const LazySecurityDashboard = withLazyLoading(
  () => import('./SecurityDashboard.jsx'),
  <LoadingSpinner className="h-32" />
);

export const LazyAIContentGenerator = withLazyLoading(
  () => import('./AIContentGenerator.jsx'),
  <LoadingSpinner className="h-32" />
);

export const LazySmartRecommendations = withLazyLoading(
  () => import('./SmartRecommendations.jsx'),
  <LoadingSpinner className="h-32" />
);

export const LazyCRMIntegration = withLazyLoading(
  () => import('./CRMIntegration.jsx'),
  <LoadingSpinner className="h-32" />
);

export const LazyEmailMarketing = withLazyLoading(
  () => import('./EmailMarketing.jsx'),
  <LoadingSpinner className="h-32" />
);

export const LazyPWAInstaller = withLazyLoading(
  () => import('./PWAInstaller.jsx'),
  <LoadingSpinner className="h-32" />
);

// Utility function to preload components
export const preloadComponent = (importFunc) => {
  return () => {
    importFunc().then(module => {
      console.log('Component preloaded:', module.default.name || 'Unknown');
    });
  };
};

// Preload critical components on user interaction
export const preloadCriticalComponents = () => {
  // Preload on first user interaction
  const preloadOnInteraction = () => {
    preloadComponent(() => import('./AnalyticsDashboard.jsx'))();
    preloadComponent(() => import('./AIPersonalization.jsx'))();
    preloadComponent(() => import('./AdvancedPWA.jsx'))();
    
    // Remove event listeners after first interaction
    document.removeEventListener('mousedown', preloadOnInteraction);
    document.removeEventListener('touchstart', preloadOnInteraction);
    document.removeEventListener('keydown', preloadOnInteraction);
  };

  // Add event listeners for user interaction
  document.addEventListener('mousedown', preloadOnInteraction, { once: true });
  document.addEventListener('touchstart', preloadOnInteraction, { once: true });
  document.addEventListener('keydown', preloadOnInteraction, { once: true });
};

export default withLazyLoading;
