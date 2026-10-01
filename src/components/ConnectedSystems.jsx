import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView, fadeInUp, staggerContainer } from '../hooks/useAnimations'
import './SystemUI.css'
import './ConnectedSystems.css'

// One customer enquiry, followed through the whole system
const steps = [
  { name: 'Enquiry', line: 'A customer reaches out.', module: 'Enquiries', sub: 'Leads · Follow-ups', log: 'enquiry.created' },
  { name: 'Customer', line: 'The record opens itself.', module: 'Customers', sub: 'Profiles · History', log: 'customer.opened  #C-512' },
  { name: 'Order', line: 'An order is created.', module: 'Orders', sub: 'Quotes · Orders', log: 'order.created  #1042' },
  { name: 'Inventory', line: 'Stock adjusts itself.', module: 'Inventory', sub: 'Stock · Suppliers', log: 'stock.adjusted  −12 units' },
  { name: 'Billing', line: 'The invoice sends itself.', module: 'Billing', sub: 'Invoices · Ledger', log: 'invoice.sent  INV-1042' },
  { name: 'Reports', line: 'Every chart is already updated.', module: 'Reports', sub: 'Live dashboards', log: 'dashboard.refreshed' },
]

const stats = [
  { label: 'Orders · today', value: '128' },
  { label: 'Invoices sent', value: '86' },
  { label: 'Stock health', value: '92%' },
]

export default function ConnectedSystems() {
  const [ref, inView] = useInView()
  const [active, setActive] = useState(0)
  const paused = useRef(false)

  useEffect(() => {
    if (!inView) return
    const timer = setInterval(() => {
      if (!paused.current) setActive((a) => (a + 1) % steps.length)
    }, 2400)
    return () => clearInterval(timer)
  }, [inView])

  return (
    <section id="solutions" className="section connected ink" ref={ref}>
      <div className="ink-grid" />
      <div className="container connected__container">
        <motion.div
          className="connected__copy"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          onMouseEnter={() => { paused.current = true }}
          onMouseLeave={() => { paused.current = false }}
        >
          <motion.div className="section-badge" variants={fadeInUp}>Connected systems</motion.div>

          <ol className="connected__steps">
            {steps.map((step, i) => (
              <motion.li key={step.name} variants={fadeInUp}>
                <button
                  type="button"
                  className={`connected__step ${i === active ? 'is-active' : ''} ${i < active ? 'is-done' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <span className="connected__step-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="connected__step-name">{step.name}</span>
                  <span className="connected__step-line">{step.line}</span>
                </button>
              </motion.li>
            ))}
          </ol>

          <motion.h2 className="section-title connected__title" variants={fadeInUp}>
            Not just software. A system designed around <em>your business.</em>
          </motion.h2>
        </motion.div>

        <motion.div
          className="sys connected__window"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="sys__bar">
            <span className="sys__dots"><span /><span /><span /></span>
            <span className="sys__url">operations.system</span>
            <span className="sys__toggles connected__toggles"><span /><span /><span /></span>
          </div>

          <div className="connected__body">
            <div className="sys-tiles connected__stats">
              {stats.map((s) => (
                <div className="sys-tile" key={s.label}>
                  <span className="sys-label">{s.label}</span>
                  <span className="sys-value">{s.value}</span>
                </div>
              ))}
            </div>

            <div className="connected__modules">
              {steps.map((step, i) => (
                <div
                  key={step.module}
                  className={`connected__module m${i} ${i === active ? 'is-active' : ''} ${i < active ? 'is-done' : ''}`}
                >
                  <span className="connected__module-title">
                    <i />
                    {step.module}
                  </span>
                  <span className="connected__module-sub">{step.sub}</span>
                  <span className="sys__toggles"><span /><span /><span /></span>
                  {i < steps.length - 1 && <span className="connected__link"><b /></span>}
                </div>
              ))}
            </div>

            <div className="connected__log">
              <span className="connected__log-prompt">›</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={active}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.25 }}
                >
                  {steps[active].log}
                </motion.span>
              </AnimatePresence>
              <span className="connected__log-caret" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
