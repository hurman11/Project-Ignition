import { useScroll, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useLenis } from 'lenis/react'

const scenes = ['IGNITION', 'ORIGIN', 'MACHINES', 'CONTACT']

const ScrollProgressHUD = () => {
  const { scrollYProgress } = useScroll()
  const [activeIndex, setActiveIndex] = useState(0)
  const lenis = useLenis()

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      // The scroll timeline is divided into 3 equal transition segments for 4 scenes
      let index = 0
      if (latest > 0.15) index = 1
      if (latest > 0.5) index = 2
      if (latest > 0.85) index = 3
      setActiveIndex(index)
    })
  }, [scrollYProgress])

  const handleDotClick = (index) => {
    if (!lenis) return
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    // 4 scenes = 3 transition intervals (0, 0.33, 0.66, 1)
    const targetProgress = index / (scenes.length - 1)
    const targetScrollY = targetProgress * maxScroll
    
    lenis.scrollTo(targetScrollY, { duration: 1.5, ease: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
  }

  return (
    <div className="fixed right-2 md:right-8 top-1/2 -translate-y-1/2 z-50 pointer-events-auto flex flex-col items-center gap-4 md:gap-6 bg-black/40 backdrop-blur-md px-2 md:px-3 py-4 md:py-6 rounded-full border border-white/5">
      {scenes.map((scene, i) => {
        const isActive = i === activeIndex
        const isPassed = i < activeIndex
        
        return (
          <div 
            key={scene} 
            className="relative group cursor-pointer flex justify-center items-center h-4 w-4"
            onClick={() => handleDotClick(i)}
            onMouseEnter={() => {}} // Optional hover sounds or states
          >
            {/* Tooltip on hover */}
            <motion.div 
              className="absolute right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-[10px] tracking-[0.2em] uppercase whitespace-nowrap bg-black/80 px-3 py-1 rounded border border-white/10 text-white pointer-events-none"
            >
              {scene}
            </motion.div>
            
            {/* Outer pulse rings for active dot */}
            {isActive && (
              <>
                <motion.div
                  className="absolute rounded-full"
                  animate={{
                    width: [16, 22, 16],
                    height: [16, 22, 16],
                    opacity: [0.2, 0.1, 0.2],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    border: '1px solid rgba(255, 107, 0, 0.3)',
                  }}
                />
                <motion.div
                  className="absolute rounded-full"
                  animate={{
                    width: [20, 28, 20],
                    height: [20, 28, 20],
                    opacity: [0.1, 0.05, 0.1],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                  style={{
                    border: '1px solid rgba(255, 107, 0, 0.15)',
                  }}
                />
              </>
            )}

            {/* Dot Graphic */}
            <motion.div 
              className="rounded-full relative z-10"
              animate={{
                width: isActive ? 10 : 6,
                height: isActive ? 10 : 6,
                backgroundColor: isActive 
                  ? '#FF6B00' 
                  : isPassed 
                    ? 'rgba(255, 107, 0, 0.3)' 
                    : 'rgba(255, 255, 255, 0.2)',
                boxShadow: isActive 
                  ? '0 0 10px rgba(255, 107, 0, 0.6), 0 0 3px rgba(255, 107, 0, 0.4)' 
                  : '0 0 0px rgba(0,0,0,0)'
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        )
      })}
    </div>
  )
}

export default ScrollProgressHUD
