import { Order } from '@/types';

const WHATSAPP_LINK = 'https://w.app/americanburguer';

export const generateOrderMessage = (order: Order): string => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const formatItems = () => {
    return order.items.map(item => {
      let itemText = `• ${item.product.name} (${item.quantity}x) - ${formatPrice(item.totalPrice)}`;
      
      if (item.additionals.length > 0) {
        const additionalsText = item.additionals.map(a => a.name).join(', ');
        itemText += `\n  Adicionais: ${additionalsText}`;
      }
      
      if (item.observations) {
        itemText += `\n  Obs: ${item.observations}`;
      }
      
      return itemText;
    }).join('\n\n');
  };

  const paymentText = order.customer.paymentMethod === 'dinheiro' 
    ? `Dinheiro${order.customer.changeFor ? ` (Troco para ${formatPrice(order.customer.changeFor)})` : ''}`
    : order.customer.paymentMethod === 'pix' 
    ? 'PIX'
    : 'Cartão na Entrega';

  return `🍔 *NOVO PEDIDO - AMERICAN BURGUER*
📋 *Pedido:* ${order.id}
📅 *Data:* ${formatDate(order.date)}

👤 *Cliente:* ${order.customer.name}
📱 *Telefone:* ${order.customer.phone}
📍 *Endereço:* ${order.customer.address.street}, ${order.customer.address.neighborhood}, ${order.customer.address.city}/${order.customer.address.state}
${order.customer.address.complement ? `Complemento: ${order.customer.address.complement}\n` : ''}${order.customer.reference ? `🏠 *Ponto de referência:* ${order.customer.reference}\n` : ''}
🛍️ *ITENS DO PEDIDO:*
${formatItems()}

💰 *RESUMO FINANCEIRO:*
Subtotal: ${formatPrice(order.subtotal)}
Taxa de entrega: ${formatPrice(order.deliveryFee)}
*Total: ${formatPrice(order.total)}*

💳 *Pagamento:* ${paymentText}

---
_Pedido realizado via site_`;
};

export const sendToWhatsApp = (message: string) => {
  const encodedMessage = encodeURIComponent(message);
  const url = `${WHATSAPP_LINK}?text=${encodedMessage}`;
  window.open(url, '_blank');
};

export const copyToClipboard = (text: string): Promise<boolean> => {
  return navigator.clipboard.writeText(text)
    .then(() => true)
    .catch(() => false);
};