import { motion } from 'framer-motion'
import { useState } from 'react'

const Contact = () => {
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSuccess(true)
    setTimeout(() => setSuccess(false), 4000)
  }

  return (
    <section className="w-screen h-screen flex flex-col md:flex-row justify-center items-center px-6 md:px-24 shrink-0 relative z-10 pointer-events-auto gap-8 md:gap-24 overflow-y-auto pt-24 md:pt-0">
      
      {/* Left: Terminal Text */}
      <motion.div 
        className="w-full md:w-1/2 flex flex-col justify-center max-w-2xl mt-10 md:mt-0"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-4 mb-4 md:mb-8">
          <span className="font-mono text-brand-orange text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] uppercase border-b border-brand-orange/50 pb-1">Final Sequence // Transmission</span>
        </div>
        <h2 className="text-5xl md:text-8xl font-black mb-4 md:mb-6 uppercase tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] leading-none">
          Let’s Build
          <br />
          Immersive
        </h2>
        <p className="text-base md:text-xl text-gray-400 font-medium leading-relaxed max-w-md">
          Open for cinematic digital collaborations.
          <br />
          <a href="mailto:hurmanejaz@gmail.com" className="text-brand-orange hover:underline">hurmanejaz@gmail.com</a>
        </p>
      </motion.div>

      {/* Right: HUD Form */}
      <motion.div 
        className="w-full md:w-1/2 max-w-xl flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <form className="flex flex-col gap-6 md:gap-8 w-full max-w-md bg-black/60 backdrop-blur-md p-6 md:p-10 border border-white/10 rounded-sm relative overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]" onSubmit={handleSubmit}>
          
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-orange to-transparent opacity-40" />

          <div className="relative">
            <span className="absolute -top-2 left-3 bg-black px-2 font-mono text-[10px] text-brand-orange tracking-widest z-10 shadow-[0_0_10px_black]">CALLSIGN</span>
            <input 
              type="text" 
              required
              className="w-full bg-black/50 border border-white/20 px-4 py-3 md:py-4 text-white focus:outline-none focus:border-brand-orange transition-colors font-mono uppercase text-xs md:text-sm relative z-0"
            />
          </div>
          
          <div className="relative">
            <span className="absolute -top-2 left-3 bg-black px-2 font-mono text-[10px] text-brand-orange tracking-widest z-10 shadow-[0_0_10px_black]">FREQUENCY (EMAIL)</span>
            <input 
              type="email" 
              required
              className="w-full bg-black/50 border border-white/20 px-4 py-3 md:py-4 text-white focus:outline-none focus:border-brand-orange transition-colors font-mono uppercase text-xs md:text-sm relative z-0"
            />
          </div>
          
          <div className="relative">
            <span className="absolute -top-2 left-3 bg-black px-2 font-mono text-[10px] text-brand-orange tracking-widest z-10 shadow-[0_0_10px_black]">MESSAGE LOG</span>
            <textarea 
              rows={4}
              required
              className="w-full bg-black/50 border border-white/20 px-4 py-3 md:py-4 text-white focus:outline-none focus:border-brand-orange transition-colors font-mono resize-none uppercase text-xs md:text-sm relative z-0"
            />
          </div>

          <button 
            type="submit" 
            className={`w-full font-black uppercase tracking-[0.2em] md:tracking-[0.3em] py-4 md:py-5 mt-2 transition-all duration-300 border text-xs md:text-sm ${
              success 
                ? 'bg-brand-green/10 border-brand-green text-brand-green shadow-[0_0_20px_rgba(34,197,94,0.3)]' 
                : 'bg-brand-orange/10 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-black hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]'
            }`}
          >
            {success ? 'Signal received. I\'ll be in touch.' : 'Send Transmission'}
          </button>
        </form>

        <div className="flex justify-center gap-8 md:gap-12 mt-8 md:mt-16 border-t border-white/5 pt-6 md:pt-8 w-full max-w-md pb-12 md:pb-0">
          <a href="https://github.com/hurman11" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 md:gap-3 text-gray-500 hover:text-white transition-colors uppercase font-mono text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em]">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange opacity-50" />
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/hurman-ejaz-75556b2b5" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 md:gap-3 text-gray-500 hover:text-white transition-colors uppercase font-mono text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em]">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange opacity-50" />
            LinkedIn
          </a>
        </div>
      </motion.div>
    </section>
  )
}

export default Contact
