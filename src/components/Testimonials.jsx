import React from 'react'
import { motion } from 'framer-motion'
import {
  Zap,
  Users,
  ArrowRight,
  HeartHandshake,
} from 'lucide-react'
import { useInView, fadeInUp, staggerContainer } from '../hooks/useAnimations'
import './Testimonials.css'

const advantages = [
  {
    icon: Users,
    title: '100% Dedicated Attention',
    desc: 'We strictly limit our active client roster so your project receives our undivided attention and direct founder engineering.',
    color: 'var(--lime)',
    tag: 'Founder-Led',
  },
  {
    icon: Zap,
    title: 'Rapid Prototyping & Iteration',
    desc: 'Zero agency bureaucracy. Experience working software in days, give direct feedback, and iterate at breakneck speed.',
    color: 'var(--lime)',
    tag: 'High Velocity',
  },
  {
    icon: HeartHandshake,
    title: 'Early Partner Advantage',
    desc: 'Foundational pricing, flexible milestone terms, and lifelong priority technical support as an early LIVORA partner.',
    color: 'var(--lime)',
    tag: 'VIP Terms',
  },
]

export default function Testimonials() {
  const [ref, inView] = useInView()

  const scrollToContact = (e) => {
    e.preventDefault()
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="section testimonials" ref={ref}>
      <div className="container">
        <motion.div
          className="partner ink"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Atmosphere */}
          <div className="partner__aurora partner__aurora--1" />
          <div className="partner__aurora partner__aurora--2" />
          <div className="partner__grid" />

          {/* Emblem: your business and LIVORA overlapping into a partnership */}
          <motion.div className="partner__venn" variants={fadeInUp} aria-hidden="true">
            <svg viewBox="0 0 440 220">
              <defs>
                <clipPath id="partnerVennClip">
                  <circle cx="170" cy="110" r="78" />
                </clipPath>
                <pattern id="partnerVennHatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <rect width="2" height="7" fill="#0D0D0C" opacity="0.35" />
                </pattern>
              </defs>

              <circle className="partner__venn-orbit" cx="220" cy="110" r="106" />
              <path className="partner__venn-marks" d="M24 20h14M31 13v14 M402 20h14M409 13v14 M24 200h14M31 193v14 M402 200h14M409 193v14" />

              <g clipPath="url(#partnerVennClip)">
                <circle className="partner__venn-overlap" cx="270" cy="110" r="78" />
                <circle cx="270" cy="110" r="78" fill="url(#partnerVennHatch)" />
              </g>
              <circle className="partner__venn-ring" cx="170" cy="110" r="78" />
              <circle className="partner__venn-ring partner__venn-ring--lime" cx="270" cy="110" r="78" />

              <circle className="partner__venn-dot" r="5">
                <animateMotion dur="7s" repeatCount="indefinite" path="M170 32 a78 78 0 1 1 0 156 a78 78 0 1 1 0 -156" />
              </circle>
              <circle className="partner__venn-dot partner__venn-dot--lime" r="5">
                <animateMotion dur="9s" repeatCount="indefinite" path="M270 188 a78 78 0 1 0 0 -156 a78 78 0 1 0 0 156" />
              </circle>

              <text className="partner__venn-label" x="124" y="106">Your</text>
              <text className="partner__venn-label" x="124" y="121">business</text>
              <text className="partner__venn-label partner__venn-label--lime" x="318" y="114">Livora</text>

              <path
                className="partner__venn-spark"
                d="M220 88c1.6 12.6 9.4 20.4 22 22-12.6 1.6-20.4 9.4-22 22-1.6-12.6-9.4-20.4-22-22 12.6-1.6 20.4-9.4 22-22z"
              />
            </svg>
          </motion.div>

          <div className="partner__header">
            <motion.div className="partner__eyebrow" variants={fadeInUp}>
              <span className="partner__eyebrow-dot" />
              Early Partner Program
            </motion.div>
            <motion.h2 className="partner__title" variants={fadeInUp}>
              We're just getting started.
              <br />
              <span className="testimonials__title-accent">Be our next success story.</span>
            </motion.h2>
            <motion.p className="partner__text" variants={fadeInUp}>
              As an agile, developer-led studio, we are currently handcrafting our first set of long-term digital solutions. That means your business gets our absolute highest priority.
            </motion.p>
          </div>

          <motion.div className="partner__cards" variants={staggerContainer}>
            {advantages.map((adv, i) => {
              const Icon = adv.icon
              return (
                <motion.div
                  key={adv.title}
                  className="partner__card"
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ '--adv-color': adv.color }}
                >
                  <span className="partner__card-num">0{i + 1}</span>
                  <div className="partner__card-top">
                    <span className="partner__card-icon"><Icon size={22} /></span>
                    <span className="partner__card-tag">{adv.tag}</span>
                  </div>
                  <h3 className="partner__card-title">{adv.title}</h3>
                  <p className="partner__card-desc">{adv.desc}</p>
                  <span className="partner__card-line" />
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div className="partner__cta" variants={fadeInUp}>
            <div className="partner__cta-info">
              <div className="partner__live">
                <span className="partner__live-dot" />
                Now accepting new priority projects
              </div>
              <p className="partner__cta-sub">
                Work directly with founders Prajwal &amp; Nikhil to transform your business.
              </p>
            </div>
            <a href="#contact" className="btn btn-primary btn-lg partner__cta-btn" onClick={scrollToContact}>
              Build With Us <ArrowRight size={18} className="btn-arrow" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
