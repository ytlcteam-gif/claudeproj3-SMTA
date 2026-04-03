import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShieldCheck, ShieldAlert, ShieldMinus, ShieldOff,
  Zap, FileText, Scale, Copy, Check,
  AlertTriangle, ChevronDown, Globe,
} from 'lucide-react'

const API_URL = 'http://127.0.0.1:8000/analyze'

// ─── Typing Animation ─────────────────────────────────────────────────────────

function TypingText({ text, speed = 18 }) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    setDisplayed('')
    if (!text) return
    let i = 0
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(interval)
    }, speed)
    return () => clearInterval(interval)
  }, [text])

  return (
    <span>
      {displayed}
      {displayed.length < text?.length && (
        <span className="inline-block w-[2px] h-[13px] ml-[1px] bg-indigo-400 animate-pulse align-middle" />
      )}
    </span>
  )
}

// ─── Styled Disclaimer ────────────────────────────────────────────────────────

function Disclaimer({ text }) {
  if (!text) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
      className="mt-10 mx-auto max-w-3xl px-6 py-4 rounded-2xl text-center bg-yellow-400/5 border border-yellow-400/15 shadow-[0_0_30px_rgba(234,179,8,0.08)]"
    >
      <span className="text-red-500 font-bold text-base uppercase tracking-widest">Disclaimer: </span>
      <span className="text-yellow-300/80 text-base font-medium">{text}</span>
    </motion.div>
  )
}

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: 'spring', stiffness: 240, damping: 22 },
  },
}

// ─── Severity Config ──────────────────────────────────────────────────────────

const severityConfig = {
  HIGH: {
    pill: 'bg-gradient-to-r from-red-500/30 to-pink-500/30 border border-red-400/40 text-red-300',
    glow: 'shadow-[0_0_20px_rgba(239,68,68,0.5)]',
    shimmer: true,
    icon: <ShieldAlert size={13} />,
  },
  MEDIUM: {
    pill: 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 text-amber-300',
    glow: 'shadow-[0_0_14px_rgba(251,191,36,0.35)]',
    shimmer: false,
    icon: <ShieldMinus size={13} />,
  },
  LOW: {
    pill: 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 text-emerald-300',
    glow: 'shadow-[0_0_14px_rgba(16,185,129,0.3)]',
    shimmer: false,
    icon: <ShieldCheck size={13} />,
  },
}

// ─── Animated Orbs Background ────────────────────────────────────────────────

function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-[#020617] to-[#000000]">
      {/* Dot mesh */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Indigo orb */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-indigo-700/20 blur-[120px]"
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '-10%', left: '-10%' }}
      />
      {/* Crimson orb */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-rose-800/15 blur-[120px]"
        animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        style={{ bottom: '-10%', right: '-5%' }}
      />
    </div>
  )
}

// ─── Scanning Line ────────────────────────────────────────────────────────────

function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent pointer-events-none"
      initial={{ top: '0%', opacity: 0 }}
      animate={{ top: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.1 }}
    />
  )
}

// ─── Severity Badge ───────────────────────────────────────────────────────────

function SeverityBadge({ severity }) {
  const cfg = severityConfig[severity] || {
    pill: 'bg-white/8 border border-white/10 text-white/50',
    glow: '',
    shimmer: false,
    icon: <ShieldOff size={13} />,
  }
  return (
    <span className={`relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold overflow-hidden ${cfg.pill} ${cfg.glow}`}>
      {cfg.shimmer && (
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
          animate={{ x: ['-150%', '150%'] }}
          transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5 }}
        />
      )}
      {cfg.icon}
      {severity}
    </span>
  )
}

// ─── Glass Card ───────────────────────────────────────────────────────────────

function GlassCard({ children, className = '', scan = false }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.012, y: -4 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className={`relative overflow-hidden bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-5 ${className}`}
    >
      {scan && <ScanLine />}
      {children}
    </motion.div>
  )
}

// ─── Copy Button ──────────────────────────────────────────────────────────────

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <motion.button
      onClick={handleCopy}
      whileTap={{ scale: 0.9 }}
      animate={copied ? { scale: [1, 1.15, 1] } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-300 ${
        copied
          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
          : 'bg-white/6 text-white/40 border border-white/10 hover:bg-white/12 hover:text-white'
      }`}
    >
      {copied ? <><Check size={12} />Copied!</> : <><Copy size={12} />Copy</>}
    </motion.button>
  )
}

// ─── Draft Accordion ──────────────────────────────────────────────────────────

function DraftAccordion({ title, content }) {
  const [open, setOpen] = useState(false)
  if (!content) return null

  return (
    <div className="border border-white/[0.07] rounded-xl overflow-hidden mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white/[0.03] hover:bg-white/[0.07] transition text-sm text-white/60 font-medium"
      >
        <span className="flex items-center gap-2">
          <FileText size={13} className="text-indigo-400" />
          {title}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={14} className="text-white/30" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div className="px-4 pb-4 pt-3 bg-black/20">
              <div className="flex justify-end mb-2">
                <CopyButton text={content} />
              </div>
              <textarea
                readOnly
                value={content}
                rows={5}
                className="w-full bg-black/25 text-white/65 text-sm p-3 rounded-xl border border-white/[0.07] resize-none focus:outline-none leading-relaxed"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [input, setInput] = useState('')
  const [focused, setFocused] = useState(false)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const analyze = async () => {
    if (!input.trim()) {
      setError('Please describe your issue before analyzing.')
      return
    }
    setError('')
    setResult(null)
    setLoading(true)

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      })
      if (!res.ok) throw new Error(`Server error: ${res.status}`)
      const data = await res.json()
      if (data.error) setError(data.message || 'Something went wrong.')
      else setResult(data)
    } catch {
      setError('Could not connect to the API. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const isEmergency = result?.analysis?.category === 'Emergency'

  return (
    <>
      <Background />
      <div className="min-h-screen text-white">
        <div className="max-w-6xl mx-auto px-5 py-12">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-1">
              <ShieldCheck size={28} className="text-indigo-400" />
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-white/90 to-white/40 bg-clip-text text-transparent">
                SMTA
              </h1>
            </div>
            <p className="text-white/35 text-sm tracking-widest uppercase ml-11">Social Media Trouble Advisor</p>
          </motion.div>

          {/* Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <div className={`relative rounded-2xl transition-all duration-500 ${
              loading
                ? 'shadow-[0_0_0_2px_rgba(99,102,241,0.7),0_0_40px_rgba(99,102,241,0.2)] animate-pulse'
                : focused
                ? 'shadow-[0_0_0_1.5px_rgba(99,102,241,0.5),0_0_24px_rgba(99,102,241,0.12)]'
                : 'shadow-[0_0_0_1px_rgba(255,255,255,0.07)]'
            }`}>
              <textarea
                rows={4}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Describe your social media issue... e.g. Someone made a fake account using my photos"
                className="w-full bg-white/[0.04] backdrop-blur-2xl text-white placeholder-white/20 p-5 pr-16 rounded-2xl border-0 focus:outline-none resize-none text-sm leading-relaxed"
              />
              {/* Shield watermark */}
              <ShieldCheck
                size={36}
                className="absolute bottom-4 right-4 text-white/[0.06] pointer-events-none"
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-red-400 text-sm mt-2.5"
                >
                  <AlertTriangle size={13} /> {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              onClick={analyze}
              disabled={loading}
              className="mt-4 px-7 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 text-sm shadow-[0_0_24px_rgba(99,102,241,0.45)]"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Analyzing...
                </span>
              ) : 'Analyze'}
            </button>
          </motion.div>

          {/* Emergency */}
          <AnimatePresence>
            {isEmergency && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-red-500/8 border border-red-500/25 backdrop-blur-2xl rounded-2xl p-10 text-center shadow-[0_0_50px_rgba(239,68,68,0.15)]"
              >
                <ShieldAlert size={40} className="text-red-400 mx-auto mb-3" />
                <h2 className="text-xl font-bold text-red-300 mb-2">Emergency Detected</h2>
                <p className="text-white/75 text-base">{result.disclaimer}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence>
            {result && !isEmergency && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 lg:grid-cols-2 gap-5"
              >
                {/* LEFT PANEL */}
                <div className="space-y-4">

                  {/* Analysis — with scan line */}
                  <GlassCard scan>
                    <h2 className="text-xs font-semibold text-white/35 uppercase tracking-widest mb-5">Analysis</h2>

                    <div className="mb-4">
                      <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Category</p>
                      <p className="text-indigo-300 font-semibold text-base">{result.analysis.category}</p>
                    </div>

                    <div className="mb-4">
                      <p className="text-[10px] text-white/30 uppercase tracking-widest mb-2">Severity</p>
                      <SeverityBadge severity={result.analysis.severity} />
                    </div>

                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Reasoning</p>
                      <p className="text-white/60 text-sm leading-relaxed"><TypingText text={result.analysis.reasoning} /></p>
                    </div>
                  </GlassCard>

                  {/* Action Plan */}
                  {result.action_plan?.length > 0 && (
                    <GlassCard>
                      <h2 className="text-xs font-semibold text-white/35 uppercase tracking-widest mb-4">Action Plan</h2>
                      <div className="space-y-3">
                        {result.action_plan.map((item, i) => (
                          <div key={i} className="flex gap-3 p-3.5 bg-white/[0.03] rounded-xl border border-white/[0.06]">
                            <div className="mt-0.5 shrink-0">
                              {item.step === 'Platform Action'
                                ? <Globe size={14} className="text-pink-400" />
                                : <Zap size={14} className="text-indigo-400" />
                              }
                            </div>
                            <div>
                              <p className="text-indigo-400/80 text-[10px] font-semibold uppercase tracking-wider mb-1">{item.step}</p>
                              <p className="text-white/55 text-sm leading-relaxed">{item.instruction}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  )}

                  {/* Legal References */}
                  {result.legal_reference?.length > 0 && (
                    <GlassCard>
                      <h2 className="text-xs font-semibold text-white/35 uppercase tracking-widest mb-4">Legal References</h2>
                      <div className="space-y-2">
                        {result.legal_reference.map((ref, i) => (
                          <div key={i} className="flex items-start justify-between gap-3 p-3 bg-white/[0.03] rounded-xl border border-white/[0.06]">
                            <div className="flex gap-2 items-start">
                              <Scale size={13} className="text-violet-400 mt-0.5 shrink-0" />
                              <p className="text-white/55 text-sm">{ref.law}</p>
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-1 rounded-lg shrink-0 ${
                              ref.confidence === 'High' ? 'bg-emerald-500/12 text-emerald-400 border border-emerald-500/20' :
                              ref.confidence === 'Medium' ? 'bg-amber-500/12 text-amber-400 border border-amber-500/20' :
                              'bg-white/6 text-white/35 border border-white/10'
                            }`}>
                              {ref.confidence}
                            </span>
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  )}
                </div>

                {/* RIGHT PANEL — Drafts */}
                <GlassCard className="self-start">
                  <h2 className="text-xs font-semibold text-white/35 uppercase tracking-widest mb-4">Complaint Drafts</h2>
                  <DraftAccordion title="Platform Report" content={result.drafts?.platform_report} />
                  <DraftAccordion title="Cyber Complaint" content={result.drafts?.cyber_complaint} />
                  <DraftAccordion title="Cease & Desist" content={result.drafts?.cease_and_desist} />
                </GlassCard>

              </motion.div>
            )}
          </AnimatePresence>

          {/* Disclaimer */}
          {result && !isEmergency && <Disclaimer text={result.disclaimer} />}

        </div>
      </div>
    </>
  )
}
