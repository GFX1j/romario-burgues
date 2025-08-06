import { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Menu } from '@/components/Menu';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { Cart } from '@/components/Cart';
import { CheckoutForm } from '@/components/CheckoutForm';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleCartOpen = () => setIsCartOpen(true);
  const handleCartClose = () => setIsCartOpen(false);
  
  const handleCheckoutOpen = () => {
    setIsCheckoutOpen(true);
  };
  
  const handleCheckoutClose = () => {
    setIsCheckoutOpen(false);
  };

  const handleCheckoutBack = () => {
    setIsCheckoutOpen(false);
    setIsCartOpen(true);
  };

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        onCartClick={handleCartOpen}
        onSectionClick={scrollToSection}
      />

      {/* Main Content */}
      <main>
        <Hero onMenuClick={() => scrollToSection('menu')} />
        <Menu />
        <About />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Float Button */}
      <WhatsAppFloat />

      {/* Cart Sidebar */}
      <Cart 
        isOpen={isCartOpen}
        onClose={handleCartClose}
        onCheckout={handleCheckoutOpen}
      />

      {/* Checkout Form */}
      <CheckoutForm 
        isOpen={isCheckoutOpen}
        onClose={handleCheckoutClose}
        onBack={handleCheckoutBack}
      />
    </div>
  );
};

export default Index;
