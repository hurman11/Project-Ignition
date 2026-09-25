import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'

const count = 120
const positions = []
for (let i = 0; i < count; i++) {
  positions.push([
    (Math.random() - 0.5) * 15,
    (Math.random() * 8) + 2, // Spawn above
    (Math.random() - 0.5) * 2 // Keep near Z=0 so mouse can hit them
  ])
}

export const PhysicsParticles = () => {
  const pointerRef = useRef(null)

  // Move the kinematic pointer body to the mouse intersection
  useFrame(({ pointer, camera }) => {
    if (pointerRef.current) {
      // Convert normalized screen coords to world coords at z=0 plane
      const vec = new THREE.Vector3(pointer.x, pointer.y, 0.5)
      vec.unproject(camera)
      const dir = vec.sub(camera.position).normalize()
      const distance = -camera.position.z / dir.z
      const pos = camera.position.clone().add(dir.multiplyScalar(distance))
      
      // Update kinematic rigid body position
      pointerRef.current.setNextKinematicTranslation({
        x: pos.x,
        y: pos.y,
        z: 0 // Keep the pointer interaction on the main plane
      })
    }
  })

  return (
    <>
      {/* The invisible mouse pointer that pushes particles */}
      <RigidBody
        ref={pointerRef}
        type="kinematicPosition"
        colliders="ball"
        restitution={1.2}
      >
        <mesh visible={false}>
          <sphereGeometry args={[2.5, 16, 16]} />
          <meshBasicMaterial />
        </mesh>
      </RigidBody>

      {/* Invisible walls to keep particles in view */}
      <RigidBody type="fixed" position={[0, -5, 0]}>
        <mesh visible={false}>
          <boxGeometry args={[20, 1, 20]} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" position={[0, 8, 0]}>
        <mesh visible={false}>
          <boxGeometry args={[20, 1, 20]} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" position={[-10, 0, 0]}>
        <mesh visible={false}>
          <boxGeometry args={[1, 20, 20]} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" position={[10, 0, 0]}>
        <mesh visible={false}>
          <boxGeometry args={[1, 20, 20]} />
        </mesh>
      </RigidBody>

      {/* The glowing embers (particles) */}
      {positions.map((pos, i) => (
        <RigidBody
          key={i}
          position={pos}
          colliders="ball"
          restitution={0.8}
          friction={0.2}
          linearDamping={0.5}
          angularDamping={0.5}
          gravityScale={0.05}
        >
          <mesh>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial 
              color="#f97316" 
              emissive="#f97316" 
              emissiveIntensity={2} 
              toneMapped={false} 
            />
          </mesh>
        </RigidBody>
      ))}
    </>
  )
}
