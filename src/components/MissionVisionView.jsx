import React from 'react'
import { motion } from 'framer-motion'
import {
  Flame,
  Eye,
  ShieldCheck,
  Target,
  Layers,
  Zap,
  TrendingUp,
  Users2,
  CheckCircle2,
  Sparkles,
  HeartHandshake,
  ArrowRight,
} from 'lucide-react'
import { fadeInUp, staggerContainer } from '../hooks/useAnimations'
import './AboutPage.css'

const coreMissionDirectives = [
  {
    num: '01',
    icon: Target,
    tag: 'Discovery First',
    title: 'Understand Before Building',
    desc: 'Uncover the exact operational bottlenecks and user realities before writing a single line of code.',
    impact: 'Zero wasted dev cycles & crystal-clear roadmap',
    color: 'var(--color-accent)',
  },
  {
    num: '02',
    icon: Layers,
    tag: 'Workflow Alignment',
    title: 'Tailored Around Human Habits',
    desc: 'Shape software architecture to fit your team’s natural rhythm, not forcing you into rigid off-the-shelf templates.',
    impact: 'Instant team adoption with zero friction',
    color: 'var(--color-accent)',
  },
  {
    num: '03',
    icon: Zap,
    tag: 'Practical Simplicity',
    title: 'Zero Bloatware & High Velocity',
    desc: 'Deliver clean, lightning-fast interfaces that solve problems with intuitive ease and zero unnecessary complexity.',
    impact: 'Maximum speed, clarity & daily productivity',
    color: 'var(--color-accent)',
  },
  {
    num: '04',
    icon: TrendingUp,
    tag: 'Engineered Longevity',
    title: 'Built to Scale With Your Growth',
    desc: 'Architect resilient backend foundations and clean codebases that expand smoothly alongside your revenue.',
    impact: 'Future-proof reliability with zero costly rewrites',
    color: 'var(--color-accent)',
  },
  {
    num: '05',
    icon: Users2,
    tag: 'Direct Partnership',
    title: 'Long-Term Engineer Collaboration',
    desc: 'Partner directly with the founders and developers who build your system for ongoing evolution and dedicated support.',
    impact: 'Direct access, transparent updates & lasting trust',
    color: 'var(--color-accent)',
  },
]

const visionPillars = [
  {
    title: 'Adaptive Software Ecosystems',
    desc: 'Building intelligent software that evolves with everyday business demands without requiring disruptive overhauls.',
  },
  {
    title: 'Democratizing Custom Tech',
    desc: 'Empowering ambitious small and mid-market businesses with high-grade engineering that previously only enterprises could afford.',
  },
  {
    title: 'Human-Centered Digital Craft',
    desc: 'Proving that software built with empathy and clean design creates happier teams and measurable business growth.',
  },
]

export default function MissionVisionView() {
  return (
    <div className="mission-vision-view container">
      {/* 1. Main Mission Statement Banner */}
      <motion.div
        className="about-mission__banner glass-card"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="about-mission__banner-glow" />
        <div className="section-badge">
          <Flame size={14} /> Mission Statement
        </div>
        <h2 className="about-mission__title">
          Building Software That <span className="text-gradient">Actually Serves You.</span>
        </h2>
        <blockquote className="about-mission__statement-quote">
          “To build reliable, user-focused digital solutions that help businesses, professionals and organizations work smarter, operate efficiently and grow in a digital world.”
        </blockquote>
        
        <div className="about-mission__tags">
          <span className="about-mission__tag">✦ Human-Centric Architecture</span>
          <span className="about-mission__tag">✦ Zero Bloatware</span>
          <span className="about-mission__tag">✦ High Velocity Delivery</span>
          <span className="about-mission__tag">✦ Engineered for Longevity</span>
        </div>
      </motion.div>

      {/* 2. Core Mission Directives Matrix */}
      <div className="about-mission__directives-section" style={{ marginBottom: 'var(--space-4xl)' }}>
        <div className="section-header" style={{ marginBottom: 'var(--space-2xl)' }}>
          <div className="section-badge">
            <ShieldCheck size={14} /> Strategic Principles
          </div>
          <h3 className="section-title">Core Mission Directives</h3>
          <p className="section-subtitle">
            The 5 fundamental rules governing every line of code and technical decision at LIVORA.
          </p>
        </div>

        <motion.div
          className="about-mission__directives-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {coreMissionDirectives.map((dir) => {
            const DirIcon = dir.icon
            return (
              <motion.div
                key={dir.num}
                className="about-mission__directive-card glass-card"
                variants={fadeInUp}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                style={{ '--dir-color': dir.color }}
              >
                <div className="about-mission__directive-header">
                  <span className="about-mission__directive-number">{dir.num}</span>
                  <div
                    className="about-mission__directive-icon-box"
                    style={{ background: 'var(--tint)', color: dir.color }}
                  >
                    <DirIcon size={20} />
                  </div>
                  <span
                    className="about-mission__directive-badge"
                    style={{ background: 'var(--tint)', color: dir.color, borderColor: 'var(--tint)' }}
                  >
                    {dir.tag}
                  </span>
                </div>

                <h4 className="about-mission__directive-title">{dir.title}</h4>
                <p className="about-mission__directive-desc">{dir.desc}</p>

                <div className="about-mission__directive-impact">
                  <CheckCircle2 size={15} style={{ color: dir.color, flexShrink: 0 }} />
                  <span>{dir.impact}</span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* 3. Strategic Long-Term Vision */}
      <motion.div
        className="about-vision__card glass-card"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="section-badge">
          <Eye size={14} /> Strategic Vision
        </div>
        <h3 className="about-vision__title">Where LIVORA Is Heading</h3>
        <p className="about-vision__statement">
          “To be recognized as a trusted digital partner known for practical innovation, reliable software, and solutions that make a genuine difference in how people work.”
        </p>

        <div className="about-vision__pillars">
          {visionPillars.map((pillar, idx) => (
            <div key={idx} className="about-vision__pillar">
              <h4 className="about-vision__pillar-title">{pillar.title}</h4>
              <p className="about-vision__pillar-desc">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
