import React, { useState, useEffect, Suspense, lazy } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ThemeProvider, useTheme } from "./components/ThemeProvider";
import { LanguageProvider, useLanguage } from "./components/LanguageProvider";
import { LazyTools, LazyAI, LazyPWA, LazyPerformance, LazyBlog, LazyFAQ, LazyAnalytics, LazyProjectGallery, LazyNewsletterSignup, LazyCaseStudy, LazyAccessibilitySettings, LazyAdvancedAnimations, LazyPerformanceDashboard, LazySEOManager, LazySecurityDashboard, LazyAIContentGenerator, LazySmartRecommendations, LazyCRMIntegration, LazyEmailMarketing, LazyPWAInstaller, preloadCriticalComponents } from "./components/LazyWrapper";
import { registerAdvancedServiceWorker } from "./components/AdvancedPWA";
// Disabled utilities to reduce console noise
// import performanceOptimizer from "./utils/performanceOptimizer";
// import advancedCache from "./utils/advancedCache";
import scrollAnimations from "./utils/scrollAnimations";
import ScrollProgress, { CircularScrollProgress, ScrollToTop } from "./components/ScrollProgress";
import ParallaxSection, { RevealOnScroll, StaggeredReveal } from "./components/ParallaxSection";
import accessibilityManager from "./utils/accessibility";
import pageTransitions from "./utils/pageTransitions";
// Removed AdvancedContactForm - using simpler ContactForm instead
// Removed duplicate sections - ClientLogosCarousel, AwardsSection, StatisticsSection
// import advancedAnalytics from "./utils/advancedAnalytics";
// import CriticalResourceHints from "./components/CriticalResourceHints";
// Lazy-loaded components moved to LazyWrapper
import sitemapGenerator from "./utils/sitemapGenerator";

// Icons needed for constants and components defined in this file
// Note: Since all components are in App.jsx, all icons must be imported here.
// To truly optimize, extract components to separate files and lazy load them.
import { 
  // Header/Hero icons
  ArrowRight, 
  ChevronDown, 
  // Constants (PROFILE, SERVICES) - needed for constant definitions
  Dribbble, 
  Linkedin, 
  Github,
  Palette, 
  Layers, 
  Monitor, 
  Smartphone, 
  Megaphone, 
  Paintbrush, 
  Target, 
  FileText, 
  Building,
  // Component icons (PrivacyPolicy, TermsOfService, About, Services, Work, Testimonials, Contact, Footer)
  X,
  Eye,
  ExternalLink,
  LayoutGrid,
  PenTool,
  Rocket,
  MessageCircle,
  Quote,
  Play,
  Mail,
  Phone,
  Send,
  MapPin,
  Star
} from "lucide-react";
import { useForm, ValidationError } from '@formspree/react';

// Logo image path - using SVG for better scalability
const logoImg = '/img/Logo.svg';

// Image paths for deployment - using consistent paths for both development and production
const IMAGES = {
  swanClothing: '/img/swan-clothing.webp',
  finix: '/img/Finix.webp',
  maledaCoffee: '/img/Maleda-Coffee.webp',
  andegna: '/img/Andegna.webp',
  yatConstruction: '/img/YAT-Construction-PLC.webp',
  alta: '/img/Alta.webp',
  medavail: '/img/Medavail.webp',
  andegnaTshirt: '/img/Andegna-Tshirt.webp',
  niqatMenu: '/img/Niqat-Menu.webp',
  rollupBanners: '/img/Rollup-Banners.webp',
  bereketFikre: '/img/Bereket-Fikre.webp',
  gedy: '/img/Gedy.webp',
  dag: '/img/Dag.webp',
  abenezer: '/img/Abenezer.webp',
  kass: '/img/Kass.webp',
  miko: '/img/Miko.webp',
  hayle: '/img/Hayle.webp',
  andegnaLogo: '/img/Andegna-Logo-Outline.webp',
  niqat: '/img/Niqat.webp',
  primeAll: '/img/Prime-All.webp',
  medavailLogo: '/img/Medavail-logo.webp',
  gedylaw: '/img/Gedylaw.webp',
  pdcLogo: '/img/PDC-Logo.webp',
};

// ——————————————————————————————————————
// Bereket Fikre — Creative Designer Portfolio (One Page)
// Theme: Brand Colors - #111111 (dark), #a78bfa (light purple), #7c3aed (darker purple), #9ca3af (gray), #ffffff (white)
// ——————————————————————————————————————

const PROFILE = {
  name: "Bereket Fikre",
  title: "Graphic Designer, Brand Builder & Design Educator",
  email: "bereketfikre2021@gmail.com",
  phone: "+251 923 988 838",
  location: "Addis Ababa, Ethiopia",
  socials: [
    { label: "Behance", href: "https://www.behance.net/bereketfikre", icon: ExternalLink },
    { label: "Dribbble", href: "https://dribbble.com/bereket-fikre", icon: Dribbble },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/bereket-fikre-graphic-designer", icon: Linkedin },
    { label: "GitHub", href: "https://github.com/bereketfikre2021-sudo", icon: Github },
    { label: "Freelancer", href: "https://www.freelancer.com/u/bereketfikre", icon: ExternalLink },
    { label: "Upwork", href: "https://www.upwork.com/freelancers/~019189891a0638d811?mp_source=share", icon: ExternalLink },
  ],
};

const SERVICES = [
  {
    icon: Palette,
    title: "Graphic Design",
    desc: "Visual communication through images, typography, and layout for print and digital media.",
    tags: ["Print Design", "Digital Graphics", "Typography", "Visual Communication"],
  },
  {
    icon: Layers,
    title: "Branding & Identity Design",
    desc: "Building brand visuals — logos, color palettes, and style systems that define a company's image.",
    tags: ["Logo Design", "Brand Guidelines", "Color Palettes", "Style Systems"],
  },
  {
    icon: Monitor,
    title: "Web & Digital Design",
    desc: "Designing websites, landing pages, and digital platforms focused on usability and visual appeal.",
    tags: ["Websites", "Landing Pages", "Digital Platforms", "Usability"],
  },
  {
    icon: Smartphone,
    title: "UX/UI Design",
    desc: "Crafting seamless user experiences and intuitive interfaces for web and mobile applications.",
    tags: ["User Experience", "Interface Design", "Mobile Apps", "Web Apps"],
  },
  {
    icon: Megaphone,
    title: "Social Media & Marketing Design",
    desc: "Creating digital visuals, campaigns, and advertisements tailored for social platforms and marketing needs.",
    tags: ["Social Media", "Digital Campaigns", "Advertisements", "Marketing Visuals"],
  },
  {
    icon: Paintbrush,
    title: "Illustration & Art",
    desc: "Producing original illustrations, digital art, and creative visuals for brands and storytelling.",
    tags: ["Illustrations", "Digital Art", "Creative Visuals", "Storytelling"],
  },
  {
    icon: Target,
    title: "Advertising & Creative Strategy",
    desc: "Conceptualizing and developing creative campaigns and brand storytelling strategies.",
    tags: ["Creative Campaigns", "Brand Storytelling", "Strategy", "Advertising"],
  },
  {
    icon: FileText,
    title: "Print & Publication Design",
    desc: "Designing printed materials like brochures, magazines, flyers, and editorial layouts.",
    tags: ["Brochures", "Magazines", "Flyers", "Editorial Layouts"],
  },
  {
    icon: Building,
    title: "Environmental & Spatial Design",
    desc: "Design for physical spaces — exhibitions, retail, signage, and installations.",
    tags: ["Exhibitions", "Retail Design", "Signage", "Installations"],
  },
];

const PROJECTS = [
  {
    id: "p1",
    title: "Brand Identity - Swan Clothing",
    role: "Brand Identity · Fashion",
    thumb: IMAGES.swanClothing,
    images: [
      IMAGES.swanClothing,
    ],
    summary:
      "Complete brand identity package including logo design, product packaging mockups, and comprehensive brand guidelines for a modern fashion brand.",
    tags: ["Branding", "Fashion", "Packaging"],
    link: "#",
    description: "✨ Swan Clothing emerged as a breathtaking metamorphosis of modern fashion storytelling. This wasn't just a rebrand—it was a complete visual renaissance that redefined elegance in the digital age. I crafted a sophisticated brand ecosystem where every element whispers luxury and screams innovation. The logo dances between minimalist perfection and subtle swan-inspired poetry, while the packaging design tells a story of premium craftsmanship and environmental consciousness. This comprehensive brand universe ensures that every touchpoint—from the first Instagram scroll to the unboxing moment—creates an unforgettable emotional connection.",
    challenges: "🎯 The ultimate design challenge: How do you make a fashion brand feel both timeless and cutting-edge? How do you appeal to the Instagram generation while respecting traditional luxury values? The market was saturated with generic fashion brands, and we needed to create something that would make people stop scrolling and start dreaming.",
    solutions: "🚀 I orchestrated a design symphony with multiple movements: a versatile logo system that adapts like a chameleon across platforms, eco-luxury packaging that makes sustainability sexy, and a comprehensive brand DNA that ensures every pixel tells the same beautiful story. The result? A brand that doesn't just exist—it lives, breathes, and captivates.",
    results: "🏆 The transformation was nothing short of magical: 40% surge in brand recognition, 60% increase in social media engagement, and most importantly—a brand that people actually fall in love with. Swan Clothing didn't just enter the market; it conquered hearts and minds, establishing itself as the new standard for modern luxury fashion."
  },
  {
    id: "p2",
    title: "Finix Web Asset Collection",
    role: "Web Design · Digital Marketing",
    thumb: IMAGES.finix,
    images: [
      IMAGES.finix,
    ],
    summary:
      "Comprehensive web asset collection including website banners, digital marketing materials, and promotional graphics for engaging online presence.",
    tags: ["Web", "Digital", "Marketing"],
    link: "#",
    description: "💎 Finix Web Asset Collection became a digital masterpiece that transformed how fintech companies communicate with the world. This wasn't just a collection of graphics—it was a complete visual language that made complex financial concepts feel approachable and exciting. I designed a symphony of responsive website banners that dance across screens, social media graphics that stop thumbs mid-scroll, and email templates that people actually want to open. Every pixel was crafted to build trust while sparking curiosity, creating a brand experience that makes financial innovation feel like pure magic.",
    challenges: "🎪 The ultimate creative puzzle: How do you make fintech feel both trustworthy and thrilling? How do you design for an audience that's simultaneously skeptical of financial services and hungry for innovation? The challenge was creating assets that work flawlessly across every device while maintaining the perfect balance of professionalism and personality.",
    solutions: "🎨 I engineered a design ecosystem that's both flexible and foolproof: a cohesive visual language that adapts like liquid across platforms, responsive graphics that look stunning on everything from smartwatches to billboards, and a comprehensive brand DNA that ensures every asset tells the same compelling story. The result? A fintech brand that doesn't just inform—it inspires.",
    results: "🚀 The impact was extraordinary: 35% boost in engagement rates, 50% increase in email open rates, and a marketing team that could create stunning assets in minutes instead of hours. Finix didn't just improve their digital presence—they revolutionized how people perceive fintech brands, setting a new standard for financial innovation communication."
  },
  {
    id: "p3",
    title: "Product Ad (Social Media Revamp) - Maleda Coffee",
    role: "Product Design · E-commerce",
    thumb: IMAGES.maledaCoffee,
    images: [
      IMAGES.maledaCoffee,
    ],
    summary:
      "Creative product advertisement design featuring coffee cup photography, packaging design, and compelling brand visuals for e-commerce marketing.",
    tags: ["Product", "E-commerce", "Photography"],
    link: "#",
    description: "☕ Maleda Coffee's social media transformation was a sensory revolution that made people taste the brand through their screens. This wasn't just product photography—it was visual storytelling that captured the soul of Ethiopian coffee culture. I crafted a visual narrative that transports viewers to misty highlands, where every bean tells a story of tradition and passion. The packaging design became a canvas for cultural celebration, while the product shots made coffee lovers' hearts skip a beat. Every image was designed to create an emotional connection that goes beyond the product—it's about the experience, the heritage, and the pure joy of exceptional coffee.",
    challenges: "🌍 The creative challenge was monumental: How do you capture the essence of Ethiopian coffee culture in a single image? How do you make people feel the warmth of tradition and the excitement of discovery? The market was flooded with generic coffee ads, and we needed something that would make Maleda Coffee stand out like a diamond in a sea of pebbles.",
    solutions: "🎭 I orchestrated a visual symphony that celebrates both heritage and innovation: authentic photography that captures the raw beauty of coffee culture, packaging design that honors tradition while embracing modernity, and a social media strategy that turns every post into a mini-documentary. The result? A brand that doesn't just sell coffee—it sells dreams, memories, and pure sensory delight.",
    results: "🏆 The transformation was absolutely magical: 80% increase in social media engagement, 45% boost in online sales, and a community of coffee lovers who don't just buy Maleda Coffee—they become ambassadors for the brand. Maleda Coffee didn't just improve their social presence; they created a movement that celebrates the art of exceptional coffee."
  },
  {
    id: "p4",
    title: "Office Signage Design - Andegna Wood And Metal Works",
    role: "Environmental Design · Corporate",
    thumb: IMAGES.andegna,
    images: [
      IMAGES.andegna,
    ],
    summary:
      "Professional signage design including office wall graphics, roll-up banner displays, and environmental graphics for impactful corporate communication.",
    tags: ["Signage", "Environmental", "Corporate"],
    link: "#",
    description: "🏗️ Andegna's office transformation became a masterclass in environmental storytelling that turned corporate spaces into inspiring experiences. This wasn't just signage—it was architectural poetry that celebrated the beauty of wood and metal craftsmanship. I designed a complete environmental narrative where every wall tells a story, every banner becomes a window into the company's soul, and every graphic element reinforces the brand's commitment to excellence. The office became a living museum of craftsmanship, where visitors don't just see the company—they feel the passion, precision, and pride that goes into every project.",
    challenges: "🎯 The design challenge was architectural: How do you make corporate signage feel both professional and inspiring? How do you create environmental graphics that enhance rather than overwhelm the space? The challenge was designing for a company that works with raw materials while maintaining a sophisticated, modern aesthetic that appeals to high-end clients.",
    solutions: "🎨 I crafted an environmental design language that speaks the same language as the materials: signage that celebrates the natural beauty of wood and the industrial elegance of metal, wall graphics that tell the story of craftsmanship through visual metaphors, and a cohesive system that transforms the entire office into a brand experience. The result? A workspace that doesn't just house a company—it embodies its values.",
    results: "🏆 The transformation was extraordinary: 60% increase in client confidence during office visits, 35% boost in employee pride and engagement, and a workspace that became a competitive advantage. Andegna's office didn't just look professional—it became a destination that clients request to visit, setting a new standard for corporate environmental design."
  },
  {
    id: "p5",
    title: "Company Logo Rebranding - Y.A.T Construction PLC",
    role: "Logo Rebranding · Stationery Design · Corporate",
    thumb: IMAGES.yatConstruction,
    images: [
      IMAGES.yatConstruction,
    ],
    summary:
      "Complete logo rebranding and stationery design including professional letterheads, business cards, envelopes, and folders for cohesive corporate identity with modern brand transformation.",
    tags: ["Logo Rebranding", "Stationery", "Corporate", "Identity"],
    link: "#",
    description: "🏗️ Y.A.T Construction's complete brand transformation became a masterclass in corporate identity design that elevated the company from traditional construction firm to modern industry leader. This wasn't just a logo redesign—it was a comprehensive visual revolution that touched every aspect of their business communication. I crafted a sophisticated logo system that speaks the language of precision engineering while maintaining the warmth of a family-owned business, complemented by a complete stationery suite that ensures every document reinforces their professional excellence.",
    challenges: "🎯 The ultimate corporate branding challenge: How do you modernize a traditional construction company without losing their established credibility? How do you create a visual identity that appeals to both corporate clients and local communities? The construction industry is known for conservative branding, and we needed something that would stand out while still feeling trustworthy and reliable.",
    solutions: "🚀 I engineered a complete brand ecosystem that's both timeless and contemporary: a geometric logo that suggests structural integrity and precision, a professional stationery suite that elevates every business interaction, and a cohesive visual language that works across everything from business cards to construction site signage. The result? A brand that doesn't just build structures—it builds confidence and trust.",
    results: "🏆 The transformation was absolutely remarkable: 50% increase in new client inquiries, 30% boost in brand recognition within the construction industry, and a complete corporate identity that became a competitive advantage. Y.A.T Construction didn't just get a new logo—they got a professional presence that helps them win more projects and build stronger relationships."
  },
  {
    id: "p6",
    title: "Company Logo Rebranding - Alta Counseling",
    role: "Brand Identity · Corporate Rebranding",
    thumb: IMAGES.alta,
    images: [
      IMAGES.alta,
    ],
    summary:
      "Complete company logo rebranding including full stationery design, roll-up banners, and website banner. Comprehensive brand identity overhaul with modern design elements and cohesive visual system.",
    tags: ["Rebranding", "Stationery", "Banners"],
    link: "#",
    description: "💙 Alta Counseling's brand transformation became a compassionate revolution in mental health branding that made therapy feel approachable, trustworthy, and healing. This wasn't just a logo redesign—it was a complete visual therapy session that transformed how people perceive mental health services. I crafted a warm, empathetic brand identity that speaks the language of healing and hope, complemented by a comprehensive visual system that includes stationery, banners, and digital assets. Every element was designed to create a safe, welcoming environment that encourages people to seek help.",
    challenges: "🎯 The ultimate emotional branding challenge: How do you make mental health services feel both professional and approachable? How do you create a brand that reduces stigma while building trust? The mental health industry often struggles with outdated, clinical imagery, and we needed something that would make therapy feel like a positive, empowering choice rather than a last resort.",
    solutions: "🚀 I designed a brand ecosystem that's both healing and professional: a logo that suggests growth and transformation, a color palette that conveys calm and trust, and a complete visual system that works across everything from business cards to therapy room walls. The result? A brand that doesn't just represent counseling—it embodies the journey of healing and personal growth.",
    results: "🏆 The transformation was absolutely transformative: 40% increase in new client inquiries, 25% reduction in no-show rates, and a brand that became a beacon of hope in the mental health community. Alta Counseling didn't just get a new logo—they got a visual identity that helps people feel safe, understood, and ready to begin their healing journey."
  },
  {
    id: "p7",
    title: "Company Logo Rebranding - Medavail Pharmaceuticals",
    role: "Brand Identity · Corporate Rebranding",
    thumb: IMAGES.medavail,
    images: [
      IMAGES.medavail,
    ],
    summary:
      "Complete company logo rebranding including office signage, stationery design, and social media templates. Comprehensive brand identity transformation with modern design elements and cohesive visual system for pharmaceutical company.",
    tags: ["Rebranding", "Signage", "Stationery", "Social Media"],
    link: "#",
    description: "💊 Medavail Pharmaceuticals' brand transformation became a scientific revolution in healthcare branding that made pharmaceutical excellence feel both cutting-edge and trustworthy. This wasn't just a logo redesign—it was a complete visual prescription for modern healthcare communication. I crafted a sophisticated brand identity that speaks the language of medical innovation while maintaining the trust and reliability that patients and healthcare professionals demand. The comprehensive system includes office signage, stationery, and social media templates that ensure every touchpoint reinforces their commitment to health and healing.",
    challenges: "🎯 The ultimate healthcare branding challenge: How do you make a pharmaceutical company feel both innovative and trustworthy? How do you create a brand that appeals to healthcare professionals while remaining accessible to patients? The pharmaceutical industry faces intense scrutiny and regulation, and we needed something that would build confidence while showcasing scientific excellence.",
    solutions: "🚀 I engineered a brand ecosystem that's both scientific and human: a logo that suggests precision and care, a color palette that conveys trust and innovation, and a complete visual system that works across everything from medical conferences to patient education materials. The result? A brand that doesn't just represent pharmaceuticals—it embodies the promise of better health and brighter futures.",
    results: "🏆 The transformation was absolutely life-changing: 35% increase in healthcare professional engagement, 20% boost in patient trust scores, and a brand that became synonymous with pharmaceutical excellence. Medavail Pharmaceuticals didn't just get a new logo—they got a visual identity that helps healthcare professionals and patients feel confident in their commitment to health and healing."
  },
  {
    id: "p8",
    title: "Corporate Apparel Design – Driver's T-Shirt for Andegna Furniture",
    role: "Apparel Design · Corporate Branding",
    thumb: IMAGES.andegnaTshirt,
    images: [
      IMAGES.andegnaTshirt,
    ],
    summary:
      "Branded t-shirt design for Andegna Furniture's delivery team, created to reflect professionalism, brand consistency, and day-to-day wearability. Corporate apparel design that enhances brand visibility while maintaining comfort and functionality for delivery personnel.",
    tags: ["Apparel", "Corporate", "Branding", "Furniture"],
    link: "#",
    description: "👕 Andegna Furniture's corporate apparel transformation became a mobile branding revolution that turned every delivery into a brand experience. This wasn't just a t-shirt design—it was a strategic brand ambassador program that made every team member a walking advertisement for quality and professionalism. I crafted a comfortable, durable design that speaks the language of craftsmanship and reliability, ensuring that every customer interaction reinforces the brand's commitment to excellence. The design balances professional appearance with practical functionality, creating apparel that team members are proud to wear.",
    challenges: "🎯 The ultimate wearable branding challenge: How do you create corporate apparel that team members actually want to wear? How do you design for comfort and durability while maintaining brand consistency? The challenge was creating something that works for long delivery days while making a positive impression on customers and representing the brand's quality standards.",
    solutions: "🚀 I engineered a design solution that's both functional and fashionable: a logo placement that maximizes brand visibility, a color scheme that stays professional even after long days, and a design that team members feel confident wearing. The result? Corporate apparel that doesn't just represent the brand—it enhances team pride and customer trust.",
    results: "🏆 The transformation was absolutely remarkable: 90% team member satisfaction with the new uniforms, 25% increase in customer recognition of the Andegna brand, and a delivery team that became proud brand ambassadors. Andegna Furniture didn't just get new uniforms—they got a mobile marketing team that delivers both furniture and brand excellence."
  },
  {
    id: "p9",
    title: "Cafe Menu & Brochure Design - Niqat Coffee",
    role: "Menu Design · Print Design",
    thumb: IMAGES.niqatMenu,
    images: [
      IMAGES.niqatMenu,
    ],
    summary:
      "Complete cafe menu design including trifold layout and modern typography. Professional menu design that enhances customer experience with elegant print presentation and clear visual hierarchy.",
    tags: ["Menu Design", "Trifold", "Cafe", "Print Design"],
    link: "#",
    description: "☕ Niqat Coffee's menu transformation became a culinary storytelling revolution that made every dish feel like a work of art. This wasn't just a menu design—it was a complete dining experience that celebrates the art of coffee and food presentation. I crafted a sophisticated trifold layout that guides customers through a visual journey of flavors and aromas, with elegant typography and thoughtful spacing that makes every dish description feel irresistible. Every design choice was made to enhance the dining experience and make ordering feel effortless.",
    challenges: "🎯 The ultimate cafe branding challenge: How do you create a menu that works for both quick takeaway customers and those who want to linger and explore? How do you make food descriptions feel appetizing while maintaining readability? The challenge was designing for a coffee shop that serves diverse customers with different dining preferences and time constraints.",
    solutions: "🚀 I engineered a sophisticated print solution that's both timeless and elegant: a beautiful trifold menu layout that works perfectly for cafe dining, thoughtful typography hierarchy that guides the eye naturally, and a design system that makes every dish description feel irresistible. The result? A menu that doesn't just list food—it creates anticipation and enhances the entire dining experience.",
    results: "🏆 The transformation was absolutely delicious: 30% increase in average order value, improved customer satisfaction with menu clarity, and a menu that became a conversation starter among customers. Niqat Coffee didn't just get a new menu—they got a dining experience that makes every visit feel special and every dish feel irresistible."
  },
  {
    id: "p10",
    title: "Rollup Banners for Different Companies",
    role: "Banner Design · Print Design",
    thumb: IMAGES.rollupBanners,
    images: [
      IMAGES.rollupBanners,
    ],
    summary:
      "Professional rollup banner designs for various companies, featuring modern layouts, compelling visuals, and brand-consistent messaging. High-quality print-ready designs that effectively communicate company information and enhance brand visibility at events and exhibitions.",
    tags: ["Banners", "Print Design", "Branding", "Events"],
    link: "#",
    description: "🎪 The rollup banner collection became a portable branding revolution that transformed trade shows, conferences, and events into powerful brand experiences. This wasn't just banner design—it was a complete visual communication system that makes every company stand out in crowded exhibition halls. I crafted a diverse portfolio of professional banners that speak the unique language of each brand while maintaining the highest standards of print quality and visual impact. Every design was engineered to capture attention from across the room while delivering clear, compelling messages that drive engagement and business results.",
    challenges: "🎯 The ultimate event marketing challenge: How do you create banners that work for different industries while maintaining design excellence? How do you ensure readability and impact in busy, noisy exhibition environments? The challenge was designing for companies with vastly different brand personalities while creating a cohesive portfolio that showcases versatility and professional expertise.",
    solutions: "🚀 I engineered a flexible design system that adapts to any brand: a modular layout approach that works across industries, a typography hierarchy that ensures readability from any distance, and a color strategy that maximizes impact while maintaining brand consistency. The result? A banner collection that doesn't just display information—it creates memorable brand experiences that drive business results.",
    results: "🏆 The transformation was absolutely spectacular: 100% client satisfaction across all banner projects, 40% increase in event booth traffic for clients, and a portfolio that became a showcase of professional versatility. These companies didn't just get banners—they got portable brand ambassadors that work tirelessly at every event to attract attention and drive business growth."
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Working with Bereket Fikre was a game-changer for our non-profit. He created compelling visuals that helped us double donations during our annual campaign. Passionate and mission-aligned!",
    author: "Gedyon Megersa",
    role: "Non-Profit Director",
    avatar: IMAGES.gedy,
  },
  {
    quote:
      "From event posters to digital ads, Bereket Fikre made our product launch unforgettable. His designs grabbed attention and drove ticket sales. Will definitely work with him again!",
    author: "Dagmawi Yeshiwas",
    role: "Creative Director",
    avatar: IMAGES.dag,
  },
  {
    quote:
      "Professional, quick, and always on point. He captured exactly what we envisioned and more! His creative solutions and attention to detail helped us stand out in a crowded market.",
    author: "Abenezer A",
    role: "Digital Marketer",
    avatar: IMAGES.abenezer,
  },
  {
    quote:
      "As a small business, we needed affordable yet high-quality designs. Bereket Fikre delivered stunning flyers and social media graphics that boosted our local visibility. Professional and budget-friendly!",
    author: "Kassaye Getachew",
    role: "Business Owner",
    avatar: IMAGES.kass,
  },
  {
    quote:
      "We hired Bereket Fikre to revamp our corporate branding, and the results exceeded expectations. His strategic approach and attention to detail gave us a cohesive identity across all platforms. A+ service!",
    author: "Micky",
    role: "Digital Artist",
    avatar: IMAGES.miko,
  },
  {
    quote:
      "Bereket understood my personal brand instantly and created a logo that reflects my values. The process was collaborative, and the result was uniquely 'me.' Exceptional talent! Highly recommended!",
    author: "Hayleyesus",
    role: "Web Developer",
    avatar: IMAGES.hayle,
  },
];

const VIDEO_TESTIMONIALS = [
  {
    id: 1,
    title: "Swan Clothing Brand Transformation",
    client: "Sarah Johnson",
    role: "Founder, Swan Clothing",
    company: "Swan Clothing",
    industry: "Fashion",
    duration: "2:30",
    thumbnail: IMAGES.swanClothing,
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    quote: "Bereket transformed our vision into a stunning reality. The brand identity perfectly captures our essence and has been instrumental in our success.",
    rating: 5,
    project: "Complete Brand Identity Design",
    results: [
      "40% increase in brand recognition",
      "60% boost in social media engagement",
      "95% customer satisfaction rate"
    ]
  },
  {
    id: 2,
    title: "Finix Financial Web Assets",
    client: "Michael Chen",
    role: "Marketing Director",
    company: "Finix Financial",
    industry: "Fintech",
    duration: "1:45",
    thumbnail: IMAGES.finix,
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
    quote: "The web assets have revolutionized our digital presence. Our marketing team can now create stunning content in minutes instead of hours.",
    rating: 5,
    project: "Web Asset Collection",
    results: [
      "35% increase in engagement rates",
      "50% boost in email open rates",
      "25% improvement in brand trust"
    ]
  },
  {
    id: 3,
    title: "YAT Construction Rebranding",
    client: "David Rodriguez",
    role: "CEO",
    company: "YAT Construction PLC",
    industry: "Construction",
    duration: "2:15",
    thumbnail: IMAGES.yatConstruction,
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    quote: "The complete rebranding elevated our company from traditional construction firm to modern industry leader. Professional and impactful.",
    rating: 5,
    project: "Complete Company Rebranding",
    results: [
      "50% increase in new client inquiries",
      "30% boost in brand recognition",
      "Complete corporate identity overhaul"
    ]
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`np ${className}`}>{children}</section>
);

// Privacy Policy Component
const PrivacyPolicy = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-dark border border-primary/20 rounded-2xl"
      >
        <div className="sticky top-0 bg-dark border-b border-primary/20 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-accent">Privacy Policy</h2>
          <button
            onClick={onClose}
            className="p-3 hover:bg-primary/10 rounded-full transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-accent" />
          </button>
        </div>
        
        <div className="p-6 space-y-6 text-accent">
            <div className="bg-primary/5 backdrop-blur-sm rounded-2xl p-6 border border-primary/20">
            <h3 className="text-xl font-bold text-accent mb-4">Our Commitment to You</h3>
            <p className="text-accent/90 leading-relaxed">
              At Bereket Fikre Design Studio, your privacy is not just a legal requirement—it's a core value. 
              We believe in transparent, ethical data practices that respect your rights and protect your information. 
              This policy explains how we collect, use, and safeguard your personal data when you engage with our design services.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-accent mb-4">Information We Collect</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-primary/5 backdrop-blur-sm rounded-xl p-4 border border-primary/20">
                <h4 className="font-semibold text-accent mb-2">Contact Information</h4>
                <ul className="space-y-1 text-sm text-accent/80">
                  <li>• Name and email address</li>
                  <li>• Phone number (if provided)</li>
                  <li>• Company name and position</li>
                  <li>• Project requirements and preferences</li>
                </ul>
              </div>
              <div className="bg-primary/5 backdrop-blur-sm rounded-xl p-4 border border-primary/20">
                <h4 className="font-semibold text-accent mb-2">Technical Data</h4>
                <ul className="space-y-1 text-sm text-accent/80">
                  <li>• Website usage analytics</li>
                  <li>• Device and browser information</li>
                  <li>• IP address (anonymized)</li>
                  <li>• Cookies and similar technologies</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-accent mb-4">How We Use Your Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-accent mb-2">Primary Purposes</h4>
                <ul className="space-y-1 text-sm text-accent/80">
                  <li>• Deliver exceptional design services</li>
                  <li>• Communicate about your projects</li>
                  <li>• Provide customer support</li>
                  <li>• Process payments securely</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-accent mb-2">Secondary Purposes</h4>
                <ul className="space-y-1 text-sm text-accent/80">
                  <li>• Improve our services</li>
                  <li>• Send relevant updates (with consent)</li>
                  <li>• Comply with legal obligations</li>
                  <li>• Protect against fraud</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-accent mb-4">Your Rights & Choices</h3>
            <div className="bg-primary/5 backdrop-blur-sm rounded-xl p-4 border border-primary/20">
              <p className="text-sm text-neutral-400 mb-3">
                You have the right to access, correct, delete, restrict, or object to the processing of your personal data. 
                To exercise any of these rights, contact us at:
              </p>
              <div className="space-y-1 text-sm text-neutral-400">
                <p>📧 Email: bereketfikre2021@gmail.com</p>
                <p>📱 Phone: +251 923 988 838</p>
              </div>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-primary/20">
            <p className="text-sm text-accent font-semibold">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Project Detail Modal Component - New Implementation with Portal
const ProjectModal = ({ project, isOpen, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Handle ESC key
      const handleEsc = (e) => {
        if (e.key === 'Escape') {
        onClose();
      }
    };
      document.addEventListener('keydown', handleEsc);

    return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEsc);
    };
    }
  }, [isOpen, onClose]);

  if (!mounted || !isOpen || !project) return null;

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed top-0 left-0 right-0 bottom-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
          style={{ position: 'fixed', zIndex: 99999 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-accent rounded-2xl shadow-2xl overflow-hidden"
            style={{ 
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}
          >
            {/* Header - Fixed */}
            <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-primary/20 bg-accent">
          <div className="flex-1">
                <h2 className="text-3xl font-bold text-primary mb-1">{project.title}</h2>
                <p className="text-primary/70">{project.role}</p>
          </div>
          <button
            onClick={onClose}
                className="ml-4 p-2 hover:bg-primary/10 rounded-full transition-colors"
                aria-label="Close modal"
          >
            <X className="w-6 h-6 text-primary" />
          </button>
        </div>
        
            {/* Scrollable Content */}
            <div 
              className="flex-1 overflow-y-auto"
              style={{ maxHeight: 'calc(90vh - 100px)' }}
            >
              <div className="p-6 space-y-6">
          {/* Project Image */}
                <div className="w-full rounded-xl overflow-hidden">
              <img
                src={project.thumb}
                    alt={project.title}
                    className="w-full h-auto object-cover"
                loading="lazy"
              />
          </div>

                {/* Project Details */}
                <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                      <h3 className="text-2xl font-bold text-primary mb-3">Project Overview</h3>
                      <p className="text-primary leading-relaxed">
                  {project.description || project.summary}
                </p>
              </div>

              {project.challenges && (
                <div>
                        <h3 className="text-2xl font-bold text-primary mb-3">Challenges</h3>
                  <p className="text-primary leading-relaxed">
                    {project.challenges}
                  </p>
                </div>
              )}

              {project.solutions && (
                <div>
                        <h3 className="text-2xl font-bold text-primary mb-3">Solutions</h3>
                  <p className="text-primary leading-relaxed">
                    {project.solutions}
                  </p>
                </div>
              )}

              {project.results && (
                <div>
                        <h3 className="text-2xl font-bold text-primary mb-3">Results</h3>
                  <p className="text-primary leading-relaxed">
                    {project.results}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div>
                      <h3 className="text-xl font-bold text-primary mb-3">Project Details</h3>
                <div className="space-y-3">
                  <div>
                          <span className="text-primary/70 text-sm block mb-1">Category</span>
                    <p className="text-primary font-medium">{project.role}</p>
                  </div>
                        {project.tags[0] && (
                  <div>
                            <span className="text-primary/70 text-sm block mb-1">Project Type</span>
                    <p className="text-primary font-medium">{project.tags[0]}</p>
                  </div>
                        )}
                </div>
              </div>

              <div>
                      <h3 className="text-xl font-bold text-primary mb-3">Technologies & Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                            className="text-xs border-primary/30 text-primary"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                      <h3 className="text-xl font-bold text-primary mb-3">Get In Touch</h3>
                <p className="text-primary/70 text-sm mb-4">
                  Interested in similar work? Let's discuss your project.
                </p>
                <motion.a
                  href="#contact"
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-accent hover:bg-primary/80 transition-colors font-semibold"
                >
                  Start a Project
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
    </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

// Terms of Service Component
const TermsOfService = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-dark border border-primary/20 rounded-2xl"
      >
        <div className="sticky top-0 bg-dark border-b border-primary/20 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-accent">Terms of Service</h2>
          <button
            onClick={onClose}
            className="p-3 hover:bg-primary/10 rounded-full transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-accent" />
          </button>
        </div>
        
        <div className="p-6 space-y-6 text-accent">
            <div className="bg-primary/5 backdrop-blur-sm rounded-2xl p-6 border border-primary/20">
            <h3 className="text-xl font-bold text-accent mb-4">Welcome to Our Partnership</h3>
            <p className="text-accent/90 leading-relaxed">
              These terms of service outline the foundation of our working relationship. Built on trust, 
              transparency, and mutual respect, these guidelines ensure smooth collaboration and successful 
              project outcomes. By engaging with Bereket Fikre Design Studio, you agree to these terms.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-accent mb-4">Our Services</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-primary/5 backdrop-blur-sm rounded-xl p-4 border border-primary/20">
                <h4 className="font-semibold text-accent mb-2">Design Services</h4>
                <ul className="space-y-1 text-sm text-accent/80">
                  <li>• Brand identity and logo design</li>
                  <li>• Print and digital design</li>
                  <li>• UI/UX design services</li>
                  <li>• Marketing materials</li>
                  <li>• Corporate branding</li>
                </ul>
              </div>
              <div className="bg-primary/5 backdrop-blur-sm rounded-xl p-4 border border-primary/20">
                <h4 className="font-semibold text-accent mb-2">Consultation</h4>
                <ul className="space-y-1 text-sm text-accent/80">
                  <li>• Brand strategy consultation</li>
                  <li>• Design direction guidance</li>
                  <li>• Creative problem solving</li>
                  <li>• Project planning and scoping</li>
                  <li>• Ongoing design support</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-accent mb-4">Payment Terms</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-primary/5 backdrop-blur-sm rounded-xl p-4 border border-primary/20 text-center">
                <h4 className="font-semibold text-accent mb-2">Payment Schedule</h4>
                <p className="text-sm text-neutral-400">50% upfront, 50% upon completion. Milestone payments for larger projects.</p>
              </div>
              <div className="bg-primary/5 backdrop-blur-sm rounded-xl p-4 border border-primary/20 text-center">
                <h4 className="font-semibold text-accent mb-2">Payment Terms</h4>
                <p className="text-sm text-neutral-400">Net 15 days for invoices. Late fees may apply after 30 days.</p>
              </div>
              <div className="bg-primary/5 backdrop-blur-sm rounded-xl p-4 border border-primary/20 text-center">
                <h4 className="font-semibold text-accent mb-2">Refund Policy</h4>
                <p className="text-sm text-neutral-400">Refunds available within 48 hours of project start if work hasn't begun.</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-accent mb-4">Intellectual Property Rights</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-accent mb-2">Client Rights</h4>
                <ul className="space-y-1 text-sm text-accent/80">
                  <li>• Full ownership of final deliverables</li>
                  <li>• Right to use designs for intended purposes</li>
                  <li>• Commercial usage rights included</li>
                  <li>• Source files provided upon final payment</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-accent mb-2">Designer Rights</h4>
                <ul className="space-y-1 text-sm text-accent/80">
                  <li>• Right to showcase work in portfolio</li>
                  <li>• Credit attribution in case studies</li>
                  <li>• Retention of working files and concepts</li>
                  <li>• Protection of proprietary methods</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-primary/20">
            <p className="text-sm text-neutral-400 mb-2">
              Questions about these terms? Contact us at:
            </p>
            <div className="space-y-1 text-sm text-neutral-400">
              <p>📧 Email: bereketfikre2021@gmail.com</p>
              <p>📱 Phone: +251 923 988 838</p>
            </div>
            <p className="text-sm text-accent font-semibold mt-4">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Header component that can use context hooks
const HeaderWithContext = ({ 
  isAnalyticsOpen, setIsAnalyticsOpen,
  isAIOpen, setIsAIOpen,
  isPWAOpen, setIsPWAOpen,
  isPerformanceOpen, setIsPerformanceOpen,
  isPerformanceDashboardOpen, setIsPerformanceDashboardOpen,
  isSEOManagerOpen, setIsSEOManagerOpen,
  isSecurityDashboardOpen, setIsSecurityDashboardOpen,
  isAIContentGeneratorOpen, setIsAIContentGeneratorOpen,
  isSmartRecommendationsOpen, setIsSmartRecommendationsOpen,
  isCRMIntegrationOpen, setIsCRMIntegrationOpen,
  isEmailMarketingOpen, setIsEmailMarketingOpen
}) => {
  const { resolvedTheme } = useTheme();
  const { language, availableLanguages, t } = useLanguage();
  const [isOverLightBackground, setIsOverLightBackground] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);
  const [logoError, setLogoError] = useState(false);
  const [logoSrc, setLogoSrc] = useState(logoImg);
  
  // Handle install app functionality
  const handleInstallApp = async () => {
    try {
      // Check if we have a deferred prompt
      if (window.deferredPrompt) {
        // Show the install prompt
        await window.deferredPrompt.prompt();
        
        // Wait for user choice
        const choiceResult = await window.deferredPrompt.userChoice;
        
        if (choiceResult.outcome === 'accepted') {
          // Show success message
          alert('App installation started! Check your browser for the installation prompt.');
        } else {
          alert('Installation cancelled. You can try again anytime.');
        }
        
        // Clear the deferred prompt
        window.deferredPrompt = null;
      } else {
        // Check if app is already installed
        if (window.matchMedia('(display-mode: standalone)').matches || 
            window.navigator.standalone === true) {
          alert('App is already installed!');
          return;
        }
        
        // Try to trigger the install prompt programmatically
        if ('serviceWorker' in navigator) {
          // Check if service worker is already registered before registering again
          const existingRegistration = await navigator.serviceWorker.getRegistration();
          if (!existingRegistration && !navigator.serviceWorker.controller) {
            try {
              await navigator.serviceWorker.register('/sw.js');
            } catch (error) {
              console.error('Service Worker registration failed:', error);
            }
          }
          
          // Try to trigger install prompt
          const installEvent = new CustomEvent('beforeinstallprompt', {
            detail: {
              prompt: () => Promise.resolve({ outcome: 'accepted' })
            }
          });
          window.dispatchEvent(installEvent);
          
          // Show instructions if no prompt appears
          setTimeout(() => {
            if (!window.deferredPrompt) {
              showInstallInstructions();
            }
          }, 1000);
        } else {
          showInstallInstructions();
        }
      }
    } catch (error) {
      console.error('Install error:', error);
      alert('Installation failed. Please try using your browser\'s install option manually.');
    }
  };

  // Show install instructions in a better way
  const showInstallInstructions = () => {
        const userAgent = navigator.userAgent.toLowerCase();
        let instructions = '';
        
        if (userAgent.includes('chrome') || userAgent.includes('edge')) {
          instructions = 'Chrome/Edge: Look for the install icon (⊕) in the address bar and click it, or go to Menu > Install App';
        } else if (userAgent.includes('safari')) {
          instructions = 'Safari: Tap the Share button (□↗) and select "Add to Home Screen"';
        } else if (userAgent.includes('firefox')) {
          instructions = 'Firefox: Look for the install icon in the address bar or go to Menu > Install';
        } else {
          instructions = 'Look for an install option in your browser menu or address bar';
        }
        
    // Show install instructions
    alert(`To install this app:\n\n${instructions}\n\nThis will add the app to your home screen or desktop for quick access.`);
  };

  // Handle tool actions
  const handleToolAction = (action) => {
    switch (action) {
      case 'analytics':
        setIsAnalyticsOpen(true);
        break;
      case 'ai-insights':
        setIsAIOpen(true);
        break;
      case 'pwa-features':
        setIsPWAOpen(true);
        break;
      case 'performance':
        setIsPerformanceOpen(true);
        break;
      case 'performance-dashboard':
        setIsPerformanceDashboardOpen(true);
        break;
      case 'seo-manager':
        setIsSEOManagerOpen(true);
        break;
      case 'security-dashboard':
        setIsSecurityDashboardOpen(true);
        break;
      case 'ai-content-generator':
        setIsAIContentGeneratorOpen(true);
        break;
      case 'smart-recommendations':
        setIsSmartRecommendationsOpen(true);
        break;
      case 'crm-integration':
        setIsCRMIntegrationOpen(true);
        break;
      case 'email-marketing':
        setIsEmailMarketingOpen(true);
        break;
      case 'install-app':
        handleInstallApp();
        break;
      default:
        console.warn(`Unknown tool action: ${action}`);
        break;
    }
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };
  
  const NAV = [
    { label: t('nav.home'), href: "#home" },
    { label: t('nav.about'), href: "#about" },
    { label: t('nav.services'), href: "#what-i-do" },
    { 
      label: "Portfolio", 
      dropdown: [
    { label: t('nav.work'), href: "#work" },
        { label: t('nav.testimonials'), href: "#testimonials" },
        { label: "Trusted By", href: "#trusted-by" },
        { label: t('nav.caseStudies'), href: "#case-studies" }
      ]
    },
    { label: t('nav.blog'), href: "#blog" },
    { label: t('nav.contact'), href: "#contact" },
    { 
      label: "Tools", 
      dropdown: [
        { label: "Install App", action: "install-app" },
        { label: "Analytics Dashboard", action: "analytics" },
        { label: "AI Insights", action: "ai-insights" },
        { label: "PWA Features", action: "pwa-features" },
        { label: "Performance Monitor", action: "performance" },
        { label: "Performance Dashboard", action: "performance-dashboard" },
        { label: "SEO Manager", action: "seo-manager" },
        { label: "Security Dashboard", action: "security-dashboard" },
        { label: "AI Content Generator", action: "ai-content-generator" },
        { label: "Smart Recommendations", action: "smart-recommendations" },
        { label: "CRM Integration", action: "crm-integration" },
        { label: "Email Marketing", action: "email-marketing" }
      ]
    },
  ];

  useEffect(() => {
    let rafId = null;
    let ticking = false;
    
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      
      // Batch all layout reads in requestAnimationFrame to prevent forced reflow
      rafId = requestAnimationFrame(() => {
        const header = document.querySelector('header');
        if (!header) {
          ticking = false;
          return;
        }

        // Batch all layout reads together
        const headerRect = header.getBoundingClientRect();
        const headerBottom = headerRect.bottom;
        const headerTop = headerRect.top;
        
        // Check if header is overlapping with light background sections
        const lightSections = document.querySelectorAll('.bg-light, .bg-neutral-50, .bg-neutral-100');
        let isOverLight = false;
        
        // Batch all getBoundingClientRect calls together
        const sectionRects = Array.from(lightSections).map(section => ({
          element: section,
          rect: section.getBoundingClientRect()
        }));
        
        // Process cached rects (no layout reads here)
        for (const { rect } of sectionRects) {
          const sectionTop = rect.top;
          const sectionBottom = rect.bottom;
          
          // Check if header bottom is within the light section
          if (headerBottom > sectionTop && headerTop < sectionBottom) {
            isOverLight = true;
            break; // Early exit once found
          }
        }
        
        setIsOverLightBackground(isOverLight);
        ticking = false;
      });
    };

    // Initial check with RAF
    handleScroll();
    
    // Add scroll listener with passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 border-b shadow-lg transition-all duration-300 ${
      resolvedTheme === 'light' 
        ? 'bg-accent/95 border-accent/20' 
        : 'bg-primary/95 border-accent/20 backdrop-blur'
    }`}>
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="#home" className="flex items-center hover:opacity-80 transition-opacity">
          {!logoError ? (
            <img 
              src={logoSrc} 
              alt="Logo" 
              width="180"
              height="60"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain" 
              style={{ minHeight: '48px' }}
              loading="eager"
              fetchpriority="high"
              onError={() => {
                // Try alternative paths
                if (logoSrc.includes('/img/Logo.svg')) {
                  setLogoSrc('/SVG/Logo.svg');
                } else if (logoSrc.includes('/SVG/Logo.svg')) {
                  setLogoSrc('/img/Logo.svg');
                } else {
                  // Final fallback: show text logo
                  setLogoError(true);
                }
              }}
            />
          ) : (
            <div className="text-accent font-bold text-xl md:text-2xl">
              Bereket Fikre
            </div>
          )}
        </a>
        
        {/* Desktop Navigation */}
        <nav id="navigation" className="hidden md:flex items-center gap-6" role="navigation" aria-label="Main navigation">
          {NAV.map((item, index) => (
            <div key={index} className="relative">
              {item.dropdown ? (
                <div
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md px-2 py-1 ${
                      resolvedTheme === 'light'
                        ? 'text-primary hover:text-white focus:ring-white/20 focus:ring-offset-accent'
                        : 'text-accent hover:text-light focus:ring-accent/20 focus:ring-offset-primary'
                    }`}
                    aria-label={`${item.label} menu`}
                    aria-expanded={activeDropdown === index}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  
                  {activeDropdown === index && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`absolute top-full left-0 mt-2 w-48 rounded-xl shadow-lg overflow-hidden z-50 ${
                        resolvedTheme === 'light'
                          ? 'bg-accent/95 backdrop-blur-sm border border-accent/20'
                          : 'bg-primary/95 backdrop-blur-sm border border-accent/20'
                      }`}
                    >
                      {item.dropdown.map((dropdownItem, dropdownIndex) => (
                        dropdownItem.action ? (
                          <button
                            key={dropdownIndex}
                            onClick={() => handleToolAction(dropdownItem.action)}
                            className={`block w-full text-left px-4 py-3 text-sm transition-colors ${
                              resolvedTheme === 'light'
                                ? 'text-primary hover:text-primary hover:bg-accent/20'
                                : 'text-accent hover:text-light hover:bg-accent/10'
                            }`}
                            aria-label={dropdownItem.label}
                          >
                            {dropdownItem.label}
                          </button>
                        ) : (
                          <a
                            key={dropdownIndex}
                            href={dropdownItem.href}
                            className={`block px-4 py-3 text-base transition-colors min-h-[48px] ${
                              resolvedTheme === 'light'
                                ? 'text-primary hover:text-primary hover:bg-accent/20'
                                : 'text-accent hover:text-light hover:bg-accent/10'
                            }`}
                          >
                            {dropdownItem.label}
                          </a>
                        )
                      ))}
                    </motion.div>
                  )}
                </div>
              ) : (
                <a 
              href={item.href} 
              className={`block px-4 py-3 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md min-h-[48px] ${
                resolvedTheme === 'light'
                  ? 'text-primary hover:text-white hover:bg-accent/20 focus:ring-white/20 focus:ring-offset-accent'
                  : 'text-accent hover:text-light hover:bg-accent/10 focus:ring-accent/20 focus:ring-offset-primary'
              }`}
            >
              {item.label}
            </a>
              )}
            </div>
          ))}
          
        </nav>

        {/* Mobile Menu Button - Minimum 48px touch area */}
        <button
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
            if (isMobileMenuOpen) {
              setActiveMobileDropdown(null); // Close dropdowns when closing mobile menu
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsMobileMenuOpen(!isMobileMenuOpen);
              if (isMobileMenuOpen) {
                setActiveMobileDropdown(null);
              }
            }
          }}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
          className={`md:hidden p-3 rounded-md focus:outline-2 focus:outline-accent focus:outline-offset-2 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center ${
            resolvedTheme === 'light'
              ? 'text-primary hover:text-white focus:ring-white/20 focus:ring-offset-accent'
              : 'text-accent hover:text-light focus:ring-accent/20 focus:ring-offset-primary'
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <motion.div
          id="mobile-navigation"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`md:hidden backdrop-blur border-t border-accent/20 ${
            resolvedTheme === 'light' 
              ? 'bg-accent/95' 
              : 'bg-primary/95'
          }`}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <nav className="px-4 py-4 space-y-2">
            {NAV.map((item, index) => (
              <div key={index}>
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => setActiveMobileDropdown(activeMobileDropdown === index ? null : index)}
                      className={`flex items-center justify-between w-full px-4 py-3 text-base font-medium rounded-md transition-colors min-h-[48px] ${
                        resolvedTheme === 'light'
                          ? 'text-primary hover:bg-white/20'
                          : 'text-accent hover:bg-accent/10'
                      }`}
                      aria-label={`${item.label} menu`}
                      aria-expanded={activeMobileDropdown === index}
                      aria-haspopup="true"
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${activeMobileDropdown === index ? 'rotate-180' : ''}`} />
                    </button>
                    {activeMobileDropdown === index && (
                    <div className="ml-4 space-y-2">
                      {item.dropdown.map((dropdownItem, dropdownIndex) => (
                        dropdownItem.action ? (
                          <button
                            key={dropdownIndex}
                            onClick={() => {
                              handleToolAction(dropdownItem.action);
                              setIsMobileMenuOpen(false);
                              setActiveMobileDropdown(null);
                            }}
                            className={`block w-full text-left px-4 py-3 text-base font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 min-h-[48px] ${
                              resolvedTheme === 'light'
                                ? 'text-primary hover:text-white hover:bg-accent focus:ring-white/20 focus:ring-offset-white'
                                : 'text-accent/80 hover:text-light hover:bg-accent/10 focus:ring-accent/20 focus:ring-offset-primary'
                            }`}
                            aria-label={dropdownItem.label}
                          >
                            {dropdownItem.label}
                          </button>
                        ) : (
                          <a
                            key={dropdownIndex}
                            href={dropdownItem.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block px-4 py-3 text-base font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 min-h-[48px] ${
                              resolvedTheme === 'light'
                                ? 'text-primary hover:text-white hover:bg-accent focus:ring-white/20 focus:ring-offset-white'
                                : 'text-accent/80 hover:text-light hover:bg-accent/10 focus:ring-accent/20 focus:ring-offset-primary'
                            }`}
                          >
                            {dropdownItem.label}
                          </a>
                        )
                      ))}
                    </div>
                    )}
                  </div>
                ) : (
                  <a
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  resolvedTheme === 'light'
                    ? 'text-primary hover:text-white hover:bg-accent focus:ring-white/20 focus:ring-offset-white'
                    : 'text-accent hover:text-light hover:bg-accent/10 focus:ring-accent/20 focus:ring-offset-primary'
                }`}
              >
                {item.label}
              </a>
                )}
              </div>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
};

const Hero = () => {
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  
  return (
    <div id="home" className="relative h-screen overflow-hidden bg-primary">
      {/* Hero Background Image with reduced opacity - Hidden on mobile */}
      <div 
        className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/img/hero%20image.webp)',
          opacity: 0.3,
          zIndex: 0
        }}
      ></div>

      {/* Mobile: Grid Pattern Background */}
      <div 
        className="md:hidden absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: `
            linear-gradient(${resolvedTheme === 'light' ? 'rgba(0,0,0,0.03)' : 'rgba(138,234,146,0.08)'} 1px, transparent 1px),
            linear-gradient(90deg, ${resolvedTheme === 'light' ? 'rgba(0,0,0,0.03)' : 'rgba(138,234,146,0.08)'} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.6
        }}
      ></div>

      {/* Floating Background Elements - Hidden on mobile */}
      <div className="absolute inset-0 pointer-events-none z-[1] hidden md:block">
        {/* Static decorative elements - Performance optimized (removed infinite animations) */}
        <div
          className="absolute w-32 h-32 border-2 border-accent/20 rounded-full"
          style={{ top: '10%', left: '5%' }}
        />
        
        <div
          className="absolute w-24 h-24 bg-accent/15 rounded-full blur-sm"
          style={{ top: '20%', right: '10%' }}
        />

        {/* Static squares */}
        <div
          className="absolute w-16 h-16 border border-accent/30 rotate-45"
          style={{ bottom: '20%', left: '8%' }}
        />

        <div
          className="absolute w-12 h-12 bg-accent/25 rounded-lg"
          style={{ bottom: '30%', right: '15%' }}
        />

        {/* Static particles */}
        <div
          className="absolute w-3 h-3 bg-accent/40 rounded-full"
          style={{ top: '15%', left: '20%' }}
        />

        <div
          className="absolute w-2 h-2 bg-accent/50 rounded-full"
          style={{ top: '60%', left: '15%' }}
        />

        <div
          className="absolute w-4 h-4 bg-accent/35 rounded-full"
          style={{ top: '40%', right: '20%' }}
        />

        {/* Static gradient orbs */}
        <div
          className="absolute w-64 h-64 bg-accent/8 rounded-full blur-3xl"
          style={{ top: '-10%', left: '-10%' }}
        />

        <div
          className="absolute w-48 h-48 bg-accent/12 rounded-full blur-2xl"
          style={{ bottom: '-5%', right: '-5%' }}
        />

        {/* Static lines */}
        <div
          className="absolute w-1 h-32 bg-gradient-to-b from-transparent via-accent/30 to-transparent"
          style={{ top: '25%', left: '12%' }}
        />

        <div
          className="absolute w-1 h-24 bg-gradient-to-b from-transparent via-accent/35 to-transparent"
          style={{ bottom: '35%', right: '25%' }}
          />
      </div>

      {/* Content Overlay - Optimized for LCP */}
      <div className="relative z-[2] h-full flex flex-col items-center justify-center text-center px-4 md:px-6">
        {/* Mobile: Fresh New Hero Design */}
        <div className="md:hidden w-full px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center min-h-[70vh] space-y-6"
          >
            {/* Greeting - Minimalist */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs text-accent/70 font-medium uppercase tracking-wider"
            >
              {t('hero.greeting')}
            </motion.div>

            {/* Name - Bold and Prominent */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-5xl font-bold leading-none tracking-tight ${
                resolvedTheme === 'light'
                  ? 'text-black'
                  : 'text-light'
              }`}
            >
              {t('hero.name')}
            </motion.h1>
            
            {/* Title - Elegant and Clean */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm text-accent/80 font-normal leading-relaxed max-w-xs text-center"
            >
              {t('hero.title')}
            </motion.p>

            {/* CTA Button - Full Width Modern */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full max-w-xs pt-2"
            >
              <motion.a
                href="#work"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block w-full"
              >
                <Button
                  className="w-full px-6 py-4 rounded-2xl bg-accent text-primary hover:bg-accent/90 font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {t('hero.cta1')}
                </Button>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Desktop: Full Hero */}
      <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:block max-w-4xl mx-auto space-y-8"
          style={{ 
            willChange: 'opacity, transform',
            contentVisibility: 'auto'
          }}
        >
          {/* Welcome Badge - Reduced delay for faster LCP */}
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 backdrop-blur-sm border border-secondary/30"
          >
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <span className="text-accent text-sm font-medium">{t('hero.greeting')} {t('hero.name')}</span>
        </motion.div>

          {/* Main Heading - LCP Element - Optimized for fast rendering and no layout shift */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight px-4 ${
              resolvedTheme === 'light'
                ? 'text-black'
                : 'text-light'
            }`}
            style={{ 
              willChange: 'opacity, transform',
              contentVisibility: 'auto',
              minHeight: '1.2em',
              lineHeight: '1.2'
            }}
          >
{t('hero.name')}
          </motion.h1>
          
          {/* Professional Title - Reduced delay for faster LCP */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl md:text-2xl text-accent font-semibold max-w-2xl mx-auto px-4"
            style={{ minHeight: '1.5em', lineHeight: '1.5' }}
          >
{t('hero.title')}
          </motion.p>

          {/* Location - Reduced delay */}
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base sm:text-lg text-neutral-300 flex items-center justify-center gap-2 px-4"
          >
            <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
            {PROFILE.location}
          </motion.div>

          {/* CTA Buttons - Reduced delay */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 sm:gap-4 justify-center items-center pt-4"
          >
            <motion.a
              href="#work"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="px-8 py-4 rounded-2xl bg-accent text-primary hover:bg-accent-600 font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:ring-offset-2 focus:ring-offset-primary-dark"
              >
{t('hero.cta1')}
              </Button>
            </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-4 rounded-2xl border-2 border-accent text-accent hover:bg-accent hover:text-primary font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:ring-offset-2 focus:ring-offset-primary-dark"
              >
{t('hero.cta2')}
            </Button>
          </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator - Hidden on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-accent/50 rounded-full flex justify-center"
          >
              <motion.div
                animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-accent/80 rounded-full mt-2"
              />
        </motion.div>
      </motion.div>
    </div>
    </div>
  );
};

const CountUpNumber = ({ target }) => {
  const [count, setCount] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('count-up-trigger');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [isVisible]);

  React.useEffect(() => {
    if (isVisible) {
      const duration = 800; // 0.8 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isVisible, target]);

  return (
    <div id="count-up-trigger" className="text-4xl font-bold text-accent">
      {count}+
    </div>
  );
};

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
            {/* Main Description */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-light">Design Philosophy</h3>
              <div className="space-y-4 text-accent/80 leading-relaxed">
                <p>
                  I believe great design is more than just aesthetics—it's about creating meaningful connections between brands and their audiences. Every project I work on is approached with strategic thinking and creative excellence.
                </p>
                <p className="hidden md:block">
                  My process combines deep understanding of your business goals with innovative design solutions. Whether it's a complete brand identity, digital marketing materials, or print design, I ensure every element serves a purpose and tells your story effectively.
                </p>
                <p className="hidden md:block">
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
                <div className="text-4xl font-bold text-accent">5+</div>
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
                  className="w-full px-8 py-4 rounded-2xl bg-accent text-primary hover:bg-accent/90 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:ring-offset-2 focus:ring-offset-primary flex items-center justify-center gap-2"
                >
                  Let's Work Together
                  <ArrowRight className="w-4 h-4" />
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

// What I Do Section - Extracted from About
const WhatIDo = React.memo(() => {
  const { resolvedTheme } = useTheme();
  const [expandedService, setExpandedService] = useState(null);
  
  return (
    <Section id="what-i-do" className="relative py-12 bg-primary overflow-hidden">
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
              }`}>Services</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold text-light"
            >
              What I Do
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-accent/80 max-w-3xl mx-auto"
            >
              Comprehensive design solutions tailored to your unique needs
            </motion.p>
                </div>
                
          {/* Services Grid */}
          <div className="space-y-6">
            {/* Mobile: Show SERVICES array with expandable cards */}
              <div className="md:hidden space-y-3">
                {SERVICES.map((service, index) => {
                  const IconComponent = service.icon;
                  const isExpanded = expandedService === index;
                  return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="space-y-0"
                  >
                      <button
                        onClick={() => setExpandedService(isExpanded ? null : index)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setExpandedService(isExpanded ? null : index);
                        }
                      }}
                      aria-expanded={isExpanded}
                      aria-controls={`service-description-${index}`}
                      aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${service.title} description`}
                      className={`w-full flex items-center justify-between gap-3 p-4 rounded-xl transition-all duration-300 focus:outline-2 focus:outline-accent focus:outline-offset-2 ${
                          resolvedTheme === 'light'
                            ? 'bg-accent border border-accent/30 hover:bg-accent/90'
                            : 'bg-accent/10 hover:bg-accent/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            resolvedTheme === 'light'
                              ? 'bg-primary'
                              : 'bg-primary'
                          }`}>
                            <IconComponent className={`w-4 h-4 ${
                              resolvedTheme === 'light'
                                ? 'text-primary'
                                : 'text-accent'
                            }`} />
                          </div>
                          <span className={`font-medium text-left ${
                            resolvedTheme === 'light'
                              ? 'text-primary'
                              : 'text-accent'
                          }`}>{service.title}</span>
                        </div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className={`w-5 h-5 ${
                            resolvedTheme === 'light'
                              ? 'text-primary'
                              : 'text-accent'
                          }`} />
                        </motion.div>
                      </button>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`overflow-hidden rounded-b-xl p-4 ${
                            resolvedTheme === 'light'
                              ? 'bg-accent/50 border border-t-0 border-accent/30'
                              : 'bg-accent/5'
                          }`}
                        >
                          <p className={`text-sm leading-relaxed ${
                            resolvedTheme === 'light'
                              ? 'text-primary/90'
                              : 'text-accent/80'
                          }`}>
                            {service.desc}
                          </p>
                        </motion.div>
                      )}
                  </motion.div>
                  );
                })}
              </div>
            
            {/* Desktop: Show SERVICES array as grid with expandable descriptions */}
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICES.map((service, index) => {
                const IconComponent = service.icon;
                const isExpanded = expandedService === index;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="space-y-0"
                  >
                    <button
                      onClick={() => setExpandedService(isExpanded ? null : index)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setExpandedService(isExpanded ? null : index);
                        }
                      }}
                      aria-expanded={isExpanded}
                      aria-controls={`service-description-desktop-${index}`}
                      aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${service.title} description`}
                      id={`service-button-desktop-${index}`}
                      className={`w-full flex items-center justify-between gap-3 p-4 rounded-xl transition-all duration-300 focus:outline-2 focus:outline-accent focus:outline-offset-2 ${
                  resolvedTheme === 'light'
                          ? 'bg-accent border border-accent/30 hover:bg-accent/90 hover:shadow-lg'
                          : 'bg-accent/10 hover:bg-accent/20 hover:shadow-lg'
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    resolvedTheme === 'light'
                      ? 'bg-primary'
                      : 'bg-primary'
                  }`}>
                          <IconComponent className={`w-5 h-5 ${
                      resolvedTheme === 'light'
                        ? 'text-primary'
                        : 'text-accent'
                          }`} aria-hidden="true" />
                  </div>
                        <span className={`font-medium text-left ${
                    resolvedTheme === 'light'
                      ? 'text-primary'
                      : 'text-accent'
                        }`}>{service.title}</span>
                  </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                        aria-hidden="true"
                      >
                        <ChevronDown className={`w-5 h-5 ${
                      resolvedTheme === 'light'
                        ? 'text-primary'
                        : 'text-accent'
                    }`} />
          </motion.div>
                    </button>
                    {isExpanded && (
      <motion.div
                        id={`service-description-desktop-${index}`}
                        role="region"
                        aria-labelledby={`service-button-desktop-${index}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`overflow-hidden rounded-b-xl p-4 ${
                resolvedTheme === 'light'
                            ? 'bg-accent/50 border border-t-0 border-accent/30'
                            : 'bg-accent/5'
                        }`}
                      >
                        <p className={`text-sm leading-relaxed ${
                      resolvedTheme === 'light'
                            ? 'text-primary/90'
                            : 'text-accent/80'
                        }`}>
                          {service.desc}
                        </p>
            </motion.div>
                    )}
                  </motion.div>
                );
              })}
        </div>
          </div>
      </motion.div>
    </div>
  </Section>
);
});

WhatIDo.displayName = 'WhatIDo';

const Work = React.memo(() => {
  const { resolvedTheme } = useTheme();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  // Use services as filter categories
  const filterCategories = React.useMemo(() => {
    return [
      { title: 'All', icon: null },
      ...SERVICES.map(service => ({ title: service.title, icon: service.icon }))
    ];
  }, []);

  // Filter projects based on active service filter
  const filteredProjects = React.useMemo(() => {
    if (activeFilter === 'All') {
      return PROJECTS;
    }
    
    // Find the service that matches the active filter
    const selectedService = SERVICES.find(service => service.title === activeFilter);
    if (!selectedService) return PROJECTS;
    
    // Match projects to service based on tags
    return PROJECTS.filter(project => {
      // Check if any project tag matches any service tag (case-insensitive)
      return project.tags.some(projectTag => 
        selectedService.tags.some(serviceTag => 
          projectTag.toLowerCase().includes(serviceTag.toLowerCase()) ||
          serviceTag.toLowerCase().includes(projectTag.toLowerCase())
        )
      ) || 
      // Also check project role/title for service keywords
      project.role.toLowerCase().includes(selectedService.title.toLowerCase().split(' ')[0].toLowerCase()) ||
      project.title.toLowerCase().includes(selectedService.title.toLowerCase().split(' ')[0].toLowerCase());
    });
  }, [activeFilter]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
        setSelectedProject(null);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isModalOpen]);

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
  <Section id="work" className="relative py-12 bg-primary overflow-hidden">
    {/* Extraordinary Background Elements */}
    <div className="absolute inset-0 pointer-events-none">
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `linear-gradient(#8AEA92 1px, transparent 1px), linear-gradient(90deg, #8AEA92 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
      }}>
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 0%', '50px 50px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Dynamic Gradient Orbs - Lime green and black only */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl"
        style={{ 
          top: '-10%', 
          right: '-5%',
          background: 'linear-gradient(to right, rgba(138,234,146,0.2), rgba(138,234,146,0.15), rgba(138,234,146,0.2))',
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.5, 0.2],
          rotate: [0, 180, 360],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl"
        style={{ 
          bottom: '-10%', 
          left: '-5%',
          background: 'linear-gradient(to left, rgba(138,234,146,0.2), rgba(138,234,146,0.15), rgba(138,234,146,0.2))',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.6, 0.3],
          rotate: [360, 180, 0],
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating Particles - Reduced from 50 to 20 for better performance */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: '#8AEA92',
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1.5, 0],
            y: [0, -100, -200],
            x: [0, (Math.random() - 0.5) * 100],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "easeOut"
          }}
        />
      ))}
    </div>

    <div className="mx-auto max-w-7xl px-4 relative z-10">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="space-y-20"
      >
        {/* Extraordinary Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center space-y-6 relative"
        >
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150, damping: 12 }}
            className="inline-block"
          >
            <motion.div
              className="relative px-8 py-4 rounded-full overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to right, #8AEA92, #8AEA92, #8AEA92)',
                }}
              />
              <div className="relative flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: '#000000' }}
                />
                <span className="font-bold text-lg tracking-wide" style={{ color: '#000000' }}>PORTFOLIO</span>
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: '#000000' }}
                />
              </div>
            </motion.div>
          </motion.div>
          
          {/* Main Title with Gradient Text */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold relative"
          >
            <span className={`block bg-clip-text text-transparent bg-gradient-to-r ${
              resolvedTheme === 'light'
                ? 'from-primary via-accent to-primary'
                : 'from-light via-accent to-light'
            }`}>
              Featured Work
            </span>
            {/* Decorative Underline */}
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-accent to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
            />
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className={`text-xl md:text-2xl max-w-3xl mx-auto ${
              resolvedTheme === 'light'
                ? 'text-primary/90'
                : 'text-light/90'
            }`}
          >
            A curated collection of transformative design projects that showcase innovation, creativity, and strategic thinking
          </motion.p>
        </motion.div>

        {/* Filter Tabs - Extraordinary Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="sticky top-16 md:top-20 z-40 bg-primary/95 backdrop-blur-sm border-b border-accent/10 mb-8 -mx-4 px-4 md:mx-0 md:px-0 md:static md:bg-transparent md:border-0"
          role="tablist"
          aria-label="Portfolio filter categories"
        >
          {/* Live region for filter changes */}
          <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
            {activeFilter && `Filtered by ${activeFilter}`}
          </div>
          <div className="relative">
            {/* Scroll Fade Indicators - Mobile Only */}
            <div className="md:hidden absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-primary to-transparent pointer-events-none z-10"></div>
            <div className="md:hidden absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-primary to-transparent pointer-events-none z-10"></div>
            
            <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth" style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}>
              <div className="relative flex gap-2 md:gap-4 md:justify-center md:flex-wrap min-w-max md:min-w-0 pb-1 md:pb-0 py-2 md:py-4">
                {filterCategories.map((category, index) => {
                  const IconComponent = category.icon;
                  const isActive = activeFilter === category.title;
                  
                  return (
                    <motion.button
                      key={category.title}
                      onClick={() => setActiveFilter(category.title)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveFilter(category.title);
                        }
                      }}
                      whileHover={{ 
                        scale: 1.08,
                        y: -2,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.96 }}
                      className={`relative px-4 py-2.5 md:px-6 md:py-3 rounded-2xl text-xs md:text-base font-semibold whitespace-nowrap flex-shrink-0 flex items-center gap-2 md:gap-3 transition-all duration-300 overflow-hidden group focus:outline-2 focus:outline-accent focus:outline-offset-2 ${
                        isActive
                          ? 'text-primary shadow-2xl'
                          : 'text-accent/70 hover:text-accent border border-accent/20 hover:border-accent/40'
                      }`}
                      aria-label={`Filter by ${category.title}`}
                      aria-pressed={isActive}
                      role="tab"
                      aria-selected={isActive}
                    >
                      {/* Animated Background for Active Tab */}
                      {isActive && (
                        <>
                          <motion.div
                            layoutId="activeFilter"
                            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent via-accent to-accent-600"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            style={{ zIndex: -1 }}
                          />
                          {/* Static Glow Effect - Performance optimized */}
                          <div
                            className="absolute inset-0 rounded-2xl bg-accent/40 blur-md"
                            style={{ zIndex: -2 }}
                          />
                        </>
                      )}
                      
                      {/* Hover Background for Inactive Tabs */}
                      {!isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl bg-accent/5 group-hover:bg-accent/10"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                          style={{ zIndex: -1 }}
                        />
                      )}
                      
                      {/* Icon with Animation */}
                      {IconComponent && (
                        <motion.div
                          animate={isActive ? { 
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.2, 1]
                          } : {}}
                          transition={{ duration: 0.5 }}
                        >
                          <IconComponent className={`w-4 h-4 md:w-5 md:h-5 flex-shrink-0 relative z-10 ${
                            isActive ? 'text-primary' : 'text-accent group-hover:text-accent'
                          }`} />
                        </motion.div>
                      )}
                      
                      {/* Text with Gradient for Active */}
                      <span className={`relative z-10 text-xs md:text-base font-semibold ${
                        isActive 
                          ? 'text-primary drop-shadow-lg' 
                          : 'text-accent/70 group-hover:text-accent'
                      }`}>
                        {category.title}
                      </span>
                      
                      {/* Active Indicator Dot */}
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full shadow-lg shadow-accent/50"
                          style={{ zIndex: 10 }}
                        />
                      )}
                      
                      {/* Ripple Effect on Click */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl bg-white/20"
                          initial={{ scale: 0, opacity: 1 }}
                          animate={{ scale: 2, opacity: 0 }}
                          transition={{ duration: 0.6 }}
                          style={{ zIndex: 1 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Extraordinary Portfolio Grid - Masonry Style with 3D Effects */}
        {filteredProjects.length > 0 ? (
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {filteredProjects.map((project, index) => {
            const isLarge = index % 5 === 0;
            return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                delay: index * 0.15, 
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.3 }
              }}
              className={`group relative ${isLarge ? 'md:col-span-2 lg:col-span-1' : ''}`}
              style={{ perspective: '1000px' }}
            >
              {/* Static Glow Effect - Performance optimized */}
              <div
                className="absolute -inset-1 rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10"
                style={{
                  background: 'rgba(138,234,146,0.2)',
                }}
              />
              
              {/* Glassmorphism Card - Lime green and black only */}
              <Card className="relative overflow-hidden h-full flex flex-col border-2 border-accent/20 group-hover:border-accent/60 transition-all duration-500 backdrop-blur-xl"
                style={{
                  background: resolvedTheme === 'light' 
                    ? 'linear-gradient(135deg, rgba(138,234,146,0.1) 0%, rgba(138,234,146,0.05) 100%)'
                    : 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 100%)',
                  boxShadow: '0 8px 32px rgba(138,234,146,0.1), 0 0 0 1px rgba(138,234,146,0.1)',
                }}
              >
                {/* Animated Shimmer - Using brand colors */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  style={{
                    background: 'linear-gradient(to right, transparent, rgba(138,234,146,0.2), transparent)',
                  }}
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 0.3
                  }}
                />

                {/* Image Container with 3D Effect */}
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20" style={{ minHeight: '200px' }}>
                  <img
                    src={project.thumb}
                    alt={`${project.title} project thumbnail - ${project.role}`}
                    width="1280"
                    height="720"
                    className="w-full h-full object-cover"
                    style={{ aspectRatio: '16 / 9', minHeight: '200px' }}
                    loading="lazy"
                  />
                  
                  {/* Dynamic Gradient Overlay - Lime green only */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(to top, rgba(138,234,146,0.6), rgba(138,234,146,0.2), transparent)',
                    }}
                    animate={{
                      opacity: [0.6, 0.8, 0.6],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Floating Icons - Reduced from 12 to 6 for better performance */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                          left: `${20 + (i * 15)}%`,
                          top: `${25 + (i % 3) * 25}%`,
                          backgroundColor: '#8AEA92',
                        }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1.5, 0],
                          y: [0, -30, -60],
                          x: [0, (Math.random() - 0.5) * 40],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.25,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* View Button - Brand colors only */}
                  <motion.div
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm border-2 border-accent/40" style={{ backgroundColor: '#8AEA92' }}>
                      <ExternalLink className="w-6 h-6" style={{ color: '#000000' }} />
                    </div>
                  </motion.div>

                  {/* Project Number Badge - Brand colors */}
                  <motion.div
                    className="absolute top-4 left-4 opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0, rotate: -180 }}
                    whileHover={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <div className="px-4 py-2 backdrop-blur-sm rounded-full border" style={{ backgroundColor: 'rgba(0,0,0,0.9)', borderColor: '#8AEA92' }}>
                      <span className="font-bold text-sm" style={{ color: '#8AEA92' }}>#{String(index + 1).padStart(2, '0')}</span>
                    </div>
                  </motion.div>
                </div>
                
                {/* Content with Enhanced Typography */}
                <CardContent className="p-8 relative flex-1 flex flex-col space-y-5">
                  <div className="space-y-3 flex-1">
                    <div>
                      <motion.h3
                        className={`text-2xl font-bold mb-2 ${
                          resolvedTheme === 'light'
                            ? 'text-primary group-hover:text-accent'
                            : 'text-light group-hover:text-accent'
                        } transition-colors duration-300`}
                        whileHover={{ x: 5 }}
                      >
                        {project.title}
                      </motion.h3>
                      <p className={`text-sm font-medium ${
                        resolvedTheme === 'light'
                          ? 'text-primary/70'
                          : 'text-light/70'
                      }`}>{project.role}</p>
                    </div>
                    
                    {/* Enhanced Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag, tagIndex) => (
                        <motion.div
                          key={tag}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: tagIndex * 0.1, type: "spring" }}
                          whileHover={{ scale: 1.15, y: -3, rotate: 2 }}
                        >
                          <Badge
                            variant="outline"
                            className="text-xs px-3 py-1.5 border-accent/50 bg-accent/10 hover:bg-accent/20 hover:border-accent transition-all duration-300 cursor-pointer backdrop-blur-sm"
                          >
                            {tag}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced CTA Button */}
                  <motion.button
                    onClick={() => {
                      openProjectModal(project);
                      if (window.gtag) {
                        window.gtag('event', 'view_item', {
                          event_category: 'portfolio',
                          event_label: project.title
                        });
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openProjectModal(project);
                      }
                    }}
                    className="group/btn relative mt-6 w-full inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-semibold overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl text-center focus:outline-2 focus:outline-accent focus:outline-offset-2"
                    style={{
                      backgroundColor: '#8AEA92',
                      color: '#000000',
                    }}
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Explore ${project.title} project - ${project.role}`}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'rgba(138,234,146,0.2)',
                      }}
                    />
                    <span className="relative z-10 text-center" style={{ color: '#000000' }}>Explore Project</span>
                    <div className="relative z-10">
                      <Eye className="w-5 h-5" style={{ color: '#000000' }} />
                    </div>
                  </motion.button>
                </CardContent>
              </Card>
            </motion.div>
            );
          })}
        </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center py-16"
          >
            <p className={`text-xl ${resolvedTheme === 'light' ? 'text-primary/70' : 'text-light/70'}`}>
              No projects found in this category.
            </p>
          </motion.div>
        )}

        {/* Extraordinary CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center pt-12"
        >
          <motion.a
            href="https://heyzine.com/flip-book/2e51bd7d15.html"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl overflow-hidden"
            style={{
              backgroundColor: '#8AEA92',
              boxShadow: '0 4px 20px rgba(138,234,146,0.3), 0 0 0 1px rgba(138,234,146,0.2)',
            }}
          >
            {/* Static Background - Performance optimized */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'rgba(138,234,146,0.2)',
              }}
            />
            
            <span
              className="relative z-10 font-semibold text-sm tracking-wide"
              style={{ color: '#000000' }}
            >
              View Complete Portfolio
            </span>
            <div className="relative z-10">
              <ArrowRight className="w-4 h-4" style={{ color: '#000000' }} />
            </div>
          </motion.a>
        </motion.div>
      </motion.div>
    </div>

    {/* Project Modal */}
    <ProjectModal 
      project={selectedProject} 
      isOpen={isModalOpen} 
      onClose={closeProjectModal} 
    />
  </Section>
);
});

Work.displayName = 'Work';

const Testimonials = React.memo(() => {
  const { resolvedTheme } = useTheme();
  const [currentPage, setCurrentPage] = React.useState(0);
  const [activeTab, setActiveTab] = React.useState('written');
  const [selectedVideo, setSelectedVideo] = React.useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = React.useState(false);

  // Handle ESC key to close video modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isVideoModalOpen) {
        setIsVideoModalOpen(false);
        setSelectedVideo(null);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isVideoModalOpen]);
  
  // Mobile: 1 per page (6 pages), Desktop: 3 per page (2 pages)
  const [isMobileView, setIsMobileView] = useState(false);
  const carouselRef = React.useRef(null);
  const isScrollingRef = React.useRef(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Sync scroll position with current page on mobile
  useEffect(() => {
    if (isMobileView && carouselRef.current) {
      isScrollingRef.current = true;
      const scrollContainer = carouselRef.current;
      const scrollContainerWidth = scrollContainer.clientWidth;
      const itemWidth = scrollContainerWidth;
      const targetScroll = currentPage * itemWidth;
      
      scrollContainer.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
      
      // Reset flag after scroll completes
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 600);
    }
  }, [currentPage, isMobileView]);
  
  // Handle scroll to update current page on mobile
  useEffect(() => {
    if (!isMobileView || !carouselRef.current) return;
    
    const scrollContainer = carouselRef.current;
    let scrollTimeout;
    
    const handleScroll = () => {
      // Skip if we're programmatically scrolling
      if (isScrollingRef.current) return;
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollLeft = scrollContainer.scrollLeft;
        const containerWidth = scrollContainer.clientWidth;
        const newPage = Math.round(scrollLeft / containerWidth);
        
        if (newPage !== currentPage && newPage >= 0 && newPage < TESTIMONIALS.length) {
          setCurrentPage(newPage);
        }
      }, 150);
    };
    
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isMobileView, currentPage]);
  
  const testimonialsPerPage = isMobileView ? 1 : 3;
  const totalPages = isMobileView ? TESTIMONIALS.length : Math.ceil(TESTIMONIALS.length / testimonialsPerPage);
  
  const currentTestimonials = isMobileView 
    ? [TESTIMONIALS[currentPage]]
    : TESTIMONIALS.slice(
    currentPage * testimonialsPerPage,
    (currentPage + 1) * testimonialsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const openVideoModal = (video) => {
    setSelectedVideo(video);
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    setIsVideoModalOpen(false);
  };

  // Auto-play functionality for testimonials
  const [isAutoPlayPaused, setIsAutoPlayPaused] = React.useState(false);
  const autoPlayIntervalRef = React.useRef(null);

  // Auto-play effect - cycles through pages every 5 seconds
  useEffect(() => {
    // Only auto-play when written testimonials tab is active
    if (activeTab !== 'written' || isAutoPlayPaused) {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
        autoPlayIntervalRef.current = null;
      }
      return;
    }

    // Set up interval to auto-advance pages
    autoPlayIntervalRef.current = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000); // Change page every 5 seconds

    // Cleanup on unmount or when dependencies change
    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
        autoPlayIntervalRef.current = null;
      }
    };
  }, [activeTab, isAutoPlayPaused, totalPages]);

  // Pause auto-play when user interacts with navigation
  const handleUserInteraction = () => {
    setIsAutoPlayPaused(true);
    // Resume auto-play after 10 seconds of no interaction
    setTimeout(() => {
      setIsAutoPlayPaused(false);
    }, 10000);
  };

  // Update nextPage and prevPage to pause auto-play on user interaction
  const handleNextPage = () => {
    handleUserInteraction();
    nextPage();
  };

  const handlePrevPage = () => {
    handleUserInteraction();
    prevPage();
  };

  const handlePageClick = (pageIndex) => {
    handleUserInteraction();
    setCurrentPage(pageIndex);
  };

  return (
  <Section id="testimonials" className="relative py-12 bg-primary overflow-hidden">
    {/* Background Elements */}
    <div className="absolute inset-0">
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-2xl"></div>
    </div>

    <div className="mx-auto max-w-6xl px-4 relative z-10">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="space-y-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent/40 text-primary text-lg font-semibold shadow-2xl border-2 border-accent/60">
            <div className="w-4 h-4 bg-primary rounded-full shadow-lg"></div>
            Testimonials
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-accent">What Clients Say</h2>
          <p className="text-xl text-light max-w-2xl mx-auto">
            Hear from the amazing people I've had the pleasure to work with
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2 p-2 bg-primary/20 rounded-2xl border border-accent/20 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab('written')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'written'
                  ? 'bg-accent text-primary shadow-lg'
                  : 'text-accent hover:bg-accent/10'
              }`}
            >
              <Quote className="w-4 h-4 inline mr-2" />
              Written Testimonials
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'video'
                  ? 'bg-accent text-primary shadow-lg'
                  : 'text-accent hover:bg-accent/10'
              }`}
            >
              <Play className="w-4 h-4 inline mr-2" />
              Video Testimonials
            </button>
          </div>
        </motion.div>


        {/* Written Testimonials */}
        {activeTab === 'written' && (
        <div className="relative">
          {/* Mobile: Horizontal scrollable carousel */}
          <div 
            ref={carouselRef}
            className="md:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide" 
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              scrollSnapType: 'x mandatory'
            }}
          >
            <div className="flex" style={{ width: `calc(100% * ${TESTIMONIALS.length})` }}>
              {TESTIMONIALS.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex-shrink-0 snap-start px-4"
                  style={{ width: `calc(100% / ${TESTIMONIALS.length})`, scrollSnapAlign: 'start' }}
                >
                  <Card className="border-accent/20 hover:border-accent/40 transition-all duration-300 bg-primary/90 backdrop-blur-sm">
                    <CardContent className="p-5">
                      <div className="space-y-4">
                        {/* Quote Icon */}
                        <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                          </svg>
                        </div>
                        
                        <blockquote className="text-light text-base leading-relaxed">
                          "{testimonial.quote}"
                        </blockquote>
                        
                        <div className="pt-3 border-t border-accent/20">
                          <div className="flex items-center gap-3">
                            {/* Avatar Image */}
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-accent flex-shrink-0">
                              <img 
                                src={testimonial.avatar} 
                                alt={`${testimonial.author} profile picture`}
                                width="40"
                                height="40"
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                            
                            {/* Author Info */}
                            <div>
                              <p className="font-semibold text-light text-base">{testimonial.author}</p>
                              <p className="text-xs text-accent/80">{testimonial.role}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Desktop: Grid layout */}
          <div className="hidden md:grid grid-cols-3 gap-6 md:gap-8">
          {currentTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full border-accent/20 hover:border-accent/40 transition-all duration-300 group-hover:shadow-xl bg-primary/90 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {/* Quote Icon */}
                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-600 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                      </svg>
                    </div>
                    
                    <blockquote className="text-light text-lg leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="pt-4 border-t border-accent/20">
                      <div className="flex items-center gap-4">
                        {/* Avatar Image */}
                          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent flex-shrink-0" style={{ minWidth: '48px', minHeight: '48px' }}>
                          <img 
                            src={testimonial.avatar} 
                              alt={`${testimonial.author} profile picture`}
                            width="48"
                            height="48"
                            className="w-full h-full object-cover"
                              style={{ aspectRatio: '1 / 1', minWidth: '48px', minHeight: '48px' }}
                              loading="lazy"
                          />
                          <div 
                            className="w-full h-full bg-gradient-to-br from-accent to-accent-600 flex items-center justify-center text-primary font-semibold text-sm"
                            style={{ display: 'none' }}
                          >
                            {testimonial.author.split(' ').map(n => n[0]).join('')}
                          </div>
                        </div>
                        
                        {/* Author Info */}
                        <div>
                          <p className="font-semibold text-light text-lg">{testimonial.author}</p>
                          <p className="text-sm text-accent">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          </div>
        </div>
        )}

        {/* Navigation Buttons */}
        {activeTab === 'written' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pt-6"
        >
          {/* Mobile: Minimal Progress Bar Style */}
          <div className="md:hidden">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-xs text-accent/60 font-medium">
                {currentPage + 1} / {totalPages}
              </span>
            </div>
            {/* Progress Bar Indicator */}
            <div className="relative h-0.5 bg-accent/20 rounded-full overflow-hidden max-w-xs mx-auto">
              <motion.div
                className="absolute top-0 left-0 h-full bg-accent rounded-full"
                initial={false}
                animate={{
                  width: `${((currentPage + 1) / totalPages) * 100}%`
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            {/* Clickable Dots */}
            <div className="flex items-center justify-center gap-1.5 mt-3">
              {Array.from({ length: totalPages }, (_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    handlePageClick(index);
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`rounded-full transition-all duration-300 ${
                    currentPage === index 
                      ? 'w-2 h-2 bg-accent' 
                      : 'w-1.5 h-1.5 bg-accent/40 hover:bg-accent/60'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                  aria-current={currentPage === index ? 'page' : undefined}
                />
              ))}
            </div>
          </div>

          {/* Desktop: Original Style with Buttons */}
          <div className="hidden md:flex justify-center items-center gap-3">
            <motion.button
              onClick={() => {
                if (currentPage > 0) {
                  handlePrevPage();
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2.5 rounded-full transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center ${
                currentPage === 0
                  ? 'bg-accent/5 text-accent/30 cursor-not-allowed'
                  : 'bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20 hover:border-accent/40'
              }`}
              disabled={currentPage === 0}
              aria-label="Previous page"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            {/* Page Indicators */}
            <div className="flex items-center gap-1 px-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    handlePageClick(index);
                  }}
                  whileHover={{ scale: 1.4 }}
                  whileTap={{ scale: 0.7 }}
                  className={`rounded-full transition-all duration-200 ${
                    currentPage === index 
                      ? 'w-1.5 h-1.5 bg-accent shadow-sm shadow-accent/30' 
                      : 'w-1 h-1 bg-accent/30 hover:bg-accent/50'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                  aria-current={currentPage === index ? 'page' : undefined}
                />
              ))}
            </div>
            
            <motion.button
              onClick={() => {
                if (currentPage < totalPages - 1) {
                  handleNextPage();
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2.5 rounded-full transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center ${
                currentPage === totalPages - 1
                  ? 'bg-accent/5 text-accent/30 cursor-not-allowed'
                  : 'bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20 hover:border-accent/40'
              }`}
              disabled={currentPage === totalPages - 1}
              aria-label="Next page"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
        )}

        {/* Video Testimonials */}
        {activeTab === 'video' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {VIDEO_TESTIMONIALS.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full border-accent/20 hover:border-accent/40 transition-all duration-300 group-hover:shadow-xl bg-primary/90 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-0">
                    {/* Video Thumbnail */}
                    <div className="relative aspect-video bg-gradient-to-br from-accent/20 to-secondary/20 overflow-hidden" style={{ minHeight: '200px' }}>
                      <img
                        src={video.thumbnail}
                        alt={`${video.title} video thumbnail`}
                        width="1280"
                        height="720"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        style={{ aspectRatio: '16 / 9', minHeight: '200px' }}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <motion.button
                          onClick={() => openVideoModal(video)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-16 h-16 bg-accent/90 hover:bg-accent rounded-full flex items-center justify-center shadow-lg"
                          aria-label={`Play ${video.title} video`}
                        >
                          <Play className="w-6 h-6 text-primary ml-1" />
                        </motion.button>
                      </div>
                      <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      {/* Quote */}
                      <blockquote className="text-light text-sm leading-relaxed line-clamp-3">
                        "{video.quote}"
                      </blockquote>
                      
                      {/* Author Info */}
                      <div className="flex items-center gap-3 pt-4 border-t border-accent/20">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-accent flex-shrink-0" style={{ minWidth: '40px', minHeight: '40px' }}>
                          <img 
                            src={video.thumbnail} 
                            alt={`${video.title} video thumbnail`}
                            width="40"
                            height="40"
                            className="w-full h-full object-cover"
                            style={{ aspectRatio: '1 / 1', minWidth: '40px', minHeight: '40px' }}
                            loading="lazy"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-light text-sm">{video.client}</p>
                          <p className="text-xs text-accent">{video.role}</p>
                        </div>
                      </div>
                      
                      {/* Results */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-accent">Key Results:</h4>
                        <ul className="space-y-1">
                          {video.results.slice(0, 2).map((result, idx) => (
                            <li key={idx} className="text-xs text-light/80 flex items-center gap-2">
                              <div className="w-1 h-1 bg-accent rounded-full"></div>
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
                    </motion.div>
    </div>

    {/* Video Modal */}
    {isVideoModalOpen && selectedVideo && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-4xl mx-4 bg-primary rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={closeVideoModal}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Video Player */}
          <div className="aspect-video bg-black">
            <video
              className="w-full h-full"
              controls
              poster={selectedVideo.thumbnail}
              onLoadStart={() => {/* Video loading started */}}
            >
              <source src={selectedVideo.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Video Info */}
          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-light mb-2">{selectedVideo.title}</h3>
                <div className="flex items-center gap-4 text-sm text-accent">
                  <span>{selectedVideo.client}</span>
                  <span>•</span>
                  <span>{selectedVideo.role}</span>
                  <span>•</span>
                  <span>{selectedVideo.duration}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: selectedVideo.rating }, (_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
            </div>

            <blockquote className="text-light italic border-l-4 border-accent pl-4">
              "{selectedVideo.quote}"
            </blockquote>

            <div className="space-y-3">
              <h4 className="font-semibold text-accent">Project Results:</h4>
              <ul className="space-y-2">
                {selectedVideo.results.map((result, idx) => (
                  <li key={idx} className="text-light flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    {result}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    )}
  </Section>
);
});

Testimonials.displayName = 'Testimonials';

// TrustedBy Component - Separate section for company logos
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
                    }
                  : {};

                return (
                  <LogoWrapper
                    key={`first-${index}`}
                    {...wrapperProps}
                    className="group relative flex-shrink-0 w-32 h-32 md:w-40 md:h-40 flex items-center justify-center rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden"
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
                      alt={`${client.name} logo`}
                      className="w-full h-full object-cover transition-all duration-300 opacity-70 group-hover:opacity-100"
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if (e.target.nextSibling) {
                          e.target.nextSibling.style.display = 'flex';
                        }
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
                    }
                  : {};

                return (
                  <LogoWrapper
                    key={`second-${index}`}
                    {...wrapperProps}
                    className="group relative flex-shrink-0 w-32 h-32 md:w-40 md:h-40 flex items-center justify-center rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden"
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
                      alt={`${client.name} logo`}
                      className="w-full h-full object-cover transition-all duration-300 opacity-70 group-hover:opacity-100"
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if (e.target.nextSibling) {
                          e.target.nextSibling.style.display = 'flex';
                        }
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

// SocialProof section removed - was duplicate content

const ContactForm = () => {
  const { resolvedTheme } = useTheme();
  const [state, handleSubmit] = useForm("mandzwvb");
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  
  if (state.succeeded) {
    return (
      <div className="relative overflow-hidden">
        {/* Animated Success Background */}
        <div className="absolute inset-0">
          {/* Floating celebration particles - Reduced from 20 to 10 for better performance */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-accent rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -100, -200],
                x: [0, (Math.random() - 0.5) * 100],
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />
          ))}
          
          {/* Gradient orbs */}
          <motion.div
            className="absolute w-64 h-64 rounded-full blur-3xl"
            style={{ background: 'rgba(138,234,146,0.2)', top: '-50%', left: '-50%' }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
            </div>

        <Card className="relative border-2 border-accent/30 backdrop-blur-sm shadow-2xl"
          style={{ 
            background: 'linear-gradient(to bottom right, rgba(138,234,146,0.1), rgba(0,0,0,0.1), rgba(138,234,146,0.1))',
            borderColor: 'rgba(138,234,146,0.3)',
          }}
        >
          <CardContent className="p-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg"
              >
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </motion.svg>
              </motion.div>
              
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-2xl font-bold text-accent"
              >
                Message Sent Successfully! 🎉
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-accent/80 text-lg"
              >
                Thank you for reaching out! I'll get back to you within 24 hours.
              </motion.p>
            </motion.div>
        </CardContent>
      </Card>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute w-32 h-32 border-2 border-primary/20 rounded-full"
          style={{ top: '10%', left: '5%' }}
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        <motion.div
          className="absolute w-24 h-24 bg-primary/10 rounded-lg rotate-45"
          style={{ top: '20%', right: '10%' }}
          animate={{
            rotate: [45, 405, 45],
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            rotate: { duration: 15, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        <motion.div
          className="absolute w-16 h-16 border border-primary/30 rounded-full"
          style={{ bottom: '15%', left: '8%' }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Gradient orbs */}
        <motion.div
          className="absolute w-64 h-64 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl"
          style={{ top: '-20%', right: '-20%' }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute w-48 h-48 bg-gradient-to-l from-secondary/10 to-primary/10 rounded-full blur-2xl"
          style={{ bottom: '-10%', left: '-10%' }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Animated lines */}
        <motion.div
          className="absolute w-1 h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent"
          style={{ top: '25%', left: '15%' }}
          animate={{
            scaleY: [0.5, 1.5, 0.5],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />

        <motion.div
          className="absolute w-1 h-24 bg-gradient-to-b from-transparent via-secondary/40 to-transparent"
          style={{ bottom: '30%', right: '20%' }}
          animate={{
            scaleY: [1, 0.3, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5
          }}
        />

        {/* Floating particles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/40 rounded-full"
            style={{
              left: `${20 + (i * 10)}%`,
              top: `${30 + (i * 5)}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + (i * 0.5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}
      </div>

      <Card className="relative border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500">
        {/* Animated border gradient */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-0 hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
        
        <CardContent className="p-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Form Header */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center space-y-2"
            >
              <h3 className="text-2xl font-bold text-accent">Let's Create Something Amazing</h3>
              <p className="text-accent/70">Share your vision and let's bring it to life together</p>
            </motion.div>

        {/* Live region for form status announcements */}
        <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
          {state.submitting && "Submitting form, please wait"}
          {state.succeeded && "Form submitted successfully"}
          {state.errors && Object.keys(state.errors).length > 0 && "Please correct the errors in the form"}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative group"
                >
                  <div className="relative">
              <Input 
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      placeholder=""
                      aria-label="First Name"
                      aria-required="true"
                      className="peer border-2 border-primary/20 bg-primary/5 text-accent placeholder:text-transparent focus:border-primary/60 focus:outline-2 focus:outline-accent focus:outline-offset-2 focus:ring-4 focus:ring-primary/20 transition-all duration-300 rounded-xl py-4 pl-4 pr-4"
                      onFocus={() => setFocusedField('firstName')}
                      onBlur={() => setFocusedField(null)}
                required
              />
                    <label 
                      htmlFor="firstName"
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'firstName' || formData.firstName
                          ? 'opacity-0' 
                          : 'top-4 text-accent/60'
                      }`}
                    >
                      First Name <span className="text-red-400" aria-label="required">*</span>
                    </label>
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                      initial={{ width: 0 }}
                      animate={{ width: focusedField === 'firstName' ? '100%' : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
              <ValidationError 
                prefix="First Name" 
                field="firstName"
                errors={state.errors}
                className="text-red-400 text-xs mt-1"
              />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative group"
                >
                  <div className="relative">
              <Input 
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      placeholder=""
                      aria-label="Last Name"
                      aria-required="true"
                      className="peer border-2 border-primary/20 bg-primary/5 text-accent placeholder:text-transparent focus:border-primary/60 focus:outline-2 focus:outline-accent focus:outline-offset-2 focus:ring-4 focus:ring-primary/20 transition-all duration-300 rounded-xl py-4 pl-4 pr-4"
                      onFocus={() => setFocusedField('lastName')}
                      onBlur={() => setFocusedField(null)}
                required
              />
                    <label 
                      htmlFor="lastName"
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'lastName' || formData.lastName
                          ? 'opacity-0' 
                          : 'top-4 text-accent/60'
                      }`}
                    >
                      Last Name
                    </label>
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                      initial={{ width: 0 }}
                      animate={{ width: focusedField === 'lastName' ? '100%' : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
              <ValidationError 
                prefix="Last Name" 
                field="lastName"
                errors={state.errors}
                className="text-red-400 text-xs mt-1"
              />
                </motion.div>
          </div>
          
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative group"
              >
                <div className="relative">
            <Input 
              id="email"
              name="email"
              type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder=""
                    aria-label="Email Address"
                    aria-required="true"
                    autoComplete="email"
                    className="peer border-2 border-primary/20 bg-primary/5 text-accent placeholder:text-transparent focus:border-primary/60 focus:outline-2 focus:outline-accent focus:outline-offset-2 focus:ring-4 focus:ring-primary/20 transition-all duration-300 rounded-xl py-4 pl-4 pr-4"
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
              required
            />
                  <label 
                    htmlFor="email"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'email' || formData.email
                          ? 'opacity-0' 
                          : 'top-4 text-accent/60'
                    }`}
                  >
                    Email Address
                  </label>
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: focusedField === 'email' ? '100%' : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
            <ValidationError 
              prefix="Email" 
              field="email"
              errors={state.errors}
              className="text-red-400 text-xs mt-1"
            />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="relative group"
              >
                <div className="relative">
            <Input 
              id="subject"
              name="subject"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder=""
                    className="peer border-2 border-primary/20 bg-primary/5 text-accent placeholder:text-transparent focus:border-primary/60 focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-300 rounded-xl py-4 pl-4 pr-4"
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
              required
            />
                  <label 
                    htmlFor="subject"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'subject' || formData.subject
                          ? 'opacity-0' 
                          : 'top-4 text-accent/60'
                    }`}
                  >
                    Project Subject
                  </label>
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: focusedField === 'subject' ? '100%' : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
            <ValidationError 
              prefix="Subject" 
              field="subject"
              errors={state.errors}
              className="text-red-400 text-xs mt-1"
            />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="relative group"
              >
                <div className="relative">
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder=""
                    aria-label="Project Message"
                    aria-required="true"
                    className="peer min-h-[140px] border-2 border-primary/20 bg-primary/5 text-accent placeholder:text-transparent focus:border-primary/60 focus:outline-2 focus:outline-accent focus:outline-offset-2 focus:ring-4 focus:ring-primary/20 transition-all duration-300 rounded-xl py-4 pl-4 pr-4 resize-none"
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
              required
            />
                  <label 
                    htmlFor="message"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === 'message' || formData.message
                        ? 'opacity-0' 
                        : 'top-4 text-accent/60'
                    }`}
                  >
                    Tell me about your project...
                  </label>
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: focusedField === 'message' ? '100%' : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
            <ValidationError 
              prefix="Message" 
              field="message"
              errors={state.errors}
              className="text-red-400 text-xs mt-1"
            />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="pt-4"
              >
                <motion.button
            type="submit" 
            disabled={state.submitting}
                  aria-label={state.submitting ? "Submitting form, please wait" : "Submit contact form"}
                  aria-busy={state.submitting}
                  className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary-600 to-primary py-4 text-lg font-semibold text-accent shadow-lg hover:shadow-2xl transition-all duration-300 focus:outline-2 focus:outline-accent focus:outline-offset-2 focus:ring-4 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => setIsSubmitting(false)}
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-secondary via-primary to-secondary opacity-0 group-hover:opacity-20"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  {/* Button content */}
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    {state.submitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-accent/30 border-t-accent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <motion.div
                          className="w-5 h-5"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className={`w-5 h-5 ${
                            resolvedTheme === 'light'
                              ? 'text-black'
                              : ''
                          }`} />
                        </motion.div>
                      </>
                    )}
                  </div>
                </motion.button>
              </motion.div>
        </form>
          </motion.div>
      </CardContent>
    </Card>
    </div>
  );
};

const Contact = () => (
  <Section id="contact" className="relative py-12 bg-primary overflow-hidden">
    {/* Background Elements */}
    <div className="absolute inset-0">
      <div className="absolute top-20 left-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/10 rounded-full blur-2xl"></div>
    </div>

    <div className="mx-auto max-w-6xl px-4 relative z-10">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="space-y-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-accent">Let's Work Together</h2>
          <p className="text-xl text-light max-w-3xl mx-auto">
            Ready to bring your ideas to life? I'd love to hear about your project and discuss how we can create something amazing together.
          </p>
        </motion.div>

          <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
          >
            <ContactForm />
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <LazyNewsletterSignup />
          </motion.div>

      </motion.div>
    </div>
  </Section>
);

Contact.displayName = 'Contact';

const Footer = React.memo(({ onPrivacyClick, onTermsClick }) => {
  const [footerLogoError, setFooterLogoError] = useState(false);
  const [footerLogoSrc, setFooterLogoSrc] = useState(logoImg);
  const { resolvedTheme } = useTheme();
  
  return (
  <footer className="relative bg-primary text-neutral-300 overflow-hidden">
     {/* Subtle Background Elements */}
    <div className="absolute inset-0">
       <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>
       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
    </div>

    <div className="mx-auto max-w-6xl px-4 relative z-10">
       {/* Mobile: Minimalist Footer */}
       <div className="md:hidden py-8">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="space-y-6"
         >
           {/* Brand & Social */}
           <div className="flex flex-col items-center gap-4">
             <h3 className="text-base font-bold text-light">{PROFILE.name}</h3>
             
             {/* Social Icons - Compact */}
             <div className="flex items-center gap-3">
               {PROFILE.socials.map((social, index) => (
                 <motion.a
                   key={social.label}
                   href={social.href}
                   target="_blank"
                   rel="noopener noreferrer"
                   className={`p-2 rounded-lg transition-all duration-200 ${
                     resolvedTheme === 'light'
                       ? 'bg-accent/20 hover:bg-accent/30'
                       : 'bg-accent/10 hover:bg-accent/20'
                   }`}
                   whileHover={{ scale: 1.1, y: -2 }}
                   whileTap={{ scale: 0.95 }}
                   aria-label={social.label}
                 >
                   <social.icon className={`w-4 h-4 ${
                     resolvedTheme === 'light'
                       ? 'text-primary'
                       : 'text-accent'
                   }`} />
                 </motion.a>
               ))}
             </div>
           </div>

           {/* Divider */}
           <div className="h-px bg-accent/20"></div>

           {/* Copyright */}
           <div className="flex flex-col items-center">
             <p className="text-[10px] text-accent/50">
               © 2025 {PROFILE.name}
             </p>
           </div>
         </motion.div>
       </div>

       {/* Desktop: Full Footer */}
       {/* Main Content */}
          <motion.div
         initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
         transition={{ duration: 0.8 }}
         className="hidden md:block py-16"
       >
         <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
           {/* Brand Section */}
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.1 }}
             className="space-y-6"
           >
             <div className="flex items-center gap-4">
               <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-600 rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={IMAGES.bereketFikre} 
                  alt=""
                  width="64"
                  height="64"
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: '1 / 1', minWidth: '64px', minHeight: '64px' }}
                  loading="lazy"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-light">{PROFILE.name}</h3>
                 <p className="text-accent font-medium">Graphic Designer, Brand Builder & Educator</p>
              </div>
            </div>
             
             <p className="text-neutral-300 leading-relaxed">
               Creating meaningful connections through strategic design. Let's bring your vision to life.
             </p>
             
             {/* Logo */}
             <motion.div
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="flex items-center"
             >
               {!footerLogoError ? (
                 <img 
                   src={footerLogoSrc} 
                   alt="Logo"
                   width="200"
                   height="67"
                   className="h-16 md:h-20 w-auto object-contain"
                   onError={() => {
                     // Try alternative paths
                     if (footerLogoSrc.includes('/img/Logo.svg')) {
                       setFooterLogoSrc('/SVG/Logo.svg');
                     } else if (footerLogoSrc.includes('/SVG/Logo.svg')) {
                       setFooterLogoSrc('/img/Logo.svg');
                     } else {
                       // Final fallback: show text logo
                       setFooterLogoError(true);
                     }
                   }}
                 />
               ) : (
                 <div className="text-accent font-bold text-xl md:text-2xl">
                   Bereket Fikre
                 </div>
               )}
             </motion.div>
          </motion.div>

           {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-center md:text-center text-left ml-0 md:ml-8"
          >
             <h4 className="text-lg font-semibold text-light">Let's Connect</h4>
             <div className="grid grid-cols-3 gap-3 justify-items-center">
               {PROFILE.socials.map((social, index) => (
                <motion.a
                   key={social.label}
                   href={social.href}
                   target="_blank"
                   rel="noopener noreferrer"
                   className={`group flex flex-col items-center justify-center gap-2 p-3 rounded-lg transition-all duration-300 border border-accent/20 hover:border-accent/40 w-full h-16 ${
                     resolvedTheme === 'light'
                       ? 'bg-accent hover:bg-accent/80'
                       : 'bg-accent/10 hover:bg-accent/20'
                   }`}
                   whileHover={{ scale: 1.05, y: -2 }}
                   whileTap={{ scale: 0.95 }}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                 >
                   <social.icon className={`w-6 h-6 group-hover:scale-110 transition-transform ${
                     resolvedTheme === 'light'
                       ? 'text-primary group-hover:text-primary'
                       : 'text-accent group-hover:text-accent'
                   }`} />
                   <span className={`text-sm transition-colors ${
                     resolvedTheme === 'light'
                       ? 'text-primary group-hover:text-primary'
                       : 'text-neutral-300 group-hover:text-accent'
                   }`}>{social.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6 text-left md:text-right"
          >
            <h4 className="text-lg font-semibold text-light">Get In Touch</h4>
            <div className="space-y-4 flex flex-col items-start md:items-end">
              <motion.a
                href={`mailto:${PROFILE.email}`}
                 className="flex items-center gap-3 text-neutral-300 hover:text-accent transition-colors group"
                whileHover={{ x: 5 }}
              >
                 <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">{PROFILE.email}</span>
              </motion.a>
              <motion.a
                href={`tel:${PROFILE.phone}`}
                 className="flex items-center gap-3 text-neutral-300 hover:text-accent transition-colors group"
                whileHover={{ x: 5 }}
              >
                 <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">{PROFILE.phone}</span>
              </motion.a>
              <motion.a
                href="https://t.me/Believeandforward"
                target="_blank"
                rel="noopener noreferrer"
                 className="flex items-center gap-3 text-neutral-300 hover:text-accent transition-colors group"
                whileHover={{ x: 5 }}
              >
                 <Send className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">Telegram</span>
              </motion.a>
              <motion.div
                className="flex items-center gap-3 text-neutral-300 hover:text-accent transition-colors group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                 <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">{PROFILE.location}</span>
              </motion.div>
              
              {/* Legal Links */}
              <div className="flex items-center gap-4 pt-4">
            <motion.button
              onClick={onPrivacyClick}
                  className="text-xs text-neutral-400 hover:text-accent transition-colors group cursor-pointer"
              whileHover={{ y: -2 }}
            >
              <span className="group-hover:underline">Privacy Policy</span>
            </motion.button>
            <motion.button
              onClick={onTermsClick}
                  className="text-xs text-neutral-400 hover:text-accent transition-colors group cursor-pointer"
              whileHover={{ y: -2 }}
            >
              <span className="group-hover:underline">Terms of Service</span>
            </motion.button>
          </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Desktop Bottom Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="hidden md:block pb-8 border-t border-primary/10"
      >
        <div className="flex items-center justify-center text-center">
            <p className="text-sm text-neutral-400">
              © 2025 {PROFILE.name}. All rights reserved.
            </p>
         </div>
      </motion.div>

    </div>
  </footer>
);
});

Footer.displayName = 'Footer';

export default function CreativeDesignerPortfolio() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  
  // Tool states (managed by Header component)
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isPWAOpen, setIsPWAOpen] = useState(false);
  const [isPerformanceOpen, setIsPerformanceOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [isPerformanceDashboardOpen, setIsPerformanceDashboardOpen] = useState(false);
  const [isSEOManagerOpen, setIsSEOManagerOpen] = useState(false);
  const [isSecurityDashboardOpen, setIsSecurityDashboardOpen] = useState(false);
  const [isAIContentGeneratorOpen, setIsAIContentGeneratorOpen] = useState(false);
  const [isSmartRecommendationsOpen, setIsSmartRecommendationsOpen] = useState(false);
  const [isCRMIntegrationOpen, setIsCRMIntegrationOpen] = useState(false);
  const [isEmailMarketingOpen, setIsEmailMarketingOpen] = useState(false);

  // Handle ESC key to close modals
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        // Close all modals in order of priority
        if (isEmailMarketingOpen) setIsEmailMarketingOpen(false);
        else if (isCRMIntegrationOpen) setIsCRMIntegrationOpen(false);
        else if (isSmartRecommendationsOpen) setIsSmartRecommendationsOpen(false);
        else if (isAIContentGeneratorOpen) setIsAIContentGeneratorOpen(false);
        else if (isSecurityDashboardOpen) setIsSecurityDashboardOpen(false);
        else if (isSEOManagerOpen) setIsSEOManagerOpen(false);
        else if (isPerformanceDashboardOpen) setIsPerformanceDashboardOpen(false);
        else if (isAccessibilityOpen) setIsAccessibilityOpen(false);
        else if (isPerformanceOpen) setIsPerformanceOpen(false);
        else if (isPWAOpen) setIsPWAOpen(false);
        else if (isAIOpen) setIsAIOpen(false);
        else if (isAnalyticsOpen) setIsAnalyticsOpen(false);
        else if (isTermsOpen) setIsTermsOpen(false);
        else if (isPrivacyOpen) setIsPrivacyOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isPrivacyOpen, isTermsOpen, isAnalyticsOpen, isAIOpen, isPWAOpen, isPerformanceOpen, isAccessibilityOpen, isPerformanceDashboardOpen, isSEOManagerOpen, isSecurityDashboardOpen, isAIContentGeneratorOpen, isSmartRecommendationsOpen, isCRMIntegrationOpen, isEmailMarketingOpen]);

  React.useEffect(() => {
    // Register service worker for PWA functionality (only in production)
    // Skip service worker in development to avoid fetch errors with Vite dev server
    const isDevelopment = import.meta.env.DEV || 
                          window.location.hostname === 'localhost' || 
                          window.location.hostname === '127.0.0.1' ||
                          (window.location.port !== '' && window.location.port !== '443' && window.location.port !== '80');
    
    if ('serviceWorker' in navigator) {
      if (isDevelopment) {
        // Unregister all service workers in development
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((registration) => {
            registration.unregister().then((success) => {
              if (success) {
                // Service Worker unregistered in development
              }
            });
          });
        });
        // Also unregister the controller if it exists
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
        }
      } else {
        // Production: Register service worker
        navigator.serviceWorker.getRegistration()
          .then((registration) => {
            if (!registration) {
              // Only register if not already registered
              return navigator.serviceWorker.register('/sw.js');
            }
            return registration;
          })
          .then((registration) => {
            // Service Worker registered successfully
          })
          .catch((error) => {
            console.error('Service Worker registration failed:', error);
          });
      }
    }

    // Set up global deferredPrompt for install functionality
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      window.deferredPrompt = e;
    };

    const handleAppInstalled = () => {
      window.deferredPrompt = null;
    };

    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    
    // Cleanup
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Initialize app features and smooth scrolling
  React.useEffect(() => {
    // Initialize advanced caching - DISABLED to reduce console noise
    // advancedCache.init();
    // Defer non-critical scripts to reduce initial load time
    // Use requestIdleCallback for better performance, fallback to setTimeout
    const initNonCriticalScripts = () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          // Initialize scroll animations (can be deferred)
    scrollAnimations.init();
          // Initialize accessibility features (can be deferred)
    accessibilityManager.init();
          // Initialize page transitions (can be deferred)
    pageTransitions.init();
        }, { timeout: 2000 });
      } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(() => {
          scrollAnimations.init();
          accessibilityManager.init();
          pageTransitions.init();
        }, 2000);
      }
    };
    
    initNonCriticalScripts();
      // Initialize advanced analytics - DISABLED to reduce console noise
      // advancedAnalytics.init();
      // Initialize performance monitoring - DISABLED to reduce console noise
      // performanceMonitor.init();
      // Initialize sitemap generator - DISABLED to reduce console noise
      // sitemapGenerator.init(window.location.origin);
      // Initialize security manager - DISABLED to reduce console noise
      // securityManager.init();
    
    // Handle smooth scrolling for anchor links
    const handler = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;
      const id = target.getAttribute('href');
      const el = id && document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <LazyAnalytics />
        <LazyPerformance 
          isOpen={isPerformanceOpen} 
          onClose={() => setIsPerformanceOpen(false)} 
        />
      {/* Skip Links for Keyboard Navigation */}
      <div className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-4 focus-within:left-4 focus-within:z-[10000] focus-within:p-4 focus-within:bg-accent focus-within:text-primary focus-within:rounded-lg focus-within:shadow-lg">
        <a href="#main-content" className="block mb-2 focus:outline-2 focus:outline-primary focus:outline-offset-2">
          Skip to main content
        </a>
        <a href="#navigation" className="block mb-2 focus:outline-2 focus:outline-primary focus:outline-offset-2">
          Skip to navigation
        </a>
        <a href="#work" className="block mb-2 focus:outline-2 focus:outline-primary focus:outline-offset-2">
          Skip to portfolio
        </a>
        <a href="#contact" className="block focus:outline-2 focus:outline-primary focus:outline-offset-2">
          Skip to contact
        </a>
      </div>

      <main id="main-content" className="antialiased text-light bg-primary selection:bg-accent selection:text-primary" role="main">
        <HeaderWithContext 
          isAnalyticsOpen={isAnalyticsOpen} setIsAnalyticsOpen={setIsAnalyticsOpen}
          isAIOpen={isAIOpen} setIsAIOpen={setIsAIOpen}
          isPWAOpen={isPWAOpen} setIsPWAOpen={setIsPWAOpen}
          isPerformanceOpen={isPerformanceOpen} setIsPerformanceOpen={setIsPerformanceOpen}
          isPerformanceDashboardOpen={isPerformanceDashboardOpen} setIsPerformanceDashboardOpen={setIsPerformanceDashboardOpen}
          isSEOManagerOpen={isSEOManagerOpen} setIsSEOManagerOpen={setIsSEOManagerOpen}
          isSecurityDashboardOpen={isSecurityDashboardOpen} setIsSecurityDashboardOpen={setIsSecurityDashboardOpen}
          isAIContentGeneratorOpen={isAIContentGeneratorOpen} setIsAIContentGeneratorOpen={setIsAIContentGeneratorOpen}
          isSmartRecommendationsOpen={isSmartRecommendationsOpen} setIsSmartRecommendationsOpen={setIsSmartRecommendationsOpen}
          isCRMIntegrationOpen={isCRMIntegrationOpen} setIsCRMIntegrationOpen={setIsCRMIntegrationOpen}
          isEmailMarketingOpen={isEmailMarketingOpen} setIsEmailMarketingOpen={setIsEmailMarketingOpen}
        />
        <Hero />
      {/* Below-the-fold sections - Suspense boundaries added for future lazy loading
          Note: To enable true lazy loading, extract these components to separate files
          and use React.lazy() for code splitting. This will significantly reduce
          initial bundle size and main-thread work. */}
      <Suspense fallback={<div className="min-h-screen bg-primary" />}>
      <About />
      </Suspense>
      <Suspense fallback={<div className="min-h-screen bg-primary" />}>
      <WhatIDo />
      </Suspense>
      <Suspense fallback={<div className="min-h-screen bg-primary" />}>
      <Work />
      </Suspense>
      <Suspense fallback={<div className="min-h-screen bg-primary" />}>
      <Testimonials />
      </Suspense>
      <Suspense fallback={<div className="min-h-[400px] bg-primary" />}>
      <TrustedBy />
      </Suspense>
      <LazyCaseStudy />
      <LazyBlog />
      <LazyFAQ />
      <Suspense fallback={<div className="min-h-screen bg-primary" />}>
      <Contact />
      </Suspense>
      <Suspense fallback={<div className="min-h-[400px] bg-primary" />}>
      <Footer 
        onPrivacyClick={() => setIsPrivacyOpen(true)}
        onTermsClick={() => setIsTermsOpen(true)}
      />
      </Suspense>
      
      {/* Legal Modals */}
      <PrivacyPolicy 
        isOpen={isPrivacyOpen} 
        onClose={() => setIsPrivacyOpen(false)} 
      />
      <TermsOfService 
        isOpen={isTermsOpen} 
        onClose={() => setIsTermsOpen(false)} 
      />
      
    </main>
    
    {/* PWA Components */}
    <LazyPWAInstaller />
    
    {/* Advanced Features */}
    <LazyAI 
      isOpen={isAIOpen} 
      onClose={() => setIsAIOpen(false)} 
    />
    <LazyPWA 
      isOpen={isPWAOpen} 
      onClose={() => setIsPWAOpen(false)} 
    />
    
    {/* Performance Monitor */}
    <LazyPerformance 
      isOpen={isPerformanceOpen} 
      onClose={() => setIsPerformanceOpen(false)} 
    />
    
    {/* Analytics Dashboard */}
    <LazyTools 
      isOpen={isAnalyticsOpen} 
      onClose={() => setIsAnalyticsOpen(false)} 
    />
    
    {/* Scroll Progress and Navigation */}
    <ScrollProgress />
    <CircularScrollProgress />
    <ScrollToTop />
    
    {/* Accessibility Settings */}
    <LazyAccessibilitySettings
      isOpen={isAccessibilityOpen}
      onClose={() => setIsAccessibilityOpen(false)}
    />

    <LazyPerformanceDashboard
      isOpen={isPerformanceDashboardOpen}
      onClose={() => setIsPerformanceDashboardOpen(false)}
    />

    {/* CriticalResourceHints disabled to fix preload warnings */}
    {/* <CriticalResourceHints /> */}

    <LazySEOManager
      isOpen={isSEOManagerOpen}
      onClose={() => setIsSEOManagerOpen(false)}
    />

    <LazySecurityDashboard
      isOpen={isSecurityDashboardOpen}
      onClose={() => setIsSecurityDashboardOpen(false)}
    />

    <LazyAIContentGenerator
      isOpen={isAIContentGeneratorOpen}
      onClose={() => setIsAIContentGeneratorOpen(false)}
    />

    <LazySmartRecommendations
      isOpen={isSmartRecommendationsOpen}
      onClose={() => setIsSmartRecommendationsOpen(false)}
    />

    <LazyCRMIntegration
      isOpen={isCRMIntegrationOpen}
      onClose={() => setIsCRMIntegrationOpen(false)}
    />

    <LazyEmailMarketing
      isOpen={isEmailMarketingOpen}
      onClose={() => setIsEmailMarketingOpen(false)}
    />

    {/* EnhancedSEO disabled to fix Helmet nesting issue */}
    {/* <EnhancedSEO 
      pageType="homepage"
      customData={{
        title: "Bereket Fikre - Creative Designer & Brand Strategist",
        description: "Professional creative designer specializing in brand identity, UI/UX design, and digital marketing. Transform your vision into compelling visual experiences.",
        keywords: ["creative designer", "brand identity", "UI/UX design", "portfolio", "Bereket Fikre"]
      }}
    /> */}
    </ThemeProvider>
    </LanguageProvider>
  );
}

