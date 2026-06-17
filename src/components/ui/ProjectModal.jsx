import { useEffect, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getLenis } from '../../hooks/useLenis'
import { getProjectActions } from '../../utils/projectActions'

function Pill({ children, color = '#94a3b8' }) {
  return (
    <span
      className="rounded-full border px-3 py-1.5 text-sm font-medium"
      style={{ color, borderColor: `${color}2e`, background: `${color}0f` }}
    >
      {children}
    </span>
  )
}

function getProjectInitials(title) {
  return title
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

export default function ProjectModal({ project, projects, onClose, onNavigate }) {
  const [direction, setDirection] = useState(0)
  const [activeTab, setActiveTab] = useState('overview')
  const [heroImageError, setHeroImageError] = useState(false)
  const currentIndex = projects.findIndex((p) => p.id === project.id)
  const { hasPublicRepo, hasLiveDemo, hasActions } = getProjectActions(project)
  const hasHeroImage = Boolean(project.image) && !heroImageError

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

  // Keyboard: ESC / arrow navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, handlePrev, handleNext])

  // Body scroll lock + Lenis pause
  useEffect(() => {
    const lenis = getLenis()
    // Lock BOTH html and body — locking body alone leaves <html> scrollable,
    // which is what lets overscroll leak to the page behind the modal.
    const prevHtml = document.documentElement.style.overflow
    const prevBody = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    if (lenis?.stop) lenis.stop()
    return () => {
      document.documentElement.style.overflow = prevHtml
      document.body.style.overflow = prevBody
      if (lenis?.start) lenis.start()
    }
  }, [])

  // Reset image error when project changes
  useEffect(() => {
    setHeroImageError(false)
  }, [project.image])

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (dir) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
  }

  return (
    /* ── Layer 1: fullscreen backdrop ── */
    <motion.div
      className="fixed inset-0 z-[100] bg-[#03030a]/80 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onPointerDown={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* ── Layer 2: centering wrapper ── */}
      <div className="flex h-full items-center justify-center p-4 md:p-6">

        {/* ── Layer 3: modal shell — fixed size, clips children ── */}
        <motion.div
          className="
            flex h-[90vh] max-h-[90vh] w-full max-w-4xl
            flex-col overflow-hidden
            rounded-[28px] border border-white/10 bg-[#070711]
            shadow-2xl
          "
          initial={{ y: 80, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 220, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >

          {/* ── Header: shrink-0 so it never compresses ── */}
          <div className="shrink-0 flex items-center justify-between border-b border-white/8 px-5 py-4 md:px-6 bg-[#070711]">
            <div>
              <p className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-cyan/60">
                Case {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </p>
              <h2 className="mt-1 text-xl font-semibold text-star-white md:text-2xl">
                {project.title}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-text-dim transition hover:text-star-white disabled:opacity-30"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                aria-label="Previous project"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-text-dim transition hover:text-star-white disabled:opacity-30"
                onClick={handleNext}
                disabled={currentIndex === projects.length - 1}
                aria-label="Next project"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
              <button
                className="ml-1 grid h-9 w-9 place-items-center rounded-full border border-white/10 text-text-dim transition hover:border-white/20 hover:text-star-white"
                onClick={onClose}
                aria-label="Close project details"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── Scrollable content: THE only scrolling element ── */}
          <div
            className="flex-1 min-h-0 overflow-y-auto overscroll-contain"
            data-lenis-prevent
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={project.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                {/* Hero image / placeholder */}
                <div className="relative h-56 overflow-hidden md:h-72">
                  {!hasHeroImage && (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        background: `radial-gradient(circle at 22% 14%, ${project.color}30, transparent 30%), linear-gradient(135deg, #050510, #03030a)`,
                      }}
                    >
                      <span
                        className="grid h-24 w-24 place-items-center rounded-full border text-2xl font-semibold text-star-white backdrop-blur-xl"
                        style={{ borderColor: `${project.color}38`, background: `${project.color}14` }}
                      >
                        {getProjectInitials(project.title)}
                      </span>
                    </div>
                  )}
                  {hasHeroImage && (
                    <img
                      src={project.image}
                      alt={project.imageAlt || project.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover object-center"
                      onError={() => setHeroImageError(true)}
                    />
                  )}
                  {!hasHeroImage && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-30`} />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-6">
                    <div>
                      <Pill color={project.color}>{project.category}</Pill>
                      <p className="mt-4 max-w-2xl text-3xl font-semibold leading-tight text-star-white md:text-5xl">
                        {project.title}
                      </p>
                    </div>
                    <span
                      className="hidden h-20 w-20 shrink-0 place-items-center rounded-full border text-xl font-semibold text-star-white md:grid"
                      style={{ borderColor: `${project.color}38`, background: `${project.color}14` }}
                    >
                      {project.planet}
                    </span>
                  </div>
                </div>

                {/* Tab bar */}
                <div className="border-b border-white/8 px-5 md:px-6">
                  <div className="flex gap-1">
                    {['overview', 'features', 'stack'].map((tab) => (
                      <button
                        key={tab}
                        className={`relative px-4 py-4 text-sm font-semibold capitalize transition ${
                          activeTab === tab ? 'text-star-white' : 'text-text-dim hover:text-text-primary'
                        }`}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab}
                        {activeTab === tab && (
                          <motion.span
                            className="absolute inset-x-3 bottom-0 h-px bg-cyan"
                            layoutId="projectTab"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab content */}
                <div className="p-5 md:p-6">
                  <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                      >
                        <p className="section-eyebrow">Project overview</p>
                        <p className="mt-4 text-lg leading-8 text-text-primary">
                          {project.longDescription || project.description}
                        </p>
                      </motion.div>
                    )}
                    {activeTab === 'features' && (
                      <motion.div
                        key="features"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                      >
                        <p className="section-eyebrow">What it includes</p>
                        <div className="mt-5 grid gap-3">
                          {(project.features || []).map((feature) => (
                            <div
                              key={feature}
                              className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-text-primary"
                            >
                              {feature}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    {activeTab === 'stack' && (
                      <motion.div
                        key="stack"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                      >
                        <p className="section-eyebrow">Technology stack</p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <Pill key={tech}>{tech}</Pill>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer links */}
                {hasActions && (
                  <div className="flex flex-col gap-3 border-t border-white/8 p-5 sm:flex-row md:p-6">
                    {hasLiveDemo && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.045] px-5 text-sm font-semibold text-star-white transition hover:bg-white/[0.075]"
                      >
                        Live demo
                      </a>
                    )}
                    {hasPublicRepo && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold text-text-dim transition hover:text-star-white"
                      >
                        Source code
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          {/* end scrollable */}

        </motion.div>
        {/* end modal shell */}

      </div>
    </motion.div>
  )
}
