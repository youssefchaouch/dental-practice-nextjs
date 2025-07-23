'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Calendar, Shield, Star } from 'lucide-react';

const Hero = () => {
  const floatingAnimation = {
    y: [-20, 20],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: 'reverse' as const,
      ease: [0.42, 0, 0.58, 1] // cubic-bezier for 'easeInOut'
    }
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99] as any // <-- Type assertion fixes TS error
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] as any} // cubic-bezier for 'easeInOut'
    }
  };

  const handleBookingClick = () => {
    document.getElementById('book')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const handleLearnMoreClick = () => {
    document.getElementById('about')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            ...floatingAnimation,
            transition: {
              ...floatingAnimation.transition,
              delay: 1,
              ease: "easeInOut"
            }
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            ...floatingAnimation,
            transition: {
              ...floatingAnimation.transition,
              delay: 1,
              ease: "easeInOut"
            }
          }}
        />
        <motion.div
          className="absolute -bottom-8 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            ...floatingAnimation,
            transition: {
              ...floatingAnimation.transition,
              delay: 1,
              ease: "easeInOut"
            }
          }}
        />
      </div>

      {/* Navigation */}
      <motion.nav 
        className="relative z-10 px-6 py-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            className="text-2xl font-bold text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Dr. Maha Chaouch
          </motion.div>
          
          <div className="hidden md:flex space-x-8">
            {['Home', 'About', 'Services', 'Reviews', 'Book'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white hover:text-blue-300 transition-colors duration-300"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                onClick={(e) => {
                  e.preventDefault();
                  if (item === 'Home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    document.getElementById(item.toLowerCase())?.scrollIntoView({ 
                      behavior: 'smooth' 
                    });
                  }
                }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Main Hero Content */}
      <div className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Main Headline */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              variants={itemVariants}
            >
              Your Perfect
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              >
                Smile Awaits
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Experience exceptional dental care with cutting-edge technology and 
              a gentle, personalized approach to your oral health.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap justify-center gap-8 mb-12"
              variants={itemVariants}
            >
              {[
                { icon: Star, number: '500+', label: 'Happy Patients' },
                { icon: Shield, number: '15+', label: 'Years Experience' },
                { icon: Calendar, number: '24/7', label: 'Online Booking' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.number}</div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={itemVariants}
            >
              <motion.button
                onClick={handleBookingClick}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full shadow-lg"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                Book Appointment
              </motion.button>
              
              <motion.button
                onClick={handleLearnMoreClick}
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full backdrop-blur-sm"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={handleLearnMoreClick}
          className="cursor-pointer"
        >
          <ArrowDown className="w-6 h-6 text-white" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;