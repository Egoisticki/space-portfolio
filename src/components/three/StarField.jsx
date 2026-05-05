import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { createStarTexture } from '../../utils/three-helpers'

export default function StarField({ count = 8000 }) {
  const pointsRef = useRef()
  const { mouse } = useThree()
  const mouseTarget = useRef({ x: 0, y: 0 })

  const { positions, sizes, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const colors = new Float32Array(count * 3)

    const colorPalette = [
      new THREE.Color('#e8f4ff'),
      new THREE.Color('#c8d8f0'),
      new THREE.Color('#7ba7d0'),
      new THREE.Color('#00f5ff'),
      new THREE.Color('#a855f7'),
      new THREE.Color('#ff9a3c'),
    ]

    for (let i = 0; i < count; i++) {
      // Distribute stars in a large sphere shell
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      // Spread between r=30 and r=200
      const r = 30 + Math.random() * 170

      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      sizes[i] = Math.random() * 2.5 + 0.3

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      colors[i * 3]     = col.r
      colors[i * 3 + 1] = col.g
      colors[i * 3 + 2] = col.b
    }

    return { positions, sizes, colors }
  }, [count])

  const texture = useMemo(() => createStarTexture(), [])

  useFrame((state, delta) => {
    if (!pointsRef.current) return

    // Smooth mouse parallax
    mouseTarget.current.x += (mouse.x * 0.5 - mouseTarget.current.x) * 0.03
    mouseTarget.current.y += (mouse.y * 0.5 - mouseTarget.current.y) * 0.03

    pointsRef.current.rotation.y += delta * 0.004
    pointsRef.current.rotation.x = mouseTarget.current.y * 0.08
    pointsRef.current.rotation.z = mouseTarget.current.x * 0.05
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.35}
        sizeAttenuation
        vertexColors
        transparent
        alphaMap={texture}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
