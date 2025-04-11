
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from '@/lib/toast';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ExternalLinkIcon, FilePenIcon, EyeIcon, LockIcon } from 'lucide-react';
import { Quote, User } from '@/types';

const AdminPage = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [estimatedPrice, setEstimatedPrice] = useState<string>('');
  const [adminNotes, setAdminNotes] = useState<string>('');
  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const navigate = useNavigate();

  // Simulação de autenticação - em produção, isso seria integrado à autenticação real
  const authenticate = (pwd: string) => {
    // Senha simplificada para demonstração - em produção, usaria autenticação real
    if (pwd === 'proteus123') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      fetchQuotes();
    } else {
      toast.error('Senha incorreta');
    }
  };

  useEffect(() => {
    // Verificar se o admin já está autenticado (em produção, verificaria o token JWT)
    const isAuth = localStorage.getItem('adminAuthenticated') === 'true';
    setIsAuthenticated(isAuth);
    
    if (isAuth) {
      fetchQuotes();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchQuotes = async () => {
    setIsLoading(true);
    try {
      // Em produção, isso seria uma chamada real à API
      // const response = await fetch('/api/quotes', {
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // });
      // const data = await response.json();
      
      // Para fins de demonstração, usamos dados mockados
      const mockQuotes: Quote[] = [
        {
          id: 1,
          userId: 101,
          description: "Impressão 3D de protótipo para produto médico",
          files: ["arquivo1.stl", "especificacoes.pdf"],
          status: 'pending',
          estimatedPrice: 350,
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          driveUrl: 'https://drive.google.com/drive/folders/example1'
        },
        {
          id: 2,
          userId: 102,
          description: "Modelo 3D para peça automotiva",
          files: ["peca_motor.stl"],
          status: 'approved',
          estimatedPrice: 420.50,
          adminNotes: "Cliente aprovou o orçamento por telefone.",
          createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
          driveUrl: 'https://drive.google.com/drive/folders/example2'
        },
        {
          id: 3,
          userId: 103,
          description: "Miniatura personalizada para presente",
          files: ["boneco.obj", "textura.jpg"],
          status: 'rejected',
          adminNotes: "Impossível produzir no prazo solicitado.",
          createdAt: new Date(Date.now() - 86400000 * 1).toISOString()
        }
      ];
      
      setQuotes(mockQuotes);
    } catch (error) {
      console.error("Erro ao buscar orçamentos:", error);
      toast.error("Erro ao carregar os orçamentos");
    } finally {
      setIsLoading(false);
    }
  };

  const openQuoteDetails = (quote: Quote) => {
    setSelectedQuote(quote);
    setEstimatedPrice(quote.estimatedPrice?.toString() || '');
    setAdminNotes(quote.adminNotes || '');
    setStatus(quote.status);
  };

  const updateQuote = async () => {
    if (!selectedQuote) return;
    
    try {
      // Em produção, isso seria uma chamada real à API
      // const response = await fetch(`/api/quotes/${selectedQuote.id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify({
      //     status,
      //     estimatedPrice: parseFloat(estimatedPrice),
      //     adminNotes
      //   })
      // });
      
      // Simulando atualização do orçamento para demonstração
      const updatedQuotes = quotes.map(q => {
        if (q.id === selectedQuote.id) {
          return {
            ...q,
            status,
            estimatedPrice: estimatedPrice ? parseFloat(estimatedPrice) : undefined,
            adminNotes
          };
        }
        return q;
      });
      
      setQuotes(updatedQuotes);
      toast.success("Orçamento atualizado com sucesso");
      setSelectedQuote(null);
    } catch (error) {
      console.error("Erro ao atualizar orçamento:", error);
      toast.error("Erro ao atualizar o orçamento");
    }
  };

  const getStatusBadge = (status: 'pending' | 'approved' | 'rejected') => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Aprovado</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Rejeitado</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-6 bg-gray-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center">
                <LockIcon className="mr-2 h-5 w-5" />
                Área Administrativa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault();
                authenticate(password);
              }}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      id="password"
                      type="password"
                      placeholder="Senha de administrador"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Acessar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-6 bg-gray-50">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Orçamentos Solicitados</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center p-4">Carregando orçamentos...</div>
              ) : (
                <Table>
                  <TableCaption>Lista de orçamentos solicitados</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Preço Est.</TableHead>
                      <TableHead>Google Drive</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quotes.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center">
                          Nenhum orçamento encontrado
                        </TableCell>
                      </TableRow>
                    ) : (
                      quotes.map((quote) => (
                        <TableRow key={quote.id}>
                          <TableCell>{quote.id}</TableCell>
                          <TableCell>{formatDate(quote.createdAt)}</TableCell>
                          <TableCell className="max-w-xs truncate">{quote.description}</TableCell>
                          <TableCell>{getStatusBadge(quote.status)}</TableCell>
                          <TableCell>
                            {quote.estimatedPrice ? `R$ ${quote.estimatedPrice.toFixed(2)}` : '-'}
                          </TableCell>
                          <TableCell>
                            {quote.driveUrl ? (
                              <a 
                                href={quote.driveUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 flex items-center"
                              >
                                <ExternalLinkIcon className="h-4 w-4 mr-1" />
                                Link
                              </a>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => openQuoteDetails(quote)}
                                  >
                                    <EyeIcon className="h-4 w-4 mr-1" />
                                    Ver
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-lg">
                                  <DialogHeader>
                                    <DialogTitle>Detalhes do Orçamento #{selectedQuote?.id}</DialogTitle>
                                    <DialogDescription>
                                      Visualize e atualize as informações do orçamento.
                                    </DialogDescription>
                                  </DialogHeader>
                                  
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <span className="font-semibold">Descrição:</span>
                                      <span className="col-span-3">{selectedQuote?.description}</span>
                                    </div>
                                    
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <span className="font-semibold">Arquivos:</span>
                                      <div className="col-span-3">
                                        {selectedQuote?.files.map((file, index) => (
                                          <div key={index} className="text-sm">{file}</div>
                                        ))}
                                      </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <span className="font-semibold">Data:</span>
                                      <span className="col-span-3">
                                        {selectedQuote ? formatDate(selectedQuote.createdAt) : ''}
                                      </span>
                                    </div>
                                    
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <span className="font-semibold">Status:</span>
                                      <div className="col-span-3">
                                        <Select defaultValue={status} onValueChange={(value: any) => setStatus(value)}>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Selecione o status" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="pending">Pendente</SelectItem>
                                            <SelectItem value="approved">Aprovado</SelectItem>
                                            <SelectItem value="rejected">Rejeitado</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <span className="font-semibold">Preço Estimado (R$):</span>
                                      <Input
                                        type="number"
                                        step="0.01"
                                        value={estimatedPrice}
                                        onChange={(e) => setEstimatedPrice(e.target.value)}
                                        className="col-span-3"
                                      />
                                    </div>
                                    
                                    <div className="grid grid-cols-4 items-start gap-4">
                                      <span className="font-semibold">Notas Admin:</span>
                                      <Textarea
                                        value={adminNotes}
                                        onChange={(e) => setAdminNotes(e.target.value)}
                                        className="col-span-3"
                                        rows={4}
                                      />
                                    </div>
                                    
                                    {selectedQuote?.driveUrl && (
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <span className="font-semibold">Google Drive:</span>
                                        <div className="col-span-3">
                                          <a 
                                            href={selectedQuote.driveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 flex items-center"
                                          >
                                            <ExternalLinkIcon className="h-4 w-4 mr-1" />
                                            Abrir pasta no Drive
                                          </a>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  
                                  <DialogFooter>
                                    <Button variant="outline" onClick={() => setSelectedQuote(null)}>
                                      Cancelar
                                    </Button>
                                    <Button onClick={updateQuote}>
                                      Salvar Alterações
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
