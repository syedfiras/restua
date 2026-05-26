import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PageContainer from '../layout/PageContainer'
import SectionWrapper from '../layout/SectionWrapper'
import SectionHeading from '../ui/SectionHeading'
import PremiumButton from '../ui/PremiumButton'
import { dishes } from '../../data/dishes'
import { staggerContainer, fadeUp } from '../../utils/motionVariants'

function DishPanel({ dish, featured = false }) {
  return (
    <motion.article className={`dish-panel ${featured ? 'dish-panel--featured' : ''}`} variants={fadeUp}>
      <div className="dish-panel__image">
        <img
          src={dish.image}
          srcSet={dish.srcSet}
          sizes={dish.sizes}
          alt={dish.name}
          loading={featured ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
      <div className="dish-panel__content">
        <span>{dish.price}</span>
        <h3>{dish.name}</h3>
        <p>{dish.descriptor}</p>
      </div>
    </motion.article>
  )
}

function FeaturedDishes() {
  const [feature, ...supporting] = dishes
  const navigate = useNavigate()

  return (
    <SectionWrapper id="menu">
      <PageContainer>
        <div className="journey-marker">
          <span>01</span>
          <p>Understand the menu</p>
        </div>
        <SectionHeading
          eyebrow="The tasting room"
          title="Three signatures, deliberately chosen."
          subtitle="A restrained glimpse of the kitchen: enough to create appetite, never enough to exhaust curiosity."
        />

        <motion.div
          className="dishes-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <DishPanel dish={feature} featured />
          <div className="dishes-grid__stack">
            {supporting.map((dish) => (
              <DishPanel key={dish.name} dish={dish} />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="featured-dishes__action"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <PremiumButton
            variant="outline"
            onClick={(event) => {
              event.preventDefault()
              navigate('/menu')
            }}
          >
            View Full Menu
          </PremiumButton>
        </motion.div>
      </PageContainer>
    </SectionWrapper>
  )
}

export default FeaturedDishes
