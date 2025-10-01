import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Award, 
  Star, 
  Trophy, 
  Medal, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink,
  Calendar,
  MapPin
} from 'lucide-react';

const ClientLogosCarousel = ({ 
  clients = [], 
  autoPlay = true, 
  speed = 3000,
  className = '' 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  // Default clients if none provided
  const defaultClients = [
    {
      name: 'Swan Clothing',
      logo: '/img/swan-clothing.webp',
      category: 'Fashion',
      description: 'Complete brand identity and marketing materials',
      testimonial: 'Bereket transformed our brand with stunning visuals that perfectly captured our vision.',
      rating: 5,
      project: 'Brand Identity'
    },
    {
      name: 'Finix',
      logo: '/img/Finix.webp',
      category: 'Technology',
      description: 'Modern logo design and brand guidelines',
      testimonial: 'Professional, creative, and delivered exactly what we needed.',
      rating: 5,
      project: 'Logo Design'
    },
    {
      name: 'Maleda Coffee',
      logo: '/img/Maleda-Coffee.webp',
      category: 'Food & Beverage',
      description: 'Coffee shop branding and packaging design',
      testimonial: 'Our sales increased by 40% after the rebrand. Amazing work!',
      rating: 5,
      project: 'Branding'
    },
    {
      name: 'Andegna',
      logo: '/img/Andegna.webp',
      category: 'Fashion',
      description: 'Fashion brand identity and social media graphics',
      testimonial: 'Bereket understood our brand perfectly and created beautiful designs.',
      rating: 5,
      project: 'Brand Identity'
    },
    {
      name: 'YAT Construction',
      logo: '/img/YAT-Construction-PLC.webp',
      category: 'Construction',
      description: 'Corporate identity and marketing materials',
      testimonial: 'Professional and reliable. Highly recommend for any design project.',
      rating: 5,
      project: 'Corporate Identity'
    },
    {
      name: 'Alta',
      logo: '/img/Alta.webp',
      category: 'Technology',
      description: 'Tech startup branding and UI design',
      testimonial: 'Creative solutions that helped us stand out in the market.',
      rating: 5,
      project: 'Branding & UI'
    }
  ];

  const clientList = clients.length > 0 ? clients : defaultClients;

  useEffect(() => {
    if (autoPlay && !isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % clientList.length);
      }, speed);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, speed, isHovered, clientList.length]);

  const nextClient = () => {
    setCurrentIndex(prev => (prev + 1) % clientList.length);
  };

  const prevClient = () => {
    setCurrentIndex(prev => (prev - 1 + clientList.length) % clientList.length);
  };

  const goToClient = (index) => {
    setCurrentIndex(index);
  };

  const currentClient = clientList[currentIndex];

  return (
    <div className={`w-full ${className}`}>
      {/* Main Carousel */}
      <div
        className="relative overflow-hidden rounded-xl bg-primary/50 backdrop-blur-sm border border-accent/20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="p-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Client Logo and Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-white rounded-xl p-4 shadow-lg">
                    <img
                      src={currentClient.logo}
                      alt={currentClient.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-light">{currentClient.name}</h3>
                    <Badge className="bg-accent/20 text-accent border-accent/30">
                      {currentClient.category}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-accent">{currentClient.project}</h4>
                  <p className="text-light/80">{currentClient.description}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < currentClient.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-light/60">({currentClient.rating}/5)</span>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="relative">
                <div className="absolute top-0 left-0 w-8 h-8 text-accent/20">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                </div>
                <blockquote className="text-lg text-light/90 italic pl-8 pt-4">
                  "{currentClient.testimonial}"
                </blockquote>
                <cite className="block text-accent font-medium mt-4 pl-8">
                  — {currentClient.name} Team
                </cite>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevClient}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-primary/80 backdrop-blur-sm border border-accent/20 rounded-full text-accent hover:bg-accent/10 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextClient}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-primary/80 backdrop-blur-sm border border-accent/20 rounded-full text-accent hover:bg-accent/10 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {clientList.map((_, index) => (
          <button
            key={index}
            onClick={() => goToClient(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-accent' : 'bg-accent/30'
            }`}
          />
        ))}
      </div>

      {/* Client Logos Grid */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-light text-center mb-8">
          Trusted by Leading Brands
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {clientList.map((client, index) => (
            <motion.div
              key={index}
              className="group cursor-pointer"
              onClick={() => goToClient(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="w-full h-16 object-contain grayscale group-hover:grayscale-0 transition-all"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Awards Section Component
export const AwardsSection = ({ awards = [], className = '' }) => {
  const defaultAwards = [
    {
      title: 'Best Brand Designer 2024',
      organization: 'Ethiopian Design Awards',
      year: '2024',
      category: 'Branding',
      description: 'Recognized for outstanding brand identity design and creative excellence.',
      icon: Trophy,
      color: 'text-yellow-500'
    },
    {
      title: 'Excellence in UI/UX Design',
      organization: 'Addis Ababa Tech Summit',
      year: '2023',
      category: 'UI/UX',
      description: 'Awarded for innovative user interface design and exceptional user experience.',
      icon: Award,
      color: 'text-blue-500'
    },
    {
      title: 'Creative Innovation Award',
      organization: 'African Design Council',
      year: '2023',
      category: 'Innovation',
      description: 'Honored for pushing creative boundaries and innovative design solutions.',
      icon: Medal,
      color: 'text-purple-500'
    },
    {
      title: 'Client Satisfaction Excellence',
      organization: 'Freelancer Union',
      year: '2022',
      category: 'Service',
      description: 'Achieved 100% client satisfaction rating across all projects.',
      icon: Star,
      color: 'text-green-500'
    }
  ];

  const awardList = awards.length > 0 ? awards : defaultAwards;

  return (
    <div className={`w-full ${className}`}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-light mb-4">Awards & Recognition</h2>
        <p className="text-accent/80 max-w-2xl mx-auto">
          Recognized for excellence in design and innovation across various categories.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {awardList.map((award, index) => {
          const Icon = award.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Card className="h-full bg-primary/50 backdrop-blur-sm border border-accent/20 hover:border-accent/40 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full bg-accent/10 ${award.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-light">{award.title}</h3>
                        <Badge className="bg-accent/20 text-accent border-accent/30 text-xs">
                          {award.year}
                        </Badge>
                      </div>
                      <p className="text-accent font-medium mb-2">{award.organization}</p>
                      <p className="text-light/80 text-sm mb-3">{award.description}</p>
                      <div className="flex items-center gap-4 text-xs text-accent/60">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {award.year}
                        </span>
                        <span className="flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          {award.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Statistics Component
export const StatisticsSection = ({ stats = [], className = '' }) => {
  const defaultStats = [
    {
      number: '50+',
      label: 'Projects Completed',
      description: 'Successfully delivered projects across various industries',
      icon: '🎨'
    },
    {
      number: '30+',
      label: 'Happy Clients',
      description: 'Satisfied clients who trust our design expertise',
      icon: '😊'
    },
    {
      number: '5+',
      label: 'Years Experience',
      description: 'Years of professional design and branding experience',
      icon: '⭐'
    },
    {
      number: '100%',
      label: 'Client Satisfaction',
      description: 'Consistent 5-star ratings and positive feedback',
      icon: '🏆'
    }
  ];

  const statsList = stats.length > 0 ? stats : defaultStats;

  return (
    <div className={`w-full ${className}`}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-light mb-4">By the Numbers</h2>
        <p className="text-accent/80 max-w-2xl mx-auto">
          Our track record speaks for itself with consistent results and satisfied clients.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {statsList.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center group"
          >
            <div className="p-6 bg-primary/50 backdrop-blur-sm border border-accent/20 rounded-xl hover:border-accent/40 transition-colors">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold text-accent mb-2">{stat.number}</div>
              <div className="text-sm font-semibold text-light mb-1">{stat.label}</div>
              <div className="text-xs text-accent/60">{stat.description}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ClientLogosCarousel;
