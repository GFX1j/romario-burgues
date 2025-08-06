// Tipos para o sistema da hamburgueria

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  available: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  additionals: Additional[];
  observations: string;
  totalPrice: number;
}

export interface Additional {
  id: string;
  name: string;
  price: number;
  selected: boolean;
}

export interface Customer {
  name: string;
  phone: string;
  address: {
    street: string;
    complement?: string;
    neighborhood: string;
    cep: string;
    city: string;
    state: string;
  };
  reference?: string;
  paymentMethod: PaymentMethod;
  changeFor?: number;
}

export interface Order {
  id: number;
  customer: Customer;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  date: Date;
}

export type ProductCategory = 
  | 'burguers'
  | 'hot-dogs'
  | 'crep-wraps'
  | 'petiscos'
  | 'coxinhas'
  | 'refrigerantes'
  | 'sucos'
  | 'cervejas'
  | 'energeticos'
  | 'drinks'
  | 'milkshakes';

export type PaymentMethod = 'dinheiro' | 'pix' | 'cartao';

export interface PriceRange {
  min: number;
  max: number;
  label: string;
}