import { motion } from 'framer-motion'
import { buttonHover, buttonTap } from '../../utils/motionVariants'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { cn } from '../../utils/cn'

function Button({ children, className = '', variant = 'primary', as = 'a', href, ...props }) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const Component = motion[as] || motion.a
  const linkProps = as === 'a' ? { href } : {}
  const handleClick = (event) => {
    props.onClick?.(event)

    if (event.defaultPrevented || as !== 'a' || !href?.startsWith('#')) {
      return
    }

    const target = document.querySelector(href)

    if (target) {
      event.preventDefault()
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      })
      window.history.pushState(null, '', href)
    }
  }

  return (
    <Component
      {...linkProps}
      className={cn('premium-button', `premium-button--${variant}`, className)}
      whileHover={prefersReducedMotion ? undefined : buttonHover}
      whileTap={prefersReducedMotion ? undefined : buttonTap}
      {...props}
      onClick={handleClick}
    >
      <span>{children}</span>
    </Component>
  )
}

export default Button
