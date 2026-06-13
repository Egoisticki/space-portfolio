import { useEffect, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') handlePrev()
      if (event.key === 'ArrowRight') handleNext()
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, handlePrev, handleNext])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    setHeroImageError(false)
  }, [project.image])

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
  }

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[90] bg-[#03030a]/82 backdrop-blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div className="fixed inset-0 z-[91] flex items-end justify-center p-0 pointer-events-none md:items-center md:p-6">
        <motion.div
          className="premium-card modal-scroll pointer-events-auto flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-[28px] md:max-h-[88vh] md:rounded-[28px]"
          initial={{ y: 80, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 220, damping: 28 }}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="relative z-10 flex shrink-0 items-center justify-between border-b border-white/8 px-5 py-4 md:px-6">
            <div>
              <p className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-cyan/60">
                Case {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </p>
              <h2 className="mt-1 text-xl font-semibold text-star-white md:text-2xl">{project.title}</h2>
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

          <div className="relative z-10 overflow-y-auto">
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
                      className="absolute inset-0 h-full w-full object-cover object-center opacity-100"
                      onError={() => setHeroImageError(true)}
                    />
                  )}
                  {!hasHeroImage && <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-30`} />}
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

                <div className="border-b border-white/8 px-5 md:px-6">
                  <div className="flex gap-1">
                    {['overview', 'features', 'stack'].map((tab) => (
                      <button
                        key={tab}
                        className={`relative px-4 py-4 text-sm font-semibold capitalize transition ${activeTab === tab ? 'text-star-white' : 'text-text-dim hover:text-text-primary'}`}
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
                            <div key={feature} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-text-primary">
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

                <div className="flex flex-col gap-3 border-t border-white/8 p-5 sm:flex-row md:p-6">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.045] px-5 text-sm font-semibold text-star-white transition hover:bg-white/[0.075]"
                  >
                    Live demo
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold text-text-dim transition hover:text-star-white"
                  >
                    Source code
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}
