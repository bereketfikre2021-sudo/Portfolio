import React, { useContext, useEffect, useState, useRef } from 'react';
import { ModalContext } from '../context/ModalContext';
import LightboxGallery from './LightboxGallery';
import { useFocusTrap } from '../hooks/useFocusTrap';

const PortfolioModal = () => {
  const { portfolioModal, closePortfolioModal } = useContext(ModalContext);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const modalRef = useRef(null);
  useFocusTrap(portfolioModal?.isOpen, modalRef);
  
  // Announce modal opening to screen readers
  useEffect(() => {
    if (portfolioModal?.isOpen && portfolioModal?.projectId) {
      const project = projectData[portfolioModal.projectId];
      if (project) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
          liveRegion.textContent = `Opened project: ${project.title}. ${project.description}`;
          setTimeout(() => {
            liveRegion.textContent = '';
          }, 1000);
        }
      }
    }
  }, [portfolioModal?.isOpen, portfolioModal?.projectId]);

  const projectData = {
    'andegna-tshirt': {
      image: '/assets/Portfolio/Andegna-Tshirt-d5d4e074.webp',
      category: 'Furniture',
      title: 'Corporate Apparel Design – Driver\'s T-Shirt for Andegna Furniture',
      description: 'Branded t-shirt design for Andegna Furniture\'s delivery team, created to reflect professionalism, brand consistency, and day-to-day wearability. Corporate apparel design that enhances brand visibility while maintaining comfort and functionality for delivery personnel.',
      type: 'Apparel Design',
      date: '2024',
      client: 'Andegna Furniture',
      challenge: {
        heading: 'The Challenge',
        text: 'Create professional branded apparel that maintains brand consistency while being practical for daily delivery operations. The design needed to work in various environments, withstand daily wear, and enhance brand visibility without compromising comfort or functionality for delivery personnel.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a clean, professional design that incorporates the brand logo and colors strategically placed for maximum visibility. The design ensures comfort and durability for delivery personnel while maintaining a professional appearance. The t-shirt design works seamlessly across different lighting conditions and environments, ensuring brand recognition at every customer touchpoint.'
      },
      results: {
        heading: 'The Results',
        text: 'The branded apparel successfully increased brand visibility and enhanced the professional appearance of the delivery team. This improvement in brand presentation has positively influenced customer perception and brand recognition, creating a more cohesive brand experience throughout the customer journey.'
      },
      deliverables: ['T-Shirt Design', 'Brand Guidelines', 'Color Specifications', 'Print Specifications']
    },
    'andegna-wood-metal': {
      image: '/assets/Portfolio/Office Signage For Andegna Furniture.webp',
      category: 'Corporate',
      title: 'Office Signage Design - Andegna Wood And Metal Works',
      description: 'Professional signage design including office wall graphics, roll-up banner displays, and environmental graphics for impactful corporate communication. This comprehensive signage system creates a cohesive brand experience throughout the office environment.',
      type: 'Environmental Design',
      date: '2024',
      client: 'Andegna Wood And Metal Works',
      challenge: {
        heading: 'The Challenge',
        text: 'Design a comprehensive signage system that reflects the company\'s expertise in wood and metal works while maintaining professional corporate aesthetics. The signage needed to enhance wayfinding, communicate the brand effectively, and create a cohesive visual experience throughout the office space.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I created a unified signage system using materials and design elements that echo the company\'s core business. The design incorporates wood and metal textures in the visual language, creating a connection between the company\'s services and its visual identity. The signage system includes wall graphics, roll-up banners, and environmental graphics that work together to create a cohesive brand experience.'
      },
      results: {
        heading: 'The Results',
        text: 'The comprehensive signage system enhanced brand presence and professional image throughout the office. It improved wayfinding for visitors and employees, and created a cohesive brand experience that reinforces the company\'s expertise and professionalism to clients and stakeholders.'
      },
      deliverables: ['Office Wall Graphics', 'Roll-up Banners', 'Environmental Graphics', 'Signage Guidelines']
    },
    'finix': {
      image: '/assets/Portfolio/Website Banner For Finix Bet.webp',
      category: 'Digital Marketing',
      title: 'Finix Web Asset Collection',
      description: 'Comprehensive web asset collection including website banners, digital marketing materials, and promotional graphics for engaging online presence. This collection creates a cohesive digital brand experience across all online platforms.',
      type: 'Digital Assets',
      date: '2024',
      client: 'Finix',
      challenge: {
        heading: 'The Challenge',
        text: 'Create a comprehensive collection of web assets that work across various digital platforms while maintaining brand consistency. The assets needed to be versatile, engaging, and effective in communicating the brand message in different digital contexts.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a cohesive collection of web assets including website banners, digital marketing materials, and promotional graphics. Each asset was designed to work seamlessly across different platforms while maintaining brand consistency. The collection includes various formats and sizes optimized for different digital channels.'
      },
      results: {
        heading: 'The Results',
        text: 'The web asset collection successfully created a cohesive digital brand experience across all online platforms. It improved brand recognition and engagement, making it easier for the brand to communicate effectively in the digital space.'
      },
      deliverables: ['Website Banners', 'Digital Marketing Materials', 'Promotional Graphics', 'Social Media Assets']
    },
    'swan-clothing': {
      image: '/assets/Portfolio/Full brand identity for swan clothing.webp',
      category: 'Fashion',
      title: 'Brand Identity - Swan Clothing',
      description: 'Complete brand identity package including logo design, product packaging mockups, and comprehensive brand guidelines for a modern fashion brand. This project established a strong visual identity that resonates with the target audience and sets the brand apart in the competitive fashion market.',
      type: 'Brand Identity',
      date: '2024',
      client: 'Swan Clothing',
      challenge: {
        heading: 'The Challenge',
        text: 'Create a distinctive brand identity for a new fashion brand that stands out in a competitive market while appealing to the target demographic. The identity needed to reflect the brand\'s values, resonate with fashion-conscious consumers, and work across various applications from packaging to digital platforms.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a modern, elegant brand identity with a sophisticated color palette and typography that reflects the brand\'s values. The logo design is versatile and memorable, working effectively across different applications. The brand guidelines ensure consistent application across all touchpoints, from product packaging to social media, creating a cohesive brand experience.'
      },
      results: {
        heading: 'The Results',
        text: 'The brand identity successfully established a strong brand presence in the fashion market. It increased brand recognition and created a foundation for consistent brand communication across all touchpoints. The cohesive visual identity has helped the brand stand out in a competitive market and connect with its target audience.'
      },
      deliverables: ['Logo Design', 'Brand Guidelines', 'Packaging Design', 'Color Palette', 'Typography System']
    },
    'maleda-coffee': {
      image: '/assets/Portfolio/Maleda-Coffee-7b6d183c.webp',
      category: 'Beverage',
      title: 'Maleda Coffee',
      description: 'Premium coffee brand identity with rich visual storytelling, packaging design, and complete brand experience from bean to cup. The identity reflects the artisanal quality and heritage of Ethiopian coffee culture, creating an emotional connection with coffee enthusiasts.',
      type: 'Brand Identity & Packaging',
      date: '2024',
      client: 'Maleda Coffee',
      challenge: {
        heading: 'The Challenge',
        text: 'Create a premium coffee brand identity that honors Ethiopian coffee heritage while appealing to modern consumers and standing out in a crowded market. The identity needed to tell the story of the coffee\'s origin, convey quality, and create an emotional connection with coffee enthusiasts.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a rich, authentic brand identity that combines traditional Ethiopian coffee culture with modern design aesthetics. The packaging design tells the story of the coffee\'s origin and quality through visual storytelling. The color palette and typography reflect the premium nature of the product while honoring its cultural heritage.'
      },
      results: {
        heading: 'The Results',
        text: 'The brand identity successfully established premium brand positioning in the coffee market. It increased consumer engagement and created a memorable brand experience that differentiates the product. The authentic storytelling approach has resonated with coffee enthusiasts, creating a strong emotional connection with the brand.'
      },
      deliverables: ['Brand Identity', 'Packaging Design', 'Logo Design', 'Brand Guidelines', 'Visual Storytelling']
    },
    'yat-construction': {
      image: '/assets/Portfolio/YAT-Construction-PLC-8e3605ca.webp',
      category: 'Corporate',
      title: 'Stationery Design - Y.A.T Construction PLC',
      description: 'Complete stationery design including professional letterheads, business cards, envelopes, and folders for cohesive corporate identity. This project created a professional stationery system that enhances brand communication across all business touchpoints.',
      type: 'Stationery Design',
      date: '2024',
      client: 'Y.A.T Construction PLC',
      challenge: {
        heading: 'The Challenge',
        text: 'Create a comprehensive stationery system that reflects the company\'s professionalism and expertise while maintaining brand consistency. The stationery needed to work across various business communications and create a cohesive corporate identity that enhances credibility and brand recognition.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a professional stationery system that includes letterheads, business cards, envelopes, and folders. Each piece was designed to reflect the company\'s expertise and reliability in the construction industry. The design maintains brand consistency while creating a modern, professional appearance that works effectively across all business touchpoints.'
      },
      results: {
        heading: 'The Results',
        text: 'The stationery system successfully enhanced the company\'s professional appearance and brand communication. It created a cohesive corporate identity that improves credibility and brand recognition. The comprehensive stationery system ensures consistent brand communication across all business interactions, from client correspondence to internal documentation.'
      },
      deliverables: ['Stationery Design', 'Business Cards', 'Letterheads', 'Envelopes', 'Folders', 'Brand Guidelines']
    },
    'alta': {
      image: '/assets/Portfolio/Full brand identity for Alta Counseling.webp',
      category: 'Healthcare',
      title: 'Stationery Design - Alta Counseling',
      description: 'Complete stationery design including professional letterheads, business cards, envelopes, and folders for a healthcare counseling service. This project created a professional stationery system that enhances brand communication across all business touchpoints.',
      type: 'Stationery Design',
      date: '2024',
      client: 'Alta Counseling',
      challenge: {
        heading: 'The Challenge',
        text: 'Create a comprehensive stationery system for a healthcare counseling service that reflects professionalism and care while maintaining a trustworthy appearance. The stationery needed to balance professionalism with approachability, conveying care and expertise to both clients and healthcare professionals.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a warm, approachable stationery design that balances professionalism with accessibility. The design uses colors and design elements that convey care and expertise, creating a welcoming yet professional appearance. The comprehensive stationery system includes letterheads, business cards, envelopes, and folders that work together to create a cohesive brand experience.'
      },
      results: {
        heading: 'The Results',
        text: 'The stationery system successfully enhanced the professional appearance while maintaining a trustworthy and approachable image. It improved client perception and created a cohesive brand system that reflects the organization\'s values and approach to care. The new stationery better communicates the service\'s commitment to providing compassionate, professional counseling services.'
      },
      deliverables: ['Stationery Design', 'Business Cards', 'Letterheads', 'Envelopes', 'Folders', 'Brand Guidelines']
    },
    'medavail': {
      image: '/assets/Portfolio/Office Signage Medavail-.webp',
      category: 'Healthcare',
      title: 'Office Signage Design - Medavail Pharmaceuticals',
      description: 'Professional office signage design for a pharmaceutical company, creating a cohesive brand experience in the workplace. The signage reflects the company\'s commitment to healthcare excellence and creates a professional environment for employees and visitors.',
      type: 'Environmental Design',
      date: '2024',
      client: 'Medavail Pharmaceuticals',
      challenge: {
        heading: 'The Challenge',
        text: 'Design professional office signage for a pharmaceutical company that reflects the company\'s brand while maintaining a clean, medical-inspired aesthetic. The signage needed to enhance wayfinding, create a professional workplace environment, and reinforce the company\'s commitment to healthcare excellence.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a professional office signage system that incorporates the company\'s brand identity with clean, medical-inspired aesthetics. The design maintains clear wayfinding functionality while creating a cohesive brand experience throughout the office environment. The signage system reflects the company\'s professionalism and commitment to healthcare excellence.'
      },
      results: {
        heading: 'The Results',
        text: 'The office signage system successfully enhanced brand presence and professional image throughout the office. It improved wayfinding for visitors and employees, and created a cohesive brand experience that reflects the company\'s commitment to healthcare excellence. The signage has enhanced the professional workplace environment and reinforced brand identity.'
      },
      deliverables: ['Office Signage', 'Wall Graphics', 'Signage Guidelines', 'Installation Specifications']
    },
    'niqat-menu': {
      image: '/assets/Portfolio/Menu & Broshure for niqat coffee.webp',
      category: 'Cafe',
      title: 'Cafe Menu & Brochure Design - Niqat Coffee',
      description: 'Complete cafe menu design including trifold layout and modern typography. Professional menu design that enhances customer experience with elegant print presentation and clear visual hierarchy.',
      type: 'Menu Design',
      date: '2024',
      client: 'Niqat Coffee',
      challenge: {
        heading: 'The Challenge',
        text: 'Create an elegant cafe menu design that enhances the customer experience while effectively communicating the menu offerings. The design needed to be visually appealing, easy to read, and reflect the cafe\'s brand identity and coffee culture.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a sophisticated menu design with a trifold layout that maximizes space while maintaining visual elegance. The typography and layout create clear visual hierarchy, making it easy for customers to navigate the menu. The design incorporates the cafe\'s brand identity while highlighting the coffee offerings and food items.'
      },
      results: {
        heading: 'The Results',
        text: 'The menu design successfully enhanced the customer experience and improved menu readability. It created an elegant presentation that reflects the cafe\'s brand identity and coffee culture, making it easier for customers to explore and order from the menu.'
      },
      deliverables: ['Menu Design', 'Brochure Design', 'Print Specifications', 'Brand Guidelines']
    },
    'raba-calendar': {
      image: '/assets/Portfolio/calendar for raba construction.webp',
      category: 'Construction',
      title: 'Calendar Design - Raba Construction',
      description: 'Professional calendar design for Raba Construction, featuring branded layouts and functional date organization for corporate use. The calendar maintains brand consistency while providing practical functionality.',
      type: 'Calendar Design',
      date: '2024',
      client: 'Raba Construction',
      challenge: {
        heading: 'The Challenge',
        text: 'Create a professional calendar design for Raba Construction that maintains brand consistency while providing practical functionality for corporate use. The design needed to be visually appealing, easy to read, and reflect the construction company\'s professional identity.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a professional calendar design that incorporates the company\'s brand identity with functional date organization. The layout maintains clear visual hierarchy and readability while featuring branded elements that reinforce the company\'s professional image throughout the year.'
      },
      results: {
        heading: 'The Results',
        text: 'The calendar design successfully created a practical corporate tool that maintains brand visibility throughout the year. It enhanced brand recognition while providing functional date organization for employees and clients, creating a lasting brand presence in daily use.'
      },
      deliverables: ['Calendar Design', 'Brand Integration', 'Print Specifications', 'Layout Guidelines']
    },
    'rollup-banners': {
      image: '/assets/Portfolio/Rollup-Banners-68a13cab.webp',
      category: 'Events',
      title: 'Rollup Banners for Different Companies',
      description: 'Professional rollup banner designs for various companies, featuring modern layouts, compelling visuals, and brand-consistent messaging. High-quality print-ready designs that effectively communicate company information and enhance brand visibility at events and exhibitions.',
      type: 'Banner Design',
      date: '2024',
      client: 'Multiple Clients',
      challenge: {
        heading: 'The Challenge',
        text: 'Create professional rollup banner designs for various companies that effectively communicate their brand message at events and exhibitions. Each banner needed to be visually compelling, brand-consistent, and optimized for print while standing out in crowded event spaces.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a collection of professional rollup banner designs with modern layouts and compelling visuals. Each banner was customized to reflect the client\'s brand identity while maintaining effective communication of key information. The designs are optimized for print and create strong visual impact in event environments.'
      },
      results: {
        heading: 'The Results',
        text: 'The rollup banner designs successfully enhanced brand visibility at events and exhibitions. They effectively communicated company information and created a professional presence that helped companies stand out in crowded event spaces.'
      },
      deliverables: ['Rollup Banner Designs', 'Print Specifications', 'Brand Guidelines', 'Multiple Variations']
    },
    'swan-clothing': {
      image: '/assets/Portfolio/Full brand identity for swan clothing.webp',
      category: 'Fashion',
      title: 'Full Brand Identity - Swan Clothing',
      description: 'Complete brand identity package including logo design, product packaging mockups, and comprehensive brand guidelines for a modern fashion brand. This project established a strong visual identity that resonates with the target audience and sets the brand apart in the competitive fashion market.',
      type: 'Brand Identity',
      date: '2024',
      client: 'Swan Clothing',
      challenge: {
        heading: 'The Challenge',
        text: 'Create a distinctive brand identity for a new fashion brand that stands out in a competitive market while appealing to the target demographic. The identity needed to reflect the brand\'s values, resonate with fashion-conscious consumers, and work across various applications from packaging to digital platforms.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a modern, elegant brand identity with a sophisticated color palette and typography that reflects the brand\'s values. The logo design is versatile and memorable, working effectively across different applications. The brand guidelines ensure consistent application across all touchpoints, from product packaging to social media, creating a cohesive brand experience.'
      },
      results: {
        heading: 'The Results',
        text: 'The brand identity successfully established a strong brand presence in the fashion market. It increased brand recognition and created a foundation for consistent brand communication across all touchpoints. The cohesive visual identity has helped the brand stand out in a competitive market and connect with its target audience.'
      },
      deliverables: ['Logo Design', 'Brand Guidelines', 'Packaging Design', 'Color Palette', 'Typography System']
    },
    'alta-counseling': {
      image: '/assets/Portfolio/Full brand identity for Alta Counseling.webp',
      category: 'Healthcare',
      title: 'Stationery Design - Alta Counseling',
      description: 'Complete stationery design including professional letterheads, business cards, envelopes, and folders for a healthcare counseling service. This project created a professional stationery system that enhances brand communication across all business touchpoints.',
      type: 'Stationery Design',
      date: '2024',
      client: 'Alta Counseling',
      challenge: {
        heading: 'The Challenge',
        text: 'Create a comprehensive stationery system for a healthcare counseling service that reflects professionalism and care while maintaining a trustworthy appearance. The stationery needed to balance professionalism with approachability, conveying care and expertise to both clients and healthcare professionals.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a warm, approachable stationery design that balances professionalism with accessibility. The design uses colors and design elements that convey care and expertise, creating a welcoming yet professional appearance. The comprehensive stationery system includes letterheads, business cards, envelopes, and folders that work together to create a cohesive brand experience.'
      },
      results: {
        heading: 'The Results',
        text: 'The stationery system successfully enhanced the professional appearance while maintaining a trustworthy and approachable image. It improved client perception and created a cohesive brand system that reflects the organization\'s values and approach to care. The new stationery better communicates the service\'s commitment to providing compassionate, professional counseling services.'
      },
      deliverables: ['Stationery Design', 'Business Cards', 'Letterheads', 'Envelopes', 'Folders', 'Brand Guidelines']
    },
    'dayer-engineering': {
      image: '/assets/Portfolio/Full Brand Identity Dayer Enginnering PLC.webp',
      category: 'Engineering',
      title: 'Full Brand Identity - Dayer Engineering PLC',
      description: 'Comprehensive brand identity system including logo design, brand guidelines, and corporate materials for an engineering company. Professional identity that reflects technical expertise and reliability.',
      type: 'Corporate Brand Identity',
      date: '2024',
      client: 'Dayer Engineering PLC',
      challenge: {
        heading: 'The Challenge',
        text: 'Create a comprehensive brand identity for an engineering company that reflects technical expertise, reliability, and professionalism. The identity needed to appeal to both corporate clients and stakeholders while conveying innovation and engineering excellence.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a professional brand identity that combines technical precision with modern design aesthetics. The logo design reflects engineering principles while maintaining visual appeal. The comprehensive brand system includes stationery, corporate materials, and brand guidelines that ensure consistent application across all touchpoints.'
      },
      results: {
        heading: 'The Results',
        text: 'The brand identity successfully established a strong professional presence in the engineering industry. It improved brand recognition and created a cohesive visual system that reflects the company\'s technical expertise and reliability. The new identity has enhanced credibility and appeal to both existing and potential clients.'
      },
      deliverables: ['Logo Design', 'Brand Guidelines', 'Stationery Design', 'Corporate Materials', 'Visual Identity System']
    },
    'zewd-architectural': {
      image: '/assets/Portfolio/Logo Design for Zewd Architectural Designs.webp',
      category: 'Architecture',
      title: 'Logo Office Wall Design - Zewd Architectural Designs',
      description: 'Professional logo office wall design for an architectural firm, featuring wall graphics and environmental graphics that reflect precision, creativity, and modern design principles. The design creates a cohesive brand experience in the office environment.',
      type: 'Environmental Design',
      date: '2024',
      client: 'Zewd Architectural Designs',
      challenge: {
        heading: 'The Challenge',
        text: 'Create a professional logo office wall design for an architectural firm that reflects precision, creativity, and modern design principles. The wall design needed to convey the firm\'s expertise while creating an impactful visual presence in the office environment.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a sophisticated office wall design that combines the firm\'s logo with architectural elements and modern design aesthetics. The wall graphics reflect precision and creativity while maintaining visual appeal. The design works effectively as a large-scale environmental graphic, creating a strong brand presence in the office space.'
      },
      results: {
        heading: 'The Results',
        text: 'The logo office wall design successfully established a strong visual identity in the office environment. It improved brand recognition and created a professional appearance that reflects the firm\'s expertise and commitment to innovative design. The wall design has enhanced the office environment and reinforced brand identity for both employees and visitors.'
      },
      deliverables: ['Office Wall Design', 'Wall Graphics', 'Environmental Graphics', 'Logo Application', 'Installation Guidelines']
    },
    'andegna-signage': {
      image: '/assets/Portfolio/Office Signage For Andegna Furniture.webp',
      category: 'Corporate',
      title: 'Office Signage Design - Andegna Furniture',
      description: 'Professional office signage design including wall graphics and environmental graphics for impactful corporate communication. This signage system creates a cohesive brand experience throughout the office environment.',
      type: 'Environmental Design',
      date: '2024',
      client: 'Andegna Furniture',
      challenge: {
        heading: 'The Challenge',
        text: 'Design a comprehensive signage system for Andegna Furniture that reflects the company\'s brand while enhancing wayfinding and creating a cohesive visual experience throughout the office space.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I created a unified signage system that incorporates the company\'s brand identity while maintaining clear wayfinding functionality. The design includes wall graphics and environmental graphics that work together to create a cohesive brand experience throughout the office environment.'
      },
      results: {
        heading: 'The Results',
        text: 'The signage system successfully enhanced brand presence and professional image throughout the office. It improved wayfinding for visitors and employees, and created a cohesive brand experience that reinforces the company\'s professionalism to clients and stakeholders.'
      },
      deliverables: ['Office Wall Graphics', 'Environmental Graphics', 'Signage Guidelines', 'Installation Specifications']
    },
    'medavail-signage': {
      image: '/assets/Portfolio/Office Signage Medavail-.webp',
      category: 'Healthcare',
      title: 'Office Signage Design - Medavail Pharmaceuticals',
      description: 'Professional office signage design for a pharmaceutical company, creating a cohesive brand experience in the workplace. The signage reflects the company\'s commitment to healthcare excellence.',
      type: 'Environmental Design',
      date: '2024',
      client: 'Medavail Pharmaceuticals',
      challenge: {
        heading: 'The Challenge',
        text: 'Design professional office signage for a pharmaceutical company that reflects the company\'s brand while maintaining a clean, medical-inspired aesthetic. The signage needed to enhance wayfinding and create a professional workplace environment.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I created a professional signage system that incorporates the company\'s brand identity with clean, medical-inspired aesthetics. The design maintains clear wayfinding functionality while creating a cohesive brand experience throughout the office environment.'
      },
      results: {
        heading: 'The Results',
        text: 'The signage system successfully enhanced brand presence and professional image throughout the office. It improved wayfinding and created a cohesive brand experience that reflects the company\'s commitment to healthcare excellence.'
      },
      deliverables: ['Office Signage', 'Wall Graphics', 'Signage Guidelines', 'Installation Specifications']
    },
    'maleda-signage': {
      image: '/assets/Portfolio/Signage for maleda\'.webp',
      category: 'Beverage',
      title: 'Signage Design - Maleda Coffee',
      description: 'Professional signage design for Maleda Coffee, creating a cohesive brand experience in retail and commercial spaces. The signage reflects the brand\'s coffee culture and creates an inviting environment for customers.',
      type: 'Environmental Design',
      date: '2024',
      client: 'Maleda Coffee',
      challenge: {
        heading: 'The Challenge',
        text: 'Design professional signage for Maleda Coffee that reflects the brand\'s coffee culture while creating an inviting retail environment. The signage needed to enhance brand visibility, create wayfinding, and reinforce the brand\'s commitment to quality coffee experiences.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a professional signage system that incorporates the brand\'s visual identity with coffee culture elements. The design maintains clear wayfinding functionality while creating a cohesive brand experience throughout retail and commercial spaces that reflects the brand\'s coffee culture.'
      },
      results: {
        heading: 'The Results',
        text: 'The signage system successfully enhanced brand presence and created an inviting retail environment. It improved wayfinding and brand visibility while creating a cohesive brand experience that reflects Maleda Coffee\'s commitment to quality coffee experiences.'
      },
      deliverables: ['Retail Signage', 'Wall Graphics', 'Signage Guidelines', 'Installation Specifications']
    },
    'barnas-signage': {
      image: '/assets/Portfolio/Barnas signage.webp',
      category: 'Corporate',
      title: 'Logo Signage Design - Barnas',
      description: 'Professional logo signage design for Barnas, featuring wall graphics and environmental graphics that create a cohesive brand experience. The signage enhances brand visibility and creates a professional corporate environment.',
      type: 'Environmental Design',
      date: '2024',
      client: 'Barnas',
      challenge: {
        heading: 'The Challenge',
        text: 'Design professional logo signage for Barnas that creates a cohesive brand experience while maintaining clear wayfinding functionality. The signage needed to enhance brand visibility and create a professional corporate environment that reflects the company\'s identity.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a professional logo signage system that incorporates the company\'s brand identity with wall graphics and environmental graphics. The design maintains clear wayfinding functionality while creating a cohesive brand experience throughout the corporate environment that reflects the company\'s professional identity.'
      },
      results: {
        heading: 'The Results',
        text: 'The logo signage system successfully enhanced brand presence and created a professional corporate environment. It improved wayfinding and brand visibility while creating a cohesive brand experience that reflects Barnas\'s professional identity and commitment to excellence.'
      },
      deliverables: ['Logo Signage', 'Wall Graphics', 'Environmental Graphics', 'Signage Guidelines', 'Installation Specifications']
    },
    'niqat-apparel': {
      image: '/assets/Portfolio/Apparel Design for Niqat Coffee.webp',
      category: 'Coffee',
      title: 'Apparel Design - Niqat Coffee',
      description: 'Branded apparel design for Niqat Coffee, including t-shirts and merchandise that reflect the brand\'s identity and coffee culture. Professional apparel that enhances brand visibility.',
      type: 'Apparel Design',
      date: '2024',
      client: 'Niqat Coffee',
      challenge: {
        heading: 'The Challenge',
        text: 'Create branded apparel designs for Niqat Coffee that reflect the brand\'s identity and coffee culture while being practical for daily wear. The designs needed to enhance brand visibility and appeal to coffee enthusiasts.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed apparel designs that incorporate the brand\'s visual identity with coffee culture elements. The designs are practical for daily wear while maintaining brand consistency and visual appeal. The apparel works effectively across different environments and occasions.'
      },
      results: {
        heading: 'The Results',
        text: 'The apparel designs successfully increased brand visibility and created a connection with coffee enthusiasts. The branded merchandise has become a popular way for customers to show their support for the brand while enhancing brand recognition in the community.'
      },
      deliverables: ['T-Shirt Design', 'Apparel Variations', 'Brand Guidelines', 'Print Specifications']
    },
    'alta-apparel': {
      image: '/assets/Portfolio/Apparel Design for Alta conseling.webp',
      category: 'Healthcare',
      title: 'Apparel Design - Alta Counseling',
      description: 'Professional apparel design for Alta Counseling, featuring branded t-shirts and merchandise that reflect the healthcare organization\'s identity. The designs maintain professionalism while creating brand visibility.',
      type: 'Apparel Design',
      date: '2024',
      client: 'Alta Counseling',
      challenge: {
        heading: 'The Challenge',
        text: 'Create professional apparel designs for Alta Counseling that reflect the healthcare organization\'s identity while being practical for staff and promotional use. The designs needed to maintain professionalism while enhancing brand visibility.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed apparel designs that incorporate the organization\'s visual identity with professional healthcare aesthetics. The designs are practical for staff wear and promotional use while maintaining brand consistency and professional appearance.'
      },
      results: {
        heading: 'The Results',
        text: 'The apparel designs successfully enhanced brand visibility while maintaining a professional appearance. The branded merchandise has become a popular way for staff and supporters to show their connection to the organization while promoting brand recognition.'
      },
      deliverables: ['T-Shirt Design', 'Apparel Variations', 'Brand Guidelines', 'Print Specifications']
    },
    'alta-apparel-2': {
      image: '/assets/Portfolio/Apparel Design for Alta conseling-2.webp',
      category: 'Healthcare',
      title: 'Apparel Design Collection - Alta Counseling',
      description: 'Additional apparel design collection for Alta Counseling, including various merchandise items that maintain brand consistency. The collection expands the organization\'s branded merchandise options.',
      type: 'Apparel Design',
      date: '2024',
      client: 'Alta Counseling',
      challenge: {
        heading: 'The Challenge',
        text: 'Create an expanded apparel design collection for Alta Counseling that offers various merchandise options while maintaining brand consistency. The designs needed to work across different apparel types and applications.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed an expanded apparel design collection with various merchandise options that maintain brand consistency. The designs work effectively across different apparel types and applications, creating a cohesive branded merchandise system.'
      },
      results: {
        heading: 'The Results',
        text: 'The expanded apparel collection successfully provided more options for branded merchandise while maintaining brand consistency. The collection has enhanced brand visibility and created more opportunities for staff and supporters to engage with the brand.'
      },
      deliverables: ['Apparel Collection', 'Multiple Design Variations', 'Brand Guidelines', 'Print Specifications']
    },
    'swan-apparel': {
      image: '/assets/Portfolio/Apparel Design for Swan clothing.webp',
      category: 'Fashion',
      title: 'Apparel Design - Swan Clothing',
      description: 'Fashion-forward apparel design for Swan Clothing, featuring branded t-shirts and merchandise that reflect the fashion brand\'s identity. The designs maintain the brand\'s aesthetic while creating promotional merchandise.',
      type: 'Apparel Design',
      date: '2024',
      client: 'Swan Clothing',
      challenge: {
        heading: 'The Challenge',
        text: 'Create fashion-forward apparel designs for Swan Clothing that reflect the fashion brand\'s identity while being practical for promotional use. The designs needed to maintain the brand\'s aesthetic while enhancing brand visibility.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed apparel designs that incorporate the fashion brand\'s visual identity with modern fashion aesthetics. The designs are practical for promotional use while maintaining brand consistency and visual appeal that reflects the fashion brand\'s style.'
      },
      results: {
        heading: 'The Results',
        text: 'The apparel designs successfully enhanced brand visibility while maintaining the fashion brand\'s aesthetic. The branded merchandise has become a popular promotional tool that reflects the brand\'s style and creates brand recognition.'
      },
      deliverables: ['T-Shirt Design', 'Apparel Variations', 'Brand Guidelines', 'Print Specifications']
    },
    'swan-apparel-2': {
      image: '/assets/Portfolio/Apparel Design for Swan clothing-2.webp',
      category: 'Fashion',
      title: 'Apparel Design Series - Swan Clothing',
      description: 'Additional apparel design series for Swan Clothing, including various merchandise items that maintain brand consistency. The series expands the fashion brand\'s promotional merchandise options.',
      type: 'Apparel Design',
      date: '2024',
      client: 'Swan Clothing',
      challenge: {
        heading: 'The Challenge',
        text: 'Create an additional apparel design series for Swan Clothing that offers various merchandise options while maintaining the fashion brand\'s aesthetic. The designs needed to work across different apparel types.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed an additional apparel design series with various merchandise options that maintain the fashion brand\'s aesthetic. The designs work effectively across different apparel types, creating a cohesive branded merchandise system that reflects the brand\'s style.'
      },
      results: {
        heading: 'The Results',
        text: 'The additional apparel series successfully provided more options for branded merchandise while maintaining the fashion brand\'s aesthetic. The series has enhanced brand visibility and created more promotional opportunities.'
      },
      deliverables: ['Apparel Series', 'Multiple Design Variations', 'Brand Guidelines', 'Print Specifications']
    },
    'swan-apparel-3': {
      image: '/assets/Portfolio/Apparel Design for Swan clothing-3.webp',
      category: 'Fashion',
      title: 'Apparel Design Collection - Swan Clothing',
      description: 'Comprehensive apparel design collection for Swan Clothing, featuring branded merchandise that reflects the fashion brand\'s identity. The collection provides a complete branded merchandise system.',
      type: 'Apparel Design',
      date: '2024',
      client: 'Swan Clothing',
      challenge: {
        heading: 'The Challenge',
        text: 'Create a comprehensive apparel design collection for Swan Clothing that provides a complete branded merchandise system while maintaining the fashion brand\'s aesthetic. The collection needed to work across various merchandise types.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a comprehensive apparel design collection that provides a complete branded merchandise system. The collection maintains the fashion brand\'s aesthetic while working effectively across various merchandise types, creating a cohesive branded merchandise experience.'
      },
      results: {
        heading: 'The Results',
        text: 'The comprehensive apparel collection successfully created a complete branded merchandise system that maintains the fashion brand\'s aesthetic. The collection has enhanced brand visibility and provided a cohesive promotional merchandise experience.'
      },
      deliverables: ['Apparel Collection', 'Complete Merchandise System', 'Brand Guidelines', 'Print Specifications']
    },
    'yat-apparel': {
      image: '/assets/Portfolio/Apparel Design for Yat Construction.webp',
      category: 'Corporate',
      title: 'Apparel Design - Y.A.T Construction PLC',
      description: 'Professional apparel design for Y.A.T Construction PLC, featuring branded t-shirts and merchandise for corporate branding. The designs maintain professionalism while creating brand visibility.',
      type: 'Apparel Design',
      date: '2024',
      client: 'Y.A.T Construction PLC',
      challenge: {
        heading: 'The Challenge',
        text: 'Create professional apparel designs for Y.A.T Construction PLC that reflect the construction company\'s identity while being practical for staff wear and promotional use. The designs needed to maintain professionalism while enhancing brand visibility.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed apparel designs that incorporate the construction company\'s visual identity with professional corporate aesthetics. The designs are practical for staff wear and promotional use while maintaining brand consistency and professional appearance.'
      },
      results: {
        heading: 'The Results',
        text: 'The apparel designs successfully enhanced brand visibility while maintaining a professional appearance. The branded merchandise has become a popular way for staff and supporters to show their connection to the company while promoting brand recognition.'
      },
      deliverables: ['T-Shirt Design', 'Apparel Variations', 'Brand Guidelines', 'Print Specifications']
    },
    'niqat-social': {
      image: '/assets/Portfolio/Social Media Design for niqat coffee.webp',
      category: 'Coffee',
      title: 'Social Media Design - Niqat Coffee',
      description: 'Comprehensive social media design collection including posts, stories, and promotional graphics for engaging online presence. The designs reflect the brand\'s coffee culture and create consistent digital communication.',
      type: 'Social Media Design',
      date: '2024',
      client: 'Niqat Coffee',
      challenge: {
        heading: 'The Challenge',
        text: 'Create a comprehensive social media design collection for Niqat Coffee that maintains brand consistency while engaging the target audience. The designs needed to work across various social media platforms and formats.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a cohesive collection of social media designs that incorporate the brand\'s visual identity with engaging content. The designs work across various platforms and formats, from posts to stories, creating consistent brand communication while maintaining visual appeal.'
      },
      results: {
        heading: 'The Results',
        text: 'The social media design collection successfully enhanced online engagement and brand visibility. It created consistent brand communication across digital platforms and helped the brand connect with coffee enthusiasts through engaging visual content.'
      },
      deliverables: ['Social Media Posts', 'Story Templates', 'Promotional Graphics', 'Content Guidelines']
    },
    'niqat-social-2': {
      image: '/assets/Portfolio/Social Media Design for niqat coffee-2.webp',
      category: 'Coffee',
      title: 'Social Media Design Series - Niqat Coffee',
      description: 'Social media design assets featuring promotional graphics and engaging visual content for digital marketing campaigns. The designs maintain brand consistency while creating compelling content.',
      type: 'Social Media Design',
      date: '2024',
      client: 'Niqat Coffee',
      challenge: {
        heading: 'The Challenge',
        text: 'Create social media design assets for Niqat Coffee that feature promotional graphics and engaging visual content for various digital marketing campaigns.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed social media design assets with promotional graphics and engaging visual content. The designs maintain brand consistency while creating compelling content for different promotional activities.'
      },
      results: {
        heading: 'The Results',
        text: 'The social media assets successfully enhanced digital marketing campaigns and brand visibility. They created engaging visual content that helped connect with coffee enthusiasts and drive campaign performance.'
      },
      deliverables: ['Social Media Posts', 'Promotional Graphics', 'Campaign Assets', 'Content Guidelines']
    },
    'niqat-social-3': {
      image: '/assets/Portfolio/Social Media Design for niqat coffee-3.webp',
      category: 'Coffee',
      title: 'Social Media Design Collection - Niqat Coffee',
      description: 'Comprehensive social media design collection with various formats and styles for consistent brand communication. The designs work across multiple platforms and campaigns.',
      type: 'Social Media Design',
      date: '2024',
      client: 'Niqat Coffee',
      challenge: {
        heading: 'The Challenge',
        text: 'Create a comprehensive social media design collection for Niqat Coffee with various formats and styles that maintain brand consistency across multiple platforms and campaigns.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a comprehensive collection of social media designs with various formats and styles. The designs maintain brand consistency while working effectively across multiple platforms and campaigns.'
      },
      results: {
        heading: 'The Results',
        text: 'The social media design collection successfully created consistent brand communication across multiple platforms. It enhanced brand visibility and engagement while maintaining visual consistency across various campaigns.'
      },
      deliverables: ['Social Media Posts', 'Multiple Formats', 'Campaign Assets', 'Content Guidelines']
    },
    'niqat-social-4': {
      image: '/assets/Portfolio/Social Media Design for niqat coffee-4.webp',
      category: 'Coffee',
      title: 'Social Media Graphics - Niqat Coffee',
      description: 'Professional social media graphics designed for maximum engagement and brand visibility across digital platforms. The graphics create compelling visual content for online campaigns.',
      type: 'Social Media Design',
      date: '2024',
      client: 'Niqat Coffee',
      challenge: {
        heading: 'The Challenge',
        text: 'Create professional social media graphics for Niqat Coffee that are designed for maximum engagement and brand visibility across various digital platforms.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed professional social media graphics that are optimized for maximum engagement and brand visibility. The graphics create compelling visual content that works effectively across various digital platforms.'
      },
      results: {
        heading: 'The Results',
        text: 'The social media graphics successfully enhanced engagement and brand visibility across digital platforms. They created compelling visual content that helped drive campaign performance and connect with the target audience.'
      },
      deliverables: ['Social Media Graphics', 'Engagement-Optimized Designs', 'Platform-Specific Assets', 'Content Guidelines']
    },
    'niqat-social-5': {
      image: '/assets/Portfolio/Social Media Design for niqat coffee-5.webp',
      category: 'Coffee',
      title: 'Social Media Design Assets - Niqat Coffee',
      description: 'Digital marketing assets including social media posts and promotional graphics for online campaigns. The assets enhance brand communication and engagement.',
      type: 'Social Media Design',
      date: '2024',
      client: 'Niqat Coffee',
      challenge: {
        heading: 'The Challenge',
        text: 'Create digital marketing assets for Niqat Coffee including social media posts and promotional graphics that enhance brand communication and engagement for online campaigns.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed digital marketing assets including social media posts and promotional graphics. The assets maintain brand consistency while creating engaging content for various online campaigns.'
      },
      results: {
        heading: 'The Results',
        text: 'The digital marketing assets successfully enhanced brand communication and engagement. They created compelling content for online campaigns that helped drive performance and connect with the target audience.'
      },
      deliverables: ['Social Media Posts', 'Promotional Graphics', 'Campaign Assets', 'Content Guidelines']
    },
    'niqat-social-6': {
      image: '/assets/Portfolio/Social Media Design for niqat coffee-6.webp',
      category: 'Coffee',
      title: 'Social Media Content - Niqat Coffee',
      description: 'Engaging social media content design featuring modern layouts and compelling visuals for digital marketing. The content creates consistent brand communication across platforms.',
      type: 'Social Media Design',
      date: '2024',
      client: 'Niqat Coffee',
      challenge: {
        heading: 'The Challenge',
        text: 'Create engaging social media content for Niqat Coffee featuring modern layouts and compelling visuals that create consistent brand communication across digital platforms.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed engaging social media content with modern layouts and compelling visuals. The content maintains brand consistency while creating engaging visual communication across various digital platforms.'
      },
      results: {
        heading: 'The Results',
        text: 'The social media content successfully created consistent brand communication across digital platforms. It enhanced engagement and brand visibility while maintaining visual consistency and appeal.'
      },
      deliverables: ['Social Media Content', 'Modern Layouts', 'Visual Assets', 'Content Guidelines']
    },
    'niqat-social-7': {
      image: '/assets/Portfolio/Social Media Design for niqat coffee-7.webp',
      category: 'Coffee',
      title: 'Social Media Design Series - Niqat Coffee',
      description: 'Professional social media design series with consistent branding and engaging visual content. The series creates cohesive digital brand communication.',
      type: 'Social Media Design',
      date: '2024',
      client: 'Niqat Coffee',
      challenge: {
        heading: 'The Challenge',
        text: 'Create a professional social media design series for Niqat Coffee with consistent branding and engaging visual content that creates cohesive digital brand communication.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a professional social media design series with consistent branding and engaging visual content. The series creates cohesive digital brand communication while maintaining visual appeal and consistency.'
      },
      results: {
        heading: 'The Results',
        text: 'The social media design series successfully created cohesive digital brand communication. It enhanced brand visibility and engagement while maintaining consistent branding and visual appeal across all content.'
      },
      deliverables: ['Social Media Series', 'Consistent Branding', 'Visual Content', 'Content Guidelines']
    },
    'niqat-social-8': {
      image: '/assets/Portfolio/Social Media Design for niqat coffee-8.webp',
      category: 'Coffee',
      title: 'Social Media Graphics Collection - Niqat Coffee',
      description: 'Comprehensive collection of social media graphics designed for various digital marketing campaigns and promotions. The collection enhances brand visibility and engagement.',
      type: 'Social Media Design',
      date: '2024',
      client: 'Niqat Coffee',
      challenge: {
        heading: 'The Challenge',
        text: 'Create a comprehensive collection of social media graphics for Niqat Coffee designed for various digital marketing campaigns and promotions that enhance brand visibility and engagement.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a comprehensive collection of social media graphics designed for various digital marketing campaigns. The graphics maintain brand consistency while creating engaging content for different promotional activities.'
      },
      results: {
        heading: 'The Results',
        text: 'The social media graphics collection successfully enhanced brand visibility and engagement across various digital marketing campaigns. It created compelling visual content that helped drive campaign performance and connect with the target audience.'
      },
      deliverables: ['Social Media Graphics', 'Campaign Assets', 'Promotional Content', 'Content Guidelines']
    },
    'niqat-social-9': {
      image: '/assets/Portfolio/Social Media Design for niqat coffee-9.webp',
      category: 'Coffee',
      title: 'Social Media Design Assets - Niqat Coffee',
      description: 'Professional social media design assets featuring promotional graphics and engaging visual content. The assets enhance digital brand communication and engagement.',
      type: 'Social Media Design',
      date: '2024',
      client: 'Niqat Coffee',
      challenge: {
        heading: 'The Challenge',
        text: 'Create professional social media design assets for Niqat Coffee featuring promotional graphics and engaging visual content that enhance digital brand communication and engagement.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed professional social media design assets with promotional graphics and engaging visual content. The assets maintain brand consistency while creating compelling content for digital brand communication.'
      },
      results: {
        heading: 'The Results',
        text: 'The social media design assets successfully enhanced digital brand communication and engagement. They created compelling visual content that helped drive performance and connect with the target audience across digital platforms.'
      },
      deliverables: ['Social Media Assets', 'Promotional Graphics', 'Visual Content', 'Content Guidelines']
    },
    'niqat-social-10': {
      image: '/assets/Portfolio/Social Media Design for niqat coffee-10.webp',
      category: 'Coffee',
      title: 'Social Media Content Design - Niqat Coffee',
      description: 'Engaging social media content design with modern aesthetics and compelling visuals for digital engagement. The design creates consistent brand communication across platforms.',
      type: 'Social Media Design',
      date: '2024',
      client: 'Niqat Coffee',
      challenge: {
        heading: 'The Challenge',
        text: 'Create engaging social media content design for Niqat Coffee with modern aesthetics and compelling visuals that create consistent brand communication across digital platforms.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed engaging social media content design with modern aesthetics and compelling visuals. The design maintains brand consistency while creating engaging visual communication across various digital platforms.'
      },
      results: {
        heading: 'The Results',
        text: 'The social media content design successfully created consistent brand communication across digital platforms. It enhanced engagement and brand visibility while maintaining modern aesthetics and visual appeal.'
      },
      deliverables: ['Social Media Content', 'Modern Aesthetics', 'Visual Assets', 'Content Guidelines']
    },
    'niqat-social-11': {
      image: '/assets/Portfolio/Social Media Design for niqat coffee-11.webp',
      category: 'Coffee',
      title: 'Social Media Design - Niqat Coffee',
      description: 'Professional social media design collection for Niqat Coffee, featuring engaging posts and promotional graphics for digital marketing campaigns. The designs maintain brand consistency while creating compelling visual content.',
      type: 'Social Media Design',
      date: '2024',
      client: 'Niqat Coffee',
      challenge: {
        heading: 'The Challenge',
        text: 'Create professional social media designs for Niqat Coffee that engage the target audience while maintaining brand consistency across various digital marketing campaigns and platforms.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a professional collection of social media designs that incorporate the brand\'s visual identity with engaging content. The designs work effectively across various platforms and campaigns, creating consistent brand communication while maintaining visual appeal.'
      },
      results: {
        heading: 'The Results',
        text: 'The social media design collection successfully enhanced digital marketing campaigns and brand visibility. It created engaging visual content that helped connect with coffee enthusiasts and drive campaign performance across digital platforms.'
      },
      deliverables: ['Social Media Posts', 'Promotional Graphics', 'Campaign Assets', 'Content Guidelines']
    },
    'maleda-packaging': {
      image: '/assets/Portfolio/Packaging For Maleda Coffee.webp',
      category: 'Beverage',
      title: 'Product Packaging Design - Maleda Coffee',
      description: 'Premium packaging design for coffee products, combining visual appeal with functional design for retail and distribution. The packaging reflects the brand\'s commitment to quality and Ethiopian coffee heritage.',
      type: 'Packaging Design',
      date: '2024',
      client: 'Maleda Coffee',
      challenge: {
        heading: 'The Challenge',
        text: 'Create premium packaging design for Maleda Coffee that honors Ethiopian coffee heritage while appealing to modern consumers. The packaging needed to be functional for retail and distribution while standing out on shelves.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed premium packaging design that combines traditional Ethiopian coffee culture with modern design aesthetics. The packaging is functional for retail and distribution while creating visual appeal that reflects the brand\'s commitment to quality and heritage.'
      },
      results: {
        heading: 'The Results',
        text: 'The packaging design successfully enhanced product appeal and brand recognition. It created a memorable brand experience that differentiates the product in the market and connects with coffee enthusiasts through authentic storytelling.'
      },
      deliverables: ['Packaging Design', 'Label Design', 'Print Specifications', 'Brand Guidelines']
    },
    'lensa-packaging': {
      image: '/assets/Portfolio/Product Packaging for Lensa Fashion.webp',
      category: 'Fashion',
      title: 'Product Packaging Design - Lensa Fashion',
      description: 'Elegant product packaging design for a fashion brand, creating an unboxing experience that reflects brand quality and style. The packaging enhances the overall brand experience for customers.',
      type: 'Packaging Design',
      date: '2024',
      client: 'Lensa Fashion',
      challenge: {
        heading: 'The Challenge',
        text: 'Create elegant product packaging for Lensa Fashion that reflects brand quality and style while creating a memorable unboxing experience. The packaging needed to be functional and visually appealing.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed elegant packaging design that combines functionality with visual appeal. The design creates a memorable unboxing experience that reflects the brand\'s quality and style, enhancing the overall customer experience.'
      },
      results: {
        heading: 'The Results',
        text: 'The packaging design successfully enhanced the brand experience and customer satisfaction. It created a memorable unboxing experience that reflects brand quality and has become a talking point among customers.'
      },
      deliverables: ['Packaging Design', 'Box Design', 'Print Specifications', 'Brand Guidelines']
    },
    'ace-stainless-1': {
      image: '/assets/Portfolio/Social Media Design For Ace Stainless Still.webp',
      category: 'Manufacturing',
      title: 'Social Media Design - Ace Stainless Steel',
      description: 'Professional social media design collection for a stainless steel manufacturing company, showcasing products and services. The designs create engaging digital communication for the brand.',
      type: 'Social Media Design',
      date: '2024',
      client: 'Ace Stainless Steel',
      challenge: {
        heading: 'The Challenge',
        text: 'Create professional social media designs for Ace Stainless Steel that showcase products and services while maintaining brand consistency. The designs needed to engage the target audience and work across various platforms.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a professional collection of social media designs that showcase the company\'s products and services. The designs maintain brand consistency while creating engaging content that works across various social media platforms.'
      },
      results: {
        heading: 'The Results',
        text: 'The social media design collection successfully enhanced online engagement and brand visibility. It created consistent brand communication and helped showcase the company\'s products and services to the target audience.'
      },
      deliverables: ['Social Media Posts', 'Product Showcases', 'Promotional Graphics', 'Content Guidelines']
    },
    'ace-stainless-2': {
      image: '/assets/Portfolio/Social Media Design For Ace Stainless Still-2.webp',
      category: 'Manufacturing',
      title: 'Social Media Design Collection - Ace Stainless Steel',
      description: 'Additional social media design assets including product showcases and promotional graphics for digital marketing campaigns. The designs enhance brand visibility and engagement.',
      type: 'Social Media Design',
      date: '2024',
      client: 'Ace Stainless Steel',
      challenge: {
        heading: 'The Challenge',
        text: 'Create additional social media design assets for Ace Stainless Steel that showcase products and services while maintaining brand consistency across various digital marketing campaigns.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed additional social media design assets that showcase products and services with consistent branding. The designs work effectively across various digital marketing campaigns and platforms.'
      },
      results: {
        heading: 'The Results',
        text: 'The additional social media assets successfully enhanced digital marketing campaigns and brand visibility. They created consistent brand communication and helped showcase the company\'s products and services effectively.'
      },
      deliverables: ['Social Media Posts', 'Product Showcases', 'Promotional Graphics', 'Campaign Assets']
    },
    'finix-social-1': {
      image: '/assets/Portfolio/Social Media Design For Finix Bet.webp',
      category: 'Digital Marketing',
      title: 'Social Media Design - Finix Bet',
      description: 'Engaging social media design collection for Finix Bet, including posts, stories, and promotional graphics for online engagement. The designs create consistent digital brand communication.',
      type: 'Social Media Design',
      date: '2024',
      client: 'Finix Bet',
      challenge: {
        heading: 'The Challenge',
        text: 'Create engaging social media designs for Finix Bet that maintain brand consistency while engaging the target audience. The designs needed to work across various social media platforms and formats.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed an engaging collection of social media designs that incorporate the brand\'s visual identity with compelling content. The designs work across various platforms and formats, creating consistent brand communication while maintaining visual appeal.'
      },
      results: {
        heading: 'The Results',
        text: 'The social media design collection successfully enhanced online engagement and brand visibility. It created consistent brand communication across digital platforms and helped engage the target audience through compelling visual content.'
      },
      deliverables: ['Social Media Posts', 'Story Templates', 'Promotional Graphics', 'Content Guidelines']
    },
    'finix-social-2': {
      image: '/assets/Portfolio/Social Media Design For Finix Bet-2.webp',
      category: 'Digital Marketing',
      title: 'Social Media Design Series - Finix Bet',
      description: 'Social media design assets featuring promotional graphics and engaging visual content for digital marketing campaigns. The designs enhance brand visibility and engagement.',
      type: 'Social Media Design',
      date: '2024',
      client: 'Finix Bet',
      challenge: {
        heading: 'The Challenge',
        text: 'Create social media design assets for Finix Bet that feature promotional graphics and engaging visual content for various digital marketing campaigns.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed social media design assets with promotional graphics and engaging visual content. The designs maintain brand consistency while creating compelling content for various digital marketing campaigns.'
      },
      results: {
        heading: 'The Results',
        text: 'The social media assets successfully enhanced digital marketing campaigns and brand visibility. They created engaging visual content that helped connect with the target audience and drive campaign performance.'
      },
      deliverables: ['Social Media Posts', 'Promotional Graphics', 'Campaign Assets', 'Content Guidelines']
    },
    'finix-social-3': {
      image: '/assets/Portfolio/Social Media Design For Finix Bet-3.webp',
      category: 'Digital Marketing',
      title: 'Social Media Design Collection - Finix Bet',
      description: 'Comprehensive social media design collection with various formats and styles for consistent brand communication. The designs work across multiple platforms and campaigns.',
      type: 'Social Media Design',
      date: '2024',
      client: 'Finix Bet',
      challenge: {
        heading: 'The Challenge',
        text: 'Create a comprehensive social media design collection for Finix Bet with various formats and styles that maintain brand consistency across multiple platforms and campaigns.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a comprehensive collection of social media designs with various formats and styles. The designs maintain brand consistency while working effectively across multiple platforms and campaigns.'
      },
      results: {
        heading: 'The Results',
        text: 'The social media design collection successfully created consistent brand communication across multiple platforms. It enhanced brand visibility and engagement while maintaining visual consistency across various campaigns.'
      },
      deliverables: ['Social Media Posts', 'Multiple Formats', 'Campaign Assets', 'Content Guidelines']
    },
    'finix-social-4': {
      image: '/assets/Portfolio/Social Media Design For Finix Bet-4.webp',
      category: 'Digital Marketing',
      title: 'Social Media Graphics - Finix Bet',
      description: 'Professional social media graphics designed for maximum engagement and brand visibility across digital platforms. The graphics create compelling visual content for online campaigns.',
      type: 'Social Media Design',
      date: '2024',
      client: 'Finix Bet',
      challenge: {
        heading: 'The Challenge',
        text: 'Create professional social media graphics for Finix Bet that are designed for maximum engagement and brand visibility across various digital platforms.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed professional social media graphics that are optimized for maximum engagement and brand visibility. The graphics create compelling visual content that works effectively across various digital platforms.'
      },
      results: {
        heading: 'The Results',
        text: 'The social media graphics successfully enhanced engagement and brand visibility across digital platforms. They created compelling visual content that helped drive campaign performance and connect with the target audience.'
      },
      deliverables: ['Social Media Graphics', 'Engagement-Optimized Designs', 'Platform-Specific Assets', 'Content Guidelines']
    },
    'finix-social-5': {
      image: '/assets/Portfolio/Social Media Design For Finix Bet-5.webp',
      category: 'Digital Marketing',
      title: 'Social Media Design Assets - Finix Bet',
      description: 'Digital marketing assets including social media posts and promotional graphics for online campaigns. The assets enhance brand communication and engagement.',
      type: 'Social Media Design',
      date: '2024',
      client: 'Finix Bet',
      challenge: {
        heading: 'The Challenge',
        text: 'Create digital marketing assets for Finix Bet including social media posts and promotional graphics that enhance brand communication and engagement for online campaigns.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed digital marketing assets including social media posts and promotional graphics. The assets maintain brand consistency while creating engaging content for various online campaigns.'
      },
      results: {
        heading: 'The Results',
        text: 'The digital marketing assets successfully enhanced brand communication and engagement. They created compelling content for online campaigns that helped drive performance and connect with the target audience.'
      },
      deliverables: ['Social Media Posts', 'Promotional Graphics', 'Campaign Assets', 'Content Guidelines']
    },
    'finix-social-6': {
      image: '/assets/Portfolio/Social Media Design For Finix Bet-6.webp',
      category: 'Digital Marketing',
      title: 'Social Media Content - Finix Bet',
      description: 'Engaging social media content design featuring modern layouts and compelling visuals for digital marketing. The content creates consistent brand communication across platforms.',
      type: 'Social Media Design',
      date: '2024',
      client: 'Finix Bet',
      challenge: {
        heading: 'The Challenge',
        text: 'Create engaging social media content for Finix Bet featuring modern layouts and compelling visuals that create consistent brand communication across digital platforms.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed engaging social media content with modern layouts and compelling visuals. The content maintains brand consistency while creating engaging visual communication across various digital platforms.'
      },
      results: {
        heading: 'The Results',
        text: 'The social media content successfully created consistent brand communication across digital platforms. It enhanced engagement and brand visibility while maintaining visual consistency and appeal.'
      },
      deliverables: ['Social Media Content', 'Modern Layouts', 'Visual Assets', 'Content Guidelines']
    },
    'finix-social-7': {
      image: '/assets/Portfolio/Social Media Design For Finix Bet-7.webp',
      category: 'Digital Marketing',
      title: 'Social Media Design Series - Finix Bet',
      description: 'Professional social media design series with consistent branding and engaging visual content. The series creates cohesive digital brand communication.',
      type: 'Social Media Design',
      date: '2024',
      client: 'Finix Bet',
      challenge: {
        heading: 'The Challenge',
        text: 'Create a professional social media design series for Finix Bet with consistent branding and engaging visual content that creates cohesive digital brand communication.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a professional social media design series with consistent branding and engaging visual content. The series creates cohesive digital brand communication while maintaining visual appeal and consistency.'
      },
      results: {
        heading: 'The Results',
        text: 'The social media design series successfully created cohesive digital brand communication. It enhanced brand visibility and engagement while maintaining consistent branding and visual appeal across all content.'
      },
      deliverables: ['Social Media Series', 'Consistent Branding', 'Visual Content', 'Content Guidelines']
    },
    'finix-social-8': {
      image: '/assets/Portfolio/Social Media Design For Finix Bet-8.webp',
      category: 'Digital Marketing',
      title: 'Social Media Graphics Collection - Finix Bet',
      description: 'Comprehensive collection of social media graphics designed for various digital marketing campaigns and promotions. The collection enhances brand visibility and engagement.',
      type: 'Social Media Design',
      date: '2024',
      client: 'Finix Bet',
      challenge: {
        heading: 'The Challenge',
        text: 'Create a comprehensive collection of social media graphics for Finix Bet designed for various digital marketing campaigns and promotions that enhance brand visibility and engagement.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a comprehensive collection of social media graphics designed for various digital marketing campaigns. The graphics maintain brand consistency while creating engaging content for different promotional activities.'
      },
      results: {
        heading: 'The Results',
        text: 'The social media graphics collection successfully enhanced brand visibility and engagement across various digital marketing campaigns. It created compelling visual content that helped drive campaign performance and connect with the target audience.'
      },
      deliverables: ['Social Media Graphics', 'Campaign Assets', 'Promotional Content', 'Content Guidelines']
    },
    'finix-social-9': {
      image: '/assets/Portfolio/Social Media Design For Finix Bet-9.webp',
      category: 'Digital Marketing',
      title: 'Social Media Design Assets - Finix Bet',
      description: 'Professional social media design assets featuring promotional graphics and engaging visual content. The assets enhance digital brand communication and engagement.',
      type: 'Social Media Design',
      date: '2024',
      client: 'Finix Bet',
      challenge: {
        heading: 'The Challenge',
        text: 'Create professional social media design assets for Finix Bet featuring promotional graphics and engaging visual content that enhance digital brand communication and engagement.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed professional social media design assets with promotional graphics and engaging visual content. The assets maintain brand consistency while creating compelling content for digital brand communication.'
      },
      results: {
        heading: 'The Results',
        text: 'The social media design assets successfully enhanced digital brand communication and engagement. They created compelling visual content that helped drive performance and connect with the target audience across digital platforms.'
      },
      deliverables: ['Social Media Assets', 'Promotional Graphics', 'Visual Content', 'Content Guidelines']
    },
    'finix-social-10': {
      image: '/assets/Portfolio/Social Media Design For Finix Bet-10.webp',
      category: 'Digital Marketing',
      title: 'Social Media Content Design - Finix Bet',
      description: 'Engaging social media content design with modern aesthetics and compelling visuals for digital engagement. The design creates consistent brand communication across platforms.',
      type: 'Social Media Design',
      date: '2024',
      client: 'Finix Bet',
      challenge: {
        heading: 'The Challenge',
        text: 'Create engaging social media content design for Finix Bet with modern aesthetics and compelling visuals that create consistent brand communication across digital platforms.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed engaging social media content design with modern aesthetics and compelling visuals. The design maintains brand consistency while creating engaging visual communication across various digital platforms.'
      },
      results: {
        heading: 'The Results',
        text: 'The social media content design successfully created consistent brand communication across digital platforms. It enhanced engagement and brand visibility while maintaining modern aesthetics and visual appeal.'
      },
      deliverables: ['Social Media Content', 'Modern Aesthetics', 'Visual Assets', 'Content Guidelines']
    },
    'finix-banner-1': {
      image: '/assets/Portfolio/Website Banner For Finix Bet.webp',
      category: 'Digital Marketing',
      title: 'Website Banner Design - Finix Bet',
      description: 'Professional website banner design for Finix Bet, optimized for web display and digital marketing campaigns. The banner creates engaging visual communication for online platforms.',
      type: 'Web Design',
      date: '2024',
      client: 'Finix Bet',
      challenge: {
        heading: 'The Challenge',
        text: 'Create professional website banner design for Finix Bet that is optimized for web display and digital marketing campaigns while maintaining brand consistency and visual appeal.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed professional website banner design that is optimized for web display and various screen sizes. The banner maintains brand consistency while creating engaging visual communication for digital marketing campaigns.'
      },
      results: {
        heading: 'The Results',
        text: 'The website banner design successfully enhanced online brand visibility and engagement. It created compelling visual communication for digital marketing campaigns and helped drive performance across web platforms.'
      },
      deliverables: ['Website Banner', 'Responsive Design', 'Digital Assets', 'Brand Guidelines']
    },
    'finix-banner-2': {
      image: '/assets/Portfolio/Website Banner For Finix Bet-2.webp',
      category: 'Digital Marketing',
      title: 'Website Banner Collection - Finix Bet',
      description: 'Website banner design featuring modern layouts and engaging visuals for effective online presence. The banner enhances brand communication across digital platforms.',
      type: 'Web Design',
      date: '2024',
      client: 'Finix Bet',
      challenge: {
        heading: 'The Challenge',
        text: 'Create website banner design for Finix Bet featuring modern layouts and engaging visuals that enhance brand communication and create effective online presence.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed website banner design with modern layouts and engaging visuals. The banner maintains brand consistency while creating effective visual communication for online platforms.'
      },
      results: {
        heading: 'The Results',
        text: 'The website banner design successfully enhanced brand communication and online presence. It created engaging visual content that helped drive performance and connect with the target audience across digital platforms.'
      },
      deliverables: ['Website Banner', 'Modern Layouts', 'Digital Assets', 'Brand Guidelines']
    },
    'finix-banner-3': {
      image: '/assets/Portfolio/Website Banner For Finix Bet-3.webp',
      category: 'Digital Marketing',
      title: 'Web Banner Design - Finix Bet',
      description: 'Professional web banner design optimized for various screen sizes and digital platforms. The banner creates consistent brand communication across web environments.',
      type: 'Web Design',
      date: '2024',
      client: 'Finix Bet',
      challenge: {
        heading: 'The Challenge',
        text: 'Create professional web banner design for Finix Bet that is optimized for various screen sizes and digital platforms while maintaining brand consistency and visual appeal.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed professional web banner design that is optimized for various screen sizes and digital platforms. The banner maintains brand consistency while creating engaging visual communication across different web environments.'
      },
      results: {
        heading: 'The Results',
        text: 'The web banner design successfully enhanced brand communication across various screen sizes and digital platforms. It created consistent visual communication that helped drive performance and engagement.'
      },
      deliverables: ['Web Banner', 'Responsive Design', 'Platform Optimization', 'Brand Guidelines']
    },
    'finix-banner-4': {
      image: '/assets/Portfolio/Website Banner For Finix Bet-4.webp',
      category: 'Digital Marketing',
      title: 'Website Banner Series - Finix Bet',
      description: 'Comprehensive website banner series designed for consistent brand communication across digital platforms. The series enhances online brand visibility and engagement.',
      type: 'Web Design',
      date: '2024',
      client: 'Finix Bet',
      challenge: {
        heading: 'The Challenge',
        text: 'Create comprehensive website banner series for Finix Bet designed for consistent brand communication across digital platforms that enhance online brand visibility and engagement.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed comprehensive website banner series with consistent branding and engaging visuals. The series creates cohesive brand communication across various digital platforms while maintaining visual appeal.'
      },
      results: {
        heading: 'The Results',
        text: 'The website banner series successfully created consistent brand communication across digital platforms. It enhanced online brand visibility and engagement while maintaining visual consistency and appeal.'
      },
      deliverables: ['Banner Series', 'Consistent Branding', 'Digital Assets', 'Brand Guidelines']
    },
    'finix-banner-5': {
      image: '/assets/Portfolio/Website Banner For Finix Bet-5.webp',
      category: 'Digital Marketing',
      title: 'Web Banner Assets - Finix Bet',
      description: 'Professional web banner assets featuring modern design and engaging visuals for digital marketing. The assets enhance brand communication across online platforms.',
      type: 'Web Design',
      date: '2024',
      client: 'Finix Bet',
      challenge: {
        heading: 'The Challenge',
        text: 'Create professional web banner assets for Finix Bet featuring modern design and engaging visuals that enhance brand communication across online platforms for digital marketing.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed professional web banner assets with modern design and engaging visuals. The assets maintain brand consistency while creating compelling visual communication for digital marketing across online platforms.'
      },
      results: {
        heading: 'The Results',
        text: 'The web banner assets successfully enhanced brand communication across online platforms. They created compelling visual content for digital marketing that helped drive performance and connect with the target audience.'
      },
      deliverables: ['Web Banner Assets', 'Modern Design', 'Digital Marketing Assets', 'Brand Guidelines']
    },
    'finix-banner-6': {
      image: '/assets/Portfolio/Website Banner For Finix Bet-6.webp',
      category: 'Digital Marketing',
      title: 'Website Banner Design - Finix Bet',
      description: 'Engaging website banner design with compelling visuals and clear messaging for online campaigns. The banner enhances brand visibility and engagement.',
      type: 'Web Design',
      date: '2024',
      client: 'Finix Bet',
      challenge: {
        heading: 'The Challenge',
        text: 'Create engaging website banner design for Finix Bet with compelling visuals and clear messaging that enhance brand visibility and engagement for online campaigns.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed engaging website banner design with compelling visuals and clear messaging. The banner maintains brand consistency while creating effective visual communication for online campaigns.'
      },
      results: {
        heading: 'The Results',
        text: 'The website banner design successfully enhanced brand visibility and engagement for online campaigns. It created compelling visual content that helped drive performance and connect with the target audience.'
      },
      deliverables: ['Website Banner', 'Compelling Visuals', 'Campaign Assets', 'Brand Guidelines']
    },
    'finix-banner-7': {
      image: '/assets/Portfolio/Website Banner For Finix Bet-7.webp',
      category: 'Digital Marketing',
      title: 'Web Banner Collection - Finix Bet',
      description: 'Professional web banner collection designed for various digital marketing campaigns and promotions. The collection enhances brand communication and engagement.',
      type: 'Web Design',
      date: '2024',
      client: 'Finix Bet',
      challenge: {
        heading: 'The Challenge',
        text: 'Create professional web banner collection for Finix Bet designed for various digital marketing campaigns and promotions that enhance brand communication and engagement.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed professional web banner collection designed for various digital marketing campaigns. The banners maintain brand consistency while creating engaging visual content for different promotional activities.'
      },
      results: {
        heading: 'The Results',
        text: 'The web banner collection successfully enhanced brand communication and engagement across various digital marketing campaigns. It created compelling visual content that helped drive performance and connect with the target audience.'
      },
      deliverables: ['Web Banner Collection', 'Campaign Assets', 'Promotional Content', 'Brand Guidelines']
    },
    'finix-banner-8': {
      image: '/assets/Portfolio/Website Banner For Finix Bet-8.webp',
      category: 'Digital Marketing',
      title: 'Website Banner Series - Finix Bet',
      description: 'Comprehensive website banner series with consistent branding and engaging visual content. The series creates cohesive digital brand communication.',
      type: 'Web Design',
      date: '2024',
      client: 'Finix Bet',
      challenge: {
        heading: 'The Challenge',
        text: 'Create comprehensive website banner series for Finix Bet with consistent branding and engaging visual content that creates cohesive digital brand communication.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed comprehensive website banner series with consistent branding and engaging visual content. The series creates cohesive digital brand communication while maintaining visual appeal and consistency.'
      },
      results: {
        heading: 'The Results',
        text: 'The website banner series successfully created cohesive digital brand communication. It enhanced brand visibility and engagement while maintaining consistent branding and visual appeal across all banners.'
      },
      deliverables: ['Banner Series', 'Consistent Branding', 'Visual Content', 'Brand Guidelines']
    },
    'finix-banner-9': {
      image: '/assets/Portfolio/Website Banner For Finix Bet-9.webp',
      category: 'Digital Marketing',
      title: 'Web Banner Design Assets - Finix Bet',
      description: 'Professional web banner design assets optimized for various screen sizes and digital platforms. The assets enhance brand communication across web environments.',
      type: 'Web Design',
      date: '2024',
      client: 'Finix Bet',
      challenge: {
        heading: 'The Challenge',
        text: 'Create professional web banner design assets for Finix Bet that are optimized for various screen sizes and digital platforms while enhancing brand communication across web environments.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed professional web banner design assets that are optimized for various screen sizes and digital platforms. The assets maintain brand consistency while creating engaging visual communication across different web environments.'
      },
      results: {
        heading: 'The Results',
        text: 'The web banner design assets successfully enhanced brand communication across various screen sizes and digital platforms. They created consistent visual communication that helped drive performance and engagement.'
      },
      deliverables: ['Web Banner Assets', 'Responsive Design', 'Platform Optimization', 'Brand Guidelines']
    },
    'finix-banner-10': {
      image: '/assets/Portfolio/Website Banner For Finix Bet-10.webp',
      category: 'Digital Marketing',
      title: 'Website Banner Collection - Finix Bet',
      description: 'Engaging website banner collection featuring modern design and compelling visuals for digital marketing. The collection enhances brand visibility and engagement.',
      type: 'Web Design',
      date: '2024',
      client: 'Finix Bet',
      challenge: {
        heading: 'The Challenge',
        text: 'Create engaging website banner collection for Finix Bet featuring modern design and compelling visuals that enhance brand visibility and engagement for digital marketing.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed engaging website banner collection with modern design and compelling visuals. The collection maintains brand consistency while creating effective visual communication for digital marketing campaigns.'
      },
      results: {
        heading: 'The Results',
        text: 'The website banner collection successfully enhanced brand visibility and engagement for digital marketing. It created compelling visual content that helped drive performance and connect with the target audience across digital platforms.'
      },
      deliverables: ['Banner Collection', 'Modern Design', 'Digital Marketing Assets', 'Brand Guidelines']
    },
    'havana-plc': {
      image: '/assets/Portfolio/Ui Ux Design for Havana Plc.webp',
      category: 'Corporate',
      title: 'UI/UX Design - Havana PLC',
      description: 'Complete UI/UX design solution including user research, wireframing, prototyping, and polished interface design for a corporate platform. The design creates an intuitive user experience that engages and converts.',
      type: 'UI/UX Design',
      date: '2024',
      client: 'Havana PLC',
      challenge: {
        heading: 'The Challenge',
        text: 'Create a complete UI/UX design solution for Havana PLC that provides an intuitive user experience while meeting corporate requirements. The design needed to engage users and facilitate conversions while maintaining professional aesthetics.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a complete UI/UX design solution through user research, wireframing, and prototyping. The design creates an intuitive user experience with polished interface design that engages users and facilitates conversions while maintaining professional corporate aesthetics.'
      },
      results: {
        heading: 'The Results',
        text: 'The UI/UX design successfully created an intuitive user experience that engages users and facilitates conversions. It improved user satisfaction and created a professional platform that meets corporate requirements while providing exceptional user experience.'
      },
      deliverables: ['User Research', 'Wireframes', 'Prototypes', 'Interface Design', 'Design System', 'Usability Testing']
    },
    'blu-hart-karaoke': {
      image: '/assets/Portfolio/karaoke event social media.webp',
      category: 'Event Marketing',
      title: 'Karaoke Event Social Media - Blu Hart',
      description: 'Social media design collection for a karaoke event, featuring engaging posts and promotional graphics to drive event attendance and engagement. The designs create excitement and encourage participation in the event.',
      type: 'Social Media Design',
      date: '2024',
      client: 'Blu Hart',
      challenge: {
        heading: 'The Challenge',
        text: 'Create engaging social media designs for a karaoke event that capture attention and drive event attendance. The designs needed to reflect the fun and energetic nature of the event while effectively communicating event details and encouraging participation.'
      },
      solution: {
        heading: 'The Solution',
        text: 'I developed a vibrant social media design collection that captures the excitement and energy of a karaoke event. The designs feature engaging visuals, clear event information, and compelling calls-to-action. The collection works across various social media platforms to maximize reach and engagement.'
      },
      results: {
        heading: 'The Results',
        text: 'The social media design collection successfully enhanced event visibility and engagement. It created excitement around the event and helped drive attendance through compelling visual content. The designs effectively communicated event details and encouraged participation from the target audience.'
      },
      deliverables: ['Social Media Posts', 'Event Promotional Graphics', 'Story Templates', 'Content Guidelines']
    },
    'art-direction-1': {
      image: '/assets/Portfolio/Art Direction.webp',
      category: 'Art Direction · Visual Guidance',
      title: 'Art Direction & Visual Guidance - Project 1',
      description: 'Comprehensive art direction and visual guidance for product presentation, photography, and creative assets. This project involved developing a cohesive visual language across multiple touchpoints, ensuring brand consistency and high-quality execution. The art direction encompassed styling, composition, color palette selection, and overall aesthetic direction for product photography and marketing materials.',
      type: 'Art Direction',
      date: '2024',
      client: 'Various Clients',
      deliverables: ['Visual Style Guide', 'Photography Direction', 'Color Palette', 'Composition Guidelines', 'Brand Consistency Guidelines']
    },
    'art-direction-2': {
      image: '/assets/Portfolio/Art Direction-1 copy.webp',
      category: 'Art Direction · Visual Guidance',
      title: 'Art Direction & Visual Guidance - Project 2',
      description: 'Professional art direction and visual guidance for creative campaigns and brand storytelling. This project focused on establishing visual narratives that align with brand identity, including direction for photography shoots, video production, and digital content creation. The guidance ensured all visual elements work harmoniously to communicate the brand message effectively.',
      type: 'Art Direction',
      date: '2024',
      client: 'Various Clients',
      deliverables: ['Visual Narrative Guide', 'Photography Direction', 'Video Production Guidelines', 'Digital Content Standards', 'Brand Storytelling Framework']
    },
    'art-direction-3': {
      image: '/assets/Portfolio/Art Direction-2 copy.webp',
      category: 'Art Direction · Visual Guidance',
      title: 'Art Direction & Visual Guidance - Project 3',
      description: 'Strategic art direction for product launches and marketing initiatives. This project involved creating comprehensive visual guidelines for product photography, including lighting, composition, background selection, and styling direction. The art direction ensured consistent visual quality across all product presentations and marketing channels.',
      type: 'Art Direction',
      date: '2024',
      client: 'Various Clients',
      deliverables: ['Product Photography Guidelines', 'Lighting Specifications', 'Composition Standards', 'Styling Direction', 'Marketing Visual Standards']
    },
    'art-direction-4': {
      image: '/assets/Portfolio/Art Direction-3 copy.webp',
      category: 'Art Direction · Visual Guidance',
      title: 'Art Direction & Visual Guidance - Project 4',
      description: 'Comprehensive art direction for brand campaigns and visual communication. This project encompassed developing creative concepts, visual style guides, and direction for photography and videography teams. The guidance ensured all creative assets maintain brand integrity while achieving compelling visual storytelling that resonates with target audiences.',
      type: 'Art Direction',
      date: '2024',
      client: 'Various Clients',
      deliverables: ['Creative Concept Development', 'Visual Style Guide', 'Photography Direction', 'Videography Guidelines', 'Brand Campaign Standards']
    },
    'art-direction-5': {
      image: '/assets/Portfolio/Art Direction-4 copy.webp',
      category: 'Art Direction · Visual Guidance',
      title: 'Art Direction & Visual Guidance - Project 5',
      description: 'Professional art direction for digital and print marketing materials. This project involved establishing visual direction for social media content, advertising campaigns, and promotional materials. The art direction included color palette selection, typography guidance, layout composition, and overall aesthetic direction to ensure cohesive brand presentation across all platforms.',
      type: 'Art Direction',
      date: '2024',
      client: 'Various Clients',
      deliverables: ['Digital Marketing Guidelines', 'Print Design Standards', 'Social Media Visual Direction', 'Typography Guidelines', 'Color Palette Specifications']
    },
    'art-direction-6': {
      image: '/assets/Portfolio/Art Direction-5 copy.webp',
      category: 'Art Direction · Visual Guidance',
      title: 'Art Direction & Visual Guidance - Project 6',
      description: 'Strategic art direction for brand identity and visual systems. This project focused on creating comprehensive visual guidelines that extend beyond logo design to encompass photography style, illustration direction, and overall creative execution. The art direction ensured all brand touchpoints maintain visual consistency and brand alignment.',
      type: 'Art Direction',
      date: '2024',
      client: 'Various Clients',
      deliverables: ['Brand Visual System', 'Photography Style Guide', 'Illustration Direction', 'Creative Execution Standards', 'Brand Consistency Framework']
    },
    'art-direction-7': {
      image: '/assets/Portfolio/Art Direction-6 copy.webp',
      category: 'Art Direction · Visual Guidance',
      title: 'Art Direction & Visual Guidance - Project 7',
      description: 'Comprehensive art direction for creative projects and visual campaigns. This project involved developing visual concepts, directing photography sessions, and providing guidance for post-production processes. The art direction ensured high-quality visual outcomes that align with brand values and effectively communicate the intended message to target audiences.',
      type: 'Art Direction',
      date: '2024',
      client: 'Various Clients',
      deliverables: ['Visual Concept Development', 'Photography Session Direction', 'Post-Production Guidelines', 'Quality Standards', 'Brand Alignment Framework']
    },
    'art-direction-8': {
      image: '/assets/Portfolio/Art Direction-7 copy.webp',
      category: 'Art Direction · Visual Guidance',
      title: 'Art Direction & Visual Guidance - Project 8',
      description: 'Professional art direction for product photography and visual content creation. This project encompassed styling direction, composition guidelines, lighting specifications, and overall aesthetic direction for product shoots. The art direction ensured consistent visual quality and brand alignment across all product imagery used in marketing and e-commerce platforms.',
      type: 'Art Direction',
      date: '2024',
      client: 'Various Clients',
      deliverables: ['Product Photography Direction', 'Styling Guidelines', 'Composition Standards', 'Lighting Specifications', 'E-commerce Visual Standards']
    },
    'art-direction-9': {
      image: '/assets/Portfolio/Art Direction-8 copy.webp',
      category: 'Art Direction · Visual Guidance',
      title: 'Art Direction & Visual Guidance - Project 9',
      description: 'Strategic art direction for brand campaigns and visual storytelling initiatives. This project involved creating comprehensive visual guidelines, directing creative teams, and ensuring brand consistency across all visual touchpoints. The art direction encompassed photography direction, video production guidance, and digital content creation to deliver cohesive and impactful brand experiences.',
      type: 'Art Direction',
      date: '2024',
      client: 'Various Clients',
      deliverables: ['Brand Campaign Guidelines', 'Creative Team Direction', 'Photography Direction', 'Video Production Standards', 'Digital Content Framework']
    }
  };

  const previousFocusRef = React.useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && portfolioModal.isOpen) {
        closePortfolioModal();
      }
    };

    const handlePopState = () => {
      if (portfolioModal.isOpen) {
        closePortfolioModal();
      }
    };

    if (portfolioModal.isOpen) {
      // Store the previously focused element
      previousFocusRef.current = document.activeElement;
      
      // Focus the modal
      if (modalRef.current) {
        modalRef.current.focus();
      }
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      window.history.pushState({ modal: 'portfolio' }, '');
      window.addEventListener('popstate', handlePopState);
    } else {
      // Restore body scroll
      document.body.style.overflow = '';
      
      // Restore focus to previously focused element
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('popstate', handlePopState);
      document.body.style.overflow = '';
    };
  }, [portfolioModal.isOpen, closePortfolioModal]);

  if (!portfolioModal.isOpen || !portfolioModal.projectId) return null;

  const project = projectData[portfolioModal.projectId];
  if (!project) return null;

  return (
    <div 
      ref={modalRef}
      className={`portfolio-modal ${portfolioModal.isOpen ? 'active' : ''}`}
      role="dialog"
      aria-labelledby="portfolioModalTitle"
      aria-describedby="portfolioModalCategory"
      aria-modal="true"
      tabIndex={-1}
      aria-live="polite"
    >
      <div className="modal-overlay" onClick={closePortfolioModal}></div>
      <div className="portfolio-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="portfolio-modal-close" aria-label="Close modal" onClick={closePortfolioModal}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="portfolio-modal-content">
          <div className="portfolio-modal-header">
            <div 
              className="portfolio-modal-image-wrapper"
              onClick={() => {
                const images = [{ src: `${process.env.PUBLIC_URL || ''}${project.image}`, alt: project.title }];
                setLightboxImages(images);
                setLightboxOpen(true);
              }}
            >
              <img 
                id="portfolioModalImage"
                src={`${process.env.PUBLIC_URL || ''}${project.image}`} 
                alt={`${project.title} - ${project.category} project by Bereket Fikre. ${project.description}`} 
                className="portfolio-modal-image"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 90vw"
              />
              <div className="image-zoom-hint">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                  <line x1="11" y1="8" x2="11" y2="14"/>
                  <line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
                <span>Click to view full size</span>
              </div>
            </div>
            <div className="portfolio-modal-header-content">
              <span id="portfolioModalCategory" className="portfolio-modal-category">{project.category}</span>
              <h2 id="portfolioModalTitle" className="portfolio-modal-title">{project.title}</h2>
              <div className="portfolio-modal-meta">
                <div className="portfolio-meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span>{project.date}</span>
                </div>
                <div className="portfolio-meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span>{project.client}</span>
                </div>
                <div className="portfolio-meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                  <span>{project.type}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="portfolio-modal-body">
            <div className="portfolio-modal-intro">
              <p className="portfolio-modal-description">{project.description}</p>
            </div>
            <div className="portfolio-modal-article">
              {project.challenge && (
                <div className="portfolio-article-section">
                  <div className="portfolio-section-header">
                    <div className="portfolio-section-icon challenge-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                    </div>
                    <h3 className="portfolio-section-heading">{project.challenge.heading}</h3>
                  </div>
                  <p className="portfolio-section-text">{project.challenge.text}</p>
                </div>
              )}
              {project.solution && (
                <div className="portfolio-article-section">
                  <div className="portfolio-section-header">
                    <div className="portfolio-section-icon solution-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <h3 className="portfolio-section-heading">{project.solution.heading}</h3>
                  </div>
                  <p className="portfolio-section-text">{project.solution.text}</p>
                </div>
              )}
              {project.results && (
                <div className="portfolio-article-section">
                  <div className="portfolio-section-header">
                    <div className="portfolio-section-icon results-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                      </svg>
                    </div>
                    <h3 className="portfolio-section-heading">{project.results.heading}</h3>
                  </div>
                  <p className="portfolio-section-text">{project.results.text}</p>
                </div>
              )}
            </div>
            {project.deliverables && project.deliverables.length > 0 && (
              <div className="portfolio-modal-deliverables">
                <h3 className="portfolio-deliverables-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                  Project Deliverables
                </h3>
                <ul className="portfolio-deliverables-list">
                  {project.deliverables.map((deliverable, index) => (
                    <li key={index} className="portfolio-deliverable-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span>{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      {portfolioModal?.projectId && (
        <LightboxGallery
          images={lightboxImages}
          currentIndex={0}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          projectTitle={projectData[portfolioModal.projectId]?.title}
        />
      )}
    </div>
  );
};

export default PortfolioModal;


