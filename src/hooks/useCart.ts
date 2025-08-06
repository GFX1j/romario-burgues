import { useState, useEffect } from 'react';
import { CartItem, Product, Additional } from '@/types';

const CART_STORAGE_KEY = 'american-burguer-cart';
const DELIVERY_FEE = 3.00;

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Carregar carrinho do localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      }
    }
  }, []);

  // Salvar carrinho no localStorage
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (
    product: Product,
    quantity: number,
    additionals: Additional[] = [],
    observations: string = ''
  ) => {
    console.log('useCart: addItem called with:', { product, quantity, additionals, observations });
    
    const additionalPrice = additionals
      .filter(a => a.selected)
      .reduce((sum, a) => sum + a.price, 0);
    
    const totalPrice = (product.price + additionalPrice) * quantity;

    const newItem: CartItem = {
      product,
      quantity,
      additionals: additionals.filter(a => a.selected),
      observations,
      totalPrice
    };

    console.log('useCart: newItem created:', newItem);
    console.log('useCart: current items before adding:', items);
    
    setItems(prev => {
      const newItems = [...prev, newItem];
      console.log('useCart: new items array:', newItems);
      return newItems;
    });
  };

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(index);
      return;
    }

    setItems(prev => prev.map((item, i) => {
      if (i === index) {
        const additionalPrice = item.additionals.reduce((sum, a) => sum + a.price, 0);
        const totalPrice = (item.product.price + additionalPrice) * quantity;
        return { ...item, quantity, totalPrice };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const total = subtotal + DELIVERY_FEE;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items,
    itemCount,
    subtotal,
    deliveryFee: DELIVERY_FEE,
    total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  };
};