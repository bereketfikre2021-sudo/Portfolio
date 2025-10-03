import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  X, 
  RefreshCw,
  Plus,
  Edit,
  Trash2,
  Send,
  Eye,
  Users,
  TrendingUp,
  Calendar,
  Clock,
  Target,
  BarChart3,
  FileText,
  Image,
  Link,
  Settings,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  Star,
  Filter,
  Search,
  Download,
  Upload
} from 'lucide-react';

const EmailMarketing = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    if (isOpen) {
      loadEmailData();
    }
  }, [isOpen]);

  const loadEmailData = async () => {
    setIsLoading(true);
    
    // Simulate loading email marketing data
    setTimeout(() => {
      const mockCampaigns = [
        {
          id: 1,
          name: "Welcome Series",
          subject: "Welcome to Our Design Studio!",
          status: "active",
          type: "automated",
          recipients: 1250,
          sent: 1250,
          opened: 875,
          clicked: 234,
          unsubscribed: 12,
          created: "2024-01-10",
          lastSent: "2024-01-15"
        },
        {
          id: 2,
          name: "Portfolio Showcase",
          subject: "Check Out Our Latest Projects",
          status: "draft",
          type: "manual",
          recipients: 0,
          sent: 0,
          opened: 0,
          clicked: 0,
          unsubscribed: 0,
          created: "2024-01-14",
          lastSent: null
        },
        {
          id: 3,
          name: "Newsletter - January",
          subject: "Design Trends & Tips for 2024",
          status: "completed",
          type: "manual",
          recipients: 1100,
          sent: 1100,
          opened: 660,
          clicked: 165,
          unsubscribed: 8,
          created: "2024-01-01",
          lastSent: "2024-01-05"
        }
      ];

      const mockTemplates = [
        {
          id: 1,
          name: "Welcome Email",
          category: "Onboarding",
          preview: "Welcome to our design studio! We're excited to have you on board...",
          lastUsed: "2024-01-15",
          usage: 15
        },
        {
          id: 2,
          name: "Project Update",
          category: "Client Communication",
          preview: "Here's an update on your project progress...",
          lastUsed: "2024-01-12",
          usage: 8
        },
        {
          id: 3,
          name: "Newsletter Template",
          category: "Marketing",
          preview: "Monthly newsletter with design tips and industry insights...",
          lastUsed: "2024-01-05",
          usage: 3
        }
      ];

      const mockSubscribers = [
        {
          id: 1,
          email: "john@example.com",
          name: "John Smith",
          status: "active",
          subscribed: "2024-01-10",
          source: "Website",
          tags: ["VIP", "Design"],
          lastActivity: "2024-01-15"
        },
        {
          id: 2,
          email: "sarah@startup.com",
          name: "Sarah Johnson",
          status: "active",
          subscribed: "2024-01-12",
          source: "Referral",
          tags: ["Startup", "UI/UX"],
          lastActivity: "2024-01-14"
        },
        {
          id: 3,
          email: "mike@enterprise.com",
          name: "Mike Chen",
          status: "unsubscribed",
          subscribed: "2024-01-08",
          source: "LinkedIn",
          tags: ["Enterprise"],
          lastActivity: "2024-01-13"
        }
      ];

      const mockAnalytics = {
        totalSubscribers: 1250,
        activeSubscribers: 1180,
        unsubscribed: 70,
        openRate: 68.5,
        clickRate: 18.7,
        unsubscribeRate: 0.96,
        topPerformingCampaign: "Welcome Series",
        recentActivity: [
          { date: "2024-01-15", action: "New subscriber", email: "new@example.com" },
          { date: "2024-01-15", action: "Email opened", email: "john@example.com" },
          { date: "2024-01-14", action: "Link clicked", email: "sarah@startup.com" },
          { date: "2024-01-14", action: "Unsubscribed", email: "old@example.com" }
        ]
      };

      setCampaigns(mockCampaigns);
      setTemplates(mockTemplates);
      setSubscribers(mockSubscribers);
      setAnalytics(mockAnalytics);
      setIsLoading(false);
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'draft': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'completed': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'paused': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-accent bg-accent/20 border-accent/30';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'automated': return 'text-purple-400 bg-purple-500/20 border-purple-500/30';
      case 'manual': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      default: return 'text-accent bg-accent/20 border-accent/30';
    }
  };

  const calculateOpenRate = (opened, sent) => {
    return sent > 0 ? ((opened / sent) * 100).toFixed(1) : 0;
  };

  const calculateClickRate = (clicked, sent) => {
    return sent > 0 ? ((clicked / sent) * 100).toFixed(1) : 0;
  };

  const tabs = [
    { id: 'campaigns', label: 'Campaigns', icon: Mail },
    { id: 'templates', label: 'Templates', icon: FileText },
    { id: 'subscribers', label: 'Subscribers', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
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
          className="w-full max-w-7xl max-h-[90vh] overflow-y-auto bg-primary/95 backdrop-blur-sm border border-accent/20 rounded-xl shadow-lg"
        >
          {/* Header */}
          <div className="p-6 border-b border-accent/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-light">Email Marketing</h2>
                  <p className="text-sm text-accent/60">Manage campaigns, templates, and subscribers</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Sync
                </Button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-accent/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-accent" />
                </button>
              </div>
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
                        ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
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
                <span className="ml-2 text-accent">Loading email data...</span>
              </div>
            ) : (
              <>
                {/* Campaigns Tab */}
                {activeTab === 'campaigns' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-light">Email Campaigns</h3>
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Campaign
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                      {campaigns.map((campaign) => (
                        <Card key={campaign.id} className="bg-primary/50 backdrop-blur-sm border border-accent/20 hover:border-orange-500/50 transition-all duration-300">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="text-lg font-semibold text-light">{campaign.name}</h4>
                                <p className="text-sm text-accent/80">{campaign.subject}</p>
                              </div>
                              <div className="flex flex-col gap-1">
                                <Badge className={getStatusColor(campaign.status)}>
                                  {campaign.status}
                                </Badge>
                                <Badge className={getTypeColor(campaign.type)}>
                                  {campaign.type}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="space-y-2 mb-4">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-accent/80">Recipients:</span>
                                <span className="text-light">{campaign.recipients.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-accent/80">Open Rate:</span>
                                <span className="text-light">{calculateOpenRate(campaign.opened, campaign.sent)}%</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-accent/80">Click Rate:</span>
                                <span className="text-light">{calculateClickRate(campaign.clicked, campaign.sent)}%</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-xs text-accent/60">
                                {campaign.lastSent ? `Last sent: ${campaign.lastSent}` : `Created: ${campaign.created}`}
                              </span>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                {campaign.status === 'draft' && (
                                  <Button variant="ghost" size="sm">
                                    <Send className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Templates Tab */}
                {activeTab === 'templates' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-light">Email Templates</h3>
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Template
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {templates.map((template) => (
                        <Card key={template.id} className="bg-primary/50 backdrop-blur-sm border border-accent/20 hover:border-orange-500/50 transition-all duration-300">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="text-lg font-semibold text-light">{template.name}</h4>
                                <Badge className="bg-accent/20 text-accent border-accent/30 text-sm font-medium">
                                  {template.category}
                                </Badge>
                              </div>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            
                            <p className="text-sm text-accent/80 mb-3 line-clamp-2">
                              {template.preview}
                            </p>

                            <div className="flex items-center justify-between text-xs text-accent/60">
                              <span>Used {template.usage} times</span>
                              <span>Last: {template.lastUsed}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Subscribers Tab */}
                {activeTab === 'subscribers' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-light">Subscriber Management</h3>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Import
                        </Button>
                        <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Subscriber
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {subscribers.map((subscriber) => (
                        <Card key={subscriber.id} className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="text-lg font-semibold text-light">{subscriber.name}</h4>
                                <p className="text-sm text-accent/80">{subscriber.email}</p>
                              </div>
                              <Badge className={getStatusColor(subscriber.status)}>
                                {subscriber.status}
                              </Badge>
                            </div>
                            
                            <div className="space-y-2 mb-3">
                              <div className="flex items-center gap-2 text-sm text-accent/80">
                                <Calendar className="w-4 h-4" />
                                Subscribed: {subscriber.subscribed}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-accent/80">
                                <Target className="w-4 h-4" />
                                Source: {subscriber.source}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-accent/80">
                                <Clock className="w-4 h-4" />
                                Last activity: {subscriber.lastActivity}
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex gap-1">
                                {subscriber.tags.map((tag, index) => (
                                  <Badge key={index} className="bg-accent/20 text-accent border-accent/30 text-sm font-medium">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Mail className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Analytics Tab */}
                {activeTab === 'analytics' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-light">Email Analytics</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                        <CardContent className="p-4 text-center">
                          <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-light">{analytics?.totalSubscribers}</div>
                          <div className="text-sm text-accent/80">Total Subscribers</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                        <CardContent className="p-4 text-center">
                          <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-light">{analytics?.openRate}%</div>
                          <div className="text-sm text-accent/80">Open Rate</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                        <CardContent className="p-4 text-center">
                          <Target className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-light">{analytics?.clickRate}%</div>
                          <div className="text-sm text-accent/80">Click Rate</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                        <CardContent className="p-4 text-center">
                          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-light">{analytics?.unsubscribeRate}%</div>
                          <div className="text-sm text-accent/80">Unsubscribe Rate</div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                      <CardHeader>
                        <CardTitle className="text-light flex items-center gap-2">
                          <Clock className="w-5 h-5 text-accent" />
                          Recent Activity
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {analytics?.recentActivity.map((activity, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-primary-dark rounded border border-accent/20">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-accent rounded-full" />
                                <span className="text-sm text-light">{activity.action}</span>
                                <span className="text-xs text-accent/60">{activity.email}</span>
                              </div>
                              <span className="text-xs text-accent/60">{activity.date}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmailMarketing;
