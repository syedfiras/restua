import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { cn } from '../../utils/cn'

function MagneticButton({ children, className = '', strength = 0.35, as: Component = 'button', ...props }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'power3.out' })
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)

    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [strength])

  return (
    <Component ref={ref} className={cn('inline-block', className)} {...props}>
      {children}
    </Component>
  )
}

export default MagneticButton
