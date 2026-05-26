import { useRef } from 'react'
import { motion } from 'framer-motion'
import PageContainer from '../layout/PageContainer'
import SectionWrapper from '../layout/SectionWrapper'
import Reveal from '../ui/Reveal'
import ImageReveal from '../ui/ImageReveal'
import { useParallax } from '../../hooks/useParallax'
import { storyImage, storyImageSizes, storyImageSrcSet } from '../../data/gallery'

function StorySection() {
  const ref = useRef(null)
  const y = useParallax(ref, 42)

  return (
    <SectionWrapper id="story" tone="elevated" className="story-section" ref={ref}>
      <PageContainer className="story-section__grid">
        <Reveal className="story-section__copy">
          <div className="journey-marker">
            <span>02</span>
            <p>Meet the brand</p>
          </div>
          <p className="eyebrow">The story</p>
          <h2>Hospitality that moves at the pace of candlelight.</h2>
          <div className="gold-line" />
          <p>
            Atelier Nocturne was built for the hours when a dining room becomes quieter, glasses catch the
            light, and service disappears into rhythm. The menu is seasonal, intimate, and composed around
            restraint.
          </p>
        </Reveal>

        <motion.div className="story-section__image-wrap" style={{ y }}>
          <ImageReveal
            src={storyImage}
            srcSet={storyImageSrcSet}
            sizes={storyImageSizes}
            alt="Fine dining plates arranged on a dark table"
          />
        </motion.div>
      </PageContainer>
    </SectionWrapper>
  )
}

export default StorySection
