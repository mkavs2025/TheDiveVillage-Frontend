import { useState, useEffect, Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useVideoTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useLocation } from 'react-router'
import videoFile from '../assets/Hero.mp4'
import bookFile from '../assets/Book.mp4'

function VideoSphere({ videoSrc }) {
  const meshRef = useRef()
  const meshRef2 = useRef()
  const targetRotation = useRef({ x: 0, y: 0 })
  const targetOpacity2 = useRef(0)
  const location = useLocation()
  const isHome = location.pathname === '/'

  const texture = useVideoTexture(videoSrc, {
    crossOrigin: 'Anonymous',
    muted: true,
    loop: true,
    start: true,
    playsInline: true,
  })
  texture.colorSpace = THREE.SRGBColorSpace

  // We only load bookFile for the crossfade if we are on the Home page
  // (On the About page, bookFile is already passed in as videoSrc, so texture2 would be redundant, but we still load it to avoid hook condition violations)
  const texture2 = useVideoTexture(bookFile, {
    crossOrigin: 'Anonymous',
    muted: true,
    loop: true,
    start: true,
    playsInline: true,
  })
  texture2.colorSpace = THREE.SRGBColorSpace

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const isAbout = location.pathname === '/about'
      const INITIAL_YAW = Math.PI / 2.65 - (Math.PI * 1.1) // Shifted a little right from previous
      // Tilt book.mp4 (About page) more downwards to center it
      const INITIAL_PITCH = isAbout ? -(Math.PI / 6) : (Math.PI / 16)

      const aboutEl = document.getElementById('about-section')
      const programsEl = document.getElementById('programs-section')
      
      const diveSectionEl = document.getElementById('who-can-dive-section')
      const gallerySectionEl = document.getElementById('gallery-section')

      if (diveSectionEl && gallerySectionEl && isHome) {
        const diveRect = diveSectionEl.getBoundingClientRect()
        const galleryRect = gallerySectionEl.getBoundingClientRect()
        
        const fadeStart1 = window.innerHeight * 0.9
        const fadeEnd1 = window.innerHeight * 0.2
        const fadeStart2 = window.innerHeight * 0.9
        const fadeEnd2 = window.innerHeight * 0.2

        if (galleryRect.top < fadeStart2) {
          // Fading OUT because gallery is approaching
          if (galleryRect.top < fadeEnd2) {
            targetOpacity2.current = 0
          } else {
            targetOpacity2.current = (galleryRect.top - fadeEnd2) / (fadeStart2 - fadeEnd2)
          }
        } else if (diveRect.top < fadeStart1) {
          // Fading IN because dive section is approaching
          if (diveRect.top < fadeEnd1) {
            targetOpacity2.current = 1
          } else {
            targetOpacity2.current = 1 - (diveRect.top - fadeEnd1) / (fadeStart1 - fadeEnd1)
          }
        } else {
          targetOpacity2.current = 0
        }
      }

      if (!aboutEl || !programsEl) {
        // Fallback if elements aren't mounted yet
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0
        targetRotation.current.y = INITIAL_YAW
        targetRotation.current.x = INITIAL_PITCH + scrollProgress * (Math.PI * 2)
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
        targetRotation.current.y = INITIAL_YAW
        targetRotation.current.x = INITIAL_PITCH + progress * (Math.PI / 8)
      } else if (scrollY >= aboutTop && scrollY < programsTop) {
        // 2. Between About Section and Programs Section
        // Hold vertical pitch, move horizontally
        targetRotation.current.x = INITIAL_PITCH + (Math.PI / 8)
        
        const distance = programsTop - aboutTop
        const progress = distance > 0 ? (scrollY - aboutTop) / distance : 0
        targetRotation.current.y = INITIAL_YAW + progress * (Math.PI / 1.5)
      } else {
        // 3. After Programs Section
        // Hold horizontal yaw, resume moving downwards to sea bed
        targetRotation.current.y = INITIAL_YAW + Math.PI / 1.5
        
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        const distanceRemaining = maxScroll - programsTop
        const progress = distanceRemaining > 0 ? (scrollY - programsTop) / distanceRemaining : 1
        
        // Pitch downwards sharply to show sea bed
        targetRotation.current.x = INITIAL_PITCH + (Math.PI / 8) + progress * (Math.PI / 2)
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

      if (meshRef2.current && isHome) {
        meshRef2.current.rotation.y = meshRef.current.rotation.y
        // Offset book.mp4's pitch so it frames the middle/lower part of the video better
        meshRef2.current.rotation.x = meshRef.current.rotation.x - (Math.PI / 4.5)
        meshRef2.current.material.opacity += (targetOpacity2.current - meshRef2.current.material.opacity) * delta * 5
      }
    }
  })

  return (
    <group>
      <mesh ref={meshRef} scale={[-1, 1, 1]}>
        <sphereGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>
      {/* Secondary mesh for crossfade texture */}
      {isHome && (
        <mesh ref={meshRef2} scale={[-0.99, 0.99, 0.99]}>
          <sphereGeometry args={[500, 60, 40]} />
          <meshBasicMaterial map={texture2} side={THREE.BackSide} transparent={true} opacity={0} depthWrite={false} />
        </mesh>
      )}
    </group>
  )
}

export default function VideoSphereBackground() {
  const [mounted, setMounted] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // Prevent SSR/hydration mismatches if any

  const isAbout = location.pathname === '/about'
  const currentVideo = isAbout ? bookFile : videoFile

  return (
    <div className="absolute inset-0 -z-10">
      <div className="sticky top-0 h-[100dvh] w-full bg-navy overflow-hidden">
        <Canvas camera={{ position: [0, 0, 0.1], fov: 110 }}>
          <Suspense fallback={null}>
            <VideoSphere videoSrc={currentVideo} key={currentVideo} />
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
