import { useScroll, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useLenis } from 'lenis/react'

const chapters = [
  { id: 'IGNITION', title: 'I — IGNITION' },
  { id: 'ORIGIN', title: 'II — ORIGIN' },
  { id: 'MACHINES', title: 'III — MACHINES' },
  { id: 'LAB', title: 'IV — LAB' },
  { id: 'CONTACT', title: 'V — CONTACT' }
]

const ScrollProgressHUD = () => {
  const { scrollYProgress } = useScroll()
  const [activeIndex, setActiveIndex] = useState(0)
  const lenis = useLenis()

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

  const handleChapterClick = (index) => {
    if (!lenis) return
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const targetProgress = index / (chapters.length - 1)
    const targetScrollY = targetProgress * maxScroll
    
    lenis.scrollTo(targetScrollY, { duration: 1.2, ease: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
  }

  return (
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 pointer-events-auto flex flex-col gap-3" aria-label="Chapter navigation">
      {chapters.map((ch, i) => {
        const isActive = i === activeIndex
        
        return (
          <div 
            key={ch.id} 
            className="relative group flex items-center justify-end cursor-pointer"
            onClick={() => handleChapterClick(i)}
          >
            {/* Hover tooltip label matching esfyq */}
            <span className="absolute right-6 whitespace-nowrap text-[0.65rem] tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none pr-2 font-mono uppercase text-brand-orange font-bold">
              {ch.title}
            </span>

            <button className="relative flex items-center justify-center p-2 -mr-2 bg-transparent border-none cursor-pointer">
              <div 
                className={`transition-all duration-400 ease-out rounded-full ${
                  isActive 
                    ? 'w-[4px] h-6 bg-brand-orange opacity-100 shadow-[0_0_10px_rgba(249,115,22,0.8)]' 
                    : 'w-[4px] h-[4px] bg-current opacity-30 group-hover:opacity-80 group-hover:h-3'
                }`}
                style={{ color: 'var(--text-color)' }}
              />
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default ScrollProgressHUD

