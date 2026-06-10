import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import GlowButton from '../ui/GlowButton'
import { personalInfo } from '../../data/portfolio'

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16v16H4z" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  )
}

export default function Contact() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-120px' })

  const links = [
    { label: 'GitHub', value: personalInfo.github.replace('https://', ''), href: personalInfo.github },
    { label: 'LinkedIn', value: 'Connect professionally', href: personalInfo.linkedin },
    { label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  ]

  return (
    <section id="contact" ref={sectionRef} className="relative overflow-hidden py-28 md:py-36">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.12),transparent_28rem),radial-gradient(circle_at_72%_74%,rgba(34,211,238,0.08),transparent_24rem)]" />
      <div className="section-shell relative z-10">
        <motion.div
          className="premium-card px-6 py-10 text-center md:px-12 md:py-16"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative z-10 mx-auto max-w-3xl">
            <p className="section-eyebrow">Contact</p>
            <h2 className="mt-5 text-[clamp(3rem,7vw,6.6rem)] font-bold leading-[0.9] text-star-white">
              Have an idea worth building?
            </h2>
            <p className="section-copy mx-auto mt-7 max-w-2xl">
              I am open to freelance projects, internships, collaborations, and product
              opportunities where clean execution matters.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={`mailto:${personalInfo.email}`}>
                <GlowButton variant="primary" icon={<MailIcon />}>
                  Let's talk
                </GlowButton>
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-full px-5 text-sm font-semibold text-text-dim transition hover:text-star-white"
              >
                View GitHub
              </a>
            </div>
          </div>
        </motion.div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {links.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'}
              className="rounded-3xl border border-white/8 bg-white/[0.025] p-5 transition hover:border-white/14 hover:bg-white/[0.045]"
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.16 + index * 0.06, duration: 0.5 }}
            >
              <span className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-cyan/60">
                {link.label}
              </span>
              <span className="mt-3 block text-base font-semibold text-star-white">{link.value}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
