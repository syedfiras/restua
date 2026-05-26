import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import PageContainer from '../layout/PageContainer'
import SectionWrapper from '../layout/SectionWrapper'
import SectionHeading from '../ui/SectionHeading'
import GlassCard from '../ui/GlassCard'
import PremiumButton from '../ui/PremiumButton'
import { testimonials } from '../../data/testimonials'
import { fadeUp, luxuryEase, staggerContainer } from '../../utils/motionVariants'

function Testimonials() {
  const [isReviewOpen, setIsReviewOpen] = useState(false)
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    document.body.style.overflow = isReviewOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isReviewOpen])

  useEffect(() => {
    if (!isReviewOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsReviewOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isReviewOpen])

  const handleReviewSubmit = (event) => {
    event.preventDefault()
    setStatus('success')
  }

  const closeReview = () => {
    setIsReviewOpen(false)
    window.setTimeout(() => setStatus('idle'), 250)
  }

  return (
    <SectionWrapper id="reviews" className="reviews-section">
      <PageContainer>
        <div className="journey-marker">
          <span>05</span>
          <p>Build trust</p>
        </div>
        <div className="reviews-section__intro">
          <SectionHeading
            eyebrow="Guest reviews"
            title="What guests remember after the final course."
            subtitle="Quiet praise from anniversary tables, chef counter evenings, and private celebrations."
          />
          <GlassCard className="reviews-summary">
            <span>Average rating</span>
            <strong>4.9</strong>
            <p>From recent tasting room guests</p>
          </GlassCard>
        </div>

        <motion.div
          className="review-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.name} variants={fadeUp}>
              <GlassCard className="review-card">
                <div className="review-card__meta">
                  <span>{testimonial.rating}</span>
                  <i aria-label={`${testimonial.rating} out of 5 stars`}>{'\u2605\u2605\u2605\u2605\u2605'}</i>
                </div>
                <p className="review-card__quote">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="review-card__author">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.occasion}</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        <GlassCard className="review-prompt">
          <div>
            <span>Visited recently?</span>
            <p>Share a private note with our host team so the next evening is even more considered.</p>
          </div>
          <PremiumButton as="button" type="button" variant="outline" onClick={() => setIsReviewOpen(true)}>
            Leave a Review
          </PremiumButton>
        </GlassCard>

        <AnimatePresence>
          {isReviewOpen && (
            <motion.div
              className="review-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="review-modal-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: luxuryEase }}
            >
              <motion.div
                className="review-modal__panel"
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 18, scale: 0.99 }}
                transition={{ duration: 0.48, ease: luxuryEase }}
              >
                <button className="review-modal__close" type="button" onClick={closeReview} aria-label="Close review form">
                  <FiX />
                </button>
                <div className="review-modal__intro">
                  <p className="eyebrow">Private review</p>
                  <h3 id="review-modal-title">Tell us how the evening felt.</h3>
                  <p>Your note stays with our host team and helps us refine the next visit.</p>
                </div>

                <form className="review-form" onSubmit={handleReviewSubmit}>
                  <label>
                    <span>Name</span>
                    <input name="reviewer" type="text" autoComplete="name" required />
                  </label>
                  <label>
                    <span>Rating</span>
                    <select name="rating" defaultValue="5" required>
                      <option value="5">5 - Exceptional</option>
                      <option value="4">4 - Excellent</option>
                      <option value="3">3 - Good</option>
                    </select>
                  </label>
                  <label className="review-form__note">
                    <span>Review</span>
                    <textarea name="review" rows="5" required />
                  </label>
                  <PremiumButton as="button" type="submit">
                    Submit Review
                  </PremiumButton>
                  <p className={`review-form__status ${status === 'success' ? 'review-form__status--visible' : ''}`} aria-live="polite">
                    Thank you. Your review has been received.
                  </p>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </PageContainer>
    </SectionWrapper>
  )
}

export default Testimonials
