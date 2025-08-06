import { Clock, MapPin, Phone, Instagram, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const Contact = () => {
  const handleWhatsApp = () => {
    window.open('https://w.app/americanburguer', '_blank');
  };

  const handleInstagram = () => {
    window.open('https://instagram.com/americanburguer', '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="category-header">Fale Conosco</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estamos sempre prontos para atender você. Entre em contato!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* WhatsApp */}
          <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-up">
            <CardHeader>
              <div className="mx-auto bg-green-500/10 p-4 rounded-full w-fit mb-4">
                <MessageCircle className="h-8 w-8 text-green-500" />
              </div>
              <CardTitle className="text-xl">WhatsApp</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Faça seu pedido diretamente pelo WhatsApp
              </p>
              <Button 
                onClick={handleWhatsApp}
                className="bg-green-500 hover:bg-green-600 text-white w-full"
              >
                Enviar Mensagem
              </Button>
            </CardContent>
          </Card>

          {/* Telefone */}
          <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-up">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Telefone</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Ligue para fazer seu pedido
              </p>
              <p className="font-semibold text-lg text-foreground">
                +55 81 7343-7435
              </p>
            </CardContent>
          </Card>

          {/* Instagram */}
          <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-up">
            <CardHeader>
              <div className="mx-auto bg-pink-500/10 p-4 rounded-full w-fit mb-4">
                <Instagram className="h-8 w-8 text-pink-500" />
              </div>
              <CardTitle className="text-xl">Instagram</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Siga-nos para novidades e promoções
              </p>
              <Button 
                onClick={handleInstagram}
                variant="outline"
                className="w-full hover:bg-pink-50 hover:border-pink-200"
              >
                @americanburguer
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Informações de Funcionamento */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-primary" />
                Horário de Funcionamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Segunda a Domingo:</span>
                  <span className="font-semibold text-foreground">18:00 às 23:59</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  * Horários podem variar em feriados
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-primary" />
                Área de Atendimento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <span className="font-semibold text-foreground">Buenos Aires - PE</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Taxa de entrega: R$ 3,00
                </div>
                <div className="text-sm text-muted-foreground">
                  Tempo médio de entrega: 30-45 minutos
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};