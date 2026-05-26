import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiCheck } from 'react-icons/fi'
import PageContainer from '../components/layout/PageContainer'
import SectionWrapper from '../components/layout/SectionWrapper'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'
import PremiumButton from '../components/ui/PremiumButton'
import { menuCategories } from '../data/menuData'
import { useOrder } from '../context/OrderContext'
import { usePrivateDining } from '../context/PrivateDiningContext'
import { staggerContainer, fadeUp } from '../utils/motionVariants'

function MenuItem({ item }) {
  const { addItem } = useOrder()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem(item)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <motion.div
      className="menu-item"
      variants={fadeUp}
    >
      <div className="menu-item__image-wrap">
        <img
          src={item.image}
          srcSet={item.srcSet}
          alt={item.name}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="menu-item__body">
        <div className="menu-item__header">
          <h3>{item.name}</h3>
          <span className="menu-item__price">{item.price}</span>
        </div>
        <p className="menu-item__desc">{item.description}</p>
        <motion.button
          className="menu-item__add"
          type="button"
          onClick={handleAdd}
          whileTap={{ scale: 0.94 }}
        >
          <AnimatePresence mode="wait">
            {added ? (
              <motion.span
                key="check"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
              >
                <FiCheck /> Added
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
              >
                <FiPlus /> Add to Order
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  )
}

function MenuHero() {
  return (
    <section className="menu-hero">
      <div className="menu-hero__bg" />
      <PageContainer>
        <Reveal>
          <div className="menu-hero__content">
            <span className="eyebrow">Atelier Nocturne</span>
            <h1>Our Menu</h1>
            <p>
              A seasonally rotating tasting menu, crafted from the finest
              ingredients. Each dish tells a story of precision, passion, and
              place.
            </p>
          </div>
        </Reveal>
      </PageContainer>
    </section>
  )
}

const categoryNumber = (id) => {
  const map = { starters: '02', 'chefs-specials': '03', mains: '04', desserts: '05', beverages: '06' }
  return map[id] || '02'
}

function MenuCategory({ category }) {
  const isChefSpecials = category.id === 'chefs-specials'

  return (
    <SectionWrapper id={category.id} className={isChefSpecials ? 'section-wrapper--chef' : ''}>
      <PageContainer>
        <div className={`journey-marker ${isChefSpecials ? 'journey-marker--chef' : ''}`}>
          <span>{categoryNumber(category.id)}</span>
          <p>{category.name}</p>
        </div>
        <SectionHeading
          eyebrow={category.name}
          title={category.description}
        />
        <motion.div
          className="menu-items"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {category.items.map((item) => (
            <MenuItem key={item.name} item={item} />
          ))}
        </motion.div>
      </PageContainer>
    </SectionWrapper>
  )
}

function PrivateDining() {
  const { openPrivateDining } = usePrivateDining()

  return (
    <SectionWrapper id="private-dining" tone="elevated">
      <PageContainer>
        <div className="private-dining">
          <Reveal>
            <div className="private-dining__content">
              <span className="eyebrow">Private Events</span>
              <h2>An intimate space for your occasion</h2>
              <p>
                Our private dining room accommodates up to 20 guests for bespoke
                events, celebrations, and corporate gatherings. Work with our
                team to craft a custom menu and experience.
              </p>
              <div className="private-dining__details">
                <div>
                  <strong>Capacity</strong>
                  <span>Up to 20 guests</span>
                </div>
                <div>
                  <strong>Cuisine</strong>
                  <span>Fully customizable tasting menu</span>
                </div>
                <div>
                  <strong>Pairings</strong>
                  <span>Wine & cocktail curation available</span>
                </div>
              </div>
              <PremiumButton
                variant="outline"
                onClick={(event) => {
                  event.preventDefault()
                  openPrivateDining()
                }}
              >
                Inquire About Private Dining
              </PremiumButton>
            </div>
          </Reveal>
        </div>
      </PageContainer>
    </SectionWrapper>
  )
}

function MenuPage() {
  return (
    <>
      <MenuHero />
      <div className="menu-intro">
        <PageContainer>
          <Reveal>
            <p>
              Our menu changes with the seasons, highlighting the finest
              ingredients from local farms and purveyors. Below is a taste of
              what we currently offer.
            </p>
          </Reveal>
        </PageContainer>
      </div>
      {menuCategories.map((category) => (
        <MenuCategory key={category.id} category={category} />
      ))}
      <PrivateDining />
    </>
  )
}

export default MenuPage
