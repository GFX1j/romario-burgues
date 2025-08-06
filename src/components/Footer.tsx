import { Heart, Instagram, MessageCircle } from 'lucide-react';
import logo from '@/assets/logo.png';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleWhatsApp = () => {
    window.open('https://w.app/americanburguer', '_blank');
  };

  const handleInstagram = () => {
    window.open('https://instagram.com/americanburguer', '_blank');
  };

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={logo} 
                alt="American Burguer" 
                className="h-12 w-12 rounded-lg" 
              />
              <div>
                <h3 className="text-xl font-bold">American Burguer</h3>
                <p className="text-sm text-background/70">Buenos Aires - PE</p>
              </div>
            </div>
            <p className="text-background/80 leading-relaxed mb-4">
              Os melhores hambúrgueres artesanais da região, preparados com ingredientes frescos 
              e muito carinho. Sabor autêntico que você não vai esquecer!
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleWhatsApp}
                className="bg-green-500 hover:bg-green-600 p-3 rounded-full transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </button>
              <button
                onClick={handleInstagram}
                className="bg-pink-500 hover:bg-pink-600 p-3 rounded-full transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-background/80">
              <li>
                <a href="#hero" className="hover:text-background transition-colors duration-300">
                  Início
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-background transition-colors duration-300">
                  Cardápio
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-background transition-colors duration-300">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-background transition-colors duration-300">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Informações */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Informações</h4>
            <ul className="space-y-2 text-background/80 text-sm">
              <li>📍 Buenos Aires - PE</li>
              <li>🕐 18:00 às 23:59</li>
              <li>📱 +55 81 7343-7435</li>
              <li>🚚 Taxa de entrega: R$ 3,00</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-background/60 text-sm flex items-center justify-center gap-2">
            © {currentYear} American Burguer. Feito com 
                            <Heart className="h-4 w-4 text-primary fill-current" />
            em Buenos Aires - PE
          </p>
        </div>
      </div>
    </footer>
  );
};