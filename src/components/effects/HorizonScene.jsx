import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function HorizonScene() {
  const ref = useRef(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, -40])

  return (
    <motion.div
      ref={ref}
      className="absolute bottom-0 left-0 right-0 pointer-events-none"
      style={{ y }}
    >
      <svg
        viewBox="0 0 1440 220"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
      >
        <defs>
          <linearGradient id="horizonGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.6" />
            <stop offset="30%" stopColor="#00f5ff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#00f5ff" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="terrainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#050518" />
            <stop offset="100%" stopColor="#02020f" />
          </linearGradient>
        </defs>

        {/* Atmosphere glow strip */}
        <rect
          x="0" y="60" width="1440" height="40"
          fill="url(#horizonGlow)"
          opacity="0.4"
        />

        {/* Horizon glow line */}
        <line
          x1="0" y1="100" x2="1440" y2="100"
          stroke="#00f5ff"
          strokeWidth="1.5"
          opacity="0.7"
          filter="url(#glow)"
        />

        {/* Moon terrain silhouette — main */}
        <path
          d="M0,220 L0,130 
             C80,128 120,110 160,115
             C200,120 220,108 270,105
             C310,103 330,118 380,114
             C420,111 450,100 500,98
             C540,96 560,110 610,108
             C650,106 670,95 720,92
             C760,90 790,105 840,102
             C880,100 910,88 960,86
             C1000,84 1030,98 1080,96
             C1120,94 1150,82 1200,80
             C1240,78 1270,92 1320,90
             C1360,88 1400,100 1440,98
             L1440,220 Z"
          fill="url(#terrainGrad)"
        />

        {/* Craters */}
        {[
          { cx: 200, cy: 130, rx: 18, ry: 5 },
          { cx: 480, cy: 112, rx: 24, ry: 6 },
          { cx: 750, cy: 106, rx: 16, ry: 4 },
          { cx: 1050, cy: 100, rx: 20, ry: 5 },
          { cx: 1300, cy: 96, rx: 14, ry: 3.5 },
        ].map((crater, i) => (
          <g key={i}>
            <ellipse
              cx={crater.cx} cy={crater.cy}
              rx={crater.rx} ry={crater.ry}
              fill="none"
              stroke="#00f5ff"
              strokeWidth="0.5"
              opacity="0.25"
            />
            <ellipse
              cx={crater.cx} cy={crater.cy}
              rx={crater.rx * 0.6} ry={crater.ry * 0.6}
              fill="rgba(0,0,20,0.4)"
            />
          </g>
        ))}

        {/* Distant mountains / peaks */}
        <path
          d="M0,220 L0,145
             L60,138 L100,148 L140,130 L180,142 L230,125 L280,140
             L340,128 L390,145 L440,132 L490,148 L550,135 L610,150
             L670,138 L730,152 L790,140 L850,155 L910,143 L970,158
             L1040,145 L1110,160 L1180,148 L1260,162 L1340,150 L1440,155
             L1440,220 Z"
          fill="#030310"
          opacity="0.6"
        />

        {/* Subtle grid lines on surface */}
        {[0, 1, 2, 3, 4].map(i => (
          <line
            key={i}
            x1={i * 360} y1="105"
            x2={i * 360 + 180} y2="220"
            stroke="#00f5ff"
            strokeWidth="0.3"
            opacity="0.06"
          />
        ))}
      </svg>
    </motion.div>
  )
}
