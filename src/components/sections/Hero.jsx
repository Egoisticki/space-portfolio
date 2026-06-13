import { motion, useReducedMotion } from 'framer-motion'
import GlowButton from '../ui/GlowButton'
import { personalInfo } from '../../data/portfolio'
import { scrollTo } from '../../hooks/useLenis'
import astronautImg from '../../../assets/astronaut-hero.png'

const heroLines = ['I turn ideas', 'into beautiful', 'software.']
const orbitItems = [
  { label: 'SaaS', className: 'left-2 top-[18%]' },
  { label: 'AI Tools', className: 'right-1 top-[26%]' },
  { label: 'Web Apps', className: 'bottom-[22%] left-1' },
  { label: 'Systems', className: 'bottom-[15%] right-7' },
]

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16v16H4z" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  )
}

function StaticStars() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="hero-stars hero-stars-a" />
      <div className="hero-stars hero-stars-b" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent" />
    </div>
  )
}

function ProductOrbit() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className="relative mx-auto aspect-square w-full max-w-[390px] xl:max-w-[420px]"
      initial={shouldReduceMotion ? false : { opacity: 0, x: 24, scale: 0.98 }}
      animate={shouldReduceMotion ? {} : { opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.65, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-[10%] rounded-full border border-white/[0.07] bg-white/[0.014]" />
      <div className="absolute inset-[20%] rounded-full border border-dashed border-cyan/16" />
      <div className="absolute inset-[23%] rounded-full bg-[radial-gradient(circle_at_42%_30%,rgba(139,92,246,0.20),transparent_34%),radial-gradient(circle_at_72%_72%,rgba(34,211,238,0.11),transparent_36%)] blur-xl" />
      <motion.div
        className="absolute inset-[13%] z-10 rounded-full"
        animate={shouldReduceMotion ? {} : { rotate: -360 }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
      >
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full border border-cyan/25 bg-cyan/45" />
      </motion.div>

      <img
        src={astronautImg}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="absolute left-1/2 top-[48%] z-10 w-[34%] -translate-x-1/2 -translate-y-1/2 object-contain opacity-25 saturate-[0.7]"
      />

      <div className="absolute left-1/2 top-1/2 z-20 w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/10 bg-[#070713]/72 p-4 text-center shadow-inner-light backdrop-blur-xl">
        <p className="font-mono-custom text-[9px] uppercase tracking-[0.2em] text-cyan/65">
          Product Orbit
        </p>
        <p className="mt-2 text-xl font-semibold leading-tight text-star-white">
          From idea to production
        </p>
        <p className="mt-2 text-xs leading-relaxed text-text-dim">
          Interface, backend, AI workflow, and deployment thinking.
        </p>
      </div>

      <motion.div
        className="absolute inset-0 z-30"
        animate={shouldReduceMotion ? {} : { rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
      >
        {orbitItems.map((item, index) => (
          <div key={item.label} className={`absolute ${item.className}`}>
            <motion.div
              className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-star-white shadow-inner-light backdrop-blur-xl"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0, rotate: -360 }}
              transition={{
                opacity: { delay: 0.48 + index * 0.05, duration: 0.32 },
                y: { delay: 0.48 + index * 0.05, duration: 0.32 },
                rotate: { duration: 26, repeat: Infinity, ease: 'linear' },
              }}
            >
              {item.label}
            </motion.div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion()

  const reveal = (delay = 0) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 18 },
    animate: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center overflow-hidden px-0 pb-10 pt-24 sm:pt-28 lg:pb-8 lg:pt-24"
    >
      <StaticStars />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_18%_12%,rgba(139,92,246,0.13),transparent_24rem),radial-gradient(circle_at_82%_22%,rgba(34,211,238,0.075),transparent_28rem),linear-gradient(180deg,rgba(3,3,10,0.18),rgba(3,3,10,0.72))]" />
      <div className="subtle-grid absolute inset-0 z-[1] opacity-35" />

      <div className="section-shell relative z-10 grid items-center gap-8 lg:grid-cols-[minmax(0,0.55fr)_minmax(340px,0.45fr)] xl:gap-12">
        <div className="max-w-3xl">
          <motion.div
            className="mb-5 flex flex-wrap items-center gap-2.5"
            {...reveal(0)}
          >
            <span className="section-eyebrow">Full-stack developer - AI-engineer</span>
            <span className="rounded-full border border-emerald-400/18 bg-emerald-400/8 px-3 py-1 text-xs font-medium text-emerald-300">
              Available for selected builds
            </span>
          </motion.div>

          <h1 className="max-w-4xl text-[clamp(2.8rem,13vw,4.5rem)] font-bold leading-[0.93] text-star-white sm:text-[clamp(3.2rem,10vw,5.5rem)] lg:text-[clamp(4rem,7vw,7rem)]">
            {heroLines.map((line, index) => (
              <motion.span
                key={line}
                className={`block ${index === 2 ? 'text-premium-gradient' : ''}`}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 28, filter: 'blur(8px)' }}
                animate={shouldReduceMotion ? {} : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.62, delay: 0.08 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mt-6 max-w-[40rem] text-[clamp(1rem,1.55vw,1.12rem)] leading-7 text-text-dim md:leading-8"
            {...reveal(0.3)}
          >
            I design and build SaaS platforms, business systems, and web apps
            with clean interfaces, reliable architecture, and fast execution.
          </motion.p>

          <motion.div
            className="mt-5 flex flex-wrap items-center gap-2.5 text-sm text-text-dim"
            {...reveal(0.38)}
          >
            <span className="text-star-white">{personalInfo.name}</span>
            <span className="h-1 w-1 rounded-full bg-white/35" />
            <span>Master AI Student</span>
            <span className="h-1 w-1 rounded-full bg-white/35" />
            <span>Web Apps / SaaS / AI Tools</span>
          </motion.div>

          <motion.div
            className="mt-7 flex flex-col gap-3 sm:flex-row"
            {...reveal(0.46)}
          >
            <GlowButton variant="primary" onClick={() => scrollTo('#projects')} icon={<ArrowIcon />}>
              View projects
            </GlowButton>
            <GlowButton variant="ghost" onClick={() => scrollTo('#contact')} icon={<MailIcon />}>
              Contact me
            </GlowButton>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full px-4 text-sm font-semibold text-text-dim transition hover:text-star-white"
            >
              View GitHub
            </a>
          </motion.div>
        </div>

        <div className="hidden lg:block">
          <ProductOrbit />
        </div>
      </div>
    </section>
  )
}
