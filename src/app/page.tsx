'use client';

import About from '@/components/About';
import BookingForm from '@/components/BookingForm';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Reviews from '@/components/Reviews';
import Services from '@/components/Services';

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <Hero />
      <About />
      <Services />
      <Reviews />
      <BookingForm />
      <Footer />
    </main>
  );
}
