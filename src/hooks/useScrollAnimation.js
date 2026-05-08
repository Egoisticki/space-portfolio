import { useInView, useReducedMotion } from 'framer-motion'
import { useRef, useMemo } from 'react'

// Variant factory — generates motion variants with optional reduced motion override
export function makeVariants(config, reduceMotion = false) {
  if (reduceMotion) {
    return {
      hidden:  { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.3 } },
    }
  }
  return config
}

export const variants = {
  fadeUp: {
    hidden:  { opacity: 0, y: 50, filter: 'blur(4px)' },
    visible: {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  },
  fadeDown: {
    hidden:  { opacity: 0, y: -30 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },
  fadeLeft: {
    hidden:  { opacity: 0, x: -50, filter: 'blur(4px)' },
    visible: {
      opacity: 1, x: 0, filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  },
  fadeRight: {
    hidden:  { opacity: 0, x: 50, filter: 'blur(4px)' },
    visible: {
      opacity: 1, x: 0, filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  },
  scaleIn: {
    hidden:  { opacity: 0, scale: 0.88 },
    visible: {
      opacity: 1, scale: 1,
      transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
    },
  },
  popIn: {
    hidden:  { opacity: 0, scale: 0.6, y: 10 },
    visible: {
      opacity: 1, scale: 1, y: 0,
      transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
    },
  },
  stagger: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  },
  staggerSlow: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  },
  staggerFast: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.05, delayChildren: 0 },
    },
  },
}

/**
 * useScrollAnimation
 * Returns { ref, isInView, animate, controls }
 * Usage:
 *   const { ref, animate } = useScrollAnimation()
 *   <motion.div ref={ref} variants={variants.fadeUp} initial="hidden" animate={animate} />
 */
export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  const marginPx = Math.round((1 - threshold) * 100)
  const isInView = useInView(ref, {
    once: true,
    margin: `-${marginPx}px 0px`,
  })

  // If reduced motion: always show (skip animation)
  const animate = shouldReduceMotion ? 'visible' : (isInView ? 'visible' : 'hidden')

  return { ref, isInView: shouldReduceMotion || isInView, animate }
}

/**
 * useParallax
 * Takes a MotionValue from useScroll and applies a transform.
 * Usage:
 *   const { scrollYProgress } = useScroll()
 *   const y = useParallax(scrollYProgress, 0, 1, [0, -100])
 */
export { useTransform } from 'framer-motion'
