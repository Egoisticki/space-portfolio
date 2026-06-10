import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { scrollTo } from '../../hooks/useLenis'

const NAV_LINKS = [
  { label: 'Home', target: '#hero' },
  { label: 'About', target: '#about' },
  { label: 'Projects', target: '#projects' },
  { label: 'Skills', target: '#skills' },
  { label: 'Education', target: '#education' },
  { label: 'Experience', target: '#experience' },
  { label: 'Blog', target: '#blog' },
  { label: 'Contact', target: '#contact' },
]

function Logo() {
  return (
    <button
      type="button"
      onClick={() => scrollTo('#hero')}
      className="group flex items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-cyan"
      aria-label="Go to home"
    >
      <span className="relative grid h-9 w-9 place-items-center rounded-full border border-white/12 bg-white/[0.04]">
        <span className="absolute inset-1 rounded-full bg-[radial-gradient(circle_at_35%_20%,rgba(34,211,238,0.36),transparent_48%)]" />
        <span className="relative text-xs font-bold text-star-white">MH</span>
      </span>
      <span className="hidden text-left sm:block">
        <span className="block text-sm font-semibold leading-none text-star-white">Orbit Studio</span>
        <span className="mt-1 block font-mono-custom text-[10px] uppercase tracking-[0.18em] text-text-dim">
          Mohamed Hamidat
        </span>
      </span>
    </button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32)
      const sections = NAV_LINKS.map((link) => link.target.replace('#', ''))

      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 220) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (target) => {
    scrollTo(target)
    setMobileOpen(false)
  }

  return (
    <>
      <motion.header
        className="fixed left-0 right-0 top-0 z-50 px-4 py-4 md:px-6"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.15 }}
      >
        <div
          className={`
            mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full border px-3 pl-4
            transition duration-300 md:px-4 md:pl-5
            ${scrolled
              ? 'border-white/12 bg-[#050510]/78 shadow-soft backdrop-blur-2xl'
              : 'border-white/[0.08] bg-[#050510]/42 backdrop-blur-xl'
            }
          `}
        >
          <Logo />

          <nav className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.target.replace('#', '')
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleNav(link.target)}
                  className={`
                    relative rounded-full px-3 py-2 text-sm font-medium transition xl:px-4
                    ${isActive ? 'text-star-white' : 'text-text-dim hover:text-text-primary'}
                  `}
                >
                  {isActive && (
                    <motion.span
                      className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.055]"
                      layoutId="activeNav"
                      transition={{ type: 'spring', stiffness: 350, damping: 35 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </button>
              )
            })}
          </nav>

          <button
            type="button"
            onClick={() => handleNav('#contact')}
            className="hidden rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-star-white transition hover:border-cyan/30 hover:bg-white/[0.08] lg:block"
          >
            Let's talk
          </button>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span className="relative h-4 w-5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="absolute left-0 h-px w-5 bg-star-white"
                  style={{ top: i * 7 }}
                  animate={{
                    rotate: mobileOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                    y: mobileOpen ? (i === 0 ? 7 : i === 2 ? -7 : 0) : 0,
                    opacity: mobileOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#03030a]/96 px-6 pt-28 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <nav className="section-shell flex flex-col gap-3">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.label}
                  type="button"
                  onClick={() => handleNav(link.target)}
                  className="rounded-2xl border border-white/8 bg-white/[0.035] px-5 py-4 text-left text-2xl font-semibold text-star-white"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
