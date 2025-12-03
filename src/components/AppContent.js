import React, { lazy, Suspense, useEffect, useContext } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ModalContext } from '../context/ModalContext';
import Navigation from './Navigation';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Portfolio from './Portfolio';
import ScrollProgress from './ScrollProgress';
import ScrollToTop from './ScrollToTop';
import FloatingQuoteButton from './FloatingQuoteButton';
import KeyboardShortcuts from './KeyboardShortcuts';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

// Defer non-critical visual effects to not block LCP
const ScrollPattern = lazy(() => import('./ScrollPattern'));
const ParticleCanvas = lazy(() => import('./ParticleCanvas'));
const CustomCursor = lazy(() => import('./CustomCursor'));

// Lazy load modals - they're not needed until user interaction
const PortfolioModal = lazy(() => import('./PortfolioModal'));
const BlogModal = lazy(() => import('./BlogModal'));
const ServicesModal = lazy(() => import('./ServicesModal'));
const FormModals = lazy(() => import('./FormModals'));
const PrivacyTermsModal = lazy(() => import('./PrivacyTermsModal'));
const ProjectRequestModal = lazy(() => import('./ProjectRequestModal'));
const LightboxGallery = lazy(() => import('./LightboxGallery'));

// Lazy load below-the-fold components to reduce initial bundle size and improve performance
const Blog = lazy(() => import('./Blog'));
const Testimonials = lazy(() => import('./Testimonials'));
const TrustedBy = lazy(() => import('./TrustedBy'));
const FAQ = lazy(() => import('./FAQ'));
const Contact = lazy(() => import('./Contact'));
const Footer = lazy(() => import('./Footer'));
const BottomNav = lazy(() => import('./BottomNav'));

// Loading fallback component
const LoadingFallback = () => null;

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
      <KeyboardShortcuts />
      <Suspense fallback={null}>
        <PortfolioModal />
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

