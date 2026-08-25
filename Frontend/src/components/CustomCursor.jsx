import { useEffect, useState } from 'react'
import { motion, useMotionValue, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router'
import cursorImg from '../assets/cursor.png'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const [hidden, setHidden] = useState(true)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    // If not on the homepage, hide the custom cursor and restore standard cursors
    if (!isHomePage) {
      setHidden(true)
      document.body.classList.remove('hide-cursors')
      return
    }

    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      
      const isClickableHovered = e.target.closest('header, footer, a, button, [role="button"], #dive-map-container')
      
      // If over the header/footer or any clickable element, show standard cursor
      if (isClickableHovered) {
        setHidden(true)
        document.body.classList.remove('hide-cursors')
      } else {
        setHidden(false)
        document.body.classList.add('hide-cursors')
      }
    }


    const handleMouseLeave = () => setHidden(true)
    const handleMouseEnter = () => setHidden(false)

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseenter', handleMouseEnter)
      document.body.classList.remove('hide-cursors')
    }
  }, [cursorX, cursorY, hidden, isHomePage])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null // Don't show on touch devices
  }

  if (!isHomePage) {
    return null // Only render custom cursor on index page
  }

  return (
    <>
      <AnimatePresence>
      </AnimatePresence>
      <motion.img
        src={cursorImg}
        className="pointer-events-none fixed top-0 left-0 z-[10000] w-16 h-auto"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: hidden ? 0 : 1
        }}
      />
    </>
  )
}
