import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  X, 
  RefreshCw,
  TrendingUp,
  Target,
  Users,
  Clock,
  Star,
  ArrowRight,
  Lightbulb,
  Zap,
  Eye,
  MousePointer,
  BarChart3,
  Palette,
  Code,
  Image,
  MessageSquare,
  Share2,
  Heart,
  Bookmark,
  Download
} from 'lucide-react';

const SmartRecommendations = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('performance');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [userBehavior, setUserBehavior] = useState(null);

  useEffect(() => {
    if (isOpen) {
      loadRecommendations();
      loadUserBehavior();
    }
  }, [isOpen]);

  const loadRecommendations = async () => {
    setIsLoading(true);
    
    // Simulate loading recommendations
    setTimeout(() => {
      const mockRecommendations = {
        performance: [
          {
            id: 1,
            title: "Optimize Image Loading",
            description: "Implement lazy loading for below-the-fold images to improve page speed",
            impact: "high",
            effort: "low",
            category: "Performance",
            icon: Image,
            metrics: { improvement: "25%", timeSaved: "2.3s" },
            action: "Implement lazy loading",
            priority: 1
          },
          {
            id: 2,
            title: "Enable Code Splitting",
            description: "Split your JavaScript bundles to reduce initial load time",
            impact: "high",
            effort: "medium",
            category: "Performance",
            icon: Code,
            metrics: { improvement: "40%", timeSaved: "1.8s" },
            action: "Configure webpack splitting",
            priority: 2
          },
          {
            id: 3,
            title: "Compress Images",
            description: "Convert images to WebP format and compress existing assets",
            impact: "medium",
            effort: "low",
            category: "Performance",
            icon: Image,
            metrics: { improvement: "60%", sizeReduction: "2.1MB" },
            action: "Convert to WebP",
            priority: 3
          }
        ],
        seo: [
          {
            id: 4,
            title: "Add Meta Descriptions",
            description: "Optimize meta descriptions for better search engine visibility",
            impact: "high",
            effort: "low",
            category: "SEO",
            icon: MessageSquare,
            metrics: { improvement: "35%", ctrIncrease: "12%" },
            action: "Write meta descriptions",
            priority: 1
          },
          {
            id: 5,
            title: "Improve Page Titles",
            description: "Optimize page titles with relevant keywords and proper length",
            impact: "medium",
            effort: "low",
            category: "SEO",
            icon: Target,
            metrics: { improvement: "20%", rankingBoost: "5 positions" },
            action: "Update page titles",
            priority: 2
          }
        ],
        ux: [
          {
            id: 6,
            title: "Add Loading States",
            description: "Implement skeleton screens and loading indicators for better UX",
            impact: "high",
            effort: "medium",
            category: "User Experience",
            icon: Clock,
            metrics: { improvement: "45%", bounceRateReduction: "18%" },
            action: "Add loading states",
            priority: 1
          },
          {
            id: 7,
            title: "Improve Mobile Navigation",
            description: "Optimize mobile menu for better touch interaction",
            impact: "medium",
            effort: "low",
            category: "User Experience",
            icon: MousePointer,
            metrics: { improvement: "30%", mobileEngagement: "+25%" },
            action: "Redesign mobile menu",
            priority: 2
          }
        ],
        content: [
          {
            id: 8,
            title: "Add Case Studies",
            description: "Create detailed case studies to showcase your work",
            impact: "high",
            effort: "high",
            category: "Content",
            icon: Bookmark,
            metrics: { improvement: "50%", leadGeneration: "+40%" },
            action: "Create case studies",
            priority: 1
          },
          {
            id: 9,
            title: "Optimize Call-to-Actions",
            description: "Improve CTA buttons with better copy and positioning",
            impact: "medium",
            effort: "low",
            category: "Content",
            icon: Target,
            metrics: { improvement: "25%", conversionRate: "+15%" },
            action: "Update CTAs",
            priority: 2
          }
        ]
      };
      
      setRecommendations(mockRecommendations);
      setIsLoading(false);
    }, 1500);
  };

  const loadUserBehavior = async () => {
    // Simulate loading user behavior data
    setTimeout(() => {
      const mockBehavior = {
        topPages: [
          { page: "/", views: 1250, bounceRate: 35 },
          { page: "/#about", views: 890, bounceRate: 28 },
          { page: "/#work", views: 1100, bounceRate: 42 },
          { page: "/#contact", views: 650, bounceRate: 25 }
        ],
        userJourney: [
          { step: "Landing", users: 1000, dropoff: 0 },
          { step: "About", users: 750, dropoff: 25 },
          { step: "Portfolio", users: 600, dropoff: 20 },
          { step: "Contact", users: 450, dropoff: 25 }
        ],
        deviceBreakdown: [
          { device: "Desktop", percentage: 65 },
          { device: "Mobile", percentage: 30 },
          { device: "Tablet", percentage: 5 }
        ],
        timeOnPage: {
          average: "2:45",
          byPage: {
            "/": "1:30",
            "/#about": "3:20",
            "/#work": "4:15",
            "/#contact": "2:10"
          }
        }
      };
      
      setUserBehavior(mockBehavior);
    }, 1000);
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-accent bg-accent/20 border-accent/30';
    }
  };

  const getEffortColor = (effort) => {
    switch (effort) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-accent';
    }
  };

  const tabs = [
    { id: 'performance', label: 'Performance', icon: Zap },
    { id: 'seo', label: 'SEO', icon: Target },
    { id: 'ux', label: 'UX', icon: Users },
    { id: 'content', label: 'Content', icon: MessageSquare }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          exit={{ y: 20 }}
          className="w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-primary/95 backdrop-blur-sm border border-accent/20 rounded-xl shadow-lg"
        >
          {/* Header */}
          <div className="p-6 border-b border-accent/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                  <Brain className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-light">Smart Recommendations</h2>
                  <p className="text-sm text-accent/60">AI-powered insights to optimize your website</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-accent/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-accent" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-6 py-4 border-b border-accent/20">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'text-accent/80 hover:text-light hover:bg-accent/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="w-8 h-8 text-accent animate-spin" />
                <span className="ml-2 text-accent">Analyzing your website...</span>
              </div>
            ) : recommendations ? (
              <>
                {/* Recommendations List */}
                <div className="space-y-4">
                  {recommendations[activeTab]?.map((rec, index) => {
                    const Icon = rec.icon;
                    return (
                      <motion.div
                        key={rec.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20 hover:border-accent/40 transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                                  <Icon className="w-6 h-6 text-blue-400" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-lg font-semibold text-light">{rec.title}</h3>
                                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-sm font-medium">
                                      #{rec.priority}
                                    </Badge>
                                  </div>
                                  <p className="text-accent/80 mb-3">{rec.description}</p>
                                  <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1">
                                      <TrendingUp className="w-4 h-4 text-green-400" />
                                      <span className="text-light">Impact:</span>
                                      <Badge className={getImpactColor(rec.impact)}>
                                        {rec.impact}
                                      </Badge>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Clock className="w-4 h-4 text-yellow-400" />
                                      <span className="text-light">Effort:</span>
                                      <span className={getEffortColor(rec.effort)}>
                                        {rec.effort}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                className="bg-blue-500 hover:bg-blue-600 text-white"
                              >
                                <ArrowRight className="w-4 h-4 mr-2" />
                                Implement
                              </Button>
                            </div>

                            {/* Metrics */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-primary-dark rounded-lg border border-accent/20">
                              {Object.entries(rec.metrics).map(([key, value]) => (
                                <div key={key} className="text-center">
                                  <div className="text-2xl font-bold text-light">{value}</div>
                                  <div className="text-xs text-accent/60 capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>

                {/* User Behavior Insights */}
                {userBehavior && (
                  <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                    <CardHeader>
                      <CardTitle className="text-light flex items-center gap-2">
                        <Eye className="w-5 h-5 text-accent" />
                        User Behavior Insights
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-semibold text-light mb-3">Top Pages</h4>
                          <div className="space-y-2">
                            {userBehavior.topPages.map((page, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-primary-dark rounded border border-accent/20">
                                <span className="text-sm text-light">{page.page}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-accent">{page.views} views</span>
                                  <Badge className="bg-accent/20 text-accent border-accent/30 text-sm font-medium">
                                    {page.bounceRate}% bounce
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-light mb-3">User Journey</h4>
                          <div className="space-y-2">
                            {userBehavior.userJourney.map((step, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-primary-dark rounded border border-accent/20">
                                <span className="text-sm text-light">{step.step}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-accent">{step.users} users</span>
                                  {step.dropoff > 0 && (
                                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-sm font-medium">
                                      -{step.dropoff}%
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Quick Actions */}
                <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                  <CardHeader>
                    <CardTitle className="text-light flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-yellow-400" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                        <Image className="w-6 h-6 text-accent" />
                        <span className="text-sm">Optimize Images</span>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                        <Code className="w-6 h-6 text-accent" />
                        <span className="text-sm">Minify Code</span>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                        <Target className="w-6 h-6 text-accent" />
                        <span className="text-sm">SEO Audit</span>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                        <Users className="w-6 h-6 text-accent" />
                        <span className="text-sm">UX Review</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="text-center py-12">
                <Brain className="w-12 h-12 text-accent/60 mx-auto mb-4" />
                <p className="text-accent/80">Failed to load recommendations</p>
                <Button onClick={loadRecommendations} className="mt-4">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SmartRecommendations;
