import { motion } from 'framer-motion'

export default function SectionTitle({ label, title, subtitle, align = 'center' }) {
  const isCenter = align === 'center'

  return (
    <div className={`mb-16 ${isCenter ? 'text-center' : 'text-left'}`}>
      {/* Label */}
      {label && (
        <motion.p
          className="font-mono-custom text-xs tracking-[0.4em] text-cyan/70 uppercase mb-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          // {label}
        </motion.p>
      )}

      {/* Title */}
      <motion.h2
        className="font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold text-star-white relative inline-block"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {title}
        {/* Comet underline */}
        <motion.span
          className="absolute -bottom-3 left-0 h-px bg-gradient-to-r from-cyan via-violet to-transparent"
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          style={{ width: '100%' }}
        />
        <motion.span
          className="absolute -bottom-3 left-0 w-6 h-px bg-cyan"
          style={{ filter: 'blur(2px)', boxShadow: '0 0 8px #00f5ff' }}
          initial={{ x: -24 }}
          whileInView={{ x: '150%' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        />
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          className="mt-6 text-text-dim font-rajdhani text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
