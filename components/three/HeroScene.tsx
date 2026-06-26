'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, RoundedBox, Sparkles } from '@react-three/drei'
import { Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

function WovenLabel() {
  const group = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!group.current) return
    const { x, y } = state.pointer
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.5, 0.04)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y * 0.35, 0.04)
  })

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.5}>
        {/* Light metallic base plate (reads clean on white) */}
        <RoundedBox args={[3.2, 1.7, 0.16]} radius={0.08} smoothness={4}>
          <meshStandardMaterial color="#e9e9ec" metalness={0.6} roughness={0.35} />
        </RoundedBox>
        {/* Gold accent plate */}
        <RoundedBox args={[2.8, 0.5, 0.18]} radius={0.05} smoothness={4} position={[0, 0, 0.02]}>
          <meshStandardMaterial
            color="#c9a961"
            metalness={1}
            roughness={0.22}
            emissive="#9a7b3f"
            emissiveIntensity={0.12}
          />
        </RoundedBox>
        {/* Detail threads */}
        <mesh position={[0, 0.55, 0.09]}>
          <boxGeometry args={[2.2, 0.025, 0.012]} />
          <meshStandardMaterial color="#9a7b3f" metalness={1} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.55, 0.09]}>
          <boxGeometry args={[1.5, 0.025, 0.012]} />
          <meshStandardMaterial color="#7c5e2e" metalness={1} roughness={0.3} />
        </mesh>
      </Float>
    </group>
  )
}

export function HeroScene() {
  // Transparent canvas so the page background shows through (minimal).
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 42 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 6, 5]} intensity={1.4} color="#fff8ec" />
      <directionalLight position={[-5, -3, -2]} intensity={0.4} color="#c9a961" />
      <Suspense fallback={null}>
        <WovenLabel />
        <Sparkles count={70} scale={[9, 6, 4]} size={2.4} speed={0.3} color="#c9a961" opacity={0.6} />
        <Environment preset="studio" />
      </Suspense>
      <Bloom intensity={0.15} luminanceThreshold={0.85} mipmapBlur luminanceSmoothing={0.2} />
    </Canvas>
  )
}
