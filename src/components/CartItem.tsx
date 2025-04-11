
import React from 'react';
import { CartItem as CartItemType } from '../types';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const handleIncreaseQuantity = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b shopping-cart-item">
      <div className="flex-shrink-0 w-full sm:w-20 h-20 mb-4 sm:mb-0 mr-0 sm:mr-4">
        <Link to={`/produto/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-contain"
          />
        </Link>
      </div>
      
      <div className="flex-grow">
        <Link to={`/produto/${product.id}`}>
          <h3 className="font-medium text-base mb-1">{product.title}</h3>
        </Link>
        <p className="text-sm text-gray-600 mb-2">{product.category}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="icon"
              className="h-8 w-8 rounded-full" 
              onClick={handleDecreaseQuantity}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="mx-3 w-6 text-center">{quantity}</span>
            <Button 
              variant="outline" 
              size="icon"
              className="h-8 w-8 rounded-full" 
              onClick={handleIncreaseQuantity}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <div className="ml-auto flex items-center">
            <span className="font-medium text-ecommerce-primary mr-4">
              R$ {totalPrice.toFixed(2)}
            </span>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={handleRemove}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
