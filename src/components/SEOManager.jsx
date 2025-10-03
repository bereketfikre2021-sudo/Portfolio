import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  X, 
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Eye,
  Link,
  Image,
  FileText,
  Globe,
  BarChart3,
  Settings,
  Download,
  Upload
} from 'lucide-react';
import sitemapGenerator from '../utils/sitemapGenerator';

const SEOManager = ({ isOpen, onClose }) => {
  const [seoData, setSeoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [sitemapData, setSitemapData] = useState(null);

  useEffect(() => {
    if (isOpen) {
      loadSEOData();
      loadSitemapData();
    }
  }, [isOpen]);

  const loadSEOData = async () => {
    setIsLoading(true);
    
    // Simulate loading SEO data
    setTimeout(() => {
      const mockData = {
        overview: {
          score: Math.floor(Math.random() * 20) + 80, // 80-100
          issues: Math.floor(Math.random() * 5),
          recommendations: Math.floor(Math.random() * 8) + 3
        },
        metaTags: {
          title: "Bereket Fikre - Creative Designer & Brand Strategist",
          description: "Professional creative designer specializing in brand identity, UI/UX design, and digital marketing. Transform your vision into compelling visual experiences.",
          keywords: ["creative designer", "brand identity", "UI/UX design", "portfolio", "Bereket Fikre"],
          titleLength: 65,
          descriptionLength: 155,
          titleScore: 95,
          descriptionScore: 88
        },
        structuredData: {
          person: true,
          organization: true,
          portfolio: true,
          services: true,
          breadcrumbs: false,
          faq: false
        },
        performance: {
          pageSpeed: Math.floor(Math.random() * 20) + 80,
          mobileFriendly: true,
          coreWebVitals: {
            fcp: Math.floor(Math.random() * 500) + 800,
            lcp: Math.floor(Math.random() * 1000) + 1200,
            fid: Math.floor(Math.random() * 50) + 50,
            cls: Math.random() * 0.1
          }
        },
        social: {
          openGraph: true,
          twitterCard: true,
          linkedin: true,
          facebook: false
        },
        technical: {
          sitemap: true,
          robots: true,
          canonical: true,
          https: true,
          mobileOptimized: true
        }
      };
      
      setSeoData(mockData);
      setIsLoading(false);
    }, 1000);
  };

  const loadSitemapData = () => {
    const pages = sitemapGenerator.getPages();
    setSitemapData({
      totalPages: pages.length,
      pages: pages,
      lastGenerated: new Date().toISOString()
    });
  };

  const generateSitemap = () => {
    const xml = sitemapGenerator.generateXML();
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateRobotsTxt = () => {
    const robots = sitemapGenerator.generateRobotsTxt();
    const blob = new Blob([robots], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (score) => {
    if (score >= 90) return 'bg-green-500/20 border-green-500/30';
    if (score >= 70) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'meta', label: 'Meta Tags', icon: FileText },
    { id: 'structured', label: 'Structured Data', icon: Link },
    { id: 'sitemap', label: 'Sitemap', icon: Globe },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'social', label: 'Social', icon: Eye }
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
                <div className="w-10 h-10 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-full flex items-center justify-center">
                  <Search className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-light">SEO Manager</h2>
                  <p className="text-sm text-accent/60">Optimize your website for search engines</p>
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
                        ? 'bg-accent text-primary'
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
          <div className="p-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="w-8 h-8 text-accent animate-spin" />
                <span className="ml-2 text-accent">Loading SEO data...</span>
              </div>
            ) : seoData ? (
              <>
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Overall Score */}
                    <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-light">Overall SEO Score</h3>
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        </div>
                        <div className="flex items-center gap-6">
                          <div className={`p-6 rounded-xl border ${getScoreBg(seoData.overview.score)}`}>
                            <div className="text-4xl font-bold text-light">
                              {seoData.overview.score}
                            </div>
                            <div className="text-sm text-accent/60">/ 100</div>
                          </div>
                          <div className="flex-1">
                            <div className="w-full bg-primary/30 rounded-full h-3 mb-2">
                              <motion.div
                                className="bg-accent h-3 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${seoData.overview.score}%` }}
                                transition={{ duration: 1 }}
                              />
                            </div>
                            <p className="text-sm text-accent/80">
                              {seoData.overview.score >= 90 ? 'Excellent SEO optimization!' :
                               seoData.overview.score >= 70 ? 'Good SEO with room for improvement' :
                               'SEO needs significant optimization'}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                        <CardContent className="p-4 text-center">
                          <AlertTriangle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-light">{seoData.overview.issues}</div>
                          <div className="text-sm text-accent/80">Issues Found</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                        <CardContent className="p-4 text-center">
                          <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-light">{seoData.overview.recommendations}</div>
                          <div className="text-sm text-accent/80">Recommendations</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                        <CardContent className="p-4 text-center">
                          <TrendingUp className="w-8 h-8 text-accent mx-auto mb-2" />
                          <div className="text-2xl font-bold text-light">+12%</div>
                          <div className="text-sm text-accent/80">Traffic Growth</div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {/* Meta Tags Tab */}
                {activeTab === 'meta' && (
                  <div className="space-y-6">
                    <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                      <CardHeader>
                        <CardTitle className="text-light flex items-center gap-2">
                          <FileText className="w-5 h-5 text-accent" />
                          Meta Tags Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-light">Page Title</label>
                            <div className="mt-1 p-3 bg-primary-dark rounded-lg border border-accent/20">
                              <div className="text-sm text-light">{seoData.metaTags.title}</div>
                              <div className="text-xs text-accent/60 mt-1">
                                Length: {seoData.metaTags.titleLength} characters
                              </div>
                            </div>
                            <Badge className={`mt-2 ${getScoreColor(seoData.metaTags.titleScore)}`}>
                              Score: {seoData.metaTags.titleScore}/100
                            </Badge>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-light">Meta Description</label>
                            <div className="mt-1 p-3 bg-primary-dark rounded-lg border border-accent/20">
                              <div className="text-sm text-light">{seoData.metaTags.description}</div>
                              <div className="text-xs text-accent/60 mt-1">
                                Length: {seoData.metaTags.descriptionLength} characters
                              </div>
                            </div>
                            <Badge className={`mt-2 ${getScoreColor(seoData.metaTags.descriptionScore)}`}>
                              Score: {seoData.metaTags.descriptionScore}/100
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-light">Keywords</label>
                          <div className="mt-1 flex flex-wrap gap-2">
                            {seoData.metaTags.keywords.map((keyword, index) => (
                              <Badge key={index} className="bg-accent/20 text-accent border-accent/30 text-sm font-medium">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Structured Data Tab */}
                {activeTab === 'structured' && (
                  <div className="space-y-6">
                    <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                      <CardHeader>
                        <CardTitle className="text-light flex items-center gap-2">
                          <Link className="w-5 h-5 text-accent" />
                          Structured Data Status
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(seoData.structuredData).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between p-3 bg-primary-dark rounded-lg border border-accent/20">
                              <span className="text-sm text-light capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                              {value ? (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                              ) : (
                                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Sitemap Tab */}
                {activeTab === 'sitemap' && (
                  <div className="space-y-6">
                    <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                      <CardHeader>
                        <CardTitle className="text-light flex items-center gap-2">
                          <Globe className="w-5 h-5 text-accent" />
                          Sitemap Management
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-lg font-semibold text-light">
                              {sitemapData?.totalPages || 0} Pages
                            </div>
                            <div className="text-sm text-accent/60">
                              Last generated: {sitemapData?.lastGenerated ? new Date(sitemapData.lastGenerated).toLocaleDateString() : 'Never'}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={generateSitemap} size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Download Sitemap
                            </Button>
                            <Button onClick={generateRobotsTxt} variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Download Robots.txt
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {sitemapData?.pages.map((page, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-primary-dark rounded border border-accent/20">
                              <div>
                                <div className="text-sm text-light">{page.url}</div>
                                <div className="text-xs text-accent/60">
                                  {page.type} • Priority: {page.priority} • Updated: {page.lastmod}
                                </div>
                              </div>
                              <Badge className="bg-accent/20 text-accent border-accent/30 text-sm font-medium">
                                {page.changefreq}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Performance Tab */}
                {activeTab === 'performance' && (
                  <div className="space-y-6">
                    <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                      <CardHeader>
                        <CardTitle className="text-light flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-accent" />
                          SEO Performance
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-accent/80 mb-2">Page Speed Score</div>
                            <div className={`text-3xl font-bold ${getScoreColor(seoData.performance.pageSpeed)}`}>
                              {seoData.performance.pageSpeed}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-accent/80 mb-2">Mobile Friendly</div>
                            <div className="flex items-center gap-2">
                              {seoData.performance.mobileFriendly ? (
                                <CheckCircle className="w-6 h-6 text-green-400" />
                              ) : (
                                <AlertTriangle className="w-6 h-6 text-red-400" />
                              )}
                              <span className="text-light">
                                {seoData.performance.mobileFriendly ? 'Yes' : 'No'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-accent/80 mb-2">Core Web Vitals</div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.entries(seoData.performance.coreWebVitals).map(([metric, value]) => (
                              <div key={metric} className="text-center">
                                <div className="text-lg font-semibold text-light">
                                  {typeof value === 'number' ? value.toFixed(1) : value}
                                </div>
                                <div className="text-xs text-accent/60 uppercase">
                                  {metric}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Social Tab */}
                {activeTab === 'social' && (
                  <div className="space-y-6">
                    <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                      <CardHeader>
                        <CardTitle className="text-light flex items-center gap-2">
                          <Eye className="w-5 h-5 text-accent" />
                          Social Media Optimization
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(seoData.social).map(([platform, enabled]) => (
                            <div key={platform} className="flex items-center justify-between p-3 bg-primary-dark rounded-lg border border-accent/20">
                              <span className="text-sm text-light capitalize">
                                {platform.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                              {enabled ? (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                              ) : (
                                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <AlertTriangle className="w-12 h-12 text-accent/60 mx-auto mb-4" />
                <p className="text-accent/80">Failed to load SEO data</p>
                <Button onClick={loadSEOData} className="mt-4">
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

export default SEOManager;
