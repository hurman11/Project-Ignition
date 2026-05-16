import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { projects } from '../data/projects'

const Machines = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  
  const contentRef = useRef(null)
  const imageRef = useRef(null)

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    
    // Heavy mechanical animate out
    gsap.to([contentRef.current, imageRef.current], {
      opacity: 0,
      x: -60,
      duration: 0.5,
      ease: 'expo.inOut',
      onComplete: () => {
        setCurrentIndex((prev) => (prev + 1) % projects.length)
      }
    })
  }

  const handlePrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    
    // Heavy mechanical animate out
    gsap.to([contentRef.current, imageRef.current], {
      opacity: 0,
      x: 60,
      duration: 0.5,
      ease: 'expo.inOut',
      onComplete: () => {
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
      }
    })
  }

  // Heavy mechanical animate in
  useEffect(() => {
    gsap.fromTo([contentRef.current, imageRef.current], 
      { opacity: 0, x: gsap.getProperty(contentRef.current, 'x') < 0 ? 60 : -60 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: 'expo.out',
        onComplete: () => setIsAnimating(false)
      }
    )
  }, [currentIndex])

  const project = projects[currentIndex]

  return (
    <section className={`w-screen h-screen flex flex-col md:flex-row justify-center md:justify-between items-center px-6 md:px-24 shrink-0 border-r border-white/5 relative z-10 pointer-events-auto gap-8 md:gap-0 pt-20 md:pt-0 overflow-y-auto hide-scrollbar ${project.isLocked ? 'grayscale-[0.5]' : ''}`}>
      {/* Left Side: Info */}
      <motion.div 
        className={`w-full md:w-[45%] pointer-events-none bg-black/60 backdrop-blur-xl p-6 md:p-12 border border-white/10 rounded-sm relative mt-10 md:mt-0 shadow-[0_0_50px_rgba(0,0,0,0.8)] ${project.isLocked ? 'opacity-60' : 'opacity-100'}`}
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${project.isLocked ? 'from-gray-500' : 'from-brand-orange'} to-transparent opacity-50`} />
        
        <div ref={contentRef}>
          <div className="flex items-center gap-4 mb-4 md:mb-8">
            <span className={`font-mono ${project.isLocked ? 'text-gray-500' : 'text-brand-orange'} text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] uppercase`}>Spec // {String(currentIndex + 1).padStart(2, '0')}</span>
            <div className="flex-1 h-[1px] bg-white/10" />
          </div>
          
          <h3 className={`text-4xl md:text-7xl font-black mb-4 md:mb-6 uppercase tracking-tighter leading-none text-white ${project.isLocked ? 'opacity-40' : 'opacity-100'} drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]`}>{project.title}</h3>
          <p className="text-sm md:text-lg text-gray-400 mb-6 md:mb-10 max-w-xl font-medium leading-relaxed">{project.description}</p>
          
          <div className="flex flex-col gap-2 md:gap-4 mb-6 md:mb-12">
            <span className={`font-mono ${project.isLocked ? 'text-gray-600' : 'text-brand-green'} text-[10px] tracking-widest uppercase shadow-[0_0_5px_rgba(34,197,94,0.2)]`}>Upgrades Installed:</span>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {project.tags.map((tag, i) => (
                <span key={i} className={`px-2 md:px-3 py-1 border ${project.isLocked ? 'border-gray-700 text-gray-600 bg-gray-900/50' : 'border-brand-green/30 text-brand-green bg-brand-green/5'} font-mono text-[8px] md:text-[10px] rounded-sm uppercase tracking-wider`}>{tag}</span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pointer-events-auto border-t border-white/10 pt-6 md:pt-8 mt-4 gap-4 sm:gap-0">
            {project.isLocked ? (
              <div className="w-full sm:w-auto flex items-center justify-center gap-4 bg-gray-800/20 border border-gray-700 text-gray-500 px-6 md:px-8 py-3 md:py-4 font-black uppercase tracking-widest text-[10px] md:text-xs cursor-not-allowed">
                <span>Machine Locked</span>
                <div className="w-2 h-2 rounded-full bg-gray-600" />
              </div>
            ) : (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-4 bg-brand-orange/10 border border-brand-orange text-brand-orange px-6 md:px-8 py-3 md:py-4 font-black uppercase tracking-widest hover:bg-brand-orange hover:text-black transition-all duration-300 shadow-[inset_0_0_10px_rgba(249,115,22,0.2)] hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] text-[10px] md:text-xs">
                <span>Ignite Demo</span>
                <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
              </a>
            )}
            
            <div className="flex gap-2 md:gap-3">
              <button onClick={handlePrev} className="w-10 h-10 md:w-14 md:h-14 bg-black/80 border border-white/20 flex items-center justify-center text-white/50 hover:bg-brand-orange hover:border-brand-orange hover:text-black transition-all duration-300">
                <span className="font-mono text-lg md:text-xl leading-none">←</span>
              </button>
              <button onClick={handleNext} className="w-10 h-10 md:w-14 md:h-14 bg-black/80 border border-white/20 flex items-center justify-center text-white/50 hover:bg-brand-orange hover:border-brand-orange hover:text-black transition-all duration-300">
                <span className="font-mono text-lg md:text-xl leading-none">→</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Side: Image Frame */}
      <motion.div 
        className={`w-full md:w-1/2 h-[30vh] md:h-[75vh] relative p-2 md:p-3 border border-white/10 bg-black/80 backdrop-blur-md pointer-events-none mb-10 md:mb-0 shadow-[0_0_50px_rgba(0,0,0,0.8)] ${project.isLocked ? 'opacity-30' : 'opacity-100'}`}
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <div className="w-full h-full overflow-hidden relative" ref={imageRef}>
          <img 
            src={project.image} 
            alt={project.title} 
            className={`w-full h-full object-cover object-center ${project.isLocked ? 'mix-blend-luminosity grayscale contrast-125' : 'mix-blend-luminosity hover:mix-blend-normal'} transition-all duration-1000`}
          />
          {project.isLocked && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="px-8 py-4 border-2 border-white/10 bg-black/60 backdrop-blur-md font-black text-white/20 text-3xl md:text-5xl tracking-[0.5em] uppercase -rotate-12">
                Locked
              </div>
            </div>
          )}
          {/* Telemetry overlay grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
        </div>
        
        {/* Mechanical frame accents */}
        <div className={`absolute top-0 left-0 w-6 md:w-8 h-6 md:h-8 border-t-2 md:border-t-4 border-l-2 md:border-l-4 ${project.isLocked ? 'border-gray-600' : 'border-brand-orange'} -translate-x-1 md:-translate-x-2 -translate-y-1 md:-translate-y-2 opacity-80`} />
        <div className={`absolute top-0 right-0 w-6 md:w-8 h-6 md:h-8 border-t-2 md:border-t-4 border-r-2 md:border-r-4 ${project.isLocked ? 'border-gray-600' : 'border-brand-orange'} translate-x-1 md:translate-x-2 -translate-y-1 md:-translate-y-2 opacity-80`} />
        <div className={`absolute bottom-0 left-0 w-6 md:w-8 h-6 md:h-8 border-b-2 md:border-b-4 border-l-2 md:border-l-4 ${project.isLocked ? 'border-gray-600' : 'border-brand-orange'} -translate-x-1 md:-translate-x-2 translate-y-1 md:translate-y-2 opacity-80`} />
        <div className={`absolute bottom-0 right-0 w-6 md:w-8 h-6 md:h-8 border-b-2 md:border-b-4 border-r-2 md:border-r-4 ${project.isLocked ? 'border-gray-600' : 'border-brand-orange'} translate-x-1 md:translate-x-2 translate-y-1 md:translate-y-2 opacity-80`} />
      </motion.div>
    </section>
  )
}

export default Machines
