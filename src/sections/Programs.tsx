import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Dumbbell, Users, Laptop, Heart, Apple, Building2, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const programs = [
  {
    id: '1',
    name: 'Personal Training',
    description: '1-on-1 sessions tailored to your goals, schedule, and starting point. Get undivided attention from expert coaches.',
    icon: Dumbbell,
    color: 'from-orange-500 to-red-500',
  },
  {
    id: '2',
    name: 'Small Group Classes',
    description: 'Strength + conditioning in a team atmosphere. Max 8 per class for personalized attention.',
    icon: Users,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: '3',
    name: 'Online Coaching',
    description: 'Weekly programming, video check-ins, and chat support. Train from anywhere in the world.',
    icon: Laptop,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: '4',
    name: 'Recovery & Mobility',
    description: 'Stretching, breathwork, and guided cooldowns to keep you training at your best.',
    icon: Heart,
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: '5',
    name: 'Nutrition Guidance',
    description: 'Simple habits, meal structure, and check-ins—no extreme diets, just sustainable results.',
    icon: Apple,
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: '6',
    name: 'Corporate Wellness',
    description: 'On-site sessions for teams. Build energy, focus, and resilience in your workplace.',
    icon: Building2,
    color: 'from-indigo-500 to-blue-500',
  },
];

export default function Programs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;
    const image = imageRef.current;

    if (!section || !header || !cards || !image) return;

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

      gsap.fromTo(
        image,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: image,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const cardElements = cards.querySelectorAll('.program-card');
      gsap.fromTo(
        cardElements,
        { y: 60, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
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
      id="programs"
      className="relative bg-gym-black-lifted py-20 lg:py-28 z-[70]"
    >
      <div className="px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <div ref={headerRef}>
              <div className="inline-flex items-center gap-2 bg-gym-orange/10 border border-gym-orange/30 rounded-full px-4 py-2 mb-4">
                <Dumbbell className="w-4 h-4 text-gym-orange" />
                <span className="text-gym-orange text-sm font-medium uppercase tracking-wider">
                  Our Programs
                </span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-[-0.02em] mb-4">
                Train Your
                <span className="text-gym-orange"> Way</span>
              </h2>
              <p className="text-gym-gray text-base lg:text-lg mb-8">
                Choose the format that fits your lifestyle—each one includes coaching, 
                tracking, and a plan that adjusts as you improve.
              </p>
            </div>

            {/* Program Cards */}
            <div ref={cardsRef} className="grid sm:grid-cols-2 gap-4">
              {programs.map((program) => {
                const Icon = program.icon;
                return (
                  <div
                    key={program.id}
                    className="program-card group bg-gym-black rounded-xl p-5 border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-gym-orange/30"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${program.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-display font-bold text-base text-white mb-2 group-hover:text-gym-orange transition-colors">
                      {program.name}
                    </h3>
                    <p className="text-gym-gray text-xs leading-relaxed">
                      {program.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Image */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/images/scene_group_workout.jpg"
                alt="Group workout at Darshan Fitness"
                className="w-full h-[400px] lg:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gym-black via-transparent to-transparent" />
              
              {/* Floating Stats Card */}
              <div className="absolute bottom-6 left-6 right-6 glass-card rounded-xl p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-bold text-lg">Join 10,000+ Members</p>
                    <p className="text-gym-gray text-sm">Start your transformation today</p>
                  </div>
                  <button 
                    onClick={() => {
                      const element = document.querySelector('#contact');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-12 h-12 bg-gym-orange rounded-full flex items-center justify-center hover:bg-gym-orange-light transition-colors"
                  >
                    <ArrowRight className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Decorative */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-gym-orange/20 rounded-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gym-orange/10 rounded-xl blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
