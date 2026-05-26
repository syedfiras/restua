import Reveal from './Reveal'
import { cn } from '../../utils/cn'

function SectionHeading({ eyebrow, title, subtitle, align = 'left', className = '' }) {
  return (
    <Reveal className={cn('section-heading', `section-heading--${align}`, className)}>
      {eyebrow && <p className="section-heading__eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
    </Reveal>
  )
}

export default SectionHeading
