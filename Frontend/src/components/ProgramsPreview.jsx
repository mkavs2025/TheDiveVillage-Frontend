import { useRef } from 'react'
import { Link } from 'react-router'
import SectionReveal, { StaggerGrid, StaggerItem } from './SectionReveal'
import Button from './Button'
import { CAROUSEL_IMAGES } from '../utils/images'

const PROGRAMS = [
  {
    id: 'merch',
    title: 'Dive Village Merch',
    desc: 'Take a piece of the ocean home with our exclusive dive apparel and accessories.',
    img: CAROUSEL_IMAGES[2],
    link: '/shop',
    btnText: 'Shop Now',
  },
  {
    id: 'try-experiences',
    title: 'Try Experiences',
    desc: 'Perfect for beginners. Experience scuba safely in shallow water with professional supervision.',
    img: CAROUSEL_IMAGES[0],
    link: '/book-us?program=try-experiences',
    btnText: 'Book This Program',
  },
  {
    id: 'certification',
    title: 'Certification Pathway',
    desc: 'From PADI Scuba Diver to Advanced Open Water, start or continue your certification journey.',
    img: CAROUSEL_IMAGES[1],
    link: '/book-us?program=certification',
    btnText: 'Book This Program',
  },
]

export default function ProgramsPreview() {
  return (
    <section id="programs" className="relative py-24 sm:py-32 scroll-mt-20 pointer-events-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal className="mb-16 flex flex-col items-center text-center">
          <h2 className="font-heading text-h2 font-bold text-white">
            <em className="font-heading italic font-bold text-accent">Explore</em>
          </h2>
          <p className="mt-3 max-w-lg mx-auto text-white/70">
            From your very first breath underwater to professional divemaster certifications.
          </p>
          <Link to="/book-us" className="mt-6 font-heading text-sm font-bold text-accent transition duration-hover hover:text-white whitespace-nowrap">
            View Full Schedule →
          </Link>
        </SectionReveal>

        <StaggerGrid className="grid gap-6 md:grid-cols-3">
          {PROGRAMS.map((program) => (
            <StaggerItem key={program.id}>
              <Card program={program} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
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
        to={program.link}
        variant="secondary"
        className="mt-6 w-full justify-center !border-0 !bg-white/20 !text-white hover:!bg-accent hover:!text-white backdrop-blur-sm"
      >
        {program.btnText}
      </Button>
    </div>
  )
}
