import React, { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Search,
  Map,
  PenTool,
  Code2,
  Rocket,
  Headphones,
  Check,
  Clock,
} from 'lucide-react'
import { useInView, fadeInUp, staggerContainer } from '../hooks/useAnimations'
import ProblemSolution from './ProblemSolution'
import './Process.css'

// Where each phase sits on the project timeline (8 slots: D1-3, D4-7, W2, W3, W4, W5, launch, ongoing)
const TIMELINE_SLOTS = 8

const steps = [
  {
    num: '01',
    title: 'Discover & Understand',
    desc: 'We dive deep into your workflow, pain points, business goals, and tech requirements.',
    icon: Search,
    phase: 'Research',
    duration: 'Days 1 – 3',
    span: [0, 1],
    deliverables: ['Workflow Audit', 'Requirement Specification', 'Scope Definition'],
  },
  {
    num: '02',
    title: 'Architecture & Strategy',
    desc: 'We design the technical blueprint, database schemas, API specs, and project milestones.',
    icon: Map,
    phase: 'Planning',
    duration: 'Days 4 – 7',
    span: [1, 2],
    deliverables: ['System Architecture', 'Database Schema', 'Project Timeline'],
  },
  {
    num: '03',
    title: 'UI/UX & Prototyping',
    desc: 'Interactive wireframes and Apple-inspired modern UI designs for seamless user experience.',
    icon: PenTool,
    phase: 'Design',
    duration: 'Week 2',
    span: [2, 3],
    deliverables: ['Figma Prototypes', 'Design System', 'Client Feedback Review'],
  },
  {
    num: '04',
    title: 'Agile Development',
    desc: 'Clean, secure, test-driven coding with continuous integration and weekly demo builds.',
    icon: Code2,
    phase: 'Engineering',
    duration: 'Weeks 3 – 5',
    span: [3, 6],
    deliverables: ['Full-stack App', 'REST API Integration', 'Unit & End-to-End Tests'],
  },
  {
    num: '05',
    title: 'Testing & Launch',
    desc: 'Production deployment, cloud configuration, security audits, and staff onboarding.',
    icon: Rocket,
    phase: 'Deployment',
    duration: 'Launch Week',
    span: [6, 7],
    deliverables: ['Cloud Deployment', 'Domain & SSL Setup', 'Onboarding & Training'],
  },
  {
    num: '06',
    title: 'Maintenance & Growth',
    desc: 'Proactive performance monitoring, SLA support, and continuous feature additions.',
    icon: Headphones,
    phase: 'Support',
    duration: 'Ongoing',
    span: [7, 8],
    deliverables: ['Performance Monitoring', 'Security Patches', 'Feature Iterations'],
  },
]

// How long each phase stays "in progress" before the walkthrough moves on
const STEP_MS = 4200

function statusOf(idx, active) {
  if (idx < active) return { key: 'done', label: 'Done' }
  if (idx === active) return { key: 'live', label: 'In progress' }
  return { key: 'next', label: 'Up next' }
}

export default function Process() {
  const [ref, inView] = useInView()
  const reduce = useReducedMotion()
  const [activeStep, setActiveStep] = useState(0)
  const [paused, setPaused] = useState(false)

  // Walk through the phases on its own; hovering the cards holds it still
  useEffect(() => {
    if (!inView || paused || reduce) return
    const timer = setTimeout(() => setActiveStep((s) => (s + 1) % steps.length), STEP_MS)
    return () => clearTimeout(timer)
  }, [inView, paused, reduce, activeStep])

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

        {/* Phase rail: the running phase fills like a timer */}
        <motion.div
          className={`process__rail ${paused || reduce ? 'is-paused' : ''}`}
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          role="tablist"
          aria-label="Project phases"
        >
          {steps.map((step, idx) => (
            <button
              key={step.num}
              type="button"
              role="tab"
              aria-selected={activeStep === idx}
              className={`process__rail-step is-${statusOf(idx, activeStep).key}`}
              onClick={() => setActiveStep(idx)}
            >
              <span className="process__rail-track">
                <span
                  key={activeStep === idx ? `run-${activeStep}` : 'idle'}
                  className="process__rail-fill"
                  style={{ '--step-ms': `${STEP_MS}ms` }}
                />
              </span>
              <span className="process__rail-label">
                <b>{step.num}</b> {step.phase}
              </span>
            </button>
          ))}
        </motion.div>

        <motion.div
          className="process__grid"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {steps.map((step, idx) => {
            const Icon = step.icon
            const status = statusOf(idx, activeStep)
            const isActive = status.key === 'live'

            return (
              <motion.article
                key={step.num}
                className={`process__card glass-card is-${status.key} ${isActive ? 'ink' : ''}`}
                variants={fadeInUp}
                onClick={() => setActiveStep(idx)}
                onMouseEnter={() => setActiveStep(idx)}
              >
                <div className="process__card-top">
                  <span className="process__num">{step.num}</span>
                  <div className="process__meta">
                    <span className="process__phase-tag">
                      <Icon size={12} /> {step.phase}
                    </span>
                    <span className="process__duration">
                      <Clock size={12} /> {step.duration}
                    </span>
                  </div>
                </div>

                {/* Where this phase falls in the project */}
                <div className="process__timeline" aria-hidden="true">
                  {Array.from({ length: TIMELINE_SLOTS }, (_, slot) => {
                    const inSpan = slot >= step.span[0] && slot < step.span[1]
                    const before = slot < step.span[0]
                    return <i key={slot} className={inSpan ? 'is-span' : before ? 'is-before' : ''} />
                  })}
                </div>

                <h3 className="process__card-title">{step.title}</h3>
                <p className="process__card-desc">{step.desc}</p>

                <ul className="process__chips">
                  {step.deliverables.map((item, dIdx) => (
                    <li key={item} style={{ '--d': `${0.15 + dIdx * 0.18}s` }}>
                      <Check size={12} strokeWidth={3} /> {item}
                    </li>
                  ))}
                </ul>

                <div className="process__status">
                  <span className="process__status-dot" />
                  {status.label}
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
