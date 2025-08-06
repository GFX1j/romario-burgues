import { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import logo from '@/assets/logo.png';

interface HeaderProps {
  onCartClick: () => void;
  onSectionClick: (section: string) => void;
}

export const Header = ({ onCartClick, onSectionClick }: HeaderProps) => {
  const { itemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Início', section: 'hero' },
    { label: 'Cardápio', section: 'menu' },
    { label: 'Sobre', section: 'about' },
    { label: 'Contato', section: 'contact' }
  ];

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#030236] to-[#110a27]/90 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer animate-fade-in"
            onClick={() => scrollToSection('hero')}
          >
            <img 
              src={logo} 
              alt="American Burguer" 
              className="h-12 w-12 rounded-lg shadow-md hover:scale-110 transition-transform duration-300" 
            />
            <div>
              <h1 className="text-xl font-bold text-white">American Burguer</h1>
              <p className="text-xs text-white/70">Buenos Aires - PE</p>
            </div>
          </div>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <button
                key={item.section}
                onClick={() => scrollToSection(item.section)}
                className="text-white hover:text-primary font-medium transition-colors duration-300 hover:scale-105"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Cart e Menu Mobile */}
          <div className="flex items-center space-x-4">
            {/* Carrinho */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={onCartClick}
                className="bg-[#1a1a2e] border-gray-400 text-white hover:bg-[#16213e] hover:border-gray-300 transition-all duration-300 hover:scale-105"
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
              {itemCount > 0 && (
                <Badge className="cart-badge">
                  {itemCount}
                </Badge>
              )}
            </div>

            {/* Menu Mobile Toggle */}
            <Button
              variant="outline"
              size="sm"
              className="md:hidden bg-white/10 border-white/20 text-white hover:bg-primary hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-white/20 animate-slide-up">
            <div className="flex flex-col space-y-3 pt-4">
              {menuItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => scrollToSection(item.section)}
                  className="text-left text-white hover:text-primary font-medium transition-colors duration-300 py-2"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};