'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, CheckCircle, Clock, FileText, Mail, MapPin, Phone, Send, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const bookingSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  dateOfBirth: z.string().optional(),
  address: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  preferredDate: z.string().min(1, 'Please select a preferred date'),
  preferredTime: z.string().min(1, 'Please select a preferred time'),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
}

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
];

export default function BookingForm() {
  const [services, setServices] = useState<Service[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const selectedService = watch('service');
  const selectedDate = watch('preferredDate');
  const selectedTime = watch('preferredTime');

  useEffect(() => {
    // Fetch services
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error('Error fetching services:', err));
  }, []);

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        reset();
        setTimeout(() => {
          setIsSubmitted(false);
          setCurrentStep(1);
        }, 5000);
      } else {
        throw new Error('Failed to book appointment');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('There was an error booking your appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-2xl text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold text-gray-800 mb-4"
        >
          Appointment Request Received!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg text-gray-600 mb-6"
        >
          Thank you for choosing Dr. Maha Chaouch Dental. We've received your appointment request and will contact you within 24 hours to confirm your appointment.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-sm text-gray-500"
        >
          Please check your email for confirmation details.
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.section
      id="booking"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50"
    >
      <div className="container mx-auto px-4">
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Book Your Appointment
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Schedule your visit with Dr. Maha Chaouch and take the first step towards optimal dental health.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Progress Bar */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3].map((step) => (
                <motion.div
                  key={step}
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    step <= currentStep
                      ? 'bg-white text-blue-600'
                      : 'bg-blue-400 text-white'
                  }`}
                  initial={{ scale: 0.8 }}
                  animate={{ 
                    scale: step === currentStep ? 1.1 : 1,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  {step}
                </motion.div>
              ))}
            </div>
            <div className="bg-white bg-opacity-20 rounded-full h-2">
              <motion.div
                className="bg-white rounded-full h-2"
                initial={{ width: "33%" }}
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="text-center mt-4">
              <p className="text-white text-lg font-semibold">
                {currentStep === 1 && "Personal Information"}
                {currentStep === 2 && "Service & Date Selection"}
                {currentStep === 3 && "Review & Confirm"}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8">
            <AnimatePresence mode="wait">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={itemVariants}>
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                        <User className="w-4 h-4 mr-2" />
                        First Name
                      </label>
                      <input
                        {...register('firstName')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-red-500 text-sm mt-1"
                        >
                          {errors.firstName.message}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                        <User className="w-4 h-4 mr-2" />
                        Last Name
                      </label>
                      <input
                        {...register('lastName')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-red-500 text-sm mt-1"
                        >
                          {errors.lastName.message}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                        <Mail className="w-4 h-4 mr-2" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        {...register('email')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-red-500 text-sm mt-1"
                        >
                          {errors.email.message}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                        <Phone className="w-4 h-4 mr-2" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        {...register('phone')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-red-500 text-sm mt-1"
                        >
                          {errors.phone.message}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        Date of Birth (Optional)
                      </label>
                      <input
                        type="date"
                        {...register('dateOfBirth')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 mr-2" />
                        Address (Optional)
                      </label>
                      <input
                        {...register('address')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your address"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Service & Date Selection */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-6">
                    <motion.div variants={itemVariants}>
                      <label className="text-sm font-semibold text-gray-700 mb-4 block">
                        Select Service
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {services.map((service) => (
                          <motion.label
                            key={service.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`cursor-pointer p-4 border-2 rounded-xl transition-all duration-200 ${
                              selectedService === service.name
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-300'
                            }`}
                          >
                            <input
                              type="radio"
                              {...register('service')}
                              value={service.name}
                              className="sr-only"
                            />
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-800">{service.name}</h4>
                              <span className="text-blue-600 font-bold">${service.price}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                            <p className="text-xs text-gray-500">{service.duration} minutes</p>
                          </motion.label>
                        ))}
                      </div>
                      {errors.service && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-red-500 text-sm mt-2"
                        >
                          {errors.service.message}
                        </motion.p>
                      )}
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div variants={itemVariants}>
                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                          <Calendar className="w-4 h-4 mr-2" />
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          {...register('preferredDate')}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                        {errors.preferredDate && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-500 text-sm mt-1"
                          >
                            {errors.preferredDate.message}
                          </motion.p>
                        )}
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                          <Clock className="w-4 h-4 mr-2" />
                          Preferred Time
                        </label>
                        <select
                          {...register('preferredTime')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="">Select a time</option>
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                        {errors.preferredTime && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-500 text-sm mt-1"
                          >
                            {errors.preferredTime.message}
                          </motion.p>
                        )}
                      </motion.div>
                    </div>

                    <motion.div variants={itemVariants}>
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                        <FileText className="w-4 h-4 mr-2" />
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        {...register('notes')}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Any special concerns or requirements?"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Review & Confirm */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
                      Review Your Appointment
                    </h3>
                    
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2">Personal Information</h4>
                          <p className="text-gray-600">{watch('firstName')} {watch('lastName')}</p>
                          <p className="text-gray-600">{watch('email')}</p>
                          <p className="text-gray-600">{watch('phone')}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2">Appointment Details</h4>
                          <p className="text-gray-600">Service: {selectedService}</p>
                          <p className="text-gray-600">Date: {selectedDate}</p>
                          <p className="text-gray-600">Time: {selectedTime}</p>
                        </div>
                      </div>
                      {watch('notes') && (
                        <div className="mt-4">
                          <h4 className="font-semibold text-gray-700 mb-2">Notes</h4>
                          <p className="text-gray-600">{watch('notes')}</p>
                        </div>
                      )}
                    </div>

                    <div className="text-center">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Book Appointment
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {currentStep < 3 && (
              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 transition-all duration-200"
                  >
                    Previous
                  </motion.button>
                )}
                <motion.button
                  type="button"
                  onClick={nextStep}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-all duration-200 ml-auto"
                >
                  Next
                </motion.button>
              </div>
            )}

            {currentStep === 3 && (
              <div className="flex justify-start mt-8">
                <motion.button
                  type="button"
                  onClick={prevStep}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 transition-all duration-200"
                >
                  Previous
                </motion.button>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
}