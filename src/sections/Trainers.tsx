import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Instagram, Linkedin, Users, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const trainers = [
  {
    id: '1',
    name: 'Arjun Mehta',
    specialty: 'Strength & Conditioning',
    experience: '10+ years',
    certifications: ['NSCA-CPT', 'CrossFit L2', 'Precision Nutrition'],
    image: '/images/trainer_arjun.jpg',
    bio: 'Builds strong foundations with a focus on functional movement and progressive overload.',
    clients: 500,
    rating: 4.9,
  },
  {
    id: '2',
    name: 'Priya Nair',
    specialty: 'Mobility & Recovery',
    experience: '8+ years',
    certifications: ['RYT-500', 'FRC Specialist', 'Sports Massage'],
    image: '/images/trainer_priya.jpg',
    bio: 'Combines yoga wisdom with sports science to keep you moving well and pain-free.',
    clients: 350,
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Rohan Das',
    specialty: 'Fat Loss & Conditioning',
    experience: '7+ years',
    certifications: ['ACE-CPT', 'HIIT Specialist', 'Behavior Change'],
    image: '/images/trainer_rohan.jpg',
    bio: 'Habit-first approach that delivers sustainable results without extreme measures.',
    clients: 420,
    rating: 4.9,
  },
];

export default function Trainers() {
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

      const cardElements = cards.querySelectorAll('.trainer-card');
      gsap.fromTo(
        cardElements,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
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
      id="trainers"
      className="relative bg-gym-black-lifted py-20 lg:py-28 z-[70]"
    >
      <div className="px-4 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-gym-orange/10 border border-gym-orange/30 rounded-full px-4 py-2 mb-4">
            <Users className="w-4 h-4 text-gym-orange" />
            <span className="text-gym-orange text-sm font-medium uppercase tracking-wider">
              Expert Coaches
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-[-0.02em] mb-4">
            Train with the
            <span className="text-gym-orange"> Best</span>
          </h2>
          <p className="text-gym-gray text-base lg:text-lg">
            Our certified coaches bring years of experience and a passion for helping you achieve your goals.
          </p>
        </div>

        {/* Trainer Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto"
        >
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="trainer-card group bg-gym-black rounded-2xl overflow-hidden border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-gym-orange/30 hover:shadow-glow"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gym-black via-gym-black/20 to-transparent" />
                
                {/* Social Links */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-9 h-9 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-gym-orange transition-colors">
                    <Instagram className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-gym-orange transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </button>
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-gym-black/80 backdrop-blur-sm rounded-lg px-3 py-1.5">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-white text-sm font-medium">{trainer.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-display font-bold text-xl text-white group-hover:text-gym-orange transition-colors">
                      {trainer.name}
                    </h3>
                    <p className="text-gym-orange text-sm font-medium">
                      {trainer.specialty}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-gym-gray text-xs bg-white/5 px-2 py-1 rounded">
                    <Award className="w-3 h-3 text-gym-orange" />
                    {trainer.experience}
                  </div>
                </div>

                <p className="text-gym-gray text-sm mb-4 leading-relaxed">
                  {trainer.bio}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div>
                    <p className="text-white font-bold">{trainer.clients}+</p>
                    <p className="text-gym-gray text-xs">Clients Trained</p>
                  </div>
                  <div className="flex flex-wrap gap-1 justify-end">
                    {trainer.certifications.slice(0, 2).map((cert, index) => (
                      <span
                        key={index}
                        className="text-xs text-gym-gray bg-white/5 px-2 py-1 rounded"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
