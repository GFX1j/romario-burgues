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
          className="w-full h-32 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {!product.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive" className="text-xs sm:text-sm px-2 py-1">
              Indisponível
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-2 sm:p-3">
        <h3 className="text-sm font-bold text-[#030236] group-hover:text-primary transition-colors duration-300 mb-1">
          {product.name}
        </h3>

        <p className="text-[#666] mb-2 line-clamp-1 leading-relaxed text-xs">
          {product.description}
        </p>

        <div className="flex items-center justify-between gap-2">
          <div className="price-tag text-sm font-bold">
            {formatPrice(product.price)}
          </div>
          
          <Button
            onClick={() => onAddToCart(product)}
            disabled={!product.available}
            className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-primary-foreground font-medium px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-xs"
          >
            {product.available ? 'Adicionar' : 'Indisponível'}
          </Button>
        </div>
      </div>
    </div>
  );
};