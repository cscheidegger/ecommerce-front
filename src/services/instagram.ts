
import { toast } from '@/lib/toast';

// Define the Instagram Post interface
export interface InstagramPost {
  id: string;
  image_url: string;
  caption: string;
  likes: number;
  timestamp: string;
}

// For development, we'll use mock data initially
const mockInstagramPosts: InstagramPost[] = [
  {
    id: 'post_1',
    image_url: '/lovable-uploads/22fb2a87-2e9c-48c8-93fc-87dcdb84b657.png',
    caption: 'Modelo 3D personalizado para cliente! Impressão em PLA com acabamento especial. #3DPrinting #ProteusDev',
    likes: 42,
    timestamp: new Date().toISOString(),
  },
  {
    id: 'post_2',
    image_url: '/lovable-uploads/3fdf39fa-bd53-4929-9a88-d4687659317c.png',
    caption: 'Prototipagem rápida para projeto industrial. Impressão em 24 horas! #RapidPrototyping #ProteusDev',
    likes: 38,
    timestamp: new Date().toISOString(),
  },
  {
    id: 'post_3',
    image_url: '/lovable-uploads/59d289ec-6b77-47e0-bcf5-bb93b519f91a.png',
    caption: 'Peças personalizadas para robótica. Material ABS de alta resistência. #Robotics #CustomParts',
    likes: 56,
    timestamp: new Date().toISOString(),
  }
];

// Instagram API Service
export const InstagramApi = {
  // Get recent Instagram posts
  getRecentPosts: async (): Promise<InstagramPost[]> => {
    try {
      // In production, this would call our real API endpoint
      // const response = await fetch('http://localhost:8000/api/instagram/posts');
      // return await response.json();
      
      // For development/MVP, we'll use mock data
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockInstagramPosts);
        }, 500);
      });
    } catch (error) {
      console.error('Error fetching Instagram posts:', error);
      toast.error('Falha ao carregar posts do Instagram');
      return [];
    }
  }
};
