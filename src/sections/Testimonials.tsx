import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: '1',
    name: 'Karan Singh',
    role: 'Member since 2023',
    content: "I've trained at many gyms—Darshan is the first place that actually programs my progress. The coaches care about your form and your results.",
    rating: 5,
    result: 'Lost 18kg in 6 months',
  },
  {
    id: '2',
    name: 'Ananya Reddy',
    role: 'Member since 2024',
    content: 'The coaches correct form without making it awkward. I feel stronger every month. The community here is incredibly supportive.',
    rating: 5,
    result: 'Gained 5kg muscle',
  },
  {
    id: '3',
    name: 'Vikram Thakur',
    role: 'Member since 2022',
    content: "The schedule fits my work life. I don't have to think—I just show up. Best decision I made for my health and fitness.",
    rating: 5,
    result: 'Deadlift PR: 180kg',
  },
  {
    id: '4',
    name: 'Priya Sharma',
    role: 'Member since 2023',
    content: 'Lost 15kg in 6 months with their guidance. The nutrition advice and workout plans are game-changers. Highly recommend!',
    rating: 5,
    result: 'Lost 15kg in 6 months',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      const cardElements = cards.querySelectorAll('.testimonial-card');
      gsap.fromTo(
        cardElements,
        { y: 50, opacity: 0, scale: 0.95 },
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
      id="testimonials"
      className="relative bg-gym-black py-20 lg:py-28 z-[70] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gym-orange/5 rounded-full blur-[150px] -translate-y-1/2" />

      <div className="relative px-4 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-gym-orange/10 border border-gym-orange/30 rounded-full px-4 py-2 mb-4">
            <TrendingUp className="w-4 h-4 text-gym-orange" />
            <span className="text-gym-orange text-sm font-medium uppercase tracking-wider">
              Success Stories
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-[-0.02em] mb-4">
            Real People.
            <span className="text-gym-orange"> Real Results.</span>
          </h2>
          <p className="text-gym-gray text-base lg:text-lg">
            Join thousands who have transformed their lives at Darshan Fitness Academy.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-card group bg-gym-black-lifted rounded-2xl p-6 border border-white/5 transition-all duration-300 hover:-translate-y-2 hover:border-gym-orange/30"
            >
              {/* Quote Icon */}
              <div className="w-10 h-10 bg-gym-orange/10 rounded-xl flex items-center justify-center mb-4">
                <Quote className="w-5 h-5 text-gym-orange" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gym-gray text-sm leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Result Badge */}
              <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1.5 mb-4">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-green-500 text-xs font-medium">{testimonial.result}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="w-10 h-10 bg-gradient-to-br from-gym-orange to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{testimonial.name}</p>
                  <p className="text-gym-gray text-xs">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {[
            { value: '10,000+', label: 'Happy Members' },
            { value: '50,000+', label: 'KGs Lost' },
            { value: '4.9/5', label: 'Average Rating' },
            { value: '95%', label: 'Success Rate' },
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gym-black-lifted rounded-xl border border-white/5">
              <p className="font-display font-black text-2xl lg:text-3xl text-gym-orange mb-1">{stat.value}</p>
              <p className="text-gym-gray text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
