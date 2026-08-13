import { useEffect, useState } from 'react'
import { motion, useMotionValue, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router'
import cursorImg from '../assets/cursor.png'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const [hidden, setHidden] = useState(true)
  const [fishes, setFishes] = useState([])
  
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
      
      const isClickableHovered = e.target.closest('header, footer, a, button, [role="button"]')
      
      // If over the header/footer or any clickable element, show standard cursor
      if (isClickableHovered) {
        setHidden(true)
        document.body.classList.remove('hide-cursors')
      } else {
        setHidden(false)
        document.body.classList.add('hide-cursors')
      }
    }

    const handleClick = (e) => {
      if (hidden) return // Don't spawn fish if custom cursor is hidden (e.g. over toolbar)
      
      const id = Date.now() + Math.random()
      const size = Math.floor(Math.random() * (70 - 24 + 1)) + 24 // Smaller sizes: between 24px and 70px
      
      // Calculate a random position within a distinct circular ring around the click
      const maxRadius = 150
      const minRadius = 50
      const angle = Math.random() * Math.PI * 2
      // Using sqrt for a more even distribution within the circular area
      const distance = Math.sqrt(Math.random()) * (maxRadius - minRadius) + minRadius
      
      const finalX = e.clientX + Math.cos(angle) * distance
      const finalY = e.clientY + Math.sin(angle) * distance
      
      setFishes((prev) => [...prev, { id, x: finalX, y: finalY, size }])

      // Pop out after 1.5 seconds
      setTimeout(() => {
        setFishes((prev) => prev.filter((f) => f.id !== id))
      }, 1500)
    }

    const handleMouseLeave = () => setHidden(true)
    const handleMouseEnter = () => setHidden(false)

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('click', handleClick)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('click', handleClick)
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
        {fishes.map((fish) => (
          <motion.img
            key={fish.id}
            src={cursorImg}
            initial={{ scale: 0, opacity: 0, x: fish.x - (fish.size / 2), y: fish.y - (fish.size / 2) }}
            animate={{ scale: 1, opacity: 1, y: fish.y - (fish.size / 2) - 30 }}
            exit={{ scale: 0, opacity: 0, y: fish.y - (fish.size / 2) - 60 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="pointer-events-none fixed top-0 left-0 z-[9999]"
            style={{ width: fish.size, height: 'auto' }}
          />
        ))}
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
