import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import ProjectCard from '../ui/ProjectCard'
import ProjectModal from '../ui/ProjectModal'
import { projects } from '../../data/portfolio'

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section id="projects" className="relative overflow-hidden py-28 md:py-36">
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
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpenModal={setSelectedProject}
            />
          ))}
        </div>

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
