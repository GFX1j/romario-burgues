import { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export const Cart = ({ isOpen, onClose, onCheckout }: CartProps) => {
  const { items, itemCount, subtotal, deliveryFee, total, removeItem, updateQuantity } = useCart();

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-card h-full overflow-y-auto shadow-elegant animate-slide-in-right">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Seu Carrinho</h2>
            {itemCount > 0 && (
              <Badge className="cart-badge relative top-0 right-0">
                {itemCount}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="rounded-full hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Cart Content */}
        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Seu carrinho está vazio
              </h3>
              <p className="text-muted-foreground mb-6">
                Adicione alguns deliciosos itens ao seu carrinho
              </p>
              <Button onClick={onClose} variant="outline">
                Continuar Comprando
              </Button>
            </div>
          ) : (
            <>
              {/* Items */}
              <div className="flex-1 p-4 space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="bg-muted/30 rounded-xl p-4 animate-fade-in">
                    <div className="flex gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground text-sm mb-1">
                          {item.product.name}
                        </h4>
                        
                        {/* Adicionais */}
                        {item.additionals.length > 0 && (
                          <p className="text-xs text-muted-foreground mb-1">
                            + {item.additionals.map(a => a.name).join(', ')}
                          </p>
                        )}
                        
                        {/* Observações */}
                        {item.observations && (
                          <p className="text-xs text-muted-foreground mb-2 italic">
                            "{item.observations}"
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(index, item.quantity - 1)}
                              className="h-6 w-6 p-0 rounded-full"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-6 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(index, item.quantity + 1)}
                              className="h-6 w-6 p-0 rounded-full"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-primary text-sm">
                              {formatPrice(item.totalPrice)}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(index)}
                              className="h-6 w-6 p-0 rounded-full hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="border-t border-border p-4 space-y-4 bg-muted/20">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxa de entrega:</span>
                    <span className="font-medium">{formatPrice(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-border pt-2">
                    <span className="text-foreground">Total:</span>
                    <span className="text-primary">{formatPrice(total)}</span>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    onCheckout();
                    onClose();
                  }}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-primary-foreground font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Finalizar Pedido
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};