import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiCheck, FiClock } from 'react-icons/fi'
import { luxuryEase } from '../../utils/motionVariants'
import PremiumButton from './PremiumButton'
import { usePrivateDining } from '../../context/PrivateDiningContext'

function PrivateDiningModal() {
  const { isOpen, closePrivateDining } = usePrivateDining()
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closePrivateDining()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, closePrivateDining])

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 2000)
  }

  const handleClose = () => {
    if (status === 'sending') return
    setStatus('idle')
    closePrivateDining()
  }

  const buttonLabel = () => {
    if (status === 'sending') return 'Sending...'
    if (status === 'sent') return 'Request Sent'
    return 'Send Inquiry'
  }

  const buttonIcon = () => {
    if (status === 'sending') return <FiClock />
    if (status === 'sent') return <FiCheck />
    return null
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="review-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="private-dining-modal-title"
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
            <button
              className="review-modal__close"
              type="button"
              onClick={handleClose}
              disabled={status === 'sending'}
              aria-label="Close private dining form"
            >
              <FiX />
            </button>
            <div className="review-modal__intro">
              <p className="eyebrow">Private Dining</p>
              <h3 id="private-dining-modal-title">Plan your intimate event</h3>
              <p>
                Tell us about your occasion and our events team will reach out
                within 24 hours to curate the perfect experience.
              </p>
            </div>

            <form className="private-dining-form" onSubmit={handleSubmit}>
              <fieldset disabled={status !== 'idle'} style={{ border: 'none', padding: 0, margin: 0 }}>
                <label>
                  <span>Name</span>
                  <input name="name" type="text" autoComplete="name" required />
                </label>
                <label>
                  <span>Email</span>
                  <input name="email" type="email" autoComplete="email" required />
                </label>
                <label>
                  <span>Phone</span>
                  <input name="phone" type="tel" autoComplete="tel" />
                </label>
                <label>
                  <span>Estimated Guests</span>
                  <select name="guests" defaultValue="10" required>
                    <option value="2-6">2 - 6</option>
                    <option value="6-10">6 - 10</option>
                    <option value="10-16">10 - 16</option>
                    <option value="16-20">16 - 20</option>
                  </select>
                </label>
                <label className="private-dining-form__full">
                  <span>Preferred Date</span>
                  <input name="date" type="date" required />
                </label>
                <label className="private-dining-form__full">
                  <span>Occasion & Requests</span>
                  <textarea name="notes" rows="4" placeholder="Birthday, anniversary, corporate event, dietary restrictions…" />
                </label>
              </fieldset>
              <PremiumButton as="button" type="submit" disabled={status !== 'idle'}>
                {buttonIcon()}{buttonLabel()}
              </PremiumButton>
              <AnimatePresence>
                {status === 'sent' && (
                  <motion.p
                    className="private-dining-form__status private-dining-form__status--visible"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    aria-live="polite"
                  >
                    <FiCheck /> Request sent — our team will be in touch shortly.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PrivateDiningModal
