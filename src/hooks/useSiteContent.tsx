
import { useState, useEffect } from 'react';

// Interface para nosso conteúdo
export interface SiteContent {
  homepage: {
    title: string;
    subtitle: string;
    description: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  footer: {
    copyright: string;
    socialLinks: {
      facebook: string;
      instagram: string;
      twitter: string;
    };
  };
  services: {
    title: string;
    subtitle: string;
    description: string;
  };
}

// Valores padrão caso não exista nada no localStorage
export const defaultContent: SiteContent = {
  homepage: {
    title: "Serviços profissionais de impressão 3D",
    subtitle: "Transforme suas ideias em realidade com tecnologia de ponta",
    description: "Oferecemos serviços completos de modelagem e impressão 3D para protótipos, peças técnicas e produtos personalizados com alta qualidade e precisão."
  },
  contact: {
    email: "contato@proteus.lab.com.br",
    phone: "(11) 95555-9999",
    address: "Rua Exemplo, 123 - São Paulo, SP"
  },
  footer: {
    copyright: "© 2025 Proteus.lab. Todos os direitos reservados.",
    socialLinks: {
      facebook: "https://facebook.com/proteuslab",
      instagram: "https://instagram.com/proteuslab",
      twitter: "https://twitter.com/proteuslab"
    }
  },
  services: {
    title: "Nossos Serviços",
    subtitle: "Soluções completas em impressão 3D",
    description: "Oferecemos uma gama completa de serviços de impressão 3D para transformar suas ideias em realidade."
  }
};

export const useSiteContent = () => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Carregar conteúdo do localStorage
    const savedContent = localStorage.getItem('siteContent');
    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent);
        // Merge with default content to ensure all fields exist
        setContent({
          ...defaultContent,
          ...parsedContent,
          // Ensure nested objects are merged properly
          homepage: { ...defaultContent.homepage, ...parsedContent.homepage },
          contact: { ...defaultContent.contact, ...parsedContent.contact },
          footer: { 
            ...defaultContent.footer, 
            ...parsedContent.footer,
            socialLinks: { 
              ...defaultContent.footer.socialLinks, 
              ...(parsedContent.footer?.socialLinks || {}) 
            }
          },
          services: { ...defaultContent.services, ...parsedContent.services }
        });
      } catch (error) {
        console.error("Error parsing saved content:", error);
        setContent(defaultContent);
      }
    }
    setIsLoaded(true);
  }, []);

  // Função para atualizar o conteúdo
  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
    localStorage.setItem('siteContent', JSON.stringify(newContent));
  };

  return { content, isLoaded, updateContent };
};
