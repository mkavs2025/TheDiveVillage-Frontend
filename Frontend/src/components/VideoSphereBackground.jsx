import { useState, useEffect, Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useVideoTexture } from '@react-three/drei'
import * as THREE from 'three'
import videoFile from '../assets/VID_20260525_095921_00_220.mp4'

function VideoSphere() {
  const meshRef = useRef()
  // Initial target rotation to point at a nice angle
  const targetRotation = useRef({ x: -Math.PI / 8, y: Math.PI / 2.65 })
  const joystickInput = useRef({ x: 0, y: 0 })

  const texture = useVideoTexture(videoFile, {
    crossOrigin: 'Anonymous',
    muted: true,
    loop: true,
    start: true,
    playsInline: true,
  })

  texture.colorSpace = THREE.SRGBColorSpace

  useEffect(() => {
    const onJoystickMove = (e) => {
      joystickInput.current = e.detail
    }
    window.addEventListener('joystickMove', onJoystickMove)
    return () => window.removeEventListener('joystickMove', onJoystickMove)
  }, [])

  // --- DRAG LOGIC ---
  const isDragging = useRef(false)
  const previousPointer = useRef({ x: 0, y: 0 })
  const dragOffset = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onPointerDown = (e) => {
      if (e.target.closest('button, a, input, textarea, select, [role="button"]')) {
        return
      }
      isDragging.current = true
      previousPointer.current = { x: e.clientX, y: e.clientY }
    }
    
    const onPointerMove = (e) => {
      if (!isDragging.current) return
      
      const dx = e.clientX - previousPointer.current.x
      const dy = e.clientY - previousPointer.current.y
      previousPointer.current = { x: e.clientX, y: e.clientY }
      
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
      // Continuous panning based on joystick input
      if (joystickInput.current.x !== 0 || joystickInput.current.y !== 0) {
        // Joystick X moves left/right (yaw = Y axis), Y moves up/down (pitch = X axis)
        targetRotation.current.y -= joystickInput.current.x * delta * 1.5
        targetRotation.current.x -= joystickInput.current.y * delta * 1.5
      }

      const finalTargetX = targetRotation.current.x + dragOffset.current.x
      const finalTargetY = targetRotation.current.y + dragOffset.current.y
      
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
