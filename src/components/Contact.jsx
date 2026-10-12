import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Phone,
  Mail,
  MessageCircle,
  Sparkles,
  Zap,
  Globe,
  CheckCircle2,
} from 'lucide-react'
import { useInView, fadeInUp, staggerContainer } from '../hooks/useAnimations'
import './Contact.css'

const serviceOptions = [
  'Web Application',
  'Android Application',
  'Internal Business Application',
  'Digital Marketing',
  'Social Media Marketing',
  'ATS Resume',
  'Stationery Design',
  'Academic Solution',
  'Other',
]

// Three ways to start, each with its own live mini-screen and a ready WhatsApp message
const quickActions = [
  {
    key: 'sprint',
    icon: Zap,
    label: 'Quick Project',
    desc: 'Need an urgent prototype or MVP? We ship at breakneck speed.',
    tag: '1-2 Weeks Delivery',
    cta: 'Start a sprint',
    message: "Hi LIVORA! I need a quick project / MVP delivered in 1-2 weeks.",
  },
  {
    key: 'system',
    icon: Globe,
    label: 'Full Custom Solution',
    desc: 'End-to-end digital transformation tailored specifically to your business.',
    tag: 'Complete System',
    cta: 'Plan my system',
    message: "Hi LIVORA! I'd like a full custom software solution for my business.",
    featured: true,
  },
  {
    key: 'call',
    icon: Sparkles,
    label: 'Free Strategy Call',
    desc: 'Talk directly with developers Prajwal & Nikhil to review requirements.',
    tag: 'Zero Obligation',
    cta: 'Book the call',
    message: "Hi LIVORA! I'd like to book a free strategy call.",
  },
]

function SprintScreen() {
  return (
    <div className="qa__screen qa__screen--sprint">
      <div className="qa__sprint-head"><span>Day 01</span><span>Day 14</span></div>
      <div className="qa__sprint-days">
        {Array.from({ length: 14 }, (_, i) => <i key={i} style={{ '--i': i }} />)}
      </div>
      <span className="qa__sprint-flag"><Zap size={12} /> Launch</span>
    </div>
  )
}

function SystemScreen() {
  const layers = ['Interface', 'Logic & APIs', 'Database', 'Cloud']
  return (
    <div className="qa__screen qa__screen--system">
      {layers.map((l, i) => (
        <span key={l} className="qa__layer" style={{ '--i': i }}>
          <i />{l}<CheckCircle2 size={13} />
        </span>
      ))}
    </div>
  )
}

function CallScreen() {
  const [secs, setSecs] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setSecs((s) => (s + 1) % 1800), 1000)
    return () => clearInterval(t)
  }, [])
  const mm = String(Math.floor(secs / 60)).padStart(2, '0')
  const ss = String(secs % 60).padStart(2, '0')
  return (
    <div className="qa__screen qa__screen--call">
      <div className="qa__call-people">
        <span className="qa__avatar">P</span>
        <span className="qa__wave">{Array.from({ length: 7 }, (_, i) => <i key={i} style={{ '--i': i }} />)}</span>
        <span className="qa__avatar qa__avatar--lime">N</span>
      </div>
      <div className="qa__call-meta"><i /> Live · {mm}:{ss}</div>
    </div>
  )
}

const screens = { sprint: SprintScreen, system: SystemScreen, call: CallScreen }

// The studio is open around the clock; the sign shows the live India time
const IST = { timeZone: 'Asia/Kolkata' }
// Letters of "STUDIO OPEN" that misbehave like loose neon tubes (index -> fault style)
// the final N has come loose and hangs from one corner
const NEON_FAULTY = { 2: 'is-faulty-a', 4: 'is-faulty-c', 8: 'is-faulty-b', 10: 'is-hanging' }
const studioTime = (now) =>
  new Intl.DateTimeFormat('en-IN', { ...IST, hour: '2-digit', minute: '2-digit', hour12: true }).format(now)

const founders = [
  {
    initials: 'PM',
    name: 'Prajwal M P',
    role: 'Full-Stack & Automation',
    phone: '+91 8618176469',
    raw: '918618176469',
    strap: 'lime',
    id: 'LV-001',
  },
  {
    initials: 'NK',
    name: 'Nikhil K',
    role: 'Mobile & Systems',
    phone: '+91 7994162314',
    raw: '917994162314',
    strap: 'ink',
    id: 'LV-002',
  },
]

// Founder ID badge on a lanyard; a click anywhere on it turns it over.
// A flat squeeze-and-swap turn (not 3D) so every part of the card stays clickable.
function Badge({ f, i }) {
  const [flipped, setFlipped] = useState(false)
  const [turning, setTurning] = useState(false)
  const first = f.name.split(' ')[0]

  const turn = () => {
    if (turning) return
    setTurning(true)
    setTimeout(() => setFlipped((v) => !v), 170)
    setTimeout(() => setTurning(false), 340)
  }

  return (
    <div className={`pass__badge-wrap pass__badge-wrap--${i}`}>
      <span className={`pass__strap pass__strap--${f.strap}`} />
      <span className="pass__clip" />
      <div
        className={`pass__badge ${flipped ? 'is-back' : ''} ${turning ? 'is-turning' : ''}`}
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={flipped ? `Turn ${f.name}'s badge back` : `Show ways to reach ${f.name}`}
        onClick={turn}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); turn() } }}
      >
        {flipped ? (
          <div className="pass__face pass__face--back">
            <span className="pass__badge-top">Reach {first}</span>
            <a
              className="pass__action pass__action--wa"
              href={`https://wa.me/${f.raw}?text=${encodeURIComponent(`Hi ${first}, I'd like to discuss a project with LIVORA.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <MessageCircle size={15} /> WhatsApp
            </a>
            <a className="pass__action" href={`tel:+${f.raw}`} onClick={(e) => e.stopPropagation()}>
              <Phone size={15} /> {f.phone}
            </a>
            <span className="pass__flip-back">tap card to flip back</span>
          </div>
        ) : (
          <div className="pass__face pass__face--front">
            <span className="pass__badge-top">LIVORA <small>crew</small></span>
            <span className="pass__photo">{f.initials}</span>
            <b className="pass__name">{f.name}</b>
            <span className="pass__role">{f.role}</span>
            <span className="pass__barcode" aria-hidden="true">
              {Array.from({ length: 22 }, (_, k) => <i key={k} style={{ flexGrow: [1, 2, 1, 3, 1, 2, 2, 1][k % 8] }} />)}
            </span>
            <span className="pass__id">{f.id} · tap to flip</span>
          </div>
        )}
      </div>
    </div>
  )
}

// Types the WhatsApp opener letter by letter, then loops
function TypedLine({ text }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setN((v) => (v >= text.length + 24 ? 0 : v + 1)), n >= text.length ? 90 : 45)
    return () => clearTimeout(t)
  }, [n, text])
  return <>{text.slice(0, n)}<i className="pass__caret" /></>
}

function StudioPass() {
  const [now, setNow] = useState(() => new Date())
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 20000)
    return () => clearInterval(t)
  }, [])
  const time = studioTime(now)
  const email = 'prajwalnair2603@gmail.com'

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <div className="contact__info-card glass-card pass">
      {/* Neon studio sign with live India time */}
      <div className="pass__sign is-open">
        {/* Each letter is its own tube; a few are "faulty" and drop out on their own */}
        <span className="pass__neon" aria-label="Studio open">
          {'Studio open'.split('').map((ch, i) => (
            <span key={i} className={`pass__tube ${NEON_FAULTY[i] || ''}`} aria-hidden="true">
              {ch === ' ' ? '\u00a0' : ch}
            </span>
          ))}
        </span>
        <span className="pass__clock">
          <b>{time}</b> IST
          <small>Open 24/7 · reach us anytime</small>
        </span>
      </div>

      <p className="pass__lead">Direct access to the founders.</p>

      {/* Founder badges hanging from the rail */}
      <div className="pass__rail" aria-hidden="true" />
      <div className="pass__badges">
        {founders.map((f, i) => <Badge key={f.id} f={f} i={i} />)}
      </div>

      {/* Email with one-tap copy */}
      <div className="pass__email">
        <Mail size={16} />
        <a href={`mailto:${email}`}>{email}</a>
        <button type="button" onClick={copyEmail} className={copied ? 'is-copied' : ''}>
          {copied ? <><CheckCircle2 size={13} /> Copied</> : 'Copy'}
        </button>
      </div>

      {/* WhatsApp: a message already being typed */}
      <a
        className="pass__chat"
        href="https://wa.me/918618176469?text=Hi%20LIVORA!%20I'd%20like%20to%20discuss%20a%20project."
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="pass__bubble"><TypedLine text="Hi LIVORA! I'd like to discuss a project…" /></span>
        <span className="pass__send">Send on WhatsApp <ArrowRight size={16} /></span>
      </a>

      <div className="pass__perks">
        <span><CheckCircle2 size={14} /> Free strategy session</span>
        <span><CheckCircle2 size={14} /> Interactive prototypes</span>
      </div>
    </div>
  )
}



export default function Contact({ showHeader = true }) {
  const [ref, inView] = useInView()
  const [form, setForm] = useState({
    name: '', business: '', email: '', phone: '', service: '', message: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // The form sends through WhatsApp or the visitor's email app, whichever button they press
  const handleSubmit = (e) => {
    e.preventDefault()
    const details = `Name: ${form.name}\nBusiness: ${form.business}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service}\nMessage: ${form.message}`
    if (e.nativeEvent.submitter?.value === 'email') {
      const subject = `Project enquiry from ${form.name}${form.business ? ` (${form.business})` : ''}`
      const body = `Hi LIVORA,\n\nI'd like to discuss a project.\n\n${details}`
      window.location.href = `mailto:prajwalnair2603@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      return
    }
    const whatsappMsg = `Hi LIVORA! I'd like to discuss a project.\n\n${details}`
    window.open(`https://wa.me/918618176469?text=${encodeURIComponent(whatsappMsg)}`, '_blank')
  }

  return (
    <section id="contact" className="section contact" ref={ref}>
      <div className="contact__bg">
        <div className="contact__bg-grid" />
        <div className="contact__bg-glow contact__bg-glow--1" />
        <div className="contact__bg-glow contact__bg-glow--2" />
      </div>

      <div className="container">
        {/* The Contact page already shows this heading in its page header */}
        {showHeader && (
          <motion.div
            className="section-header"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.div className="section-badge" variants={fadeInUp} transition={{ duration: 0.5 }}>
              <Sparkles size={14} /> Get In Touch
            </motion.div>
            <motion.h2 className="section-title contact__title" variants={fadeInUp} transition={{ duration: 0.5 }}>
              Let's Build Something<br />
              <span className="contact__title-accent">Extraordinary.</span>
            </motion.h2>
            <motion.p className="section-subtitle" variants={fadeInUp} transition={{ duration: 0.5 }}>
              Have an idea, an operational bottleneck, or a project to launch? Connect directly with the developers.
            </motion.p>
          </motion.div>
        )}

        {/* Quick action cards */}
        <motion.div
          className="contact__quick-actions"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {quickActions.map((action) => {
            const Icon = action.icon
            const Screen = screens[action.key]
            return (
              <motion.a
                key={action.label}
                href={`https://wa.me/918618176469?text=${encodeURIComponent(action.message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`contact__quick-card glass-card ${action.featured ? 'is-featured ink' : ''}`}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
              >
                {action.featured && <span className="qa__ribbon">Most chosen</span>}
                <Screen />
                <div className="qa__body">
                  <div className="contact__quick-top">
                    <span className="qa__icon"><Icon size={16} /></span>
                    <span className="contact__card-tag">{action.tag}</span>
                  </div>
                  <h4 className="contact__quick-title">{action.label}</h4>
                  <p className="contact__quick-desc">{action.desc}</p>
                </div>
                {/* Tear-off stub with the call to action */}
                <div className="qa__stub">
                  <span>{action.cta}</span>
                  <span className="qa__go"><ArrowRight size={16} /></span>
                </div>
              </motion.a>
            )
          })}
        </motion.div>

        <motion.div
          className="contact__wrapper"
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Contact Form with Framer Motion whileHover */}
          {/* data-plain-cursor: no custom cursor or hover motion while filling in the form */}
          <motion.form
            className="contact__form glass-card"
            onSubmit={handleSubmit}
            data-plain-cursor
          >
            <div className="contact__form-bg-gradient" />
            <div className="contact__form-header">
              <h3>Send us a message</h3>
              <p>Fill out the form and we'll get back to you within 24 hours.</p>
            </div>

            <div className="contact__form-grid">
              <div className="contact__field">
                <label htmlFor="name" className="contact__label">Name</label>
                <input type="text" id="name" name="name" className="contact__input" placeholder="Your name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="contact__field">
                <label htmlFor="business" className="contact__label">Business</label>
                <input type="text" id="business" name="business" className="contact__input" placeholder="Your business name" value={form.business} onChange={handleChange} />
              </div>
              <div className="contact__field">
                <label htmlFor="email" className="contact__label">Email</label>
                <input type="email" id="email" name="email" className="contact__input" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
              </div>
              <div className="contact__field">
                <label htmlFor="phone" className="contact__label">Phone</label>
                <input type="tel" id="phone" name="phone" className="contact__input" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} />
              </div>
            </div>

            <div className="contact__field">
              <label htmlFor="service" className="contact__label">Service Required</label>
              <input
                type="text"
                id="service"
                name="service"
                list="service-options-list"
                className="contact__input contact__datalist-input"
                placeholder="Choose a service or type your custom requirement..."
                value={form.service}
                onChange={handleChange}
                autoComplete="off"
                required
              />
              <datalist id="service-options-list">
                {serviceOptions.map(opt => (
                  <option key={opt} value={opt} />
                ))}
              </datalist>
            </div>

            <div className="contact__field">
              <label htmlFor="message" className="contact__label">Message</label>
              <textarea id="message" name="message" className="contact__input contact__textarea" placeholder="Tell us about your project or idea..." rows={4} value={form.message} onChange={handleChange} required />
            </div>

            <div className="contact__submit-row">
              <button type="submit" value="whatsapp" className="btn btn-primary btn-lg contact__submit">
                Send on WhatsApp <ArrowRight size={18} className="btn-arrow" />
              </button>
              <button type="submit" value="email" className="btn btn-secondary btn-lg contact__submit">
                Send by Email <Mail size={18} />
              </button>
            </div>
          </motion.form>

          {/* Right Column: Creative "Available for Projects" Container with Framer Motion whileHover */}
          <div className="contact__info">
            <StudioPass />

            {/* Quick Stat Card with Framer Motion whileHover */}
            <motion.div
              className="contact__info-stat glass-card ink"
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="contact__sla-dial" aria-hidden="true">
                <svg viewBox="0 0 100 100">
                  <circle className="contact__sla-track" cx="50" cy="50" r="43" />
                  <circle className="contact__sla-arc" cx="50" cy="50" r="43" pathLength="100" />
                  {Array.from({ length: 12 }, (_, i) => (
                    <line
                      key={i}
                      className="contact__sla-tick"
                      x1="50"
                      y1="13"
                      x2="50"
                      y2={i % 3 === 0 ? 21 : 17}
                      transform={`rotate(${i * 30} 50 50)`}
                    />
                  ))}
                  <line className="contact__sla-hand contact__sla-hand--hour" x1="50" y1="50" x2="50" y2="32" />
                  <line className="contact__sla-hand contact__sla-hand--minute" x1="50" y1="50" x2="50" y2="22" />
                  <circle className="contact__sla-pin" cx="50" cy="50" r="3.5" />
                </svg>
              </div>
              <div className="contact__sla-body">
                <span className="contact__sla-kicker">First response</span>
                <div className="contact__sla-number">
                  <i>&lt;</i>24<small>hrs</small>
                </div>
                <p className="contact__sla-label">
                  Guaranteed First Response & Project Strategy Turnaround
                </p>
              </div>
              <ol className="contact__sla-steps">
                <li>You send an enquiry</li>
                <li>A founder replies</li>
                <li>Strategy call booked</li>
              </ol>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
