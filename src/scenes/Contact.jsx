import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const headlineWords = ["LET'S", "BUILD", "SOMETHING", "REAL."]

const Contact = () => {
  const [success, setSuccess] = useState(false)
  const sectionRef = useRef(null)
  const finishLineRef = useRef(null)
  const labelRef = useRef(null)
  const headlineRef = useRef(null)
  const subtextRef = useRef(null)
  const formRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSuccess(true)
    setTimeout(() => setSuccess(false), 4000)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const contactTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'left 65%',
          scroller: sectionRef.current?.closest('.will-change-transform')?.parentElement,
          horizontal: false,
        }
      })

      // 1. Orange finish line draws across
      if (finishLineRef.current) {
        contactTl.fromTo(finishLineRef.current, 
          { width: '0%' },
          { width: '100%', duration: 0.6, ease: 'power2.inOut' }
        )
      }

      // 2. Label fades in with letter-spacing
      if (labelRef.current) {
        contactTl.from(labelRef.current, {
          opacity: 0,
          letterSpacing: '0.5em',
          duration: 0.5
        }, '-=0.1')
      }

      // 3. Headline words slam in
      const words = headlineRef.current?.querySelectorAll('.contact-word')
      if (words?.length) {
        contactTl.from(words, {
          opacity: 0,
          y: 80,
          skewY: 5,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power4.out'
        }, '-=0.2')
      }

      // 4. Subtext fades up
      if (subtextRef.current) {
        contactTl.from(subtextRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.5
        }, '-=0.2')
      }

      // 5. Form fields stagger in
      const formFields = formRef.current?.querySelectorAll('.contact-form-field')
      if (formFields?.length) {
        contactTl.from(formFields, {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.4
        }, '-=0.3')
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="contact-section w-screen h-screen flex flex-col md:flex-row justify-center items-center px-6 md:px-24 shrink-0 relative z-10 pointer-events-auto gap-8 md:gap-24 overflow-y-auto pt-24 md:pt-0"
    >
      
      {/* Left: Terminal Text */}
      <div className="w-full md:w-1/2 flex flex-col justify-center max-w-2xl mt-10 md:mt-0">
        
        {/* Finish line — draws across before headline */}
        <div 
          ref={finishLineRef}
          className="h-[2px] mb-6 md:mb-8"
          style={{ 
            width: '0%',
            background: 'linear-gradient(90deg, #FF6B00, rgba(255, 107, 0, 0.3), transparent)',
            boxShadow: '0 0 10px rgba(255, 107, 0, 0.4)'
          }}
        />

        <div className="flex items-center gap-4 mb-4 md:mb-8">
          <span 
            ref={labelRef}
            className="contact-label font-mono text-brand-orange text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] uppercase border-b border-brand-orange/50 pb-1"
          >
            Final Sequence // Transmission
          </span>
        </div>

        <h2 
          ref={headlineRef}
          className="contact-headline text-5xl md:text-8xl font-black mb-4 md:mb-6 uppercase tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] leading-none"
        >
          {headlineWords.map((word, i) => (
            <span key={i}>
              <span className="contact-word inline-block">{word}</span>
              {i < headlineWords.length - 1 && (i === 1 ? <br /> : ' ')}
            </span>
          ))}
        </h2>

        <div ref={subtextRef}>
          <p className="contact-subtext text-base md:text-xl text-gray-400 font-medium leading-relaxed max-w-md">
            Open for cinematic digital collaborations.
            <br />
            <a href="mailto:hurmanejaz@gmail.com" className="text-brand-orange hover:underline">hurmanejaz@gmail.com</a>
          </p>
        </div>
      </div>

      {/* Right: HUD Form */}
      <div className="w-full md:w-1/2 max-w-xl flex flex-col items-center">
        <form 
          ref={formRef}
          className="flex flex-col gap-6 md:gap-8 w-full max-w-md bg-black/60 backdrop-blur-md p-6 md:p-10 border border-white/10 rounded-sm relative overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]" 
          onSubmit={handleSubmit}
        >
          
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-orange to-transparent opacity-40" />

          <div className="relative contact-form-field">
            <span className="absolute -top-2 left-3 bg-black px-2 font-mono text-[10px] text-brand-orange tracking-widest z-10 shadow-[0_0_10px_black]">CALLSIGN</span>
            <input 
              type="text" 
              required
              className="w-full bg-black/50 border border-white/20 px-4 py-3 md:py-4 text-white focus:outline-none focus:border-brand-orange transition-colors font-mono uppercase text-xs md:text-sm relative z-0"
            />
          </div>
          
          <div className="relative contact-form-field">
            <span className="absolute -top-2 left-3 bg-black px-2 font-mono text-[10px] text-brand-orange tracking-widest z-10 shadow-[0_0_10px_black]">FREQUENCY (EMAIL)</span>
            <input 
              type="email" 
              required
              className="w-full bg-black/50 border border-white/20 px-4 py-3 md:py-4 text-white focus:outline-none focus:border-brand-orange transition-colors font-mono uppercase text-xs md:text-sm relative z-0"
            />
          </div>
          
          <div className="relative contact-form-field">
            <span className="absolute -top-2 left-3 bg-black px-2 font-mono text-[10px] text-brand-orange tracking-widest z-10 shadow-[0_0_10px_black]">MESSAGE LOG</span>
            <textarea 
              rows={4}
              required
              className="w-full bg-black/50 border border-white/20 px-4 py-3 md:py-4 text-white focus:outline-none focus:border-brand-orange transition-colors font-mono resize-none uppercase text-xs md:text-sm relative z-0"
            />
          </div>

          <button 
            type="submit" 
            className={`contact-form-field w-full font-black uppercase tracking-[0.2em] md:tracking-[0.3em] py-4 md:py-5 mt-2 transition-all duration-300 border text-xs md:text-sm ${
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
      </div>
    </section>
  )
}

export default Contact
