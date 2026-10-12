import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { Sparkles, ArrowUpRight } from 'lucide-react'
import { useInView, fadeInUp, staggerContainer } from '../hooks/useAnimations'
import { scenes } from './PortfolioScenes'
import './Portfolio.css'

const projects = [
  {
    title: 'Automobile Showroom Management',
    desc: 'Customer management, vehicle inventory tracking, sales follow-ups and automated reporting.',
    tag: 'Web App',
    badge: 'Concept Project',
    stats: 'Multi-branch Support',
  },
  {
    title: 'Business Management Dashboard',
    desc: 'Centralized business operations, KPI analytics, team task tracking and revenue charts.',
    tag: 'Internal Tool',
    badge: 'Concept Project',
    stats: 'Real-time Metrics',
  },
  {
    title: 'Inventory & Order System',
    desc: 'Automated stock alerts, supplier management, billing workflows and barcode integration.',
    tag: 'Automation',
    badge: 'Demo Project',
    stats: 'Low-stock Alerts',
  },
  {
    title: 'Android Business Application',
    desc: 'Dedicated mobile application for field employees, delivery tracking, and direct customer ordering.',
    tag: 'Android',
    badge: 'Concept Project',
    stats: 'Offline Support',
  },
  {
    title: 'Brand Identity & Stationery Suite',
    desc: 'Cohesive visual identity, vector logo marks, letterheads, invoice templates and corporate cards.',
    tag: 'Branding',
    badge: 'Design System',
    stats: 'Vector Assets',
  },
  {
    title: 'Social Media Growth Engine',
    desc: 'Targeted ad creatives, calendar scheduling, content production and lead-gen funnels.',
    tag: 'Marketing',
    badge: 'Campaign',
    stats: '+320% Reach',
  },
  {
    title: 'ATS-Optimized Resumes & Portfolios',
    desc: 'Precision resume templates, keyword ranking optimization, and personal developer portfolio sites.',
    tag: 'Career Tool',
    badge: 'Template Kit',
    stats: '99% ATS Pass',
  },
  {
    title: 'Academic & Research Portal',
    desc: 'Project source code, documentation templates, report generators and milestone trackers.',
    tag: 'Student Solution',
    badge: 'Academic',
    stats: 'Complete Docs',
  },
]

// How long each project stays on stage before the showcase moves on
const SLIDE_MS = 5200
const pad = (n) => String(n).padStart(2, '0')

export default function Portfolio() {
  const [ref, inView] = useInView()
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const indexRef = useRef(null)

  // Stage tilts toward the pointer
  const rotX = useSpring(useMotionValue(0), { stiffness: 140, damping: 18 })
  const rotY = useSpring(useMotionValue(0), { stiffness: 140, damping: 18 })

  const handleTilt = (e) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    rotY.set(((e.clientX - r.left) / r.width - 0.5) * 10)
    rotX.set(-((e.clientY - r.top) / r.height - 0.5) * 8)
  }
  const resetTilt = () => { rotX.set(0); rotY.set(0) }

  // Advance through the projects on its own; hovering the showcase holds it
  useEffect(() => {
    if (!inView || paused || reduce) return
    const timer = setTimeout(() => setActive((a) => (a + 1) % projects.length), SLIDE_MS)
    return () => clearTimeout(timer)
  }, [inView, paused, reduce, active])

  // On small screens the index is a sideways strip: keep the active project in view within it
  useEffect(() => {
    const list = indexRef.current
    if (!list || list.scrollWidth <= list.clientWidth) return
    const row = list.children[active]
    if (row) list.scrollTo({ left: row.offsetLeft - list.offsetLeft - 8, behavior: 'smooth' })
  }, [active])

  const project = projects[active]
  const Scene = scenes[active]

  return (
    <section id="work" className="section portfolio" ref={ref}>
      <div className="liquid-bg liquid-bg-3" />
      <div className="container">
        <motion.div
          className="section-header"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}
        >
          <motion.div className="section-badge" variants={fadeInUp} transition={{ duration: 0.5 }}>
            <Sparkles size={14} /> Portfolio
          </motion.div>
          <motion.h2 className="section-title" variants={fadeInUp} transition={{ duration: 0.5 }}>
            Things We're <em>Building.</em>
          </motion.h2>
          <motion.p className="section-subtitle" variants={fadeInUp} transition={{ duration: 0.5 }}>
            Explore practical applications, business dashboards, and digital tools we build from scratch.
          </motion.p>
        </motion.div>

        <motion.div
          className={`portfolio__showcase ${paused || reduce ? 'is-paused' : ''}`}
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => { setPaused(false); resetTilt() }}
        >
          {/* Project index */}
          <ol className="portfolio__index" role="tablist" aria-label="Projects" ref={indexRef}>
            {projects.map((p, i) => (
              <li key={p.title}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  className={`portfolio__row ${i === active ? 'is-active' : ''}`}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                >
                  <span className="portfolio__row-num">{pad(i + 1)}</span>
                  <span className="portfolio__row-title">{p.title}</span>
                  <span className="portfolio__row-tag">{p.tag}</span>
                  {i === active && (
                    <span key={`t-${active}`} className="portfolio__row-timer" style={{ '--slide-ms': `${SLIDE_MS}ms` }} />
                  )}
                </button>
              </li>
            ))}
          </ol>

          {/* Stage */}
          <div className="portfolio__stage" onMouseMove={handleTilt} onMouseLeave={resetTilt}>
            <motion.div className="portfolio__frame" style={{ rotateX: rotX, rotateY: rotY }}>
              {/* Window bar keeps labels off the artwork */}
              <div className="portfolio__bar">
                <span className="portfolio__bar-dots"><i /><i /><i /></span>
                <span className="portfolio__badge"><i /> {project.badge}</span>
                <span className="portfolio__counter">
                  {pad(active + 1)}<small>/{pad(projects.length)}</small>
                </span>
              </div>
              <div className="portfolio__shot-box">
                {/* The incoming project wipes in on top of the outgoing one */}
                <AnimatePresence initial={false}>
                  <motion.figure
                    key={active}
                    className="portfolio__shot"
                    initial={{ clipPath: 'inset(0 0 0 100% round 18px)', zIndex: 2 }}
                    animate={{ clipPath: 'inset(0 0 0 0% round 18px)', zIndex: 2 }}
                    exit={{ zIndex: 1, opacity: 0.999, transition: { duration: 0.75 } }}
                    transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <Scene />
                  </motion.figure>
                </AnimatePresence>
              </div>

              <motion.span
                key={`stat-${active}`}
                className="portfolio__stat"
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <i /> {project.stats}
              </motion.span>
            </motion.div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                className="portfolio__details"
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="portfolio__details-text">
                  <span className="portfolio__details-tag">{project.tag}</span>
                  <h3 className="portfolio__details-title">{project.title}</h3>
                  <p className="portfolio__details-desc">{project.desc}</p>
                </div>
                <span className="portfolio__details-open" aria-hidden="true"><ArrowUpRight size={20} /></span>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

    </section>
  )
}
