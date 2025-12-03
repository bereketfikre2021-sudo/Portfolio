import React, { lazy, Suspense, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
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
import FloatingQuoteButton from './components/FloatingQuoteButton';
// Lazy load modals - they're not needed until user interaction
const PortfolioModal = lazy(() => import('./components/PortfolioModal'));
const BlogModal = lazy(() => import('./components/BlogModal'));
const ServicesModal = lazy(() => import('./components/ServicesModal'));
const FormModals = lazy(() => import('./components/FormModals'));
const PrivacyTermsModal = lazy(() => import('./components/PrivacyTermsModal'));
const ProjectRequestModal = lazy(() => import('./components/ProjectRequestModal'));

// Lazy load below-the-fold components to reduce initial bundle size and improve performance
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
  // Initialize AOS (Animate On Scroll)
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
      disable: window.innerWidth <= 768 ? 'mobile' : false,
    });
  }, []);

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
          <FloatingQuoteButton />
          <Suspense fallback={null}>
            <PortfolioModal />
            <BlogModal />
            <ServicesModal />
            <FormModals />
            <PrivacyTermsModal />
            <ProjectRequestModal />
          </Suspense>
        </div>
      </ModalProvider>
    </ErrorBoundary>
  );
}

export default App;

