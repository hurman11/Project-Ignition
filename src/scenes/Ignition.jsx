import { motion, useScroll, useTransform } from 'framer-motion'

const Ignition = () => {
  const { scrollYProgress } = useScroll()
  
  // Parallax offsets mapping scroll progress to X-axis push
  const titleX = useTransform(scrollYProgress, [0, 0.25], [0, 500])
  const subX = useTransform(scrollYProgress, [0, 0.25], [0, 250])
  const badgeX = useTransform(scrollYProgress, [0, 0.25], [0, 100])
  const opacityFade = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  return (
    <section className="w-screen h-screen flex flex-col justify-center items-start px-6 md:px-24 shrink-0 border-r border-white/5 relative z-10 pointer-events-auto">
      <motion.div 
        className="flex flex-col gap-4 pointer-events-none w-full"
        style={{ opacity: opacityFade }}
      >
        <motion.div style={{ x: subX }}>
          <motion.div
            className="flex items-center gap-2 md:gap-4 mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="h-1 w-8 md:w-12 bg-brand-orange shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
            <motion.span 
              className="font-mono text-brand-orange text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] uppercase"
              animate={{ opacity: [1, 0.4, 1, 0.8, 1] }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              System Ignition
            </motion.span>
          </motion.div>
        </motion.div>

        <motion.div style={{ x: titleX }}>
          <motion.h1 
            className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-none text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Hurman Ejaz
          </motion.h1>
        </motion.div>
        
        <motion.div style={{ x: subX }}>
          <motion.h2 
            className="text-lg md:text-3xl text-gray-400 font-bold tracking-[0.4em] mt-4 uppercase"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          >
            Full Stack <span className="text-brand-orange">Developer</span>
          </motion.h2>
        </motion.div>
        
        <motion.div style={{ x: badgeX }}>
          <motion.div 
            className="flex flex-col md:flex-row items-start md:items-center gap-6 mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <div className="px-6 py-2 border border-brand-orange/30 text-brand-orange font-mono text-[10px] tracking-[0.3em] uppercase bg-brand-orange/5 backdrop-blur-sm">
              &lt;available for work /&gt;
            </div>
            <p className="text-[10px] md:text-xs font-mono text-gray-500 tracking-[0.3em] uppercase border-l border-white/20 pl-6">
              Driven by animation. Wired for immersion.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Ignition
