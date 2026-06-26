import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useGsapReveal() {
  const ctxRef = useRef(null)

  useEffect(() => {
    ctxRef.current = gsap.context(() => {})

    return () => {
      ctxRef.current?.revert()
    }
  }, [])

  const revealText = (container, options = {}) => {
    const {
      stagger = 0.05,
      delay = 0,
      duration = 0.8,
      y = 40,
      ease = 'power2.out',
      start = 'top 85%',
    } = options

    if (!container) return

    const words = container.querySelectorAll('.reveal-word')
    if (!words.length) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      gsap.set(words, { y: 0, opacity: 1 })
      return
    }

    gsap.from(words, {
      y,
      opacity: 0,
      duration,
      stagger,
      delay,
      ease,
      scrollTrigger: {
        trigger: container,
        start,
        toggleActions: 'play none none none',
      },
    })
  }

  const revealImage = (element, options = {}) => {
    const {
      duration = 1,
      ease = 'power2.inOut',
      start = 'top 80%',
      scale = 1.15,
    } = options

    if (!element) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mask = element.querySelector('.image-reveal-mask') || element
    const img = element.querySelector('img')

    if (reduceMotion) {
      gsap.set(mask, { clipPath: 'inset(0% 0% 0% 0%)' })
      if (img) gsap.set(img, { scale: 1 })
      return
    }

    gsap.set(mask, { clipPath: 'inset(100% 0% 0% 0%)' })
    if (img) gsap.set(img, { scale })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: 'play none none none',
      },
    })

    tl.to(mask, { clipPath: 'inset(0% 0% 0% 0%)', duration, ease })
    if (img) {
      tl.to(img, { scale: 1, duration, ease }, 0)
    }
  }

  const fadeUp = (element, options = {}) => {
    const {
      duration = 0.8,
      delay = 0,
      y = 30,
      ease = 'power2.out',
      start = 'top 85%',
    } = options

    if (!element) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      gsap.set(element, { y: 0, opacity: 1 })
      return
    }

    gsap.set(element, { y, opacity: 0 })
    gsap.to(element, {
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: 'play none none none',
      },
    })
  }

  const parallax = (element, options = {}) => {
    const { speed = 50, start = 'top bottom', end = 'bottom top' } = options

    if (!element) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    gsap.to(element, {
      y: speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub: true,
      },
    })
  }

  const countUp = (element, options = {}) => {
    const { end = 100, duration = 2, ease = 'power2.out', start = 'top 85%' } = options

    if (!element) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      element.textContent = end
      return
    }

    const obj = { val: 0 }
    gsap.to(obj, {
      val: end,
      duration,
      ease,
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        element.textContent = Math.round(obj.val)
      },
    })
  }

  return { revealText, revealImage, fadeUp, parallax, countUp }
}

export default useGsapReveal
