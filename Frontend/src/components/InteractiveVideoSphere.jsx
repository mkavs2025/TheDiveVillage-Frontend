import { useState, useEffect, Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useVideoTexture } from '@react-three/drei'
import * as THREE from 'three'
import videoFile from '../assets/Hero.mp4'

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
  const [is360Active, setIs360Active] = useState(true)
  const [isRotating, setIsRotating] = useState(autoRotate)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className={`relative w-full h-full bg-navy overflow-hidden cursor-grab active:cursor-grabbing ${className}`}>
      <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
        <Suspense fallback={null}>
          <SphereMesh autoRotate={isRotating} />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.05}
          autoRotate={isRotating || is360Active}
          autoRotateSpeed={isRotating ? 1.0 : 0.4}
          rotateSpeed={-0.5} 
        />
      </Canvas>

      {/* Interactive 360 Toggle in Bottom Right */}
      <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2 pointer-events-auto">
        <button
          type="button"
          onClick={() => {
            setIs360Active(!is360Active)
            setIsRotating(!isRotating)
          }}
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all shadow-lg border backdrop-blur-md cursor-pointer ${
            is360Active || isRotating
              ? 'bg-accent text-navy border-accent hover:bg-white hover:border-white'
              : 'bg-black/70 text-white border-white/20 hover:bg-black'
          }`}
          aria-label="Toggle 360 Video View"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={is360Active || isRotating ? 'animate-spin-slow' : ''}
          >
            <path d="M2 12a10 10 0 1 0 20 0 10 10 0 1 0-20 0" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            <path d="M2 12h20" />
          </svg>
          <span>360° {is360Active || isRotating ? 'ON' : 'OFF'}</span>
        </button>
      </div>
    </div>
  )
}
