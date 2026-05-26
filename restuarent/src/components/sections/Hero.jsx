import { motion } from 'framer-motion'
import { useRef } from 'react'
import PremiumButton from '../ui/PremiumButton'
import PageContainer from '../layout/PageContainer'
import {
  heroBackground,
  heroCta,
  heroEyebrow,
  heroHeadline,
  heroSubheadline,
  reducedMotionVariant,
} from '../../utils/motionVariants'
import { useParallax } from '../../hooks/useParallax'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { heroImage, heroImageAlt, heroImageSizes, heroImageSrcSet } from '../../data/gallery'

function Hero() {
  const ref = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const imageY = useParallax(ref, 28, {
    offset: ['start start', 'end start'],
    output: [0, 46],
  })
  const backgroundVariants = prefersReducedMotion ? reducedMotionVariant : heroBackground

  return (
    <section className="hero-section" id="home" ref={ref}>
      <motion.div
        className="hero-section__media"
        style={{ y: imageY }}
        variants={backgroundVariants}
        initial="hidden"
        animate="visible"
      >
        <img
          src={heroImage}
          srcSet={heroImageSrcSet}
          sizes={heroImageSizes}
          alt={heroImageAlt}
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>
      <div className="hero-section__shade" />

      <PageContainer className="hero-section__content">
        <motion.div initial="hidden" animate="visible" className="hero-section__copy">
          <motion.p variants={prefersReducedMotion ? reducedMotionVariant : heroEyebrow} className="eyebrow">
            Midnight Atelier
          </motion.p>
          <span className="hero-section__headline-mask">
            <motion.h1 variants={prefersReducedMotion ? reducedMotionVariant : heroHeadline}>
              An Evening Worth Remembering
            </motion.h1>
          </span>
          <motion.p variants={prefersReducedMotion ? reducedMotionVariant : heroSubheadline} className="hero-section__subtitle">
            A quiet fine-dining room for candlelit courses, rare bottles, and intimate celebrations.
          </motion.p>
          <motion.div variants={prefersReducedMotion ? reducedMotionVariant : heroCta}>
            <PremiumButton href="#reservation">Reserve a Table</PremiumButton>
          </motion.div>
        </motion.div>
      </PageContainer>

      <motion.a
        className="hero-section__scroll-cue"
        href="#menu"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.35, duration: 0.82 }}
      >
      </motion.a>
    </section>
  )
}

export default Hero
