import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Quote, Play, X, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "../ThemeProvider";
import Section from "../Section";
import { TESTIMONIALS, VIDEO_TESTIMONIALS, fadeInUp } from "../../constants";

const Testimonials = React.memo(() => {
  const { resolvedTheme } = useTheme();
  const [currentPage, setCurrentPage] = React.useState(0);
  const [activeTab, setActiveTab] = React.useState('written');
  const [selectedVideo, setSelectedVideo] = React.useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = React.useState(false);

  // Handle ESC key to close video modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isVideoModalOpen) {
        setIsVideoModalOpen(false);
        setSelectedVideo(null);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isVideoModalOpen]);
  
  // Mobile: 1 per page (6 pages), Desktop: 3 per page (2 pages)
  const [isMobileView, setIsMobileView] = useState(false);
  const carouselRef = React.useRef(null);
  const isScrollingRef = React.useRef(false);
  
  // Cache container width to prevent forced reflow
  const containerWidthRef = React.useRef(0);
  
  useEffect(() => {
    let rafId = null;
    let ticking = false;
    
    const checkMobile = () => {
      if (ticking) return;
      ticking = true;
      
      // Batch all layout reads in requestAnimationFrame to prevent forced reflow
      rafId = requestAnimationFrame(() => {
        const width = window.innerWidth;
        const isMobile = width < 768;
        
        // Cache container width if carousel exists
        if (carouselRef.current && isMobile) {
          containerWidthRef.current = carouselRef.current.clientWidth;
        }
        
        setIsMobileView(isMobile);
        ticking = false;
      });
    };
    
    // Initial check with RAF to prevent blocking initial render
    requestAnimationFrame(() => {
      checkMobile();
    });
    
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Sync scroll position with current page on mobile
  useEffect(() => {
    if (isMobileView && carouselRef.current) {
      isScrollingRef.current = true;
      const scrollContainer = carouselRef.current;
      
      // Use cached width or batch layout read in requestAnimationFrame to prevent forced reflow
      requestAnimationFrame(() => {
        // Use cached width if available, otherwise read once and cache
        const scrollContainerWidth = containerWidthRef.current || scrollContainer.clientWidth;
        if (!containerWidthRef.current) {
          containerWidthRef.current = scrollContainerWidth;
        }
        
        const itemWidth = scrollContainerWidth;
        const targetScroll = currentPage * itemWidth;
        
        scrollContainer.scrollTo({
          left: targetScroll,
          behavior: 'smooth'
        });
        
        // Reset flag after scroll completes
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 600);
      });
    }
  }, [currentPage, isMobileView]);
  
  // Handle scroll to update current page on mobile
  useEffect(() => {
    if (!isMobileView || !carouselRef.current) return;
    
    const scrollContainer = carouselRef.current;
    let scrollTimeout;
    let rafId = null;
    let ticking = false;
    
    const handleScroll = () => {
      // Skip if we're programmatically scrolling
      if (isScrollingRef.current || ticking) return;
      ticking = true;
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // Batch all layout reads in requestAnimationFrame to prevent forced reflow
        rafId = requestAnimationFrame(() => {
          // Read all layout properties together
          const scrollLeft = scrollContainer.scrollLeft;
          const containerWidth = containerWidthRef.current || scrollContainer.clientWidth;
          
          // Cache width if not cached
          if (!containerWidthRef.current) {
            containerWidthRef.current = containerWidth;
          }
          
          const newPage = Math.round(scrollLeft / containerWidth);
          
          if (newPage !== currentPage && newPage >= 0 && newPage < TESTIMONIALS.length) {
            setCurrentPage(newPage);
          }
          
          ticking = false;
        });
      }, 150);
    };
    
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      scrollContainer.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isMobileView, currentPage]);
  
  const testimonialsPerPage = isMobileView ? 1 : 3;
  const totalPages = isMobileView ? TESTIMONIALS.length : Math.ceil(TESTIMONIALS.length / testimonialsPerPage);
  
  const currentTestimonials = isMobileView 
    ? [TESTIMONIALS[currentPage]]
    : TESTIMONIALS.slice(
        currentPage * testimonialsPerPage,
        (currentPage + 1) * testimonialsPerPage
      );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const openVideoModal = (video) => {
    setSelectedVideo(video);
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    setIsVideoModalOpen(false);
  };

  // Auto-play functionality for testimonials
  const [isAutoPlayPaused, setIsAutoPlayPaused] = React.useState(false);
  const autoPlayIntervalRef = React.useRef(null);

  // Auto-play effect - cycles through pages every 5 seconds
  useEffect(() => {
    // Only auto-play when written testimonials tab is active
    if (activeTab !== 'written' || isAutoPlayPaused) {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
        autoPlayIntervalRef.current = null;
      }
      return;
    }

    // Set up interval to auto-advance pages
    autoPlayIntervalRef.current = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000); // Change page every 5 seconds

    // Cleanup on unmount or when dependencies change
    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
        autoPlayIntervalRef.current = null;
      }
    };
  }, [activeTab, isAutoPlayPaused, totalPages]);

  // Pause auto-play when user interacts with navigation
  const handleUserInteraction = () => {
    setIsAutoPlayPaused(true);
    // Resume auto-play after 10 seconds of no interaction
    setTimeout(() => {
      setIsAutoPlayPaused(false);
    }, 10000);
  };

  // Update nextPage and prevPage to pause auto-play on user interaction
  const handleNextPage = () => {
    handleUserInteraction();
    nextPage();
  };

  const handlePrevPage = () => {
    handleUserInteraction();
    prevPage();
  };

  const handlePageClick = (pageIndex) => {
    handleUserInteraction();
    setCurrentPage(pageIndex);
  };

  return (
    <Section id="testimonials" className="relative py-12 bg-primary overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-2xl"></div>
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
            <div className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent/40 text-primary text-lg font-semibold shadow-2xl border-2 border-accent/60">
              <div className="w-4 h-4 bg-primary rounded-full shadow-lg"></div>
              Testimonials
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-accent">What Clients Say</h2>
            <p className="text-xl text-light max-w-2xl mx-auto">
              Hear from the amazing people I've had the pleasure to work with
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-2 p-2 bg-primary/20 rounded-2xl border border-accent/20 backdrop-blur-sm">
              <button
                onClick={() => setActiveTab('written')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'written'
                    ? 'bg-accent text-primary shadow-lg'
                    : 'text-accent hover:bg-accent/10'
                }`}
              >
                <Quote className="w-4 h-4 inline mr-2" />
                Written Testimonials
              </button>
              <button
                onClick={() => setActiveTab('video')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'video'
                    ? 'bg-accent text-primary shadow-lg'
                    : 'text-accent hover:bg-accent/10'
                }`}
              >
                <Play className="w-4 h-4 inline mr-2" />
                Video Testimonials
              </button>
            </div>
          </motion.div>

          {/* Written Testimonials */}
          {activeTab === 'written' && (
            <div className="relative">
              {/* Mobile: Horizontal scrollable carousel */}
              <div 
                ref={carouselRef}
                className="md:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide" 
                style={{ 
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                  scrollSnapType: 'x mandatory'
                }}
              >
                <div className="flex" style={{ width: `calc(100% * ${TESTIMONIALS.length})` }}>
                  {TESTIMONIALS.map((testimonial, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex-shrink-0 snap-start px-4"
                      style={{ width: `calc(100% / ${TESTIMONIALS.length})`, scrollSnapAlign: 'start' }}
                    >
                      <Card className="border-accent/20 hover:border-accent/40 transition-all duration-300 bg-primary/90 backdrop-blur-sm">
                        <CardContent className="p-5">
                          <div className="space-y-4">
                            {/* Quote Icon */}
                            <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                              </svg>
                            </div>
                            
                            <blockquote className="text-light text-base leading-relaxed">
                              "{testimonial.quote}"
                            </blockquote>
                            
                            <div className="pt-3 border-t border-accent/20">
                              <div className="flex items-center gap-3">
                                {/* Avatar Image */}
                                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-accent flex-shrink-0">
                                  <img 
                                    src={testimonial.avatar} 
                                    alt={`${testimonial.author} profile picture`}
                                    width="40"
                                    height="40"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    decoding="async"
                                    fetchpriority="low"
                                  />
                                </div>
                                
                                {/* Author Info */}
                                <div>
                                  <p className="font-semibold text-light text-base">{testimonial.author}</p>
                                  <p className="text-xs text-accent/80">{testimonial.role}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Desktop: Grid layout */}
              <div className="hidden md:grid grid-cols-3 gap-6 md:gap-8">
                {currentTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <Card className="h-full border-accent/20 hover:border-accent/40 transition-all duration-300 group-hover:shadow-xl bg-primary/90 backdrop-blur-sm">
                      <CardContent className="p-8">
                        <div className="space-y-6">
                          {/* Quote Icon */}
                          <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-600 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                            </svg>
                          </div>
                          
                          <blockquote className="text-light text-lg leading-relaxed">
                            "{testimonial.quote}"
                          </blockquote>
                          
                          <div className="pt-4 border-t border-accent/20">
                            <div className="flex items-center gap-4">
                              {/* Avatar Image */}
                              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent flex-shrink-0" style={{ minWidth: '48px', minHeight: '48px' }}>
                                <img 
                                  src={testimonial.avatar} 
                                  alt={`${testimonial.author} profile picture`}
                                  width="48"
                                  height="48"
                                  className="w-full h-full object-cover"
                                  style={{ aspectRatio: '1 / 1', minWidth: '48px', minHeight: '48px' }}
                                  loading="lazy"
                                  decoding="async"
                                  fetchpriority="low"
                                />
                              </div>
                              
                              {/* Author Info */}
                              <div>
                                <p className="font-semibold text-light text-lg">{testimonial.author}</p>
                                <p className="text-sm text-accent">{testimonial.role}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {activeTab === 'written' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-6"
            >
              {/* Mobile: Minimal Progress Bar Style */}
              <div className="md:hidden">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-xs text-accent/60 font-medium">
                    {currentPage + 1} / {totalPages}
                  </span>
                </div>
                {/* Progress Bar Indicator */}
                <div className="relative h-0.5 bg-accent/20 rounded-full overflow-hidden max-w-xs mx-auto">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-accent rounded-full"
                    initial={false}
                    animate={{
                      width: `${((currentPage + 1) / totalPages) * 100}%`
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>
                {/* Clickable Dots - Minimum 48px touch target */}
                <div className="flex items-center justify-center gap-2 mt-3">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        handlePageClick(index);
                      }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`rounded-full transition-all duration-300 min-w-[48px] min-h-[48px] flex items-center justify-center ${
                        currentPage === index 
                          ? 'w-2 h-2 bg-accent' 
                          : 'w-1.5 h-1.5 bg-accent/40 hover:bg-accent/60'
                      }`}
                      aria-label={`Go to page ${index + 1} of ${totalPages}`}
                      {...(currentPage === index ? { 'aria-current': 'page' } : {})}
                    />
                  ))}
                </div>
              </div>

              {/* Desktop: Original Style with Buttons */}
              <div className="hidden md:flex justify-center items-center gap-3">
                <motion.button
                  onClick={() => {
                    if (currentPage > 0) {
                      handlePrevPage();
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2.5 rounded-full transition-all duration-200 min-w-[48px] min-h-[48px] flex items-center justify-center ${
                    currentPage === 0
                      ? 'bg-accent/5 text-accent/30 cursor-not-allowed'
                      : 'bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20 hover:border-accent/40'
                  }`}
                  disabled={currentPage === 0}
                  aria-label="Previous page"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
                
                {/* Page Indicators - Minimum 48px touch target */}
                <div className="flex items-center gap-2 px-2">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        handlePageClick(index);
                      }}
                      whileHover={{ scale: 1.4 }}
                      whileTap={{ scale: 0.7 }}
                      className={`rounded-full transition-all duration-200 min-w-[48px] min-h-[48px] flex items-center justify-center ${
                        currentPage === index 
                          ? 'w-1.5 h-1.5 bg-accent shadow-sm shadow-accent/30' 
                          : 'w-1 h-1 bg-accent/30 hover:bg-accent/50'
                      }`}
                      aria-label={`Go to page ${index + 1} of ${totalPages}`}
                      {...(currentPage === index ? { 'aria-current': 'page' } : {})}
                    />
                  ))}
                </div>
                
                <motion.button
                  onClick={() => {
                    if (currentPage < totalPages - 1) {
                      handleNextPage();
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2.5 rounded-full transition-all duration-200 min-w-[48px] min-h-[48px] flex items-center justify-center ${
                    currentPage === totalPages - 1
                      ? 'bg-accent/5 text-accent/30 cursor-not-allowed'
                      : 'bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20 hover:border-accent/40'
                  }`}
                  disabled={currentPage === totalPages - 1}
                  aria-label="Next page"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Video Testimonials */}
          {activeTab === 'video' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {VIDEO_TESTIMONIALS.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="h-full border-accent/20 hover:border-accent/40 transition-all duration-300 group-hover:shadow-xl bg-primary/90 backdrop-blur-sm overflow-hidden">
                    <CardContent className="p-0">
                      {/* Video Thumbnail */}
                      <div className="relative aspect-video bg-gradient-to-br from-accent/20 to-secondary/20 overflow-hidden" style={{ minHeight: '200px' }}>
                        <img
                          src={video.thumbnail}
                          alt={`${video.title} video thumbnail`}
                          width="1280"
                          height="720"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          style={{ aspectRatio: '16 / 9', minHeight: '200px' }}
                          loading="lazy"
                          decoding="async"
                          fetchpriority="low"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <motion.button
                            onClick={() => openVideoModal(video)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-16 h-16 bg-accent/90 hover:bg-accent rounded-full flex items-center justify-center shadow-lg"
                            aria-label={`Play ${video.title} video`}
                          >
                            <Play className="w-6 h-6 text-primary ml-1" />
                          </motion.button>
                        </div>
                        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      
                      <div className="p-6 space-y-4">
                        {/* Quote */}
                        <blockquote className="text-light text-sm leading-relaxed line-clamp-3">
                          "{video.quote}"
                        </blockquote>
                        
                        {/* Author Info */}
                        <div className="flex items-center gap-3 pt-4 border-t border-accent/20">
                          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-accent flex-shrink-0" style={{ minWidth: '40px', minHeight: '40px' }}>
                            <img 
                              src={video.thumbnail} 
                              alt={`${video.title} video thumbnail`}
                              width="40"
                              height="40"
                              className="w-full h-full object-cover"
                              style={{ aspectRatio: '1 / 1', minWidth: '40px', minHeight: '40px' }}
                              loading="lazy"
                              decoding="async"
                              fetchpriority="low"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-light text-sm">{video.client}</p>
                            <p className="text-xs text-accent">{video.role}</p>
                          </div>
                        </div>
                        
                        {/* Results */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-semibold text-accent">Key Results:</h4>
                          <ul className="space-y-1">
                            {video.results.slice(0, 2).map((result, idx) => (
                              <li key={idx} className="text-xs text-light/80 flex items-center gap-2">
                                <div className="w-1 h-1 bg-accent rounded-full"></div>
                                {result}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-4xl mx-4 bg-primary rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player */}
            <div className="aspect-video bg-black">
              <video
                className="w-full h-full"
                controls
                poster={selectedVideo.thumbnail}
                onLoadStart={() => {/* Video loading started */}}
              >
                <source src={selectedVideo.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Video Info */}
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-light mb-2">{selectedVideo.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-accent">
                    <span>{selectedVideo.client}</span>
                    <span>•</span>
                    <span>{selectedVideo.role}</span>
                    <span>•</span>
                    <span>{selectedVideo.duration}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: selectedVideo.rating }, (_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
              </div>

              <blockquote className="text-light italic border-l-4 border-accent pl-4">
                "{selectedVideo.quote}"
              </blockquote>

              <div className="space-y-3">
                <h4 className="font-semibold text-accent">Project Results:</h4>
                <ul className="space-y-2">
                  {selectedVideo.results.map((result, idx) => (
                    <li key={idx} className="text-light flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </Section>
  );
});

Testimonials.displayName = 'Testimonials';

export default Testimonials;

