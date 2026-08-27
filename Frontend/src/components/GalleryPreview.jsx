import { useNavigate } from 'react-router'
import SectionReveal from './SectionReveal'
import Button from './Button'

import c1 from '../assets/Carosel/WhatsApp Image 2026-07-31 at 9.36.42 AM (1).jpeg'
import c2 from '../assets/Carosel/WhatsApp Image 2026-07-31 at 9.36.42 AM.jpeg'
import c3 from '../assets/Carosel/WhatsApp Image 2026-07-31 at 9.36.43 AM (1).jpeg'
import c4 from '../assets/Carosel/WhatsApp Image 2026-07-31 at 9.36.43 AM (2).jpeg'
import c5 from '../assets/Carosel/WhatsApp Image 2026-07-31 at 9.36.43 AM.jpeg'
import c6 from '../assets/Carosel/WhatsApp Image 2026-07-31 at 9.36.44 AM.jpeg'

const GALLERY_IMAGES = [c1, c2, c3, c4, c5, c6]

export default function GalleryPreview() {
  const navigate = useNavigate()
  const goToGallery = () => navigate('/gallery')

  return (
    <section id="gallery" className="relative py-16 sm:py-20 scroll-mt-20 pointer-events-auto overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal className="mb-12 text-center">
          <h2 className="font-heading text-h2 font-bold text-white">
            The Dive Village <em className="font-heading italic font-bold text-accent">Gallery</em>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Where the sea is your classroom, playground, and escape.
          </p>
        </SectionReveal>
      </div>

      {/* Infinite scroll marquee */}
      <div className="relative w-full overflow-hidden cursor-pointer" onClick={goToGallery}>
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgba(0,15,40,0.8), transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, rgba(0,15,40,0.8), transparent)' }} />

        <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused]" style={{ width: 'max-content' }}>
          {/* Duplicate for seamless loop */}
          {[...GALLERY_IMAGES, ...GALLERY_IMAGES, ...GALLERY_IMAGES].map((src, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 w-[280px] h-[380px] rounded-2xl overflow-hidden border border-white/20 shadow-2xl group"
            >
              <img
                src={src}
                alt={`Gallery ${(i % 6) + 1}`}
                className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal className="mt-10 text-center">
          <Button
            onClick={goToGallery}
            variant="secondary"
            className="!border-white/20 !bg-white/10 !text-white backdrop-blur-md hover:!border-accent hover:!text-accent"
          >
            View Full Gallery
          </Button>
        </SectionReveal>
      </div>
    </section>
  )
}
