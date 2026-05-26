import { motion } from 'framer-motion'
import { buttonHover } from '../../utils/motionVariants'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { cn } from '../../utils/cn'

function HoverGlowCard({ children, className = '' }) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <motion.div className={cn('hover-glow-card', className)} whileHover={prefersReducedMotion ? undefined : buttonHover}>
      {children}
    </motion.div>
  )
}

export default HoverGlowCard
