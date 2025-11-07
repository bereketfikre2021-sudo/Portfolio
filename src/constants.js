// Shared constants used across components
import { ArrowRight, Mail, Phone, ExternalLink, Palette, Linkedin, Github, Dribbble, ChevronUp, ChevronDown, Eye, X, Send, MapPin, Monitor, Smartphone, Megaphone, Paintbrush, FileText, Layers, Target, Building, LayoutGrid, Quote, Settings, PenTool, Play, MessageSquare, Rocket, MessageCircle } from "lucide-react";
import React from "react";

// Custom Behance Logo Icon Component
const BehanceIcon = React.forwardRef(({ className, ...props }, ref) => (
  <svg
    ref={ref}
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.859h-6.465v-14.859h6.465c3.752 0 5.738 2.739 5.738 7.497 0 4.76-1.98 7.362-5.738 7.362zm-3.008-13.03h1.953c2.06 0 3.291.861 3.291 3.138 0 2.52-1.241 3.097-3.281 3.097h-1.963v-6.235z"/>
  </svg>
));
BehanceIcon.displayName = "BehanceIcon";

// Custom Upwork Logo Icon Component
const UpworkIcon = React.forwardRef(({ className, ...props }, ref) => (
  <svg
    ref={ref}
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c0 1.406-1.14 2.546-2.547 2.546-1.405 0-2.543-1.14-2.543-2.546V3.392H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
  </svg>
));
UpworkIcon.displayName = "UpworkIcon";

// Logo image path
export const logoImg = '/img/Logo.webp';

// Image paths for deployment
export const IMAGES = {
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

export const PROFILE = {
  name: "Bereket Fikre",
  title: "Graphic Designer, Brand Builder & Design Educator",
  email: "bereketfikre2021@gmail.com",
  phone: "+251 923 988 838",
  location: "Addis Ababa, Ethiopia",
  socials: [
    { label: "Behance", href: "https://www.behance.net/bereketfikre", icon: BehanceIcon },
    { label: "Dribbble", href: "https://dribbble.com/bereket-fikre", icon: Dribbble },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/bereket-fikre-graphic-designer", icon: Linkedin },
    { label: "GitHub", href: "https://github.com/bereketfikre2021-sudo", icon: Github },
    { label: "Freelancer", href: "https://www.freelancer.com/u/bereketfikre", icon: ExternalLink },
    { label: "Upwork", href: "https://www.upwork.com/freelancers/~019189891a0638d811?mp_source=share", icon: UpworkIcon },
  ],
};

export const SERVICES = [
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

export const PROJECTS = [
  {
    id: "p1",
    title: "Brand Identity - Swan Clothing",
    role: "Brand Identity · Fashion",
    thumb: IMAGES.swanClothing,
    images: [IMAGES.swanClothing],
    summary: "Complete brand identity package including logo design, product packaging mockups, and comprehensive brand guidelines for a modern fashion brand.",
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
    images: [IMAGES.finix],
    summary: "Comprehensive web asset collection including website banners, digital marketing materials, and promotional graphics for engaging online presence.",
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
    images: [IMAGES.maledaCoffee],
    summary: "Creative product advertisement design featuring coffee cup photography, packaging design, and compelling brand visuals for e-commerce marketing.",
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
    images: [IMAGES.andegna],
    summary: "Professional signage design including office wall graphics, roll-up banner displays, and environmental graphics for impactful corporate communication.",
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
    images: [IMAGES.yatConstruction],
    summary: "Complete logo rebranding and stationery design including professional letterheads, business cards, envelopes, and folders for cohesive corporate identity with modern brand transformation.",
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
    images: [IMAGES.alta],
    summary: "Complete company logo rebranding including full stationery design, roll-up banners, and website banner. Comprehensive brand identity overhaul with modern design elements and cohesive visual system.",
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
    images: [IMAGES.medavail],
    summary: "Complete company logo rebranding including office signage, stationery design, and social media templates. Comprehensive brand identity transformation with modern design elements and cohesive visual system for pharmaceutical company.",
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
    images: [IMAGES.andegnaTshirt],
    summary: "Branded t-shirt design for Andegna Furniture's delivery team, created to reflect professionalism, brand consistency, and day-to-day wearability. Corporate apparel design that enhances brand visibility while maintaining comfort and functionality for delivery personnel.",
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
    images: [IMAGES.niqatMenu],
    summary: "Complete cafe menu design including trifold layout and modern typography. Professional menu design that enhances customer experience with elegant print presentation and clear visual hierarchy.",
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
    images: [IMAGES.rollupBanners],
    summary: "Professional rollup banner designs for various companies, featuring modern layouts, compelling visuals, and brand-consistent messaging. High-quality print-ready designs that effectively communicate company information and enhance brand visibility at events and exhibitions.",
    tags: ["Banners", "Print Design", "Branding", "Events"],
    link: "#",
    description: "🎪 The rollup banner collection became a portable branding revolution that transformed trade shows, conferences, and events into powerful brand experiences. This wasn't just banner design—it was a complete visual communication system that makes every company stand out in crowded exhibition halls. I crafted a diverse portfolio of professional banners that speak the unique language of each brand while maintaining the highest standards of print quality and visual impact. Every design was engineered to capture attention from across the room while delivering clear, compelling messages that drive engagement and business results.",
    challenges: "🎯 The ultimate event marketing challenge: How do you create banners that work for different industries while maintaining design excellence? How do you ensure readability and impact in busy, noisy exhibition environments? The challenge was designing for companies with vastly different brand personalities while creating a cohesive portfolio that showcases versatility and professional expertise.",
    solutions: "🚀 I engineered a flexible design system that adapts to any brand: a modular layout approach that works across industries, a typography hierarchy that ensures readability from any distance, and a color strategy that maximizes impact while maintaining brand consistency. The result? A banner collection that doesn't just display information—it creates memorable brand experiences that drive business results.",
    results: "🏆 The transformation was absolutely spectacular: 100% client satisfaction across all banner projects, 40% increase in event booth traffic for clients, and a portfolio that became a showcase of professional versatility. These companies didn't just get banners—they got portable brand ambassadors that work tirelessly at every event to attract attention and drive business growth."
  },
];

export const TESTIMONIALS = [
  {
    quote: "Working with Bereket Fikre was a game-changer for our non-profit. He created compelling visuals that helped us double donations during our annual campaign. Passionate and mission-aligned!",
    author: "Gedyon Megersa",
    role: "Non-Profit Director",
    avatar: IMAGES.gedy,
  },
  {
    quote: "From event posters to digital ads, Bereket Fikre made our product launch unforgettable. His designs grabbed attention and drove ticket sales. Will definitely work with him again!",
    author: "Dagmawi Yeshiwas",
    role: "Creative Director",
    avatar: IMAGES.dag,
  },
  {
    quote: "Professional, quick, and always on point. He captured exactly what we envisioned and more! His creative solutions and attention to detail helped us stand out in a crowded market.",
    author: "Abenezer A",
    role: "Digital Marketer",
    avatar: IMAGES.abenezer,
  },
  {
    quote: "As a small business, we needed affordable yet high-quality designs. Bereket Fikre delivered stunning flyers and social media graphics that boosted our local visibility. Professional and budget-friendly!",
    author: "Kassaye Getachew",
    role: "Business Owner",
    avatar: IMAGES.kass,
  },
  {
    quote: "We hired Bereket Fikre to revamp our corporate branding, and the results exceeded expectations. His strategic approach and attention to detail gave us a cohesive identity across all platforms. A+ service!",
    author: "Micky",
    role: "Digital Artist",
    avatar: IMAGES.miko,
  },
  {
    quote: "Bereket understood my personal brand instantly and created a logo that reflects my values. The process was collaborative, and the result was uniquely 'me.' Exceptional talent! Highly recommended!",
    author: "Hayleyesus",
    role: "Web Developer",
    avatar: IMAGES.hayle,
  },
];

export const VIDEO_TESTIMONIALS = [
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

export const fadeInUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

