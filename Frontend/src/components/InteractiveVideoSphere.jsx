import { useState, useEffect, Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useVideoTexture } from '@react-three/drei'
import * as THREE from 'three'
import videoFile from '@video-optimized/Hero.mp4'

function SphereMesh({ autoRotate }) {
  const meshRef = useRef()
  const texture = useVideoTexture(videoFile, {
    crossOrigin: 'Anonymous',
    muted: true,
    loop: true,
    start: true,
    playsInline: true,
  })
  
  texture.colorSpace = THREE.SRGBColorSpace

  return (
    <mesh ref={meshRef} scale={[-1, 1, 1]}>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  )
}

export default function InteractiveVideoSphere({ autoRotate = true, className = "" }) {
  const [mounted, setMounted] = useState(false)
  const controlsRef = useRef()
  const containerRef = useRef(null)
  const isDragging = useRef(false)
  const [thumbPos, setThumbPos] = useState({ x: 0, y: 0 })
  const MAX_RADIUS = 14

  useEffect(() => {
    setMounted(true)
  }, [])

  const handlePointerDown = (e) => {
    isDragging.current = true
    updateJoystick(e)
    e.target.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e) => {
    if (!isDragging.current) return
    updateJoystick(e)
  }

  const handlePointerUp = (e) => {
    isDragging.current = false
    setThumbPos({ x: 0, y: 0 })
    try {
      e.target.releasePointerCapture(e.pointerId)
    } catch {}
  }

  const updateJoystick = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    let dx = e.clientX - centerX
    let dy = e.clientY - centerY
    const distance = Math.sqrt(dx * dx + dy * dy)
    if (distance > MAX_RADIUS) {
      dx = (dx / distance) * MAX_RADIUS
      dy = (dy / distance) * MAX_RADIUS
    }
    setThumbPos({ x: dx, y: dy })
    if (controlsRef.current) {
      controlsRef.current.setAzimuthalAngle(controlsRef.current.getAzimuthalAngle() - dx * 0.005)
      controlsRef.current.setPolarAngle(
        Math.max(0.1, Math.min(Math.PI - 0.1, controlsRef.current.getPolarAngle() + dy * 0.005))
      )
      controlsRef.current.update()
    }
  }

  if (!mounted) return null

  return (
    <div className={`relative w-full h-full bg-navy overflow-hidden cursor-grab active:cursor-grabbing ${className}`}>
      <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
        <Suspense fallback={null}>
          <SphereMesh autoRotate={autoRotate} />
        </Suspense>
        <OrbitControls
          ref={controlsRef}
          enableZoom={false}
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.05}
          autoRotate={autoRotate}
          autoRotateSpeed={1.0}
          rotateSpeed={-0.5} 
        />
      </Canvas>

      {/* Interactive 360 Toggle Circle Overlay */}
      <div className="absolute bottom-6 right-6 z-30 flex flex-col items-center gap-2 pointer-events-auto">
        <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest bg-navy/60 px-2 py-1 rounded-md backdrop-blur-md">
          360° Toggle
        </span>
        <div 
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative w-16 h-16 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center shadow-lg cursor-grab active:cursor-grabbing touch-none"
        >
          <div
            className="w-8 h-8 rounded-full bg-white/80 shadow-soft border border-white/50"
            style={{ 
              transform: `translate(${thumbPos.x}px, ${thumbPos.y}px)`, 
              transition: isDragging.current ? 'none' : 'transform 0.2s ease-out' 
            }}
          />
        </div>
      </div>
    </div>
  )
}
