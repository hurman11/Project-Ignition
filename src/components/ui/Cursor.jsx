import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

const Cursor = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [ripples, setRipples] = useState([])
  
  // Motion values for the cursor position
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  // Spring configuration for snappier, instant feeling
  const springConfig = { damping: 30, stiffness: 800, mass: 0.1 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    
    const handleMouseOver = (e) => {
      // Check if hovering over clickable elements
      const isClickable = e.target.closest('a, button, [role="button"], input, select, textarea, .magnetic')
      setIsHovered(!!isClickable)
    }

    const handleClick = (e) => {
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY
      }
      setRipples((prev) => [...prev.slice(-4), newRipple])
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('click', handleClick)
    
    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('click', handleClick)
    }
  }, [cursorX, cursorY])

  const removeRipple = (id) => {
    setRipples((prev) => prev.filter((r) => r.id !== id))
  }

  // Determine size based on hover state
  const size = isHovered ? 48 : 16

  return (
    <div className="fixed inset-0 pointer-events-none z-[10000] overflow-hidden hidden md:block">
      {/* Trailing Cursor Dot */}
      <motion.div
        className="absolute rounded-full border border-brand-orange bg-brand-orange/20 shadow-[0_0_15px_rgba(249,115,22,0.5)] backdrop-blur-[2px]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: size,
          height: size,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: size,
          height: size,
          backgroundColor: isHovered ? 'rgba(249,115,22,0.1)' : 'rgba(249,115,22,0.4)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      
      {/* Click Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ opacity: 1, scale: 0.1 }}
            animate={{ opacity: 0, scale: 2.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => removeRipple(ripple.id)}
            className="absolute rounded-full border-2 border-brand-orange bg-brand-orange/30 shadow-[0_0_30px_rgba(249,115,22,1),_inset_0_0_15px_rgba(249,115,22,0.8)]"
            style={{
              left: ripple.x - 25,
              top: ripple.y - 25,
              width: 50,
              height: 50,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default Cursor
