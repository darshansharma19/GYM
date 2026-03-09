import { Instagram, Youtube, Facebook, Twitter, ArrowUp, Zap, Mail, MapPin, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const quickLinks = [
  { name: 'Shop', href: '#shop' },
  { name: 'Programs', href: '#programs' },
  { name: 'Membership', href: '#plans' },
  { name: 'Trainers', href: '#trainers' },
  { name: 'Contact', href: '#contact' },
];

const shopLinks = [
  { name: 'Whey Protein', href: '#shop' },
  { name: 'Pre-Workout', href: '#shop' },
  { name: 'Creatine', href: '#shop' },
  { name: 'Gym Accessories', href: '#shop' },
  { name: 'All Products', href: '#shop' },
];

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    if (href === '#') return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-gym-black border-t border-white/5 z-[70]">
      {/* Newsletter Section */}
      <div className="border-b border-white/5">
        <div className="px-4 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-display font-bold text-2xl text-white mb-2">
              Join the Darshan Family
            </h3>
            <p className="text-gym-gray mb-6">
              Subscribe for exclusive offers, fitness tips, and new product alerts.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gym-gray" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gym-black-lifted border-white/10 text-white placeholder:text-gym-gray/50 pl-10 h-12"
                />
              </div>
              <Button className="btn-primary rounded-lg h-12 px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a
              href="#"
              className="flex items-center gap-2 font-display font-bold text-2xl text-white tracking-tight mb-4"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
            >
              <div className="w-10 h-10 bg-gym-orange rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              DARSHAN
            </a>
            <p className="text-gym-gray text-sm leading-relaxed mb-6">
              India's premier fitness destination. Premium supplements, world-class equipment, 
              and expert coaching.
            </p>
            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gym-gray hover:bg-gym-orange hover:text-white transition-all duration-300"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gym-gray text-sm hover:text-gym-orange transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-4">
              Shop
            </h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gym-gray text-sm hover:text-gym-orange transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gym-orange flex-shrink-0 mt-0.5" />
                <span className="text-gym-gray text-sm">
                  12B, Indiranagar 100 Feet Road<br />
                  Bengaluru, Karnataka 560038
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gym-orange flex-shrink-0" />
                <span className="text-gym-gray text-sm">+91 80 4912 3300</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gym-orange flex-shrink-0" />
                <span className="text-gym-gray text-sm">hello@darshan.fitness</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 px-4 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gym-gray text-sm">
            © 2026 Darshan Fitness Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gym-gray text-sm hover:text-gym-orange transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gym-gray text-sm hover:text-gym-orange transition-colors">
              Terms of Service
            </a>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-gym-orange/10 rounded-xl flex items-center justify-center text-gym-orange hover:bg-gym-orange hover:text-white transition-all duration-300"
              aria-label="Back to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
