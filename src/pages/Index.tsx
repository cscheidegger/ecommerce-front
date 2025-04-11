import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Product } from '../types';
import { ProductApi } from '../services/api';
import ProductCard from '@/components/ProductCard';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useSiteContent } from '../hooks/useSiteContent';

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const products = await ProductApi.getAllProducts();
        setProducts(products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const { content, isLoaded } = useSiteContent();

  {/* Hero Section */}
  return (
    <div>
      <section className="bg-gradient-to-b from-background to-muted py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-left md:pr-8">
              {isLoaded ? (
                <>
                  <h1 className="text-4xl md:text-5xl font-bold text-primary">{content.homepage.title}</h1>
                  <p className="text-xl md:text-2xl text-muted-foreground">{content.homepage.subtitle}</p>
                  <p className="text-muted-foreground">{content.homepage.description}</p>
                </>
              ) : (
                <>
                  <div className="h-8 w-3/4 bg-muted rounded animate-pulse"></div>
                  <div className="h-6 w-1/2 bg-muted rounded animate-pulse"></div>
                  <div className="h-20 w-full bg-muted rounded animate-pulse"></div>
                </>
              )}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-4">
                <Button asChild size="lg">
                  <Link to="/orcamento">Solicitar Orçamento</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/servicos">Nossos Serviços</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/hero-image.webp"
                alt="Impressão 3D"
                className="rounded-lg shadow-md w-full md:w-auto"
                style={{ maxWidth: '400px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-secondary">Produtos em Destaque</h2>
          <div className="mb-6">
            <Input
              type="text"
              placeholder="Pesquisar produtos..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full md:w-1/2 mx-auto"
            />
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="rounded-md bg-muted h-48 w-full"></div>
                  <div className="mt-2">
                    <div className="rounded-md bg-muted h-4 w-3/4"></div>
                    <div className="rounded-md bg-muted h-4 w-1/2 mt-2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-secondary">Nossos Serviços</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-card rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-primary">Impressão 3D Personalizada</h3>
              <p className="text-muted-foreground">Transforme suas ideias em realidade com nossa impressão 3D de alta qualidade.</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-primary">Modelagem 3D</h3>
              <p className="text-muted-foreground">Crie modelos 3D detalhados para protótipos, produtos e muito mais.</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-primary">Consultoria em Design</h3>
              <p className="text-muted-foreground">Obtenha orientação especializada para otimizar seus projetos de impressão 3D.</p>
            </div>
          </div>
          <div className="text-center mt-6">
            <Button asChild>
              <Link to="/servicos">Ver Todos os Serviços</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-lg mb-8">Solicite um orçamento e descubra como podemos ajudar a transformar suas ideias em realidade.</p>
          <Button asChild size="lg">
            <Link to="/orcamento">Solicitar Orçamento</Link>
          </Button>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Proteus.lab</h2>
              <p className="mb-2">Soluções avançadas em impressão 3D para todos os tipos de projetos.</p>
              {isLoaded && (
                <div className="mt-4 space-y-2">
                  <p className="flex items-center">
                    <Mail size={16} className="mr-2" />
                    {content.contact.email}
                  </p>
                  <p className="flex items-center">
                    <Phone size={16} className="mr-2" />
                    {content.contact.phone}
                  </p>
                  <p className="flex items-center">
                    <MapPin size={16} className="mr-2" />
                    {content.contact.address}
                  </p>
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-secondary">Página Inicial</Link></li>
                <li><Link to="/servicos" className="hover:text-secondary">Serviços</Link></li>
                <li><Link to="/produtos" className="hover:text-secondary">Produtos</Link></li>
                <li><Link to="/contato" className="hover:text-secondary">Contato</Link></li>
                <li><Link to="/orcamento" className="hover:text-secondary">Solicitar Orçamento</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contato</h3>
              <p>Entre em contato conosco para discutir suas necessidades de impressão 3D.</p>
              <p>Email: contato@proteus.lab.com.br</p>
              <p>Telefone: (11) 95555-9999</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Proteus.lab. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
