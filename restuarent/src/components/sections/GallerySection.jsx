import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { galleryItems, galleryStrip } from '../../data/gallery'
import ImageReveal from '../ui/ImageReveal'
import TextReveal from '../ui/TextReveal'
import { useGsapReveal } from '../../hooks/useGsapReveal'

gsap.registerPlugin(ScrollTrigger)

function GalleryItem({ item }) {
  const itemRef = useRef(null)
  const { parallax } = useGsapReveal()

  useEffect(() => {
    if (itemRef.current) {
      parallax(itemRef.current, { speed: item.offset || 20 })
    }
  }, [item.offset, parallax])

  if (item.layout === 'full') {
    return (
      <div className="w-full mb-16 md:mb-24" ref={itemRef}>
        <ImageReveal
          src={item.src}
          alt={item.alt}
          className="w-full"
          aspectRatio={item.aspect}
        />
        <p className="text-xs uppercase tracking-luxury text-muted mt-4 text-center">
          {item.caption}
        </p>
      </div>
    )
  }

  if (item.layout === 'portrait') {
    return (
      <div className="flex justify-center my-16 md:my-24" ref={itemRef}>
        <div className="w-full md:w-[40%]">
          <ImageReveal
            src={item.src}
            alt={item.alt}
            className="w-full"
            aspectRatio={item.aspect}
          />
          <p className="text-xs uppercase tracking-luxury text-muted mt-4 text-center">
            {item.caption}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div ref={itemRef}>
      <ImageReveal
        src={item.src}
        alt={item.alt}
        className="w-full"
        aspectRatio={item.aspect}
      />
      <p className="text-xs uppercase tracking-luxury text-muted mt-4">
        {item.caption}
      </p>
    </div>
  )
}

function GallerySection() {
  const sectionRef = useRef(null)
  const stripRef = useRef(null)
  const stripContainerRef = useRef(null)
  const columnItems = galleryItems.filter((i) => i.layout.startsWith('column'))
  const leftItems = columnItems.filter((i) => i.layout === 'column-left')
  const rightItems = columnItems.filter((i) => i.layout === 'column-right')

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !stripRef.current || !stripContainerRef.current) return undefined

    const strip = stripRef.current
    const totalWidth = strip.scrollWidth - window.innerWidth

    const tween = gsap.to(strip, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: stripContainerRef.current,
        start: 'top top',
        end: () => `+=${totalWidth}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    })

    return () => {
      tween.kill()
    }
  }, [])

  return (
    <section id="gallery" ref={sectionRef} className="relative py-[var(--section-xl)] bg-cream">
      <div className="page-container mb-16">
        <p className="eyebrow">Visual Journal</p>
        <TextReveal
          tag="h2"
          text="Moments Captured"
          className="display-heading text-4xl md:text-5xl lg:text-6xl text-primary"
          stagger={0.06}
        />
      </div>

      <div className="page-container">
        {galleryItems
          .filter((i) => i.layout === 'full')
          .map((item) => (
            <GalleryItem key={item.id} item={item} />
          ))}
      </div>

      <div className="page-container grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
        <div className="space-y-8">
          {leftItems.map((item) => (
            <div key={item.id} style={{ marginTop: item.offset > 0 ? `${item.offset}px` : 0 }}>
              <GalleryItem item={item} />
            </div>
          ))}
        </div>
        <div className="space-y-8 md:mt-24">
          {rightItems.map((item) => (
            <div key={item.id} style={{ marginTop: item.offset > 0 ? `${item.offset}px` : 0 }}>
              <GalleryItem item={item} />
            </div>
          ))}
        </div>
      </div>

      <div ref={stripContainerRef} className="relative h-screen overflow-hidden hidden md:block">
        <div
          ref={stripRef}
          className="flex gap-6 px-6 h-full items-center"
          style={{ width: 'max-content' }}
        >
          {galleryStrip.map((item) => (
            <figure key={item.id} className="flex-shrink-0 w-[60vw] lg:w-[45vw] h-[70vh]">
              <ImageReveal
                src={item.src}
                alt={item.alt}
                className="w-full h-full"
              />
              <figcaption className="text-xs uppercase tracking-luxury text-muted mt-3">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="page-container md:hidden mt-8">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4">
          {galleryStrip.map((item) => (
            <figure key={item.id} className="flex-shrink-0 w-[80vw] snap-center">
              <ImageReveal
                src={item.src}
                alt={item.alt}
                className="w-full aspect-[4/3]"
              />
              <figcaption className="text-xs uppercase tracking-luxury text-muted mt-3">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="page-container">
        {galleryItems
          .filter((i) => i.layout === 'portrait')
          .map((item) => (
            <GalleryItem key={item.id} item={item} />
          ))}
      </div>
    </section>
  )
}

export default GallerySection
