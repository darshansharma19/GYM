import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Star, Sparkles, Zap, Crown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 2499,
    period: 'month',
    description: 'Perfect for beginners starting their fitness journey',
    features: [
      'Gym access (6 AM - 10 PM)',
      '1 group class per week',
      'Basic equipment orientation',
      'Locker room access',
      'Free parking',
    ],
    icon: Zap,
    color: 'blue',
    recommended: false,
  },
  {
    id: 'standard',
    name: 'Warrior',
    price: 4499,
    period: 'month',
    description: 'Our most popular plan for serious fitness enthusiasts',
    features: [
      'Unlimited gym access',
      'Unlimited group classes',
      '1 PT session per month',
      'Nutrition consultation',
      'Recovery zone access',
      'Guest passes (2/month)',
      '10% off supplements',
    ],
    icon: Star,
    color: 'orange',
    recommended: true,
  },
  {
    id: 'elite',
    name: 'Legend',
    price: 7999,
    period: 'month',
    description: 'The ultimate fitness experience with premium perks',
    features: [
      'Everything in Warrior',
      '4 PT sessions per month',
      'Weekly nutrition check-ins',
      'Priority class booking',
      'Personal locker',
      'Monthly body composition scan',
      '24/7 gym access',
      '20% off supplements',
    ],
    icon: Crown,
    color: 'purple',
    recommended: false,
  },
];

export default function MembershipPlans() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section || !header || !cards) return;

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

      const cardElements = cards.querySelectorAll('.plan-card');
      gsap.fromTo(
        cardElements,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="plans"
      className="relative bg-gym-black py-20 lg:py-28 z-[70] overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gym-orange/5 rounded-full blur-[150px]" />

      <div className="relative px-4 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-gym-orange/10 border border-gym-orange/30 rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-gym-orange" />
            <span className="text-gym-orange text-sm font-medium uppercase tracking-wider">
              Membership Plans
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-[-0.02em] mb-4">
            Choose Your
            <span className="text-gym-orange"> Path</span>
          </h2>
          <p className="text-gym-gray text-base lg:text-lg">
            No hidden fees. Cancel or pause anytime with 7 days notice. 
            Start your transformation today.
          </p>
        </div>

        {/* Pricing Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
        >
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isHovered = hoveredPlan === plan.id;
            const isRecommended = plan.recommended;

            return (
              <div
                key={plan.id}
                className={`plan-card relative rounded-2xl p-6 lg:p-8 transition-all duration-500 ${
                  isRecommended
                    ? 'bg-gradient-to-b from-gym-orange/20 to-gym-black border-2 border-gym-orange scale-105 lg:scale-110 z-10'
                    : 'bg-gym-black-lifted border border-white/5 hover:border-gym-orange/30'
                } ${isHovered && !isRecommended ? 'scale-105' : ''}`}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {isRecommended && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gym-orange text-white px-4 py-1">
                    Most Popular
                  </Badge>
                )}

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                  plan.color === 'orange' ? 'bg-gym-orange/20' :
                  plan.color === 'blue' ? 'bg-blue-500/20' :
                  'bg-purple-500/20'
                }`}>
                  <Icon className={`w-7 h-7 ${
                    plan.color === 'orange' ? 'text-gym-orange' :
                    plan.color === 'blue' ? 'text-blue-500' :
                    'text-purple-500'
                  }`} />
                </div>

                {/* Plan Info */}
                <h3 className="font-display font-bold text-2xl text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gym-gray text-sm mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <span className="font-display font-black text-4xl lg:text-5xl text-white">
                    ₹{plan.price.toLocaleString()}
                  </span>
                  <span className="text-gym-gray text-sm">/{plan.period}</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.color === 'orange' ? 'bg-gym-orange/20' :
                        plan.color === 'blue' ? 'bg-blue-500/20' :
                        'bg-purple-500/20'
                      }`}>
                        <Check className={`w-3 h-3 ${
                          plan.color === 'orange' ? 'text-gym-orange' :
                          plan.color === 'blue' ? 'text-blue-500' :
                          'text-purple-500'
                        }`} />
                      </div>
                      <span className="text-gym-gray text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => {
                    const element = document.querySelector('#contact');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full py-4 rounded-xl font-semibold uppercase tracking-wider text-sm transition-all duration-300 ${
                    isRecommended
                      ? 'bg-gym-orange text-white hover:bg-gym-orange-light'
                      : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  Get Started
                </button>
              </div>
            );
          })}
        </div>

        {/* Trust Note */}
        <p className="text-center text-gym-gray text-sm mt-10">
          All plans include a 7-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}
