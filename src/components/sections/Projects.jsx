// src/components/sections/Projects.jsx
import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { AnimatePresence } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import ProjectCard from '../ui/ProjectCard'
import ProjectModal from '../ui/ProjectModal'
import AsteroidBelt from '../three/AsteroidBelt'
import { projects } from '../../data/portfolio'

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

  const handleOpenModal = (project) => setSelectedProject(project)
  const handleCloseModal = () => setSelectedProject(null)
  const handleNavigate = (project) => setSelectedProject(project)

  return (
    <section
      id="projects"
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: '#02020f' }}
    >
      {/* ── Asteroid belt canvas — full-bleed underlay ── */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-70">
        <Canvas
          gl={{ antialias: false, alpha: true }}
          camera={{ fov: 55, near: 0.1, far: 100, position: [0, 0, 5] }}
          style={{ position: 'absolute', inset: 0, background: 'transparent' }}
          dpr={Math.min(window.devicePixelRatio, 1.5)}
          frameloop="demand"
        >
          <color attach="background" args={['#02020f']} />
          <Suspense fallback={null}>
            <AsteroidBelt count={24} />
          </Suspense>
        </Canvas>
      </div>

      {/* ── Nebula blobs ── */}
      <div
        className="absolute top-20 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 80% 50%, rgba(123,47,255,0.06) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute bottom-20 left-0 w-[500px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(0,245,255,0.05) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionTitle
          label="Work"
          title="MISSION DOSSIERS"
          subtitle="Deployments catalogued — click any card to open the full briefing"
        />

        {/* ── Project grid ── */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>

        {/* ── Bottom decorative line ── */}
        <div className="mt-16 flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />
          <span className="font-mono-custom text-[10px] text-text-dim/30 tracking-[0.3em]">
            {projects.length} MISSIONS LOGGED
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />
        </div>
      </div>

      {/* ── Modal portal ── */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            key="modal"
            project={selectedProject}
            projects={projects}
            onClose={handleCloseModal}
            onNavigate={handleNavigate}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
