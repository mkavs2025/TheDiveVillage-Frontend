import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import preloaderVideo from '@video-optimized/preloader.mp4'

const DIVING_PUNS = [
  'Equalizing pressure...',
  'Checking tanks & oxygen...',
  'Adjusting buoyancy...',
  'Descending into blue paradise...',
  'All systems go for launch! 🤿',
]

function TransparentDiverVideo({ src, className }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    let animId

    const render = () => {
      if (video && video.readyState >= 2) {
        const w = video.videoWidth || 400
        const h = video.videoHeight || 225
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w
          canvas.height = h
        }
        ctx.drawImage(video, 0, 0, w, h)
        const frame = ctx.getImageData(0, 0, w, h)
        const len = frame.data.length / 4
        for (let i = 0; i < len; i++) {
          const r = frame.data[i * 4]
          const g = frame.data[i * 4 + 1]
          const b = frame.data[i * 4 + 2]
          // Make light off-white background pixels (RGB > 210) 100% transparent
          if (r > 210 && g > 210 && b > 210) {
            frame.data[i * 4 + 3] = 0
          }
        }
        ctx.putImageData(frame, 0, 0)
      }
      animId = requestAnimationFrame(render)
    }

    video.play().catch(() => {})
    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
    }
  }, [src])

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="hidden"
      />
      <canvas ref={canvasRef} className={className} />
    </>
  )
}

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const totalDuration = 4200 // 4.2 seconds
    const intervalTime = 30
    const increment = 100 / (totalDuration / intervalTime)

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment
        if (next >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            if (onComplete) onComplete()
          }, 300)
          return 100
        }
        return next
      })
    }, intervalTime)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-center p-6 select-none font-body shadow-2xl"
    >
      {/* Diver Silhouette - Transparent Background Keyed canvas */}
      <div className="w-48 sm:w-60 md:w-72 mb-6 flex items-center justify-center">
        <TransparentDiverVideo
          src={preloaderVideo}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Progress Bar in #003865 */}
      <div className="w-56 sm:w-72 h-2 rounded-full bg-[#003865]/10 overflow-hidden relative mb-3">
        <div
          className="h-full bg-[#003865] rounded-full transition-all duration-75 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Status & Percentage */}
      <div className="flex items-center justify-between w-56 sm:w-72 text-[11px] font-bold text-[#003865]/80 tracking-wider">
        <span className="truncate pr-2">Preparing to dive...</span>
        <span className="shrink-0">{Math.round(progress)}%</span>
      </div>
    </motion.div>
  )
}
