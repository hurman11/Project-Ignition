import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const Cursor = () => {
  const cursorRef = useRef(null)
  const reticleRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)

  // Track mouse coordinates outside of React state
  const mouse = useRef({ x: -100, y: -100 }) // Start off-screen
  const delayedMouse = useRef({ x: -100, y: -100 })

  useEffect(() => {
    let animationFrameId

    const updateMousePosition = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    const animate = () => {
      // Outer reticle uses a very quick, tight lerp (0.4) so it's not floaty
      delayedMouse.current.x += (mouse.current.x - delayedMouse.current.x) * 0.4
      delayedMouse.current.y += (mouse.current.y - delayedMouse.current.y) * 0.4

      if (cursorRef.current) {
        // Center dot is instant, direct follow (no lag)
        cursorRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`
      }
      
      if (reticleRef.current) {
        // Reticle box is slightly delayed
        reticleRef.current.style.transform = `translate3d(${delayedMouse.current.x}px, ${delayedMouse.current.y}px, 0) translate(-50%, -50%)`
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    const handleMouseOver = (e) => {
      const target = e.target
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', handleMouseOver)
    animate()

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', handleMouseOver)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <>
      {/* Center Precision Dot (Direct Follow) */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-brand-orange z-[100] pointer-events-none mix-blend-difference rounded-full"
      />
      
      {/* Targeting Reticle Wrapper (Delayed Follow) */}
      <div
        ref={reticleRef}
        className="fixed top-0 left-0 z-[99] pointer-events-none mix-blend-difference flex items-center justify-center"
      >
        {/* Reticle Visuals & Hover Animations */}
        <motion.div
          className="relative w-8 h-8"
          animate={{
            scale: isHovering ? 0.6 : 1,
            rotate: isHovering ? 45 : 0,
            opacity: isHovering ? 1 : 0.6
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
            mass: 0.5
          }}
        >
          {/* HUD Corner Brackets */}
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-brand-orange" />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-brand-orange" />
          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-brand-orange" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-brand-orange" />
        </motion.div>
      </div>
    </>
  )
}

export default Cursor
