import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { scrollTo } from '../../hooks/useLenis'

const NAV_LINKS = [
  { label: 'Home', target: '#hero' },
  { label: 'About', target: '#about' },
  { label: 'Projects', target: '#projects' },
  { label: 'Skills', target: '#skills' },
  { label: 'Experience', target: '#experience' },
  { label: 'Contact', target: '#contact' },
]

function HexLogo() {
  return (
    <motion.div
      className="relative cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => scrollTo('#hero')}
    >
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <polygon
          points="22,2 40,12 40,32 22,42 4,32 4,12"
          fill="rgba(0,245,255,0.05)"
          stroke="#00f5ff"
          strokeWidth="1"
          className="animate-pulse-glow"
          style={{ filter: 'drop-shadow(0 0 6px #00f5ff)' }}
        />
        <text
          x="22" y="27"
          textAnchor="middle"
          fill="#00f5ff"
          fontSize="13"
          fontFamily="Orbitron, sans-serif"
          fontWeight="700"
          style={{ filter: 'drop-shadow(0 0 4px #00f5ff)' }}
        >
          AN
        </text>
      </svg>
    </motion.div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)

      // Detect active section
      const sections = NAV_LINKS.map(l => l.target.replace('#', ''))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(sections[i])
          break
        }
      }
    }
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
        className={`
          fixed top-0 left-0 right-0 z-50 px-6 py-4
          flex items-center justify-between
          transition-all duration-500
          ${scrolled
            ? 'backdrop-blur-xl bg-void/80 border-b border-cyan/10 shadow-[0_1px_20px_rgba(0,245,255,0.05)]'
            : 'bg-transparent'
          }
        `}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
      >
        <HexLogo />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link, i) => {
            const isActive = activeSection === link.target.replace('#', '')
            return (
              <motion.button
                key={link.label}
                onClick={() => handleNav(link.target)}
                className={`
                  relative font-orbitron text-xs tracking-widest uppercase
                  transition-colors duration-300
                  ${isActive ? 'text-cyan' : 'text-text-dim hover:text-text-primary'}
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-px bg-cyan"
                    style={{ boxShadow: '0 0 6px #00f5ff' }}
                    layoutId="activeNav"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            )
          })}
        </nav>

        {/* CTA button desktop */}
        <motion.button
          className="hidden md:flex items-center gap-2 px-5 py-2 border border-cyan/30 font-orbitron text-xs text-cyan/80 tracking-widest hover:border-cyan hover:text-cyan transition-all duration-300"
          style={{ clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)' }}
          onClick={() => handleNav('#contact')}
          whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0,245,255,0.2)' }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
          CONTACT
        </motion.button>

        {/* Mobile hamburger */}
        <motion.button
          className="md:hidden flex flex-col gap-1.5 p-2 z-10"
          onClick={() => setMobileOpen(!mobileOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              className="block h-px bg-cyan"
              animate={{
                width: i === 1 ? (mobileOpen ? '16px' : '24px') : '24px',
                rotate: mobileOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                y: mobileOpen ? (i === 0 ? 8 : i === 2 ? -8 : 0) : 0,
                opacity: mobileOpen && i === 1 ? 0 : 1,
              }}
              transition={{ duration: 0.25 }}
            />
          ))}
        </motion.button>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ background: 'rgba(2, 2, 15, 0.97)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Decorative grid */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: 'linear-gradient(rgba(0,245,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,1) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }}
            />

            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => handleNav(link.target)}
                  className="font-orbitron text-2xl font-bold text-text-primary hover:text-cyan transition-colors tracking-widest"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  whileHover={{ scale: 1.05, textShadow: '0 0 20px #00f5ff' }}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>

            {/* Decorative bottom line */}
            <motion.div
              className="absolute bottom-12 flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="w-16 h-px bg-cyan/30" />
              <span className="font-mono-custom text-xs text-cyan/50 tracking-widest">ALEX NOVA</span>
              <span className="w-16 h-px bg-cyan/30" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
