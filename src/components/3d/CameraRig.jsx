import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { cameraTimeline } from '../animations/timelineConfig'

const CameraRig = () => {
  const currentPosition = useRef(new THREE.Vector3(...cameraTimeline[0].position))
  const currentTarget = useRef(new THREE.Vector3(...cameraTimeline[0].target))
  
  // Temporary vectors to avoid garbage collection overhead in useFrame
  const targetPos = new THREE.Vector3()
  const targetLookAt = new THREE.Vector3()

  useFrame((state, delta) => {
    // 1. Calculate scroll progress (0 to 1)
    const scrollY = window.scrollY
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1)

    // 2. Find which segment of the timeline we're in
    let startIndex = 0
    let endIndex = 1

    for (let i = 0; i < cameraTimeline.length - 1; i++) {
      if (progress >= cameraTimeline[i].progress && progress <= cameraTimeline[i + 1].progress) {
        startIndex = i
        endIndex = i + 1
        break
      }
    }

    // 3. Calculate local progress within that segment
    const startObj = cameraTimeline[startIndex]
    const endObj = cameraTimeline[endIndex]
    
    let localProgress = 0
    if (endObj.progress > startObj.progress) {
      localProgress = (progress - startObj.progress) / (endObj.progress - startObj.progress)
    }

    // 4. Interpolate between start and end keyframes
    targetPos.lerpVectors(
      new THREE.Vector3(...startObj.position),
      new THREE.Vector3(...endObj.position),
      localProgress
    )

    targetLookAt.lerpVectors(
      new THREE.Vector3(...startObj.target),
      new THREE.Vector3(...endObj.target),
      localProgress
    )

    // 5. Smoothly damp current camera state towards the target state
    // We use delta to ensure consistent speed across frame rates
    const dampFactor = 1 - Math.exp(-delta * 4)
    currentPosition.current.lerp(targetPos, dampFactor)
    currentTarget.current.lerp(targetLookAt, dampFactor)

    // 6. Apply to camera
    state.camera.position.copy(currentPosition.current)
    state.camera.lookAt(currentTarget.current)
  })

  return null
}

export default CameraRig
