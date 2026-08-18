import CourseTemplate from '../layouts/CourseTemplate'
import { IMAGES } from '../utils/images'

export default function Surfing() {
  const tours = [
    {
      id: 'surf-1',
      title: 'PADI Skin Diver',
      desc: 'Focus on breath-hold diving and safe descents.',
      price: 'Contact Us',
      image: IMAGES.surfingFeat1,
      spaces: 6,
    },
    {
      id: 'surf-2',
      title: 'Breath-hold Freediving',
      desc: 'Explore the ocean with just your natural abilities.',
      price: 'Contact Us',
      image: IMAGES.surfingFeat2,
      spaces: 4,
    }
  ]

  const stats = [
    { value: '15+', label: 'Years Experience' },
    { value: '1k+', label: 'Certified Divers' },
    { value: '0', label: 'Safety Incidents' },
  ]

  return (
    <CourseTemplate
      heroImage={IMAGES.surfingHero}
      titleTop="Experience"
      titleBottom="Breath-Hold Diving"
      aboutSubtitle="What is Freediving"
      aboutTitle="Connect with the ocean's raw energy"
      aboutText="Freediving teaches balance, patience, and a deep respect for the ocean's rhythm. Join us to experience the ultimate freedom on the water with just a single breath."
      aboutImg1={IMAGES.surfingFeat1}
      aboutImg2={IMAGES.surfingFeat2}
      toursTitle="Freediving Courses"
      toursSubtitle="Ready to hold your breath?"
      tours={tours}
      statsText="Just take the plunge"
      statsDesc="Our professional instructors are dedicated to getting you comfortable with breath-holds and feeling the calm of the ocean safely and confidently."
      stats={stats}
      statsImage={IMAGES.surfingStats}
      statsQuote="There is no feeling quite like the rush of diving into the deep blue."
      ctaTitle="Experience the thrill of freediving"
      ctaDesc="Join our community and embrace the ocean's energy."
    />
  )
}
