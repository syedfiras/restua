import { useEffect, useRef } from 'react'
import { cn } from '../../utils/cn'
import { useGsapReveal } from '../../hooks/useGsapReveal'

function ImageReveal({
  src,
  alt,
  className = '',
  imageClassName = '',
  aspectRatio,
  priority = false,
}) {
  const containerRef = useRef(null)
  const { revealImage } = useGsapReveal()

  useEffect(() => {
    if (containerRef.current) {
      revealImage(containerRef.current)
    }
  }, [revealImage])

  return (
    <figure
      ref={containerRef}
      className={cn('image-reveal-mask relative overflow-hidden', className)}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={cn('w-full h-full object-cover scale-[1.15]', imageClassName)}
      />
    </figure>
  )
}

export default ImageReveal
