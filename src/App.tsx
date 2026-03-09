import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Toaster } from '@/components/ui/sonner';

import { CartProvider } from '@/context/CartContext';
import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import Shop from '@/sections/Shop';
import Programs from '@/sections/Programs';
import MembershipPlans from '@/sections/MembershipPlans';
import Trainers from '@/sections/Trainers';
import Testimonials from '@/sections/Testimonials';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Refresh ScrollTrigger after all components mount
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <CartProvider>
      <div className="relative bg-gym-black min-h-screen">
        {/* Grain Overlay */}
        <div className="grain-overlay" />
        
        {/* Navigation */}
        <Navigation />
        
        {/* Main Content - E-commerce Focused Flow */}
        <main className="relative pt-8">
          {/* Hero - Creative gym-focused design */}
          <Hero />
          
          {/* Shop - PRIORITY SECTION */}
          <Shop />
          
          {/* Programs */}
          <Programs />
          
          {/* Membership Plans */}
          <MembershipPlans />
          
          {/* Trainers */}
          <Trainers />
          
          {/* Testimonials */}
          <Testimonials />
          
          {/* Contact */}
          <Contact />
          
          {/* Footer */}
          <Footer />
        </main>
        
        {/* Toast notifications */}
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#111318',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#F4F6FA',
            },
          }}
        />
      </div>
    </CartProvider>
  );
}

export default App;
