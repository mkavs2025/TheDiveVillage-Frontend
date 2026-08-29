import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/shop', label: 'Shop' },
  { to: '/contact', label: 'Contact Us' },
  { to: '/book-us', label: 'Book Us', highlight: true },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { itemCount } = useCart()
  const { isAuthenticated, user } = useAuth()
  const reduce = useReducedMotion()

  const location = useLocation()
  const [isNightDive, setIsNightDive] = useState(false)

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsNightDive(document.body.classList.contains('night-dive'))
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    setIsNightDive(document.body.classList.contains('night-dive'))
    return () => observer.disconnect()
  }, [])

  const toggleNightDive = () => {
    if (isNightDive) {
      document.body.classList.remove('night-dive')
    } else {
      document.body.classList.add('night-dive')
    }
  }

  const isVideoBg = ['/', '/login', '/contact'].includes(location.pathname)
  const isDarkBackground = isVideoBg || isNightDive

  const textColor = isDarkBackground ? 'text-white' : 'text-navy'
  const hoverText = isDarkBackground ? 'hover:text-white' : 'hover:text-navy'
  const textMuted = isDarkBackground ? 'text-white/70' : 'text-navy/70'
  const borderColor = isDarkBackground ? 'border-white/20' : 'border-navy/20'
  const hoverBg = isDarkBackground ? 'hover:bg-white/10' : 'hover:bg-navy/5'
  const bgSoft = isDarkBackground ? 'bg-transparent' : 'bg-transparent'

  return (
    <header className="fixed top-4 left-0 right-0 z-[9999] w-full px-4 flex justify-center pointer-events-none transition-all duration-300">
      <div className={`pointer-events-auto relative grid grid-cols-[1fr_auto_1fr] h-[72px] lg:h-[80px] w-full max-w-[1400px] items-center px-6 lg:px-8 rounded-full shadow-float border border-white/10 ${location.pathname === '/' ? 'bg-navy/40 backdrop-blur-xl' : 'bg-[#003865]'}`}>
        
        {/* Left Side: Home, Book Us, Contact Us */}
        <div className="flex items-center justify-evenly w-full">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `relative whitespace-nowrap font-body text-[15px] font-bold tracking-wide transition-all duration-300 ${
                isActive 
                  ? 'text-accent after:content-[""] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-[2px] after:bg-accent' 
                  : 'text-white hover:text-accent after:content-[""] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-[2px] after:bg-accent after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/book-us"
            className={({ isActive }) =>
              `relative whitespace-nowrap font-body text-[15px] font-bold tracking-wide transition-all duration-300 ${
                isActive 
                  ? 'text-accent after:content-[""] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-[2px] after:bg-accent' 
                  : 'text-white hover:text-accent after:content-[""] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-[2px] after:bg-accent after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300'
              }`
            }
          >
            Book Us
            <span className="absolute -top-1 -right-3 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `hidden lg:block relative whitespace-nowrap font-body text-[15px] font-bold tracking-wide transition-all duration-300 ${
                isActive 
                  ? 'text-accent after:content-[""] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-[2px] after:bg-accent' 
                  : 'text-white hover:text-accent after:content-[""] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-[2px] after:bg-accent after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300'
              }`
            }
          >
            Contact Us
          </NavLink>
        </div>

        {/* Middle: Logo (Absolute Center) */}
        <div className="flex justify-center items-center px-4 shrink-0">
          <Logo light={true} compact={true} className="[&>img]:h-10 sm:[&>img]:h-12" />
        </div>

        {/* Right Side: Phone, Night toggle, profile, menu */}
        <div className="flex items-center justify-evenly w-full">

          <a
            href="tel:+918971001010"
            className="flex h-10 items-center justify-center gap-2 rounded-xl border border-white/30 px-3 text-white transition duration-hover hover:bg-white/10 hover:border-white"
            aria-label="Call Us"
          >
            <PhoneIcon />
            <span className="hidden xl:inline text-[14px] font-bold tracking-wide whitespace-nowrap">Call +91 89710 01010</span>
          </a>

          <div className="flex h-10 items-center justify-center gap-2 rounded-xl border border-white/30 px-3 text-white transition duration-hover hover:bg-white/10 hover:border-white shrink-0">
            <ThemeToggle isNightDive={isNightDive} onToggle={toggleNightDive} />
            <span className="hidden xl:inline text-[14px] font-bold tracking-wide whitespace-nowrap">Night Mode</span>
          </div>

          <Link
            to={isAuthenticated ? '/dashboard/profile' : '/login'}
            className="flex h-10 items-center justify-center gap-2 rounded-xl border border-white/30 px-3 text-white transition duration-hover hover:bg-white/10 hover:border-white shrink-0"
            aria-label={isAuthenticated ? 'Account' : 'Login'}
            title={user?.displayName || user?.email || 'Account'}
          >
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'Profile'}
                className="h-6 w-6 rounded-full object-cover shrink-0"
              />
            ) : (
              <UserIcon />
            )}
            <span className="hidden xl:inline text-[14px] font-bold tracking-wide whitespace-nowrap">Profile</span>
          </Link>

          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition duration-hover hover:bg-white/10 hover:border-white lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`overflow-hidden border-t ${borderColor} ${isDarkBackground ? 'bg-navy/90 backdrop-blur-md' : 'bg-white/90 backdrop-blur-md'}`}
          >
            <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 font-heading text-[15px] font-bold transition duration-hover ${
                      item.highlight
                        ? 'bg-accent/20 text-accent'
                        : isActive
                        ? (isDarkBackground ? 'bg-white/10 text-white' : 'bg-navy/5 text-navy')
                        : `${textColor} ${hoverBg}`
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <button 
                onClick={() => {
                  toggleNightDive()
                  setOpen(false)
                }}
                className={`rounded-xl px-4 py-3 font-heading text-[15px] font-bold transition duration-hover text-left ${textColor} ${hoverBg}`}
              >
                {isNightDive ? '☀️ Switch to Day Dive' : '🌙 Switch to Night Dive'}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 3h3l1.5 5-2 1.5a12 12 0 005 5L16 13l5 1.5V18a2 2 0 01-2 2A15 15 0 015 5a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 19c1.5-3.5 4-5 7-5s5.5 1.5 7 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 6h2l2.2 10h9.6L20 8H8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="20" r="1.4" fill="currentColor" />
      <circle cx="17" cy="20" r="1.4" fill="currentColor" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
