
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

const ProductsManager = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  
  // Estado inicial dos produtos
  const initialProducts: Product[] = [
    { id: 1, name: 'Suporte para Smartphone', price: 35.90, category: 'Acessórios' },
    { id: 2, name: 'Miniatura Articulada', price: 49.90, category: 'Decoração' },
    { id: 3, name: 'Componente Mecânico', price: 78.50, category: 'Peças Técnicas' },
  ];
  
  // Carregar produtos do localStorage ou usar os produtos de exemplo
  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem('adminProducts');
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  });

  // Produto em edição
  const [editProduct, setEditProduct] = useState<Product>({
    id: 0,
    name: '',
    price: 0,
    category: ''
  });

  // Salvar produtos no localStorage sempre que forem alterados
  useEffect(() => {
    localStorage.setItem('adminProducts', JSON.stringify(products));
  }, [products]);

  const handleDelete = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
    toast({
      title: "Produto removido",
      description: "O produto foi removido com sucesso.",
    });
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setEditProduct({ ...product });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setCurrentProduct(null);
    setEditProduct({
      id: Math.max(0, ...products.map(p => p.id)) + 1,
      name: '',
      price: 0,
      category: ''
    });
    setIsDialogOpen(true);
  };

  const handleSaveProduct = () => {
    if (currentProduct) {
      // Editar produto existente
      setProducts(products.map(p => p.id === currentProduct.id ? editProduct : p));
      toast({
        title: "Produto atualizado",
        description: "O produto foi atualizado com sucesso.",
      });
    } else {
      // Adicionar novo produto
      setProducts([...products, editProduct]);
      toast({
        title: "Produto adicionado",
        description: "O produto foi adicionado com sucesso.",
      });
    }
    setIsDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Gerenciar Produtos</CardTitle>
        <Button className="flex items-center space-x-1" onClick={handleAdd}>
          <PlusCircle size={16} />
          <span>Novo Produto</span>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentProduct ? 'Editar Produto' : 'Adicionar Produto'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Produto</Label>
                <Input 
                  id="name" 
                  value={editProduct.name} 
                  onChange={(e) => setEditProduct({...editProduct, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Preço (R$)</Label>
                <Input 
                  id="price" 
                  type="number" 
                  step="0.01"
                  value={editProduct.price} 
                  onChange={(e) => setEditProduct({...editProduct, price: parseFloat(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Input 
                  id="category" 
                  value={editProduct.category} 
                  onChange={(e) => setEditProduct({...editProduct, category: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
              <Button onClick={handleSaveProduct}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ProductsManager;
