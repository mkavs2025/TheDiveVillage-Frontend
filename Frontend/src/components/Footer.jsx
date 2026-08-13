import { Link } from 'react-router'
import Logo from './Logo'

const QUICK = [
  { to: '/#about', label: 'Our Story' },
  { to: '/#programs', label: 'Programs' },
  { to: '/#gallery', label: 'Gallery' },
  { to: '/book-us', label: 'Book Us' },
  { to: '/shop', label: 'Shop' },
  { to: '/contact', label: 'Contact Us' },
]

const LEGAL = [
  { to: '/contact', label: 'Privacy Policy' },
  { to: '/contact', label: 'Terms of Service' },
  { to: '/contact', label: 'Cancellation Policy' },
  { to: '/contact', label: 'Safety Guidelines' },
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
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-center text-xs text-white/60 sm:flex-row sm:px-6 lg:px-8">
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
