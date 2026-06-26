import { useEffect, useRef, useState } from 'react'
import { useMousePosition } from '../../hooks/useMousePosition'
import { cn } from '../../utils/cn'

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: none) and (pointer: coarse)').matches

function CustomCursor() {
  const { position, smoothPosition } = useMousePosition(0.1)
  const ringRef = useRef(null)
  const dotRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible] = useState(() => !isTouchDevice())
  const ringSmoothRef = useRef({ x: 0, y: 0 })
  const frameRef = useRef(0)

  useEffect(() => {
    if (!isVisible) return undefined

    const handleEnter = () => setIsHovering(true)
    const handleLeave = () => setIsHovering(false)

    const interactiveSelector = 'a, button, [data-cursor="view"], input, textarea, select'
    const elements = document.querySelectorAll(interactiveSelector)

    elements.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter)
      el.addEventListener('mouseleave', handleLeave)
    })

    const observer = new MutationObserver(() => {
      const updated = document.querySelectorAll(interactiveSelector)
      updated.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter)
        el.removeEventListener('mouseleave', handleLeave)
        el.addEventListener('mouseenter', handleEnter)
        el.addEventListener('mouseleave', handleLeave)
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })

    const lerp = (a, b, t) => a + (b - a) * t

    const animateRing = () => {
      ringSmoothRef.current = {
        x: lerp(ringSmoothRef.current.x, position.x, 0.08),
        y: lerp(ringSmoothRef.current.y, position.y, 0.08),
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${smoothPosition.x}px, ${smoothPosition.y}px) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringSmoothRef.current.x}px, ${ringSmoothRef.current.y}px) translate(-50%, -50%)`
      }

      frameRef.current = requestAnimationFrame(animateRing)
    }

    frameRef.current = requestAnimationFrame(animateRing)

    return () => {
      cancelAnimationFrame(frameRef.current)
      observer.disconnect()
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter)
        el.removeEventListener('mouseleave', handleLeave)
      })
    }
  }, [isVisible, position, smoothPosition])

  if (!isVisible) return null

  return (
    <>
      <div
        ref={dotRef}
        className={cn(
          'custom-cursor fixed top-0 left-0 z-[10000] w-[6px] h-[6px] rounded-full bg-accent pointer-events-none',
        )}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={cn(
          'custom-cursor fixed top-0 left-0 z-[9999] rounded-full border border-accent/60 pointer-events-none flex items-center justify-center transition-[width,height] duration-500 ease-luxury',
          isHovering ? 'w-20 h-20' : 'w-10 h-10',
        )}
        aria-hidden="true"
      >
        {isHovering && (
          <span className="text-[0.55rem] tracking-luxury uppercase text-accent font-medium">
            View
          </span>
        )}
      </div>
    </>
  )
}

export default CustomCursor
