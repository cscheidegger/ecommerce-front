
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, CheckCircle, XCircle } from 'lucide-react';

const QuotesManager = () => {
  // Orçamentos de exemplo
  const quotes = [
    { 
      id: 1, 
      client: 'João Silva', 
      email: 'joao@example.com', 
      date: '05/04/2025', 
      status: 'pending',
      files: 2
    },
    { 
      id: 2, 
      client: 'Maria Oliveira', 
      email: 'maria@example.com', 
      date: '03/04/2025', 
      status: 'approved',
      files: 1
    },
    { 
      id: 3, 
      client: 'Carlos Fernandes', 
      email: 'carlos@example.com', 
      date: '02/04/2025', 
      status: 'rejected',
      files: 3
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Pendente</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Aprovado</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Rejeitado</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciar Orçamentos</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Arquivos</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quotes.map((quote) => (
              <TableRow key={quote.id}>
                <TableCell>{quote.id}</TableCell>
                <TableCell>{quote.client}</TableCell>
                <TableCell>{quote.email}</TableCell>
                <TableCell>{quote.date}</TableCell>
                <TableCell>{quote.files} arquivo(s)</TableCell>
                <TableCell>{getStatusBadge(quote.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye size={16} />
                    </Button>
                    <Button variant="outline" size="sm" className="text-green-600">
                      <CheckCircle size={16} />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600">
                      <XCircle size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default QuotesManager;
