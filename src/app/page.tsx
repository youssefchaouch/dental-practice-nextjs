'use client';

import About from '@/components/About';
import BookingForm from '@/components/BookingForm';
import Hero from '@/components/Hero';
import Reviews from '@/components/Reviews';
import Services from '@/components/Services';
import { WebSocketProvider } from '@/components/WebSocketProvider';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <WebSocketProvider>
      <motion.div
        className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <Hero />
        
        <motion.section id="about" variants={fadeInUp}>
          <About />
        </motion.section>
        
        <motion.section id="services" variants={fadeInUp}>
          <Services />
        </motion.section>
        
        <motion.section id="reviews" variants={fadeInUp}>
          <Reviews />
        </motion.section>
        
        <motion.section id="book" variants={fadeInUp}>
          <BookingForm />
        </motion.section>
      </motion.div>
      </WebSocketProvider>
  );
}