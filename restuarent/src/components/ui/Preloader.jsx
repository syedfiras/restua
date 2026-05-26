import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { luxuryEase } from '../../utils/motionVariants'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

function Preloader() {
  const [isVisible, setIsVisible] = useState(true)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsVisible(false), prefersReducedMotion ? 320 : 1450)
    return () => window.clearTimeout(timeout)
  }, [prefersReducedMotion])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.12 : 0.72, ease: luxuryEase }}
          aria-hidden="true"
        >
          <motion.div
            className="preloader__mark"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: luxuryEase }}
          >
            <span>Atelier</span>
            <small>Nocturne</small>
          </motion.div>
          <span className="preloader__line">
            <motion.span
              initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.05, delay: 0.18, ease: luxuryEase }}
            />
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Preloader
