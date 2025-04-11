
import React from 'react';
import { useCart } from '../contexts/CartContext';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag } from 'lucide-react';

const CartSummary: React.FC = () => {
  const { cart, cartTotal } = useCart();
  
  const subtotal = cartTotal;
  const shipping = subtotal > 100 ? 0 : 15; // Frete grátis para compras acima de R$ 100
  const total = subtotal + shipping;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ShoppingBag className="mr-2 h-5 w-5" />
          Resumo do Pedido
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Itens do carrinho */}
          <div className="space-y-2">
            {cart.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="text-gray-600 flex-1 truncate pr-4">
                  {item.quantity} x {item.product.title}
                </span>
                <span className="font-medium">
                  R$ {(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          
          <Separator />
          
          {/* Valores */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>R$ {subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Frete</span>
              <span>{shipping > 0 ? `R$ ${shipping.toFixed(2)}` : 'Grátis'}</span>
            </div>
          </div>
          
          <Separator />
          
          {/* Total */}
          <div className="flex justify-between font-medium text-lg">
            <span>Total</span>
            <span className="text-ecommerce-primary">R$ {total.toFixed(2)}</span>
          </div>
          
          {/* Mensagem promocional */}
          {subtotal < 100 && (
            <p className="text-sm text-ecommerce-accent mt-2">
              Adicione mais R$ {(100 - subtotal).toFixed(2)} para ganhar frete grátis!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CartSummary;
