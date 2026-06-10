import { BrowserRouter } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Education from './components/sections/Education'
import Experience from './components/sections/Experience'
import Blog from './components/sections/Blog'
import Contact from './components/sections/Contact'
import { useLenis } from './hooks/useLenis'

function Divider() {
  return (
    <div className="relative overflow-hidden py-4 pointer-events-none" aria-hidden="true">
      <div className="section-shell h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  )
}

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8 py-12 text-center">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_100%,rgba(34,211,238,0.045),transparent_60%)]" />
      <div className="section-shell relative">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="font-mono-custom text-xs text-text-dim/60">
            Copyright 2026 Mohamed Hamidat
          </p>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="font-mono-custom text-xs text-text-dim/60">
              Open to selected opportunities
            </span>
          </div>
          <p className="font-mono-custom text-xs text-text-dim/60">
            React + Three.js + Tailwind
          </p>
        </div>
      </div>
    </footer>
  )
}

function SectionReveal({ children, delay = 0 }) {
  const shouldReduceMotion = useReducedMotion()
  if (shouldReduceMotion) return children

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
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
      transition={{ duration: 0.45 }}
    >
      <Navbar />

      <main>
        <Hero />
        <Divider />
        <SectionReveal>
          <About />
        </SectionReveal>
        <Divider />
        <SectionReveal>
          <Projects />
        </SectionReveal>
        <Divider />
        <SectionReveal>
          <Skills />
        </SectionReveal>
        <Divider />
        <SectionReveal>
          <Education />
        </SectionReveal>
        <Divider />
        <SectionReveal>
          <Experience />
        </SectionReveal>
        <Divider />
        <SectionReveal>
          <Blog />
        </SectionReveal>
        <Divider />
        <SectionReveal>
          <Contact />
        </SectionReveal>
        <Footer />
      </main>
    </motion.div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  )
}
