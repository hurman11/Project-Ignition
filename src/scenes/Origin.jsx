import { motion, useScroll, useTransform } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
}

const Origin = () => {
  const { scrollYProgress } = useScroll()
  
  // Scene 2 occurs roughly between 0.15 and 0.5 scroll progress
  // Pushing the background slightly left, and pulling the text slightly right
  const panelX = useTransform(scrollYProgress, [0.15, 0.5], [0, -50])
  const textX = useTransform(scrollYProgress, [0.15, 0.5], [0, 150])

  return (
    <section className="w-screen h-screen flex flex-col justify-center items-start px-6 md:px-24 shrink-0 border-r border-white/5 relative z-10 pointer-events-auto">
      <motion.div 
        className="w-full max-w-3xl pointer-events-none bg-black/40 backdrop-blur-md p-6 md:p-12 border border-white/10 rounded-sm relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        style={{ x: panelX }}
      >
        {/* Decorative HUD Elements */}
        <div className="absolute top-0 left-0 w-6 md:w-8 h-6 md:h-8 border-t-2 border-l-2 border-brand-orange opacity-50" />
        <div className="absolute bottom-0 right-0 w-6 md:w-8 h-6 md:h-8 border-b-2 border-r-2 border-brand-orange opacity-50" />
        <div className="absolute top-4 right-4 flex gap-1">
          <div className="w-1 h-3 md:h-4 bg-brand-orange animate-pulse" />
          <div className="w-1 h-3 md:h-4 bg-brand-orange/50" />
          <div className="w-1 h-3 md:h-4 bg-brand-orange/30" />
        </div>

        <motion.div style={{ x: textX }}>
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-4 md:mb-6">
            <span className="font-mono text-brand-orange text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] uppercase border-b border-brand-orange/50 pb-1">Creative // Developer</span>
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-black mb-4 md:mb-8 uppercase tracking-widest text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
            The Origin
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-sm md:text-xl text-gray-300 leading-relaxed mb-8 md:mb-12 font-medium">
            "I'm Hurman. I build digital experiences that move — not just visually, but emotionally. 
            Driven by animation, fueled by obsession, and wired for immersive design."
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col gap-8">
            <div>
              <span className="font-mono text-brand-orange text-[10px] tracking-widest uppercase mb-4 block border-b border-brand-orange/30 pb-2">Primary Performance Modules:</span>
              <div className="flex flex-wrap gap-2 md:gap-3 mt-3">
                {['React', 'JavaScript', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Three.js', 'React Three Fiber', 'Vite', 'Responsive Design'].map((tech) => (
                  <span key={tech} className="px-3 md:px-4 py-1 md:py-2 border border-brand-orange/40 bg-brand-orange/10 text-brand-orange font-mono text-[10px] md:text-xs uppercase tracking-widest shadow-[0_0_10px_rgba(249,115,22,0.1)]">
                    [{tech}]
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="font-mono text-brand-green text-[10px] tracking-widest uppercase mb-4 block border-b border-brand-green/30 pb-2">Secondary Telemetry Tags:</span>
              <div className="flex flex-wrap gap-2 md:gap-3 mt-3">
                {['Git', 'Figma', 'VS Code', 'Blender', 'npm', 'Firebase'].map((tech) => (
                  <span key={tech} className="px-3 md:px-4 py-1 md:py-2 border border-brand-green/40 bg-brand-green/10 text-brand-green font-mono text-[10px] md:text-xs uppercase tracking-widest shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                    [{tech}]
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Origin
