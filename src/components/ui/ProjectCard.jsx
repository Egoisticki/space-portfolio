import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { getProjectActions } from '../../utils/projectActions'

const TECH_COLORS = {
  React: '#61dafb',
  'Node.js': '#68a063',
  Express: '#94a3b8',
  TypeScript: '#60a5fa',
  Python: '#60a5fa',
  'Three.js': '#22d3ee',
  PostgreSQL: '#60a5fa',
  MongoDB: '#47a248',
  Docker: '#60a5fa',
  Redis: '#ef4444',
  Prisma: '#94a3b8',
  Tailwind: '#38bdf8',
  Vite: '#a78bfa',
  Vercel: '#f8fafc',
  'Framer Motion': '#a78bfa',
}

function TechPill({ tech }) {
  const color = TECH_COLORS[tech] || '#94a3b8'

  return (
    <span
      className="rounded-full border px-2.5 py-1 text-xs font-medium"
      style={{
        color,
        borderColor: `${color}2e`,
        background: `${color}0f`,
      }}
    >
      {tech}
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

function ProjectImageFallback({ project }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background: `radial-gradient(circle at 20% 0%, ${project.color}26, transparent 36%), linear-gradient(135deg, rgba(255,255,255,0.045), transparent 55%)`,
      }}
    >
      <span
        className="grid h-20 w-20 place-items-center rounded-full border text-xl font-semibold text-star-white backdrop-blur-xl"
        style={{
          borderColor: `${project.color}38`,
          background: `${project.color}14`,
        }}
      >
        {getProjectInitials(project.title)}
      </span>
    </div>
  )
}

export default function ProjectCard({ project, index, onOpenModal }) {
  const { hasPublicRepo, hasLiveDemo, hasActions } = getProjectActions(project)
  const shouldReduceMotion = useReducedMotion()
  const [imageError, setImageError] = useState(false)
  const hasImage = Boolean(project.image) && !imageError
  const initial = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 34 }
  const visible = shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }

  return (
    <motion.article
      className="premium-card group flex min-h-[430px] cursor-pointer flex-col p-5 md:p-6"
      initial={initial}
      whileInView={visible}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={shouldReduceMotion ? {} : { y: -6 }}
      onClick={() => onOpenModal(project)}
      tabIndex={0}
      role="button"
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onOpenModal(project)
        }
      }}
    >
      <div className="relative z-10 flex flex-1 flex-col">
        <div className="relative mb-7 overflow-hidden rounded-[20px] border border-white/8 bg-[#050510] p-5">
          {hasImage ? (
            <img
              src={project.image}
              alt={project.imageAlt || project.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-center opacity-100"
              onError={() => setImageError(true)}
            />
          ) : (
            <ProjectImageFallback project={project} />
          )}
          {!hasImage && <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-28`} />}
          {hasImage && <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />}
          <div className="relative flex h-44 items-end justify-between">
            {hasImage ? (
              <span className="self-start rounded-full border border-white/12 bg-black/28 px-3 py-1 font-mono-custom text-[10px] uppercase tracking-[0.2em] text-star-white/82 backdrop-blur-md">
                Case {String(index + 1).padStart(2, '0')}
              </span>
            ) : (
              <>
                <div>
                  <span className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-text-dim">
                    Case {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-3 max-w-[13rem] text-2xl font-semibold leading-tight text-star-white">
                    {project.category} build
                  </p>
                </div>
                <span
                  className="grid h-20 w-20 place-items-center rounded-full border text-xl font-semibold text-star-white backdrop-blur-xl"
                  style={{
                    borderColor: `${project.color}38`,
                    background: `${project.color}14`,
                  }}
                >
                  {project.planet}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="mb-5 flex items-center gap-3">
          <span
            className="rounded-full border px-3 py-1 text-xs font-semibold"
            style={{ borderColor: `${project.color}40`, color: project.color }}
          >
            {project.category}
          </span>
          <span className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-text-dim">
            Product system
          </span>
        </div>

        <h3 className="text-2xl font-semibold leading-tight text-star-white">{project.title}</h3>
        <p className="mt-4 flex-1 text-base leading-7 text-text-dim">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <TechPill key={tech} tech={tech} />
          ))}
        </div>

        <div className="mt-7 flex items-center justify-between border-t border-white/8 pt-5">
          <button
            type="button"
            className="flex items-center gap-2 text-sm font-semibold text-star-white transition group-hover:text-cyan"
            onClick={(event) => {
              event.stopPropagation()
              onOpenModal(project)
            }}
          >
            View case study
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </button>

          {hasPublicRepo && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-text-dim transition hover:text-star-white"
              onClick={(event) => event.stopPropagation()}
            >
              Source
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
