import { createContext, useContext, useState, useCallback } from 'react'

const PrivateDiningContext = createContext(null)

export function PrivateDiningProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  const openPrivateDining = useCallback(() => setIsOpen(true), [])
  const closePrivateDining = useCallback(() => setIsOpen(false), [])

  return (
    <PrivateDiningContext value={{ isOpen, openPrivateDining, closePrivateDining }}>
      {children}
    </PrivateDiningContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePrivateDining() {
  const ctx = useContext(PrivateDiningContext)
  if (!ctx) {
    throw new Error('usePrivateDining must be used within PrivateDiningProvider')
  }
  return ctx
}


