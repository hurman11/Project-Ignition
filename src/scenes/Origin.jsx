import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const primarySkills = ['React', 'JavaScript', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Three.js', 'React Three Fiber', 'Vite', 'Responsive Design']
const secondarySkills = ['Git', 'Figma', 'VS Code', 'Blender', 'npm', 'Firebase']

const Origin = () => {
  const { scrollYProgress } = useScroll()
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const bioRef = useRef(null)
  const primaryTagsRef = useRef(null)
  const secondaryTagsRef = useRef(null)
  
  // Scene 2 occurs roughly between 0.15 and 0.5 scroll progress
  const textX = useTransform(scrollYProgress, [0.15, 0.5], [0, 100])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading word-by-word reveal
      const headingWords = headingRef.current?.querySelectorAll('.origin-word')
      if (headingWords?.length) {
        gsap.from(headingWords, {
          opacity: 0,
          y: 40,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'left 80%',
            scroller: sectionRef.current?.closest('.will-change-transform')?.parentElement,
            horizontal: false,
          }
        })
      }

      // Bio lines reveal one by one
      const bioLines = bioRef.current?.querySelectorAll('.bio-line')
      if (bioLines?.length) {
        gsap.from(bioLines, {
          opacity: 0,
          y: 25,
          stagger: 0.18,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'left 75%',
            scroller: sectionRef.current?.closest('.will-change-transform')?.parentElement,
            horizontal: false,
          }
        })
      }

      // Primary skill tags snap in
      const primaryTags = primaryTagsRef.current?.querySelectorAll('.skill-tag')
      if (primaryTags?.length) {
        gsap.from(primaryTags, {
          scale: 0.7,
          opacity: 0,
          y: 10,
          rotation: -3,
          stagger: {
            each: 0.07,
            from: 'start'
          },
          duration: 0.4,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'left 60%',
            scroller: sectionRef.current?.closest('.will-change-transform')?.parentElement,
            horizontal: false,
          }
        })
      }

      // Secondary skill tags snap in
      const secondaryTags = secondaryTagsRef.current?.querySelectorAll('.skill-tag')
      if (secondaryTags?.length) {
        gsap.from(secondaryTags, {
          scale: 0.7,
          opacity: 0,
          y: 10,
          rotation: -3,
          stagger: {
            each: 0.07,
            from: 'start'
          },
          duration: 0.4,
          ease: 'back.out(2)',
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'left 60%',
            scroller: sectionRef.current?.closest('.will-change-transform')?.parentElement,
            horizontal: false,
          }
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="origin-section w-screen h-screen flex flex-col justify-center items-start px-6 md:px-24 shrink-0 border-r border-white/5 relative z-10 pointer-events-auto"
    >
      <motion.div 
        className="relative z-10 max-w-3xl pointer-events-none"
        style={{ x: textX }}
      >
        {/* Label */}
        <div className="flex items-center gap-4 mb-4 md:mb-6">
          <span className="font-mono text-brand-orange text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] uppercase border-b border-brand-orange/50 pb-1">Creative // Developer</span>
        </div>

        {/* Heading - word by word */}
        <h2 ref={headingRef} className="text-4xl md:text-6xl font-black mb-6 md:mb-10 uppercase tracking-widest text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          <span className="origin-word inline-block mr-4">The</span>
          <span className="origin-word inline-block">Origin</span>
        </h2>
        
        {/* Bio - line by line reveal */}
        <div ref={bioRef} className="mb-10 md:mb-14 space-y-2">
          <p className="bio-line text-sm md:text-xl text-gray-300 leading-relaxed font-medium">
            "I build things that move."
          </p>
          <p className="bio-line text-sm md:text-xl text-gray-300 leading-relaxed font-medium">
            "Not just visually — emotionally."
          </p>
          <p className="bio-line text-sm md:text-xl text-brand-orange leading-relaxed font-medium">
            "Driven by animation. Obsessed with craft."
          </p>
        </div>
        
        {/* Skills */}
        <div className="flex flex-col gap-8">
          <div>
            <span className="font-mono text-brand-orange text-[10px] tracking-widest uppercase mb-4 block border-b border-brand-orange/30 pb-2">Primary Performance Modules:</span>
            <div ref={primaryTagsRef} className="flex flex-wrap gap-2 md:gap-3 mt-3 skills-grid">
              {primarySkills.map((tech) => (
                <span 
                  key={tech} 
                  className="skill-tag px-3 md:px-4 py-1 md:py-2 font-mono text-[10px] md:text-xs uppercase tracking-widest"
                  style={{
                    border: '1px solid #FF6B00',
                    color: '#FF6B00',
                    background: 'rgba(255, 107, 0, 0.08)',
                  }}
                >
                  [{tech}]
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="font-mono text-white/50 text-[10px] tracking-widest uppercase mb-4 block border-b border-white/10 pb-2">Secondary Telemetry Tags:</span>
            <div ref={secondaryTagsRef} className="flex flex-wrap gap-2 md:gap-3 mt-3">
              {secondarySkills.map((tech) => (
                <span 
                  key={tech} 
                  className="skill-tag px-3 md:px-4 py-1 md:py-2 font-mono text-[10px] md:text-xs uppercase tracking-widest"
                  style={{
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: 'rgba(255,255,255,0.6)',
                    background: 'transparent',
                  }}
                >
                  [{tech}]
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Origin
