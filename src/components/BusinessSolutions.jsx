import React from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Package,
  UserCog,
  Receipt,
  CalendarCheck,
  BarChart3,
  Zap,
  Settings2,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { useInView, fadeInUp, staggerContainer } from '../hooks/useAnimations'
import './BusinessSolutions.css'

const solutions = [
  {
    title: 'Customer Management',
    desc: 'Manage customers, leads, follow-ups and records from one centralized system.',
    icon: Users,
    color: 'var(--color-accent)',
    tag: 'CRM & Leads',
    bgGradient: 'none',
    borderGlow: 'var(--color-border)',
  },
  {
    title: 'Inventory Management',
    desc: 'Track products, stock levels, vendor purchases, and multi-location sales.',
    icon: Package,
    color: 'var(--color-accent)',
    tag: 'Stock & Orders',
    bgGradient: 'none',
    borderGlow: 'var(--color-border)',
  },
  {
    title: 'Employee Management',
    desc: 'Manage employees, biometric attendance, roles, payroll, and internal workflows.',
    icon: UserCog,
    color: 'var(--color-accent)',
    tag: 'HR & Workflows',
    bgGradient: 'none',
    borderGlow: 'var(--color-border)',
  },
  {
    title: 'Billing & Invoicing',
    desc: 'Simplify POS billing, automated GST invoicing, receipts, and maintain organized ledgers.',
    icon: Receipt,
    color: 'var(--color-accent)',
    tag: 'Finances & POS',
    bgGradient: 'none',
    borderGlow: 'var(--color-border)',
  },
  {
    title: 'Appointment Management',
    desc: 'Manage customer bookings, staff schedules, slot allocation, and automated reminders.',
    icon: CalendarCheck,
    color: '#E11D48',
    tag: 'Booking Engine',
    bgGradient: 'none',
    borderGlow: 'var(--color-border)',
  },
  {
    title: 'Reports & Analytics',
    desc: 'Turn operational data into executive dashboards, revenue insights, and exportable reports.',
    icon: BarChart3,
    color: 'var(--color-accent)',
    tag: 'Data Intelligence',
    bgGradient: 'none',
    borderGlow: 'var(--color-border)',
  },
  {
    title: 'Workflow Automation',
    desc: 'Eliminate repetitive copy-pasting, manual emailing, and routine operational bottlenecks.',
    icon: Zap,
    color: 'var(--color-accent)',
    tag: 'Automated Logic',
    bgGradient: 'none',
    borderGlow: 'var(--color-border)',
  },
  {
    title: 'Custom Management Systems',
    desc: "Bespoke digital architecture engineered specifically around your team's exact workflow.",
    icon: Settings2,
    color: 'var(--color-accent)',
    tag: 'Tailored ERP/SaaS',
    bgGradient: 'none',
    borderGlow: 'var(--color-border)',
  },
]

export default function BusinessSolutions() {
  const [ref, inView] = useInView()

  const scrollToContact = (e) => {
    e.preventDefault()
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="solutions" className="section solutions" ref={ref}>
      <div className="liquid-bg liquid-bg-2" />
      <div className="container">
        <motion.div
          className="section-header"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div className="section-badge" variants={fadeInUp} transition={{ duration: 0.5 }}>
            <Sparkles size={14} /> Business Solutions
          </motion.div>
          <motion.h2 className="section-title" variants={fadeInUp} transition={{ duration: 0.5 }}>
            Software That Solves <em>Real Business Problems.</em>
          </motion.h2>
          <motion.p className="section-subtitle" variants={fadeInUp} transition={{ duration: 0.5 }}>
            Purpose-built software modules designed to streamline operations, cut costs, and automate daily processes.
          </motion.p>
        </motion.div>

        <motion.div
          className="solutions__grid"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {solutions.map((sol) => {
            const Icon = sol.icon
            return (
              <motion.div
                key={sol.title}
                className="solutions__card glass-card"
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.02 }}
                style={{ '--card-border-glow': sol.borderGlow }}
              >
                {/* Custom Gradient & Pattern Background */}
                <div
                  className="solutions__card-bg-gradient"
                  style={{ background: sol.bgGradient }}
                />
                <div className="solutions__card-watermark-icon">
                  <Icon size={90} />
                </div>

                <div className="solutions__card-top">
                  <div
                    className="solutions__card-icon"
                    style={{ background: 'var(--tint)', color: sol.color }}
                  >
                    <Icon size={24} />
                  </div>
                  <span className="solutions__card-tag" style={{ color: sol.color, background: 'var(--tint)' }}>
                    {sol.tag}
                  </span>
                </div>

                <h3 className="solutions__card-title">{sol.title}</h3>
                <p className="solutions__card-desc">{sol.desc}</p>

                <div className="solutions__card-footer">
                  <span className="solutions__card-learn">
                    Learn more <ArrowRight size={13} className="solutions__learn-arrow" />
                  </span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          className="solutions__cta"
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a href="#contact" className="btn btn-primary btn-lg" onClick={scrollToContact}>
            Have a Different Problem? Let's Build the Solution.
            <ArrowRight size={18} className="btn-arrow" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
