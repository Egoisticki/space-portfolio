import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

function Star({ id, onComplete }) {
  const startX = Math.random() * 75 + 5   // 5–80vw
  const startY = Math.random() * 45        // 0–45vh
  const angle  = 28 + Math.random() * 24  // 28–52 degrees
  const length = 70 + Math.random() * 110 // 70–180px
  const speed  = 0.9 + Math.random() * 0.5

  useEffect(() => {
    const timer = setTimeout(onComplete, (speed * 1000) + 200)
    return () => clearTimeout(timer)
  }, [onComplete, speed])

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        top: `${startY}vh`,
        left: `${startX}vw`,
        transform: `rotate(${angle}deg)`,
        transformOrigin: 'left center',
      }}
      initial={{ opacity: 0, scaleX: 0, x: 0, y: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scaleX: [0, 1, 1, 0],
        x: [0, length * 1.6],
        y: [0, length * 0.55],
      }}
      transition={{ duration: speed, ease: 'easeOut' }}
    >
      {/* Main trail */}
      <div
        style={{
          width: `${length}px`,
          height: '1.5px',
          background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.6) 40%, rgba(200,220,255,0.95), white)',
          borderRadius: '1px',
          filter: 'drop-shadow(0 0 3px #00f5ff)',
        }}
      />
      {/* Bright head */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white"
        style={{ boxShadow: '0 0 6px white, 0 0 12px #00f5ff' }}
      />
    </motion.div>
  )
}

export default function ShootingStar() {
  const shouldReduceMotion = useReducedMotion()
  const [stars, setStars] = useState([])
  const [counter, setCounter] = useState(0)
  const timerRef = useRef(null)

  const spawn = useCallback(() => {
    setCounter((c) => {
      const id = c + 1
      setStars((s) => [...s, id])
      return id
    })
  }, [])

  useEffect(() => {
    if (shouldReduceMotion) return

    let timeoutId

    const scheduleNext = () => {
      const delay = 3500 + Math.random() * 6000
      timeoutId = setTimeout(() => {
        spawn()
        scheduleNext()
      }, delay)
    }

    // Initial delay
    const initialDelay = 2500 + Math.random() * 3000
    timeoutId = setTimeout(() => {
      spawn()
      scheduleNext()
    }, initialDelay)

    return () => clearTimeout(timeoutId)
  }, [spawn, shouldReduceMotion])

  if (shouldReduceMotion) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {stars.map((id) => (
          <Star
            key={id}
            id={id}
            onComplete={() => setStars((s) => s.filter((sid) => sid !== id))}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
