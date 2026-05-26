import { cn } from '../../utils/cn'

function GlassCard({ children, className = '', as: Component = 'div' }) {
  return <Component className={cn('glass-card', className)}>{children}</Component>
}

export default GlassCard
