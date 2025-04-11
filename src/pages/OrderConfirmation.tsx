
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, Home, Package } from 'lucide-react';

const OrderConfirmation = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Se não houver ID, redirecionar para a página inicial
  useEffect(() => {
    if (!id) {
      navigate('/');
    }
  }, [id, navigate]);

  if (!id) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-green-100 p-8 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Pedido Confirmado!</h1>
          
          <p className="text-xl mb-2">Obrigado pela sua compra</p>
          <p className="text-gray-600 mb-6">
            Seu pedido #{id} foi recebido e está sendo processado.
          </p>
          
          <div className="bg-white shadow-sm border border-gray-100 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Informações do Pedido</h2>
            
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Número do Pedido:</span>
              <span className="font-medium">{id}</span>
            </div>
            
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Data:</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-medium text-green-500">Pagamento Confirmado</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Página Inicial
              </Link>
            </Button>
            
            <Button variant="outline" asChild>
              <Link to={`/rastrear-pedido/${id}`}>
                <Package className="mr-2 h-4 w-4" />
                Rastrear Pedido
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
