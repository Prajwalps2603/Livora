import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Sparkles, MessageCircle } from 'lucide-react'
import { useInView, fadeInUp, staggerContainer } from '../hooks/useAnimations'
import './Team.css'

const team = [
  {
    name: 'Prajwal M P',
    role: 'Co-Founder & Software Developer',
    quote: 'Focused on building custom web applications, automated business pipelines, and scalable cloud systems.',
    phone: '+91 8618176469',
    phoneRaw: '918618176469',
    email: 'prajwalnair2603@gmail.com',
    initials: 'PM',
    skills: ['Custom Web Apps', 'Automation Workflows', 'React & Node.js', 'Google Apps Script', 'Cloud Systems'],
    specialty: 'Full-Stack & Business Automation',
  },
  {
    name: 'Nikhil K',
    role: 'Co-Founder & Software Developer',
    quote: 'Dedicated to developing practical mobile applications, reliable backend systems, and custom client tools.',
    phone: '+91 7994162314',
    phoneRaw: '917994162314',
    email: 'nikhil@gmail.com',
    initials: 'NK',
    skills: ['Android Applications', 'Mobile Architecture', 'System Design', 'API Integration', 'Academic Solutions'],
    specialty: 'Mobile & Custom Application Engineering',
  },
]

export default function Team() {
  const [ref, inView] = useInView()

  return (
    <section className="section team" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div className="section-badge" variants={fadeInUp} transition={{ duration: 0.5 }}>
            <Sparkles size={14} /> The Team Behind LIVORA
          </motion.div>
          <motion.h2 className="section-title" variants={fadeInUp} transition={{ duration: 0.5 }}>
            Meet the <em>Builders.</em>
          </motion.h2>
          <motion.p className="section-subtitle" variants={fadeInUp} transition={{ duration: 0.5 }}>
            You work directly with the developers building your software. No middlemen, no account managers.
          </motion.p>
        </motion.div>

        <motion.div
          className="team__grid"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              className="team__card glass-card"
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -8 }}
            >
              {/* Banner */}
              <div className="team__banner">
                <div className="team__banner-grid" />
                <span className="team__banner-initial" aria-hidden="true">{member.initials[0]}</span>
                <span className="team__banner-index">0{index + 1} / Co-Founder</span>
                <span className="team__banner-chip">
                  <span className="team__pulse-circle" /> Available for projects
                </span>
              </div>

              {/* Identity */}
              <div className="team__card-header">
                <div className="team__avatar-wrap">
                  <span className="team__avatar-ring" />
                  <div className="team__avatar">
                    <span className="team__avatar-initials">{member.initials}</span>
                  </div>
                </div>

                <div className="team__header-info">
                  <h3 className="team__name">{member.name}</h3>
                  <span className="team__role">{member.role}</span>
                  <span className="team__specialty-tag">{member.specialty}</span>
                </div>
              </div>

              {/* Founder Quote */}
              <div className="team__quote-box">
                <span className="team__quote-mark" aria-hidden="true">&ldquo;</span>
                <p className="team__quote">{member.quote}</p>
              </div>

              {/* Core Skills Chips */}
              <div className="team__skills">
                <span className="team__skills-label">Core focus areas</span>
                <div className="team__skills-chips">
                  {member.skills.map((skill) => (
                    <span key={skill} className="team__skill-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Connect Actions */}
              <div className="team__actions">
                <a
                  href={`https://wa.me/${member.phoneRaw}?text=Hi%20${encodeURIComponent(member.name)},%20I'd%20like%20to%20discuss%20a%20project%20with%20LIVORA.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="team__action-btn team__action-btn--whatsapp"
                  title="Direct WhatsApp"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp ({member.phone})</span>
                </a>

                <a
                  href={`mailto:${member.email}`}
                  className="team__action-btn team__action-btn--email"
                  title="Direct Email"
                >
                  <Mail size={16} />
                  <span>{member.email}</span>
                </a>
              </div>

              {/* Bottom Socials */}
              <div className="team__footer">
                <div className="team__available-badge">
                  <span className="team__pulse-circle" /> Direct Developer Access
                </div>
                <div className="team__socials">
                  <a href="#" className="team__social" aria-label="LinkedIn" title="LinkedIn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                  <a href="#" className="team__social" aria-label="GitHub" title="GitHub">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
