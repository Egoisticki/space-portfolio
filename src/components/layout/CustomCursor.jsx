import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

const TRAIL_LENGTH = 5
const TRAIL_LIFETIME = 280

export default function CustomCursor() {
  const shouldReduceMotion = useReducedMotion()
  const [isTouch, setIsTouch] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [trail, setTrail] = useState([])
  const idRef = useRef(0)
  const trailTimers = useRef([])

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  // Outer ring follows with spring lag
  const springConfig = { stiffness: 140, damping: 20, mass: 0.4 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  // Detect touch device on mount
  useEffect(() => {
    const hasTouch = window.matchMedia('(pointer: coarse)').matches
    setIsTouch(hasTouch)
  }, [])

  const addTrailPoint = useCallback((x, y) => {
    if (shouldReduceMotion) return
    const id = ++idRef.current
    setTrail((t) => [...t.slice(-(TRAIL_LENGTH - 1)), { id, x, y }])
    const timer = setTimeout(() => {
      setTrail((t) => t.filter((p) => p.id !== id))
    }, TRAIL_LIFETIME)
    trailTimers.current.push(timer)
  }, [shouldReduceMotion])

  useEffect(() => {
    if (isTouch) return

    const onMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
      addTrailPoint(e.clientX, e.clientY)
    }

    const onDown = () => setIsClicking(true)
    const onUp = () => setIsClicking(false)
    const onLeave = () => setIsVisible(false)
    const onEnter = () => setIsVisible(true)

    const onOver = (e) => {
      const el = e.target.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]'
      )
      setIsHovering(!!el)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('mouseenter', onEnter)
    window.addEventListener('mouseover', onOver, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('mouseover', onOver)
      trailTimers.current.forEach(clearTimeout)
    }
  }, [mouseX, mouseY, isTouch, isVisible, addTrailPoint])

  // Don't render on touch or reduced motion (just the trail check)
  if (isTouch) return null

  return (
    <>
      {/* Trail dots */}
      {!shouldReduceMotion && trail.map((point, i) => {
        const age = i / trail.length
        return (
          <motion.div
            key={point.id}
            className="fixed pointer-events-none z-[9998] rounded-full"
            initial={{ opacity: 0.5 * age, scale: 0.8 }}
            animate={{ opacity: 0, scale: 0 }}
            transition={{ duration: TRAIL_LIFETIME / 1000, ease: 'easeOut' }}
            style={{
              left: point.x - 2,
              top: point.y - 2,
              width: 4,
              height: 4,
              background: i % 2 === 0 ? '#00f5ff' : '#7b2fff',
              mixBlendMode: 'screen',
            }}
          />
        )
      })}

      {/* Outer ring — spring lag */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: isHovering ? 50 : isClicking ? 18 : 28,
          height: isHovering ? 50 : isClicking ? 18 : 28,
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      >
        <div
          className="w-full h-full rounded-full border"
          style={{
            borderColor: isHovering ? 'rgba(0,245,255,0.9)' : 'rgba(0,245,255,0.6)',
            mixBlendMode: isHovering ? 'difference' : 'normal',
            boxShadow: isHovering
              ? '0 0 16px rgba(0,245,255,0.6)'
              : '0 0 6px rgba(0,245,255,0.2)',
            transition: 'box-shadow 0.2s, border-color 0.2s',
          }}
        />
      </motion.div>

      {/* Inner dot — exact position */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          left: mouseX,
          top: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: 5,
          height: 5,
          background: '#00f5ff',
          boxShadow: '0 0 8px #00f5ff, 0 0 16px rgba(0,245,255,0.4)',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{ scale: isClicking ? 2.5 : 1 }}
        transition={{ duration: 0.08 }}
      />

      {/* Click ripple */}
      {isClicking && (
        <motion.div
          className="fixed pointer-events-none z-[9998] rounded-full border border-cyan/40"
          style={{
            left: mouseX,
            top: mouseY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ width: 10, height: 10, opacity: 0.6 }}
          animate={{ width: 50, height: 50, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      )}
    </>
  )
}
