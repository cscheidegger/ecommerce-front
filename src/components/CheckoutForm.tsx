
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { OrderApi } from '../services/api';
import { Order } from '../types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/lib/toast';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const CheckoutForm: React.FC = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'credit-card'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (value: string) => {
    setFormData(prev => ({ ...prev, paymentMethod: value }));
  };

  const validateForm = () => {
    const { name, email, address } = formData;
    if (!name.trim()) {
      toast.error('Por favor, informe seu nome completo');
      return false;
    }
    if (!email.trim() || !email.includes('@')) {
      toast.error('Por favor, informe um e-mail válido');
      return false;
    }
    if (!address.trim()) {
      toast.error('Por favor, informe seu endereço completo');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (cart.length === 0) {
      toast.error('Seu carrinho está vazio');
      return;
    }

    try {
      setIsSubmitting(true);

      const orderData: Order = {
        items: cart,
        total: cartTotal,
        customer: {
          name: formData.name,
          email: formData.email,
          address: formData.address
        },
        paymentMethod: formData.paymentMethod
      };

      const response = await OrderApi.createOrder(orderData);
      
      // Limpa o carrinho após o pedido bem-sucedido
      clearCart();
      
      // Redireciona para uma página de confirmação
      toast.success('Pedido realizado com sucesso!');
      navigate(`/pedido-confirmado/${response.id}`);
      
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error);
      toast.error('Erro ao finalizar pedido. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações de Entrega e Pagamento</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ex: Maria Silva"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Ex: seu.email@exemplo.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Endereço Completo</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Rua, número, bairro, cidade, CEP"
              required
            />
          </div>
          
          <div className="space-y-3 pt-2">
            <Label>Método de Pagamento</Label>
            <RadioGroup 
              value={formData.paymentMethod}
              onValueChange={handlePaymentMethodChange}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="credit-card" id="credit-card" />
                <Label htmlFor="credit-card">Cartão de Crédito</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pix" id="pix" />
                <Label htmlFor="pix">PIX</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="boleto" id="boleto" />
                <Label htmlFor="boleto">Boleto Bancário</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                Processando...
              </>
            ) : (
              `Finalizar Compra - R$ ${cartTotal.toFixed(2)}`
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CheckoutForm;
