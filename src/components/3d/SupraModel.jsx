import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const SupraModel = (props) => {
  const { scene } = useGLTF('/models/supra.glb')
  const groupRef = useRef()
  const exhaustLightRef = useRef()
  
  // Track scroll-based position
  const targetX = useRef(200) // Start off-screen right (drives in)
  const currentX = useRef(200)

  useFrame((state) => {
    if (!groupRef.current) return
    
    // Calculate scroll progress
    const scrollY = window.scrollY
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1)
    
    // Hero scene (0 - 0.15): Car drives in from right to center
    if (progress < 0.15) {
      // Map 0-0.15 to 200 -> 0 (drive in)
      const localProgress = progress / 0.15
      targetX.current = THREE.MathUtils.lerp(200, 0, Math.min(localProgress * 2, 1))
    }
    // Transition to Origin (0.15 - 0.35): Car stays mostly centered
    else if (progress < 0.35) {
      targetX.current = 0
    }
    // Past hero, into machines (0.35 - 0.5): Car accelerates out to left
    else if (progress < 0.5) {
      const localProgress = (progress - 0.35) / 0.15
      targetX.current = THREE.MathUtils.lerp(0, -300, localProgress)
    }
    // Contact section (0.85+): Car shows rear, stays put
    else if (progress > 0.85) {
      targetX.current = 0
    }
    else {
      targetX.current = -300
    }
    
    // Smooth damping for the X offset
    currentX.current += (targetX.current - currentX.current) * 0.05
    
    // Apply as a relative offset (camera rig handles the main position)
    // Only apply subtle x translation scaled to Three.js units
    const xOffset = currentX.current * 0.02 // Scale down pixels to 3D units
    groupRef.current.position.x = xOffset
    
    // Add slight motion blur feel when moving fast
    const speed = Math.abs(targetX.current - currentX.current)
    if (speed > 10) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        (targetX.current > currentX.current ? 0.05 : -0.05),
        0.03
      )
    } else {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.02)
    }
    
    // Exhaust glow intensity based on contact section
    if (exhaustLightRef.current) {
      const exhaustIntensity = progress > 0.85 ? 3 : 0
      exhaustLightRef.current.intensity = THREE.MathUtils.lerp(
        exhaustLightRef.current.intensity,
        exhaustIntensity,
        0.05
      )
    }
  })

  return (
    <group ref={groupRef} {...props} dispose={null}>
      {/* 
        The model is rendering extremely small due to scale export differences. 
        Scaling it up by 100x to match Three.js meter units.
      */}
      <primitive object={scene} scale={100} position={[0, -1, 0]} />
      
      {/* Exhaust glow - orange point light under rear */}
      <pointLight
        ref={exhaustLightRef}
        position={[-2, -0.5, 0]}
        color="#FF6B00"
        intensity={0}
        distance={4}
        decay={2}
      />
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
