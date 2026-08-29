import { forwardRef, useRef } from 'react'
import { motion, useReducedMotion, useMotionValue, useSpring } from 'framer-motion'

const variants = {
  primary:
    'bg-accent text-navy shadow-soft hover:shadow-lift hover:bg-white active:scale-[0.98]',
  secondary:
    'bg-white/10 backdrop-blur-md border border-white/20 text-white border-2 border-accent hover:bg-accent hover:text-navy active:scale-[0.98]',
  ghost:
    'bg-transparent text-white hover:text-accent active:scale-[0.98]',
  navy:
    'bg-navy text-white shadow-soft hover:shadow-lift hover:bg-accent hover:text-navy active:scale-[0.98]',
}

const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    className = '',
    type = 'button',
    as,
    ...props
  },
  forwardedRef
) {
  const reduce = useReducedMotion()
  const Comp = as ? motion.create(as) : motion.button
  const localRef = useRef(null)
  const ref = forwardedRef || localRef

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Use a strong spring for a snappy, magnetic feel
  const springConfig = { stiffness: 400, damping: 25, mass: 0.5 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  const handleMouseMove = (e) => {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    // Move the button 20% of the distance from the center to the mouse
    x.set((e.clientX - centerX) * 0.2)
    y.set((e.clientY - centerY) * 0.2)
  }

  const handleMouseLeave = () => {
    if (reduce) return
    x.set(0)
    y.set(0)
  }

  return (
    <Comp
      ref={ref}
      type={as ? undefined : type}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      whileHover={reduce ? undefined : { scale: 1.05 }}
      whileTap={reduce ? undefined : { scale: 0.95 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-heading text-sm font-bold tracking-wide transition-colors duration-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  )
})

export default Button
