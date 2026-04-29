'use client';

import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: tNav('about'), href: '#about' },
    { label: tNav('services'), href: '#services' },
    { label: tNav('reviews'), href: '#reviews' },
    { label: tNav('bookNow'), href: '#book' },
  ];

  const services = [
    'Consultations & Assessment',
    'Prevention & Hygiene',
    'Dental Care',
    'Smile Aesthetics',
    'Prosthetics & Implants',
    'Orthodontics with Clear Aligners',
  ];

  const phoneNumber = '+216 23 770 581';
  const whatsappNumber = '+216 23 770 581';
  const mapsLink = 'https://maps.app.goo.gl/y3anxC9ddDkVYPkJ9';
  const emailAddress = 'drmahachaouch@gmail.com';

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/dr.maha.chaouch?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', label: 'Instagram' },
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61562106102547', label: 'Facebook' },
  ];

  return (
    <footer id="footer" className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-serif text-2xl tracking-tight text-[var(--color-primary-foreground)]">
              Dr. Maha Chaouch
            </Link>
            <p className="mt-4 text-sm text-[var(--color-primary-foreground)]/80 leading-relaxed">
              Luxury private dental practice offering personalized care in a refined, 
              calming environment.
            </p>
            <div className="flex gap-4 mt-6">
              {[{ icon: Instagram, label: 'Instagram' }, { icon: Facebook, label: 'Facebook' }].map((s) => (
                <a key={s.label} href="#" aria-label={s.label} className="w-10 h-10 flex items-center justify-center border border-[var(--color-primary-foreground)]/20 text-[var(--color-primary-foreground)]/70 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300">
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg mb-6 text-[var(--color-primary-foreground)]">
              {t('quickLinksTitle')}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-sm text-[var(--color-primary-foreground)]/80 hover:text-[var(--color-accent)] transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg mb-6 text-[var(--color-primary-foreground)]">
              {t('contactTitle')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-[var(--color-accent)]" />
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[var(--color-primary-foreground)]/80 hover:text-[var(--color-accent)] transition-colors duration-300"
                >
                  {t('address')}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0 text-[var(--color-accent)]" />
                <a
                  href={`tel:${phoneNumber}`}
                  className="text-sm text-[var(--color-primary-foreground)]/80 hover:text-[var(--color-accent)] transition-colors duration-300"
                >
                  {phoneNumber}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="w-4 h-4 flex-shrink-0 text-[var(--color-accent)]" />
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[var(--color-primary-foreground)]/80 hover:text-[var(--color-accent)] transition-colors duration-300"
                >
                  {whatsappNumber}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0 text-[var(--color-accent)]" />
                <a
                  href={`mailto:${emailAddress}`}
                  className="text-sm text-[var(--color-primary-foreground)]/80 hover:text-[var(--color-accent)] transition-colors duration-300"
                >
                  {emailAddress}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--color-primary-foreground)]/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[var(--color-primary-foreground)]/50">
              {currentYear} Dr. Maha Chaouch Dental Practice. {t('rights')}
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-[var(--color-primary-foreground)]/50 hover:text-[var(--color-accent)] transition-colors">{t('privacy')}</a>
              <a href="#" className="text-xs text-[var(--color-primary-foreground)]/50 hover:text-[var(--color-accent)] transition-colors">{t('terms')}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;