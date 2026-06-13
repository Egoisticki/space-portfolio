import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import { experience, sectionHeadings } from '../../data/portfolio'

export default function Experience() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-120px 0px' })
  const shouldReduceMotion = useReducedMotion()
  const heading = sectionHeadings.experience
  const itemInitial = shouldReduceMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 28, filter: 'blur(6px)' }
  const itemVisible = shouldReduceMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, filter: 'blur(0px)' }

  return (
    <section id="experience" ref={sectionRef} className="relative overflow-hidden py-28 md:py-36">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.07),transparent_28rem),radial-gradient(circle_at_82%_78%,rgba(139,92,246,0.08),transparent_30rem)]" />

      <div className="section-shell relative z-10">
        <SectionTitle label={heading.label} title={heading.title} subtitle={heading.subtitle} />

        <div className="relative mx-auto max-w-4xl">
          <motion.div
            className="absolute left-4 top-4 hidden h-[calc(100%-2rem)] w-px origin-top bg-gradient-to-b from-cyan/0 via-white/12 to-violet/0 md:block"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scaleY: 0 }}
            animate={inView ? (shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scaleY: 1 }) : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="space-y-5">
            {experience.map((item, index) => (
              <motion.article
                key={`${item.role}-${item.period}`}
                className="relative md:pl-12"
                initial={itemInitial}
                whileInView={itemVisible}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.58, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.span
                  className="absolute left-[11px] top-7 hidden h-2.5 w-2.5 rounded-full border border-cyan/40 bg-void shadow-[0_0_18px_rgba(34,211,238,0.22)] md:block"
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
                  whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: 0.08 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                />

                <motion.div
                  className="premium-card group p-6 md:p-7"
                  whileHover={shouldReduceMotion ? {} : { y: -4, borderColor: 'rgba(255,255,255,0.16)' }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_0%,rgba(34,211,238,0.10),transparent_34%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative z-10">
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
                </motion.div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
