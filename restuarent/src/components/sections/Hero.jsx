import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteConfig } from '../../data/siteConfig'
import { images } from '../../data/images'

gsap.registerPlugin(ScrollTrigger)

const TITLE_WORDS = ['ATELIER', 'NOCTURNE']

const TITLE_STRUCTURE = TITLE_WORDS.map((word, wordIndex) => ({
  word,
  wordIndex,
  letters: word.split('').map((char, i) => ({
    char,
    index: TITLE_WORDS.slice(0, wordIndex).join('').length + i,
  })),
}))

function Hero() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const subtitleRef = useRef(null)
  const lettersRef = useRef([])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 640px)').matches

    if (reduceMotion) {
      gsap.set(lettersRef.current.filter(Boolean), { y: 0, rotateX: 0, opacity: 1 })
      gsap.set(subtitleRef.current, { y: 0, opacity: 1 })
      return undefined
    }

    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        scale: isMobile ? 1.15 : 1.3,
        filter: 'brightness(0.35)',
        duration: 2,
        ease: 'power3.out',
      })

      gsap.to(imageRef.current, {
        scale: 1,
        filter: 'brightness(0.55)',
        duration: 2,
        ease: 'power3.out',
      })

      gsap.from(lettersRef.current.filter(Boolean), {
        y: isMobile ? 36 : 100,
        rotateX: isMobile ? 0 : -20,
        opacity: 0,
        duration: 1.2,
        stagger: 0.05,
        ease: 'power3.out',
        delay: 0.3,
      })

      gsap.from(subtitleRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 1.2,
      })

      gsap.to(imageRef.current, {
        y: isMobile ? -40 : -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    const handleMouseMove = (e) => {
      if (isMobile) return
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 24
      const y = (clientY / window.innerHeight - 0.5) * 12
      gsap.to(imageRef.current, { x, y, duration: 0.8, ease: 'power2.out' })
    }

    const section = sectionRef.current
    section?.addEventListener('mousemove', handleMouseMove)

    return () => {
      ctx.revert()
      section?.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100svh] h-[100svh] overflow-hidden flex items-center justify-center bg-[#090909]"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={imageRef}
          src={images.hero}
          alt="Dark atmospheric fine dining restaurant interior"
          className="w-full h-[120%] object-cover will-change-transform saturate-[0.9]"
        />
      </div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#090909]/90 via-[#090909]/55 to-[#090909]/92" />

      <div
        className="absolute inset-0 z-[1] opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-[2] w-full max-w-5xl text-center px-5 sm:px-6 pt-[calc(var(--nav-height)+1rem)] pb-24 sm:pb-20">
        <h1
          className="font-display font-semibold text-white tracking-tight leading-[0.95] text-[clamp(2.25rem,10vw,5rem)] [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]"
          style={{ perspective: '1000px' }}
        >
          {TITLE_STRUCTURE.map(({ word, wordIndex, letters }) => (
            <span
              key={word}
              className={`block ${wordIndex === 0 ? 'mb-1 sm:mb-0' : ''} sm:inline sm:whitespace-nowrap`}
            >
              {wordIndex > 0 && (
                <span className="hidden sm:inline" aria-hidden="true">
                  {'\u00A0'}
                </span>
              )}
              {letters.map(({ char, index }) => (
                <span
                  key={`${word}-${char}-${index}`}
                  ref={(el) => {
                    lettersRef.current[index] = el
                  }}
                  className="inline-block"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p
          ref={subtitleRef}
          className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-white/75 font-accent italic tracking-wide max-w-xs sm:max-w-none mx-auto"
        >
          {siteConfig.tagline}
        </p>
      </div>

      <a
        href="#about"
        onClick={(e) => {
          e.preventDefault()
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
        }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-3 text-white/50 text-[0.65rem] uppercase tracking-luxury hover:text-white transition-colors duration-300"
        data-cursor="view"
      >
        <span>Scroll</span>
        <div className="scroll-indicator__line" />
      </a>
    </section>
  )
}

export default Hero
