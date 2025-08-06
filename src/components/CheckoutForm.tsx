import { useState } from 'react';
import { ArrowLeft, Copy, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';
import { useCustomer } from '@/hooks/useCustomer';
import { useToast } from '@/hooks/use-toast';
import { Customer, PaymentMethod, Order } from '@/types';
import { generateOrderMessage, sendToWhatsApp, copyToClipboard } from '@/utils/whatsapp';

interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
}

export const CheckoutForm = ({ isOpen, onClose, onBack }: CheckoutFormProps) => {
  const { items, subtotal, deliveryFee, total, clearCart } = useCart();
  const { customer, updateCustomer } = useCustomer();
  const { toast } = useToast();

  const [formData, setFormData] = useState<Customer>({
    name: customer?.name || '',
    phone: customer?.phone || '',
    address: {
      street: customer?.address?.street || '',
      complement: customer?.address?.complement || '',
      neighborhood: customer?.address?.neighborhood || '',
      cep: customer?.address?.cep || '',
      city: customer?.address?.city || 'Buenos Aires',
      state: customer?.address?.state || 'PE'
    },
    reference: customer?.reference || '',
    paymentMethod: customer?.paymentMethod || 'pix',
    changeFor: customer?.changeFor
  });

  const [orderGenerated, setOrderGenerated] = useState<Order | null>(null);
  const [orderMessage, setOrderMessage] = useState('');

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const match = numbers.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return value;
  };

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const match = numbers.match(/^(\d{5})(\d{3})$/);
    if (match) {
      return `${match[1]}-${match[2]}`;
    }
    return value;
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'phone') {
      value = formatPhone(value);
    } else if (field === 'cep') {
      value = formatCEP(value);
    }

    if (field.startsWith('address.')) {
      const addressField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: field === 'changeFor' ? parseFloat(value) || undefined : value
      }));
    }
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.name.trim()) errors.push('Nome é obrigatório');
    if (!formData.phone.trim()) errors.push('Telefone é obrigatório');
    if (!formData.address.street.trim()) errors.push('Endereço é obrigatório');
    if (!formData.address.neighborhood.trim()) errors.push('Bairro é obrigatório');
    if (!formData.address.cep.trim()) errors.push('CEP é obrigatório');
    
    if (formData.paymentMethod === 'dinheiro' && !formData.changeFor) {
      errors.push('Para pagamento em dinheiro, informe o valor para troco');
    }

    return errors;
  };

  const generateOrderId = () => {
    return Math.floor(Math.random() * 10000000) + 1;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (errors.length > 0) {
      toast({
        title: "Dados incompletos",
        description: errors.join(', '),
        variant: "destructive"
      });
      return;
    }

    // Salvar dados do cliente
    updateCustomer(formData);

    // Gerar pedido
    const order: Order = {
      id: generateOrderId(),
      customer: formData,
      items,
      subtotal,
      deliveryFee,
      total,
      date: new Date()
    };

    const message = generateOrderMessage(order);
    setOrderGenerated(order);
    setOrderMessage(message);

    toast({
      title: "Pedido gerado!",
      description: "Agora você pode copiar ou enviar via WhatsApp",
    });
  };

  const handleCopyMessage = async () => {
    const success = await copyToClipboard(orderMessage);
    toast({
      title: success ? "Copiado!" : "Erro",
      description: success ? "Mensagem copiada para a área de transferência" : "Não foi possível copiar",
      variant: success ? "default" : "destructive"
    });
  };

  const handleSendWhatsApp = () => {
    sendToWhatsApp(orderMessage);
    // Limpar carrinho após envio
    clearCart();
    onClose();
    toast({
      title: "Pedido enviado!",
      description: "Seu pedido foi enviado via WhatsApp com sucesso!",
    });
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card rounded-2xl shadow-elegant animate-scale-in">
          {/* Header */}
          <div className="border-b border-border p-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="rounded-full"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-2xl font-bold text-foreground">
                {orderGenerated ? 'Pedido Gerado' : 'Finalizar Pedido'}
              </h2>
            </div>
          </div>

          <div className="p-6">
            {!orderGenerated ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Formulário */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Dados Pessoais</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="name">Nome Completo *</Label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="border-border focus:border-primary"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Telefone *</Label>
                        <Input
                          id="phone"
                          type="text"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="(81) 99999-9999"
                          className="border-border focus:border-primary"
                          required
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Endereço de Entrega</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="street">Rua e Número *</Label>
                        <Input
                          id="street"
                          type="text"
                          value={formData.address.street}
                          onChange={(e) => handleInputChange('address.street', e.target.value)}
                          placeholder="Ex: Rua das Flores, 123"
                          className="border-border focus:border-primary"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="complement">Complemento</Label>
                        <Input
                          id="complement"
                          type="text"
                          value={formData.address.complement}
                          onChange={(e) => handleInputChange('address.complement', e.target.value)}
                          placeholder="Ex: Apt 101, Bloco A"
                          className="border-border focus:border-primary"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="neighborhood">Bairro *</Label>
                          <Input
                            id="neighborhood"
                            type="text"
                            value={formData.address.neighborhood}
                            onChange={(e) => handleInputChange('address.neighborhood', e.target.value)}
                            className="border-border focus:border-primary"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="cep">CEP *</Label>
                          <Input
                            id="cep"
                            type="text"
                            value={formData.address.cep}
                            onChange={(e) => handleInputChange('address.cep', e.target.value)}
                            placeholder="12345-678"
                            className="border-border focus:border-primary"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">Cidade</Label>
                          <Input
                            id="city"
                            type="text"
                            value={formData.address.city}
                            onChange={(e) => handleInputChange('address.city', e.target.value)}
                            className="border-border focus:border-primary"
                            readOnly
                          />
                        </div>

                        <div>
                          <Label htmlFor="state">Estado</Label>
                          <Input
                            id="state"
                            type="text"
                            value={formData.address.state}
                            onChange={(e) => handleInputChange('address.state', e.target.value)}
                            className="border-border focus:border-primary"
                            readOnly
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="reference">Ponto de Referência</Label>
                        <Textarea
                          id="reference"
                          value={formData.reference}
                          onChange={(e) => handleInputChange('reference', e.target.value)}
                          placeholder="Ex: Próximo ao supermercado XYZ"
                          className="border-border focus:border-primary resize-none"
                          rows={2}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Forma de Pagamento</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup
                        value={formData.paymentMethod}
                        onValueChange={(value) => handleInputChange('paymentMethod', value as PaymentMethod)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="pix" id="pix" />
                          <Label htmlFor="pix">PIX</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="cartao" id="cartao" />
                          <Label htmlFor="cartao">Cartão na Entrega</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="dinheiro" id="dinheiro" />
                          <Label htmlFor="dinheiro">Dinheiro</Label>
                        </div>
                      </RadioGroup>

                      {formData.paymentMethod === 'dinheiro' && (
                        <div className="mt-4">
                          <Label htmlFor="changeFor">Troco para quanto? *</Label>
                          <Input
                            id="changeFor"
                            type="number"
                            step="0.01"
                            value={formData.changeFor || ''}
                            onChange={(e) => handleInputChange('changeFor', e.target.value)}
                            placeholder="Ex: 50.00"
                            className="border-border focus:border-primary"
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-primary-foreground font-semibold py-3 rounded-xl text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Gerar Pedido
                  </Button>
                </form>

                {/* Resumo do Pedido */}
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Resumo do Pedido</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {items.map((item, index) => (
                        <div key={index} className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.product.name} ({item.quantity}x)</p>
                            {item.additionals.length > 0 && (
                              <p className="text-xs text-muted-foreground">
                                + {item.additionals.map(a => a.name).join(', ')}
                              </p>
                            )}
                          </div>
                          <p className="font-semibold text-sm">{formatPrice(item.totalPrice)}</p>
                        </div>
                      ))}
                      
                      <div className="border-t border-border pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Subtotal:</span>
                          <span>{formatPrice(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Taxa de entrega:</span>
                          <span>{formatPrice(deliveryFee)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total:</span>
                          <span className="text-primary">{formatPrice(total)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              /* Pedido Gerado */
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center text-2xl text-primary">
                      🎉 Pedido #{orderGenerated.id} Gerado com Sucesso!
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/30 rounded-lg p-4 mb-6">
                      <pre className="text-sm whitespace-pre-wrap font-mono">
                        {orderMessage}
                      </pre>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        onClick={handleCopyMessage}
                        variant="outline"
                        className="flex items-center gap-2 flex-1"
                      >
                        <Copy className="h-4 w-4" />
                        Copiar Mensagem
                      </Button>
                      
                      <Button
                        onClick={handleSendWhatsApp}
                        className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2 flex-1"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Enviar WhatsApp
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};