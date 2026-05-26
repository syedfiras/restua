import { motion } from 'framer-motion'
import PageContainer from '../layout/PageContainer'
import SectionWrapper from '../layout/SectionWrapper'
import SectionHeading from '../ui/SectionHeading'
import PremiumButton from '../ui/PremiumButton'
import { fadeUp, staggerContainer } from '../../utils/motionVariants'

const experiences = [
  {
    title: 'Chef Specials',
    eyebrow: 'Seasonal tasting',
    copy: 'A concise progression of signature plates, built around texture, restraint, and peak-season produce.',
    cta: 'View Menu',
    href: '#menu',
  },
  {
    title: 'Candlelit Ambience',
    eyebrow: 'The room',
    copy: 'Warm ivory interiors, quiet service, and low-lit tables designed for evenings that slow down.',
    cta: 'View Ambience',
    href: '#gallery',
  },
  {
    title: 'Cellar & Drinks',
    eyebrow: 'Pairings',
    copy: 'Rare bottles, aperitifs, and non-alcoholic pairings selected to move with the menu.',
    cta: 'Explore Experience',
    href: '#story',
  },
  {
    title: 'Private Dining',
    eyebrow: 'Celebrations',
    copy: 'A more intimate service rhythm for anniversaries, hosted dinners, and small private gatherings.',
    cta: 'Book Private Dining',
    href: '#reservation',
  },
]

function SignatureExperience() {
  return (
    <SectionWrapper id="experience" tone="elevated" className="experience-section">
      <PageContainer>
        <div className="journey-marker">
          <span>03</span>
          <p>Build desire</p>
        </div>
        <SectionHeading
          eyebrow="Signature experience"
          title="Choose the shape of your evening."
          subtitle="From first glass to final course, every path is designed to make the reservation feel intentional before guests ever arrive."
        />

        <motion.div
          className="experience-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
        >
          {experiences.map((item) => (
            <motion.article className="experience-card" key={item.title} variants={fadeUp}>
              <span>{item.eyebrow}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <PremiumButton href={item.href} variant="outline">
                {item.cta}
              </PremiumButton>
            </motion.article>
          ))}
        </motion.div>
      </PageContainer>
    </SectionWrapper>
  )
}

export default SignatureExperience
