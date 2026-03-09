import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function TrainIntention() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const content = contentRef.current;

    if (!section || !bg || !content) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(bg, { scale: 1.12, opacity: 0.6 }, { scale: 1, opacity: 1, ease: 'none' }, 0)
        .fromTo(content, { y: '18vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0)
        .fromTo(
          content.querySelector('.micro-label'),
          { y: -10, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.05
        );

      // SETTLE (30% - 70%) - hold position

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(content, { y: 0, opacity: 1 }, { y: '-12vh', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(bg, { scale: 1, opacity: 1 }, { scale: 1.06, opacity: 0.6, ease: 'power2.in' }, 0.7);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-gym-black z-20"
      style={{ height: '100vh' }}
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0">
        <img
          src="/images/scene_train_intention_bg.jpg"
          alt="Training scene"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="vignette" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
      >
        <div className="max-w-4xl">
          <p className="micro-label font-mono-label text-xs uppercase tracking-[0.14em] text-gym-orange mb-6">
            Train with Intention
          </p>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-[clamp(34px,4.2vw,64px)] text-white uppercase leading-[1.1] tracking-[-0.02em] mb-6">
            Every Rep Counts.
            <br />
            <span className="text-gym-orange">Every Session Builds You.</span>
          </h2>
          <p className="text-gym-gray text-base lg:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            We combine strength, mobility, and conditioning into programs that fit your goals—and your schedule. 
            Our expert coaches guide you through every movement.
          </p>
          <button
            onClick={() => {
              const element = document.querySelector('#programs');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary rounded inline-flex items-center gap-2"
          >
            Explore Programs
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
