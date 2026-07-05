import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineMenuAlt4, HiOutlineShoppingBag, HiX } from 'react-icons/hi'
import { cn } from '../../utils/cn'

const navLinks = [
  { label: 'Collection', href: '#experiences' },
  { label: 'Studio', href: '#about' },
  { label: 'Journal', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

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
          'fixed left-0 top-0 z-50 w-full px-4 transition-all duration-700 ease-luxury sm:px-6',
          scrolled
            ? 'pt-3'
            : 'pt-5',
        )}
      >
        <nav
          className={cn(
            'mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center rounded-full px-4 shadow-[0_18px_48px_rgba(0,0,0,0.22)] backdrop-blur-2xl transition-all duration-700 ease-luxury sm:px-5',
            scrolled ? 'h-12 max-w-5xl' : 'h-[3.75rem] sm:h-16',
            scrolled
              ? 'border border-[#1d1914]/10 bg-[#fffaf0]/88'
              : 'border border-[#F2C46D]/20 bg-[#181310]/78',
          )}
        >
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className={cn(
              'group flex flex-col leading-none transition-colors duration-700',
              scrolled ? 'text-[#11100e]' : 'text-[#FFF8EA]',
            )}
            data-cursor="view"
          >
            <span className="font-display text-xl font-semibold tracking-tight transition-colors duration-500 group-hover:text-[#F2C46D] md:text-2xl">
              ATELIER
            </span>
            <span
              className={cn(
                'mt-0.5 text-[0.55rem] font-medium uppercase tracking-[0.28em] transition-colors duration-700',
                scrolled ? 'text-[#7b5a20]' : 'text-[#F2C46D]',
              )}
            >
              Nocturne
            </span>
          </a>

          <ul className="hidden items-center gap-8 lg:flex xl:gap-12">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    'nav-link relative text-[0.65rem] font-semibold uppercase tracking-[0.22em] transition-all duration-500 hover:tracking-[0.26em]',
                    scrolled
                      ? 'text-[#11100e] hover:text-[#7b5a20]'
                      : 'text-white hover:text-[#F2C46D]',
                  )}
                  data-cursor="view"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div
            className={cn(
              'flex items-center justify-end gap-2 transition-colors duration-700',
              scrolled ? 'text-[#11100e]' : 'text-[#FFF8EA]',
            )}
          >
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className={cn(
                'hidden h-10 w-10 place-items-center rounded-full transition duration-300 hover:-translate-y-0.5 sm:grid',
                scrolled
                  ? 'border border-[#11100e]/12 bg-[#11100e]/5 text-[#11100e] hover:bg-[#11100e]/10'
                  : 'border border-[#F2C46D]/20 bg-[#FFF8EA]/10 text-[#FFF8EA] hover:border-[#F2C46D]/45 hover:bg-[#F2C46D]/18 hover:text-[#F2C46D]',
              )}
              aria-label="Open cart"
              data-cursor="view"
            >
              <HiOutlineShoppingBag className="text-lg" />
            </a>
            <button
              type="button"
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 lg:hidden',
                scrolled
                  ? 'border border-[#11100e]/12 bg-[#11100e]/5 text-[#11100e] hover:bg-[#11100e]/10'
                  : 'border border-[#F2C46D]/20 bg-[#FFF8EA]/10 text-[#FFF8EA] hover:bg-[#F2C46D]/18 hover:text-[#F2C46D]',
              )}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <HiOutlineMenuAlt4 className="text-xl" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[#181310]"
          >
            <button
              type="button"
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-[#F2C46D]/25 text-[#FFF8EA] transition-colors hover:border-[#F2C46D]"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <HiX className="text-xl" />
            </button>

            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
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
                  className="font-display text-4xl text-[#FFF8EA] transition-colors duration-300 hover:text-[#F2C46D] md:text-6xl"
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
          background: #F2C46D;
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
