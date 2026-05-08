import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import CustomCursor from './components/layout/CustomCursor'
import LoadingScreen from './components/layout/LoadingScreen'
import Navbar from './components/layout/Navbar'
import ShootingStar from './components/effects/ShootingStar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Experience from './components/sections/Experience'
import Contact from './components/sections/Contact'
import { useLenis } from './hooks/useLenis'

// Section divider
function Divider() {
  return (
    <div className="relative py-4 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="h-px bg-gradient-to-r from-transparent via-cyan/15 to-transparent" />
      {/* Center diamond */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45 bg-cyan/30"
        style={{ boxShadow: '0 0 6px rgba(0,245,255,0.4)' }}
      />
    </div>
  )
}

// Footer
function Footer() {
  return (
    <footer className="py-12 border-t border-cyan/10 text-center relative overflow-hidden">
      {/* Subtle gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(0,245,255,0.03) 0%, transparent 60%)' }}
      />
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono-custom text-xs text-text-dim/50 tracking-widest">
            © 2024 ALEX NOVA // STELLAR DEV
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
            <span className="font-mono-custom text-xs text-cyan/50 tracking-widest">
              ALL SYSTEMS NOMINAL
            </span>
          </div>
          <p className="font-mono-custom text-xs text-text-dim/30 tracking-widest">
            BUILT WITH REACT + THREE.JS
          </p>
        </div>
      </div>
    </footer>
  )
}

// Staggered section entrance wrapper
function SectionReveal({ children, delay = 0 }) {
  const shouldReduceMotion = useReducedMotion()
  if (shouldReduceMotion) return children

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

function MainLayout() {
  useLenis()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <ShootingStar />

      <main>
        {/* Hero — no SectionReveal, has its own orchestration */}
        <Hero />

        <Divider />

        <SectionReveal delay={0}>
          <About />
        </SectionReveal>

        <Divider />

        <SectionReveal delay={0}>
          <Projects />
        </SectionReveal>

        <Divider />

        <SectionReveal delay={0}>
          <Skills />
        </SectionReveal>

        <Divider />

        <SectionReveal delay={0}>
          <Experience />
        </SectionReveal>

        <Divider />

        <SectionReveal delay={0}>
          <Contact />
        </SectionReveal>

        <Footer />
      </main>
    </motion.div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  // Prevent scroll during loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [loading])

  return (
    <BrowserRouter>
      {/* Custom cursor — only on non-touch devices */}
      <CustomCursor />

      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" onComplete={() => setLoading(false)} />
        ) : (
          <MainLayout key="main" />
        )}
      </AnimatePresence>
    </BrowserRouter>
  )
}
