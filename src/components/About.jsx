import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, CheckCircle, Sparkles, Code2, Users2 } from 'lucide-react'
import { useInView, fadeInUp, staggerContainer } from '../hooks/useAnimations'
import './About.css'

const highlights = [
  'Direct communication with the core developers',
  'Custom-built software tailored to your workflow',
  'Rapid prototypes & evaluation versions before commit',
  'End-to-end design, development & maintenance support',
]

export default function About() {
  const [ref, inView] = useInView()
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <section id="about" className="section about" ref={ref}>
      <div className="liquid-bg liquid-bg-2" />
      <div className="container" style={{ position: 'relative' }}>
        {/* Background Watermark */}
        <div className="about__bg-watermark">
          <Sparkles size={260} />
        </div>

        {/* Big Prominent Section Header */}
        <motion.div
          className="section-header about__main-header"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div className="section-badge" variants={fadeInUp} transition={{ duration: 0.5 }}>
            <Sparkles size={14} /> Who We Are
          </motion.div>
          <motion.h2 className="section-title about__main-title" variants={fadeInUp} transition={{ duration: 0.5 }}>
            Built by Developers.<br />
            <span className="about__title-gradient">Driven by Pure Problem Solving.</span>
          </motion.h2>
          <motion.p className="section-subtitle about__main-subtitle" variants={fadeInUp} transition={{ duration: 0.5 }}>
            LIVORA is a focused digital solutions studio that turns ideas and operational bottlenecks into custom, high-impact digital experiences.
          </motion.p>
        </motion.div>

        {/* 2-Column Content + Video Grid */}
        <div className="about__grid">
          {/* Left Column: Content */}
          <motion.div
            className="about__content"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.div className="about__sub-badge" variants={fadeInUp} transition={{ duration: 0.5 }}>
              <Users2 size={15} /> Small Team. Big Focus.
            </motion.div>

            <motion.h3 className="about__sub-title" variants={fadeInUp} transition={{ duration: 0.5 }}>
              Direct access to the developers building your software.
            </motion.h3>

            <motion.p className="about__lead" variants={fadeInUp} transition={{ duration: 0.5 }}>
              Founded by Prajwal M P and Nikhil K, LIVORA was built on a simple premise: skip the agency bureaucracy and connect business owners directly with senior software engineers.
            </motion.p>

            <motion.p className="about__text" variants={fadeInUp} transition={{ duration: 0.5 }}>
              We combine custom full-stack software development, modern UI/UX design, and practical business automation to craft digital tools that fit your exact workflow.
            </motion.p>

            <motion.div className="about__highlights" variants={fadeInUp} transition={{ duration: 0.5 }}>
              {highlights.map((item, idx) => (
                <div key={idx} className="about__highlight-item">
                  <CheckCircle size={18} className="about__highlight-icon" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Video Container */}
          <motion.div
            className="about__video-wrapper"
            variants={fadeInUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="about__video-glow" />
            <motion.div
              className="about__video-card glass-card"
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="about__video-header">
                <div className="about__video-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="about__video-badge">
                  <span className="about__video-badge-dot" />
                  LIVORA Studio Showcase
                </div>
                <span className="about__video-live">Reel</span>
              </div>

              <div className="about__video-media" onClick={togglePlay}>
                <video
                  ref={videoRef}
                  className="about__video-player"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster="/media/studio-reel-poster.jpg"
                >
                  <source src="/media/studio-reel.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Overlay Play/Pause Button */}
                <button
                  className={`about__video-play-btn ${!isPlaying ? 'about__video-play-btn--visible' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    togglePlay()
                  }}
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} style={{ marginLeft: 3 }} />}
                </button>

                <div className="about__video-caption">
                  <div className="about__video-caption-title">Crafting Custom Digital Systems</div>
                  <div className="about__video-caption-sub">Web • Android • Automation • Design</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
