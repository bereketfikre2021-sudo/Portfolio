import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Sparkles, Target, TrendingUp, Users, Clock, Star, Zap, Lightbulb, ArrowRight, X } from 'lucide-react';

const AIPersonalization = ({ isOpen, onClose }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [personalizedContent, setPersonalizedContent] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Only log when isOpen changes to reduce console spam
  useEffect(() => {
    if (isOpen) {
      console.log('AIPersonalization component opened');
    }
  }, [isOpen]);

  // Mock AI analysis - in real implementation, this would use actual AI/ML services
  const analyzeUserBehavior = useCallback(() => {
    console.log('Starting AI analysis...');
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      console.log('AI analysis completed, setting user profile');
      const mockProfile = {
        userType: 'Creative Professional',
        interests: ['UI/UX Design', 'Brand Identity', 'Web Development'],
        experienceLevel: 'Intermediate',
        preferredContent: 'Case Studies',
        timeOnSite: '4:32',
        pagesVisited: 8,
        engagementScore: 87,
        recommendations: [
          {
            type: 'content',
            title: 'Advanced UI/UX Techniques',
            description: 'Based on your interest in UI/UX design, you might enjoy our advanced techniques guide.',
            priority: 'high'
          },
          {
            type: 'project',
            title: 'Swan Clothing Case Study',
            description: 'Similar to your interests, this brand identity project shows advanced design thinking.',
            priority: 'medium'
          },
          {
            type: 'service',
            title: 'Custom Brand Identity Package',
            description: 'Perfect for your level of experience and interest in brand design.',
            priority: 'high'
          }
        ]
      };

      const mockPersonalizedContent = {
        heroMessage: "Ready to elevate your design skills?",
        ctaText: "Explore Advanced Techniques",
        featuredProjects: ['swan-clothing', 'finix-web-assets'],
        suggestedBlogPosts: [
          'The Psychology of Color in Brand Design',
          'Advanced Typography Techniques',
          'Creating Memorable User Experiences'
        ],
        personalizedServices: [
          'Brand Identity Design',
          'UI/UX Consultation',
          'Design System Creation'
        ]
      };

      setUserProfile(mockProfile);
      setPersonalizedContent(mockPersonalizedContent);
      setIsAnalyzing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    // Analyze user behavior on component mount
    analyzeUserBehavior();
  }, [analyzeUserBehavior]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-accent/20 text-accent border-accent/30';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return <Zap className="w-4 h-4" />;
      case 'medium': return <Target className="w-4 h-4" />;
      case 'low': return <Clock className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            className="w-64 bg-primary/95 backdrop-blur-sm border border-accent/20 rounded-xl shadow-lg overflow-hidden"
          >
            {/* Header */}
            <div className="p-3 border-b border-accent/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-full flex items-center justify-center">
                    <Brain className="w-3 h-3 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-light">AI Insights</h3>
                    <p className="text-xs text-accent/60">Personalized</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-accent/10 rounded-full transition-colors"
                >
                  <X className="w-3 h-3 text-accent/60" />
                </button>
              </div>
            </div>

            {/* Compact User Profile */}
            <div className="p-3 border-b border-accent/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-semibold text-light">Profile</h4>
                <Badge className="bg-accent/20 text-accent border-accent/30 text-xs font-medium">
                  {userProfile?.userType}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-accent/60">Engagement:</span>
                  <span className="text-light">{userProfile?.engagementScore}%</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-accent/60">Time:</span>
                  <span className="text-light">{userProfile?.timeOnSite}</span>
                </div>
              </div>
            </div>

            {/* Compact Interests */}
            <div className="p-3 border-b border-accent/20">
              <h4 className="text-xs font-semibold text-light mb-2">Interests</h4>
              <div className="flex flex-wrap gap-1">
                {userProfile?.interests.slice(0, 3).map((interest, index) => (
                  <Badge key={index} className="bg-secondary/20 text-accent border-secondary/30 text-xs font-medium px-1 py-0">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Compact AI Recommendations */}
            <div className="p-3">
              <h4 className="text-xs font-semibold text-light mb-2">Top Recommendation</h4>
              {userProfile?.recommendations.slice(0, 1).map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-2 bg-primary/30 rounded border border-accent/10"
                >
                  <div className="flex items-start gap-2">
                    <div className={`p-1 rounded-full border ${getPriorityColor(rec.priority)}`}>
                      {getPriorityIcon(rec.priority)}
                    </div>
                    <div className="flex-1">
                      <h5 className="text-xs font-medium text-light">{rec.title}</h5>
                      <p className="text-xs text-accent/70 mt-1 line-clamp-2">{rec.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Analysis Indicator */}
      {isAnalyzing && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="w-10 h-10 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-full flex items-center justify-center shadow-lg border border-accent/20"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-4 h-4 text-accent" />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

// AI-powered content personalization hook
export const useAIPersonalization = () => {
  const [personalizedData, setPersonalizedData] = useState(null);

  useEffect(() => {
    // Track user behavior and generate personalized content
    const trackUserBehavior = () => {
      const behavior = {
        timeOnPage: Date.now() - window.performance.timing.navigationStart,
        scrollDepth: Math.max(0, (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100),
        clicks: document.querySelectorAll('a, button').length,
        pagesVisited: sessionStorage.getItem('pagesVisited') || 1
      };

      // Generate personalized content based on behavior
      const personalized = generatePersonalizedContent(behavior);
      setPersonalizedData(personalized);
    };

    // Track behavior on scroll
    const handleScroll = () => {
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(trackUserBehavior, 1000);
    };

    window.addEventListener('scroll', handleScroll);
    trackUserBehavior();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(window.scrollTimeout);
    };
  }, []);

  return personalizedData;
};

// Generate personalized content based on user behavior
const generatePersonalizedContent = (behavior) => {
  const { timeOnPage, scrollDepth, clicks, pagesVisited } = behavior;

  // Determine user engagement level
  let engagementLevel = 'low';
  if (timeOnPage > 300000 && scrollDepth > 50 && clicks > 10) {
    engagementLevel = 'high';
  } else if (timeOnPage > 120000 && scrollDepth > 25 && clicks > 5) {
    engagementLevel = 'medium';
  }

  // Generate personalized recommendations
  const recommendations = {
    engagementLevel,
    suggestedActions: [],
    personalizedMessage: '',
    priorityContent: []
  };

  if (engagementLevel === 'high') {
    recommendations.suggestedActions = [
      'View detailed case studies',
      'Download design resources',
      'Schedule a consultation'
    ];
    recommendations.personalizedMessage = "You're clearly interested in design! Let's explore some advanced techniques.";
    recommendations.priorityContent = ['case-studies', 'contact'];
  } else if (engagementLevel === 'medium') {
    recommendations.suggestedActions = [
      'Browse portfolio projects',
      'Read design insights',
      'Learn about services'
    ];
    recommendations.personalizedMessage = "Great to see your interest! Here are some highlights you might enjoy.";
    recommendations.priorityContent = ['work', 'blog'];
  } else {
    recommendations.suggestedActions = [
      'Start with the hero section',
      'Learn about services',
      'View portfolio samples'
    ];
    recommendations.personalizedMessage = "Welcome! Let me show you around and help you find what you're looking for.";
    recommendations.priorityContent = ['services', 'work'];
  }

  return recommendations;
};

export default React.memo(AIPersonalization);
