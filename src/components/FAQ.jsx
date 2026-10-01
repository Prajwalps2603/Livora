import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Sparkles, HelpCircle } from 'lucide-react'
import { useInView, fadeInUp, staggerContainer } from '../hooks/useAnimations'
import './FAQ.css'

const faqs = [
  {
    q: 'What does LIVORA build?',
    a: 'LIVORA builds custom web applications, Android applications, internal business ERPs, and automated workflows tailored to your operations.',
    category: 'Scope',
    color: 'var(--color-accent)',
    bgGradient: 'none',
    borderGlow: 'var(--color-border)',
  },
  {
    q: 'Can you build software for our specific business?',
    a: 'Yes. We understand your unique workflow, team routines, and pain points first, and then engineer a bespoke digital solution.',
    category: 'Custom Fit',
    color: 'var(--color-accent)',
    bgGradient: 'none',
    borderGlow: 'var(--color-border)',
  },
  {
    q: 'Do you work with small and growing businesses?',
    a: 'Absolutely. We design flexible solutions suited for your current stage and scale, with foundational pricing for early partners.',
    category: 'Clients',
    color: 'var(--color-accent)',
    bgGradient: 'none',
    borderGlow: 'var(--color-border)',
  },
  {
    q: 'Can you build a prototype before we commit?',
    a: 'Yes. For suitable projects, we develop an interactive prototype or working evaluation build so you can test it risk-free.',
    category: 'Risk-Free',
    color: 'var(--color-accent)',
    bgGradient: 'none',
    borderGlow: 'var(--color-border)',
  },
  {
    q: 'Do you provide ongoing maintenance and updates?',
    a: 'Yes. We offer long-term maintenance, cloud monitoring, performance scaling, and continuous feature expansion.',
    category: 'Support',
    color: 'var(--color-accent)',
    bgGradient: 'none',
    borderGlow: 'var(--color-border)',
  },
  {
    q: 'Can you modernize our existing website or app?',
    a: 'Yes. We can audit, refactor, and modernize your existing codebase, database, or UI to current industry standards.',
    category: 'Modernization',
    color: 'var(--color-accent)',
    bgGradient: 'none',
    borderGlow: 'var(--color-border)',
  },
  {
    q: 'What modern technologies do you use?',
    a: 'We use React, Node.js, Python, Java, Android, Flutter, Firebase, Google Cloud Platform, PostgreSQL, AI/ML, and REST APIs.',
    category: 'Tech Stack',
    color: 'var(--color-accent)',
    bgGradient: 'none',
    borderGlow: 'var(--color-border)',
  },
  {
    q: 'How long does development usually take?',
    a: 'Typical timelines range from 2–4 weeks for streamlined apps or prototypes, and 6–10 weeks for comprehensive business systems.',
    category: 'Timeline',
    color: 'var(--color-accent)',
    bgGradient: 'none',
    borderGlow: 'var(--color-border)',
  },
  {
    q: 'Do you offer digital marketing & branding?',
    a: 'Yes. Beyond software, we offer social media marketing, digital brand design, stationery kits, and ATS resume solutions.',
    category: 'Marketing',
    color: 'var(--color-accent)',
    bgGradient: 'none',
    borderGlow: 'var(--color-border)',
  },
]

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      className={`faq__item glass-card ${open ? 'faq__item--open' : ''}`}
      variants={fadeInUp}
      transition={{ duration: 0.4 }}
      style={{ '--faq-glow': faq.borderGlow }}
    >
      {/* Background Gradient Layer */}
      <div
        className="faq__item-bg-gradient"
        style={{ background: faq.bgGradient }}
      />

      {/* Watermark */}
      <div className="faq__item-watermark">
        <HelpCircle size={80} />
      </div>

      <button
        className="faq__question"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <div className="faq__question-content">
          <span className="faq__category-tag" style={{ color: faq.color, background: 'var(--tint)' }}>
            {faq.category}
          </span>
          <span className="faq__question-text">{faq.q}</span>
        </div>
        <div className={`faq__chevron-wrap ${open ? 'faq__chevron-wrap--open' : ''}`} style={{ color: faq.color }}>
          <ChevronDown size={18} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="faq__answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [ref, inView] = useInView()

  // 3 independent columns so expanding one card only moves items in that column
  const col1 = [faqs[0], faqs[3], faqs[6]]
  const col2 = [faqs[1], faqs[4], faqs[7]]
  const col3 = [faqs[2], faqs[5], faqs[8]]

  return (
    <section className="section faq" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div className="section-badge" variants={fadeInUp} transition={{ duration: 0.5 }}>
            <Sparkles size={14} /> Questions & Answers
          </motion.div>
          <motion.h2 className="section-title" variants={fadeInUp} transition={{ duration: 0.5 }}>
            Frequently Asked <em>Questions.</em>
          </motion.h2>
          <motion.p className="section-subtitle" variants={fadeInUp} transition={{ duration: 0.5 }}>
            Everything you need to know about working with LIVORA, our process, and our technology.
          </motion.p>
        </motion.div>

        {/* 3 Independent Column Masonry */}
        <motion.div
          className="faq__columns-container"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="faq__column">
            {col1.map((faq) => (
              <FAQItem key={faq.q} faq={faq} />
            ))}
          </div>

          <div className="faq__column">
            {col2.map((faq) => (
              <FAQItem key={faq.q} faq={faq} />
            ))}
          </div>

          <div className="faq__column">
            {col3.map((faq) => (
              <FAQItem key={faq.q} faq={faq} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
