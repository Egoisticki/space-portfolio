import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import { personalInfo } from '../../data/portfolio'

// Floating label input field
function FloatingField({ label, type = 'text', name, value, onChange, multiline = false, required }) {
  const [focused, setFocused] = useState(false)
  const hasValue = value && value.length > 0
  const isActive = focused || hasValue

  const fieldProps = {
    name,
    value,
    onChange,
    required,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    className: `
      w-full bg-transparent font-rajdhani text-base text-text-primary
      pt-6 pb-2 px-4 outline-none resize-none
      transition-colors duration-300
    `,
  }

  return (
    <div className="relative group">
      {/* Border */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-300"
        style={{
          border: `1px solid ${focused ? 'rgba(0,245,255,0.5)' : 'rgba(0,245,255,0.1)'}`,
          boxShadow: focused ? '0 0 20px rgba(0,245,255,0.08), inset 0 0 20px rgba(0,245,255,0.03)' : 'none',
          background: 'rgba(8,12,40,0.5)',
        }}
      />

      {/* Corner accents on focus */}
      <motion.span
        className="absolute top-0 left-0 border-t border-l border-cyan pointer-events-none"
        animate={{ width: focused ? 12 : 0, height: focused ? 12 : 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="absolute bottom-0 right-0 border-b border-r border-cyan pointer-events-none"
        animate={{ width: focused ? 12 : 0, height: focused ? 12 : 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* Floating label */}
      <motion.label
        className="absolute left-4 font-mono-custom text-xs tracking-widest pointer-events-none select-none uppercase"
        animate={{
          top: isActive ? 8 : multiline ? 20 : '50%',
          y: isActive ? 0 : multiline ? 0 : '-50%',
          color: focused ? '#00f5ff' : 'rgba(90,122,154,0.7)',
          fontSize: isActive ? '10px' : '12px',
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>

      {/* Input or textarea */}
      {multiline ? (
        <textarea rows={5} {...fieldProps} />
      ) : (
        <input type={type} {...fieldProps} />
      )}
    </div>
  )
}

// Social link orbit node
function SocialNode({ icon, label, href, color, delay, inView }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-4"
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ x: 4 }}
    >
      {/* Orbit node */}
      <div className="relative flex-shrink-0">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300 group-hover:scale-110"
          style={{
            background: 'rgba(8,12,40,0.8)',
            border: `1px solid ${color}40`,
            boxShadow: `0 0 0 ${color}00`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 0 20px ${color}60`
            e.currentTarget.style.borderColor = `${color}80`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `0 0 0 ${color}00`
            e.currentTarget.style.borderColor = `${color}40`
          }}
        >
          {icon}
        </div>
        {/* Small orbit ring */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            border: `1px dashed ${color}40`,
            transform: 'scale(1.4)',
            animation: 'orbit 4s linear infinite',
          }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
            style={{ background: color }}
          />
        </div>
      </div>

      <div>
        <p className="font-orbitron text-sm font-semibold text-text-primary group-hover:text-star-white transition-colors">{label}</p>
        <p className="font-mono-custom text-xs mt-0.5 transition-colors" style={{ color: `${color}80` }}>
          {href.replace('https://', '').replace('mailto:', '')}
        </p>
      </div>
    </motion.a>
  )
}

// Particle burst on success
function SuccessParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(16)].map((_, i) => {
        const angle = (i / 16) * 360
        const distance = 60 + Math.random() * 60
        const x = Math.cos((angle * Math.PI) / 180) * distance
        const y = Math.sin((angle * Math.PI) / 180) * distance
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 w-1 h-1 rounded-full"
            style={{ background: i % 3 === 0 ? '#00f5ff' : i % 3 === 1 ? '#a855f7' : '#ff9a3c' }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x, y, opacity: 0, scale: 0 }}
            transition={{ duration: 0.8, delay: i * 0.02, ease: 'easeOut' }}
          />
        )
      })}
    </div>
  )
}

export default function Contact() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | launching | success | error
  const [showParticles, setShowParticles] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'launching' || status === 'success') return

    setStatus('launching')

    // Simulate transmission
    await new Promise((r) => setTimeout(r, 2000))
    setStatus('success')
    setShowParticles(true)
    setTimeout(() => setShowParticles(false), 1000)
  }

  const socialLinks = [
    { icon: '⌥', label: 'GitHub', href: personalInfo.github, color: '#00f5ff' },
    { icon: '◈', label: 'LinkedIn', href: personalInfo.linkedin, color: '#a855f7' },
    { icon: '✉', label: 'Email', href: `mailto:${personalInfo.email}`, color: '#ff9a3c' },
    { icon: '✦', label: 'Twitter', href: personalInfo.twitter || 'https://twitter.com', color: '#00f5ff' },
  ]

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      {/* Background nebula */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(0,245,255,0.03) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(123,47,255,0.03) 0%, transparent 60%)',
        }}
      />

      {/* Satellite dish decoration */}
      <motion.div
        className="absolute top-12 right-8 opacity-10 pointer-events-none hidden lg:block"
        animate={{ rotate: [0, 2, -2, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="55" stroke="#00f5ff" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="60" cy="60" r="35" stroke="#00f5ff" strokeWidth="0.5" strokeDasharray="3 5" />
          <circle cx="60" cy="60" r="15" stroke="#00f5ff" strokeWidth="0.5" />
          <line x1="60" y1="60" x2="105" y2="15" stroke="#00f5ff" strokeWidth="1" />
          <circle cx="105" cy="15" r="3" fill="#00f5ff" />
          <line x1="60" y1="60" x2="15" y2="100" stroke="#00f5ff" strokeWidth="0.5" />
        </svg>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <SectionTitle label="Connect" title="OPEN CHANNELS" align="center" />

        <div className="grid lg:grid-cols-2 gap-16 mt-4">
          {/* ── Left: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="font-mono-custom text-xs text-cyan/50 tracking-[0.3em] uppercase mb-6">
              // Compose Transmission
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <FloatingField label="Name" name="name" value={formData.name} onChange={handleChange} required />
                <FloatingField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <FloatingField label="Subject" name="subject" value={formData.subject} onChange={handleChange} required />
              <FloatingField label="Message" name="message" value={formData.message} onChange={handleChange} multiline required />

              {/* Submit button */}
              <div className="relative pt-2">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      className="relative flex items-center justify-center gap-3 px-8 py-4 w-full overflow-hidden"
                      style={{
                        border: '1px solid rgba(0,245,255,0.5)',
                        background: 'rgba(0,245,255,0.05)',
                        clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
                      }}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {showParticles && <SuccessParticles />}
                      <span className="text-xl">✓</span>
                      <span className="font-orbitron text-sm tracking-widest text-cyan">SIGNAL RECEIVED</span>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="submit"
                      type="submit"
                      disabled={status === 'launching'}
                      className="relative flex items-center justify-center gap-3 px-8 py-4 w-full group overflow-hidden transition-all duration-300"
                      style={{
                        border: '1px solid rgba(0,245,255,0.4)',
                        clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
                        background: status === 'launching' ? 'rgba(0,245,255,0.08)' : 'transparent',
                      }}
                      whileHover={{ scale: status === 'launching' ? 1 : 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {/* Hover bg */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-cyan/10 via-cyan/5 to-transparent" />

                      {/* Scan line */}
                      <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100">
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-cyan"
                          style={{ animation: 'scan-line 1.5s ease-in-out infinite', filter: 'drop-shadow(0 0 6px #00f5ff)' }}
                        />
                      </div>

                      {/* Corner accents */}
                      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan" />
                      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan" />

                      <AnimatePresence mode="wait">
                        {status === 'launching' ? (
                          <motion.div
                            key="launching"
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                          >
                            <motion.span
                              className="text-xl"
                              animate={{ y: [0, -6, 0], rotate: [0, 5, -5, 0] }}
                              transition={{ duration: 0.5, repeat: Infinity }}
                            >
                              🚀
                            </motion.span>
                            <span className="font-orbitron text-sm tracking-widest text-cyan/80">LAUNCHING...</span>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="idle"
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00f5ff" strokeWidth="2">
                              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                            </svg>
                            <span className="font-orbitron text-sm tracking-widest text-cyan relative z-10">
                              LAUNCH TRANSMISSION
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>

          {/* ── Right: Info ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col justify-between"
          >
            <div>
              <p className="font-mono-custom text-xs text-cyan/50 tracking-[0.3em] uppercase mb-6">
                // Transmission Channels
              </p>

              <div className="space-y-6">
                {socialLinks.map((link, i) => (
                  <SocialNode key={link.label} {...link} delay={0.4 + i * 0.1} inView={inView} />
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <motion.div
              className="mt-12 glass-card p-5 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {/* Corner accents */}
              <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan/40" />
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan/40" />

              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 block"
                    style={{ boxShadow: '0 0 8px #34d399' }} />
                  <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-40" />
                </div>
                <span className="font-orbitron text-xs text-emerald-400 tracking-widest uppercase">
                  Available for Projects
                </span>
              </div>

              <p className="font-rajdhani text-sm text-text-dim leading-relaxed">
                Currently open to freelance opportunities, full-time roles, and exciting collaborations.
                Response time: <span className="text-cyan">under 24 hours</span>.
              </p>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {['Remote', 'On-site', 'Hybrid'].map((mode) => (
                  <div
                    key={mode}
                    className="text-center py-1.5 font-mono-custom text-[10px] tracking-widest text-text-dim/60"
                    style={{ border: '1px solid rgba(0,245,255,0.1)' }}
                  >
                    {mode}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Moon horizon at bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <defs>
            <linearGradient id="contactHorizonGlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00f5ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="30" width="1440" height="20" fill="url(#contactHorizonGlow)" opacity="0.5" />
          <line x1="0" y1="50" x2="1440" y2="50" stroke="#00f5ff" strokeWidth="1" opacity="0.4"
            style={{ filter: 'drop-shadow(0 0 4px #00f5ff)' }} />
          <path
            d="M0,120 L0,65 C120,62 200,55 300,58 C400,61 480,52 580,50 C680,48 760,56 880,54 C1000,52 1080,44 1200,46 C1320,48 1380,56 1440,54 L1440,120 Z"
            fill="rgba(2,2,15,0.8)"
          />
          {/* Craters */}
          {[250, 600, 950, 1200].map((cx, i) => (
            <g key={i}>
              <ellipse cx={cx} cy={62} rx={20} ry={5} fill="none" stroke="#00f5ff" strokeWidth="0.4" opacity="0.2" />
            </g>
          ))}
        </svg>
      </div>
    </section>
  )
}
