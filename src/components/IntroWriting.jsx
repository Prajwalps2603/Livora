import React, { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import logo from '../assets/livora-logo-full.png'
import './IntroWriting.css'

// Pen strokes traced over the logo (viewBox 1597 × 711), in writing order.
// Each one draws into a mask, so the real logo appears as the pen moves.
const strokes = [
  { d: 'M366 18 C300 140 120 450 22 632', width: 78, duration: 0.55, ease: [0.55, 0, 0.75, 1] },
  {
    d: 'M434 330 C415 400 360 470 384 488 C404 513 470 470 520 400 C545 360 548 330 552 330 C552 400 545 480 566 494 C601 514 650 420 690 325 C710 350 760 345 800 310 C740 320 740 470 790 465 C850 460 860 330 810 310 C850 330 890 325 950 290 C930 350 905 420 915 445 C940 380 970 290 1000 280 C1030 270 1060 300 1085 295 C1150 240 1220 270 1215 275 C1130 280 1060 420 1110 415 C1170 410 1220 320 1230 280 C1225 330 1215 390 1260 380 C1300 370 1340 320 1362 290',
    width: 84,
    duration: 1.5,
    ease: [0.4, 0, 0.6, 1],
  },
  { d: 'M438 262 C444 238 462 230 474 236', width: 62, duration: 0.14, ease: 'easeOut' },
  { d: 'M40 628 C150 590 350 545 520 553 C750 566 1000 557 1200 492 C1330 448 1420 385 1462 318', width: 62, duration: 0.7, ease: [0.5, 0, 0.3, 1] },
  { d: 'M1408 240 C1460 215 1530 185 1586 160 C1560 220 1540 270 1526 318 C1510 280 1490 270 1470 262', width: 92, duration: 0.3, ease: 'easeOut' },
]

const PAUSE = 0.08
const starts = strokes.reduce((acc, s, i) => [...acc, i ? acc[i - 1] + strokes[i - 1].duration + PAUSE : 0.25], [])
const writeEnd = starts.at(-1) + strokes.at(-1).duration
const TAGLINE = 0.6
const HOLD = 0.55

export default function IntroWriting({ onDone }) {
  const reduce = useReducedMotion()
  const [skipped, setSkipped] = useState(false)

  useEffect(() => {
    const total = reduce ? 900 : (writeEnd + TAGLINE + HOLD) * 1000
    const timer = setTimeout(onDone, total)
    const skip = () => { setSkipped(true); onDone() }
    window.addEventListener('keydown', skip)
    document.body.style.overflow = 'hidden'
    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', skip)
      document.body.style.overflow = ''
    }
  }, [onDone, reduce])

  return (
    <motion.div
      className="intro-writing"
      onClick={() => { setSkipped(true); onDone() }}
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: skipped ? 0.4 : 0.8, ease: [0.76, 0, 0.24, 1] } }}
      aria-label="LIVORA — Building ideas into reality"
      role="img"
    >
      <svg className="intro-writing__logo" viewBox="0 0 1597 711" aria-hidden="true">
        <defs>
          <mask id="intro-ink" maskUnits="userSpaceOnUse" x="0" y="0" width="1597" height="711">
            {strokes.map((s, i) => (
              <motion.path
                key={i}
                d={s.d}
                fill="none"
                stroke="#fff"
                strokeWidth={s.width}
                strokeLinecap="round"
                strokeLinejoin="round"
                // Hidden until its turn: a round cap paints a dot even at zero length
                initial={{ pathLength: reduce ? 1 : 0, strokeOpacity: reduce ? 1 : 0 }}
                animate={{ pathLength: 1, strokeOpacity: 1 }}
                transition={{
                  pathLength: { delay: starts[i], duration: s.duration, ease: s.ease },
                  strokeOpacity: { delay: starts[i], duration: 0.01 },
                }}
              />
            ))}
            <motion.rect
              x="0"
              y="650"
              height="61"
              fill="#fff"
              initial={{ width: reduce ? 1597 : 0 }}
              animate={{ width: 1597 }}
              transition={{ delay: writeEnd + 0.1, duration: TAGLINE, ease: [0.22, 1, 0.36, 1] }}
            />
          </mask>
        </defs>
        <image href={logo} width="1597" height="711" mask="url(#intro-ink)" />
      </svg>

      <motion.span
        className="intro-writing__hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        Click to skip
      </motion.span>
    </motion.div>
  )
}
