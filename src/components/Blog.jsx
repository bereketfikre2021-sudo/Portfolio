import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight, ExternalLink, Tag, X } from 'lucide-react';
import { useTheme } from './ThemeProvider';

// BG images - using consistent paths
const BG1 = '/img/BG.webp';
const BG2 = '/img/BG-2.webp';
const BG3 = '/img/BG-3.webp';
const BG4 = '/img/BG-4.webp';
const BG5 = '/img/BG-5.webp';

const BLOG_POSTS = [
  {
    id: 1,
    title: "The Psychology of Color in Brand Design: How Colors Influence Consumer Behavior",
    excerpt: "Explore how different colors affect consumer emotions and purchasing decisions, with real-world examples from successful brand redesigns.",
    content: "Color psychology plays a crucial role in brand design and consumer behavior. In this comprehensive guide, we'll explore how different colors evoke specific emotions and influence purchasing decisions...",
    author: "Bereket Fikre",
    date: "2024-12-19",
    readTime: "8 min read",
    category: "Brand Design",
    tags: ["Color Psychology", "Brand Strategy", "Consumer Behavior"],
    image: BG1,
    featured: true,
    slug: "psychology-of-color-in-brand-design"
  },
  {
    id: 2,
    title: "5 Essential UI/UX Design Principles Every Designer Should Master",
    excerpt: "Master the fundamental principles that separate good design from great design. Learn from real projects and case studies.",
    content: "Great UI/UX design isn't just about making things look pretty—it's about creating intuitive, accessible, and delightful user experiences. Here are the five essential principles...",
    author: "Bereket Fikre",
    date: "2024-12-18",
    readTime: "6 min read",
    category: "UI/UX Design",
    tags: ["UI/UX", "Design Principles", "User Experience"],
    image: BG2,
    featured: false,
    slug: "essential-ui-ux-design-principles"
  },
  {
    id: 3,
    title: "From Concept to Launch: A Complete Brand Identity Design Process",
    excerpt: "Follow the step-by-step process I use to create comprehensive brand identities, from initial research to final implementation.",
    content: "Creating a successful brand identity requires a systematic approach that balances creativity with strategy. Here's my proven process for developing brands that resonate...",
    author: "Bereket Fikre",
    date: "2024-12-17",
    readTime: "10 min read",
    category: "Brand Identity",
    tags: ["Brand Identity", "Design Process", "Strategy"],
    image: BG3,
    featured: true,
    slug: "complete-brand-identity-design-process"
  },
  {
    id: 4,
    title: "Design Trends 2024: What's In and What's Out",
    excerpt: "Stay ahead of the curve with the latest design trends for 2024. Discover what's trending and what's becoming outdated.",
    content: "The design world is constantly evolving, and staying current with trends is essential for any designer. Here's what's trending in 2024 and what you should avoid...",
    author: "Bereket Fikre",
    date: "2024-12-16",
    readTime: "7 min read",
    category: "Design Trends",
    tags: ["Design Trends", "2024", "Industry Insights"],
    image: BG4,
    featured: false,
    slug: "design-trends-2024-whats-in-and-out"
  },
  {
    id: 5,
    title: "Building a Successful Freelance Design Business in Ethiopia",
    excerpt: "Learn how to build and grow a successful freelance design business in the Ethiopian market, with practical tips and strategies.",
    content: "Starting a freelance design business in Ethiopia comes with unique challenges and opportunities. Here's how to build a sustainable and profitable design practice...",
    author: "Bereket Fikre",
    date: "2024-12-15",
    readTime: "9 min read",
    category: "Business",
    tags: ["Freelancing", "Business", "Ethiopia", "Entrepreneurship"],
    image: BG5,
    featured: false,
    slug: "building-successful-freelance-design-business-ethiopia"
  }
];

const BlogPost = ({ post, isFeatured = false, onReadArticle }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group cursor-pointer"
    >
      <Card className="h-full bg-primary/50 border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10">
        <div className="relative overflow-hidden rounded-t-lg">
          <div className="aspect-video relative">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 text-white/90">
                <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                  <Tag className="w-4 h-4 text-accent" />
                </div>
                <span className="text-sm font-medium">Design Article</span>
              </div>
            </div>
          </div>
          {isFeatured && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-accent text-primary font-semibold">
                Featured
              </Badge>
            </div>
          )}
        </div>
        
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 text-sm text-accent/70 mb-2">
            <Badge variant="outline" className="border-accent/30 text-accent text-sm font-medium">
              {post.category}
            </Badge>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {post.date}
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </div>
          </div>
          
          <CardTitle className="text-xl font-bold text-light group-hover:text-accent transition-colors duration-300 line-clamp-2">
            {post.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-accent/80 leading-relaxed mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-sm font-medium bg-secondary/20 text-accent/80">
                {tag}
              </Badge>
            ))}
          </div>
          
          <motion.div
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button 
              variant="outline" 
              className="w-full border-accent/30 text-accent hover:bg-accent hover:text-primary group"
              onClick={() => onReadArticle(post)}
            >
              Read Article
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Blog = () => {
  const { resolvedTheme } = useTheme();
  const [selectedArticle, setSelectedArticle] = useState(null);
  const featuredPosts = BLOG_POSTS.filter(post => post.featured);
  const regularPosts = BLOG_POSTS.filter(post => !post.featured);

  // Handle ESC key to close article modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && selectedArticle) {
        setSelectedArticle(null);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [selectedArticle]);

  return (
    <section id="blog" className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className={`bg-accent/20 border-accent/30 mb-4 text-lg font-semibold ${
            resolvedTheme === 'light'
              ? 'text-black'
              : 'text-accent'
          }`}>
            Design Insights
          </Badge>
          {/* Design Insights Main Heading */}
          <h2 className="text-5xl md:text-6xl font-bold text-light mb-6">
            Latest from the
            <span className="text-accent block">Design Blog</span>
          </h2>
          <p className="text-xl text-accent/80 max-w-3xl mx-auto leading-relaxed">
            Discover design insights, industry trends, and behind-the-scenes stories from my creative journey. 
            Learn from real projects and stay ahead of the curve.
          </p>
        </motion.div>

        {/* Featured Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-light mb-8 flex items-center gap-3">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-sm">★</span>
            </div>
            Featured Articles
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <BlogPost key={post.id} post={post} isFeatured={true} onReadArticle={setSelectedArticle} />
            ))}
          </div>
        </motion.div>

        {/* Regular Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-light mb-8 flex items-center gap-3">
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
              <span className="text-light font-bold text-sm">📝</span>
            </div>
            More Articles
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <BlogPost key={post.id} post={post} onReadArticle={setSelectedArticle} />
            ))}
          </div>
        </motion.div>

      </div>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-primary rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-accent/20 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-light">{selectedArticle.title}</h2>
                  <div className="flex items-center gap-4 mt-2 text-sm text-accent/80">
                    <span>By {selectedArticle.author}</span>
                    <span>•</span>
                    <span>{selectedArticle.date}</span>
                    <span>•</span>
                    <span>{selectedArticle.readTime}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 hover:bg-accent/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-accent" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="prose prose-invert max-w-none">
                  <div className="mb-6">
                    <img 
                      src={selectedArticle.image} 
                      alt={selectedArticle.title}
                      className="w-full h-64 object-cover rounded-xl mb-4"
                    />
                    <p className="text-lg text-accent/90 leading-relaxed mb-6">
                      {selectedArticle.excerpt}
                    </p>
                  </div>
                  
                  <div className="text-light leading-relaxed space-y-4">
                    <p>{selectedArticle.content}</p>
                    
                    <h3 className="text-xl font-semibold text-accent mt-8 mb-4">Key Takeaways</h3>
                    <ul className="list-disc list-inside space-y-2 text-accent/90">
                      <li>Understanding color psychology is crucial for effective brand design</li>
                      <li>Different colors evoke specific emotions and influence purchasing decisions</li>
                      <li>Consistent color usage across all brand touchpoints builds recognition</li>
                      <li>Cultural context plays a significant role in color perception</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-accent mt-8 mb-4">About the Author</h3>
                    <p className="text-accent/90">
                      {selectedArticle.author} is a creative designer with over 5 years of experience in brand identity, 
                      UI/UX design, and digital marketing. Based in Addis Ababa, Ethiopia, he helps businesses 
                      create compelling visual identities that resonate with their target audience.
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-accent/20 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {selectedArticle.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-sm font-medium bg-secondary/20 text-accent/80">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button 
                  onClick={() => setSelectedArticle(null)}
                  className="bg-accent text-primary hover:bg-accent/90"
                >
                  Close Article
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Blog;
