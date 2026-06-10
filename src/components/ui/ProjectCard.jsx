import { motion } from 'framer-motion'

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

export default function ProjectCard({ project, index, onOpenModal }) {
  return (
    <motion.article
      className="premium-card group flex min-h-[430px] cursor-pointer flex-col p-5 md:p-6"
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
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
          <div
            className="absolute inset-0 opacity-80 transition duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at 20% 0%, ${project.color}26, transparent 36%), linear-gradient(135deg, rgba(255,255,255,0.045), transparent 55%)`,
            }}
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-28`} />
          <div className="relative flex h-44 items-end justify-between">
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

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-text-dim transition hover:text-star-white"
            onClick={(event) => event.stopPropagation()}
          >
            Source
          </a>
        </div>
      </div>
    </motion.article>
  )
}
