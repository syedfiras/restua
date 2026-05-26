import { motion } from 'framer-motion'
import { luxuryEase, reducedMotionVariant, viewportReveal } from '../../utils/motionVariants'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { cn } from '../../utils/cn'

const directionMap = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
  none: { x: 0, y: 0 },
}

function Reveal({
  children,
  className = '',
  delay = 0,
  duration = 0.9,
  direction = 'up',
  distance = 42,
  as = 'div',
  variants,
  viewport = viewportReveal,
}) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const Component = motion[as] || motion.div
  const axis = directionMap[direction] || directionMap.up
  const revealVariants =
    (prefersReducedMotion && !variants ? reducedMotionVariant : variants) ||
    {
      hidden: {
        opacity: 0,
        x: axis.x * distance,
        y: axis.y * distance,
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          delay,
          duration,
          ease: luxuryEase,
        },
      },
    }

  return (
    <Component
      className={cn(className)}
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {children}
    </Component>
  )
}

export default Reveal
