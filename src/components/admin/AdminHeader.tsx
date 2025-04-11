
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, User } from 'lucide-react';

interface AdminHeaderProps {
  onLogout: () => void;
}

const AdminHeader = ({ onLogout }: AdminHeaderProps) => {
  return (
    <header className="bg-primary text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-xl">Proteus.lab</span>
          <span className="text-sm px-2 py-1 bg-white/20 rounded">Admin</span>
        </div>
        
        <nav className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-1 text-white/80 hover:text-white">
            <Home size={18} />
            <span>Visualizar Site</span>
          </Link>
          
          <button 
            onClick={onLogout}
            className="flex items-center space-x-1 text-white/80 hover:text-white"
          >
            <User size={18} />
            <span>Sair</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
