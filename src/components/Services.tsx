'use client';

import { motion } from 'framer-motion';
import { Crown, Droplets, Gem, Scan, Shield, Sparkles } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Droplets,
      title: 'Professional Cleaning',
      description: 'Comprehensive oral examination with thorough cleaning to maintain optimal dental health.',
    },
    {
      icon: Sparkles,
      title: 'Teeth Whitening',
      description: 'Advanced whitening treatments to restore brilliance and enhance your natural smile.',
    },
    {
      icon: Shield,
      title: 'Restorative Fillings',
      description: 'Tooth-colored composite restorations that blend seamlessly with your natural teeth.',
    },
    {
      icon: Scan,
      title: 'Root Canal Therapy',
      description: 'Gentle endodontic treatment to preserve your natural tooth and eliminate discomfort.',
    },
    {
      icon: Crown,
      title: 'Crown & Bridge',
      description: 'Custom-crafted restorations designed to rebuild strength and restore aesthetics.',
    },
    {
      icon: Gem,
      title: 'Dental Implants',
      description: 'Permanent tooth replacement solutions for a confident, complete smile.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section id="services" className="relative py-24 md:py-32 bg-[var(--color-background)]">
      {/* Subtle curved divider at top */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-[var(--color-muted)]" style={{ 
        clipPath: 'ellipse(70% 100% at 50% 0%)' 
      }} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <motion.div
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm font-sans uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4">
            Our Services
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-text-primary)] max-w-2xl leading-tight">
            Comprehensive care for every aspect of your dental health
          </h2>
        </motion.div>

        {/* Services Grid - Editorial 2-column layout */}
        <motion.div
          className="grid md:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-12 md:gap-y-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group"
            >
              <div className="flex gap-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 flex items-center justify-center border border-[var(--color-border)] group-hover:border-[var(--color-accent)] transition-colors duration-500">
                    <service.icon className="w-6 h-6 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors duration-500" />
                  </div>
                </div>

                {/* Content */}
                <div className="pt-1">
                  <h3 className="font-serif text-xl md:text-2xl text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Decorative line */}
              <div className="mt-8 md:mt-12 h-px bg-[var(--color-border)]">
                <motion.div 
                  className="h-full bg-[var(--color-accent)] origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-20 md:mt-28 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg text-[var(--color-text-secondary)] mb-8 max-w-xl mx-auto">
            Each treatment is tailored to your unique needs, delivered with precision and care.
          </p>
          <a
            href="#book"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#book')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium tracking-wide bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-text-primary)] transition-all duration-300"
          >
            Schedule Your Visit
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
