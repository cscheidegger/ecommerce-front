
import React from 'react';
import InstagramFeed from '../components/InstagramFeed';

const Portfolio: React.FC = () => {
  // Set the document title using the useEffect hook
  React.useEffect(() => {
    document.title = 'Portfólio | Proteus.lab';
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-4">Nosso Portfólio</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Conheça alguns dos nossos projetos recentes diretamente do nosso Instagram.
          Trabalhamos com diversos materiais, tecnologias e aplicações para atender às
          necessidades específicas de cada cliente.
        </p>
      </div>
      
      <div className="my-8">
        <h2 className="text-2xl font-semibold mb-6">Projetos Recentes</h2>
        <InstagramFeed />
      </div>
      
      <div className="mt-12 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Quer seu projeto aqui?</h2>
        <p className="mb-6">
          Entre em contato conosco para discutir suas ideias e necessidades. Estamos prontos
          para transformar seu conceito em realidade com nossas soluções de impressão 3D.
        </p>
        <a 
          href="/quote" 
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md inline-block transition-colors"
        >
          Solicitar Orçamento
        </a>
      </div>
    </div>
  );
};

export default Portfolio;
