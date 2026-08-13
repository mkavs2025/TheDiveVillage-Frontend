import { Link } from 'react-router'
import LogoImg from '../assets/Logo.png'

export default function Logo({ className = '', compact = false, light = false }) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${className}`}
      aria-label="TheDiveVillage home"
    >
      <img 
        src={LogoImg} 
        alt="The Dive Village" 
        className={`h-9 w-auto object-contain transition duration-hover group-hover:scale-105 ${light ? 'brightness-0 invert' : ''}`} 
      />
      {!compact && (
        <span className={`font-heading font-extrabold text-lg tracking-wide ${light ? 'text-white' : 'text-navy'}`}>
          DIVE VILLAGE
        </span>
      )}
    </Link>
  )
}
