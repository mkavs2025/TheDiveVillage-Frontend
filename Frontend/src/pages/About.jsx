import { Link } from 'react-router'
import { motion, useReducedMotion } from 'framer-motion'
import Button from '../components/Button'
import SafeImage from '../components/SafeImage'
import SectionReveal, { StaggerGrid, StaggerItem } from '../components/SectionReveal'
import { IMAGES, CAROUSEL_IMAGES } from '../utils/images'
import vid4 from '../assets/4.mp4'
import img2 from '../assets/2.png'
import panelImg from '../assets/panel3.png'
import divingVid from '../assets/diving.mp4'

const WHY_CHOOSE_HIGHLIGHTS = [
  {
    num: '01',
    title: 'Authentic & Community-Driven',
    desc: 'Authentic, community-driven dive experiences built on genuine human connection and shared ocean passion.',
  },
  {
    num: '02',
    title: 'Expert Safety Practices',
    desc: 'Expert instructors and top-tier safety practices ensuring complete confidence beneath every wave.',
  },
  {
    num: '03',
    title: 'Inclusive Environment',
    desc: 'Inclusive environment welcoming everyone — from complete beginners to seasoned technical divers.',
  },
  {
    num: '04',
    title: 'Sustainability at the Core',
    desc: 'Sustainability and marine conservation integrated into every single dive expedition we lead.',
  },
  {
    num: '05',
    title: 'Seamless Island Hospitality',
    desc: 'Seamless travel, beachside stays, authentic local cuisine, and heartfelt hospitality from door to shore.',
  },
]

const SAFETY_PROMISES = [
  {
    num: '01',
    title: 'Globally Certified Instructors',
    desc: 'Globally certified PADI instructors and professional guides dedicated to your safety and growth.',
  },
  {
    num: '02',
    title: 'Personalized Training',
    desc: 'Personalized training sessions tailored to your individual pace, comfort, and skill level.',
  },
  {
    num: '03',
    title: 'Serviced Equipment',
    desc: 'High-quality, regularly inspected and serviced dive gear for flawless underwater performance.',
  },
  {
    num: '04',
    title: 'Emergency-Ready Staff',
    desc: 'Emergency-ready, rescue-trained staff equipped with complete safety protocols on every dive.',
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

export default function About() {
  const reduce = useReducedMotion()

  return (
    <div className="bg-transparent min-h-screen font-body overflow-x-hidden pointer-events-none relative">
      
      {/* 3D UNDERWATER VIDEO BACKGROUND (diving.mp4) */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <video
          src={divingVid}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30 filter brightness-90 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/40 to-navy/80 mix-blend-multiply" />
      </div>

      {/* 1. HERO BANNER — ANTONIO & GOOGLE SANS FLEX TYPOGRAPHY ONLY */}
      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pointer-events-auto text-white relative z-10">
        <SectionReveal className="flex flex-col items-center text-center">
          <span className="inline-block bg-white/10 border border-white/20 rounded-full px-5 py-2 text-xs font-heading font-bold uppercase tracking-widest mb-6 backdrop-blur-md text-accent shadow-sm">
            About The Dive Village
          </span>
          <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-none text-white drop-shadow-lg mb-8">
            Your Ocean <span className="text-accent italic font-bold">Community</span>
          </h1>
          <p className="max-w-3xl text-lg sm:text-xl font-body font-medium text-white/90 leading-relaxed drop-shadow-md text-center">
            The Dive Village was born from a simple belief: that the life-changing magic of the Ocean is a feeling meant to be shared. After years of diving across global coasts, we built a community crafted by ocean lovers, for ocean lovers. Here, every dive holds a story, and every visitor who arrives leaves as a member of the Community. This is where learning, adventure and belonging converge to offer you something deeper than a vacation. <span className="text-accent font-bold">This is your Ocean Community.</span>
          </p>
        </SectionReveal>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="bg-[#FAFAFA]/95 backdrop-blur-md text-navy rounded-t-[48px] pt-16 sm:pt-24 pb-24 shadow-[0_-20px_40px_rgba(0,0,0,0.15)] pointer-events-auto relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* 2.1 VISION & MISSION — DIRECTLY BELOW HERO */}
        <div className="grid md:grid-cols-2 gap-8 mb-28">
          <SectionReveal className="h-full rounded-[36px] bg-gradient-to-br from-navy via-[#001D36] to-[#002B4D] text-white p-8 sm:p-12 border border-white/20 shadow-2xl flex flex-col justify-between group hover:border-accent/60 transition duration-500">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-accent/20 border border-accent/40 text-accent flex items-center justify-center text-xl shadow-inner">
                  🌐
                </div>
                <span className="text-accent font-heading font-bold text-xs uppercase tracking-widest">
                  Our Purpose
                </span>
              </div>
              <h3 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-6">Vision</h3>
              <blockquote className="text-white/90 text-lg sm:text-xl leading-relaxed font-body italic border-l-4 border-accent pl-5">
                “To unite the world's ocean lovers into a global community—driven by passion, connected by purpose, and committed to protection”
              </blockquote>
            </div>
          </SectionReveal>

          <SectionReveal className="h-full rounded-[36px] bg-gradient-to-br from-navy via-[#001D36] to-[#002B4D] text-white p-8 sm:p-12 border border-white/20 shadow-2xl flex flex-col justify-between group hover:border-accent/60 transition duration-500">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-accent/20 border border-accent/40 text-accent flex items-center justify-center text-xl shadow-inner">
                  🤿
                </div>
                <span className="text-accent font-heading font-bold text-xs uppercase tracking-widest">
                  Our Pledge
                </span>
              </div>
              <h3 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-6">Mission</h3>
              <blockquote className="text-white/90 text-base sm:text-lg leading-relaxed font-body italic border-l-4 border-accent pl-5">
                “At The Dive Village, our mission is to inspire adventure and foster respect for the ocean by providing safe, sustainable, and unforgettable scuba diving experiences. We are committed to building a platform and educating Divers of all levels, protecting marine ecosystems, and building a community that shares a passion for exploring the ocean world”
              </blockquote>
            </div>
          </SectionReveal>
        </div>

        {/* 2.2 FOUNDER'S NOTE — SANJEEV BAJAJ WITH PANEL3.PNG & FLOATING 2.PNG */}
        <div className="relative rounded-[44px] bg-navy text-white border border-white/20 p-8 sm:p-14 lg:p-20 shadow-2xl mb-28 overflow-hidden">
          {/* Floating PNG Accent (2.png) */}
          <img
            src={img2}
            alt=""
            className="absolute top-6 right-6 sm:top-10 sm:right-10 w-28 sm:w-44 h-auto object-contain opacity-90 drop-shadow-2xl animate-[floatPngSlow_6s_easeInOut_infinite] pointer-events-none z-10"
          />

          <div className="grid lg:grid-cols-12 gap-12 items-center relative z-20">
            <div className="lg:col-span-7">
              <span className="inline-block bg-accent/20 text-accent font-heading font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 border border-accent/30 shadow-sm">
                Founder's Note — Sanjeev Bajaj
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white leading-tight mb-6">
                Built by Ocean Lovers, <br />
                <span className="text-accent italic font-bold">For Ocean Lovers</span>
              </h2>
              <p className="text-white/85 leading-relaxed text-base sm:text-lg font-body font-medium mb-4">
                The Dive Village began with one man and one belief. For Sanjeev, the ocean was more than a passion—it was a sanctuary. A place of healing, discovery, and profound transformation. And he knew, deep down, that this magic was not meant to be kept to himself.
              </p>
              <p className="text-white/85 leading-relaxed text-base sm:text-lg font-body font-medium mb-6">
                So he built a door to “The Dive Village” , a community for divers. A home beneath the waves, built by ocean lovers, for ocean lovers. A place where anyone, from all walks of life, could feel the rhythm of the currents and in doing so rediscover themselves.
              </p>
              <p className="text-white/95 leading-relaxed text-base sm:text-lg font-body font-bold italic border-l-4 border-accent pl-6 mb-8 bg-white/5 py-4 pr-4 rounded-r-2xl border-t border-b border-white/10">
                “Today, Sanjeev's vision lives on in every dive, every story, and every stranger who arrives—and leaves as family member of this community. This is The Dive Village. Your Diving Community.”
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-accent shadow-md shrink-0">
                  <SafeImage src={panelImg} alt="Sanjeev Bajaj" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-white text-base">Sanjeev Bajaj</h4>
                  <p className="text-xs text-accent font-heading font-bold">Founder & Master Instructor</p>
                </div>
              </div>
            </div>

            {/* Founder's Photo Frame using panel3.png */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] w-full rounded-[36px] overflow-hidden border-2 border-white/30 shadow-2xl group bg-navy/50">
                <img src={panelImg} alt="Sanjeev Bajaj - Founder" className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                  <span className="text-xs text-accent font-heading font-bold uppercase tracking-widest block mb-1">Founder</span>
                  <h4 className="font-heading text-2xl font-bold text-white">Sanjeev Bajaj</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2.3 WHY CHOOSE THE DIVE VILLAGE */}
        <div className="mb-28">
          <SectionReveal className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-accent/10 text-accent font-heading font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              Why Choose The Dive Village
            </span>
            <h2 className="font-heading text-4xl sm:text-6xl font-bold text-navy leading-tight mb-4">
              Where the Ocean <span className="text-accent italic font-bold">Feels Like Home</span>
            </h2>
          </SectionReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {WHY_CHOOSE_HIGHLIGHTS.map((item, i) => (
              <StaggerItem key={i}>
                <div className="h-full rounded-[32px] bg-white border border-navy/10 p-8 shadow-card hover:shadow-float hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <span className="font-heading font-bold text-sm text-accent tracking-widest block mb-3">
                      {item.num}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-navy mb-3">{item.title}</h3>
                    <p className="text-sm text-navy/70 leading-relaxed font-body font-medium">{item.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}

            {/* 6th Highlight: Belonging Callout */}
            <div className="h-full rounded-[32px] bg-navy text-white p-8 shadow-2xl flex flex-col justify-between border border-white/20">
              <div>
                <span className="text-accent font-heading text-xs font-bold uppercase tracking-widest block mb-3">Belonging</span>
                <h3 className="font-heading text-2xl font-bold text-white mb-3">Part of Something Deeper</h3>
                <p className="text-white/80 text-sm leading-relaxed font-body font-medium">
                  At Dive Village, every dive isn't just an adventure — it's a feeling of belonging, of being part of something deeper.
                </p>
              </div>
              <span className="text-accent font-heading font-bold text-sm uppercase tracking-wider block mt-6">
                Discover the world through our mask →
              </span>
            </div>
          </div>
        </div>

        {/* 2.4 TRAINING & SAFETY — THE DIVE VILLAGE (SWIM · SCUBA · FREEDIVE) */}
        <div className="rounded-[44px] bg-white border border-navy/10 p-8 sm:p-14 lg:p-20 shadow-soft mb-28">
          <SectionReveal className="text-center mb-16 max-w-3xl mx-auto">
            <span className="inline-block bg-navy/5 rounded-full px-4 py-1.5 text-xs font-heading font-bold text-navy/70 uppercase tracking-widest mb-4 border border-navy/10">
              THE DIVE VILLAGE (SWIM · SCUBA · FREEDIVE)
            </span>
            <h2 className="font-heading text-4xl sm:text-6xl font-bold text-navy leading-tight mb-4">
              Training & Safety — <span className="text-accent italic font-bold">Confidence Beneath Every Wave</span>
            </h2>
            <p className="text-navy/75 text-base sm:text-lg font-body font-medium leading-relaxed">
              At Dive Village, every adventure begins with safety. Our focus is on comfort, skill, and confidence for every participant.
            </p>
          </SectionReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {SAFETY_PROMISES.map((s, i) => (
              <div key={i} className="rounded-[32px] bg-[#F0F2F5] p-6 sm:p-8 flex flex-col justify-between hover:bg-navy hover:text-white transition duration-500 group">
                <div>
                  <span className="font-heading font-bold text-sm text-navy/40 group-hover:text-accent tracking-widest block mb-4 transition">
                    {s.num}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-navy group-hover:text-white mb-3 transition">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-navy/70 group-hover:text-white/80 leading-relaxed font-body font-medium transition">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-8 border-t border-navy/10">
            <blockquote className="font-heading text-xl sm:text-2xl italic font-bold text-navy max-w-2xl mx-auto">
              “You'll never dive alone — you'll always be guided, supported, and cared for. Because trust is the deepest dive of all.”
            </blockquote>
          </div>
        </div>

        {/* 2.5 COMMUNITY VOICES */}
        <div className="mb-24">
          <SectionReveal className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-heading font-bold tracking-widest uppercase text-xs mb-3 block">
              Community Voices
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-navy">
              What Our Divers Say
            </h2>
          </SectionReveal>
          
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-navy/5 shadow-card hover:-translate-y-2 transition duration-500">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-[#FFCD00]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-navy/80 italic mb-8 leading-relaxed font-body font-medium">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-navy/10">
                    <SafeImage src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-navy text-sm">{t.name}</h4>
                    <span className="text-xs text-navy/60 font-body">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2.6 CALL TO ACTION (CTA) */}
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
            <span className="inline-block bg-white/10 rounded-full px-4 py-1.5 text-xs font-heading font-bold text-accent uppercase tracking-widest mb-6 backdrop-blur-sm border border-white/10">
              Join Our Community
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6 drop-shadow-md">
              Ready to Explore the Ocean With Us?
            </h2>
            <p className="text-lg text-white/90 max-w-xl mb-10 leading-relaxed drop-shadow-md font-body font-medium">
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
