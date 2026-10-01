import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  Lightbulb,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users2,
  Compass,
  Eye,
  Flame,
  Layers,
  HeartHandshake,
  ShieldCheck,
  Zap,
  TrendingUp,
  Target,
  Cpu,
  Smartphone,
  LayoutDashboard,
  Share2,
  Palette,
  GraduationCap,
  Mail,
  Phone,
  MessageCircle,
  Code2,
  Check,
  ArrowUpRight,
  Clock,
  ChevronRight,
} from 'lucide-react'
import { fadeInUp, fadeInScale, fadeInLeft, fadeInRight, staggerContainer, staggerSlow } from '../hooks/useAnimations'
import './AboutPage.css'

export default function AboutPage({ onNavigateHome, onNavigateContact, onNavigateServices, onNavigatePurpose }) {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'About LIVORA — Our Identity & Purpose'
  }, [])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = 90
      const y = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const values = [
    {
      title: 'Customer First',
      desc: "We listen carefully, understand the requirement and build around the customer's actual needs.",
      icon: HeartHandshake,
      color: 'var(--color-accent)',
    },
    {
      title: 'Simplicity',
      desc: 'Technology should make things easier, not more complicated.',
      icon: Zap,
      color: 'var(--color-accent)',
    },
    {
      title: 'Innovation',
      desc: 'We continuously explore better ways to solve problems and create useful digital experiences.',
      icon: Sparkles,
      color: 'var(--color-accent)',
    },
    {
      title: 'Transparency',
      desc: 'Clear communication, realistic expectations and honest discussions are important to every project.',
      icon: ShieldCheck,
      color: 'var(--color-accent)',
    },
    {
      title: 'Quality',
      desc: 'We aim to build reliable, maintainable and useful solutions—not just something that works temporarily.',
      icon: CheckCircle2,
      color: 'var(--color-accent)',
    },
    {
      title: 'Continuous Growth',
      desc: 'Every project gives us an opportunity to learn, improve and build something better.',
      icon: TrendingUp,
      color: 'var(--color-accent)',
    },
  ]

  const approachSteps = [
    {
      step: '01',
      title: 'Understand',
      desc: 'We first understand the business, people and problem.',
      color: 'var(--color-accent)',
    },
    {
      step: '02',
      title: 'Simplify',
      desc: 'We identify what can be improved, automated or made easier.',
      color: 'var(--color-accent)',
    },
    {
      step: '03',
      title: 'Build',
      desc: 'We design and develop a solution around the actual requirement.',
      color: 'var(--color-accent)',
    },
    {
      step: '04',
      title: 'Improve',
      desc: 'We collect feedback, refine the product and help it evolve.',
      color: 'var(--color-accent)',
    },
  ]

  const buildCategories = [
    {
      title: 'Software',
      icon: Code2,
      color: 'var(--color-accent)',
      items: [
        'Web Applications',
        'Android Applications',
        'Internal Business Applications',
        'Custom Dashboards',
        'Business Automation',
      ],
    },
    {
      title: 'Digital',
      icon: Share2,
      color: 'var(--color-accent)',
      items: [
        'Digital Marketing',
        'Social Media Marketing',
      ],
    },
    {
      title: 'Creative',
      icon: Palette,
      color: 'var(--color-accent)',
      items: [
        'Stationery Design',
        'Brand Materials',
        'ATS-Friendly Resumes',
      ],
    },
    {
      title: 'Academic',
      icon: GraduationCap,
      color: 'var(--color-accent)',
      items: [
        'Web Projects',
        'Android Projects',
        'Technical Projects',
        'Documentation & Presentation Support',
      ],
    },
  ]

  const promises = [
    {
      title: 'We Listen',
      desc: 'We understand before we build.',
      color: 'var(--color-accent)',
    },
    {
      title: 'We Communicate',
      desc: 'You always know what is happening.',
      color: 'var(--color-accent)',
    },
    {
      title: 'We Build Around Your Needs',
      desc: 'Your requirements guide the solution.',
      color: 'var(--color-accent)',
    },
    {
      title: 'We Keep Improving',
      desc: "The relationship doesn't have to end when the project launches.",
      color: 'var(--color-accent)',
    },
  ]

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

  return (
    <div className="about-page">
      {/* Background Watermark Typography */}
      <div className="about-page__giant-watermark" aria-hidden="true">
        IDENTITY
      </div>

      {/* --- HERO SECTION --- */}
      <section className="about-hero">
        <div className="container">
          <motion.div
            className="about-hero__content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Breadcrumb / Back Link */}
            <div className="about-hero__breadcrumb">
              <button onClick={onNavigateHome} className="about-hero__back-btn">
                ← Back to Home
              </button>
              <span className="about-hero__breadcrumb-sep">/</span>
              <span className="about-hero__breadcrumb-current">About LIVORA</span>
            </div>

            <div className="section-badge">
              <Sparkles size={14} /> About LIVORA
            </div>

            <h1 className="about-hero__title">
              We Don't Just Build Software. <br />
              <span className="about-hero__title-accent">We Build Solutions.</span>
            </h1>

            <p className="about-hero__subtitle">
              LIVORA is a digital solutions studio focused on turning ideas, business challenges and everyday problems into practical technology that makes work simpler, smarter and more efficient.
            </p>

            <div className="about-hero__actions">
              <button
                onClick={onNavigateContact}
                className="btn btn-primary btn-lg"
              >
                Let's Work Together <ArrowRight size={18} className="btn-arrow" />
              </button>
              <button
                onClick={() => scrollToSection('purpose')}
                className="btn btn-secondary btn-lg"
              >
                Explore What We Do <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- 1. OUR PURPOSE --- */}
      <section id="purpose" className="section about-purpose">
        <div className="container">
          <motion.div
            className="about-purpose__box glass-card"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="about-purpose__glow" />

            <div className="about-purpose__header-row">
              <div className="section-badge">
                <Compass size={14} /> 1. Our Purpose
              </div>
              <h2 className="about-purpose__title">
                Why LIVORA Exists: <span className="text-gradient">Technology Should Adapt to Humans.</span>
              </h2>
              <p className="about-purpose__lead">
                Many businesses struggle with manual spreadsheet chaos, disconnected apps, and rigid off-the-shelf software that fails to fit real workflows. LIVORA was founded to bridge this gap by building custom digital solutions tailored strictly to human habits.
              </p>
            </div>

            {/* 5-Stage Problem-to-Growth Pipeline */}
            <div className="about-purpose__pipeline">
              <div className="about-purpose__card glass-card">
                <div className="about-purpose__card-header">
                  <span className="about-purpose__card-num" style={{ color: '#EF4444' }}>01</span>
                  <div className="about-purpose__icon-box" style={{ background: 'var(--tint)', color: '#EF4444' }}>
                    <AlertTriangle size={18} />
                  </div>
                  <span className="about-purpose__step-badge about-purpose__step-badge--problem">Friction</span>
                </div>
                <h4 className="about-purpose__card-title">Friction Discovery</h4>
                <p className="about-purpose__card-desc">Audit manual spreadsheets & repetitive entry points to pinpoint 100% of operational drag.</p>
              </div>

              <div className="about-purpose__arrow">→</div>

              <div className="about-purpose__card glass-card">
                <div className="about-purpose__card-header">
                  <span className="about-purpose__card-num" style={{ color: 'var(--color-accent)' }}>02</span>
                  <div className="about-purpose__icon-box" style={{ background: 'var(--tint)', color: 'var(--color-accent)' }}>
                    <Lightbulb size={18} />
                  </div>
                  <span className="about-purpose__step-badge about-purpose__step-badge--idea">Strategy</span>
                </div>
                <h4 className="about-purpose__card-title">Strategy Blueprint</h4>
                <p className="about-purpose__card-desc">Bespoke UI/UX wireframes and lean database schemas designed around your team's natural workflow.</p>
              </div>

              <div className="about-purpose__arrow">→</div>

              <div className="about-purpose__card glass-card about-purpose__card--highlight">
                <div className="about-purpose__card-header">
                  <span className="about-purpose__card-num" style={{ color: 'var(--color-accent)' }}>03</span>
                  <div className="about-purpose__icon-box" style={{ background: 'var(--tint)', color: 'var(--color-accent)' }}>
                    <Code2 size={18} />
                  </div>
                  <span className="about-purpose__step-badge about-purpose__step-badge--solution">Core Engine</span>
                </div>
                <h4 className="about-purpose__card-title">Custom Software</h4>
                <p className="about-purpose__card-desc">High-velocity web apps, Android systems, and automation engines with 100% IP ownership.</p>
              </div>

              <div className="about-purpose__arrow">→</div>

              <div className="about-purpose__card glass-card">
                <div className="about-purpose__card-header">
                  <span className="about-purpose__card-num" style={{ color: 'var(--color-accent)' }}>04</span>
                  <div className="about-purpose__icon-box" style={{ background: 'var(--tint)', color: 'var(--color-accent)' }}>
                    <ShieldCheck size={18} />
                  </div>
                  <span className="about-purpose__step-badge about-purpose__step-badge--validation">Validation</span>
                </div>
                <h4 className="about-purpose__card-title">Sandbox Testing</h4>
                <p className="about-purpose__card-desc">Staff evaluation on live staging builds with real data before milestone sign-off.</p>
              </div>

              <div className="about-purpose__arrow">→</div>

              <div className="about-purpose__card glass-card">
                <div className="about-purpose__card-header">
                  <span className="about-purpose__card-num" style={{ color: 'var(--color-accent)' }}>05</span>
                  <div className="about-purpose__icon-box" style={{ background: 'var(--tint)', color: 'var(--color-accent)' }}>
                    <TrendingUp size={18} />
                  </div>
                  <span className="about-purpose__step-badge about-purpose__step-badge--growth">Velocity</span>
                </div>
                <h4 className="about-purpose__card-title">Compounding Scale</h4>
                <p className="about-purpose__card-desc">Permanently recovering 25+ weekly hours and operating on a resilient scalable codebase.</p>
              </div>
            </div>

            {/* Purpose Action Callout */}
            <div className="about-purpose__footer-cta">
              <button
                type="button"
                className="btn btn-primary"
                onClick={onNavigatePurpose || onNavigateServices}
              >
                <span>Explore Interactive Purpose Journey & Calculator</span>
                <ArrowRight size={16} className="btn-arrow" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- 2. OUR MISSION & DIRECTIVES --- */}
      <section id="mission" className="section about-mission">
        <div className="container">
          {/* Mission Hero Banner */}
          <motion.div
            className="about-mission__banner glass-card"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="about-mission__banner-glow" />
            <div className="section-badge">
              <Flame size={14} /> 2. Our Mission
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

          {/* Core Mission Directives Matrix */}
          <div className="about-mission__directives-section">
            <div className="section-header" style={{ marginBottom: 'var(--space-xl)' }}>
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
        </div>
      </section>

      {/* --- 3. OUR VISION --- */}
      <section id="vision" className="section about-vision">
        <div className="container">
          <motion.div
            className="about-vision__card glass-card"
            variants={fadeInScale}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="section-badge">
              <Eye size={14} /> Our Vision
            </div>
            <h2 className="about-vision__statement">
              To become a trusted digital solutions partner for businesses by making custom technology accessible, practical and valuable.
            </h2>
            <div className="about-vision__divider" />
            <p className="about-vision__desc">
              We envision a future where businesses don't have to change the way they work just to fit into software. Instead, technology should adapt to their needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- 4. OUR MOTIVATION: What Drives Us --- */}
      <section id="motivation" className="section about-motivation">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Zap size={14} /> Our Motivation
            </div>
            <h2 className="section-title">What Drives Us</h2>
            <p className="section-subtitle">
              Technology should solve problems—not create more of them.
            </p>
          </div>

          <motion.div
            className="about-motivation__card glass-card"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="about-motivation__text">
              Our motivation comes from seeing how businesses and individuals often spend time dealing with repetitive tasks, disconnected tools, manual processes and outdated systems. We want to use technology to simplify those experiences.
            </p>
            <p className="about-motivation__text">
              Whether it is automating a repetitive task, creating a custom business system, building a mobile application or helping a business establish its digital presence, we are motivated by creating solutions that have a real purpose.
            </p>

            {/* Visual Keywords: Build · Simplify · Improve · Innovate */}
            <div className="about-motivation__keywords">
              <span className="about-keyword">Build</span>
              <span className="about-keyword-dot">·</span>
              <span className="about-keyword">Simplify</span>
              <span className="about-keyword-dot">·</span>
              <span className="about-keyword">Improve</span>
              <span className="about-keyword-dot">·</span>
              <span className="about-keyword">Innovate</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- 5. OUR PHILOSOPHY --- */}
      <section id="philosophy" className="section about-philosophy">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Layers size={14} /> Our Philosophy
            </div>
            <h2 className="section-title">Technology Should Adapt to You.</h2>
            <p className="section-subtitle">
              We believe software should fit the people using it. Instead of asking businesses to completely change their workflow to match an existing product, we understand the workflow first and then build technology around it.
            </p>
          </div>

          {/* Visual Comparison: Traditional vs LIVORA */}
          <div className="about-philosophy__comparison">
            {/* Traditional */}
            <motion.div
              className="about-philosophy__box about-philosophy__box--traditional glass-card"
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="about-philosophy__tag about-philosophy__tag--traditional">Traditional Approach</span>
              <div className="about-philosophy__chain">
                <span className="about-philosophy__node">Business</span>
                <span className="about-philosophy__arrow">→</span>
                <span className="about-philosophy__node about-philosophy__node--friction">Adapt to Software</span>
              </div>
              <p className="about-philosophy__note">
                Forced operational adjustments, training overhead, and rigid templates.
              </p>
            </motion.div>

            <div className="about-philosophy__vs-badge">VS</div>

            {/* LIVORA */}
            <motion.div
              className="about-philosophy__box about-philosophy__box--livora glass-card"
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="about-philosophy__tag about-philosophy__tag--livora">LIVORA Approach</span>
              <div className="about-philosophy__chain">
                <span className="about-philosophy__node">Business</span>
                <span className="about-philosophy__arrow">→</span>
                <span className="about-philosophy__node">Understand</span>
                <span className="about-philosophy__arrow">→</span>
                <span className="about-philosophy__node">Design</span>
                <span className="about-philosophy__arrow">→</span>
                <span className="about-philosophy__node">Build</span>
                <span className="about-philosophy__arrow">→</span>
                <span className="about-philosophy__node about-philosophy__node--solution">Solution</span>
              </div>
              <p className="about-philosophy__note">
                Custom software engineered directly around how you and your team naturally work.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 6. OUR VALUES: What We Believe In --- */}
      <section id="values" className="section about-values">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <ShieldCheck size={14} /> Core Principles
            </div>
            <h2 className="section-title">What We Believe In</h2>
            <p className="section-subtitle">
              Guiding principles that govern how we engineer software and collaborate with clients every day.
            </p>
          </div>

          <motion.div
            className="about-values__grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((v) => {
              const Icon = v.icon
              return (
                <motion.div
                  key={v.title}
                  className="about-values__card glass-card"
                  variants={fadeInUp}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.35 }}
                  style={{ '--val-color': v.color }}
                >
                  <div className="about-values__icon-wrap" style={{ background: 'var(--tint)', color: v.color }}>
                    <Icon size={24} />
                  </div>
                  <h3 className="about-values__card-title">{v.title}</h3>
                  <p className="about-values__card-desc">{v.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* --- 7. OUR APPROACH: How We Think --- */}
      <section id="approach" className="section about-approach">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Compass size={14} /> Methodology
            </div>
            <h2 className="section-title">How We Think</h2>
            <p className="section-subtitle">
              A transparent, 4-step engineering process designed to eliminate guesswork and deliver reliable software.
            </p>
          </div>

          <div className="about-approach__grid">
            {approachSteps.map((step) => (
              <motion.div
                key={step.step}
                className="about-approach__card glass-card"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.35 }}
                style={{ '--step-color': step.color }}
              >
                <div className="about-approach__number" style={{ color: step.color }}>
                  {step.step}
                </div>
                <h3 className="about-approach__title">{step.title}</h3>
                <p className="about-approach__desc">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 8. WHAT WE BUILD: From Ideas to Digital Solutions --- */}
      <section id="what-we-build" className="section about-build">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Cpu size={14} /> Solutions Portfolio
            </div>
            <h2 className="section-title">From Ideas to Digital Solutions</h2>
            <p className="section-subtitle">
              Our work spans software, applications, business systems, marketing and digital design.
            </p>
          </div>

          <div className="about-build__grid">
            {buildCategories.map((cat) => {
              const Icon = cat.icon
              return (
                <motion.div
                  key={cat.title}
                  className="about-build__card glass-card"
                  variants={fadeInScale}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.35 }}
                  style={{ '--cat-color': cat.color }}
                >
                  <div className="about-build__header">
                    <div className="about-build__icon-wrap" style={{ background: 'var(--tint)', color: cat.color }}>
                      <Icon size={22} />
                    </div>
                    <h3 className="about-build__card-title">{cat.title}</h3>
                  </div>

                  <ul className="about-build__list">
                    {cat.items.map((item, idx) => (
                      <li key={idx} className="about-build__item" onClick={onNavigateServices}>
                        <Check size={14} className="about-build__check" style={{ color: cat.color }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* --- 9. OUR TEAM: The People Behind LIVORA --- */}
      <section id="team" className="section about-team">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Users2 size={14} /> Leadership & Engineering
            </div>
            <h2 className="section-title">The People Behind LIVORA</h2>
            <p className="section-subtitle">
              LIVORA is built by a small team with a shared interest in technology, creativity and solving real-world problems.
            </p>
          </div>

          <div className="about-team__grid">
            {/* Prajwal M P */}
            <motion.div
              className="about-team__card glass-card"
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.35 }}
            >
              <div className="about-team__header">
                <div className="about-team__avatar about-team__avatar--prajwal">
                  <span>PM</span>
                </div>
                <div className="about-team__info">
                  <h3 className="about-team__name">Prajwal M P</h3>
                  <span className="about-team__role">Software Developer</span>
                </div>
              </div>

              <p className="about-team__bio">
                Focused on building custom applications, business systems and digital solutions.
              </p>

              <div className="about-team__contact-links">
                <a href="tel:+918618176469" className="about-team__link">
                  <Phone size={14} /> +91 8618176469
                </a>
                <a href="mailto:prajwalnair2603@gmail.com" className="about-team__link">
                  <Mail size={14} /> prajwalnair2603@gmail.com
                </a>
                <a
                  href="https://wa.me/918618176469"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-team__link about-team__link--whatsapp"
                >
                  <MessageCircle size={14} /> Chat on WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Nikhil K */}
            <motion.div
              className="about-team__card glass-card"
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.35 }}
            >
              <div className="about-team__header">
                <div className="about-team__avatar about-team__avatar--nikhil">
                  <span>NK</span>
                </div>
                <div className="about-team__info">
                  <h3 className="about-team__name">Nikhil K</h3>
                  <span className="about-team__role">Software Developer</span>
                </div>
              </div>

              <p className="about-team__bio">
                Focused on developing practical digital solutions and applications for businesses and users.
              </p>

              <div className="about-team__contact-links">
                <a href="tel:+917994162314" className="about-team__link">
                  <Phone size={14} /> +91 7994162314
                </a>
                <a href="mailto:nikhil@gmail.com" className="about-team__link">
                  <Mail size={14} /> nikhil@gmail.com
                </a>
                <a
                  href="https://wa.me/917994162314"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-team__link about-team__link--whatsapp"
                >
                  <MessageCircle size={14} /> Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 10. OUR PROMISE: What You Can Expect From LIVORA --- */}
      <section id="promise" className="section about-promise">
        <div className="container">
          <motion.div
            className="about-promise__container glass-card"
            variants={fadeInScale}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="section-header" style={{ marginBottom: 'var(--space-xl)' }}>
              <div className="section-badge">
                <Sparkles size={14} /> Commitment to Quality
              </div>
              <h2 className="section-title">What You Can Expect From LIVORA</h2>
            </div>

            <div className="about-promise__grid">
              {promises.map((p, idx) => (
                <div key={idx} className="about-promise__card" style={{ '--promise-color': p.color }}>
                  <div className="about-promise__check-icon" style={{ background: 'var(--tint)', color: p.color }}>
                    <CheckCircle2 size={20} />
                  </div>
                  <h3 className="about-promise__card-title">{p.title}</h3>
                  <p className="about-promise__card-desc">{p.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- 11. FINAL MESSAGE / CTA --- */}
      <section className="section about-cta">
        <div className="container">
          <motion.div
            className="about-cta__box glass-card"
            variants={fadeInScale}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="about-cta__glow" />
            <h2 className="about-cta__title">Have a Problem Worth Solving?</h2>
            <p className="about-cta__subtitle">
              Tell us what you're trying to improve. We'll explore how technology can help.
            </p>
            <div className="about-cta__buttons">
              <button onClick={onNavigateContact} className="btn btn-primary btn-lg">
                Start a Conversation <ArrowRight size={18} className="btn-arrow" />
              </button>
              <button onClick={onNavigateServices} className="btn btn-secondary btn-lg">
                View Our Services <ArrowUpRight size={18} className="btn-arrow" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
