import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Cursor = () => {
  const [ripples, setRipples] = useState([])

  useEffect(() => {
    const handleClick = (e) => {
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY
      }

      setRipples((prev) => [...prev.slice(-4), newRipple]) // Keep last 5 ripples max
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  const removeRipple = (id) => {
    setRipples((prev) => prev.filter((r) => r.id !== id))
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ opacity: 1, scale: 0.1 }}
            animate={{ opacity: 0, scale: 2.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => removeRipple(ripple.id)}
            className="absolute rounded-full border-2 border-brand-orange bg-brand-orange/30 shadow-[0_0_30px_rgba(249,115,22,1),_inset_0_0_15px_rgba(249,115,22,0.8)] backdrop-blur-[1px]"
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
