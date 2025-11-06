import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const FAQ_DATA = [
  {
    id: 1,
    question: "What design services do you offer?",
    answer: "I offer comprehensive design services including brand identity design, UI/UX design, graphic design, web design, logo design, print design, and digital marketing materials. Each project is tailored to your specific needs and business goals."
  },
  {
    id: 2,
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on scope and complexity. A logo design typically takes 2-3 weeks, while a complete brand identity can take 4-6 weeks. UI/UX projects usually range from 6-12 weeks. I'll provide a detailed timeline during our initial consultation."
  },
  {
    id: 3,
    question: "What is your design process?",
    answer: "My process begins with understanding your business, target audience, and goals. Then I move through research, concept development, design iterations, and final implementation. I involve you at key stages to ensure the design aligns perfectly with your vision."
  },
  {
    id: 4,
    question: "Do you work with clients internationally?",
    answer: "Yes! I work with clients worldwide. While I'm based in Addis Ababa, Ethiopia, I've successfully completed projects for clients across different continents. Communication is done via email, video calls, and project management tools."
  },
  {
    id: 5,
    question: "What file formats do you deliver?",
    answer: "I deliver all necessary file formats for your project. This typically includes vector files (AI, EPS, SVG), raster files (PNG, JPG, WebP), and source files. For web projects, I provide optimized assets ready for development."
  },
  {
    id: 6,
    question: "Can you help with existing brand redesigns?",
    answer: "Absolutely! I specialize in brand transformations and redesigns. Whether you need a complete overhaul or a subtle refresh, I'll analyze your current brand and create a strategy that maintains brand recognition while modernizing your visual identity."
  },
  {
    id: 7,
    question: "What are your payment terms?",
    answer: "I typically work with a 50% deposit to begin the project, with the remaining 50% due upon completion. For larger projects, we can arrange milestone-based payments. All payment terms are clearly outlined in the project proposal."
  },
  {
    id: 8,
    question: "Do you provide ongoing design support?",
    answer: "Yes, I offer ongoing design support and maintenance packages. This can include social media graphics, marketing materials, website updates, and brand asset management. We can discuss a package that fits your needs."
  }
];

const FAQItem = ({ faq, isOpen, onToggle, index }) => {
  const { resolvedTheme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-4"
    >
      <Card className={`border-2 transition-all duration-300 overflow-hidden ${
        isOpen
          ? 'border-accent/40 bg-accent/5 shadow-xl'
          : 'border-accent/20 hover:border-accent/30 bg-primary/50 hover:bg-primary/70'
      }`}>
        <button
          onClick={onToggle}
          className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:ring-offset-2 focus:ring-offset-primary"
          aria-expanded={isOpen}
          aria-label={`${faq.question} - ${isOpen ? 'Collapse' : 'Expand'} answer`}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isOpen
                  ? 'bg-accent text-primary'
                  : 'bg-accent/20 text-accent'
              }`}>
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className={`text-lg md:text-xl font-semibold leading-tight ${
                resolvedTheme === 'light'
                  ? 'text-black'
                  : 'text-light'
              }`}>
                {faq.question}
              </h3>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isOpen
                  ? 'bg-accent text-primary'
                  : 'bg-accent/10 text-accent'
              }`}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </div>
        </button>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <CardContent className="pt-0 pb-6 px-6">
                <div className="pl-14">
                  <div className={`h-px bg-accent/20 mb-4`}></div>
                  <p className={`text-base md:text-lg leading-relaxed ${
                    resolvedTheme === 'light'
                      ? 'text-black/80'
                      : 'text-accent/80'
                  }`}>
                    {faq.answer}
                  </p>
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

const FAQ = () => {
  const { resolvedTheme } = useTheme();
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section id="faq" className="py-24 bg-primary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className={`bg-accent/20 border-accent/30 mb-4 text-lg font-semibold ${
            resolvedTheme === 'light'
              ? 'text-black'
              : 'text-accent'
          }`}>
            Frequently Asked Questions
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-light mb-6">
            Got Questions?
            <span className="text-accent block">We've Got Answers</span>
          </h2>
          <p className="text-xl text-accent/80 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about my design services, process, and how we can work together to bring your vision to life.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {FAQ_DATA.map((faq, index) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openItems.has(faq.id)}
              onToggle={() => toggleItem(faq.id)}
              index={index}
            />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className={`text-lg mb-6 ${
            resolvedTheme === 'light'
              ? 'text-black/70'
              : 'text-accent/70'
          }`}>
            Still have questions?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="px-8 py-4 rounded-2xl bg-accent text-primary hover:bg-accent/80 font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:ring-offset-2 focus:ring-offset-primary">
              Get In Touch
            </button>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;

