import { useEffect, useRef } from 'react'
import { FaInstagram, FaFacebookF } from 'react-icons/fa'
import { siteConfig } from '../../data/siteConfig'
import { useGsapReveal } from '../../hooks/useGsapReveal'

function Footer() {
  const footerRef = useRef(null)
  const { fadeUp } = useGsapReveal()

  useEffect(() => {
    if (footerRef.current) {
      fadeUp(footerRef.current, { y: 40, duration: 1 })
    }
  }, [fadeUp])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const id = href.replace('#', '')
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <footer
      ref={footerRef}
      className="relative py-20 md:py-28 border-t border-cream-200 bg-cream-100"
    >
      <div className="page-container">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-primary leading-none">
            ATELIER
          </h2>
          <p className="text-sm tracking-wide uppercase text-accent mt-2 font-medium">
            Nocturne
          </p>
        </div>

        <div className="w-24 h-px bg-accent mx-auto mb-12" />

        <nav className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12">
          {siteConfig.footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs uppercase tracking-luxury text-muted hover:text-primary transition-colors duration-300"
              data-cursor="view"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex justify-center gap-6 mb-12">
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center border border-cream-300 rounded-full text-muted hover:text-accent hover:border-accent transition-all duration-300"
            aria-label="Instagram"
            data-cursor="view"
          >
            <FaInstagram />
          </a>
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center border border-cream-300 rounded-full text-muted hover:text-accent hover:border-accent transition-all duration-300"
            aria-label="Facebook"
            data-cursor="view"
          >
            <FaFacebookF className="text-sm" />
          </a>
        </div>

        <div className="text-center space-y-2 mb-12">
          <p className="text-sm text-muted">{siteConfig.address.full}</p>
          <p className="text-sm text-muted">
            <a href={`tel:${siteConfig.phone}`} className="hover:text-accent transition-colors" data-cursor="view">
              {siteConfig.phone}
            </a>
            {' · '}
            <a href={`mailto:${siteConfig.email}`} className="hover:text-accent transition-colors" data-cursor="view">
              {siteConfig.email}
            </a>
          </p>
        </div>

        <p className="text-center text-xs text-muted-dark tracking-wide">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
