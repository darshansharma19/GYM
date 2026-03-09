import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingCart, Check, Star, TrendingUp, Flame, Zap } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/types';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: 'all', name: 'All Products', icon: Zap },
  { id: 'protein', name: 'Protein', icon: TrendingUp },
  { id: 'preworkout', name: 'Pre-Workout', icon: Flame },
  { id: 'accessories', name: 'Accessories', icon: ShoppingCart },
];

const products: Product[] = [
  {
    id: 'whey-protein',
    name: 'Darshan Whey Gold',
    description: '25g pure whey protein isolate. Fast absorption, muscle recovery.',
    price: 3499,
    originalPrice: 4299,
    image: '/images/product_whey.jpg',
    category: 'protein',
    badge: 'Bestseller',
    rating: 4.9,
    reviews: 2847,
  },
  {
    id: 'mass-gainer',
    name: 'Mass Gainer Pro',
    description: 'High-calorie formula with complex carbs. 1250 calories per serving.',
    price: 4299,
    originalPrice: 5299,
    image: '/images/product_mass_gainer.jpg',
    category: 'protein',
    badge: 'New',
    rating: 4.7,
    reviews: 1523,
  },
  {
    id: 'creatine',
    name: 'Creatine Monohydrate',
    description: 'Pure micronized creatine. Strength & power enhancement.',
    price: 1299,
    originalPrice: 1699,
    image: '/images/product_creatine.jpg',
    category: 'protein',
    badge: 'Popular',
    rating: 4.8,
    reviews: 3421,
  },
  {
    id: 'bcaa',
    name: 'BCAA 2:1:1 Ratio',
    description: 'Essential amino acids. Intra-workout fuel, prevents muscle breakdown.',
    price: 1899,
    originalPrice: 2399,
    image: '/images/product_bcaa.jpg',
    category: 'protein',
    badge: null,
    rating: 4.6,
    reviews: 987,
  },
  {
    id: 'preworkout',
    name: 'Ignition X Pre-Workout',
    description: 'Explosive energy, focus & pumps. 300mg caffeine per scoop.',
    price: 2499,
    originalPrice: 2999,
    image: '/images/product_preworkout.jpg',
    category: 'preworkout',
    badge: 'Hot',
    rating: 4.9,
    reviews: 2156,
  },
  {
    id: 'gym-gloves',
    name: 'Pro Lifting Gloves',
    description: 'Premium leather with wrist support. Maximum grip & protection.',
    price: 899,
    originalPrice: 1199,
    image: '/images/product_gloves.jpg',
    category: 'accessories',
    badge: null,
    rating: 4.5,
    reviews: 876,
  },
  {
    id: 'shaker-bottle',
    name: 'Elite Shaker Pro',
    description: 'Leak-proof design with mixing ball. 750ml BPA-free.',
    price: 599,
    originalPrice: 799,
    image: '/images/product_shaker.jpg',
    category: 'accessories',
    badge: null,
    rating: 4.7,
    reviews: 2134,
  },
  {
    id: 'lifting-belt',
    name: 'Leather Lifting Belt',
    description: '10mm thick genuine leather. Maximum back support for heavy lifts.',
    price: 2499,
    originalPrice: 3299,
    image: '/images/product_belt.jpg',
    category: 'accessories',
    badge: 'Premium',
    rating: 4.8,
    reviews: 654,
  },
  {
    id: 'resistance-bands',
    name: 'Resistance Bands Set',
    description: '5 levels with handles & door anchor. Full body workout anywhere.',
    price: 1299,
    originalPrice: 1699,
    image: '/images/product_bands.jpg',
    category: 'accessories',
    badge: null,
    rating: 4.6,
    reviews: 1123,
  },
  {
    id: 'gym-bag',
    name: 'Pro Gym Duffel Bag',
    description: '45L capacity with shoe compartment. Water-resistant material.',
    price: 1999,
    originalPrice: 2599,
    image: '/images/product_bag.jpg',
    category: 'accessories',
    badge: 'New',
    rating: 4.7,
    reviews: 432,
  },
];

export default function Shop() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const { addToCart, items } = useCart();

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const isInCart = (productId: string) => {
    return items.some((item) => item.id === productId);
  };

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const productsEl = productsRef.current;

    if (!section || !header || !productsEl) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const cardElements = productsEl.querySelectorAll('.product-card');
      gsap.fromTo(
        cardElements,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: productsEl,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [filteredProducts]);

  return (
    <section
      ref={sectionRef}
      id="shop"
      className="relative bg-gym-black py-20 lg:py-28 z-[70]"
    >
      <div className="px-4 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-gym-orange/10 border border-gym-orange/30 rounded-full px-4 py-2 mb-4">
              <ShoppingCart className="w-4 h-4 text-gym-orange" />
              <span className="text-gym-orange text-sm font-medium uppercase tracking-wider">
                Premium Supplements
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-[-0.02em] mb-4">
              Fuel Your
              <span className="text-gym-orange"> Gains</span>
            </h2>
            <p className="text-gym-gray text-base lg:text-lg max-w-xl">
              Science-backed supplements trusted by 10,000+ athletes. 
              Premium quality at unbeatable prices.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-gym-gray text-sm">
              <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Check className="w-4 h-4 text-green-500" />
              </div>
              Lab Tested
            </div>
            <div className="flex items-center gap-2 text-gym-gray text-sm">
              <div className="w-8 h-8 bg-gym-orange/10 rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 text-gym-orange" />
              </div>
              4.8/5 Rating
            </div>
            <div className="flex items-center gap-2 text-gym-gray text-sm">
              <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-blue-500" />
              </div>
              Fast Delivery
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-gym-orange text-white'
                    : 'bg-gym-black-lifted text-gym-gray hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div
          ref={productsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6"
        >
          {filteredProducts.map((product) => {
            const inCart = isInCart(product.id);
            const discount = product.originalPrice 
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <div
                key={product.id}
                className="product-card group bg-gym-black-lifted rounded-2xl overflow-hidden border border-white/5 transition-all duration-300 hover:-translate-y-2 hover:border-gym-orange/30 hover:shadow-glow flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gym-black">
                  {product.badge && (
                    <Badge className={`absolute top-3 left-3 z-10 ${
                      product.badge === 'Hot' ? 'bg-red-500' :
                      product.badge === 'New' ? 'bg-blue-500' :
                      product.badge === 'Bestseller' ? 'bg-gym-orange' :
                      'bg-purple-500'
                    } text-white text-xs`}>
                      {product.badge}
                    </Badge>
                  )}
                  {discount > 0 && (
                    <Badge className="absolute top-3 right-3 z-10 bg-green-500 text-white text-xs">
                      -{discount}%
                    </Badge>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-white text-xs font-medium">{product.rating}</span>
                    <span className="text-gym-gray text-xs">({product.reviews})</span>
                  </div>

                  <h3 className="font-display font-bold text-base text-white mb-1 group-hover:text-gym-orange transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gym-gray text-xs mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-display font-bold text-xl text-gym-orange">
                        ₹{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-gym-gray text-sm line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      disabled={inCart}
                      className={`w-full py-3 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                        inCart
                          ? 'bg-green-500/20 text-green-400 cursor-default'
                          : 'bg-gym-orange text-white hover:bg-gym-orange-light'
                      }`}
                    >
                      {inCart ? (
                        <>
                          <Check className="w-4 h-4" />
                          Added to Cart
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <button className="btn-secondary rounded-lg px-8 py-4">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}
