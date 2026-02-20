import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

export type Locale = "pt" | "en";

const STORAGE_KEY = "portfolio-locale";

type Translations = {
  nav: {
    about: string;
    projects: string;
    experience: string;
    skills: string;
    contact: string;
    panel: string;
    navigation: string;
    themeLight: string;
    themeDark: string;
    switchToEn: string;
    switchToPt: string;
    language: string;
  };
  home: {
    available: string;
    building: string;
    experiences: string;
    subtitle: string;
    viewProjects: string;
    downloadCv: string;
    frontend: string;
    backend: string;
    design: string;
    devops: string;
  };
  skills: {
    title: string;
    subtitle: string;
  };
    projects: {
      title: string;
      subtitle: string;
      viewCode: string;
      viewDemo: string;
      liveDemo: string;
      source: string;
    };
  experience: {
    title: string;
    subtitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    location: string;
    phone: string;
    phonePlaceholder: string;
    name: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
  };
  common: {
    copyright: string;
  };
};

const translations: Record<Locale, Translations> = {
  pt: {
    nav: {
      about: "Sobre",
      projects: "Projetos",
      experience: "Experiência",
      skills: "Habilidades",
      contact: "Contato",
      panel: "Painel",
      navigation: "Navegação",
      themeLight: "Modo claro",
      themeDark: "Modo escuro",
      switchToEn: "EN",
      switchToPt: "PT",
      language: "Idioma",
    },
    home: {
      available: "DISPONÍVEL PARA NOVOS PROJETOS",
      building: "Construindo",
      experiences: "experiências",
      subtitle: "Sou um desenvolvedor web Full Stack apaixonado por criar interfaces bonitas, intuitivas e performáticas. Eu conecto o design à engenharia.",
      viewProjects: "Ver Projetos",
      downloadCv: "Download CV",
      frontend: "Frontend",
      backend: "Backend",
      design: "Design",
      devops: "DevOps",
    },
    skills: {
      title: "Habilidades Técnicas",
      subtitle: "Uma visão geral das tecnologias e ferramentas que utilizo no meu dia a dia como desenvolvedor.",
    },
    projects: {
      title: "Projetos em Destaque",
      subtitle: "Uma coleção de aplicações que demonstram minha paixão por código limpo e design centrado no usuário.",
      viewCode: "Código",
      viewDemo: "Demo",
      liveDemo: "Ver demo",
      source: "Código",
    },
    experience: {
      title: "Experiência",
      subtitle: "Minha jornada profissional e os cargos que ocupei na indústria.",
    },
    contact: {
      title: "Entre em Contato",
      subtitle: "Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades para fazer parte da sua visão.",
      email: "E-mail",
      location: "Localização",
      phone: "Telefone",
      phonePlaceholder: "(00) 00000-0000",
      name: "Nome",
      namePlaceholder: "Seu nome",
      emailPlaceholder: "seu@email.com",
      message: "Mensagem",
      messagePlaceholder: "Conte-me sobre seu projeto...",
      send: "Enviar Mensagem",
      sending: "Enviando...",
    },
    common: {
      copyright: "©",
    },
  },
  en: {
    nav: {
      about: "About",
      projects: "Projects",
      experience: "Experience",
      skills: "Skills",
      contact: "Contact",
      panel: "Panel",
      navigation: "Navigation",
      themeLight: "Light mode",
      themeDark: "Dark mode",
      switchToEn: "EN",
      switchToPt: "PT",
      language: "Language",
    },
    home: {
      available: "AVAILABLE FOR NEW PROJECTS",
      building: "Building",
      experiences: "digital experiences",
      subtitle: "I'm a Full Stack web developer passionate about creating beautiful, intuitive and performant interfaces. I connect design with engineering.",
      viewProjects: "View Projects",
      downloadCv: "Download CV",
      frontend: "Frontend",
      backend: "Backend",
      design: "Design",
      devops: "DevOps",
    },
    skills: {
      title: "Technical Skills",
      subtitle: "An overview of the technologies and tools I use in my day-to-day as a developer.",
    },
    projects: {
      title: "Featured Projects",
      subtitle: "A collection of applications that showcase my passion for clean code and user-centered design.",
      viewCode: "Code",
      viewDemo: "Demo",
      liveDemo: "Live Demo",
      source: "Source",
    },
    experience: {
      title: "Experience",
      subtitle: "My professional journey and the roles I've held in the industry.",
    },
    contact: {
      title: "Get in Touch",
      subtitle: "I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.",
      email: "Email",
      location: "Location",
      phone: "Phone",
      phonePlaceholder: "(00) 00000-0000",
      name: "Name",
      namePlaceholder: "Your name",
      emailPlaceholder: "your@email.com",
      message: "Message",
      messagePlaceholder: "Tell me about your project...",
      send: "Send Message",
      sending: "Sending...",
    },
    common: {
      copyright: "©",
    },
  },
};

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function safeGetStorage(key: string): string | null {
  try {
    return typeof window !== "undefined" ? localStorage.getItem(key) : null;
  } catch {
    return null;
  }
}

function safeSetStorage(key: string, value: string): void {
  try {
    if (typeof window !== "undefined") localStorage.setItem(key, value);
  } catch {
    // ignore
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const stored = safeGetStorage(STORAGE_KEY) as Locale | null;
    return stored === "en" || stored === "pt" ? stored : "pt";
  });

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    safeSetStorage(STORAGE_KEY, next);
    if (typeof document !== "undefined")
      document.documentElement.lang = next === "en" ? "en" : "pt-BR";
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined")
      document.documentElement.lang = locale === "en" ? "en" : "pt-BR";
  }, [locale]);

  const value: LanguageContextValue = {
    locale,
    setLocale,
    t: translations[locale],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
