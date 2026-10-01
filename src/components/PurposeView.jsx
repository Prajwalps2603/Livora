import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Compass,
  AlertTriangle,
  Lightbulb,
  Code2,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Zap,
  Layers,
  Unlock,
  Users2,
  Clock,
  Calculator,
  MessageCircle,
  Phone,
  Check,
} from 'lucide-react'
import { fadeInUp, staggerContainer } from '../hooks/useAnimations'
import './PurposeView.css'

const purposeSteps = [
  {
    step: '01',
    tab: '01 · Friction',
    badge: 'Discovery Phase',
    title: 'Friction Discovery',
    tagline: 'Pinpointing where your team loses hours and focus.',
    desc: 'Uncovering spreadsheet chaos, manual duplicate entries, and fragmented tools that waste team hours.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    color: 'var(--color-accent)',
    cta: 'Explore Discovery',
    challenge: 'Staff spending 15+ hours weekly copying data between disconnected spreadsheets and legacy apps.',
    solution: 'End-to-end workflow audit mapping every single repetitive human task into automated logic paths.',
    deliverables: [
      'Comprehensive manual task & spreadsheet bottleneck audit',
      'Data fragmentation & human entry error analysis',
      'Unified data flow architecture blueprint',
      'Quantified weekly operational recovery estimate',
    ],
    metric: '100% bottleneck visibility before writing code',
  },
  {
    step: '02',
    tab: '02 · Strategy',
    badge: 'Architectural Blueprint',
    title: 'Strategy Blueprint',
    tagline: 'Designing technology around humans, not the other way around.',
    desc: 'Studying your daily team habits to design a tailored technical roadmap with zero bloatware.',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80',
    color: 'var(--color-accent)',
    cta: 'View Blueprint',
    challenge: 'Generic off-the-shelf software forcing teams to change their habits to fit rigid vendor templates.',
    solution: 'Tailored UX wireframes and clean relational schemas designed around how your team naturally operates.',
    deliverables: [
      'High-fidelity interactive UI/UX screen mockups',
      'Lean database schema & custom API integration specs',
      'Milestone-driven roadmap with crystal-clear deliverables',
      'Try-Before-Commit staging deployment scope',
    ],
    metric: 'Zero wasted dev cycles with transparent roadmaps',
  },
  {
    step: '03',
    tab: '03 · Core Engine',
    badge: '★ The Core Engine',
    title: 'Custom Engineering',
    tagline: 'High-velocity full-stack engineering tailored 100% to you.',
    desc: 'Full-stack engineering of high-velocity web apps, Android systems, and automation pipelines built around you.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    color: 'var(--color-accent)',
    cta: 'See Engineering',
    challenge: 'Slow, bloated off-the-shelf SaaS with costly recurring seats and restrictive customizability.',
    solution: 'Modern lightweight full-stack applications with 100% intellectual property and database ownership.',
    deliverables: [
      'Custom web apps, native Android tools & automation engines',
      'Automated background jobs, invoice generators & reports',
      'Sub-second database queries with zero legacy technical debt',
      '100% source code ownership & complete IP transfer',
    ],
    metric: 'Sub-second speeds & 60fps micro-animations',
  },
  {
    step: '04',
    tab: '04 · Validation',
    badge: 'Quality Assurance',
    title: 'Prototype Validation',
    tagline: 'Interactive sandbox testing before launch sign-off.',
    desc: 'Deploying interactive evaluation sandboxes to your staff for risk-free testing before milestone sign-off.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80',
    color: 'var(--color-accent)',
    cta: 'Test Sandbox',
    challenge: 'Risky traditional waterfall launches that surprise clients with unusable features at the deadline.',
    solution: 'Live staging sandbox environments where your team tests real daily workflows with zero risk.',
    deliverables: [
      'Live staging URL accessible by your entire operations team',
      'End-to-end user acceptance testing with real company data',
      'Rapid feedback refinement cycles with lead developers',
      'Try-Before-Commit milestone confidence guarantee',
    ],
    metric: '100% risk-free testing before final commitment',
  },
  {
    step: '05',
    tab: '05 · Scale',
    badge: 'Compounding Growth',
    title: 'Operational Velocity',
    tagline: 'Reclaiming hundreds of hours and accelerating scale.',
    desc: 'Eliminating human error, recovering 25+ weekly hours, and operating on a future-proof scalable codebase.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    color: 'var(--color-accent)',
    cta: 'Scale Operations',
    challenge: 'Manual overhead scaling linearly with business growth, creating painful hiring and management bottlenecks.',
    solution: 'Automated digital systems that process 10x volume effortlessly with zero extra headcount stress.',
    deliverables: [
      'Automated operations saving 25+ weekly team hours',
      'Zero vendor lock-in with ongoing developer support access',
      'Scalable cloud architecture ready for new revenue streams',
      'Continuous feature upgrades as your business expands',
    ],
    metric: '25+ weekly hours recovered permanently',
  },
]

const purposePillars = [
  {
    number: '01',
    title: 'Technology Adapts To You',
    subtitle: 'Zero Rigid Templates',
    desc: 'We never force your business into generic off-the-shelf software. We study your exact workflows first, then engineer custom code that matches your team’s natural daily habits.',
    icon: Layers,
    color: 'var(--color-accent)',
    benefit: '100% workflow alignment',
  },
  {
    number: '02',
    title: '100% Code & IP Ownership',
    subtitle: 'Zero Subscription Hostage',
    desc: 'You receive complete source code, database rights, and intellectual property. No per-user subscription lock-ins or arbitrary vendor tier upgrades ever.',
    icon: Unlock,
    color: 'var(--color-accent)',
    benefit: 'Total freedom & digital asset value',
  },
  {
    number: '03',
    title: 'Direct Developer Partnership',
    subtitle: 'Zero Sales Bureaucracy',
    desc: 'You work directly with Prajwal and Nikhil — full-stack engineers who design, code, and deploy your system. Zero account managers, zero lost-in-translation delays.',
    icon: Users2,
    color: 'var(--color-accent)',
    benefit: 'Lightning-fast iteration cycles',
  },
]

export default function PurposeView() {
  const [activeIndex, setActiveIndex] = useState(2) // Center card (03)
  const [teamSize, setTeamSize] = useState(8)
  const [hoursLost, setHoursLost] = useState(3)

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? purposeSteps.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === purposeSteps.length - 1 ? 0 : prev + 1))
  }

  // 3D Coverflow geometry math
  const getCoverflowStyle = (index) => {
    const total = purposeSteps.length
    let offset = (index - activeIndex + total) % total
    if (offset > 2) offset -= total // range: -2, -1, 0, 1, 2

    if (offset === 0) {
      return {
        x: 0,
        y: -20,
        scale: 1.08,
        zIndex: 10,
        opacity: 1,
        filter: 'brightness(1) blur(0px)',
        pointerEvents: 'auto',
      }
    } else if (offset === 1) {
      return {
        x: 270,
        y: 10,
        scale: 0.88,
        zIndex: 7,
        opacity: 0.85,
        filter: 'brightness(0.85) blur(0.2px)',
        pointerEvents: 'auto',
      }
    } else if (offset === -1) {
      return {
        x: -270,
        y: 10,
        scale: 0.88,
        zIndex: 7,
        opacity: 0.85,
        filter: 'brightness(0.85) blur(0.2px)',
        pointerEvents: 'auto',
      }
    } else if (offset === 2) {
      return {
        x: 500,
        y: 28,
        scale: 0.75,
        zIndex: 4,
        opacity: 0.55,
        filter: 'brightness(0.65) blur(0.8px)',
        pointerEvents: 'auto',
      }
    } else {
      return {
        x: -500,
        y: 28,
        scale: 0.75,
        zIndex: 4,
        opacity: 0.55,
        filter: 'brightness(0.65) blur(0.8px)',
        pointerEvents: 'auto',
      }
    }
  }

  const activeStepData = purposeSteps[activeIndex]

  // Real-time calculations for simulator
  const weeklyHoursSaved = Math.round(teamSize * hoursLost * 5 * 0.72)
  const annualHoursSaved = weeklyHoursSaved * 50
  const estimatedCostSaved = Math.round((annualHoursSaved * 450) / 1000) // in Thousands ₹

  return (
    <div className="purpose-view container">
      {/* 1. Purpose Statement Hero Banner */}
      <motion.div
        className="purpose-hero-box glass-card"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="purpose-hero-glow" />
        <div className="section-badge">
          <Compass size={14} /> The LIVORA Purpose
        </div>
        <h2 className="purpose-hero-title">
          Technology Should Solve Problems — <span className="text-gradient">Not Create New Ones.</span>
        </h2>
        <p className="purpose-hero-lead">
          LIVORA was founded on a singular conviction: software should mold itself around human workflows, not force teams into bureaucratic workarounds.
        </p>
      </motion.div>

      {/* 2. 3D Coverflow Carousel Section */}
      <div className="coverflow-carousel-section">
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={14} /> 5-Stage Evolution
          </div>
          <h3 className="section-title">The Problem-to-Growth Journey</h3>
          <p className="section-subtitle">
            Explore how we transform operational bottlenecks into streamlined, automated velocity.
          </p>
        </div>

        {/* Navigation Step Tabs */}
        <div className="coverflow__tabs">
          {purposeSteps.map((s, idx) => (
            <button
              key={s.step}
              type="button"
              className={`coverflow__tab ${activeIndex === idx ? 'coverflow__tab--active' : ''}`}
              onClick={() => setActiveIndex(idx)}
              style={{ '--tab-theme': s.color }}
            >
              <span>{s.tab}</span>
            </button>
          ))}
        </div>

        {/* 3D Coverflow Stage */}
        <div className="coverflow__stage-wrapper">
          {/* Arrow Left */}
          <button
            type="button"
            className="coverflow__arrow coverflow__arrow--prev"
            onClick={handlePrev}
            aria-label="Previous Card"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Cards Stage Arena */}
          <div className="coverflow__stage">
            {purposeSteps.map((s, idx) => {
              const anim = getCoverflowStyle(idx)
              const isCenter = activeIndex === idx

              return (
                <motion.div
                  key={s.step}
                  className={`coverflow__card ${isCenter ? 'coverflow__card--active' : ''}`}
                  animate={anim}
                  transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                  onClick={() => setActiveIndex(idx)}
                  style={{ '--card-accent': s.color }}
                >
                  {/* Top Image Banner */}
                  <div className="coverflow__card-image-wrap">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="coverflow__card-img"
                      loading="lazy"
                    />
                    <div className="coverflow__card-badge">
                      <span>{s.badge}</span>
                    </div>
                  </div>

                  {/* Bottom Content Body */}
                  <div className="coverflow__card-body">
                    <h4 className="coverflow__card-title">{s.title}</h4>
                    <p className="coverflow__card-desc">{s.desc}</p>

                    <button
                      type="button"
                      className="coverflow__card-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveIndex(idx)
                      }}
                    >
                      <span>{s.cta}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Arrow Right */}
          <button
            type="button"
            className="coverflow__arrow coverflow__arrow--next"
            onClick={handleNext}
            aria-label="Next Card"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Bottom Pagination Dots */}
        <div className="coverflow__dots">
          {purposeSteps.map((s, idx) => (
            <button
              key={s.step}
              type="button"
              className={`coverflow__dot ${activeIndex === idx ? 'coverflow__dot--active' : ''}`}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to stage ${s.step}`}
              style={{ '--dot-accent': s.color }}
            />
          ))}
        </div>

        {/* 3. Interactive Blueprint Deep-Dive Panel (Synchronized with Active Stage) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStepData.step}
            className="purpose-deepdive glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            style={{ '--deepdive-theme': activeStepData.color }}
          >
            <div className="purpose-deepdive__header">
              <div className="purpose-deepdive__badge-wrap">
                <span className="purpose-deepdive__step-pill">Stage {activeStepData.step}</span>
                <span className="purpose-deepdive__badge">{activeStepData.badge}</span>
              </div>
              <h4 className="purpose-deepdive__title">{activeStepData.title}: {activeStepData.tagline}</h4>
            </div>

            <div className="purpose-deepdive__grid">
              {/* Left Column: Challenge vs Solution */}
              <div className="purpose-deepdive__col">
                <div className="purpose-deepdive__block purpose-deepdive__block--problem">
                  <div className="purpose-deepdive__block-label">
                    <AlertTriangle size={15} /> The Operational Challenge
                  </div>
                  <p className="purpose-deepdive__block-text">{activeStepData.challenge}</p>
                </div>

                <div className="purpose-deepdive__block purpose-deepdive__block--solution">
                  <div className="purpose-deepdive__block-label">
                    <Zap size={15} /> The LIVORA Engineering Solution
                  </div>
                  <p className="purpose-deepdive__block-text">{activeStepData.solution}</p>
                </div>
              </div>

              {/* Right Column: Tangible Deliverables & Metric */}
              <div className="purpose-deepdive__col">
                <div className="purpose-deepdive__deliverables-box">
                  <span className="purpose-deepdive__box-title">Key Tangible Deliverables</span>
                  <div className="purpose-deepdive__list">
                    {activeStepData.deliverables.map((item, i) => (
                      <div key={i} className="purpose-deepdive__item">
                        <CheckCircle2 size={16} className="purpose-deepdive__check" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="purpose-deepdive__metric-badge">
                  <Sparkles size={16} />
                  <span><strong>Target Result:</strong> {activeStepData.metric}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 4. The 3 Core Invariable Purpose Pillars */}
      <section className="purpose-pillars-section">
        <div className="section-header">
          <div className="section-badge">
            <Compass size={14} /> The 3 Laws
          </div>
          <h3 className="section-title">The LIVORA Purpose Principles</h3>
          <p className="section-subtitle">
            Three non-negotiable principles that guide every line of code we write.
          </p>
        </div>

        <motion.div
          className="purpose-pillars-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {purposePillars.map((p) => {
            const IconComponent = p.icon
            return (
              <motion.div
                key={p.number}
                className="purpose-pillar-card glass-card"
                variants={fadeInUp}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                style={{ '--pillar-theme': p.color }}
              >
                <div className="purpose-pillar-header">
                  <span className="purpose-pillar-num">{p.number}</span>
                  <div
                    className="purpose-pillar-icon"
                    style={{ background: 'var(--tint)', color: p.color }}
                  >
                    <IconComponent size={22} />
                  </div>
                </div>
                <h4 className="purpose-pillar-title">{p.title}</h4>
                <span className="purpose-pillar-subtitle">{p.subtitle}</span>
                <p className="purpose-pillar-desc">{p.desc}</p>
                <div className="purpose-pillar-benefit">
                  <Check size={14} style={{ color: p.color }} />
                  <span>{p.benefit}</span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* 5. Interactive Operational Hours & Velocity Simulator */}
      <section className="purpose-simulator-section">
        <div className="purpose-simulator glass-card">
          <div className="purpose-simulator__glow" />
          <div className="purpose-simulator__content">
            <div className="section-badge">
              <Calculator size={14} /> Interactive Productivity Calculator
            </div>
            <h3 className="purpose-simulator__title">Calculate Your Recoverable Team Velocity</h3>
            <p className="purpose-simulator__desc">
              Estimate the hours, stress, and operational overhead your business can eliminate through custom automation.
            </p>

            <div className="purpose-simulator__controls">
              {/* Slider 1: Team Size */}
              <div className="purpose-sim-control">
                <div className="purpose-sim-label-row">
                  <span className="purpose-sim-label">Operations Team Size</span>
                  <span className="purpose-sim-val">{teamSize} People</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="40"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="purpose-sim-slider"
                />
              </div>

              {/* Slider 2: Daily Hours Lost */}
              <div className="purpose-sim-control">
                <div className="purpose-sim-label-row">
                  <span className="purpose-sim-label">Daily Hours Lost to Manual Tasks</span>
                  <span className="purpose-sim-val">{hoursLost} Hours / Day</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={hoursLost}
                  onChange={(e) => setHoursLost(Number(e.target.value))}
                  className="purpose-sim-slider"
                />
              </div>
            </div>

            {/* Real-time Computed Metrics Display */}
            <div className="purpose-simulator__results">
              <div className="purpose-sim-stat">
                <span className="purpose-sim-stat__num">{weeklyHoursSaved} hrs</span>
                <span className="purpose-sim-stat__label">Recovered Weekly</span>
              </div>
              <div className="purpose-sim-stat">
                <span className="purpose-sim-stat__num">{annualHoursSaved.toLocaleString()} hrs</span>
                <span className="purpose-sim-stat__label">Annual Hours Unlocked</span>
              </div>
              <div className="purpose-sim-stat">
                <span className="purpose-sim-stat__num">₹{estimatedCostSaved}k+</span>
                <span className="purpose-sim-stat__label">Estimated Annual Value</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Founders' Personal Purpose Pledge */}
      <section className="purpose-pledge-section">
        <div className="purpose-pledge-card glass-card">
          <div className="purpose-pledge__badge">
            <ShieldCheck size={16} /> Direct Engineering Guarantee
          </div>
          <h3 className="purpose-pledge__title">Our Personal Commitment To Every Client</h3>
          <p className="purpose-pledge__quote">
            "When you build with LIVORA, you speak with the engineers who write the code. We don’t rest until your system is faster, simpler, and tangibly more productive than what you had before."
          </p>

          <div className="purpose-pledge__founders">
            <div className="purpose-founder-badge">
              <div className="purpose-founder-avatar">P</div>
              <div className="purpose-founder-info">
                <span className="purpose-founder-name">Prajwal M P</span>
                <span className="purpose-founder-role">Co-Founder & Full-Stack Lead</span>
              </div>
            </div>

            <div className="purpose-founder-badge">
              <div className="purpose-founder-avatar">N</div>
              <div className="purpose-founder-info">
                <span className="purpose-founder-name">Nikhil K</span>
                <span className="purpose-founder-role">Co-Founder & Systems Lead</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
