import { useState } from 'react'
import { Link } from 'react-router'
import { IMAGES, CAROUSEL_IMAGES } from '../utils/images'
import InteractiveVideoSphere from '../components/InteractiveVideoSphere'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const response = await fetch('http://localhost:5000/api/content/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message. Please try again.')
      }

      setSuccess(true)
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: 'General Inquiry',
        message: '',
      })
    } catch (err) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen text-navy font-body pt-24 sm:pt-32 pb-24" style={{ textShadow: 'none' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16">
          <div>
            <span className="inline-block bg-black/5 rounded-full px-4 py-1.5 text-xs font-bold text-navy/60 uppercase tracking-widest mb-6">Plan Trip</span>
            <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-navy leading-none">Contact Us</h1>
          </div>
          <p className="max-w-xs text-sm font-medium text-navy/70 leading-relaxed lg:pb-4">
            Tell us when and where you'd like to go and we'll confirm availability within 24 hours.
          </p>
        </div>

        {/* Main Split Section */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Form */}
          <div className="w-full">
            {success && (
              <div className="mb-8 rounded-2xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-700 border border-emerald-100">
                ✅ Your message has been sent to our team! We will get back to you shortly.
              </div>
            )}
            {error && (
              <div className="mb-8 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700 border border-red-100">
                ❌ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="mb-3 block text-xs font-bold text-navy/70">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl bg-[#F0F2F5] px-5 py-4 text-sm text-navy outline-none focus:ring-2 focus:ring-accent/50 transition placeholder:text-navy/30"
                  />
                </div>
                <div>
                  <label className="mb-3 block text-xs font-bold text-navy/70">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl bg-[#F0F2F5] px-5 py-4 text-sm text-navy outline-none focus:ring-2 focus:ring-accent/50 transition placeholder:text-navy/30"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="mb-3 block text-xs font-bold text-navy/70">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 8971001010"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-2xl bg-[#F0F2F5] px-5 py-4 text-sm text-navy outline-none focus:ring-2 focus:ring-accent/50 transition placeholder:text-navy/30"
                  />
                </div>
                <div>
                  <label className="mb-3 block text-xs font-bold text-navy/70">Select Your Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded-2xl bg-[#F0F2F5] px-5 py-4 text-sm text-navy outline-none focus:ring-2 focus:ring-accent/50 transition appearance-none"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Programs Question">Programs Question</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Feedback">Feedback</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-3 block text-xs font-bold text-navy/70">Message / Special Requests</label>
                <textarea
                  name="message"
                  placeholder="Anything else we should know?"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full rounded-3xl bg-[#F0F2F5] p-5 text-sm text-navy outline-none focus:ring-2 focus:ring-accent/50 transition placeholder:text-navy/30 resize-none"
                ></textarea>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-full bg-black px-8 py-4 text-sm font-bold text-white transition hover:bg-black/80 disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Reserve Your Spot'}
                </button>
                <button type="submit" disabled={loading} className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white transition hover:bg-black/80 disabled:opacity-50">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                </button>
              </div>
            </form>
          </div>

          {/* Right Video */}
          <div className="relative w-full aspect-[3/4] lg:aspect-auto h-full rounded-[40px] overflow-hidden">
            <InteractiveVideoSphere autoRotate={false} />
          </div>
        </div>

        {/* Info Blocks */}
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

        {/* Bottom Banner */}
        <div className="mt-32 rounded-[40px] bg-[#F0F2F5] p-10 lg:p-16">
           <div className="grid lg:grid-cols-2 gap-12">
             <div className="flex flex-col justify-center">
               <span className="inline-block self-start bg-black/5 rounded-full px-4 py-1.5 text-xs font-bold text-navy/60 uppercase tracking-widest mb-6">Start now</span>
               <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-navy leading-tight tracking-tight mb-4">Discover your next<br/>perfect ocean escape</h2>
               <p className="text-sm font-medium text-navy/70 leading-relaxed max-w-sm">
                 Plan your trip in minutes and enjoy every moment of your dive adventure.
               </p>
             </div>
             <div className="h-64 lg:h-96 w-full rounded-[40px] overflow-hidden shadow-float relative group">
                <img src={CAROUSEL_IMAGES[3]} alt="Ocean Escape" className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-navy/10 mix-blend-multiply pointer-events-none transition duration-500 group-hover:bg-transparent" />
             </div>
           </div>
        </div>

      </div>
    </div>
  )
}
