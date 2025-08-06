import { MessageCircle } from 'lucide-react';

export const WhatsAppFloat = () => {
  const handleWhatsAppClick = () => {
    window.open('https://w.app/americanburguer', '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="whatsapp-float group"
      aria-label="Entrar em contato via WhatsApp"
    >
      <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
    </button>
  );
};