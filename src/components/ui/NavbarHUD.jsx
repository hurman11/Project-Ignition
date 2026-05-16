import { useScroll, motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

const scenes = ['IGNITION', 'ORIGIN', 'MACHINES', 'CONTACT']

const NavbarHUD = () => {
  const { scrollYProgress } = useScroll()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [autoExpanded, setAutoExpanded] = useState(true)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    // Check initial theme
    if (document.documentElement.classList.contains('light-mode')) {
      setTheme('light')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.classList.toggle('light-mode', newTheme === 'light')
  }

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      let index = Math.floor(latest * 4)
      if (index >= 4) index = 3
      setActiveIndex(index)
    })
  }, [scrollYProgress])

  // Auto-expand the HUD when the active scene changes
  useEffect(() => {
    setAutoExpanded(true)
    const timer = setTimeout(() => {
      setAutoExpanded(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [activeIndex])

  const expanded = isHovered || autoExpanded

  return (
    <nav 
      className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        layout
        className="bg-black/80 backdrop-blur-xl px-4 md:px-10 py-3 md:py-4 rounded-full border overflow-hidden flex items-center justify-center min-h-[48px] md:min-h-[56px] shadow-[0_0_20px_rgba(0,0,0,0.8)]"
        animate={{
          borderColor: expanded ? "rgba(249, 115, 22, 0.4)" : "rgba(255, 255, 255, 0.05)",
          boxShadow: expanded 
            ? "0 0 30px rgba(249, 115, 22, 0.15), inset 0 0 15px rgba(249, 115, 22, 0.05)" 
            : "0 0 20px rgba(0,0,0,0.8), inset 0 0 0px rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {!expanded ? (
            <div className="flex items-center gap-4">
              <motion.span 
                key="name"
                className="font-black tracking-[0.2em] md:tracking-[0.3em] text-white/90 uppercase whitespace-nowrap text-[10px] md:text-xs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                Hurman Ejaz
              </motion.span>
            </div>
          ) : (
            <motion.div 
              key="menu"
              className="flex gap-4 md:gap-10 items-center"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { staggerChildren: 0.06, delayChildren: 0.1 }
                },
                exit: {
                  opacity: 0,
                  transition: { duration: 0.2 }
                }
              }}
            >
              {/* Scene Indicators */}
              <div className="flex gap-4 md:gap-10 items-center hidden sm:flex">
                {scenes.map((scene, i) => {
                  const isActive = i === activeIndex
                  return (
                    <motion.div 
                      key={scene} 
                      variants={{
                        hidden: { opacity: 0, x: -15, filter: 'blur(4px)' },
                        visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
                        exit: { opacity: 0, filter: 'blur(4px)' }
                      }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                      <span 
                        className={`font-mono text-[10px] md:text-xs tracking-[0.2em] transition-all duration-400 ${
                          isActive 
                            ? 'text-brand-orange drop-shadow-[0_0_12px_rgba(249,115,22,0.9)] font-bold' 
                            : 'text-white/40 hover:text-white drop-shadow-none'
                        }`}
                      >
                        {scene}
                      </span>
                    </motion.div>
                  )
                })}
              </div>

              {/* Theme Toggle Button */}
              <motion.button
                onClick={toggleTheme}
                className="relative w-8 h-8 rounded-full flex items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 hover:border-brand-orange/50 transition-colors ml-2 md:ml-4"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                variants={{
                  hidden: { opacity: 0, scale: 0.5 },
                  visible: { opacity: 1, scale: 1 },
                  exit: { opacity: 0, scale: 0.5 }
                }}
              >
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon size={14} className="text-brand-orange" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sun size={14} className="text-yellow-400" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  )
}

export default NavbarHUD
