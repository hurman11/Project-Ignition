import { useRef } from 'react'

const Lights = () => {
  return (
    <>
      {/* Dim ambient light for cinematic dark base */}
      <ambientLight intensity={0.1} color="#ffffff" />
      
      {/* Orange Key Light - represents the cinematic 'engine/neon' vibe */}
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={2.5} 
        color="#f97316" 
        castShadow
      />
      
      {/* Soft White Rim Light - to separate the car from the black background */}
      <spotLight
        position={[-5, 5, -5]}
        intensity={1.5}
        color="#ffffff"
        angle={0.5}
        penumbra={1}
      />
      
      {/* Subtle fill light */}
      <pointLight position={[0, -2, 5]} intensity={0.5} color="#f97316" />
    </>
  )
}

export default Lights
