import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Search, User, Zap } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';

const navLinks = [
  { name: 'Shop', href: '#shop', highlight: true },
  { name: 'Programs', href: '#programs' },
  { name: 'Membership', href: '#plans' },
  { name: 'Trainers', href: '#trainers' },
  { name: 'Contact', href: '#contact' },
];

const categories = [
  'All Products',
  'Protein',
  'Pre-Workout',
  'Accessories',
  'Equipment',
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity, setIsCartOpen, isCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Bar - Announcement */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-gym-orange text-white py-2 px-4 text-center text-sm">
        <span className="font-medium">FREE SHIPPING</span> on orders over ₹3000 | Use code <span className="font-bold">BEAST20</span> for 20% off
      </div>

      {/* Main Navigation */}
      <nav
        className={`fixed top-8 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-gym-black/95 backdrop-blur-md border-b border-white/5 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2 font-display font-bold text-xl lg:text-2xl text-white tracking-tight"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="w-8 h-8 bg-gym-orange rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              DARSHAN
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg ${
                    link.highlight
                      ? 'bg-gym-orange text-white hover:bg-gym-orange-light'
                      : 'text-gym-gray hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="w-10 h-10 flex items-center justify-center text-gym-gray hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
                
                {isSearchOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 glass-card rounded-xl p-4">
                    <Input
                      type="text"
                      placeholder="Search supplements, gear..."
                      className="bg-gym-black border-white/10 text-white placeholder:text-gym-gray/50"
                      autoFocus
                    />
                    <div className="mt-3">
                      <p className="text-gym-gray text-xs uppercase tracking-wider mb-2">Popular</p>
                      <div className="flex flex-wrap gap-2">
                        {['Whey Protein', 'Pre-Workout', 'Creatine', 'Gloves'].map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-gym-gray bg-white/5 px-3 py-1 rounded-full cursor-pointer hover:bg-gym-orange/20 hover:text-gym-orange transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Account */}
              <button className="w-10 h-10 flex items-center justify-center text-gym-gray hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                <User className="w-5 h-5" />
              </button>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-4 py-2 bg-gym-orange text-white rounded-lg hover:bg-gym-orange-light transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="font-medium">Cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-white text-gym-orange text-xs font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-white"
              >
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gym-orange text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-white"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 bg-gym-black/98 backdrop-blur-md border-b border-white/5 transition-all duration-300 ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <div className="px-4 py-6 space-y-2">
            {/* Categories */}
            <div className="mb-4">
              <p className="text-gym-gray text-xs uppercase tracking-wider mb-3">Shop by Category</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <span
                    key={cat}
                    className="text-sm text-white bg-white/5 px-4 py-2 rounded-lg"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Nav Links */}
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`block w-full text-left text-lg font-medium py-3 px-4 rounded-lg transition-colors ${
                  link.highlight
                    ? 'bg-gym-orange text-white'
                    : 'text-gym-gray hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Cart Sheet */}
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="bg-gym-black border-l border-white/10 w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="text-white font-display text-xl flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-gym-orange" />
              Your Cart ({totalItems})
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 flex flex-col h-[calc(100vh-220px)]">
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gym-gray">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                  <ShoppingCart className="w-10 h-10 opacity-30" />
                </div>
                <p className="text-lg font-medium text-white mb-2">Your cart is empty</p>
                <p className="text-sm mb-6">Add some supplements to fuel your workout</p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    scrollToSection('#shop');
                  }}
                  className="btn-primary rounded-lg"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-auto space-y-3 pr-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 bg-gym-black-lifted p-4 rounded-xl"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="text-white font-medium text-sm">{item.name}</h4>
                        <p className="text-gym-orange font-bold">₹{item.price}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 bg-white/10 rounded text-white hover:bg-white/20 flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="text-white w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 bg-white/10 rounded text-white hover:bg-white/20 flex items-center justify-center"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto text-gym-gray hover:text-red-400 text-xs"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 pt-4 mt-4 space-y-3">
                  <div className="flex justify-between text-gym-gray text-sm">
                    <span>Subtotal</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-gym-gray text-sm">
                    <span>Shipping</span>
                    <span>{totalPrice >= 3000 ? 'FREE' : '₹150'}</span>
                  </div>
                  <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-white/10">
                    <span>Total</span>
                    <span>₹{totalPrice >= 3000 ? totalPrice : totalPrice + 150}</span>
                  </div>
                  <button className="w-full btn-primary rounded-lg py-4 text-base">
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      scrollToSection('#shop');
                    }}
                    className="w-full btn-secondary rounded-lg py-3 text-sm"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
