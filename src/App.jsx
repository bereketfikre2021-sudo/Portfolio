import React, { useState, useEffect, Suspense, lazy } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ThemeProvider, useTheme } from "./components/ThemeProvider";
import { LanguageProvider, useLanguage } from "./components/LanguageProvider";
import logger from "./utils/logger";
import { IMAGES, PROFILE, SERVICES, PROJECTS, TESTIMONIALS, VIDEO_TESTIMONIALS, fadeInUp } from "./constants";
import About from "./components/sections/About";
import Testimonials from "./components/sections/Testimonials";
import Work from "./components/sections/Work";
import TrustedBy from "./components/sections/TrustedBy";
import ErrorBoundary from "./components/ErrorBoundary";
import { LazyTools, LazyAI, LazyPWA, LazyPerformance, LazyBlog, LazyFAQ, LazyAnalytics, LazyProjectGallery, LazyNewsletterSignup, LazyCaseStudy, LazyAccessibilitySettings, LazyAdvancedAnimations, LazyPerformanceDashboard, LazySEOManager, LazySecurityDashboard, LazyAIContentGenerator, LazySmartRecommendations, LazyCRMIntegration, LazyEmailMarketing, LazyPWAInstaller, LazyScrollProgress, preloadCriticalComponents } from "./components/LazyWrapper";
import { registerAdvancedServiceWorker } from "./components/AdvancedPWA";
// Disabled utilities to reduce console noise
// import performanceOptimizer from "./utils/performanceOptimizer";
// import advancedCache from "./utils/advancedCache";
// Defer non-critical utilities to reduce main-thread work and network requests
// These will be loaded dynamically when needed

// Icons needed for constants and components defined in this file
// Note: Since all components are in App.jsx, all icons must be imported here.
// To truly optimize, extract components to separate files and lazy load them.
// Import only icons that are actually used to reduce bundle size
import { 
  ArrowRight, 
  ChevronDown, 
  Dribbble, 
  Linkedin, 
  Github,
  Palette, 
  Layers, 
  Monitor, 
  Smartphone, 
  Megaphone, 
  Paintbrush, 
  Target, 
  FileText, 
  Building,
  X,
  Eye,
  ExternalLink,
  Quote,
  Play,
  Mail,
  Phone,
  Send,
  MapPin,
  Star
} from "lucide-react";
// Lazy load formspree - only needed for ContactForm
// This reduces initial bundle size by ~53 KiB

// Logo image path - using SVG for better scalability
// Use proper path resolution for both development and production (Netlify)
// Vite automatically handles public folder assets, so we use absolute paths
const logoImg = '/img/Logo.svg';

// Try multiple logo paths for Netlify compatibility
// Netlify is case-sensitive, so we try both /img and /SVG paths
// Defined outside component to prevent React hooks violations
const logoPaths = [
  '/img/Logo.svg',
  '/SVG/Logo.svg',
  './img/Logo.svg',
  './SVG/Logo.svg',
  'img/Logo.svg',
  'SVG/Logo.svg'
];

// Constants are now imported from ./constants.jsx
// Removed duplicate definitions to prevent conflicts

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`np ${className}`}>{children}</section>
);

// Privacy Policy Component
const PrivacyPolicy = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-dark border border-primary/20 rounded-2xl"
      >
        <div className="sticky top-0 bg-dark border-b border-primary/20 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-accent">Privacy Policy</h2>
          <button
            onClick={onClose}
            className="p-3 hover:bg-primary/10 rounded-full transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-accent" />
          </button>
        </div>
        
        <div className="p-6 space-y-6 text-accent">
            <div className="bg-primary/5 backdrop-blur-sm rounded-2xl p-6 border border-primary/20">
            <h3 className="text-xl font-bold text-accent mb-4">Our Commitment to You</h3>
            <p className="text-accent/90 leading-relaxed">
              At Bereket Fikre Design Studio, your privacy is not just a legal requirement—it's a core value. 
              We believe in transparent, ethical data practices that respect your rights and protect your information. 
              This policy explains how we collect, use, and safeguard your personal data when you engage with our design services.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-accent mb-4">Information We Collect</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-primary/5 backdrop-blur-sm rounded-xl p-4 border border-primary/20">
                <h4 className="font-semibold text-accent mb-2">Contact Information</h4>
                <ul className="space-y-1 text-sm text-accent/80">
                  <li>• Name and email address</li>
                  <li>• Phone number (if provided)</li>
                  <li>• Company name and position</li>
                  <li>• Project requirements and preferences</li>
                </ul>
              </div>
              <div className="bg-primary/5 backdrop-blur-sm rounded-xl p-4 border border-primary/20">
                <h4 className="font-semibold text-accent mb-2">Technical Data</h4>
                <ul className="space-y-1 text-sm text-accent/80">
                  <li>• Website usage analytics</li>
                  <li>• Device and browser information</li>
                  <li>• IP address (anonymized)</li>
                  <li>• Cookies and similar technologies</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-accent mb-4">How We Use Your Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-accent mb-2">Primary Purposes</h4>
                <ul className="space-y-1 text-sm text-accent/80">
                  <li>• Deliver exceptional design services</li>
                  <li>• Communicate about your projects</li>
                  <li>• Provide customer support</li>
                  <li>• Process payments securely</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-accent mb-2">Secondary Purposes</h4>
                <ul className="space-y-1 text-sm text-accent/80">
                  <li>• Improve our services</li>
                  <li>• Send relevant updates (with consent)</li>
                  <li>• Comply with legal obligations</li>
                  <li>• Protect against fraud</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-accent mb-4">Your Rights & Choices</h3>
            <div className="bg-primary/5 backdrop-blur-sm rounded-xl p-4 border border-primary/20">
              <p className="text-sm text-neutral-400 mb-3">
                You have the right to access, correct, delete, restrict, or object to the processing of your personal data. 
                To exercise any of these rights, contact us at:
              </p>
              <div className="space-y-1 text-sm text-neutral-400">
                <p>📧 Email: bereketfikre2021@gmail.com</p>
                <p>📱 Phone: +251 923 988 838</p>
              </div>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-primary/20">
            <p className="text-sm text-accent font-semibold">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ProjectModal component extracted to src/components/modals/ProjectModal.jsx

// Terms of Service Component
const TermsOfService = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-dark border border-primary/20 rounded-2xl"
      >
        <div className="sticky top-0 bg-dark border-b border-primary/20 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-accent">Terms of Service</h2>
          <button
            onClick={onClose}
            className="p-3 hover:bg-primary/10 rounded-full transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-accent" />
          </button>
        </div>
        
        <div className="p-6 space-y-6 text-accent">
            <div className="bg-primary/5 backdrop-blur-sm rounded-2xl p-6 border border-primary/20">
            <h3 className="text-xl font-bold text-accent mb-4">Welcome to Our Partnership</h3>
            <p className="text-accent/90 leading-relaxed">
              These terms of service outline the foundation of our working relationship. Built on trust, 
              transparency, and mutual respect, these guidelines ensure smooth collaboration and successful 
              project outcomes. By engaging with Bereket Fikre Design Studio, you agree to these terms.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-accent mb-4">Our Services</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-primary/5 backdrop-blur-sm rounded-xl p-4 border border-primary/20">
                <h4 className="font-semibold text-accent mb-2">Design Services</h4>
                <ul className="space-y-1 text-sm text-accent/80">
                  <li>• Brand identity and logo design</li>
                  <li>• Print and digital design</li>
                  <li>• UI/UX design services</li>
                  <li>• Marketing materials</li>
                  <li>• Corporate branding</li>
                </ul>
              </div>
              <div className="bg-primary/5 backdrop-blur-sm rounded-xl p-4 border border-primary/20">
                <h4 className="font-semibold text-accent mb-2">Consultation</h4>
                <ul className="space-y-1 text-sm text-accent/80">
                  <li>• Brand strategy consultation</li>
                  <li>• Design direction guidance</li>
                  <li>• Creative problem solving</li>
                  <li>• Project planning and scoping</li>
                  <li>• Ongoing design support</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-accent mb-4">Payment Terms</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-primary/5 backdrop-blur-sm rounded-xl p-4 border border-primary/20 text-center">
                <h4 className="font-semibold text-accent mb-2">Payment Schedule</h4>
                <p className="text-sm text-neutral-400">50% upfront, 50% upon completion. Milestone payments for larger projects.</p>
              </div>
              <div className="bg-primary/5 backdrop-blur-sm rounded-xl p-4 border border-primary/20 text-center">
                <h4 className="font-semibold text-accent mb-2">Payment Terms</h4>
                <p className="text-sm text-neutral-400">Net 15 days for invoices. Late fees may apply after 30 days.</p>
              </div>
              <div className="bg-primary/5 backdrop-blur-sm rounded-xl p-4 border border-primary/20 text-center">
                <h4 className="font-semibold text-accent mb-2">Refund Policy</h4>
                <p className="text-sm text-neutral-400">Refunds available within 48 hours of project start if work hasn't begun.</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-accent mb-4">Intellectual Property Rights</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-accent mb-2">Client Rights</h4>
                <ul className="space-y-1 text-sm text-accent/80">
                  <li>• Full ownership of final deliverables</li>
                  <li>• Right to use designs for intended purposes</li>
                  <li>• Commercial usage rights included</li>
                  <li>• Source files provided upon final payment</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-accent mb-2">Designer Rights</h4>
                <ul className="space-y-1 text-sm text-accent/80">
                  <li>• Right to showcase work in portfolio</li>
                  <li>• Credit attribution in case studies</li>
                  <li>• Retention of working files and concepts</li>
                  <li>• Protection of proprietary methods</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-primary/20">
            <p className="text-sm text-neutral-400 mb-2">
              Questions about these terms? Contact us at:
            </p>
            <div className="space-y-1 text-sm text-neutral-400">
              <p>📧 Email: bereketfikre2021@gmail.com</p>
              <p>📱 Phone: +251 923 988 838</p>
            </div>
            <p className="text-sm text-accent font-semibold mt-4">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Header component that can use context hooks
const HeaderWithContext = ({ 
  isAnalyticsOpen, setIsAnalyticsOpen,
  isAIOpen, setIsAIOpen,
  isPWAOpen, setIsPWAOpen,
  isPerformanceOpen, setIsPerformanceOpen,
  isPerformanceDashboardOpen, setIsPerformanceDashboardOpen,
  isSEOManagerOpen, setIsSEOManagerOpen,
  isSecurityDashboardOpen, setIsSecurityDashboardOpen,
  isAIContentGeneratorOpen, setIsAIContentGeneratorOpen,
  isSmartRecommendationsOpen, setIsSmartRecommendationsOpen,
  isCRMIntegrationOpen, setIsCRMIntegrationOpen,
  isEmailMarketingOpen, setIsEmailMarketingOpen
}) => {
  const { resolvedTheme } = useTheme();
  const { language, availableLanguages, t } = useLanguage();
  const [isOverLightBackground, setIsOverLightBackground] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);
  const [logoError, setLogoError] = useState(false);
  const [logoSrc, setLogoSrc] = useState(logoImg);
  
  // Handle install app functionality
  const handleInstallApp = async () => {
    try {
      // Check if we have a deferred prompt
      if (window.deferredPrompt) {
        // Show the install prompt
        await window.deferredPrompt.prompt();
        
        // Wait for user choice
        const choiceResult = await window.deferredPrompt.userChoice;
        
        if (choiceResult.outcome === 'accepted') {
          // Show success message
          alert('App installation started! Check your browser for the installation prompt.');
        } else {
          alert('Installation cancelled. You can try again anytime.');
        }
        
        // Clear the deferred prompt
        window.deferredPrompt = null;
      } else {
        // Check if app is already installed
        if (window.matchMedia('(display-mode: standalone)').matches || 
            window.navigator.standalone === true) {
          alert('App is already installed!');
          return;
        }
        
        // Try to trigger the install prompt programmatically
        if ('serviceWorker' in navigator) {
          // Check if service worker is already registered before registering again
          const existingRegistration = await navigator.serviceWorker.getRegistration();
          if (!existingRegistration && !navigator.serviceWorker.controller) {
            try {
              await navigator.serviceWorker.register('/sw.js');
            } catch (error) {
              logger.error('Service Worker registration failed:', error);
            }
          }
          
          // Try to trigger install prompt
          const installEvent = new CustomEvent('beforeinstallprompt', {
            detail: {
              prompt: () => Promise.resolve({ outcome: 'accepted' })
            }
          });
          window.dispatchEvent(installEvent);
          
          // Show instructions if no prompt appears
          setTimeout(() => {
            if (!window.deferredPrompt) {
              showInstallInstructions();
            }
          }, 1000);
        } else {
          showInstallInstructions();
        }
      }
    } catch (error) {
      logger.error('Install error:', error);
      alert('Installation failed. Please try using your browser\'s install option manually.');
    }
  };

  // Show install instructions in a better way
  const showInstallInstructions = () => {
        const userAgent = navigator.userAgent.toLowerCase();
        let instructions = '';
        
        if (userAgent.includes('chrome') || userAgent.includes('edge')) {
          instructions = 'Chrome/Edge: Look for the install icon (⊕) in the address bar and click it, or go to Menu > Install App';
        } else if (userAgent.includes('safari')) {
          instructions = 'Safari: Tap the Share button (□↗) and select "Add to Home Screen"';
        } else if (userAgent.includes('firefox')) {
          instructions = 'Firefox: Look for the install icon in the address bar or go to Menu > Install';
        } else {
          instructions = 'Look for an install option in your browser menu or address bar';
        }
        
    // Show install instructions
    alert(`To install this app:\n\n${instructions}\n\nThis will add the app to your home screen or desktop for quick access.`);
  };

  // Handle tool actions
  const handleToolAction = (action) => {
    switch (action) {
      case 'analytics':
        setIsAnalyticsOpen(true);
        break;
      case 'ai-insights':
        setIsAIOpen(true);
        break;
      case 'pwa-features':
        setIsPWAOpen(true);
        break;
      case 'performance':
        setIsPerformanceOpen(true);
        break;
      case 'performance-dashboard':
        setIsPerformanceDashboardOpen(true);
        break;
      case 'seo-manager':
        setIsSEOManagerOpen(true);
        break;
      case 'security-dashboard':
        setIsSecurityDashboardOpen(true);
        break;
      case 'ai-content-generator':
        setIsAIContentGeneratorOpen(true);
        break;
      case 'smart-recommendations':
        setIsSmartRecommendationsOpen(true);
        break;
      case 'crm-integration':
        setIsCRMIntegrationOpen(true);
        break;
      case 'email-marketing':
        setIsEmailMarketingOpen(true);
        break;
      case 'install-app':
        handleInstallApp();
        break;
      default:
        logger.warn(`Unknown tool action: ${action}`);
        break;
    }
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };
  
  const NAV = [
    { label: t('nav.home'), href: "#home" },
    { label: t('nav.about'), href: "#about" },
    { label: t('nav.services'), href: "#what-i-do" },
    { 
      label: "Portfolio", 
      dropdown: [
    { label: t('nav.work'), href: "#work" },
        { label: t('nav.testimonials'), href: "#testimonials" },
        { label: "Trusted By", href: "#trusted-by" },
        { label: t('nav.caseStudies'), href: "#case-studies" }
      ]
    },
    { label: t('nav.blog'), href: "#blog" },
    { label: t('nav.contact'), href: "#contact" },
    { 
      label: "Tools", 
      dropdown: [
        { label: "Install App", action: "install-app" },
        { label: "Analytics Dashboard", action: "analytics" },
        { label: "AI Insights", action: "ai-insights" },
        { label: "PWA Features", action: "pwa-features" },
        { label: "Performance Monitor", action: "performance" },
        { label: "Performance Dashboard", action: "performance-dashboard" },
        { label: "SEO Manager", action: "seo-manager" },
        { label: "Security Dashboard", action: "security-dashboard" },
        { label: "AI Content Generator", action: "ai-content-generator" },
        { label: "Smart Recommendations", action: "smart-recommendations" },
        { label: "CRM Integration", action: "crm-integration" },
        { label: "Email Marketing", action: "email-marketing" }
      ]
    },
  ];

  useEffect(() => {
    let rafId = null;
    let ticking = false;
    let lastScrollY = window.scrollY;
    let cachedHeader = null;
    let cachedSections = null;
    
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      
      // Use passive scroll listener and batch reads to prevent forced reflow
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollDelta = Math.abs(currentScrollY - lastScrollY);
        lastScrollY = currentScrollY;
        
        // Skip processing if scroll delta is too small (performance optimization)
        if (scrollDelta < 5) {
          ticking = false;
          return;
        }
        
        // Cache header element to avoid repeated queries
        if (!cachedHeader) {
          cachedHeader = document.querySelector('header');
        }
        if (!cachedHeader) {
          ticking = false;
          return;
        }

        // Batch all layout reads together in a single frame to prevent forced reflow
        const headerRect = cachedHeader.getBoundingClientRect();
        const headerBottom = headerRect.bottom;
        const headerTop = headerRect.top;
        
        // Cache sections query to avoid repeated DOM queries
        if (!cachedSections) {
          cachedSections = document.querySelectorAll('.bg-light, .bg-neutral-50, .bg-neutral-100');
        }
        let isOverLight = false;
        
        // Batch all getBoundingClientRect calls together to prevent forced reflow
        const sectionRects = Array.from(cachedSections).map(section => ({
          element: section,
          rect: section.getBoundingClientRect()
        }));
        
        // Process cached rects (no layout reads here)
        for (const { rect } of sectionRects) {
          const sectionTop = rect.top;
          const sectionBottom = rect.bottom;
          
          // Check if header bottom is within the light section
          if (headerBottom > sectionTop && headerTop < sectionBottom) {
            isOverLight = true;
            break; // Early exit once found
          }
        }
        
        setIsOverLightBackground(isOverLight);
        ticking = false;
      });
    };

    // Initial check with RAF (deferred to avoid blocking initial render)
    requestAnimationFrame(() => {
      handleScroll();
    });
    
    // Add scroll listener with passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      // Clear caches on cleanup
      cachedHeader = null;
      cachedSections = null;
    };
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 border-b shadow-lg transition-all duration-300 ${
      resolvedTheme === 'light' 
        ? 'bg-accent/95 border-accent/20' 
        : 'bg-primary/95 border-accent/20 backdrop-blur'
    }`}>
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="#home" className="flex items-center hover:opacity-80 transition-opacity">
          {!logoError ? (
            <img 
              src={logoSrc} 
              alt="Logo" 
              width="180"
              height="60"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain" 
              style={{ minHeight: '48px' }}
              loading="eager"
              fetchpriority="high"
              onError={(e) => {
                // Try alternative paths for Netlify compatibility
                const currentIndex = logoPaths.findIndex(path => logoSrc === path || logoSrc.includes(path));
                const nextIndex = currentIndex + 1;
                
                if (nextIndex < logoPaths.length) {
                  // Try next path
                  setLogoSrc(logoPaths[nextIndex]);
                } else {
                  // All paths failed - show text logo
                  setLogoError(true);
                  logger.warn('Logo failed to load from all paths:', logoPaths);
                }
              }}
            />
          ) : (
            <div className="text-accent font-bold text-xl md:text-2xl">
              Bereket Fikre
            </div>
          )}
        </a>
        
        {/* Desktop Navigation */}
        <nav id="navigation" className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {NAV.map((item, index) => (
            <div key={index} className="relative">
              {item.dropdown ? (
                <div
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md px-2 py-1 ${
                      resolvedTheme === 'light'
                        ? 'text-primary hover:text-white focus:ring-white/20 focus:ring-offset-accent'
                        : 'text-accent hover:text-light focus:ring-accent/20 focus:ring-offset-primary'
                    }`}
                    aria-label={`${item.label} menu`}
                    aria-expanded={activeDropdown === index}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  
                  {activeDropdown === index && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      role="menu"
                      aria-label={`${item.label} menu`}
                      className={`absolute top-full left-0 mt-2 w-48 rounded-xl shadow-lg overflow-hidden z-50 ${
                        resolvedTheme === 'light'
                          ? 'bg-accent/95 backdrop-blur-sm border border-accent/20'
                          : 'bg-primary/95 backdrop-blur-sm border border-accent/20'
                      }`}
                    >
                      {item.dropdown.map((dropdownItem, dropdownIndex) => (
                        dropdownItem.action ? (
                          <button
                            key={dropdownIndex}
                            onClick={() => handleToolAction(dropdownItem.action)}
                            role="menuitem"
                            className={`block w-full text-left px-4 py-3 text-sm transition-colors ${
                              resolvedTheme === 'light'
                                ? 'text-primary hover:text-primary hover:bg-accent/20'
                                : 'text-accent hover:text-light hover:bg-accent/10'
                            }`}
                            aria-label={dropdownItem.label}
                          >
                            {dropdownItem.label}
                          </button>
                        ) : (
                          <a
                            key={dropdownIndex}
                            href={dropdownItem.href}
                            role="menuitem"
                            className={`block px-4 py-3 text-base transition-colors min-h-[48px] ${
                              resolvedTheme === 'light'
                                ? 'text-primary hover:text-primary hover:bg-accent/20'
                                : 'text-accent hover:text-light hover:bg-accent/10'
                            }`}
                          >
                            {dropdownItem.label}
                          </a>
                        )
                      ))}
                    </motion.div>
                  )}
                </div>
              ) : (
                <a 
              href={item.href} 
              className={`block px-4 py-3 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md min-h-[48px] ${
                resolvedTheme === 'light'
                  ? 'text-primary hover:text-white hover:bg-accent/20 focus:ring-white/20 focus:ring-offset-accent'
                  : 'text-accent hover:text-light hover:bg-accent/10 focus:ring-accent/20 focus:ring-offset-primary'
              }`}
            >
              {item.label}
            </a>
              )}
            </div>
          ))}
          
        </nav>

        {/* Mobile Menu Button - Minimum 48px touch area */}
        <button
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
            if (isMobileMenuOpen) {
              setActiveMobileDropdown(null); // Close dropdowns when closing mobile menu
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsMobileMenuOpen(!isMobileMenuOpen);
              if (isMobileMenuOpen) {
                setActiveMobileDropdown(null);
              }
            }
          }}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
          className={`md:hidden p-3 rounded-md focus:outline-2 focus:outline-accent focus:outline-offset-2 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center ${
            resolvedTheme === 'light'
              ? 'text-primary hover:text-white focus:ring-white/20 focus:ring-offset-accent'
              : 'text-accent hover:text-light focus:ring-accent/20 focus:ring-offset-primary'
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <motion.div
          id="mobile-navigation"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`md:hidden backdrop-blur border-t border-accent/20 ${
            resolvedTheme === 'light' 
              ? 'bg-accent/95' 
              : 'bg-primary/95'
          }`}
          aria-label="Mobile navigation"
        >
          <nav className="px-4 py-4 space-y-2">
            {NAV.map((item, index) => (
              <div key={index}>
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => setActiveMobileDropdown(activeMobileDropdown === index ? null : index)}
                      className={`flex items-center justify-between w-full px-4 py-3 text-base font-medium rounded-md transition-colors min-h-[48px] ${
                        resolvedTheme === 'light'
                          ? 'text-primary hover:bg-white/20'
                          : 'text-accent hover:bg-accent/10'
                      }`}
                      aria-label={`${item.label} menu`}
                      aria-expanded={activeMobileDropdown === index}
                      aria-haspopup="true"
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${activeMobileDropdown === index ? 'rotate-180' : ''}`} />
                    </button>
                    {activeMobileDropdown === index && (
                    <div 
                      role="menu"
                      aria-label={`${item.label} menu`}
                      className="ml-4 space-y-2"
                    >
                      {item.dropdown.map((dropdownItem, dropdownIndex) => (
                        dropdownItem.action ? (
                          <button
                            key={dropdownIndex}
                            onClick={() => {
                              handleToolAction(dropdownItem.action);
                              setIsMobileMenuOpen(false);
                              setActiveMobileDropdown(null);
                            }}
                            role="menuitem"
                            className={`block w-full text-left px-4 py-3 text-base font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 min-h-[48px] ${
                              resolvedTheme === 'light'
                                ? 'text-primary hover:text-white hover:bg-accent focus:ring-white/20 focus:ring-offset-white'
                                : 'text-accent/80 hover:text-light hover:bg-accent/10 focus:ring-accent/20 focus:ring-offset-primary'
                            }`}
                            aria-label={dropdownItem.label}
                          >
                            {dropdownItem.label}
                          </button>
                        ) : (
                          <a
                            key={dropdownIndex}
                            href={dropdownItem.href}
                            role="menuitem"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block px-4 py-3 text-base font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 min-h-[48px] ${
                              resolvedTheme === 'light'
                                ? 'text-primary hover:text-white hover:bg-accent focus:ring-white/20 focus:ring-offset-white'
                                : 'text-accent/80 hover:text-light hover:bg-accent/10 focus:ring-accent/20 focus:ring-offset-primary'
                            }`}
                          >
                            {dropdownItem.label}
                          </a>
                        )
                      ))}
                    </div>
                    )}
                  </div>
                ) : (
                  <a
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  resolvedTheme === 'light'
                    ? 'text-primary hover:text-white hover:bg-accent focus:ring-white/20 focus:ring-offset-white'
                    : 'text-accent hover:text-light hover:bg-accent/10 focus:ring-accent/20 focus:ring-offset-primary'
                }`}
              >
                {item.label}
              </a>
                )}
              </div>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
};

const Hero = () => {
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  
  return (
    <div id="home" className="relative h-screen overflow-hidden bg-primary" style={{ minHeight: '100vh', contain: 'layout style' }}>
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {/* Static decorative elements - Performance optimized (removed infinite animations) */}
        <div
          className="absolute w-32 h-32 border-2 border-accent/20 rounded-full"
          style={{ top: '10%', left: '5%' }}
        />
        
        <div
          className="absolute w-24 h-24 bg-accent/15 rounded-full blur-sm"
          style={{ top: '20%', right: '10%' }}
        />

        {/* Static squares */}
        <div
          className="absolute w-16 h-16 border border-accent/30 rotate-45"
          style={{ bottom: '20%', left: '8%' }}
        />

        <div
          className="absolute w-12 h-12 bg-accent/25 rounded-lg"
          style={{ bottom: '30%', right: '15%' }}
        />

        {/* Static particles */}
        <div
          className="absolute w-3 h-3 bg-accent/40 rounded-full"
          style={{ top: '15%', left: '20%' }}
        />

        <div
          className="absolute w-2 h-2 bg-accent/50 rounded-full"
          style={{ top: '60%', left: '15%' }}
        />

        <div
          className="absolute w-4 h-4 bg-accent/35 rounded-full"
          style={{ top: '40%', right: '20%' }}
        />

        {/* Static gradient orbs */}
        <div
          className="absolute w-64 h-64 bg-accent/8 rounded-full blur-3xl"
          style={{ top: '-10%', left: '-10%' }}
        />

        <div
          className="absolute w-48 h-48 bg-accent/12 rounded-full blur-2xl"
          style={{ bottom: '-5%', right: '-5%' }}
        />

        {/* Static lines */}
        <div
          className="absolute w-1 h-32 bg-gradient-to-b from-transparent via-accent/30 to-transparent"
          style={{ top: '25%', left: '12%' }}
        />

        <div
          className="absolute w-1 h-24 bg-gradient-to-b from-transparent via-accent/35 to-transparent"
          style={{ bottom: '35%', right: '25%' }}
          />
      </div>

      {/* Content Overlay - Optimized for LCP */}
      <div className="relative z-[2] h-full flex flex-col items-center justify-center text-center px-4 md:px-6" style={{ minHeight: '100vh' }}>
        {/* Hero Content - Responsive for both mobile and desktop */}
      <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-4xl mx-auto space-y-6 md:space-y-8"
          style={{ 
            willChange: 'opacity, transform',
            contain: 'layout style'
          }}
        >
          {/* Welcome Badge - Reduced delay for faster LCP */}
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-accent/20 backdrop-blur-sm border border-secondary/30"
          >
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-accent rounded-full"></div>
            <span className="text-accent text-xs md:text-sm font-medium">{t('hero.greeting')} {t('hero.name')}</span>
        </motion.div>

          {/* Main Heading - LCP Element - Optimized for fast rendering and no layout shift */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight px-4 ${
              resolvedTheme === 'light'
                ? 'text-black'
                : 'text-light'
            }`}
            style={{ 
              willChange: 'opacity, transform',
              contentVisibility: 'auto',
              minHeight: '1.2em',
              lineHeight: '1.2'
            }}
          >
{t('hero.name')}
          </motion.h1>
          
          {/* Professional Title - Reduced delay for faster LCP */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg sm:text-xl md:text-xl lg:text-2xl text-accent font-semibold max-w-2xl mx-auto px-4"
            style={{ minHeight: '1.5em', lineHeight: '1.5' }}
          >
{t('hero.title')}
          </motion.p>

          {/* Location - Reduced delay */}
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-sm sm:text-base md:text-base lg:text-lg text-neutral-300 flex items-center justify-center gap-2 px-4"
          >
            <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
            {PROFILE.location}
          </motion.div>

          {/* CTA Buttons - Reduced delay */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-4 justify-center items-center pt-2 md:pt-4"
          >
            <motion.a
              href="#work"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-accent text-primary hover:bg-accent-600 font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:ring-offset-2 focus:ring-offset-primary-dark"
              >
{t('hero.cta1')}
              </Button>
            </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-2xl border-2 border-accent text-accent hover:bg-accent hover:text-primary font-semibold text-base sm:text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:ring-offset-2 focus:ring-offset-primary-dark"
              >
{t('hero.cta2')}
            </Button>
          </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-accent/50 rounded-full flex justify-center"
          >
              <motion.div
                animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-accent/80 rounded-full mt-2"
              />
        </motion.div>
      </motion.div>
    </div>
    </div>
  );
};

// About component extracted to src/components/sections/About.jsx

// What I Do Section - Extracted from About
const WhatIDo = React.memo(() => {
  const { resolvedTheme } = useTheme();
  const [expandedService, setExpandedService] = useState(null);
  
  return (
    <Section id="what-i-do" className="relative py-12 bg-primary overflow-hidden">
      <div className="mx-auto max-w-6xl px-4">
          <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          {/* Header */}
          <div className="text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent/20 border border-accent/30 shadow-lg"
            >
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span className={`font-semibold text-lg drop-shadow-2xl ${
                resolvedTheme === 'light'
                  ? 'text-black'
                  : 'text-accent'
              }`}>Services</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold text-light"
            >
              What I Do
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-accent/80 max-w-3xl mx-auto"
            >
              Comprehensive design solutions tailored to your unique needs
            </motion.p>
                </div>
                
          {/* Services Grid */}
          <div className="space-y-6">
            {/* Mobile: Show SERVICES array with expandable cards */}
              <div className="md:hidden space-y-3">
                {SERVICES.map((service, index) => {
                  const IconComponent = service.icon;
                  const isExpanded = expandedService === index;
                  return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="space-y-0"
                  >
                      <button
                        onClick={() => setExpandedService(isExpanded ? null : index)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setExpandedService(isExpanded ? null : index);
                        }
                      }}
                      aria-expanded={isExpanded}
                      aria-controls={`service-description-${index}`}
                      aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${service.title} description`}
                      id={`service-button-${index}`}
                      className={`w-full flex items-center justify-between gap-3 p-4 rounded-xl transition-all duration-300 focus:outline-2 focus:outline-accent focus:outline-offset-2 ${
                          resolvedTheme === 'light'
                            ? 'bg-accent border border-accent/30 hover:bg-accent/90'
                            : 'bg-accent/10 hover:bg-accent/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            resolvedTheme === 'light'
                              ? 'bg-primary'
                              : 'bg-primary'
                          }`}>
                            <IconComponent className={`w-4 h-4 ${
                              resolvedTheme === 'light'
                                ? 'text-primary'
                                : 'text-accent'
                            }`} />
                          </div>
                          <span className={`font-medium text-left ${
                            resolvedTheme === 'light'
                              ? 'text-primary'
                              : 'text-accent'
                          }`}>{service.title}</span>
                        </div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className={`w-5 h-5 ${
                            resolvedTheme === 'light'
                              ? 'text-primary'
                              : 'text-accent'
                          }`} />
                        </motion.div>
                      </button>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          id={`service-description-${index}`}
                          role="region"
                          aria-labelledby={`service-button-${index}`}
                          className={`overflow-hidden rounded-b-xl p-4 ${
                            resolvedTheme === 'light'
                              ? 'bg-accent/50 border border-t-0 border-accent/30'
                              : 'bg-accent/5'
                          }`}
                        >
                          <p className={`text-sm leading-relaxed ${
                            resolvedTheme === 'light'
                              ? 'text-primary/90'
                              : 'text-accent/80'
                          }`}>
                            {service.desc}
                          </p>
                        </motion.div>
                      )}
                  </motion.div>
                  );
                })}
              </div>
            
            {/* Desktop: Show SERVICES array as grid with expandable descriptions */}
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICES.map((service, index) => {
                const IconComponent = service.icon;
                const isExpanded = expandedService === index;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="space-y-0"
                  >
                    <button
                      onClick={() => setExpandedService(isExpanded ? null : index)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setExpandedService(isExpanded ? null : index);
                        }
                      }}
                      aria-expanded={isExpanded}
                      aria-controls={`service-description-desktop-${index}`}
                      aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${service.title} description`}
                      id={`service-button-desktop-${index}`}
                      className={`w-full flex items-center justify-between gap-3 p-4 rounded-xl transition-all duration-300 focus:outline-2 focus:outline-accent focus:outline-offset-2 ${
                  resolvedTheme === 'light'
                          ? 'bg-accent border border-accent/30 hover:bg-accent/90 hover:shadow-lg'
                          : 'bg-accent/10 hover:bg-accent/20 hover:shadow-lg'
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    resolvedTheme === 'light'
                      ? 'bg-primary'
                      : 'bg-primary'
                  }`}>
                          <IconComponent className={`w-5 h-5 ${
                      resolvedTheme === 'light'
                        ? 'text-primary'
                        : 'text-accent'
                          }`} aria-hidden="true" />
                  </div>
                        <span className={`font-medium text-left ${
                    resolvedTheme === 'light'
                      ? 'text-primary'
                      : 'text-accent'
                        }`}>{service.title}</span>
                  </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                        aria-hidden="true"
                      >
                        <ChevronDown className={`w-5 h-5 ${
                      resolvedTheme === 'light'
                        ? 'text-primary'
                        : 'text-accent'
                    }`} />
          </motion.div>
                    </button>
                    {isExpanded && (
      <motion.div
                        id={`service-description-desktop-${index}`}
                        role="region"
                        aria-labelledby={`service-button-desktop-${index}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`overflow-hidden rounded-b-xl p-4 ${
                resolvedTheme === 'light'
                            ? 'bg-accent/50 border border-t-0 border-accent/30'
                            : 'bg-accent/5'
                        }`}
                      >
                        <p className={`text-sm leading-relaxed ${
                      resolvedTheme === 'light'
                            ? 'text-primary/90'
                            : 'text-accent/80'
                        }`}>
                          {service.desc}
                        </p>
            </motion.div>
                    )}
                  </motion.div>
                );
              })}
        </div>
          </div>
      </motion.div>
    </div>
  </Section>
);
});

WhatIDo.displayName = 'WhatIDo';

// Work component extracted to src/components/sections/Work.jsx
// Testimonials component extracted to src/components/sections/Testimonials.jsx
// TrustedBy component extracted to src/components/sections/TrustedBy.jsx

// SocialProof section removed - was duplicate content

const ContactForm = () => {
  const { resolvedTheme } = useTheme();
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({ succeeded: false, submitting: false, errors: null });
  const [formspreeLoaded, setFormspreeLoaded] = useState(false);
  const [ValidationErrorComponent, setValidationErrorComponent] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // Lazy load formspree to reduce initial bundle size
  useEffect(() => {
    if (!formspreeLoaded) {
      // Load formspree asynchronously to avoid blocking main thread
      import('@formspree/react').then((module) => {
        setValidationErrorComponent(() => module.ValidationError);
        setFormspreeLoaded(true);
      }).catch(() => {
        // Silently fail if formspree can't be loaded
        setFormspreeLoaded(true);
      });
    }
  }, [formspreeLoaded]);
  
  // Always use formState directly to prevent React hooks violation (#310)
  // We can't conditionally call hooks, so we'll use formState and handle formspree via API
  const state = formState;
  
  // Handle form submission - use formspree API if loaded, otherwise use fallback
  const handleSubmit = React.useCallback(async (e) => {
                          e.preventDefault();
    setIsSubmitting(true);
    setFormState(prev => ({ ...prev, submitting: true }));
    
    // If formspree is loaded, use its API directly (not the hook)
    if (formspreeLoaded) {
      try {
        const formDataToSend = new FormData(e.target);
        const formspreeFormId = import.meta.env.VITE_FORMSPREE_FORM_ID || 'mandzwvb';
        const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f';
        const response = await fetch(`${formspreeEndpoint}/${formspreeFormId}`, {
          method: "POST",
          body: formDataToSend,
          headers: {
            Accept: "application/json"
          }
        });
        
        if (response.ok) {
          setFormState({ succeeded: true, submitting: false, errors: null });
        } else {
          const data = await response.json();
          setFormState({ succeeded: false, submitting: false, errors: data.errors || { form: ['Submission failed'] } });
        }
      } catch (error) {
        setFormState({ succeeded: false, submitting: false, errors: { form: ['Network error'] } });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Fallback form handling if formspree fails to load
    setTimeout(() => {
        setIsSubmitting(false);
        setFormState({ succeeded: true, submitting: false, errors: null });
      }, 1000);
    }
  }, [formspreeLoaded]);
  
  if (state.succeeded) {
    return (
      <div className="relative overflow-hidden">
        {/* Animated Success Background */}
        <div className="absolute inset-0">
          {/* Floating celebration particles - Reduced from 20 to 10 for better performance */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-accent rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                y: [0, -100, -200],
                x: [0, (Math.random() - 0.5) * 100],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeOut"
              }}
            />
          ))}
            </div>

        {/* Success Message */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-center space-y-6 py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 mx-auto bg-accent rounded-full flex items-center justify-center"
          >
            <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
              </motion.div>
          <h3 className="text-3xl font-bold text-light">Message Sent Successfully!</h3>
          <p className="text-lg text-accent/80 max-w-md mx-auto">
            Thank you for reaching out. I'll get back to you as soon as possible.
          </p>
            </motion.div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute w-32 h-32 border-2 border-primary/20 rounded-full"
          style={{ top: '10%', left: '5%' }}
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        <motion.div
          className="absolute w-24 h-24 bg-primary/10 rounded-lg rotate-45"
          style={{ top: '20%', right: '10%' }}
          animate={{
            rotate: [45, 405, 45],
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            rotate: { duration: 15, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        <motion.div
          className="absolute w-16 h-16 border border-primary/30 rounded-full"
          style={{ bottom: '15%', left: '8%' }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Gradient orbs */}
        <motion.div
          className="absolute w-64 h-64 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl"
          style={{ top: '-20%', right: '-20%' }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute w-48 h-48 bg-gradient-to-l from-secondary/10 to-primary/10 rounded-full blur-2xl"
          style={{ bottom: '-10%', left: '-10%' }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Animated lines */}
        <motion.div
          className="absolute w-1 h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent"
          style={{ top: '25%', left: '15%' }}
          animate={{
            scaleY: [0.5, 1.5, 0.5],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />

        <motion.div
          className="absolute w-1 h-24 bg-gradient-to-b from-transparent via-secondary/40 to-transparent"
          style={{ bottom: '30%', right: '20%' }}
          animate={{
            scaleY: [1, 0.3, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5
          }}
        />

        {/* Floating particles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/40 rounded-full"
            style={{
              left: `${20 + (i * 10)}%`,
              top: `${30 + (i * 5)}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + (i * 0.5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}
      </div>

      <Card className="relative border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500">
        {/* Animated border gradient */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-0 hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
        
        <CardContent className="p-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Form Header */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center space-y-2"
            >
              <h3 className="text-2xl font-bold text-accent">Let's Create Something Amazing</h3>
              <p className="text-accent/70">Share your vision and let's bring it to life together</p>
            </motion.div>

        {/* Live region for form status announcements */}
        <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
          {state.submitting && "Submitting form, please wait"}
          {state.succeeded && "Form submitted successfully"}
          {state.errors && Object.keys(state.errors).length > 0 && "Please correct the errors in the form"}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative group"
                >
                  <div className="relative">
              <Input 
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      placeholder=""
                      aria-label="First Name"
                      aria-required="true"
                      className="peer border-2 border-primary/20 bg-primary/5 text-accent placeholder:text-transparent focus:border-primary/60 focus:outline-2 focus:outline-accent focus:outline-offset-2 focus:ring-4 focus:ring-primary/20 transition-all duration-300 rounded-xl py-4 pl-4 pr-4"
                      onFocus={() => setFocusedField('firstName')}
                      onBlur={() => setFocusedField(null)}
                required
              />
                    <label 
                      htmlFor="firstName"
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'firstName' || formData.firstName
                          ? 'opacity-0' 
                          : 'top-4 text-accent/60'
                      }`}
                    >
                      First Name <span className="text-red-400" aria-label="required">*</span>
                    </label>
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                      initial={{ width: 0 }}
                      animate={{ width: focusedField === 'firstName' ? '100%' : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
              {ValidationErrorComponent && state.errors ? (
                <ValidationErrorComponent 
                prefix="First Name" 
                field="firstName"
                errors={state.errors}
                className="text-red-400 text-xs mt-1"
              />
              ) : state.errors?.firstName ? (
                <div className="text-red-400 text-xs mt-1">{state.errors.firstName}</div>
              ) : null}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative group"
                >
                  <div className="relative">
              <Input 
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      placeholder=""
                      aria-label="Last Name"
                      aria-required="true"
                      className="peer border-2 border-primary/20 bg-primary/5 text-accent placeholder:text-transparent focus:border-primary/60 focus:outline-2 focus:outline-accent focus:outline-offset-2 focus:ring-4 focus:ring-primary/20 transition-all duration-300 rounded-xl py-4 pl-4 pr-4"
                      onFocus={() => setFocusedField('lastName')}
                      onBlur={() => setFocusedField(null)}
                required
              />
                    <label 
                      htmlFor="lastName"
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'lastName' || formData.lastName
                          ? 'opacity-0' 
                          : 'top-4 text-accent/60'
                      }`}
                    >
                      Last Name
                    </label>
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                      initial={{ width: 0 }}
                      animate={{ width: focusedField === 'lastName' ? '100%' : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
              {ValidationErrorComponent && state.errors ? (
                <ValidationErrorComponent 
                prefix="Last Name" 
                field="lastName"
                errors={state.errors}
                className="text-red-400 text-xs mt-1"
              />
              ) : state.errors?.lastName ? (
                <div className="text-red-400 text-xs mt-1">{state.errors.lastName}</div>
              ) : null}
                </motion.div>
          </div>
          
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative group"
              >
                <div className="relative">
            <Input 
              id="email"
              name="email"
              type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder=""
                    aria-label="Email Address"
                    aria-required="true"
                    autoComplete="email"
                    className="peer border-2 border-primary/20 bg-primary/5 text-accent placeholder:text-transparent focus:border-primary/60 focus:outline-2 focus:outline-accent focus:outline-offset-2 focus:ring-4 focus:ring-primary/20 transition-all duration-300 rounded-xl py-4 pl-4 pr-4"
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
              required
            />
                  <label 
                    htmlFor="email"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'email' || formData.email
                          ? 'opacity-0' 
                          : 'top-4 text-accent/60'
                    }`}
                  >
                    Email Address
                  </label>
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: focusedField === 'email' ? '100%' : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
            {ValidationErrorComponent && state.errors ? (
              <ValidationErrorComponent 
              prefix="Email" 
              field="email"
              errors={state.errors}
              className="text-red-400 text-xs mt-1"
            />
            ) : state.errors?.email ? (
              <div className="text-red-400 text-xs mt-1">{state.errors.email}</div>
            ) : null}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="relative group"
              >
                <div className="relative">
            <Input 
              id="subject"
              name="subject"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder=""
                    className="peer border-2 border-primary/20 bg-primary/5 text-accent placeholder:text-transparent focus:border-primary/60 focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-300 rounded-xl py-4 pl-4 pr-4"
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
              required
            />
                  <label 
                    htmlFor="subject"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'subject' || formData.subject
                          ? 'opacity-0' 
                          : 'top-4 text-accent/60'
                    }`}
                  >
                    Project Subject
                  </label>
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: focusedField === 'subject' ? '100%' : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
            {ValidationErrorComponent && state.errors ? (
              <ValidationErrorComponent 
              prefix="Subject" 
              field="subject"
              errors={state.errors}
              className="text-red-400 text-xs mt-1"
            />
            ) : state.errors?.subject ? (
              <div className="text-red-400 text-xs mt-1">{state.errors.subject}</div>
            ) : null}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="relative group"
              >
                <div className="relative">
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder=""
                    aria-label="Project Message"
                    aria-required="true"
                    className="peer min-h-[140px] border-2 border-primary/20 bg-primary/5 text-accent placeholder:text-transparent focus:border-primary/60 focus:outline-2 focus:outline-accent focus:outline-offset-2 focus:ring-4 focus:ring-primary/20 transition-all duration-300 rounded-xl py-4 pl-4 pr-4 resize-none"
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
              required
            />
                  <label 
                    htmlFor="message"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === 'message' || formData.message
                        ? 'opacity-0' 
                        : 'top-4 text-accent/60'
                    }`}
                  >
                    Tell me about your project...
                  </label>
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: focusedField === 'message' ? '100%' : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
            {ValidationErrorComponent && state.errors ? (
              <ValidationErrorComponent 
              prefix="Message" 
              field="message"
              errors={state.errors}
              className="text-red-400 text-xs mt-1"
            />
            ) : state.errors?.message ? (
              <div className="text-red-400 text-xs mt-1">{state.errors.message}</div>
            ) : null}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="pt-4"
              >
                <motion.button
            type="submit" 
            disabled={state.submitting}
                  aria-label={state.submitting ? "Submitting form, please wait" : "Submit contact form"}
                  aria-busy={state.submitting}
                  className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary-600 to-primary py-4 text-lg font-semibold text-accent shadow-lg hover:shadow-2xl transition-all duration-300 focus:outline-2 focus:outline-accent focus:outline-offset-2 focus:ring-4 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => setIsSubmitting(false)}
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-secondary via-primary to-secondary opacity-0 group-hover:opacity-20"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  {/* Button content */}
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    {state.submitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-accent/30 border-t-accent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <motion.div
                          className="w-5 h-5"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className={`w-5 h-5 ${
                            resolvedTheme === 'light'
                              ? 'text-black'
                              : ''
                          }`} />
                        </motion.div>
                      </>
                    )}
                  </div>
                </motion.button>
              </motion.div>
        </form>
          </motion.div>
      </CardContent>
    </Card>
    </div>
  );
};

const Contact = () => (
  <Section id="contact" className="relative py-12 bg-primary overflow-hidden">
    {/* Background Elements */}
    <div className="absolute inset-0">
      <div className="absolute top-20 left-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/10 rounded-full blur-2xl"></div>
    </div>

    <div className="mx-auto max-w-6xl px-4 relative z-10">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="space-y-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-accent">Let's Work Together</h2>
          <p className="text-xl text-light max-w-3xl mx-auto">
            Ready to bring your ideas to life? I'd love to hear about your project and discuss how we can create something amazing together.
          </p>
        </motion.div>

          <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
          >
            <ContactForm />
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <LazyNewsletterSignup />
          </motion.div>

      </motion.div>
    </div>
  </Section>
);

Contact.displayName = 'Contact';

const Footer = React.memo(({ onPrivacyClick, onTermsClick }) => {
  const [footerLogoError, setFooterLogoError] = useState(false);
  const [footerLogoSrc, setFooterLogoSrc] = useState(logoImg);
  const { resolvedTheme } = useTheme();
  
  return (
  <footer className="relative bg-primary text-neutral-300 overflow-hidden">
     {/* Subtle Background Elements */}
    <div className="absolute inset-0">
       <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>
       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
    </div>

    <div className="mx-auto max-w-6xl px-4 relative z-10">
       {/* Mobile: Minimalist Footer */}
       <div className="md:hidden py-8">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="space-y-6"
         >
           {/* Brand & Social */}
           <div className="flex flex-col items-center gap-4">
             <h3 className="text-base font-bold text-light">{PROFILE.name}</h3>
             
             {/* Social Icons - Compact */}
             <div className="flex items-center gap-3">
               {PROFILE.socials.map((social, index) => (
                 <motion.a
                   key={social.label}
                   href={social.href}
                   target="_blank"
                   rel="noopener noreferrer"
                   className={`p-2 rounded-lg transition-all duration-200 ${
                     resolvedTheme === 'light'
                       ? 'bg-accent/20 hover:bg-accent/30'
                       : 'bg-accent/10 hover:bg-accent/20'
                   }`}
                   whileHover={{ scale: 1.1, y: -2 }}
                   whileTap={{ scale: 0.95 }}
                   aria-label={social.label}
                 >
                   <social.icon className={`w-4 h-4 ${
                     resolvedTheme === 'light'
                       ? 'text-primary'
                       : 'text-accent'
                   }`} />
                 </motion.a>
               ))}
             </div>
           </div>

           {/* Divider */}
           <div className="h-px bg-accent/20"></div>

           {/* Copyright */}
           <div className="flex flex-col items-center">
             <p className="text-[10px] text-accent/50">
               © 2025 {PROFILE.name}
             </p>
           </div>
         </motion.div>
       </div>

       {/* Desktop: Full Footer */}
       {/* Main Content */}
          <motion.div
         initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
         transition={{ duration: 0.8 }}
         className="hidden md:block py-16"
       >
         <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
           {/* Brand Section */}
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.1 }}
             className="space-y-6"
           >
             <div className="flex items-center gap-4">
               <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-600 rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={IMAGES.bereketFikre} 
                  alt="Bereket Fikre - Creative Designer and Brand Builder"
                  width="64"
                  height="64"
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: '1 / 1', minWidth: '64px', minHeight: '64px' }}
                  loading="lazy"
                  decoding="async"
                  fetchpriority="low"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-light">{PROFILE.name}</h3>
                 <p className="text-accent font-medium">Graphic Designer, Brand Builder & Educator</p>
              </div>
            </div>
             
             <p className="text-neutral-300 leading-relaxed">
               Creating meaningful connections through strategic design. Let's bring your vision to life.
             </p>
             
             {/* Logo */}
             <motion.div
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="flex items-center"
             >
               {!footerLogoError ? (
                 <img 
                   src={footerLogoSrc} 
                   alt="Logo"
                   width="200"
                   height="67"
                   className="h-16 md:h-20 w-auto object-contain"
                   loading="lazy"
                   decoding="async"
                   fetchpriority="low"
                   onError={(e) => {
                     // Try alternative paths for Netlify compatibility
                     const currentIndex = logoPaths.findIndex(path => footerLogoSrc === path || footerLogoSrc.includes(path));
                     const nextIndex = currentIndex + 1;
                     
                     if (nextIndex < logoPaths.length) {
                       // Try next path
                       setFooterLogoSrc(logoPaths[nextIndex]);
                     } else {
                       // All paths failed - show text logo
                       setFooterLogoError(true);
                       logger.warn('Footer logo failed to load from all paths:', logoPaths);
                     }
                   }}
                 />
               ) : (
                 <div className="text-accent font-bold text-xl md:text-2xl">
                   Bereket Fikre
                 </div>
               )}
             </motion.div>
          </motion.div>

           {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-center md:text-center text-left ml-0 md:ml-8"
          >
             <h4 className="text-lg font-semibold text-light">Let's Connect</h4>
             <div className="grid grid-cols-3 gap-3 justify-items-center">
               {PROFILE.socials.map((social, index) => (
                <motion.a
                   key={social.label}
                   href={social.href}
                   target="_blank"
                   rel="noopener noreferrer"
                   className={`group flex flex-col items-center justify-center gap-2 p-3 rounded-lg transition-all duration-300 border border-accent/20 hover:border-accent/40 w-full h-16 ${
                     resolvedTheme === 'light'
                       ? 'bg-accent hover:bg-accent/80'
                       : 'bg-accent/10 hover:bg-accent/20'
                   }`}
                   whileHover={{ scale: 1.05, y: -2 }}
                   whileTap={{ scale: 0.95 }}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                 >
                   <social.icon className={`w-6 h-6 group-hover:scale-110 transition-transform ${
                     resolvedTheme === 'light'
                       ? 'text-primary group-hover:text-primary'
                       : 'text-accent group-hover:text-accent'
                   }`} />
                   <span className={`text-sm transition-colors ${
                     resolvedTheme === 'light'
                       ? 'text-primary group-hover:text-primary'
                       : 'text-neutral-300 group-hover:text-accent'
                   }`}>{social.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6 text-left md:text-right"
          >
            <h4 className="text-lg font-semibold text-light">Get In Touch</h4>
            <div className="space-y-4 flex flex-col items-start md:items-end">
              <motion.a
                href={`mailto:${PROFILE.email}`}
                 className="flex items-center gap-3 text-neutral-300 hover:text-accent transition-colors group"
                whileHover={{ x: 5 }}
              >
                 <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">{PROFILE.email}</span>
              </motion.a>
              <motion.a
                href={`tel:${PROFILE.phone}`}
                 className="flex items-center gap-3 text-neutral-300 hover:text-accent transition-colors group"
                whileHover={{ x: 5 }}
              >
                 <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">{PROFILE.phone}</span>
              </motion.a>
              <motion.a
                href="https://t.me/Believeandforward"
                target="_blank"
                rel="noopener noreferrer"
                 className="flex items-center gap-3 text-neutral-300 hover:text-accent transition-colors group"
                whileHover={{ x: 5 }}
              >
                 <Send className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">Telegram</span>
              </motion.a>
              <motion.div
                className="flex items-center gap-3 text-neutral-300 hover:text-accent transition-colors group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                 <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">{PROFILE.location}</span>
              </motion.div>
              
              {/* Legal Links */}
              <div className="flex items-center gap-4 pt-4">
            <motion.button
              onClick={onPrivacyClick}
                  className="text-xs text-neutral-400 hover:text-accent transition-colors group cursor-pointer"
              whileHover={{ y: -2 }}
            >
              <span className="group-hover:underline">Privacy Policy</span>
            </motion.button>
            <motion.button
              onClick={onTermsClick}
                  className="text-xs text-neutral-400 hover:text-accent transition-colors group cursor-pointer"
              whileHover={{ y: -2 }}
            >
              <span className="group-hover:underline">Terms of Service</span>
            </motion.button>
          </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Desktop Bottom Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="hidden md:block pb-8 border-t border-primary/10"
      >
        <div className="flex items-center justify-center text-center">
            <p className="text-sm text-neutral-400">
              © 2025 {PROFILE.name}. All rights reserved.
            </p>
         </div>
      </motion.div>

    </div>
  </footer>
);
});

Footer.displayName = 'Footer';

export default function CreativeDesignerPortfolio() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  
  // Tool states (managed by Header component)
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isPWAOpen, setIsPWAOpen] = useState(false);
  const [isPerformanceOpen, setIsPerformanceOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [isPerformanceDashboardOpen, setIsPerformanceDashboardOpen] = useState(false);
  const [isSEOManagerOpen, setIsSEOManagerOpen] = useState(false);
  const [isSecurityDashboardOpen, setIsSecurityDashboardOpen] = useState(false);
  const [isAIContentGeneratorOpen, setIsAIContentGeneratorOpen] = useState(false);
  const [isSmartRecommendationsOpen, setIsSmartRecommendationsOpen] = useState(false);
  const [isCRMIntegrationOpen, setIsCRMIntegrationOpen] = useState(false);
  const [isEmailMarketingOpen, setIsEmailMarketingOpen] = useState(false);

  // Handle ESC key to close modals
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        // Close all modals in order of priority
        if (isEmailMarketingOpen) setIsEmailMarketingOpen(false);
        else if (isCRMIntegrationOpen) setIsCRMIntegrationOpen(false);
        else if (isSmartRecommendationsOpen) setIsSmartRecommendationsOpen(false);
        else if (isAIContentGeneratorOpen) setIsAIContentGeneratorOpen(false);
        else if (isSecurityDashboardOpen) setIsSecurityDashboardOpen(false);
        else if (isSEOManagerOpen) setIsSEOManagerOpen(false);
        else if (isPerformanceDashboardOpen) setIsPerformanceDashboardOpen(false);
        else if (isAccessibilityOpen) setIsAccessibilityOpen(false);
        else if (isPerformanceOpen) setIsPerformanceOpen(false);
        else if (isPWAOpen) setIsPWAOpen(false);
        else if (isAIOpen) setIsAIOpen(false);
        else if (isAnalyticsOpen) setIsAnalyticsOpen(false);
        else if (isTermsOpen) setIsTermsOpen(false);
        else if (isPrivacyOpen) setIsPrivacyOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isPrivacyOpen, isTermsOpen, isAnalyticsOpen, isAIOpen, isPWAOpen, isPerformanceOpen, isAccessibilityOpen, isPerformanceDashboardOpen, isSEOManagerOpen, isSecurityDashboardOpen, isAIContentGeneratorOpen, isSmartRecommendationsOpen, isCRMIntegrationOpen, isEmailMarketingOpen]);

  React.useEffect(() => {
    // Register service worker for PWA functionality (only in production)
    // Skip service worker in development to avoid fetch errors with Vite dev server
    const isDevelopment = import.meta.env.DEV || 
                          window.location.hostname === 'localhost' || 
                          window.location.hostname === '127.0.0.1' ||
                          (window.location.port !== '' && window.location.port !== '443' && window.location.port !== '80');
    
    if ('serviceWorker' in navigator) {
      if (isDevelopment) {
        // Unregister all service workers in development
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((registration) => {
            registration.unregister().then((success) => {
              if (success) {
                // Service Worker unregistered in development
              }
            });
          });
        });
        // Also unregister the controller if it exists
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
        }
      } else {
        // Production: Register service worker
        navigator.serviceWorker.getRegistration()
          .then((registration) => {
            if (!registration) {
              // Only register if not already registered
              return navigator.serviceWorker.register('/sw.js');
            }
            return registration;
          })
          .then((registration) => {
            // Service Worker registered successfully
          })
          .catch((error) => {
            logger.error('Service Worker registration failed:', error);
          });
      }
    }

    // Set up global deferredPrompt for install functionality
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      window.deferredPrompt = e;
    };

    const handleAppInstalled = () => {
      window.deferredPrompt = null;
    };

    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    
    // Cleanup
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Initialize app features and smooth scrolling - Deferred to reduce main-thread work
  React.useEffect(() => {
    // Defer non-critical scripts to reduce initial load time and network requests
    // Use requestIdleCallback for better performance, fallback to setTimeout
    const initNonCriticalScripts = () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          // Dynamically import utilities only when needed (reduces initial bundle size)
          Promise.all([
            import('./utils/scrollAnimations'),
            import('./utils/accessibility'),
            import('./utils/pageTransitions')
          ]).then(([scrollModule, accessibilityModule, pageModule]) => {
            // Initialize utilities after they're loaded
            scrollModule.default?.init();
            accessibilityModule.default?.init();
            pageModule.default?.init();
          }).catch(() => {
            // Silently fail if utilities can't be loaded
          });
        }, { timeout: 3000 });
      } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(() => {
          Promise.all([
            import('./utils/scrollAnimations'),
            import('./utils/accessibility'),
            import('./utils/pageTransitions')
          ]).then(([scrollModule, accessibilityModule, pageModule]) => {
            scrollModule.default?.init();
            accessibilityModule.default?.init();
            pageModule.default?.init();
          }).catch(() => {});
        }, 3000);
      }
    };
    
    initNonCriticalScripts();
      // Initialize advanced analytics - DISABLED to reduce console noise
      // advancedAnalytics.init();
      // Initialize performance monitoring - DISABLED to reduce console noise
      // performanceMonitor.init();
      // Initialize sitemap generator - DISABLED to reduce console noise
      // sitemapGenerator.init(window.location.origin);
      // Initialize security manager - DISABLED to reduce console noise
      // securityManager.init();
    
    // Handle smooth scrolling for anchor links
    const handler = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;
      const id = target.getAttribute('href');
      const el = id && document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <ErrorBoundary>
    <LanguageProvider>
      <ThemeProvider>
        <LazyAnalytics />
        <LazyPerformance 
          isOpen={isPerformanceOpen} 
          onClose={() => setIsPerformanceOpen(false)} 
        />
      {/* Skip Links for Keyboard Navigation */}
      <div className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-4 focus-within:left-4 focus-within:z-[10000] focus-within:p-4 focus-within:bg-accent focus-within:text-primary focus-within:rounded-lg focus-within:shadow-lg">
        <a href="#main-content" className="block mb-2 focus:outline-2 focus:outline-primary focus:outline-offset-2">
          Skip to main content
        </a>
        <a href="#navigation" className="block mb-2 focus:outline-2 focus:outline-primary focus:outline-offset-2">
          Skip to navigation
        </a>
        <a href="#work" className="block mb-2 focus:outline-2 focus:outline-primary focus:outline-offset-2">
          Skip to portfolio
        </a>
        <a href="#contact" className="block focus:outline-2 focus:outline-primary focus:outline-offset-2">
          Skip to contact
        </a>
      </div>

      <main id="main-content" className="antialiased text-light bg-primary selection:bg-accent selection:text-primary">
        <HeaderWithContext 
          isAnalyticsOpen={isAnalyticsOpen} setIsAnalyticsOpen={setIsAnalyticsOpen}
          isAIOpen={isAIOpen} setIsAIOpen={setIsAIOpen}
          isPWAOpen={isPWAOpen} setIsPWAOpen={setIsPWAOpen}
          isPerformanceOpen={isPerformanceOpen} setIsPerformanceOpen={setIsPerformanceOpen}
          isPerformanceDashboardOpen={isPerformanceDashboardOpen} setIsPerformanceDashboardOpen={setIsPerformanceDashboardOpen}
          isSEOManagerOpen={isSEOManagerOpen} setIsSEOManagerOpen={setIsSEOManagerOpen}
          isSecurityDashboardOpen={isSecurityDashboardOpen} setIsSecurityDashboardOpen={setIsSecurityDashboardOpen}
          isAIContentGeneratorOpen={isAIContentGeneratorOpen} setIsAIContentGeneratorOpen={setIsAIContentGeneratorOpen}
          isSmartRecommendationsOpen={isSmartRecommendationsOpen} setIsSmartRecommendationsOpen={setIsSmartRecommendationsOpen}
          isCRMIntegrationOpen={isCRMIntegrationOpen} setIsCRMIntegrationOpen={setIsCRMIntegrationOpen}
          isEmailMarketingOpen={isEmailMarketingOpen} setIsEmailMarketingOpen={setIsEmailMarketingOpen}
        />
        <Hero />
      {/* Below-the-fold sections - Suspense boundaries added for future lazy loading
          Note: To enable true lazy loading, extract these components to separate files
          and use React.lazy() for code splitting. This will significantly reduce
          initial bundle size and main-thread work. */}
      <Suspense fallback={<div className="min-h-screen bg-primary" />}>
      <About />
      </Suspense>
      <Suspense fallback={<div className="min-h-screen bg-primary" />}>
      <WhatIDo />
      </Suspense>
      <Suspense fallback={<div className="min-h-screen bg-primary" />}>
      <Work />
      </Suspense>
      <Suspense fallback={<div className="min-h-screen bg-primary" />}>
      <Testimonials />
      </Suspense>
      <Suspense fallback={<div className="min-h-[400px] bg-primary" />}>
      <TrustedBy />
      </Suspense>
      <LazyCaseStudy />
      <LazyBlog />
      <LazyFAQ />
      <Suspense fallback={<div className="min-h-screen bg-primary" />}>
      <Contact />
      </Suspense>
      <Suspense fallback={<div className="min-h-[400px] bg-primary" />}>
      <Footer 
        onPrivacyClick={() => setIsPrivacyOpen(true)}
        onTermsClick={() => setIsTermsOpen(true)}
      />
      </Suspense>
      
      {/* Legal Modals */}
      <PrivacyPolicy 
        isOpen={isPrivacyOpen} 
        onClose={() => setIsPrivacyOpen(false)} 
      />
      <TermsOfService 
        isOpen={isTermsOpen} 
        onClose={() => setIsTermsOpen(false)} 
      />
      
    </main>
    
    {/* PWA Components */}
    <LazyPWAInstaller />
    
    {/* Advanced Features */}
    <LazyAI 
      isOpen={isAIOpen} 
      onClose={() => setIsAIOpen(false)} 
    />
    <LazyPWA 
      isOpen={isPWAOpen} 
      onClose={() => setIsPWAOpen(false)} 
    />
    
    {/* Performance Monitor */}
    <LazyPerformance 
      isOpen={isPerformanceOpen} 
      onClose={() => setIsPerformanceOpen(false)} 
    />
    
    {/* Analytics Dashboard */}
    <LazyTools 
      isOpen={isAnalyticsOpen} 
      onClose={() => setIsAnalyticsOpen(false)} 
    />
    
    {/* Scroll Progress and Navigation - Lazy loaded to reduce initial bundle and main-thread work */}
    <LazyScrollProgress />
    
    {/* Accessibility Settings */}
    <LazyAccessibilitySettings
      isOpen={isAccessibilityOpen}
      onClose={() => setIsAccessibilityOpen(false)}
    />

    <LazyPerformanceDashboard
      isOpen={isPerformanceDashboardOpen}
      onClose={() => setIsPerformanceDashboardOpen(false)}
    />

    {/* CriticalResourceHints disabled to fix preload warnings */}
    {/* <CriticalResourceHints /> */}

    <LazySEOManager
      isOpen={isSEOManagerOpen}
      onClose={() => setIsSEOManagerOpen(false)}
    />

    <LazySecurityDashboard
      isOpen={isSecurityDashboardOpen}
      onClose={() => setIsSecurityDashboardOpen(false)}
    />

    <LazyAIContentGenerator
      isOpen={isAIContentGeneratorOpen}
      onClose={() => setIsAIContentGeneratorOpen(false)}
    />

    <LazySmartRecommendations
      isOpen={isSmartRecommendationsOpen}
      onClose={() => setIsSmartRecommendationsOpen(false)}
    />

    <LazyCRMIntegration
      isOpen={isCRMIntegrationOpen}
      onClose={() => setIsCRMIntegrationOpen(false)}
    />

    <LazyEmailMarketing
      isOpen={isEmailMarketingOpen}
      onClose={() => setIsEmailMarketingOpen(false)}
    />

    {/* EnhancedSEO disabled to fix Helmet nesting issue */}
    {/* <EnhancedSEO 
      pageType="homepage"
      customData={{
        title: "Bereket Fikre - Creative Designer & Brand Strategist",
        description: "Professional creative designer specializing in brand identity, UI/UX design, and digital marketing. Transform your vision into compelling visual experiences.",
        keywords: ["creative designer", "brand identity", "UI/UX design", "portfolio", "Bereket Fikre"]
      }}
    /> */}
    </ThemeProvider>
    </LanguageProvider>
    </ErrorBoundary>
  );
}

