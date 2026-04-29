'use client';

import { motion } from 'framer-motion';
import { Crown, Droplets, Gem, Scan, Shield, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

const Services = () => {
  const t = useTranslations('services');

  const services = [
    { icon: Droplets, titleKey: 'cleaning', descKey: 'cleaningDesc' },
    { icon: Sparkles, titleKey: 'whitening', descKey: 'whiteningDesc' },
    { icon: Shield, titleKey: 'fillings', descKey: 'fillingsDesc' },
    { icon: Scan, titleKey: 'rootCanal', descKey: 'rootCanalDesc' },
    { icon: Crown, titleKey: 'crown', descKey: 'crownDesc' },
    { icon: Gem, titleKey: 'implants', descKey: 'implantsDesc' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="services" className="relative py-24 md:py-32 bg-[var(--color-background)]">
      <div
        className="absolute top-0 left-0 right-0 h-20 bg-[var(--color-muted)]"
        style={{ clipPath: 'ellipse(70% 100% at 50% 0%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm font-sans uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4">
            {t('badge')}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-text-primary)] max-w-2xl leading-tight">
            {t('headline')}
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-12 md:gap-y-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {services.map((service, index) => (
            <motion.div key={service.titleKey} variants={itemVariants} className="group">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 flex items-center justify-center border border-[var(--color-border)] group-hover:border-[var(--color-accent)] transition-colors duration-500">
                    <service.icon className="w-6 h-6 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors duration-500" />
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="font-serif text-xl md:text-2xl text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    {t(service.descKey)}
                  </p>
                </div>
              </div>
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

        <motion.div
          className="mt-20 md:mt-28 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg text-[var(--color-text-secondary)] mb-8 max-w-xl mx-auto">
            {t('cta')}
          </p>

          <a
            href="#book"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#book')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium tracking-wide bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-text-primary)] transition-all duration-300"
          >
            {t('ctaBtn')}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;