import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Zap } from 'lucide-react'
import { labTabs } from '../data/labComponents'
import { useTypewriter } from '../hooks/useTypewriter'
import LetterHover from '../components/ui/LetterHover'

// ─── Scoped Ripple Demo ────────────────────────────────────────────
// Uses container-scoped onClick + stopPropagation to prevent double-firing
// with the global Cursor.jsx listener. Reuses same Framer Motion animation config.
const RippleDemo = () => {
  const [ripples, setRipples] = useState([])
  const containerRef = useRef(null)

  const handleClick = useCallback((e) => {
    e.stopPropagation()
    const rect = containerRef.current.getBoundingClientRect()
    const newRipple = {
      id: Date.now() + Math.random(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
    setRipples((prev) => [...prev.slice(-4), newRipple])
  }, [])

  const removeRipple = useCallback((id) => {
    setRipples((prev) => prev.filter((r) => r.id !== id))
  }, [])

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className="relative w-full h-40 rounded-xl border cursor-pointer overflow-hidden flex items-center justify-center select-none"
      style={{
        background: 'var(--bg-color)',
        borderColor: 'var(--surface-border)',
      }}
    >
      <span className="font-mono text-[10px] uppercase tracking-widest opacity-40 pointer-events-none" style={{ color: 'var(--text-color)' }}>
        Click anywhere in this zone
      </span>
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ opacity: 1, scale: 0.1 }}
            animate={{ opacity: 0, scale: 2.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => removeRipple(ripple.id)}
            className="absolute rounded-full border-2 border-brand-orange bg-brand-orange/30 shadow-[0_0_30px_rgba(249,115,22,1),_inset_0_0_15px_rgba(249,115,22,0.8)] backdrop-blur-[1px] pointer-events-none"
            style={{
              left: ripple.x - 25,
              top: ripple.y - 25,
              width: 50,
              height: 50,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

// ─── Typewriter Demo ───────────────────────────────────────────────
const TypewriterDemo = () => {
  const { typedText, showCaret, start, reset } = useTypewriter('Driven by animation. Wired for immersion.')
  const [hasStarted, setHasStarted] = useState(false)

  const handleTrigger = () => {
    reset()
    setHasStarted(true)
    // Small delay to let reset clear before starting
    setTimeout(() => start(), 50)
  }

  return (
    <div className="space-y-3">
      <div
        className="w-full h-20 rounded-xl border flex items-center px-6"
        style={{
          background: 'var(--bg-color)',
          borderColor: 'var(--surface-border)',
        }}
      >
        <p className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase min-h-[1.2em]" style={{ color: 'var(--text-color)' }}>
          {hasStarted ? typedText : ''}
          {showCaret && <span className="animate-pulse text-brand-orange ml-0.5">▌</span>}
        </p>
      </div>
      <motion.button
        onClick={handleTrigger}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="glass-button px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-[0.25em] rounded-sm cursor-pointer"
        style={{ color: 'var(--accent-color)' }}
      >
        {hasStarted ? 'Replay' : 'Start'} Typewriter
      </motion.button>
    </div>
  )
}

// ─── Letter Hover Demo ─────────────────────────────────────────────
const LetterHoverDemo = () => {
  return (
    <div
      className="w-full h-24 rounded-xl border flex items-center justify-center"
      style={{
        background: 'var(--bg-color)',
        borderColor: 'var(--surface-border)',
      }}
    >
      <span className="text-2xl md:text-4xl font-black uppercase tracking-tighter cursor-pointer" style={{ color: 'var(--text-color)' }}>
        <LetterHover text="HOVER ME" style={{ opacity: 1, transform: 'none' }} />
      </span>
    </div>
  )
}

// ─── Tab Content Renderers ─────────────────────────────────────────
const ButtonsTab = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* Primary — REV ENGINE Style */}
    <div className="space-y-2">
      <span className="font-mono text-[9px] uppercase tracking-widest opacity-50 block" style={{ color: 'var(--text-color)' }}>
        [{labTabs.buttons[0].label}]
      </span>
      <motion.button
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 500, damping: 20 }}
        className="glass-button px-5 py-2 text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-brand-orange rounded-sm flex items-center gap-2 cursor-pointer shadow-lg w-full justify-center"
      >
        <Zap size={12} />
        <span>REV ENGINE</span>
      </motion.button>
    </div>

    {/* Ghost / Outline */}
    <div className="space-y-2">
      <span className="font-mono text-[9px] uppercase tracking-widest opacity-50 block" style={{ color: 'var(--text-color)' }}>
        [{labTabs.buttons[1].label}]
      </span>
      <div className="px-5 py-2 border border-brand-orange/30 text-brand-orange font-mono text-[10px] tracking-[0.3em] uppercase bg-brand-orange/5 backdrop-blur-sm rounded-sm text-center cursor-default">
        &lt;available for work /&gt;
      </div>
    </div>

    {/* Icon Button */}
    <div className="space-y-2">
      <span className="font-mono text-[9px] uppercase tracking-widest opacity-50 block" style={{ color: 'var(--text-color)' }}>
        [{labTabs.buttons[2].label}]
      </span>
      <div className="flex items-center gap-3">
        <button 
          className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 bg-transparent cursor-pointer"
          style={{ borderColor: 'var(--surface-border)', color: 'var(--text-color)' }}
          aria-label="Previous"
        >
          <ArrowLeft size={16} />
        </button>
        <button 
          className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 bg-transparent cursor-pointer"
          style={{ borderColor: 'var(--surface-border)', color: 'var(--text-color)' }}
          aria-label="Next"
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  </div>
)

const CardsTab = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Glassmorphic Card */}
    <div className="space-y-2" style={{ perspective: '1000px' }}>
      <span className="font-mono text-[9px] uppercase tracking-widest opacity-50 block" style={{ color: 'var(--text-color)' }}>
        [{labTabs.cards[0].label}]
      </span>
      <motion.div 
        whileHover={{ y: -8, scale: 1.03, rotateX: 3, rotateY: -3 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="craft-card p-6 rounded-2xl border backdrop-blur-xl shadow-lg cursor-pointer"
        style={{
          background: 'var(--surface-bg)',
          borderColor: 'var(--surface-border)',
          overflow: 'visible',
          transformStyle: 'preserve-3d',
        }}
      >
        <h3 className="text-lg font-extrabold mb-2" style={{ color: 'var(--text-color)' }}>
          Glass Card
        </h3>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Frosted glass with specular reflection, inner rim refraction, and hover-shift glare.
        </p>
      </motion.div>
    </div>

    {/* 3D Tilt Card */}
    <div className="space-y-2" style={{ perspective: '1000px' }}>
      <span className="font-mono text-[9px] uppercase tracking-widest opacity-50 block" style={{ color: 'var(--text-color)' }}>
        [{labTabs.cards[1].label}]
      </span>
      <motion.div 
        whileHover={{ y: -8, scale: 1.03, rotateX: -5, rotateY: 5 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="glass-panel p-6 rounded-2xl border backdrop-blur-xl shadow-lg cursor-pointer"
        style={{
          background: 'var(--surface-bg)',
          borderColor: 'var(--surface-border)',
          overflow: 'visible',
          transformStyle: 'preserve-3d',
        }}
      >
        <h3 className="text-lg font-extrabold mb-2" style={{ color: 'var(--text-color)' }}>
          Tilt Panel
        </h3>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Perspective-tracked 3D tilt with spring-physics response on mouse proximity.
        </p>
      </motion.div>
    </div>
  </div>
)

const MotionTab = () => (
  <div className="space-y-6">
    {/* Ripple Demo */}
    <div className="space-y-2">
      <span className="font-mono text-[9px] uppercase tracking-widest opacity-50 block" style={{ color: 'var(--text-color)' }}>
        [{labTabs.motion[0].label}]
      </span>
      <RippleDemo />
    </div>

    {/* Typewriter Demo */}
    <div className="space-y-2">
      <span className="font-mono text-[9px] uppercase tracking-widest opacity-50 block" style={{ color: 'var(--text-color)' }}>
        [{labTabs.motion[1].label}]
      </span>
      <TypewriterDemo />
    </div>

    {/* Letter Hover Demo */}
    <div className="space-y-2">
      <span className="font-mono text-[9px] uppercase tracking-widest opacity-50 block" style={{ color: 'var(--text-color)' }}>
        [{labTabs.motion[2].label}]
      </span>
      <LetterHoverDemo />
    </div>
  </div>
)

// ─── Tab Config ────────────────────────────────────────────────────
const tabs = [
  { id: 'buttons', label: 'BUTTONS', content: ButtonsTab },
  { id: 'cards', label: 'CARDS', content: CardsTab },
  { id: 'motion', label: 'MOTION', content: MotionTab },
]

// ─── Main Lab Section ──────────────────────────────────────────────
const Lab = () => {
  const [activeTab, setActiveTab] = useState('buttons')
  const ActiveContent = tabs.find(t => t.id === activeTab)?.content || ButtonsTab

  return (
    <section 
      className="snap-section w-full md:w-screen min-h-screen md:h-screen flex flex-col justify-center items-center px-6 md:px-20 shrink-0 border-b md:border-b-0 md:border-r border-white/5 relative z-10 pointer-events-auto py-24 md:py-0 overflow-y-auto hide-scrollbar"
    >
      <div 
        className="glass-panel w-full max-w-3xl p-6 md:p-10 rounded-2xl border backdrop-blur-2xl shadow-2xl relative my-auto"
        style={{
          background: 'var(--surface-bg)',
          borderColor: 'var(--surface-border)',
          overflow: 'visible',
          perspective: '1000px',
        }}
      >
        {/* Corner bracket decorations */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-brand-orange/40 pointer-events-none" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-brand-orange/40 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-brand-orange/40 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-brand-orange/40 pointer-events-none" />

        {/* Section Header */}
        <div className="mb-6 md:mb-8 space-y-2">
          <span className="font-mono text-brand-orange text-xs uppercase tracking-[0.3em] font-bold block">
            IV — LAB
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase" style={{ color: 'var(--text-color)' }}>
            The Lab.
          </h2>
          <p className="text-xs md:text-sm leading-relaxed max-w-md" style={{ color: 'var(--text-muted)' }}>
            Live interactive diagnostics of every UI primitive powering this site.
          </p>
        </div>

        {/* Tab Bar */}
        <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8 border-b border-white/10 pb-4">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                className={`px-4 md:px-5 py-2 text-[10px] md:text-xs font-mono font-bold uppercase tracking-[0.2em] rounded-sm cursor-pointer transition-all duration-300 border ${
                  isActive
                    ? 'glass-button text-brand-orange border-brand-orange/50 shadow-[0_0_12px_rgba(249,115,22,0.3)]'
                    : 'bg-transparent opacity-50 hover:opacity-100 border-transparent'
                }`}
                style={{ color: isActive ? undefined : 'var(--text-color)' }}
              >
                [{tab.label}]
              </motion.button>
            )
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <ActiveContent />
          </motion.div>
        </AnimatePresence>

        {/* Footer status line */}
        <div className="mt-6 md:mt-8 pt-4 border-t border-white/10 flex items-center gap-2">
          <span className="text-brand-orange animate-pulse text-[10px]">●</span>
          <span className="font-mono text-[9px] uppercase tracking-widest opacity-40" style={{ color: 'var(--text-color)' }}>
            SYSTEM DIAGNOSTICS: ALL MODULES OPERATIONAL
          </span>
        </div>
      </div>
    </section>
  )
}

export default Lab
