// src/components/sections/Skills.jsx
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import SkillOrbit from '../ui/SkillOrbit'
import { skills } from '../../data/portfolio'

// All skills flat list for the legend
const ALL_SKILLS = [
  ...skills.inner.map((s) => ({ ...s, ring: 'INNER' })),
  ...skills.middle.map((s) => ({ ...s, ring: 'MIDDLE' })),
  ...skills.outer.map((s) => ({ ...s, ring: 'OUTER' })),
]

function LegendPill({ skill, index, inView }) {
  return (
    <motion.div
      className="flex items-center gap-2 px-3 py-1.5 border cursor-default"
      style={{
        borderColor: `${skill.color}30`,
        background: `${skill.color}08`,
        clipPath: 'polygon(5px 0%, 100% 0%, calc(100% - 5px) 100%, 0% 100%)',
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      whileHover={{ scale: 1.04, borderColor: `${skill.color}60` }}
    >
      <span className="text-sm">{skill.icon.length > 2 ? skill.icon : null}</span>
      <span
        className="font-mono-custom text-[10px] tracking-widest"
        style={{ color: skill.color }}
      >
        {skill.name}
      </span>
      <span className="font-mono-custom text-[9px] text-text-dim/50 ml-1">
        {skill.level}%
      </span>
    </motion.div>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)
  const legendRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px 0px' })
  const legendInView = useInView(legendRef, { once: true, margin: '-50px 0px' })

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* ── Background ── */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(0,245,255,1) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(123,47,255,0.05) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label="Capabilities"
          title="SKILL MATRIX"
          subtitle="Hover any node to pause orbit and inspect proficiency — inner ring = primary stack"
        />

        {/* ── Orbit visualization ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <SkillOrbit skills={skills} inView={isInView} />
        </motion.div>

        {/* ── Ring labels ── */}
        <div className="flex justify-center gap-8 -mt-4 mb-12">
          {[
            { label: 'INNER — PRIMARY', color: '#00f5ff', dash: '6 10' },
            { label: 'MIDDLE — SECONDARY', color: '#7b2fff', dash: '4 8' },
            { label: 'OUTER — TOOLING', color: '#a855f7', dash: '3 12' },
          ].map((ring) => (
            <div key={ring.label} className="flex items-center gap-2">
              <svg width="30" height="6" viewBox="0 0 30 6">
                <line
                  x1="0" y1="3" x2="30" y2="3"
                  stroke={ring.color}
                  strokeWidth="1"
                  strokeDasharray={ring.dash}
                  opacity="0.6"
                />
              </svg>
              <span className="font-mono-custom text-[9px] tracking-widest text-text-dim/60">
                {ring.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Skill legend grid ── */}
        <div ref={legendRef}>
          <motion.p
            className="font-mono-custom text-xs text-cyan/50 tracking-[0.3em] mb-4 text-center"
            initial={{ opacity: 0 }}
            animate={legendInView ? { opacity: 1 } : {}}
          >
            // FULL STACK MANIFEST
          </motion.p>
          <div className="flex flex-wrap gap-2 justify-center">
            {ALL_SKILLS.map((skill, i) => (
              <LegendPill key={skill.name} skill={skill} index={i} inView={legendInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
