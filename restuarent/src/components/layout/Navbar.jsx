import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import PremiumButton from '../ui/PremiumButton'
import { navigation } from '../../data/navigation'
import { RESTAURANT } from '../../utils/constants'
import {
  mobileNavItem,
  mobileNavList,
  mobileOverlay,
  mobilePanel,
  navEntrance,
  reducedMotionVariant,
} from '../../utils/motionVariants'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 28)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)
  const scrollToSection = (event, href) => {
    if (!href?.startsWith('#')) return

    event.preventDefault()
    const target = document.querySelector(href)

    if (target) {
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      })
      window.history.pushState(null, '', href)
    }

    closeMenu()
  }

  return (
    <motion.header
      className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}
      variants={prefersReducedMotion ? reducedMotionVariant : navEntrance}
      initial="hidden"
      animate="visible"
    >
      <a
        className="navbar__logo"
        href="#home"
        onClick={(event) => scrollToSection(event, '#home')}
        aria-label={`${RESTAURANT.name} home`}
      >
        <span>Atelier</span>
        <small>Nocturne</small>
      </a>

      <nav className="navbar__links" aria-label="Primary navigation">
        {navigation.map((link) => (
          <a key={link.href} href={link.href} onClick={(event) => scrollToSection(event, link.href)}>
            {link.label}
          </a>
        ))}
      </nav>

      <PremiumButton className="navbar__cta" href="#reservation" onClick={(event) => scrollToSection(event, '#reservation')}>
        Reserve a Table
      </PremiumButton>

      <button
        className="navbar__menu-button"
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <FiMenu />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            variants={prefersReducedMotion ? reducedMotionVariant : mobileOverlay}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div className="mobile-menu__panel" variants={prefersReducedMotion ? reducedMotionVariant : mobilePanel}>
              <button className="mobile-menu__close" type="button" onClick={closeMenu} aria-label="Close menu">
                <FiX />
              </button>
              <motion.nav
                aria-label="Mobile navigation"
                variants={prefersReducedMotion ? reducedMotionVariant : mobileNavList}
              >
                {navigation.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(event) => scrollToSection(event, link.href)}
                    variants={prefersReducedMotion ? reducedMotionVariant : mobileNavItem}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </motion.nav>
              <motion.div variants={prefersReducedMotion ? reducedMotionVariant : mobileNavItem}>
                <PremiumButton href="#reservation" onClick={(event) => scrollToSection(event, '#reservation')}>
                  Reserve a Table
                </PremiumButton>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
