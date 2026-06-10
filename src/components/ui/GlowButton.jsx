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

  return (
    <motion.button
      onClick={onClick}
      className={`
        group relative inline-flex min-h-12 items-center justify-center gap-2.5 overflow-hidden rounded-full
        px-6 py-3 text-sm font-semibold text-star-white transition duration-300
        focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-cyan
        ${isPrimary
          ? 'border border-white/15 bg-violet text-white shadow-inner-light'
          : 'border border-white/12 bg-white/[0.035] text-text-primary backdrop-blur-xl hover:bg-white/[0.07]'
        }
        ${className}
      `}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      {...props}
    >
      <span
        className={`
          absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100
          ${isPrimary
            ? 'bg-[radial-gradient(circle_at_30%_0%,rgba(255,255,255,0.26),transparent_38%),linear-gradient(90deg,rgba(139,92,246,1),rgba(34,211,238,0.72))]'
            : 'bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.10),transparent_46%)]'
          }
        `}
      />
      <span className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
      {icon && <span className="relative z-10 flex h-4 w-4 items-center justify-center">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
