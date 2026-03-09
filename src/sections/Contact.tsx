import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Send, MessageCircle, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  'Free fitness assessment',
  'Personalized workout plan',
  'Nutrition guidance',
  'No signup fees',
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    goal: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;

    if (!section || !left || !right) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        left,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        right,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: 'Message Sent!',
      description: 'We will get back to you within 24 hours.',
    });
    setFormData({ name: '', email: '', phone: '', goal: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-gym-black-lifted py-20 lg:py-28 z-[70]"
    >
      <div className="px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Left Column - Info */}
          <div ref={leftRef}>
            <div className="inline-flex items-center gap-2 bg-gym-orange/10 border border-gym-orange/30 rounded-full px-4 py-2 mb-4">
              <MessageCircle className="w-4 h-4 text-gym-orange" />
              <span className="text-gym-orange text-sm font-medium uppercase tracking-wider">
                Get In Touch
              </span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-[-0.02em] mb-4">
              Start Your
              <span className="text-gym-orange"> Journey</span>
            </h2>
            <p className="text-gym-gray text-base lg:text-lg mb-8 max-w-md">
              Tell us what you're working toward. We'll recommend the right program and schedule.
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-gym-gray text-sm">
                  <CheckCircle className="w-4 h-4 text-gym-orange flex-shrink-0" />
                  {benefit}
                </div>
              ))}
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-gym-black rounded-xl p-4 border border-white/5">
                <div className="w-12 h-12 bg-gym-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gym-orange" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Visit Us</h4>
                  <p className="text-gym-gray text-sm">
                    12B, Indiranagar 100 Feet Road<br />
                    Bengaluru, Karnataka 560038
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-gym-black rounded-xl p-4 border border-white/5">
                <div className="w-12 h-12 bg-gym-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-gym-orange" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Call Us</h4>
                  <p className="text-gym-gray text-sm">+91 80 4912 3300</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-gym-black rounded-xl p-4 border border-white/5">
                <div className="w-12 h-12 bg-gym-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-gym-orange" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Working Hours</h4>
                  <p className="text-gym-gray text-sm">Mon-Sat: 5AM - 11PM | Sun: 8AM - 2PM</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/918049123300"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 mt-6 bg-green-600 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-green-500 hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Right Column - Form */}
          <div ref={rightRef}>
            <form onSubmit={handleSubmit} className="bg-gym-black rounded-2xl p-6 lg:p-8 border border-white/5">
              <h3 className="font-display font-bold text-xl text-white mb-6">
                Request a Free Consultation
              </h3>

              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gym-gray text-sm mb-2 block">Full Name</label>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-gym-black-lifted border-white/10 text-white placeholder:text-gym-gray/50 focus:border-gym-orange h-12"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-gym-gray text-sm mb-2 block">Phone</label>
                    <Input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-gym-black-lifted border-white/10 text-white placeholder:text-gym-gray/50 focus:border-gym-orange h-12"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gym-gray text-sm mb-2 block">Email</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-gym-black-lifted border-white/10 text-white placeholder:text-gym-gray/50 focus:border-gym-orange h-12"
                    required
                  />
                </div>

                <div>
                  <label className="text-gym-gray text-sm mb-2 block">Your Goal</label>
                  <Select
                    value={formData.goal}
                    onValueChange={(value) => setFormData({ ...formData, goal: value })}
                  >
                    <SelectTrigger className="bg-gym-black-lifted border-white/10 text-white focus:border-gym-orange h-12">
                      <SelectValue placeholder="Select your primary goal" />
                    </SelectTrigger>
                    <SelectContent className="bg-gym-black border-white/10">
                      <SelectItem value="weight-loss">Weight Loss</SelectItem>
                      <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                      <SelectItem value="strength">Strength Training</SelectItem>
                      <SelectItem value="endurance">Endurance</SelectItem>
                      <SelectItem value="general">General Fitness</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-gym-gray text-sm mb-2 block">Message (Optional)</label>
                  <Textarea
                    placeholder="Tell us about your fitness journey..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-gym-black-lifted border-white/10 text-white placeholder:text-gym-gray/50 focus:border-gym-orange min-h-[100px]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary rounded-xl h-12 text-base flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Request a Call
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
