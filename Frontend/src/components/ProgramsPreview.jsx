import { useRef } from 'react'
import { Link } from 'react-router'
import SectionReveal from './SectionReveal'
import Button from './Button'
import { CAROUSEL_IMAGES } from '../utils/images'

const PROGRAMS = [
  {
    id: 'try-experiences',
    title: 'Try Experiences',
    desc: 'Perfect for beginners. Experience scuba safely in shallow water with professional supervision.',
    img: CAROUSEL_IMAGES[0],
  },
  {
    id: 'certification',
    title: 'Certification Pathway',
    desc: 'From PADI Scuba Diver to Advanced Open Water, start or continue your certification journey.',
    img: CAROUSEL_IMAGES[1],
  },
  {
    id: 'rescue-refresher',
    title: 'Rescue & Refresher',
    desc: 'Emergency First Response, Rescue Diver courses, and skills refreshers.',
    img: CAROUSEL_IMAGES[2],
  },
  {
    id: 'fun-dives',
    title: 'Fun Dives',
    desc: 'Leisure dive packages for certified divers. Night dives, dawn dives, and more.',
    img: CAROUSEL_IMAGES[3],
  },
  {
    id: 'snorkeling',
    title: 'Snorkeling',
    desc: 'Discover the reefs from the surface with our guided snorkeling experiences.',
    img: CAROUSEL_IMAGES[4],
  },
  {
    id: 'combos',
    title: 'Combos',
    desc: 'Bundled options for a complete experience, like DSD + Open Water.',
    img: CAROUSEL_IMAGES[5],
  },
  {
    id: 'pro-courses',
    title: 'Pro Courses',
    desc: 'Turn your passion into a career with our Divemaster and Zero to Hero pathways.',
    img: CAROUSEL_IMAGES[0],
  },
]

export default function ProgramsPreview() {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef
      const scrollAmount = direction === 'left' ? -current.offsetWidth / 1.5 : current.offsetWidth / 1.5
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <section id="programs" className="relative py-24 sm:py-32 scroll-mt-20 pointer-events-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h2 className="font-heading text-h2 font-extrabold text-white">
              Explore Our <em className="font-heading italic font-bold text-accent">Programs</em>
            </h2>
            <p className="mt-3 max-w-lg text-white/70">
              From your very first breath underwater to professional divemaster certifications.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => scroll('left')} 
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10 hover:border-white/40"
              aria-label="Scroll left"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button 
              onClick={() => scroll('right')} 
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10 hover:border-white/40"
              aria-label="Scroll right"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
            <Link to="/book-us" className="hidden lg:block ml-4 font-heading text-sm font-bold text-accent transition duration-hover hover:text-white whitespace-nowrap">
              View Full Schedule →
            </Link>
          </div>
        </SectionReveal>

        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {PROGRAMS.map((program) => (
            <div key={program.id} className="w-[85vw] sm:w-[45vw] lg:w-[30vw] flex-shrink-0 snap-start">
              <Card program={program} />
            </div>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center lg:hidden">
          <Link to="/book-us" className="font-heading text-sm font-bold text-accent transition duration-hover hover:text-white">
            View Full Schedule →
          </Link>
        </div>
      </div>
      
      {/* Hide scrollbar for webkit directly via style tag just in case */}
      <style>{`
        #programs .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}

function Card({ program }) {
  return (
    <div className="flex h-full flex-col rounded-card glass-premium p-4 shadow-soft transition duration-hover hover:-translate-y-1 hover:shadow-card">
      <div className="aspect-video w-full rounded-lg overflow-hidden mb-5">
        <img src={program.img} alt={program.title} className="w-full h-full object-cover" />
      </div>
      <h3 className="font-heading text-xl font-bold text-white">{program.title}</h3>
      <p className="mt-3 flex-1 text-sm text-white/70">{program.desc}</p>
      <Button
        as={Link}
        to={`/book-us?program=${program.id}`}
        variant="secondary"
        className="mt-6 w-full justify-center !border-0 !bg-white/20 !text-white hover:!bg-accent hover:!text-white backdrop-blur-sm"
      >
        Book This Program
      </Button>
    </div>
  )
}
