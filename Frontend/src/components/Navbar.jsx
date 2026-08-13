import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { AnimatePresence, motion, useReducedMotion, useScroll, useMotionValueEvent } from 'framer-motion'
import Logo from './Logo'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/book-us', label: 'Book Us', highlight: true },
  { to: '/shop', label: 'Shop' },
  { to: '/contact', label: 'Contact Us' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { itemCount } = useCart()
  const { isAuthenticated, user } = useAuth()
  const reduce = useReducedMotion()

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 16)
  })

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const location = useLocation()
  const isDarkBackground = location.pathname === '/'

  const textColor = isDarkBackground ? 'text-white' : 'text-navy'
  const textMuted = isDarkBackground ? 'text-white/80' : 'text-navy/70'
  const borderColor = isDarkBackground ? 'border-white/20' : 'border-navy/20'
  const hoverBg = isDarkBackground ? 'hover:bg-white/10' : 'hover:bg-navy/5'
  const bgSoft = isDarkBackground ? 'bg-white/5' : 'bg-navy/5'

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? (isDarkBackground ? 'bg-navy/90 backdrop-blur-md shadow-sm' : 'bg-white/90 backdrop-blur-md shadow-sm') : 'bg-transparent'}`}
      style={{ textShadow: 'none' }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[72px] sm:px-6 lg:px-8">
        <Logo light={isDarkBackground} />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `relative px-3 py-2 font-heading text-sm font-semibold tracking-wide transition duration-hover ${
                  item.highlight
                    ? 'text-accent'
                    : isActive
                    ? textColor
                    : `${textMuted} hover:text-accent`
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {item.highlight && (
                    <span className="absolute -right-1 top-1 h-1.5 w-1.5 rounded-full bg-cta" />
                  )}
                  {isActive && !item.highlight && (
                    <motion.span
                      layoutId={reduce ? undefined : 'nav-underline'}
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="tel:+918971001010"
            className={`flex items-center gap-2 rounded-full border ${borderColor} ${bgSoft} px-4 py-2 text-sm font-bold ${textColor} backdrop-blur-md transition duration-hover hover:border-accent ${hoverBg}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
            </svg>
            <span className="hidden xl:inline">+91 89710 01010</span>
          </a>

          <Link
            to={isAuthenticated ? '/dashboard/profile' : '/login'}
            className={`flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border ${borderColor} ${textColor} transition duration-hover hover:scale-105 hover:border-accent hover:text-accent`}
            aria-label={isAuthenticated ? 'Account' : 'Login'}
            title={user?.displayName || user?.email || 'Account'}
          >
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'Profile'}
                className="h-full w-full object-cover"
              />
            ) : (
              <UserIcon />
            )}
          </Link>

          <Link
            to="/cart"
            className={`relative flex h-10 w-10 items-center justify-center rounded-full border ${borderColor} ${textColor} transition duration-hover hover:scale-105 hover:border-cta hover:text-cta`}
            aria-label={`Cart, ${itemCount} items`}
          >
            <CartIcon />
            {itemCount > 0 && (
              <motion.span
                key={itemCount}
                initial={reduce ? false : { scale: 0.6 }}
                animate={{ scale: 1 }}
                className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-cta px-1 text-[10px] font-bold text-white"
              >
                {itemCount > 99 ? '99+' : itemCount}
              </motion.span>
            )}
          </Link>

          <button
            type="button"
            className={`flex h-10 w-10 items-center justify-center rounded-full border ${borderColor} ${textColor} transition duration-hover hover:border-accent hover:text-accent lg:hidden`}
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
            className={`overflow-hidden border-t ${borderColor} ${isDarkBackground ? 'bg-navy' : 'bg-white'}`}
          >
            <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 font-heading text-sm font-semibold transition duration-hover ${
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
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 19c1.5-3.5 4-5 7-5s5.5 1.5 7 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
