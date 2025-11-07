import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTheme } from "../ThemeProvider";

/**
 * Project Detail Modal Component - Minimal Design
 * Displays detailed information about a project in a clean, minimal modal
 */
const ProjectModal = ({ project, isOpen, onClose }) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        document.body.style.overflow = 'hidden';
      });
      
      const handleEsc = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleEsc);

      return () => {
        requestAnimationFrame(() => {
          document.body.style.overflow = '';
        });
        document.removeEventListener('keydown', handleEsc);
      };
    }
  }, [isOpen, onClose]);

  if (!mounted || !isOpen || !project) return null;

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed top-0 left-0 right-0 bottom-0 z-[99999] flex items-center justify-center p-4"
          style={{
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl rounded-lg overflow-hidden"
            style={{ 
              maxHeight: '90vh',
              background: resolvedTheme === 'light' ? '#8AEA92' : '#000000',
              border: '1px solid rgba(138,234,146,0.3)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            }}
          >
            {/* Minimal Header */}
            <div 
              className="flex items-center justify-between p-5 border-b"
              style={{
                borderColor: resolvedTheme === 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(138,234,146,0.3)',
              }}
            >
              <div className="flex-1">
                <h2 
                  className="text-xl font-bold mb-1"
                  style={{
                    color: resolvedTheme === 'light' ? '#000000' : '#8AEA92',
                  }}
                >
                  {project.title}
                </h2>
                <p 
                  className="text-sm"
                  style={{
                    color: resolvedTheme === 'light' ? 'rgba(0,0,0,0.7)' : 'rgba(138,234,146,0.7)',
                  }}
                >
                  {project.role}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center focus:outline-2 focus:outline-accent focus:outline-offset-2"
                style={{
                  color: resolvedTheme === 'light' ? '#000000' : '#8AEA92',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = resolvedTheme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(138,234,146,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Scrollable Content - Simplified */}
            <div 
              className="overflow-y-auto"
              style={{ maxHeight: 'calc(90vh - 100px)' }}
            >
              <div className="p-5 space-y-4">
                {/* Project Image */}
                <div className="w-full rounded overflow-hidden">
                  <img
                    src={project.thumb}
                    alt={`${project.title} - ${project.role}`}
                    width="800"
                    height="600"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Project Description - Simplified */}
                {(project.description || project.summary) && (
                  <p 
                    className="leading-relaxed"
                    style={{
                      color: resolvedTheme === 'light' ? '#000000' : '#8AEA92',
                      fontSize: '16px',
                      lineHeight: '1.6',
                    }}
                  >
                    {project.description || project.summary}
                  </p>
                )}

                {/* Tags - Minimal */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded"
                        style={{
                          border: `1px solid ${resolvedTheme === 'light' ? 'rgba(0,0,0,0.3)' : 'rgba(138,234,146,0.3)'}`,
                          color: resolvedTheme === 'light' ? '#000000' : '#8AEA92',
                          backgroundColor: 'transparent',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default ProjectModal;
