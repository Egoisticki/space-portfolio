import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import ProjectCard from '../ui/ProjectCard'
import ProjectModal from '../ui/ProjectModal'
import { projects } from '../../data/portfolio'
import { scrollTo } from '../../hooks/useLenis'

const INITIAL_VISIBLE_COUNT = 4

export default function Projects() {
  const sectionRef = useRef(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const hasMoreProjects = projects.length > INITIAL_VISIBLE_COUNT
  const visibleProjects = showAllProjects ? projects : projects.slice(0, INITIAL_VISIBLE_COUNT)
  const scrollBackToProjects = () => {
    requestAnimationFrame(() => {
      window.setTimeout(() => {
        if (sectionRef.current) scrollTo(sectionRef.current, { offset: -96 })
      }, 80)
    })
  }
  const handleToggleProjects = () => {
    if (showAllProjects) {
      setShowAllProjects(false)
      scrollBackToProjects()
      return
    }

    setShowAllProjects(true)
  }

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-hidden py-28 md:py-36">
      <div className="absolute inset-0 pointer-events-none bg-[#04040d]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_72%_16%,rgba(139,92,246,0.12),transparent_31rem),radial-gradient(circle_at_18%_86%,rgba(34,211,238,0.08),transparent_28rem)]" />
      <div className="subtle-grid absolute inset-0 opacity-60" />

      <div className="section-shell relative z-10">
        <SectionTitle
          label="Selected Work"
          title="Case studies for software that ships."
          subtitle="A curated set of product surfaces: dashboards, SaaS flows, APIs, and portfolio systems shaped around real workflows."
        />

        <div className="grid gap-5 md:grid-cols-2">
          <AnimatePresence initial={false}>
            {visibleProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onOpenModal={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </div>

        {hasMoreProjects && (
          <div className="mt-10 flex justify-center">
            <motion.button
              type="button"
              onClick={handleToggleProjects}
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 text-sm font-semibold text-star-white transition hover:border-cyan/30 hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-cyan"
              whileHover={shouldReduceMotion ? {} : { y: -2 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            >
              {showAllProjects ? 'Show less' : 'Show more projects'}
              <span
                className={`transition-transform duration-300 ${showAllProjects ? 'rotate-180' : ''}`}
                aria-hidden="true"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              </span>
            </motion.button>
          </div>
        )}

        <div className="mt-14 flex items-center gap-4 text-center">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-white/5" />
          <span className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-text-dim">
            {projects.length} product builds
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/10 to-white/5" />
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            key="modal"
            project={selectedProject}
            projects={projects}
            onClose={() => setSelectedProject(null)}
            onNavigate={setSelectedProject}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
