'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, useGLTF, RoundedBox } from '@react-three/drei'

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} scale={1.4} />
}

function PlaceholderObject() {
  return (
    <group rotation={[0.2, 0.4, 0]}>
      <RoundedBox args={[2, 2, 0.4]} radius={0.06} smoothness={4}>
        <meshStandardMaterial color="#c9a961" metalness={1} roughness={0.25} />
      </RoundedBox>
      <mesh position={[0, 0, 0.22]}>
        <torusGeometry args={[0.5, 0.05, 16, 48]} />
        <meshStandardMaterial color="#1a1a1f" metalness={0.9} roughness={0.3} />
      </mesh>
    </group>
  )
}

export function ProductViewer({ modelUrl }: { modelUrl: string | null }) {
  return (
    <div className="h-[400px] w-full md:h-[520px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 6, 4]} intensity={1.6} color="#fff4d6" />
        <Suspense fallback={null}>
          {modelUrl ? <Model url={modelUrl} /> : <PlaceholderObject />}
          <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={8} blur={2.6} far={4} />
          <Environment preset="studio" />
        </Suspense>
        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          autoRotate
          autoRotateSpeed={0.8}
        />
      </Canvas>
    </div>
  )
}
