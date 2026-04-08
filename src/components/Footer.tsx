'use client';

import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Book Appointment', href: '#book' },
  ];

  const services = [
    'Professional Cleaning',
    'Teeth Whitening',
    'Restorative Fillings',
    'Root Canal Therapy',
    'Crown & Bridge',
    'Dental Implants',
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-serif text-2xl tracking-tight text-[var(--color-primary-foreground)]">
              Dr. Maha Chaouch
            </Link>
            <p className="mt-4 text-sm text-[var(--color-primary-foreground)]/70 leading-relaxed">
              Luxury private dental practice offering personalized care in a refined, 
              calming environment.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center border border-[var(--color-primary-foreground)]/20 text-[var(--color-primary-foreground)]/70 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg mb-6 text-[var(--color-primary-foreground)]">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-sm text-[var(--color-primary-foreground)]/70 hover:text-[var(--color-accent)] transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg mb-6 text-[var(--color-primary-foreground)]">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-sm text-[var(--color-primary-foreground)]/70">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg mb-6 text-[var(--color-primary-foreground)]">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-[var(--color-accent)]" />
                <span className="text-sm text-[var(--color-primary-foreground)]/70">
                  123 Dental Street<br />
                  Medical District, City 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0 text-[var(--color-accent)]" />
                <a 
                  href="tel:+1234567890" 
                  className="text-sm text-[var(--color-primary-foreground)]/70 hover:text-[var(--color-accent)] transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0 text-[var(--color-accent)]" />
                <a 
                  href="mailto:info@drmahachaouch.com" 
                  className="text-sm text-[var(--color-primary-foreground)]/70 hover:text-[var(--color-accent)] transition-colors"
                >
                  info@drmahachaouch.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[var(--color-primary-foreground)]/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[var(--color-primary-foreground)]/50">
              {currentYear} Dr. Maha Chaouch Dental Practice. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-[var(--color-primary-foreground)]/50 hover:text-[var(--color-accent)] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-[var(--color-primary-foreground)]/50 hover:text-[var(--color-accent)] transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
