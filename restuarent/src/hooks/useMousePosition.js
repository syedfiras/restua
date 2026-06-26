import { useEffect, useRef, useState } from 'react'

const lerp = (start, end, factor) => start + (end - start) * factor

export function useMousePosition(smoothing = 0.12) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const smoothRef = useRef({ x: 0, y: 0 })
  const frameRef = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const animate = () => {
      smoothRef.current = {
        x: lerp(smoothRef.current.x, targetRef.current.x, smoothing),
        y: lerp(smoothRef.current.y, targetRef.current.y, smoothing),
      }
      setSmoothPosition({ ...smoothRef.current })
      frameRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    frameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(frameRef.current)
    }
  }, [smoothing])

  return { position, smoothPosition }
}

export default useMousePosition
