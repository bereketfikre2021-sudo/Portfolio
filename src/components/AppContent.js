import React, { lazy, Suspense, useEffect, useContext, useState } from 'react';
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

// Debounce helper - limits how often AOS.refresh runs
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

function AppContent() {
  const { openProjectRequestModal } = useContext(ModalContext);
  const [deferEffects, setDeferEffects] = useState(false);

  // Defer decorative effects until after first paint to prioritize LCP and FCP
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setDeferEffects(true));
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // Defer AOS init to idle time to minimize main-thread work before LCP
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
        disable: typeof window !== 'undefined' && window.innerWidth <= 768 ? 'mobile' : false,
      });
    };
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(initAOS, { timeout: 800 });
    } else {
      setTimeout(initAOS, 1);
    }
    const refreshAOS = () => {
      requestAnimationFrame(() => {
        setTimeout(() => AOS.refresh(), 200);
      });
    };
    const debouncedRefresh = debounce(refreshAOS, 300);
    window.addEventListener('load', debouncedRefresh);
    const mainContent = document.getElementById('main-content');
    const observer = mainContent
      ? new MutationObserver(debouncedRefresh)
      : { observe: () => {}, disconnect: () => {} };
    if (mainContent) observer.observe(mainContent, { childList: true, subtree: true });
    return () => {
      window.removeEventListener('load', debouncedRefresh);
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
      {deferEffects && (
        <Suspense fallback={null}>
          <ScrollPattern />
          <ParticleCanvas />
          <CustomCursor />
        </Suspense>
      )}
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
          <TrustedBy />
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

