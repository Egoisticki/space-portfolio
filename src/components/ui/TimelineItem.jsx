import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const TYPE_CONFIG = {
  work: {
    icon: '◈',
    color: '#00f5ff',
    borderColor: 'rgba(0,245,255,0.25)',
    glowColor: 'rgba(0,245,255,0.12)',
  },
  education: {
    icon: '✦',
    color: '#a855f7',
    borderColor: 'rgba(168,85,247,0.25)',
    glowColor: 'rgba(168,85,247,0.12)',
  },
}

export default function TimelineItem({ item, index, isLeft = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const cfg = TYPE_CONFIG[item.type] || TYPE_CONFIG.work

  return (
    <div
      ref={ref}
      className={`relative flex items-start mb-16 ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'} flex-col md:gap-8`}
    >
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
          <span className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor: cfg.color, opacity: 0.5 }} />
          <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: cfg.color, opacity: 0.5 }} />

          <p className="font-mono-custom text-xs tracking-widest mb-2 text-amber-400">{item.date}</p>
          <h3 className="font-orbitron text-base font-bold text-star-white mb-1">{item.role}</h3>

          <div className={`flex items-center gap-2 mb-4 ${isLeft ? 'md:justify-end' : ''}`}>
            <span className="font-rajdhani text-sm font-semibold" style={{ color: cfg.color }}>{item.company}</span>
            <span className="text-text-dim/40">·</span>
            <span className="font-mono-custom text-xs text-text-dim/60">{item.location}</span>
          </div>

          <ul className={`space-y-2 mb-4 flex flex-col ${isLeft ? 'md:items-end' : ''}`}>
            {item.achievements.map((achievement, i) => (
              <motion.li
                key={i}
                className={`flex items-start gap-2 ${isLeft ? 'md:flex-row-reverse' : ''}`}
                initial={{ opacity: 0, x: isLeft ? 10 : -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              >
                <span className="mt-1 flex-shrink-0 w-1 h-1 rounded-full" style={{ background: cfg.color }} />
                <span className="font-rajdhani text-sm text-text-dim/80 leading-snug">{achievement}</span>
              </motion.li>
            ))}
          </ul>

          <div className={`flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : ''}`}>
            {item.tech.map((t) => (
              <span
                key={t}
                className="font-mono-custom text-[10px] px-2 py-0.5 tracking-wider"
                style={{ border: `1px solid ${cfg.color}30`, color: cfg.color, background: `${cfg.color}08` }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Spacer for center line */}
      <div className="hidden md:block w-16 flex-shrink-0" />
    </div>
  )
}
