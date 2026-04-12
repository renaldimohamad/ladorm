export type NavbarLangType = {
  home: string;
  about: string;
  insight: string;
  blog: string;
  contact: string;
  comingSoon: string;
};

export type FooterLangType = {
  addressLabel: string;
  websiteLabel: string;
  emailLabel: string;
  addressText: string;
  brandText: string;
  cityText: string;
  socialMediaLabel: string;
  legalLabel: string;
  termsOfService: string;
  privacyPolicy: string;
  copyright: string;
  ladormyLabel: string;
};

export type CtaSectionLangType = {
  title: string;
  desc: string;
  button: string;
};

export type InsightLangType = {
  heroTitle: string;
  heroHighlight: string;
  heroDesc: string;
  emptyStateTitle: string;
  emptyStateDesc: string;
  featuredBadge: string;
  latestArticles: string;
  readMore: string;
  readFull: string;
  questionTitle: string;
  questionDesc: string;
  contactButton: string;
};

export type BlogLangType = {
  heroTitle: string;
  heroDesc: string;
  mainHighlightBadge: string;
  viewGalleryButton: string;
  latestNewsTitle: string;
  readStoryButton: string;
  loadMoreButton: string;
};

export interface IInsightPost {
  id: number | string;
  title: string;
  desc: string;
  category: string;
  readTime: string;
  date: string;
  img?: string;
  content?: string;
}

export interface IBlogPost {
  id: number | string;
  title: string;
  desc: string;
  category: string;
  date: string;
  img?: string;
  content?: string;
  videoUrl?: string;
  hasGallery?: boolean;
}

export interface ITestimonial {
  name: string;
  avatar: string;
  message: string;
  role: string;
  location: string;
  instagram: string;
  twitter: string;
}

export type AboutPageLangType = {
  title: string;
  content: string[];
  list: string[];
  philosophy: string[];
};

export type IHeroSectionHome = {
  title: string;
  desc: string;
};

export type IHeroButtonLabels = {
  callToAction: string;
};

export type IHomeSectionAbout = {
  title: string;
  desc: string;
};

export type IHomeWhyLadorm = {
  titleSection: string;
  title1: string;
  desc1: string;
  desc2: string;
  features: {
    facility: {
      title: string;
      desc: string;
    };
    location: {
      title: string;
      desc: string;
    };
    community: {
      title: string;
      desc: string;
    };
  };
  CTA: {
    title: string;
    ctaBtn: string;
  };
};

export type AboutDormitoryLangType = {
  title: string;
  paragraph1: {
    bold: string;
    normal: string;
  };
  paragraph2: {
    date: string;
    author: string;
    section1: string;
    section2: string;
    section3: string;
  };
  paragraph3: {
    bold: string;
    section1: string;
    section2: string;
  };
  features: string[];
  intro: string;
  full: {
    paragraph1: string;
    paragraph2: string;

    leaders: {
      name: string;
      period: string;
    }[];
    paragraph3: string;
  };
  readMore: string;
  readLess: string;
};

export type ContactUsLangType = {
  title: string;
  description: string;
  contactForm: {
    title: string;
    subtitle: string;
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
    submit: string;
    loaderButton: string;
    toast: {
      loading: string;
      success: string;
      error: string;
    };
  };
  whatsappMessage?: string;
};

export type IHomeHowWeWork = {
  sectionLabel: string;
  title: string;
  desc: string;
  steps: {
    contact: { title: string; desc: string };
    survey: { title: string; desc: string };
    move: { title: string; desc: string };
  };
};

export type LanguageType = {
  common?: {
    backButton: string;
  };
  homeBlogPreview?: {
    title: string;
    subtitle: string;
    cta: string;
    readMore: string;
  };
  homeInsightPreview?: {
    title: string;
    subtitle: string;
    cta: string;
    badge: string;
  };
  navbar: NavbarLangType;
  heroSectionHome: IHeroSectionHome[];
  heroButtonLabels: IHeroButtonLabels;
  aboutDormitory: AboutDormitoryLangType;
  contactUs?: ContactUsLangType;
  homeSectionAbout?: IHomeSectionAbout;
  homeWhyLadorm?: IHomeWhyLadorm;
  homeHowWeWork?: IHomeHowWeWork;
  footer?: FooterLangType;
  ctaSection?: CtaSectionLangType;
  insightPage?: InsightLangType;
  blogPage?: BlogLangType;
  aboutPage?: AboutPageLangType;
  mockInsightsData?: {
    featured: IInsightPost;
    list: IInsightPost[];
  };
  mockBlogData?: {
    latestEvent: IBlogPost;
    posts: IBlogPost[];
  };
  testimonialsData?: ITestimonial[];
};
