import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  X, 
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Activity,
  Settings,
  Download,
  Trash2,
  Key,
  Globe,
  Database,
  User
} from 'lucide-react';

const SecurityDashboard = ({ isOpen, onClose }) => {
  const [securityData, setSecurityData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showThreats, setShowThreats] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadSecurityData();
    }
  }, [isOpen]);

  const loadSecurityData = async () => {
    setIsLoading(true);
    
    // Simulate loading security data
    setTimeout(() => {
      const mockData = {
        overview: {
          score: Math.floor(Math.random() * 20) + 80, // 80-100
          threats: Math.floor(Math.random() * 10),
          blocked: Math.floor(Math.random() * 50) + 20,
          lastScan: new Date().toISOString()
        },
        policies: {
          csp: true,
          hsts: true,
          xss: true,
          clickjacking: true,
          csrf: true,
          mixedContent: false
        },
        threats: [
          {
            type: 'csp_violation',
            timestamp: new Date(Date.now() - 300000).toISOString(),
            message: 'Script blocked by Content Security Policy',
            severity: 'medium'
          },
          {
            type: 'xss_attempt',
            timestamp: new Date(Date.now() - 600000).toISOString(),
            message: 'Suspicious script injection detected',
            severity: 'high'
          },
          {
            type: 'csrf_attempt',
            timestamp: new Date(Date.now() - 900000).toISOString(),
            message: 'Invalid CSRF token detected',
            severity: 'high'
          }
        ],
        statistics: {
          totalThreats: 15,
          threatsByType: {
            'csp_violation': 5,
            'xss_attempt': 3,
            'csrf_attempt': 2,
            'clickjacking_attempt': 1,
            'data_exfiltration_attempt': 4
          },
          threatsByHour: {
            '10': 2,
            '11': 1,
            '12': 3,
            '13': 2,
            '14': 1,
            '15': 4,
            '16': 2
          }
        },
        dataProtection: {
          encryption: true,
          anonymization: true,
          consent: true,
          dataRetention: '30 days',
          gdprCompliant: true
        },
        monitoring: {
          active: true,
          realTime: true,
          alerts: true,
          reporting: true
        }
      };
      
      setSecurityData(mockData);
      setIsLoading(false);
    }, 1000);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-accent bg-accent/20 border-accent/30';
    }
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
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'threats', label: 'Threats', icon: AlertTriangle },
    { id: 'policies', label: 'Policies', icon: Lock },
    { id: 'data', label: 'Data Protection', icon: Database },
    { id: 'monitoring', label: 'Monitoring', icon: Activity }
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
                <div className="w-10 h-10 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-light">Security Dashboard</h2>
                  <p className="text-sm text-accent/60">Monitor and manage security threats</p>
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
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
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
                <span className="ml-2 text-accent">Loading security data...</span>
              </div>
            ) : securityData ? (
              <>
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Security Score */}
                    <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-light">Security Score</h3>
                          <Shield className="w-6 h-6 text-green-400" />
                        </div>
                        <div className="flex items-center gap-6">
                          <div className={`p-6 rounded-xl border ${getScoreBg(securityData.overview.score)}`}>
                            <div className="text-4xl font-bold text-light">
                              {securityData.overview.score}
                            </div>
                            <div className="text-sm text-accent/60">/ 100</div>
                          </div>
                          <div className="flex-1">
                            <div className="w-full bg-primary/30 rounded-full h-3 mb-2">
                              <motion.div
                                className="bg-green-500 h-3 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${securityData.overview.score}%` }}
                                transition={{ duration: 1 }}
                              />
                            </div>
                            <p className="text-sm text-accent/80">
                              {securityData.overview.score >= 90 ? 'Excellent security posture!' :
                               securityData.overview.score >= 70 ? 'Good security with room for improvement' :
                               'Security needs immediate attention'}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Security Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                        <CardContent className="p-4 text-center">
                          <AlertTriangle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-light">{securityData.overview.threats}</div>
                          <div className="text-sm text-accent/80">Active Threats</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                        <CardContent className="p-4 text-center">
                          <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-light">{securityData.overview.blocked}</div>
                          <div className="text-sm text-accent/80">Threats Blocked</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                        <CardContent className="p-4 text-center">
                          <Activity className="w-8 h-8 text-accent mx-auto mb-2" />
                          <div className="text-2xl font-bold text-light">24/7</div>
                          <div className="text-sm text-accent/80">Monitoring</div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Recent Activity */}
                    <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                      <CardHeader>
                        <CardTitle className="text-light flex items-center gap-2">
                          <Activity className="w-5 h-5 text-accent" />
                          Recent Security Activity
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {securityData.threats.slice(0, 5).map((threat, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-primary-dark rounded-lg border border-accent/20">
                              <div className="flex items-center gap-3">
                                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                                <div>
                                  <div className="text-sm text-light">{threat.message}</div>
                                  <div className="text-xs text-accent/60">
                                    {new Date(threat.timestamp).toLocaleString()}
                                  </div>
                                </div>
                              </div>
                              <Badge className={getSeverityColor(threat.severity)}>
                                {threat.severity}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Threats Tab */}
                {activeTab === 'threats' && (
                  <div className="space-y-6">
                    <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                      <CardHeader>
                        <CardTitle className="text-light flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-accent" />
                            Security Threats
                          </div>
                          <Button
                            onClick={() => setShowThreats(!showThreats)}
                            variant="outline"
                            size="sm"
                          >
                            {showThreats ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                            {showThreats ? 'Hide' : 'Show'} Details
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {securityData.threats.map((threat, index) => (
                            <div key={index} className="p-4 bg-primary-dark rounded-lg border border-accent/20">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                                  <span className="text-sm font-medium text-light">
                                    {threat.type.replace(/_/g, ' ').toUpperCase()}
                                  </span>
                                </div>
                                <Badge className={getSeverityColor(threat.severity)}>
                                  {threat.severity}
                                </Badge>
                              </div>
                              <div className="text-sm text-accent/80 mb-2">{threat.message}</div>
                              <div className="text-xs text-accent/60">
                                {new Date(threat.timestamp).toLocaleString()}
                              </div>
                              {showThreats && (
                                <div className="mt-3 p-2 bg-primary/50 rounded text-xs text-accent/60">
                                  <pre>{JSON.stringify(threat, null, 2)}</pre>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Threat Statistics */}
                    <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                      <CardHeader>
                        <CardTitle className="text-light flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-accent" />
                          Threat Statistics
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-semibold text-light mb-3">Threats by Type</h4>
                            <div className="space-y-2">
                              {Object.entries(securityData.statistics.threatsByType).map(([type, count]) => (
                                <div key={type} className="flex items-center justify-between">
                                  <span className="text-sm text-accent/80 capitalize">
                                    {type.replace(/_/g, ' ')}
                                  </span>
                                  <Badge className="bg-accent/20 text-accent border-accent/30 text-sm font-medium">
                                    {count}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-light mb-3">Threats by Hour</h4>
                            <div className="space-y-2">
                              {Object.entries(securityData.statistics.threatsByHour).map(([hour, count]) => (
                                <div key={hour} className="flex items-center justify-between">
                                  <span className="text-sm text-accent/80">
                                    {hour}:00
                                  </span>
                                  <Badge className="bg-accent/20 text-accent border-accent/30 text-sm font-medium">
                                    {count}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Policies Tab */}
                {activeTab === 'policies' && (
                  <div className="space-y-6">
                    <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                      <CardHeader>
                        <CardTitle className="text-light flex items-center gap-2">
                          <Lock className="w-5 h-5 text-accent" />
                          Security Policies
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(securityData.policies).map(([policy, enabled]) => (
                            <div key={policy} className="flex items-center justify-between p-3 bg-primary-dark rounded-lg border border-accent/20">
                              <span className="text-sm text-light capitalize">
                                {policy.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                              {enabled ? (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                              ) : (
                                <AlertCircle className="w-5 h-5 text-red-400" />
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Data Protection Tab */}
                {activeTab === 'data' && (
                  <div className="space-y-6">
                    <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                      <CardHeader>
                        <CardTitle className="text-light flex items-center gap-2">
                          <Database className="w-5 h-5 text-accent" />
                          Data Protection
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(securityData.dataProtection).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between p-3 bg-primary-dark rounded-lg border border-accent/20">
                              <span className="text-sm text-light capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                              {typeof value === 'boolean' ? (
                                value ? (
                                  <CheckCircle className="w-5 h-5 text-green-400" />
                                ) : (
                                  <AlertCircle className="w-5 h-5 text-red-400" />
                                )
                              ) : (
                                <span className="text-sm text-accent">{value}</span>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Key className="w-4 h-4 mr-2" />
                            Manage Encryption
                          </Button>
                          <Button variant="outline" size="sm">
                            <User className="w-4 h-4 mr-2" />
                            Privacy Settings
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-400 hover:bg-red-500/20">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Clear Data
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Monitoring Tab */}
                {activeTab === 'monitoring' && (
                  <div className="space-y-6">
                    <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                      <CardHeader>
                        <CardTitle className="text-light flex items-center gap-2">
                          <Activity className="w-5 h-5 text-accent" />
                          Security Monitoring
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(securityData.monitoring).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between p-3 bg-primary-dark rounded-lg border border-accent/20">
                              <span className="text-sm text-light capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                              {typeof value === 'boolean' ? (
                                value ? (
                                  <CheckCircle className="w-5 h-5 text-green-400" />
                                ) : (
                                  <AlertCircle className="w-5 h-5 text-red-400" />
                                )
                              ) : (
                                <span className="text-sm text-accent">{value}</span>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Settings className="w-4 h-4 mr-2" />
                            Configure Alerts
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Export Report
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <AlertTriangle className="w-12 h-12 text-accent/60 mx-auto mb-4" />
                <p className="text-accent/80">Failed to load security data</p>
                <Button onClick={loadSecurityData} className="mt-4">
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

export default SecurityDashboard;
