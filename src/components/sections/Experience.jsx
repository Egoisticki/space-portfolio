import { motion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'

export default function Experience() {
  return (
    <section id="experience" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <SectionTitle label="Timeline" title="MISSION LOG" subtitle="Phase 4 — Coming soon" />
        <motion.p
          className="font-mono-custom text-text-dim/40 text-sm tracking-widest"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          // SECTION UNDER CONSTRUCTION
        </motion.p>
      </div>
    </section>
  )
}
