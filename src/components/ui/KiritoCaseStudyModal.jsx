import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { X, Github, Shield, Zap, Bot, FlaskConical, DollarSign } from 'lucide-react'

const STATS = [
  { icon: Bot, label: '6 Sub-Agents' },
  { icon: Zap, label: '21 Tools' },
  { icon: FlaskConical, label: '75 Tests' },
  { icon: DollarSign, label: '$0 / month' },
]

const LLM_TIERS = [
  { tier: 1, name: 'Groq', model: 'llama-3.3-70b-versatile', label: 'Primary', note: 'Ultra-fast, free tier' },
  { tier: 2, name: 'Gemini', model: '2.5 Flash', label: 'Fallback', note: 'Multimodal - handles images' },
  { tier: 3, name: 'Ollama', model: 'mistral:7b', label: 'Local', note: 'CPU-only, zero cost' },
  { tier: 4, name: 'Ollama', model: 'llama3.2:3b', label: 'Last Resort', note: 'Absolute fallback' },
]

const AGENTS = [
  { name: 'sysadmin', tools: 20, desc: 'Shell, git, docker, backups, cron, filesystem' },
  { name: 'network', tools: 8, desc: 'Ping, nmap, speedtest, OSINT, web search' },
  { name: 'personal', tools: 7, desc: 'Notes (FTS5), reminders, alert history' },
  { name: 'creative', tools: 5, desc: 'Image gen, TTS voice notes, video/audio download' },
  { name: 'code', tools: null, desc: '2-pass AI code review pipeline' },
  { name: 'general', tools: null, desc: 'Catch-all for cross-domain requests' },
]

const SAO_TERMS = [
  ['VPS Server', 'Aincrad (floating castle)'],
  ['CPU / RAM', 'HP & SP bars'],
  ['Shell commands', 'Sword Skills'],
  ['Files', 'Memory Crystals'],
  ['Docker containers', 'Familiars / Sub-Units'],
  ['Git commits', 'Sacred Arts inscriptions'],
  ['Cron jobs', 'Quest Cycles'],
  ['Backups', 'Teleport Crystals'],
  ['API Keys', 'NerveGear Link signal'],
]

const TECH_TAGS = [
  'Node.js (ESM)', 'PM2', 'whatsapp-web.js', 'Puppeteer',
  'Groq API', 'Gemini API', 'Ollama', 'Cerebras',
  'SQLite (WAL)', 'better-sqlite3', 'FTS5',
  'Serper API', 'DuckDuckGo', 'Tailscale',
]

const SECURITY_ITEMS = [
  'Per-agent tool sandboxing - agents only see definitions in their domain',
  'Group chat privacy guardrails strip sensitive tools in group sessions',
  'Trace ID system flows through routing -> execution -> LLM -> audit log',
  'Sentinel IDS watches /var/log/auth.log for SSH brute-force in real-time',
  'Cross-domain boundary enforced at runtime, violations logged to tool_audit_log',
]

function Section({ title, children }) {
  return (
    <div className="space-y-3">
      <h3
        className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-brand-orange flex items-center gap-2"
      >
        <span className="flex-1 h-px animate-pulse" style={{ background: 'rgba(249,115,22,0.35)' }} />
        {title}
        <span className="flex-1 h-px animate-pulse" style={{ background: 'rgba(249,115,22,0.35)' }} />
      </h3>
      {children}
    </div>
  )
}

export default function KiritoCaseStudyModal({ isOpen, onClose }) {
  const lenis = useLenis()

  // ESC key handler
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Lenis scroll lock
  useEffect(() => {
    if (!lenis) return
    if (isOpen) {
      lenis.stop()
    } else {
      lenis.start()
    }
    return () => {
      lenis.start()
    }
  }, [isOpen, lenis])

  if (typeof window === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-[95vw] max-w-2xl h-[85vh] sm:h-[80vh] flex flex-col rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(249,115,22,0.15)]"
            style={{
              background: 'var(--surface-bg)',
              border: '1px solid var(--surface-border)',
            }}
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className="shrink-0 px-5 sm:px-8 pt-6 pb-5 flex items-start justify-between gap-4"
              style={{ borderBottom: '1px solid var(--surface-border)', background: 'rgba(0,0,0,0.15)' }}
            >
              <div className="space-y-1.5 min-w-0">
                <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-brand-orange font-bold block">
                  Case Study - PROJECT 02
                </span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                  Kirito <span className="text-brand-orange text-xl sm:text-2xl">⚔️</span>
                </h2>
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Production-grade WhatsApp AI agent for autonomous server management, coding, OSINT, and media - built on a self-hosted Linux VPS at $0/month.
                </p>

                {/* Stat Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {STATS.map(({ icon: Icon, label }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-semibold text-brand-orange"
                      style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)' }}
                    >
                      <Icon size={11} />
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer bg-black/20 hover:bg-brand-orange/10"
                style={{ border: '1px solid var(--surface-border)', color: 'var(--text-secondary)' }}
                aria-label="Close case study"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable content with Lenis bypass and customized premium scrollbar */}
            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 space-y-8 custom-modal-scrollbar"
            >
              {/* Overview */}
              <Section title="Overview">
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Kirito is an always-on autonomous agent inspired by the SAO universe. It runs on a personal Ubuntu VPS
                  with PM2 process management and bridges natural WhatsApp conversation to a sophisticated multi-agent
                  backend. Every message is intelligently routed through a hybrid regex + LLM classifier before being
                  dispatched to one of 6 domain-specialized sub-agents, each with its own sandboxed tool context.
                </p>
              </Section>

              {/* SAO Gamification */}
              <Section title="SAO Gamification Layer">
                <p className="text-[11px] leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                  The entire codebase uses Sword Art Online game mechanics - server management becomes an RPG.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {SAO_TERMS.map(([real, sao]) => (
                    <div
                      key={real}
                      className="flex items-start justify-between gap-2 px-3 py-2 rounded-lg text-xs"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <span style={{ color: 'var(--text-secondary)' }}>{real}</span>
                      <span className="text-brand-orange font-mono text-right">→ {sao}</span>
                    </div>
                  ))}
                </div>
              </Section>

              {/* LLM Cascade */}
              <Section title="4-Tier LLM Cascade">
                <p className="text-[11px] mb-3" style={{ color: 'var(--text-secondary)' }}>
                  Every message waterfalls through providers on failure - zero downtime, zero cost escalation.
                </p>
                <div className="space-y-1.5">
                  {LLM_TIERS.map((t, i) => (
                    <div key={t.tier} className="flex items-center gap-3">
                      <div className="flex flex-col items-center shrink-0">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold text-brand-orange shrink-0"
                          style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.4)' }}
                        >
                          {t.tier}
                        </div>
                        {i < LLM_TIERS.length - 1 && (
                          <div className="w-px h-4" style={{ background: 'rgba(249,115,22,0.2)' }} />
                        )}
                      </div>
                      <div
                        className="flex-1 flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-xs"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <div className="min-w-0 truncate">
                          <span className="font-bold text-white">{t.name} </span>
                          <span className="font-mono opacity-60 text-white text-[10px]">{t.model}</span>
                        </div>
                        <div className="text-right shrink-0">
                          <span
                            className="px-2 py-0.5 rounded text-[10px] font-mono inline-block"
                            style={{ background: 'rgba(249,115,22,0.1)', color: 'rgba(249,115,22,0.9)' }}
                          >
                            {t.label}
                          </span>
                          <p className="text-[10px] mt-0.5 opacity-50" style={{ color: 'var(--text-secondary)' }}>{t.note}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Sub-Agents */}
              <Section title="6 Specialized Sub-Agents">
                <p className="text-[11px] mb-3" style={{ color: 'var(--text-secondary)' }}>
                  Flat hierarchy - each agent only receives tool definitions for its domain (security by design).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {AGENTS.map((a) => (
                    <div
                      key={a.name}
                      className="px-3 py-2.5 rounded-lg text-xs space-y-1"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-brand-orange">{a.name}</span>
                        {a.tools && (
                          <span className="font-mono text-[10px] opacity-50" style={{ color: 'var(--text-secondary)' }}>
                            {a.tools} tools
                          </span>
                        )}
                      </div>
                      <p style={{ color: 'var(--text-secondary)' }}>{a.desc}</p>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Security */}
              <Section title="Security Architecture">
                <ul className="space-y-2">
                  {SECURITY_ITEMS.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                      <Shield size={12} className="text-brand-orange shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              {/* .code Pipeline */}
              <Section title=".code Mode - Two-Pass AI Pipeline">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { pass: 'Pass A', model: 'Ollama qwen2.5-coder:7b', desc: 'Local draft - CPU, zero API cost, fast generation' },
                    { pass: 'Pass B', model: 'Cerebras gpt-oss-120b', desc: 'Cloud review - security, logic, correctness audit' },
                  ].map((p) => (
                    <div
                      key={p.pass}
                      className="px-3 py-3 rounded-lg text-xs space-y-1.5"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <span className="font-mono font-bold text-brand-orange text-[9px] tracking-widest uppercase">{p.pass}</span>
                      <p className="font-mono text-white" style={{ color: 'var(--text-color)' }}>{p.model}</p>
                      <p style={{ color: 'var(--text-secondary)' }}>{p.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] mt-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Smart patch merge: <span className="text-brand-orange font-mono">approved</span> (use draft as-is) |{' '}
                  <span className="text-brand-orange font-mono">patched</span> (surgical replace) |{' '}
                  <span className="text-brand-orange font-mono">rewritten</span> (full rewrite).
                </p>
              </Section>

              {/* Tech Stack */}
              <Section title="Tech Stack">
                <div className="flex flex-wrap gap-1.5">
                  {TECH_TAGS.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded text-[10px] font-mono"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid var(--surface-border)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Section>
            </div>

            {/* Footer */}
            <div
              className="shrink-0 px-5 sm:px-8 py-4 flex items-center justify-between gap-3"
              style={{ borderTop: '1px solid var(--surface-border)', background: 'rgba(0,0,0,0.1)' }}
            >
              <a
                href="https://github.com/hurman11"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold font-mono tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
                style={{
                  background: 'rgba(249,115,22,0.12)',
                  border: '1px solid rgba(249,115,22,0.4)',
                  color: 'var(--text-color)',
                }}
              >
                <Github size={13} />
                <span>View on GitHub</span>
              </a>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full text-xs font-bold font-mono tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  border: '1px solid var(--surface-border)',
                  color: 'var(--text-secondary)',
                }}
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      <style>{`
        .custom-modal-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-modal-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.01);
        }
        .custom-modal-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(249, 115, 22, 0.35);
          border-radius: 99px;
        }
        .custom-modal-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(249, 115, 22, 0.6);
        }
      `}</style>
    </AnimatePresence>,
    document.body
  )
}
