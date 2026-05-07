// src/components/ui/ProjectCard.jsx
import { useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Particle burst on click ─────────────────────────────────────
function ParticleBurst({ particles }) {
  return (
    <AnimatePresence>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="fixed pointer-events-none z-[200] rounded-full"
          style={{
            left: p.originX,
            top: p.originY,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 6px ${p.color}`,
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: p.dx,
            y: p.dy,
            opacity: 0,
            scale: 0,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />
      ))}
    </AnimatePresence>
  )
}

// ─── Tech pill ───────────────────────────────────────────────────
const TECH_COLORS = {
  React: '#61dafb',
  'Node.js': '#68a063',
  TypeScript: '#3178c6',
  Python: '#3572a5',
  'Three.js': '#00f5ff',
  PostgreSQL: '#336791',
  MongoDB: '#47a248',
  Docker: '#2496ed',
  AWS: '#ff9900',
  Vue: '#42b883',
  GraphQL: '#e535ab',
  'Socket.io': '#a855f7',
  Redis: '#dc382d',
  FastAPI: '#009688',
  'Next.js': '#c8d8f0',
  Sanity: '#f03e2f',
  Tailwind: '#38bdf8',
  Vercel: '#c8d8f0',
  'D3.js': '#ff9a3c',
}

function TechPill({ tech }) {
  const color = TECH_COLORS[tech] || '#5a7a9a'
  return (
    <span
      className="px-2 py-0.5 text-[10px] font-mono-custom tracking-widest rounded-sm border"
      style={{
        color,
        borderColor: `${color}40`,
        background: `${color}10`,
      }}
    >
      {tech}
    </span>
  )
}

// ─── Category badge ──────────────────────────────────────────────
const CATEGORY_COLORS = {
  'Full Stack': { text: '#00f5ff', bg: 'rgba(0,245,255,0.1)', border: 'rgba(0,245,255,0.3)' },
  Frontend: { text: '#a855f7', bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.3)' },
  Backend: { text: '#ff9a3c', bg: 'rgba(255,154,60,0.1)', border: 'rgba(255,154,60,0.3)' },
}

// ─── Main ProjectCard ─────────────────────────────────────────────
export default function ProjectCard({ project, index, onOpenModal }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [particles, setParticles] = useState([])
  const particleIdRef = useRef(0)

  const catStyle = CATEGORY_COLORS[project.category] || CATEGORY_COLORS['Full Stack']

  // ── 3D tilt on mouse move ──
  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    setTilt({ x: -dy * 8, y: dx * 8 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }, [])

  // ── Particle burst on click ──
  const handleClick = useCallback(
    (e) => {
      const colors = [project.color, '#ffffff', '#a855f7', '#ff9a3c']
      const newParticles = Array.from({ length: 14 }, (_, i) => {
        const angle = (i / 14) * Math.PI * 2
        const speed = 40 + Math.random() * 80
        return {
          id: ++particleIdRef.current,
          originX: e.clientX - 3,
          originY: e.clientY - 3,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          size: 4 + Math.random() * 5,
          color: colors[Math.floor(Math.random() * colors.length)],
        }
      })
      setParticles((p) => [...p, ...newParticles])
      setTimeout(() => {
        setParticles((p) => p.filter((pt) => !newParticles.find((np) => np.id === pt.id)))
      }, 800)
      onOpenModal(project)
    },
    [project, onOpenModal]
  )

  return (
    <>
      <ParticleBurst particles={particles} />

      <motion.div
        ref={cardRef}
        className="relative glass-card overflow-hidden cursor-pointer group"
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          boxShadow: hovered
            ? `0 20px 60px ${project.color}20, 0 0 30px ${project.color}15, inset 0 0 30px rgba(0,0,0,0.2)`
            : '0 4px 20px rgba(0,0,0,0.3)',
          borderColor: hovered ? `${project.color}50` : 'rgba(0,245,255,0.15)',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {/* ── Top image/gradient area ── */}
        <div className="relative h-48 overflow-hidden">
          {/* Gradient bg unique per card */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${project.color}18 0%, rgba(5,5,24,1) 80%)`,
            }}
          />
          {/* Second gradient layer */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60`}
          />

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(${project.color}40 1px, transparent 1px), linear-gradient(90deg, ${project.color}40 1px, transparent 1px)`,
              backgroundSize: '30px 30px',
            }}
          />

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-6xl select-none"
              style={{ filter: `drop-shadow(0 0 20px ${project.color}80)` }}
              animate={hovered ? { scale: 1.15, rotate: [0, -5, 5, 0] } : { scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {project.planet}
            </motion.div>
          </div>

          {/* Category badge — top right */}
          <div
            className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono-custom tracking-widest border"
            style={{
              color: catStyle.text,
              background: catStyle.bg,
              borderColor: catStyle.border,
              clipPath: 'polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)',
            }}
          >
            {project.category.toUpperCase()}
          </div>

          {/* Project index — top left */}
          <div className="absolute top-3 left-3 font-mono-custom text-[10px] text-white/20 tracking-widest">
            [{String(index + 1).padStart(2, '0')}]
          </div>

          {/* Scan line sweeps on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${project.color}25 50%, transparent 100%)`,
              width: '60px',
            }}
            animate={hovered ? { x: ['-60px', '110%'] } : { x: '-60px' }}
            transition={hovered ? { duration: 1, repeat: Infinity, ease: 'linear' } : {}}
          />

          {/* Bottom fade into card */}
          <div
            className="absolute bottom-0 left-0 right-0 h-12"
            style={{
              background: 'linear-gradient(transparent, rgba(8,12,40,0.95))',
            }}
          />
        </div>

        {/* ── Card content ── */}
        <div className="p-6 pt-4">
          <h3 className="font-orbitron text-lg font-bold text-star-white mb-2 tracking-wide">
            {project.title}
          </h3>
          <p className="font-rajdhani text-sm text-text-dim leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.map((t) => (
              <TechPill key={t} tech={t} />
            ))}
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            {/* View details */}
            <motion.button
              className="flex items-center gap-2 font-mono-custom text-xs tracking-widest text-cyan/70 hover:text-cyan transition-colors"
              whileHover={{ x: 3 }}
              onClick={(e) => {
                e.stopPropagation()
                onOpenModal(project)
              }}
            >
              VIEW MISSION
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.button>

            {/* GitHub icon */}
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono-custom text-xs tracking-widest text-text-dim/50 hover:text-text-primary transition-colors"
              whileHover={{ scale: 1.1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              CODE
            </motion.a>
          </div>
        </div>

        {/* ── Corner accent decorations ── */}
        <span
          className="absolute top-0 left-0 w-4 h-4 border-t border-l transition-colors duration-300"
          style={{ borderColor: hovered ? project.color : 'rgba(0,245,255,0.3)' }}
        />
        <span
          className="absolute bottom-0 right-0 w-4 h-4 border-b border-r transition-colors duration-300"
          style={{ borderColor: hovered ? project.color : 'rgba(0,245,255,0.3)' }}
        />
      </motion.div>
    </>
  )
}
