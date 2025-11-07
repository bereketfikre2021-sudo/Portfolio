import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTheme } from "../ThemeProvider";
import Section from "../Section";
import { IMAGES, PROFILE } from "../../constants";
import CountUpNumber from "./CountUpNumber";

const About = React.memo(() => {
  const { resolvedTheme } = useTheme();
  
  return (
    <Section id="about" className="relative py-12 bg-primary overflow-hidden">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          {/* Header */}
          <div className="text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent/20 border border-accent/30 shadow-lg"
            >
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span className={`font-semibold text-lg drop-shadow-2xl ${
                resolvedTheme === 'light'
                  ? 'text-black'
                  : 'text-accent'
              }`}>About Me</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold text-light"
            >
              My Story & Approach
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-accent/80 max-w-3xl mx-auto"
            >
              With over 5 years of experience in graphic design and brand building, I help businesses create meaningful connections through strategic design.
            </motion.p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left Column - Image and Connect Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Profile Image */}
              <div className="relative group">
                {/* Elegant frame with gradient border and soft shadow */}
                <div className="relative bg-gradient-to-br from-accent/10 via-primary/5 to-accent/10 rounded-3xl p-6 shadow-2xl border border-accent/20 backdrop-blur-sm">
                  {/* Inner elegant border */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-accent/30 pointer-events-none"></div>
                  {/* Image container with padding for elegant spacing */}
                  <div className="relative rounded-2xl overflow-hidden bg-primary/50 p-4">
                    <img 
                      src={IMAGES.bereketFikre} 
                      alt="Bereket Fikre - Creative Designer and Brand Builder"
                      width="400"
                      height="500"
                      className="w-full h-auto object-contain rounded-xl"
                      loading="lazy"
                      decoding="async"
                      fetchpriority="low"
                    />
                  </div>
                  {/* Decorative corner accents */}
                  <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-accent/40 rounded-tl-lg"></div>
                  <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-accent/40 rounded-tr-lg"></div>
                  <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-accent/40 rounded-bl-lg"></div>
                  <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-accent/40 rounded-br-lg"></div>
                </div>
              </div>

              {/* Connect With Me Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-4 pt-8"
              >
                <h4 className="text-lg font-semibold text-light">Connect With Me</h4>
                <div className="grid grid-cols-2 gap-2 md:flex md:flex-row md:flex-wrap md:gap-3 md:justify-center md:items-center">
                  {PROFILE.socials.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg bg-accent hover:bg-accent/80 border border-accent/20 hover:border-accent/40 transition-all duration-300 md:rounded-full md:px-4 md:py-2 md:gap-2 md:w-auto"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                    >
                      <social.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary group-hover:scale-110 transition-transform" />
                      <span className="text-xs md:text-sm font-medium text-primary">{social.label}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Main Description - Hidden on mobile */}
              <div className="space-y-6 hidden md:block">
                <h3 className="text-2xl font-bold text-light">Design Philosophy</h3>
                <div className="space-y-4 text-accent/80 leading-relaxed">
                  <p>
                    I believe great design is more than just aesthetics—it's about creating meaningful connections between brands and their audiences. Every project I work on is approached with strategic thinking and creative excellence.
                  </p>
                  <p>
                    My process combines deep understanding of your business goals with innovative design solutions. Whether it's a complete brand identity, digital marketing materials, or print design, I ensure every element serves a purpose and tells your story effectively.
                  </p>
                  <p>
                    I work closely with clients to understand their vision, then translate that into compelling visual experiences that resonate with their target audience and drive real business results.
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-center p-6 bg-accent/10 rounded-2xl border border-accent/20"
                >
                  <CountUpNumber target={50} />
                  <div className="text-sm text-accent/80 font-medium mt-2">Projects Completed</div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-center p-6 bg-accent/10 rounded-2xl border border-accent/20"
                >
                  <div 
                    className="font-bold text-accent leading-none"
                    style={{ fontSize: 'clamp(5rem, 15vw, 12rem)' }}
                  >
                    5+
                  </div>
                  <div className="text-sm text-accent/80 font-medium mt-2">Years Experience</div>
                </motion.div>
              </div>

              {/* Let's Work Together Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="pt-2"
              >
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button 
                    className="w-full px-8 py-4 rounded-2xl bg-accent text-primary hover:bg-accent/90 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:ring-offset-2 focus:ring-offset-primary flex items-center justify-center gap-2 min-h-[48px]"
                    aria-label="Let's Work Together - Contact me"
                  >
                    Let's Work Together
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
});

About.displayName = 'About';

export default About;

