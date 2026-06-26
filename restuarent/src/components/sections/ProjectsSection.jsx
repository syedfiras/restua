import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HiArrowRight } from 'react-icons/hi'
import { projects } from '../../data/projects'
import ImageReveal from '../ui/ImageReveal'
import TextReveal from '../ui/TextReveal'

gsap.registerPlugin(ScrollTrigger)

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const imageRef = useRef(null)
  const isReversed = index % 2 !== 0

  useEffect(() => {
    const card = cardRef.current
    const image = imageRef.current
    if (!card || !image) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    const handleEnter = () => {
      gsap.to(image, { scale: 1.05, filter: 'brightness(0.85)', duration: 0.8, ease: 'power2.out' })
    }
    const handleLeave = () => {
      gsap.to(image, { scale: 1, filter: 'brightness(0.7)', duration: 0.8, ease: 'power2.out' })
    }

    image.addEventListener('mouseenter', handleEnter)
    image.addEventListener('mouseleave', handleLeave)

    return () => {
      image.removeEventListener('mouseenter', handleEnter)
      image.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <article
      ref={cardRef}
      className="min-h-[80vh] flex items-center py-16 md:py-24"
      data-cursor="view"
    >
      <div
        className={`page-container grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
          isReversed ? 'lg:direction-rtl' : ''
        }`}
      >
        <div
          className={`lg:col-span-7 ${isReversed ? 'lg:order-2 lg:col-start-6' : ''}`}
        >
          <div ref={imageRef} className="overflow-hidden">
            <ImageReveal
              src={project.image}
              alt={project.imageAlt}
              className="w-full aspect-[16/10]"
              imageClassName="brightness-[0.95]"
            />
          </div>
        </div>

        <div
          className={`lg:col-span-5 flex flex-col justify-center ${
            isReversed ? 'lg:order-1 lg:col-start-1 lg:row-start-1' : ''
          }`}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[0.65rem] uppercase tracking-luxury text-accent">
              {project.category}
            </span>
            <span className="w-8 h-px bg-cream-300" />
            <span className="text-[0.65rem] uppercase tracking-luxury text-muted">
              {project.year}
            </span>
          </div>

          <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary font-semibold tracking-tight leading-none mb-4">
            {project.title}
          </h3>

          <p className="text-sm uppercase tracking-luxury text-muted mb-6">
            {project.location}
          </p>

          <p className="body-text text-base max-w-md mb-8">{project.description}</p>

          <span className="inline-flex items-center gap-3 text-xs uppercase tracking-luxury text-accent group">
            Explore
            <HiArrowRight className="text-lg transition-transform duration-500 group-hover:translate-x-2" />
          </span>
        </div>
      </div>
    </article>
  )
}

function ProjectsSection() {
  const sectionRef = useRef(null)
  const dividerRefs = useRef([])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    dividerRefs.current.forEach((divider) => {
      if (!divider) return
      gsap.from(divider, {
        scaleX: 0,
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: divider,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    })
  }, [])

  return (
    <section id="experiences" ref={sectionRef} className="relative bg-cream-50">
      <div className="page-container pt-[var(--section-lg)] pb-8">
        <p className="eyebrow">Featured Experiences</p>
        <TextReveal
          tag="h2"
          text="Spaces & Evenings"
          className="display-heading text-4xl md:text-5xl lg:text-6xl text-primary max-w-2xl"
          stagger={0.06}
        />
      </div>

      {projects.map((project, index) => (
        <div key={project.id}>
          {index > 0 && (
            <div className="page-container py-4">
              <div
                ref={(el) => {
                  dividerRefs.current[index] = el
                }}
                className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent origin-left"
              />
            </div>
          )}
          <ProjectCard project={project} index={index} />
        </div>
      ))}
    </section>
  )
}

export default ProjectsSection
