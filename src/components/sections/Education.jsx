import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import { education, sectionHeadings } from '../../data/portfolio'

export default function Education() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-120px 0px' })
  const heading = sectionHeadings.education

  return (
    <section id="education" ref={sectionRef} className="relative overflow-hidden py-28 md:py-36">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.07),transparent_28rem),radial-gradient(circle_at_82%_78%,rgba(139,92,246,0.08),transparent_30rem)]" />

      <div className="section-shell relative z-10">
        <SectionTitle label={heading.label} title={heading.title} subtitle={heading.subtitle} />

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-4 top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-cyan/0 via-white/12 to-violet/0 md:block" />

          <div className="space-y-5">
            {education.map((item, index) => (
              <motion.article
                key={`${item.degree}-${item.period}`}
                className="relative md:pl-12"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="absolute left-[11px] top-7 hidden h-2.5 w-2.5 rounded-full border border-cyan/40 bg-void shadow-[0_0_18px_rgba(34,211,238,0.22)] md:block" />

                <div className="premium-card subtle-hover p-6 md:p-7">
                  <div className="relative z-10">
                    <div className="mb-5 flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-star-white">
                        {item.period}
                      </span>
                      <span className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-cyan/60">
                        {item.institution}
                      </span>
                    </div>

                    <h3 className="text-2xl font-semibold text-star-white">{item.degree}</h3>
                    <p className="mt-4 max-w-2xl leading-7 text-text-dim">{item.description}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
