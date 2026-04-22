'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

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

  const clinicImages = [
    { src: '/taswira1.jpg', alt: 'Dental clinic reception' },
    { src: '/taswira2.jpg', alt: 'Treatment room' },
    { src: '/taswira3.jpg', alt: 'Clinic interior' },
    { src: '/taswira4.jpg', alt: 'Modern equipment' },
  ];

  return (
    <>
      {/* About Section */}
      <section id="about" className="relative py-24 md:py-32 bg-[var(--color-muted)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Left — Doctor Portrait */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              {/* Tall editorial portrait */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-border)]">
                <img
                  src="/maha.jpg"
                  alt="Dr. Maha Chaouch"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    t.style.display = 'none';
                    const p = t.parentElement;
                    if (p) {
                      p.innerHTML = `
                        <div class="w-full h-full flex flex-col items-center justify-center bg-[var(--color-card)] gap-4">
                          <div class="w-24 h-24 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
                            <span class="font-serif text-3xl text-white">MC</span>
                          </div>
                          <p class="font-serif text-xl text-[var(--color-text-primary)]">Dr. Maha Chaouch</p>
                        </div>
                      `;
                    }
                  }}
                />
                {/* Subtle bottom gradient with name */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div>
                    <p className="font-serif text-xl text-white">Dr. Maha Chaouch</p>
                    <p className="text-xs tracking-[0.15em] uppercase text-white/70 mt-1">
                      Doctor of Dental Surgery
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating accent box */}
              <motion.div
                className="absolute -bottom-6 -right-6 w-28 h-28 border border-[var(--color-accent)] bg-[var(--color-background)] hidden lg:flex items-center justify-center z-10"
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

            {/* Right — Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:pt-8"
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
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
                    <span className="text-[var(--color-text-primary)]">{credential}</span>
                  </motion.div>
                ))}
              </div>

              {/* Stats mobile */}
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

          {/* Stats desktop */}
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

      {/* Clinic Gallery Section */}
      <section id="clinic" className="py-24 md:py-32 bg-[var(--color-background)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm font-sans uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4">
              Our Space
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-text-primary)] leading-tight max-w-xl">
              A clinic designed for your comfort
            </h2>
          </motion.div>

          {/* Asymmetric image grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {/* Large image — spans 2 rows */}
            <motion.div
              className="col-span-2 row-span-2 relative aspect-square lg:aspect-auto lg:h-[480px] overflow-hidden bg-[var(--color-border)]"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
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

            {/* Smaller images */}
            {[
              { src: '/taswira2.jpg', alt: 'Treatment room' },
              { src: '/taswira3.jpg', alt: 'Waiting area' },
              { src: '/taswira4.jpg', alt: 'Modern equipment' },
              { src: '/taswira5.jpg', alt: 'Consultation room' },
            ].map((img, index) => (
              <motion.div
                key={img.src}
                className="relative aspect-square overflow-hidden bg-[var(--color-border)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    t.style.display = 'none';
                    t.parentElement!.style.background = 'var(--color-muted)';
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;