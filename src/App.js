import React, { lazy, Suspense, useEffect } from 'react';
import { ModalProvider } from './context/ModalContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import ScrollProgress from './components/ScrollProgress';
// Defer non-critical visual effects to not block LCP
const ScrollPattern = lazy(() => import('./components/ScrollPattern'));
const ParticleCanvas = lazy(() => import('./components/ParticleCanvas'));
const CustomCursor = lazy(() => import('./components/CustomCursor'));
import ScrollToTop from './components/ScrollToTop';
// Lazy load modals - they're not needed until user interaction
const PortfolioModal = lazy(() => import('./components/PortfolioModal'));
const CaseStudyModal = lazy(() => import('./components/CaseStudyModal'));
const BlogModal = lazy(() => import('./components/BlogModal'));
const ServicesModal = lazy(() => import('./components/ServicesModal'));
const FormModals = lazy(() => import('./components/FormModals'));
const PrivacyTermsModal = lazy(() => import('./components/PrivacyTermsModal'));

// Lazy load below-the-fold components to reduce initial bundle size and improve performance
const CaseStudies = lazy(() => import('./components/CaseStudies'));
const Blog = lazy(() => import('./components/Blog'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const TrustedBy = lazy(() => import('./components/TrustedBy'));
const FAQ = lazy(() => import('./components/FAQ'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const BottomNav = lazy(() => import('./components/BottomNav'));

// Loading fallback component
const LoadingFallback = () => null;

function App() {
  // Performance optimization: Register service worker (images already preloaded in index.html)
  useEffect(() => {
    // Register service worker for PWA (if available) - deferred to not block initial render
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      // Use requestIdleCallback for non-critical work, fallback to setTimeout
      const registerSW = () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            if (process.env.NODE_ENV === 'development') {
              console.log('SW registered: ', registration);
            }
          })
          .catch(() => {
            // Silently fail - service worker is optional
          });
      };
      
      if ('requestIdleCallback' in window) {
        requestIdleCallback(registerSW, { timeout: 2000 });
      } else {
        setTimeout(registerSW, 2000);
      }
    }
  }, []);

  return (
    <ErrorBoundary>
      <ModalProvider>
        <div className="App">
          {/* Skip to main content link for accessibility */}
          <a href="#main-content" className="skip-to-main-content">
            Skip to main content
          </a>
          <ScrollProgress />
          <Suspense fallback={null}>
            <ScrollPattern />
            <ParticleCanvas />
            <CustomCursor />
          </Suspense>
          <Navigation />
          <main id="main-content">
            <Hero />
            <About />
            <Services />
            <Portfolio />
            <Suspense fallback={LoadingFallback()}>
              <CaseStudies />
              <Blog />
              <Testimonials />
              <TrustedBy />
              <FAQ />
              <Contact />
              <Footer />
              <BottomNav />
            </Suspense>
          </main>
          <ScrollToTop />
          <Suspense fallback={null}>
            <PortfolioModal />
            <CaseStudyModal />
            <BlogModal />
            <ServicesModal />
            <FormModals />
            <PrivacyTermsModal />
          </Suspense>
        </div>
      </ModalProvider>
    </ErrorBoundary>
  );
}

export default App;

