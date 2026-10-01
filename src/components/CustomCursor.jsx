import React, { useEffect, useRef, useState } from 'react'

const INTERACTIVE = 'a, button, input, textarea, select, [role="button"]'

export default function CustomCursor() {
  const ringRef = useRef(null)
  const dotRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    // Don't show on touch devices
    if ('ontouchstart' in window || window.innerWidth < 768) return

    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return

    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    let frame
    let magnet = null

    // Ring eases toward the pointer so it trails the dot slightly
    const tick = () => {
      current.x += (target.x - current.x) * 0.18
      current.y += (target.y - current.y) * 0.18
      ring.style.left = `${current.x}px`
      ring.style.top = `${current.y}px`
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    const handleMouseMove = (e) => {
      setVisible(true)
      target.x = e.clientX
      target.y = e.clientY
      dot.style.left = `${e.clientX}px`
      dot.style.top = `${e.clientY}px`

      // Feed pointer position to glass cards for their spotlight edge
      const card = e.target.closest?.('.glass-card')
      if (card) {
        const rect = card.getBoundingClientRect()
        card.style.setProperty('--mx', `${e.clientX - rect.left}px`)
        card.style.setProperty('--my', `${e.clientY - rect.top}px`)
      }

      // Primary buttons lean slightly toward the pointer
      const btn = e.target.closest?.('.btn-primary')
      if (magnet && magnet !== btn) {
        magnet.style.removeProperty('--mag-x')
        magnet.style.removeProperty('--mag-y')
      }
      magnet = btn
      if (btn) {
        const rect = btn.getBoundingClientRect()
        btn.style.setProperty('--mag-x', `${(e.clientX - rect.left - rect.width / 2) * 0.22}px`)
        btn.style.setProperty('--mag-y', `${(e.clientY - rect.top - rect.height / 2) * 0.3}px`)
      }
    }

    // Delegated hover detection covers elements added after mount
    const handleOver = (e) => setHovering(!!e.target.closest?.(INTERACTIVE))
    const handleLeaveWindow = () => setVisible(false)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleOver)
    document.documentElement.addEventListener('mouseleave', handleLeaveWindow)

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleOver)
      document.documentElement.removeEventListener('mouseleave', handleLeaveWindow)
    }
  }, [])

  if (typeof window !== 'undefined' && ('ontouchstart' in window || window.innerWidth < 768)) {
    return null
  }

  return (
    <>
      <div
        ref={ringRef}
        className={`custom-cursor ${hovering ? 'hovering' : ''}`}
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{ opacity: visible && !hovering ? 1 : 0 }}
      />
    </>
  )
}
