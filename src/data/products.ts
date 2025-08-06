import { Product } from '@/types';
import dobleBurguerImg from '@/assets/doble-burguer.jpg';
import hotDogImg from '@/assets/hot-dog.jpg';

export const products: Product[] = [
  // BURGUERS
  {
    id: 'doble-burguer',
    name: 'Doble Burguer',
    description: 'Pão, 2 blend artesanal de frango 120 gramas, Cheddar duplo, Bacon Duplo, Tomate, Cebola roxa, Alface, Maionese.',
    price: 18.00,
    category: 'burguers',
    image: dobleBurguerImg,
    available: true
  },
  {
    id: 'classic-burguer',
    name: 'Classic Burguer',
    description: 'Pão brioche, blend bovino 150g, cheddar, alface, tomate, cebola, molho especial.',
    price: 22.00,
    category: 'burguers',
    image: dobleBurguerImg,
    available: true
  },
  {
    id: 'bacon-burguer',
    name: 'Bacon Burguer',
    description: 'Pão artesanal, blend bovino 180g, bacon crocante, cheddar, alface americana, tomate.',
    price: 25.00,
    category: 'burguers',
    image: dobleBurguerImg,
    available: true
  },
  {
    id: 'monster-burguer',
    name: 'Monster Burguer',
    description: 'Triplo blend bovino, triplo bacon, triplo cheddar, alface, tomate, cebola caramelizada.',
    price: 35.00,
    category: 'burguers',
    image: dobleBurguerImg,
    available: true
  },

  // HOT DOGS
  {
    id: 'hot-dog-tradicional',
    name: 'Hot Dog Tradicional',
    description: 'Pão francês, salsicha especial, molho de tomate, batata palha, milho, ervilha.',
    price: 12.00,
    category: 'hot-dogs',
    image: hotDogImg,
    available: true
  },
  {
    id: 'hot-dog-bacon',
    name: 'Hot Dog Bacon',
    description: 'Pão de hot dog, salsicha artesanal, bacon, queijo cheddar, molho barbecue.',
    price: 16.00,
    category: 'hot-dogs',
    image: hotDogImg,
    available: true
  },

  // CREP WRAPS
  {
    id: 'wrap-frango',
    name: 'Wrap de Frango',
    description: 'Tortilha integral, frango grelhado, alface, tomate, queijo, molho iogurte.',
    price: 14.00,
    category: 'crep-wraps',
    image: hotDogImg,
    available: true
  },
  {
    id: 'wrap-carne',
    name: 'Wrap de Carne',
    description: 'Tortilha especial, carne desfiada, queijo derretido, cebola, pimentão.',
    price: 16.00,
    category: 'crep-wraps',
    image: hotDogImg,
    available: true
  },

  // PETISCOS
  {
    id: 'batata-frita',
    name: 'Batata Frita',
    description: 'Batatas rústicas cortadas à mão, temperadas com ervas especiais.',
    price: 8.00,
    category: 'petiscos',
    image: hotDogImg,
    available: true
  },
  {
    id: 'nuggets',
    name: 'Nuggets (10un)',
    description: '10 nuggets de frango empanados na casa, crocantes e suculentos.',
    price: 15.00,
    category: 'petiscos',
    image: hotDogImg,
    available: true
  },
  {
    id: 'onion-rings',
    name: 'Onion Rings',
    description: 'Anéis de cebola empanados e fritos, crocantes por fora, macios por dentro.',
    price: 12.00,
    category: 'petiscos',
    image: hotDogImg,
    available: true
  },

  // COXINHAS
  {
    id: 'coxinha-frango',
    name: 'Coxinha de Frango (3un)',
    description: '3 coxinhas artesanais de frango desfiado com catupiry.',
    price: 9.00,
    category: 'coxinhas',
    image: hotDogImg,
    available: true
  },
  {
    id: 'coxinha-carne',
    name: 'Coxinha de Carne (3un)',
    description: '3 coxinhas de carne seca desfiada com queijo.',
    price: 10.00,
    category: 'coxinhas',
    image: hotDogImg,
    available: true
  },

  // REFRIGERANTES
  {
    id: 'coca-cola',
    name: 'Coca-Cola 350ml',
    description: 'Refrigerante Coca-Cola gelado 350ml.',
    price: 5.00,
    category: 'refrigerantes',
    image: hotDogImg,
    available: true
  },
  {
    id: 'guarana',
    name: 'Guaraná Antarctica 350ml',
    description: 'Refrigerante Guaraná Antarctica gelado 350ml.',
    price: 5.00,
    category: 'refrigerantes',
    image: hotDogImg,
    available: true
  },
  {
    id: 'fanta',
    name: 'Fanta Laranja 350ml',
    description: 'Refrigerante Fanta Laranja gelado 350ml.',
    price: 5.00,
    category: 'refrigerantes',
    image: hotDogImg,
    available: true
  },

  // SUCOS
  {
    id: 'suco-laranja',
    name: 'Suco de Laranja 300ml',
    description: 'Suco natural de laranja, sem conservantes.',
    price: 7.00,
    category: 'sucos',
    image: hotDogImg,
    available: true
  },
  {
    id: 'suco-acerola',
    name: 'Suco de Acerola 300ml',
    description: 'Suco natural de acerola, rico em vitamina C.',
    price: 7.00,
    category: 'sucos',
    image: hotDogImg,
    available: true
  },

  // CERVEJAS
  {
    id: 'skol',
    name: 'Skol 350ml',
    description: 'Cerveja Skol gelada 350ml.',
    price: 8.00,
    category: 'cervejas',
    image: hotDogImg,
    available: true
  },
  {
    id: 'brahma',
    name: 'Brahma 350ml',
    description: 'Cerveja Brahma gelada 350ml.',
    price: 8.00,
    category: 'cervejas',
    image: hotDogImg,
    available: true
  },
  {
    id: 'heineken',
    name: 'Heineken 330ml',
    description: 'Cerveja Heineken premium gelada 330ml.',
    price: 12.00,
    category: 'cervejas',
    image: hotDogImg,
    available: true
  },

  // ENERGÉTICOS
  {
    id: 'red-bull',
    name: 'Red Bull 250ml',
    description: 'Energético Red Bull 250ml gelado.',
    price: 10.00,
    category: 'energeticos',
    image: hotDogImg,
    available: true
  },
  {
    id: 'monster',
    name: 'Monster Energy 473ml',
    description: 'Energético Monster Energy 473ml gelado.',
    price: 12.00,
    category: 'energeticos',
    image: hotDogImg,
    available: true
  },

  // DRINKS
  {
    id: 'caipirinha',
    name: 'Caipirinha',
    description: 'Caipirinha tradicional com cachaça premium.',
    price: 15.00,
    category: 'drinks',
    image: hotDogImg,
    available: true
  },
  {
    id: 'mojito',
    name: 'Mojito',
    description: 'Drink refrescante com rum, hortelã e limão.',
    price: 18.00,
    category: 'drinks',
    image: hotDogImg,
    available: true
  },

  // MILKSHAKES
  {
    id: 'milkshake-chocolate',
    name: 'Milkshake de Chocolate',
    description: 'Cremoso milkshake de chocolate com chantilly e granulado.',
    price: 12.00,
    category: 'milkshakes',
    image: hotDogImg,
    available: true
  },
  {
    id: 'milkshake-morango',
    name: 'Milkshake de Morango',
    description: 'Delicioso milkshake de morango com chantilly.',
    price: 12.00,
    category: 'milkshakes',
    image: hotDogImg,
    available: true
  },
  {
    id: 'milkshake-ovomaltine',
    name: 'Milkshake de Ovomaltine',
    description: 'Irresistível milkshake de ovomaltine com cobertura especial.',
    price: 15.00,
    category: 'milkshakes',
    image: hotDogImg,
    available: true
  }
];

export const additionals = [
  { id: 'bacon', name: 'BACON', price: 2.00, selected: false },
  { id: 'blend-frango', name: 'BLEND FRANGO', price: 5.90, selected: false },
  { id: 'blend-bovino', name: 'BLEND BOVINO', price: 7.90, selected: false },
  { id: 'cheddar', name: 'CHEDDAR', price: 3.90, selected: false },
  { id: 'mussarela', name: 'MUSSARELA', price: 3.00, selected: false },
  { id: 'ovo', name: 'OVO', price: 2.00, selected: false }
];

export const categories = [
  { id: 'burguers', name: 'Burguers', icon: '🍔' },
  { id: 'hot-dogs', name: 'Hot Dogs', icon: '🌭' },
  { id: 'crep-wraps', name: 'Crep Wraps', icon: '🌯' },
  { id: 'petiscos', name: 'Petiscos', icon: '🍟' },
  { id: 'coxinhas', name: 'Coxinhas', icon: '🥟' },
  { id: 'refrigerantes', name: 'Refrigerantes', icon: '🥤' },
  { id: 'sucos', name: 'Sucos', icon: '🧃' },
  { id: 'cervejas', name: 'Cervejas', icon: '🍺' },
  { id: 'energeticos', name: 'Energéticos', icon: '⚡' },
  { id: 'drinks', name: 'Drinks', icon: '🍹' },
  { id: 'milkshakes', name: 'Milkshakes', icon: '🥤' }
] as const;

export const priceRanges = [
  { min: 0, max: 15, label: 'Até R$ 15,00' },
  { min: 15.01, max: 25, label: 'R$ 15,01 - R$ 25,00' },
  { min: 25.01, max: 35, label: 'R$ 25,01 - R$ 35,00' },
  { min: 35.01, max: Infinity, label: 'Acima de R$ 35,00' }
];