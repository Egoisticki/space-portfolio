import { motion } from 'framer-motion'

export default function GlowButton({
  children,
  onClick,
  variant = 'primary',
  className = '',
  icon,
  ...props
}) {
  const isPrimary = variant === 'primary'
  const isGhost = variant === 'ghost'

  return (
    <motion.button
      onClick={onClick}
      className={`
        relative inline-flex items-center gap-3 px-8 py-3.5
        font-orbitron text-sm font-semibold tracking-widest
        transition-all duration-300 overflow-hidden group
        ${isPrimary
          ? 'bg-transparent border border-cyan/50 text-cyan hover:border-cyan'
          : 'bg-transparent border border-violet/40 text-violet-bright hover:border-violet-bright'
        }
        ${className}
      `}
      style={{
        clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {/* Glow background on hover */}
      <motion.span
        className={`
          absolute inset-0 opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          ${isPrimary
            ? 'bg-gradient-to-r from-cyan/10 via-cyan/5 to-transparent'
            : 'bg-gradient-to-r from-violet/10 via-violet/5 to-transparent'
          }
        `}
      />

      {/* Scan line on hover */}
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{ overflow: 'hidden' }}
      >
        <span
          className={`absolute top-0 bottom-0 w-0.5 ${isPrimary ? 'bg-cyan' : 'bg-violet-bright'}`}
          style={{
            animation: 'scan-line 1.5s ease-in-out infinite',
            filter: isPrimary
              ? 'drop-shadow(0 0 6px #00f5ff)'
              : 'drop-shadow(0 0 6px #a855f7)',
          }}
        />
      </span>

      {/* Corner decorations */}
      <span
        className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${isPrimary ? 'border-cyan' : 'border-violet-bright'}`}
      />
      <span
        className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${isPrimary ? 'border-cyan' : 'border-violet-bright'}`}
      />

      {icon && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
