
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartItem from '../components/CartItem';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, ArrowLeft, Trash2, CreditCard } from 'lucide-react';

const Cart = () => {
  const { cart, clearCart, cartTotal } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <ShoppingCart className="mr-2 h-6 w-6" />
          Carrinho de Compras
        </h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="bg-gray-100 p-6 rounded-full mb-4">
              <ShoppingCart className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Seu carrinho está vazio</h2>
            <p className="text-gray-600 mb-6 text-center max-w-md">
              Parece que você ainda não adicionou nenhum produto ao seu carrinho.
              Explore nossa loja e descubra produtos incríveis!
            </p>
            <Button asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continuar Comprando
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de produtos */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle>Produtos ({cart.length})</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={clearCart}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Limpar Carrinho
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {cart.map((item) => (
                    <CartItem key={item.product.id} item={item} />
                  ))}
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline" asChild>
                    <Link to="/">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Continuar Comprando
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Resumo do pedido */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>R$ {cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frete</span>
                    <span>{cartTotal > 100 ? 'Grátis' : 'R$ 15,00'}</span>
                  </div>

                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-ecommerce-primary">
                      R$ {(cartTotal + (cartTotal > 100 ? 0 : 15)).toFixed(2)}
                    </span>
                  </div>

                  {cartTotal < 100 && (
                    <p className="text-sm text-ecommerce-accent">
                      Adicione mais R$ {(100 - cartTotal).toFixed(2)} para ganhar frete grátis!
                    </p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link to="/checkout">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Finalizar Compra
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
