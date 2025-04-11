import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Printer, 
  Box, 
  Layers, 
  Package, 
  Brush, 
  FileEdit,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const servicesData = [
  {
    icon: Printer,
    title: "Impressão 3D Padrão",
    description: "Impressão 3D com filamentos PLA, ABS, PETG em diversos acabamentos. Ideal para protótipos, peças funcionais e modelo de visualização.",
    price: "A partir de R$ 0,30/g",
    details: [
      "Altura de camada: 0.1mm - 0.3mm",
      "Diversos acabamentos disponíveis",
      "Cores variadas",
      "Prazos a partir de 24h"
    ]
  },
  {
    icon: Layers,
    title: "Impressão em Resina",
    description: "Impressão SLA com alta definição e excelente acabamento. Perfeito para modelos detalhados, miniaturas e peças com alta precisão.",
    price: "A partir de R$ 1,20/ml",
    details: [
      "Alta resolução (0.05mm)",
      "Acabamento liso e detalhado",
      "Resinas especiais disponíveis",
      "Perfeito para peças pequenas e detalhadas"
    ]
  },
  {
    icon: Box,
    title: "Modelagem 3D",
    description: "Transformamos sua ideia em um modelo 3D pronto para impressão. Desenvolvido por designers especializados em modelagem para fabricação.",
    price: "A partir de R$ 150,00",
    details: [
      "Arquivos em formatos STL, OBJ e 3MF",
      "Modelos otimizados para impressão",
      "Múltiplas revisões incluídas",
      "Design personalizado"
    ]
  },
  {
    icon: FileEdit,
    title: "Reparação de Arquivos",
    description: "Corrigimos problemas em seus arquivos 3D, como malhas não-manifold, buracos, faces invertidas e outros defeitos comuns.",
    price: "A partir de R$ 50,00",
    details: [
      "Correção de erros de topologia",
      "Otimização para impressão",
      "Redução de polígonos",
      "Verificação de espessura mínima"
    ]
  },
  {
    icon: Brush,
    title: "Acabamento Profissional",
    description: "Serviços de pós-processamento para suas peças impressas, incluindo lixamento, pintura, montagem e aplicação de revestimentos.",
    price: "A partir de R$ 80,00",
    details: [
      "Lixamento e polimento",
      "Pintura profissional",
      "Revestimentos especiais",
      "Montagem de peças múltiplas"
    ]
  },
  {
    icon: Package,
    title: "Produção em Lote",
    description: "Solução perfeita para quem precisa de múltiplas peças. Oferecemos descontos progressivos conforme a quantidade aumenta.",
    price: "Sob consulta",
    details: [
      "Descontos por volume",
      "Controle de qualidade rigoroso",
      "Rastreamento de produção",
      "Embalagem personalizada opcional"
    ]
  }
];

const Services = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-indigo-900 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Serviços de Impressão 3D Profissional
            </h1>
            <p className="text-lg max-w-3xl mx-auto mb-8">
              Oferecemos soluções completas de impressão 3D para transformar suas ideias em realidade,
              desde a modelagem até o produto final acabado.
            </p>
            <Button 
              className="bg-yellow-400 text-indigo-900 hover:bg-yellow-300"
              size="lg"
              asChild
            >
              <Link to="/orcamento">
                Solicitar Orçamento
              </Link>
            </Button>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-12 text-center">Nossos Serviços</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesData.map((service, index) => (
                <Card key={index} className="h-full">
                  <CardContent className="pt-6 h-full flex flex-col">
                    <div className="bg-indigo-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                      <service.icon className="h-8 w-8 text-indigo-600" />
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
                    
                    <div className="bg-gray-50 p-4 rounded-md mb-4">
                      <p className="font-semibold text-indigo-700 mb-2">{service.price}</p>
                      <ul className="text-sm space-y-1">
                        {service.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-indigo-500 mr-2">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/orcamento">
                        Solicitar <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-12 text-center">Como Funciona</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-indigo-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <span className="text-indigo-700 font-bold text-xl">1</span>
                  <div className="hidden md:block absolute h-1 bg-indigo-200 w-full right-0 top-1/2 -translate-y-1/2 translate-x-1/2"></div>
                </div>
                <h3 className="font-semibold mb-2">Envio do Arquivo</h3>
                <p className="text-gray-600 text-sm">
                  Envie seu arquivo STL ou nos conte sobre seu projeto para modelagem
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-indigo-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <span className="text-indigo-700 font-bold text-xl">2</span>
                  <div className="hidden md:block absolute h-1 bg-indigo-200 w-full right-0 top-1/2 -translate-y-1/2 translate-x-1/2"></div>
                </div>
                <h3 className="font-semibold mb-2">Análise e Orçamento</h3>
                <p className="text-gray-600 text-sm">
                  Verificamos o arquivo e enviamos o orçamento detalhado em até 24h
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-indigo-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <span className="text-indigo-700 font-bold text-xl">3</span>
                  <div className="hidden md:block absolute h-1 bg-indigo-200 w-full right-0 top-1/2 -translate-y-1/2 translate-x-1/2"></div>
                </div>
                <h3 className="font-semibold mb-2">Produção</h3>
                <p className="text-gray-600 text-sm">
                  Após aprovação e pagamento, iniciamos a impressão e acabamento
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-indigo-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-indigo-700 font-bold text-xl">4</span>
                </div>
                <h3 className="font-semibold mb-2">Entrega</h3>
                <p className="text-gray-600 text-sm">
                  Enviamos sua peça pronta para todo o Brasil via Correios ou transportadoras
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-indigo-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Pronto para começar seu projeto?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Entre em contato agora mesmo ou solicite um orçamento imediato para seu projeto de impressão 3D.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                className="bg-yellow-400 text-indigo-900 hover:bg-yellow-300"
                size="lg"
                asChild
              >
                <Link to="/orcamento">
                  Solicitar Orçamento
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white/10"
                size="lg"
                asChild
              >
                <Link to="/contato">
                  Fale Conosco
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
