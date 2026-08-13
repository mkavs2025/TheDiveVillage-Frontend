import { lazy, Suspense, useState, useEffect } from 'react'
import { Link } from 'react-router'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import Button from '../components/Button'
import SafeImage from '../components/SafeImage'
import SectionReveal, { StaggerGrid, StaggerItem } from '../components/SectionReveal'
import { IMAGES, CAROUSEL_IMAGES } from '../utils/images'
import VideoSphereBackground from '../components/VideoSphereBackground'
import rayImg from '../assets/ray.png'
import turtleImg from '../assets/rayy.png'
const AboutSection = lazy(() => import('../components/AboutSection'))
const ProgramsPreview = lazy(() => import('../components/ProgramsPreview'))
const TrainingSafety = lazy(() => import('../components/TrainingSafety'))
const GalleryPreview = lazy(() => import('../components/GalleryPreview'))

const WHY = [
  {
    title: 'Authentic Experiences',
    desc: 'Community-driven dive experiences tailored to every individual.',
    icon: GroupIcon,
  },
  {
    title: 'Expert Instructors',
    desc: 'Top-tier safety practices guided by experienced professionals.',
    icon: InstructIcon,
  },
  {
    title: 'Inclusive Environment',
    desc: 'A welcoming space for enthusiastic beginners and seasoned pros alike.',
    icon: TrainIcon,
  },
  {
    title: 'Ocean Stewardship',
    desc: 'Sustainability and marine conservation at the core of everything we do.',
    icon: OceanIcon,
  },
  {
    title: 'Seamless Journeys',
    desc: 'From travel to stay, we ensure your trip is hassle-free.',
    icon: SupportIcon,
  },
]

const POWER = [
  {
    title: 'Unique Skill Development',
    desc: 'Builds confidence, discipline, and responsibility through mastering safety protocols and equipment handling.',
  },
  {
    title: 'Physical & Mental Growth',
    desc: "Enhances fitness, focus, and stress management. It's not just adventure — it's therapy, delivered by nature herself.",
  },
  {
    title: 'STEM Integration',
    desc: 'Connects to biology, physics (pressure, buoyancy), and environmental science.',
  },
  {
    title: 'Global Citizenship',
    desc: 'Instils respect for oceans and sustainability.',
  },
]

export default function Home() {
  const reduce = useReducedMotion()

  return (
    <div className="overflow-x-hidden relative isolate pointer-events-none">
      {/* Interactive 360 Video Background for entire page */}
      <Suspense fallback={<div className="fixed inset-0 -z-10 bg-navy" />}>
        <VideoSphereBackground />
      </Suspense>

      {/* 1. HERO */}
      <section className="relative -mt-16 flex min-h-screen items-center justify-start pt-16 sm:-mt-[72px] sm:pt-[72px] pointer-events-none">

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pointer-events-none">
          <div className="max-w-3xl">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto"
            >
              <span className="inline-flex rounded-full bg-white/20 px-4 py-1.5 text-[11px] font-heading font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                More Than a Destination
              </span>
              <h1 className="mt-5 font-heading text-5xl font-extrabold tracking-wide text-white text-balance sm:text-6xl md:text-[5.5rem] md:leading-[1.1]">
                It's a <em className="not-italic font-heading italic font-bold text-[#064979]">Community</em>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-white/90 sm:text-xl">
                The Dive Village was born from a simple belief: that the life-changing magic of the ocean is a feeling meant to be shared.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button as={Link} to="/book-us" className="bg-accent text-navy hover:bg-white hover:text-navy border-none shadow-none">
                  Book Your Dive
                  <ArrowIcon />
                </Button>
                <Link
                  to="/shop"
                  className="font-heading text-sm font-bold text-white transition duration-hover hover:text-accent"
                >
                  Explore Shop →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 justify-center text-white/70"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </section>

      {/* 2. THE CALL OF THE OCEAN */}
      <section className="relative z-10 pb-24 pt-16 sm:pt-20 pointer-events-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-h2 font-extrabold text-white">
                What Diving <em className="font-heading italic font-bold text-accent">Truly Means</em>
              </h2>
              <p className="mt-4 text-lg text-white/70 leading-relaxed">
                Diving is more than an activity — it's an awakening of the senses. Below the waves, silence deepens. Each breath, a conscious choice. Each moment, fully yours. The underwater world transforms chaos into calm and sound into serenity.
              </p>
              <blockquote className="mt-12 border-l-2 border-accent pl-6 text-left font-heading text-xl italic text-white sm:text-2xl">
                "To dive is to discover yourself — one breath at a time."
              </blockquote>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* 3. ABOUT SANJEEV */}
      <div id="about-section" className="pointer-events-auto">
        <Suspense fallback={<div className="py-20 text-center text-navy/50">Loading Story...</div>}>
          <AboutSection />
        </Suspense>
      </div>

      {/* 4. WHO CAN DIVE */}
      <section className="relative py-24 sm:py-32 pointer-events-auto">
        <motion.img 
          src={turtleImg} 
          alt="Turtle" 
          className="absolute left-[-10%] sm:left-[5%] top-20 w-[150px] sm:w-[250px] opacity-20 pointer-events-none mix-blend-screen -rotate-12"
          animate={{ y: [0, -40, 0], x: [0, 20, 0], rotate: [-12, -8, -12] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal className="mb-16 text-center">
            <h2 className="font-heading text-h2 font-extrabold text-white">
              The Ocean <em className="font-heading italic font-bold text-accent">Welcomes All</em>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              You don't need to be an athlete or an expert to dive — only curious enough to explore.
            </p>
          </SectionReveal>

          <StaggerGrid className="grid gap-8 lg:gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: 'Enthusiastic Beginners', img: CAROUSEL_IMAGES[0] },
              { t: 'Families, Couples & Groups', img: CAROUSEL_IMAGES[1] },
              { t: 'Professionals Across Industries', img: CAROUSEL_IMAGES[2] },
              { t: 'Adventure Seekers', img: CAROUSEL_IMAGES[3] }
            ].map((item, i) => (
              <StaggerItem key={i}>
                <div className="h-full rounded-card glass-premium p-4 shadow-soft transition duration-hover hover:-translate-y-1 hover:shadow-card flex flex-col gap-4">
                  <div className="aspect-[4/3] w-full rounded-lg overflow-hidden">
                    <img src={item.img} alt={item.t} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-white text-center">{item.t}</h3>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>

          <SectionReveal className="mt-12 text-center">
            <p className="font-heading text-lg font-bold text-white">
              If you can breathe, you can dive. The sea has space for everyone.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* 5. WHAT IS DIVING & POWER OF DIVING */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal className="mb-20 rounded-3xl glass-premium p-8 sm:p-14">
            <h2 className="font-heading text-3xl font-extrabold text-white text-center mb-6">What is Scuba Diving?</h2>
            <p className="text-center text-lg text-white/70 max-w-4xl mx-auto leading-relaxed">
              Scuba diving is a form of underwater diving where divers use a Self-Contained Underwater Breathing Apparatus (SCUBA) to breathe while exploring beneath the surface. Unlike snorkeling or freediving, scuba divers carry their own source of breathing gas in tanks, allowing extended time underwater.
            </p>
          </SectionReveal>

          <SectionReveal className="mb-16 text-center">
            <h2 className="font-heading text-h2 font-extrabold text-white">
              The Power of <em className="font-heading italic font-bold text-accent">Diving</em>
            </h2>
          </SectionReveal>

          <StaggerGrid className="grid gap-8 lg:gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {POWER.map((p, i) => (
              <StaggerItem key={i}>
                <div className="h-full rounded-card glass-premium p-8 shadow-soft transition duration-hover hover:-translate-y-1 hover:shadow-card">
                  <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white font-bold text-lg">{i + 1}</span>
                  <h3 className="font-heading text-xl font-bold text-white">{p.title}</h3>
                  <p className="mt-3 text-sm text-white/70 leading-relaxed">{p.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* 5. COURSES & TRIPS PREVIEW */}
      <div id="programs-section" className="pointer-events-auto">
        <Suspense fallback={<div className="py-20 text-center text-navy/50">Loading Programs...</div>}>
          <ProgramsPreview />
        </Suspense>
      </div>

      {/* 7. TRAINING & SAFETY */}
      <div className="pointer-events-auto">
        <Suspense fallback={<div className="py-20 text-center text-navy/50">Loading Training...</div>}>
          <TrainingSafety />
        </Suspense>
      </div>

      {/* 6. WHY DIVE VILLAGE */}
      <section className="relative py-24 text-white sm:py-32 pointer-events-auto">
        <motion.img 
          src={rayImg} 
          alt="Manta Ray" 
          className="absolute right-[-15%] sm:right-[5%] top-1/4 w-[250px] sm:w-[400px] opacity-20 pointer-events-none mix-blend-screen rotate-12"
          animate={{ y: [0, -60, 0], x: [0, -40, 0], rotate: [12, 18, 12] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="font-heading text-h2 font-extrabold text-white">
              From Journey to Stay — <em className="font-heading italic font-bold text-accent">We've Got You Covered</em>
            </h2>
          </SectionReveal>
          <div className="grid gap-8 lg:gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Travel Logistics', desc: 'Guidance on flights, permits, and island transfers.', img: CAROUSEL_IMAGES[4] },
              { title: 'Comfortable Stays', desc: 'Comfortable beachside stays and eco-lodges.', img: CAROUSEL_IMAGES[5] },
              { title: 'Local Cuisine', desc: 'Local cuisine prepared with warmth and authenticity.', img: CAROUSEL_IMAGES[0] },
              { title: 'Personal Itineraries', desc: 'Personalized itineraries for solo travelers, couples, or groups.', img: CAROUSEL_IMAGES[1] },
            ].map((item, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div className="h-full rounded-card glass-premium p-8 shadow-soft text-center flex flex-col gap-6 items-center">
                  <div className="aspect-square w-24 rounded-full overflow-hidden border-2 border-white/20">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm text-white/70">{item.desc}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. GALLERY PREVIEW */}
      <div className="pointer-events-auto">
        <Suspense fallback={<div className="py-20 text-center text-navy/50">Loading Gallery...</div>}>
          <GalleryPreview />
        </Suspense>
      </div>


      {/* CLOSING CTA WITH CAROUSEL */}
      <section className="py-16 sm:py-24 bg-transparent pointer-events-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <AutoCarousel images={CAROUSEL_IMAGES} />
          </SectionReveal>
        </div>
      </section>
    </div>
  )
}

function AutoCarousel({ images }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 2000)
    return () => clearInterval(timer)
  }, [images.length])

  return (
    <div className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] shadow-float w-full h-[400px] lg:h-[450px]">
      <AnimatePresence>
        <motion.img
          key={index}
          src={images[index]}
          alt="Ocean Journey"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-navy/10 mix-blend-multiply z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/40 to-transparent z-10" />
      
      <div className="absolute inset-0 z-20 flex flex-col justify-center p-8 sm:p-12 lg:p-16">
        <div className="max-w-xl">
          <span className="inline-block text-accent font-heading font-bold uppercase tracking-widest text-xs mb-4">
            The Sea is Calling
          </span>
          <h3 className="font-heading text-4xl sm:text-5xl lg:text-5xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
            Come for the adventure.<br/>
            <span className="text-white/60">Stay for the calm.</span>
          </h3>
          <p className="text-white/80 font-medium text-base sm:text-lg mb-8 max-w-sm">
            Leave with stories that last a lifetime.
          </p>
          <Button
            as={Link}
            to="/book-us"
            variant="secondary"
            className="!bg-white !text-navy !border-0 hover:!bg-accent hover:!text-white shadow-sm transition-all duration-300 hover:scale-105"
          >
            Book Your Dive
            <ArrowIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function InstructIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 19c1.2-3.5 3.8-5 7-5s5.8 1.5 7 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function SupportIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 12a8 8 0 0116 0v5a2 2 0 01-2 2h-2v-6h4M4 13h4v6H6a2 2 0 01-2-2v-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}

function TrainIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 19h16M7 19V7l5-3 5 3v12" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}

function GroupIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 19c0-3 2.5-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function OceanIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 14c2 1 3 1 5 0s3-1 5 0 3 1 5 0 3-1 3 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M3 18c2 1 3 1 5 0s3-1 5 0 3 1 5 0 3-1 3 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
