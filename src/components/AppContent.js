import React, { lazy, Suspense, useEffect, useContext } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ModalContext } from '../context/ModalContext';
import Navigation from './Navigation';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Portfolio from './Portfolio';
import CallNowButton from './CallNowButton';
import ScrollToTop from './ScrollToTop';
import KeyboardShortcuts from './KeyboardShortcuts';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

// Defer non-critical visual effects to not block LCP
const ScrollPattern = lazy(() => import('./ScrollPattern'));
const ParticleCanvas = lazy(() => import('./ParticleCanvas'));
const CustomCursor = lazy(() => import('./CustomCursor'));

// Lazy load modals - they're not needed until user interaction
const PortfolioModal = lazy(() => import('./PortfolioModal'));
const CaseStudyModal = lazy(() => import('./CaseStudyModal'));
const BlogModal = lazy(() => import('./BlogModal'));
const ServicesModal = lazy(() => import('./ServicesModal'));
const FormModals = lazy(() => import('./FormModals'));
const PrivacyTermsModal = lazy(() => import('./PrivacyTermsModal'));
const ProjectRequestModal = lazy(() => import('./ProjectRequestModal'));
const LightboxGallery = lazy(() => import('./LightboxGallery'));

// Lazy load below-the-fold components to reduce initial bundle size and improve performance
const CaseStudies = lazy(() => import('./CaseStudies'));
const Blog = lazy(() => import('./Blog'));
const Testimonials = lazy(() => import('./Testimonials'));
const TrustedBy = lazy(() => import('./TrustedBy'));
const FAQ = lazy(() => import('./FAQ'));
const Contact = lazy(() => import('./Contact'));
const Footer = lazy(() => import('./Footer'));
const BottomNav = lazy(() => import('./BottomNav'));

// Loading fallback component - show minimal placeholder to prevent layout shift
const LoadingFallback = () => (
  <section id="blog" className="case-studies" style={{ minHeight: '400px' }}>
    <div className="container">
      <div className="section-intro">
        <span className="section-number">04</span>
        <div className="section-header">
          <span className="section-label">Design Insights</span>
          <h2 className="section-title">
            <span className="title-main">Design</span>
            <span className="title-accent">Blog</span>
          </h2>
        </div>
      </div>
    </div>
  </section>
);

function AppContent() {
  const { openProjectRequestModal } = useContext(ModalContext);

  // Initialize AOS (Animate On Scroll)
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
      disable: window.innerWidth <= 768 ? 'mobile' : false,
    });
    
    // Refresh AOS when lazy-loaded components mount
    const refreshAOS = () => {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        setTimeout(() => {
          AOS.refresh();
        }, 200);
      });
    };
    
    // Refresh AOS after initial load
    refreshAOS();
    
    // Also refresh on window load to catch any late-loading elements
    window.addEventListener('load', refreshAOS);
    
    // Use MutationObserver to refresh AOS when new elements are added
    const observer = new MutationObserver(() => {
      refreshAOS();
    });
    
    // Observe the main content area for changes
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      observer.observe(mainContent, {
        childList: true,
        subtree: true
      });
    }
    
    return () => {
      window.removeEventListener('load', refreshAOS);
      observer.disconnect();
    };
  }, []);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    'ctrl+k': (e) => {
      e.preventDefault();
      openProjectRequestModal();
    }
  }, [openProjectRequestModal]);

  return (
    <div className="App">
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-to-main-content">
        Skip to main content
      </a>
      <CallNowButton />
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
        <Suspense fallback={null}>
          <div className="desktop-only">
            <CaseStudies />
          </div>
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <div className="desktop-only">
            <Blog />
          </div>
          <Testimonials />
          <div className="desktop-only">
            <TrustedBy />
          </div>
          <FAQ />
          <Contact />
          <Footer />
          <BottomNav />
        </Suspense>
      </main>
      <ScrollToTop />
      <KeyboardShortcuts />
      <Suspense fallback={null}>
        <PortfolioModal />
        <CaseStudyModal />
        <BlogModal />
        <ServicesModal />
        <FormModals />
        <PrivacyTermsModal />
        <ProjectRequestModal />
        <LightboxGallery />
      </Suspense>
    </div>
  );
}

export default AppContent;

