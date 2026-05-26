import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import PremiumButton from '../ui/PremiumButton'
import { navigation } from '../../data/navigation'
import { RESTAURANT } from '../../utils/constants'
import { usePrivateDining } from '../../context/PrivateDiningContext'
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
  const [activeHref, setActiveHref] = useState('#home')
  const prefersReducedMotion = usePrefersReducedMotion()
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const { openPrivateDining } = usePrivateDining()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 28)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isHome) return

    const sections = navigation
      .map((link) => {
        const hash = link.href.startsWith('/') ? link.href.slice(1) : link.href
        return document.querySelector(hash)
      })
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) {
          setActiveHref(`#${visible.target.id}`)
        }
      },
      {
        rootMargin: '-28% 0px -58% 0px',
        threshold: [0.16, 0.32, 0.5],
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [isHome])

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

  const handleNavClick = (event, href) => {
    event.preventDefault()
    closeMenu()

    if (href === '/menu') {
      if (isHome) {
        const target = document.querySelector('#menu')
        if (target) {
          setActiveHref('#menu')
          target.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            block: 'start',
          })
          window.history.pushState(null, '', '#menu')
        }
      } else {
        navigate('/menu')
      }
      return
    }

    const sectionId = href.replace('/', '')
    if (isHome) {
      const target = document.querySelector(sectionId)
      if (target) {
        setActiveHref(sectionId)
        target.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start',
        })
        window.history.pushState(null, '', sectionId)
      }
    } else {
      navigate(href)
    }
  }

  const isActive = (href) => {
    if (href === '/menu') return location.pathname === '/menu' || activeHref === '#menu'
    if (isHome) return activeHref === href
    return false
  }

  return (
    <motion.header
      className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}
      variants={prefersReducedMotion ? reducedMotionVariant : navEntrance}
      initial="hidden"
      animate="visible"
    >
      <Link
        className="navbar__logo"
        to="/"
        onClick={() => closeMenu()}
        aria-label={`${RESTAURANT.name} home`}
      >
        <span>Atelier</span>
        <small>Nocturne</small>
      </Link>

      <nav className="navbar__links" aria-label="Primary navigation">
        {navigation.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={isActive(link.href) ? 'navbar__link--active' : ''}
            onClick={(event) => handleNavClick(event, link.href)}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="navbar__actions">
        <PremiumButton
          className="navbar__cta navbar__cta--secondary"
          variant="outline"
          onClick={(event) => {
            event.preventDefault()
            closeMenu()
            openPrivateDining()
          }}
        >
          Private Dining
        </PremiumButton>
        <PremiumButton
          className="navbar__cta"
          href="/#reservation"
          onClick={(event) => handleNavClick(event, '/#reservation')}
        >
          Reserve a Table
        </PremiumButton>
      </div>

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
                    className={isActive(link.href) ? 'navbar__link--active' : ''}
                    onClick={(event) => handleNavClick(event, link.href)}
                    variants={prefersReducedMotion ? reducedMotionVariant : mobileNavItem}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </motion.nav>
              <motion.div variants={prefersReducedMotion ? reducedMotionVariant : mobileNavItem} className="mobile-menu__buttons">
                <PremiumButton
                  variant="outline"
                  onClick={(event) => {
                    event.preventDefault()
                    closeMenu()
                    openPrivateDining()
                  }}
                >
                  Private Dining
                </PremiumButton>
                <PremiumButton
                  href="/#reservation"
                  onClick={(event) => handleNavClick(event, '/#reservation')}
                >
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
