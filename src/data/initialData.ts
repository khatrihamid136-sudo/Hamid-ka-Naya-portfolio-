import { PortfolioSiteData } from '../types/portfolio';
import { initialProjects } from './projectsData';

export const initialPortfolioData: PortfolioSiteData = {
  hero: {
    nameFirst: "Muhammad",
    nameLast: "Hamid",
    roleBadge: "Graphic Designer & Brand Identity Designer",
    clientFocusBadge: "International Client Focus",
    headlineQuote: "\"Sculpting distinctive brand identities and high-impact visual systems that elevate ambitious global brands.\"",
    bioParagraph: "Partnering with founders, creative directors, and ambitious enterprises worldwide to architect timeless brand identities, shelf-commanding packaging, and high-conversion digital design systems.",
    primaryCta: "View My Work ↓",
    secondaryCta: "Let's Work Together ↗",
    quickTags: [
      "Brand Identity Systems",
      "Packaging & Labels",
      "Advertising Collateral",
      "Editorial & Print",
      "Social & Performance Creative",
      "YouTube & Content Graphics"
    ]
  },
  metrics: [
    {
      id: "metric-1",
      value: "Projects Completed •",
      label: "",
      subtext: "Delivered for brands & creators across 15+ countries"
    },
    {
      id: "metric-2",
      value: "40+",
      label: "Happy Clients •",
      subtext: "Founders, directors, agencies & global scaleups",
      iconName: "Users"
    },
    {
      id: "metric-3",
      value: "4.9/5",
      label: "Average Rating •",
      subtext: "Consistently praised for communication & craft",
      iconName: "Star"
    }
  ],
  categories: [
    {
      id: "cat-brand",
      slug: "brand-identity",
      name: "Brand Identity",
      projectCount: 6,
      iconName: "Sparkle",
      description: "Comprehensive brand systems, logomarks, typography rules & visual guidelines.",
      tags: ["Vector Logo Systems", "Brand Guidelines", "Typography Rules"]
    },
    {
      id: "cat-social",
      slug: "social-media",
      name: "Social Media Design",
      projectCount: 7,
      iconName: "LayoutGrid",
      description: "High-converting Instagram carousels, ad creatives, launch templates & stories.",
      tags: ["Instagram Carousels", "Conversion Creatives", "Story Templates"]
    },
    {
      id: "cat-ad",
      slug: "advertising-marketing",
      name: "Advertising & Marketing",
      projectCount: 6,
      iconName: "Megaphone",
      description: "Digital display campaigns, billboard collateral, pitch decks & conversion graphics.",
      tags: ["Display Campaigns", "Billboard Collateral", "High-CTR Ad Creatives"]
    },
    {
      id: "cat-packaging",
      slug: "packaging-design",
      name: "Packaging Design",
      projectCount: 4,
      iconName: "Box",
      description: "Bespoke product packaging, luxury label dielines, boxes & unboxing experiences.",
      tags: ["Dieline Architecture", "Luxury Box Finishing", "Label Systems"]
    },
    {
      id: "cat-print",
      slug: "print-design",
      name: "Print Design",
      projectCount: 5,
      iconName: "FileText",
      description: "Editorial monographs, corporate reports, luxury restaurant menus & lookbooks.",
      tags: ["Press-Ready PDFs", "Editorial Layouts", "CMYK / Spot UV Specs"]
    },
    {
      id: "cat-youtube",
      slug: "youtube-content",
      name: "YouTube & Content",
      projectCount: 1,
      iconName: "Video",
      description: "High-CTR YouTube thumbnails, channel rebrands, video title cards & broadcast assets.",
      tags: ["3-Element Composition", "High-CTR Thumbnails", "Channel Banners"]
    },
    {
      id: "cat-web",
      slug: "web-graphics",
      name: "Web Graphics",
      projectCount: 4,
      iconName: "Globe",
      description: "Bespoke hero illustrations, visual design assets, icon sets & interactive UI artwork.",
      tags: ["Web Banners", "Hero Asset Graphics", "Figma Creative UI"]
    }
  ],
  capabilities: [
    {
      id: "cap-01",
      number: "01",
      title: "Brand Identity Systems",
      iconName: "Sparkle",
      description: "Complete visual identity systems crafted for ambitious startups and global enterprises. From primary logomarks and responsive marks to custom typography rules, cohesive color architectures, and comprehensive brand guideline manuals.",
      deliverablesTitle: "KEY DELIVERABLES:",
      deliverables: [
        "Primary & Secondary Logomarks",
        "Typography Hierarchy & Color Architecture",
        "Comprehensive Brand Guideline Manual (PDF)",
        "Vector Master Files (.AI, .SVG, .EPS)",
        "Stationery & Digital Assets Suite"
      ]
    },
    {
      id: "cap-02",
      number: "02",
      title: "Social Media & Performance Creative",
      iconName: "LayoutGrid",
      description: "Stop-the-scroll social media design systems engineered for international reach. High-retention carousels, campaign templates, story narratives, and conversion-optimized ad creatives tailored for Instagram, LinkedIn, and Meta Ads.",
      deliverablesTitle: "KEY DELIVERABLES:",
      deliverables: [
        "High-Conversion Ad Creative Sets",
        "Educational & Storytelling Carousel Systems",
        "Custom Figma / Canva Editable Templates",
        "Platform-Optimized Formats (1:1, 4:5, 9:16)",
        "Consistent Feed Aesthetic Strategy"
      ]
    },
    {
      id: "cap-03",
      number: "03",
      title: "Advertising & Marketing Collateral",
      iconName: "Megaphone",
      description: "High-impact commercial campaign design spanning digital display banners, outdoor billboard visual concepts, trade show graphics, investor pitch decks, and performance marketing collateral.",
      deliverablesTitle: "KEY DELIVERABLES:",
      deliverables: [
        "Large-Format Billboard & OOH Artwork",
        "Multi-Size Digital Display Banner Suites",
        "Executive Investor & Pitch Decks",
        "Promotional Roll-Up Banners & Booth Graphics",
        "Print & Web Ready Production Files"
      ]
    },
    {
      id: "cap-04",
      number: "04",
      title: "Luxury Packaging & Label Design",
      iconName: "Box",
      description: "Tactile, shelf-commanding packaging design crafted with structural precision. Custom dielines, premium foil and emboss specifications, container labels, and photorealistic 3D presentation renders.",
      deliverablesTitle: "KEY DELIVERABLES:",
      deliverables: [
        "Print-Ready Die-Cut Structural Dielines",
        "Foil Stamping, Emboss & Spot UV Finishes",
        "Regulatory & Barcode Placement Optimization",
        "Photorealistic 3D Mockup Visualizations",
        "Material & Paper Stock Guidance"
      ]
    },
    {
      id: "cap-05",
      number: "05",
      title: "Editorial & Print Layout Design",
      iconName: "FileText",
      description: "Refined editorial and publication design with master-level typography hierarchy. Annual reports, coffee table monographs, corporate brochures, event programs, and luxury hospitality menus.",
      deliverablesTitle: "KEY DELIVERABLES:",
      deliverables: [
        "Multi-Page Editorial Layout & Grid System",
        "Pre-Press CMYK + Pantone Color Profiles",
        "Custom Infographics & Data Visualizations",
        "Digital Interactive Flipbook / Accessible PDF",
        "Printer Consultation & Proof Reviewing"
      ]
    },
    {
      id: "cap-06",
      number: "06",
      title: "YouTube & Creator Brand Identity",
      iconName: "Video",
      description: "High-CTR thumbnail design and comprehensive visual branding for international content creators, tech channels, podcasts, and media networks that command high engagement and algorithmic traction.",
      deliverablesTitle: "KEY DELIVERABLES:",
      deliverables: [
        "High-CTR Thumbnail System & A/B Variations",
        "Channel Banner Art & Watermark Badges",
        "Video End-Screens & Lower Thirds Design",
        "Podcast Cover Artwork (Apple / Spotify Spec)",
        "Visual Identity Guidelines for Editors"
      ]
    },
    {
      id: "cap-07",
      number: "07",
      title: "Web Graphics & Digital Visual Assets",
      iconName: "Globe",
      description: "Bespoke digital artwork and visual components designed to elevate modern web platforms. Custom hero compositions, isometric feature illustrations, UI icon sets, and vector graphic systems.",
      deliverablesTitle: "KEY DELIVERABLES:",
      deliverables: [
        "SaaS / E-Commerce Hero Compositions",
        "Custom Vector Icon & Illustration Suites",
        "Feature Spotlight & Bento Grid Visuals",
        "SVG / WebP Optimized Asset Exports",
        "Figma Component Library Integration"
      ]
    }
  ],
  problemCases: [
    {
      id: "prob-brand-identity",
      categoryBadge: "Brand Identity Design",
      metricBadge: "100% Brand Consistency & Trust",
      categoryFilter: "Brand Identity",
      problemTitle: "Disjointed Visual Branding & Low Market Credibility",
      problemDescription: "Clients struggling with amateur logos, inconsistent typography, and lack of visual guidelines, which caused prospective customers to doubt their quality and choose competitors.",
      solutionTitle: "HOW I SOLVED IT: MASTER BRAND IDENTITY SYSTEM",
      solutionPoints: [
        "Architected scalable vector logomarks, secondary marks, and responsive icons for every screen and print size.",
        "Built a cohesive color architecture and paired typography hierarchy tailored to their industry.",
        "Delivered a comprehensive 40+ page Master Brand Guideline manual ensuring 100% consistency across all touchpoints."
      ],
      outcome: "Positioned the client as an authoritative industry leader, empowering them to command higher pricing and win high-ticket clients."
    },
    {
      id: "prob-social-media",
      categoryBadge: "Social Media Design",
      metricBadge: "3x Higher Post Engagement",
      categoryFilter: "Social Media",
      problemTitle: "Low Social Engagement & Generic Cluttered Posts",
      problemDescription: "Brands posting daily with generic templates that blended into crowded social feeds, suffering from low reach, negligible saves/shares, and inconsistent aesthetic quality.",
      solutionTitle: "HOW I SOLVED IT: STOP-THE-SCROLL SOCIAL DESIGN SYSTEMS",
      solutionPoints: [
        "Engineered high-retention educational carousel frameworks designed for maximum swipe-through and save rates.",
        "Created bold, platform-optimized graphics (1:1, 4:5, 9:16) with clear focal points and mobile-first typography.",
        "Delivered custom, reusable Figma and Canva Pro template systems for effortless in-house content creation."
      ],
      outcome: "Tripled post engagement and bookmark saves while establishing an unmistakable, premium signature aesthetic."
    },
    {
      id: "prob-advertising",
      categoryBadge: "Advertising & Marketing",
      metricBadge: "40%+ Higher Ad CTR",
      categoryFilter: "Advertising & Marketing",
      problemTitle: "High Ad Budgets Burned on Low-Converting Creatives",
      problemDescription: "Clients spending heavily on Meta, Google, and display ads but seeing low click-through rates (CTR) and soaring acquisition costs due to visually weak, cluttered ad graphics.",
      solutionTitle: "HOW I SOLVED IT: CONVERSION-ENGINEERED PERFORMANCE CREATIVE",
      solutionPoints: [
        "Constructed high-contrast visual hooks that capture user attention within the crucial first 0.5 seconds of scrolling.",
        "Strategically formatted value propositions and psychological color contrast directing eyes straight to the Call-to-Action.",
        "Designed high-impact investor pitch decks and OOH billboard graphics that communicate instant commercial value."
      ],
      outcome: "Drastically boosted ad click-through rates (CTR) and lowered customer acquisition costs across paid campaigns."
    },
    {
      id: "prob-packaging",
      categoryBadge: "Packaging Design",
      metricBadge: "Instant Shelf Dominance",
      categoryFilter: "Packaging Design",
      problemTitle: "Packaging Lost on Shelves & Costly Dieline Errors",
      problemDescription: "Physical products failing to stand out in crowded retail aisles, lacking premium tactile appeal, or facing expensive delays due to incorrect structural dielines.",
      solutionTitle: "HOW I SOLVED IT: TACTILE PACKAGING & DIELINE ARCHITECTURE",
      solutionPoints: [
        "Engineered precision die-cut structural packaging files calibrated with exact fold, bleed, and safe zones.",
        "Specified luxury embellishments (spot UV gloss, gold/silver foil stamping, embossing) for memorable unboxing.",
        "Produced photorealistic 3D packaging renders to test competitive shelf visibility prior to manufacturing."
      ],
      outcome: "Achieved immediate standout on retail shelves, zero manufacturing defects, and glowing customer unboxing reviews."
    },
    {
      id: "prob-print",
      categoryBadge: "Print Design",
      metricBadge: "0% Print Defect Rate",
      categoryFilter: "Print Design",
      problemTitle: "Costly Print Errors, Color Shifts & Muddy Graphics",
      problemDescription: "Companies wasting budgets on printed brochures, menus, and reports arriving with pixelated text, cut-off margins, or dull muddy colors caused by improper RGB-to-CMYK conversions.",
      solutionTitle: "HOW I SOLVED IT: ZERO-DEFECT TECHNICAL PRE-PRESS & EDITORIAL",
      solutionPoints: [
        "Converted and calibrated all artwork into calibrated CMYK and Pantone spot color profiles for 100% ink accuracy.",
        "Enforced strict 3mm-5mm bleed tolerances, crop marks, and spine calculations on multi-page editorial layouts.",
        "Provided press-ready 300+ DPI PDF/X-1a files directly compatible with commercial offset and digital presses."
      ],
      outcome: "Completely eliminated reprint expenses and guaranteed razor-sharp, flawless physical publication quality."
    },
    {
      id: "prob-youtube",
      categoryBadge: "YouTube & Content",
      metricBadge: "Up to 3.5x Video CTR",
      categoryFilter: "YouTube & Content",
      problemTitle: "Low Thumbnail Click-Through Rate & View Stagnation",
      problemDescription: "Creators and corporate channels investing hours into video production but losing over 80% of potential viewers due to unreadable, low-contrast, or overly busy thumbnail graphics.",
      solutionTitle: "HOW I SOLVED IT: MOBILE-FIRST YOUTUBE THUMBNAIL ENGINEERING",
      solutionPoints: [
        "Implemented the proven 3-element composition formula: Expressive Subject + High Contrast + 3-word punchy hook.",
        "Enhanced facial lighting and background separation so thumbnails pop on small mobile screens.",
        "Engineered cohesive channel banners and brand elements that convert casual viewers into long-term subscribers."
      ],
      outcome: "Increased organic impression click-through rates up to 3.5x, significantly boosting total video views and watch time."
    },
    {
      id: "prob-web",
      categoryBadge: "Web Graphics",
      metricBadge: "Lower Bounce & Higher Conversions",
      categoryFilter: "Web Graphics",
      problemTitle: "Generic Stock Imagery & High Landing Page Bounce Rates",
      problemDescription: "Websites and SaaS landing pages suffering from generic stock graphics that eroded trust and failed to explain complex product value propositions.",
      solutionTitle: "HOW I SOLVED IT: CUSTOM DIGITAL VISUAL ASSETS & HERO ARTWORK",
      solutionPoints: [
        "Crafted bespoke hero compositions and feature spotlight graphics tailored specifically to the product's value proposition.",
        "Developed custom vector icon suites and UI artwork that make digital interfaces feel polished and modern.",
        "Delivered ultra-lightweight SVG and WebP exports optimized for rapid page load speeds and retina clarity."
      ],
      outcome: "Transformed digital web presence into an authoritative product showcase, boosting visitor engagement and conversions."
    }
  ],
  problemSection: {
    badge: "PROBLEM SOLVER & IMPACT",
    titleMain: "Turning Client Challenges Into",
    titleHighlight: "Proven Commercial Results",
    subtitle: "Great graphic design goes beyond looking good — it solves specific commercial bottlenecks. Here is how I solve real-world problems for clients:",
    ctaTitle: "Have a specific design problem in your business?",
    ctaDescription: "Whether you need to boost ad performance, refresh your brand identity, or prepare error-free packaging and print files, let's create a custom visual solution.",
    ctaButtonText: "Discuss Your Project Problem →"
  },
  skills: {
    badge: "CAPABILITIES & TECHNICAL STACK",
    titleMain: "Specialized Skills &",
    titleHighlight: "Software Tool Suite",
    competenciesTitle: "Specialized Competencies",
    competenciesSubtitle: "Strategic design disciplines & creative production",
    competencies: [
      "Brand Identity Systems",
      "Logo & Wordmark Design",
      "Typography & Hierarchy",
      "Packaging & Dieline Engineering",
      "Social Media Performance Creative",
      "Editorial & Publication Layout",
      "Print Production & Pre-Press",
      "YouTube & Content Branding",
      "Vector Illustration & Iconography",
      "Art Direction & Color Architecture"
    ],
    softwareTitle: "Software & Tool Suite",
    softwareSubtitle: "Dedicated image & graphic design industry software",
    softwareTools: [
      { name: "Adobe Photoshop", category: "Raster & Photo Manipulation" },
      { name: "Adobe Illustrator", category: "Vector & Identity" },
      { name: "Adobe InDesign", category: "Editorial & Publication" },
      { name: "Figma", category: "Digital UI & Creative Assets" },
      { name: "CorelDRAW", category: "Vector Production & Print" },
      { name: "Adobe Lightroom", category: "Color Grading & Photo Polish" },
      { name: "Canva Pro", category: "Client Template Systems" },
      { name: "Procreate", category: "Digital Sketching & Artwork" }
    ]
  },
  testimonials: [
    {
      id: "test-1",
      rating: 5,
      badgeText: "SAMPLE CLIENT TESTIMONIAL",
      quote: "\"Working with Muhammad Hamid was a revelation for our brand relaunch. His mastery of typography, spatial balance, and luxury restraint elevated our visual identity into something that commands instant respect in international department stores. Seamless communication, prompt delivery, and immaculate craftsmanship.\"",
      author: "Julian Vance",
      role: "Creative Director",
      company: "AURA Botanicals",
      location: "Stockholm",
      initials: "JV"
    },
    {
      id: "test-2",
      rating: 5,
      badgeText: "SAMPLE CLIENT TESTIMONIAL",
      quote: "\"Muhammad has an uncanny ability to translate complex, data-heavy financial technologies into striking, institutional-grade visual design. Our pitch decks and brand collateral have directly helped us secure tier-1 institutional partnerships. Highly recommended for international founders.\"",
      author: "Elena Rostova",
      role: "Head of Growth",
      company: "KRONOS Capital",
      location: "London",
      initials: "ER"
    },
    {
      id: "test-3",
      rating: 5,
      badgeText: "SAMPLE CLIENT TESTIMONIAL",
      quote: "\"The YouTube thumbnail frameworks and channel branding Muhammad engineered for us immediately lifted our CTR across the board. He understands algorithmic viewer psychology just as deeply as he understands color theory and design composition. A true top-tier designer.\"",
      author: "Marcus Thorne",
      role: "Founder & CEO",
      company: "TECH PULSE Media",
      location: "New York",
      initials: "MT"
    },
    {
      id: "test-4",
      rating: 5,
      badgeText: "SAMPLE CLIENT TESTIMONIAL",
      quote: "\"From the custom dielines to the tactile foil stamping specifications, Muhammad treated our luxury fragrance packaging with obsessive care. The unboxing experience he designed has become one of our highest-praised customer touchpoints.\"",
      author: "Claire Duprès",
      role: "Brand Manager",
      company: "ODYSSEY Parfums",
      location: "Paris",
      initials: "CD"
    }
  ],
  faqs: [
    {
      id: "faq-1",
      question: "What is your typical turnaround time for a brand identity or packaging project?",
      answer: "Complete brand identity systems typically take 2 to 3 weeks, including research, concept exploration, brand guidelines, and final vector kit delivery. Packaging projects range from 1 to 2 weeks depending on structural dieline complexity."
    },
    {
      id: "faq-2",
      question: "In what file formats do you deliver final design assets?",
      answer: "You receive comprehensive industry-standard master files: vector formats (.AI, .EPS, .SVG, .PDF) for print and infinite scaling, plus web-optimized raster formats (.PNG, .JPG, .WebP). For packaging, you receive 300+ DPI press-ready PDF/X-1a files with technical dieline layers."
    },
    {
      id: "faq-3",
      question: "How do we communicate and collaborate across different time zones?",
      answer: "I work with international clients across Europe, North America, Middle East, and Asia. We coordinate seamlessly via WhatsApp (+92 322 0226494), Email (khatrihamid136@gmail.com), and structured milestone previews."
    },
    {
      id: "faq-4",
      question: "How many revisions are included in a standard project scope?",
      answer: "Every project includes dedicated iterative revision rounds (typically 2–3 structured review cycles) to ensure every curve, color profile, and typography specification perfectly aligns with your commercial goals."
    },
    {
      id: "faq-5",
      question: "Do you provide editable templates for in-house marketing teams?",
      answer: "Yes! In addition to vector master files, I build user-friendly editable templates in Figma and Canva Pro so your internal team can produce daily social creatives while strictly preserving the master brand guidelines."
    }
  ],
  contact: {
    whatsapp: "+923220226494",
    whatsappDisplay: "+92 322 0226494",
    email: "khatrihamid136@gmail.com",
    availabilityText: "Available for Select International Commissions & Brand Collaborations",
    locationFocus: "International Client Focus"
  },
  footer: {
    copyrightText: "© 2026 Muhammad Hamid. All rights reserved.",
    subText: "Crafted with precision for international brands."
  },
  projects: initialProjects
};
