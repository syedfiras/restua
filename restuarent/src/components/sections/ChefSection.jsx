import { useRef } from 'react'
import { motion } from 'framer-motion'
import PageContainer from '../layout/PageContainer'
import SectionWrapper from '../layout/SectionWrapper'
import Reveal from '../ui/Reveal'
import { useParallax } from '../../hooks/useParallax'
import { pexelsPhoto, pexelsSrcSet, unsplashPhoto, unsplashSrcSet } from '../../data/media'
import { staggerContainer, fadeUp } from '../../utils/motionVariants'

const expertise = [
  {
    course: 'Starters',
    description:
      'Chef Matteo begins each meal with brightness and tension — citrus, herbs, and raw preparations that wake the palate and set the rhythm for the evening.',
    image: pexelsPhoto(30469694, 'pexels-photo-30469694', 400),
    srcSet: pexelsSrcSet(30469694, 'pexels-photo-30469694', [400, 640]),
  },
  {
    course: 'Mains',
    description:
      'His main courses are built around precision heat and restraint. Proteins are aged, seared, and rested with surgical timing; sauces are reduced to essence.',
    image: pexelsPhoto(28561584, 'pexels-photo-28561584', 400),
    srcSet: pexelsSrcSet(28561584, 'pexels-photo-28561584', [400, 640]),
  },
  {
    course: 'Desserts',
    description:
      'Desserts under Chef Matteo avoid excess. He favors bitter chocolate, brown butter, and seasonal fruit — finishes that linger without weight.',
    image: pexelsPhoto(17592739, 'pexels-photo-17592739', 400),
    srcSet: pexelsSrcSet(17592739, 'pexels-photo-17592739', [400, 640]),
  },
  {
    course: 'Libations',
    description:
      'Each cocktail and wine pairing is chosen to mirror the arc of the menu — bright to open, bold at the peak, quiet to close.',
    image: pexelsPhoto(262047, 'pexels-photo-262047', 400),
    srcSet: pexelsSrcSet(262047, 'pexels-photo-262047', [400, 640]),
  },
]

function ChefSection() {
  const ref = useRef(null)
  const y = useParallax(ref, 42)

  return (
    <SectionWrapper id="chef" tone="elevated" className="chef-section" ref={ref}>
      <PageContainer className="chef-section__layout">
        <motion.div className="chef-section__image" style={{ y }}>
          <img
            className="chef-section__portrait"
            src={unsplashPhoto('photo-1577219491135-ce391730fb2c', 800)}
            srcSet={unsplashSrcSet('photo-1577219491135-ce391730fb2c', [400, 640, 800])}
            alt="Chef Matteo Rinaldi in the kitchen"
            loading="lazy"
            decoding="async"
          />
        </motion.div>

        <div className="chef-section__content">
          <Reveal>
            <div className="journey-marker">
              <span>03</span>
              <p>Behind the pass</p>
            </div>
            <p className="eyebrow">Our Chef</p>
            <h2>Chef Matteo&apos;s vision, plate by plate.</h2>
            <div className="gold-line" />
          </Reveal>

          <motion.div
            className="chef-expertise"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {expertise.map((item) => (
              <motion.div key={item.course} className="chef-expertise__item" variants={fadeUp}>
                <div className="chef-expertise__image">
                  <img
                    src={item.image}
                    srcSet={item.srcSet}
                    alt={item.course}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="chef-expertise__text">
                  <strong>{item.course}</strong>
                  <p>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </PageContainer>
    </SectionWrapper>
  )
}

export default ChefSection
