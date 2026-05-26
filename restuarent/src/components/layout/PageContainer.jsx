import { cn } from '../../utils/cn'

function PageContainer({ children, className = '' }) {
  return <div className={cn('page-container', className)}>{children}</div>
}

export default PageContainer
