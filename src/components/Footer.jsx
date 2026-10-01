import React, { useEffect, useState } from 'react'
import { ArrowUpRight, ArrowUp } from 'lucide-react'
import { SiInstagram, SiGithub } from 'react-icons/si'
import { FaLinkedinIn } from 'react-icons/fa'
import './Footer.css'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const serviceLinks = [
  'Web Applications',
  'Android Applications',
  'Internal Applications',
  'Digital Marketing',
  'Social Media Marketing',
  'ATS Resume',
  'Stationery Design',
  'Academic Solutions',
]

const socials = [
  { label: 'Instagram', icon: SiInstagram, href: '#' },
  { label: 'LinkedIn', icon: FaLinkedinIn, href: '#' },
  { label: 'GitHub', icon: SiGithub, href: '#' },
]

const marquee = ['Web apps', 'Android apps', 'Business systems', 'Automation', 'Dashboards', 'Brand design']

const timeFormat = new Intl.DateTimeFormat('en-IN', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
  timeZone: 'Asia/Kolkata',
})

export default function Footer() {
  // Studio clock (Bangalore time)
  const [time, setTime] = useState(() => timeFormat.format(new Date()))

  useEffect(() => {
    const timer = setInterval(() => setTime(timeFormat.format(new Date())), 20000)
    return () => clearInterval(timer)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) {
      const offset = 80
      const y = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top: y, behavior: 'smooth' })
    } else if (href === '#contact') {
      // Sub-pages have no contact section of their own
      window.location.assign('/contact')
    } else {
      window.location.assign('/')
    }
  }

  return (
    <footer className="footer">
      <div className="footer__grid-bg" aria-hidden="true" />
      <div className="footer__glow" aria-hidden="true" />

      {/* Call to action */}
      <div className="container footer__cta">
        <div>
          <span className="footer__kicker">Have a problem?</span>
          <h2 className="footer__headline">
            Let&rsquo;s build
            <br />
            <span>the solution.</span>
          </h2>
        </div>
        <a href="#contact" className="footer__cta-btn" onClick={(e) => handleNavClick(e, '#contact')}>
          <svg className="footer__cta-ring" viewBox="0 0 200 200" aria-hidden="true">
            <defs>
              <path id="footerRing" d="M100 100 m-82 0 a82 82 0 1 1 164 0 a82 82 0 1 1 -164 0" />
            </defs>
            <text>
              <textPath href="#footerRing" textLength="508">
                START A PROJECT &#x2022; START A PROJECT &#x2022; START A PROJECT &#x2022;
              </textPath>
            </text>
          </svg>
          <span className="footer__cta-core">
            <ArrowUpRight size={34} strokeWidth={2.2} />
          </span>
        </a>
      </div>

      {/* What we build, on a loop */}
      <div className="footer__marquee" aria-hidden="true">
        <div className="footer__marquee-track">
          {[...marquee, ...marquee, ...marquee, ...marquee].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#home" className="footer__logo" onClick={(e) => handleNavClick(e, '#home')}>
              <span className="footer__logo-mark">L</span>
              LIVORA
            </a>
            <p className="footer__desc">
              Custom software and digital solutions built around your business.
            </p>

            <div className="footer__status">
              <span className="footer__status-row">
                <i className="footer__status-dot" /> Now accepting new projects
              </span>
              <span className="footer__status-row footer__status-row--muted">
                Bangalore, India &middot; {time} IST
              </span>
            </div>

            <div className="footer__socials">
              {socials.map(({ label, icon: Icon, href }) => (
                <a key={label} href={href} className="footer__social" aria-label={label}>
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Navigation</h4>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="footer__link"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Services</h4>
            {serviceLinks.map((s) => (
              <a
                key={s}
                href="#services"
                className="footer__link"
                onClick={(e) => handleNavClick(e, '#services')}
              >
                {s}
              </a>
            ))}
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Contact</h4>
            <a href="tel:+918618176469" className="footer__link">+91 8618176469</a>
            <a href="tel:+917994162314" className="footer__link">+91 7994162314</a>
            <a href="mailto:prajwalnair2603@gmail.com" className="footer__link">prajwalnair2603@gmail.com</a>
            <a href="mailto:nikhil@gmail.com" className="footer__link">nikhil@gmail.com</a>
          </div>
        </div>
      </div>

      {/* Giant wordmark: each letter lights up under the pointer */}
      <div className="footer__wordmark" aria-hidden="true">
        {'LIVORA'.split('').map((letter, i) => (
          <span key={i} style={{ '--i': i }}>{letter}</span>
        ))}
      </div>

      <div className="container footer__bottom">
        <p>&copy; 2026 LIVORA. All rights reserved.</p>
        <button
          type="button"
          className="footer__top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Back to top <span><ArrowUp size={15} /></span>
        </button>
      </div>
    </footer>
  )
}
