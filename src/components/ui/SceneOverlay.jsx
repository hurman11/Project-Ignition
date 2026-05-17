import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Ignition from '../../scenes/Ignition'
import Origin from '../../scenes/Origin'
import Machines from '../../scenes/Machines'
import Contact from '../../scenes/Contact'

gsap.registerPlugin(ScrollTrigger)

const SpeedLines = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const lines = containerRef.current.querySelectorAll('.speed-line')
    
    // Initially hidden
    gsap.set(lines, { scaleX: 0, opacity: 0 })

    // Trigger when scrolling past the origin-machines boundary
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'left center',
      onEnter: () => {
        gsap.to(lines, {
          scaleX: 1,
          opacity: 1,
          stagger: 0.05,
          duration: 0.15,
          ease: 'power2.in',
          onComplete: () => {
            gsap.to(lines, {
              opacity: 0,
              x: 200,
              duration: 0.2,
              stagger: 0.03,
              ease: 'power2.out',
            })
          }
        })
      },
      once: true,
    })

    return () => ScrollTrigger.killAll()
  }, [])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-40 flex flex-col justify-center gap-16"
      style={{ display: 'none' }}
    >
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="speed-line w-full h-[1px] origin-left"
          style={{
            background: `linear-gradient(90deg, transparent 0%, rgba(255, 107, 0, ${0.6 - i * 0.1}) 30%, rgba(255, 107, 0, ${0.3 - i * 0.05}) 70%, transparent 100%)`,
            transform: `translateY(${(i - 1.5) * 60}px)`,
          }}
        />
      ))}
    </div>
  )
}

const SceneOverlay = () => {
  return (
    <>
      <Ignition />
      <Origin />
      <Machines />
      <Contact />
    </>
  )
}

export default SceneOverlay
