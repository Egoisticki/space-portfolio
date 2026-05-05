// src/components/sections/About.jsx
import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import { personalInfo } from '../../data/portfolio'

// ─── Count-up hook ────────────────────────────────────────────────
function useCountUp(target, duration = 1800, inView = false) {
  const [count, setCount] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!inView || startedRef.current) return
    startedRef.current = true

    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out expo
      const eased = 1 - Math.pow(2, -10 * progress)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target, duration])

  return count
}

// ─── Stat card ───────────────────────────────────────────────────
function StatCard({ label, value, suffix, inView, delay }) {
  const count = useCountUp(value, 1600, inView)
  return (
    <motion.div
      className="relative flex flex-col items-center justify-center p-6 glass-card"
      style={{
        clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.03 }}
    >
      {/* Corner accents */}
      <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan/60" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan/60" />

      <span className="font-orbitron text-3xl md:text-4xl font-black text-cyan text-glow-cyan">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="font-mono-custom text-[10px] text-text-dim tracking-[0.25em] mt-2 uppercase">
        {label}
      </span>
    </motion.div>
  )
}

// ─── Skill bar ───────────────────────────────────────────────────
function SkillBar({ name, level, delay, inView }) {
  return (
    <motion.div
      className="mb-5"
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-mono-custom text-xs text-text-primary tracking-widest">{name}</span>
        <span className="font-mono-custom text-xs text-cyan/70">{level}%</span>
      </div>
      <div className="relative h-px bg-white/5 overflow-visible">
        {/* Track */}
        <div className="absolute inset-0 bg-white/5" />
        {/* Fill */}
        <motion.div
          className="absolute top-0 left-0 h-full"
          style={{
            background: 'linear-gradient(90deg, #00f5ff, #7b2fff)',
            boxShadow: '0 0 8px rgba(0,245,255,0.6)',
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ delay: delay + 0.2, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        {/* Glow head */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan"
          style={{ boxShadow: '0 0 10px #00f5ff, 0 0 20px #00f5ff' }}
          initial={{ left: 0 }}
          animate={inView ? { left: `${level}%` } : { left: 0 }}
          transition={{ delay: delay + 0.2, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </motion.div>
  )
}

// ─── Orbit ring decorations (SVG) ───────────────────────────────
function ProfileOrbit() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 340 340"
      fill="none"
    >
      {/* Outer orbit ring */}
      <circle
        cx="170" cy="170" r="155"
        stroke="#00f5ff"
        strokeWidth="0.5"
        strokeDasharray="8 12"
        opacity="0.25"
        style={{ animation: 'orbit 22s linear infinite' }}
      />
      {/* Inner orbit ring */}
      <circle
        cx="170" cy="170" r="130"
        stroke="#7b2fff"
        strokeWidth="0.5"
        strokeDasharray="5 9"
        opacity="0.2"
        style={{ animation: 'orbit-reverse 16s linear infinite' }}
      />

      {/* Satellite dots */}
      {/* Outer satellite */}
      <g style={{ animation: 'orbit 22s linear infinite', transformOrigin: '170px 170px' }}>
        <circle cx="170" cy="15" r="5" fill="#00f5ff" opacity="0.9">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="170" cy="15" r="8" fill="none" stroke="#00f5ff" strokeWidth="0.5" opacity="0.4" />
      </g>
      {/* Inner satellite */}
      <g style={{ animation: 'orbit-reverse 16s linear infinite', transformOrigin: '170px 170px' }}>
        <circle cx="170" cy="40" r="4" fill="#a855f7" opacity="0.8">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="1.8s" repeatCount="indefinite" />
        </circle>
      </g>
      {/* Third tiny satellite */}
      <g style={{ animation: 'orbit 30s linear infinite', transformOrigin: '170px 170px' }}>
        <circle cx="170" cy="25" r="2.5" fill="#ff9a3c" opacity="0.7" />
      </g>
    </svg>
  )
}

// ─── Main component ──────────────────────────────────────────────
export default function About() {
  const sectionRef = useRef(null)
  const statsRef = useRef(null)
  const skillsRef = useRef(null)

  const isInView = useInView(sectionRef, { once: true, margin: '-100px 0px' })
  const statsInView = useInView(statsRef, { once: true, margin: '-50px 0px' })
  const skillsInView = useInView(skillsRef, { once: true, margin: '-50px 0px' })

  const skillsLeft = [
    { name: 'React / React Native', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Node.js / Express', level: 88 },
    { name: 'Python / FastAPI', level: 82 },
    { name: 'Three.js / WebGL', level: 75 },
  ]
  const skillsRight = [
    { name: 'PostgreSQL / MongoDB', level: 85 },
    { name: 'Docker / Kubernetes', level: 78 },
    { name: 'AWS / Cloud', level: 72 },
    { name: 'Next.js', level: 88 },
    { name: 'UI/UX / Figma', level: 85 },
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* ── Background subtle grid ── */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,245,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Nebula blobs ── */}
      <div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(123,47,255,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'nebula-drift 20s ease-in-out infinite',
        }}
      />
      <div
        className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'nebula-drift 25s ease-in-out infinite reverse',
        }}
      />

      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label="Bio"
          title="ABOUT ME"
          subtitle="Human behind the code — mission parameters and capabilities"
        />

        {/* ── Two-column layout ── */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">

          {/* ── LEFT: Profile ── */}
          <motion.div
            className="flex flex-col items-center lg:items-start gap-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Profile image wrapper */}
            <div className="relative w-72 h-72 flex-shrink-0 mx-auto lg:mx-0">
              {/* Orbit rings SVG */}
              <div className="absolute inset-[-15px]">
                <ProfileOrbit />
              </div>

              {/* Glow backdrop */}
              <div
                className="absolute inset-4 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(0,245,255,0.15) 0%, rgba(123,47,255,0.1) 50%, transparent 70%)',
                  filter: 'blur(15px)',
                }}
              />

              {/* Avatar circle */}
              <div
                className="absolute inset-8 rounded-full overflow-hidden border-2 border-cyan/40"
                style={{ boxShadow: '0 0 30px rgba(0,245,255,0.2), inset 0 0 20px rgba(0,245,255,0.05)' }}
              >
                {/* Placeholder gradient avatar */}
                <div
                  className="w-full h-full flex items-center justify-center text-7xl select-none"
                  style={{
                    background: 'linear-gradient(135deg, #0d0230 0%, #1a0550 50%, #0a0a2e 100%)',
                  }}
                >
                  👨‍🚀
                </div>

                {/* Scan shimmer */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(0,245,255,0.08) 50%, transparent 100%)',
                  }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: 'linear' }}
                />
              </div>

              {/* Status badge */}
              <motion.div
                className="absolute bottom-6 right-2 flex items-center gap-2 px-3 py-1.5 glass-card"
                style={{ clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)' }}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8, type: 'spring' }}
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono-custom text-[10px] text-green-400 tracking-widest">AVAILABLE</span>
              </motion.div>
            </div>

            {/* Bio text */}
            <div className="space-y-4 max-w-md text-center lg:text-left">
              <motion.p
                className="font-rajdhani text-lg text-text-primary leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                Navigating the digital cosmos for{' '}
                <span className="text-cyan font-semibold">5+ years</span>, I build interfaces
                that feel alive. Obsessed with the intersection of{' '}
                <span className="text-violet-bright font-semibold">performance and aesthetics</span>{' '}
                — turning complex engineering challenges into experiences that feel effortless.
              </motion.p>
              <motion.p
                className="font-rajdhani text-base text-text-dim leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.45 }}
              >
                When not deploying to production, I'm exploring generative art, contributing to
                open source, and dreaming up new ways to push the web forward.
              </motion.p>

              {/* Location + email pills */}
              <motion.div
                className="flex flex-wrap gap-3 justify-center lg:justify-start"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
              >
                {[
                  { icon: '📍', text: 'Station Alpha, Earth Orbit' },
                  { icon: '📡', text: 'alex@stellardev.io' },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-2 px-3 py-1.5 border border-cyan/15 text-text-dim font-mono-custom text-xs tracking-wide"
                    style={{ background: 'rgba(0,245,255,0.03)' }}
                  >
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* ── RIGHT: Skill bars ── */}
          <div ref={skillsRef}>
            <motion.p
              className="font-mono-custom text-xs text-cyan/60 tracking-[0.3em] mb-8"
              initial={{ opacity: 0 }}
              animate={skillsInView ? { opacity: 1 } : {}}
            >
              // SKILL MATRIX — PROFICIENCY LEVELS
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              <div>
                {skillsLeft.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={i * 0.08}
                    inView={skillsInView}
                  />
                ))}
              </div>
              <div>
                {skillsRight.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={i * 0.08 + 0.1}
                    inView={skillsInView}
                  />
                ))}
              </div>
            </div>

            {/* Passion tags */}
            <motion.div
              className="mt-8 flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={skillsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
            >
              {[
                'WebGL', 'Performance', 'DX', 'Open Source',
                'Generative Art', 'Web APIs', 'Accessibility',
              ].map((tag, i) => (
                <motion.span
                  key={tag}
                  className="px-3 py-1 text-xs font-mono-custom tracking-widest border text-text-dim/70"
                  style={{
                    borderColor: i % 3 === 0 ? 'rgba(0,245,255,0.2)' : i % 3 === 1 ? 'rgba(123,47,255,0.2)' : 'rgba(255,154,60,0.2)',
                    background: i % 3 === 0 ? 'rgba(0,245,255,0.03)' : i % 3 === 1 ? 'rgba(123,47,255,0.03)' : 'rgba(255,154,60,0.03)',
                  }}
                  whileHover={{ scale: 1.05, opacity: 1 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={skillsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8 + i * 0.05 }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {personalInfo.stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              inView={statsInView}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
