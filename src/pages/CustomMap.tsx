
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/lib/toast';
import { useCart } from '../contexts/CartContext';
import { mockProducts } from '../data/mockProducts';
import { MapPin, Upload, MapIcon, Mail, Info } from 'lucide-react';

const sizeOptions = [
  { id: 'letter', label: 'Carta (21,6 x 27,9 cm)', price: 160 },
  { id: 'a4', label: 'A4 (21 x 29,7 cm)', price: 170 },
  { id: 'medium', label: 'Médio (30 x 40 cm)', price: 240 },
  { id: 'large', label: 'Grande (40 x 60 cm)', price: 320 }
];

const CustomMap = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [address, setAddress] = useState('');
  const [details, setDetails] = useState('');
  const [size, setSize] = useState('letter');
  const [loading, setLoading] = useState(false);

  // Find the map product to use as base
  const baseMapProduct = mockProducts.find(p => p.category === 'mapas') || mockProducts[0];
  
  const getSelectedSizePrice = () => {
    const selected = sizeOptions.find(option => option.id === size);
    return selected?.price || 160;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address.trim()) {
      toast.error('Por favor, informe o endereço para o mapa');
      return;
    }
    
    setLoading(true);
    
    // Create a customized product based on the map product
    const customProduct = {
      ...baseMapProduct,
      id: Date.now(), // Generate a unique ID for this custom product
      title: `Mapa 3D Personalizado - ${size.toUpperCase()}`,
      price: getSelectedSizePrice(),
      description: `Mapa 3D personalizado: ${address}${details ? ` - ${details}` : ''}. Tamanho: ${sizeOptions.find(o => o.id === size)?.label}.`
    };
    
    // Simulate processing time
    setTimeout(() => {
      addToCart(customProduct, 1);
      toast.success('Mapa personalizado adicionado ao carrinho!');
      setLoading(false);
      navigate('/carrinho');
    }, 1500);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <div className="sticky top-24">
              <div className="p-6 border border-indigo-200 rounded-lg bg-indigo-50 mb-6">
                <h1 className="text-2xl font-bold mb-4 flex items-center text-indigo-900">
                  <MapPin className="mr-2 h-6 w-6" />
                  Peça seu Mapa 3D Personalizado
                </h1>
                
                <p className="mb-4 text-indigo-800">
                  Criamos mapas 3D impressos personalizados do seu endereço ou local favorito. 
                  Perfeito como uma lembrança especial ou um presente único.
                </p>
                
                <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
                  <h3 className="font-semibold text-lg mb-2 flex items-center">
                    <Info className="h-4 w-4 mr-2 text-indigo-600" />
                    Informações do produto:
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Impresso em PLA de alta qualidade</li>
                    <li>• Várias opções de tamanho disponíveis</li>
                    <li>• Inclui as ruas, edificações e características topográficas</li>
                    <li>• Tempo de produção: 3-5 dias úteis</li>
                    <li>• Envio para todo o Brasil</li>
                  </ul>
                </div>
                
                <img 
                  src="/lovable-uploads/3fdf39fa-bd53-4929-9a88-d4687659317c.png" 
                  alt="Exemplo de Mapa 3D" 
                  className="w-full rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-6">Personalize seu mapa</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <Label htmlFor="address" className="text-base mb-2 block font-medium">
                    Endereço ou local para o mapa*
                  </Label>
                  <Input
                    id="address"
                    placeholder="Ex: Av. Paulista, 1000, São Paulo, SP"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="h-12"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Informe o endereço ou local com o máximo de detalhes possível
                  </p>
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="details" className="text-base mb-2 block font-medium">
                    Detalhes adicionais (opcional)
                  </Label>
                  <Textarea
                    id="details"
                    placeholder="Ex: Gostaria que destacasse o parque próximo, prefiro cores em tons de azul..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="min-h-24"
                  />
                </div>
                
                <div className="mb-8">
                  <Label className="text-base mb-4 block font-medium">
                    Tamanho do mapa
                  </Label>
                  <RadioGroup
                    value={size}
                    onValueChange={setSize}
                    className="space-y-4"
                  >
                    {sizeOptions.map((option) => (
                      <div key={option.id} className="flex items-center justify-between space-x-2 border p-3 rounded-md hover:bg-gray-50">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem id={option.id} value={option.id} />
                          <Label htmlFor={option.id} className="cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                        <span className="font-semibold text-indigo-700">
                          R$ {option.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <Separator className="my-6" />
                
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-indigo-700">R$ {getSelectedSizePrice().toFixed(2)}</span>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base bg-indigo-900 hover:bg-indigo-800"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Processando...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <MapIcon className="mr-2 h-5 w-5" />
                        Adicionar ao carrinho
                      </span>
                    )}
                  </Button>
                  
                  <p className="text-sm text-gray-500 text-center">
                    Entraremos em contato para confirmar os detalhes do mapa antes da impressão
                  </p>
                </div>
              </form>
            </div>
            
            <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Mail className="mr-2 h-5 w-5 text-indigo-700" />
                Precisa de ajuda?
              </h3>
              <p className="text-gray-700 mb-4">
                Entre em contato conosco para tamanhos personalizados ou outros detalhes específicos.
              </p>
              <Button
                variant="outline"
                className="w-full border-indigo-300 text-indigo-800 hover:bg-indigo-50"
                onClick={() => navigate('/contato')}
              >
                Contato
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomMap;
