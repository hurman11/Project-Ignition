import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SceneOverlay from './components/ui/SceneOverlay'
import SceneController from './components/3d/SceneController'
import NavbarHUD from './components/ui/NavbarHUD'
import ScrollProgressHUD from './components/ui/ScrollProgressHUD'
import Cursor from './components/ui/Cursor'
import LoadingScreen from './components/ui/LoadingScreen'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const containerRef = useRef(null)
  const wrapperRef = useRef(null)
  
  // Sync Lenis scroll with GSAP ScrollTrigger
  useLenis(ScrollTrigger.update)

  useEffect(() => {
    gsap.ticker.lagSmoothing(0)
    
    return () => {
      ScrollTrigger.killAll()
    }
  }, [])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const getScrollAmount = () => wrapperRef.current.scrollWidth - window.innerWidth

      gsap.to(wrapperRef.current, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          // Extremely snappy scrub (was 1, now 0.1)
          scrub: 0.1,
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Loading Screen moved outside Lenis to avoid transform stacking issues */}
      <LoadingScreen />
      
      {/* Increased lerp to 0.2 for much faster scrolling response */}
      <ReactLenis root options={{ lerp: 0.2, duration: 1.2, smoothTouch: false }}>
        <div className="relative w-full h-screen overflow-hidden text-white cursor-none" ref={containerRef}>
          <Cursor />
          <NavbarHUD />
          <ScrollProgressHUD />
          
          {/* The 3D Canvas will go here and remain fixed in the background */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <SceneController />
          </div>

          {/* The horizontally scrolling wrapper */}
          <div 
            ref={wrapperRef} 
            className="absolute top-0 left-0 h-full flex z-10 w-[400vw] will-change-transform"
          >
            <SceneOverlay />
          </div>
        </div>
      </ReactLenis>
    </>
  )
}

export default App
