import { useEffect, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import cursorImg from '../assets/cursor.png'
import cursorHoverImg from '../assets/cursor hover.png'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const [hidden, setHidden] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    document.body.classList.add('hide-cursors')

    const checkHover = (target) => {
      if (!target || !(target instanceof Element)) return false
      
      // Check if target or parent is a clickable element
      const interactiveEl = target.closest(
        'button, a, select, input, [role="button"], .cursor-pointer, [data-clickable="true"]'
      )
      if (interactiveEl) return true

      try {
        const style = window.getComputedStyle(target)
        return style && style.cursor === 'pointer'
      } catch {
        return false
      }
    }

    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setHidden(false)
      setIsHovered(checkHover(e.target))
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
  }, [cursorX, cursorY])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <motion.img
      src={isHovered ? cursorHoverImg : cursorImg}
      alt=""
      className="pointer-events-none fixed top-0 left-0 z-[10000] w-20 sm:w-28 h-auto transition-transform duration-150 drop-shadow-lg"
      style={{
        x: cursorX,
        y: cursorY,
        opacity: hidden ? 0 : 1,
        scale: isHovered ? 1.3 : 1,
        filter: isHovered ? 'invert(100%) drop-shadow(0 4px 10px rgba(0,0,0,0.4))' : 'none',
      }}
    />
  )
}
