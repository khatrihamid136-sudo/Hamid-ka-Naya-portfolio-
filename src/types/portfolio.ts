export interface Project {
  id: string;
  categorySlug: string;
  categoryName: string;
  title: string;
  client: string;
  clientLocation?: string;
  year: string;
  thumbnail: string;
  galleryImages: string[];
  tags: string[];
  summary: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  outcome: string;
  featured?: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  projectCount: number;
  iconName: string;
  description: string;
  tags: string[];
}

export interface Metric {
  id: string;
  value: string;
  label: string;
  subtext: string;
  iconName?: string;
}

export interface Capability {
  id: string;
  number: string;
  title: string;
  iconName: string;
  description: string;
  deliverablesTitle: string;
  deliverables: string[];
}

export interface ProblemSolutionCase {
  id: string;
  categoryBadge: string;
  metricBadge: string;
  categoryFilter: string;
  problemTitle: string;
  problemDescription: string;
  solutionTitle: string;
  solutionPoints: string[];
  outcome: string;
}

export interface Testimonial {
  id: string;
  rating: number;
  badgeText: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  initials: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactInfo {
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  availabilityText: string;
  locationFocus: string;
}

export interface HeroData {
  nameFirst: string;
  nameLast: string;
  roleBadge: string;
  clientFocusBadge: string;
  headlineQuote: string;
  bioParagraph: string;
  primaryCta: string;
  secondaryCta: string;
  quickTags: string[];
}

export interface ProblemSectionData {
  badge: string;
  titleMain: string;
  titleHighlight: string;
  subtitle: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
}

export interface SkillsData {
  badge: string;
  titleMain: string;
  titleHighlight: string;
  competenciesTitle: string;
  competenciesSubtitle: string;
  competencies: string[];
  softwareTitle: string;
  softwareSubtitle: string;
  softwareTools: { name: string; category?: string }[];
}

export interface PortfolioSiteData {
  hero: HeroData;
  metrics: Metric[];
  categories: Category[];
  projects: Project[];
  capabilities: Capability[];
  problemCases: ProblemSolutionCase[];
  problemSection: ProblemSectionData;
  skills: SkillsData;
  testimonials: Testimonial[];
  faqs: FAQItem[];
  contact: ContactInfo;
  footer: {
    copyrightText: string;
    subText: string;
  };
}
