import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect, useRef, useLayoutEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
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
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })
  
  // Sync Lenis scroll with GSAP ScrollTrigger
  useLenis(ScrollTrigger.update)

  useEffect(() => {
    gsap.ticker.lagSmoothing(0)
    
    return () => {
      ScrollTrigger.killAll()
    }
  }, [])

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add("(min-width: 768px)", () => {
      const getScrollAmount = () => wrapperRef.current.scrollWidth - window.innerWidth

      gsap.to(wrapperRef.current, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 0.1,
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
          snap: {
            snapTo: (value) => Math.round(value * 4) / 4,
            duration: { min: 0.2, max: 0.5 },
            delay: 0.1,
            ease: 'power2.inOut'
          }
        },
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <>
      <LoadingScreen />
      
      <ReactLenis root options={{ lerp: 0.2, duration: 1.2, smoothTouch: false }}>
        <Cursor />
        <NavbarHUD />
        <ScrollProgressHUD />

        {/* Bottom Progress Bar */}
        <motion.div 
          className="fixed bottom-0 left-0 right-0 h-1 z-[100] origin-left bg-gradient-to-r from-brand-orange to-amber-500 shadow-[0_0_12px_rgba(249,115,22,0.8)]"
          style={{ scaleX }}
        />
        
        {/* 3D Canvas fixed in background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <SceneController />
        </div>

        {/* Scrolling container */}
        <div className="relative w-full h-auto md:h-screen overflow-x-hidden min-h-screen" ref={containerRef} style={{ color: 'var(--text-color)' }}>
          <div 
            ref={wrapperRef} 
            className="w-full md:w-[500vw] flex flex-col md:flex-row z-10 relative md:absolute top-0 left-0 will-change-transform min-h-screen"
          >
            <SceneOverlay />
          </div>
        </div>
      </ReactLenis>
    </>
  )
}

export default App

