import React, { lazy, Suspense, useEffect, useContext, useState, useRef } from 'react';
import { ModalContext } from '../context/ModalContext';
import Navigation from './Navigation';
import Hero from './Hero';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { startSession, trackSectionView } from '../utils/tracker';

// Defer non-critical visual effects to not block LCP
const CustomCursor = lazy(() => import('./CustomCursor'));

// Lazy load everything below the fold — improves FCP/LCP dramatically
const About       = lazy(() => import('./About'));
const Services    = lazy(() => import('./Services'));
const Process     = lazy(() => import('./Process'));
const Portfolio   = lazy(() => import('./Portfolio'));
const Insights    = lazy(() => import('./Insights'));
const Partners    = lazy(() => import('./Partners'));
const FAQ         = lazy(() => import('./FAQ'));
const Contact     = lazy(() => import('./Contact'));
const Footer      = lazy(() => import('./Footer'));
const BottomNav   = lazy(() => import('./BottomNav'));

// Lazy load modals - they're not needed until user interaction
const PortfolioModal      = lazy(() => import('./PortfolioModal'));
const CaseStudyModal      = lazy(() => import('./CaseStudyModal'));
const BlogModal           = lazy(() => import('./BlogModal'));
const ServicesModal       = lazy(() => import('./ServicesModal'));
const FormModals          = lazy(() => import('./FormModals'));
const PrivacyTermsModal   = lazy(() => import('./PrivacyTermsModal'));
const ProjectRequestModal = lazy(() => import('./ProjectRequestModal'));
const LightboxGallery     = lazy(() => import('./LightboxGallery'));

// Lazy load non-critical UI
const ScrollProgress      = lazy(() => import('./ScrollProgress'));
const PwaInstallPrompt    = lazy(() => import('./PwaInstallPrompt'));
const KeyboardShortcuts   = lazy(() => import('./KeyboardShortcuts'));
const FitnessAppFloatingButton = lazy(() => import('./FitnessAppButton'));

// Minimal skeleton — prevents layout shift while lazy sections load
const SectionSkeleton = () => (
  <section style={{ minHeight: '30vh' }} aria-hidden="true" />
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

  // ── Start analytics session on mount ──────────────────────────────────────
  useEffect(() => { startSession(); }, []);

  // ── Section tracking via IntersectionObserver ──────────────────────────────
  useEffect(() => {
    const SECTIONS = ['home','about','services','portfolio','insights','partners','faq','contact'];
    const observed = new Set();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        const id = target.id;
        if (isIntersecting && !observed.has(id)) {
          observed.add(id);
          trackSectionView(id);
        }
      });
    }, { threshold: 0.3 });
    // Wait for sections to render
    const timer = setTimeout(() => {
      SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 1000);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, []);

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

  // Lazy-load AOS only on desktop — mobile doesn't use it, no point downloading 40 KB
  const aosRef = useRef(null);
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || reducedMotion) return; // skip entirely — saves 15 KB JS + 26 KB CSS

    const initAOS = () => {
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
        });
      });
    };

    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(initAOS, { timeout: 800 });
    } else {
      setTimeout(initAOS, 100);
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

      {/* Non-blocking utility UI — defer until after first paint */}
      <Suspense fallback={null}>
        <ScrollProgress />
        <PwaInstallPrompt />
        <FitnessAppFloatingButton />
        <KeyboardShortcuts />
      </Suspense>

      {deferEffects && !prefersReducedMotion && (
        <Suspense fallback={null}>
          <CustomCursor />
        </Suspense>
      )}

      {/* Navigation is critical — render eagerly */}
      <Navigation />

      <main id="main-content">
        {/* Hero is critical — render eagerly */}
        <Hero />

        {/* Below-fold sections — each in its own Suspense so they load independently */}
        <Suspense fallback={<SectionSkeleton />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Services />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Process />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Portfolio />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
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

      {/* Modals — only loaded on demand */}
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

