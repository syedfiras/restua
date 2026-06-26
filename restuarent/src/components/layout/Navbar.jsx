import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineMenuAlt4, HiX } from 'react-icons/hi'
import { siteConfig } from '../../data/siteConfig'
import { cn } from '../../utils/cn'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const id = href.replace('#', '')
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'z-50 w-full transition-all duration-700 ease-luxury',
          scrolled
            ? 'fixed top-0 left-0 bg-cream/92 backdrop-blur-xl border-b border-cream-200 shadow-sm'
            : 'absolute top-0 left-0 bg-transparent',
        )}
      >
        <nav className="page-container flex items-center justify-between h-[var(--nav-height)]">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group flex flex-col leading-none"
            data-cursor="view"
          >
            <span
              className={cn(
                'font-display text-xl md:text-2xl font-semibold tracking-tight group-hover:text-accent transition-colors duration-500',
                scrolled ? 'text-primary' : 'text-white',
              )}
            >
              ATELIER
            </span>
            <span className="text-[0.55rem] tracking-wide uppercase text-accent font-medium mt-0.5">
              Nocturne
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-8 xl:gap-12">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    'nav-link relative text-xs uppercase tracking-luxury transition-all duration-500 hover:tracking-[0.25em]',
                    scrolled
                      ? 'text-muted hover:text-primary'
                      : 'text-white/65 hover:text-white',
                  )}
                  data-cursor="view"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className={cn(
              'lg:hidden flex items-center justify-center w-11 h-11 rounded-full hover:border-accent transition-colors duration-300',
              scrolled
                ? 'text-primary border border-cream-300'
                : 'text-white border border-white/25',
            )}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <HiOutlineMenuAlt4 className="text-xl" />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-cream flex flex-col items-center justify-center"
          >
            <button
              type="button"
              className="absolute top-6 right-6 flex items-center justify-center w-11 h-11 text-primary border border-cream-300 rounded-full hover:border-accent transition-colors"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <HiX className="text-xl" />
            </button>

            <nav className="flex flex-col items-center gap-6">
              {siteConfig.navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="font-display text-4xl md:text-6xl text-primary hover:text-accent transition-colors duration-300"
                  data-cursor="view"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-link:hover::after,
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          height: 1px;
          width: 0;
          background: var(--color-accent);
          transition: width 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
    </>
  )
}

export default Navbar
