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
  { id: 1, src: c1, location: 'Havelock Island', alt: 'Gallery Image 1' },
  { id: 2, src: c2, location: 'Goa Coast', alt: 'Gallery Image 2' },
  { id: 3, src: c3, location: 'Lakshadweep', alt: 'Gallery Image 3' },
  { id: 4, src: c4, location: 'Pondicherry', alt: 'Gallery Image 4' },
  { id: 5, src: c5, location: 'Andaman Sea', alt: 'Gallery Image 5' },
  { id: 6, src: c6, location: 'Netrani Island', alt: 'Gallery Image 6' },
]

export default function GalleryPreview() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section id="gallery" className="relative py-16 sm:py-20 scroll-mt-20 pointer-events-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal className="mb-12 text-center">
          <h2 className="font-heading text-h2 font-bold text-white">
            The Dive Village <em className="font-heading italic font-bold text-accent">Gallery</em>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Where the sea is your classroom, playground, and escape.
          </p>
        </SectionReveal>

        <div className="perspective-[1200px] mx-auto w-full h-[350px] sm:h-[500px] flex items-center justify-center overflow-visible mt-8 mb-8">
          <div className="relative flex items-center justify-center preserve-3d" style={{ transform: 'scale(min(1, 100vw / 1000))' }}>
            <div className="relative w-[900px] h-[300px] preserve-3d animate-spin-carousel">
              {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((img, i) => (
                <CurvedCard key={`${img.id}-${i}`} img={img} index={i} setIsOpen={setIsOpen} />
              ))}
            </div>
          </div>
        </div>

        <SectionReveal className="mt-8 text-center">
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

const RADIUS = 450;
const CARD_WIDTH = 220;
const CARD_HEIGHT = 320;
const SLICES = 24; // Increased slices for ultra-smooth curve

const cardAngleRad = 2 * Math.asin(CARD_WIDTH / 2 / RADIUS);
const cardAngleDeg = cardAngleRad * (180 / Math.PI);
const sliceAngleDeg = cardAngleDeg / SLICES;
const sliceWidth = 2 * RADIUS * Math.sin((sliceAngleDeg / 2) * (Math.PI / 180));
const safeSliceWidth = sliceWidth + 1.5; // wider overlap to absolutely guarantee no seams
const imageSliceWidth = CARD_WIDTH / SLICES;

function CurvedCard({ img, index, setIsOpen }) {
  return (
    <div 
      className="absolute top-1/2 left-1/2 flex items-center justify-center pointer-events-auto group cursor-pointer preserve-3d"
      style={{ transform: `rotateY(${index * 30}deg)` }}
      onClick={() => setIsOpen(true)}
    >
      <div className="relative preserve-3d transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-4">
        {Array.from({ length: SLICES }).map((_, i) => {
          const angle = -cardAngleDeg / 2 + (i + 0.5) * sliceAngleDeg;
          const bgX = -(i * imageSliceWidth);
          return (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 backface-hidden bg-navy/20"
              style={{
                width: `${safeSliceWidth}px`,
                height: `${CARD_HEIGHT}px`,
                marginLeft: `${-safeSliceWidth / 2}px`,
                marginTop: `${-CARD_HEIGHT / 2}px`,
                backgroundImage: `linear-gradient(to top, rgba(0,20,40,0.8) 0%, rgba(0,20,40,0) 40%), url(${img.src})`,
                backgroundSize: `100% 100%, ${CARD_WIDTH}px ${CARD_HEIGHT}px`,
                backgroundPosition: `center, ${bgX}px center`,
                transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                borderTopLeftRadius: i === 0 ? '16px' : '0',
                borderBottomLeftRadius: i === 0 ? '16px' : '0',
                borderTopRightRadius: i === SLICES - 1 ? '16px' : '0',
                borderBottomRightRadius: i === SLICES - 1 ? '16px' : '0',
                borderTop: '2px solid rgba(255,255,255,0.2)',
                borderBottom: '2px solid rgba(255,255,255,0.2)',
                borderLeft: i === 0 ? '2px solid rgba(255,255,255,0.2)' : 'none',
                borderRight: i === SLICES - 1 ? '2px solid rgba(255,255,255,0.2)' : 'none',
              }}
            />
          )
        })}

        <div 
          className="absolute top-1/2 left-1/2 backface-hidden flex items-end justify-start pb-4 pl-4 pointer-events-none"
          style={{ 
            width: `${CARD_WIDTH}px`, 
            height: `${CARD_HEIGHT}px`,
            marginLeft: `${-CARD_WIDTH / 2}px`,
            marginTop: `${-CARD_HEIGHT / 2}px`,
            transform: `translateZ(${RADIUS + 2}px)` 
          }}
        >
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-md opacity-80 group-hover:opacity-100 transition-opacity shadow-lg">
            {img.location}
          </span>
        </div>
      </div>
    </div>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
