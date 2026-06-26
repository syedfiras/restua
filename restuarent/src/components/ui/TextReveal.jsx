import { useEffect, useRef } from 'react'
import { cn } from '../../utils/cn'
import { useGsapReveal } from '../../hooks/useGsapReveal'

const TAG_MAP = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  p: 'p',
  span: 'span',
}

function TextReveal({
  text,
  tag = 'h2',
  splitBy = 'word',
  stagger = 0.05,
  delay = 0,
  className = '',
  wordClassName = '',
}) {
  const containerRef = useRef(null)
  const { revealText } = useGsapReveal()
  const Tag = TAG_MAP[tag] || tag

  const units =
    splitBy === 'char'
      ? text.split('')
      : splitBy === 'line'
        ? text.split('\n')
        : text.split(' ')

  useEffect(() => {
    if (containerRef.current) {
      revealText(containerRef.current, { stagger, delay })
    }
  }, [text, stagger, delay, revealText])

  return (
    <Tag ref={containerRef} className={className}>
      {units.map((unit, i) => (
        <span key={`${unit}-${i}`} className="reveal-mask inline-block">
          <span className={cn('reveal-mask__inner reveal-word inline-block', wordClassName)}>
            {unit}
            {splitBy === 'word' && i < units.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </Tag>
  )
}

export default TextReveal
