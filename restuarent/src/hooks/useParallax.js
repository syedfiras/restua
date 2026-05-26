import { useScroll, useTransform } from 'framer-motion'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export function useParallax(ref, distance = 40, options = {}) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const {
    offset = ['start end', 'end start'],
    output = [-distance, distance],
  } = options
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  })

  const y = useTransform(scrollYProgress, [0, 1], output)

  return prefersReducedMotion ? 0 : y
}
