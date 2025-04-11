
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CheckoutForm from '../components/CheckoutForm';
import CartSummary from '../components/CartSummary';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CreditCard } from 'lucide-react';

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  // Redirecionar se o carrinho estiver vazio
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/carrinho');
    }
  }, [cart, navigate]);

  if (cart.length === 0) {
    return null; // Não renderiza nada enquanto redireciona
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center mb-6">
            <Button variant="ghost" className="p-0 mr-4" onClick={() => navigate('/carrinho')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold flex items-center">
              <CreditCard className="mr-2 h-6 w-6" />
              Finalizar Compra
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Formulário de checkout */}
            <div className="lg:col-span-3">
              <CheckoutForm />
            </div>

            {/* Resumo do carrinho */}
            <div className="lg:col-span-2">
              <CartSummary />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
