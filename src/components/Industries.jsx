import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView, fadeInUp, staggerContainer } from '../hooks/useAnimations'
import './SystemUI.css'
import './Industries.css'

const industries = [
  {
    name: 'Retail & Distribution',
    short: 'Retail',
    url: 'retail.system',
    title: 'Store & billing platform',
    note: 'Counter billing, stock and suppliers in one place.',
    modules: ['Billing & POS', 'Stock calendar', 'Suppliers', 'Sales', 'Fast movers', 'Reports'],
  },
  {
    name: 'Automobile Showrooms',
    short: 'Showroom',
    url: 'showroom.system',
    title: 'Showroom management platform',
    note: 'Leads, vehicle stock, test drives and follow-ups.',
    modules: ['Leads & enquiries', 'Test drives', 'Vehicle stock', 'Sales', 'Service bay', 'Reports'],
  },
  {
    name: 'Clinics & Healthcare',
    short: 'Healthcare',
    url: 'clinic.system',
    title: 'Clinic management platform',
    note: 'Patients, appointments, records and billing.',
    modules: ['Patients', 'Appointments', 'Records', 'Billing', 'Pharmacy', 'Reports'],
  },
  {
    name: 'Education & Coaching',
    short: 'Education',
    url: 'institute.system',
    title: 'Institute management platform',
    note: 'Admissions, timetables, attendance and fees.',
    modules: ['Admissions', 'Timetable', 'Notices', 'Fees', 'Attendance', 'Reports'],
  },
  {
    name: 'Manufacturing',
    short: 'Manufacturing',
    url: 'factory.system',
    title: 'Production & dispatch platform',
    note: 'Orders, production runs, raw material and dispatch.',
    modules: ['Work orders', 'Production plan', 'Quality checks', 'Dispatch', 'Raw material', 'Reports'],
  },
  {
    name: 'Service Businesses',
    short: 'Services',
    url: 'services.system',
    title: 'Bookings & jobs platform',
    note: 'Clients, bookings, staff and invoices.',
    modules: ['Clients', 'Bookings', 'Team', 'Invoices', 'Jobs done', 'Reports'],
  },
]

const statuses = ['Active', 'Pending', 'Done']
const rowNotes = ['Updated 2 min ago', '3 items need review', 'Synced with head office']
const statValues = ['₹18.4L', '42', '₹6.2L', '₹9.8L', '318', '₹4.1L']

/* The widget shown in each slot is fixed; the numbers shift per industry
   so every platform looks like its own product. */
function Widget({ slot, seed }) {
  if (slot === 0) {
    return (
      <div className="ind-table">
        <div className="ind-table__head"><span>Name</span><span>Status</span><span>Ref</span></div>
        {[0, 1, 2].map((r) => (
          <div className="ind-table__row" key={r}>
            <span>Record {101 + seed * 7 + r}</span>
            <span className={`sys-pill ${(r + seed) % 3 !== 1 ? 'is-lime' : ''}`}>{statuses[(r + seed) % 3]}</span>
            <span>A-{21 + seed + r}</span>
          </div>
        ))}
      </div>
    )
  }
  if (slot === 1) {
    return (
      <div className="ind-cal">
        {Array.from({ length: 21 }, (_, d) => (
          <span key={d} className={(d * (seed + 3) + seed) % 7 < 2 ? 'is-on' : ''}>{d + 1}</span>
        ))}
      </div>
    )
  }
  if (slot === 2) {
    return (
      <div className="sys-rows">
        {rowNotes.map((note, i) => (
          <span key={note} className={`sys-row ${i === seed % 3 ? 'is-lime' : ''}`}>{note}</span>
        ))}
      </div>
    )
  }
  if (slot === 3) {
    return (
      <>
        <span className="sys-label">This month</span>
        <span className="sys-value">{statValues[seed]}</span>
        <span className="sys-status">On track</span>
      </>
    )
  }
  if (slot === 4) {
    return (
      <div className="sys-bars ind-bars">
        {Array.from({ length: 7 }, (_, i) => (
          <span
            key={i}
            className={i === (seed + 3) % 7 ? 'is-lime' : ''}
            style={{ height: `${38 + ((i * 29 + seed * 17) % 60)}%` }}
          />
        ))}
      </div>
    )
  }
  const done = 52 + ((seed * 13) % 36)
  return (
    <>
      {[['Completed', done], ['In progress', 100 - done - 8]].map(([name, pct]) => (
        <div className="sys-progress" key={name}>
          <div className="sys-progress__head"><span>{name}</span><small>{pct}%</small></div>
          <div className="sys-progress__track"><i style={{ width: `${pct}%` }} /></div>
        </div>
      ))}
    </>
  )
}

export default function Industries() {
  const [ref, inView] = useInView()
  const [active, setActive] = useState(0)
  const picked = useRef(false)

  // Rotates by itself until the visitor chooses an industry
  useEffect(() => {
    if (!inView) return
    const timer = setInterval(() => {
      if (!picked.current) setActive((a) => (a + 1) % industries.length)
    }, 3600)
    return () => clearInterval(timer)
  }, [inView])

  const choose = (i) => {
    picked.current = true
    setActive(i)
  }

  const industry = industries[active]

  return (
    <section className="section industries" ref={ref}>
      <div className="container industries__container">
        <motion.div
          className="industries__copy"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div className="section-badge" variants={fadeInUp}>Industries</motion.div>
          <motion.h2 className="section-title industries__title" variants={fadeInUp}>
            One team.<br />Many <em>industries.</em>
          </motion.h2>
          <motion.p className="section-subtitle" variants={fadeInUp}>
            Pick a business. Watch the interface rebuild itself around how that business actually runs.
          </motion.p>

          <motion.ol className="industries__list" variants={fadeInUp}>
            {industries.map((item, i) => (
              <li key={item.name}>
                <button
                  type="button"
                  className={`industries__item ${i === active ? 'is-active' : ''}`}
                  onClick={() => choose(i)}
                >
                  <span className="industries__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="industries__name">
                    {item.name}
                    <small>{item.note}</small>
                  </span>
                  <span className="industries__dot" />
                </button>
              </li>
            ))}
          </motion.ol>
        </motion.div>

        <motion.div
          className="sys industries__window"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="sys__bar">
            <span className="sys__dots"><span /><span /><span /></span>
            <AnimatePresence mode="wait">
              <motion.span
                key={industry.url}
                className="sys__url"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                {industry.url}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="sys__body industries__body">
            <aside className="sys__side">
              <span className="industries__logo">{industry.short[0]}</span>
              {industry.modules.map((m, i) => (
                <span key={m} className={`sys__nav ${i === 0 ? 'is-active' : ''}`}>{m}</span>
              ))}
              <span className="industries__live">
                <span className="sys__toggles"><span /><span /><span /></span> live
              </span>
            </aside>

            <div className="sys__main">
              <div className="sys__top industries__top">
                <strong>{industry.title}</strong>
                <span className="sys-pill is-lime">{industry.short}</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={industry.name}
                  className="industries__grid"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    visible: { transition: { staggerChildren: 0.06 } },
                    exit: { transition: { staggerChildren: 0.02 } },
                  }}
                >
                  {industry.modules.map((m, slot) => (
                    <motion.div
                      key={m}
                      className="sys-tile industries__tile"
                      variants={{
                        hidden: { opacity: 0, y: 18, scale: 0.94 },
                        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                        exit: { opacity: 0, scale: 0.97, transition: { duration: 0.15 } },
                      }}
                    >
                      <span className="sys-label">{m}</span>
                      <Widget slot={slot} seed={active} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
