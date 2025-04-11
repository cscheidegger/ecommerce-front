
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar: React.FC = () => {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const NavLinks = () => (
    <>
      <Link to="/" className="hover:text-blue-500 transition-colors">
        Início
      </Link>
      <Link to="/categories" className="hover:text-blue-500 transition-colors">
        Produtos
      </Link>
      <Link to="/portfolio" className="hover:text-blue-500 transition-colors">
        Portfólio
      </Link>
      <Link to="/services" className="hover:text-blue-500 transition-colors">
        Serviços
      </Link>
      <Link to="/quote" className="hover:text-blue-500 transition-colors">
        Orçamento
      </Link>
      <Link to="/contact" className="hover:text-blue-500 transition-colors">
        Contato
      </Link>
    </>
  );

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Proteus.lab
        </Link>

        {isMobile ? (
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-6 mt-8">
                  <NavLinks />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-6">
              <NavLinks />
            </div>
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
