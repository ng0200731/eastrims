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
        {/* Base plate */}
        <RoundedBox args={[3.2, 1.7, 0.16]} radius={0.08} smoothness={4}>
          <meshStandardMaterial color="#16161b" metalness={0.95} roughness={0.28} />
        </RoundedBox>
        {/* Gold accent plate */}
        <RoundedBox args={[2.8, 0.5, 0.18]} radius={0.05} smoothness={4} position={[0, 0, 0.02]}>
          <meshStandardMaterial
            color="#c9a961"
            metalness={1}
            roughness={0.2}
            emissive="#3a2e15"
            emissiveIntensity={0.35}
          />
        </RoundedBox>
        {/* Detail threads */}
        <mesh position={[0, 0.55, 0.09]}>
          <boxGeometry args={[2.2, 0.025, 0.012]} />
          <meshStandardMaterial color="#c9a961" metalness={1} roughness={0.25} />
        </mesh>
        <mesh position={[0, -0.55, 0.09]}>
          <boxGeometry args={[1.5, 0.025, 0.012]} />
          <meshStandardMaterial color="#8b7355" metalness={1} roughness={0.3} />
        </mesh>
      </Float>
    </group>
  )
}

export function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 42 }} dpr={[1, 2]} gl={{ antialias: true }}>
      <color attach="background" args={['#0a0a0b']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 6, 5]} intensity={2} color="#fff4d6" />
      <directionalLight position={[-5, -3, -2]} intensity={0.6} color="#8b7355" />
      <Suspense fallback={null}>
        <WovenLabel />
        <Sparkles count={70} scale={[9, 6, 4]} size={2.4} speed={0.3} color="#c9a961" opacity={0.5} />
        <Environment preset="studio" />
      </Suspense>
      <Bloom intensity={0.5} luminanceThreshold={0.55} mipmapBlur luminanceSmoothing={0.2} />
    </Canvas>
  )
}
