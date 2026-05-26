import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

const SectionWrapper = forwardRef(function SectionWrapper({ id, children, className = '', tone = 'default' }, ref) {
  return (
    <section ref={ref} id={id} className={cn('section-wrapper', `section-wrapper--${tone}`, className)}>
      {children}
    </section>
  )
})

export default SectionWrapper
