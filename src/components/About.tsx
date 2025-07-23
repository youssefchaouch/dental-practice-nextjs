'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, Heart, Users, Zap } from 'lucide-react';
import { useRef } from 'react';

const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' as any }
    }
  };

  const features = [
    {
      icon: Heart,
      title: 'Gentle Care',
      description: 'We prioritize your comfort with pain-free treatments and a calming environment.',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Zap,
      title: 'Advanced Technology',
      description: 'State-of-the-art equipment ensures precise, efficient, and comfortable procedures.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Users,
      title: 'Family Friendly',
      description: 'Comprehensive dental care for patients of all ages, from children to seniors.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Award,
      title: 'Excellence Award',
      description: 'Recognized for outstanding patient care and innovative dental treatments.',
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  return (
    <div ref={ref} className="relative py-20 bg-white overflow-hidden">
      {/* Background Elements */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50"
        style={{ y }}
      />
      
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-10"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6"
        style={{ opacity }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Doctor Info */}
          <motion.div variants={itemVariants}>
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              variants={itemVariants}
            >
              Meet{' '}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              >
                Dr. Maha Chaouch
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-lg text-gray-600 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              With over 15 years of experience in modern dentistry, Dr. Johnson combines 
              cutting-edge technology with a gentle, patient-centered approach. She is 
              dedicated to helping you achieve optimal oral health while ensuring your 
              comfort throughout every visit.
            </motion.p>

            <motion.div
              className="space-y-4 mb-8"
              variants={itemVariants}
            >
              {[
                'Doctor of Dental Surgery (DDS) - Harvard University',
                'Certified in Advanced Cosmetic Dentistry',
                'Member of American Dental Association',
                'Specialized in Implant Dentistry'
              ].map((credential, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    whileHover={{ scale: 1.5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  />
                  <span className="text-gray-700">{credential}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Doctor Image */}
            <motion.div
              className="relative"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto lg:mx-0 relative overflow-hidden">
                <motion.div
                  className="absolute inset-4 bg-white rounded-xl flex items-center justify-center"
                  whileHover={{ rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className="text-gray-500 text-center flex flex-col items-center">
                    Dr. Maha Chaouch
                    <img
                      src="/maha.jpg" // <-- correct
                      alt="Dr. Maha Chaouch"
                      className="w-24 h-24 rounded-full mt-2 object-cover border-2 border-blue-200"
                    />
                    <span className="text-sm mt-2">Professional Photo</span>
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Features Grid */}
          <motion.div
            className="grid sm:grid-cols-2 gap-6"
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group"
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-full">
                  <motion.div
                    className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          {[
            { number: '500+', label: 'Happy Patients', suffix: '' },
            { number: '15', label: 'Years Experience', suffix: '+' },
            { number: '98', label: 'Success Rate', suffix: '%' },
            { number: '24', label: 'Available', suffix: '/7' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.div
                className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, type: 'spring', stiffness: 200 }}
              >
                {stat.number}{stat.suffix}
              </motion.div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;