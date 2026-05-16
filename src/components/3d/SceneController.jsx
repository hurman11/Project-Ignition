import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import Lights from './Lights'
import { SupraModel, SupraFallback } from './SupraModel'
import LoadingScreen from '../ui/LoadingScreen'
import ErrorBoundary from '../ui/ErrorBoundary'
import CameraRig from './CameraRig'

const SceneController = () => {
  return (
    <Canvas
      camera={{ position: [-4, 0.5, 5], fov: 45 }}
      dpr={[1, 1.2]} // Capped at 1.2 for performance
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
    >
      {/* 
        Removed hardcoded <color attach="background" /> 
        so the Canvas is transparent and shows the CSS background.
      */}
      <fog attach="fog" args={['#220d00', 8, 30]} />
      
      <CameraRig />
      <Lights />
      
      <Suspense fallback={null}>
        {/* Reduced particle count from 800 to 150 for massive GPU savings */}
        <Sparkles count={150} scale={20} size={1.5} speed={0.2} opacity={0.2} color="#f97316" />
        <ErrorBoundary fallback={<SupraFallback />}>
          <SupraModel />
        </ErrorBoundary>
        
        {/* Disabled multisampling for mipmap bloom performance */}
        <EffectComposer multisampling={0} disableNormalPass>
          <Bloom 
            luminanceThreshold={0.2} 
            luminanceSmoothing={0.9} 
            intensity={1.2} 
            mipmapBlur 
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}

export default SceneController
