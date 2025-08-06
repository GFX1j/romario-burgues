import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <div className="product-card group animate-fade-in">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {!product.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive" className="text-lg px-4 py-2">
              Indisponível
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>
          <div className="price-tag">
            {formatPrice(product.price)}
          </div>
        </div>

        <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {formatPrice(product.price)}/UN
          </Badge>
          
          <Button
            onClick={() => onAddToCart(product)}
            disabled={!product.available}
            className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-primary-foreground font-medium px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {product.available ? 'Adicionar ao Carrinho' : 'Indisponível'}
          </Button>
        </div>
      </div>
    </div>
  );
};