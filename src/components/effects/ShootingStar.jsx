import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Star({ id, onComplete }) {
  const startX = Math.random() * 80 + 10  // vw
  const startY = Math.random() * 40        // vh
  const angle = 35 + Math.random() * 20   // degrees
  const length = 80 + Math.random() * 120

  useEffect(() => {
    const timer = setTimeout(onComplete, 1400)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        top: `${startY}vh`,
        left: `${startX}vw`,
        transform: `rotate(${angle}deg)`,
        transformOrigin: 'left center',
      }}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scaleX: [0, 1, 1, 0],
        x: [0, length * 1.5],
        y: [0, length * 0.6],
      }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
      <div
        style={{
          width: `${length}px`,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.9), white)',
          borderRadius: '1px',
          filter: 'drop-shadow(0 0 4px #00f5ff)',
        }}
      />
    </motion.div>
  )
}

export default function ShootingStar() {
  const [stars, setStars] = useState([])
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const spawn = () => {
      setCounter(c => {
        const id = c + 1
        setStars(s => [...s, id])
        return id
      })
      const next = 3000 + Math.random() * 5000
      setTimeout(spawn, next)
    }

    const initial = 2000 + Math.random() * 3000
    const t = setTimeout(spawn, initial)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {stars.map(id => (
          <Star
            key={id}
            id={id}
            onComplete={() => setStars(s => s.filter(sid => sid !== id))}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
