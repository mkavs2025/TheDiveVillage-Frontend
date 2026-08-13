import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal, { StaggerGrid, StaggerItem } from './SectionReveal'
import SafeImage from './SafeImage'
import Button from './Button'
import { IMAGES } from '../utils/images'

import c1 from '../assets/Carosel/WhatsApp Image 2026-07-31 at 9.36.42 AM (1).jpeg'
import c2 from '../assets/Carosel/WhatsApp Image 2026-07-31 at 9.36.42 AM.jpeg'
import c3 from '../assets/Carosel/WhatsApp Image 2026-07-31 at 9.36.43 AM (1).jpeg'
import c4 from '../assets/Carosel/WhatsApp Image 2026-07-31 at 9.36.43 AM (2).jpeg'
import c5 from '../assets/Carosel/WhatsApp Image 2026-07-31 at 9.36.43 AM.jpeg'
import c6 from '../assets/Carosel/WhatsApp Image 2026-07-31 at 9.36.44 AM.jpeg'

const GALLERY_IMAGES = [
  { id: 1, src: c1, category: 'Islands & Lagoons', alt: 'Gallery Image 1' },
  { id: 2, src: c2, category: 'Coral Reefs', alt: 'Gallery Image 2' },
  { id: 3, src: c3, category: 'Diving in Action', alt: 'Gallery Image 3' },
  { id: 4, src: c4, category: 'Community Moments', alt: 'Gallery Image 4' },
  { id: 5, src: c5, category: 'Islands & Lagoons', alt: 'Gallery Image 5' },
  { id: 6, src: c6, category: 'Diving in Action', alt: 'Gallery Image 6' },
]

export default function GalleryPreview() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section id="gallery" className="relative py-16 sm:py-20 scroll-mt-20 pointer-events-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal className="mb-12 text-center">
          <h2 className="font-heading text-h2 font-extrabold text-white">
            The Dive Village, <em className="font-heading italic font-bold text-accent">Lakshadweep</em>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Where the sea is your classroom, playground, and escape.
          </p>
        </SectionReveal>

        <div className="perspective-[800px] mx-auto w-full max-w-lg sm:max-w-2xl h-[400px] sm:h-[500px] flex items-center justify-center overflow-visible mt-16 mb-8">
          <div className="relative w-full h-full preserve-3d animate-spin-carousel">
            {GALLERY_IMAGES.slice(0, 6).map((img, i) => (
              <div 
                key={img.id}
                className="absolute inset-0 flex items-center justify-center backface-hidden"
                style={{
                  // Decreased translateZ even further to pull images very close together
                  transform: `rotateY(${i * 60}deg) translateZ(clamp(200px, 35vw, 320px))`
                }}
              >
                <div 
                  // Increased width of the cards to reduce the empty space between them
                  className="w-[220px] sm:w-[320px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl relative border border-white/20 bg-navy/10 group cursor-pointer transition duration-300 hover:scale-105 hover:-translate-y-2"
                  onClick={() => setIsOpen(true)}
                >
                  <SafeImage
                    src={img.src}
                    alt={img.alt}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white opacity-0 backdrop-blur-md transition duration-300 group-hover:opacity-100">
                    {img.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <SectionReveal className="mt-12 text-center">
          <Button onClick={() => setIsOpen(true)} variant="secondary" className="!border-white/20 !bg-white/10 !text-white backdrop-blur-md hover:!border-accent hover:!text-accent">
            View Full Gallery
          </Button>
        </SectionReveal>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/95 p-4 backdrop-blur-sm sm:p-6 lg:p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-full w-full max-w-6xl overflow-y-auto rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 p-6 shadow-2xl"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="sticky top-0 float-right ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-accent hover:text-white"
                aria-label="Close gallery"
              >
                <CloseIcon />
              </button>
              <h3 className="mb-6 font-heading text-2xl font-bold text-white">Full Gallery</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {GALLERY_IMAGES.map((img) => (
                  <div key={`full-${img.id}`} className="group relative aspect-square overflow-hidden rounded-xl bg-navy/10">
                    <SafeImage
                      src={img.src}
                      alt={img.alt}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <span className="absolute bottom-2 left-2 rounded-full bg-navy/50 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                      {img.category}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
