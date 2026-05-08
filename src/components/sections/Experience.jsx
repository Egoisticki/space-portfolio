import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import { experience } from '../../data/portfolio'

const TYPE_CONFIG = {
  work: {
    icon: '◈',
    color: '#00f5ff',
    borderColor: 'rgba(0,245,255,0.3)',
    glowColor: 'rgba(0,245,255,0.15)',
  },
  education: {
    icon: '✦',
    color: '#a855f7',
    borderColor: 'rgba(168,85,247,0.3)',
    glowColor: 'rgba(168,85,247,0.15)',
  },
}

function TimelineItem({ item, index, isLeft }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const cfg = TYPE_CONFIG[item.type] || TYPE_CONFIG.work

  return (
    <div ref={ref} className={`relative flex items-start gap-0 mb-16 ${isLeft ? 'flex-row-reverse' : 'flex-row'} md:gap-8`}>

      {/* Card */}
      <motion.div
        className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? 'md:text-right' : ''}`}
        initial={{ opacity: 0, x: isLeft ? 40 : -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div
          className="glass-card p-6 relative overflow-hidden group transition-all duration-300 hover:scale-[1.01]"
          style={{
            borderColor: cfg.borderColor,
            boxShadow: inView ? `0 0 30px ${cfg.glowColor}` : 'none',
          }}
        >
          {/* Scan line on hover */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100"
              style={{
                background: `linear-gradient(180deg, transparent, ${cfg.color}, transparent)`,
                animation: 'scan-line 1.8s ease-in-out infinite',
                filter: `drop-shadow(0 0 4px ${cfg.color})`,
              }}
            />
          </div>

          {/* Corner decorations */}
          <span className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor: cfg.color, opacity: 0.5 }} />
          <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: cfg.color, opacity: 0.5 }} />

          {/* Date */}
          <p className="font-mono-custom text-xs tracking-widest mb-2" style={{ color: '#ff9a3c' }}>
            {item.date}
          </p>

          {/* Role */}
          <h3 className="font-orbitron text-base font-bold text-star-white mb-1">{item.role}</h3>

          {/* Company */}
          <div className={`flex items-center gap-2 mb-4 ${isLeft ? 'md:justify-end' : ''}`}>
            <span className="font-rajdhani text-sm font-semibold" style={{ color: cfg.color }}>{item.company}</span>
            <span className="text-text-dim/40">·</span>
            <span className="font-mono-custom text-xs text-text-dim/60">{item.location}</span>
          </div>

          {/* Achievements */}
          <ul className={`space-y-2 mb-4 ${isLeft ? 'md:items-end' : ''} flex flex-col`}>
            {item.achievements.map((achievement, i) => (
              <motion.li
                key={i}
                className={`flex items-start gap-2 ${isLeft ? 'md:flex-row-reverse' : ''}`}
                initial={{ opacity: 0, x: isLeft ? 10 : -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              >
                <span className="mt-1 flex-shrink-0 w-1 h-1 rounded-full" style={{ background: cfg.color, boxShadow: `0 0 4px ${cfg.color}` }} />
                <span className="font-rajdhani text-sm text-text-dim/80 leading-snug">{achievement}</span>
              </motion.li>
            ))}
          </ul>

          {/* Tech tags */}
          <div className={`flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : ''}`}>
            {item.tech.map((t) => (
              <span
                key={t}
                className="font-mono-custom text-[10px] px-2 py-0.5 tracking-wider"
                style={{
                  border: `1px solid ${cfg.color}30`,
                  color: cfg.color,
                  background: `${cfg.color}08`,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Spacer for center line on desktop */}
      <div className="hidden md:block w-16 flex-shrink-0" />
    </div>
  )
}

function TimelineNode({ index, item, progress }) {
  const cfg = TYPE_CONFIG[item.type] || TYPE_CONFIG.work
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className="absolute left-1/2 -translate-x-1/2 z-10"
      style={{ top: `${(index / (experience.length - 1)) * 100}%` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.4, delay: 0.1, type: 'spring', stiffness: 200 }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-base relative"
        style={{
          background: 'rgba(2,2,15,0.9)',
          border: `2px solid ${cfg.color}`,
          boxShadow: `0 0 20px ${cfg.color}60, 0 0 40px ${cfg.color}20`,
        }}
      >
        <span style={{ color: cfg.color }}>{cfg.icon}</span>
        {/* Pulse ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: `1px solid ${cfg.color}`,
            animation: 'pulse-glow 2s ease-in-out infinite',
            transform: 'scale(1.4)',
          }}
        />
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.2'],
  })

  // Rocket moves along the timeline
  const rocketY = useTransform(scrollYProgress, [0, 1], ['0%', '90%'])
  const rocketGlow = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.6])

  // Line draws itself
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="experience" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      {/* Background atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(123,47,255,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        <SectionTitle label="Timeline" title="MISSION LOG" align="center" />

        <div className="relative mt-16">
          {/* ── Center vertical line ── */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px">
            {/* Static dim track */}
            <div className="absolute inset-0 bg-cyan/10" />
            {/* Animated glowing fill */}
            <motion.div
              className="absolute top-0 left-0 w-full origin-top"
              style={{
                scaleY: lineScaleY,
                background: 'linear-gradient(180deg, #00f5ff, #7b2fff)',
                boxShadow: '0 0 8px rgba(0,245,255,0.6)',
              }}
            />
          </div>

          {/* ── Rocket indicator ── */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none" style={{ top: 0, height: '100%' }}>
            <motion.div
              className="absolute left-1/2 -translate-x-1/2"
              style={{ top: rocketY }}
            >
              <motion.div
                style={{ opacity: rocketGlow }}
                className="text-2xl select-none"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                🚀
              </motion.div>
              {/* Exhaust trail */}
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 w-px h-8"
                style={{ background: 'linear-gradient(180deg, rgba(0,245,255,0.6), transparent)' }}
              />
            </motion.div>
          </div>

          {/* ── Timeline nodes (desktop) ── */}
          <div className="hidden md:block absolute left-0 right-0 top-0 bottom-0 pointer-events-none">
            {experience.map((item, i) => (
              <TimelineNode key={i} index={i} item={item} progress={scrollYProgress} />
            ))}
          </div>

          {/* ── Timeline items ── */}
          <div className="relative">
            {experience.map((item, i) => (
              <TimelineItem
                key={i}
                item={item}
                index={i}
                isLeft={i % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
