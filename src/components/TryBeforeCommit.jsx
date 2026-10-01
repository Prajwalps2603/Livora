import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, MousePointer2 } from 'lucide-react'
import { useInView, fadeInUp, staggerContainer } from '../hooks/useAnimations'
import './SystemUI.css'
import './TryBeforeCommit.css'

const steps = [
  {
    id: 'prototype',
    label: 'Interactive Prototype',
    badge: 'Experience First',
    title: 'Experience The Interface Before Coding Begins',
    desc: 'We build a clickable, interactive preview of your application so you can test user flows, buttons, and layouts before committing to full development.',
    points: [
      'Clickable user journeys & dashboard views',
      'Instant feedback loop for fast refinements',
      'Clear roadmap with zero ambiguous requirements',
    ],
  },
  {
    id: 'evaluation',
    label: 'Working Evaluation Build',
    badge: 'Hands-on Test',
    title: 'Test Core Logic On Your Real Devices',
    desc: 'For eligible projects, we deploy an early test build on your browser or Android phone so your team can test actual functionality in real time.',
    points: [
      'Live staging URL or APK download',
      'Test key operations and real-world inputs',
      'Evaluate performance and responsiveness first-hand',
    ],
  },
  {
    id: 'guarantee',
    label: 'Zero-Risk Decision',
    badge: '100% Confidence',
    title: 'Proceed Only When You Are Completely Satisfied',
    desc: 'Move forward with complete production development with full clarity, agreed milestones, and total confidence in the outcome.',
    points: [
      'No surprise costs or hidden lock-ins',
      'Defined deliverables and guaranteed delivery timelines',
      'Direct communication with Prajwal & Nikhil',
    ],
  },
]

const STEP_MS = 6200

/* Stage 1 — a wireframe you can click through, with feedback pinned to it */
function PrototypeStage() {
  return (
    <div className="sys tbc-stage tbc-proto">
      <div className="sys__bar">
        <span className="sys__dots"><span /><span /><span /></span>
        <span className="sys__url">demo.livora.in/prototype</span>
        <span className="sys-pill tbc-stage__pill">Clickable</span>
      </div>
      <div className="tbc-proto__canvas">
        <div className="tbc-wire tbc-wire--nav"><i /><i /><i /><b /></div>
        <div className="tbc-wire tbc-wire--hero"><i /><i /></div>
        <div className="tbc-wire-row">
          <div className="tbc-wire" />
          <div className="tbc-wire" />
          <div className="tbc-wire" />
        </div>
        <div className="tbc-wire tbc-wire--list"><i /><i /><i /></div>
        <span className="tbc-wire-btn">Save order</span>

        <span className="tbc-hotspot tbc-hotspot--1" />
        <span className="tbc-hotspot tbc-hotspot--2" />
        <span className="tbc-hotspot tbc-hotspot--3" />
        <span className="tbc-cursor"><MousePointer2 size={22} /></span>

        <div className="tbc-feedback">
          <span>Your note</span>
          Move this button up?
        </div>
      </div>
    </div>
  )
}

/* Stage 2 — the same screen, now real, running on staging and on a phone */
function EvaluationStage() {
  return (
    <div className="sys tbc-stage tbc-eval">
      <div className="sys__bar">
        <span className="sys__dots"><span /><span /><span /></span>
        <span className="sys__url">staging.livora.in</span>
        <span className="sys-pill is-lime tbc-stage__pill">Test build</span>
      </div>
      <div className="tbc-eval__canvas">
        <div className="sys-tiles">
          {[['Orders', '128'], ['Invoices', '86'], ['Stock', '92%']].map(([label, value]) => (
            <div className="sys-tile" key={label}>
              <span className="sys-label">{label}</span>
              <span className="sys-value">{value}</span>
            </div>
          ))}
        </div>
        <div className="sys-tile tbc-eval__chart">
          <span className="sys-label">This week</span>
          <div className="sys-bars">
            {[46, 62, 38, 74, 58, 88, 66].map((h, i) => (
              <span key={i} className={i === 5 ? 'is-lime' : ''} style={{ height: `${h}%`, animationDelay: `${0.2 + i * 0.06}s` }} />
            ))}
          </div>
        </div>

        <ul className="tbc-eval__checks">
          <li className="tbc-eval__checks-title">Test run</li>
          {['Login', 'Create order', 'Print invoice'].map((check, i) => (
            <li key={check} style={{ animationDelay: `${0.9 + i * 0.55}s` }}>
              <span><Check size={11} strokeWidth={3.5} /></span>
              {check}
            </li>
          ))}
        </ul>

        <div className="tbc-eval__phone">
          <span className="tbc-eval__phone-notch" />
          <span className="sys-label">APK v0.3</span>
          <strong>128</strong>
          <span className="tbc-eval__phone-row" />
          <span className="tbc-eval__phone-row" />
          <span className="tbc-eval__phone-row" />
          <span className="tbc-eval__phone-cta">New order</span>
        </div>
      </div>
    </div>
  )
}

/* Stage 3 — the sign-off sheet: nothing proceeds until every box is ticked */
function DecisionStage() {
  return (
    <div className="tbc-stage tbc-decision">
      <div className="tbc-sheet">
        <span className="tbc-sheet__pin" />
        <span className="tbc-sheet__kicker">Sign-off sheet</span>
        <h4 className="tbc-sheet__title">Ready to build?</h4>
        <ul>
          {['Scope & deliverables agreed', 'Milestones & timeline fixed', 'No hidden costs or lock-ins'].map((item, i) => (
            <li key={item} style={{ '--d': `${0.4 + i * 0.5}s` }}>
              <span className="tbc-sheet__box"><Check size={13} strokeWidth={3.5} /></span>
              {item}
            </li>
          ))}
        </ul>
        <div className="tbc-sheet__switch">
          <span>Proceed to full build</span>
          <i><b /></i>
        </div>
        <span className="tbc-sheet__stamp">Your call</span>
      </div>
    </div>
  )
}

const stages = { prototype: PrototypeStage, evaluation: EvaluationStage, guarantee: DecisionStage }

export default function TryBeforeCommit() {
  const [ref, inView] = useInView()
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)

  // Steps advance on their own until the visitor picks one
  useEffect(() => {
    if (!inView || !auto) return
    const timer = setTimeout(() => setActive((a) => (a + 1) % steps.length), STEP_MS)
    return () => clearTimeout(timer)
  }, [inView, auto, active])

  const choose = (i) => {
    setAuto(false)
    setActive(i)
  }

  const scrollToContact = (e) => {
    e.preventDefault()
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const step = steps[active]
  const Stage = stages[step.id]

  return (
    <section className="section tbc" ref={ref}>
      <div className="container">
        <motion.div
          className="tbc__head"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div>
            <motion.div className="section-badge" variants={fadeInUp}>Risk-Free Evaluation</motion.div>
            <motion.h2 className="section-title" variants={fadeInUp}>
              See It. Use It. <span className="tbc__title-accent">Then Decide.</span>
            </motion.h2>
          </div>
          <motion.p className="section-subtitle" variants={fadeInUp}>
            We eliminate the uncertainty of software development. For suitable projects, LIVORA can start with an interactive prototype or evaluation build so you can experience the product before committing.
          </motion.p>
        </motion.div>

        <motion.div
          className="tbc__layout"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <ol className="tbc__steps">
            {steps.map((s, i) => {
              const isActive = i === active
              return (
                <li key={s.id} className={`tbc__step ${isActive ? 'is-active' : ''} ${i < active ? 'is-done' : ''}`}>
                  <button type="button" className="tbc__step-head" onClick={() => choose(i)} aria-expanded={isActive}>
                    <span className="tbc__step-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="tbc__step-label">{s.label}</span>
                    <span className="tbc__step-badge">{s.badge}</span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        className="tbc__step-body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <h3>{s.title}</h3>
                        <p>{s.desc}</p>
                        <ul>
                          {s.points.map((pt) => (
                            <li key={pt}>
                              <span><Check size={11} strokeWidth={3.5} /></span>
                              {pt}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {isActive && auto && (
                    <span className="tbc__step-timer" style={{ animationDuration: `${STEP_MS}ms` }} />
                  )}
                </li>
              )
            })}
          </ol>

          <div className="tbc__stage-wrap">
            <span className="tbc__stage-caption">
              Step {String(active + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={step.id}
                className="tbc__stage-motion"
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <Stage />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="tbc__footer">
          <span className="tbc__note">Available for selected business &amp; custom application projects.</span>
          <a href="#contact" className="btn btn-primary btn-lg" onClick={scrollToContact}>
            Discuss Your Idea <ArrowRight size={18} className="btn-arrow" />
          </a>
        </div>
      </div>
    </section>
  )
}
