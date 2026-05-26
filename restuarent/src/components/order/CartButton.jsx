import { motion, AnimatePresence } from 'framer-motion'
import { FiShoppingBag } from 'react-icons/fi'
import { useOrder } from '../../context/OrderContext'

function CartButton({ onClick }) {
  const { totalItems } = useOrder()

  return (
    <motion.button
      className="cart-button"
      type="button"
      onClick={onClick}
      aria-label={`Open order bag, ${totalItems} items`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, type: 'spring', stiffness: 260, damping: 22 }}
    >
      <FiShoppingBag />
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.span
            className="cart-button__badge"
            key={totalItems}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          >
            {totalItems}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export default CartButton
