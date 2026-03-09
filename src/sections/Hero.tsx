import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play, Flame, Trophy, Zap } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Trophy, value: '10K+', label: 'Transformations' },
  { icon: Flame, value: '50+', label: 'Expert Coaches' },
  { icon: Zap, value: '24/7', label: 'Gym Access' },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;
    const statsEl = statsRef.current;

    if (!section || !content || !image || !statsEl) return;

    const ctx = gsap.context(() => {
      // Load animation timeline
      const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      loadTl
        .fromTo(
          content.querySelector('.badge'),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 }
        )
        .fromTo(
          content.querySelectorAll('.headline-word'),
          { y: 60, opacity: 0, rotateX: -40 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.1 },
          '-=0.3'
        )
        .fromTo(
          content.querySelector('.subheadline'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          content.querySelector('.cta-group'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.3'
        )
        .fromTo(
          image,
          { scale: 1.2, opacity: 0, x: 100 },
          { scale: 1, opacity: 1, x: 0, duration: 1.2 },
          '-=1'
        )
        .fromTo(
          statsEl.querySelectorAll('.stat-item'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
          '-=0.5'
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set([content, image, statsEl], { clearProps: 'all' });
          },
        },
      });

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(content, { x: 0, opacity: 1 }, { x: '-10vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(image, { x: 0, opacity: 1 }, { x: '15vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(statsEl, { y: 0, opacity: 1 }, { y: 50, opacity: 0, ease: 'power2.in' }, 0.75);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-gym-black overflow-hidden z-10"
      style={{ paddingTop: '80px' }}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,106,61,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,106,61,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gym-orange/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gym-orange/10 rounded-full blur-[100px]" />

      <div className="relative z-10 w-full px-6 lg:px-12 py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-160px)]">
          
          {/* Left Content */}
          <div ref={contentRef} className="order-2 lg:order-1">
            {/* Badge */}
            <div className="badge inline-flex items-center gap-2 bg-gym-orange/10 border border-gym-orange/30 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-gym-orange rounded-full animate-pulse" />
              <span className="text-gym-orange text-sm font-medium uppercase tracking-wider">
                India's #1 Fitness Brand
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white uppercase leading-[0.95] tracking-[-0.03em] mb-6">
              <span className="headline-word block" style={{ perspective: '1000px' }}>
                Forge Your
              </span>
              <span className="headline-word block text-gym-orange" style={{ perspective: '1000px' }}>
                Legacy
              </span>
              <span className="headline-word block text-2xl sm:text-3xl lg:text-4xl font-semibold mt-2 normal-case tracking-normal text-gym-gray">
                At Darshan Fitness Academy
              </span>
            </h1>

            {/* Subheadline */}
            <p className="subheadline text-gym-gray text-base lg:text-lg max-w-lg mb-8 leading-relaxed">
              Premium supplements, world-class equipment, and expert coaching. 
              Everything you need to transform your body and dominate your goals.
            </p>

            {/* CTA Group */}
            <div className="cta-group flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={() => {
                  const element = document.querySelector('#shop');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary rounded-lg flex items-center justify-center gap-2 text-base px-8 py-4"
              >
                <Zap className="w-5 h-5" />
                Shop Supplements
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
                <DialogTrigger asChild>
                  <button className="btn-secondary rounded-lg flex items-center justify-center gap-2 text-base px-8 py-4 group">
                    <div className="w-10 h-10 bg-gym-orange rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 text-white ml-0.5" />
                    </div>
                    Watch Our Story
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-gym-black border-white/10 max-w-3xl">
                  <div className="aspect-video bg-gym-black-lifted rounded-lg flex items-center justify-center">
                    <p className="text-gym-gray">Video coming soon</p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="flex flex-wrap gap-6 lg:gap-10">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="stat-item flex items-center gap-3">
                    <div className="w-12 h-12 bg-gym-orange/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-gym-orange" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-2xl text-white">{stat.value}</p>
                      <p className="text-gym-gray text-xs uppercase tracking-wider">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Image */}
          <div ref={imageRef} className="order-1 lg:order-2 relative">
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="/images/hero_main.jpg"
                  alt="Indian bodybuilder at Darshan Fitness"
                  className="w-full h-[400px] lg:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gym-black via-transparent to-transparent" />
                
                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 right-6 glass-card rounded-xl p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src="/images/hero_secondary.jpg"
                      alt="Trainer"
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-white font-semibold">Train with the Best</p>
                      <p className="text-gym-gray text-sm">50+ certified coaches</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gym-orange ml-auto" />
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-gym-orange/30 rounded-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gym-orange/10 rounded-xl blur-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-gym-orange rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
