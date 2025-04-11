
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Button } from '@/components/ui/button';
import { useCart } from '../contexts/CartContext';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, MapPin } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const formatCategory = (category: string): string => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  const isMapProduct = product.category === 'mapas';

  return (
    <Card className={`product-card h-full flex flex-col hover:shadow-md transition-shadow ${isMapProduct ? 'border-indigo-300' : ''}`}>
      <Link to={`/produto/${product.id}`}>
        <div className="product-image-container p-4 h-48 flex justify-center">
          <img 
            src={product.image} 
            alt={product.title} 
            className="h-full object-contain"
          />
        </div>
        <CardContent className="pt-4 pb-2 flex-grow">
          <div className="flex justify-between items-start mb-2">
            <Badge variant={isMapProduct ? "secondary" : "outline"} className="mb-2">
              {isMapProduct && <MapPin className="h-3 w-3 mr-1" />}
              {formatCategory(product.category)}
            </Badge>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-sm">{product.rating.rate}</span>
            </div>
          </div>
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">{truncateText(product.title, 50)}</h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{truncateText(product.description, 80)}</p>
          <div className="text-xl font-bold text-indigo-600 mt-1">
            R$ {product.price.toFixed(2)}
          </div>
        </CardContent>
      </Link>
      <CardFooter className="pt-0">
        {isMapProduct ? (
          <div className="w-full space-y-2">
            <Button 
              asChild
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              <Link to="/mapa-personalizado">
                <MapPin className="mr-2 h-4 w-4" /> Personalizar Mapa
              </Link>
            </Button>
            <Button 
              onClick={handleAddToCart} 
              variant="outline"
              className="w-full border-indigo-200 text-indigo-800 hover:bg-indigo-50"
            >
              <ShoppingCart className="mr-2 h-4 w-4" /> Adicionar ao Carrinho
            </Button>
          </div>
        ) : (
          <Button 
            onClick={handleAddToCart} 
            className="w-full bg-indigo-900 hover:bg-indigo-800"
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Adicionar ao Carrinho
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
