import { useState, useRef, useEffect } from 'react'

export default function Joystick() {
  const outerRef = useRef(null)
  const [knobPosition, setKnobPosition] = useState({ x: 0, y: 0 })
  const isDragging = useRef(false)

  const handlePointerDown = (e) => {
    isDragging.current = true
    updatePosition(e)
  }

  const handlePointerMove = (e) => {
    if (!isDragging.current) return
    updatePosition(e)
  }

  const handlePointerUp = () => {
    isDragging.current = false
    setKnobPosition({ x: 0, y: 0 })
    window.dispatchEvent(new CustomEvent('joystickMove', { detail: { x: 0, y: 0 } }))
  }

  const updatePosition = (e) => {
    if (!outerRef.current) return
    
    const rect = outerRef.current.getBoundingClientRect()
    // Center of the joystick
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate distance from center
    let dx = e.clientX - centerX
    let dy = e.clientY - centerY

    // Max distance is the radius of the outer circle minus the radius of the inner knob
    const maxRadius = rect.width / 2 - 20 // 20 is knob radius
    
    const distance = Math.sqrt(dx * dx + dy * dy)
    if (distance > maxRadius) {
      const ratio = maxRadius / distance
      dx *= ratio
      dy *= ratio
    }

    setKnobPosition({ x: dx, y: dy })
    
    // Normalize to -1 to 1 and pass to custom event
    const normalizedX = dx / maxRadius
    const normalizedY = dy / maxRadius
    window.dispatchEvent(new CustomEvent('joystickMove', { detail: { x: normalizedX, y: normalizedY } }))
  }

  useEffect(() => {
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerUp)
    return () => {
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', handlePointerUp)
    }
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-[60] pointer-events-auto sm:bottom-8 sm:right-8">
      <div
        ref={outerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        className="w-20 h-20 sm:w-24 sm:h-24 bg-navy/30 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center relative touch-none shadow-lg cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'none' }}
      >
        <div
          className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/90 rounded-full shadow-md pointer-events-none"
          style={{
            transform: `translate(${knobPosition.x}px, ${knobPosition.y}px)`,
            transition: isDragging.current ? 'none' : 'transform 0.2s ease-out'
          }}
        />
      </div>
    </div>
  )
}
