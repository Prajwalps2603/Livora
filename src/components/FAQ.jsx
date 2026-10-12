import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, X, ArrowLeft, ArrowRight, Send, Plus, Check,
  Layers, Briefcase, Users, FlaskConical, Wrench, RefreshCw, Cpu, Clock, Megaphone,
} from 'lucide-react'
import { useInView, fadeInUp, staggerContainer } from '../hooks/useAnimations'
import './FAQ.css'

const faqs = [
  {
    q: 'What does LIVORA build?',
    a: 'LIVORA builds custom web applications, Android applications, internal business ERPs, and automated workflows tailored to your operations.',
    category: 'Scope',
    icon: Layers,
  },
  {
    q: 'Can you build software for our specific business?',
    a: 'Yes. We understand your unique workflow, team routines, and pain points first, and then engineer a bespoke digital solution.',
    category: 'Custom Fit',
    icon: Briefcase,
  },
  {
    q: 'Do you work with small and growing businesses?',
    a: 'Absolutely. We design flexible solutions suited for your current stage and scale, with foundational pricing for early partners.',
    category: 'Clients',
    icon: Users,
  },
  {
    q: 'Can you build a prototype before we commit?',
    a: 'Yes. For suitable projects, we develop an interactive prototype or working evaluation build so you can test it risk-free.',
    category: 'Risk-Free',
    icon: FlaskConical,
  },
  {
    q: 'Do you provide ongoing maintenance and updates?',
    a: 'Yes. We offer long-term maintenance, cloud monitoring, performance scaling, and continuous feature expansion.',
    category: 'Support',
    icon: Wrench,
  },
  {
    q: 'Can you modernize our existing website or app?',
    a: 'Yes. We can audit, refactor, and modernize your existing codebase, database, or UI to current industry standards.',
    category: 'Modernization',
    icon: RefreshCw,
  },
  {
    q: 'What modern technologies do you use?',
    a: 'We use React, Node.js, Python, Java, Android, Flutter, Firebase, Google Cloud Platform, PostgreSQL, AI/ML, and REST APIs.',
    category: 'Tech Stack',
    icon: Cpu,
  },
  {
    q: 'How long does development usually take?',
    a: 'Typical timelines range from 2–4 weeks for streamlined apps or prototypes, and 6–10 weeks for comprehensive business systems.',
    category: 'Timeline',
    icon: Clock,
  },
  {
    q: 'Do you offer digital marketing & branding?',
    a: 'Yes. Beyond software, we offer social media marketing, digital brand design, stationery kits, and ATS resume solutions.',
    category: 'Marketing',
    icon: Megaphone,
  },
]

// How each note sits on the board: paper colour, what holds it up, tilt and nudge
const looks = [
  { paper: 'lime', hold: 'pin-ink', rot: -4, y: 0 },
  { paper: 'white', hold: 'tape', rot: 3, y: 22 },
  { paper: 'ink', hold: 'pin-lime', rot: -2, y: -6 },
  { paper: 'polaroid', hold: 'tape', rot: 5, y: 14 },
  { paper: 'stone', hold: 'pin-red', rot: -5, y: -10 },
  { paper: 'white', hold: 'pin-lime', rot: 2, y: 10 },
  { paper: 'lime', hold: 'tape', rot: -3, y: -4 },
  { paper: 'polaroid', hold: 'pin-red', rot: 4, y: 18 },
  { paper: 'stone', hold: 'tape', rot: -2, y: 0 },
]
const ASK = faqs.length // index of the blank "your question" note

function Hold({ type }) {
  if (type === 'tape') return <span className="note__tape" />
  return <span className={`note__pin note__pin--${type.split('-')[1]}`} />
}

function NoteFace({ i, read }) {
  const f = faqs[i]
  const look = looks[i]
  const Icon = f.icon
  return (
    <>
      <Hold type={look.hold} />
      {look.paper === 'polaroid' && (
        <span className="note__photo"><Icon size={30} strokeWidth={1.6} /></span>
      )}
      <span className="note__num">#{String(i + 1).padStart(2, '0')}</span>
      <span className="note__q">{f.q}</span>
      <span className="note__cat">{f.category}</span>
      {read && <span className="note__read"><Check size={11} strokeWidth={3.5} /> read</span>}
    </>
  )
}

export default function FAQ() {
  const [ref, inView] = useInView()
  const [open, setOpen] = useState(null)
  const [read, setRead] = useState(() => new Set())
  const [draft, setDraft] = useState('')

  const show = (i) => {
    setOpen(i)
    if (i < ASK) setRead((s) => new Set(s).add(i))
  }
  const step = (d) => show((open + d + ASK) % ASK)

  // Esc pins the note back, arrows flip between notes
  useEffect(() => {
    if (open === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null)
      if (open < ASK && e.key === 'ArrowRight') step(1)
      if (open < ASK && e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const sendDraft = (e) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    window.open(`https://wa.me/918618176469?text=${encodeURIComponent(`Hi LIVORA! ${text}`)}`, '_blank')
    setDraft('')
    setOpen(null)
  }

  return (
    <section className="section faq" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div className="section-badge" variants={fadeInUp} transition={{ duration: 0.5 }}>
            <Sparkles size={14} /> Questions & Answers
          </motion.div>
          <motion.h2 className="section-title" variants={fadeInUp} transition={{ duration: 0.5 }}>
            Frequently Asked <em>Questions.</em>
          </motion.h2>
          <motion.p className="section-subtitle" variants={fadeInUp} transition={{ duration: 0.5 }}>
            Our answer board. Pull any note off to read it, or pin up a question of your own.
          </motion.p>
        </motion.div>

        <div className="faq-board">
          <span className="faq-board__title">LIVORA · ideas &amp; answers</span>
          <span className="faq-board__hint" aria-hidden="true">
            pick a note!
            <svg viewBox="0 0 80 50"><path d="M4 8 C30 2 58 12 62 40 M52 32 L62 42 L70 30" /></svg>
          </span>

          <motion.div
            className="faq-board__notes"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          >
            {faqs.map((f, i) => (
              <div key={f.q} className="faq-board__slot" style={{ '--y': `${looks[i].y}px` }}>
                {open !== i && (
                  <motion.button
                    type="button"
                    layoutId={`note-${i}`}
                    className={`note note--${looks[i].paper}`}
                    style={{ rotate: looks[i].rot }}
                    variants={{
                      hidden: { opacity: 0, y: -40, rotate: looks[i].rot * 3 },
                      visible: { opacity: 1, y: 0, rotate: looks[i].rot, transition: { type: 'spring', stiffness: 160, damping: 14 } },
                    }}
                    whileHover={{ rotate: 0, y: -8, scale: 1.04 }}
                    onClick={() => show(i)}
                    aria-label={`Open: ${f.q}`}
                  >
                    <NoteFace i={i} read={read.has(i)} />
                  </motion.button>
                )}
              </div>
            ))}

            {/* Blank note for the visitor's own question */}
            <div className="faq-board__slot" style={{ '--y': '6px' }}>
              {open !== ASK && (
                <motion.button
                  type="button"
                  layoutId="note-ask"
                  className="note note--blank"
                  style={{ rotate: 3 }}
                  variants={{
                    hidden: { opacity: 0, y: -40 },
                    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 160, damping: 14 } },
                  }}
                  whileHover={{ rotate: 0, y: -8, scale: 1.04 }}
                  onClick={() => show(ASK)}
                >
                  <span className="note__plus"><Plus size={22} /></span>
                  <span className="note__q">Leave us a question</span>
                  <span className="note__cat">Your note</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* The pulled note, enlarged with its answer */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="faq-focus"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            {open < ASK ? (
              <motion.div
                layoutId={`note-${open}`}
                className={`note note--big note--${looks[open].paper}`}
                style={{ rotate: -1 }}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-label={faqs[open].q}
              >
                <Hold type={looks[open].hold} />
                <span className="note__stamp">{faqs[open].category}</span>
                <span className="note__num">#{String(open + 1).padStart(2, '0')} / {String(ASK).padStart(2, '0')}</span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={open}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
                    exit={{ opacity: 0, y: -8 }}
                  >
                    <h3 className="note__q note__q--big">{faqs[open].q}</h3>
                    <p className="note__a">{faqs[open].a}</p>
                  </motion.div>
                </AnimatePresence>
                <div className="note__nav">
                  <button type="button" onClick={() => step(-1)} aria-label="Previous note"><ArrowLeft size={16} /></button>
                  <button type="button" className="note__back" onClick={() => setOpen(null)}><X size={14} /> Pin it back</button>
                  <button type="button" onClick={() => step(1)} aria-label="Next note"><ArrowRight size={16} /></button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                layoutId="note-ask"
                className="note note--big note--blank note--writing"
                style={{ rotate: 1 }}
                onClick={(e) => e.stopPropagation()}
                onSubmit={sendDraft}
              >
                <span className="note__tape" />
                <h3 className="note__q note__q--big">Your question</h3>
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Write it here…"
                  rows={4}
                  autoFocus
                  aria-label="Your question"
                />
                <div className="note__nav">
                  <button type="button" className="note__back" onClick={() => setOpen(null)}><X size={14} /> Close</button>
                  <button type="submit" className="note__send" disabled={!draft.trim()}>
                    Send on WhatsApp <Send size={14} />
                  </button>
                </div>
              </motion.form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
