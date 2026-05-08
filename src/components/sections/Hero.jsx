import { useRef, useEffect, useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion, useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import StarField from '../three/StarField'
import Planet from '../three/Planet'
import NebulaBackground from '../three/NebulaBackground'
import HorizonScene from '../effects/HorizonScene'
import GlowButton from '../ui/GlowButton'
import { personalInfo } from '../../data/portfolio'
import { scrollTo } from '../../hooks/useLenis'
import astronautImg from '../../../public/astronaut-hero.png'

// Typewriter hook
function useTypewriter(phrases, speed = 80, pause = 2000) {
  const [text, setText] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const blinkInterval = setInterval(() => setShowCursor(c => !c), 530)
    return () => clearInterval(blinkInterval)
  }, [])

  useEffect(() => {
    const current = phrases[phraseIdx]
    let timeout

    if (!isDeleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), speed)
    } else if (!isDeleting && text.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), pause)
    } else if (isDeleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), speed / 2)
    } else if (isDeleting && text.length === 0) {
      setIsDeleting(false)
      setPhraseIdx((phraseIdx + 1) % phrases.length)
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, phraseIdx, phrases, speed, pause])

  return { text, showCursor }
}

// Stagger letter animation helper
function AnimatedText({ text, delay = 0, className = '', glowClass = '' }) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className={`inline-block ${char === ' ' ? 'mx-1' : ''} ${glowClass}`}
          initial={{ opacity: 0, y: 80, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            delay: delay + i * 0.04,
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

// Floating astronaut with layered glow effects
function FloatingAstronaut() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className="absolute right-[2vw] xl:right-[6vw] top-1/2 -translate-y-[55%] pointer-events-none select-none hidden lg:block"
      initial={{ opacity: 0, scale: 0.6, x: 60 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ delay: 2, duration: 1, type: 'spring', stiffness: 80, damping: 14 }}
    >
      {/* Outer ambient glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 45% 50%, rgba(123,47,255,0.18) 0%, rgba(0,245,255,0.08) 45%, transparent 70%)',
          transform: 'scale(1.5)',
          filter: 'blur(18px)',
        }}
        animate={shouldReduceMotion ? {} : {
          opacity: [0.6, 1, 0.6],
          scale: [1.4, 1.6, 1.4],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating + bob animation wrapper */}
      <motion.div
        animate={shouldReduceMotion ? {} : {
          y: [0, -18, 0],
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ filter: 'drop-shadow(0 0 24px rgba(123,47,255,0.5)) drop-shadow(0 0 48px rgba(0,245,255,0.2))' }}
      >
        <img
          src={astronautImg}
          alt="Astronaut"
          className="w-[220px] xl:w-[280px] 2xl:w-[320px] object-contain relative z-10"
          draggable={false}
          style={{
            filter: 'drop-shadow(0 0 12px rgba(0,245,255,0.3))',
          }}
        />
      </motion.div>

      {/* Orbiting particle ring around astronaut */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: 260,
          height: 260,
          border: '1px dashed rgba(0,245,255,0.12)',
        }}
        animate={shouldReduceMotion ? {} : { rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      >
        {/* Orbit dot */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
          style={{ background: '#00f5ff', boxShadow: '0 0 8px #00f5ff' }}
        />
      </motion.div>

      {/* Second counter-orbit ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: 310,
          height: 310,
          border: '1px dashed rgba(123,47,255,0.1)',
        }}
        animate={shouldReduceMotion ? {} : { rotate: -360 }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
      >
        <div
          className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
          style={{ background: '#a855f7', boxShadow: '0 0 6px #a855f7' }}
        />
      </motion.div>

      {/* HUD bracket overlay */}
      <div className="absolute inset-4 pointer-events-none">
        {/* Top-left */}
        <motion.div
          className="absolute top-0 left-0 w-5 h-5 border-t border-l border-cyan/30"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5, duration: 0.3 }}
        />
        {/* Top-right */}
        <motion.div
          className="absolute top-0 right-0 w-5 h-5 border-t border-r border-cyan/30"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.6, duration: 0.3 }}
        />
        {/* Bottom-left */}
        <motion.div
          className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-cyan/30"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.7, duration: 0.3 }}
        />
        {/* Bottom-right */}
        <motion.div
          className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-cyan/30"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.8, duration: 0.3 }}
        />
      </div>

      {/* HUD label */}
      <motion.div
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.5 }}
      >
        <span className="font-mono-custom text-[10px] text-cyan/40 tracking-[0.3em] uppercase">
          ◈ UNIT-01 // DEPLOYED
        </span>
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const contentRef = useRef(null)
  const greetingRef = useRef(null)
  const { text: role, showCursor } = useTypewriter(personalInfo.roles)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!ready || !greetingRef.current) return
    gsap.fromTo(
      greetingRef.current,
      { opacity: 0, y: 20, letterSpacing: '0.8em' },
      { opacity: 1, y: 0, letterSpacing: '0.4em', duration: 1.2, ease: 'power3.out', delay: 0.1 }
    )
  }, [ready])

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── R3F Canvas ── */}
      <div className="absolute inset-0 z-0">
        <Canvas
          gl={{ antialias: true, alpha: true }}
          camera={{ fov: 60, near: 0.1, far: 1000, position: [0, 0, 5] }}
          style={{ position: 'absolute', inset: 0 }}
          dpr={Math.min(window.devicePixelRatio, 2)}
        >
          <color attach="background" args={['#02020f']} />
          <fog attach="fog" args={['#02020f', 30, 100]} />
          <ambientLight intensity={0.05} />
          <pointLight position={[-5, 3, 2]} color="#7b2fff" intensity={3} />
          <pointLight position={[5, -2, 0]} color="#00f5ff" intensity={1.5} />
          <Suspense fallback={null}>
            <StarField count={8000} />
            <Planet position={[3.8, -0.3, -1]} />
            <NebulaBackground />
          </Suspense>
        </Canvas>
      </div>

      {/* ── Horizon / Moon Surface ── */}
      <HorizonScene />

      {/* ── Scan lines overlay ── */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.025) 2px, rgba(0,0,0,0.025) 4px)',
        }}
      />

      {/* ── HUD corner decorations ── */}
      {[
        'top-6 left-6 border-t border-l',
        'top-6 right-6 border-t border-r',
        'bottom-20 left-6 border-b border-l',
        'bottom-20 right-6 border-b border-r',
      ].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute w-8 h-8 border-cyan/30 pointer-events-none z-10 ${pos}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
        />
      ))}

      {/* ── HUD status line ── */}
      <motion.div
        className="absolute top-20 left-6 z-10 pointer-events-none"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
      >
        <p className="font-mono-custom text-xs text-cyan/40 tracking-widest animate-flicker">
          SYS // ONLINE &nbsp;|&nbsp; LAT: 51.5°N &nbsp;|&nbsp; LON: 0.1°W
        </p>
      </motion.div>

      {/* ── Floating Astronaut (image) ── */}
      <FloatingAstronaut />

      {/* ── Hero Content ── */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center text-center px-6 pt-20 pb-40 max-w-6xl mx-auto"
      >
        {/* Greeting */}
        <motion.p
          ref={greetingRef}
          className="font-mono-custom text-xs md:text-sm text-cyan/70 tracking-[0.4em] uppercase mb-6"
          initial={{ opacity: 0 }}
          style={{ opacity: 0 }}
        >
          ◈ WELCOME ABOARD ◈
        </motion.p>

        {/* Name — massive staggered letters */}
        {ready && (
          <h1 className="font-orbitron font-black leading-none select-none mb-4">
            <div className="text-[clamp(3rem,10vw,8rem)] text-glow-cyan text-cyan">
              <AnimatedText text="MOHAMED" delay={0.4} />
            </div>
            <div
              className="text-[clamp(3rem,10vw,8rem)] text-star-white"
              style={{ textShadow: '0 0 40px rgba(200, 216, 240, 0.2)' }}
            >
              <AnimatedText text="HAMIDAT" delay={0.7} />
            </div>
          </h1>
        )}

        {/* Role typewriter */}
        <motion.div
          className="flex items-center gap-2 mb-6 h-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <span className="font-mono-custom text-sm md:text-base text-violet-bright tracking-widest">
            {'>'}&nbsp;
          </span>
          <span className="font-mono-custom text-sm md:text-base text-text-primary tracking-wide">
            {role}
          </span>
          <span
            className="inline-block w-0.5 h-5 bg-cyan ml-1"
            style={{ opacity: showCursor ? 1 : 0, transition: 'opacity 0.1s' }}
          />
        </motion.div>

        {/* Bio tagline */}
        <motion.p
          className="font-rajdhani text-lg md:text-xl text-text-dim max-w-xl mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.7 }}
        >
          Navigating the digital cosmos — turning complex problems into
          <span className="text-cyan"> elegant, performant experiences</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 items-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <GlowButton
            variant="primary"
            onClick={() => scrollTo('#projects')}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            }
          >
            EXPLORE THE VOID
          </GlowButton>

          <GlowButton
            variant="ghost"
            onClick={() => scrollTo('#projects')}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            }
          >
            VIEW PROJECTS
          </GlowButton>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.6 }}
      >
        <span className="font-mono-custom text-xs text-text-dim/60 tracking-[0.3em] uppercase">
          SCROLL TO DISCOVER
        </span>
        <div className="relative flex flex-col items-center gap-1">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-px h-2 bg-cyan/60"
              animate={{ opacity: [0.2, 1, 0.2], scaleY: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
