import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

// Singleton instance so scrollTo works from anywhere
let lenisInstance = null

export function useLenis() {
  const lenisRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    // Don't re-init if already running
    if (lenisInstance) return

    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
      // ── CRITICAL FOR MODALS ──
      // When the wheel/touch event originates inside (or under) any element
      // marked [data-lenis-prevent], return true so Lenis does NOT call
      // preventDefault on it. That lets the browser scroll that element
      // natively — wheel, trackpad momentum, and touch all work.
      // This does NOT depend on importing lenis.css, unlike the bare
      // data-lenis-prevent attribute handling, so it is reliable here.
      prevent: (node) => {
        return node?.closest?.('[data-lenis-prevent]') != null
      },
    })

    lenisInstance = lenis
    lenisRef.current = lenis

    const raf = (time) => {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }
    rafRef.current = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafRef.current)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])

  return lenisRef
}

export function scrollTo(target, options = {}) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      ...options,
    })
  } else {
    // Fallback for cases where lenis isn't ready
    const el = typeof target === 'string' ? document.querySelector(target) : target
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
}

export function getLenis() {
  return lenisInstance
}
