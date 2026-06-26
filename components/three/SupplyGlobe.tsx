'use client'

import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Line } from '@react-three/drei'
import * as THREE from 'three'

type Vec3 = [number, number, number]

const LOCATIONS: { name: string; lat: number; lon: number }[] = [
  { name: 'China', lat: 35, lon: 105 },
  { name: 'Vietnam', lat: 16, lon: 106 },
  { name: 'Bangladesh', lat: 24, lon: 90 },
  { name: 'Indonesia', lat: -2, lon: 118 },
  { name: 'Turkey', lat: 39, lon: 35 },
  { name: 'USA', lat: 38, lon: -97 },
  { name: 'Europe', lat: 50, lon: 10 },
]

// A few shipping routes (origin index → destination index)
const ROUTES: [number, number][] = [
  [0, 5],
  [0, 6],
  [3, 5],
  [4, 6],
  [1, 5],
]

const RADIUS = 1.6

function latLonToVec3(lat: number, lon: number, r: number): Vec3 {
  const phi = ((90 - lat) * Math.PI) / 180
  const theta = ((lon + 180) * Math.PI) / 180
  return [
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  ]
}

function arcPoints(a: Vec3, b: Vec3, r: number, segments = 28): Vec3[] {
  const mid: Vec3 = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2]
  const midLen = Math.hypot(mid[0], mid[1], mid[2]) || 1
  const ctrl: Vec3 = [mid[0] * ((r * 1.8) / midLen), mid[1] * ((r * 1.8) / midLen), mid[2] * ((r * 1.8) / midLen)]
  const pts: Vec3[] = []
  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    pts.push([
      (1 - t) * (1 - t) * a[0] + 2 * (1 - t) * t * ctrl[0] + t * t * b[0],
      (1 - t) * (1 - t) * a[1] + 2 * (1 - t) * t * ctrl[1] + t * t * b[1],
      (1 - t) * (1 - t) * a[2] + 2 * (1 - t) * t * ctrl[2] + t * t * b[2],
    ])
  }
  return pts
}

function Globe() {
  const group = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.12
  })

  const positions = useMemo(() => LOCATIONS.map((l) => latLonToVec3(l.lat, l.lon, RADIUS)), [])
  const arcs = useMemo(
    () => ROUTES.map(([from, to]) => arcPoints(positions[from], positions[to], RADIUS)),
    [positions]
  )

  return (
    <group ref={group}>
      {/* Globe core */}
      <mesh>
        <sphereGeometry args={[RADIUS, 48, 48]} />
        <meshStandardMaterial color="#0d1117" metalness={0.4} roughness={0.7} />
      </mesh>
      {/* Wireframe grid */}
      <mesh>
        <sphereGeometry args={[RADIUS + 0.005, 24, 16]} />
        <meshBasicMaterial color="#c9a961" wireframe transparent opacity={0.18} />
      </mesh>

      {/* Pins */}
      {positions.map((p, i) => (
        <mesh key={LOCATIONS[i].name} position={p}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshStandardMaterial color="#c9a961" emissive="#c9a961" emissiveIntensity={1.4} />
        </mesh>
      ))}

      {/* Shipping arcs */}
      {arcs.map((pts, i) => (
        <Line key={i} points={pts} color="#c9a961" lineWidth={1} transparent opacity={0.55} />
      ))}
    </group>
  )
}

export function SupplyGlobe() {
  return (
    <Canvas camera={{ position: [0, 1.5, 5], fov: 42 }} dpr={[1, 2]}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 3, 5]} intensity={1.4} />
      <Suspense fallback={null}>
        <Globe />
      </Suspense>
      <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={0.8} maxPolarAngle={2.2} />
    </Canvas>
  )
}
