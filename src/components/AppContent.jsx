import React, { lazy, Suspense, useEffect, useContext, useState, useRef } from 'react';
import { ModalContext } from '../context/ModalContext';
import Navigation from './Navigation';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Process from './Process';
import Portfolio from './Portfolio';
import FitnessAppFloatingButton from './FitnessAppButton';
import PwaInstallPrompt from './PwaInstallPrompt';
import ScrollProgress from './ScrollProgress';
import KeyboardShortcuts from './KeyboardShortcuts';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

// Defer non-critical visual effects to not block LCP
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
const Insights = lazy(() => import('./Insights'));
const Partners = lazy(() => import('./Partners'));
const FAQ = lazy(() => import('./FAQ'));
const Contact = lazy(() => import('./Contact'));
const Footer = lazy(() => import('./Footer'));
const BottomNav = lazy(() => import('./BottomNav'));

// Loading fallback — minimal placeholder to prevent layout shift
const LoadingFallback = () => (
  <section id="insights" className="insights case-studies" style={{ minHeight: '400px' }}>
    <div className="container">
      <div className="section-intro">
        <span className="section-number">05</span>
        <div className="section-header">
          <span className="section-label">Design Insights</span>
          <h2 className="section-title">
            <span className="title-main">Project</span>
            <span className="title-accent">Insights</span>
          </h2>
        </div>
      </div>
    </div>
  </section>
);

// Debounce helper
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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  // Defer decorative effects until after first paint to prioritize LCP and FCP
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setDeferEffects(true));
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Lazy-load AOS to reduce main bundle and parse time; init in idle to avoid blocking LCP
  const aosRef = useRef(null);
  useEffect(() => {
    const initAOS = () => {
      // Dynamically import both AOS and its CSS together so neither blocks the main thread
      Promise.all([
        import('aos'),
        import('aos/dist/aos.css'),
      ]).then(([{ default: AOS }]) => {
        aosRef.current = AOS;
        AOS.init({
          duration: 700,
          easing: 'ease-out-cubic',
          once: true,
          offset: 80,
          disable: () => {
            if (typeof window === 'undefined') return false;
            try {
              if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
            } catch (e) { /* ignore */ }
            return window.innerWidth <= 768;
          },
        });
      });
    };
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(initAOS, { timeout: 800 });
    } else {
      setTimeout(initAOS, 1);
    }
    const refreshAOS = () => {
      requestAnimationFrame(() => {
        setTimeout(() => aosRef.current?.refresh(), 200);
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
      <ScrollProgress />
      <PwaInstallPrompt />
      <FitnessAppFloatingButton />
      {deferEffects && !prefersReducedMotion && (
        <Suspense fallback={null}>
          <CustomCursor />
        </Suspense>
      )}
      <Navigation />
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <Process />
        <Portfolio />
        <Suspense fallback={<LoadingFallback />}>
          <Insights />
        </Suspense>
        <Suspense fallback={null}>
          <Partners />
          <FAQ />
          <Contact />
          <Footer />
          <BottomNav />
        </Suspense>
      </main>
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

