'use client';

import { motion } from 'framer-motion';

const About = () => {
  const credentials = [
    'Doctor of Dental Surgery (DDS)',
    'Advanced Cosmetic Dentistry Certification',
    'Member, American Dental Association',
    'Specialized in Implant Dentistry',
  ];

  const stats = [
    { number: '15+', label: 'Years Experience' },
    { number: '500+', label: 'Happy Patients' },
    { number: '98%', label: 'Success Rate' },
  ];

  return (
    <section id="about" className="relative py-24 md:py-32 bg-[var(--color-muted)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-[4/5] bg-[var(--color-card)] overflow-hidden">
              {/* Placeholder for doctor photo */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--color-card)] to-[var(--color-border)]">
                <div className="text-center">
                  <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[var(--color-background)] shadow-lg">
                    <img
                      src="/maha.jpg"
                      alt="Dr. Maha Chaouch"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-[var(--color-muted)]"><span class="font-serif text-4xl text-[var(--color-accent)]">MC</span></div>';
                        }
                      }}
                    />
                  </div>
                  <p className="font-serif text-2xl text-[var(--color-text-primary)]">Dr. Maha Chaouch</p>
                  <p className="text-sm text-[var(--color-text-muted)] mt-2">Doctor of Dental Surgery</p>
                </div>
              </div>
              
              {/* Decorative accent */}
              <div className="absolute bottom-0 right-0 w-1/3 h-24 bg-[var(--color-accent)] opacity-10" />
            </div>

            {/* Floating accent box */}
            <motion.div
              className="absolute -bottom-8 -right-8 w-32 h-32 border border-[var(--color-accent)] bg-[var(--color-background)] hidden lg:flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-center">
                <span className="block font-serif text-3xl text-[var(--color-accent)]">15+</span>
                <span className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">Years</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-sm font-sans uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4">
              About Dr. Chaouch
            </p>
            
            <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-text-primary)] mb-8 leading-tight">
              Dedicated to your comfort and dental excellence
            </h2>

            <div className="space-y-6 text-[var(--color-text-secondary)] leading-relaxed">
              <p>
                With over 15 years of experience in modern dentistry, Dr. Maha Chaouch combines 
                cutting-edge technology with a gentle, patient-centered approach. Her practice 
                is built on the belief that exceptional dental care should feel luxurious, not clinical.
              </p>
              <p>
                Every treatment is delivered with precision, compassion, and an unwavering 
                commitment to your comfort. From routine care to complex procedures, 
                you&apos;ll experience dentistry reimagined.
              </p>
            </div>

            {/* Credentials */}
            <div className="mt-10 space-y-3">
              {credentials.map((credential, index) => (
                <motion.div
                  key={credential}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                  <span className="text-[var(--color-text-primary)]">{credential}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats - Mobile only */}
            <div className="mt-12 grid grid-cols-3 gap-8 lg:hidden">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <span className="block font-serif text-3xl text-[var(--color-accent)]">{stat.number}</span>
                  <span className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats - Desktop */}
        <motion.div
          className="hidden lg:grid grid-cols-3 gap-16 mt-24 pt-16 border-t border-[var(--color-border)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="block font-serif text-5xl text-[var(--color-text-primary)] mb-2">{stat.number}</span>
              <span className="text-sm uppercase tracking-[0.15em] text-[var(--color-text-muted)]">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
