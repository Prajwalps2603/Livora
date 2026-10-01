import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SiReact, SiNextdotjs, SiJavascript, SiTypescript, SiHtml5, SiCss, SiTailwindcss, SiBootstrap, SiVite,
  SiNodedotjs, SiExpress, SiPython, SiDjango, SiFastapi, SiSpringboot, SiPhp,
  SiAndroid, SiKotlin, SiFlutter, SiDart, SiAndroidstudio,
  SiMysql, SiPostgresql, SiMongodb, SiFirebase, SiSupabase, SiRedis, SiSqlite,
  SiGooglecloud, SiVercel, SiDocker, SiGit, SiGithub, SiCloudflare,
  SiGoogleappsscript, SiGooglesheets, SiTensorflow, SiZapier,
  SiFigma, SiGoogleanalytics, SiGoogleads, SiMeta, SiWordpress,
  SiPostman, SiRazorpay, SiWhatsapp,
} from 'react-icons/si'
import { FaJava, FaAws } from 'react-icons/fa'
import { TbBrandOpenai, TbWebhook } from 'react-icons/tb'
import { useInView, fadeInUp, staggerContainer } from '../hooks/useAnimations'
import './Technology.css'

// Official brand marks in their brand colours
const techs = [
  { name: 'React', category: 'Frontend', color: '#61DAFB', icon: SiReact },
  { name: 'Next.js', category: 'Frontend', color: '#000000', icon: SiNextdotjs },
  { name: 'JavaScript', category: 'Frontend', color: '#F7DF1E', icon: SiJavascript },
  { name: 'TypeScript', category: 'Frontend', color: '#3178C6', icon: SiTypescript },
  { name: 'HTML5', category: 'Frontend', color: '#E34F26', icon: SiHtml5 },
  { name: 'CSS', category: 'Frontend', color: '#663399', icon: SiCss },
  { name: 'Tailwind CSS', category: 'Frontend', color: '#06B6D4', icon: SiTailwindcss },
  { name: 'Bootstrap', category: 'Frontend', color: '#7952B3', icon: SiBootstrap },
  { name: 'Vite', category: 'Frontend', color: '#646CFF', icon: SiVite },

  { name: 'Node.js', category: 'Backend', color: '#5FA04E', icon: SiNodedotjs },
  { name: 'Express', category: 'Backend', color: '#000000', icon: SiExpress },
  { name: 'Python', category: 'Backend', color: '#3776AB', icon: SiPython },
  { name: 'Django', category: 'Backend', color: '#092E20', icon: SiDjango },
  { name: 'FastAPI', category: 'Backend', color: '#009688', icon: SiFastapi },
  { name: 'Java', category: 'Backend', color: '#E76F00', icon: FaJava },
  { name: 'Spring Boot', category: 'Backend', color: '#6DB33F', icon: SiSpringboot },
  { name: 'PHP', category: 'Backend', color: '#777BB4', icon: SiPhp },

  { name: 'Android', category: 'Mobile', color: '#3DDC84', icon: SiAndroid },
  { name: 'Kotlin', category: 'Mobile', color: '#7F52FF', icon: SiKotlin },
  { name: 'Flutter', category: 'Mobile', color: '#02569B', icon: SiFlutter },
  { name: 'Dart', category: 'Mobile', color: '#0175C2', icon: SiDart },
  { name: 'Android Studio', category: 'Mobile', color: '#3DDC84', icon: SiAndroidstudio },

  { name: 'MySQL', category: 'Database', color: '#4479A1', icon: SiMysql },
  { name: 'PostgreSQL', category: 'Database', color: '#4169E1', icon: SiPostgresql },
  { name: 'MongoDB', category: 'Database', color: '#47A248', icon: SiMongodb },
  { name: 'Firebase', category: 'Database', color: '#DD2C00', icon: SiFirebase },
  { name: 'Supabase', category: 'Database', color: '#3FCF8E', icon: SiSupabase },
  { name: 'Redis', category: 'Database', color: '#FF4438', icon: SiRedis },
  { name: 'SQLite', category: 'Database', color: '#003B57', icon: SiSqlite },

  { name: 'Google Cloud', category: 'Cloud & DevOps', color: '#4285F4', icon: SiGooglecloud },
  { name: 'AWS', category: 'Cloud & DevOps', color: '#FF9900', icon: FaAws },
  { name: 'Vercel', category: 'Cloud & DevOps', color: '#000000', icon: SiVercel },
  { name: 'Docker', category: 'Cloud & DevOps', color: '#2496ED', icon: SiDocker },
  { name: 'Git', category: 'Cloud & DevOps', color: '#F05032', icon: SiGit },
  { name: 'GitHub', category: 'Cloud & DevOps', color: '#181717', icon: SiGithub },
  { name: 'Cloudflare', category: 'Cloud & DevOps', color: '#F38020', icon: SiCloudflare },

  { name: 'Google Apps Script', category: 'AI & Automation', color: '#4285F4', icon: SiGoogleappsscript },
  { name: 'Google Sheets', category: 'AI & Automation', color: '#34A853', icon: SiGooglesheets },
  { name: 'OpenAI', category: 'AI & Automation', color: '#000000', icon: TbBrandOpenai },
  { name: 'TensorFlow', category: 'AI & Automation', color: '#FF6F00', icon: SiTensorflow },
  { name: 'Zapier', category: 'AI & Automation', color: '#FF4F00', icon: SiZapier },

  { name: 'Figma', category: 'Design & Marketing', color: '#F24E1E', icon: SiFigma },
  { name: 'Google Analytics', category: 'Design & Marketing', color: '#E37400', icon: SiGoogleanalytics },
  { name: 'Google Ads', category: 'Design & Marketing', color: '#4285F4', icon: SiGoogleads },
  { name: 'Meta Ads', category: 'Design & Marketing', color: '#0467DF', icon: SiMeta },
  { name: 'WordPress', category: 'Design & Marketing', color: '#21759B', icon: SiWordpress },

  { name: 'REST APIs & Webhooks', category: 'Integrations', color: '#0D0D0C', icon: TbWebhook },
  { name: 'Postman', category: 'Integrations', color: '#FF6C37', icon: SiPostman },
  { name: 'Razorpay', category: 'Integrations', color: '#0C2451', icon: SiRazorpay },
  { name: 'WhatsApp API', category: 'Integrations', color: '#25D366', icon: SiWhatsapp },
]

const categories = ['All', ...new Set(techs.map((t) => t.category))]

// Light brand colours need a dark glyph once the tile floods with colour
const glyphOn = (hex) => {
  const n = parseInt(hex.slice(1), 16)
  const luminance = 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)
  return luminance > 165 ? '#0D0D0C' : '#FFFFFF'
}

export default function Technology() {
  const [ref, inView] = useInView({ threshold: 0.05 })
  const [filter, setFilter] = useState('All')

  const visible = filter === 'All' ? techs : techs.filter((t) => t.category === filter)

  return (
    <section className="section technology" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div className="section-badge" variants={fadeInUp} transition={{ duration: 0.5 }}>
            Technology Ecosystem
          </motion.div>
          <motion.h2 className="section-title" variants={fadeInUp} transition={{ duration: 0.5 }}>
            Built With <em>Modern Technology.</em>
          </motion.h2>
          <motion.p className="section-subtitle" variants={fadeInUp} transition={{ duration: 0.5 }}>
            Battle-tested frameworks, cloud infrastructure, and modern languages powering reliable applications.
          </motion.p>
        </motion.div>

        <motion.div
          className="tech__filters"
          role="tablist"
          aria-label="Technology categories"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {categories.map((cat) => {
            const count = cat === 'All' ? techs.length : techs.filter((t) => t.category === cat).length
            const isActive = filter === cat
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`tech__filter ${isActive ? 'is-active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {isActive && (
                  <motion.span
                    layoutId="tech-filter"
                    className="tech__filter-bg"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <span>{cat}</span>
                <small>{count}</small>
              </button>
            )
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="tech__grid"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            exit="exit"
            variants={{
              visible: { transition: { staggerChildren: 0.018 } },
              exit: { opacity: 0, transition: { duration: 0.15 } },
            }}
          >
            {visible.map((tech) => {
              const Icon = tech.icon
              return (
                <motion.div
                  key={tech.name}
                  className="tech__card glass-card"
                  variants={{
                    hidden: { opacity: 0, y: 18, scale: 0.94 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  style={{ '--tech-color': tech.color, '--tech-on': glyphOn(tech.color) }}
                >
                  <div className="tech__icon-box">
                    <Icon size={24} />
                  </div>
                  <div className="tech__info">
                    <span className="tech__name">{tech.name}</span>
                    <span className="tech__category">{tech.category}</span>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
