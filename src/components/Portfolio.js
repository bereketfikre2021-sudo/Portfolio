import React, { useContext, useState, useMemo } from 'react';
import { ModalContext } from '../context/ModalContext';

const Portfolio = () => {
  const { openPortfolioModal } = useContext(ModalContext);
  const [activeFilter, setActiveFilter] = useState('branding');

  const services = [
    { id: 'branding', label: 'Branding' },
    { id: 'campaigns', label: 'Campaigns' },
    { id: 'print', label: 'Print' },
    { id: 'digital', label: 'Digital' },
    { id: 'brand-applications', label: 'Brand Applications' },
    { id: 'art-direction', label: 'Art Direction' }
  ];

  const projects = [
    // Brand Identity Projects
    {
      id: 'swan-clothing',
      image: '/assets/Portfolio/Full brand identity for swan clothing.webp',
      category: 'Brand Identity · Fashion',
      title: 'Full Brand Identity - Swan Clothing',
      description: 'Complete brand identity package including logo design, product packaging mockups, and comprehensive brand guidelines for a modern fashion brand.',
      service: 'brand-identity-design',
      company: 'Swan Clothing'
    },
    {
      id: 'alta-counseling',
      image: '/assets/Portfolio/Full brand identity for Alta Counseling.webp',
      category: 'Stationery Design · Healthcare',
      title: 'Stationery Design - Alta Counseling',
      description: 'Complete stationery design including professional letterheads, business cards, envelopes, and folders for a healthcare counseling service.',
      service: 'print-design',
      company: 'Alta Counseling'
    },
    {
      id: 'dayer-engineering',
      image: '/assets/Portfolio/Full Brand Identity Dayer Enginnering PLC.webp',
      category: 'Brand Identity · Engineering',
      title: 'Full Brand Identity - Dayer Engineering PLC',
      description: 'Comprehensive brand identity system including logo design, brand guidelines, and corporate materials for an engineering company.',
      service: 'brand-identity-design',
      company: 'Dayer Engineering PLC'
    },
    {
      id: 'blu-hart-karaoke',
      image: '/assets/Portfolio/karaoke event social media.webp',
      category: 'Social Media Design · Event Marketing',
      title: 'Karaoke Event Social Media - Blu Hart',
      description: 'Social media design collection for a karaoke event, featuring engaging posts and promotional graphics to drive event attendance and engagement.',
      service: 'marketing-campaign-design',
      company: 'Blu Hart'
    },
    {
      id: 'zewd-architectural',
      image: '/assets/Portfolio/Logo Design for Zewd Architectural Designs.webp',
      category: 'Logo Design · Architecture',
      title: 'Logo Design - Zewd Architectural Designs',
      description: 'Professional logo design for an architectural firm, featuring a distinctive mark that reflects precision, creativity, and modern design principles.',
      service: 'logo-design',
      company: 'Zewd Architectural Designs'
    },
    {
      id: 'yat-construction',
      image: '/assets/Portfolio/YAT-Construction-PLC-8e3605ca.webp',
      category: 'Stationery Design · Corporate',
      title: 'Stationery Design - Y.A.T Construction PLC',
      description: 'Complete stationery design including professional letterheads, business cards, envelopes, and folders for cohesive corporate identity.',
      service: 'print-design',
      company: 'Y.A.T Construction PLC'
    },
    {
      id: 'maleda-coffee',
      image: '/assets/Portfolio/Maleda-Coffee-7b6d183c.webp',
      category: 'Brand Identity · Beverage',
      title: 'Brand Identity - Maleda Coffee',
      description: 'Premium coffee brand identity with rich visual storytelling, packaging design, and complete brand experience from bean to cup.',
      service: 'brand-identity-design',
      company: 'Maleda Coffee'
    },
    // Graphic Design Projects
    {
      id: 'maleda-packaging',
      image: '/assets/Portfolio/Packaging For Maleda Coffee.webp',
      category: 'Packaging Design · Beverage',
      title: 'Product Packaging Design - Maleda Coffee',
      description: 'Premium packaging design for coffee products, combining visual appeal with functional design for retail and distribution.',
      service: 'brand-applications-assets',
      company: 'Maleda Coffee'
    },
    {
      id: 'andegna-signage',
      image: '/assets/Portfolio/Office Signage For Andegna Furniture.webp',
      category: 'Environmental Design · Corporate',
      title: 'Office Signage Design - Andegna Furniture',
      description: 'Professional office signage design including wall graphics and environmental graphics for impactful corporate communication.',
      service: 'brand-applications-assets',
      company: 'Andegna Furniture'
    },
    {
      id: 'medavail-signage',
      image: '/assets/Portfolio/Office Signage Medavail-.webp',
      category: 'Environmental Design · Healthcare',
      title: 'Office Signage Design - Medavail Pharmaceuticals',
      description: 'Professional office signage design for a pharmaceutical company, creating a cohesive brand experience in the workplace.',
      service: 'brand-applications-assets',
      company: 'Medavail Pharmaceuticals'
    },
    {
      id: 'maleda-signage',
      image: '/assets/Portfolio/Signage for maleda\'.webp',
      category: 'Environmental Design · Beverage',
      title: 'Signage Design - Maleda Coffee',
      description: 'Professional signage design for Maleda Coffee, creating a cohesive brand experience in retail and commercial spaces.',
      service: 'brand-applications-assets',
      company: 'Maleda Coffee'
    },
    {
      id: 'barnas-signage',
      image: '/assets/Portfolio/Barnas signage.webp',
      category: 'Environmental Design · Corporate',
      title: 'Logo Signage Design - Barnas',
      description: 'Professional logo signage design for Barnas, featuring wall graphics and environmental graphics that create a cohesive brand experience.',
      service: 'brand-applications-assets',
      company: 'Barnas'
    },
    {
      id: 'andegna-tshirt',
      image: '/assets/Portfolio/Andegna-Tshirt-d5d4e074.webp',
      category: 'Apparel Design · Corporate Branding',
      title: 'Corporate Apparel Design – Driver\'s T-Shirt for Andegna Furniture',
      description: 'Branded t-shirt design for Andegna Furniture\'s delivery team, created to reflect professionalism, brand consistency, and day-to-day wearability.',
      service: 'brand-applications-assets',
      company: 'Andegna Furniture'
    },
    {
      id: 'lensa-packaging',
      image: '/assets/Portfolio/Product Packaging for Lensa Fashion.webp',
      category: 'Packaging Design · Fashion',
      title: 'Product Packaging Design - Lensa Fashion',
      description: 'Elegant product packaging design for a fashion brand, creating an unboxing experience that reflects brand quality and style.',
      service: 'brand-applications-assets',
      company: 'Lensa Fashion'
    },
    {
      id: 'niqat-apparel',
      image: '/assets/Portfolio/Apparel Design for Niqat Coffee.webp',
      category: 'Apparel Design · Coffee',
      title: 'Apparel Design - Niqat Coffee',
      description: 'Branded apparel design for Niqat Coffee, including t-shirts and merchandise that reflect the brand\'s identity and coffee culture.',
      service: 'brand-applications-assets',
      company: 'Niqat Coffee'
    },
    {
      id: 'alta-apparel',
      image: '/assets/Portfolio/Apparel Design for Alta conseling.webp',
      category: 'Apparel Design · Healthcare',
      title: 'Apparel Design - Alta Counseling',
      description: 'Professional apparel design for Alta Counseling, featuring branded t-shirts and merchandise that reflect the healthcare organization\'s identity.',
      service: 'brand-applications-assets',
      company: 'Alta Counseling'
    },
    {
      id: 'swan-apparel',
      image: '/assets/Portfolio/Apparel Design for Swan clothing.webp',
      category: 'Apparel Design · Fashion',
      title: 'Apparel Design - Swan Clothing',
      description: 'Fashion-forward apparel design for Swan Clothing, featuring branded t-shirts and merchandise that reflect the fashion brand\'s identity.',
      service: 'brand-applications-assets',
      company: 'Swan Clothing'
    },
    {
      id: 'yat-apparel',
      image: '/assets/Portfolio/Apparel Design for Yat Construction.webp',
      category: 'Apparel Design · Corporate',
      title: 'Apparel Design - Y.A.T Construction PLC',
      description: 'Professional apparel design for Y.A.T Construction PLC, featuring branded t-shirts and merchandise for corporate branding.',
      service: 'brand-applications-assets',
      company: 'Y.A.T Construction PLC'
    },
    {
      id: 'alta-apparel-2',
      image: '/assets/Portfolio/Apparel Design for Alta conseling-2.webp',
      category: 'Apparel Design · Healthcare',
      title: 'Apparel Design Collection - Alta Counseling',
      description: 'Additional apparel design collection for Alta Counseling, including various merchandise items that maintain brand consistency.',
      service: 'brand-applications-assets',
      company: 'Alta Counseling'
    },
    {
      id: 'swan-apparel-2',
      image: '/assets/Portfolio/Apparel Design for Swan clothing-2.webp',
      category: 'Apparel Design · Fashion',
      title: 'Apparel Design Series - Swan Clothing',
      description: 'Additional apparel design series for Swan Clothing, including various merchandise items that maintain brand consistency.',
      service: 'brand-applications-assets',
      company: 'Swan Clothing'
    },
    {
      id: 'swan-apparel-3',
      image: '/assets/Portfolio/Apparel Design for Swan clothing-3.webp',
      category: 'Apparel Design · Fashion',
      title: 'Apparel Design Collection - Swan Clothing',
      description: 'Comprehensive apparel design collection for Swan Clothing, featuring branded merchandise that reflects the fashion brand\'s identity.',
      service: 'brand-applications-assets',
      company: 'Swan Clothing'
    },
    {
      id: 'niqat-menu',
      image: '/assets/Portfolio/Menu & Broshure for niqat coffee.webp',
      category: 'Menu Design · Print Design',
      title: 'Cafe Menu & Brochure Design - Niqat Coffee',
      description: 'Complete cafe menu design including trifold layout and modern typography for an elegant dining experience.',
      service: 'print-design',
      company: 'Niqat Coffee'
    },
    {
      id: 'niqat-social',
      image: '/assets/Portfolio/Social Media Design for niqat coffee.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Design - Niqat Coffee',
      description: 'Comprehensive social media design collection including posts, stories, and promotional graphics for engaging online presence.',
      service: 'marketing-campaign-design',
      company: 'Niqat Coffee'
    },
    {
      id: 'finix-social-1',
      image: '/assets/Portfolio/Social Media Design For Finix Bet.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Design - Finix Bet',
      description: 'Engaging social media design collection for Finix Bet, including posts, stories, and promotional graphics for online engagement.',
      service: 'marketing-campaign-design',
      company: 'Finix Bet'
    },
    {
      id: 'ace-stainless-1',
      image: '/assets/Portfolio/Social Media Design For Ace Stainless Still.webp',
      category: 'Social Media Design · Manufacturing',
      title: 'Social Media Design - Ace Stainless Steel',
      description: 'Professional social media design collection for a stainless steel manufacturing company, showcasing products and services.',
      service: 'marketing-campaign-design',
      company: 'Ace Stainless Steel'
    },
    {
      id: 'niqat-social-2',
      image: '/assets/Portfolio/Social Media Design for niqat coffee-2.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Design Series - Niqat Coffee',
      description: 'Social media design assets featuring promotional graphics and engaging visual content for digital marketing campaigns.',
      service: 'marketing-campaign-design',
      company: 'Niqat Coffee'
    },
    {
      id: 'finix-social-2',
      image: '/assets/Portfolio/Social Media Design For Finix Bet-2.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Design Series - Finix Bet',
      description: 'Social media design assets featuring promotional graphics and engaging visual content for digital marketing campaigns.',
      service: 'marketing-campaign-design',
      company: 'Finix Bet'
    },
    {
      id: 'niqat-social-3',
      image: '/assets/Portfolio/Social Media Design for niqat coffee-3.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Design Collection - Niqat Coffee',
      description: 'Comprehensive social media design collection with various formats and styles for consistent brand communication.',
      service: 'marketing-campaign-design',
      company: 'Niqat Coffee'
    },
    {
      id: 'finix-social-3',
      image: '/assets/Portfolio/Social Media Design For Finix Bet-3.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Design Collection - Finix Bet',
      description: 'Comprehensive social media design collection with various formats and styles for consistent brand communication.',
      service: 'marketing-campaign-design',
      company: 'Finix Bet'
    },
    {
      id: 'ace-stainless-2',
      image: '/assets/Portfolio/Social Media Design For Ace Stainless Still-2.webp',
      category: 'Social Media Design · Manufacturing',
      title: 'Social Media Design Collection - Ace Stainless Steel',
      description: 'Additional social media design assets including product showcases and promotional graphics for digital marketing campaigns.',
      service: 'marketing-campaign-design',
      company: 'Ace Stainless Steel'
    },
    {
      id: 'niqat-social-4',
      image: '/assets/Portfolio/Social Media Design for niqat coffee-4.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Graphics - Niqat Coffee',
      description: 'Professional social media graphics designed for maximum engagement and brand visibility across digital platforms.',
      service: 'marketing-campaign-design',
      company: 'Niqat Coffee'
    },
    {
      id: 'finix-social-4',
      image: '/assets/Portfolio/Social Media Design For Finix Bet-4.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Graphics - Finix Bet',
      description: 'Professional social media graphics designed for maximum engagement and brand visibility across digital platforms.',
      service: 'marketing-campaign-design',
      company: 'Finix Bet'
    },
    {
      id: 'niqat-social-5',
      image: '/assets/Portfolio/Social Media Design for niqat coffee-5.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Design Assets - Niqat Coffee',
      description: 'Digital marketing assets including social media posts and promotional graphics for online campaigns.',
      service: 'marketing-campaign-design',
      company: 'Niqat Coffee'
    },
    {
      id: 'finix-social-5',
      image: '/assets/Portfolio/Social Media Design For Finix Bet-5.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Design Assets - Finix Bet',
      description: 'Digital marketing assets including social media posts and promotional graphics for online campaigns.',
      service: 'marketing-campaign-design',
      company: 'Finix Bet'
    },
    {
      id: 'niqat-social-6',
      image: '/assets/Portfolio/Social Media Design for niqat coffee-6.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Content - Niqat Coffee',
      description: 'Engaging social media content design featuring modern layouts and compelling visuals for digital marketing.',
      service: 'marketing-campaign-design',
      company: 'Niqat Coffee'
    },
    {
      id: 'finix-social-6',
      image: '/assets/Portfolio/Social Media Design For Finix Bet-6.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Content - Finix Bet',
      description: 'Engaging social media content design featuring modern layouts and compelling visuals for digital marketing.',
      service: 'marketing-campaign-design',
      company: 'Finix Bet'
    },
    {
      id: 'niqat-social-7',
      image: '/assets/Portfolio/Social Media Design for niqat coffee-7.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Design Series - Niqat Coffee',
      description: 'Professional social media design series with consistent branding and engaging visual content.',
      service: 'marketing-campaign-design',
      company: 'Niqat Coffee'
    },
    {
      id: 'finix-social-7',
      image: '/assets/Portfolio/Social Media Design For Finix Bet-7.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Design Series - Finix Bet',
      description: 'Professional social media design series with consistent branding and engaging visual content.',
      service: 'marketing-campaign-design',
      company: 'Finix Bet'
    },
    {
      id: 'niqat-social-8',
      image: '/assets/Portfolio/Social Media Design for niqat coffee-8.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Graphics Collection - Niqat Coffee',
      description: 'Comprehensive collection of social media graphics designed for various digital marketing campaigns and promotions.',
      service: 'marketing-campaign-design',
      company: 'Niqat Coffee'
    },
    {
      id: 'finix-social-8',
      image: '/assets/Portfolio/Social Media Design For Finix Bet-8.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Graphics Collection - Finix Bet',
      description: 'Comprehensive collection of social media graphics designed for various digital marketing campaigns and promotions.',
      service: 'marketing-campaign-design',
      company: 'Finix Bet'
    },
    {
      id: 'niqat-social-9',
      image: '/assets/Portfolio/Social Media Design for niqat coffee-9.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Design Assets - Niqat Coffee',
      description: 'Professional social media design assets featuring promotional graphics and engaging visual content.',
      service: 'marketing-campaign-design',
      company: 'Niqat Coffee'
    },
    {
      id: 'finix-social-9',
      image: '/assets/Portfolio/Social Media Design For Finix Bet-9.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Design Assets - Finix Bet',
      description: 'Professional social media design assets featuring promotional graphics and engaging visual content.',
      service: 'marketing-campaign-design',
      company: 'Finix Bet'
    },
    {
      id: 'niqat-social-10',
      image: '/assets/Portfolio/Social Media Design for niqat coffee-10.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Content Design - Niqat Coffee',
      description: 'Engaging social media content design with modern aesthetics and compelling visuals for digital engagement.',
      service: 'marketing-campaign-design',
      company: 'Niqat Coffee'
    },
    {
      id: 'finix-social-10',
      image: '/assets/Portfolio/Social Media Design For Finix Bet-10.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Content Design - Finix Bet',
      description: 'Engaging social media content design with modern aesthetics and compelling visuals for digital engagement.',
      service: 'marketing-campaign-design',
      company: 'Finix Bet'
    },
    {
      id: 'niqat-social-11',
      image: '/assets/Portfolio/Social Media Design for niqat coffee-11.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Design - Niqat Coffee',
      description: 'Professional social media design collection for Niqat Coffee, featuring engaging posts and promotional graphics for digital marketing campaigns.',
      service: 'marketing-campaign-design',
      company: 'Niqat Coffee'
    },
    {
      id: 'rollup-banners',
      image: '/assets/Portfolio/Rollup-Banners-68a13cab.webp',
      category: 'Banner Design · Print Design',
      title: 'Rollup Banners for Different Companies',
      description: 'Professional rollup banner designs for various companies, featuring modern layouts, compelling visuals, and brand-consistent messaging.',
      service: 'brand-applications-assets',
      company: 'Multiple Clients'
    },
    // Web Design Projects
    {
      id: 'finix-banner-1',
      image: '/assets/Portfolio/Website Banner For Finix Bet.webp',
      category: 'Web Design · Digital Marketing',
      title: 'Website Banner Design - Finix Bet',
      description: 'Professional website banner design for Finix Bet, optimized for web display and digital marketing campaigns.',
      service: 'digital-social-media-design',
      company: 'Finix Bet'
    },
    {
      id: 'finix-banner-2',
      image: '/assets/Portfolio/Website Banner For Finix Bet-2.webp',
      category: 'Web Design · Digital Marketing',
      title: 'Website Banner Collection - Finix Bet',
      description: 'Website banner design featuring modern layouts and engaging visuals for effective online presence.',
      service: 'digital-social-media-design',
      company: 'Finix Bet'
    },
    {
      id: 'finix-banner-3',
      image: '/assets/Portfolio/Website Banner For Finix Bet-3.webp',
      category: 'Web Design · Digital Marketing',
      title: 'Web Banner Design - Finix Bet',
      description: 'Professional web banner design optimized for various screen sizes and digital platforms.',
      service: 'digital-social-media-design',
      company: 'Finix Bet'
    },
    {
      id: 'finix-banner-4',
      image: '/assets/Portfolio/Website Banner For Finix Bet-4.webp',
      category: 'Web Design · Digital Marketing',
      title: 'Website Banner Series - Finix Bet',
      description: 'Comprehensive website banner series designed for consistent brand communication across digital platforms.',
      service: 'digital-social-media-design',
      company: 'Finix Bet'
    },
    {
      id: 'finix-banner-5',
      image: '/assets/Portfolio/Website Banner For Finix Bet-5.webp',
      category: 'Web Design · Digital Marketing',
      title: 'Web Banner Assets - Finix Bet',
      description: 'Professional web banner assets featuring modern design and engaging visuals for digital marketing.',
      service: 'digital-social-media-design',
      company: 'Finix Bet'
    },
    {
      id: 'finix-banner-6',
      image: '/assets/Portfolio/Website Banner For Finix Bet-6.webp',
      category: 'Web Design · Digital Marketing',
      title: 'Website Banner Design - Finix Bet',
      description: 'Engaging website banner design with compelling visuals and clear messaging for online campaigns.',
      service: 'digital-social-media-design',
      company: 'Finix Bet'
    },
    {
      id: 'finix-banner-7',
      image: '/assets/Portfolio/Website Banner For Finix Bet-7.webp',
      category: 'Web Design · Digital Marketing',
      title: 'Web Banner Collection - Finix Bet',
      description: 'Professional web banner collection designed for various digital marketing campaigns and promotions.',
      service: 'digital-social-media-design',
      company: 'Finix Bet'
    },
    {
      id: 'finix-banner-8',
      image: '/assets/Portfolio/Website Banner For Finix Bet-8.webp',
      category: 'Web Design · Digital Marketing',
      title: 'Website Banner Series - Finix Bet',
      description: 'Comprehensive website banner series with consistent branding and engaging visual content.',
      service: 'digital-social-media-design',
      company: 'Finix Bet'
    },
    {
      id: 'finix-banner-9',
      image: '/assets/Portfolio/Website Banner For Finix Bet-9.webp',
      category: 'Web Design · Digital Marketing',
      title: 'Web Banner Design Assets - Finix Bet',
      description: 'Professional web banner design assets optimized for various screen sizes and digital platforms.',
      service: 'digital-social-media-design',
      company: 'Finix Bet'
    },
    {
      id: 'finix-banner-10',
      image: '/assets/Portfolio/Website Banner For Finix Bet-10.webp',
      category: 'Web Design · Digital Marketing',
      title: 'Website Banner Collection - Finix Bet',
      description: 'Engaging website banner collection featuring modern design and compelling visuals for digital marketing.',
      service: 'digital-social-media-design',
      company: 'Finix Bet'
    },
    // Art Direction Projects
    {
      id: 'art-direction-1',
      image: '/assets/Portfolio/Art Direction.webp',
      category: 'Art Direction · Visual Guidance',
      title: 'Art Direction & Visual Guidance - Project 1',
      description: 'Comprehensive art direction and visual guidance for product presentation, photography, and creative assets. This project involved developing a cohesive visual language across multiple touchpoints, ensuring brand consistency and high-quality execution. The art direction encompassed styling, composition, color palette selection, and overall aesthetic direction for product photography and marketing materials.',
      service: 'art-direction-visual-guidance',
      company: 'Various Clients'
    },
    {
      id: 'art-direction-2',
      image: '/assets/Portfolio/Art Direction-1 copy.webp',
      category: 'Art Direction · Visual Guidance',
      title: 'Art Direction & Visual Guidance - Project 2',
      description: 'Professional art direction and visual guidance for creative campaigns and brand storytelling. This project focused on establishing visual narratives that align with brand identity, including direction for photography shoots, video production, and digital content creation. The guidance ensured all visual elements work harmoniously to communicate the brand message effectively.',
      service: 'art-direction-visual-guidance',
      company: 'Various Clients'
    },
    {
      id: 'art-direction-3',
      image: '/assets/Portfolio/Art Direction-2 copy.webp',
      category: 'Art Direction · Visual Guidance',
      title: 'Art Direction & Visual Guidance - Project 3',
      description: 'Strategic art direction for product launches and marketing initiatives. This project involved creating comprehensive visual guidelines for product photography, including lighting, composition, background selection, and styling direction. The art direction ensured consistent visual quality across all product presentations and marketing channels.',
      service: 'art-direction-visual-guidance',
      company: 'Various Clients'
    },
    {
      id: 'art-direction-4',
      image: '/assets/Portfolio/Art Direction-3 copy.webp',
      category: 'Art Direction · Visual Guidance',
      title: 'Art Direction & Visual Guidance - Project 4',
      description: 'Comprehensive art direction for brand campaigns and visual communication. This project encompassed developing creative concepts, visual style guides, and direction for photography and videography teams. The guidance ensured all creative assets maintain brand integrity while achieving compelling visual storytelling that resonates with target audiences.',
      service: 'art-direction-visual-guidance',
      company: 'Various Clients'
    },
    {
      id: 'art-direction-5',
      image: '/assets/Portfolio/Art Direction-4 copy.webp',
      category: 'Art Direction · Visual Guidance',
      title: 'Art Direction & Visual Guidance - Project 5',
      description: 'Professional art direction for digital and print marketing materials. This project involved establishing visual direction for social media content, advertising campaigns, and promotional materials. The art direction included color palette selection, typography guidance, layout composition, and overall aesthetic direction to ensure cohesive brand presentation across all platforms.',
      service: 'art-direction-visual-guidance',
      company: 'Various Clients'
    },
    {
      id: 'art-direction-6',
      image: '/assets/Portfolio/Art Direction-5 copy.webp',
      category: 'Art Direction · Visual Guidance',
      title: 'Art Direction & Visual Guidance - Project 6',
      description: 'Strategic art direction for brand identity and visual systems. This project focused on creating comprehensive visual guidelines that extend beyond logo design to encompass photography style, illustration direction, and overall creative execution. The art direction ensured all brand touchpoints maintain visual consistency and brand alignment.',
      service: 'art-direction-visual-guidance',
      company: 'Various Clients'
    },
    {
      id: 'art-direction-7',
      image: '/assets/Portfolio/Art Direction-6 copy.webp',
      category: 'Art Direction · Visual Guidance',
      title: 'Art Direction & Visual Guidance - Project 7',
      description: 'Comprehensive art direction for creative projects and visual campaigns. This project involved developing visual concepts, directing photography sessions, and providing guidance for post-production processes. The art direction ensured high-quality visual outcomes that align with brand values and effectively communicate the intended message to target audiences.',
      service: 'art-direction-visual-guidance',
      company: 'Various Clients'
    },
    {
      id: 'art-direction-8',
      image: '/assets/Portfolio/Art Direction-7 copy.webp',
      category: 'Art Direction · Visual Guidance',
      title: 'Art Direction & Visual Guidance - Project 8',
      description: 'Professional art direction for product photography and visual content creation. This project encompassed styling direction, composition guidelines, lighting specifications, and overall aesthetic direction for product shoots. The art direction ensured consistent visual quality and brand alignment across all product imagery used in marketing and e-commerce platforms.',
      service: 'art-direction-visual-guidance',
      company: 'Various Clients'
    },
    {
      id: 'art-direction-9',
      image: '/assets/Portfolio/Art Direction-8 copy.webp',
      category: 'Art Direction · Visual Guidance',
      title: 'Art Direction & Visual Guidance - Project 9',
      description: 'Strategic art direction for brand campaigns and visual storytelling initiatives. This project involved creating comprehensive visual guidelines, directing creative teams, and ensuring brand consistency across all visual touchpoints. The art direction encompassed photography direction, video production guidance, and digital content creation to deliver cohesive and impactful brand experiences.',
      service: 'art-direction-visual-guidance',
      company: 'Various Clients'
    },
    // New Branding Projects
    {
      id: 'dumas-properties-branding',
      image: '/assets/Portfolio/Branding Dumas Properties.webp',
      category: 'Brand Identity · Real Estate',
      title: 'Full Brand Identity - Dumas Properties',
      description: 'Complete brand identity package including logo design, brand guidelines, and comprehensive visual identity for a real estate company.',
      service: 'brand-identity-design',
      company: 'Dumas Properties'
    },
    {
      id: 'raya-hotel-branding',
      image: '/assets/Portfolio/Branding Raya Hotel & Convention Center.webp',
      category: 'Brand Identity · Hospitality',
      title: 'Full Brand Identity - Raya Hotel & Convention Center',
      description: 'Comprehensive brand identity system including logo design, brand guidelines, and corporate materials for a hospitality and convention center.',
      service: 'brand-identity-design',
      company: 'Raya Hotel & Convention Center'
    },
    // New Social Media Template Projects
    {
      id: 'ptgr-social-template',
      image: '/assets/Portfolio/Social Media Template - PTGR.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Template - PTGR',
      description: 'Professional social media template design featuring modern layouts and engaging visual content for consistent brand communication.',
      service: 'marketing-campaign-design',
      company: 'PTGR'
    },
    {
      id: 'task-plug-social-template',
      image: '/assets/Portfolio/Social Media Template - Task Plug.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Template - Task Plug',
      description: 'Engaging social media template design with modern aesthetics and compelling visuals for digital marketing campaigns.',
      service: 'marketing-campaign-design',
      company: 'Task Plug'
    },
    {
      id: 'task-plug-social-template-2',
      image: '/assets/Portfolio/Social Media Template - Task Plug-2.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Template Series - Task Plug',
      description: 'Additional social media template design featuring promotional graphics and engaging visual content for digital marketing.',
      service: 'marketing-campaign-design',
      company: 'Task Plug'
    },
    {
      id: 'finix-social-template',
      image: '/assets/Portfolio/Social Media Template - Finix Bet.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Template - Finix Bet',
      description: 'Professional social media template design for Finix Bet, featuring modern layouts and engaging visual content.',
      service: 'marketing-campaign-design',
      company: 'Finix Bet'
    },
    {
      id: 'finix-social-template-2',
      image: '/assets/Portfolio/Social Media Template - Finix Bet-2.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Template Collection - Finix Bet',
      description: 'Comprehensive social media template collection with various formats and styles for consistent brand communication.',
      service: 'marketing-campaign-design',
      company: 'Finix Bet'
    },
    {
      id: 'finix-social-template-3',
      image: '/assets/Portfolio/Social Media Template - Finix Bet-3.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Template Series - Finix Bet',
      description: 'Professional social media template series featuring promotional graphics and engaging visual content for digital marketing.',
      service: 'marketing-campaign-design',
      company: 'Finix Bet'
    },
    {
      id: 'finix-social-template-4',
      image: '/assets/Portfolio/Social Media Template - Finix Bet-4.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Template Assets - Finix Bet',
      description: 'Digital marketing template assets including social media posts and promotional graphics for online campaigns.',
      service: 'marketing-campaign-design',
      company: 'Finix Bet'
    },
    {
      id: 'finix-social-template-5',
      image: '/assets/Portfolio/Social Media Template - Finix Bet-5.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Template Design - Finix Bet',
      description: 'Engaging social media template design featuring modern layouts and compelling visuals for digital engagement.',
      service: 'marketing-campaign-design',
      company: 'Finix Bet'
    },
    {
      id: 'finix-social-template-6',
      image: '/assets/Portfolio/Social Media Template - Finix Bet-6.webp',
      category: 'Social Media Design · Digital Marketing',
      title: 'Social Media Template Collection - Finix Bet',
      description: 'Professional social media template collection designed for various digital marketing campaigns and promotions.',
      service: 'marketing-campaign-design',
      company: 'Finix Bet'
    },
    // New Print & Layout Projects
    {
      id: 'ptgr-flyer',
      image: '/assets/Portfolio/A5 Flyer - PTGR.webp',
      category: 'Print Design · Marketing',
      title: 'A5 Flyer Design - PTGR',
      description: 'Professional A5 flyer design featuring modern layouts, compelling visuals, and clear messaging for marketing campaigns.',
      service: 'print-design',
      company: 'PTGR'
    },
    {
      id: 'dumas-print-layout',
      image: '/assets/Portfolio/Print & Layout - Dumas.webp',
      category: 'Print Design · Corporate',
      title: 'Print & Layout Design - Dumas Properties',
      description: 'Complete print and layout design including professional materials and corporate communications for brand consistency.',
      service: 'print-design',
      company: 'Dumas Properties'
    },
    {
      id: 'raya-print-layout',
      image: '/assets/Portfolio/Print & Layout - Raya.webp',
      category: 'Print Design · Hospitality',
      title: 'Print & Layout Design - Raya Hotel',
      description: 'Professional print and layout design for hospitality materials, featuring elegant layouts and brand-consistent messaging.',
      service: 'print-design',
      company: 'Raya Hotel & Convention Center'
    },
    // New Product & Packaging Projects
    {
      id: 'dumas-packaging',
      image: '/assets/Portfolio/Product & Packaging - Dumas.webp',
      category: 'Packaging Design · Real Estate',
      title: 'Product & Packaging Design - Dumas Properties',
      description: 'Professional product and packaging design for real estate materials, creating a cohesive brand experience.',
      service: 'brand-applications-assets',
      company: 'Dumas Properties'
    },
    {
      id: 'raya-packaging',
      image: '/assets/Portfolio/Product & Packaging - Raya.webp',
      category: 'Packaging Design · Hospitality',
      title: 'Product & Packaging Design - Raya Hotel',
      description: 'Elegant product and packaging design for hospitality materials, reflecting brand quality and style.',
      service: 'brand-applications-assets',
      company: 'Raya Hotel & Convention Center'
    },
  ];

  // Shuffle function to randomize project order (only once on mount)
  const shuffledProjects = useMemo(() => {
    const shuffled = [...projects];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  // Filter projects based on active filter category
  const filteredProjects = useMemo(() => {
    let filtered = [];
    
    if (activeFilter === 'branding') {
      // Branding: Brand Identity Design, Logo Design, Visual Identity Systems
      filtered = shuffledProjects.filter(project => 
        project.service === 'brand-identity-design' ||
        project.service === 'logo-design' ||
        project.service === 'visual-identity-systems'
      );
    } else if (activeFilter === 'campaigns') {
      // Campaigns: Marketing & Campaign Design
      filtered = shuffledProjects.filter(project => 
        project.service === 'marketing-campaign-design'
      );
    } else if (activeFilter === 'print') {
      // Print: Print Design
      filtered = shuffledProjects.filter(project => 
        project.service === 'print-design'
      );
    } else if (activeFilter === 'digital') {
      // Digital: Digital & Social Media Design
      filtered = shuffledProjects.filter(project => 
        project.service === 'digital-social-media-design'
      );
    } else if (activeFilter === 'art-direction') {
      // Art Direction: Art Direction & Visual Guidance
      filtered = shuffledProjects.filter(project => 
        project.service === 'art-direction-visual-guidance'
      );
      // Sort art direction projects by ID to maintain numerical order (1-9)
      filtered.sort((a, b) => {
        const numA = parseInt(a.id.match(/\d+/)?.[0] || '0');
        const numB = parseInt(b.id.match(/\d+/)?.[0] || '0');
        return numA - numB;
      });
    } else if (activeFilter === 'brand-applications') {
      // Brand Applications: Brand Applications & Assets
      filtered = shuffledProjects.filter(project => 
        project.service === 'brand-applications-assets'
      );
    }
    
    // Shuffle campaigns individually to spread companies apart
    if (activeFilter === 'campaigns') {
      const shuffled = [...filtered];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }
    
    return filtered;
  }, [shuffledProjects, activeFilter]);

  return (
    <section id="portfolio" className="portfolio" aria-labelledby="portfolio-heading">
      <div className="container">
        <div className="section-intro">
          <span className="section-number">03</span>
          <div className="section-header">
            <span className="section-label">Selected Work</span>
            <h2 id="portfolio-heading" className="section-title">
              <span className="title-main">Featured</span>
              <span className="title-accent">Projects</span>
            </h2>
          </div>
        </div>

        <div className="portfolio-filters" role="tablist" aria-label="Filter portfolio projects by service">
          {services.map((service) => (
            <button
              key={service.id}
              className={`portfolio-filter-btn ${activeFilter === service.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(service.id)}
              role="tab"
              aria-selected={activeFilter === service.id}
              aria-controls="portfolio-grid"
              tabIndex={activeFilter === service.id ? 0 : -1}
            >
              {service.label}
            </button>
          ))}
        </div>
        
        <div id="portfolio-grid" className="portfolio-grid-modern" role="list" aria-live="polite" aria-atomic="false">
          {filteredProjects.map((project, index) => (
            <article 
              key={project.id} 
              className="portfolio-item-modern" 
              data-project={project.id}
              role="listitem"
              tabIndex={0}
              onClick={() => openPortfolioModal(project.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openPortfolioModal(project.id);
                }
              }}
              aria-label={`${project.title} - ${project.category}. Click to view project details`}
            >
              <div className="portfolio-image-small">
                <img 
                  src={`${process.env.PUBLIC_URL || ''}${project.image}`} 
                  alt={`${project.title} - ${project.category} project by Bereket Fikre`} 
                  className="portfolio-thumb" 
                  loading="lazy" 
                  width="600" 
                  height="400"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  onError={(e) => {
                    // Fallback: hide broken image gracefully
                    e.target.style.display = 'none';
                    const container = e.target.closest('.portfolio-image-small');
                    if (container) {
                      container.style.minHeight = '200px';
                      container.style.background = 'var(--bg-primary)';
                    }
                  }}
                />
              </div>
              <div className="portfolio-content">
                <span className="portfolio-category-modern">{project.category}</span>
                <h3>{project.title}</h3>
                <a 
                  href="#" 
                  className="portfolio-link-modern"
                  onClick={(e) => {
                    e.preventDefault();
                    openPortfolioModal(project.id);
                  }}
                  aria-label={`View ${project.title} project`}
                >
                  <span>View Project</span>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;


