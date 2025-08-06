import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ProductCard } from './ProductCard';
import { ProductModal } from './ProductModal';
import { products, categories, priceRanges } from '@/data/products';
import { Product, ProductCategory, Additional } from '@/types';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

export const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { addItem } = useCart();
  const { toast } = useToast();

  // Filtrar produtos
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Filtro por categoria
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Filtro por busca
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Filtro por faixa de preço
      if (selectedPriceRange !== null) {
        const range = priceRanges[selectedPriceRange];
        if (product.price < range.min || product.price > range.max) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, searchTerm, selectedPriceRange]);

  // Agrupar produtos por categoria
  const groupedProducts = useMemo(() => {
    const grouped: { [key: string]: Product[] } = {};
    
    categories.forEach(category => {
      grouped[category.id] = filteredProducts.filter(product => product.category === category.id);
    });

    return grouped;
  }, [filteredProducts]);

  const handleAddToCart = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleConfirmAddToCart = (
    product: Product, 
    quantity: number, 
    additionals: Additional[], 
    observations: string
  ) => {
    console.log('Menu: handleConfirmAddToCart called with:', { product, quantity, additionals, observations });
    addItem(product, quantity, additionals, observations);
    console.log('Menu: addItem called successfully');
    toast({
      title: "Item adicionado!",
      description: `${product.name} foi adicionado ao seu carrinho.`,
    });
  };

  return (
    <section id="menu" className="py-12 sm:py-20 bg-[#f6f1f2]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-[#030236] mb-6 text-center">Nosso Cardápio</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore nossos deliciosos hambúrgueres, petiscos e bebidas especiais
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 sm:mb-12 space-y-4 sm:space-y-6">
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-border focus:border-primary"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className={selectedCategory === 'all' ? 'filter-active' : 'bg-white text-gray-700 border-gray-200 hover:bg-primary hover:text-white'}
            >
              Todos
            </Button>
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id as ProductCategory)}
                className={selectedCategory === category.id ? 'filter-active' : 'bg-white text-gray-700 border-gray-200 hover:bg-primary hover:text-white'}
              >
                {category.icon} {category.name}
              </Button>
            ))}
          </div>

          {/* Price Range Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant={selectedPriceRange === null ? 'default' : 'outline'}
              onClick={() => setSelectedPriceRange(null)}
              size="sm"
              className={selectedPriceRange === null ? 'filter-active' : 'bg-white text-gray-700 border-gray-200 hover:bg-primary hover:text-white'}
            >
              Todos os preços
            </Button>
            {priceRanges.map((range, index) => (
              <Button
                key={index}
                variant={selectedPriceRange === index ? 'default' : 'outline'}
                onClick={() => setSelectedPriceRange(index)}
                size="sm"
                className={selectedPriceRange === index ? 'filter-active' : 'bg-white text-gray-700 border-gray-200 hover:bg-primary hover:text-white'}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {selectedCategory === 'all' ? (
          // Mostrar por categorias quando "Todos" estiver selecionado
          <div className="space-y-16">
            {categories.map(category => {
              const categoryProducts = groupedProducts[category.id];
              if (categoryProducts.length === 0) return null;

              return (
                <div key={category.id} className="animate-slide-up">
                  <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
                    <span className="text-3xl">{category.icon}</span>
                    {category.name}
                    <span className="text-lg text-muted-foreground">
                      ({categoryProducts.length})
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                    {categoryProducts.map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Mostrar produtos da categoria selecionada
          <div className="animate-slide-up">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  Nenhum produto encontrado com os filtros selecionados.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleConfirmAddToCart}
      />
    </section>
  );
};