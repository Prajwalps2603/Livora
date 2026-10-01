import React from 'react'
import { motion } from 'framer-motion'
import { Layers, CheckCircle2, XCircle, ArrowRight, UserCheck, Cpu, Sparkles } from 'lucide-react'
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '../hooks/useAnimations'
import './PhilosophyView.css'

const philosophyTenets = [
  {
    title: 'Human Habits Dictate The Software',
    desc: 'We never force your team to rewire how they think. We study your natural business operations and engineer digital tools that feel second-nature from day one.',
    icon: UserCheck,
    color: 'var(--color-accent)',
  },
  {
    title: 'Precision Architecture Over SaaS Bloat',
    desc: 'Generic SaaS solutions burden you with 80% features you never touch. We build lean, purposeful applications containing exactly what you need to operate at peak efficiency.',
    icon: Cpu,
    color: 'var(--color-accent)',
  },
  {
    title: 'Continuous Evolution Over Rigid Milestones',
    desc: 'Business is dynamic. Your software foundation should evolve smoothly alongside new revenue opportunities, expanding teams, and shifting market landscapes.',
    icon: Sparkles,
    color: 'var(--color-accent)',
  },
]

export default function PhilosophyView() {
  return (
    <div className="philosophy-view container">
      {/* 1. Philosophy Hero Banner */}
      <motion.div
        className="philosophy-hero-box glass-card"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="philosophy-hero-glow" />
        <div className="section-badge">
          <Layers size={14} /> Core Architectural Philosophy
        </div>
        <h2 className="philosophy-hero-title">
          Technology Should <span className="text-gradient">Adapt To You.</span>
        </h2>
        <p className="philosophy-hero-lead">
          We reject the premise that businesses must change their workflow to match off-the-shelf software. We understand the workflow first — then build custom software around it.
        </p>
      </motion.div>

      {/* 2. Visual Paradigm Shift: Traditional vs LIVORA */}
      <div className="philosophy-comparison-section">
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={14} /> The Paradigm Shift
          </div>
          <h3 className="section-title">The Legacy Model vs The LIVORA Way</h3>
          <p className="section-subtitle">
            Why custom-built solutions outperform generic off-the-shelf software every single time.
          </p>
        </div>

        <div className="philosophy-comparison-grid">
          {/* Traditional Legacy Approach */}
          <motion.div
            className="philosophy-compare-card philosophy-compare-card--legacy glass-card"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="philosophy-compare-header">
              <span className="philosophy-compare-tag philosophy-compare-tag--legacy">Traditional SaaS Paradigm</span>
              <h4 className="philosophy-compare-title">Rigid, Off-the-Shelf Templates</h4>
            </div>

            <div className="philosophy-compare-flow">
              <span className="philosophy-flow-node">Your Business</span>
              <span className="philosophy-flow-arrow">→</span>
              <span className="philosophy-flow-node philosophy-flow-node--error">Forced Process Overhaul</span>
              <span className="philosophy-flow-arrow">→</span>
              <span className="philosophy-flow-node philosophy-flow-node--error">Frustrated Team & Bloat</span>
            </div>

            <ul className="philosophy-compare-list">
              <li>
                <XCircle size={17} className="philosophy-icon--error" />
                <span>Expensive monthly licenses for unused features</span>
              </li>
              <li>
                <XCircle size={17} className="philosophy-icon--error" />
                <span>Weeks of tedious team retraining and resistance</span>
              </li>
              <li>
                <XCircle size={17} className="philosophy-icon--error" />
                <span>Vendor lock-in and zero code ownership</span>
              </li>
              <li>
                <XCircle size={17} className="philosophy-icon--error" />
                <span>Cumbersome workarounds for missing capabilities</span>
              </li>
            </ul>
          </motion.div>

          <div className="philosophy-vs-divider">VS</div>

          {/* The LIVORA Approach */}
          <motion.div
            className="philosophy-compare-card philosophy-compare-card--livora glass-card"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="philosophy-compare-header">
              <span className="philosophy-compare-tag philosophy-compare-tag--livora">The LIVORA Paradigm</span>
              <h4 className="philosophy-compare-title">Precision Custom Engineering</h4>
            </div>

            <div className="philosophy-compare-flow">
              <span className="philosophy-flow-node">Your Business</span>
              <span className="philosophy-flow-arrow">→</span>
              <span className="philosophy-flow-node philosophy-flow-node--success">Deep Workflow Discovery</span>
              <span className="philosophy-flow-arrow">→</span>
              <span className="philosophy-flow-node philosophy-flow-node--success">Tailored High-Speed Software</span>
            </div>

            <ul className="philosophy-compare-list">
              <li>
                <CheckCircle2 size={17} className="philosophy-icon--success" />
                <span>100% custom-built for your exact daily operations</span>
              </li>
              <li>
                <CheckCircle2 size={17} className="philosophy-icon--success" />
                <span>Instant team adoption with zero operational friction</span>
              </li>
              <li>
                <CheckCircle2 size={17} className="philosophy-icon--success" />
                <span>Complete intellectual property and code ownership</span>
              </li>
              <li>
                <CheckCircle2 size={17} className="philosophy-icon--success" />
                <span>Direct developer collaboration with co-founders</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* 3. Three Guiding Tenets */}
      <div className="philosophy-tenets-section">
        <motion.div
          className="philosophy-tenets-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {philosophyTenets.map((t) => {
            const IconComponent = t.icon
            return (
              <motion.div
                key={t.title}
                className="philosophy-tenet-card glass-card"
                variants={fadeInUp}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.25 }}
                style={{ '--tenet-color': t.color }}
              >
                <div
                  className="philosophy-tenet-icon"
                  style={{ background: 'var(--tint)', color: t.color }}
                >
                  <IconComponent size={24} />
                </div>
                <h4 className="philosophy-tenet-title">{t.title}</h4>
                <p className="philosophy-tenet-desc">{t.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
