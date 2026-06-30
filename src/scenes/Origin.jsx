import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const primarySkills = ['React', 'JavaScript', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Three.js', 'React Three Fiber', 'Vite', 'Responsive Design']
const secondarySkills = ['Git', 'Figma', 'VS Code', 'Blender', 'npm', 'Firebase']

const craftCards = [
  {
    title: 'Who I Am',
    desc: "I'm Hurman Ejaz, a creative developer passionate about architecting high-performance web applications, fluid motion physics, and interactive 3D graphics."
  },
  {
    title: 'What I Do',
    desc: 'Specialized in frontend spatial layout, WebGL & React Three Fiber integration, responsive glassmorphism interfaces, and performance-first animation engines.'
  },
  {
    title: 'My Approach',
    desc: 'Clean, modular architecture meets expressive digital storytelling. Every line of code is tuned for snappiness, smooth rendering momentum, and visual delight.'
  }
]

const Origin = () => {
  const { scrollYProgress } = useScroll()
  const sectionRef = useRef(null)
  
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const textX = useTransform(scrollYProgress, [0.15, 0.5], [0, isMobile ? 0 : 60])

  return (
    <section 
      ref={sectionRef}
      className="origin-section snap-section w-full md:w-screen min-h-screen md:h-screen flex flex-col justify-center items-start px-6 md:px-20 shrink-0 border-b md:border-b-0 md:border-r border-white/5 relative z-10 pointer-events-auto py-24 md:py-0"
    >
      <motion.div 
        className="relative z-10 w-full max-w-5xl pointer-events-auto my-auto"
        style={{ x: textX }}
      >
        {/* Section Header */}
        <div className="mb-6 md:mb-8">
          <span className="font-mono text-brand-orange text-xs uppercase tracking-[0.3em] block mb-2 font-bold">
            II — ORIGIN
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase" style={{ color: 'var(--text-color)' }}>
            The Origin.
          </h2>
        </div>

        {/* Original Quotes Block */}
        <div className="mb-8 md:mb-10 space-y-1 pl-4 border-l-2 border-brand-orange">
          <p className="text-base md:text-xl font-medium leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            "I build things that move."
          </p>
          <p className="text-base md:text-xl font-medium leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            "Not just visually — emotionally."
          </p>
          <p className="text-base md:text-xl font-bold leading-relaxed text-brand-orange">
            "Driven by animation. Obsessed with craft."
          </p>
        </div>

        {/* 3-Column Glassmorphism Cards Grid (Esfyq layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 md:mb-12" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
          {craftCards.map((card) => (
            <motion.div 
              key={card.title}
              whileHover={{ y: -8, scale: 1.03, rotateX: 3, rotateY: -3 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="craft-card p-6 md:p-8 rounded-2xl border backdrop-blur-xl shadow-lg cursor-pointer"
              style={{
                background: 'var(--surface-bg)',
                borderColor: 'var(--surface-border)',
                transformStyle: 'preserve-3d',
              }}
            >
              <h3 className="text-xl font-extrabold mb-3" style={{ color: 'var(--text-color)' }}>
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stack & Expertise Tags */}
        <div className="space-y-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] block opacity-60" style={{ color: 'var(--text-color)' }}>
            Performance Stack & Tech Modules
          </span>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {primarySkills.map((tech) => (
              <motion.span 
                key={tech} 
                whileHover={{ scale: 1.15, y: -4, backgroundColor: 'rgba(249, 115, 22, 0.15)', borderColor: '#f97316' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                className="px-4 py-1.5 rounded-full border text-xs font-mono font-medium cursor-pointer shadow-sm select-none"
                style={{
                  background: 'var(--surface-bg)',
                  borderColor: 'var(--surface-border)',
                  color: 'var(--accent-color)',
                }}
              >
                {tech}
              </motion.span>
            ))}
            {secondarySkills.map((tech) => (
              <motion.span 
                key={tech} 
                whileHover={{ scale: 1.15, y: -4, opacity: 1, borderColor: '#f97316' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                className="px-4 py-1.5 rounded-full border text-xs font-mono font-medium opacity-60 cursor-pointer select-none"
                style={{
                  background: 'transparent',
                  borderColor: 'var(--surface-border)',
                  color: 'var(--text-color)',
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Origin

