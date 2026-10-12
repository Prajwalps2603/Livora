import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Bell, Check, RefreshCw, MapPin, WifiOff, Heart,
  CalendarCheck, ScanLine, FileText, GraduationCap, Package,
} from 'lucide-react'
import './PortfolioScenes.css'

/*
  Animated stand-ins for each portfolio project. Every scene sits on the same
  calm ink stage and is sized in em, so it scales with the stage
  (the stage sets its font-size from its own width).
  Scenes remount when the project changes, so their intro motion replays.
*/

const ease = [0.16, 1, 0.3, 1]

// Fade-and-rise entrance with a delay, shared by every floating card
const pop = (delay = 0, from = 0.9) => ({
  initial: { opacity: 0, y: `${from}em`, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { delay, duration: 0.6, ease },
})

// Counts from 0 to `to` once, easing out
function useCount(to, ms = 1400, delay = 300) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let raf
    let start
    const timer = setTimeout(() => {
      const step = (ts) => {
        start ??= ts
        const p = Math.min(1, (ts - start) / ms)
        setValue(to * (1 - Math.pow(1 - p, 3)))
        if (p < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }, delay)
    return () => { clearTimeout(timer); cancelAnimationFrame(raf) }
  }, [to, ms, delay])
  return value
}

function Stage({ children, className = '' }) {
  return (
    <div className={`scene ${className}`}>
      <div className="scene__grid" />
      <div className="scene__glow" />
      {children}
    </div>
  )
}

function Toast({ icon: Icon, title, sub, delay, className = '' }) {
  return (
    <motion.div className={`sc-toast ${className}`} {...pop(delay)}>
      <span className="sc-toast__icon"><Icon size="1.1em" strokeWidth={2.5} /></span>
      <span>
        <b>{title}</b>
        {sub && <small>{sub}</small>}
      </span>
    </motion.div>
  )
}

/* 01 Showroom: a car rolls onto a turning platform under spotlights */
function ShowroomScene() {
  const stock = Math.round(useCount(42, 1500, 400))
  const sold = Math.round(useCount(28, 1500, 900))
  const branches = [['Bengaluru', 18], ['Mysuru', 14], ['Hubli', 10]]
  return (
    <Stage>
      <div className="sc-show__beam sc-show__beam--l" />
      <div className="sc-show__beam sc-show__beam--r" />

      <motion.div className="sc-card sc-show__stock" {...pop(0.2)}>
        <small>Vehicles in stock</small>
        <strong>{stock}</strong>
        <span className="sc-mini-bars">
          {[40, 55, 48, 70, 90].map((h, i) => <i key={i} style={{ '--h': `${h}%`, '--i': i }} />)}
        </span>
      </motion.div>

      <Toast icon={CalendarCheck} title="Test drive booked" sub="Today · 4:30 PM" delay={1.3} className="sc-show__toast" />

      <motion.div className="sc-card sc-show__branches" {...pop(0.6)}>
        <b className="sc-card__title">Branches</b>
        {branches.map(([name, n], i) => (
          <div key={name} className="sc-show__branch">
            <span>{name}</span>
            <span className="sc-progress"><i style={{ '--fill': n / 18, '--d': `${0.9 + i * 0.15}s` }} /></span>
            <em>{n}</em>
          </div>
        ))}
      </motion.div>

      <motion.div className="sc-card sc-show__sold" {...pop(0.9)}>
        <small>Sold this month</small>
        <strong>{sold}<em>↑ 18%</em></strong>
      </motion.div>

      <div className="sc-show__floor">
        <div className="sc-show__turntable"><i /></div>
        <motion.div
          className="sc-show__car-wrap"
          initial={{ x: '-80%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.4, ease }}
        >
          <svg className="sc-show__car" viewBox="0 0 240 92">
            <defs>
              <linearGradient id="carPaint" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#F1F1EA" />
                <stop offset="0.55" stopColor="#D9D9D1" />
                <stop offset="1" stopColor="#A9A9A1" />
              </linearGradient>
            </defs>
            <ellipse cx="122" cy="85" rx="112" ry="5" className="car-shadow" />
            {/* Body with wheel arches */}
            <path
              fill="url(#carPaint)"
              d="M10 66 L10 54 Q11 47 22 45 L64 40 Q82 22 110 20 L148 20 Q170 22 190 39 L222 45 Q234 48 235 58 L235 66 Q235 70 230 70 L206 70 A19 19 0 0 0 168 70 L78 70 A19 19 0 0 0 40 70 L14 70 Q10 70 10 66 Z"
            />
            <path className="car-glass" d="M72 40 Q87 26 110 25 L125 25 L125 40 Z" />
            <path className="car-glass" d="M130 25 L148 25 Q167 27 182 40 L130 40 Z" />
            <path className="car-line" d="M127 42 V66 M92 43 V66 M164 42 Q166 56 162 66" />
            <path className="car-line" d="M22 50 L226 50" />
            <rect className="car-handle" x="104" y="47" width="8" height="2.2" rx="1.1" />
            <rect className="car-handle" x="140" y="47" width="8" height="2.2" rx="1.1" />
            <path className="car-mirror" d="M182 40 l6 -3 l3 4 l-7 2 Z" />
            <rect className="car-light" x="224" y="50" width="11" height="4.5" rx="2.2" />
            <rect className="car-light car-light--rear" x="9" y="50" width="7" height="4.5" rx="2.2" />
            <rect className="car-grille" x="226" y="58" width="8" height="5" rx="1.5" />
            {[59, 187].map((cx) => (
              <g key={cx} className="car-wheel">
                <circle cx={cx} cy="70" r="15" className="car-tyre" />
                <circle cx={cx} cy="70" r="9.5" className="car-rim" />
                {[0, 72, 144, 216, 288].map((a) => (
                  <path key={a} d={`M${cx} 70 L${cx} 61.5`} className="car-spoke" transform={`rotate(${a} ${cx} 70)`} />
                ))}
                <circle cx={cx} cy="70" r="2.6" className="car-hub" />
              </g>
            ))}
          </svg>
        </motion.div>
        <motion.span className="sc-pill sc-show__price" {...pop(1.6)}>Sedan · ₹12.4L</motion.span>
      </div>
    </Stage>
  )
}

/* 02 Dashboard: KPIs count up, the chart draws, the donut fills */
function DashboardScene() {
  const revenue = useCount(8.4, 1400, 300)
  const orders = Math.round(useCount(2190, 1500, 400))
  const tasks = Math.round(useCount(96, 1300, 500))
  const donut = useCount(64, 1500, 700)
  return (
    <Stage>
      <motion.div className="sc-dash" {...pop(0.1, 1.4)}>
        <div className="sc-dash__side">
          <i className="is-on" /><i /><i /><i /><i />
        </div>
        <div className="sc-dash__main">
          <div className="sc-dash__kpis">
            {[
              ['Revenue', `₹${revenue.toFixed(1)}L`, 0.62],
              ['Orders', orders.toLocaleString('en-IN'), 0.74],
              ['Tasks done', `${tasks}%`, 0.96],
            ].map(([label, val, fill], i) => (
              <div key={label} className="sc-dash__kpi">
                <small>{label}</small>
                <strong>{val}</strong>
                <span className="sc-progress"><i style={{ '--fill': fill, '--d': `${0.4 + i * 0.15}s` }} /></span>
              </div>
            ))}
          </div>
          <div className="sc-dash__charts">
            <div className="sc-dash__line">
              <small>Performance</small>
              <svg viewBox="0 0 200 80" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="dashFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#C8F53B" stopOpacity="0.28" />
                    <stop offset="1" stopColor="#C8F53B" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M0 70 C20 66 30 50 50 52 C70 54 80 40 100 38 C120 36 130 22 150 24 C170 26 180 10 200 6 L200 80 L0 80 Z"
                  fill="url(#dashFill)"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.8 }}
                />
                <motion.path
                  d="M0 70 C20 66 30 50 50 52 C70 54 80 40 100 38 C120 36 130 22 150 24 C170 26 180 10 200 6"
                  className="sc-dash__stroke"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 1.4, ease: 'easeInOut' }}
                />
              </svg>
              <span className="sc-dash__dot" />
            </div>
            <div className="sc-dash__donut">
              <svg viewBox="0 0 42 42">
                <circle cx="21" cy="21" r="15.9" className="sc-donut-track" />
                <circle cx="21" cy="21" r="15.9" className="sc-donut-fill" style={{ strokeDasharray: `${donut} 100` }} />
              </svg>
              <strong>{Math.round(donut)}%</strong>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.span className="sc-pill sc-dash__sync" {...pop(1.1)}>
        <RefreshCw size="1em" className="sc-spin" /> Live KPI sync
      </motion.span>
    </Stage>
  )
}

/* 03 Inventory: stock bars fill, a barcode gets scanned, boxes roll down the line */
function InventoryScene() {
  const items = [['Cement', 82], ['Steel rods', 64], ['Paint', 12], ['Tiles', 71], ['Pipes', 55]]
  const boxes = ['SKU-104', 'SKU-221', 'SKU-087', 'SKU-310', 'SKU-152']
  return (
    <Stage>
      <motion.div className="sc-card sc-inv__stock" {...pop(0.15)}>
        <b className="sc-card__title"><Package size="1.1em" /> Stock levels</b>
        {items.map(([name, pct], i) => (
          <div key={name} className={`sc-inv__row ${pct < 20 ? 'is-low' : ''}`}>
            <span>{name}</span>
            <span className="sc-progress"><i style={{ '--fill': pct / 100, '--d': `${0.4 + i * 0.15}s` }} /></span>
            <em>{pct}%</em>
          </div>
        ))}
      </motion.div>

      <motion.div className="sc-card sc-inv__scan" {...pop(0.45)}>
        <div className="sc-barcode">
          {Array.from({ length: 34 }, (_, i) => <i key={i} style={{ '--w': [1, 2, 1, 3, 1, 2][i % 6] }} />)}
          <span className="sc-laser" />
        </div>
        <small><ScanLine size="1em" /> SKU 8901 2024 7731</small>
      </motion.div>

      <Toast icon={Bell} title="Low stock: Paint" sub="Reorder sent to supplier" delay={1.6} className="sc-inv__toast sc-toast--alert" />

      {/* Dispatch conveyor */}
      <div className="sc-inv__belt">
        <span className="sc-inv__belt-label">Dispatch line</span>
        {boxes.map((b, i) => (
          <span key={b} className={`sc-inv__box ${i % 2 ? '' : 'is-lime'}`} style={{ '--i': i }}>
            <Package size="1.3em" />
            <small>{b}</small>
          </span>
        ))}
        <span className="sc-inv__track" />
      </div>
    </Stage>
  )
}

/* 04 Android: a delivery pin travels the route while orders tick off */
function AndroidScene() {
  const route = 'M22 150 C22 120 50 118 52 96 C54 74 30 70 32 50 C34 30 62 26 66 14'
  const km = Math.round(useCount(42, 1600, 500))
  const onTime = Math.round(useCount(96, 1600, 600))
  return (
    <Stage>
      <motion.div className="sc-phone sc-and__map" {...pop(0.1, 1.6)}>
        <svg viewBox="0 0 88 170" className="sc-map">
          {[30, 60, 90, 120, 150].map((y) => <path key={y} d={`M0 ${y} H88`} className="sc-map__street" />)}
          {[20, 44, 68].map((x) => <path key={x} d={`M${x} 0 V170`} className="sc-map__street" />)}
          <motion.path d={route} className="sc-map__route" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4, duration: 1.6, ease: 'easeInOut' }} />
          <circle r="4.5" className="sc-map__pin">
            <animateMotion dur="4s" begin="0.4s" repeatCount="indefinite" path={route} />
          </circle>
          <circle cx="66" cy="14" r="5" className="sc-map__dest" />
        </svg>
        <span className="sc-and__eta">ETA 12 min</span>
      </motion.div>

      <motion.div className="sc-phone sc-and__list" {...pop(0.35, 1.6)}>
        <b>18 drops</b>
        {['#2376', '#2377', '#2378', '#2379', '#2380', '#2381'].map((o, i) => (
          <div key={o} className="sc-and__order" style={{ '--d': `${0.9 + i * 0.35}s` }}>
            <span className="sc-and__check"><Check size="0.9em" strokeWidth={3} /></span>
            Order {o}
          </div>
        ))}
      </motion.div>

      <motion.div className="sc-card sc-and__stats" {...pop(0.6)}>
        <b className="sc-card__title"><MapPin size="1.1em" /> Today's route</b>
        <div className="sc-and__stat-grid">
          <span><strong>18</strong><small>Drops</small></span>
          <span><strong>{km}</strong><small>Km</small></span>
          <span><strong>{onTime}%</strong><small>On time</small></span>
        </div>
      </motion.div>

      <motion.span className="sc-pill sc-and__offline" {...pop(0.9)}><WifiOff size="1em" /> Works offline</motion.span>
      <Toast icon={Check} title="Order #2381 delivered" sub="Field app · just now" delay={2.6} className="sc-and__toast" />
    </Stage>
  )
}

/* 05 Branding: the card flips, swatches drop in, a pen draws a curve */
function BrandScene() {
  const swatches = ['#0D0D0C', '#3A3A36', '#C8F53B', '#F4F4EF', '#557200']
  return (
    <Stage>
      <motion.div className="sc-brand__sheet" {...pop(0.1, 1.4)}>
        <span className="sc-brand__mark">L</span>
        {[70, 90, 80, 95, 60, 85].map((w, i) => <i key={i} style={{ width: `${w}%` }} />)}
      </motion.div>

      <div className="sc-brand__card-wrap">
        <div className="sc-brand__card">
          <div className="sc-brand__face sc-brand__face--front">
            <span className="sc-brand__mark">L</span>
            <b>LIVORA</b>
            <i /><i />
          </div>
          <div className="sc-brand__face sc-brand__face--back">
            <svg viewBox="4 5 24 23" width="34%">
              <path d="M6 15.5 26.5 6.5 19.5 25.5 16.4 18.6Z" fill="currentColor" />
              <path d="M5 26.5c4.2-.4 8-2 10.6-5.6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      <div className="sc-brand__swatches">
        {swatches.map((c, i) => (
          <motion.span
            key={c}
            style={{ background: c }}
            initial={{ y: '-2.5em', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.12, type: 'spring', stiffness: 380, damping: 16 }}
          />
        ))}
      </div>

      <motion.div className="sc-card sc-brand__variants" {...pop(0.7)}>
        <small>Logo variants</small>
        <div>
          {['ink', 'lime', 'outline'].map((v, i) => (
            <motion.span key={v} className={`sc-brand__variant is-${v}`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 + i * 0.15, type: 'spring', stiffness: 320, damping: 14 }}>L</motion.span>
          ))}
        </div>
      </motion.div>

      <motion.div className="sc-card sc-brand__type" {...pop(0.9)}>
        <strong>Aa</strong>
        <span><b>Bricolage Grotesque</b><small>Display · 800</small></span>
      </motion.div>

      <svg className="sc-brand__pen" viewBox="0 0 120 60">
        <motion.path
          d="M6 50 C30 -6 70 70 114 10"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9, duration: 1.6, ease: 'easeInOut' }}
        />
        <circle cx="6" cy="50" r="3" /><circle cx="114" cy="10" r="3" />
      </svg>
    </Stage>
  )
}

/* 06 Social: likes climb, hearts float up, the calendar fills */
function SocialScene() {
  const likes = useCount(2.4, 1600, 500)
  const followers = useCount(1.2, 1600, 700)
  return (
    <Stage>
      <motion.div className="sc-card sc-soc__post" {...pop(0.1, 1.4)}>
        <div className="sc-soc__head"><span className="sc-avatar" /><b>livora.studio</b><small>Sponsored</small></div>
        <div className="sc-soc__media">
          <span className="sc-soc__sun" />
          <span className="sc-soc__hill" />
          <span className="sc-soc__hill sc-soc__hill--back" />
        </div>
        <div className="sc-soc__foot">
          <Heart size="1.2em" className="sc-soc__heart" />
          <b>{likes.toFixed(1)}k likes</b>
          <small>· 186 comments</small>
        </div>
        {[0, 1, 2, 3].map((i) => <Heart key={i} size="1.1em" className="sc-soc__float" style={{ '--i': i }} />)}
      </motion.div>

      <motion.div className="sc-card sc-soc__reach" {...pop(0.35)}>
        <small>Reach</small>
        <strong>+320%</strong>
        <span className="sc-mini-bars sc-mini-bars--tall">
          {[22, 30, 26, 44, 52, 70, 96].map((h, i) => <i key={i} style={{ '--h': `${h}%`, '--i': i }} />)}
        </span>
      </motion.div>

      <motion.div className="sc-card sc-soc__followers" {...pop(0.5)}>
        <small>New followers</small>
        <strong>+{followers.toFixed(1)}k</strong>
        <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="sc-spark">
          <motion.path d="M0 26 L14 22 L28 24 L42 16 L56 18 L70 10 L84 12 L100 3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9, duration: 1.2 }} />
        </svg>
      </motion.div>

      <motion.div className="sc-card sc-soc__cal" {...pop(0.7)}>
        <b className="sc-card__title"><CalendarCheck size="1.1em" /> Content calendar</b>
        <div className="sc-soc__days">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <small key={i}>{d}</small>)}
          {Array.from({ length: 14 }, (_, i) => (
            <span key={i} className={[0, 2, 4, 7, 9, 11, 12].includes(i) ? 'is-post' : ''} style={{ '--d': `${1 + i * 0.12}s` }} />
          ))}
        </div>
      </motion.div>
    </Stage>
  )
}

/* 07 Resume: an ATS scan sweeps down, keywords light up, the score fills */
function ResumeScene() {
  const score = useCount(99, 2000, 600)
  const keywords = ['React', 'Node.js', 'SQL', 'Leadership']
  const match = [['React', 1], ['Node.js', 0.92], ['SQL', 0.88], ['Leadership', 0.8]]
  return (
    <Stage>
      <motion.div className="sc-resume" {...pop(0.1, 1.4)}>
        <div className="sc-resume__head"><span className="sc-avatar" /><span><b /><i /></span></div>
        {[92, 80, 86, 60].map((w, i) => <i key={i} className="sc-resume__line" style={{ width: `${w}%` }} />)}
        <div className="sc-resume__keys">
          {keywords.map((k, i) => <span key={k} style={{ '--d': `${0.8 + i * 0.35}s` }}>{k}</span>)}
        </div>
        {[88, 70, 94, 76, 50, 82, 64].map((w, i) => <i key={`b${i}`} className="sc-resume__line" style={{ width: `${w}%` }} />)}
        <span className="sc-resume__scan" />
      </motion.div>

      <motion.div className="sc-card sc-resume__score" {...pop(0.35)}>
        <svg viewBox="0 0 42 42">
          <circle cx="21" cy="21" r="15.9" className="sc-donut-track" />
          <circle cx="21" cy="21" r="15.9" className="sc-donut-fill" style={{ strokeDasharray: `${score} 100` }} />
        </svg>
        <strong>{Math.round(score)}%</strong>
        <small>ATS score</small>
      </motion.div>

      <motion.div className="sc-card sc-resume__strength" {...pop(0.5)}>
        <small>Profile strength</small>
        <strong>Excellent</strong>
        <span className="sc-resume__meter">
          {[0, 1, 2, 3, 4].map((i) => <i key={i} style={{ '--d': `${0.9 + i * 0.15}s` }} />)}
        </span>
      </motion.div>

      <motion.div className="sc-card sc-resume__match" {...pop(0.7)}>
        <b className="sc-card__title"><ScanLine size="1.1em" /> Keyword match</b>
        {match.map(([k, v], i) => (
          <div key={k} className="sc-inv__row">
            <span>{k}</span>
            <span className="sc-progress"><i style={{ '--fill': v, '--d': `${1.1 + i * 0.2}s` }} /></span>
            <em>{Math.round(v * 100)}%</em>
          </div>
        ))}
      </motion.div>

      <Toast icon={Check} title="Shortlisted" sub="Keyword match: strong" delay={2.4} className="sc-resume__toast" />
    </Stage>
  )
}

/* 08 Academic: milestones build in turn, the build log types out, the report grows */
function AcademicScene() {
  const pages = Math.round(useCount(48, 2200, 600))
  const milestones = [['Proposal', 0, 18], ['Research', 14, 42], ['Build', 36, 74], ['Report', 66, 90], ['Viva', 86, 100]]
  const log = [
    ['$', 'npm run build'],
    ['✓', 'source code compiled'],
    ['✓', 'report generated · 48 pages'],
    ['✓', 'plagiarism check: 2%'],
  ]
  return (
    <Stage>
      <motion.div className="sc-card sc-acad__gantt" {...pop(0.1, 1.4)}>
        <b className="sc-card__title"><GraduationCap size="1.1em" /> Project milestones</b>
        {milestones.map(([name, from, to], i) => (
          <div key={name} className="sc-acad__row">
            <span>{name}</span>
            <span className="sc-acad__track">
              <i style={{ left: `${from}%`, width: `${to - from}%`, '--d': `${0.5 + i * 0.3}s` }} className={i === milestones.length - 1 ? 'is-last' : ''} />
            </span>
          </div>
        ))}
      </motion.div>

      <motion.div className="sc-acad__term" {...pop(0.4)}>
        <div className="sc-acad__term-bar"><i /><i /><i /><span>final-year-project</span></div>
        {log.map(([mark, text], i) => (
          <div key={text} className="sc-acad__line" style={{ '--d': `${0.9 + i * 0.55}s` }}>
            <b className={mark === '$' ? 'is-prompt' : ''}>{mark}</b> <span>{text}</span>
          </div>
        ))}
        <span className="sc-acad__cursor" />
      </motion.div>

      <motion.div className="sc-acad__doc" {...pop(0.55)}>
        <span className="sc-acad__page sc-acad__page--3" />
        <span className="sc-acad__page sc-acad__page--2" />
        <span className="sc-acad__page">
          <FileText size="1.6em" />
          <b>Final_Report.pdf</b>
          <small>{pages} pages</small>
        </span>
      </motion.div>

      <Toast icon={Check} title="Viva ready" sub="Docs + source code" delay={2.9} className="sc-acad__toast" />
    </Stage>
  )
}

export const scenes = [
  ShowroomScene,
  DashboardScene,
  InventoryScene,
  AndroidScene,
  BrandScene,
  SocialScene,
  ResumeScene,
  AcademicScene,
]
