import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import { about, personalInfo } from '../../data/portfolio'

function PortraitBlock({ inView }) {
  const [photoAvailable, setPhotoAvailable] = useState(true)

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[390px] lg:mx-0 lg:ml-auto"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute -left-10 top-10 h-48 w-48 rounded-full bg-violet/18 blur-3xl" />
      <div className="absolute -right-8 bottom-14 h-44 w-44 rounded-full bg-cyan/12 blur-3xl" />

      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-2 shadow-soft">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] bg-[#070713]">
          {photoAvailable ? (
            <img
              src={about.portrait}
              alt={about.portraitAlt}
              className="h-full w-full object-cover"
              onError={() => setPhotoAvailable(false)}
            />
          ) : (
            <div className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_35%_18%,rgba(139,92,246,0.28),transparent_34%),linear-gradient(145deg,#080815,#03030a)]">
              <div className="text-center">
                <span className="text-6xl font-bold text-star-white/90">{personalInfo.initials}</span>
                <p className="mt-4 font-mono-custom text-[10px] uppercase tracking-[0.24em] text-text-dim">
                  {about.portraitFallback}
                </p>
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/38 via-transparent to-white/[0.06]" />
          <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-xl">
            <p className="text-lg font-semibold leading-none text-star-white">{about.name}</p>
            <p className="mt-2 text-sm text-text-dim">{about.role}</p>
          </div>
        </div>
      </div>

      <div className="absolute -right-2 top-8 rounded-full border border-white/10 bg-[#070713]/80 px-4 py-2 text-sm font-medium text-star-white shadow-inner-light backdrop-blur-xl">
        {about.portraitChip}
      </div>
      <div className="absolute -left-3 bottom-20 hidden rounded-full border border-white/10 bg-[#070713]/75 px-3.5 py-2 font-mono-custom text-[10px] uppercase tracking-[0.18em] text-cyan/70 backdrop-blur-xl sm:block">
        {about.locationChip}
      </div>
    </motion.div>
  )
}

export default function About() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-120px 0px' })

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden py-28 md:py-36">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_15%_35%,rgba(139,92,246,0.09),transparent_26rem),radial-gradient(circle_at_86%_72%,rgba(34,211,238,0.07),transparent_28rem)]" />

      <div className="section-shell relative z-10">
        <SectionTitle label={about.label} title={about.title} subtitle={about.subtitle} />

        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.58fr)_minmax(320px,0.42fr)] lg:gap-14">
          <motion.div
            className="premium-card p-7 md:p-10"
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative z-10">
              <p className="section-eyebrow">{about.name}</p>

              <div className="mt-7 space-y-5 text-base leading-8 text-text-dim md:text-lg">
                {about.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {about.chips.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-9 grid gap-3">
                {about.principles.map((item, index) => (
                  <motion.article
                    key={item.title}
                    className="rounded-3xl border border-white/8 bg-white/[0.025] p-5"
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.18 + index * 0.06 }}
                  >
                    <div className="flex gap-4">
                      <span className="mt-1 font-mono-custom text-xs text-cyan/70">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h4 className="text-lg font-semibold text-star-white">{item.title}</h4>
                        <p className="mt-2 leading-7 text-text-dim">{item.copy}</p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </motion.div>

          <PortraitBlock inView={inView} />
        </div>
      </div>
    </section>
  )
}
