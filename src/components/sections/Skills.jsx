import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import { sectionHeadings, skills } from '../../data/portfolio'

function getDesktopPlacement(index) {
  if (index < 3) return 'lg:col-span-2'
  if (index === 3) return 'lg:col-span-4'
  return 'lg:col-span-2'
}

function SkillCard({ group, index, inView }) {
  return (
    <motion.article
      className={`premium-card subtle-hover p-6 md:p-7 ${getDesktopPlacement(index)}`}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.58, delay: index * 0.07 }}
    >
      <div className="relative z-10">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <span className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-cyan/60">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-3 text-2xl font-semibold text-star-white">{group.title}</h3>
          </div>
          <span className="h-10 w-10 rounded-full border border-white/10 bg-white/[0.035]" />
        </div>

        <p className="max-w-xl leading-7 text-text-dim">{group.description}</p>

        <div className="mt-7 flex flex-wrap gap-2">
          {group.items.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-sm text-text-primary"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-120px 0px' })
  const heading = sectionHeadings.skills

  return (
    <section id="skills" ref={sectionRef} className="relative overflow-hidden py-28 md:py-36">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.08),transparent_30rem)]" />

      <div className="section-shell relative z-10">
        <SectionTitle label={heading.label} title={heading.title} subtitle={heading.subtitle} />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {skills.groups.map((group, index) => (
            <SkillCard key={group.title} group={group} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
