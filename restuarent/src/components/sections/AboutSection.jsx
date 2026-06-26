import { useEffect, useRef } from 'react'
import ImageReveal from '../ui/ImageReveal'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import { images } from '../../data/images'

const stats = [
  { value: 18, suffix: '', label: 'Courses' },
  { value: 4, suffix: '', label: 'Sommeliers' },
  { value: 1, suffix: '', label: 'Evening' },
]

function AboutSection() {
  const sectionRef = useRef(null)
  const imageWrapRef = useRef(null)
  const quoteRef = useRef(null)
  const bodyRef = useRef(null)
  const statsRef = useRef(null)
  const { fadeUp, parallax, countUp } = useGsapReveal()

  useEffect(() => {
    if (imageWrapRef.current) parallax(imageWrapRef.current, { speed: -40 })
    if (quoteRef.current) fadeUp(quoteRef.current, { delay: 0.2 })
    if (bodyRef.current) fadeUp(bodyRef.current, { delay: 0.4 })

    if (statsRef.current) {
      const counters = statsRef.current.querySelectorAll('[data-count]')
      counters.forEach((el) => {
        countUp(el, { end: Number(el.dataset.count) })
      })
    }
  }, [fadeUp, parallax, countUp])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-[var(--section-xl)] overflow-hidden bg-cream"
    >
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 -ml-0 lg:-ml-12" ref={imageWrapRef}>
            <ImageReveal
              src={images.about}
              alt="Chef plating a dish in warm kitchen lighting"
              className="w-full aspect-[4/5] lg:aspect-[3/4] rounded-sm"
            />
          </div>

          <div className="lg:col-span-5 lg:pl-8">
            <p className="eyebrow">The Philosophy</p>

            <blockquote
              ref={quoteRef}
              className="quote-text text-3xl md:text-4xl lg:text-[2.75rem] mb-8 text-primary"
            >
              &ldquo;Every course is a chapter in an evening you&apos;ll remember.&rdquo;
            </blockquote>

            <div ref={bodyRef} className="body-text text-base md:text-lg mb-12">
              <p>
                Atelier Nocturne is not merely a restaurant — it is a narrative told through
                flame, fermentation, and the quiet theatre of service. Each evening unfolds
                like a novella: intimate, deliberate, unforgettable.
              </p>
              <p className="mt-4">
                Our kitchen draws from the rhythms of the season, sourcing from artisans who
                share our reverence for craft. The result is cuisine that speaks in whispers,
                not declarations.
              </p>
            </div>

            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-cream-200"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <span className="font-display text-4xl md:text-5xl text-primary font-semibold">
                    <span data-count={stat.value}>0</span>
                    {stat.suffix}
                  </span>
                  <p className="text-xs uppercase tracking-luxury text-muted mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
