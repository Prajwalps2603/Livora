import React from 'react'
import { motion } from 'framer-motion'
import './PageSkeleton.css'

export default function PageSkeleton() {
  return (
    <motion.div
      className="page-skeleton"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="skeleton-container">
        {/* Navbar Skeleton */}
        <div className="skeleton-navbar">
          <div className="skeleton-logo skeleton-shimmer" />
          <div className="skeleton-nav-links">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="skeleton-nav-pill skeleton-shimmer" />
            ))}
          </div>
          <div className="skeleton-nav-btn skeleton-shimmer" />
        </div>

        {/* Hero Section Skeleton */}
        <div className="skeleton-hero">
          <div className="skeleton-hero-left">
            <div className="skeleton-badge skeleton-shimmer" />
            <div className="skeleton-title skeleton-shimmer" />
            <div className="skeleton-title skeleton-title--half skeleton-shimmer" />
            <div className="skeleton-desc skeleton-shimmer" />
            <div className="skeleton-desc skeleton-desc--short skeleton-shimmer" />
            <div className="skeleton-actions">
              <div className="skeleton-btn-primary skeleton-shimmer" />
              <div className="skeleton-btn-secondary skeleton-shimmer" />
            </div>
          </div>

          <div className="skeleton-hero-right">
            <div className="skeleton-dashboard skeleton-shimmer">
              <div className="skeleton-dash-header">
                <div className="skeleton-dots">
                  <span /><span /><span />
                </div>
                <div className="skeleton-dash-title skeleton-shimmer" />
              </div>
              <div className="skeleton-dash-body">
                <div className="skeleton-dash-sidebar">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="skeleton-dash-nav-item skeleton-shimmer" />
                  ))}
                </div>
                <div className="skeleton-dash-content">
                  <div className="skeleton-dash-stats">
                    <div className="skeleton-stat-card skeleton-shimmer" />
                    <div className="skeleton-stat-card skeleton-shimmer" />
                  </div>
                  <div className="skeleton-dash-chart skeleton-shimmer" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Header Skeleton */}
        <div className="skeleton-section-header">
          <div className="skeleton-badge skeleton-shimmer" />
          <div className="skeleton-title skeleton-title--center skeleton-shimmer" />
          <div className="skeleton-desc skeleton-desc--center skeleton-shimmer" />
        </div>

        {/* Cards Grid Skeleton (Services / Solutions / Portfolio) */}
        <div className="skeleton-grid-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="skeleton-card skeleton-shimmer">
              <div className="skeleton-card-top">
                <div className="skeleton-card-icon skeleton-shimmer" />
                <div className="skeleton-card-tag skeleton-shimmer" />
              </div>
              <div className="skeleton-card-title skeleton-shimmer" />
              <div className="skeleton-card-desc skeleton-shimmer" />
              <div className="skeleton-card-desc skeleton-card-desc--short skeleton-shimmer" />
              <div className="skeleton-card-footer">
                <div className="skeleton-card-pill skeleton-shimmer" />
                <div className="skeleton-card-pill skeleton-shimmer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
