import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "../ThemeProvider";
import Section from "../Section";
import { PROJECTS, SERVICES, fadeInUp } from "../../constants";
import ProjectModal from "../modals/ProjectModal";
import { PortfolioGridSkeleton } from "../ui/Skeleton";

const Work = React.memo(() => {
  const { resolvedTheme } = useTheme();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(false);

  // Use services as filter categories
  const filterCategories = React.useMemo(() => {
    return [
      { title: 'All', icon: null },
      ...SERVICES.map(service => ({ title: service.title, icon: service.icon }))
    ];
  }, []);

  // Filter projects based on active service filter
  const filteredProjects = React.useMemo(() => {
    if (activeFilter === 'All') {
      return PROJECTS;
    }
    
    // Find the service that matches the active filter
    const selectedService = SERVICES.find(service => service.title === activeFilter);
    if (!selectedService) return PROJECTS;
    
    // Match projects to service based on tags - Optimized to avoid blocking main thread
    // Cache service data to avoid repeated operations
    const serviceTitleFirstWord = selectedService.title.toLowerCase().split(' ')[0];
    const serviceTagsLower = selectedService.tags.map(tag => tag.toLowerCase());
    
    // Use optimized filter with cached lowercase conversions
    return PROJECTS.filter(project => {
      // Cache lowercase conversions to avoid repeated operations
      const projectRoleLower = project.role.toLowerCase();
      const projectTitleLower = project.title.toLowerCase();
      
      // Check if any project tag matches any service tag (case-insensitive)
      const tagMatch = project.tags.some(projectTag => {
        const projectTagLower = projectTag.toLowerCase();
        return serviceTagsLower.some(serviceTagLower => {
          return projectTagLower.includes(serviceTagLower) || serviceTagLower.includes(projectTagLower);
        });
      });
      
      // Also check project role/title for service keywords
      return tagMatch || 
        projectRoleLower.includes(serviceTitleFirstWord) ||
        projectTitleLower.includes(serviceTitleFirstWord);
    });
  }, [activeFilter]);

  // Simulate loading when filter changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [activeFilter]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
        setSelectedProject(null);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isModalOpen]);

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <Section id="work" className="relative py-12 bg-primary overflow-hidden">
      <style>{`
        .group:hover .portfolio-card {
          border-color: rgba(138,234,146,0.3) !important;
        }
      `}</style>
      {/* Extraordinary Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(#8AEA92 1px, transparent 1px), linear-gradient(90deg, #8AEA92 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}>
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ['0% 0%', '50px 50px'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Dynamic Gradient Orbs - Lime green and black only */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ 
            top: '-10%', 
            right: '-5%',
            background: 'linear-gradient(to right, rgba(138,234,146,0.2), rgba(138,234,146,0.15), rgba(138,234,146,0.2))',
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 180, 360],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ 
            bottom: '-10%', 
            left: '-5%',
            background: 'linear-gradient(to left, rgba(138,234,146,0.2), rgba(138,234,146,0.15), rgba(138,234,146,0.2))',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
            rotate: [360, 180, 0],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating Particles - Reduced from 50 to 20 for better performance */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: '#8AEA92',
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1.5, 0],
              y: [0, -100, -200],
              x: [0, (Math.random() - 0.5) * 100],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="space-y-20"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            {/* Badge */}
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
              }`}>Portfolio</span>
            </motion.div>

            {/* Main Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold text-accent"
            >
              Featured Work
            </motion.h2>
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-accent/80 max-w-3xl mx-auto"
            >
              A curated collection of transformative design projects that showcase innovation, creativity, and strategic thinking
            </motion.p>
          </motion.div>

          {/* Filter Tabs - Extraordinary Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="sticky top-16 md:top-20 z-40 bg-primary/95 backdrop-blur-sm border-b border-accent/10 mb-8 -mx-4 px-4 md:mx-0 md:px-0 md:static md:bg-transparent md:border-0"
            role="tablist"
            aria-label="Portfolio filter categories"
          >
            {/* Live region for filter changes */}
            <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
              {activeFilter && `Filtered by ${activeFilter}`}
            </div>
            <div className="relative">
              {/* Scroll Fade Indicators - Mobile Only */}
              <div className="md:hidden absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-primary to-transparent pointer-events-none z-10"></div>
              <div className="md:hidden absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-primary to-transparent pointer-events-none z-10"></div>
              
              <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth" style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}>
                <div className="relative flex gap-2 md:gap-4 md:justify-center md:flex-wrap min-w-max md:min-w-0 pb-1 md:pb-0 py-2 md:py-4">
                  {filterCategories.map((category) => {
                    const IconComponent = category.icon;
                    const isActive = activeFilter === category.title;
                    
                    return (
                      <motion.button
                        key={category.title}
                        onClick={() => setActiveFilter(category.title)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setActiveFilter(category.title);
                          }
                        }}
                        whileHover={{ 
                          scale: 1.08,
                          y: -2,
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.96 }}
                        className={`relative px-4 py-2.5 md:px-6 md:py-3 rounded-2xl text-xs md:text-base font-semibold whitespace-nowrap flex-shrink-0 flex items-center gap-2 md:gap-3 transition-all duration-300 overflow-hidden group focus:outline-2 focus:outline-accent focus:outline-offset-2 ${
                          isActive
                            ? 'text-primary shadow-2xl'
                            : 'text-accent/70 hover:text-accent border border-accent/20 hover:border-accent/40'
                        }`}
                        aria-label={`Filter by ${category.title}`}
                        role="tab"
                        id={`tab-${category.title}`}
                        aria-selected={isActive}
                        aria-controls={`tabpanel-${category.title}`}
                      >
                        {/* Animated Background for Active Tab */}
                        {isActive && (
                          <>
                            <motion.div
                              layoutId="activeFilter"
                              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent via-accent to-accent-600"
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                              style={{ zIndex: -1 }}
                            />
                            {/* Static Glow Effect - Performance optimized */}
                            <div
                              className="absolute inset-0 rounded-2xl bg-accent/40 blur-md"
                              style={{ zIndex: -2 }}
                            />
                          </>
                        )}
                        
                        {/* Hover Background for Inactive Tabs */}
                        {!isActive && (
                          <motion.div
                            className="absolute inset-0 rounded-2xl bg-accent/5 group-hover:bg-accent/10"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            style={{ zIndex: -1 }}
                          />
                        )}
                        
                        {/* Icon with Animation */}
                        {IconComponent && (
                          <motion.div
                            animate={isActive ? { 
                              rotate: [0, 10, -10, 0],
                              scale: [1, 1.2, 1]
                            } : {}}
                            transition={{ duration: 0.5 }}
                          >
                            <IconComponent className={`w-4 h-4 md:w-5 md:h-5 flex-shrink-0 relative z-10 ${
                              isActive ? 'text-primary' : 'text-accent group-hover:text-accent'
                            }`} />
                          </motion.div>
                        )}
                        
                        {/* Text with Gradient for Active */}
                        <span className={`relative z-10 text-xs md:text-base font-semibold ${
                          isActive 
                            ? 'text-primary drop-shadow-lg' 
                            : 'text-accent/70 group-hover:text-accent'
                        }`}>
                          {category.title}
                        </span>
                        
                        {/* Active Indicator Dot */}
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full shadow-lg shadow-accent/50"
                            style={{ zIndex: 10 }}
                          />
                        )}
                        
                        {/* Ripple Effect on Click */}
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 rounded-2xl bg-white/20"
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ duration: 0.6 }}
                            style={{ zIndex: 1 }}
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Extraordinary Portfolio Grid - Masonry Style with 3D Effects */}
          <div
            role="tabpanel"
            id={`tabpanel-${activeFilter}`}
            aria-labelledby={`tab-${activeFilter}`}
          >
            {isLoading ? (
              <PortfolioGridSkeleton count={6} />
            ) : filteredProjects.length > 0 ? (
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              >
                {filteredProjects.map((project, index) => {
                  const isLarge = index % 5 === 0;
                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ 
                        delay: index * 0.1, 
                        duration: 0.5
                      }}
                      whileHover={{ 
                        y: -3,
                        transition: { duration: 0.2 }
                      }}
                      className={`group relative ${isLarge ? 'md:col-span-2 lg:col-span-1' : ''}`}
                    >
                      {/* Minimal Card */}
                      <div 
                        className="relative overflow-hidden h-full flex flex-col transition-all duration-300 portfolio-card rounded-lg"
                        style={{
                          background: resolvedTheme === 'light' 
                            ? '#8AEA92'
                            : '#000000',
                          border: '1px solid rgba(138,234,146,0.3)',
                          boxShadow: '0 2px 8px rgba(138,234,146,0.2)',
                          color: resolvedTheme === 'light' ? '#000000' : '#8AEA92',
                        }}
                      >

                        {/* Image Container */}
                        <div className="relative aspect-video overflow-hidden" style={{ minHeight: '200px', aspectRatio: '16 / 9', contain: 'layout' }}>
                          <img
                            src={project.thumb}
                            alt={`${project.title} project thumbnail - ${project.role}`}
                            width="1280"
                            height="720"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            style={{ aspectRatio: '16 / 9', minHeight: '200px', display: 'block' }}
                            loading="lazy"
                            decoding="async"
                            fetchpriority="low"
                            onError={(e) => {
                              // Fallback to placeholder if image fails to load
                              e.target.src = '/img/placeholder.webp';
                            }}
                          />
                          
                          {/* View Button - Minimal */}
                          <motion.div
                            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: '#8AEA92' }}>
                              <ExternalLink className="w-5 h-5" style={{ color: '#000000' }} />
                            </div>
                          </motion.div>
                        </div>
                        
                        {/* Content */}
                        <div className="p-6 relative flex-1 flex flex-col space-y-4">
                          <div className="space-y-3 flex-1">
                            <div>
                              <h3
                                className="text-2xl font-bold mb-2"
                                style={{
                                  color: resolvedTheme === 'light' ? '#000000' : '#8AEA92'
                                }}
                              >
                                {project.title}
                              </h3>
                              <p 
                                className="text-sm font-medium"
                                style={{
                                  color: resolvedTheme === 'light' ? 'rgba(0,0,0,0.7)' : 'rgba(138,234,146,0.7)'
                                }}
                              >
                                {project.role}
                              </p>
                            </div>
                            
                            {/* Tags - Minimal */}
                            <div className="flex flex-wrap gap-2 pt-2">
                              {project.tags.map((tag, tagIndex) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs px-2.5 py-1 bg-transparent hover:border-accent/50 transition-colors duration-200 focus:ring-accent focus:ring-2"
                                  style={{
                                    borderColor: resolvedTheme === 'light' ? 'rgba(0,0,0,0.3)' : 'rgba(138,234,146,0.3)',
                                    color: resolvedTheme === 'light' ? '#000000' : '#8AEA92',
                                  }}
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* CTA Button - Minimal */}
                          <motion.button
                            onClick={() => {
                              openProjectModal(project);
                              if (window.gtag) {
                                window.gtag('event', 'view_item', {
                                  event_category: 'portfolio',
                                  event_label: project.title
                                });
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                openProjectModal(project);
                              }
                            }}
                            className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 text-center focus:outline-2 focus:outline-accent focus:outline-offset-2"
                            style={{
                              backgroundColor: '#8AEA92',
                              color: '#000000',
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            aria-label={`Explore ${project.title} project - ${project.role}`}
                          >
                            <span style={{ color: '#000000' }}>Explore Project</span>
                            <Eye className="w-4 h-4" style={{ color: '#000000' }} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center py-16"
              >
                <p className={`text-xl ${resolvedTheme === 'light' ? 'text-primary/70' : 'text-light/70'}`}>
                  No projects found in this category.
                </p>
              </motion.div>
            )}
          </div>

          {/* Extraordinary CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center pt-12"
          >
            <motion.a
              href="https://heyzine.com/flip-book/2e51bd7d15.html"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl overflow-hidden"
              style={{
                backgroundColor: '#8AEA92',
                boxShadow: '0 4px 20px rgba(138,234,146,0.3), 0 0 0 1px rgba(138,234,146,0.2)',
              }}
            >
              {/* Static Background - Performance optimized */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'rgba(138,234,146,0.2)',
                }}
              />
              
              <span
                className="relative z-10 font-semibold text-sm tracking-wide"
                style={{ color: '#000000' }}
              >
                View Complete Portfolio
              </span>
              <div className="relative z-10">
                <ArrowRight className="w-4 h-4" style={{ color: '#000000' }} />
              </div>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={closeProjectModal} 
      />
    </Section>
  );
});

Work.displayName = 'Work';

export default Work;

