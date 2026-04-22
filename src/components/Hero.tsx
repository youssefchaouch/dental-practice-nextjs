'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Menu, Phone, X } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Book', href: '#book' },
    { label: 'Contact', href: '#footer' },
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
            <a
              href={`tel:${phoneNumber}`}
              className="flex items-center gap-2 px-5 py-2.5 text-sm bg-[var(--color-accent)] text-white hover:opacity-90 transition"
            >
              <Phone className="w-4 h-4" />
              Call
            </a>

            <a
              href="#book"
              onClick={(e) => handleNavClick(e, '#book')}
              className="px-5 py-2.5 text-sm bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
            >
              Book
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
              Call Us
            </a>

            <a
              href="#book"
              onClick={(e) => handleNavClick(e, '#book')}
              className="px-4 py-3 bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
            >
              Book Now
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
              Private Dental Practice
            </p>

            <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-8">
              Your Smile,<br />
              <span className="italic">Perfected.</span>
            </h1>

            <p className="text-lg text-[var(--color-text-secondary)] mb-10 max-w-lg">
              Experience exceptional dental care in a refined, calming environment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#book"
                onClick={(e) => handleNavClick(e, '#book')}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-[var(--color-primary)] text-white"
              >
                Book Appointment
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#about"
                onClick={(e) => handleNavClick(e, '#about')}
                className="px-6 py-4 border border-[var(--color-border)]"
              >
                Learn More
              </a>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            className="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[55%] h-[400px] lg:h-[80vh]"
            style={{ y: imageY }}
          >
            <div className="w-full h-full bg-gradient-to-br from-[var(--color-muted)] to-[var(--color-border)] flex items-center justify-center">
              <span className="text-2xl font-serif text-[var(--color-text-muted)]">
                Your Image Here
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Hero;