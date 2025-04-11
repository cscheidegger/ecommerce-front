
import { Product, Order } from '../types';
import { toast } from '@/lib/toast';
import { mockProducts, mockCategories } from '../data/mockProducts';

// Base URL para nossa API principal
// Na produção, isso seria uma variável de ambiente
const API_BASE_URL = 'https://api-principal.example.com';

// Função para lidar com erros de forma consistente
const handleApiError = (error: unknown) => {
  console.error('API Error:', error);
  const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao comunicar com o servidor';
  toast.error(errorMessage);
  return Promise.reject(errorMessage);
};

// API de Produtos
export const ProductApi = {
  // GET - Buscar todos os produtos
  getAllProducts: async (): Promise<Product[]> => {
    try {
      // Em produção, isso chamaria nossa API principal
      // const response = await fetch(`${API_BASE_URL}/products`);
      
      // Para desenvolvimento, usamos produtos mockados de impressão 3D
      // Simulando um tempo de resposta para parecer uma chamada API real
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockProducts);
        }, 300);
      });
    } catch (error) {
      return handleApiError(error);
    }
  },

  // GET - Buscar um produto pelo ID
  getProductById: async (id: number): Promise<Product> => {
    try {
      // Simulando uma chamada API com os nossos produtos mockados
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const product = mockProducts.find(p => p.id === id);
          if (product) {
            resolve(product);
          } else {
            reject(new Error(`Produto ${id} não encontrado`));
          }
        }, 300);
      });
    } catch (error) {
      return handleApiError(error);
    }
  },

  // GET - Buscar produtos por categoria
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    try {
      // Simulando uma chamada API com os nossos produtos mockados
      return new Promise((resolve) => {
        setTimeout(() => {
          const filteredProducts = mockProducts.filter(p => p.category === category);
          resolve(filteredProducts);
        }, 300);
      });
    } catch (error) {
      return handleApiError(error);
    }
  },

  // GET - Obter todas as categorias
  getCategories: async (): Promise<string[]> => {
    try {
      // Simulando uma chamada API com as nossas categorias mockadas
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockCategories);
        }, 300);
      });
    } catch (error) {
      return handleApiError(error);
    }
  }
};

// API de Pedidos
export const OrderApi = {
  // POST - Criar um novo pedido
  createOrder: async (order: Order): Promise<{ id: number; message: string }> => {
    try {
      // Em produção, isso enviaria para nossa API principal
      // const response = await fetch(`${API_BASE_URL}/orders`, {
      
      // Para desenvolvimento, simulamos o envio
      // A FakeStore API não suporta realmente criar pedidos, então simulamos
      console.log('Ordem criada:', order);
      
      // Simula um envio bem-sucedido após 1 segundo
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: Math.floor(Math.random() * 1000) + 1,
            message: 'Pedido criado com sucesso!'
          });
        }, 1000);
      });
    } catch (error) {
      return handleApiError(error);
    }
  },

  // GET - Obter um pedido pelo ID
  getOrderById: async (id: number): Promise<Order> => {
    try {
      // Em produção, isso buscaria da nossa API principal
      // const response = await fetch(`${API_BASE_URL}/orders/${id}`);
      
      // Para desenvolvimento, simulamos a resposta
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            items: [],
            total: 0,
            customer: {
              name: 'Cliente Teste',
              email: 'cliente@teste.com',
              address: 'Rua de Teste, 123'
            },
            paymentMethod: 'Cartão de Crédito'
          });
        }, 500);
      });
    } catch (error) {
      return handleApiError(error);
    }
  },

  // PUT - Atualizar um pedido
  updateOrder: async (id: number, updates: Partial<Order>): Promise<{ message: string }> => {
    try {
      // Em produção, isso enviaria para nossa API principal
      // const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(updates),
      // });
      
      // Para desenvolvimento, simulamos a resposta
      console.log(`Atualizando pedido ${id}:`, updates);
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ message: 'Pedido atualizado com sucesso!' });
        }, 500);
      });
    } catch (error) {
      return handleApiError(error);
    }
  },

  // DELETE - Cancelar um pedido
  cancelOrder: async (id: number): Promise<{ message: string }> => {
    try {
      // Em produção, isso enviaria para nossa API principal
      // const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      //   method: 'DELETE',
      // });
      
      // Para desenvolvimento, simulamos a resposta
      console.log(`Cancelando pedido ${id}`);
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ message: 'Pedido cancelado com sucesso!' });
        }, 500);
      });
    } catch (error) {
      return handleApiError(error);
    }
  }
};
