import { createContext, useContext, useState, useCallback, useMemo } from 'react'

const OrderContext = createContext(null)

export function OrderProvider({ children }) {
  const [items, setItems] = useState([])

  const addItem = useCallback((item) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.name === item.name)
      if (existing) {
        return prev.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i,
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((name) => {
    setItems((prev) => prev.filter((i) => i.name !== name))
  }, [])

  const updateQuantity = useCallback((name, delta) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.name === name ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i,
        )
        .filter((i) => i.quantity > 0),
    )
  }, [])

  const clearOrder = useCallback(() => setItems([]), [])

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  )

  const totalPrice = useMemo(
    () => items.reduce((sum, i) => sum + parseFloat(i.price.replace('$', '')) * i.quantity, 0),
    [items],
  )

  const value = useMemo(
    () => ({ items, addItem, removeItem, updateQuantity, clearOrder, totalItems, totalPrice }),
    [items, addItem, removeItem, updateQuantity, clearOrder, totalItems, totalPrice],
  )

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useOrder() {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error('useOrder must be used within OrderProvider')
  return ctx
}
