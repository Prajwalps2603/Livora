import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Check } from 'lucide-react'
import { useInView, fadeInUp, staggerContainer } from '../hooks/useAnimations'
import './SystemUI.css'
import './Automation.css'

// Events on the right, what the system does about them on the left
const messages = [
  { from: 'event', text: 'Stock at Branch 2 drops below reorder level.' },
  { from: 'system', text: 'Drafted PO-2291 for Branch 2. Three lines, grouped by preferred supplier. Ready for approval.' },
  { from: 'event', text: 'Owner taps Approve on the phone.' },
  { from: 'system', text: 'PO sent to the supplier on WhatsApp. Stock sheet updated.' },
  { from: 'event', text: 'The month ends.' },
  { from: 'system', text: 'Sales report generated and emailed. Week three is the strongest so far.' },
]

const branches = [
  { name: 'Main Branch', level: 82 },
  { name: 'Branch 2', level: 14, low: true },
  { name: 'Branch 3', level: 64 },
  { name: 'Warehouse', level: 71 },
]

const poLines = [
  { item: 'Cement bags', qty: 240, supplier: 'Supplier A' },
  { item: 'Steel rods 12mm', qty: 36, supplier: 'Supplier A' },
  { item: 'Paint 20L', qty: 120, supplier: 'Supplier B' },
]

const sales = [58, 44, 30, 26, 22, 40, 52, 48]

export default function Automation() {
  const [ref, inView] = useInView()
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (!inView) return
    const done = shown >= messages.length
    const timer = setTimeout(() => setShown(done ? 0 : shown + 1), done ? 4200 : shown === 0 ? 700 : 1700)
    return () => clearTimeout(timer)
  }, [inView, shown])

  const poVisible = shown >= 2
  const approving = shown === 3
  const approved = shown >= 4
  const reportReady = shown >= 6
  const status = approved ? 'Sent' : shown >= 3 ? 'Approved' : 'Draft'

  return (
    <section className="section automation ink" ref={ref}>
      <div className="ink-grid" />
      <div className="container automation__container">
        <motion.div
          className="automation__copy"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.h3 className="automation__kicker" variants={fadeInUp}>
            And when the work repeats itself…
          </motion.h3>

          <motion.div className="automation__chat" variants={fadeInUp}>
            <AnimatePresence initial={false}>
              {messages.slice(0, shown).map((m, i) => (
                <motion.div
                  key={i}
                  className={`automation__msg automation__msg--${m.from}`}
                  initial={{ opacity: 0, y: 14, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.25 } }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  {m.from === 'system' && <Sparkles size={15} />}
                  <span>{m.text}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.h2 className="automation__title" variants={fadeInUp}>
            Automation<br />inside the<br />workflow.
          </motion.h2>
          <motion.p className="section-subtitle" variants={fadeInUp}>
            Not a tool bolted on the side. Rules wired into the same data, permissions and screens
            your team already uses.
          </motion.p>
        </motion.div>

        <motion.div
          className="sys automation__window"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="sys__bar">
            <span className="sys__dots"><span /><span /><span /></span>
            <span className="sys__url">inventory.system</span>
          </div>
          <div className="sys__body">
            <aside className="sys__side">
              <span className="sys__side-title">Inventory</span>
              {['Branches', 'Stock', 'Purchasing', 'Reports'].map((item, i) => (
                <span
                  key={item}
                  className={`sys__nav ${(reportReady ? i === 3 : poVisible ? i === 2 : i === 0) ? 'is-active' : ''}`}
                >
                  {item}
                </span>
              ))}
            </aside>

            <div className="sys__main">
              <div className="sys__top">
                <span className="sys__skeleton" />
                <span className="sys__toggles"><span /><span /><span /></span>
              </div>

              <div className="sys-tiles">
                <div className="sys-tile">
                  <span className="sys-label">Branches</span>
                  <span className="sys-value">4</span>
                </div>
                <div className="sys-tile">
                  <span className="sys-label">Below reorder</span>
                  <span className="sys-value">{approved ? '0 SKUs' : '3 SKUs'}</span>
                </div>
                <div className="sys-tile">
                  <span className="sys-label">Open POs</span>
                  <span className="sys-value">{approved ? 8 : 7}</span>
                </div>
              </div>

              <div className="sys-tile automation__stock">
                <div className="automation__branches">
                  <span className="sys-label">Stock by branch</span>
                  {branches.map((b) => (
                    <div className="automation__branch" key={b.name}>
                      <span>{b.name}</span>
                      <span className="automation__bar">
                        <i
                          className={b.low && !approved ? 'is-low' : ''}
                          style={{ width: `${b.low && approved ? 76 : b.level}%` }}
                        />
                      </span>
                    </div>
                  ))}
                </div>

                <div className={`automation__po ${poVisible ? 'is-visible' : ''}`}>
                  <div className="automation__po-head">
                    <strong>PO-2291 · Branch 2</strong>
                    <span className={`sys-pill ${status !== 'Draft' ? 'is-lime' : ''}`}>{status}</span>
                  </div>
                  {poLines.map((l) => (
                    <div className="automation__po-line" key={l.item}>
                      <span>{l.item} <i>× {l.qty}</i></span>
                      <small>{l.supplier}</small>
                    </div>
                  ))}
                  <div className="automation__po-actions">
                    <span className="automation__btn">Edit</span>
                    <span className={`automation__btn automation__btn--approve ${approving ? 'is-pressed' : ''}`}>
                      {shown >= 3 ? <><Check size={13} strokeWidth={3} /> Approved</> : 'Approve'}
                    </span>
                  </div>
                </div>
              </div>

              <div className={`sys-tile automation__sales ${reportReady ? 'is-ready' : ''}`}>
                <span className="sys-label">Sales · daily trend · this month</span>
                <div className="automation__chart">
                  <div className="sys-bars">
                    {sales.map((h, i) => (
                      <span key={i} className={i === 4 ? 'is-lime' : ''} style={{ height: `${h}%` }} />
                    ))}
                  </div>
                  <svg viewBox="0 0 400 80" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M0 62 L60 58 L120 44 L170 46 L230 30 L280 34 L330 18 L370 22 L400 8" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
