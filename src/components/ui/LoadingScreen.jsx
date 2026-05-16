import { useProgress } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const LoadingScreen = () => {
  const { progress, active } = useProgress()
  const [show, setShow] = useState(true)

  useEffect(() => {
    // Small delay to prevent immediate flash if cached
    if (!active && progress === 100) {
      setTimeout(() => setShow(false), 500)
    }
  }, [active, progress])

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black pointer-events-auto"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Decorative scanning line */}
          <motion.div 
            className="absolute left-0 w-full h-[1px] bg-brand-orange/30 shadow-[0_0_15px_#f97316]"
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />

          <div className="text-brand-orange font-black text-2xl tracking-[0.5em] mb-4 drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]">
            IGNITING
          </div>
          <div className="w-64 h-[2px] bg-white/10 relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-brand-orange transition-all duration-300 shadow-[0_0_10px_#f97316]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-gray-400 font-mono text-xs mt-4 tracking-widest flex items-center gap-2">
            <span className="text-brand-orange animate-pulse">●</span> 
            SYSTEM PREP: {Math.round(progress)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen
