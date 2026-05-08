import * as THREE from 'three'

// Cached textures — call once and reuse
const _cache = new Map()

function cached(key, factory) {
  if (!_cache.has(key)) {
    _cache.set(key, factory())
  }
  return _cache.get(key)
}

/**
 * Soft radial glow sprite for star points.
 * Result is memoized by size.
 */
export function createStarTexture(size = 32) {
  return cached(`star-${size}`, () => {
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    const half = size / 2
    const gradient = ctx.createRadialGradient(half, half, 0, half, half, half)
    gradient.addColorStop(0,   'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.25,'rgba(210, 230, 255, 0.9)')
    gradient.addColorStop(0.6, 'rgba(100, 160, 255, 0.3)')
    gradient.addColorStop(1,   'rgba(0, 0, 0, 0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
    return new THREE.CanvasTexture(canvas)
  })
}

/**
 * Radial nebula sprite with two colour stops.
 * Memoized by color pair.
 */
export function createNebulaTexture(color1 = '#7b2fff', color2 = '#00f5ff', size = 256) {
  return cached(`nebula-${color1}-${color2}-${size}`, () => {
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    const half = size / 2
    const gradient = ctx.createRadialGradient(half, half, 0, half, half, half)
    gradient.addColorStop(0,   color1 + 'cc')
    gradient.addColorStop(0.45, color2 + '55')
    gradient.addColorStop(0.8,  'rgba(0,0,0,0.1)')
    gradient.addColorStop(1,   'rgba(0,0,0,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
    return new THREE.CanvasTexture(canvas)
  })
}

/**
 * Random point inside a sphere of given radius.
 * Uses cube root for uniform distribution.
 */
export function randomInSphere(radius) {
  const theta = Math.random() * Math.PI * 2
  const phi   = Math.acos(2 * Math.random() - 1)
  const r     = radius * Math.cbrt(Math.random())
  return [
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi),
  ]
}

/**
 * Random point on the surface of a sphere shell
 * between rMin and rMax.
 */
export function randomInShell(rMin, rMax) {
  const theta = Math.random() * Math.PI * 2
  const phi   = Math.acos(2 * Math.random() - 1)
  const r     = rMin + Math.random() * (rMax - rMin)
  return [
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi),
  ]
}

/** Linear interpolation */
export function lerp(a, b, t) {
  return a + (b - a) * t
}

/** Clamp value between min and max */
export function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val))
}

/** Eased lerp (smoothstep) */
export function smoothstep(edge0, edge1, x) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

/**
 * Dispose Three.js object and its children recursively.
 * Call in useEffect cleanup to prevent memory leaks.
 */
export function disposeObject(obj) {
  if (!obj) return
  obj.traverse((child) => {
    if (child.geometry) child.geometry.dispose()
    if (child.material) {
      if (Array.isArray(child.material)) {
        child.material.forEach((m) => {
          if (m.map) m.map.dispose()
          m.dispose()
        })
      } else {
        if (child.material.map) child.material.map.dispose()
        child.material.dispose()
      }
    }
  })
}

/** Clear the texture cache (call on unmount of heavy scenes) */
export function clearTextureCache() {
  _cache.forEach((tex) => {
    if (tex && tex.dispose) tex.dispose()
  })
  _cache.clear()
}
