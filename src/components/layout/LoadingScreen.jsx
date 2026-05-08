import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TERMINAL_LINES = [
  { text: 'INITIALIZING NAVIGATION SYSTEMS...', delay: 0 },
  { text: 'CALIBRATING STAR CHARTS...', delay: 420 },
  { text: 'LOADING TRAJECTORY DATA...', delay: 840 },
  { text: 'ENGAGING WARP DRIVE...', delay: 1260 },
  { text: 'SYSTEMS NOMINAL — LAUNCH READY', delay: 1680 },
]

function HexLogo({ pulse }) {
  return (
    <motion.div
      animate={pulse ? {
        filter: [
          'drop-shadow(0 0 10px #00f5ff)',
          'drop-shadow(0 0 40px #00f5ff)',
          'drop-shadow(0 0 10px #00f5ff)',
        ],
      } : {}}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
        {/* Outer ring */}
        <motion.circle
          cx="45" cy="45" r="42"
          stroke="#00f5ff"
          strokeWidth="0.5"
          strokeDasharray="6 4"
          fill="none"
          opacity="0.3"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '45px 45px' }}
        />
        {/* Inner ring */}
        <motion.circle
          cx="45" cy="45" r="34"
          stroke="#7b2fff"
          strokeWidth="0.5"
          strokeDasharray="4 6"
          fill="none"
          opacity="0.2"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '45px 45px' }}
        />
        {/* Hex */}
        <polygon
          points="45,5 79,24 79,62 45,81 11,62 11,24"
          fill="rgba(0,245,255,0.04)"
          stroke="#00f5ff"
          strokeWidth="1.5"
        />
        <text
          x="45" y="53"
          textAnchor="middle"
          fill="#00f5ff"
          fontSize="20"
          fontFamily="Orbitron, sans-serif"
          fontWeight="700"
        >
          AN
        </text>
      </svg>
    </motion.div>
  )
}

function TerminalLine({ text, active, done }) {
  return (
    <motion.p
      className="font-mono-custom text-xs tracking-widest mb-1.5 flex items-center gap-2"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: active ? 1 : done ? 0.35 : 0, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span style={{ color: active ? '#00f5ff' : 'rgba(0,245,255,0.3)' }}>&gt;</span>
      <span style={{ color: active ? 'rgba(200,216,240,0.9)' : 'rgba(90,122,154,0.5)' }}>{text}</span>
      {active && (
        <motion.span
          className="inline-block w-2 h-3 bg-cyan ml-1 align-middle"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.6, repeat: Infinity }}
        />
      )}
      {done && (
        <span style={{ color: 'rgba(0,245,255,0.4)' }}>✓</span>
      )}
    </motion.p>
  )
}

function ProgressBar({ progress }) {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between font-mono-custom text-xs mb-2">
        <span style={{ color: 'rgba(90,122,154,0.7)' }}>PROGRESS</span>
        <span style={{ color: 'rgba(0,245,255,0.8)' }}>{Math.round(progress)}%</span>
      </div>
      <div className="relative h-px" style={{ background: 'rgba(0,245,255,0.08)' }}>
        {/* Fill */}
        <motion.div
          className="absolute top-0 left-0 h-full"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #7b2fff, #00f5ff)',
            boxShadow: '0 0 8px rgba(0,245,255,0.6)',
          }}
        />
        {/* Glow tip */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
          style={{
            left: `${progress}%`,
            transform: `translateX(-50%) translateY(-50%)`,
            background: '#00f5ff',
            boxShadow: '0 0 12px #00f5ff, 0 0 24px rgba(0,245,255,0.5)',
            opacity: progress > 0 ? 1 : 0,
          }}
        />
      </div>
      {/* Sub-grid ticks */}
      <div className="flex justify-between mt-1">
        {[0, 25, 50, 75, 100].map((tick) => (
          <span
            key={tick}
            className="font-mono-custom"
            style={{
              fontSize: 9,
              color: progress >= tick ? 'rgba(0,245,255,0.5)' : 'rgba(90,122,154,0.2)',
            }}
          >
            {tick}
          </span>
        ))}
      </div>
    </div>
  )
}

function HUDCorner({ position }) {
  const classes = {
    'tl': 'top-4 left-4 border-t border-l',
    'tr': 'top-4 right-4 border-t border-r',
    'bl': 'bottom-4 left-4 border-b border-l',
    'br': 'bottom-4 right-4 border-b border-r',
  }
  return (
    <motion.div
      className={`absolute w-8 h-8 border-cyan/30 pointer-events-none ${classes[position]}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    />
  )
}

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [lineIdx, setLineIdx] = useState(-1)
  const [phase, setPhase] = useState('loading') // loading | countdown | launch | done
  const [countdown, setCountdown] = useState(3)
  const progressRef = useRef(0)
  const rafRef = useRef(null)

  useEffect(() => {
    // Smooth progress via RAF
    const startTime = performance.now()
    const duration = 2200

    const tick = (now) => {
      const elapsed = now - startTime
      const t = Math.min(elapsed / duration, 1)
      // Ease: fast start, slow near end (suspense)
      const eased = t < 0.7
        ? t / 0.7 * 0.75
        : 0.75 + ((t - 0.7) / 0.3) * 0.25
      progressRef.current = eased * 100
      setProgress(Math.round(eased * 100))
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    // Terminal lines
    const lineTimers = TERMINAL_LINES.map((line, i) =>
      setTimeout(() => setLineIdx(i), line.delay + 100)
    )

    // Transition to countdown
    const countdownTimer = setTimeout(() => {
      setPhase('countdown')
      let c = 3
      const interval = setInterval(() => {
        c -= 1
        setCountdown(c)
        if (c <= 0) {
          clearInterval(interval)
          setTimeout(() => {
            setPhase('launch')
            setTimeout(() => {
              setPhase('done')
              setTimeout(onComplete, 500)
            }, 700)
          }, 300)
        }
      }, 480)
    }, 2400)

    return () => {
      cancelAnimationFrame(rafRef.current)
      lineTimers.forEach(clearTimeout)
      clearTimeout(countdownTimer)
    }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden select-none"
      style={{ background: '#02020f' }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* HUD corners */}
      {['tl', 'tr', 'bl', 'br'].map((pos) => <HUDCorner key={pos} position={pos} />)}

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,245,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          opacity: 0.025,
        }}
      />

      {/* Scanning line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <motion.div
          className="absolute left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #00f5ff 30%, #7b2fff 70%, transparent)' }}
          animate={{ top: ['-1%', '101%'] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Radial nebula glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(123,47,255,0.06) 0%, rgba(0,245,255,0.02) 40%, transparent 70%)',
        }}
      />

      {/* HUD status top */}
      <motion.div
        className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" style={{ boxShadow: '0 0 6px #00f5ff' }} />
        <span className="font-mono-custom text-xs text-cyan/50 tracking-[0.3em] uppercase">
          SYS BOOT // v2.4.1
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" style={{ boxShadow: '0 0 6px #00f5ff' }} />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center w-[min(520px,90vw)]">
        {/* Logo */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <HexLogo pulse />
        </motion.div>

        {/* Terminal block */}
        <motion.div
          className="w-full mb-8 p-4 relative"
          style={{ border: '1px solid rgba(0,245,255,0.08)', background: 'rgba(0,0,20,0.4)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-3 pb-2" style={{ borderBottom: '1px solid rgba(0,245,255,0.08)' }}>
            {['#ff5f56', '#ffbd2e', '#27c93f'].map((c, i) => (
              <span key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.7 }} />
            ))}
            <span className="font-mono-custom text-[10px] text-text-dim/40 tracking-widest ml-2">stellar-boot.sh</span>
          </div>

          {TERMINAL_LINES.map((line, i) => (
            <TerminalLine
              key={i}
              text={line.text}
              active={lineIdx === i}
              done={lineIdx > i}
            />
          ))}
        </motion.div>

        {/* Progress bar */}
        <div className="w-full">
          <ProgressBar progress={progress} />
        </div>

        {/* Countdown / Launch */}
        <div className="h-20 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {phase === 'loading' && (
              <motion.div
                key="loading-dots"
                className="flex gap-2"
                exit={{ opacity: 0 }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-cyan/40"
                    animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </motion.div>
            )}

            {phase === 'countdown' && countdown > 0 && (
              <motion.div
                key={`count-${countdown}`}
                className="font-orbitron font-black text-cyan"
                style={{
                  fontSize: '5rem',
                  textShadow: '0 0 20px #00f5ff, 0 0 60px rgba(0,245,255,0.4)',
                }}
                initial={{ opacity: 1, scale: 1.4 }}
                animate={{ opacity: 0, scale: 3 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              >
                {countdown}
              </motion.div>
            )}

            {phase === 'launch' && (
              <motion.div
                key="launch"
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
              >
                <motion.span
                  className="text-4xl"
                  animate={{ y: [0, -40], opacity: [1, 0] }}
                  transition={{ duration: 0.7, ease: 'easeIn' }}
                >
                  🚀
                </motion.span>
                <span
                  className="font-orbitron text-2xl font-black tracking-widest"
                  style={{ color: '#00f5ff', textShadow: '0 0 20px #00f5ff' }}
                >
                  LAUNCH
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom coordinates */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {['LAT: 51.5°N', 'LON: 0.1°W', 'ALT: 408KM'].map((coord) => (
          <span key={coord} className="font-mono-custom text-[10px] text-text-dim/30 tracking-widest">
            {coord}
          </span>
        ))}
      </motion.div>
    </motion.div>
  )
}
