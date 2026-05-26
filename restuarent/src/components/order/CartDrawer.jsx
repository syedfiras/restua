import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX, FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'
import { useOrder } from '../../context/OrderContext'
import PremiumButton from '../ui/PremiumButton'
import { luxuryEase } from '../../utils/motionVariants'

function CartDrawer({ isOpen, onClose }) {
  const { items, removeItem, updateQuantity, clearOrder, totalPrice } = useOrder()
  const navigate = useNavigate()

  const handleProceed = () => {
    onClose()
    navigate('/#reservation')
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: luxuryEase }}
            onClick={onClose}
          />
          <motion.aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Your order"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: luxuryEase }}
          >
            <div className="cart-drawer__header">
              <h2>Your Order</h2>
              <button className="cart-drawer__close" type="button" onClick={onClose} aria-label="Close order bag">
                <FiX />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="cart-drawer__empty">
                <FiShoppingBagIcon />
                <p>Your order bag is empty.</p>
                <p>Browse the menu to add items.</p>
              </div>
            ) : (
              <>
                <div className="cart-drawer__items">
                  {items.map((item) => (
                    <div key={item.name} className="cart-item">
                      <div className="cart-item__image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="cart-item__body">
                        <div className="cart-item__top">
                          <span className="cart-item__name">{item.name}</span>
                          <button
                            type="button"
                            className="cart-item__remove"
                            onClick={() => removeItem(item.name)}
                            aria-label={`Remove ${item.name}`}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                        <span className="cart-item__price">
                          {item.price}
                        </span>
                        <div className="cart-item__qty">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.name, -1)}
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <FiMinus />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.name, 1)}
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            <FiPlus />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-drawer__footer">
                  <div className="cart-drawer__total">
                    <span>Total</span>
                    <strong>${totalPrice.toFixed(0)}</strong>
                  </div>
                  <PremiumButton as="button" onClick={handleProceed}>
                    Proceed to Reservation
                  </PremiumButton>
                  <button className="cart-drawer__clear" type="button" onClick={clearOrder}>
                    Clear order
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function FiShoppingBagIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

export default CartDrawer
