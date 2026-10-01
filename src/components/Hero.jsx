import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import './SystemUI.css'
import './Hero.css'

const noteLines = ['Customers & leads', 'Stock & orders', 'Billing & invoices', 'Staff approvals', 'Reports']

const stages = ['Architecture', 'Database', 'API', 'Frontend', 'Dashboard', 'Mobile', 'Cloud', 'Production']

const headline = [['From', 'problem'], ['to', 'working'], ['software.']]

const nav = ['Overview', 'Customers', 'Inventory', 'Approvals', 'Reports']

const tiles = [
  { label: 'Customers', value: '512', status: 'Synced' },
  { label: 'Branches', value: '3', status: 'All online' },
  { label: 'Approvals', value: '4', status: 'Pending' },
]

const bars = [72, 54, 86, 38, 64, 90, 48]

const reports = [['Monthly', 100], ['Branch audit', 62]]

export default function Hero() {
  // The system on the right builds itself one stage at a time, then loops
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const last = stages.length - 1
    const timer = setTimeout(
      () => setStage((s) => (s === last ? 0 : s + 1)),
      stage === last ? 4600 : 900,
    )
    return () => clearTimeout(timer)
  }, [stage])

  const scrollTo = (selector) => (e) => {
    e.preventDefault()
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const stageClasses = stages.map((_, i) => (stage >= i ? `s${i}` : '')).join(' ')
  let wordIndex = 0

  return (
    <section id="home" className="hero">
      <div className="hero__grid-bg" aria-hidden="true" />

      <div className="container hero__container">
        <div className="hero__content">
          <motion.span
            className="hero__eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Custom software &amp; digital studio
          </motion.span>

          {/* The brief, as a client would scribble it */}
          <motion.div
            className="hero__note-wrap"
            initial={{ opacity: 0, y: 30, rotate: -8 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero__note">
              <span className="hero__note-pin" />
              <p className="hero__note-title">Need a system for:</p>
              <ul>
                {noteLines.map((line, i) => (
                  <li key={line} style={{ '--i': i }}>
                    <span>· {line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <svg className="hero__note-arrow" viewBox="0 0 240 150" fill="none" aria-hidden="true">
              <path d="M2 6 C 70 0, 110 40, 130 78 S 190 138, 236 142" />
              <path className="hero__note-arrow-head" d="M222 132 L237 142 L221 149" />
              <circle className="hero__note-arrow-dot" r="4.5">
                <animateMotion
                  dur="2.6s"
                  repeatCount="indefinite"
                  path="M2 6 C 70 0, 110 40, 130 78 S 190 138, 236 142"
                />
              </circle>
            </svg>
          </motion.div>

          <h1 className="hero__title">
            {headline.map((line, li) => (
              <span className="hero__title-line" key={li}>
                {line.map((word) => {
                  const i = wordIndex++
                  return (
                    <span className="hero__word-mask" key={word}>
                      <motion.span
                        className="hero__word"
                        initial={{ y: '110%' }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.9, delay: 0.45 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {word}
                      </motion.span>
                    </span>
                  )
                })}
              </span>
            ))}
          </h1>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95 }}
          >
            You bring the problem. We build the solution. Custom web applications, Android apps
            and internal business systems designed around the way you work.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
          >
            <a href="#contact" className="btn btn-primary btn-lg" onClick={scrollTo('#contact')}>
              Start a Project <ArrowRight size={18} className="btn-arrow" />
            </a>
            <a href="#work" className="btn btn-secondary btn-lg" onClick={scrollTo('#work')}>
              Explore Our Work
            </a>
          </motion.div>
        </div>

        {/* The system, assembling itself */}
        <motion.div
          className={`hero__build ${stageClasses}`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero__device">
            <span className="hero__device-live" />

            <div className="sys hero__window">
              <div className="sys__bar">
                <span className="sys__dots"><span /><span /><span /></span>
                <span className="sys__url hero__url">ops.yourbusiness.app</span>
                <span className="sys-pill is-lime hero__live-pill">Live</span>
              </div>
              <div className="sys__body">
                <aside className="sys__side">
                  <span className="sys__side-title">Operations</span>
                  {nav.map((item, i) => (
                    <span key={item} className={`sys__nav hero__nav ${i === 0 ? 'is-active' : ''}`}>
                      <b>{item}</b>
                    </span>
                  ))}
                </aside>
                <div className="sys__main">
                  <div className="sys__top">
                    <span className="sys__skeleton" />
                    <span className="sys__toggles hero__toggles"><span /><span /><span /></span>
                  </div>

                  <div className="sys-tiles">
                    {tiles.map((tile) => (
                      <div className="sys-tile hero__wire" key={tile.label}>
                        <span className="sys-label">{tile.label}</span>
                        <span className="sys-value hero__value">{tile.value}</span>
                        <span className="sys-status hero__status">{tile.status}</span>
                      </div>
                    ))}
                  </div>

                  <div className="hero__panels">
                    <div className="sys-tile hero__wire">
                      <span className="sys-label">Inventory by branch</span>
                      <div className="sys-bars hero__bars">
                        {bars.map((h, i) => (
                          <span key={i} className={i === 3 ? 'is-lime' : ''} style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                    <div className="sys-tile hero__wire">
                      <span className="sys-label">Reports</span>
                      {reports.map(([name, pct]) => (
                        <div className="sys-progress" key={name}>
                          <div className="sys-progress__head">
                            <span>{name}</span>
                            <small>{pct}%</small>
                          </div>
                          <div className="sys-progress__track hero__track">
                            <i style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero__phone">
              <span className="hero__phone-notch" />
              <span className="hero__phone-title">Approvals</span>
              <span className="hero__phone-item">PO-2291</span>
              <span className="hero__phone-item">Leave · A. Rao</span>
              <span className="hero__phone-item">Transfer · B12</span>
              <span className="hero__phone-cta">Approve</span>
            </div>
          </div>

          <ol className="hero__stages">
            {stages.map((name, i) => (
              <li
                key={name}
                className={`${stage > i ? 'is-done' : ''} ${stage === i ? 'is-active' : ''}`}
              >
                {name}
              </li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  )
}
