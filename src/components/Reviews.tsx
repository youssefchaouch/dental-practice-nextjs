'use client';

import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Quote, Star, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface Review {
  id: string;
  patientName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    patientName: '',
    rating: 5,
    comment: ''
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews');
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      if (response.ok) {
        setNewReview({ patientName: '', rating: 5, comment: '' });
        setShowReviewForm(false);
        alert('Thank you for your review! It will be published after approval.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onRate && onRate(star)}
            className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
            disabled={!interactive}
          >
            <Star
              className={`w-4 h-4 ${
                star <= rating
                  ? 'fill-[var(--color-accent)] text-[var(--color-accent)]'
                  : 'text-[var(--color-border)]'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const }
    }
  };

  if (loading) {
    return (
      <section className="py-24 md:py-32 bg-[var(--color-background)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="reviews" className="py-24 md:py-32 bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm font-sans uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4">
            Testimonials
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-text-primary)] max-w-xl leading-tight">
              What our patients say about their experience
            </h2>
            <button
              onClick={() => setShowReviewForm(true)}
              className="self-start md:self-auto px-6 py-3 text-sm font-medium tracking-wide border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-primary)] transition-colors duration-300"
            >
              Share Your Experience
            </button>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              variants={itemVariants}
              className="group relative bg-[var(--color-card)] p-8 border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors duration-500"
            >
              {/* Quote icon */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-[var(--color-muted)] group-hover:text-[var(--color-accent)] opacity-50 transition-colors duration-500" />
              
              {/* Rating */}
              <div className="mb-6">
                {renderStars(review.rating)}
              </div>

              {/* Comment */}
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-8 line-clamp-4">
                &ldquo;{review.comment}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-muted)] flex items-center justify-center">
                  <span className="font-serif text-sm text-[var(--color-accent)]">
                    {review.patientName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-[var(--color-text-primary)]">{review.patientName}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {format(new Date(review.createdAt), 'MMMM yyyy')}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {reviews.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[var(--color-text-muted)]">No reviews yet. Be the first to share your experience!</p>
          </div>
        )}

        {/* Review Form Modal */}
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[var(--color-text-primary)]/60 flex items-center justify-center z-50 p-4"
            onClick={() => setShowReviewForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[var(--color-card)] p-8 md:p-10 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowReviewForm(false)}
                className="absolute top-6 right-6 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-serif text-2xl text-[var(--color-text-primary)] mb-8">
                Share Your Experience
              </h3>
              
              <form onSubmit={handleSubmitReview} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newReview.patientName}
                    onChange={(e) => setNewReview({ ...newReview, patientName: e.target.value })}
                    className="w-full px-4 py-3 border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-3">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {renderStars(newReview.rating, true, (rating) => 
                      setNewReview({ ...newReview, rating })
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                    Your Review
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full px-4 py-3 border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your experience..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="flex-1 px-6 py-3 border border-[var(--color-border)] text-[var(--color-text-primary)] font-medium hover:border-[var(--color-text-primary)] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitLoading}
                    className="flex-1 px-6 py-3 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-medium hover:bg-[var(--color-text-primary)] transition-colors disabled:opacity-50"
                  >
                    {submitLoading ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
