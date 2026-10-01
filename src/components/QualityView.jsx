import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, CheckCircle2, Zap, Smartphone, Code2, Users, Eye, Sparkles } from 'lucide-react'
import { fadeInUp, staggerContainer } from '../hooks/useAnimations'
import './QualityView.css'

const qualityStandards = [
  {
    num: '01',
    icon: Code2,
    tag: 'Architectural Rigor',
    title: 'Zero Technical Debt Codebase',
    desc: 'Clean, modern ES6+/TypeScript architectures with modular components, strict linting standards, and comprehensive separation of concerns.',
    impact: 'Effortless maintainability & zero developer friction',
    color: 'var(--color-accent)',
  },
  {
    num: '02',
    icon: Zap,
    tag: 'Performance Engineering',
    title: 'Sub-Second Speeds & 60fps Fluidity',
    desc: 'Optimized asset delivery, lightweight bundle footprints, and gpu-accelerated transitions that ensure instant response across desktop and mobile.',
    impact: 'Sub-800ms load times & butter-smooth micro-animations',
    color: 'var(--color-accent)',
  },
  {
    num: '03',
    icon: Smartphone,
    tag: 'Multi-Device QA',
    title: 'Flawless Cross-Platform Testing',
    desc: 'Every web application, dashboard, and Android layout undergoes rigorous cross-browser testing across diverse viewports, resolutions, and OS environments.',
    impact: 'Zero layout breakage & 100% responsive integrity',
    color: 'var(--color-accent)',
  },
  {
    num: '04',
    icon: Eye,
    tag: 'Milestone Transparency',
    title: 'The Try-Before-Commit Guarantee',
    desc: 'We provide working interactive staging prototypes and sandbox builds before final milestone sign-off, eliminating risk and ensuring total alignment.',
    impact: '100% risk-free evaluation & zero surprises',
    color: 'var(--color-accent)',
  },
  {
    num: '05',
    icon: Users,
    tag: 'Direct Accountability',
    title: 'Founder-Level Code Review & Access',
    desc: 'No junior handoffs or opaque project management layers. Co-founders Prajwal M P and Nikhil K personally architect, review, and deliver every project.',
    impact: 'Direct engineer access & genuine ownership',
    color: 'var(--color-accent)',
  },
]

export default function QualityView() {
  return (
    <div className="quality-view container">
      {/* 1. Quality Hero Banner */}
      <motion.div
        className="quality-hero-box glass-card"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="quality-hero-glow" />
        <div className="section-badge">
          <ShieldCheck size={14} /> Engineering Standards
        </div>
        <h2 className="quality-hero-title">
          Our Commitment to <span className="text-gradient">Uncompromising Quality.</span>
        </h2>
        <p className="quality-hero-lead">
          We don't build quick, brittle disposable software. We craft resilient, high-speed digital systems engineered for long-term operational success.
        </p>

        <div className="quality-pills">
          <span className="quality-pill">✦ Clean Modular Architecture</span>
          <span className="quality-pill">✦ 60fps Micro-Animations</span>
          <span className="quality-pill">✦ Try-Before-Commit Guarantee</span>
          <span className="quality-pill">✦ Direct Founder Accountability</span>
        </div>
      </motion.div>

      {/* 2. Five Engineering Standards Grid */}
      <div className="quality-standards-section">
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={14} /> Rigorous Standards
          </div>
          <h3 className="section-title">5 Guarantees of LIVORA Engineering</h3>
          <p className="section-subtitle">
            How we ensure every deliverable meets the highest bar of speed, security, and aesthetics.
          </p>
        </div>

        <motion.div
          className="quality-standards-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {qualityStandards.map((std) => {
            const IconComponent = std.icon
            return (
              <motion.div
                key={std.num}
                className="quality-standard-card glass-card"
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.25 }}
                style={{ '--std-theme': std.color }}
              >
                <div className="quality-standard-top">
                  <span className="quality-standard-num">{std.num}</span>
                  <div
                    className="quality-standard-icon-wrap"
                    style={{ background: 'var(--tint)', color: std.color }}
                  >
                    <IconComponent size={22} />
                  </div>
                  <span
                    className="quality-standard-badge"
                    style={{ background: 'var(--tint)', color: std.color, borderColor: 'var(--tint)' }}
                  >
                    {std.tag}
                  </span>
                </div>

                <h4 className="quality-standard-title">{std.title}</h4>
                <p className="quality-standard-desc">{std.desc}</p>

                <div className="quality-standard-impact">
                  <CheckCircle2 size={16} style={{ color: std.color }} />
                  <span>{std.impact}</span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
