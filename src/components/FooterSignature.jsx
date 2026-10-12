import React, { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import logo from '../assets/livora-logo-full.png'
import { strokes } from './IntroWriting'
import './FooterSignature.css'

/*
  Footer finale: the handwritten logo signs itself when it scrolls into view,
  then a lime spotlight drifts across it. The pointer steers the light.
  Shares the pen strokes with the opening intro (viewBox 1597 x 711).
*/
const W = 1597
const H = 711

export default function FooterSignature() {
  const reduce = useReducedMotion()
  const wrapRef = useRef(null)
  const spotRef = useRef(null)
  const glowRef = useRef(null)
  const [written, setWritten] = useState(false)
  const visible = useRef(false)
  const pointer = useRef(null)

  // Sign once on first view; keep tracking visibility to pause the light
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting
      if (entry.isIntersecting) setWritten(true)
    }, { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Spotlight: follows the pointer, otherwise wanders along a slow figure-eight
  useEffect(() => {
    if (reduce) return
    let raf
    const pos = { x: W * 0.2, y: H * 0.45 }
    const start = performance.now()
    const tick = (now) => {
      if (visible.current) {
        const t = (now - start) / 1000
        const target = pointer.current || {
          x: W / 2 + Math.sin(t * 0.55) * W * 0.4,
          y: H * 0.45 + Math.sin(t * 1.1) * H * 0.22,
        }
        pos.x += (target.x - pos.x) * 0.08
        pos.y += (target.y - pos.y) * 0.08
        spotRef.current?.setAttribute('cx', pos.x)
        spotRef.current?.setAttribute('cy', pos.y)
        if (glowRef.current) {
          glowRef.current.style.left = `${(pos.x / W) * 100}%`
          glowRef.current.style.top = `${(pos.y / H) * 100}%`
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduce])

  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    pointer.current = { x: ((e.clientX - r.left) / r.width) * W, y: ((e.clientY - r.top) / r.height) * H }
  }

  // Same rhythm as the intro, a touch slower
  let t = 0.2
  const timed = strokes.map((s) => {
    const begin = t
    t += s.duration * 1.15 + 0.08
    return { ...s, begin }
  })
  const writeEnd = t

  return (
    <div
      className="footer-sig"
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={() => { pointer.current = null }}
      aria-hidden="true"
    >
      <span className="footer-sig__glow" ref={glowRef} />
      <svg className="footer-sig__svg" viewBox={`0 0 ${W} ${H}`}>
        <defs>
          {/* Recolour the black logo artwork */}
          <filter id="sig-paper">
            <feFlood floodColor="#F4F4EF" />
            <feComposite in2="SourceAlpha" operator="in" />
          </filter>
          <filter id="sig-lime">
            <feFlood floodColor="#C8F53B" />
            <feComposite in2="SourceAlpha" operator="in" />
          </filter>

          {/* Pen mask: the signature appears as the strokes are drawn */}
          <mask id="sig-ink" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
            {timed.map((s, i) => (
              <motion.path
                key={i}
                d={s.d}
                fill="none"
                stroke="#fff"
                strokeWidth={s.width}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: reduce ? 1 : 0, strokeOpacity: reduce ? 1 : 0 }}
                animate={written ? { pathLength: 1, strokeOpacity: 1 } : {}}
                transition={{
                  pathLength: { delay: s.begin, duration: s.duration * 1.15, ease: s.ease },
                  strokeOpacity: { delay: s.begin, duration: 0.01 },
                }}
              />
            ))}
            <motion.rect
              x="0"
              y="650"
              height="61"
              fill="#fff"
              initial={{ width: reduce ? W : 0 }}
              animate={written ? { width: W } : {}}
              transition={{ delay: writeEnd, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </mask>

          {/* Soft round spotlight */}
          <radialGradient id="sig-spot-grad">
            <stop offset="0" stopColor="#fff" />
            <stop offset="0.55" stopColor="#fff" stopOpacity="0.6" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="sig-spot" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
            <circle ref={spotRef} cx={W * 0.2} cy={H * 0.45} r="260" fill="url(#sig-spot-grad)" />
          </mask>
        </defs>

        <g mask="url(#sig-ink)">
          <image href={logo} width={W} height={H} filter="url(#sig-paper)" className="footer-sig__base" />
          {!reduce && (
            <g mask="url(#sig-spot)">
              <image href={logo} width={W} height={H} filter="url(#sig-lime)" />
            </g>
          )}
        </g>
      </svg>
    </div>
  )
}
