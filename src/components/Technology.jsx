import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
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
import { X, ArrowUpRight, Check, CornerDownLeft } from 'lucide-react'
import { useInView, fadeInUp, staggerContainer } from '../hooks/useAnimations'
import './Technology.css'

// Official brand marks in their brand colours; `use` is what the tech does for a client
const techs = [
  { name: 'React', category: 'Frontend', color: '#61DAFB', icon: SiReact, use: 'Fast, interactive interfaces for dashboards, portals and web apps.' },
  { name: 'Next.js', category: 'Frontend', color: '#000000', icon: SiNextdotjs, use: 'SEO-friendly business websites and full-stack web apps.' },
  { name: 'JavaScript', category: 'Frontend', color: '#F7DF1E', icon: SiJavascript, use: 'The language behind every interactive page we ship.' },
  { name: 'TypeScript', category: 'Frontend', color: '#3178C6', icon: SiTypescript, use: 'Typed code that stays reliable as your system grows.' },
  { name: 'HTML5', category: 'Frontend', color: '#E34F26', icon: SiHtml5, use: 'Clean, accessible page structure that search engines love.' },
  { name: 'CSS', category: 'Frontend', color: '#663399', icon: SiCss, use: 'Polished layouts and motion that work on every screen.' },
  { name: 'Tailwind CSS', category: 'Frontend', color: '#06B6D4', icon: SiTailwindcss, use: 'Consistent, fast-to-build design systems.' },
  { name: 'Bootstrap', category: 'Frontend', color: '#7952B3', icon: SiBootstrap, use: 'Quick, responsive admin panels and internal tools.' },
  { name: 'Vite', category: 'Frontend', color: '#646CFF', icon: SiVite, use: 'Lightning-fast builds so pages load in a blink.' },

  { name: 'Node.js', category: 'Backend', color: '#5FA04E', icon: SiNodedotjs, use: 'Scalable servers and APIs that power web and mobile apps.' },
  { name: 'Express', category: 'Backend', color: '#000000', icon: SiExpress, use: 'Lean REST APIs for orders, billing and user accounts.' },
  { name: 'Python', category: 'Backend', color: '#3776AB', icon: SiPython, use: 'Automation scripts, data processing and AI features.' },
  { name: 'Django', category: 'Backend', color: '#092E20', icon: SiDjango, use: 'Secure business systems with a ready admin panel.' },
  { name: 'FastAPI', category: 'Backend', color: '#009688', icon: SiFastapi, use: 'High-speed APIs for AI and data-heavy apps.' },
  { name: 'Java', category: 'Backend', color: '#E76F00', icon: FaJava, use: 'Robust enterprise logic and Android foundations.' },
  { name: 'Spring Boot', category: 'Backend', color: '#6DB33F', icon: SiSpringboot, use: 'Enterprise-grade services for larger operations.' },
  { name: 'PHP', category: 'Backend', color: '#777BB4', icon: SiPhp, use: 'Affordable hosting-friendly sites and portals.' },

  { name: 'Android', category: 'Mobile', color: '#3DDC84', icon: SiAndroid, use: 'Native apps for your staff, drivers and customers.' },
  { name: 'Kotlin', category: 'Mobile', color: '#7F52FF', icon: SiKotlin, use: 'Modern, crash-resistant Android app code.' },
  { name: 'Flutter', category: 'Mobile', color: '#02569B', icon: SiFlutter, use: 'One codebase for Android and iOS apps.' },
  { name: 'Dart', category: 'Mobile', color: '#0175C2', icon: SiDart, use: 'The fast language behind our Flutter apps.' },
  { name: 'Android Studio', category: 'Mobile', color: '#3DDC84', icon: SiAndroidstudio, use: 'Where we build, test and ship your Android apps.' },

  { name: 'MySQL', category: 'Database', color: '#4479A1', icon: SiMysql, use: 'Dependable records for sales, stock and customers.' },
  { name: 'PostgreSQL', category: 'Database', color: '#4169E1', icon: SiPostgresql, use: 'Powerful data storage for complex business logic.' },
  { name: 'MongoDB', category: 'Database', color: '#47A248', icon: SiMongodb, use: 'Flexible data for fast-changing apps.' },
  { name: 'Firebase', category: 'Database', color: '#DD2C00', icon: SiFirebase, use: 'Real-time sync, login and push notifications.' },
  { name: 'Supabase', category: 'Database', color: '#3FCF8E', icon: SiSupabase, use: 'Postgres with auth and storage, ready in days.' },
  { name: 'Redis', category: 'Database', color: '#FF4438', icon: SiRedis, use: 'Caching that keeps busy apps instant.' },
  { name: 'SQLite', category: 'Database', color: '#003B57', icon: SiSqlite, use: 'Offline storage inside mobile apps.' },

  { name: 'Google Cloud', category: 'Cloud & DevOps', color: '#4285F4', icon: SiGooglecloud, use: 'Secure cloud hosting that scales with you.' },
  { name: 'AWS', category: 'Cloud & DevOps', color: '#FF9900', icon: FaAws, use: 'Enterprise cloud servers, storage and backups.' },
  { name: 'Vercel', category: 'Cloud & DevOps', color: '#000000', icon: SiVercel, use: 'One-click global hosting for websites and apps.' },
  { name: 'Docker', category: 'Cloud & DevOps', color: '#2496ED', icon: SiDocker, use: 'Packaged apps that run the same everywhere.' },
  { name: 'Git', category: 'Cloud & DevOps', color: '#F05032', icon: SiGit, use: 'Every change tracked, nothing ever lost.' },
  { name: 'GitHub', category: 'Cloud & DevOps', color: '#181717', icon: SiGithub, use: 'Code reviews and automatic deployments.' },
  { name: 'Cloudflare', category: 'Cloud & DevOps', color: '#F38020', icon: SiCloudflare, use: 'Domains, SSL and protection for your site.' },

  { name: 'Apps Script', category: 'AI & Automation', color: '#4285F4', icon: SiGoogleappsscript, use: 'Automations inside Google Sheets, Gmail and Drive.' },
  { name: 'Google Sheets', category: 'AI & Automation', color: '#34A853', icon: SiGooglesheets, use: 'Sheets turned into live, connected workflows.' },
  { name: 'OpenAI', category: 'AI & Automation', color: '#000000', icon: TbBrandOpenai, use: 'AI assistants, smart replies and document reading.' },
  { name: 'TensorFlow', category: 'AI & Automation', color: '#FF6F00', icon: SiTensorflow, use: 'Custom machine-learning models for predictions.' },
  { name: 'Zapier', category: 'AI & Automation', color: '#FF4F00', icon: SiZapier, use: 'No-code links between the tools you already use.' },

  { name: 'Figma', category: 'Design & Marketing', color: '#F24E1E', icon: SiFigma, use: 'Clickable designs you approve before any code.' },
  { name: 'Analytics', category: 'Design & Marketing', color: '#E37400', icon: SiGoogleanalytics, use: 'See who visits, what they do and what converts.' },
  { name: 'Google Ads', category: 'Design & Marketing', color: '#4285F4', icon: SiGoogleads, use: 'Search campaigns that bring ready-to-buy leads.' },
  { name: 'Meta Ads', category: 'Design & Marketing', color: '#0467DF', icon: SiMeta, use: 'Instagram and Facebook campaigns that grow reach.' },
  { name: 'WordPress', category: 'Design & Marketing', color: '#21759B', icon: SiWordpress, use: 'Websites your team can update themselves.' },

  { name: 'Webhooks', category: 'Integrations', color: '#0D0D0C', icon: TbWebhook, use: 'REST APIs and webhooks that link your systems.' },
  { name: 'Postman', category: 'Integrations', color: '#FF6C37', icon: SiPostman, use: 'Every API tested before it reaches you.' },
  { name: 'Razorpay', category: 'Integrations', color: '#0C2451', icon: SiRazorpay, use: 'UPI, card and subscription payments.' },
  { name: 'WhatsApp API', category: 'Integrations', color: '#25D366', icon: SiWhatsapp, use: 'Order updates and alerts straight to WhatsApp.' },
]

// What we build in each area, shown when one of its keys is pressed
const builds = {
  Frontend: ['Business websites & landing pages', 'Admin dashboards', 'Customer portals', 'Booking & order forms'],
  Backend: ['REST APIs for web & mobile apps', 'Billing & invoicing engines', 'Role-based admin systems', 'Automated reports & exports'],
  Mobile: ['Field staff & delivery apps', 'Customer ordering apps', 'Attendance & GPS tracking', 'Offline-first data capture'],
  Database: ['Inventory & stock records', 'Customer & sales databases', 'Real-time order tracking', 'Secure backups & audit logs'],
  'Cloud & DevOps': ['Hosting & deployment', 'Domains, SSL & CDN', 'Automatic deploy pipelines', 'Monitoring & uptime'],
  'AI & Automation': ['Auto-generated reports', 'Sheet-based workflows', 'AI chat assistants', 'Smart alerts & reminders'],
  'Design & Marketing': ['Brand & UI design', 'Ad campaigns', 'Analytics dashboards', 'Business websites'],
  Integrations: ['Payment collection', 'WhatsApp notifications', 'Third-party API links', 'Webhook automations'],
}

// Good companions for each area
const pairs = {
  Frontend: ['Node.js', 'Tailwind CSS', 'Vercel'],
  Backend: ['React', 'PostgreSQL', 'Docker'],
  Mobile: ['Firebase', 'Node.js', 'Kotlin'],
  Database: ['Node.js', 'Supabase', 'Redis'],
  'Cloud & DevOps': ['Docker', 'GitHub', 'Next.js'],
  'AI & Automation': ['Google Sheets', 'Python', 'WhatsApp API'],
  'Design & Marketing': ['Figma', 'Next.js', 'Analytics'],
  Integrations: ['Razorpay', 'WhatsApp API', 'Node.js'],
}

const categories = ['All', ...new Set(techs.map((t) => t.category))]

// Custom-keyboard colourway: each category gets its own keycap set
const colorway = {
  Frontend: 'paper',
  Backend: 'stone',
  Mobile: 'ink',
  Database: 'paper',
  'Cloud & DevOps': 'stone',
  'AI & Automation': 'lime',
  'Design & Marketing': 'ink',
  Integrations: 'stone',
}

// Very dark brand marks switch to a light legend on ink keycaps
const isDark = (hex) => {
  const n = parseInt(hex.slice(1), 16)
  return 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255) < 70
}

const COLS = 10
const shortCat = { 'Cloud & DevOps': 'Cloud', 'AI & Automation': 'AI', 'Design & Marketing': 'Design', Integrations: 'APIs' }
const byName = Object.fromEntries(techs.map((t, i) => [t.name, i]))

// The keyboard's screen mode: the theme switch typed out as code
function ThemeTerminal({ next }) {
  const command = `livora theme --switch ${next}`
  const steps = [
    'connecting to studio grid',
    `compiling palette: ${next === 'dark' ? 'ink + lime' : 'paper + lime'}`,
    'deploying to every section',
  ]
  const [typed, setTyped] = useState(0)
  const [shown, setShown] = useState(0)
  const [progress, setProgress] = useState(0)
  const [live, setLive] = useState(false)

  useEffect(() => {
    if (typed < command.length) {
      const t = setTimeout(() => setTyped((n) => n + 1), 22)
      return () => clearTimeout(t)
    }
    if (shown < steps.length) {
      const t = setTimeout(() => setShown((n) => n + 1), 260)
      return () => clearTimeout(t)
    }
    if (progress < 100) {
      const t = setTimeout(() => setProgress((n) => Math.min(100, n + 10)), 30)
      return () => clearTimeout(t)
    }
    if (!live) {
      const t = setTimeout(() => {
        setLive(true)
        window.dispatchEvent(new CustomEvent('livora:kb-done'))
      }, 200)
      return () => clearTimeout(t)
    }
  }, [typed, shown, progress, live, command.length, steps.length])

  const bar = '▓'.repeat(Math.round(progress / 10)).padEnd(10, '░')

  return (
    <motion.div
      className="tech__term"
      initial={{ clipPath: 'inset(0 0 100% 0 round 20px)' }}
      animate={{ clipPath: 'inset(0 0 0% 0 round 20px)' }}
      exit={{ clipPath: 'inset(100% 0 0 0 round 20px)' }}
      transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="tech__term-bar"><i /><i /><i /><span>livora — theme.sh</span></div>
      <div className="tech__term-body">
        <p><b className="is-prompt">$</b> {command.slice(0, typed)}{typed < command.length && <i className="tech__term-caret" />}</p>
        {steps.slice(0, shown).map((line) => (
          <p key={line}><b>↳</b> {line}… <b className="is-ok">✓</b></p>
        ))}
        {shown === steps.length && (
          <p className="tech__term-progress"><b>↳</b> {bar} {progress}%</p>
        )}
        {live && (
          <p className="tech__term-live"><b className="is-ok">✓</b> {next} mode is live<i className="tech__term-caret" /></p>
        )}
      </div>
    </motion.div>
  )
}

export default function Technology() {
  const [ref, inView] = useInView({ threshold: 0.05 })
  const reduce = useReducedMotion()
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const [pressed, setPressed] = useState(null)
  const [ghost, setGhost] = useState(null)
  const sectionRef = useRef(null)
  // Phones get a flat keyboard and a bottom-sheet panel instead of the 3D swing
  const [small, setSmall] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 860px)').matches)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 860px)')
    const onChange = () => setSmall(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const [wave, setWave] = useState(null)
  const [term, setTerm] = useState(null) // theme show: keyboard turned screen
  const [linked, setLinked] = useState(false) // theme show: cable plugged into the port
  const [chase, setChase] = useState(null) // boot light running through the keys

  // Cues from the theme show bot
  useEffect(() => {
    let bootTimer
    const onReset = () => setSelected(null)
    // Plugged in: a boot light snakes through every key, then report back
    const onPlug = () => {
      setLinked(true)
      let n = 0
      bootTimer = setInterval(() => {
        n += 1
        setChase(n)
        if (n > techs.length + 6) {
          clearInterval(bootTimer)
          setChase(null)
          window.dispatchEvent(new CustomEvent('livora:kb-booted'))
        }
      }, 15)
    }
    const onUnplug = () => { clearInterval(bootTimer); setChase(null); setLinked(false) }
    const onTerm = (e) => setTerm({ next: e.detail.next })
    const onClose = () => setTerm(null)
    window.addEventListener('livora:kb-reset', onReset)
    window.addEventListener('livora:kb-plug', onPlug)
    window.addEventListener('livora:kb-unplug', onUnplug)
    window.addEventListener('livora:kb-terminal', onTerm)
    window.addEventListener('livora:kb-terminal-close', onClose)
    return () => {
      clearInterval(bootTimer)
      window.removeEventListener('livora:kb-reset', onReset)
      window.removeEventListener('livora:kb-plug', onPlug)
      window.removeEventListener('livora:kb-unplug', onUnplug)
      window.removeEventListener('livora:kb-terminal', onTerm)
      window.removeEventListener('livora:kb-terminal-close', onClose)
    }
  }, [])

  const select = (i) => {
    setSelected(i)
    setPressed(i)
    // Backlight ripple spreads out from the pressed key
    setWave((w) => ({ origin: i, n: (w?.n || 0) + 1 }))
    setTimeout(() => setPressed((p) => (p === i ? null : p)), 180)
  }

  // Idle: random keys press themselves to invite a click
  useEffect(() => {
    if (!inView || selected !== null || reduce) return
    const timer = setInterval(() => {
      const pool = techs.map((t, i) => i).filter((i) => filter === 'All' || techs[i].category === filter)
      setGhost(pool[Math.floor(Math.random() * pool.length)])
      setTimeout(() => setGhost(null), 380)
    }, 1100)
    return () => clearInterval(timer)
  }, [inView, selected, filter, reduce])

  // Real keyboard: letters jump to a tech, arrows move, Esc closes
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest?.('input, textarea, select, [contenteditable]')) return
      const box = sectionRef.current?.getBoundingClientRect()
      if (!box || box.bottom < 0 || box.top > window.innerHeight * 0.6) return
      if (e.key === 'Escape') { setSelected(null); return }
      const arrows = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 10, ArrowUp: -10 }
      if (arrows[e.key] !== undefined && selected !== null) {
        e.preventDefault()
        select((selected + arrows[e.key] + techs.length) % techs.length)
        return
      }
      if (/^[a-z]$/i.test(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const letter = e.key.toLowerCase()
        const matches = techs.map((t, i) => i).filter((i) => techs[i].name.toLowerCase().startsWith(letter))
        if (!matches.length) return
        const next = matches.find((i) => i > (selected ?? -1)) ?? matches[0]
        select(next)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

  const tech = selected !== null ? techs[selected] : null
  const open = tech !== null

  return (
    <section className="section technology" ref={(el) => { ref.current = el; sectionRef.current = el }}>
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
            Press any key to see what we build with it. You can type on your own keyboard too.
          </motion.p>
        </motion.div>

        <div className={`tech__stage ${open ? 'is-open' : ''}`}>
          {/* The keyboard swings diagonally aside when a key is pressed */}
          <motion.div
            className="tech__kb-wrap"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="tech__kb"
              animate={small
                ? { x: 0, y: 0, rotateX: 0, rotateZ: 0, scale: 1 }
                : open
                  ? { x: '-27%', y: 20, rotateX: 38, rotateZ: -14, scale: 0.66 }
                  : { x: 0, y: 0, rotateX: 22, rotateZ: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 90, damping: 18 }}
            >
              {['tl', 'tr', 'bl', 'br'].map((c) => <i key={c} className={`tech__screw tech__screw--${c}`} />)}
              {/* USB-C port the theme cable plugs into */}
              <span className={`tech__port ${linked ? 'is-linked' : ''}`} aria-hidden="true"><i /></span>

              <div className="tech__kb-top">
                {/* Tiny OLED that types out the selected tech */}
                <div className="tech__oled" aria-hidden="true">
                  <span key={tech ? tech.name : linked ? 'link' : 'idle'} className="tech__oled-line">
                    &gt; {tech ? tech.name.toUpperCase() : linked ? 'LINK ✓' : 'READY'}<i className="tech__oled-cursor" />
                  </span>
                  <small>{tech ? tech.category.toUpperCase() : linked ? 'USB-C · THEME.SH' : `${techs.length} KEYS · ${categories.length - 1} LAYERS`}</small>
                </div>

                <span className="tech__kb-brand">LIVORA <small>stack-board</small></span>

                <div className="tech__kb-right">
                  <span className="tech__kb-leds"><i className="is-on" /><i className={open || linked ? 'is-on' : ''} /><i className={filter !== 'All' ? 'is-on' : ''} /></span>
                  <span className="tech__knob" style={{ '--turn': `${(selected ?? 0) * 36}deg` }} aria-hidden="true"><i /></span>
                </div>
              </div>

              <div className="tech__plate">
                <AnimatePresence>
                  {term && <ThemeTerminal key={term.next} next={term.next} />}
                </AnimatePresence>

              {/* Function row: category filters */}
              <div className="tech__fn-row" role="tablist" aria-label="Technology categories">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={filter === cat}
                    className={`tech__fn ${filter === cat ? 'is-active' : ''}`}
                    onClick={() => setFilter(cat)}
                  >
                    {shortCat[cat] || cat}
                  </button>
                ))}
              </div>

              {/* Tech keys */}
              <div className="tech__keys">
                {techs.map((t, i) => {
                  const Icon = t.icon
                  const dim = filter !== 'All' && t.category !== filter
                  return (
                    <button
                      key={t.name}
                      type="button"
                      className={[
                        'tech__key',
                        `cap-${colorway[t.category]}`,
                        wave && `wave-${wave.n % 2 ? 'a' : 'b'}`,
                        selected === i && 'is-selected',
                        (pressed === i || ghost === i) && 'is-pressed',
                        ghost === i && 'is-ghost',
                        chase !== null && (() => {
                          const row = Math.floor(i / COLS)
                          const pos = row * COLS + (row % 2 ? COLS - 1 - (i % COLS) : i % COLS)
                          return pos <= chase && pos > chase - 6
                        })() && 'is-chase',
                        dim && 'is-dim',
                      ].filter(Boolean).join(' ')}
                      style={{
                        '--brand': colorway[t.category] === 'ink' && isDark(t.color) ? '#F4F4EF' : t.color,
                        '--wd': wave
                          ? `${Math.hypot(Math.floor(i / COLS) - Math.floor(wave.origin / COLS), (i % COLS) - (wave.origin % COLS)) * 55}ms`
                          : '0ms',
                      }}
                      onClick={() => select(i)}
                      aria-pressed={selected === i}
                      aria-label={`${t.name}, ${t.category}`}
                      tabIndex={dim ? -1 : 0}
                    >
                      <span className="tech__key-cap">
                        <Icon className="tech__key-icon" />
                        <span className="tech__key-label">{t.name}</span>
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Bottom row */}
              <div className="tech__bottom-row">
                <button type="button" className="tech__key tech__key--mod" onClick={() => setSelected(null)}>
                  <span className="tech__key-cap"><span className="tech__key-label">esc</span></span>
                </button>
                <span className="tech__key tech__key--space">
                  <span className="tech__key-cap">
                    <i className="tech__space-led" /> {tech ? tech.name : 'press any key'}
                  </span>
                </span>
                <a
                  className="tech__key tech__key--enter"
                  href={`https://wa.me/918618176469?text=${encodeURIComponent(`Hi LIVORA! I'd like to build something${tech ? ` with ${tech.name}` : ''}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="tech__key-cap"><CornerDownLeft size={14} /> Let's talk</span>
                </a>
              </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Detail panel slides in from the right */}
          <AnimatePresence>
            {open && (
              <motion.aside
                className="tech__panel"
                initial={small ? { opacity: 0, y: 60 } : { opacity: 0, x: 60, y: '-50%' }}
                animate={small ? { opacity: 1, y: 0 } : { opacity: 1, x: 0, y: '-50%' }}
                exit={small ? { opacity: 0, y: 60 } : { opacity: 0, x: 60, y: '-50%' }}
                transition={{ type: 'spring', stiffness: 140, damping: 20 }}
                aria-live="polite"
              >
                <button type="button" className="tech__panel-close" onClick={() => setSelected(null)} aria-label="Close">
                  <X size={18} />
                </button>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="tech__panel-head">
                      <span className="tech__panel-icon" style={{ '--brand': tech.color }}>
                        <tech.icon />
                      </span>
                      <div>
                        <span className="tech__panel-cat">{tech.category}</span>
                        <h3 className="tech__panel-title">{tech.name}</h3>
                      </div>
                    </div>
                    <p className="tech__panel-use">{tech.use}</p>

                    <span className="tech__panel-label">What we build with it</span>
                    <ul className="tech__panel-builds">
                      {builds[tech.category].map((b, i) => (
                        <motion.li
                          key={b}
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.12 + i * 0.07 }}
                        >
                          <Check size={14} strokeWidth={3} /> {b}
                        </motion.li>
                      ))}
                    </ul>

                    <span className="tech__panel-label">Pairs well with</span>
                    <div className="tech__panel-pairs">
                      {pairs[tech.category].filter((p) => p !== tech.name).slice(0, 3).map((p) => {
                        const pt = techs[byName[p]]
                        const PIcon = pt.icon
                        return (
                          <button key={p} type="button" style={{ '--brand': pt.color }} onClick={() => select(byName[p])}>
                            <PIcon /> {p}
                          </button>
                        )
                      })}
                    </div>

                    <a
                      className="btn btn-primary tech__panel-cta"
                      href={`https://wa.me/918618176469?text=${encodeURIComponent(`Hi LIVORA! I'd like to build something with ${tech.name}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Build with {tech.name} <ArrowUpRight size={18} />
                    </a>
                  </motion.div>
                </AnimatePresence>
              </motion.aside>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
