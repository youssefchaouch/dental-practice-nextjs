'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Clock, DollarSign, Shield, Smile, Sparkles, Zap } from 'lucide-react';
import { useRef } from 'react';

const Services = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const services = [
    {
      icon: Smile,
      title: 'Regular Cleaning',
      description: 'Professional dental cleaning and comprehensive oral examination to maintain your dental health.',
      price: '$120',
      duration: '60 min',
      gradient: 'from-blue-500 to-cyan-500',
      features: ['Deep cleaning', 'Plaque removal', 'Fluoride treatment', 'Oral health assessment']
    },
    {
      icon: Sparkles,
      title: 'Teeth Whitening',
      description: 'Advanced whitening treatment to brighten your smile and boost your confidence.',
      price: '$300',
      duration: '90 min',
      gradient: 'from-purple-500 to-pink-500',
      features: ['Professional whitening', 'Custom trays', 'Long-lasting results', 'Safe procedure']
    },
    {
      icon: Shield,
      title: 'Dental Filling',
      description: 'High-quality composite or amalgam fillings to restore damaged teeth.',
      price: '$180',
      duration: '45 min',
      gradient: 'from-green-500 to-teal-500',
      features: ['Tooth-colored fillings', 'Pain-free procedure', 'Durable materials', 'Natural appearance']
    },
    {
      icon: Zap,
      title: 'Root Canal',
      description: 'Advanced root canal treatment to save infected teeth and eliminate pain.',
      price: '$800',
      duration: '120 min',
      gradient: 'from-orange-500 to-red-500',
      features: ['Pain relief', 'Infection treatment', 'Tooth preservation', 'Advanced techniques']
    },
    {
      icon: Shield,
      title: 'Crown Placement',
      description: 'Custom dental crowns to restore strength and appearance of damaged teeth.',
      price: '$1,200',
      duration: '90 min',
      gradient: 'from-indigo-500 to-purple-500',
      features: ['Custom fit', 'Natural appearance', 'Long-lasting', 'Strength restoration']
    },
    {
      icon: Sparkles,
      title: 'Dental Implant',
      description: 'Permanent tooth replacement solution with titanium implants and custom crowns.',
      price: '$2,500',
      duration: '180 min',
      gradient: 'from-pink-500 to-rose-500',
      features: ['Permanent solution', 'Natural feel', 'Bone integration', 'Lifetime investment']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as any}
    }
  };

  return (
    <div ref={ref} className="relative py-20 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full filter blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full filter blur-3xl opacity-20" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our{' '}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{
                backgroundSize: '200% 200%'
              }}
            >
              Services
            </motion.span>
          </motion.h2>
          
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Comprehensive dental care tailored to your needs with the latest technology 
            and techniques for optimal results.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
                <motion.div
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {services.map((service, index) => (
                    <motion.div
                      key={index}
                      variants={cardVariants}
                      whileHover={{ 
                        y: -10,
                        transition: { type: 'spring', stiffness: 300 }
                      }}
                      className="group cursor-pointer"
                    >
                      <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 h-full relative overflow-hidden">
                        {/* Background Gradient on Hover */}
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                        />
                        
                        {/* Service Icon */}
                        <motion.div
                          className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 relative z-10`}
                          whileHover={{ 
                            rotate: 360,
                            scale: 1.1 
                          }}
                          transition={{ duration: 0.6 }}
                        >
                          <service.icon className="w-8 h-8 text-white" />
                        </motion.div>
        
                        {/* Service Details */}
                        <div className="relative z-10">
                          <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                            {service.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-6 leading-relaxed">
                            {service.description}
                          </p>
        
                          {/* Price and Duration */}
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-2">
                              <DollarSign className="w-5 h-5 text-green-500" />
                              <span className="text-2xl font-bold text-gray-900">{service.price}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-500">
                              <Clock className="w-5 h-5" />
                              <span>{service.duration}</span>
                            </div>
                          </div>
                          {/* Features List */}
                          <ul className="mb-4 space-y-2">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center text-gray-700">
                                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          );
        };
        
        export default Services;