import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView, fadeInUp, staggerContainer } from '../hooks/useAnimations'
import './Orbit.css'

const nodes = [
  { label: 'Web Apps', title: 'Web Applications', desc: 'Custom, high-speed web applications designed around your exact business processes, customers and team.' },
  { label: 'Android', title: 'Android Applications', desc: 'Native and cross-platform Android apps for customers, field staff and day-to-day operations.' },
  { label: 'Dashboards', title: 'Reports & Dashboards', desc: 'Operational data turned into live dashboards, revenue insights and exportable reports.' },
  { label: 'Billing', title: 'Billing & Invoicing', desc: 'POS billing, automated GST invoicing, receipts and organised ledgers in one place.' },
  { label: 'Inventory', title: 'Inventory Management', desc: 'Products, stock levels, vendor purchases and multi-location sales, always in sync.' },
  { label: 'Database', title: 'One Source of Truth', desc: 'Spreadsheets, chats and paper logs replaced by a single, secure, structured record.' },
  { label: 'CRM', title: 'Customer Management', desc: 'Customers, leads, follow-ups and records managed from one centralised system.' },
  { label: 'Staff', title: 'Employee Management', desc: 'Attendance, roles, payroll and internal approvals without the back-and-forth.' },
  { label: 'Automation', title: 'Workflow Automation', desc: 'Repetitive copy-pasting, manual emailing and routine bottlenecks handled for you.' },
  { label: 'Branding', title: 'Marketing & Brand Design', desc: 'Digital marketing, social content and identity design that present the business properly.' },
]

// Diagram geometry (SVG user units)
const W = 1000
const H = 800
const CX = W / 2
const CY = H / 2
const RX = 390
const RY = 318

const points = nodes.map((_, i) => {
  const angle = (-90 + (360 / nodes.length) * i) * (Math.PI / 180)
  return { x: CX + RX * Math.cos(angle), y: CY + RY * Math.sin(angle) }
})

// Dashed arcs that link each node to one further round the ring, bowing through the core
const arcs = points.map((p, i) => {
  const q = points[(i + 3) % points.length]
  const mx = CX + (CX - (p.x + q.x) / 2) * 0.35
  const my = CY + (CY - (p.y + q.y) / 2) * 0.35
  return `M${p.x.toFixed(1)} ${p.y.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${q.x.toFixed(1)} ${q.y.toFixed(1)}`
})

export default function Orbit() {
  const [ref, inView] = useInView()
  const [active, setActive] = useState(0)
  const hovering = useRef(false)

  useEffect(() => {
    if (!inView) return
    const timer = setInterval(() => {
      if (!hovering.current) setActive((a) => (a + 1) % nodes.length)
    }, 2600)
    return () => clearInterval(timer)
  }, [inView])

  const node = nodes[active]
  const target = points[active]

  return (
    <section className="section orbit ink" ref={ref}>
      <div className="ink-grid" />
      <div className="container orbit__container">
        <motion.div
          className="orbit__copy"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div className="section-badge" variants={fadeInUp}>Capabilities</motion.div>
          <motion.h2 className="section-title" variants={fadeInUp}>
            One core. <em>Everything</em> connected.
          </motion.h2>
          <motion.p className="section-subtitle" variants={fadeInUp}>
            Every system we build starts from your workflow and grows outward. Hover a module to see
            what plugs into the core.
          </motion.p>

          <motion.div className="orbit__detail" variants={fadeInUp}>
            <span className="orbit__detail-count">
              {String(active + 1).padStart(2, '0')} <i>/ {nodes.length}</i>
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={node.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="orbit__detail-title">{node.title}</h3>
                <p className="orbit__detail-desc">{node.desc}</p>
              </motion.div>
            </AnimatePresence>
            <div className="orbit__ticks">
              {nodes.map((n, i) => (
                <span key={n.label} className={i === active ? 'is-active' : ''} />
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="orbit__stage"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          onMouseLeave={() => { hovering.current = false }}
        >
          <svg className="orbit__svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
            <ellipse className="orbit__ring" cx={CX} cy={CY} rx={RX} ry={RY} />
            {arcs.map((d, i) => (
              <path key={`arc-${i}`} className="orbit__arc" d={d} style={{ animationDelay: `${i * -0.7}s` }} />
            ))}
            {points.map((p, i) => (
              <line
                key={`spoke-${i}`}
                className={`orbit__spoke ${i === active ? 'is-active' : ''}`}
                x1={CX}
                y1={CY}
                x2={p.x}
                y2={p.y}
              />
            ))}
            {/* Signal travelling from the core to the active module */}
            <circle key={active} className="orbit__pulse" r="6">
              <animateMotion
                dur="1.3s"
                repeatCount="indefinite"
                path={`M${CX} ${CY} L${target.x.toFixed(1)} ${target.y.toFixed(1)}`}
              />
            </circle>
          </svg>

          <div className="orbit__core">
            <span className="orbit__core-halo" />
            <span>Custom<br />Software</span>
          </div>

          {nodes.map((n, i) => (
            <button
              key={n.label}
              type="button"
              className={`orbit__node ${i === active ? 'is-active' : ''}`}
              style={{ left: `${(points[i].x / W) * 100}%`, top: `${(points[i].y / H) * 100}%` }}
              onMouseEnter={() => { hovering.current = true; setActive(i) }}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              {n.label}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
