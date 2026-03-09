import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PowerPrecision() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const rightImage = rightImageRef.current;
    const text = textRef.current;

    if (!section || !bg || !rightImage || !text) return;

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
        .fromTo(rightImage, { x: '60vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0)
        .fromTo(text.querySelector('h2'), { y: '22vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.05)
        .fromTo(text.querySelector('p'), { y: '14vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.1)
        .fromTo(text.querySelector('button'), { y: '14vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.15);

      // SETTLE (30% - 70%) - hold position

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(rightImage, { x: 0, opacity: 1 }, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(text, { y: 0, opacity: 1 }, { y: '-10vh', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(bg, { scale: 1, opacity: 1 }, { scale: 1.06, opacity: 0.65, ease: 'power2.in' }, 0.7);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-gym-black z-[60]"
      style={{ height: '100vh' }}
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0">
        <img
          src="/images/scene_power_bg.jpg"
          alt="Power and precision"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="vignette" />
      </div>

      {/* Right Floating Image */}
      <div
        ref={rightImageRef}
        className="hidden lg:block absolute right-[6vw] top-[18vh] w-[42vw] h-[64vh]"
      >
        <img
          src="/images/scene_power_cut.jpg"
          alt="Athlete with power and precision"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text Content */}
      <div
        ref={textRef}
        className="absolute left-6 lg:left-[6vw] top-1/2 -translate-y-1/2 w-full lg:w-[36vw] px-6 lg:px-0"
      >
        <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-[clamp(34px,4.2vw,64px)] text-white uppercase leading-[1.1] tracking-[-0.02em] mb-6">
          Power &
          <br />
          <span className="text-gym-orange">Precision</span>
        </h2>
        <p className="text-gym-gray text-base lg:text-lg mb-8 leading-relaxed max-w-md">
          Personalized programming, measurable progress, and a team that keeps you consistent. 
          Precision in every movement, power in every rep.
        </p>
        <button
          onClick={() => {
            const element = document.querySelector('#contact');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
          }}
          className="btn-primary rounded inline-flex items-center gap-2"
        >
          Start Today
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
