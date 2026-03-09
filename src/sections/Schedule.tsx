import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const scheduleItems = [
  {
    days: 'Mon / Wed / Fri',
    name: 'Strength Foundations',
    times: ['6:00 AM', '7:30 AM', '6:30 PM'],
    level: 'All Levels',
  },
  {
    days: 'Tue / Thu',
    name: 'Conditioning & Core',
    times: ['6:00 AM', '7:30 AM', '6:30 PM'],
    level: 'Intermediate',
  },
  {
    days: 'Saturday',
    name: 'Mobility & Recovery',
    times: ['9:00 AM', '10:30 AM'],
    level: 'All Levels',
  },
  {
    days: 'Sunday',
    name: 'Open Gym',
    times: ['8:00 AM - 2:00 PM'],
    level: 'All Levels',
  },
];

export default function Schedule() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      const scheduleList = content.querySelector('.schedule-list');
      const ctaBox = content.querySelector('.cta-box');

      gsap.fromTo(
        scheduleList,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        ctaBox,
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="schedule"
      className="relative bg-gym-black-lifted py-20 lg:py-32 z-[70]"
    >
      <div className="px-6 lg:px-[6vw]">
        <div ref={contentRef} className="grid lg:grid-cols-3 gap-12">
          {/* Schedule List */}
          <div className="schedule-list lg:col-span-2">
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-[-0.02em] mb-4">
              Weekly
              <span className="text-gym-orange"> Schedule</span>
            </h2>
            <p className="text-gym-gray text-base lg:text-lg mb-10">
              Book in advance. Show up. We'll handle the program.
            </p>

            <div className="space-y-4">
              {scheduleItems.map((item, index) => (
                <div
                  key={index}
                  className="glass-card p-5 lg:p-6 rounded-lg flex flex-col sm:flex-row sm:items-center gap-4 transition-all duration-300 hover:border-gym-orange/30"
                >
                  <div className="flex items-center gap-3 text-gym-orange min-w-[140px]">
                    <Calendar className="w-5 h-5" />
                    <span className="font-mono-label text-sm">{item.days}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-lg text-white">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-gym-gray text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{item.times.join(' • ')}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono-label uppercase tracking-wider text-gym-gray bg-white/5 px-3 py-1 rounded">
                    {item.level}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Box */}
          <div className="cta-box">
            <div className="glass-card p-6 lg:p-8 rounded-lg sticky top-24">
              <h3 className="font-display font-bold text-2xl text-white mb-4">
                Ready to Start?
              </h3>
              <p className="text-gym-gray mb-6">
                Book your first session today and experience the Darshan difference. 
                No commitment required.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gym-gray text-sm">
                  <div className="w-5 h-5 bg-gym-orange/20 rounded-full flex items-center justify-center">
                    <span className="text-gym-orange text-xs">✓</span>
                  </div>
                  Free fitness assessment
                </li>
                <li className="flex items-center gap-3 text-gym-gray text-sm">
                  <div className="w-5 h-5 bg-gym-orange/20 rounded-full flex items-center justify-center">
                    <span className="text-gym-orange text-xs">✓</span>
                  </div>
                  Personalized program
                </li>
                <li className="flex items-center gap-3 text-gym-gray text-sm">
                  <div className="w-5 h-5 bg-gym-orange/20 rounded-full flex items-center justify-center">
                    <span className="text-gym-orange text-xs">✓</span>
                  </div>
                  No signup fees
                </li>
              </ul>
              <button
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary rounded w-full flex items-center justify-center gap-2"
              >
                Reserve Your Spot
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
