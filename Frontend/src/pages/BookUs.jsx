import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { motion } from 'framer-motion'
import InteractiveDiveMap from '../components/InteractiveDiveMap'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

// Master 44-Program Catalog with Eligibility Constraints
export const PROGRAMS_CATALOG = [
  { id: 'try-dive', name: 'Try Dive', minAge: 8, maxAge: null, expReq: ['beginner', 'completed_dsd'], desc: 'Beginner — no prior diving experience specified' },
  { id: 'dsd-lite', name: 'DSD Lite', minAge: 10, maxAge: null, expReq: ['beginner', 'completed_dsd'], desc: 'Beginner — no prior diving experience specified' },
  { id: 'padi-dsd', name: 'PADI Discover Scuba Dive', minAge: null, maxAge: null, expReq: ['beginner', 'completed_dsd'], desc: 'Beginner — introductory program' },
  { id: 'discover-snorkeling', name: 'Discover Snorkeling', minAge: null, maxAge: null, expReq: 'all', desc: 'Beginner — no prior experience specified' },
  { id: 'padi-bubblemaker', name: 'PADI Bubblemaker', minAge: 8, maxAge: 10, expReq: ['beginner'], desc: 'Complete beginner / kids (8–10 yrs)' },
  { id: 'add-dive-after-dsd', name: 'Additional Dive after DSD', minAge: null, maxAge: null, expReq: ['completed_dsd', 'open_water', 'advanced_open_water', 'advanced_efr', 'certified_diver'], desc: 'Must have completed DSD' },
  { id: 'padi-skin-diver', name: 'PADI Skin Diver', minAge: null, maxAge: null, expReq: 'all', desc: 'Learning snorkeling & breath-hold diving' },
  { id: 'padi-scuba-diver', name: 'PADI Scuba Diver', minAge: 10, maxAge: null, expReq: ['beginner', 'completed_dsd'], desc: 'Beginner — entry-level certification' },
  { id: 'padi-open-water', name: 'PADI Open Water Diver', minAge: 10, maxAge: null, expReq: ['beginner', 'completed_dsd'], desc: 'Beginner — entry-level certification' },
  { id: 'padi-adventure-diver', name: 'PADI Adventure Diver', minAge: 10, maxAge: null, expReq: ['open_water', 'advanced_open_water', 'advanced_efr', 'certified_diver'], desc: 'Open Water Diver required' },
  { id: 'padi-advanced-ow', name: 'PADI Advanced Open Water', minAge: 12, maxAge: null, expReq: ['open_water', 'advanced_open_water', 'advanced_efr', 'certified_diver'], desc: 'Open Water Diver required' },
  { id: 'efr-primary-secondary', name: 'EFR Primary & Secondary Care', minAge: null, maxAge: null, expReq: 'all', desc: 'Beginner — divers & non-divers' },
  { id: 'padi-rescue-diver', name: 'PADI Rescue Diver', minAge: 12, maxAge: null, expReq: ['advanced_efr', 'advanced_open_water'], desc: 'Advanced + EFR required' },
  { id: 'padi-reactivate', name: 'PADI Reactivate (with dive)', minAge: null, maxAge: null, expReq: ['certified_diver', 'open_water', 'advanced_open_water', 'advanced_efr'], desc: 'Existing certified diver needing a skills refresh' },
  { id: 'full-refresher', name: 'Full Refresher (with dive)', minAge: null, maxAge: null, expReq: ['certified_diver', 'open_water', 'advanced_open_water', 'advanced_efr'], desc: 'Existing diver; skills practice/refresher' },
  { id: 'lite-refresher', name: 'Lite Refresher (confined only)', minAge: null, maxAge: null, expReq: ['certified_diver', 'open_water', 'advanced_open_water', 'advanced_efr'], desc: 'Existing diver; confined-water skills refresh' },
  { id: 'peak-buoyancy', name: 'Peak Performance Buoyancy', minAge: null, maxAge: null, expReq: ['open_water', 'advanced_open_water', 'advanced_efr', 'certified_diver'], desc: 'Open Water Diver required' },
  { id: 'project-aware', name: 'Project AWARE', minAge: null, maxAge: null, expReq: 'all', desc: 'No diving experience specified; knowledge-based' },
  { id: 'deep-diver', name: 'Deep Diver', minAge: null, maxAge: null, expReq: ['open_water', 'advanced_open_water', 'advanced_efr', 'certified_diver'], desc: 'Open Water Diver required' },
  { id: 'wreck-diver', name: 'Wreck Diver', minAge: null, maxAge: null, expReq: ['open_water', 'advanced_open_water', 'advanced_efr', 'certified_diver'], desc: 'No prerequisite listed in file' },
  { id: 'night-diver', name: 'Night Diver', minAge: null, maxAge: null, expReq: ['open_water', 'advanced_open_water', 'advanced_efr', 'certified_diver'], desc: 'No prerequisite listed in file' },
  { id: 'enriched-air-nitrox', name: 'Enriched Air Nitrox', minAge: null, maxAge: null, expReq: ['open_water', 'advanced_open_water', 'advanced_efr', 'certified_diver'], desc: 'No prerequisite listed in file' },
  { id: '1-dive', name: '1 Dive', minAge: null, maxAge: null, expReq: ['certified_diver', 'open_water', 'advanced_open_water', 'advanced_efr'], desc: 'Certified diver' },
  { id: '2-dives', name: '2 Dives', minAge: null, maxAge: null, expReq: ['certified_diver', 'open_water', 'advanced_open_water', 'advanced_efr'], desc: 'Certified diver' },
  { id: '4-dives', name: '4 Dives', minAge: null, maxAge: null, expReq: ['certified_diver', 'open_water', 'advanced_open_water', 'advanced_efr'], desc: 'Certified diver' },
  { id: '6-dives', name: '6 Dives', minAge: null, maxAge: null, expReq: ['certified_diver', 'open_water', 'advanced_open_water', 'advanced_efr'], desc: 'Certified diver' },
  { id: '8-dives', name: '8 Dives', minAge: null, maxAge: null, expReq: ['certified_diver', 'open_water', 'advanced_open_water', 'advanced_efr'], desc: 'Certified diver' },
  { id: '10-dives', name: '10 Dives', minAge: null, maxAge: null, expReq: ['certified_diver', 'open_water', 'advanced_open_water', 'advanced_efr'], desc: 'Certified diver' },
  { id: '12-dives', name: '12 Dives', minAge: null, maxAge: null, expReq: ['certified_diver', 'open_water', 'advanced_open_water', 'advanced_efr'], desc: 'Certified diver' },
  { id: 'post-12-dives', name: 'Post 12 (extra 2 dives)', minAge: null, maxAge: null, expReq: ['certified_diver', 'open_water', 'advanced_open_water', 'advanced_efr'], desc: 'Existing certified diver / package participant' },
  { id: 'night-dive', name: 'Night Dive', minAge: null, maxAge: null, expReq: ['open_water', 'advanced_open_water', 'advanced_efr', 'certified_diver'], desc: 'Open Water Diver required' },
  { id: 'dawn-dive', name: 'Dawn Dive', minAge: null, maxAge: null, expReq: ['certified_diver', 'open_water', 'advanced_open_water', 'advanced_efr'], desc: 'Certified diver' },
  { id: 'padi-dsd-ow-combo', name: 'PADI DSD + Open Water', minAge: null, maxAge: null, expReq: ['beginner', 'completed_dsd'], desc: 'Beginner → Open Water certification' },
  { id: 'padi-ow-aow-combo', name: 'PADI OW + Advanced', minAge: null, maxAge: null, expReq: ['beginner', 'completed_dsd', 'open_water'], desc: 'Beginner → Open Water → Advanced' },
  { id: 'efr-rescue-combo', name: 'EFR + Rescue Diver', minAge: null, maxAge: null, expReq: ['advanced_open_water', 'advanced_efr'], desc: 'Advanced Open Water required' },
  { id: 'padi-divemaster', name: 'PADI Divemaster', minAge: null, maxAge: null, expReq: ['advanced_efr', 'advanced_open_water'], desc: 'Professional-level pathway' },
  { id: 'efr-rescue-dm-combo', name: 'EFR + Rescue + Divemaster', minAge: null, maxAge: null, expReq: ['advanced_open_water', 'advanced_efr'], desc: 'Progression: EFR → Rescue → Divemaster' },
  { id: 'efr-rescue-dm-prereqs', name: 'EFR + Rescue + DM (prereqs)', minAge: null, maxAge: null, expReq: ['advanced_open_water', 'advanced_efr'], desc: 'Prerequisites assumed/required' },
  { id: 'zero-to-hero', name: 'Zero to Hero (OW to DM)', minAge: null, maxAge: null, expReq: ['beginner', 'completed_dsd', 'open_water', 'advanced_open_water'], desc: 'Beginner → Open Water → Divemaster' },
  { id: 'padi-basic-freediver', name: 'PADI Basic Freediver', minAge: null, maxAge: null, expReq: 'all', desc: 'Beginner — basic freediving' },
  { id: 'padi-freediver', name: 'PADI Freediver', minAge: null, maxAge: null, expReq: 'all', desc: 'Freediving experience / Basic Freediver' },
  { id: 'reef-explorer', name: 'Reef Explorer', minAge: null, maxAge: null, expReq: 'all', desc: 'Beginner — suitable for all ages' },
  { id: 'ocean-explorer', name: 'Ocean Explorer', minAge: null, maxAge: null, expReq: 'all', desc: 'Beginner / guided snorkeling' },
  { id: 'drift-diver', name: 'Drift Diver', minAge: null, maxAge: null, expReq: ['open_water', 'advanced_open_water', 'advanced_efr', 'certified_diver'], desc: 'Open Water Diver required' },
]

export const EXPERIENCE_LABELS = {
  beginner: 'Beginner (No prior experience)',
  completed_dsd: 'Completed DSD (Discover Scuba)',
  open_water: 'Open Water Diver Certified',
  advanced_open_water: 'Advanced Open Water Certified',
  advanced_efr: 'Advanced Open Water + EFR Certified',
  certified_diver: 'Existing Certified Diver',
  basic_freediver: 'Basic Freediver',
}

export function getEligiblePrograms(ageInput, expLevel) {
  const age = parseInt(ageInput, 10)
  
  // Rule 1: Age below 1 year -> no available programs
  if (isNaN(age) || age < 1) {
    return []
  }

  return PROGRAMS_CATALOG.filter((prog) => {
    // Rule 3: For anything above 10 -> show everything except what is 8 to 10 specific (maxAge === 10)
    if (age > 10 && prog.maxAge !== null && prog.maxAge <= 10) {
      return false
    }

    // Rule 2: For ages 8 to 10 -> exclude programs requiring minAge > age (e.g. 10+ or 12+)
    if (prog.minAge !== null && age < prog.minAge) {
      return false
    }

    // Experience Level Check
    if (prog.expReq === 'all') return true
    if (Array.isArray(prog.expReq)) {
      return prog.expReq.includes(expLevel || 'beginner')
    }
    return true
  })
}

export default function BookUs() {
  const [searchParams] = useSearchParams()
  const initialProgram = searchParams.get('program') || ''

  const [currentStep, setCurrentStep] = useState(1)

  // Step 1: Location, Date & Group Size
  const [location, setLocation] = useState('Andaman Islands (Havelock)')
  const [date, setDate] = useState('')
  const [groupSize, setGroupSize] = useState(1)

  // Step 2: Participant Info List
  const [participants, setParticipants] = useState([
    { id: 1, name: '', age: '', experienceLevel: 'beginner', selectedProgram: initialProgram || '' }
  ])

  // Step 4: Contact Details
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    requests: ''
  })

  const [submitted, setSubmitted] = useState(false)

  // Sync group size changes to participants array
  useEffect(() => {
    const count = Math.max(1, parseInt(groupSize, 10) || 1)
    setParticipants(prev => {
      if (prev.length === count) return prev
      if (prev.length < count) {
        const extra = Array.from({ length: count - prev.length }, (_, i) => ({
          id: prev.length + i + 1,
          name: '',
          age: '',
          experienceLevel: 'beginner',
          selectedProgram: ''
        }))
        return [...prev, ...extra]
      }
      return prev.slice(0, count)
    })
  }, [groupSize])

  const handleParticipantChange = (index, field, value) => {
    setParticipants(prev => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      
      // Reset selected program if age/exp changes and selected program is no longer eligible
      if (field === 'age' || field === 'experienceLevel') {
        const eligible = getEligiblePrograms(
          field === 'age' ? value : updated[index].age,
          field === 'experienceLevel' ? value : updated[index].experienceLevel
        )
        const isCurrentEligible = eligible.some(p => p.id === updated[index].selectedProgram)
        if (!isCurrentEligible) {
          updated[index].selectedProgram = eligible[0]?.id || ''
        }
      }
      return updated
    })
  }

  const handleSiteSelect = (site) => {
    if (site && site.name) {
      setLocation(site.name)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-[#FAFAFA] flex min-h-[80vh] flex-col items-center justify-center px-4 py-16 text-center">
        <div className="rounded-[40px] bg-white p-10 sm:p-14 shadow-card max-w-xl w-full border border-navy/5">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckIcon />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy">Booking Request Received</h2>
          <p className="mt-3 text-navy/70 text-sm leading-relaxed">
            Thank you <span className="font-bold text-navy">{contact.name}</span>! We've reserved your spot for <span className="font-bold text-navy">{participants.length} participant(s)</span> at <span className="font-bold text-accent">{location}</span>.
          </p>

          <div className="my-8 rounded-3xl bg-[#F0F2F5] p-6 text-left space-y-4 text-xs sm:text-sm">
            <div className="flex justify-between border-b border-navy/10 pb-3">
              <span className="text-navy/60 font-semibold">Location & Date:</span>
              <span className="font-bold text-navy">{location} {date ? `(${date})` : ''}</span>
            </div>
            <div className="space-y-2 pt-1">
              <span className="text-navy/60 font-semibold block">Participants & Selected Programs:</span>
              {participants.map((p, idx) => {
                const prog = PROGRAMS_CATALOG.find(pr => pr.id === p.selectedProgram)
                return (
                  <div key={idx} className="flex justify-between items-center bg-white p-3 rounded-2xl border border-navy/5">
                    <div>
                      <span className="font-bold text-navy block">{p.name || `Participant ${idx + 1}`}</span>
                      <span className="text-[11px] text-navy/50">Age: {p.age || 'N/A'} • {EXPERIENCE_LABELS[p.experienceLevel]}</span>
                    </div>
                    <span className="font-bold text-accent text-xs bg-accent/10 px-3 py-1 rounded-full">
                      {prog?.name || 'Custom Package'}
                    </span>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between border-t border-navy/10 pt-3 text-xs">
              <span className="text-navy/60 font-semibold">Contact Email & Phone:</span>
              <span className="font-bold text-navy">{contact.email} ({contact.phone || 'N/A'})</span>
            </div>
          </div>

          <button
            onClick={() => {
              setSubmitted(false)
              setCurrentStep(1)
            }}
            className="rounded-full bg-navy px-8 py-4 text-sm font-bold text-white transition hover:bg-accent hover:text-navy w-full shadow-md"
          >
            Submit Another Booking
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen text-navy font-body pt-24 sm:pt-32 pb-24" style={{ textShadow: 'none' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
          <div>
            <span className="inline-block bg-black/5 rounded-full px-4 py-1.5 text-xs font-bold text-navy/60 uppercase tracking-widest mb-4">
              Step-by-Step Experience Planner
            </span>
            <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-navy leading-none">
              Book Your Dive
            </h1>
          </div>
          <p className="max-w-md text-sm sm:text-base font-medium text-navy/70 leading-relaxed lg:pb-4">
            Select your location, group size, participant details, and matching programs. Our dive masters will confirm within 24 hours.
          </p>
        </div>

        {/* Main 4-Step Layout */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Form Wizard Column */}
          <div className="lg:col-span-7 flex flex-col">
            
            {/* Step Indicator Bar */}
            <div className="flex items-center justify-between mb-8 bg-white p-4 sm:p-5 rounded-3xl border border-navy/5 shadow-sm overflow-x-auto">
              {[
                { num: 1, title: 'Location & Group' },
                { num: 2, title: 'Participant Details' },
                { num: 3, title: 'Matching Programs' },
                { num: 4, title: 'Contact Info' },
              ].map((s) => (
                <div key={s.num} className="flex items-center gap-2.5 shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    currentStep === s.num
                      ? 'bg-navy text-white shadow-md ring-2 ring-navy/20'
                      : currentStep > s.num
                      ? 'bg-emerald-500 text-white'
                      : 'bg-[#F0F2F5] text-navy/50'
                  }`}>
                    {currentStep > s.num ? '✓' : s.num}
                  </div>
                  <span className={`text-xs font-bold whitespace-nowrap ${currentStep === s.num ? 'text-navy font-bold' : 'text-navy/40'}`}>
                    {s.title}
                  </span>
                  {s.num < 4 && <span className="text-navy/20 text-xs hidden sm:inline mx-1">→</span>}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col bg-white p-6 sm:p-10 rounded-[36px] border border-navy/5 shadow-card">
              <div className="flex-1 space-y-6">

                {/* STEP 1: Location & Group Size */}
                {currentStep === 1 && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-accent mb-1 block">Step 1 of 4</span>
                      <h3 className="font-heading text-3xl font-bold text-navy">Location & Group Size</h3>
                      <p className="text-xs text-navy/60 mt-1">Where and when would you like to dive?</p>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-bold text-navy/70 uppercase tracking-wider">
                        Selected Dive Location
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="Select location or pick on map 👉"
                          required
                          className="w-full rounded-2xl bg-[#F0F2F5] px-5 py-4 text-sm font-bold text-navy outline-none focus:ring-2 focus:ring-accent/50 transition"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-accent bg-accent/10 px-3 py-1.5 rounded-full pointer-events-none">
                          📍 Map Sync
                        </span>
                      </div>
                      <p className="text-[11px] text-navy/50 mt-1.5">You can also click any marker on the interactive 3D map to update location.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="mb-2 block text-xs font-bold text-navy/70 uppercase tracking-wider">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          required
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full rounded-2xl bg-[#F0F2F5] px-5 py-4 text-sm font-bold text-navy outline-none focus:ring-2 focus:ring-accent/50 transition"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-bold text-navy/70 uppercase tracking-wider">
                          Number of People
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="20"
                          value={groupSize}
                          onChange={(e) => setGroupSize(e.target.value)}
                          required
                          className="w-full rounded-2xl bg-[#F0F2F5] px-5 py-4 text-sm font-bold text-navy outline-none focus:ring-2 focus:ring-accent/50 transition"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Name, Age & Experience Level for Each Person */}
                {currentStep === 2 && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-accent mb-1 block">Step 2 of 4</span>
                      <h3 className="font-heading text-3xl font-bold text-navy">Participant Details</h3>
                      <p className="text-xs text-navy/60 mt-1">Enter age and experience level for each person to unlock matching programs.</p>
                    </div>

                    <div className="space-y-6 max-h-[550px] overflow-y-auto pr-1">
                      {participants.map((p, idx) => (
                        <div key={p.id} className="rounded-3xl bg-[#FAFAFA] border border-navy/10 p-5 sm:p-6 space-y-4">
                          <div className="flex justify-between items-center border-b border-navy/5 pb-3">
                            <span className="font-heading font-bold text-navy text-lg flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-navy text-white text-xs flex items-center justify-center font-bold">
                                {idx + 1}
                              </span>
                              Person {idx + 1} Details
                            </span>
                            <span className="text-[11px] text-navy/50 font-bold uppercase tracking-wider">
                              Participant #{idx + 1}
                            </span>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <label className="mb-2 block text-xs font-bold text-navy/70">Full Name</label>
                              <input
                                type="text"
                                placeholder={`Name of Person ${idx + 1}`}
                                value={p.name}
                                onChange={(e) => handleParticipantChange(idx, 'name', e.target.value)}
                                required
                                className="w-full rounded-2xl bg-white border border-navy/10 px-4 py-3.5 text-sm text-navy outline-none focus:ring-2 focus:ring-accent/50 transition"
                              />
                            </div>

                            <div>
                              <label className="mb-2 block text-xs font-bold text-navy/70">Age (Years)</label>
                              <input
                                type="number"
                                min="1"
                                max="100"
                                placeholder="e.g. 12"
                                value={p.age}
                                onChange={(e) => handleParticipantChange(idx, 'age', e.target.value)}
                                required
                                className="w-full rounded-2xl bg-white border border-navy/10 px-4 py-3.5 text-sm text-navy outline-none focus:ring-2 focus:ring-accent/50 transition"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="mb-2 block text-xs font-bold text-navy/70">Experience Level / Certification</label>
                            <select
                              value={p.experienceLevel}
                              onChange={(e) => handleParticipantChange(idx, 'experienceLevel', e.target.value)}
                              required
                              className="w-full rounded-2xl bg-white border border-navy/10 px-4 py-3.5 text-sm text-navy outline-none focus:ring-2 focus:ring-accent/50 transition appearance-none"
                            >
                              {Object.entries(EXPERIENCE_LABELS).map(([key, label]) => (
                                <option key={key} value={key}>{label}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Matching Programs Selection For Each Person */}
                {currentStep === 3 && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-accent mb-1 block">Step 3 of 4</span>
                      <h3 className="font-heading text-3xl font-bold text-navy">Eligible Programs & Courses</h3>
                      <p className="text-xs text-navy/60 mt-1">Based on age and experience level, select a program for each person.</p>
                    </div>

                    <div className="space-y-8 max-h-[550px] overflow-y-auto pr-1">
                      {participants.map((p, idx) => {
                        const eligible = getEligiblePrograms(p.age, p.experienceLevel)
                        return (
                          <div key={p.id} className="rounded-3xl bg-[#FAFAFA] border border-navy/10 p-5 sm:p-6 space-y-4">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-navy/10 pb-3">
                              <div>
                                <h4 className="font-heading font-bold text-navy text-lg">
                                  {p.name || `Person ${idx + 1}`}
                                </h4>
                                <p className="text-xs text-navy/60">
                                  Age: <span className="font-bold text-navy">{p.age || 'Not specified'}</span> • Experience: <span className="font-bold text-navy">{EXPERIENCE_LABELS[p.experienceLevel]}</span>
                                </p>
                              </div>
                              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">
                                {eligible.length} Available Courses
                              </span>
                            </div>

                            <div>
                              <label className="mb-2 block text-xs font-bold text-navy/70 uppercase tracking-wider">
                                Select Program for {p.name || `Person ${idx + 1}`}
                              </label>
                              <select
                                value={p.selectedProgram}
                                onChange={(e) => handleParticipantChange(idx, 'selectedProgram', e.target.value)}
                                required={eligible.length > 0}
                                className="w-full rounded-2xl bg-white border border-navy/10 px-4 py-4 text-sm font-bold text-navy outline-none focus:ring-2 focus:ring-accent/50 transition appearance-none shadow-sm mb-3"
                              >
                                {eligible.length === 0 ? (
                                  <option value="">No available programs for this age</option>
                                ) : (
                                  <>
                                    <option value="" disabled>Select an eligible course...</option>
                                    {eligible.map((prog) => (
                                      <option key={prog.id} value={prog.id}>
                                        {prog.name} {prog.minAge ? `(Age ${prog.minAge}+)` : ''} — {prog.desc}
                                      </option>
                                    ))}
                                  </>
                                )}
                              </select>

                              {eligible.length === 0 && (
                                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-2">
                                  <span>⚠️</span>
                                  <span>No available programs for age {p.age || 'below 1'} year(s). Minimum age for introductory programs (e.g. Try Dive / Bubblemaker) is 8 years.</span>
                                </div>
                              )}

                              {/* Selected Program Preview Card */}
                              {p.selectedProgram && (
                                <div className="rounded-2xl bg-navy text-white p-4 text-xs space-y-1">
                                  <div className="flex justify-between items-center">
                                    <span className="font-bold text-accent text-sm">
                                      {PROGRAMS_CATALOG.find(pr => pr.id === p.selectedProgram)?.name}
                                    </span>
                                    <span className="text-[10px] bg-white/10 px-2.5 py-0.5 rounded-full text-white/80">
                                      {PROGRAMS_CATALOG.find(pr => pr.id === p.selectedProgram)?.minAge 
                                        ? `Age: ${PROGRAMS_CATALOG.find(pr => pr.id === p.selectedProgram)?.minAge}+` 
                                        : 'All Ages'}
                                    </span>
                                  </div>
                                  <p className="text-white/80 leading-relaxed">
                                    {PROGRAMS_CATALOG.find(pr => pr.id === p.selectedProgram)?.desc}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: Contact Details & Special Requests */}
                {currentStep === 4 && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-accent mb-1 block">Step 4 of 4</span>
                      <h3 className="font-heading text-3xl font-bold text-navy">Contact & Booking Details</h3>
                      <p className="text-xs text-navy/60 mt-1">Please provide your contact information to finalize the booking request.</p>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-bold text-navy/70 uppercase tracking-wider">Primary Contact Name</label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={contact.name}
                        onChange={(e) => setContact(prev => ({ ...prev, name: e.target.value }))}
                        required
                        className="w-full rounded-2xl bg-[#F0F2F5] px-5 py-4 text-sm font-bold text-navy outline-none focus:ring-2 focus:ring-accent/50 transition placeholder:text-navy/30"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="mb-2 block text-xs font-bold text-navy/70 uppercase tracking-wider">Email Address</label>
                        <input
                          type="email"
                          placeholder="you@example.com"
                          value={contact.email}
                          onChange={(e) => setContact(prev => ({ ...prev, email: e.target.value }))}
                          required
                          className="w-full rounded-2xl bg-[#F0F2F5] px-5 py-4 text-sm font-bold text-navy outline-none focus:ring-2 focus:ring-accent/50 transition placeholder:text-navy/30"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-bold text-navy/70 uppercase tracking-wider">Phone Number</label>
                        <PhoneInput
                          defaultCountry="IN"
                          placeholder="8971001010"
                          value={contact.phone}
                          onChange={(val) => setContact(prev => ({ ...prev, phone: val }))}
                          className="w-full rounded-2xl bg-[#F0F2F5] px-5 py-4 text-sm font-bold text-navy outline-none focus-within:ring-2 focus-within:ring-accent/50 transition [&_.PhoneInputCountryIcon]:rounded-sm [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:border-none [&_.PhoneInputCountrySelect]:outline-none [&_.PhoneInputCountryIcon--border]:border-none [&_.PhoneInputInput]:ml-3"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-bold text-navy/70 uppercase tracking-wider">Special Requests / Notes</label>
                      <textarea
                        placeholder="Any medical conditions, dietary preferences, gear sizes, or custom requests?"
                        value={contact.requests}
                        onChange={(e) => setContact(prev => ({ ...prev, requests: e.target.value }))}
                        rows="3"
                        className="w-full rounded-2xl bg-[#F0F2F5] px-5 py-4 text-sm font-bold text-navy outline-none focus:ring-2 focus:ring-accent/50 transition placeholder:text-navy/30 resize-y"
                      ></textarea>
                    </div>
                  </motion.div>
                )}

              </div>

              {/* Navigation Controls */}
              <div className="pt-6 mt-8 border-t border-navy/5 flex items-center justify-between gap-4">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="rounded-full px-6 py-3.5 text-sm font-bold text-navy hover:bg-[#F0F2F5] transition"
                  >
                    ← Back
                  </button>
                ) : <div />}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (currentStep === 1 && (!location || !date)) {
                        alert("Please select a location and preferred date.");
                        return
                      }
                      if (currentStep === 2) {
                        const hasEmpty = participants.some(p => !p.name || !p.age)
                        if (hasEmpty) {
                          alert("Please fill in the Name and Age for all participants.");
                          return
                        }
                      }
                      if (currentStep === 3) {
                        const hasUnselected = participants.some(p => !p.selectedProgram)
                        if (hasUnselected) {
                          alert("Please select an eligible program for each participant.");
                          return
                        }
                      }
                      setCurrentStep(prev => prev + 1)
                    }}
                    className="rounded-full bg-navy px-8 py-3.5 text-sm font-bold text-white transition hover:bg-accent hover:text-navy shadow-md flex items-center gap-2"
                  >
                    Next Step →
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="rounded-full bg-accent px-8 py-3.5 text-sm font-bold text-navy transition hover:bg-white border border-transparent hover:border-accent shadow-md flex items-center gap-2"
                  >
                    Confirm Booking Request ✓
                  </button>
                )}
              </div>
            </form>

          </div>

          {/* Interactive Globe Map Column */}
          <div className="lg:col-span-5 relative w-full aspect-[4/5] lg:aspect-auto h-full rounded-[36px] overflow-hidden bg-navy flex flex-col pt-8 shadow-card border border-navy/10">
            <div className="text-center px-4 z-10 mb-2">
              <span className="text-accent text-[10px] font-bold uppercase tracking-widest">Interactive 3D Globe</span>
              <h3 className="font-heading text-2xl font-bold text-white">Select Dive Location</h3>
            </div>
            <div className="flex-1 relative">
              <InteractiveDiveMap onSiteSelect={handleSiteSelect} />
            </div>
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
