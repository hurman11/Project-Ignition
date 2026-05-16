import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'

export const SupraModel = (props) => {
  const { scene } = useGLTF('/models/supra.glb')
  const groupRef = useRef()

  return (
    <group ref={groupRef} {...props} dispose={null}>
      {/* 
        The model is rendering extremely small due to scale export differences. 
        Scaling it up by 100x to match Three.js meter units.
      */}
      <primitive object={scene} scale={100} position={[0, -1, 0]} />
    </group>
  )
}

// Preload the model to avoid pop-in
useGLTF.preload('/models/supra.glb')

export const SupraFallback = (props) => {
  return (
    <group {...props}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 1.2, 1.8]} />
        <meshStandardMaterial color="#f97316" wireframe />
      </mesh>
      {/* Wheels fallback */}
      <mesh position={[-1.2, -0.6, 1]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshStandardMaterial color="#ffffff" wireframe />
      </mesh>
      <mesh position={[1.2, -0.6, 1]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshStandardMaterial color="#ffffff" wireframe />
      </mesh>
    </group>
  )
}
