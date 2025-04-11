
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../types';
import { ProductApi } from '../services/api';
import { useCart } from '../contexts/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  ShoppingCart, 
  Truck, 
  Shield, 
  ArrowLeft,
  Plus,
  Minus,
  Heart
} from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await ProductApi.getProductById(parseInt(id));
        setProduct(data);
        setError(null);
      } catch (err) {
        setError('Falha ao carregar produto. Por favor, tente novamente mais tarde.');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <Skeleton className="h-96 w-full rounded-lg" />
            </div>
            <div className="md:w-1/2 space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-grow flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            {error || 'Produto não encontrado'}
          </h2>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para a Página Inicial
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-ecommerce-primary">Início</Link>
          <span className="mx-2">/</span>
          <Link to="/categorias" className="hover:text-ecommerce-primary">Categorias</Link>
          <span className="mx-2">/</span>
          <Link to={`/categoria/${product.category}`} className="hover:text-ecommerce-primary">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700 truncate max-w-[200px]">{product.title}</span>
        </div>

        {/* Product details */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product image */}
          <div className="md:w-1/2 bg-white rounded-lg p-6 flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.title} 
              className="max-h-96 max-w-full object-contain"
            />
          </div>

          {/* Product info */}
          <div className="md:w-1/2">
            <Badge variant="outline" className="mb-4">
              {product.category}
            </Badge>
            
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-medium">{product.rating.rate}</span>
                <span className="text-gray-500 ml-1">({product.rating.count} avaliações)</span>
              </div>
            </div>
            
            <div className="text-3xl font-bold text-ecommerce-primary mb-6">
              R$ {product.price.toFixed(2)}
            </div>
            
            <p className="text-gray-700 mb-8">{product.description}</p>
            
            <div className="flex items-center mb-6">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full" 
                onClick={handleDecreaseQuantity}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-16 mx-2 text-center"
              />
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full" 
                onClick={handleIncreaseQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Adicionar ao Carrinho
              </Button>
              <Button variant="outline" className="w-12">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Product benefits */}
            <div className="border-t border-gray-200 mt-8 pt-6 space-y-4">
              <div className="flex items-start">
                <Truck className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium">Entrega Rápida</h3>
                  <p className="text-sm text-gray-600">Entrega em até 5 dias úteis</p>
                </div>
              </div>
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium">Garantia de Satisfação</h3>
                  <p className="text-sm text-gray-600">30 dias para devolução</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
