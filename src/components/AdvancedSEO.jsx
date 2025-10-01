import React, { useEffect } from 'react';

// Advanced SEO configuration
const SEO_CONFIG = {
  default: {
    title: "Bereket Fikre - Creative Designer & Brand Builder | UI/UX Expert | Addis Ababa",
    description: "Professional Creative Designer specializing in UI/UX design, brand identity, graphic design, and digital marketing. Based in Addis Ababa, Ethiopia. Transform your brand with stunning visual solutions.",
    keywords: "creative designer, UI/UX designer, brand designer, graphic designer, web designer, logo design, brand identity, digital marketing, Addis Ababa, Ethiopia, portfolio, freelance designer",
    image: 'https://bereketfikre.com/img/Bereket-Fikre.webp',
    url: "https://bereketfikre.com",
    type: "website"
  },
  sections: {
    home: {
      title: "Bereket Fikre - Creative Designer & Brand Builder | UI/UX Expert",
      description: "Professional Creative Designer specializing in UI/UX design, brand identity, graphic design, and digital marketing. Transform your brand with stunning visual solutions.",
      keywords: "creative designer, UI/UX designer, brand designer, graphic designer, Addis Ababa, Ethiopia"
    },
    about: {
      title: "About Bereket Fikre - Creative Designer & Brand Builder | Addis Ababa",
      description: "Learn about Bereket Fikre's journey as a creative designer, his expertise in UI/UX design, brand identity, and his mission to transform brands through stunning visual solutions.",
      keywords: "about bereket fikre, creative designer biography, UI/UX designer story, brand builder experience, Addis Ababa designer"
    },
    services: {
      title: "Design Services - UI/UX, Brand Identity, Graphic Design | Bereket Fikre",
      description: "Professional design services including UI/UX design, brand identity, graphic design, web design, and digital marketing. Transform your brand with expert design solutions.",
      keywords: "design services, UI/UX design services, brand identity design, graphic design services, web design, logo design, digital marketing design"
    },
    work: {
      title: "Portfolio - Creative Design Projects | Bereket Fikre",
      description: "Explore Bereket Fikre's portfolio of creative design projects including brand identity, UI/UX design, graphic design, and digital marketing solutions.",
      keywords: "design portfolio, creative projects, brand identity portfolio, UI/UX portfolio, graphic design examples, design case studies"
    },
    "case-studies": {
      title: "Case Studies - Design Process & Results | Bereket Fikre",
      description: "Detailed case studies showcasing the design process, challenges, solutions, and measurable results achieved for various clients across different industries.",
      keywords: "design case studies, design process, design results, brand transformation, design methodology, client success stories"
    },
    blog: {
      title: "Design Blog - Insights, Tips & Trends | Bereket Fikre",
      description: "Latest design insights, industry trends, tips, and behind-the-scenes content from professional creative designer Bereket Fikre.",
      keywords: "design blog, design insights, design trends, design tips, creative design blog, UI/UX blog, brand design blog"
    },
    testimonials: {
      title: "Client Testimonials - Success Stories | Bereket Fikre",
      description: "Read testimonials from satisfied clients about their experience working with Bereket Fikre and the results achieved through professional design services.",
      keywords: "client testimonials, design reviews, client feedback, success stories, design results, satisfied clients"
    },
    contact: {
      title: "Contact Bereket Fikre - Creative Designer | Addis Ababa",
      description: "Get in touch with Bereket Fikre for your design project. Professional creative design services including UI/UX, brand identity, and graphic design.",
      keywords: "contact bereket fikre, hire designer, design consultation, creative design services, Addis Ababa designer contact"
    }
  }
};

// Dynamic structured data generator
const generateStructuredData = (section, additionalData = {}) => {
  const baseData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Bereket Fikre",
    "jobTitle": "Creative Designer, Brand Builder & Educator",
    "description": "Professional Creative Designer specializing in UI/UX design, brand identity, graphic design, and digital marketing",
    "url": "https://bereketfikre.com",
    "image": 'https://bereketfikre.com/img/Bereket-Fikre.webp',
    "sameAs": [
      "https://www.linkedin.com/in/bereket-fikre",
      "https://www.instagram.com/bereket_fikre",
      "https://github.com/bereketfikre",
      "https://dribbble.com/bereketfikre"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Addis Ababa",
      "addressCountry": "Ethiopia"
    },
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance Creative Designer"
    },
    "knowsAbout": [
      "UI/UX Design",
      "Brand Identity Design",
      "Graphic Design",
      "Web Design",
      "Digital Marketing",
      "Logo Design",
      "Print Design"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Creative Designer",
      "occupationLocation": {
        "@type": "City",
        "name": "Addis Ababa, Ethiopia"
      }
    }
  };

  // Add section-specific structured data
  switch (section) {
    case 'work':
      return [
        baseData,
        {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "name": "Bereket Fikre Portfolio",
          "description": "Professional portfolio showcasing creative design work including UI/UX design, brand identity, and graphic design projects",
          "creator": {
            "@type": "Person",
            "name": "Bereket Fikre"
          },
          "url": "https://bereketfikre.com/#work",
          "dateCreated": "2024",
          "genre": "Portfolio",
          "keywords": "creative design, UI/UX, brand identity, graphic design, portfolio"
        }
      ];
    
    case 'blog':
      return [
        baseData,
        {
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Bereket Fikre Design Blog",
          "description": "Design insights, industry trends, and behind-the-scenes content from professional creative designer",
          "author": {
            "@type": "Person",
            "name": "Bereket Fikre"
          },
          "url": "https://bereketfikre.com/#blog",
          "publisher": {
            "@type": "Person",
            "name": "Bereket Fikre"
          }
        }
      ];
    
    case 'services':
      return [
        baseData,
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Creative Design Services",
          "description": "Professional creative design services including UI/UX design, brand identity, graphic design, and digital marketing",
          "provider": {
            "@type": "Person",
            "name": "Bereket Fikre"
          },
          "serviceType": "Creative Design",
          "areaServed": {
            "@type": "Country",
            "name": "Ethiopia"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Design Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "UI/UX Design",
                  "description": "User interface and user experience design services"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Brand Identity Design",
                  "description": "Complete brand identity and logo design services"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Graphic Design",
                  "description": "Print and digital graphic design services"
                }
              }
            ]
          }
        }
      ];
    
    default:
      return baseData;
  }
};

// Advanced SEO component
const AdvancedSEO = ({ section = 'home', additionalData = {} }) => {
  useEffect(() => {
    // Get SEO data for current section
    const seoData = {
      ...SEO_CONFIG.default,
      ...SEO_CONFIG.sections[section],
      ...additionalData
    };

    // Update document title
    document.title = seoData.title;
    
    // Helper function to update or create meta tags
    const updateMetaTag = (property, content, isProperty = false) => {
      const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
      let meta = document.querySelector(selector);
      
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        if (isProperty) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', property);
        }
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    // Update basic meta tags
    updateMetaTag('description', seoData.description);
    updateMetaTag('keywords', seoData.keywords);
    updateMetaTag('author', 'Bereket Fikre');
    
    // Update Open Graph tags
    updateMetaTag('og:title', seoData.title, true);
    updateMetaTag('og:description', seoData.description, true);
    updateMetaTag('og:image', seoData.image, true);
    updateMetaTag('og:image:secure_url', seoData.image, true);
    updateMetaTag('og:image:alt', `${seoData.title} - Bereket Fikre`, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:image:type', 'image/webp', true);
    updateMetaTag('og:url', `${seoData.url}${window.location.pathname}${window.location.hash}`, true);
    updateMetaTag('og:type', seoData.type, true);
    updateMetaTag('og:site_name', 'Bereket Fikre Portfolio', true);
    updateMetaTag('og:locale', 'en_US', true);
    updateMetaTag('og:updated_time', new Date().toISOString(), true);
    
    // Update Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', false);
    updateMetaTag('twitter:title', seoData.title, false);
    updateMetaTag('twitter:description', seoData.description, false);
    updateMetaTag('twitter:image', seoData.image, false);
    updateMetaTag('twitter:url', `${seoData.url}${window.location.pathname}${window.location.hash}`, false);
    updateMetaTag('twitter:creator', '@bereketfikre', false);
    updateMetaTag('twitter:site', '@bereketfikre', false);
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `${seoData.url}${window.location.pathname}${window.location.hash}`);
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', `${seoData.url}${window.location.pathname}${window.location.hash}`);
      document.head.appendChild(canonical);
    }

    // Update structured data
    const structuredData = generateStructuredData(section, additionalData);
    let structuredDataScript = document.querySelector('script[type="application/ld+json"]');
    
    if (structuredDataScript) {
      structuredDataScript.textContent = JSON.stringify(structuredData);
    } else {
      structuredDataScript = document.createElement('script');
      structuredDataScript.type = 'application/ld+json';
      structuredDataScript.textContent = JSON.stringify(structuredData);
      document.head.appendChild(structuredDataScript);
    }

    // Track page view for analytics
    if (window.gtag) {
      window.gtag('config', 'G-XXXXXXXXXX', {
        page_title: seoData.title,
        page_location: `${seoData.url}${window.location.pathname}${window.location.hash}`,
        custom_map: {
          'custom_parameter_1': section
        }
      });
    }

  }, [section, additionalData]);

  return null; // This component doesn't render anything visible
};

// Hook for easy SEO management
export const useSEO = (section, additionalData = {}) => {
  useEffect(() => {
    const seoData = {
      ...SEO_CONFIG.default,
      ...SEO_CONFIG.sections[section],
      ...additionalData
    };

    document.title = seoData.title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', seoData.description);
    }
  }, [section, additionalData]);
};

export default AdvancedSEO;
