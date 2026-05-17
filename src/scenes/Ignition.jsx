import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'

const heroName = 'HURMAN EJAZ'
const tagline = 'Driven by animation. Wired for immersion.'

const Ignition = () => {
  const { scrollYProgress } = useScroll()
  const sectionRef = useRef(null)
  const ignitionLineRef = useRef(null)
  const ignitionLabelRef = useRef(null)
  const nameRef = useRef(null)
  const subtitleRef = useRef(null)
  const badgeRef = useRef(null)
  const [typedText, setTypedText] = useState('')
  const [showCaret, setShowCaret] = useState(false)
  const [animationReady, setAnimationReady] = useState(false)
  
  // Parallax offsets mapping scroll progress to X-axis push
  const titleX = useTransform(scrollYProgress, [0, 0.25], [0, 500])
  const subX = useTransform(scrollYProgress, [0, 0.25], [0, 250])
  const badgeX = useTransform(scrollYProgress, [0, 0.25], [0, 100])
  const opacityFade = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  // Typewriter effect for tagline
  const startTypewriter = useCallback(() => {
    setShowCaret(true)
    let i = 0
    const interval = setInterval(() => {
      if (i < tagline.length) {
        setTypedText(tagline.substring(0, i + 1))
        i++
      } else {
        clearInterval(interval)
        setTimeout(() => setShowCaret(false), 2000)
      }
    }, 40)
  }, [])

  // Trigger the entrance after a delay (matches loading screen exit)
  useEffect(() => {
    const id = setTimeout(() => {
      setAnimationReady(true)
    }, 2000)
    return () => clearTimeout(id)
  }, [])

  // Run the GSAP animation when animationReady flips to true
  useEffect(() => {
    if (!animationReady) return
    
    const tl = gsap.timeline()

    // 1. System ignition line draws from 0 width
    tl.to(ignitionLineRef.current, {
      width: 48,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    })

    // 2. System ignition label fades in
    tl.to(ignitionLabelRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.4,
    }, '-=0.1')

    // 3. Name letters stagger in
    const letters = nameRef.current?.querySelectorAll('.hero-letter')
    if (letters?.length) {
      tl.to(letters, {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        duration: 0.7,
        ease: 'power4.out'
      }, '-=0.1')
    }

    // 4. Subtitle slides in
    tl.to(subtitleRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.5,
    }, '-=0.3')

    // 5. Badge + CTA
    tl.to(badgeRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
    }, '-=0.2')

    // 6. Start typewriter after animations settle
    tl.call(() => {
      startTypewriter()
    })
    
    return () => tl.kill()
  }, [animationReady, startTypewriter])

  return (
    <section 
      ref={sectionRef}
      className="hero-section w-screen h-screen flex flex-col justify-center items-start px-6 md:px-24 shrink-0 border-r border-white/5 relative z-10 pointer-events-auto"
    >
      <motion.div 
        className="flex flex-col gap-4 pointer-events-none w-full"
        style={{ opacity: opacityFade }}
      >
        <motion.div style={{ x: subX }}>
          <div className="system-ignition-label flex items-center gap-2 md:gap-4 mb-2">
            <div 
              ref={ignitionLineRef}
              className="h-1 bg-brand-orange shadow-[0_0_10px_rgba(249,115,22,0.8)]"
              style={{ width: 0, opacity: 0 }}
            />
            <span 
              ref={ignitionLabelRef}
              className="font-mono text-brand-orange text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] uppercase"
              style={{ opacity: 0, transform: 'translateX(-20px)' }}
            >
              System Ignition
            </span>
          </div>
        </motion.div>

        <motion.div style={{ x: titleX }}>
          <h1 
            ref={nameRef}
            className="hero-name text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-none text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            {heroName.split('').map((char, i) => (
              <span 
                key={i} 
                className="hero-letter inline-block"
                style={{ opacity: 0, transform: 'translateY(60px)' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
        </motion.div>
        
        <motion.div style={{ x: subX }}>
          <h2 
            ref={subtitleRef}
            className="hero-subtitle text-lg md:text-3xl text-gray-400 font-bold tracking-[0.4em] mt-4 uppercase"
            style={{ opacity: 0, transform: 'translateX(-20px)' }}
          >
            Full Stack <span className="text-brand-orange">Developer</span>
          </h2>
        </motion.div>
        
        <motion.div style={{ x: badgeX }}>
          <div 
            ref={badgeRef}
            className="hero-cta flex flex-col md:flex-row items-start md:items-center gap-6 mt-12"
            style={{ opacity: 0, transform: 'translateY(20px)' }}
          >
            <div className="px-6 py-2 border border-brand-orange/30 text-brand-orange font-mono text-[10px] tracking-[0.3em] uppercase bg-brand-orange/5 backdrop-blur-sm">
              &lt;available for work /&gt;
            </div>
            <p className="hero-tagline text-[10px] md:text-xs font-mono text-gray-500 tracking-[0.3em] uppercase border-l border-white/20 pl-6 min-h-[1.2em]">
              {typedText}
              {showCaret && <span className="animate-pulse text-brand-orange ml-0.5">▌</span>}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Ignition
