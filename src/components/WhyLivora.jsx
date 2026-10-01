import React from 'react'
import { motion } from 'framer-motion'
import { UserCheck, Repeat, TrendingUp, Cpu, Sparkles, CheckCircle2 } from 'lucide-react'
import { useInView, fadeInUp, fadeInScale, staggerContainer } from '../hooks/useAnimations'
import './WhyLivora.css'

const reasons = [
  {
    icon: UserCheck,
    title: 'Built Around You',
    desc: 'We deeply analyze your business workflows, pain points, and team habits before writing a single line of code.',
    color: 'var(--color-accent)',
    tag: 'Custom-Engineered',
    bgGradient: 'none',
    borderGlow: 'var(--color-border)',
  },
  {
    icon: Repeat,
    title: 'Flexible & Modular',
    desc: 'No rigid, closed ecosystems. Your custom system evolves dynamically as your operations expand and scale.',
    color: 'var(--color-accent)',
    tag: 'Agile Architecture',
    bgGradient: 'none',
    borderGlow: 'var(--color-border)',
  },
  {
    icon: TrendingUp,
    title: 'Highly Scalable',
    desc: 'Start lean with the core tools you need today, and effortlessly scale up to enterprise-level workloads tomorrow.',
    color: 'var(--color-accent)',
    tag: 'Cloud-Ready',
    bgGradient: 'none',
    borderGlow: 'var(--color-border)',
  },
  {
    icon: Cpu,
    title: 'Seamlessly Connected',
    desc: 'Bring spreadsheets, databases, WhatsApp alerts, POS, and customer records into one single unified platform.',
    color: 'var(--color-accent)',
    tag: '100% Unified',
    bgGradient: 'none',
    borderGlow: 'var(--color-border)',
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

        <motion.div
          className="why__grid"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {reasons.map((r) => {
            const Icon = r.icon
            return (
              <motion.div
                key={r.title}
                className="why__card glass-card"
                variants={fadeInScale}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  '--card-accent': r.color,
                  '--card-glow': r.borderGlow,
                }}
              >  {/* Custom Gradient Backdrop */}
                <div
                  className="why__card-bg-gradient"
                  style={{ background: r.bgGradient }}
                />

                {/* Watermark Illustration */}
                <div className="why__card-watermark">
                  <Icon size={110} />
                </div>

                <div className="why__card-top">
                  <div
                    className="why__card-icon"
                    style={{ background: 'var(--tint)', color: r.color }}
                  >
                    <Icon size={26} />
                  </div>
                  <span className="why__card-tag" style={{ color: r.color, background: 'var(--tint)' }}>
                    {r.tag}
                  </span>
                </div>

                <h3 className="why__card-title">{r.title}</h3>
                <p className="why__card-desc">{r.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
