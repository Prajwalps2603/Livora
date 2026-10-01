import React from 'react'
import './TrustStrip.css'

const items = [
  { text: 'Custom Software' },
  { text: 'Web Apps', outline: true },
  { text: 'Android' },
  { text: 'Automation', outline: true },
  { text: 'Dashboards' },
  { text: 'Digital Design', outline: true },
  { text: 'Marketing' },
]

export default function TrustStrip() {
  const repeated = [...items, ...items]

  return (
    <div className="trust-strip ink" aria-label="What we build">
      <div className="trust-strip__track">
        {repeated.map((item, i) => (
          <span key={i} className="trust-strip__item" aria-hidden={i >= items.length}>
            <span className={item.outline ? 'trust-strip__text trust-strip__text--outline' : 'trust-strip__text'}>
              {item.text}
            </span>
            <svg className="trust-strip__star" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0c.6 6.6 5.4 11.4 12 12-6.6.6-11.4 5.4-12 12-.6-6.6-5.4-11.4-12-12C6.6 11.4 11.4 6.6 12 0z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  )
}
