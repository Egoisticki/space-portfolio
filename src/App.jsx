import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
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

function MainLayout() {
  useLenis()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Navbar />
      <ShootingStar />
      <main>
        <Hero />

        {/* Divider */}
        <div className="relative py-4 overflow-hidden pointer-events-none">
          <div className="h-px bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />
        </div>

        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />

        {/* Footer */}
        <footer className="py-12 border-t border-cyan/10 text-center">
          <div className="max-w-6xl mx-auto px-6">
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
      </main>
    </motion.div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <BrowserRouter>
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
