import { lazy, Suspense, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import Button from '../components/Button'
import SafeImage from '../components/SafeImage'
import SectionReveal, { StaggerGrid, StaggerItem } from '../components/SectionReveal'
import { IMAGES, CAROUSEL_IMAGES } from '../utils/images'
import img1 from '../assets/1.png'
import img2 from '../assets/2.png'
import img3 from '../assets/3.png'
import img4 from '../assets/4.png'
const ProgramsPreview = lazy(() => import('../components/ProgramsPreview'))

const GalleryPreview = lazy(() => import('../components/GalleryPreview'))
const InteractiveDiveMap = lazy(() => import('../components/InteractiveDiveMap'))


const HIGHLIGHTS_DATA = [
  {
    id: 'scuba',
    title: 'Introductory Programs',
    desc: 'Experience scuba safely in shallow water with professional supervision.',
    image: IMAGES.scubaHero,
    link: '/services',
    btnText: 'Explore'
  },
  {
    id: 'snorkeling',
    title: 'Guided Snorkeling',
    desc: 'Discover snorkeling and explore the ocean up close. The ocean welcomes all.',
    image: IMAGES.snorkelingHero,
    link: '/services',
    btnText: 'Explore'
  },
  {
    id: 'courses',
    title: 'Certified Courses',
    desc: 'From your very first breath underwater to professional divemaster certifications.',
    image: IMAGES.hero,
    link: '/services',
    btnText: 'Explore'
  },
  {
    id: 'surfing',
    title: 'Freediving',
    desc: 'Breath-hold freediving to explore the ocean with just your natural abilities.',
    image: IMAGES.surfingHero,
    link: '/services',
    btnText: 'Explore'
  },
  {
    id: 'products',
    title: 'Flexible Fun Dives',
    desc: 'Every experience is a step deeper into the world of the ocean.',
    image: IMAGES.gear1,
    link: '/services',
    btnText: 'Explore'
  },
]

const TESTIMONIALS = [
  {
    name: "Alex Johnson",
    role: "PADI Open Water Diver",
    text: "The Dive Village completely changed my perspective on the ocean. The instructors were incredibly patient, and the focus on safety made my first dive an unforgettable and peaceful experience.",
    image: CAROUSEL_IMAGES[1]
  },
  {
    name: "Maria Garcia",
    role: "Marine Biologist",
    text: "I've dived all over the world, but the dedication to eco-stewardship here is unmatched. It's inspiring to see a dive center that truly cares about coral restoration and leaving no trace.",
    image: CAROUSEL_IMAGES[2]
  },
  {
    name: "David Chen",
    role: "Advanced Adventurer",
    text: "From the seamless booking process to the personalized dive charters, everything was flawless. A vibrant community that genuinely feels like a second home beneath the waves.",
    image: CAROUSEL_IMAGES[0]
  }
]

export default function Home() {
  const reduce = useReducedMotion()
  const navigate = useNavigate()

  return (
    <div className="overflow-x-hidden relative isolate pointer-events-none">

      {/* 1. HERO */}
      <section className="relative -mt-16 flex min-h-screen items-end justify-start pb-8 pt-32 sm:-mt-[72px] sm:pb-16 sm:pt-[120px] pointer-events-none">

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pointer-events-none">
          <div className="max-w-3xl">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto"
            >
              <h1 className="mt-5 font-heading text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[7rem] font-bold uppercase tracking-normal text-white leading-[0.9] flex flex-col drop-shadow-2xl">
                <span className="block text-[0.35em] tracking-[0.1em] mb-2 opacity-90">MORE THAN A DESTINATION</span>
                <span className="block text-white mb-2">IT IS A</span>
                <span className="block text-[#FFCD00]">COMMUNITY.</span>
              </h1>
              <div className="mt-6 h-1 w-20 bg-[#FFCD00]"></div>
              <p className="mt-8 max-w-2xl text-lg sm:text-xl md:text-2xl font-medium text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-relaxed">
                The life-changing magic of the ocean<br />Is a feeling meant to be shared.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Link
                  to="/book-us"
                  className="rounded-full bg-accent px-8 py-4 font-body text-xs sm:text-sm tracking-widest font-bold text-navy uppercase transition-all duration-300 hover:scale-105 hover:bg-white flex items-center gap-3"
                >
                  Book Your Dive
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </Link>
                <Link
                  to="/shop"
                  className="rounded-full border border-white bg-white px-8 py-4 font-body text-xs sm:text-sm tracking-widest font-bold text-navy uppercase transition-all duration-300 hover:bg-navy hover:text-white"
                >
                  Shop Merch
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar overlay */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-2 left-0 right-0 w-full px-6 lg:px-12 flex items-center justify-center pointer-events-none text-white font-body text-xs tracking-widest font-bold uppercase opacity-80"
        >
          {/* Center: Scroll to explore */}
          <div className="flex flex-col items-center gap-2">
            <svg width="20" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-1"><rect x="5" y="2" width="14" height="20" rx="7"></rect><path d="M12 6v4"></path></svg>
            <span className="text-[10px] text-white/70">SCROLL TO EXPLORE</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFCD00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"></path><path d="m19 12-7 7-7-7"></path></svg>
          </div>
        </motion.div>
      </section >

      {/* HIGHLIGHTS */}
      <section 
        onClick={() => {
          navigate('/services')
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        className="relative z-10 pb-24 pt-16 sm:pt-20 pointer-events-auto cursor-pointer"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal className="mb-12 flex flex-col items-center text-center">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] leading-tight">
              Explore Our <span className="text-[#FFCD00] italic">Programs</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-white/90 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              From your very first breath underwater to professional divemaster certifications.
            </p>
          </SectionReveal>
          <SectionReveal>
            <InteractiveHighlights />
          </SectionReveal>
        </div>
      </section>



      {/* 4. WHO CAN DIVE */}
      < section id="who-can-dive-section" className="relative py-24 sm:py-32 pointer-events-auto" >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal className="mb-16 flex flex-col items-center text-center">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] leading-tight">
              The Ocean <span className="text-[#FFCD00] italic">Welcomes All</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-white/90 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              You don't need to be an athlete or an expert to dive<br />Only curious enough to explore.
            </p>
          </SectionReveal>

          <StaggerGrid className="grid gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-24">
            {[
              {
                t: 'Enthusiastic Beginners',
                img: img1,
                desc: "New to diving? Start your journey with confidence. We'll guide you every step of the way."
              },
              {
                t: 'Families, Couples & Groups',
                img: img2,
                desc: "Shared memories. Deeper connections. Perfect experiences for the people who matter most."
              },
              {
                t: 'Professionals Across Industries',
                img: img3,
                desc: "For those who work beneath the surface. Training, support and solutions you can rely on."
              },
              {
                t: 'Adventure Seekers',
                img: img4,
                desc: "For the bold, the curious and the ocean lovers. Explore more. Dive deeper. Live the adventure."
              }
            ].map((item, i) => (
              <StaggerItem key={i}>
                <div className="h-full group cursor-pointer relative mt-8 flex flex-col">
                  
                  {/* Floating transparent PNG image - dynamic positioning & sizing */}
                  <img 
                    src={item.img} 
                    alt={item.t} 
                    className={`absolute left-1/2 -translate-x-1/2 h-auto object-contain transition-transform duration-500 group-hover:-translate-y-4 drop-shadow-2xl z-20 pointer-events-none ${
                      i === 2 
                        ? 'top-2 w-[75%] max-w-[180px]' 
                        : 'top-2 sm:top-4 w-[100%] max-w-[260px]'
                    }`} 
                  />
                  
                  {/* Actual Card Background & Content with overflow-hidden */}
                  <div className="h-full w-full rounded-2xl overflow-hidden border border-white/20 relative flex flex-col p-6 sm:p-8 pt-44 sm:pt-48 z-10 transition duration-500 group-hover:border-white/40 bg-[#001D3D]">
                    
                    {/* Background Image - stays static */}
                    <img 
                      src={CAROUSEL_IMAGES[2]} 
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity z-0" 
                    />
                    
                    {/* Content wrapper - pushed to bottom */}
                    <div className="relative z-10 flex flex-col h-full mt-auto">
                      <h3 className="font-heading text-lg sm:text-xl font-bold text-white uppercase tracking-wider mb-4 leading-tight text-left">
                        {item.t}
                      </h3>
                      
                      {/* Yellow divider */}
                      <div className="w-8 h-[3px] bg-[#FFCD00] mb-5"></div>
                      
                      {/* Description text - justified */}
                      <p className="text-white/80 text-sm font-medium mb-8 leading-relaxed text-justify">
                        {item.desc}
                      </p>
                      
                      {/* Button */}
                      <div>
                        <div className="inline-flex items-center gap-2 font-body text-xs font-bold uppercase tracking-widest bg-[#FFCD00] text-[#001D3D] border-2 border-[#FFCD00] rounded-full px-5 py-2.5 transition-all duration-300 group-hover:bg-white group-hover:border-white">
                          <span>Dive In</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section >

      {/* 7. TESTIMONIALS */}
      <section className="relative py-24 sm:py-32 pointer-events-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#FFCD00] font-bold tracking-widest uppercase text-xs mb-3 block">
              Community Voices
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
              What Our Divers Say
            </h2>
            <p className="mt-4 text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              Don't just take our word for it. Hear from the community of ocean lovers who have dived with us.
            </p>
          </SectionReveal>

          <StaggerGrid className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <StaggerItem key={i}>
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-card hover:-translate-y-2 transition duration-500">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-5 h-5 text-[#FFCD00]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-white/90 italic mb-8 leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30">
                      <SafeImage src={t.image} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{t.name}</h4>
                      <span className="text-xs text-white/60">{t.role}</span>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* 5. COURSES & TRIPS PREVIEW */}
      < div id="programs-section" className="pointer-events-auto relative z-10" >
        <Suspense fallback={<div className="py-20 text-center text-navy/50">Loading Programs...</div>}>
          <ProgramsPreview />
        </Suspense>
      </div >


      {/* 6. AIRPORT TO AIRPORT - HOSPITALITY */}
      <section className="relative py-24 text-white sm:py-32 pointer-events-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16 max-w-3xl mx-auto">
            <span className="inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-xs font-bold text-accent uppercase tracking-widest mb-4 shadow-sm">
              End-to-End Island Care
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg mb-4">
              From Airport to Airport — <span className="text-accent italic font-bold">We've Got You Covered</span>
            </h2>
            <p className="text-base sm:text-lg text-white/80 font-medium leading-relaxed drop-shadow-md">
              Relax and immerse yourself in the ocean. We handle every detail of your island holiday from arrival to departure.
            </p>
          </SectionReveal>

          <StaggerGrid className="grid gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                num: '01',
                title: 'Travel Logistics',
                desc: 'Seamless assistance with flight bookings, mandatory entry permits, and local island boat transfers.',
                img: CAROUSEL_IMAGES[4],
                tag: 'Flights & Permits'
              },
              {
                num: '02',
                title: 'Comfortable Stays',
                desc: 'Handpicked oceanfront stays, eco-lodges, and boutique beach resorts steps away from the water.',
                img: CAROUSEL_IMAGES[5],
                tag: 'Beach Resorts'
              },
              {
                num: '03',
                title: 'Local Cuisine',
                desc: 'Authentic coastal meals and fresh island dining prepared with warmth and local culinary traditions.',
                img: CAROUSEL_IMAGES[0],
                tag: 'Island Flavors'
              },
              {
                num: '04',
                title: 'Personal Itineraries',
                desc: 'Tailored daily schedules built around your personal diving goals, travel rhythm, and group needs.',
                img: CAROUSEL_IMAGES[1],
                tag: 'Custom Plans'
              },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <div className="group h-full rounded-[32px] bg-navy/90 backdrop-blur-xl border border-white/20 p-6 shadow-2xl transition duration-500 hover:-translate-y-2 hover:border-accent/60 hover:shadow-float flex flex-col justify-between">
                  <div>
                    {/* Top Image Card Frame */}
                    <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-6 bg-black/20 shrink-0">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent pointer-events-none" />
                      <span className="absolute top-3 left-3 bg-navy/80 backdrop-blur-md border border-white/20 text-accent text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                        {item.tag}
                      </span>
                      <span className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-md text-white font-heading font-bold text-xs px-2.5 py-1 rounded-lg border border-white/10">
                        {item.num}
                      </span>
                    </div>

                    <h3 className="font-heading text-2xl font-bold text-white tracking-tight mb-2 leading-tight">
                      {item.title}
                    </h3>
                    <div className="w-8 h-1 bg-accent rounded-full mb-4" />
                    <p className="text-white/80 text-sm leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* 8. GALLERY PREVIEW */}
      < div id="gallery-section" className="pointer-events-auto" >
        <Suspense fallback={<div className="py-20 text-center text-navy/50">Loading Gallery...</div>}>
          <GalleryPreview />
        </Suspense>
      </div >


      {/* CLOSING CTA WITH CAROUSEL */}
      < section className="py-16 sm:py-24 bg-transparent pointer-events-auto" >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <AutoCarousel images={CAROUSEL_IMAGES} />
          </SectionReveal>
        </div>
      </section >
    </div >
  )
}

function InteractiveHighlights() {
  const navigate = useNavigate()

  const handleNavigate = (e, targetLink) => {
    if (e) e.stopPropagation()
    const destination = targetLink || '/services'
    navigate(destination)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div 
      className="perspective-[1500px] mx-auto w-full max-w-[95vw] lg:max-w-7xl h-[450px] sm:h-[550px] flex items-center justify-center overflow-visible my-12 pointer-events-auto"
      style={{
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 2.5%, black 97.5%, transparent 100%)',
        maskImage: 'linear-gradient(to right, transparent 0%, black 2.5%, black 97.5%, transparent 100%)'
      }}
    >
      <div className="relative w-full h-full preserve-3d animate-spin-carousel hover:[animation-play-state:paused] pointer-events-auto">
        {[...HIGHLIGHTS_DATA, ...HIGHLIGHTS_DATA].map((current, i) => (
          <div
            key={`${current.id}-${i}`}
            className="absolute inset-0 flex items-center justify-center backface-hidden pointer-events-auto"
            style={{
              transform: `rotateY(${i * 36}deg) translateZ(clamp(300px, 60vw, 650px))`
            }}
          >
            <div
              onClick={(e) => handleNavigate(e, current.link)}
              className="w-[260px] sm:w-[320px] h-[360px] sm:h-[420px] rounded-2xl overflow-hidden shadow-2xl relative border border-white/20 bg-navy/10 group cursor-pointer pointer-events-auto z-20"
            >
              <img
                src={current.image}
                alt={current.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/40 to-transparent opacity-90 transition duration-300 pointer-events-none" />

              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end pointer-events-auto">
                <span className="inline-block text-accent font-heading font-bold uppercase tracking-widest text-[10px] mb-2 pointer-events-none">
                  Featured
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-tight mb-3 pointer-events-none">
                  {current.title}
                </h3>
                <p className="text-white/80 text-xs sm:text-sm mb-6 line-clamp-3 pointer-events-none">
                  {current.desc}
                </p>
                <button
                  type="button"
                  onClick={(e) => handleNavigate(e, current.link)}
                  className="bg-accent text-navy font-bold border-none py-2.5 px-4 text-sm w-full rounded-full shadow-md hover:bg-white transition-all duration-300 pointer-events-auto cursor-pointer relative z-30"
                >
                  {current.btnText || 'Explore'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AutoCarousel({ images, showContent = true }) {
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

      {showContent && (
        <div className="absolute inset-0 z-20 flex flex-col justify-center p-8 sm:p-12 lg:p-16">
          <div className="max-w-xl">
            <span className="inline-block text-accent font-heading font-bold uppercase tracking-widest text-xs mb-4">
              The Sea is Calling
            </span>
            <h3 className="font-heading text-4xl sm:text-5xl lg:text-5xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
              Come for the adventure.<br />
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
      )}
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
