import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import './ThemeShow.css'

/*
  Theme switch show.
  The navbar toggle turns into a little bot that roams down the page to the tech
  keyboard, hovers over it and lowers a USB-C cable from its belly into the
  keyboard's port. The keyboard boots and runs the switch as code, the signal flows
  up the cable into the bot, and the new theme bursts out of the bot across the
  screen. The cable winds back in and the bot roams home into the toggle.
  Events:
    livora:theme-request (from Navbar)            livora:theme-apply (to Navbar)
    livora:kb-reset / kb-plug / kb-unplug / kb-terminal / kb-terminal-close  (to Technology)
    livora:kb-booted / kb-done                    (from Technology)
*/
const emit = (name, detail) => window.dispatchEvent(new CustomEvent(name, { detail }))
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const BOT = 56

export default function ThemeShow() {
  const reduce = useReducedMotion()
  const [on, setOn] = useState(false)
  const [mood, setMood] = useState('') // flying | hovering | plugged | charged | home
  const [cable, setCable] = useState(false)
  const botRef = useRef(null)
  const wireRef = useRef(null)
  const glowRef = useRef(null)
  const plugRef = useRef(null)
  const pulseRefs = useRef([])
  const st = useRef({
    bot: { x: 0, y: 0 }, rot: 0, lastX: 0,
    plug: { x: 0, y: 0 }, pulses: [], raf: 0, hover: false, t0: 0,
  })
  const running = useRef(false)
  const skipped = useRef(false)
  const waiters = useRef([])

  /* ---------- async helpers that end early on skip ---------- */
  const wait = (ms) => new Promise((resolve) => {
    if (skipped.current) return resolve()
    const t = setTimeout(resolve, ms)
    waiters.current.push(() => { clearTimeout(t); resolve() })
  })
  const waitFor = (name, maxMs) => new Promise((resolve) => {
    if (skipped.current) return resolve()
    const done = () => { window.removeEventListener(name, done); clearTimeout(t); resolve() }
    const t = setTimeout(done, maxMs)
    window.addEventListener(name, done)
    waiters.current.push(done)
  })
  const tween = (ms, onFrame) => new Promise((resolve) => {
    if (skipped.current) { onFrame(1); return resolve() }
    const start = performance.now()
    const step = (now) => {
      const t = Math.min(1, (now - start) / ms)
      onFrame(t)
      if (t < 1 && !skipped.current) requestAnimationFrame(step)
      else { onFrame(1); resolve() }
    }
    requestAnimationFrame(step)
  })

  /* ---------- geometry ---------- */
  const toggleCenter = () => {
    const r = document.querySelector('.navbar-theme-btn')?.getBoundingClientRect()
    return r ? { x: r.x + r.width / 2, y: r.y + r.height / 2 } : null
  }
  const portPoint = () => {
    const r = document.querySelector('.tech__port')?.getBoundingClientRect()
    return r ? { x: r.x + r.width / 2, y: r.y - 14 } : null
  }
  // Where the bot hovers: up and to the side of the port, kept on screen
  const hoverPoint = () => {
    const p = portPoint()
    if (!p) return null
    return { x: Math.min(window.innerWidth - 50, p.x + 90), y: Math.max(70, p.y - 120) }
  }

  /* ---------- per-frame drawing: bot, cable, plug, pulses ---------- */
  const draw = (now) => {
    const s = st.current
    // gentle bob while hovering
    const bob = s.hover ? Math.sin((now - s.t0) / 260) * 5 : 0
    const bx = s.bot.x
    const by = s.bot.y + bob
    // lean into the direction of travel
    const vx = bx - s.lastX
    s.lastX = bx
    s.rot += (Math.max(-22, Math.min(22, vx * 2.2)) - s.rot) * 0.15
    if (botRef.current) botRef.current.style.transform = `translate(${bx - BOT / 2}px, ${by - BOT / 2}px) rotate(${s.rot}deg)`

    // cable from the bot's belly to the plug
    const ax = bx
    const ay = by + 25
    const { x: px, y: py } = s.plug
    const sag = Math.max(30, Math.abs(py - ay) * 0.35)
    const d = `M ${ax} ${ay} C ${ax} ${ay + sag}, ${px} ${py - sag}, ${px} ${py}`
    wireRef.current?.setAttribute('d', d)
    glowRef.current?.setAttribute('d', d)
    if (plugRef.current) plugRef.current.style.transform = `translate(${px - 13}px, ${py - 6}px)`

    const len = wireRef.current?.getTotalLength?.() || 0
    pulseRefs.current.forEach((el, i) => {
      if (!el) return
      const p = s.pulses[i]
      if (p == null || !len) { el.setAttribute('opacity', '0'); return }
      const pt = wireRef.current.getPointAtLength(len * p)
      el.setAttribute('cx', pt.x)
      el.setAttribute('cy', pt.y)
      el.setAttribute('opacity', '1')
    })
  }
  const loop = (now) => {
    draw(now)
    st.current.raf = requestAnimationFrame(loop)
  }

  // Roaming flight: eases to a target (which may move as the page scrolls) while swooping side to side
  const roam = (ms, getTarget, { swoops = 1.5, width = 0.28, lift = 50 } = {}) => {
    const from = { ...st.current.bot }
    return tween(ms, (t) => {
      const target = getTarget() || from
      const e = easeInOut(t)
      const fade = Math.sin(t * Math.PI) // strongest mid-flight
      const x = from.x + (target.x - from.x) * e + Math.sin(t * Math.PI * 2 * swoops) * window.innerWidth * width * fade
      st.current.bot = {
        x: Math.max(BOT, Math.min(window.innerWidth - BOT, x)), // stay on screen
        y: from.y + (target.y - from.y) * e - Math.sin(t * Math.PI * 4) * lift * fade,
      }
    })
  }

  /* ---------- the theme flip itself ---------- */
  const applyTheme = async (next, cx, cy) => {
    const set = () => {
      document.documentElement.setAttribute('data-theme', next)
      emit('livora:theme-apply', { theme: next })
    }
    if (!document.startViewTransition || skipped.current) { set(); return }
    const t = document.startViewTransition(set)
    try {
      await t.ready
      const r = Math.hypot(Math.max(cx, window.innerWidth - cx), Math.max(cy, window.innerHeight - cy))
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${cx}px ${cy}px)`, `circle(${r}px at ${cx}px ${cy}px)`] },
        { duration: 1000, easing: 'cubic-bezier(0.76, 0, 0.24, 1)', pseudoElement: '::view-transition-new(root)' },
      )
      await t.finished
    } catch { /* the theme is applied even if the transition is interrupted */ }
  }

  /* ---------- the show ---------- */
  const run = async (next) => {
    running.current = true
    skipped.current = false
    waiters.current = []
    const root = document.documentElement
    const startScroll = window.scrollY
    const home = toggleCenter()
    const kb = document.querySelector('.tech__kb')
    if (!home) { emit('livora:theme-apply', { theme: next }); running.current = false; return }

    const s = st.current
    s.bot = { ...home }
    s.lastX = home.x
    s.rot = 0
    s.plug = { x: home.x, y: home.y + 20 }
    s.pulses = []
    s.hover = false
    root.classList.add('theme-show-on')
    setOn(true)
    setCable(false)
    setMood('')
    s.raf = requestAnimationFrame(loop)
    await wait(380) // the toggle pops into the bot

    if (kb) {
      emit('livora:kb-reset')
      // Page glides to the keyboard while the bot roams down with it
      const kr = kb.getBoundingClientRect()
      const tall = kr.height > window.innerHeight * 0.8
      const target = window.scrollY + kr.top - (tall ? 190 : window.innerHeight / 2 - kr.height / 2 + 40)
      window.scrollTo({ top: target, behavior: 'smooth' })
      setMood('flying')
      await roam(1900, hoverPoint, { swoops: 1.5, width: 0.3, lift: 70 })
      // settle right over the (now still) port
      await roam(300, hoverPoint, { swoops: 0, width: 0, lift: 0 })

      // Hover and lower the USB cable from the belly into the port
      setMood('hovering')
      s.hover = true
      s.t0 = performance.now()
      setCable(true)
      s.plug = { x: s.bot.x, y: s.bot.y + 25 }
      const dropFrom = { ...s.plug }
      await tween(600, (t) => {
        const port = portPoint()
        if (!port) return
        const e = easeInOut(t)
        s.plug = { x: dropFrom.x + (port.x - dropFrom.x) * e, y: dropFrom.y + (port.y + 12 - dropFrom.y) * e }
      })
      setMood('plugged')
      emit('livora:kb-plug')
      await waitFor('livora:kb-booted', 2500)

      emit('livora:kb-terminal', { next })
      await waitFor('livora:kb-done', 6000)

      // Signal flows up the cable into the bot, then the theme bursts out of it
      await tween(750, (t) => {
        s.pulses = [0, 0.2, 0.4].map((o) => {
          const p = 1 - Math.max(0, Math.min(1, t * 1.4 - o))
          return p >= 1 || p <= 0 ? null : p
        })
      })
      s.pulses = []
      setMood('charged')
      await wait(250)
      await applyTheme(next, s.bot.x, s.bot.y)
      await wait(350)

      // Wind the cable back in, then roam home while the page glides back
      emit('livora:kb-terminal-close')
      emit('livora:kb-unplug')
      const reelFrom = { ...s.plug }
      await tween(500, (t) => {
        const e = easeInOut(t)
        s.plug = { x: reelFrom.x + (s.bot.x - reelFrom.x) * e, y: reelFrom.y + (s.bot.y + 25 - reelFrom.y) * e }
      })
      setCable(false)
      s.hover = false
      setMood('flying')
      window.scrollTo({ top: startScroll, behavior: 'smooth' })
      await roam(1500, toggleCenter, { swoops: 1, width: 0.22, lift: 50 })
    } else {
      // No keyboard here: a quick loop near the top, then the theme bursts out of the bot
      setMood('flying')
      const loopTarget = () => ({ x: window.innerWidth * 0.5, y: window.innerHeight * 0.35 })
      await roam(1100, loopTarget, { swoops: 1, width: 0.2, lift: 40 })
      setMood('charged')
      await wait(300)
      await applyTheme(next, st.current.bot.x, st.current.bot.y)
      setMood('flying')
      await roam(900, toggleCenter, { swoops: 0.5, width: 0.12, lift: 30 })
    }

    setMood('home')
    await wait(240)

    // Final state, even after a skip
    if (document.documentElement.getAttribute('data-theme') !== next) {
      document.documentElement.setAttribute('data-theme', next)
      emit('livora:theme-apply', { theme: next })
    }
    emit('livora:kb-terminal-close')
    emit('livora:kb-unplug')
    if (skipped.current) window.scrollTo({ top: startScroll, behavior: 'auto' })
    cancelAnimationFrame(s.raf)
    setOn(false)
    setCable(false)
    setMood('')
    root.classList.remove('theme-show-on')
    running.current = false
  }

  const skip = () => {
    if (!running.current || skipped.current) return
    skipped.current = true
    waiters.current.forEach((f) => f())
    waiters.current = []
  }

  useEffect(() => {
    const onRequest = (e) => {
      const next = e.detail?.next
      if (!next || running.current) return
      if (reduce) {
        document.documentElement.setAttribute('data-theme', next)
        emit('livora:theme-apply', { theme: next })
        return
      }
      run(next)
    }
    const onKey = (e) => { if (e.key === 'Escape') skip() }
    window.addEventListener('livora:theme-request', onRequest)
    window.addEventListener('keydown', onKey)
    window.__livoraThemeShow = true
    return () => {
      window.removeEventListener('livora:theme-request', onRequest)
      window.removeEventListener('keydown', onKey)
      window.__livoraThemeShow = false
    }
  })

  useEffect(() => () => cancelAnimationFrame(st.current.raf), [])

  return (
    <>
      {on && (
        <div className="tshow" aria-hidden="true">
          {cable && (
            <svg className="tshow__svg">
              <path ref={glowRef} className="tshow__glow" />
              <path ref={wireRef} className="tshow__wire" />
              {[0, 1, 2].map((i) => (
                <circle key={i} ref={(el) => { pulseRefs.current[i] = el }} r="6" className="tshow__pulse" opacity="0" />
              ))}
            </svg>
          )}
          {cable && (
            <div className="tshow__plug" ref={plugRef}>
              <span className="tshow__plug-body"><i /></span>
              <span className="tshow__plug-tip" />
            </div>
          )}

          {/* The bot: position and lean are set every frame */}
          <div className="tshow__bot-pos" ref={botRef}>
            <motion.div
              className={`tbot tbot--${mood}`}
              initial={{ scale: 0.3, rotate: -120, opacity: 0 }}
              animate={mood === 'home' ? { scale: 0.4, opacity: 0 } : { scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 320, damping: 15 }}
              onClick={skip}
            >
              <span className="tbot__antenna" />
              <span className="tbot__body">
                <span className="tbot__eye" />
                <span className="tbot__eye" />
              </span>
              <span className="tbot__hatch" />
              <span className="tbot__flame" />
            </motion.div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {on && (
          <motion.button
            type="button"
            className="tbot-skip"
            onClick={skip}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
            exit={{ opacity: 0, y: 20 }}
          >
            Skip <kbd>esc</kbd>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
