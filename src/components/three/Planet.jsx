import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function createPlanetTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  // Base deep violet-blue
  const bg = ctx.createLinearGradient(0, 0, 512, 512)
  bg.addColorStop(0, '#0d0230')
  bg.addColorStop(0.4, '#1a0550')
  bg.addColorStop(0.7, '#120340')
  bg.addColorStop(1, '#08011f')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, 512, 512)

  // Swirling cloud bands
  for (let i = 0; i < 12; i++) {
    const y = (i / 12) * 512
    const gradient = ctx.createLinearGradient(0, y, 512, y + 40)
    const alpha = Math.random() * 0.15 + 0.05
    gradient.addColorStop(0, `rgba(123, 47, 255, ${alpha})`)
    gradient.addColorStop(0.5, `rgba(0, 100, 200, ${alpha * 1.5})`)
    gradient.addColorStop(1, `rgba(50, 0, 150, ${alpha})`)
    ctx.fillStyle = gradient
    ctx.fillRect(0, y - 10, 512, 50)
  }

  // Storm spots
  for (let i = 0; i < 5; i++) {
    const x = Math.random() * 512
    const y = Math.random() * 512
    const r = Math.random() * 30 + 10
    const spot = ctx.createRadialGradient(x, y, 0, x, y, r)
    spot.addColorStop(0, 'rgba(168, 85, 247, 0.4)')
    spot.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = spot
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  return new THREE.CanvasTexture(canvas)
}

function createRingTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 64
  const ctx = canvas.getContext('2d')

  const gradient = ctx.createLinearGradient(0, 0, 512, 0)
  gradient.addColorStop(0, 'rgba(0, 245, 255, 0)')
  gradient.addColorStop(0.1, 'rgba(0, 245, 255, 0.15)')
  gradient.addColorStop(0.3, 'rgba(123, 47, 255, 0.25)')
  gradient.addColorStop(0.5, 'rgba(200, 180, 255, 0.3)')
  gradient.addColorStop(0.7, 'rgba(123, 47, 255, 0.2)')
  gradient.addColorStop(0.9, 'rgba(0, 245, 255, 0.1)')
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 512, 64)

  return new THREE.CanvasTexture(canvas)
}

export default function Planet({ position = [0, 0, 0] }) {
  const planetRef = useRef()
  const ringRef = useRef()
  const atmosphereRef = useRef()
  const glowRef = useRef()

  const planetTexture = useMemo(() => createPlanetTexture(), [])
  const ringTexture = useMemo(() => createRingTexture(), [])

  useFrame((state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.06
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.008
    }
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.12 + Math.sin(state.clock.elapsedTime * 0.5) * 0.03
    }
  })

  return (
    <group position={position}>
      {/* Main planet */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={planetTexture}
          roughness={0.7}
          metalness={0.1}
          emissiveMap={planetTexture}
          emissive={new THREE.Color('#2a0080')}
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Atmosphere glow — slightly bigger sphere */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[2.08, 32, 32]} />
        <meshBasicMaterial
          color={new THREE.Color('#4400cc')}
          transparent
          opacity={0.08}
          side={THREE.FrontSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.4, 32, 32]} />
        <meshBasicMaterial
          color={new THREE.Color('#00f5ff')}
          transparent
          opacity={0.04}
          side={THREE.BackSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Ring */}
      <mesh
        ref={ringRef}
        rotation={[Math.PI * 0.42, 0.2, 0.1]}
      >
        <ringGeometry args={[2.8, 4.2, 128]} />
        <meshBasicMaterial
          map={ringTexture}
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Inner ring glow */}
      <mesh rotation={[Math.PI * 0.42, 0.2, 0.1]}>
        <ringGeometry args={[2.75, 4.3, 128]} />
        <meshBasicMaterial
          color={new THREE.Color('#7b2fff')}
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}
