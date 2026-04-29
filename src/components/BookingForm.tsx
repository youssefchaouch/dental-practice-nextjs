'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, CheckCircle, Clock, Mail, MessageSquare, Phone, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const timeSlots = ['09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00'];

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
}

export default function BookingForm() {
  const t = useTranslations('booking');
  const [services, setServices] = useState<Service[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  const phoneNumber = '+216 23 770 581';
  const email = 'drmahachaouch@gmail.com';

  const bookingSchema = z.object({
    firstName: z.string().min(2, t('firstNameError')),
    lastName: z.string().min(2, t('lastNameError')),
    email: z.string().email(t('emailError')),
    phone: z.string().min(10, t('phoneError')),
    service: z.string().min(1, t('serviceError')),
    preferredDate: z.string().min(1, t('dateError')),
    preferredTime: z.string().min(1, t('timeError')),
    notes: z.string().optional(),
  });

  type BookingFormData = z.infer<typeof bookingSchema>;

  const { register, handleSubmit, formState: { errors }, reset } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  useEffect(() => {
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
        setSubmittedData(data);
        setIsSubmitted(true);
        reset();
      } else throw new Error('Failed');
    } catch {
      alert(t('errorMsg'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted && submittedData) {
    return (
      <section id="book" className="py-24 md:py-32 bg-[var(--color-muted)]">
        <div className="max-w-2xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[var(--color-card)] p-10 md:p-14 text-center border border-[var(--color-border)]"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-8 rounded-full bg-green-100 flex items-center justify-center"
            >
              <CheckCircle className="w-10 h-10 text-green-600" />
            </motion.div>
            <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-text-primary)] mb-4">
              {t('successTitle')}
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-8">{t('successMsg')}</p>
            <div className="bg-[var(--color-muted)] p-6 mb-8 text-left space-y-3">
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">{t('serviceLabel')}</span>
                <span className="text-[var(--color-text-primary)] font-medium">{submittedData.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">{t('dateLabel')}</span>
                <span className="text-[var(--color-text-primary)] font-medium">{submittedData.preferredDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">{t('timeLabel')}</span>
                <span className="text-[var(--color-text-primary)] font-medium">{submittedData.preferredTime}</span>
              </div>
              <div className="pt-3 border-t border-[var(--color-border)]">
                <span className="text-sm text-[var(--color-text-muted)]">{t('pendingMsg')}</span>
              </div>
            </div>
            <button
              onClick={() => { setIsSubmitted(false); setSubmittedData(null); }}
              className="mt-8 px-8 py-4 text-sm font-medium border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-primary)] transition-colors"
            >
              {t('bookAnotherBtn')}
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="book" className="py-24 md:py-32 bg-[var(--color-muted)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-sm font-sans uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4">{t('badge')}</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-text-primary)] mb-6 leading-tight">{t('headline')}</h2>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-10">{t('subtext')}</p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center border border-[var(--color-border)]">
                  <Clock className="w-5 h-5 text-[var(--color-accent)]" />
                </div>
                <div>
                  <p className="font-medium text-[var(--color-text-primary)]">{t('hoursLabel')}</p>
                  <p className="text-sm text-[var(--color-text-muted)]">{t('hoursValue')}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center border border-[var(--color-border)]">
                  <Phone className="w-5 h-5 text-[var(--color-accent)]" />
                </div>
                <div>
                  <p className="font-medium text-[var(--color-text-primary)]">{t('phoneLabel')}</p>
                  <a href={`tel:${phoneNumber}`} className="text-sm text-[var(--color-accent)]">{phoneNumber}</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center border border-[var(--color-border)]">
                  <Mail className="w-5 h-5 text-[var(--color-accent)]" />
                </div>
                <div>
                  <p className="font-medium text-[var(--color-text-primary)]">{t('emailLabel')}</p>
                  <a href={`mailto:${email}`} className="text-sm text-[var(--color-accent)]">{email}</a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-[var(--color-card)] p-8 md:p-10 border border-[var(--color-border)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-primary)] mb-2">
                    <User className="w-4 h-4 text-[var(--color-text-muted)]" />{t('firstNameLabel')}
                  </label>
                  <input {...register('firstName')} className="w-full px-4 py-3 border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none transition-colors" placeholder={t('firstNamePlaceholder')} />
                  {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-primary)] mb-2">
                    <User className="w-4 h-4 text-[var(--color-text-muted)]" />{t('lastNameLabel')}
                  </label>
                  <input {...register('lastName')} className="w-full px-4 py-3 border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none transition-colors" placeholder={t('lastNamePlaceholder')} />
                  {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>}
                </div>
              </div>

              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-primary)] mb-2">
                  <Mail className="w-4 h-4 text-[var(--color-text-muted)]" />{t('emailLabel')}
                </label>
                <input type="email" {...register('email')} className="w-full px-4 py-3 border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none transition-colors" placeholder={t('emailPlaceholder')} />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-primary)] mb-2">
                  <Phone className="w-4 h-4 text-[var(--color-text-muted)]" />{t('phoneLabel')}
                </label>
                <input type="tel" {...register('phone')} className="w-full px-4 py-3 border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none transition-colors" placeholder="+216 XX XXX XXX" />
                {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>}
              </div>

              <div className="mb-6">
                <label className="text-sm font-medium text-[var(--color-text-primary)] mb-2 block">{t('serviceLabel')}</label>
                <select {...register('service')} className="w-full px-4 py-3 border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none transition-colors appearance-none cursor-pointer">
                  <option value="">{t('serviceDefault')}</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>
                {errors.service && <p className="text-sm text-red-500 mt-1">{errors.service.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-primary)] mb-2">
                    <Calendar className="w-4 h-4 text-[var(--color-text-muted)]" />{t('dateLabel')}
                  </label>
                  <input type="date" {...register('preferredDate')} min={new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none transition-colors" />
                  {errors.preferredDate && <p className="text-sm text-red-500 mt-1">{errors.preferredDate.message}</p>}
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-primary)] mb-2">
                    <Clock className="w-4 h-4 text-[var(--color-text-muted)]" />{t('timeLabel')}
                  </label>
                  <select {...register('preferredTime')} className="w-full px-4 py-3 border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none transition-colors appearance-none cursor-pointer">
                    <option value="">{t('timeDefault')}</option>
                    {timeSlots.map((time) => <option key={time} value={time}>{time}</option>)}
                  </select>
                  {errors.preferredTime && <p className="text-sm text-red-500 mt-1">{errors.preferredTime.message}</p>}
                </div>
              </div>

              <div className="mb-8">
                <label className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-primary)] mb-2">
                  <MessageSquare className="w-4 h-4 text-[var(--color-text-muted)]" />{t('notesLabel')}
                </label>
                <textarea {...register('notes')} rows={4} className="w-full px-4 py-3 border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none transition-colors resize-none" placeholder={t('notesPlaceholder')} />
              </div>

              <button type="submit" disabled={isSubmitting} className="group w-full flex items-center justify-center gap-3 px-8 py-4 text-base font-medium tracking-wide bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-text-primary)] transition-all duration-300 disabled:opacity-50">
                {isSubmitting ? (
                  <><span className="w-5 h-5 border-2 border-[var(--color-primary-foreground)] border-t-transparent rounded-full animate-spin" />{t('submitting')}</>
                ) : (
                  <>{t('submitBtn')}<ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" /></>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}