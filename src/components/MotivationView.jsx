import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Sparkles, Clock, Target, Rocket, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { fadeInUp, staggerContainer } from '../hooks/useAnimations'
import './MotivationView.css'

const motivationCatalysts = [
  {
    num: '01',
    icon: Clock,
    tag: 'Eradicating Friction',
    title: 'Ending Repetitive Daily Drudgery',
    desc: 'We see businesses losing hundreds of hours to copy-pasting between disconnected tools, manual report generation, and broken workflows. We are driven to automate and streamline these bottlenecks.',
    impact: 'Recovers up to 25+ team hours per week',
    color: 'var(--color-accent)',
  },
  {
    num: '02',
    icon: Target,
    tag: 'Accessible Engineering',
    title: 'Democratizing Custom Software',
    desc: 'Custom software shouldn’t be a luxury reserved for multi-million dollar corporations. We bring enterprise-grade web applications and internal tools to agile businesses and ambitious founders.',
    impact: 'Leveling the playing field against market giants',
    color: 'var(--color-accent)',
  },
  {
    num: '03',
    icon: Rocket,
    tag: 'Obsessive Craft',
    title: 'Engineering With Genuine Craftsmanship',
    desc: 'We are passionate developers who refuse to build clunky, bloated software. Every interface we engineer is built for 60fps fluidity, instant responses, and clean architectural maintainability.',
    impact: 'Sub-second interactions & delight for daily users',
    color: 'var(--color-accent)',
  },
  {
    num: '04',
    icon: ShieldCheck,
    tag: 'Tangible Outcomes',
    title: 'Direct Measurable Business Impact',
    desc: 'We don’t build software just to check boxes. We are motivated by seeing our tools directly increase client revenues, reduce operational overhead, and create lasting competitive advantages.',
    impact: 'Proven ROI & reliable software longevity',
    color: 'var(--color-accent)',
  },
]

export default function MotivationView() {
  return (
    <div className="motivation-view container">
      {/* 1. Motivation Hero Banner */}
      <motion.div
        className="motivation-hero-box glass-card"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="motivation-hero-glow" />
        <div className="section-badge">
          <Zap size={14} /> What Drives Us
        </div>
        <h2 className="motivation-hero-title">
          Driven By The Urge To <span className="text-gradient">Solve Real-World Friction.</span>
        </h2>
        <p className="motivation-hero-lead">
          Our motivation comes from seeing businesses struggle with fragmented tools and manual processes. We use precision technology to make work simpler, smarter, and infinitely more effective.
        </p>

        <div className="motivation-keywords">
          <span className="motivation-keyword">✦ Build What Matters</span>
          <span className="motivation-keyword">✦ Simplify Complexity</span>
          <span className="motivation-keyword">✦ Accelerate Operations</span>
          <span className="motivation-keyword">✦ Innovate Pragmatically</span>
        </div>
      </motion.div>

      {/* 2. Four Driving Catalysts Grid */}
      <div className="motivation-catalysts-section">
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={14} /> Core Catalysts
          </div>
          <h3 className="section-title">The Four Driving Forces Behind LIVORA</h3>
          <p className="section-subtitle">
            What gets us out of bed every morning and into the code editor.
          </p>
        </div>

        <motion.div
          className="motivation-catalysts-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {motivationCatalysts.map((cat) => {
            const IconComponent = cat.icon
            return (
              <motion.div
                key={cat.num}
                className="motivation-catalyst-card glass-card"
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.25 }}
                style={{ '--cat-theme': cat.color }}
              >
                <div className="motivation-catalyst-top">
                  <span className="motivation-catalyst-num">{cat.num}</span>
                  <div
                    className="motivation-catalyst-icon-wrap"
                    style={{ background: 'var(--tint)', color: cat.color }}
                  >
                    <IconComponent size={22} />
                  </div>
                  <span
                    className="motivation-catalyst-badge"
                    style={{ background: 'var(--tint)', color: cat.color, borderColor: 'var(--tint)' }}
                  >
                    {cat.tag}
                  </span>
                </div>

                <h4 className="motivation-catalyst-title">{cat.title}</h4>
                <p className="motivation-catalyst-desc">{cat.desc}</p>

                <div className="motivation-catalyst-impact">
                  <CheckCircle2 size={16} style={{ color: cat.color }} />
                  <span>{cat.impact}</span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
