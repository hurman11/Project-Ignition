import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import { useEffect } from 'react'

export const SupraModel = (props) => {
  const { scene } = useGLTF('/models/supra.glb')
  const groupRef = useRef()
  const exhaustLightRef = useRef()
  const revTime = useRef(0)

  // Track scroll-based position
  const targetX = useRef(200) // Start off-screen right (drives in)
  const currentX = useRef(200)

  // Listen for engine rev interactive trigger
  useEffect(() => {
    const handleRev = () => {
      revTime.current = 1.5
    }
    window.addEventListener('engine-rev', handleRev)
    return () => window.removeEventListener('engine-rev', handleRev)
  }, [])

  // Traverse model and customize ground stand platform in Light Mode
  useEffect(() => {
    if (!scene) return

    const updateGroundVisibility = () => {
      try {
        const isLight = document.documentElement.classList.contains('light-mode')
        scene.traverse((child) => {
          if (child.isMesh && child.material) {
            const name = child.name ? child.name.toLowerCase() : ''
            const materials = Array.isArray(child.material) ? child.material : [child.material]
            const matName = materials.map(m => m?.name ? m.name.toLowerCase() : '').join(' ')

            let isFlatGround = false
            if (child.geometry) {
              child.geometry.computeBoundingBox()
              const bbox = child.geometry.boundingBox
              if (bbox) {
                const sizeY = bbox.max.y - bbox.min.y
                const sizeX = bbox.max.x - bbox.min.x
                const sizeZ = bbox.max.z - bbox.min.z
                if (sizeY < 0.5 && (sizeX > 1.5 || sizeZ > 1.5)) {
                  isFlatGround = true
                }
              }
            }

            const isGroundMesh =
              isFlatGround ||
              name.includes('plane') ||
              name.includes('ground') ||
              name.includes('floor') ||
              name.includes('stand') ||
              name.includes('base') ||
              name.includes('cube') ||
              name.includes('platform') ||
              name.includes('box') ||
              name.includes('shadow') ||
              name.includes('track') ||
              matName.includes('black') ||
              matName.includes('ground') ||
              matName.includes('floor')

            if (isGroundMesh) {
              child.visible = true
              if (!child.userData.origMaterial) {
                child.userData.origMaterial = child.material
              }
              if (isLight) {
                if (!child.userData.lightMaterial) {
                  child.userData.lightMaterial = new THREE.MeshStandardMaterial({
                    color: new THREE.Color('#ffffff'), // Crisp white podium
                    roughness: 0.2,
                    metalness: 0.1,
                  })
                }
                child.material = child.userData.lightMaterial
              } else {
                child.material = child.userData.origMaterial
              }
            }
          }
        })
      } catch (err) {
        console.warn("Ground visibility error:", err)
      }
    }

    updateGroundVisibility()

    const observer = new MutationObserver(updateGroundVisibility)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [scene])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    // Calculate scroll progress
    const scrollY = window.scrollY
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1)

    // Keep car centered and visible across all sections
    if (progress < 0.1) {
      const localProgress = progress / 0.1
      targetX.current = THREE.MathUtils.lerp(40, 0, localProgress)
    } else {
      targetX.current = 0
    }

    // Smooth damping for the X offset
    currentX.current += (targetX.current - currentX.current) * 0.05

    // Apply as a relative offset (camera rig handles the main position)
    const isMobile = window.innerWidth < 768
    const xOffset = currentX.current * (isMobile ? 0.005 : 0.02)
    groupRef.current.position.x = xOffset

    // Handle interactive Engine Rev physical vibration & flame burst
    if (revTime.current > 0) {
      revTime.current -= delta
      const jitterY = (Math.random() - 0.5) * 0.08
      const jitterZ = (Math.random() - 0.5) * 0.05
      groupRef.current.position.y = (isMobile ? -0.5 : -1) + jitterY
      groupRef.current.position.z = jitterZ

      if (exhaustLightRef.current) {
        exhaustLightRef.current.intensity = 18 + Math.random() * 12
      }
    } else {
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, isMobile ? -0.5 : -1, 0.1)
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, 0, 0.1)

      // Exhaust glow intensity based on contact section
      if (exhaustLightRef.current) {
        const exhaustIntensity = progress > 0.85 ? 3 : 0
        exhaustLightRef.current.intensity = THREE.MathUtils.lerp(
          exhaustLightRef.current.intensity,
          exhaustIntensity,
          0.05
        )
      }
    }

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
  })

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const modelScale = isMobile ? 42 : 100

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <primitive object={scene} scale={modelScale} position={[0, isMobile ? -0.5 : -1, 0]} />

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
