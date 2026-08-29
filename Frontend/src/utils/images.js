import c1 from '../assets/Carosel/WhatsApp Image 2026-07-31 at 9.36.42 AM (1).jpeg'
import c2 from '../assets/Carosel/WhatsApp Image 2026-07-31 at 9.36.42 AM.jpeg'
import c3 from '../assets/Carosel/WhatsApp Image 2026-07-31 at 9.36.43 AM (1).jpeg'
import c4 from '../assets/Carosel/WhatsApp Image 2026-07-31 at 9.36.43 AM (2).jpeg'
import c5 from '../assets/Carosel/WhatsApp Image 2026-07-31 at 9.36.43 AM.jpeg'
import c6 from '../assets/Carosel/WhatsApp Image 2026-07-31 at 9.36.44 AM.jpeg'

export const CAROUSEL_IMAGES = [c1, c2, c3, c4, c5, c6]

/** Verified Unsplash diving photography — stable CDN URLs */
export const IMAGES = {
  hero: c1,
  whyChoose: c2,
  dest1: c3,
  dest2: c4,
  dest3: c5,
  dest4: c6,
  gallery1: c1,
  gallery2: c2,
  gallery3: c3,
  instructor1: c4,
  instructor2: c5,
  gear1: c6,
  gear2: c1,
  contact: c2,
  snorkelingHero: c3,
  snorkelingFeat1: c4,
  snorkelingFeat2: c5,
  snorkelingStats: c6,
  scubaHero: c1,
  scubaFeat1: c2,
  scubaFeat2: c3,
  scubaStats: c4,
  surfingHero: c5,
  surfingFeat1: c6,
  surfingFeat2: c1,
  surfingStats: c2,
}

export const FEATURED_EXPERIENCES = [
  {
    id: 'exp-1',
    title: 'Try Dive Experience',
    location: 'Kadmat Island, Lakshadweep',
    category: 'Beginner',
    price: 9999,
    badge: 'Popular',
    badgeTone: 'accent',
    image: c1,
  },
  {
    id: 'exp-2',
    title: 'PADI Open Water Diver',
    location: 'Agatti Island, Lakshadweep',
    category: 'Certification',
    price: 19999,
    badge: 'Certification',
    badgeTone: 'cta',
    image: c2,
  },
  {
    id: 'exp-3',
    title: 'Discover Snorkeling',
    location: 'Coral Gardens, Kadmat',
    category: 'Non-Divers',
    price: 4999,
    badge: 'Relaxing',
    badgeTone: 'accent',
    image: c3,
  },
  {
    id: 'exp-4',
    title: 'Fun Dives Package',
    location: 'White Sands, Agatti',
    category: 'Packages',
    price: 14999,
    badge: 'Flexible',
    badgeTone: 'cta',
    image: c4,
  },
]
