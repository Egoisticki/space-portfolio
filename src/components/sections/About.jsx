import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { about } from '../../data/portfolio'

function PortraitBlock({ inView }) {
  const [photoAvailable, setPhotoAvailable] = useState(true)

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[390px] lg:mx-0 lg:ml-auto"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute -left-12 top-12 h-52 w-52 rounded-full bg-violet/16 blur-3xl" />
      <div className="absolute -right-10 bottom-16 h-48 w-48 rounded-full bg-cyan/12 blur-3xl" />

      <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.025] p-2 shadow-soft">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[#070713]">
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
                <span className="text-6xl font-bold text-star-white/90">{about.title.split(' ').map((part) => part[0]).join('')}</span>
                <p className="mt-4 font-mono-custom text-[10px] uppercase tracking-[0.24em] text-text-dim">
                  {about.portraitFallback}
                </p>
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/38 via-transparent to-white/[0.06]" />
          <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-xl">
            <p className="text-lg font-semibold leading-none text-star-white">{about.caption}</p>
            <p className="mt-2 text-sm text-text-dim">{about.location}</p>
          </div>
        </div>
      </div>

      <div className="absolute -right-2 top-8 rounded-full border border-white/10 bg-[#070713]/80 px-4 py-2 text-sm font-medium text-star-white shadow-inner-light backdrop-blur-xl">
        {about.caption}
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
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(280px,0.42fr)_minmax(0,0.58fr)] lg:gap-16">
          <PortraitBlock inView={inView} />

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative z-10">
              <p className="section-eyebrow">{about.eyebrow}</p>
              <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight text-star-white md:text-5xl">
                {about.title}
              </h2>

              <div className="mt-7 max-w-2xl space-y-5 text-base leading-8 text-text-dim md:text-lg">
                {about.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p className="text-text-primary">{about.focus}</p>
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

              <div className="mt-9 max-w-xl rounded-[28px] border border-white/10 bg-white/[0.025] p-6 shadow-inner-light">
                <h3 className="text-lg font-semibold text-star-white">{about.currentlyTitle}</h3>
                <ul className="mt-5 space-y-3">
                  {about.currently.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-text-dim">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan/70" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
