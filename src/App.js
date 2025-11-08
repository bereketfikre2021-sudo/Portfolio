import React, { lazy, Suspense } from 'react';
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

// Lazy load below-the-fold components to reduce initial DOM size
const CaseStudies = lazy(() => import('./components/CaseStudies'));
const Blog = lazy(() => import('./components/Blog'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const TrustedBy = lazy(() => import('./components/TrustedBy'));
const FAQ = lazy(() => import('./components/FAQ'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const BottomNav = lazy(() => import('./components/BottomNav'));

function App() {
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
        <Suspense fallback={null}>
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
      </div>
    </ModalProvider>
  );
}

export default App;

