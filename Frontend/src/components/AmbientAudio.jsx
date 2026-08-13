import { useEffect, useRef, useState } from 'react'

export default function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  // A free ambient ocean waves sound for the premium feel
  const audioSrc = "https://cdn.freesound.org/previews/413/413289_7335607-lq.mp3"

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2 // Soft background volume
    }
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch((e) => console.log('Audio play failed:', e))
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <>
      <audio ref={audioRef} src={audioSrc} loop playsInline />
      <button
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-[9000] flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white shadow-soft transition-all duration-300 hover:scale-110 hover:border-accent hover:text-accent"
        aria-label={isPlaying ? 'Pause ambient sound' : 'Play ambient sound'}
      >
        {isPlaying ? <SoundOnIcon /> : <SoundOffIcon />}
      </button>
    </>
  )
}

function SoundOnIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M11 5L6 9H2V15H6L11 19V5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.54 8.46C16.4774 9.39764 17.004 10.6692 17.004 11.995C17.004 13.3208 16.4774 14.5924 15.54 15.53M19.07 4.93C20.9447 6.80528 21.9979 9.34836 21.9979 12C21.9979 14.6516 20.9447 17.1947 19.07 19.07"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SoundOffIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M11 5L6 9H2V15H6L11 19V5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="23" y1="1" x2="1" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
