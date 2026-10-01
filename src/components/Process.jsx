import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Map,
  PenTool,
  Code2,
  Rocket,
  Headphones,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
} from 'lucide-react'
import { useInView, fadeInUp, staggerContainer } from '../hooks/useAnimations'
import ProblemSolution from './ProblemSolution'
import './Process.css'

const steps = [
  {
    num: '01',
    title: 'Discover & Understand',
    desc: 'We dive deep into your workflow, pain points, business goals, and tech requirements.',
    icon: Search,
    phase: 'Phase 1: Research',
    duration: 'Days 1 – 3',
    deliverables: ['Workflow Audit', 'Requirement Specification', 'Scope Definition'],
    color: 'var(--color-accent)',
    bgGradient: 'none',
    borderGlow: 'var(--color-border)',
  },
  {
    num: '02',
    title: 'Architecture & Strategy',
    desc: 'We design the technical blueprint, database schemas, API specs, and project milestones.',
    icon: Map,
    phase: 'Phase 2: Planning',
    duration: 'Days 4 – 7',
    deliverables: ['System Architecture', 'Database Schema', 'Project Timeline'],
    color: 'var(--color-accent)',
    bgGradient: 'none',
    borderGlow: 'var(--color-border)',
  },
  {
    num: '03',
    title: 'UI/UX & Prototyping',
    desc: 'Interactive wireframes and Apple-inspired modern UI designs for seamless user experience.',
    icon: PenTool,
    phase: 'Phase 3: Design',
    duration: 'Week 2',
    deliverables: ['Figma Prototypes', 'Design System', 'Client Feedback Review'],
    color: 'var(--color-accent)',
    bgGradient: 'none',
    borderGlow: 'var(--color-border)',
  },
  {
    num: '04',
    title: 'Agile Development',
    desc: 'Clean, secure, test-driven coding with continuous integration and weekly demo builds.',
    icon: Code2,
    phase: 'Phase 4: Engineering',
    duration: 'Weeks 3 – 5',
    deliverables: ['Full-stack App', 'REST API Integration', 'Unit & End-to-End Tests'],
    color: 'var(--color-accent)',
    bgGradient: 'none',
    borderGlow: 'var(--color-border)',
  },
  {
    num: '05',
    title: 'Testing & Launch',
    desc: 'Production deployment, cloud configuration, security audits, and staff onboarding.',
    icon: Rocket,
    phase: 'Phase 5: Deployment',
    duration: 'Launch Week',
    deliverables: ['Cloud Deployment', 'Domain & SSL Setup', 'Onboarding & Training'],
    color: 'var(--color-accent)',
    bgGradient: 'none',
    borderGlow: 'var(--color-border)',
  },
  {
    num: '06',
    title: 'Maintenance & Growth',
    desc: 'Proactive performance monitoring, SLA support, and continuous feature additions.',
    icon: Headphones,
    phase: 'Phase 6: Support',
    duration: 'Ongoing',
    deliverables: ['Performance Monitoring', 'Security Patches', 'Feature Iterations'],
    color: 'var(--color-accent)',
    bgGradient: 'none',
    borderGlow: 'var(--color-border)',
  },
]

export default function Process() {
  const [ref, inView] = useInView()
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section id="process" className="section process" ref={ref}>
      <div className="liquid-bg liquid-bg-1" />
      <div className="container">
        <motion.div
          className="section-header"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <ProblemSolution inView={inView} />
          <motion.h2 className="section-title" variants={fadeInUp} transition={{ duration: 0.5 }}>
            From Idea to <em>Implementation.</em>
          </motion.h2>
          <motion.p className="section-subtitle" variants={fadeInUp} transition={{ duration: 0.5 }}>
            A transparent, 6-stage engineering process designed to eliminate guesswork and deliver reliable software on time.
          </motion.p>
        </motion.div>

        {/* Process Stepper Grid */}
        <motion.div
          className="process__grid"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {steps.map((step, idx) => {
            const Icon = step.icon
            const isActive = activeStep === idx

            return (
              <motion.div
                key={step.num}
                className={`process__card glass-card ${isActive ? 'process__card--active' : ''}`}
                variants={fadeInUp}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActiveStep(idx)}
                onMouseEnter={() => setActiveStep(idx)}
                style={{
                  '--step-color': step.color,
                  '--step-glow': step.borderGlow,
                }}
              >
                {/* Custom Gradient Shade Backdrop */}
                <div
                  className="process__card-bg-gradient"
                  style={{ background: step.bgGradient }}
                />

                {/* Watermark Illustration Icon */}
                <div className="process__card-watermark">
                  <Icon size={120} />
                </div>

                {/* Background Watermark Number */}
                <div className="process__watermark">{step.num}</div>

                {/* Card Top Row */}
                <div className="process__card-top">
                  <div className="process__icon-badge" style={{ background: 'var(--tint)', color: step.color }}>
                    <Icon size={22} />
                  </div>
                  <div className="process__meta-badges">
                    <span className="process__phase-tag" style={{ color: step.color, background: 'var(--tint)' }}>
                      {step.phase}
                    </span>
                    <span className="process__duration-badge">
                      <Clock size={12} /> {step.duration}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <h3 className="process__card-title">{step.title}</h3>
                <p className="process__card-desc">{step.desc}</p>

                {/* Deliverables Checklist */}
                <div className="process__deliverables">
                  <span className="process__deliverables-label">Key Deliverables:</span>
                  <div className="process__deliverables-list">
                    {step.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="process__deliverable-item">
                        <CheckCircle2 size={13} className="process__deliverable-icon" style={{ color: step.color }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Bottom Progress Bar */}
                <div className="process__card-progress">
                  <div
                    className="process__card-progress-fill"
                    style={{
                      width: isActive ? '100%' : '25%',
                      background: 'var(--lime)',
                    }}
                  />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
