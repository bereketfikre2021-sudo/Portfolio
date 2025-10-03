import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  X, 
  RefreshCw,
  Plus,
  Edit,
  Trash2,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Building,
  Star,
  Filter,
  Search,
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Eye,
  MessageSquare,
  FileText,
  Tag,
  BarChart3
} from 'lucide-react';

const CRMIntegration = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('contacts');
  const [isLoading, setIsLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [leads, setLeads] = useState([]);
  const [deals, setDeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    if (isOpen) {
      loadCRMData();
    }
  }, [isOpen]);

  const loadCRMData = async () => {
    setIsLoading(true);
    
    // Simulate loading CRM data
    setTimeout(() => {
      const mockContacts = [
        {
          id: 1,
          name: "John Smith",
          email: "john@example.com",
          phone: "+1-555-0123",
          company: "Tech Corp",
          status: "active",
          lastContact: "2024-01-15",
          source: "Website",
          tags: ["VIP", "Design"],
          notes: "Interested in brand redesign"
        },
        {
          id: 2,
          name: "Sarah Johnson",
          email: "sarah@startup.com",
          phone: "+1-555-0456",
          company: "StartupXYZ",
          status: "lead",
          lastContact: "2024-01-14",
          source: "Referral",
          tags: ["Startup", "UI/UX"],
          notes: "Looking for mobile app design"
        },
        {
          id: 3,
          name: "Mike Chen",
          email: "mike@enterprise.com",
          phone: "+1-555-0789",
          company: "Enterprise Inc",
          status: "prospect",
          lastContact: "2024-01-13",
          source: "LinkedIn",
          tags: ["Enterprise", "B2B"],
          notes: "Large project opportunity"
        }
      ];

      const mockLeads = [
        {
          id: 1,
          name: "Emily Davis",
          email: "emily@newcompany.com",
          company: "New Company",
          source: "Website Form",
          score: 85,
          status: "hot",
          created: "2024-01-15",
          lastActivity: "2024-01-15"
        },
        {
          id: 2,
          name: "Robert Wilson",
          email: "robert@agency.com",
          company: "Creative Agency",
          source: "Social Media",
          score: 72,
          status: "warm",
          created: "2024-01-14",
          lastActivity: "2024-01-14"
        }
      ];

      const mockDeals = [
        {
          id: 1,
          name: "Brand Identity Project",
          value: 15000,
          stage: "proposal",
          probability: 75,
          contact: "John Smith",
          company: "Tech Corp",
          created: "2024-01-10",
          expectedClose: "2024-02-15"
        },
        {
          id: 2,
          name: "Website Redesign",
          value: 8500,
          stage: "negotiation",
          probability: 60,
          contact: "Sarah Johnson",
          company: "StartupXYZ",
          created: "2024-01-12",
          expectedClose: "2024-02-01"
        }
      ];

      setContacts(mockContacts);
      setLeads(mockLeads);
      setDeals(mockDeals);
      setIsLoading(false);
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'lead': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'prospect': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'hot': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'warm': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      default: return 'text-accent bg-accent/20 border-accent/30';
    }
  };

  const getStageColor = (stage) => {
    switch (stage) {
      case 'proposal': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'negotiation': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'closed-won': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'closed-lost': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-accent bg-accent/20 border-accent/30';
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    { id: 'contacts', label: 'Contacts', icon: Users },
    { id: 'leads', label: 'Leads', icon: Star },
    { id: 'deals', label: 'Deals', icon: TrendingUp },
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
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-light">CRM Integration</h2>
                  <p className="text-sm text-accent/60">Manage contacts, leads, and deals</p>
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
          <div className="p-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="w-8 h-8 text-accent animate-spin" />
                <span className="ml-2 text-accent">Loading CRM data...</span>
              </div>
            ) : (
              <>
                {/* Contacts Tab */}
                {activeTab === 'contacts' && (
                  <div className="space-y-6">
                    {/* Search and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-accent/60" />
                          <Input
                            placeholder="Search contacts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-primary-dark border-accent/20 text-light focus:border-blue-500"
                          />
                        </div>
                        <Button variant="outline" size="sm">
                          <Filter className="w-4 h-4 mr-2" />
                          Filter
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Contact
                        </Button>
                      </div>
                    </div>

                    {/* Contacts List */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {filteredContacts.map((contact) => (
                        <motion.div
                          key={contact.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="cursor-pointer"
                          onClick={() => setSelectedContact(contact)}
                        >
                          <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20 hover:border-blue-500/50 transition-all duration-300">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-semibold text-light">
                                      {contact.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-semibold text-light">{contact.name}</h3>
                                    <p className="text-sm text-accent/80">{contact.company}</p>
                                  </div>
                                </div>
                                <Badge className={getStatusColor(contact.status)}>
                                  {contact.status}
                                </Badge>
                              </div>
                              
                              <div className="space-y-2 mb-3">
                                <div className="flex items-center gap-2 text-sm text-accent/80">
                                  <Mail className="w-4 h-4" />
                                  {contact.email}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-accent/80">
                                  <Phone className="w-4 h-4" />
                                  {contact.phone}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-accent/80">
                                  <Calendar className="w-4 h-4" />
                                  Last contact: {contact.lastContact}
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex gap-1">
                                  {contact.tags.map((tag, index) => (
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
                                    <MessageSquare className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Leads Tab */}
                {activeTab === 'leads' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-light">Lead Management</h3>
                      <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Lead
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {leads.map((lead) => (
                        <Card key={lead.id} className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="text-lg font-semibold text-light">{lead.name}</h4>
                                <p className="text-sm text-accent/80">{lead.company}</p>
                              </div>
                              <Badge className={getStatusColor(lead.status)}>
                                {lead.status}
                              </Badge>
                            </div>
                            
                            <div className="space-y-2 mb-3">
                              <div className="flex items-center gap-2 text-sm text-accent/80">
                                <Mail className="w-4 h-4" />
                                {lead.email}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-accent/80">
                                <Tag className="w-4 h-4" />
                                {lead.source}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-accent/80">
                                <Star className="w-4 h-4" />
                                Score: {lead.score}/100
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-xs text-accent/60">
                                Created: {lead.created}
                              </span>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Deals Tab */}
                {activeTab === 'deals' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-light">Deal Pipeline</h3>
                      <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Deal
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {deals.map((deal) => (
                        <Card key={deal.id} className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="text-lg font-semibold text-light">{deal.name}</h4>
                                <p className="text-sm text-accent/80">{deal.contact} - {deal.company}</p>
                              </div>
                              <Badge className={getStageColor(deal.stage)}>
                                {deal.stage}
                              </Badge>
                            </div>
                            
                            <div className="space-y-2 mb-3">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-accent/80">Value:</span>
                                <span className="text-light font-semibold">${deal.value.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-accent/80">Probability:</span>
                                <span className="text-light">{deal.probability}%</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-accent/80">Expected Close:</span>
                                <span className="text-light">{deal.expectedClose}</span>
                              </div>
                            </div>

                            <div className="w-full bg-primary-dark rounded-full h-2 mb-3">
                              <div 
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${deal.probability}%` }}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-xs text-accent/60">
                                Created: {deal.created}
                              </span>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <TrendingUp className="w-4 h-4" />
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
                    <h3 className="text-lg font-semibold text-light">CRM Analytics</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                        <CardContent className="p-4 text-center">
                          <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-light">{contacts.length}</div>
                          <div className="text-sm text-accent/80">Total Contacts</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                        <CardContent className="p-4 text-center">
                          <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-light">{leads.length}</div>
                          <div className="text-sm text-accent/80">Active Leads</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                        <CardContent className="p-4 text-center">
                          <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-light">{deals.length}</div>
                          <div className="text-sm text-accent/80">Open Deals</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-primary/50 backdrop-blur-sm border border-accent/20">
                        <CardContent className="p-4 text-center">
                          <FileText className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-light">
                            ${deals.reduce((sum, deal) => sum + deal.value, 0).toLocaleString()}
                          </div>
                          <div className="text-sm text-accent/80">Pipeline Value</div>
                        </CardContent>
                      </Card>
                    </div>
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

export default CRMIntegration;
