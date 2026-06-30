import { motion } from 'framer-motion'
import { useState, useRef } from 'react'

const Contact = () => {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section className="snap-section w-full md:w-screen min-h-screen md:h-screen flex flex-col justify-center items-center px-6 md:px-20 shrink-0 relative z-10 pointer-events-auto py-24 md:py-0 overflow-y-auto hide-scrollbar">
      <div 
        className="glass-panel w-full max-w-lg p-8 md:p-12 rounded-3xl border backdrop-blur-2xl shadow-2xl space-y-8 my-auto"
        style={{
          background: 'var(--surface-bg)',
          borderColor: 'var(--surface-border)',
        }}
      >
        {/* Header matching Esfyq Connection */}
        <div className="text-center space-y-3">
          <span className="font-mono text-brand-orange text-xs uppercase tracking-[0.3em] font-bold block">
            V — CONTACT
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase" style={{ color: 'var(--text-color)' }}>
            Contact.
          </h2>
          <p className="text-xs md:text-sm max-w-xs mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Every story has a beginning. Let's write the next chapter of yours.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-[10px] font-mono uppercase tracking-widest opacity-60" style={{ color: 'var(--text-color)' }}>
              Name
            </label>
            <input 
              type="text" 
              placeholder="Your name" 
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 border focus:border-brand-orange"
              style={{
                background: 'var(--bg-color)',
                borderColor: 'var(--surface-border)',
                color: 'var(--text-color)',
              }}
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] font-mono uppercase tracking-widest opacity-60" style={{ color: 'var(--text-color)' }}>
              Email
            </label>
            <input 
              type="email" 
              placeholder="your@email.com" 
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 border focus:border-brand-orange"
              style={{
                background: 'var(--bg-color)',
                borderColor: 'var(--surface-border)',
                color: 'var(--text-color)',
              }}
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] font-mono uppercase tracking-widest opacity-60" style={{ color: 'var(--text-color)' }}>
              Message
            </label>
            <textarea 
              rows={4}
              placeholder="Tell me about your project..." 
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 border focus:border-brand-orange resize-none"
              style={{
                background: 'var(--bg-color)',
                borderColor: 'var(--surface-border)',
                color: 'var(--text-color)',
              }}
            />
          </div>

          <motion.button 
            type="submit" 
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="glass-button w-full py-4 text-xs md:text-sm font-bold font-mono tracking-widest uppercase rounded-xl cursor-pointer mt-4"
            style={{
              background: submitted ? 'var(--color-brand-green, #10b981)' : undefined,
              color: submitted ? '#ffffff' : 'var(--text-color)',
            }}
          >
            {submitted ? 'Message Sent Successfully' : 'Send Message'}
          </motion.button>
        </form>

        {/* Social Links matching Esfyq footer */}
        <div className="flex justify-center gap-6 pt-4 border-t border-white/10">
          <a 
            href="https://github.com/hurman11" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[10px] font-mono uppercase tracking-[0.2em] transition-colors duration-300 opacity-60 hover:opacity-100"
            style={{ color: 'var(--text-color)' }}
          >
            GitHub
          </a>
          <a 
            href="https://www.linkedin.com/in/hurman-ejaz-75556b2b5" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[10px] font-mono uppercase tracking-[0.2em] transition-colors duration-300 opacity-60 hover:opacity-100"
            style={{ color: 'var(--text-color)' }}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact

