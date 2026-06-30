import { useScroll, motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useLenis } from 'lenis/react'

const scenes = [
  { id: 'IGNITION', label: 'IGNITION', code: 'I' },
  { id: 'ORIGIN', label: 'ORIGIN', code: 'II' },
  { id: 'MACHINES', label: 'MACHINES', code: 'III' },
  { id: 'LAB', label: 'LAB', code: 'IV' },
  { id: 'CONTACT', label: 'CONTACT', code: 'V' }
]

const NavbarHUD = () => {
  const { scrollYProgress } = useScroll()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [theme, setTheme] = useState('dark')
  const lenis = useLenis()

  useEffect(() => {
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
      let index = 0
      if (latest > 0.1) index = 1
      if (latest > 0.35) index = 2
      if (latest > 0.6) index = 3
      if (latest > 0.85) index = 4
      setActiveIndex(index)
    })
  }, [scrollYProgress])

  const scrollToScene = (index) => {
    if (!lenis) return
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const targetProgress = index / (scenes.length - 1)
    const targetScrollY = targetProgress * maxScroll
    lenis.scrollTo(targetScrollY, { duration: 1.2, ease: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
  }

  const currentScene = scenes[activeIndex]
  // Expand full menu on first section (IGNITION) or when hovering
  const showMenu = activeIndex === 0 || isHovered

  return (
    <nav 
      className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto w-full max-w-[92vw] md:max-w-[820px] px-2 md:px-6 flex justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        layout
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="glass-navbar h-[44px] md:h-[48px] flex items-center justify-between md:justify-start gap-0 px-4 md:px-5 rounded-full shadow-2xl max-w-full"
      >
        {/* Brand Name */}
        <motion.span 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="font-black text-xs md:text-base tracking-tight cursor-pointer select-none shrink-0 uppercase whitespace-nowrap"
          style={{ color: 'var(--text-color)' }}
          onClick={() => scrollToScene(0)}
        >
          Hurman Ejaz
        </motion.span>

        {/* Active Section Tracker (Always visible divider badge) */}
        <div className="flex items-center gap-1.5 md:gap-2 ml-2 md:ml-3 pl-2 md:pl-3 border-l border-white/10 h-4 shrink-0">
          <span className="font-mono text-[9px] md:text-[10px] text-brand-orange shrink-0 font-bold">
            {currentScene.code}
          </span>
          <span className="font-mono text-[9px] md:text-[10px] tracking-wider shrink-0 uppercase opacity-60">
            {currentScene.label}
          </span>
        </div>

        {/* Collapsible Navigation Links (Visible on desktop / tablets) */}
        <AnimatePresence mode="popLayout">
          {showMenu && (
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="hidden sm:flex items-center gap-4 md:gap-8 ml-4 md:ml-8 shrink-0 overflow-hidden"
            >
              {scenes.map((scene, i) => {
                const isActive = i === activeIndex
                return (
                  <motion.button
                    key={scene.id}
                    onClick={() => scrollToScene(i)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 bg-none border-none cursor-pointer whitespace-nowrap ${
                      isActive 
                        ? 'text-brand-orange underline underline-offset-4 font-extrabold' 
                        : 'opacity-50 hover:opacity-100'
                    }`}
                    style={{ color: isActive ? 'var(--accent-color)' : 'var(--text-color)' }}
                  >
                    {scene.id}
                  </motion.button>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Theme Switcher Button */}
        <motion.button
          onClick={toggleTheme}
          whileHover={{ scale: 1.25, rotate: 20 }}
          whileTap={{ scale: 0.8, rotate: 180 }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
          className="ml-2 md:ml-6 p-1.5 rounded-full flex items-center justify-center bg-transparent border-none cursor-pointer shrink-0"
          style={{ color: 'var(--text-color)' }}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Moon size={15} className="text-brand-orange" />
          ) : (
            <Sun size={15} className="text-amber-500" />
          )}
        </motion.button>
      </motion.div>
    </nav>
  )
}

export default NavbarHUD


