import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { images } from '../../data/images'

gsap.registerPlugin(ScrollTrigger)

function Hero() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const contentRef = useRef(null)
  const labelRef = useRef(null)
  const linesRef = useRef([])
  const descriptionRef = useRef(null)
  const actionsRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) return undefined

    const ctx = gsap.context(() => {
      gsap.set(linesRef.current.filter(Boolean), { yPercent: 112, rotateX: -8 })

      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })

      intro
        .from(imageRef.current, {
          scale: 1.08,
          filter: 'brightness(0.72) saturate(0.92)',
          duration: 1.25,
        })
        .from(labelRef.current, { y: 18, opacity: 0, duration: 0.8 }, '-=0.8')
        .to(
          linesRef.current.filter(Boolean),
          {
            yPercent: 0,
            rotateX: 0,
            duration: 1,
            stagger: 0.12,
          },
          '-=0.35',
        )
        .from(descriptionRef.current, { y: 18, opacity: 0, duration: 0.85 }, '-=0.45')
        .from(
          actionsRef.current.children,
          {
            y: 16,
            opacity: 0,
            duration: 0.75,
            stagger: 0.08,
          },
          '-=0.45',
        )

      gsap.to(imageRef.current, {
        scale: 1.14,
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(contentRef.current, {
        y: 70,
        opacity: 0.78,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleScrollTo = (event, id) => {
    event.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#11100e] text-[#fffaf0]"
    >
      <img
        ref={imageRef}
        src={images.hero}
        alt="Complete luxury restaurant dining room interior"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 z-0 h-[115%] w-full object-cover object-center"
      />

      <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.76)_48%,rgba(0,0,0,0.42)_100%)]" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_72%_42%,rgba(184,145,79,0.12),transparent_34%),radial-gradient(circle_at_50%_100%,rgba(0,0,0,0.72),transparent_44%)]" />
      <div className="absolute inset-0 z-[2] opacity-[0.1] [background-image:url('data:image/svg+xml,%3Csvg_viewBox=%220_0_256_256%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22n%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.85%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />

      <div className="page-container relative z-10 pt-[calc(var(--nav-height)+3rem)]">
        <div ref={contentRef} className="max-w-3xl drop-shadow-[0_18px_45px_rgba(0,0,0,0.8)]">
          <p
            ref={labelRef}
            className="mb-6 font-body text-[0.72rem] font-bold uppercase tracking-[0.32em] text-[#F2C46D]"
          >
            Chef's Tasting Collection
          </p>

          <h1 className="font-display text-[clamp(4.2rem,9.4vw,8rem)] font-semibold leading-[0.88] text-[#FFF8EA] [letter-spacing:0]">
            {['Seasonal Plates', 'For Midnight Dining'].map((line, index) => (
              <span key={line} className="block overflow-hidden pb-2 [perspective:900px]">
                <span
                  ref={(element) => {
                    linesRef.current[index] = element
                  }}
                  className="block will-change-transform"
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            ref={descriptionRef}
            className="mt-7 max-w-xl font-body text-base font-medium leading-8 text-[#F4E5CA] sm:text-lg"
          >
            A cinematic tasting menu shaped by fire, season, and restraint, served with
            rare pairings in an intimate candlelit dining room.
          </p>

          <div ref={actionsRef} className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="#experiences"
              onClick={(event) => handleScrollTo(event, 'experiences')}
              className="group inline-flex min-h-12 items-center justify-center rounded-full bg-[#FFF8EA] px-8 font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#201814] shadow-[0_18px_45px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-[#F2C46D] hover:shadow-[0_24px_58px_rgba(0,0,0,0.25)]"
            >
              Explore Menu
            </a>
            <a
              href="#gallery"
              onClick={(event) => handleScrollTo(event, 'gallery')}
              className="group relative inline-flex min-h-12 items-center justify-center px-2 font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#FFF8EA] transition duration-300 hover:-translate-y-0.5 hover:text-[#F2C46D]"
            >
              Watch The Kitchen
              <span className="absolute bottom-2 left-2 h-px w-[calc(100%-1rem)] origin-left scale-x-40 bg-[#F2C46D] transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
