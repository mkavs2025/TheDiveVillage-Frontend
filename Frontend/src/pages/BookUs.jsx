import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { motion } from 'framer-motion'
import { IMAGES } from '../utils/images'
import InteractiveDiveMap from '../components/InteractiveDiveMap'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const PROGRAMS = [
  { id: 'try-experiences', label: 'Try Experiences', price: 'Contact Us' },
  { id: 'certification', label: 'Certification Pathway', price: 'Contact Us' },
  { id: 'rescue-refresher', label: 'Rescue & Refresher', price: 'Contact Us' },
  { id: 'fun-dives', label: 'Fun Dives', price: 'Contact Us' },
  { id: 'snorkeling', label: 'Snorkeling', price: 'Contact Us' },
  { id: 'combos', label: 'Combos', price: 'Contact Us' },
  { id: 'pro-courses', label: 'Pro Courses', price: 'Contact Us' },
]

export default function BookUs() {
  const [searchParams] = useSearchParams()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [booking, setBooking] = useState({
    program: searchParams.get('program') || '',
    location: '',
    date: '',
    groupSize: '1',
    experienceLevel: 'beginner',
    name: '',
    email: '',
    phone: '',
    requests: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const selectedProgram = PROGRAMS.find(p => p.id === booking.program)

  const handleChange = (e) => {
    setBooking(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSiteSelect = (site) => {
    setBooking(prev => ({ ...prev, location: site ? site.name : '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Submit to booking service stub
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-[#FAFAFA] flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <div className="rounded-[40px] bg-white p-12 shadow-sm max-w-md w-full border border-navy/5">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckIcon />
          </div>
          <h2 className="font-heading text-3xl font-bold text-navy">Booking Request Sent</h2>
          <p className="mt-4 text-navy/70 text-sm leading-relaxed">
            Our team will confirm availability within 24 hours. We look forward to diving with you!
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-10 rounded-full bg-black px-8 py-4 text-sm font-bold text-white transition hover:bg-black/80 w-full"
          >
            Make Another Booking
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen text-navy font-body pt-24 sm:pt-32 pb-24" style={{ textShadow: 'none' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16">
          <div>
            <span className="inline-block bg-black/5 rounded-full px-4 py-1.5 text-xs font-bold text-navy/60 uppercase tracking-widest mb-6">Plan Trip</span>
            <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-navy leading-none text-balance">Book Your Dive</h1>
          </div>
          <p className="max-w-xs text-sm font-medium text-navy/70 leading-relaxed lg:pb-4">
            Select your program and preferred dates. We will confirm your spot within 24 hours.
          </p>
        </div>

        {/* Main Split Section */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Form */}
          <div className="w-full flex flex-col">
            {/* Step Indicator */}
            <div className="flex items-center gap-2 mb-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
                    currentStep === step ? 'bg-navy text-white shadow-md' 
                    : currentStep > step ? 'bg-emerald-500 text-white' 
                    : 'bg-[#F0F2F5] text-navy/50'
                  }`}>
                    {currentStep > step ? '✓' : step}
                  </div>
                  {step < 3 && (
                    <div className={`flex-1 h-1 mx-2 rounded-full transition ${
                      currentStep > step ? 'bg-emerald-500' : 'bg-[#F0F2F5]'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col bg-white p-6 sm:p-8 rounded-[32px] border border-navy/5 shadow-card">
              
              <div className="flex-1 space-y-6">
                {currentStep === 1 && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h3 className="font-heading text-2xl font-bold text-navy mb-4">Program & Location</h3>
                    <div>
                      <label className="mb-3 block text-xs font-bold text-navy/70">Select Your Program</label>
                      <select
                        name="program"
                        value={booking.program}
                        onChange={handleChange}
                        required
                        className="w-full rounded-2xl bg-[#F0F2F5] px-5 py-4 text-sm text-navy outline-none focus:ring-2 focus:ring-accent/50 transition appearance-none"
                      >
                        <option value="" disabled>Choose your program...</option>
                        {PROGRAMS.map(p => (
                          <option key={p.id} value={p.id}>{p.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-3 block text-xs font-bold text-navy/70">Dive Location</label>
                      <input
                        type="text"
                        name="location"
                        value={booking.location}
                        readOnly
                        placeholder="Click a location on the 360 map 👉"
                        className="w-full rounded-2xl bg-[#F0F2F5] px-5 py-4 text-sm text-navy outline-none focus:ring-2 focus:ring-accent/50 transition cursor-default"
                        required
                      />
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h3 className="font-heading text-2xl font-bold text-navy mb-4">Dive Details</h3>
                    <div>
                      <label className="mb-3 block text-xs font-bold text-navy/70">Preferred Date</label>
                      <input
                        type="date"
                        name="date"
                        value={booking.date}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full rounded-2xl bg-[#F0F2F5] px-5 py-4 text-sm text-navy outline-none focus:ring-2 focus:ring-accent/50 transition"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="mb-3 block text-xs font-bold text-navy/70">Group Size</label>
                        <input
                          type="number"
                          name="groupSize"
                          min="1"
                          max="20"
                          value={booking.groupSize}
                          onChange={handleChange}
                          required
                          className="w-full rounded-2xl bg-[#F0F2F5] px-5 py-4 text-sm text-navy outline-none focus:ring-2 focus:ring-accent/50 transition"
                        />
                      </div>
                      <div>
                        <label className="mb-3 block text-xs font-bold text-navy/70">Experience Level</label>
                        <select
                          name="experienceLevel"
                          value={booking.experienceLevel}
                          onChange={handleChange}
                          required
                          className="w-full rounded-2xl bg-[#F0F2F5] px-5 py-4 text-sm text-navy outline-none focus:ring-2 focus:ring-accent/50 transition appearance-none"
                        >
                          <option value="beginner">Beginner (No experience)</option>
                          <option value="intermediate">Intermediate (Some dives)</option>
                          <option value="advanced">Advanced (Certified pro)</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h3 className="font-heading text-2xl font-bold text-navy mb-4">Personal Details</h3>
                    <div>
                      <label className="mb-3 block text-xs font-bold text-navy/70">Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your full name"
                        value={booking.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-2xl bg-[#F0F2F5] px-5 py-4 text-sm text-navy outline-none focus:ring-2 focus:ring-accent/50 transition placeholder:text-navy/30"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="mb-3 block text-xs font-bold text-navy/70">Email</label>
                        <input
                          type="email"
                          name="email"
                          placeholder="you@example.com"
                          value={booking.email}
                          onChange={handleChange}
                          required
                          className="w-full rounded-2xl bg-[#F0F2F5] px-5 py-4 text-sm text-navy outline-none focus:ring-2 focus:ring-accent/50 transition placeholder:text-navy/30"
                        />
                      </div>
                      <div>
                        <label className="mb-3 block text-xs font-bold text-navy/70">Phone Number</label>
                        <PhoneInput
                          defaultCountry="IN"
                          placeholder="8971001010"
                          value={booking.phone}
                          onChange={(value) => setBooking(prev => ({ ...prev, phone: value }))}
                          className="w-full rounded-2xl bg-[#F0F2F5] px-5 py-4 text-sm text-navy outline-none focus-within:ring-2 focus-within:ring-accent/50 transition [&_.PhoneInputCountryIcon]:rounded-sm [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:border-none [&_.PhoneInputCountrySelect]:outline-none [&_.PhoneInputCountryIcon--border]:border-none [&_.PhoneInputInput]:ml-3"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-3 block text-xs font-bold text-navy/70">Special Requests</label>
                      <textarea
                        name="requests"
                        placeholder="Any dietary requirements, medical conditions, or specific expectations we should know about?"
                        value={booking.requests}
                        onChange={handleChange}
                        rows="3"
                        className="w-full rounded-2xl bg-[#F0F2F5] px-5 py-4 text-sm text-navy outline-none focus:ring-2 focus:ring-accent/50 transition placeholder:text-navy/30 resize-y"
                      ></textarea>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="pt-6 mt-8 border-t border-navy/5 flex items-center justify-between gap-4">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="rounded-full px-6 py-3.5 text-sm font-bold text-navy hover:bg-[#F0F2F5] transition"
                  >
                    Back
                  </button>
                ) : <div />}

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (currentStep === 1 && (!booking.program || !booking.location)) {
                        alert("Please select a program and a location on the map.");
                        return;
                      }
                      if (currentStep === 2 && (!booking.date || !booking.groupSize || !booking.experienceLevel)) {
                        alert("Please complete all dive details.");
                        return;
                      }
                      setCurrentStep(prev => prev + 1);
                    }}
                    className="rounded-full bg-navy px-8 py-3.5 text-sm font-bold text-white transition hover:bg-black/80 flex items-center gap-2"
                  >
                    Next Step
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="rounded-full bg-accent px-8 py-3.5 text-sm font-bold text-navy transition hover:bg-white border border-transparent hover:border-accent shadow-sm flex items-center gap-2"
                  >
                    Confirm Booking
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right Globe */}
          <div className="relative w-full aspect-[3/4] lg:aspect-auto h-full rounded-[40px] overflow-hidden bg-navy flex flex-col pt-8">
            <h3 className="text-center font-heading text-2xl font-extrabold text-white z-10 mb-4">Pick dive location</h3>
            <div className="flex-1 relative">
              <InteractiveDiveMap onSiteSelect={handleSiteSelect} />
            </div>
          </div>
        </div>

        {/* Info Blocks (Reused from Contact) */}
        <div className="mt-32 grid grid-cols-1 sm:grid-cols-3 gap-12 text-center max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border border-navy/10 flex items-center justify-center mb-6">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
            </div>
            <h4 className="font-bold text-navy mb-2">Call & WhatsApp</h4>
            <a href="tel:+918971001010" className="text-xs text-navy/60 hover:text-navy transition">+91 89710 01010</a>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border border-navy/10 flex items-center justify-center mb-6">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            </div>
            <h4 className="font-bold text-navy mb-2">Working Hours</h4>
            <span className="text-xs text-navy/60">Daily: 8am-5pm</span>
            <span className="text-xs text-navy/60">Sunday: Closed</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border border-navy/10 flex items-center justify-center mb-6">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
            </div>
            <h4 className="font-bold text-navy mb-2">Write to Us</h4>
            <a href="mailto:hello@thedivevillage.co" className="text-xs text-navy/60 hover:text-navy transition">hello@thedivevillage.co</a>
            <a href="mailto:booking@thedivevillage.co" className="text-xs text-navy/60 hover:text-navy transition">booking@thedivevillage.co</a>
          </div>
        </div>

      </div>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
