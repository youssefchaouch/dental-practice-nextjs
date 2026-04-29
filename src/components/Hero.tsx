'use client';

import LanguageSwitcher from '@/components/LanguageSwitcher';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Menu, Phone, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRef, useState } from 'react';

const Hero = ({ locale }: { locale: string }) => {
  const t = useTranslations('hero');
  const tNav = useTranslations('nav');

  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const navLinks = [
    { label: tNav('about'), href: '#about' },
    { label: tNav('services'), href: '#services' },
    { label: tNav('reviews'), href: '#reviews' },
    { label: tNav('book'), href: '#book' },
    { label: tNav('contact'), href: '#footer' },
  ];

  const phoneNumber = '+216 23 770 581';

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden grain-overlay">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--color-background)]" />

      {/* NAVBAR */}
      <motion.nav
        className="relative z-20 px-6 md:px-12 lg:px-24 py-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-xl md:text-2xl tracking-tight text-[var(--color-text-primary)]"
          >
            Dr. Maha Chaouch
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm tracking-wide text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher currentLocale={locale} />
            <a
              href={`tel:${phoneNumber}`}
              className="flex items-center gap-2 px-6 py-3 text-sm font-medium tracking-wide bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent)]/90 transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              {tNav('call')}
            </a>
            <a
              href="#book"
              onClick={(e) => handleNavClick(e, '#book')}
              className="flex items-center gap-2 px-6 py-3 text-sm font-medium tracking-wide bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-text-primary)] transition-all duration-300"
            >
              {tNav('bookNow')}
            </a>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-6 flex flex-col gap-6 bg-[var(--color-background)] p-6 border border-[var(--color-border)]"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-base text-[var(--color-text-secondary)]"
              >
                {link.label}
              </a>
            ))}

            <a
              href={`tel:${phoneNumber}`}
              className="flex items-center gap-2 px-4 py-3 bg-[var(--color-accent)] text-white"
            >
              <Phone className="w-4 h-4" />
              {tNav('call')}
            </a>

            <a
              href="#book"
              onClick={(e) => handleNavClick(e, '#book')}
              className="px-4 py-3 bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
            >
              {tNav('bookNow')}
            </a>
          </motion.div>
        )}
      </motion.nav>

      {/* HERO CONTENT */}
      <div className="relative z-10 px-6 md:px-12 lg:px-24 pt-12 md:pt-24 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          {/* LEFT */}
          <motion.div style={{ opacity: textOpacity }} className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-accent)] mb-6">
              {t('badge')}
            </p>

            <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-8">
              {t('headline1')}
              <br />
              <span className="italic">{t('headline2')}</span>
            </h1>

            <p className="text-lg text-[var(--color-text-secondary)] mb-10 max-w-lg">
              {t('subtext')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#book"
                onClick={(e) => handleNavClick(e, '#book')}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-[var(--color-primary)] text-white"
              >
                {tNav('book')}
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#about"
                onClick={(e) => handleNavClick(e, '#about')}
                className="px-6 py-4 border border-[var(--color-border)]"
              >
                {t('learnBtn')}
              </a>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            className="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[45%] h-[320px] md:h-[420px] lg:h-[60vh]"
            style={{ y: imageY }}
          >
            <img
              src="/taswira1.jpg"
              alt="Clinic main area"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '';
                (e.target as HTMLImageElement).parentElement!.style.background = 'var(--color-muted)';
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;