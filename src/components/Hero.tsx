'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Book', href: '#book' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden grain-overlay">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--color-background)]" />
      
      {/* Navigation */}
      <motion.nav 
        className="relative z-20 px-6 md:px-12 lg:px-24 py-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className="font-serif text-xl md:text-2xl tracking-tight text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors duration-300"
          >
            Dr. Maha Chaouch
          </Link>
          
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-sans tracking-wide text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#book"
            onClick={(e) => handleNavClick(e, '#book')}
            className="hidden md:flex items-center gap-2 px-6 py-3 text-sm font-medium tracking-wide bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-text-primary)] transition-all duration-300"
          >
            Book Now
          </a>
        </div>
      </motion.nav>

      {/* Main Hero Content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-24 pt-12 md:pt-24 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 items-center min-h-[70vh]">
          {/* Left Content */}
          <motion.div 
            className="max-w-2xl"
            style={{ opacity: textOpacity }}
          >
            <motion.p
              className="text-sm font-sans uppercase tracking-[0.2em] text-[var(--color-accent)] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Private Dental Practice
            </motion.p>

            <motion.h1
              className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.05] tracking-tight text-[var(--color-text-primary)] mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Your Smile,<br />
              <span className="italic">Perfected.</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl font-sans text-[var(--color-text-secondary)] leading-relaxed mb-12 max-w-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Experience exceptional dental care in a refined, calming environment. 
              Where advanced techniques meet personalized attention.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <a
                href="#book"
                onClick={(e) => handleNavClick(e, '#book')}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-medium tracking-wide bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-text-primary)] transition-all duration-300"
              >
                Book an Appointment
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, '#about')}
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium tracking-wide border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-primary)] transition-all duration-300"
              >
                Learn More
              </a>
            </motion.div>
          </motion.div>

          {/* Right Image - Asymmetric, bleeding off edge */}
          <motion.div 
            className="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[55%] h-[400px] md:h-[500px] lg:h-[80vh]"
            style={{ y: imageY }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="relative w-full h-full overflow-hidden">
              {/* Placeholder for hero image - elegant dental environment */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-muted)] to-[var(--color-border)]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-8">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-[var(--color-card)] flex items-center justify-center border border-[var(--color-border)]">
                      <span className="font-serif text-4xl text-[var(--color-accent)]">MC</span>
                    </div>
                    <p className="font-serif text-2xl text-[var(--color-text-primary)] mb-2">Dr. Maha Chaouch</p>
                    <p className="text-sm text-[var(--color-text-muted)]">Modern Dental Excellence</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative element */}
              <div className="absolute bottom-0 left-0 w-1/3 h-1/4 bg-[var(--color-accent)] opacity-10" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-6 md:left-12 lg:left-24 flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <div className="w-px h-16 bg-[var(--color-border)] relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full bg-[var(--color-accent)]"
            animate={{ 
              height: ['0%', '100%', '0%'],
              top: ['0%', '0%', '100%']
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </div>
        <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-text-muted)]">
          Scroll
        </span>
      </motion.div>
    </div>
  );
};

export default Hero;
