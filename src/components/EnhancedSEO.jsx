import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PersonStructuredData, OrganizationStructuredData, PortfolioStructuredData, ServiceStructuredData, ProjectStructuredData, FAQStructuredData, ReviewStructuredData } from './StructuredData';

const EnhancedSEO = ({ 
  pageType = 'homepage',
  customData = {},
  canonicalUrl = null,
  noIndex = false,
  noFollow = false
}) => {
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  // Default SEO data
  const defaultSEOData = {
    title: "Bereket Fikre - Creative Designer & Brand Strategist",
    description: "Professional creative designer specializing in brand identity, UI/UX design, and digital marketing. Transform your vision into compelling visual experiences.",
    keywords: [
      "creative designer",
      "brand identity",
      "UI/UX design",
      "graphic design",
      "digital marketing",
      "logo design",
      "web design",
      "portfolio",
      "Bereket Fikre"
    ],
    author: "Bereket Fikre",
    siteName: "Bereket Fikre Portfolio",
    locale: "en_US",
    type: "website",
    image: '/img/Bereket-Fikre.webp',
    imageAlt: "Bereket Fikre - Creative Designer",
    twitterCard: "summary_large_image",
    twitterSite: "@bereketfikre",
    twitterCreator: "@bereketfikre"
  };

  // Page-specific SEO data
  const pageSEOData = {
    homepage: {
      title: "Bereket Fikre - Creative Designer & Brand Strategist",
      description: "Professional creative designer specializing in brand identity, UI/UX design, and digital marketing. Transform your vision into compelling visual experiences.",
      keywords: ["creative designer", "brand identity", "UI/UX design", "portfolio", "Bereket Fikre"]
    },
    about: {
      title: "About Bereket Fikre - Creative Designer & Brand Strategist",
      description: "Learn about Bereket Fikre's journey as a creative designer, his expertise in brand identity, UI/UX design, and digital marketing strategies.",
      keywords: ["about", "creative designer", "brand strategist", "experience", "Bereket Fikre"]
    },
    services: {
      title: "Services - Brand Identity, UI/UX Design & Digital Marketing",
      description: "Comprehensive design services including brand identity, UI/UX design, graphic design, and digital marketing solutions for businesses.",
      keywords: ["services", "brand identity", "UI/UX design", "graphic design", "digital marketing"]
    },
    portfolio: {
      title: "Portfolio - Creative Design Projects & Case Studies",
      description: "Explore Bereket Fikre's portfolio of creative design projects, brand identities, and successful case studies across various industries.",
      keywords: ["portfolio", "projects", "case studies", "brand identity", "design work"]
    },
    contact: {
      title: "Contact Bereket Fikre - Get Your Project Started",
      description: "Ready to start your creative project? Contact Bereket Fikre for professional design services, brand identity, and digital marketing solutions.",
      keywords: ["contact", "hire designer", "project inquiry", "design services", "consultation"]
    }
  };

  // Merge default, page-specific, and custom data
  const seoData = {
    ...defaultSEOData,
    ...pageSEOData[pageType],
    ...customData
  };

  // Generate structured data based on page type
  const generateStructuredData = () => {
    const baseUrl = window.location.origin;
    
    switch (pageType) {
      case 'homepage':
        return {
          person: {
            name: "Bereket Fikre",
            jobTitle: "Creative Designer & Brand Strategist",
            description: seoData.description,
            url: baseUrl,
            image: `${baseUrl}${seoData.image}`,
            socialProfiles: [
              "https://linkedin.com/in/bereketfikre",
              "https://instagram.com/bereketfikre",
              "https://dribbble.com/bereketfikre"
            ],
            skills: ["Brand Identity", "UI/UX Design", "Graphic Design", "Digital Marketing"],
            company: "Freelance"
          },
          organization: {
            name: "Bereket Fikre Design Studio",
            description: "Professional creative design services specializing in brand identity and digital experiences",
            url: baseUrl,
            logo: `${baseUrl}/img/Logo.webp`,
            email: "hello@bereketfikre.com",
            phone: "+251-XXX-XXXX",
            socialProfiles: [
              "https://linkedin.com/in/bereketfikre",
              "https://instagram.com/bereketfikre"
            ]
          }
        };

      case 'services':
        return {
          services: seoData.services?.map(service => ({
            name: service.title,
            description: service.description,
            provider: "Bereket Fikre",
            serviceType: service.category,
            areaServed: "Worldwide"
          })) || []
        };

      case 'portfolio':
        return {
          portfolio: {
            name: "Bereket Fikre Portfolio",
            description: "Creative design projects and case studies",
            url: `${baseUrl}/#work`,
            author: "Bereket Fikre",
            dateCreated: "2024-01-01",
            genre: "Portfolio",
            keywords: seoData.keywords,
            images: [
              `${baseUrl}/img/Andegna.webp`,
              `${baseUrl}/img/Niqat.webp`,
              `${baseUrl}/img/Prime-All.webp`
            ]
          }
        };

      default:
        return {};
    }
  };

  const structuredData = generateStructuredData();
  const canonical = canonicalUrl || currentUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords.join(', ')} />
      <meta name="author" content={seoData.author} />
      <meta name="robots" content={`${noIndex ? 'noindex' : 'index'}, ${noFollow ? 'nofollow' : 'follow'}`} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta httpEquiv="Content-Language" content="en" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:type" content={seoData.type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={seoData.siteName} />
      <meta property="og:locale" content={seoData.locale} />
      <meta property="og:image" content={`${window.location.origin}${seoData.image}`} />
      <meta property="og:image:alt" content={seoData.imageAlt} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={seoData.twitterCard} />
      <meta name="twitter:site" content={seoData.twitterSite} />
      <meta name="twitter:creator" content={seoData.twitterCreator} />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      <meta name="twitter:image" content={`${window.location.origin}${seoData.image}`} />
      <meta name="twitter:image:alt" content={seoData.imageAlt} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#a78bfa" />
      <meta name="msapplication-TileColor" content="#a78bfa" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Bereket Fikre" />

      {/* Structured Data */}
      {structuredData.person && (
        <PersonStructuredData personData={structuredData.person} />
      )}
      {structuredData.organization && (
        <OrganizationStructuredData orgData={structuredData.organization} />
      )}
      {structuredData.portfolio && (
        <PortfolioStructuredData portfolioData={structuredData.portfolio} />
      )}
      {structuredData.services && structuredData.services.map((service, index) => (
        <ServiceStructuredData key={index} serviceData={service} />
      ))}

      {/* Additional SEO Meta Tags */}
      <meta name="geo.region" content="ET" />
      <meta name="geo.placename" content="Ethiopia" />
      <meta name="geo.position" content="9.1450;40.4897" />
      <meta name="ICBM" content="9.1450, 40.4897" />

      {/* Language and Content */}
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="General" />
      <meta name="distribution" content="Global" />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />

      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
    </Helmet>
  );
};

export default EnhancedSEO;
