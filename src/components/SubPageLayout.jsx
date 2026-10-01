import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, ArrowUpRight, Sparkles } from 'lucide-react'
import './SubPageLayout.css'

export default function SubPageLayout({
  badge,
  title,
  titleAccent,
  subtitle,
  breadcrumbParent = 'About Us',
  breadcrumbCurrent,
  onNavigateHome,
  onNavigateContact,
  children,
}) {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = `${title} — LIVORA`
  }, [title])

  return (
    <div className="subpage-wrapper">
      {/* Background Subtle Watermark */}
      <div className="subpage-watermark" aria-hidden="true">
        LIVORA
      </div>

      {/* Hero Header */}
      <header className="subpage-hero">
        <div className="container">
          <motion.div
            className="subpage-hero__content"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Breadcrumbs */}
            <div className="subpage-breadcrumb">
              <button onClick={onNavigateHome} className="subpage-breadcrumb__home">
                Home
              </button>
              <span className="subpage-breadcrumb__sep">/</span>
              <span className="subpage-breadcrumb__parent">{breadcrumbParent}</span>
              <span className="subpage-breadcrumb__sep">/</span>
              <span className="subpage-breadcrumb__current">{breadcrumbCurrent || title}</span>
            </div>

            {badge && (
              <div className="section-badge">
                <Sparkles size={14} /> {badge}
              </div>
            )}

            <h1 className="subpage-title">
              {title} {titleAccent && <span className="subpage-title-accent">{titleAccent}</span>}
            </h1>

            {subtitle && <p className="subpage-subtitle">{subtitle}</p>}
          </motion.div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="subpage-main">{children}</main>

      {/* Bottom Conversion CTA */}
      <section className="section subpage-cta-section">
        <div className="container">
          <div className="subpage-cta-box glass-card">
            <h2 className="subpage-cta-title">Have a Project or Challenge in Mind?</h2>
            <p className="subpage-cta-desc">
              Connect directly with our lead developers and turn your idea into practical, reliable software.
            </p>
            <div className="subpage-cta-buttons">
              <button onClick={onNavigateContact} className="btn btn-primary btn-lg">
                Let's Talk <ArrowRight size={18} className="btn-arrow" />
              </button>
              <button onClick={onNavigateHome} className="btn btn-secondary btn-lg">
                Back to Overview <ArrowUpRight size={18} className="btn-arrow" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
