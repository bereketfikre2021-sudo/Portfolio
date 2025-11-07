import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../ThemeProvider";
import Section from "../Section";
import { IMAGES } from "../../constants";

const TrustedBy = React.memo(() => {
  const { resolvedTheme } = useTheme();

  const clients = [
    { name: 'Andegna Furniture', logo: IMAGES.andegnaLogo, href: 'https://andegnafurniture.com/' },
    { name: 'Niqat Coffee', logo: IMAGES.niqat, href: 'https://linktr.ee/Niqatcoffee' },
    { name: 'Prime All Trading', logo: IMAGES.primeAll, href: 'https://primesoftwaresolution.net/' },
    { name: 'Medavail Pharmaceutical', logo: IMAGES.medavailLogo, href: null },
    { name: 'GEDY-LAW', logo: IMAGES.gedylaw, href: 'https://gedy-law.com/welcome' },
    { name: 'Pioneer Diagnostic Center', logo: IMAGES.pdcLogo, href: 'https://pdc-et.com' },
  ];

  return (
    <Section id="trusted-by" className="relative py-12 bg-primary overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent/20 border border-accent/30 shadow-lg"
            >
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span className={`font-semibold text-lg drop-shadow-2xl ${resolvedTheme === 'light' ? 'text-black' : 'text-accent'}`}>
                Trusted By
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-light"
            >
              Trusted By Leading Brands
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-accent/80 max-w-2xl mx-auto"
            >
              Partnering with innovative companies to create exceptional brand experiences
            </motion.p>
          </div>

          {/* Logos Scrolling Container - Continuous Right to Left */}
          <div className="relative overflow-hidden">
            {/* Gradient overlays for smooth fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />

            {/* Scrolling Logos */}
            <motion.div
              className="flex items-center gap-8 md:gap-12 py-8"
              animate={{
                x: ['0%', '-50%'],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 30,
                  ease: 'linear',
                },
              }}
              style={{ width: 'max-content' }}
            >
              {/* First set of logos */}
              {clients.map((client, index) => {
                const LogoWrapper = client.href ? motion.a : motion.div;
                const wrapperProps = client.href
                  ? {
                      href: client.href,
                      target: '_blank',
                      rel: 'noopener noreferrer',
                      'aria-label': `Visit ${client.name} website`
                    }
                  : {};

                return (
                  <LogoWrapper
                    key={`first-${index}`}
                    {...wrapperProps}
                    className="group relative flex-shrink-0 w-32 h-32 md:w-40 md:h-40 flex items-center justify-center rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden focus:outline-2 focus:outline-accent focus:outline-offset-2"
                    style={{
                      background: resolvedTheme === 'light'
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)'
                        : 'linear-gradient(135deg, rgba(138,234,146,0.12) 0%, rgba(138,234,146,0.05) 100%)',
                      border: `1px solid ${resolvedTheme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(138,234,146,0.25)'}`,
                      backdropFilter: 'blur(10px)',
                      boxShadow: resolvedTheme === 'light'
                        ? '0 4px 12px rgba(0,0,0,0.05)'
                        : '0 4px 12px rgba(138,234,146,0.1)',
                    }}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.3, ease: 'easeOut' },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Logo Image - Fills the frame */}
                    <img
                      src={client.logo}
                      alt={`${client.name} company logo`}
                      width="160"
                      height="160"
                      className="w-full h-full object-cover transition-all duration-300 opacity-70 group-hover:opacity-100"
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                      loading="lazy"
                      decoding="async"
                      fetchpriority="low"
                      onError={(e) => {
                        // Batch style writes in requestAnimationFrame to prevent forced reflow
                        requestAnimationFrame(() => {
                        e.target.style.display = 'none';
                        if (e.target.nextSibling) {
                          e.target.nextSibling.style.display = 'flex';
                        }
                        });
                      }}
                    />
                    
                    {/* Fallback */}
                    <div
                      className="w-full h-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center rounded-xl"
                      style={{ display: 'none' }}
                    >
                      <span className={`font-bold text-2xl ${resolvedTheme === 'light' ? 'text-primary' : 'text-accent'}`}>
                        {client.name.charAt(0)}
                      </span>
                    </div>
                  </LogoWrapper>
                );
              })}

              {/* Duplicate set of logos for seamless loop */}
              {clients.map((client, index) => {
                const LogoWrapper = client.href ? motion.a : motion.div;
                const wrapperProps = client.href
                  ? {
                      href: client.href,
                      target: '_blank',
                      rel: 'noopener noreferrer',
                      'aria-label': `Visit ${client.name} website`
                    }
                  : {};

                return (
                  <LogoWrapper
                    key={`second-${index}`}
                    {...wrapperProps}
                    className="group relative flex-shrink-0 w-32 h-32 md:w-40 md:h-40 flex items-center justify-center rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden focus:outline-2 focus:outline-accent focus:outline-offset-2"
                    style={{
                      background: resolvedTheme === 'light'
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)'
                        : 'linear-gradient(135deg, rgba(138,234,146,0.12) 0%, rgba(138,234,146,0.05) 100%)',
                      border: `1px solid ${resolvedTheme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(138,234,146,0.25)'}`,
                      backdropFilter: 'blur(10px)',
                      boxShadow: resolvedTheme === 'light'
                        ? '0 4px 12px rgba(0,0,0,0.05)'
                        : '0 4px 12px rgba(138,234,146,0.1)',
                    }}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.3, ease: 'easeOut' },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Logo Image - Fills the frame */}
                    <img
                      src={client.logo}
                      alt={`${client.name} company logo`}
                      width="160"
                      height="160"
                      className="w-full h-full object-cover transition-all duration-300 opacity-70 group-hover:opacity-100"
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                      loading="lazy"
                      decoding="async"
                      fetchpriority="low"
                      onError={(e) => {
                        // Batch style writes in requestAnimationFrame to prevent forced reflow
                        requestAnimationFrame(() => {
                        e.target.style.display = 'none';
                        if (e.target.nextSibling) {
                          e.target.nextSibling.style.display = 'flex';
                        }
                        });
                      }}
                    />
                    
                    {/* Fallback */}
                    <div
                      className="w-full h-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center rounded-xl"
                      style={{ display: 'none' }}
                    >
                      <span className={`font-bold text-2xl ${resolvedTheme === 'light' ? 'text-primary' : 'text-accent'}`}>
                        {client.name.charAt(0)}
                      </span>
                    </div>
                  </LogoWrapper>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>

    </Section>
  );
});

TrustedBy.displayName = 'TrustedBy';

export default TrustedBy;

