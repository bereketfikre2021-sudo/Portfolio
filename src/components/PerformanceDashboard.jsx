import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Zap, 
  Clock, 
  Wifi, 
  WifiOff, 
  X, 
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Activity,
  Cpu,
  HardDrive,
  Network
} from 'lucide-react';

const PerformanceDashboard = ({ isOpen, onClose }) => {
  const [performanceData, setPerformanceData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadPerformanceData();
      
      if (autoRefresh) {
        const interval = setInterval(loadPerformanceData, 5000);
        return () => clearInterval(interval);
      }
    }
  }, [isOpen, autoRefresh]);

  const loadPerformanceData = async () => {
    setIsLoading(true);
    
    // Simulate loading performance data
    setTimeout(() => {
      const mockData = {
        score: {
          overall: Math.floor(Math.random() * 40) + 60, // 60-100
          scores: {
            fcp: Math.floor(Math.random() * 40) + 60,
            lcp: Math.floor(Math.random() * 40) + 60,
            fid: Math.floor(Math.random() * 40) + 60,
            cls: Math.floor(Math.random() * 40) + 60,
            tti: Math.floor(Math.random() * 40) + 60,
            tbt: Math.floor(Math.random() * 40) + 60
          }
        },
        metrics: {
          loadTime: Math.floor(Math.random() * 2000) + 1000,
          firstContentfulPaint: Math.floor(Math.random() * 1500) + 800,
          largestContentfulPaint: Math.floor(Math.random() * 2000) + 1200,
          firstInputDelay: Math.floor(Math.random() * 100) + 50,
          cumulativeLayoutShift: Math.random() * 0.2,
          timeToInteractive: Math.floor(Math.random() * 3000) + 2000
        },
        resources: {
          total: Math.floor(Math.random() * 50) + 30,
          slow: Math.floor(Math.random() * 5) + 1,
          large: Math.floor(Math.random() * 3) + 1,
          renderBlocking: Math.floor(Math.random() * 8) + 5
        },
        memory: {
          used: Math.floor(Math.random() * 50) + 20,
          total: Math.floor(Math.random() * 100) + 50,
          limit: 100
        },
        connection: {
          type: ['4g', '3g', 'slow-2g'][Math.floor(Math.random() * 3)],
          downlink: Math.random() * 10 + 1,
          rtt: Math.floor(Math.random() * 200) + 50
        }
      };
      
      setPerformanceData(mockData);
      setIsLoading(false);
    }, 500);
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

  const getScoreIcon = (score) => {
    if (score >= 90) return <CheckCircle className="w-4 h-4 text-green-400" />;
    if (score >= 70) return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
    return <AlertTriangle className="w-4 h-4 text-red-400" />;
  };

  const formatMetric = (value, unit = 'ms') => {
    if (unit === 'ms') {
      return value < 1000 ? `${value}ms` : `${(value / 1000).toFixed(1)}s`;
    }
    if (unit === 'bytes') {
      if (value < 1024) return `${value}B`;
      if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)}KB`;
      return `${(value / (1024 * 1024)).toFixed(1)}MB`;
    }
    return value;
  };

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
                  <Activity className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-light">Performance Dashboard</h2>
                  <p className="text-sm text-accent/60">Real-time performance metrics and optimization insights</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  variant={autoRefresh ? "default" : "outline"}
                  size="sm"
                  className="text-xs"
                >
                  <RefreshCw className={`w-3 h-3 mr-1 ${autoRefresh ? 'animate-spin' : ''}`} />
                  Auto Refresh
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

          {/* Content */}
          <div className="p-6 space-y-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="w-8 h-8 text-accent animate-spin" />
                <span className="ml-2 text-accent">Loading performance data...</span>
              </div>
            ) : performanceData ? (
              <>
                {/* Overall Score */}
                <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-light">Overall Performance Score</h3>
                      {getScoreIcon(performanceData.score.overall)}
                    </div>
                    <div className="flex items-center gap-6">
                      <div className={`p-6 rounded-xl border ${getScoreBg(performanceData.score.overall)}`}>
                        <div className="text-4xl font-bold text-light">
                          {performanceData.score.overall}
                        </div>
                        <div className="text-sm text-accent/60">/ 100</div>
                      </div>
                      <div className="flex-1">
                        <div className="w-full bg-primary/30 rounded-full h-3 mb-2">
                          <motion.div
                            className="bg-accent h-3 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${performanceData.score.overall}%` }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                        <p className="text-sm text-accent/80">
                          {performanceData.score.overall >= 90 ? 'Excellent performance!' :
                           performanceData.score.overall >= 70 ? 'Good performance with room for improvement' :
                           'Performance needs optimization'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Core Web Vitals */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(performanceData.score.scores).map(([metric, score]) => (
                    <Card key={metric} className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-semibold text-light uppercase">
                            {metric}
                          </h4>
                          {getScoreIcon(score)}
                        </div>
                        <div className="text-2xl font-bold text-light mb-1">{score}</div>
                        <div className="w-full bg-primary/30 rounded-full h-2">
                          <motion.div
                            className={`h-2 rounded-full ${score >= 90 ? 'bg-green-500' : score >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${score}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                    <CardHeader>
                      <CardTitle className="text-light flex items-center gap-2">
                        <Clock className="w-5 h-5 text-accent" />
                        Timing Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {Object.entries(performanceData.metrics).map(([metric, value]) => (
                        <div key={metric} className="flex items-center justify-between">
                          <span className="text-sm text-accent/80 capitalize">
                            {metric.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className="text-sm font-medium text-light">
                            {formatMetric(value)}
                          </span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                    <CardHeader>
                      <CardTitle className="text-light flex items-center gap-2">
                        <Network className="w-5 h-5 text-accent" />
                        Resource Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {Object.entries(performanceData.resources).map(([metric, value]) => (
                        <div key={metric} className="flex items-center justify-between">
                          <span className="text-sm text-accent/80 capitalize">
                            {metric.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <Badge className="bg-accent/20 text-accent border-accent/30 text-sm font-medium">
                            {value}
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* System Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <HardDrive className="w-4 h-4 text-accent" />
                        <span className="text-sm font-semibold text-light">Memory Usage</span>
                      </div>
                      <div className="text-lg font-bold text-light">
                        {performanceData.memory.used}MB
                      </div>
                      <div className="text-xs text-accent/60">
                        of {performanceData.memory.limit}MB limit
                      </div>
                      <div className="w-full bg-primary/30 rounded-full h-2 mt-2">
                        <div 
                          className="bg-accent h-2 rounded-full"
                          style={{ width: `${(performanceData.memory.used / performanceData.memory.limit) * 100}%` }}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Wifi className="w-4 h-4 text-accent" />
                        <span className="text-sm font-semibold text-light">Connection</span>
                      </div>
                      <div className="text-lg font-bold text-light">
                        {performanceData.connection.type.toUpperCase()}
                      </div>
                      <div className="text-xs text-accent/60">
                        {performanceData.connection.downlink.toFixed(1)} Mbps
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Cpu className="w-4 h-4 text-accent" />
                        <span className="text-sm font-semibold text-light">RTT</span>
                      </div>
                      <div className="text-lg font-bold text-light">
                        {performanceData.connection.rtt}ms
                      </div>
                      <div className="text-xs text-accent/60">
                        Round trip time
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Optimization Recommendations */}
                <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                  <CardHeader>
                    <CardTitle className="text-light flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-accent" />
                      Optimization Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {performanceData.score.overall < 90 && (
                        <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5" />
                            <div>
                              <h4 className="text-sm font-semibold text-yellow-400">Performance Optimization Needed</h4>
                              <p className="text-xs text-accent/80 mt-1">
                                Consider implementing code splitting, image optimization, and caching strategies.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {performanceData.resources.slow > 0 && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5" />
                            <div>
                              <h4 className="text-sm font-semibold text-red-400">Slow Resources Detected</h4>
                              <p className="text-xs text-accent/80 mt-1">
                                {performanceData.resources.slow} resources are loading slowly. Consider optimizing or deferring them.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {performanceData.resources.large > 0 && (
                        <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5" />
                            <div>
                              <h4 className="text-sm font-semibold text-orange-400">Large Resources Found</h4>
                              <p className="text-xs text-accent/80 mt-1">
                                {performanceData.resources.large} resources are larger than 500KB. Consider compression or optimization.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="text-center py-12">
                <AlertTriangle className="w-12 h-12 text-accent/60 mx-auto mb-4" />
                <p className="text-accent/80">Failed to load performance data</p>
                <Button onClick={loadPerformanceData} className="mt-4">
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

export default PerformanceDashboard;
