import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function createNebulaSprite(color1, color2) {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')

  const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
  gradient.addColorStop(0, color1)
  gradient.addColorStop(0.5, color2)
  gradient.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 256, 256)

  return new THREE.CanvasTexture(canvas)
}

export default function NebulaBackground() {
  const nebulae = useRef([])

  const configs = useMemo(() => [
    {
      tex: createNebulaSprite('rgba(123, 47, 255, 0.35)', 'rgba(50, 0, 150, 0.08)'),
      position: [-8, 3, -15],
      scale: [18, 18, 1],
      speed: 0.0003,
      phase: 0,
    },
    {
      tex: createNebulaSprite('rgba(0, 245, 255, 0.2)', 'rgba(0, 100, 200, 0.06)'),
      position: [6, -2, -12],
      scale: [14, 14, 1],
      speed: 0.0002,
      phase: 2.1,
    },
    {
      tex: createNebulaSprite('rgba(168, 85, 247, 0.25)', 'rgba(80, 0, 200, 0.06)'),
      position: [0, 5, -20],
      scale: [22, 22, 1],
      speed: 0.00015,
      phase: 4.2,
    },
    {
      tex: createNebulaSprite('rgba(255, 100, 50, 0.12)', 'rgba(150, 50, 0, 0.04)'),
      position: [10, -5, -18],
      scale: [16, 16, 1],
      speed: 0.00025,
      phase: 1.0,
    },
  ], [])

  useFrame((state) => {
    nebulae.current.forEach((mesh, i) => {
      if (!mesh) return
      const cfg = configs[i]
      const t = state.clock.elapsedTime
      mesh.position.x = configs[i].position[0] + Math.sin(t * cfg.speed * 100 + cfg.phase) * 1.5
      mesh.position.y = configs[i].position[1] + Math.cos(t * cfg.speed * 80 + cfg.phase) * 1.0
      mesh.material.opacity = 0.6 + Math.sin(t * 0.3 + cfg.phase) * 0.2
    })
  })

  return (
    <group>
      {configs.map((cfg, i) => (
        <mesh
          key={i}
          ref={(el) => (nebulae.current[i] = el)}
          position={cfg.position}
          scale={cfg.scale}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={cfg.tex}
            transparent
            opacity={0.7}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}
