import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileSpreadsheet,
  MessageCircle,
  PenLine,
  FileStack,
  Layers,
  RotateCcw,
  Monitor,
  Workflow,
  Database,
  LayoutDashboard,
  TrendingUp,
  Shield,
  Sparkles,
  Zap,
  XCircle,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react'
import { useInView, fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '../hooks/useAnimations'
import './BeforeAfter.css'

const comparisons = [
  {
    before: { icon: FileSpreadsheet, title: 'Scattered Excel Sheets', desc: 'Out-of-sync formulas, version confusion, and accidental data loss.' },
    after: { icon: Database, title: 'Single Cloud Database', desc: 'One centralized source of truth accessible anywhere with automatic backups.' },
  },
  {
    before: { icon: MessageCircle, title: 'Manual WhatsApp Follow-ups', desc: 'Forgotten customer leads, lost order updates, and manual typing.' },
    after: { icon: Workflow, title: 'Automated Notifications', desc: 'Instant WhatsApp & Email triggers for order status, receipts, and alerts.' },
  },
  {
    before: { icon: PenLine, title: 'Manual Paper Entries', desc: 'Slow physical record keeping prone to human calculation errors.' },
    after: { icon: Monitor, title: 'Custom Digital Platform', desc: 'Fast digital forms with validation, instant calculations, and export.' },
  },
  {
    before: { icon: Layers, title: 'Fragmented Tools', desc: 'Juggling 5 different disconnected apps that do not talk to each other.' },
    after: { icon: LayoutDashboard, title: 'All-in-One Dashboard', desc: 'Unified control center tailored to your exact business workflow.' },
  },
  {
    before: { icon: RotateCcw, title: 'Repetitive Routine Tasks', desc: 'Hours wasted on copy-pasting, invoice creation, and manual reports.' },
    after: { icon: TrendingUp, title: 'Real-Time Automated Reports', desc: 'Live KPI charts, revenue insights, and automated daily summaries.' },
  },
  {
    before: { icon: FileStack, title: 'Zero Role-Based Security', desc: 'Sensitive data exposed across employee chat groups and unsecured files.' },
    after: { icon: Shield, title: 'Role-Based Access & Control', desc: 'Granular permissions for admins, staff, and clients with audit logs.' },
  },
]

export default function BeforeAfter() {
  const [ref, inView] = useInView()
  const [viewMode, setViewMode] = useState('compare') // 'compare' | 'before' | 'after'
  const [activeItem, setActiveItem] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-changing container slide timer
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setActiveItem((prev) => (prev + 1) % comparisons.length)
    }, 3200)
    return () => clearInterval(timer)
  }, [isPaused])

  return (
    <section id="transformation" className="section before-after" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div className="section-badge" variants={fadeInUp} transition={{ duration: 0.5 }}>
            <Sparkles size={14} /> The Transformation
          </motion.div>
          <motion.h2 className="section-title" variants={fadeInUp} transition={{ duration: 0.5 }}>
            Stop Working Around Your Software.<br />
            <span className="ba__title-gradient">Make It Work For You.</span>
          </motion.h2>
          <motion.p className="section-subtitle" variants={fadeInUp} transition={{ duration: 0.5 }}>
            Here is how LIVORA replaces operational chaos with purpose-built digital clarity.
          </motion.p>
        </motion.div>

        {/* View Mode Switcher */}
        <motion.div
          className="ba__view-switcher"
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <button
            className={`ba__switcher-btn ${viewMode === 'compare' ? 'ba__switcher-btn--active' : ''}`}
            onClick={() => setViewMode('compare')}
          >
            <SlidersHorizontal size={15} /> Side-by-Side Comparison
          </button>
          <button
            className={`ba__switcher-btn ${viewMode === 'before' ? 'ba__switcher-btn--active ba__switcher-btn--before' : ''}`}
            onClick={() => setViewMode('before')}
          >
            <XCircle size={15} /> Before (The Friction)
          </button>
          <button
            className={`ba__switcher-btn ${viewMode === 'after' ? 'ba__switcher-btn--active ba__switcher-btn--after' : ''}`}
            onClick={() => setViewMode('after')}
          >
            <CheckCircle2 size={15} /> After LIVORA (The Clarity)
          </button>
        </motion.div>

        {/* Comparison Showcase Container with Auto-Changing Slide and Pause on Hover */}
        <motion.div
          className="ba__showcase"
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ duration: 0.6 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {viewMode === 'compare' ? (
            /* Side by Side Dual Grid */
            <div className="ba__split-container">
              {/* Left: The Friction (Before) */}
              <motion.div
                className="ba__column ba__column--before glass-card"
                variants={fadeInLeft}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="ba__column-header">
                  <div className="ba__badge ba__badge--before">
                    <XCircle size={16} /> Before LIVORA
                  </div>
                  <span className="ba__column-tag">Operational Friction</span>
                </div>

                <div className="ba__items-list">
                  {comparisons.map((item, idx) => {
                    const Icon = item.before.icon
                    const isSelected = activeItem === idx
                    return (
                      <motion.div
                        key={item.before.title}
                        className={`ba__item-card ba__item-card--before ${isSelected ? 'ba__item-card--selected' : ''}`}
                        onClick={() => setActiveItem(idx)}
                        onMouseEnter={() => setActiveItem(idx)}
                        whileHover={{ x: 4, scale: 1.01 }}
                        animate={isSelected ? { scale: 1.02 } : { scale: 1 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="ba__icon-wrap ba__icon-wrap--before">
                          <Icon size={20} />
                        </div>
                        <div className="ba__item-info">
                          <h4 className="ba__item-title">{item.before.title}</h4>
                          <p className="ba__item-desc">{item.before.desc}</p>
                        </div>
                        {isSelected && (
                          <motion.div
                            className="ba__active-indicator ba__active-indicator--before"
                            layoutId="activeBeforeIndicator"
                          />
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>

              {/* Center Transformation Indicator Beam */}
              <div className="ba__center-divider">
                <div className="ba__pulse-beam" />
                <div className="ba__center-badge">
                  <Zap size={14} className="ba__zap-icon" />
                  <span>TRANSFORMATION</span>
                </div>
              </div>

              {/* Right: The Clarity (After) */}
              <motion.div
                className="ba__column ba__column--after glass-card"
                variants={fadeInRight}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="ba__column-header">
                  <div className="ba__badge ba__badge--after">
                    <CheckCircle2 size={16} /> After LIVORA
                  </div>
                  <span className="ba__column-tag">Seamless Custom Software</span>
                </div>

                <div className="ba__items-list">
                  {comparisons.map((item, idx) => {
                    const Icon = item.after.icon
                    const isSelected = activeItem === idx
                    return (
                      <motion.div
                        key={item.after.title}
                        className={`ba__item-card ba__item-card--after ${isSelected ? 'ba__item-card--selected' : ''}`}
                        onClick={() => setActiveItem(idx)}
                        onMouseEnter={() => setActiveItem(idx)}
                        whileHover={{ x: 4, scale: 1.01 }}
                        animate={isSelected ? { scale: 1.02 } : { scale: 1 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="ba__icon-wrap ba__icon-wrap--after">
                          <Icon size={20} />
                        </div>
                        <div className="ba__item-info">
                          <h4 className="ba__item-title">{item.after.title}</h4>
                          <p className="ba__item-desc">{item.after.desc}</p>
                        </div>
                        {isSelected && (
                          <motion.div
                            className="ba__active-indicator ba__active-indicator--after"
                            layoutId="activeAfterIndicator"
                          />
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            </div>
          ) : (
            /* Single Focused View Grid */
            <div className="ba__single-grid">
              {comparisons.map((item, idx) => {
                const target = viewMode === 'before' ? item.before : item.after
                const Icon = target.icon
                const isAfter = viewMode === 'after'
                const isSelected = activeItem === idx

                return (
                  <motion.div
                    key={target.title}
                    className={`ba__single-card glass-card ${isAfter ? 'ba__single-card--after' : 'ba__single-card--before'} ${isSelected ? 'ba__single-card--selected' : ''}`}
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: isSelected ? 1.03 : 1, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => setActiveItem(idx)}
                    onMouseEnter={() => setActiveItem(idx)}
                    whileHover={{ y: -6, scale: 1.02 }}
                  >
                    <div className="ba__single-card-top">
                      <div className={`ba__icon-wrap ${isAfter ? 'ba__icon-wrap--after' : 'ba__icon-wrap--before'}`}>
                        <Icon size={24} />
                      </div>
                      <span className={`ba__status-pill ${isAfter ? 'ba__status-pill--after' : 'ba__status-pill--before'}`}>
                        {isAfter ? 'LIVORA Solution' : 'Common Bottleneck'}
                      </span>
                    </div>
                    <h3 className="ba__single-title">{target.title}</h3>
                    <p className="ba__single-desc">{target.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          )}
        </motion.div>

        {/* Bottom Efficiency Banner */}
        <motion.div
          className="ba__impact-strip glass-card"
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="ba__impact-item">
            <span className="ba__impact-val">70%</span>
            <span className="ba__impact-lbl">Faster Task Completion</span>
          </div>
          <div className="ba__impact-sep" />
          <div className="ba__impact-item">
            <span className="ba__impact-val">100%</span>
            <span className="ba__impact-lbl">Data Synchronization</span>
          </div>
          <div className="ba__impact-sep" />
          <div className="ba__impact-item">
            <span className="ba__impact-val">0%</span>
            <span className="ba__impact-lbl">Manual Routine Friction</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
