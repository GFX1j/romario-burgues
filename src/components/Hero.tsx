import { Button } from '@/components/ui/button';
import heroBg from '@/assets/hero-bg.jpg';

interface HeroProps {
  onMenuClick: () => void;
}

export const Hero = ({ onMenuClick }: HeroProps) => {
  const scrollToMenu = () => {
    const menuElement = document.getElementById('menu');
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Os Melhores
            <br />
            <span className="text-yellow-300">Hambúrgueres</span>
            <br />
            da Região
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Sabor autêntico, ingredientes frescos e o melhor atendimento de Buenos Aires - PE
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              onClick={scrollToMenu}
              className="btn-hero text-lg px-8 py-4 animate-bounce-in"
            >
              Ver Cardápio
            </Button>
            
            <div className="flex items-center space-x-4 text-lg">
              <div className="flex items-center space-x-2">
                <span className="animate-pulse">🕐</span>
                <span>18:00 às 23:59</span>
              </div>
              <div className="hidden sm:block w-1 h-6 bg-white/30" />
              <div className="flex items-center space-x-2">
                <span className="animate-pulse">🚚</span>
                <span>Taxa R$ 3,00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-up">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="text-4xl mb-4">🍔</div>
            <h3 className="text-xl font-semibold mb-2">Receitas Exclusivas</h3>
            <p className="text-gray-200">Blends artesanais e molhos especiais da casa</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Entrega Rápida</h3>
            <p className="text-gray-200">Seu pedido quentinho em até 30 minutos</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="text-4xl mb-4">💎</div>
            <h3 className="text-xl font-semibold mb-2">Qualidade Premium</h3>
            <p className="text-gray-200">Ingredientes selecionados e frescos diariamente</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};