import { useState, useEffect, Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useVideoTexture } from '@react-three/drei'
import * as THREE from 'three'
import videoFile from '../assets/VID_20260525_095921_00_220.mp4'

function VideoSphere() {
  const meshRef = useRef()
  const targetRotation = useRef({ x: 0, y: 0 })

  const texture = useVideoTexture(videoFile, {
    crossOrigin: 'Anonymous',
    muted: true,
    loop: true,
    start: true,
    playsInline: true,
  })

  texture.colorSpace = THREE.SRGBColorSpace

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      
      const aboutEl = document.getElementById('about-section')
      const programsEl = document.getElementById('programs-section')

      if (!aboutEl || !programsEl) {
        // Fallback if elements aren't mounted yet
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0
        targetRotation.current.y = Math.PI / 2.65
        targetRotation.current.x = -Math.PI / 8 + scrollProgress * (Math.PI * 2)
        return
      }

      const aboutRect = aboutEl.getBoundingClientRect()
      const programsRect = programsEl.getBoundingClientRect()
      
      // Calculate absolute positions relative to the top of the document
      const aboutTop = scrollY + aboutRect.top
      const programsTop = scrollY + programsRect.top

      if (scrollY < aboutTop) {
        // 1. Before About Section
        // Move slightly downwards
        const progress = aboutTop > 0 ? scrollY / aboutTop : 0
        targetRotation.current.y = Math.PI / 2.65
        targetRotation.current.x = -Math.PI / 8 + progress * (Math.PI / 8)
      } else if (scrollY >= aboutTop && scrollY < programsTop) {
        // 2. Between About Section and Programs Section
        // Hold vertical pitch, move horizontally
        targetRotation.current.x = -Math.PI / 8 + (Math.PI / 8)
        
        const distance = programsTop - aboutTop
        const progress = distance > 0 ? (scrollY - aboutTop) / distance : 0
        targetRotation.current.y = Math.PI / 2.65 + progress * (Math.PI / 1.5)
      } else {
        // 3. After Programs Section
        // Hold horizontal yaw, resume moving downwards to sea bed
        targetRotation.current.y = Math.PI / 2.65 + Math.PI / 1.5
        
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        const distanceRemaining = maxScroll - programsTop
        const progress = distanceRemaining > 0 ? (scrollY - programsTop) / distanceRemaining : 1
        
        // Pitch downwards sharply to show sea bed
        targetRotation.current.x = -Math.PI / 8 + (Math.PI / 8) + progress * (Math.PI / 2)
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initialize
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // --- DRAG LOGIC ---
  const isDragging = useRef(false)
  const previousPointer = useRef({ x: 0, y: 0 })
  const dragOffset = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onPointerDown = (e) => {
      // Do not initiate drag if the user is clicking on an interactive element (buttons, links, etc.)
      if (e.target.closest('button, a, input, textarea, select, [role="button"]')) {
        return
      }
      
      isDragging.current = true
      previousPointer.current = { x: e.clientX, y: e.clientY }
    }
    
    const onPointerMove = (e) => {
      if (!isDragging.current) return
      
      // Calculate delta
      const dx = e.clientX - previousPointer.current.x
      const dy = e.clientY - previousPointer.current.y
      previousPointer.current = { x: e.clientX, y: e.clientY }
      
      // Update drag offsets
      dragOffset.current.y -= dx * 0.005 
      dragOffset.current.x -= dy * 0.005
    }
    
    const onPointerUp = () => {
      isDragging.current = false
    }

    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove, { passive: false })
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerUp)

    return () => {
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
    }
  }, [])

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Combine programmatic scroll rotation with user's manual drag offset
      const finalTargetX = targetRotation.current.x + dragOffset.current.x
      const finalTargetY = targetRotation.current.y + dragOffset.current.y
      
      // Smoothly interpolate the mesh rotation towards the combined target
      meshRef.current.rotation.y += (finalTargetY - meshRef.current.rotation.y) * delta * 5
      meshRef.current.rotation.x += (finalTargetX - meshRef.current.rotation.x) * delta * 5
    }
  })

  return (
    <mesh ref={meshRef} scale={[-1, 1, 1]}>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  )
}

export default function VideoSphereBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // Prevent SSR/hydration mismatches if any

  return (
    <div className="absolute inset-0 -z-10">
      <div className="sticky top-0 h-[100dvh] w-full bg-navy overflow-hidden">
        <Canvas camera={{ position: [0, 0, 0.1], fov: 90 }}>
          <Suspense fallback={null}>
            <VideoSphere />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping={true}
            dampingFactor={0.05}
            autoRotate={false}
            rotateSpeed={-0.5} // Invert rotation since we are inside the sphere
          />
        </Canvas>
        {/* Subtle Gradient Vignette Overlay to ensure text readability */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-navy/70 via-transparent to-navy/90" />
      </div>
    </div>
  )
}
