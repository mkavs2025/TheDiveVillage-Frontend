import { Link } from 'react-router'
import { motion, useReducedMotion } from 'framer-motion'
import Button from '../components/Button'
import SafeImage from '../components/SafeImage'
import SectionReveal, { StaggerGrid, StaggerItem } from '../components/SectionReveal'
import { IMAGES, CAROUSEL_IMAGES } from '../utils/images'
import vid1 from '../assets/1.mp4'
import vid2 from '../assets/2.mp4'
import vid3 from '../assets/3.mp4'
import vid4 from '../assets/4.mp4'
const VALUES = [
  {
    title: 'Safety Without Compromise',
    desc: 'Top-tier PADI certified instructors, rigorous safety standards, and modern well-maintained gear ensure you are in safe hands at all times.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Ocean Conservation',
    desc: 'We advocate for marine ecosystem preservation through zero-waste dive policies, reef cleanups, and educating every diver on sustainable practices.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 14c2 1 3 1 5 0s3-1 5 0 3 1 5 0 3-1 3 0" />
        <path d="M3 18c2 1 3 1 5 0s3-1 5 0 3 1 5 0 3-1 3 0" />
      </svg>
    ),
  },
  {
    title: 'Inclusivity & Warmth',
    desc: 'From first-time swimmers discovering shallow coral gardens to technical deep divers, everyone is welcomed with open arms and personalized care.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21a8.38 8.38 0 0113 0" />
      </svg>
    ),
  },
  {
    title: 'Transformative Learning',
    desc: 'Diving builds focus, presence, and calm. We teach diving not just as a sport, but as a meditative journey into nature.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
]

const TEAM = [
  {
    name: 'Sanjeev Bajaj',
    role: 'Founder & Master Instructor',
    bio: 'PADI Master Scuba Diver Trainer with 15+ years of guiding expeditions across Lakshadweep and the Andamans.',
    image: IMAGES.instructor1,
  },
  {
    name: 'Sarah Chen',
    role: 'Head Marine Biologist & Instructor',
    bio: 'Specialist in coral reef ecology and underwater photography with deep passion for ocean education.',
    image: IMAGES.instructor2,
  },
  {
    name: 'Rahul Sharma',
    role: 'Lead Surf & Snorkel Specialist',
    bio: 'Lifelong ocean athlete focused on surface waters, wave kinetics, and beginner ocean acclimatization.',
    image: CAROUSEL_IMAGES[2],
  },
]

const MILESTONES = [
  { year: '2016', title: 'The Genesis', desc: 'Sanjeev completes his master instructor expedition and dreams of an open, community-driven ocean sanctuary.' },
  { year: '2019', title: 'First Dive Base', desc: 'The Dive Village opens its first physical hub with curated gear and small-group personalized dive charters.' },
  { year: '2022', title: 'Island Expansion', desc: 'Expanded into full-service dive courses, surf camps, and island logistics across Lakshadweep & Andamans.' },
  { year: 'Present', title: 'Global Ocean Family', desc: 'Over 5,000+ certified divers, zero safety incidents, and thousands of lifelong ocean ambassadors.' },
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

export default function About() {
  const reduce = useReducedMotion()

  return (
    <div className="bg-transparent min-h-screen font-body overflow-x-hidden pointer-events-none">
      
      {/* 1. HERO BANNER (Transparent to show VideoSphere) */}
      <div className="pt-32 pb-48 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pointer-events-auto text-white">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
          <div>
            <span className="inline-block bg-white/20 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
              Who We Are
            </span>
            <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-none text-white drop-shadow-lg">
              About Us
            </h1>
          </div>
          <p className="max-w-md text-base sm:text-lg font-medium text-white/90 leading-relaxed lg:pb-4 drop-shadow-lg">
            More than a dive center — The Dive Village is an ocean-loving community united by discovery, passion, and deep respect for the sea.
          </p>
        </div>
      </div>

      {/* 2. SOLID CONTENT AREA */}
      <div className="bg-[#FAFAFA] text-navy rounded-t-[40px] pt-16 sm:pt-24 pb-24 shadow-[0_-20px_40px_rgba(0,0,0,0.1)] pointer-events-auto relative z-10 mt-[-40px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">


        {/* 2. HERO VIDEO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          <div className="md:col-span-2 relative h-[380px] sm:h-[480px] rounded-[32px] overflow-hidden shadow-float group">
            <video
              src={vid1}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white pointer-events-none">
              <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">Our Sanctuary</span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold">A Home Beneath the Waves</h3>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="relative h-[180px] sm:h-[228px] rounded-[32px] overflow-hidden shadow-card group">
              <video
                src={vid2}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-navy/20 pointer-events-none" />
            </div>
            <div className="relative h-[180px] sm:h-[228px] rounded-[32px] overflow-hidden shadow-card group">
              <video
                src={vid3}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-navy/20 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 2.5 WHAT DIVING TRULY MEANS */}
        <div className="mx-auto max-w-4xl text-center mb-24 bg-white rounded-[40px] p-10 sm:p-16 shadow-soft border border-navy/5">
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-navy">
            What Diving <em className="font-heading italic font-bold text-accent">Truly Means</em>
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-navy/70 leading-relaxed max-w-3xl mx-auto">
            Diving is more than an activity — it's an awakening of the senses. Below the waves, silence deepens. Each breath, a conscious choice. Each moment, fully yours. The underwater world transforms chaos into calm and sound into serenity.
          </p>
          <blockquote className="mt-10 border-l-4 border-accent pl-6 text-left font-heading text-xl sm:text-2xl italic text-navy/90 max-w-2xl mx-auto">
            "To dive is to discover yourself — one breath at a time."
          </blockquote>
        </div>

        {/* 3. FOUNDER'S STORY & PHILOSOPHY */}
        <div className="rounded-[40px] bg-white border border-navy/5 p-8 sm:p-14 lg:p-20 shadow-soft mb-24">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="inline-block bg-accent/10 text-accent font-bold text-xs uppercase tracking-widest px-3.5 py-1 rounded-full mb-4">
                Founder's Story
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy leading-tight">
                Born From a Passion for the Deep Blue
              </h2>
              <p className="mt-6 text-navy/70 leading-relaxed">
                The Dive Village began with one man and one belief. For <strong>Sanjeev Bajaj</strong>, the ocean was never just an adrenaline rush—it was a sanctuary. A realm of stillness, healing, and discovery where the noise of modern life melts away into the cadence of conscious breath.
              </p>
              <p className="mt-4 text-navy/70 leading-relaxed">
                "I realized that this magic was not meant to be kept in isolation. We needed a village—a warm, welcoming collective where curious novices and seasoned divers could learn, explore, and protect the ocean together."
              </p>
              <div className="mt-8 pt-6 border-t border-navy/10 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-accent">
                  <SafeImage src={IMAGES.instructor1} alt="Sanjeev Bajaj" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-navy">Sanjeev Bajaj</h4>
                  <p className="text-xs text-navy/60">Founder & Master Instructor</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              <div className="rounded-3xl bg-[#F0F4F8] p-8">
                <span className="text-3xl mb-4 block">🌊</span>
                <h3 className="font-heading text-xl font-bold text-navy mb-3">Our Vision</h3>
                <p className="text-sm text-navy/70 leading-relaxed">
                  To unite ocean lovers across the globe into a vibrant community driven by curiosity, connected by empathy, and committed to marine stewardship.
                </p>
              </div>
              <div className="rounded-3xl bg-[#F0F4F8] p-8">
                <span className="text-3xl mb-4 block">🤿</span>
                <h3 className="font-heading text-xl font-bold text-navy mb-3">Our Mission</h3>
                <p className="text-sm text-navy/70 leading-relaxed">
                  To provide world-class, safe, and accessible dive experiences, certifications, and surf adventures that inspire lifelong respect for marine life.
                </p>
              </div>
              <div className="rounded-3xl bg-[#F0F4F8] p-8">
                <span className="text-3xl mb-4 block">🪸</span>
                <h3 className="font-heading text-xl font-bold text-navy mb-3">Eco Stewardship</h3>
                <p className="text-sm text-navy/70 leading-relaxed">
                  Every dive follows strict Leave-No-Trace principles. We support coral restoration programs and clean-up dives with every expedition.
                </p>
              </div>
              <div className="rounded-3xl bg-[#F0F4F8] p-8">
                <span className="text-3xl mb-4 block">✨</span>
                <h3 className="font-heading text-xl font-bold text-navy mb-3">Seamless Journeys</h3>
                <p className="text-sm text-navy/70 leading-relaxed">
                  From island permits and travel advice to beachside stays and dive gear, we make your entire ocean holiday seamless and memorable.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. CORE VALUES */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-bold tracking-widest uppercase text-xs mb-3 block">
              Guiding Principles
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-navy">
              What Defines Us
            </h2>
            <p className="mt-4 text-navy/70">
              Our core values guide every dive briefing, every safety drill, and every island adventure.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((v, i) => (
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-3xl bg-white border border-navy/5 p-8 shadow-card flex flex-col justify-between hover:-translate-y-1 transition duration-hover"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-navy text-accent flex items-center justify-center mb-6">
                    {v.icon}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-navy mb-3">{v.title}</h3>
                  <p className="text-sm text-navy/70 leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sections removed as requested */}
        {/* 6.5. TESTIMONIALS */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-bold tracking-widest uppercase text-xs mb-3 block">
              Community Voices
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-navy">
              What Our Divers Say
            </h2>
            <p className="mt-4 text-navy/70">
              Don't just take our word for it. Hear from the community of ocean lovers who have dived with us.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-navy/5 shadow-card hover:-translate-y-2 transition duration-500">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-[#F5B041]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-navy/80 italic mb-8 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <SafeImage src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-sm">{t.name}</h4>
                    <span className="text-xs text-navy/60">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. CALL TO ACTION (CTA) */}
        <div className="rounded-[40px] text-white p-10 sm:p-16 lg:p-20 relative overflow-hidden shadow-lift group">
          <video
            src={vid4}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10000ms] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-navy/60 pointer-events-none" />
          
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-accent/30 rounded-full blur-3xl pointer-events-none mix-blend-overlay" />
          
          <div className="relative z-10 max-w-3xl">
            <span className="inline-block bg-white/10 rounded-full px-4 py-1.5 text-xs font-bold text-accent uppercase tracking-widest mb-6 backdrop-blur-sm border border-white/10">
              Join Our Community
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white mb-6 drop-shadow-md">
              Ready to Explore the Ocean With Us?
            </h2>
            <p className="text-lg text-white/90 max-w-xl mb-10 leading-relaxed drop-shadow-md">
              Whether it's your very first breath underwater or your next technical certification, we are ready to guide you every step of the way.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Button as={Link} to="/book-us" className="bg-accent text-navy hover:bg-white hover:text-navy border-none shadow-lg">
                Book Your Dive Now →
              </Button>
              <Button as={Link} to="/contact" variant="secondary" className="!border-white/30 !text-white hover:!bg-white/10 backdrop-blur-sm">
                Contact Our Team
              </Button>
            </div>
          </div>
        </div>

        </div>
      </div>
    </div>
  )
}
