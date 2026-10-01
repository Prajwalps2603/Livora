import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Smartphone,
  Cpu,
  ShoppingBag,
  Share2,
  FileCheck,
  GraduationCap,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react'
import { useInView, fadeInUp, staggerContainer } from '../hooks/useAnimations'
import showroomImg from '../assets/portfolio/showroom.svg'
import dashboardImg from '../assets/portfolio/dashboard.svg'
import inventoryImg from '../assets/portfolio/inventory.svg'
import androidImg from '../assets/portfolio/android.svg'
import brandImg from '../assets/portfolio/brand.svg'
import socialImg from '../assets/portfolio/social.svg'
import resumeImg from '../assets/portfolio/resume.svg'
import academicImg from '../assets/portfolio/academic.svg'
import './Portfolio.css'

const projects = [
  {
    title: 'Automobile Showroom Management',
    desc: 'Customer management, vehicle inventory tracking, sales follow-ups and automated reporting.',
    icon: LayoutDashboard,
    tag: 'Web App',
    badge: 'Concept Project',
    color: 'var(--color-accent)',
    stats: 'Multi-branch Support',
    image: showroomImg,
  },
  {
    title: 'Business Management Dashboard',
    desc: 'Centralized business operations, KPI analytics, team task tracking and revenue charts.',
    icon: LayoutDashboard,
    tag: 'Internal Tool',
    badge: 'Concept Project',
    color: 'var(--color-accent)',
    stats: 'Real-time Metrics',
    image: dashboardImg,
  },
  {
    title: 'Inventory & Order System',
    desc: 'Automated stock alerts, supplier management, billing workflows and barcode integration.',
    icon: ShoppingBag,
    tag: 'Automation',
    badge: 'Demo Project',
    color: 'var(--color-accent)',
    stats: 'Low-stock Alerts',
    image: inventoryImg,
  },
  {
    title: 'Android Business Application',
    desc: 'Dedicated mobile application for field employees, delivery tracking, and direct customer ordering.',
    icon: Smartphone,
    tag: 'Android',
    badge: 'Concept Project',
    color: 'var(--color-accent)',
    stats: 'Offline Support',
    image: androidImg,
  },
  {
    title: 'Brand Identity & Stationery Suite',
    desc: 'Cohesive visual identity, vector logo marks, letterheads, invoice templates and corporate cards.',
    icon: Cpu,
    tag: 'Branding',
    badge: 'Design System',
    color: 'var(--color-accent)',
    stats: 'Vector Assets',
    image: brandImg,
  },
  {
    title: 'Social Media Growth Engine',
    desc: 'Targeted ad creatives, calendar scheduling, content production and lead-gen funnels.',
    icon: Share2,
    tag: 'Marketing',
    badge: 'Campaign',
    color: 'var(--color-accent)',
    stats: '+320% Reach',
    image: socialImg,
  },
  {
    title: 'ATS-Optimized Resumes & Portfolios',
    desc: 'Precision resume templates, keyword ranking optimization, and personal developer portfolio sites.',
    icon: FileCheck,
    tag: 'Career Tool',
    badge: 'Template Kit',
    color: 'var(--color-accent)',
    stats: '99% ATS Pass',
    image: resumeImg,
  },
  {
    title: 'Academic & Research Portal',
    desc: 'Project source code, documentation templates, report generators and milestone trackers.',
    icon: GraduationCap,
    tag: 'Student Solution',
    badge: 'Academic',
    color: 'var(--color-accent)',
    stats: 'Complete Docs',
    image: academicImg,
  },
]

// Duplicate projects to create a seamless infinite loop
const doubleProjects = [...projects, ...projects]

export default function Portfolio() {
  const [ref, inView] = useInView()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section id="work" className="section portfolio" ref={ref}>
      <div className="liquid-bg liquid-bg-3" />
      <div className="container">
        <motion.div
          className="section-header"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}
        >
          <motion.div className="section-badge" variants={fadeInUp} transition={{ duration: 0.5 }}>
            <Sparkles size={14} /> Portfolio
          </motion.div>
          <motion.h2 className="section-title" variants={fadeInUp} transition={{ duration: 0.5 }}>
            Things We're <em>Building.</em>
          </motion.h2>
          <motion.p className="section-subtitle" variants={fadeInUp} transition={{ duration: 0.5 }}>
            Explore practical applications, business dashboards, and digital tools we build from scratch.
          </motion.p>
        </motion.div>
      </div>

      {/* Infinite Seamless Scrolling Slideshow Track */}
      <div
        className="portfolio__infinite-viewport"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`portfolio__infinite-track ${isHovered ? 'portfolio__infinite-track--paused' : ''}`}>
          {doubleProjects.map((project, idx) => {
            const Icon = project.icon
            return (
              <div key={`${project.title}-${idx}`} className="portfolio__infinite-item">
                <motion.div
                  className="portfolio__card glass-card"
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="portfolio__card-visual" style={{ '--project-color': project.color }}>
                    <img
                      src={project.image}
                      alt={`${project.title} illustration`}
                      className="portfolio__card-img"
                      loading="lazy"
                      draggable="false"
                    />
                    <div className="portfolio__card-shade" />
                    <span className="portfolio__card-badge">
                      <span className="portfolio__card-badge-dot" style={{ background: project.color }} />
                      {project.badge}
                    </span>
                    <span className="portfolio__card-open" aria-hidden="true">
                      <ArrowUpRight size={18} />
                    </span>
                    <span className="portfolio__card-icon" style={{ color: project.color }}>
                      <Icon size={18} />
                    </span>
                  </div>

                  <div className="portfolio__card-info">
                    <div className="portfolio__card-meta">
                      <span className="portfolio__card-tag" style={{ color: project.color, background: 'var(--tint)' }}>
                        {project.tag}
                      </span>
                      <span className="portfolio__card-stat">{project.stats}</span>
                    </div>
                    <h3 className="portfolio__card-title">{project.title}</h3>
                    <p className="portfolio__card-desc">{project.desc}</p>
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
