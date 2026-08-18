import { Link } from 'react-router'
import Logo from './Logo'

const QUICK = [
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/courses', label: 'All Courses' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/shop', label: 'Shop' },
  { to: '/contact', label: 'Contact Us' },
  { to: '/book-us', label: 'Book Us' },
]

const LEGAL = [
  { to: '/contact', label: 'Privacy Policy' },
  { to: '/contact', label: 'Terms of Service' },
  { to: '/contact', label: 'Cancellation Policy' },
  { to: '/contact', label: 'Safety Guidelines' },
]

const SOCIALS = [
  { label: 'Instagram', to: '#', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
  { label: 'Facebook', to: '#', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3.81l.39-4h-4.2V7a1 1 0 011-1h3z"/></svg> },
  { label: 'LinkedIn', to: '#', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
  { label: 'YouTube', to: '#', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33 2.78 2.78 0 001.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.33 29 29 0 00-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg> },
  { label: 'WhatsApp', to: '#', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg> },
]

export default function Footer() {
  return (
    <footer className="bg-navy/40 backdrop-blur-xl border-t border-white/20 text-white mt-auto relative z-10 pointer-events-auto">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/75">
            More than a destination — it's a community.
          </p>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-accent">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2">
            {QUICK.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className="text-sm text-white/80 transition duration-hover hover:text-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-accent">
            Legal
          </h3>
          <ul className="mt-4 space-y-2">
            {LEGAL.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className="text-sm text-white/80 transition duration-hover hover:text-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-accent">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li>
              <a href="tel:+918971001010" className="transition duration-hover hover:text-accent">
                +91 8971001010
              </a>
            </li>
            <li>
              <a
                href="mailto:hello@thedivevillage.co"
                className="transition duration-hover hover:text-accent"
              >
                hello@thedivevillage.co
              </a>
            </li>
            <li>Ranka Park, Lakshadweep</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8 text-xs text-white/60">
          <div className="flex gap-4 mb-2 sm:mb-0">
            {SOCIALS.map(s => (
              <a key={s.label} href={s.to} className="text-white/60 hover:text-accent transition" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
          <p>© {new Date().getFullYear()} TheDiveVillage. All rights reserved.</p>
          <p>
            Designed &amp; Developed by{' '}
            <span className="text-accent">mKavs Global Tech</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
