import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import MenuPage from './pages/MenuPage'
import Preloader from './components/ui/Preloader'
import PrivateDiningModal from './components/ui/PrivateDiningModal'
import CartButton from './components/order/CartButton'
import CartDrawer from './components/order/CartDrawer'
import { PrivateDiningProvider } from './context/PrivateDiningContext'
import { OrderProvider } from './context/OrderContext'
import { useLenis } from './hooks/useLenis'
import './App.css'

function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash && location.pathname === '/') {
      const id = location.hash.replace('#', '')
      const target = document.getElementById(id)
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [location])

  return null
}

function AppLayout() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const location = useLocation()
  const isMenuPage = location.pathname === '/menu'
  useLenis()

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
      </main>
      <Footer />
      {isMenuPage && <CartButton onClick={() => setIsCartOpen(true)} />}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <PrivateDiningModal />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <PrivateDiningProvider>
        <OrderProvider>
          <Preloader />
          <ScrollToHash />
          <AppLayout />
        </OrderProvider>
      </PrivateDiningProvider>
    </BrowserRouter>
  )
}

export default App
