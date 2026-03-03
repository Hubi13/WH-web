export type PageKey = 'home' | 'dealer' | 'catalogue' | 'legal' | 'philosophy' | 'careers' | 'atelier' | 'test' | 'rhomebook' | 'catalogs' | 'certificates' | 'faq' | 'news';

interface SeoConfig {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
}

const BASE_URL = 'https://r-home.systems';
const DEFAULT_OG_IMAGE = 'https://i.imgur.com/iWyQPX1.jpeg';

export const SEO_CONFIG: Record<PageKey, SeoConfig> = {
  home: {
    title: "West Home | Bespoke Modular Homes & Net-Zero Architecture",
    description: "West Home Systems: Automotive-grade modular homes combining minimalist design, net-zero technology, and Swiss-precision engineering.",
    path: "/"
  },
  catalogs: {
    title: "Katalogi i Specyfikacje | West Home Systems",
    description: "Pobierz oficjalne katalogi modeli R-ONE, R-SEQUENCE, R-INFINITY oraz pełną dokumentację techniczną West Home Book.",
    path: "/catalogs"
  },
  certificates: {
    title: "Certyfikaty i Standardy | West Home Systems",
    description: "Oficjalne certyfikaty jakości, ekologii i bezpieczeństwa konstrukcji West Home.",
    path: "/certificates"
  },
  faq: {
    title: "FAQ | Często Zadawane Pytania | West Home Systems",
    description: "Centrum wiedzy West Home. Odpowiedzi na pytania o technologię CLT, proces budowy i koszty.",
    path: "/faq"
  },
  news: {
    title: "News & Journal | West Home Systems",
    description: "Aktualności ze świata architektury modułowej, innowacje technologiczne i relacje z realizacji.",
    path: "/news"
  },
  rhomebook: {
    title: "West Home Book | Technical Specification",
    description: "Katalog techniczny West Home Systems. Szczegółowe rozwiązania konstrukcyjne i parametry.",
    path: "/rhomebook"
  },
  dealer: {
    title: "Find a Dealer | West Home Systems",
    description: "Locate an authorized West Home partner.",
    path: "/dealer"
  },
  catalogue: {
    title: "Digital Catalogue 2025 | West Home Systems",
    description: "Explore the 2025 Collection technical specifications.",
    path: "/catalogue"
  },
  philosophy: {
    title: "Philosophy | The Architecture of Silence",
    description: "Bespoke living environments designed for silence and autonomy.",
    path: "/philosophy"
  },
  careers: {
    title: "Careers | Engineering the Future of Housing",
    description: "Join the team engineering the future of housing.",
    path: "/careers"
  },
  legal: {
    title: "Legal & Privacy | West Home Systems",
    description: "Terms of Service and Privacy Policy.",
    path: "/legal"
  },
  atelier: {
    title: "Atelier | Private Configuration",
    description: "Restricted access for bespoke commissions.",
    path: "/atelier",
    noIndex: true
  },
  test: {
    title: "System Diagnostics | West Home Systems",
    description: "System integrity check.",
    path: "/test"
  }
};

export const updateSeoTags = (page: PageKey) => {
  const config = SEO_CONFIG[page] || SEO_CONFIG.home;
  const canonicalUrl = `${BASE_URL}${config.path}`;
  const imageUrl = config.ogImage || DEFAULT_OG_IMAGE;

  document.title = config.title;

  const setMeta = (name: string, content: string, isProperty = false) => {
    const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let element = document.querySelector(selector);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(isProperty ? 'property' : 'name', name);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  setMeta('description', config.description);
  setMeta('og:title', config.title, true);
  setMeta('og:description', config.description, true);
  setMeta('og:url', canonicalUrl, true);
  setMeta('og:image', imageUrl, true);
  setMeta('og:type', 'website', true);

  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);
};