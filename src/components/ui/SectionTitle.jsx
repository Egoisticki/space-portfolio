import { motion } from 'framer-motion'

export default function SectionTitle({ label, title, subtitle, align = 'center' }) {
  const isCenter = align === 'center'

  return (
    <div className={`mb-14 ${isCenter ? 'mx-auto text-center' : 'text-left'}`}>
      {label && (
        <motion.p
          className="section-eyebrow mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          {label}
        </motion.p>
      )}

      <motion.h2
        className="section-title mx-auto max-w-4xl"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.08 }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          className={`section-copy mt-6 max-w-2xl ${isCenter ? 'mx-auto' : ''}`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.16 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
