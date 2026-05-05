import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINES = [
  'INITIALIZING NAVIGATION SYSTEMS...',
  'CALIBRATING STAR CHARTS...',
  'LOADING TRAJECTORY DATA...',
  'ENGAGING WARP DRIVE...',
  'SYSTEMS NOMINAL — LAUNCH READY',
]

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [lineIdx, setLineIdx] = useState(0)
  const [countdown, setCountdown] = useState(3)
  const [phase, setPhase] = useState('loading') // loading | countdown | done

  useEffect(() => {
    // Progress bar
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          return 100
        }
        return p + 1.6
      })
    }, 32)

    // Terminal lines
    const lineTimers = LINES.map((_, i) =>
      setTimeout(() => setLineIdx(i), i * 420 + 200)
    )

    // Transition to countdown
    const countdownStart = setTimeout(() => {
      setPhase('countdown')
      let c = 3
      const countdownInterval = setInterval(() => {
        c -= 1
        setCountdown(c)
        if (c <= 0) {
          clearInterval(countdownInterval)
          setTimeout(() => {
            setPhase('done')
            setTimeout(onComplete, 600)
          }, 400)
        }
      }, 500)
    }, 2200)

    return () => {
      clearInterval(interval)
      lineTimers.forEach(clearTimeout)
      clearTimeout(countdownStart)
    }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#02020f' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* HUD scan line */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ opacity: 0.3 }}
      >
        <motion.div
          className="absolute left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #00f5ff, transparent)' }}
          animate={{ top: ['-1%', '101%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#00f5ff 1px, transparent 1px), linear-gradient(90deg, #00f5ff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Hexagon logo */}
      <motion.div
        className="mb-10"
        animate={{
          filter: [
            'drop-shadow(0 0 10px #00f5ff)',
            'drop-shadow(0 0 30px #00f5ff)',
            'drop-shadow(0 0 10px #00f5ff)',
          ],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <polygon
            points="40,4 72,22 72,58 40,76 8,58 8,22"
            fill="rgba(0,245,255,0.05)"
            stroke="#00f5ff"
            strokeWidth="1.5"
          />
          <text
            x="40" y="48"
            textAnchor="middle"
            fill="#00f5ff"
            fontSize="22"
            fontFamily="Orbitron, sans-serif"
            fontWeight="700"
          >
            AN
          </text>
        </svg>
      </motion.div>

      {/* Terminal text */}
      <div className="w-[min(480px,90vw)] mb-8">
        <AnimatePresence mode="wait">
          {LINES.slice(0, lineIdx + 1).map((line, i) => (
            <motion.p
              key={i}
              className="font-mono-custom text-xs text-cyan/70 tracking-widest mb-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: i === lineIdx ? 1 : 0.3, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-cyan/40 mr-2">{'>'}</span>
              {line}
              {i === lineIdx && (
                <motion.span
                  className="inline-block w-2 h-3 bg-cyan ml-1 align-middle"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                />
              )}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="w-[min(480px,90vw)] mb-6">
        <div className="flex justify-between font-mono-custom text-xs text-text-dim/60 mb-2">
          <span>PROGRESS</span>
          <span>{Math.round(Math.min(progress, 100))}%</span>
        </div>
        <div className="h-px bg-cyan/10 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-cyan"
            style={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ ease: 'linear' }}
          />
          <motion.div
            className="absolute top-0 h-full w-8 bg-white/30"
            style={{
              left: `${Math.min(progress, 100) - 2}%`,
              filter: 'blur(4px)',
            }}
          />
        </div>
      </div>

      {/* Countdown */}
      <AnimatePresence>
        {phase === 'countdown' && countdown > 0 && (
          <motion.div
            key={countdown}
            className="font-orbitron text-6xl font-black text-cyan text-glow-cyan"
            initial={{ opacity: 1, scale: 1.5 }}
            animate={{ opacity: 0, scale: 3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            {countdown}
          </motion.div>
        )}
        {phase === 'countdown' && countdown === 0 && (
          <motion.div
            className="font-orbitron text-3xl font-black text-cyan text-glow-cyan tracking-widest"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            🚀 LAUNCH
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
