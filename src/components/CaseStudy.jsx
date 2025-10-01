import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, ArrowLeft, ArrowRight, ExternalLink, Calendar, Clock, Users, Target, TrendingUp, Award } from 'lucide-react';

const CASE_STUDIES = [
  {
    id: 'swan-clothing',
    title: 'Swan Clothing Brand Identity',
    client: 'Swan Clothing',
    industry: 'Fashion & Retail',
    duration: '6 weeks',
    team: 'Solo Designer',
    challenge: 'Create a modern, sophisticated brand identity for a new fashion brand that appeals to the Instagram generation while maintaining luxury values.',
    solution: 'Developed a comprehensive brand ecosystem with versatile logo system, eco-luxury packaging, and cohesive visual language across all touchpoints.',
    results: [
      { metric: 'Brand Recognition', value: '+40%', description: 'Increase in brand recognition within 3 months' },
      { metric: 'Social Engagement', value: '+60%', description: 'Boost in social media engagement rates' },
      { metric: 'Customer Satisfaction', value: '95%', description: 'Positive feedback on brand experience' },
      { metric: 'Market Position', value: 'Top 10%', description: 'Ranked among premium fashion brands' }
    ],
    process: [
      {
        phase: 'Discovery & Research',
        duration: '1 week',
        description: 'Market analysis, competitor research, and brand positioning strategy',
        deliverables: ['Brand Strategy Document', 'Competitor Analysis', 'Target Audience Profile']
      },
      {
        phase: 'Concept Development',
        duration: '2 weeks',
        description: 'Logo concepts, color palette exploration, and typography selection',
        deliverables: ['Logo Concepts', 'Color Palette', 'Typography System']
      },
      {
        phase: 'Design System',
        duration: '2 weeks',
        description: 'Complete brand guidelines, packaging design, and application examples',
        deliverables: ['Brand Guidelines', 'Packaging Design', 'Application Examples']
      },
      {
        phase: 'Implementation',
        duration: '1 week',
        description: 'Final refinements and delivery of all brand assets',
        deliverables: ['Final Assets', 'Implementation Guide', 'Brand Guidelines PDF']
      }
    ],
    technologies: ['Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign', 'Figma'],
    images: ['/img/swan-clothing.webp'],
    testimonial: {
      quote: "Bereket transformed our vision into a stunning reality. The brand identity perfectly captures our essence and has been instrumental in our success.",
      author: "Sarah Johnson",
      role: "Founder, Swan Clothing"
    }
  },
  {
    id: 'finix-web-assets',
    title: 'Finix Web Asset Collection',
    client: 'Finix Financial',
    industry: 'Fintech',
    duration: '4 weeks',
    team: 'Design Team Lead',
    challenge: 'Create a comprehensive web asset collection that makes fintech feel both trustworthy and exciting while maintaining professional standards.',
    solution: 'Developed a cohesive visual language with responsive graphics, engaging social media assets, and email templates that build trust while sparking curiosity.',
    results: [
      { metric: 'Engagement Rate', value: '+35%', description: 'Increase in overall engagement rates' },
      { metric: 'Email Opens', value: '+50%', description: 'Boost in email open rates' },
      { metric: 'Brand Trust', value: '+25%', description: 'Improvement in brand trust scores' },
      { metric: 'Conversion Rate', value: '+30%', description: 'Increase in lead conversion' }
    ],
    process: [
      {
        phase: 'Research & Strategy',
        duration: '1 week',
        description: 'Fintech market analysis, user behavior study, and content strategy',
        deliverables: ['Content Strategy', 'User Journey Map', 'Asset Requirements']
      },
      {
        phase: 'Visual Design',
        duration: '2 weeks',
        description: 'Asset creation, responsive design, and brand consistency',
        deliverables: ['Web Banners', 'Social Graphics', 'Email Templates']
      },
      {
        phase: 'Testing & Optimization',
        duration: '1 week',
        description: 'A/B testing, performance optimization, and final refinements',
        deliverables: ['Optimized Assets', 'Performance Report', 'Usage Guidelines']
      }
    ],
    technologies: ['Figma', 'Adobe Creative Suite', 'HTML/CSS', 'JavaScript'],
    images: ['/img/Finix.webp'],
    testimonial: {
      quote: "The web assets have revolutionized our digital presence. Our marketing team can now create stunning content in minutes instead of hours.",
      author: "Michael Chen",
      role: "Marketing Director, Finix Financial"
    }
  },
  {
    id: 'medavail-pharmaceuticals',
    title: 'Medavail Pharmaceuticals Brand Rebranding',
    client: 'Medavail Pharmaceuticals',
    industry: 'Healthcare & Pharmaceuticals',
    duration: '8 weeks',
    team: 'Senior Brand Designer',
    challenge: 'Rebrand a pharmaceutical company to modernize their image while maintaining trust and regulatory compliance in the healthcare industry.',
    solution: 'Created a sophisticated, trustworthy brand identity with clean typography, medical-inspired color palette, and comprehensive brand guidelines that work across all pharmaceutical applications.',
    results: [
      { metric: 'Brand Trust', value: '+45%', description: 'Increase in brand trust among healthcare professionals' },
      { metric: 'Market Share', value: '+20%', description: 'Growth in market share within 6 months' },
      { metric: 'Brand Recognition', value: '+55%', description: 'Improvement in brand recognition in target markets' },
      { metric: 'Customer Satisfaction', value: '92%', description: 'High satisfaction rate among healthcare partners' }
    ],
    process: [
      {
        phase: 'Research & Analysis',
        duration: '2 weeks',
        description: 'Healthcare market research, competitor analysis, and regulatory compliance review',
        deliverables: ['Market Analysis', 'Competitor Study', 'Compliance Guidelines']
      },
      {
        phase: 'Brand Strategy',
        duration: '2 weeks',
        description: 'Brand positioning, messaging strategy, and visual direction',
        deliverables: ['Brand Strategy', 'Messaging Framework', 'Visual Direction']
      },
      {
        phase: 'Identity Design',
        duration: '3 weeks',
        description: 'Logo design, color system, typography, and brand applications',
        deliverables: ['Logo System', 'Color Palette', 'Typography', 'Brand Applications']
      },
      {
        phase: 'Implementation',
        duration: '1 week',
        description: 'Final brand guidelines and asset delivery',
        deliverables: ['Brand Guidelines', 'Asset Package', 'Implementation Guide']
      }
    ],
    technologies: ['Adobe Illustrator', 'Adobe InDesign', 'Adobe Photoshop', 'Figma'],
    images: [
      '/img/Medavail.webp', 
      '/img/Medavail-logo.webp'
    ],
    testimonial: {
      quote: "Bereket's rebranding work has transformed our company's image. We now stand out in the pharmaceutical industry while maintaining the trust and professionalism our clients expect.",
      author: "Dr. Emily Rodriguez",
      role: "CEO, Medavail Pharmaceuticals"
    }
  }
];

const CaseStudyModal = ({ caseStudy, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !caseStudy) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === caseStudy.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? caseStudy.images.length - 1 : prev - 1
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-primary rounded-2xl border border-accent/20"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-primary/95 backdrop-blur-sm border-b border-accent/20 p-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-light">{caseStudy.title}</h2>
              <p className="text-accent/80">{caseStudy.client} • {caseStudy.industry}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-accent/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-accent" />
            </button>
          </div>

          <div className="p-6 space-y-8">
            {/* Project Overview */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-sm text-accent/60">Duration</p>
                  <p className="font-semibold text-light">{caseStudy.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-sm text-accent/60">Team</p>
                  <p className="font-semibold text-light">{caseStudy.team}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-sm text-accent/60">Industry</p>
                  <p className="font-semibold text-light">{caseStudy.industry}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-sm text-accent/60">Status</p>
                  <p className="font-semibold text-light">Completed</p>
                </div>
              </div>
            </div>

            {/* Challenge & Solution */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-primary/50 border-accent/20">
                <CardHeader>
                  <CardTitle className="text-light flex items-center gap-2">
                    <Target className="w-5 h-5 text-accent" />
                    Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-accent/80 leading-relaxed">{caseStudy.challenge}</p>
                </CardContent>
              </Card>

              <Card className="bg-primary/50 border-accent/20">
                <CardHeader>
                  <CardTitle className="text-light flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    Solution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-accent/80 leading-relaxed">{caseStudy.solution}</p>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div>
              <h3 className="text-xl font-bold text-light mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-accent" />
                Results & Impact
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {caseStudy.results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-6 bg-gradient-to-br from-accent/10 to-secondary/10 rounded-xl border border-accent/20"
                  >
                    <div className="text-3xl font-bold text-accent mb-2">{result.value}</div>
                    <div className="text-sm font-semibold text-light mb-1">{result.metric}</div>
                    <div className="text-xs text-accent/70">{result.description}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div>
              <h3 className="text-xl font-bold text-light mb-6">Design Process</h3>
              <div className="space-y-4">
                {caseStudy.process.map((phase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-6 p-6 bg-primary/30 rounded-xl border border-accent/20"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                      <span className="text-accent font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h4 className="text-lg font-semibold text-light">{phase.phase}</h4>
                        <Badge variant="outline" className="border-accent/30 text-accent">
                          {phase.duration}
                        </Badge>
                      </div>
                      <p className="text-accent/80 mb-3">{phase.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {phase.deliverables.map((deliverable, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-secondary/20 text-accent/80 text-xs">
                            {deliverable}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-xl font-bold text-light mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {caseStudy.technologies.map((tech, index) => (
                  <Badge key={index} className="bg-accent/20 text-accent border-accent/30">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <Card className="bg-gradient-to-r from-accent/10 to-secondary/10 border-accent/20">
              <CardContent className="p-6">
                <blockquote className="text-lg text-light italic mb-4">
                  "{caseStudy.testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-accent font-bold text-lg">
                      {caseStudy.testimonial.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-light">{caseStudy.testimonial.author}</p>
                    <p className="text-sm text-accent/80">{caseStudy.testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const CaseStudy = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCaseStudy = (caseStudy) => {
    setSelectedCaseStudy(caseStudy);
    setIsModalOpen(true);
  };

  const closeCaseStudy = () => {
    setIsModalOpen(false);
    setSelectedCaseStudy(null);
  };

  return (
    <section id="case-studies" className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="bg-accent/20 text-accent border-accent/30 mb-4">
            Case Studies
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-light mb-6">
            Detailed Project
            <span className="text-accent block">Case Studies</span>
          </h2>
          <p className="text-xl text-accent/80 max-w-3xl mx-auto leading-relaxed">
            Dive deep into my design process, challenges faced, and the measurable results achieved for each project.
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {CASE_STUDIES.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => openCaseStudy(caseStudy)}
            >
              <Card className="h-full bg-primary/50 border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10">
                <div className="aspect-video bg-gradient-to-br from-accent/20 to-secondary/20 rounded-t-lg overflow-hidden">
                  <img
                    src={caseStudy.images[0]}
                    alt={caseStudy.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 text-xs text-accent/70 mb-2">
                    <Badge variant="outline" className="border-accent/30 text-accent text-xs px-2 py-1">
                      {caseStudy.industry}
                    </Badge>
                    <span>•</span>
                    <span>{caseStudy.duration}</span>
                  </div>
                  
                  <CardTitle className="text-lg font-bold text-light group-hover:text-accent transition-colors leading-tight">
                    {caseStudy.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-accent/80 leading-relaxed mb-4 line-clamp-2 text-sm">
                    {caseStudy.challenge}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-accent/60">
                      {caseStudy.results.length} key results
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-accent/30 text-accent hover:bg-accent hover:text-primary text-xs px-3 py-1"
                    >
                      View Study
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal 
        caseStudy={selectedCaseStudy} 
        isOpen={isModalOpen} 
        onClose={closeCaseStudy} 
      />
    </section>
  );
};

export default CaseStudy;
