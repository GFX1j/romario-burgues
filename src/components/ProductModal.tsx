import { useState, useEffect } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Product, Additional } from '@/types';
import { additionals as defaultAdditionals } from '@/data/products';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, additionals: Additional[], observations: string) => void;
}

export const ProductModal = ({ product, isOpen, onClose, onAddToCart }: ProductModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedAdditionals, setSelectedAdditionals] = useState<Additional[]>([]);
  const [observations, setObservations] = useState('');

  useEffect(() => {
    if (isOpen && product) {
      setQuantity(1);
      setSelectedAdditionals(defaultAdditionals.map(a => ({ ...a, selected: false })));
      setObservations('');
    }
  }, [isOpen, product]);

  const handleAdditionalChange = (additionalId: string, checked: boolean) => {
    setSelectedAdditionals(prev =>
      prev.map(additional =>
        additional.id === additionalId
          ? { ...additional, selected: checked }
          : additional
      )
    );
  };

  const calculateTotalPrice = () => {
    if (!product) return 0;
    
    const additionalPrice = selectedAdditionals
      .filter(a => a.selected)
      .reduce((sum, a) => sum + a.price, 0);
    
    return (product.price + additionalPrice) * quantity;
  };

  const handleConfirm = () => {
    if (product) {
      onAddToCart(product, quantity, selectedAdditionals, observations);
      onClose();
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-elegant animate-scale-in">
        {/* Header */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover rounded-t-2xl"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-foreground rounded-full p-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-foreground">{product.name}</h2>
            <div className="price-tag text-right">
              {formatPrice(product.price)}
            </div>
          </div>

          <p className="text-muted-foreground mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Adicionais */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Adicionais Disponíveis:</h3>
            <div className="space-y-3">
              {selectedAdditionals.map((additional) => (
                <div key={additional.id} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <Checkbox
                    id={additional.id}
                    checked={additional.selected}
                    onCheckedChange={(checked) => 
                      handleAdditionalChange(additional.id, checked as boolean)
                    }
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <label
                    htmlFor={additional.id}
                    className="flex-1 flex justify-between items-center cursor-pointer"
                  >
                    <span className="font-medium text-foreground">{additional.name}</span>
                    <span className="text-primary font-semibold">
                      +{formatPrice(additional.price)}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Observações */}
          <div className="mb-6">
            <label htmlFor="observations" className="block text-lg font-semibold mb-2 text-foreground">
              Observações do item:
            </label>
            <Textarea
              id="observations"
              placeholder="Ex: Sem cebola, ponto da carne, etc..."
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              className="resize-none border-border focus:border-primary"
              rows={3}
            />
          </div>

          {/* Quantidade e Total */}
          <div className="flex items-center justify-between mb-6 p-4 bg-muted/30 rounded-xl">
            <div className="flex items-center space-x-4">
              <span className="font-semibold text-foreground">Quantidade:</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-8 w-8 p-0 rounded-full"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-bold text-lg">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-8 w-8 p-0 rounded-full"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total do item:</p>
              <p className="text-2xl font-bold text-primary">
                {formatPrice(calculateTotalPrice())}
              </p>
            </div>
          </div>

          {/* Botão Confirmar */}
          <Button
            onClick={handleConfirm}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-primary-foreground font-semibold py-4 rounded-xl text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Confirmar - {formatPrice(calculateTotalPrice())}
          </Button>
        </div>
      </div>
    </div>
  );
};