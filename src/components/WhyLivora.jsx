import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Check, Plus, Store, Database } from 'lucide-react'
import { SiGooglesheets, SiWhatsapp } from 'react-icons/si'
import { useInView, fadeInUp, fadeInScale, staggerContainer } from '../hooks/useAnimations'
import './WhyLivora.css'

/* --- Live mini-screens: each card shows its promise in motion --- */

// 01: your own steps get checked off, one after another
function FitVisual() {
  const steps = ['Your lead flow', 'Your pricing rules', 'Your approval steps']
  return (
    <div className="whyv whyv--fit">
      <div className="whyv__bar"><i /><i /><i /><span>your-workflow.map</span></div>
      {steps.map((step, i) => (
        <div key={step} className="whyv-fit__row" style={{ '--i': i }}>
          <span className="whyv-fit__check"><Check size={11} strokeWidth={3} /></span>
          {step}
        </div>
      ))}
    </div>
  )
}

// 02: a new module drops into the grid beside the existing ones
function ModularVisual() {
  const modules = ['CRM', 'Stock', 'Billing', 'Reports', 'Staff']
  return (
    <div className="whyv whyv--mod">
      {modules.map((m) => <span key={m} className="whyv-mod__tile">{m}</span>)}
      <span className="whyv-mod__slot" />
      <span className="whyv-mod__tile whyv-mod__tile--new"><Plus size={11} strokeWidth={3} /> Payroll</span>
    </div>
  )
}

// 03: usage grows and the system keeps up
function ScaleVisual() {
  const bars = [18, 26, 24, 38, 46, 58, 72, 94]
  return (
    <div className="whyv whyv--scale">
      <div className="whyv-scale__head">
        <span>Active users</span>
        <strong>12.4k</strong>
        <em>+38%</em>
      </div>
      <div className="whyv-scale__bars">
        {bars.map((h, i) => (
          <i key={i} style={{ '--h': `${h}%`, '--i': i }} className={i === bars.length - 1 ? 'is-peak' : ''} />
        ))}
      </div>
    </div>
  )
}

// 04: data flows from everyday tools into one core
const sources = [
  { key: 'sheets', Icon: SiGooglesheets, label: 'Sheets', x: 30, y: 26 },
  { key: 'wa', Icon: SiWhatsapp, label: 'WhatsApp', x: 210, y: 26 },
  { key: 'pos', Icon: Store, label: 'POS', x: 30, y: 104 },
  { key: 'db', Icon: Database, label: 'Records', x: 210, y: 104 },
]

function ConnectVisual() {
  return (
    <div className="whyv whyv--connect">
      <svg viewBox="0 0 240 130" preserveAspectRatio="none" className="whyv-connect__lines" aria-hidden="true">
        {sources.map((s, i) => {
          const d = `M${s.x} ${s.y} L120 65`
          return (
            <g key={s.key}>
              <path d={d} />
              <circle r="3">
                <animateMotion dur="1.8s" begin={`${i * 0.45}s`} repeatCount="indefinite" path={d} />
              </circle>
            </g>
          )
        })}
      </svg>
      {sources.map(({ key, Icon, label, x, y }) => (
        <span key={key} className="whyv-connect__node" style={{ left: `${(x / 240) * 100}%`, top: `${(y / 130) * 100}%` }} title={label}>
          <Icon size={14} />
        </span>
      ))}
      <span className="whyv-connect__core" aria-hidden="true">
        <svg width="18" height="18" viewBox="4 5 24 23">
          <path d="M6 15.5 26.5 6.5 19.5 25.5 16.4 18.6Z" fill="currentColor" />
          <path d="M5 26.5c4.2-.4 8-2 10.6-5.6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </span>
    </div>
  )
}

const reasons = [
  {
    title: 'Built Around You',
    desc: 'We deeply analyze your business workflows, pain points, and team habits before writing a single line of code.',
    tag: 'Custom-Engineered',
    Visual: FitVisual,
  },
  {
    title: 'Flexible & Modular',
    desc: 'No rigid, closed ecosystems. Your custom system evolves dynamically as your operations expand and scale.',
    tag: 'Agile Architecture',
    Visual: ModularVisual,
  },
  {
    title: 'Highly Scalable',
    desc: 'Start lean with the core tools you need today, and effortlessly scale up to enterprise-level workloads tomorrow.',
    tag: 'Cloud-Ready',
    Visual: ScaleVisual,
    ink: true,
  },
  {
    title: 'Seamlessly Connected',
    desc: 'Bring spreadsheets, databases, WhatsApp alerts, POS, and customer records into one single unified platform.',
    tag: '100% Unified',
    Visual: ConnectVisual,
  },
]

export default function WhyLivora() {
  const [ref, inView] = useInView()

  return (
    <section className="section why-livora" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div className="section-badge" variants={fadeInUp} transition={{ duration: 0.5 }}>
            <Sparkles size={14} /> Why LIVORA
          </motion.div>
          <motion.h2 className="section-title" variants={fadeInUp} transition={{ duration: 0.5 }}>
            Your Business Is Unique.<br />
            <span className="why__title-accent">Your Software Should Be Too.</span>
          </motion.h2>
          <motion.p className="section-subtitle" variants={fadeInUp} transition={{ duration: 0.5 }}>
            Generic off-the-shelf software forces you to change your workflow. LIVORA builds software that adapts to you.
          </motion.p>
        </motion.div>

        {/* The mini-screens only animate once the section is on screen */}
        <motion.div
          className={`why__grid ${inView ? 'is-live' : ''}`}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {reasons.map(({ title, desc, tag, Visual, ink }, i) => (
            <motion.article
              key={title}
              className={`why__card glass-card ${ink ? 'why__card--ink ink' : ''}`}
              variants={fadeInScale}
            >
              <Visual />

              <div className="why__card-meta">
                <span className="why__card-num">{String(i + 1).padStart(2, '0')}<small>/{String(reasons.length).padStart(2, '0')}</small></span>
                <span className="why__card-tag">{tag}</span>
              </div>

              <h3 className="why__card-title">{title}</h3>
              <p className="why__card-desc">{desc}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
