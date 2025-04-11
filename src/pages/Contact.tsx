
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/lib/toast';
import { Mail, Phone, MapPin } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { useSiteContent } from '../hooks/useSiteContent';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres' }),
  email: z.string().email({ message: 'E-mail inválido' }),
  subject: z.string().min(3, { message: 'Assunto deve ter pelo menos 3 caracteres' }),
  message: z.string().min(10, { message: 'Mensagem deve ter pelo menos 10 caracteres' }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    console.log('Form values:', values);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Mensagem enviada com sucesso! Retornaremos em breve.');
    form.reset();
  };

  const { content, isLoaded } = useSiteContent();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2 text-center">Contato</h1>
          <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            Tem alguma dúvida sobre nossos serviços de impressão 3D? Entre em contato conosco.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-6">Informações de Contato</h2>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Informações de Contato</h3>
                    
                    {isLoaded ? (
                      <div className="space-y-2">
                        <p className="flex items-center">
                          <Mail size={18} className="mr-2 text-primary" />
                          <span>{content.contact.email}</span>
                        </p>
                        <p className="flex items-center">
                          <Phone size={18} className="mr-2 text-primary" />
                          <span>{content.contact.phone}</span>
                        </p>
                        <p className="flex items-center">
                          <MapPin size={18} className="mr-2 text-primary" />
                          <span>{content.contact.address}</span>
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="h-6 w-3/4 bg-muted rounded animate-pulse"></div>
                        <div className="h-6 w-2/3 bg-muted rounded animate-pulse"></div>
                        <div className="h-6 w-full bg-muted rounded animate-pulse"></div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="font-medium mb-3">Horário de Atendimento</h3>
                    <p className="text-gray-600">
                      Segunda a Sexta: 9h às 18h<br />
                      Sábado: 9h às 13h
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-6">Envie-nos uma mensagem</h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome</FormLabel>
                              <FormControl>
                                <Input placeholder="Seu nome" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>E-mail</FormLabel>
                              <FormControl>
                                <Input placeholder="seu@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Assunto</FormLabel>
                            <FormControl>
                              <Input placeholder="Assunto da mensagem" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mensagem</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Escreva sua mensagem aqui" 
                                className="h-32"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full md:w-auto">
                        Enviar Mensagem
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
