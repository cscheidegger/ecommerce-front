
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductList from '../components/ProductList';
import { ProductApi } from '../services/api';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const Categories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await ProductApi.getCategories();
        setCategories(data);
        setError(null);
      } catch (err) {
        setError('Falha ao carregar categorias. Por favor, tente novamente mais tarde.');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <ShoppingBag className="mr-2 h-6 w-6" />
          Categorias
        </h1>

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full max-w-md rounded-lg" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-32 rounded-lg" />
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Tentar novamente
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <Button
                variant={activeCategory === 'all' ? 'default' : 'outline'}
                className="h-32 flex flex-col gap-2 text-lg"
                onClick={() => setActiveCategory('all')}
              >
                <ShoppingBag className="h-8 w-8" />
                <span>Todos os Produtos</span>
              </Button>
              
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? 'default' : 'outline'}
                  className="h-32 flex flex-col gap-2 text-lg"
                  onClick={() => setActiveCategory(category)}
                >
                  <ShoppingBag className="h-8 w-8" />
                  <span>{capitalizeFirstLetter(category)}</span>
                </Button>
              ))}
            </div>

            <Tabs defaultValue={activeCategory} value={activeCategory} className="w-full">
              <TabsList className="mb-8 w-full overflow-x-auto flex-wrap justify-start">
                <TabsTrigger
                  value="all"
                  onClick={() => setActiveCategory('all')}
                  className="px-4 py-2"
                >
                  Todos
                </TabsTrigger>
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    onClick={() => setActiveCategory(category)}
                    className="px-4 py-2 whitespace-nowrap"
                  >
                    {capitalizeFirstLetter(category)}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value={activeCategory} className="mt-0">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">
                    {activeCategory === 'all' 
                      ? 'Todos os Produtos' 
                      : capitalizeFirstLetter(activeCategory)}
                  </h2>
                  
                  {activeCategory !== 'all' && (
                    <Link 
                      to="/" 
                      className="text-ecommerce-primary hover:underline flex items-center"
                      onClick={() => setActiveCategory('all')}
                    >
                      Ver todos <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  )}
                </div>
                
                <ProductList category={activeCategory === 'all' ? undefined : activeCategory} />
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Categories;
