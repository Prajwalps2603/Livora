import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight } from 'lucide-react'
import { SiWhatsapp } from 'react-icons/si'
import './WhatsAppButton.css'

const PHONE = '918618176469'

const waLink = (text) => `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`

const quickReplies = [
  { label: 'I need a web app', text: "Hi LIVORA! I'd like to discuss a web application." },
  { label: 'I need an Android app', text: "Hi LIVORA! I'd like to discuss an Android app." },
  { label: 'Automate my business', text: "Hi LIVORA! I'd like to automate part of my business." },
  { label: 'Something else', text: "Hi LIVORA! I'd like to discuss a project." },
]

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false)
  const [typing, setTyping] = useState(true)
  const rootRef = useRef(null)

  // A short "typing" beat before the greeting appears
  useEffect(() => {
    if (!open) return
    setTyping(true)
    const timer = setTimeout(() => setTyping(false), 900)
    return () => clearTimeout(timer)
  }, [open])

  // Close on Escape or a click outside the widget
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open])

  return (
    <div className={`chat ${open ? 'is-open' : ''}`} ref={rootRef}>
      <AnimatePresence>
        {open && (
          <motion.div
            className="chat__panel"
            role="dialog"
            aria-label="Chat with LIVORA"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.94 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="chat__head">
              <span className="chat__avatar">L</span>
              <div className="chat__who">
                <strong>LIVORA</strong>
                <span><i /> Replies within 24 hours</span>
              </div>
              <button type="button" className="chat__close" onClick={() => setOpen(false)} aria-label="Close chat">
                <X size={16} />
              </button>
            </div>

            <div className="chat__body">
              {typing ? (
                <div className="chat__bubble chat__bubble--typing" aria-label="Typing">
                  <i /><i /><i />
                </div>
              ) : (
                <motion.div
                  className="chat__bubble"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Hi! Tell us what you need and a founder will reply on WhatsApp.
                </motion.div>
              )}

              <div className="chat__replies">
                {quickReplies.map((reply, i) => (
                  <motion.a
                    key={reply.label}
                    href={waLink(reply.text)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chat__reply"
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {reply.label}
                  </motion.a>
                ))}
              </div>
            </div>

            <a
              href={waLink(quickReplies[3].text)}
              target="_blank"
              rel="noopener noreferrer"
              className="chat__start"
              onClick={() => setOpen(false)}
            >
              <SiWhatsapp size={18} />
              Start chat on WhatsApp
              <ArrowUpRight size={18} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        className="chat__launcher"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Chat with LIVORA on WhatsApp'}
        aria-expanded={open}
      >
        <svg className="chat__ring" viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <path id="chatRing" d="M50 50 m-39 0 a39 39 0 1 1 78 0 a39 39 0 1 1 -78 0" />
          </defs>
          <text>
            <textPath href="#chatRing" textLength="240">
              CHAT WITH US &#x2022; LET&#x2019;S TALK &#x2022; CHAT WITH US &#x2022;
            </textPath>
          </text>
        </svg>
        <span className="chat__core">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? 'close' : 'open'}
              initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {open ? <X size={22} /> : <SiWhatsapp size={24} />}
            </motion.span>
          </AnimatePresence>
        </span>
        {!open && <span className="chat__ping" />}
      </button>
    </div>
  )
}
