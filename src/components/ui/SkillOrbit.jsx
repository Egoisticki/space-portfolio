// src/components/ui/SkillOrbit.jsx
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Single skill node that orbits ───────────────────────────────
function SkillNode({ skill, orbitRadius, angle, size = 48, isPaused }) {
  const [hovered, setHovered] = useState(false)

  const x = Math.cos(angle) * orbitRadius
  const y = Math.sin(angle) * orbitRadius

  return (
    <motion.div
      className="absolute"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        translateX: '-50%',
        translateY: '-50%',
        zIndex: hovered ? 10 : 1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-20 pointer-events-none"
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            transition={{ duration: 0.18 }}
          >
            <div
              className="glass-card px-3 py-2 whitespace-nowrap"
              style={{
                border: `1px solid ${skill.color}40`,
                boxShadow: `0 0 15px ${skill.color}20`,
              }}
            >
              <p
                className="font-orbitron text-xs font-bold tracking-wide text-center"
                style={{ color: skill.color }}
              >
                {skill.name}
              </p>
              <div className="relative h-px bg-white/10 mt-1.5 overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 transition-none"
                  style={{ width: `${skill.level}%`, background: skill.color }}
                />
              </div>
              <p className="font-mono-custom text-[9px] text-text-dim text-center mt-1">
                {skill.level}% PROFICIENCY
              </p>
            </div>
            {/* Arrow */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0"
              style={{
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: `5px solid ${skill.color}30`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Node circle */}
      <motion.div
        className="flex items-center justify-center rounded-full select-none cursor-pointer"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${skill.color}22 0%, rgba(5,5,24,0.9) 100%)`,
          border: `1px solid ${skill.color}${hovered ? '80' : '35'}`,
          boxShadow: hovered
            ? `0 0 20px ${skill.color}50, 0 0 40px ${skill.color}20, inset 0 0 10px ${skill.color}10`
            : `0 0 8px ${skill.color}20`,
          fontSize: typeof skill.icon === 'string' && skill.icon.length <= 2 ? '13px' : '20px',
          fontFamily: skill.icon.length <= 2 ? 'JetBrains Mono, monospace' : 'inherit',
          color: skill.color,
          fontWeight: 'bold',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
        animate={hovered ? { scale: 1.3 } : { scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {skill.icon}
      </motion.div>

      {/* Connection line to center (shows on hover) */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute pointer-events-none"
            style={{
              left: '50%',
              top: '50%',
              width: orbitRadius,
              height: '1px',
              background: `linear-gradient(90deg, rgba(0,0,0,0), ${skill.color}50)`,
              transformOrigin: '0 0',
              transform: `rotate(${Math.atan2(-y, -x)}rad)`,
              zIndex: -1,
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Orbit ring (SVG dashed circle) ──────────────────────────────
function OrbitRing({ radius, duration, color, dashArray, reverse, isPaused }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <svg
        width={radius * 2 + 20}
        height={radius * 2 + 20}
        viewBox={`0 0 ${radius * 2 + 20} ${radius * 2 + 20}`}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          animation: `${reverse ? 'orbit-reverse' : 'orbit'} ${duration}s linear ${isPaused ? 'paused' : 'running'} infinite`,
        }}
      >
        <circle
          cx={radius + 10}
          cy={radius + 10}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="0.6"
          strokeDasharray={dashArray}
          opacity="0.35"
        />
      </svg>
    </div>
  )
}

// ─── Main SkillOrbit component ────────────────────────────────────
export default function SkillOrbit({ skills, inView }) {
  const [isPaused, setIsPaused] = useState(false)
  const [angles, setAngles] = useState({ inner: 0, middle: Math.PI / 4, outer: Math.PI / 6 })
  const rafRef = useRef(null)
  const lastTimeRef = useRef(null)

  useEffect(() => {
    if (!inView) return

    const animate = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp
      const delta = (timestamp - lastTimeRef.current) / 1000
      lastTimeRef.current = timestamp

      if (!isPaused) {
        setAngles((prev) => ({
          inner: prev.inner + delta * (Math.PI * 2) * (1 / 20),    // 20s revolution
          middle: prev.middle - delta * (Math.PI * 2) * (1 / 35),   // 35s reverse
          outer: prev.outer + delta * (Math.PI * 2) * (1 / 50),    // 50s
        }))
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [inView, isPaused])

  const INNER_R = 130
  const MIDDLE_R = 210
  const OUTER_R = 295

  // Compute angles for each skill on its ring
  const innerAngles = skills.inner.map((_, i) => angles.inner + (i / skills.inner.length) * Math.PI * 2)
  const middleAngles = skills.middle.map((_, i) => angles.middle + (i / skills.middle.length) * Math.PI * 2)
  const outerAngles = skills.outer.map((_, i) => angles.outer + (i / skills.outer.length) * Math.PI * 2)

  return (
    <div
      className="relative w-full"
      style={{ height: '660px' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Galaxy background glow ── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(123,47,255,0.08) 0%, rgba(0,245,255,0.04) 40%, transparent 70%)',
        }}
      />

      {/* ── Orbit rings ── */}
      <OrbitRing radius={INNER_R} duration={20} color="#00f5ff" dashArray="6 10" reverse={false} isPaused={isPaused} />
      <OrbitRing radius={MIDDLE_R} duration={35} color="#7b2fff" dashArray="4 8" reverse={true} isPaused={isPaused} />
      <OrbitRing radius={OUTER_R} duration={50} color="#a855f7" dashArray="3 12" reverse={false} isPaused={isPaused} />

      {/* ── Center hex node ── */}
      <div
        className="absolute"
        style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 5 }}
      >
        <motion.div
          animate={{
            filter: [
              'drop-shadow(0 0 10px #00f5ff)',
              'drop-shadow(0 0 25px #00f5ff)',
              'drop-shadow(0 0 10px #00f5ff)',
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <svg width="84" height="84" viewBox="0 0 84 84" fill="none">
            <polygon
              points="42,4 76,23 76,61 42,80 8,61 8,23"
              fill="rgba(0,245,255,0.06)"
              stroke="#00f5ff"
              strokeWidth="1.2"
            />
            <polygon
              points="42,12 68,27 68,57 42,72 16,57 16,27"
              fill="rgba(0,245,255,0.04)"
              stroke="#00f5ff"
              strokeWidth="0.5"
              opacity="0.4"
            />
            <text
              x="42" y="47"
              textAnchor="middle"
              fill="#00f5ff"
              fontSize="15"
              fontFamily="Orbitron, sans-serif"
              fontWeight="800"
            >
              CORE
            </text>
          </svg>
        </motion.div>
      </div>

      {/* ── Inner orbit nodes ── */}
      {skills.inner.map((skill, i) => (
        <SkillNode
          key={skill.name}
          skill={skill}
          orbitRadius={INNER_R}
          angle={innerAngles[i]}
          size={50}
          isPaused={isPaused}
        />
      ))}

      {/* ── Middle orbit nodes ── */}
      {skills.middle.map((skill, i) => (
        <SkillNode
          key={skill.name}
          skill={skill}
          orbitRadius={MIDDLE_R}
          angle={middleAngles[i]}
          size={44}
          isPaused={isPaused}
        />
      ))}

      {/* ── Outer orbit nodes ── */}
      {skills.outer.map((skill, i) => (
        <SkillNode
          key={skill.name}
          skill={skill}
          orbitRadius={OUTER_R}
          angle={outerAngles[i]}
          size={40}
          isPaused={isPaused}
        />
      ))}

      {/* ── Pause hint ── */}
      <AnimatePresence>
        {isPaused && (
          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono-custom text-[9px] text-cyan/40 tracking-widest pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            // ORBIT PAUSED — HOVER NODE FOR DETAILS
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
