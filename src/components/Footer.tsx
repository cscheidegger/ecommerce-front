
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e descrição */}
          <div className="col-span-1">
            <Link to="/" className="text-ecommerce-primary font-bold text-xl">
              CartWave
            </Link>
            <p className="mt-3 text-sm text-gray-600">
              Seu destino para as melhores compras online com produtos selecionados para você.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-gray-400 hover:text-ecommerce-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-ecommerce-primary">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-ecommerce-primary">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Links rápidos */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Links Rápidos</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-ecommerce-primary text-sm">
                  Página Inicial
                </Link>
              </li>
              <li>
                <Link to="/categorias" className="text-gray-600 hover:text-ecommerce-primary text-sm">
                  Categorias
                </Link>
              </li>
              <li>
                <Link to="/ofertas" className="text-gray-600 hover:text-ecommerce-primary text-sm">
                  Ofertas
                </Link>
              </li>
              <li>
                <Link to="/carrinho" className="text-gray-600 hover:text-ecommerce-primary text-sm">
                  Carrinho
                </Link>
              </li>
            </ul>
          </div>

          {/* Informações */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Informações</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/sobre" className="text-gray-600 hover:text-ecommerce-primary text-sm">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/politica-de-privacidade" className="text-gray-600 hover:text-ecommerce-primary text-sm">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/termos-de-uso" className="text-gray-600 hover:text-ecommerce-primary text-sm">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-ecommerce-primary text-sm">
                  Perguntas Frequentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Contato</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <span className="text-gray-600 text-sm">
                  Av. Tecnologia, 1000<br />
                  São Paulo, SP, 01234-000
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600 text-sm">(11) 1234-5678</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600 text-sm">contato@cartwave.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} CartWave. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
