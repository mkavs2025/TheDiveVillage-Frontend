import { useState } from 'react'
import { Link } from 'react-router'
import { motion, useReducedMotion } from 'framer-motion'
import Button from '../components/Button'
import SafeImage from '../components/SafeImage'
import { IMAGES, CAROUSEL_IMAGES } from '../utils/images'

const SERVICES_DATA = [
  {
    id: 'service-1',
    category: 'diving',
    title: 'Try Dive',
    subtitle: 'Beginner / Try Experiences',
    badge: 'Popular',
    desc: 'Experience scuba safely in shallow water with professional supervision. Perfect for absolute beginners.',
    duration: '1 Day',
    price: 'Contact Us',
    inclusions: ['Professional supervision', 'Shallow water training', 'Equipment included', 'Min Age 8'],
    image: IMAGES.scubaHero,
    link: '/courses/scuba',
    ctaText: 'Book Now',
  },
  {
    id: 'service-2',
    category: 'diving',
    title: 'PADI Open Water Diver',
    subtitle: 'Certification Pathway',
    badge: 'Certification',
    desc: 'Learn essential dive theory and complete open water dives to become a certified diver.',
    duration: '3-4 Days',
    price: 'Contact Us',
    inclusions: ['Dive theory', 'Open water dives', 'PADI Certification', 'Equipment handling'],
    image: CAROUSEL_IMAGES[1],
    link: '/book-us',
    ctaText: 'Start Course',
  },
  {
    id: 'service-3',
    category: 'snorkeling',
    title: 'Discover Snorkeling',
    subtitle: 'Non-Divers',
    badge: 'Relaxing',
    desc: 'Explore the reef from the surface. Discover snorkeling and experience the ocean up close.',
    duration: 'Half Day',
    price: 'Contact Us',
    inclusions: ['Snorkel guide', 'Mask & fins', 'Reef exploration', 'No experience needed'],
    image: IMAGES.snorkelingHero,
    link: '/courses/snorkeling',
    ctaText: 'Explore',
  },
  {
    id: 'service-4',
    category: 'freediving',
    title: 'PADI Skin Diver',
    subtitle: 'Certification Pathway',
    badge: 'Breath-hold',
    desc: 'Focus on breath-hold diving and safe descents. Explore the ocean with just your natural abilities.',
    duration: '1-2 Days',
    price: 'Contact Us',
    inclusions: ['Breath-hold training', 'Safe descents', 'Equipment provided', 'Certification'],
    image: IMAGES.surfingHero,
    link: '/courses/surfing',
    ctaText: 'Learn More',
  },
  {
    id: 'service-5',
    category: 'combos',
    title: 'PADI DSD + Open Water',
    subtitle: 'Bundled Options',
    badge: 'Combo',
    desc: 'Combine Discover Scuba Dive with the full Open Water certification for a comprehensive experience.',
    duration: '3-4 Days',
    price: 'Contact Us',
    inclusions: ['DSD Experience', 'Open Water Course', 'Bundled discount', 'PADI Certification'],
    image: IMAGES.gear1,
    link: '/book-us',
    ctaText: 'Book Combo',
  },
  {
    id: 'service-6',
    category: 'pro',
    title: 'PADI Divemaster',
    subtitle: 'Career Path',
    badge: 'Professional',
    desc: 'Take the first step in your dive career. Learn to lead dives and assist instructors.',
    duration: '20-25 Days',
    price: 'Contact Us',
    inclusions: ['Professional training', 'Dive leadership', 'Safety protocols', 'Career guidance'],
    image: CAROUSEL_IMAGES[0],
    link: '/contact',
    ctaText: 'Go Pro',
  },
  {
    id: 'service-7',
    category: 'diving',
    title: 'Fun Dives',
    subtitle: 'Leisure Add-ons',
    badge: 'Packages',
    desc: 'Flexible fun dive packages including Night Dives and Dawn Dives for certified divers.',
    duration: '1 to 12 Dives',
    price: 'Contact Us',
    inclusions: ['Guided dives', 'Night/Dawn options', 'Flexible scheduling', 'Equipment rental available'],
    image: CAROUSEL_IMAGES[5],
    link: '/contact',
    ctaText: 'View Packages',
  },
  {
    id: 'service-8',
    category: 'diving',
    title: 'PADI Rescue Diver',
    subtitle: 'Certification Pathway',
    badge: 'Advanced',
    desc: 'Learn to manage dive emergencies. A crucial step in expanding your diving knowledge and experience.',
    duration: '3-4 Days',
    price: 'Contact Us',
    inclusions: ['Emergency management', 'Rescue scenarios', 'First response', 'Confidence building'],
    image: CAROUSEL_IMAGES[4],
    link: '/contact',
    ctaText: 'Learn Rescue',
  },
]

const CATEGORIES = [
  { key: 'all', label: 'All Services' },
  { key: 'diving', label: 'Scuba Diving' },
  { key: 'snorkeling', label: 'Snorkeling' },
  { key: 'freediving', label: 'Freediving' },
  { key: 'combos', label: 'Combos' },
  { key: 'pro', label: 'Pro Courses' },
]

export default function Services() {
  const [activeTab, setActiveTab] = useState('all')
  const reduce = useReducedMotion()

  const filtered = activeTab === 'all' 
    ? SERVICES_DATA 
    : SERVICES_DATA.filter((s) => s.category === activeTab)

  return (
    <div className="bg-[#FAFAFA] min-h-screen text-navy font-body pt-24 sm:pt-32 pb-24 overflow-x-hidden" style={{ textShadow: 'none' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* 1. HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
          <div>
            <span className="inline-block bg-black/5 rounded-full px-4 py-1.5 text-xs font-bold text-navy/60 uppercase tracking-widest mb-4">
              What We Offer
            </span>
            <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-navy leading-none">
              Our Services
            </h1>
          </div>
          <p className="max-w-md text-base sm:text-lg font-medium text-navy/70 leading-relaxed lg:pb-4">
            From beginner certifications and reef safaris to full island logistics and gear rentals — everything you need for the ultimate ocean adventure.
          </p>
        </div>

        {/* 2. CATEGORY FILTER TABS */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-16 border-b border-navy/10 pb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeTab === cat.key
                  ? 'bg-navy text-white shadow-md'
                  : 'bg-[#F0F2F5] text-navy/70 hover:bg-navy/10 hover:text-navy'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 3. SERVICES GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 sm:gap-10 mb-24">
          {filtered.map((service, i) => (
            <motion.div
              key={service.id}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-[36px] bg-white border border-navy/5 overflow-hidden shadow-card hover:shadow-float transition duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image header */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-navy/10">
                  <SafeImage
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-navy shadow-sm">
                      {service.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between text-white">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-accent font-bold block mb-1">
                        {service.subtitle}
                      </span>
                      <h3 className="font-heading text-2xl font-bold">{service.title}</h3>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <p className="text-sm text-navy/75 leading-relaxed mb-6">
                    {service.desc}
                  </p>

                  <div className="grid grid-cols-1 gap-4 py-4 border-y border-navy/10 mb-6 bg-[#FAFAFA] rounded-2xl p-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-navy/50 block">Duration</span>
                      <span className="font-bold text-navy text-sm">{service.duration}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-navy/60 mb-3">Key Inclusions:</h4>
                    <ul className="space-y-2 mb-6">
                      {service.inclusions.map((inc, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-navy/80">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00AEC7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0">
                <Button
                  as={Link}
                  to={service.link}
                  className="w-full justify-center bg-navy text-white hover:bg-accent hover:text-white transition-all shadow-sm"
                >
                  {service.ctaText} →
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 4. WHY CHOOSE OUR SERVICES */}
        <div className="rounded-[40px] bg-[#F0F2F5] p-8 sm:p-14 mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-navy/60 font-bold tracking-widest uppercase text-xs mb-3 block">Why The Village</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy">The Dive Village Difference</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-soft text-center">
              <div className="w-14 h-14 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-5 text-2xl font-bold">
                1
              </div>
              <h3 className="font-heading text-lg font-bold text-navy mb-2">Small Group Ratios</h3>
              <p className="text-xs text-navy/70 leading-relaxed">
                Maximum 4 divers per instructor for personalized attention, relaxed pacing, and supreme safety.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-soft text-center">
              <div className="w-14 h-14 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-5 text-2xl font-bold">
                2
              </div>
              <h3 className="font-heading text-lg font-bold text-navy mb-2">Pristine Dive Sites</h3>
              <p className="text-xs text-navy/70 leading-relaxed">
                Access to uncrowded coral walls, clear lagoons, and thriving marine sanctuaries away from tourist hordes.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-soft text-center">
              <div className="w-14 h-14 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-5 text-2xl font-bold">
                3
              </div>
              <h3 className="font-heading text-lg font-bold text-navy mb-2">End-to-End Care</h3>
              <p className="text-xs text-navy/70 leading-relaxed">
                From your flight landing to your logbook signing, we take care of permits, transport, gear, and stay.
              </p>
            </div>
          </div>
        </div>

        {/* 5. CALL TO ACTION */}
        <div className="rounded-[40px] bg-navy text-white p-10 sm:p-16 lg:p-20 relative overflow-hidden shadow-lift">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <span className="inline-block bg-white/10 rounded-full px-4 py-1.5 text-xs font-bold text-accent uppercase tracking-widest mb-6">
              Custom Requirements?
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white mb-6">
              Need a Custom Group or Private Charter?
            </h2>
            <p className="text-lg text-white/80 max-w-xl mb-10 leading-relaxed">
              We organize private boat charters, corporate team ocean retreats, family dive camps, and personalized multi-day dive expeditions.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Button as={Link} to="/contact" className="bg-accent text-navy hover:bg-white hover:text-navy border-none">
                Request Custom Package →
              </Button>
              <a
                href="tel:+918971001010"
                className="rounded-full border border-white/30 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10 flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
                Call Us: +91 89710 01010
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
