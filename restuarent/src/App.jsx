import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Preloader from './components/ui/Preloader'
import { useLenis } from './hooks/useLenis'
import './App.css'

function App() {
  useLenis()

  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Home />
      </main>
      <Footer />
    </>
  )
}

export default App
