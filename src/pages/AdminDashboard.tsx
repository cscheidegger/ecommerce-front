
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import AdminHeader from '@/components/admin/AdminHeader';
import ContentManager from '@/components/admin/ContentManager';
import ProductsManager from '@/components/admin/ProductsManager';
import QuotesManager from '@/components/admin/QuotesManager';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Verificação simples de autenticação
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader onLogout={handleLogout} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-secondary">Painel Administrativo</h1>
          <Button variant="destructive" onClick={handleLogout}>
            Sair
          </Button>
        </div>
        
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="content">Conteúdo</TabsTrigger>
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="quotes">Orçamentos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content">
            <ContentManager />
          </TabsContent>
          
          <TabsContent value="products">
            <ProductsManager />
          </TabsContent>
          
          <TabsContent value="quotes">
            <QuotesManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
