import { Clock, MapPin, Award, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const About = () => {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="category-header">Sobre a American Burguer</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Desde 2020, servindo os melhores hambúrgueres artesanais de Buenos Aires - PE com ingredientes frescos e muito amor.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Story */}
          <div className="animate-slide-up">
            <h3 className="text-2xl font-bold text-foreground mb-6">Nossa História</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              A American Burguer nasceu do sonho de trazer para Buenos Aires - PE os sabores autênticos dos hambúrgueres americanos, 
              mas com o tempero e carinho brasileiro. Começamos pequenos, mas com uma grande paixão: criar a experiência perfeita 
              para quem busca qualidade e sabor.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Nossos blends são preparados artesanalmente, nossos pães são frescos todos os dias, e cada hambúrguer é montado 
              com muito cuidado e dedicação. Não é apenas comida, é uma experiência que queremos compartilhar com você.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-card rounded-xl border border-border">
                <div className="text-2xl font-bold text-primary mb-1">3+</div>
                <div className="text-sm text-muted-foreground">Anos de Experiência</div>
              </div>
              <div className="text-center p-4 bg-card rounded-xl border border-border">
                <div className="text-2xl font-bold text-primary mb-1">5000+</div>
                <div className="text-sm text-muted-foreground">Clientes Satisfeitos</div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-6 animate-slide-up">
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Ingredientes Premium</h4>
                    <p className="text-muted-foreground">
                      Selecionamos os melhores ingredientes da região para garantir qualidade em cada mordida.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Feito com Amor</h4>
                    <p className="text-muted-foreground">
                      Cada hambúrguer é preparado com carinho e atenção aos detalhes por nossa equipe especializada.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Sempre Fresquinho</h4>
                    <p className="text-muted-foreground">
                      Preparamos tudo na hora para você receber seu pedido quentinho e saboroso.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Entrega Rápida</h4>
                    <p className="text-muted-foreground">
                      Atendemos Buenos Aires - PE com agilidade e cuidado. Taxa de entrega apenas R$ 3,00.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};