import { motion } from 'framer-motion'
import { imageReveal, reducedMotionVariant, viewportReveal } from '../../utils/motionVariants'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { cn } from '../../utils/cn'

function ImageReveal({ src, srcSet, alt, className = '', imageClassName = '', sizes, priority = false }) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <motion.figure
      className={cn('image-reveal', className)}
      variants={prefersReducedMotion ? reducedMotionVariant : imageReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportReveal}
    >
      <img
        className={imageClassName}
        src={src}
        srcSet={srcSet}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        sizes={sizes}
      />
    </motion.figure>
  )
}

export default ImageReveal
