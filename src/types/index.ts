
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  items: CartItem[];
  total: number;
  customer: {
    name: string;
    email: string;
    address: string;
  };
  paymentMethod: string;
}

export interface MapOrder {
  address: string;
  size: string;
  material: string;
  frame: boolean;
  customText?: string;
  price: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  isAdmin: boolean;
}

export interface Quote {
  id: number;
  userId: number;
  description: string;
  files: string[];
  status: 'pending' | 'approved' | 'rejected';
  estimatedPrice?: number;
  adminNotes?: string;
  driveUrl?: string;
  createdAt: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  category: string;
}
