import { useEffect, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import cursorImg from '../assets/cursor.png'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    document.body.classList.add('hide-cursors')

    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setHidden(false)
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
      src={cursorImg}
      alt=""
      className="pointer-events-none fixed top-0 left-0 z-[10000] w-10 h-auto"
      style={{
        x: cursorX,
        y: cursorY,
        opacity: hidden ? 0 : 1,
      }}
    />
  )
}
