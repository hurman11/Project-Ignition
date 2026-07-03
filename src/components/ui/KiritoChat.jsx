import { useEffect, useRef, useState } from 'react'
import cyberpunkCity from '../../assets/cyberpunk_city_night.png'
import kiritoAvatar from '../../assets/kirito_avatar.png'

const MESSAGES = [
  { id: 1, type: 'user', text: '.stats', delay: 0 },
  { id: 2, type: 'bot', delay: 1000, content: 'status' },
  { id: 3, type: 'user', text: 'analyze vercel.com', delay: 2600 },
  { id: 4, type: 'bot', delay: 3700, content: 'osint' },
  { id: 5, type: 'user', text: 'generate image of a cyberpunk city at night', delay: 5400 },
  { id: 6, type: 'bot', delay: 6500, content: 'image' },
  { id: 7, type: 'user', text: '.code\nwrite a debounce fn in TypeScript', delay: 8000 },
  { id: 8, type: 'bot', delay: 9100, content: 'code' },
]

const LOOP_DURATION = 12000

const StatusBlock = () => (
  <div className="space-y-1">
    <p className="font-bold text-brand-orange text-xs mb-1">Cardinal System Status</p>
    <div className="grid grid-cols-3 gap-1 text-[11px]" style={{ color: 'var(--text-secondary)' }}>
      <span>HP: 87%</span>
      <span>SP: 43%</span>
      <span>Strain: 12%</span>
    </div>
    <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>Active Link: 14d 6h 32m</p>
    <p className="text-[10px] italic opacity-50" style={{ color: 'var(--text-secondary)' }}>Main Nerve Link</p>
  </div>
)

const OsintBlock = () => (
  <div className="space-y-1">
    <p className="font-bold text-brand-orange text-xs mb-1">Target Site Intel — vercel.com</p>
    <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>Sacred Arts: Next.js, React</p>
    <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>Enchantments: Framer Motion</p>
    <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>Gateway: Vercel Edge Network</p>
    <p className="text-[10px] italic opacity-50" style={{ color: 'var(--text-secondary)' }}>Main Nerve Link</p>
  </div>
)

const ImageBlock = () => (
  <div className="space-y-1.5">
    <p className="font-bold text-brand-orange text-xs">Projection Arts complete, Master.</p>
    <div className="w-full h-24 rounded-lg overflow-hidden relative" style={{ border: '1px solid rgba(249,115,22,0.3)' }}>
      <img
        src={cyberpunkCity}
        alt="Generated: cyberpunk city at night"
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)' }} />
    </div>
    <p className="text-[10px] italic opacity-50" style={{ color: 'var(--text-secondary)' }}>Backup Nerve Link</p>
  </div>
)

const CodeBlock = () => (
  <div className="space-y-1.5">
    <p className="font-bold text-brand-orange text-xs">Sacred Arts Mode — Draft complete.</p>
    <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>Pass A: qwen2.5-coder:7b done</p>
    <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>Pass B: Cerebras review approved</p>
    <div
      className="rounded-lg p-3 font-mono text-[10px] leading-relaxed"
      style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(249,115,22,0.2)' }}
    >
      <span style={{ color: '#a0a0a0' }}>{'function '}</span>
      <span className="text-brand-orange">{'debounce'}</span>
      <span style={{ color: '#a0a0a0' }}>{'<T>(fn: T, ms: '}</span>
      <span className="text-brand-orange">{'number'}</span>
      <span style={{ color: '#a0a0a0' }}>{'): T {'}</span>
      <br />
      <span style={{ color: '#a0a0a0' }}>{'  let timer: ReturnType<typeof setTimeout>'}</span>
      <br />
      <span style={{ color: '#a0a0a0' }}>{'  return ((...args: any[]) => {'}</span>
      <br />
      <span style={{ color: '#a0a0a0' }}>{'    clearTimeout(timer)'}</span>
      <br />
      <span style={{ color: '#a0a0a0' }}>{'    timer = setTimeout(() => (fn as any)(...args), ms)'}</span>
      <br />
      <span style={{ color: '#a0a0a0' }}>{'  }) as T'}</span>
      <br />
      <span style={{ color: '#a0a0a0' }}>{'}'}</span>
    </div>
    <p className="text-[10px] italic opacity-50" style={{ color: 'var(--text-secondary)' }}>Main Nerve Link</p>
  </div>
)

const BotMessageContent = ({ content }) => {
  if (content === 'status') return <StatusBlock />
  if (content === 'osint') return <OsintBlock />
  if (content === 'image') return <ImageBlock />
  if (content === 'code') return <CodeBlock />
  return null
}

const KiritoChat = () => {
  const [visibleCount, setVisibleCount] = useState(0)
  const [showTyping, setShowTyping] = useState(false)
  const isPausedRef = useRef(false)
  const visibleRef = useRef(0)
  const scrollRef = useRef(null)
  const timeoutsRef = useRef([])

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
  }

  const runSequence = (startVisible = 0) => {
    clearAllTimeouts()
    setVisibleCount(startVisible)
    visibleRef.current = startVisible
    setShowTyping(false)

    MESSAGES.forEach((msg, i) => {
      if (i < startVisible) return

      if (msg.type === 'bot') {
        const typingTimeout = setTimeout(() => {
          if (!isPausedRef.current) setShowTyping(true)
        }, msg.delay - 700)
        timeoutsRef.current.push(typingTimeout)
      }

      const showTimeout = setTimeout(() => {
        setShowTyping(false)
        visibleRef.current = i + 1
        setVisibleCount(i + 1)
      }, msg.delay)
      timeoutsRef.current.push(showTimeout)
    })

    const loopTimeout = setTimeout(() => {
      runSequence(0)
    }, LOOP_DURATION)
    timeoutsRef.current.push(loopTimeout)
  }

  useEffect(() => {
    runSequence(0)
    return () => clearAllTimeouts()
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [visibleCount, showTyping])

  return (
    <div
      className="w-full h-full flex flex-col rounded-2xl overflow-hidden"
      style={{ background: 'var(--surface-bg)' }}
      onMouseEnter={() => { isPausedRef.current = true; clearAllTimeouts() }}
      onMouseLeave={() => { isPausedRef.current = false; runSequence(visibleRef.current) }}
    >
      <div
        className="flex items-center gap-3 px-4 py-3 shrink-0"
        style={{ borderBottom: '1px solid var(--surface-border)', background: 'rgba(0,0,0,0.3)' }}
      >
        <div
          className="w-9 h-9 rounded-full overflow-hidden shrink-0 border"
          style={{ borderColor: 'rgba(249, 115, 22, 0.4)' }}
        >
          <img src={kiritoAvatar} alt="Kirito avatar" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm tracking-wide truncate" style={{ color: 'var(--text-color)' }}>Kirito</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-green-400">Online</span>
          </div>
        </div>
        <span className="font-mono text-[9px] tracking-widest uppercase" style={{ color: 'var(--text-secondary)', opacity: 0.35 }}>
          terminal / chat
        </span>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
        style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none' }}
      >
        {MESSAGES.slice(0, visibleCount).map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            style={{ animation: 'kc-fade-in 0.3s ease forwards' }}
          >
            <div
              className="max-w-[88%] rounded-xl px-3 py-2 text-xs leading-relaxed"
              style={{
                background: msg.type === 'user' ? 'rgba(249,115,22,0.18)' : 'rgba(255,255,255,0.05)',
                border: msg.type === 'user' ? '1px solid rgba(249,115,22,0.35)' : '1px solid rgba(255,255,255,0.08)',
                color: 'var(--text-color)',
              }}
            >
              {msg.type === 'user' ? (
                <span className="font-mono whitespace-pre-wrap">{msg.text}</span>
              ) : (
                <BotMessageContent content={msg.content} />
              )}
            </div>
          </div>
        ))}

        {showTyping && (
          <div className="flex justify-start" style={{ animation: 'kc-fade-in 0.2s ease forwards' }}>
            <div
              className="rounded-xl px-4 py-3 flex items-center gap-1"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-brand-orange"
                  style={{ opacity: 0.7, animation: `kc-bounce 1s ease-in-out ${i * 0.15}s infinite` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div
        className="shrink-0 px-3 py-2.5 flex items-center gap-2"
        style={{ borderTop: '1px solid var(--surface-border)', background: 'rgba(0,0,0,0.25)' }}
      >
        <div
          className="flex-1 rounded-full px-4 py-1.5 text-[11px] font-mono"
          style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', opacity: 0.3 }}
        >
          Message Kirito...
        </div>
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-brand-orange opacity-40 text-sm">
          &#x2191;
        </div>
      </div>

      <style>{`
        @keyframes kc-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes kc-bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  )
}

export default KiritoChat
