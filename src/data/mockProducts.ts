
import { Product } from '../types';

// Mock data for 3D printing products
export const mockProducts: Product[] = [
  {
    id: 1,
    title: "Suporte de Headset 3D",
    price: 89.90,
    description: "Suporte ergonômico para headset impresso em PLA de alta qualidade. Design moderno que combina com qualquer setup gamer.",
    category: "suportes",
    image: "/lovable-uploads/59d289ec-6b77-47e0-bcf5-bb93b519f91a.png",
    rating: {
      rate: 4.8,
      count: 42
    }
  },
  {
    id: 2,
    title: "Organizador de Cabos 3D",
    price: 29.90,
    description: "Conjunto de 5 organizadores de cabos para manter sua mesa limpa e organizada. Impressos em PLA com acabamento premium.",
    category: "organizadores",
    image: "https://images.unsplash.com/photo-1611117775350-5b1fb1cbaf3b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: {
      rate: 4.5,
      count: 78
    }
  },
  {
    id: 3,
    title: "Filamento PLA 1kg Premium",
    price: 119.90,
    description: "Filamento PLA de 1.75mm com 1kg de alta qualidade para suas impressões 3D. Disponível em várias cores, preciso e resistente.",
    category: "filamentos",
    image: "https://images.unsplash.com/photo-1631732025473-6e43e4816bb9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: {
      rate: 4.9,
      count: 156
    }
  },
  {
    id: 4,
    title: "Miniatura Articulada Robô",
    price: 59.90,
    description: "Miniatura impressa em 3D de um robô articulado. Impressa em PLA de qualidade com articulações móveis. Altura: 15cm.",
    category: "miniaturas",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: {
      rate: 4.7,
      count: 63
    }
  },
  {
    id: 5,
    title: "Suporte para Smartphone",
    price: 34.90,
    description: "Suporte ajustável para smartphone impresso em PETG durável. Ideal para videochamadas e assistir vídeos.",
    category: "suportes",
    image: "https://images.unsplash.com/photo-1609091839311-d342418ecc33?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: {
      rate: 4.6,
      count: 91
    }
  },
  {
    id: 6,
    title: "Kit de Engrenagens Educacionais",
    price: 79.90,
    description: "Kit com 20 engrenagens de diferentes tamanhos para projetos educacionais. Material didático para ensino de mecânica básica.",
    category: "educacional",
    image: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: {
      rate: 4.8,
      count: 32
    }
  },
  {
    id: 7,
    title: "Vaso Auto-Irrigável Geométrico",
    price: 45.90,
    description: "Vaso decorativo com sistema de auto-irrigação integrado. Design geométrico moderno impresso em PLA ecológico.",
    category: "decoração",
    image: "https://images.unsplash.com/photo-1600411833114-badb341798b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: {
      rate: 4.3,
      count: 47
    }
  },
  {
    id: 8,
    title: "Peças de Xadrez Personalizadas",
    price: 149.90,
    description: "Conjunto completo de peças de xadrez impressas em 3D com design futurista. Estojo para armazenamento incluído.",
    category: "jogos",
    image: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: {
      rate: 4.9,
      count: 28
    }
  },
  {
    id: 9,
    title: "Circuito Eletrônico Educacional",
    price: 89.90,
    description: "Kit educacional de circuito eletrônico com peças impressas em 3D. Ideal para estudantes de eletrônica e robótica.",
    category: "educacional",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: {
      rate: 4.6,
      count: 39
    }
  },
  {
    id: 10,
    title: "Modelo Anatômico Coração",
    price: 129.90,
    description: "Modelo anatômico detalhado de coração humano impresso em resina. Perfeito para estudos de medicina e biologia.",
    category: "educacional",
    image: "https://images.unsplash.com/photo-1579154392429-0e6b4e850ad2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: {
      rate: 4.9,
      count: 54
    }
  },
  {
    id: 11,
    title: "Suporte para Tablet Ajustável",
    price: 69.90,
    description: "Suporte ajustável para tablet com múltiplos ângulos. Perfeito para leitura, trabalho ou entretenimento.",
    category: "suportes",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: {
      rate: 4.5,
      count: 71
    }
  },
  {
    id: 12,
    title: "Kit de Ferramentas para Impressão 3D",
    price: 159.90,
    description: "Kit completo de ferramentas essenciais para manutenção e pós-processamento de peças impressas em 3D.",
    category: "ferramentas",
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: {
      rate: 4.8,
      count: 84
    }
  },
  {
    id: 13,
    title: "Mapa 3D Personalizado",
    price: 160.00,
    description: "Mapa 3D personalizado do seu endereço ou local favorito. Impresso em PLA de alta qualidade no tamanho carta (21,6 x 27,9 cm). Personalizações adicionais disponíveis sob consulta.",
    category: "mapas",
    image: "/lovable-uploads/3fdf39fa-bd53-4929-9a88-d4687659317c.png",
    rating: {
      rate: 4.9,
      count: 23
    }
  }
];

// Mock categories for 3D printing products
export const mockCategories: string[] = [
  "suportes",
  "organizadores",
  "filamentos",
  "miniaturas",
  "educacional",
  "decoração",
  "jogos",
  "ferramentas",
  "mapas"
];
