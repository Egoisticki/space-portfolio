// src/components/three/AsteroidBelt.jsx
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Asteroid({ position, scale, rotSpeed, driftSpeed, phase }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    meshRef.current.rotation.x += rotSpeed.x
    meshRef.current.rotation.y += rotSpeed.y
    meshRef.current.rotation.z += rotSpeed.z
    // Gentle drift in a slow ellipse
    meshRef.current.position.x = position[0] + Math.sin(t * driftSpeed + phase) * 0.4
    meshRef.current.position.y = position[1] + Math.cos(t * driftSpeed * 0.7 + phase) * 0.25
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={new THREE.Color('#1a1040')}
        roughness={0.9}
        metalness={0.3}
        emissive={new THREE.Color('#2a0080')}
        emissiveIntensity={0.05}
      />
    </mesh>
  )
}

export default function AsteroidBelt({ count = 28 }) {
  const asteroids = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      // Spread across a wide horizontal band
      const angle = (i / count) * Math.PI * 2
      const radius = 12 + Math.random() * 8
      return {
        id: i,
        position: [
          Math.cos(angle) * radius + (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4,
          Math.sin(angle) * radius * 0.4 - 18,
        ],
        scale: [
          0.08 + Math.random() * 0.28,
          0.08 + Math.random() * 0.28,
          0.08 + Math.random() * 0.28,
        ],
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.012,
          y: (Math.random() - 0.5) * 0.015,
          z: (Math.random() - 0.5) * 0.008,
        },
        driftSpeed: 0.08 + Math.random() * 0.12,
        phase: Math.random() * Math.PI * 2,
      }
    })
  }, [count])

  return (
    <group>
      <ambientLight intensity={0.08} />
      <pointLight position={[0, 5, -10]} color="#7b2fff" intensity={4} />
      <pointLight position={[8, -3, -15]} color="#00f5ff" intensity={2} />
      <pointLight position={[-8, 2, -12]} color="#a855f7" intensity={1.5} />

      {asteroids.map((a) => (
        <Asteroid
          key={a.id}
          position={a.position}
          scale={a.scale}
          rotSpeed={a.rotSpeed}
          driftSpeed={a.driftSpeed}
          phase={a.phase}
        />
      ))}
    </group>
  )
}
