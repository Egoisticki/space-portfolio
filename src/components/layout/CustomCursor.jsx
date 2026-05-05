import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [trail, setTrail] = useState([])
  const trailRef = useRef([])
  const idRef = useRef(0)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springX = useSpring(mouseX, { stiffness: 120, damping: 18, mass: 0.5 })
  const springY = useSpring(mouseY, { stiffness: 120, damping: 18, mass: 0.5 })

  useEffect(() => {
    const onMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      // Trail
      const id = ++idRef.current
      setTrail(t => [...t.slice(-4), { id, x: e.clientX, y: e.clientY }])
      setTimeout(() => {
        setTrail(t => t.filter(p => p.id !== id))
      }, 300)
    }

    const onDown = () => setIsClicking(true)
    const onUp = () => setIsClicking(false)

    const onEnter = (e) => {
      if (
        e.target.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]')
      ) {
        setIsHovering(true)
      }
    }
    const onLeave = (e) => {
      if (
        e.target.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]')
      ) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('mouseover', onEnter)
    window.addEventListener('mouseout', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('mouseover', onEnter)
      window.removeEventListener('mouseout', onLeave)
    }
  }, [mouseX, mouseY])

  return (
    <>
      {/* Trail dots */}
      {trail.map((point, i) => (
        <motion.div
          key={point.id}
          className="fixed pointer-events-none z-[9998]"
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            left: point.x - 2,
            top: point.y - 2,
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: '#00f5ff',
            mixBlendMode: 'screen',
          }}
        />
      ))}

      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 48 : isClicking ? 20 : 30,
          height: isHovering ? 48 : isClicking ? 20 : 30,
          opacity: isClicking ? 0.5 : 1,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <div
          className="w-full h-full rounded-full border border-cyan/80"
          style={{
            mixBlendMode: isHovering ? 'difference' : 'normal',
            boxShadow: '0 0 8px rgba(0, 245, 255, 0.3)',
          }}
        />
      </motion.div>

      {/* Inner dot — follows exactly */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: mouseX,
          top: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#00f5ff',
          boxShadow: '0 0 10px #00f5ff',
        }}
        animate={{ scale: isClicking ? 2 : 1 }}
        transition={{ duration: 0.1 }}
      />
    </>
  )
}
