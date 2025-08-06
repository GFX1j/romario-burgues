import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';

interface HeroProps {
  onMenuClick: () => void;
}

export const Hero = ({ onMenuClick }: HeroProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const scrollToMenu = () => {
    const menuElement = document.getElementById('menu');
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar canvas para tela cheia
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Partículas de brasas/fogos
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    // Criar partículas iniciais
    const createParticles = () => {
      for (let i = 0; i < 150; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: canvas.height + Math.random() * 100,
          vx: (Math.random() - 0.5) * 2,
          vy: -Math.random() * 3 - 1,
          size: Math.random() * 4 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          color: `hsl(${Math.random() * 30 + 15}, 100%, ${Math.random() * 30 + 50}%)`
        });
      }
    };

    createParticles();

    // Função de animação
    const animate = () => {
      // Criar gradiente de fundo
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#030236'); // Azul escuro no topo
      gradient.addColorStop(0.5, '#440917'); // Vermelho escuro no meio
      gradient.addColorStop(1, '#980013'); // Vermelho escuro na base

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Atualizar e desenhar partículas
      particles.forEach((particle, index) => {
        // Atualizar posição
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.opacity -= 0.005;

        // Desenhar partícula
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Adicionar brilho
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = particle.size * 2;
        ctx.fill();

        ctx.restore();

        // Remover partículas que saíram da tela ou ficaram transparentes
        if (particle.y < -10 || particle.opacity <= 0) {
          particles.splice(index, 1);
        }
      });

      // Adicionar novas partículas
      if (particles.length < 150) {
        for (let i = 0; i < 3; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 50,
            vx: (Math.random() - 0.5) * 2,
            vy: -Math.random() * 3 - 1,
            size: Math.random() * 4 + 1,
            opacity: Math.random() * 0.8 + 0.2,
            color: `hsl(${Math.random() * 30 + 15}, 100%, ${Math.random() * 30 + 50}%)`
          });
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col justify-center overflow-hidden py-20"
    >
      {/* Canvas com animação de brasas/fogos */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />
      
      {/* Overlay sutil para melhorar legibilidade */}
      <div className="absolute inset-0 bg-black/20" style={{ zIndex: 1 }} />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Os Melhores
            <br />
            <span className="text-primary">Hambúrgueres</span>
            <br />
            da Região
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Sabor autêntico, ingredientes frescos e o melhor atendimento de Buenos Aires - PE
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <Button
              onClick={scrollToMenu}
              className="bg-white text-primary text-lg sm:text-xl font-bold px-8 sm:px-10 py-4 sm:py-6 animate-bounce-in relative overflow-hidden group animate-pulse-slow hover:bg-white hover:text-primary transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-3">
                Ver Cardápio
                <span className="text-xl sm:text-2xl animate-pulse">→</span>
              </span>
            </Button>
            
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-base sm:text-lg">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-slide-up">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🍔</div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Receitas Exclusivas</h3>
            <p className="text-sm sm:text-base text-gray-200">Blends artesanais e molhos especiais da casa</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⚡</div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Entrega Rápida</h3>
            <p className="text-sm sm:text-base text-gray-200">Seu pedido quentinho em até 30 minutos</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 sm:col-span-2 lg:col-span-1">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">💎</div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Qualidade Premium</h3>
            <p className="text-sm sm:text-base text-gray-200">Ingredientes selecionados e frescos diariamente</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" style={{ zIndex: 10 }}>
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};