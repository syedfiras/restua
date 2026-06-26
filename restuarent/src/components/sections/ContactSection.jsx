import { useEffect, useRef, useState } from 'react'
import { HiArrowRight } from 'react-icons/hi'
import { siteConfig } from '../../data/siteConfig'
import MagneticButton from '../ui/MagneticButton'
import TextReveal from '../ui/TextReveal'
import { useGsapReveal } from '../../hooks/useGsapReveal'

function ContactSection() {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const detailsRef = useRef(null)
  const { fadeUp } = useGsapReveal()
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (detailsRef.current) fadeUp(detailsRef.current, { delay: 0.1 })
    if (formRef.current) fadeUp(formRef.current, { delay: 0.3 })
  }, [fadeUp])

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('Thank you. We will be in touch shortly.')
    e.target.reset()
    setTimeout(() => setStatus(''), 4000)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-[var(--section-xl)] border-t border-cream-200 bg-gradient-to-b from-cream-50 to-cream"
    >
      <div className="page-container">
        <div className="mb-16 md:mb-20">
          <p className="eyebrow">Reservations</p>
          <TextReveal
            tag="h2"
            text="Let's Create Your Evening"
            className="display-heading text-4xl md:text-5xl lg:text-6xl text-primary max-w-3xl"
            stagger={0.05}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div ref={detailsRef} className="space-y-10">
            <p className="body-text text-base md:text-lg max-w-md">
              Reserve your table for an evening of curated courses, cellar pairings,
              and unhurried service. We welcome inquiries for private dining and
              special occasions.
            </p>

            <div className="space-y-8 body-text">
              <div>
                <p className="text-xs uppercase tracking-luxury text-accent mb-3">Address</p>
                <p className="text-primary">{siteConfig.address.full}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-luxury text-accent mb-3">Hours</p>
                <p className="text-primary">{siteConfig.hours.weekdays}</p>
                <p className="text-primary">{siteConfig.hours.dinner}</p>
                <p className="text-muted">{siteConfig.hours.closed}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-luxury text-accent mb-3">Contact</p>
                <p>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="text-primary hover:text-accent transition-colors duration-300"
                    data-cursor="view"
                  >
                    {siteConfig.phone}
                  </a>
                </p>
                <p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-primary hover:text-accent transition-colors duration-300"
                    data-cursor="view"
                  >
                    {siteConfig.email}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-10 lg:pt-2">
            <div className="form-field">
              <input type="text" id="name" name="name" placeholder=" " required autoComplete="name" />
              <label htmlFor="name">Name</label>
            </div>

            <div className="form-field">
              <input type="email" id="email" name="email" placeholder=" " required autoComplete="email" />
              <label htmlFor="email">Email</label>
            </div>

            <div className="form-field">
              <input type="date" id="date" name="date" placeholder=" " required />
              <label htmlFor="date">Preferred Date</label>
            </div>

            <div className="form-field">
              <textarea id="message" name="message" rows={4} placeholder=" " />
              <label htmlFor="message">Message</label>
            </div>

            <MagneticButton
              type="submit"
              className="group flex items-center gap-3 text-sm uppercase tracking-luxury text-primary border-b border-cream-300 pb-2 hover:border-accent transition-colors duration-300 mt-2"
              data-cursor="view"
            >
              Send Inquiry
              <HiArrowRight className="text-lg transition-transform duration-500 group-hover:translate-x-2" />
            </MagneticButton>

            {status && (
              <p className="text-sm text-accent mt-4" role="status">
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
