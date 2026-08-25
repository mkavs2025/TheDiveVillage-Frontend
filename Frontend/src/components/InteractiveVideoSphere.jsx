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

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className={`relative w-full h-full bg-navy overflow-hidden cursor-grab active:cursor-grabbing ${className}`}>
      <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
        <Suspense fallback={null}>
          <SphereMesh autoRotate={autoRotate} />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.05}
          autoRotate={autoRotate}
          rotateSpeed={-0.5} 
        />
      </Canvas>
      <div className="absolute top-4 left-4 pointer-events-none">
        <span className="inline-flex rounded-full bg-black/40 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider border border-white/10 shadow-sm">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5"><path d="M2 12a10 10 0 1 0 20 0 10 10 0 1 0-20 0"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
          360° Interactive (Drag to explore)
        </span>
      </div>
    </div>
  )
}
