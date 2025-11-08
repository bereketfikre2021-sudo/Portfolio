import React, { lazy, Suspense, useEffect } from 'react';
import { ModalProvider } from './context/ModalContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import ScrollProgress from './components/ScrollProgress';
import ScrollPattern from './components/ScrollPattern';
import ParticleCanvas from './components/ParticleCanvas';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';
import PortfolioModal from './components/PortfolioModal';
import CaseStudyModal from './components/CaseStudyModal';
import BlogModal from './components/BlogModal';
import ServicesModal from './components/ServicesModal';
import FormModals from './components/FormModals';
import PrivacyTermsModal from './components/PrivacyTermsModal';

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
  // Performance optimization: Preload critical resources
  useEffect(() => {
    // Preload critical images
    const preloadImages = [
      '/assets/Bereket-Fikre-1.webp',
      '/assets/Logo.svg'
    ];
    
    preloadImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Register service worker for PWA (if available)
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  return (
    <ModalProvider>
      <div className="App">
        {/* Skip to main content link for accessibility */}
        <a href="#main-content" className="skip-to-main-content">
          Skip to main content
        </a>
        <ScrollProgress />
        <ScrollPattern />
        <ParticleCanvas />
        <CustomCursor />
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
        <PortfolioModal />
        <CaseStudyModal />
        <BlogModal />
        <ServicesModal />
        <FormModals />
        <PrivacyTermsModal />
      </div>
    </ModalProvider>
  );
}

export default App;

