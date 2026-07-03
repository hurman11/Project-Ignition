import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/projects'
import { ArrowLeft, ArrowRight, ExternalLink, Github } from 'lucide-react'
import KiritoChat from '../components/ui/KiritoChat'
import KiritoCaseStudyModal from '../components/ui/KiritoCaseStudyModal'

gsap.registerPlugin(ScrollTrigger)

const Machines = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false)
  
  const contentRef = useRef(null)
  const imageRef = useRef(null)
  const sectionRef = useRef(null)

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    gsap.to([contentRef.current, imageRef.current], {
      opacity: 0,
      x: -40,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        setCurrentIndex((prev) => (prev + 1) % projects.length)
      }
    })
  }

  const handlePrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    gsap.to([contentRef.current, imageRef.current], {
      opacity: 0,
      x: 40,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
      }
    })
  }

  useEffect(() => {
    gsap.fromTo([contentRef.current, imageRef.current], 
      { opacity: 0, x: gsap.getProperty(contentRef.current, 'x') < 0 ? 40 : -40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => setIsAnimating(false)
      }
    )
  }, [currentIndex])

  const project = projects[currentIndex]

  return (
    <section 
      ref={sectionRef}
      className="snap-section w-full md:w-screen min-h-screen md:h-screen flex flex-col md:flex-row justify-center items-center px-6 md:px-20 shrink-0 border-b md:border-b-0 md:border-r border-white/5 relative z-10 pointer-events-auto gap-8 md:gap-12 py-24 md:py-0 overflow-y-auto hide-scrollbar"
    >
      {/* Left Side: Project Info Card (Esfyq Artifacts Style) */}
      <div 
        className="glass-panel w-full md:w-[45%] p-6 md:p-10 rounded-2xl border backdrop-blur-2xl shadow-2xl relative transition-all duration-500 my-auto"
        style={{
          background: 'var(--surface-bg)',
          borderColor: 'var(--surface-border)',
        }}
      >
        <div ref={contentRef} className="space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-[0.3em] block font-bold text-brand-orange">
              III — MACHINES
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase" style={{ color: 'var(--text-color)' }}>
              The Machines.
            </h2>
          </div>

          <div className="pt-2 pb-2 border-t border-white/10">
            <span className="font-mono text-[10px] uppercase tracking-widest block mb-1 text-brand-orange font-bold">
              Project {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
            <h3 className="text-2xl md:text-4xl font-extrabold" style={{ color: 'var(--text-color)' }}>
              {project.title}
            </h3>
            <p className="mt-3 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {project.description}
            </p>
          </div>

          {/* Upgrades / Skill Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag, i) => (
              <span 
                key={i}
                className="px-3 py-1 rounded-full border text-[11px] font-mono font-medium"
                style={{
                  background: 'transparent',
                  borderColor: 'var(--surface-border)',
                  color: 'var(--text-color)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons & Carousel Nav */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10 gap-4">
            <div className="flex items-center gap-2">
              {project.isLocked ? (
                <span className="px-6 py-2.5 rounded-full border text-xs font-bold font-mono opacity-40 cursor-not-allowed" style={{ borderColor: 'var(--surface-border)', color: 'var(--text-color)' }}>
                  Locked Spec
                </span>
              ) : (
                <>
                  {project.link && (
                    <motion.a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="glass-button inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold font-mono tracking-wider shadow-md"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={14} />
                    </motion.a>
                  )}
                  {project.hasCaseStudy && (
                    <motion.button 
                      onClick={() => setIsCaseStudyOpen(true)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="glass-button inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold font-mono tracking-wider shadow-md cursor-pointer"
                    >
                      <span>Case Study</span>
                      <ExternalLink size={14} />
                    </motion.button>
                  )}
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="glass-button inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold font-mono tracking-wider shadow-md"
                    >
                      <Github size={13} />
                      <span>GitHub</span>
                    </motion.a>
                  )}
                </>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={handlePrev} 
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 bg-transparent cursor-pointer"
                style={{ borderColor: 'var(--surface-border)', color: 'var(--text-color)' }}
                aria-label="Previous Project"
              >
                <ArrowLeft size={16} />
              </button>
              <button 
                onClick={handleNext} 
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 bg-transparent cursor-pointer"
                style={{ borderColor: 'var(--surface-border)', color: 'var(--text-color)' }}
                aria-label="Next Project"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Chat Mockup or Image Preview */}
      <div 
        ref={imageRef}
        className="w-full md:w-[50%] h-[50vh] md:h-[65vh] relative rounded-2xl overflow-hidden border backdrop-blur-xl shadow-2xl my-auto"
        style={{ borderColor: 'var(--surface-border)' }}
      >
        {project.isChatMockup ? (
          <KiritoChat />
        ) : project.isLocked && project.image ? (
          <div className="w-full h-full relative">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center"
              style={{ filter: 'brightness(0.35) saturate(0.6)' }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="text-3xl opacity-50">⚙️</div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-brand-orange font-bold opacity-70">Classified</p>
              <p className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--text-color)', opacity: 0.35 }}>In The Garage</p>
              <div className="flex gap-1.5 mt-1">
                {[0,1,2].map(i => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-brand-orange"
                    style={{ opacity: 0.5, animation: `kc-bounce 1.4s ease-in-out ${i * 0.25}s infinite` }}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full relative">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
        )}
      </div>

      {/* Kirito Case Study Modal */}
      <KiritoCaseStudyModal 
        isOpen={isCaseStudyOpen} 
        onClose={() => setIsCaseStudyOpen(false)} 
      />
    </section>
  )
}

export default Machines

