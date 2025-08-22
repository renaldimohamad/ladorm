export type NavbarLangType = {
  home: string;
  about: string;
  insight: string;
  blog: string;
  contact: string;
};

export type IHeroSectionHome = {
  title: string;
  desc: string;
};

export type IHeroButtonLabels = {
  callToAction: string;
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
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
    submit: string;
    loaderButton: string;
  };
};

export type LanguageType = {
  navbar: NavbarLangType;
  heroSectionHome: IHeroSectionHome[];
  heroButtonLabels: IHeroButtonLabels;
  aboutDormitory: AboutDormitoryLangType;
  contactUs?: ContactUsLangType;
};
