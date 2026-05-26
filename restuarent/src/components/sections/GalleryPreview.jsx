import { motion } from 'framer-motion'
import PageContainer from '../layout/PageContainer'
import SectionWrapper from '../layout/SectionWrapper'
import SectionHeading from '../ui/SectionHeading'
import { gallery } from '../../data/gallery'
import { imageReveal, staggerContainer } from '../../utils/motionVariants'

function GalleryPreview() {
  return (
    <SectionWrapper id="gallery" className="gallery-section">
      <PageContainer>
        <SectionHeading
          eyebrow="Atmosphere"
          title="A room designed for lingering."
          subtitle="Texture, flame, glass, and the measured silence between courses."
          align="center"
        />

        <motion.div
          className="gallery-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
          {gallery.map((item) => (
            <motion.figure key={item.src} className={`gallery-item gallery-item--${item.size}`} variants={imageReveal}>
              <img
                src={item.src}
                srcSet={item.srcSet}
                sizes={item.sizes}
                alt={item.alt}
                loading="lazy"
                decoding="async"
              />
              <figcaption>{item.caption}</figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </PageContainer>
    </SectionWrapper>
  )
}

export default GalleryPreview
