
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import AboutSection from './components/sections/AboutSection'
import ProjectsSection from './components/sections/ProjectsSection'
import GallerySection from './components/sections/GallerySection'
import ContactSection from './components/sections/ContactSection'
import { useLenis } from './hooks/useLenis'

function App() {
  useLenis()

  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <ProjectsSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

export default App
