import Hero from '../components/sections/Hero'
import FeaturedDishes from '../components/sections/FeaturedDishes'
import StorySection from '../components/sections/StorySection'
import ChefSection from '../components/sections/ChefSection'
import SignatureExperience from '../components/sections/SignatureExperience'
import GallerySection from '../components/sections/GallerySection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import ReservationSection from '../components/sections/ReservationSection'

function Home() {
  return (
    <>
      <Hero />
      <FeaturedDishes />
      <StorySection />
      <ChefSection />
      <SignatureExperience />
      <GallerySection />
      <TestimonialsSection />
      <ReservationSection />
    </>
  )
}

export default Home
