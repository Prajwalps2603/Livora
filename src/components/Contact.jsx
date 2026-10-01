import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Phone,
  Mail,
  MessageCircle,
  Sparkles,
  Zap,
  Globe,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Users2,
} from 'lucide-react'
import { useInView, fadeInUp, staggerContainer } from '../hooks/useAnimations'
import './Contact.css'

const serviceOptions = [
  'Web Application',
  'Android Application',
  'Internal Business Application',
  'Digital Marketing',
  'Social Media Marketing',
  'ATS Resume',
  'Stationery Design',
  'Academic Solution',
  'Other',
]

const quickActions = [
  {
    icon: Zap,
    label: 'Quick Project',
    desc: 'Need an urgent prototype or MVP? We ship at breakneck speed.',
    color: 'var(--color-accent)',
    tag: '1-2 Weeks Delivery',
    bgGradient: 'none',
    borderGlow: 'var(--color-border)',
  },
  {
    icon: Globe,
    label: 'Full Custom Solution',
    desc: 'End-to-end digital transformation tailored specifically to your business.',
    color: 'var(--color-accent)',
    tag: 'Complete System',
    bgGradient: 'none',
    borderGlow: 'var(--color-border)',
  },
  {
    icon: Sparkles,
    label: 'Free Strategy Call',
    desc: 'Talk directly with developers Prajwal & Nikhil to review requirements.',
    color: 'var(--color-accent)',
    tag: 'Zero Obligation',
    bgGradient: 'none',
    borderGlow: 'var(--color-border)',
  },
]

export default function Contact() {
  const [ref, inView] = useInView()
  const [form, setForm] = useState({
    name: '', business: '', email: '', phone: '', service: '', message: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const whatsappMsg = `Hi LIVORA! I'd like to discuss a project.\n\nName: ${form.name}\nBusiness: ${form.business}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service}\nMessage: ${form.message}`
    window.open(`https://wa.me/918618176469?text=${encodeURIComponent(whatsappMsg)}`, '_blank')
  }

  return (
    <section id="contact" className="section contact" ref={ref}>
      <div className="contact__bg">
        <div className="contact__bg-grid" />
        <div className="contact__bg-glow contact__bg-glow--1" />
        <div className="contact__bg-glow contact__bg-glow--2" />
      </div>

      <div className="container">
        <motion.div
          className="section-header"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div className="section-badge" variants={fadeInUp} transition={{ duration: 0.5 }}>
            <Sparkles size={14} /> Get In Touch
          </motion.div>
          <motion.h2 className="section-title contact__title" variants={fadeInUp} transition={{ duration: 0.5 }}>
            Let's Build Something<br />
            <span className="contact__title-accent">Extraordinary.</span>
          </motion.h2>
          <motion.p className="section-subtitle" variants={fadeInUp} transition={{ duration: 0.5 }}>
            Have an idea, an operational bottleneck, or a project to launch? Connect directly with the developers.
          </motion.p>
        </motion.div>

        {/* Quick action cards */}
        <motion.div
          className="contact__quick-actions"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <motion.div
                key={action.label}
                className="contact__quick-card glass-card"
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.02 }}
                style={{ '--contact-card-glow': action.borderGlow }}
              >
                <div
                  className="contact__card-bg-gradient"
                  style={{ background: action.bgGradient }}
                />
                <div className="contact__card-watermark">
                  <Icon size={100} />
                </div>
                <div className="contact__quick-top">
                  <div className="contact__quick-icon" style={{ background: 'var(--tint)', color: action.color }}>
                    <Icon size={22} />
                  </div>
                  <span className="contact__card-tag" style={{ color: action.color, background: 'var(--tint)' }}>
                    {action.tag}
                  </span>
                </div>
                <h4 className="contact__quick-title">{action.label}</h4>
                <p className="contact__quick-desc">{action.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          className="contact__wrapper"
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Contact Form with Framer Motion whileHover */}
          <motion.form
            className="contact__form glass-card"
            onSubmit={handleSubmit}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="contact__form-bg-gradient" />
            <div className="contact__form-header">
              <h3>Send us a message</h3>
              <p>Fill out the form and we'll get back to you within 24 hours.</p>
            </div>

            <div className="contact__form-grid">
              <div className="contact__field">
                <label htmlFor="name" className="contact__label">Name</label>
                <input type="text" id="name" name="name" className="contact__input" placeholder="Your name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="contact__field">
                <label htmlFor="business" className="contact__label">Business</label>
                <input type="text" id="business" name="business" className="contact__input" placeholder="Your business name" value={form.business} onChange={handleChange} />
              </div>
              <div className="contact__field">
                <label htmlFor="email" className="contact__label">Email</label>
                <input type="email" id="email" name="email" className="contact__input" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
              </div>
              <div className="contact__field">
                <label htmlFor="phone" className="contact__label">Phone</label>
                <input type="tel" id="phone" name="phone" className="contact__input" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} />
              </div>
            </div>

            <div className="contact__field">
              <label htmlFor="service" className="contact__label">Service Required</label>
              <input
                type="text"
                id="service"
                name="service"
                list="service-options-list"
                className="contact__input contact__datalist-input"
                placeholder="Choose a service or type your custom requirement..."
                value={form.service}
                onChange={handleChange}
                autoComplete="off"
                required
              />
              <datalist id="service-options-list">
                {serviceOptions.map(opt => (
                  <option key={opt} value={opt} />
                ))}
              </datalist>
            </div>

            <div className="contact__field">
              <label htmlFor="message" className="contact__label">Message</label>
              <textarea id="message" name="message" className="contact__input contact__textarea" placeholder="Tell us about your project or idea..." rows={4} value={form.message} onChange={handleChange} required />
            </div>

            <button type="submit" className="btn btn-primary btn-lg contact__submit">
              Send Enquiry <ArrowRight size={18} className="btn-arrow" />
            </button>
          </motion.form>

          {/* Right Column: Creative "Available for Projects" Container with Framer Motion whileHover */}
          <div className="contact__info">
            <motion.div
              className="contact__info-card glass-card"
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Radial Glow & Background Watermark */}
              <div className="contact__info-bg-gradient" />
              <div className="contact__card-watermark">
                <MessageCircle size={140} />
              </div>

              {/* Status Header Badge */}
              <div className="contact__avail-header">
                <div className="contact__avail-badge">
                  <span className="contact__avail-pulse" />
                  <span className="contact__avail-text">Available for Projects</span>
                </div>
                <span className="contact__avail-tag">Fast Response</span>
              </div>

              <div className="contact__avail-lead">
                Direct access to co-founders & lead software engineers. No middlemen.
              </div>

              {/* Developer Contact Cards */}
              <div className="contact__dev-grid">
                {/* Prajwal Card */}
                <a
                  href="https://wa.me/918618176469?text=Hi%20Prajwal,%20I'd%20like%20to%20discuss%20a%20project%20with%20LIVORA."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__dev-card"
                >
                  <div className="contact__dev-avatar contact__dev-avatar--prajwal">
                    <span>PM</span>
                  </div>
                  <div className="contact__dev-info">
                    <div className="contact__dev-name">Prajwal M P</div>
                    <div className="contact__dev-role">Full-Stack & Automation</div>
                    <div className="contact__dev-phone">+91 8618176469</div>
                  </div>
                  <ExternalLink size={14} className="contact__dev-arrow" />
                </a>

                {/* Nikhil Card */}
                <a
                  href="https://wa.me/917994162314?text=Hi%20Nikhil,%20I'd%20like%20to%20discuss%20a%20project%20with%20LIVORA."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__dev-card"
                >
                  <div className="contact__dev-avatar contact__dev-avatar--nikhil">
                    <span>NK</span>
                  </div>
                  <div className="contact__dev-info">
                    <div className="contact__dev-name">Nikhil K</div>
                    <div className="contact__dev-role">Mobile & Systems</div>
                    <div className="contact__dev-phone">+91 7994162314</div>
                  </div>
                  <ExternalLink size={14} className="contact__dev-arrow" />
                </a>
              </div>

              {/* Email Section */}
              <div className="contact__email-box">
                <span className="contact__email-label">
                  <Mail size={14} /> Official Email Inquiries:
                </span>
                <div className="contact__email-links">
                  <a href="mailto:prajwalnair2603@gmail.com" className="contact__email-pill">
                    prajwalnair2603@gmail.com
                  </a>
                  <a href="mailto:nikhil@gmail.com" className="contact__email-pill">
                    nikhil@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact__info-divider" />

              {/* Direct WhatsApp CTA Button */}
              <a
                href="https://wa.me/918618176469?text=Hi%20LIVORA!%20I'd%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="btn contact__whatsapp-cta-btn"
              >
                <div className="contact__whatsapp-pulse-ring" />
                <MessageCircle size={20} />
                <span>Chat Instantly on WhatsApp</span>
              </a>

              {/* Trust Features Checklist */}
              <div className="contact__trust-list">
                <div className="contact__trust-item">
                  <CheckCircle2 size={15} className="contact__trust-icon" />
                  <span>Free Initial Strategy Session</span>
                </div>
                <div className="contact__trust-item">
                  <CheckCircle2 size={15} className="contact__trust-icon" />
                  <span>Interactive Prototypes Available</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Stat Card with Framer Motion whileHover */}
            <motion.div
              className="contact__info-stat glass-card ink"
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="contact__sla-dial" aria-hidden="true">
                <svg viewBox="0 0 100 100">
                  <circle className="contact__sla-track" cx="50" cy="50" r="43" />
                  <circle className="contact__sla-arc" cx="50" cy="50" r="43" pathLength="100" />
                  {Array.from({ length: 12 }, (_, i) => (
                    <line
                      key={i}
                      className="contact__sla-tick"
                      x1="50"
                      y1="13"
                      x2="50"
                      y2={i % 3 === 0 ? 21 : 17}
                      transform={`rotate(${i * 30} 50 50)`}
                    />
                  ))}
                  <line className="contact__sla-hand contact__sla-hand--hour" x1="50" y1="50" x2="50" y2="32" />
                  <line className="contact__sla-hand contact__sla-hand--minute" x1="50" y1="50" x2="50" y2="22" />
                  <circle className="contact__sla-pin" cx="50" cy="50" r="3.5" />
                </svg>
              </div>
              <div className="contact__sla-body">
                <span className="contact__sla-kicker">First response</span>
                <div className="contact__sla-number">
                  <i>&lt;</i>24<small>hrs</small>
                </div>
                <p className="contact__sla-label">
                  Guaranteed First Response & Project Strategy Turnaround
                </p>
              </div>
              <ol className="contact__sla-steps">
                <li>You send an enquiry</li>
                <li>A founder replies</li>
                <li>Strategy call booked</li>
              </ol>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
