import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import { experience, sectionHeadings } from '../../data/portfolio'

export default function Experience() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-120px 0px' })
  const heading = sectionHeadings.experience

  return (
    <section id="experience" ref={sectionRef} className="relative overflow-hidden py-28 md:py-36">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_18%,rgba(37,99,235,0.08),transparent_30rem),radial-gradient(circle_at_80%_78%,rgba(139,92,246,0.08),transparent_28rem)]" />

      <div className="section-shell relative z-10">
        <SectionTitle label={heading.label} title={heading.title} subtitle={heading.subtitle} />

        <div className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-2">
          {experience.map((item, index) => (
            <motion.article
              key={`${item.role}-${item.period}`}
              className="premium-card subtle-hover p-6 md:p-7"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.58, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-star-white">
                    {item.period}
                  </span>
                  <span className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-cyan/60">
                    {item.organization}
                  </span>
                </div>

                <h3 className="text-2xl font-semibold text-star-white">{item.role}</h3>

                <ul className="mt-6 space-y-3">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-text-dim">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan/70" />
                      <span className="leading-7">{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-sm text-text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
