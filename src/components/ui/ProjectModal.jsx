// src/components/ui/ProjectModal.jsx
import { useEffect, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

function TechBadge({ tech }) {
  const color = TECH_COLORS[tech] || '#5a7a9a'
  return (
    <span
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-custom tracking-widest border"
      style={{
        color,
        borderColor: `${color}50`,
        background: `${color}12`,
        clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
      }}
    >
      {tech}
    </span>
  )
}

export default function ProjectModal({ project, projects, onClose, onNavigate }) {
  const [direction, setDirection] = useState(0) // -1 prev, 1 next
  const [activeTab, setActiveTab] = useState('overview')

  const currentIndex = projects.findIndex((p) => p.id === project.id)

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1)
      onNavigate(projects[currentIndex - 1])
    }
  }, [currentIndex, projects, onNavigate])

  const handleNext = useCallback(() => {
    if (currentIndex < projects.length - 1) {
      setDirection(1)
      onNavigate(projects[currentIndex + 1])
    }
  }, [currentIndex, projects, onNavigate])

  // Keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, handlePrev, handleNext])

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  }

  return (
    <>
      {/* ── Backdrop ── */}
      <motion.div
        className="fixed inset-0 z-[90] backdrop-blur-xl"
        style={{ background: 'rgba(2, 2, 15, 0.92)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* ── Modal panel ── */}
      <motion.div
        className="fixed inset-0 z-[91] flex items-end md:items-center justify-center p-0 md:p-6 pointer-events-none"
      >
        <motion.div
          className="relative w-full max-w-4xl max-h-[92vh] md:max-h-[88vh] glass-card overflow-hidden pointer-events-auto flex flex-col"
          style={{ border: `1px solid ${project.color}30` }}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100vh', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 30, mass: 1 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Header bar ── */}
          <div
            className="flex items-center justify-between px-6 py-4 border-b shrink-0"
            style={{ borderColor: `${project.color}20` }}
          >
            {/* Left: index + title */}
            <div className="flex items-center gap-4">
              <span
                className="font-mono-custom text-xs tracking-widest px-2 py-1"
                style={{ color: project.color, border: `1px solid ${project.color}40`, background: `${project.color}10` }}
              >
                [{String(currentIndex + 1).padStart(2, '0')}/{projects.length}]
              </span>
              <h2 className="font-orbitron text-lg md:text-xl font-bold text-star-white tracking-wide">
                {project.title}
              </h2>
              <span
                className="hidden md:block font-mono-custom text-[10px] tracking-widest px-2 py-0.5 border"
                style={{ color: project.color, borderColor: `${project.color}40` }}
              >
                {project.category.toUpperCase()}
              </span>
            </div>

            {/* Right: nav + close */}
            <div className="flex items-center gap-2">
              {/* Prev */}
              <motion.button
                className="w-8 h-8 flex items-center justify-center border border-white/10 text-text-dim hover:text-cyan hover:border-cyan/50 transition-colors disabled:opacity-20"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </motion.button>
              {/* Next */}
              <motion.button
                className="w-8 h-8 flex items-center justify-center border border-white/10 text-text-dim hover:text-cyan hover:border-cyan/50 transition-colors disabled:opacity-20"
                onClick={handleNext}
                disabled={currentIndex === projects.length - 1}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </motion.button>
              {/* Close */}
              <motion.button
                className="w-8 h-8 flex items-center justify-center border border-white/10 text-text-dim hover:text-red-400 hover:border-red-400/50 transition-colors ml-2"
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
          </div>

          {/* ── Sliding content area ── */}
          <div className="overflow-y-auto flex-1 overscroll-contain">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={project.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 35 }}
              >
                {/* ── Hero image area ── */}
                <div className="relative h-48 md:h-64 overflow-hidden">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}25 0%, rgba(5,5,24,1) 75%)`,
                    }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50`} />

                  {/* Grid */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `linear-gradient(${project.color}50 1px, transparent 1px), linear-gradient(90deg, ${project.color}50 1px, transparent 1px)`,
                      backgroundSize: '40px 40px',
                    }}
                  />

                  {/* HUD elements */}
                  <div className="absolute top-4 left-4 flex flex-col gap-1">
                    {['MISSION', 'DOSSIER', `ID: ${String(project.id).padStart(4, '0')}`].map((t) => (
                      <span key={t} className="font-mono-custom text-[9px] tracking-widest text-white/20">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Center icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="text-8xl select-none"
                      style={{ filter: `drop-shadow(0 0 40px ${project.color}90)` }}
                    >
                      {project.planet}
                    </div>
                  </div>

                  {/* Scan line animation */}
                  <motion.div
                    className="absolute inset-y-0 w-24 pointer-events-none"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${project.color}18, transparent)`,
                    }}
                    animate={{ x: ['-96px', '110%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                  />

                  {/* Bottom fade */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-16"
                    style={{ background: 'linear-gradient(transparent, rgba(8,12,40,1))' }}
                  />
                </div>

                {/* ── Tab navigation ── */}
                <div
                  className="flex border-b px-6"
                  style={{ borderColor: `${project.color}15` }}
                >
                  {['overview', 'features', 'tech'].map((tab) => (
                    <button
                      key={tab}
                      className="relative px-4 py-3 font-mono-custom text-xs tracking-widest uppercase transition-colors"
                      style={{ color: activeTab === tab ? project.color : 'rgba(90,122,154,0.7)' }}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-px"
                          style={{ background: project.color, boxShadow: `0 0 8px ${project.color}` }}
                          layoutId="tabLine"
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* ── Tab content ── */}
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="font-mono-custom text-xs text-cyan/50 tracking-widest mb-3">
                          // MISSION BRIEF
                        </p>
                        <p className="font-rajdhani text-base md:text-lg text-text-primary leading-relaxed mb-6">
                          {project.longDescription || project.description}
                        </p>

                        {/* Quick stats */}
                        <div className="grid grid-cols-3 gap-3 mt-4">
                          {[
                            { label: 'STATUS', value: 'DEPLOYED' },
                            { label: 'TYPE', value: project.category.toUpperCase() },
                            { label: 'STACK SIZE', value: `${project.tech.length} MODULES` },
                          ].map((stat) => (
                            <div
                              key={stat.label}
                              className="flex flex-col gap-1 p-3 border"
                              style={{ borderColor: `${project.color}20`, background: `${project.color}05` }}
                            >
                              <span className="font-mono-custom text-[9px] tracking-widest text-text-dim">
                                {stat.label}
                              </span>
                              <span
                                className="font-mono-custom text-xs font-bold"
                                style={{ color: project.color }}
                              >
                                {stat.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'features' && (
                      <motion.div
                        key="features"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="font-mono-custom text-xs text-cyan/50 tracking-widest mb-4">
                          // MISSION OBJECTIVES
                        </p>
                        <div className="space-y-3">
                          {(project.features || []).map((feature, i) => (
                            <motion.div
                              key={i}
                              className="flex items-start gap-3 p-3 border-l-2"
                              style={{ borderColor: project.color, background: `${project.color}06` }}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.08 }}
                            >
                              <span
                                className="mt-0.5 font-mono-custom text-xs shrink-0"
                                style={{ color: project.color }}
                              >
                                ✓
                              </span>
                              <span className="font-rajdhani text-base text-text-primary">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'tech' && (
                      <motion.div
                        key="tech"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="font-mono-custom text-xs text-cyan/50 tracking-widest mb-4">
                          // TECHNOLOGY STACK
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((t, i) => (
                            <motion.div
                              key={t}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.07 }}
                            >
                              <TechBadge tech={t} />
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ── CTA footer ── */}
                <div
                  className="flex items-center gap-4 px-6 py-4 border-t"
                  style={{ borderColor: `${project.color}15` }}
                >
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-2.5 font-orbitron text-xs tracking-widest border transition-all"
                    style={{
                      color: project.color,
                      borderColor: `${project.color}50`,
                      background: `${project.color}10`,
                      clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
                    }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: `0 0 20px ${project.color}30`,
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                    LIVE DEMO
                  </motion.a>

                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-2.5 font-orbitron text-xs tracking-widest border border-white/10 text-text-dim hover:border-white/30 hover:text-text-primary transition-all"
                    style={{ clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    SOURCE CODE
                  </motion.a>

                  {/* Keyboard hint */}
                  <span className="ml-auto font-mono-custom text-[9px] text-text-dim/30 tracking-widest hidden md:block">
                    ← → NAVIGATE &nbsp;|&nbsp; ESC CLOSE
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── HUD corner decorations ── */}
          <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 pointer-events-none" style={{ borderColor: project.color }} />
          <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 pointer-events-none" style={{ borderColor: project.color }} />
          <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 pointer-events-none" style={{ borderColor: project.color }} />
          <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 pointer-events-none" style={{ borderColor: project.color }} />
        </motion.div>
      </motion.div>
    </>
  )
}
