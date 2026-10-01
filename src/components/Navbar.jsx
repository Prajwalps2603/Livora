import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Menu, X, ArrowRight, ArrowUpRight, Sun, Moon, ChevronDown, Sparkles, Compass, Users2, Layers, Cpu, Flame, Phone, Code2, Briefcase, Zap, CheckCircle2, ShieldCheck, Target } from 'lucide-react'
import './Navbar.css'

const aboutUsItems = [
  {
    label: 'About LIVORA',
    tagline: 'Main Home Studio',
    view: 'home',
    icon: Sparkles,
    color: 'var(--color-accent)',
    desc: 'Return to the full home studio experience',
  },
  {
    label: 'Overview',
    tagline: 'About Us Overview',
    view: 'about-overview',
    icon: Compass,
    color: 'var(--color-accent)',
    desc: 'Full studio identity, who we are & story',
  },
  {
    label: 'Our Purpose',
    tagline: 'Why LIVORA Exists',
    view: 'purpose',
    icon: Target,
    color: 'var(--color-accent)',
    desc: 'Friction-to-growth digital transformation',
  },
  {
    label: 'Our Motivation',
    tagline: 'What Drives Us',
    view: 'motivation',
    icon: Zap,
    color: 'var(--color-accent)',
    desc: 'Solving real-world bottlenecks with code',
  },
  {
    label: 'Our Mission & Vision',
    tagline: 'Directives & Strategy',
    view: 'mission-vision',
    icon: Flame,
    color: 'var(--color-accent)',
    desc: '5 core engineering directives & roadmap',
  },
  {
    label: 'Our Philosophy',
    tagline: 'Technology Adapts to You',
    view: 'philosophy',
    icon: Layers,
    color: 'var(--color-accent)',
    desc: 'Human workflow discovery vs legacy SaaS',
  },
  {
    label: 'Commitment to Quality',
    tagline: 'Engineering Rigor & Guarantees',
    view: 'quality',
    icon: ShieldCheck,
    color: 'var(--color-accent)',
    desc: 'Zero technical debt & Try-Before-Commit',
  },
  {
    label: 'What We Build',
    tagline: 'Solutions Portfolio',
    view: 'what-we-build',
    icon: Cpu,
    color: 'var(--color-accent)',
    desc: 'Software, Android, Automation & Digital',
  },
  {
    label: 'Our People',
    tagline: 'Lead Engineers & Founders',
    view: 'team',
    icon: Users2,
    color: 'var(--color-accent)',
    desc: 'Prajwal M P & Nikhil K (Full-Stack)',
  },
  {
    label: 'Contact',
    tagline: 'Get In Touch',
    view: 'contact',
    icon: Phone,
    color: 'var(--color-accent)',
    desc: 'Direct WhatsApp & enquiry access',
  },
]

const explorerItems = [
  {
    label: 'Services',
    tagline: 'Core Engineering Offerings',
    view: 'services',
    icon: Code2,
    color: 'var(--color-accent)',
    desc: 'Web apps, Android, Automation & Dashboards',
  },
  {
    label: 'Solutions',
    tagline: 'Business Transformations',
    view: 'solutions',
    icon: Layers,
    color: 'var(--color-accent)',
    desc: 'Before & After operational upgrades',
  },
  {
    label: 'Process',
    tagline: '4-Step & 6-Phase Engineering',
    view: 'process',
    icon: CheckCircle2,
    color: 'var(--color-accent)',
    desc: 'Transparent milestones & Try-Before-Commit',
  },
  {
    label: 'Work',
    tagline: 'Featured Projects & Demos',
    view: 'work',
    icon: Briefcase,
    color: 'var(--color-accent)',
    desc: 'Interactive showcase & tech stack',
  },
]

export default function Navbar({ currentView, onNavigate }) {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [onInk, setOnInk] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null) // 'about' | 'explorer' | null
  const dropdownTimeoutRef = useRef(null)
  const [hoveredItem, setHoveredItem] = useState(null)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('livora-theme') || 'light'
    }
    return 'light'
  })

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('livora-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  // Scroll progress
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    let lastY = window.scrollY
    let frame = 0
    const update = () => {
      frame = 0
      const y = window.scrollY
      setScrolled(y > 30)
      // Slide away while reading down the page, come back on the way up
      setHidden(y > 400 && y > lastY)
      lastY = y
      // With no bar behind it, the nav takes its colours from the section underneath
      const under = document
        .elementsFromPoint(window.innerWidth / 2, 44)
        .find((el) => !el.closest('.navbar-wrapper'))
      setOnInk(!!under?.closest('.ink, .footer'))
    }
    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(frame)
    }
  }, [currentView])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleMouseEnterDropdown = (menuKey) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
    setActiveDropdown(menuKey)
  }

  const handleMouseLeaveDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 220)
  }

  const handleItemClick = (viewKey) => {
    setActiveDropdown(null)
    setMobileOpen(false)
    onNavigate(viewKey)
  }

  const isAboutActive = ['about-overview', 'overview', 'purpose', 'motivation', 'mission-vision', 'philosophy', 'quality', 'what-we-build', 'team', 'contact'].includes(currentView)
  const isExplorerActive = ['services', 'solutions', 'process', 'work'].includes(currentView)

  return (
    <>
      {/* Scroll Progress Indicator */}
      <motion.div className="scroll-progress" style={{ scaleX }} />

      <motion.header
        className={`navbar-wrapper ${onInk ? 'on-ink' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden && !activeDropdown && !mobileOpen ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="navbar-container">
          <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            {/* Ambient Top Edge Glow */}
            <div className="navbar__glow-line" />

            <div className="navbar__inner">
              {/* Logo */}
              <a
                href="#home"
                className="navbar__logo"
                onClick={e => {
                  e.preventDefault()
                  handleItemClick('home')
                }}
              >
                <motion.span
                  className="navbar__logo-mark"
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  L
                </motion.span>
                <div className="navbar__logo-text-group">
                  <span className="navbar__logo-title">LIVORA</span>
                  <span className="navbar__logo-status" title="Studio Online">
                    <span className="navbar__status-pulse" />
                    <span className="navbar__status-text">Studio</span>
                  </span>
                </div>
              </a>

              {/* Main Navigation Links: About Us & Explorer */}
              <div className="navbar__links">
                {/* 1. About Us Dropdown Trigger */}
                <div
                  className="navbar__dropdown-trigger"
                  onMouseEnter={() => handleMouseEnterDropdown('about')}
                  onMouseLeave={handleMouseLeaveDropdown}
                >
                  <button
                    type="button"
                    className={`navbar__link ${isAboutActive ? 'navbar__link--active' : ''}`}
                    onClick={() => handleItemClick('home')}
                  >
                    <span>About Us</span>
                    <ChevronDown
                      size={13}
                      className={`navbar__dropdown-caret ${activeDropdown === 'about' ? 'navbar__dropdown-caret--open' : ''}`}
                    />
                  </button>
                </div>

                {/* 2. Explorer Dropdown Trigger */}
                <div
                  className="navbar__dropdown-trigger"
                  onMouseEnter={() => handleMouseEnterDropdown('explorer')}
                  onMouseLeave={handleMouseLeaveDropdown}
                >
                  <button
                    type="button"
                    className={`navbar__link ${isExplorerActive ? 'navbar__link--active' : ''}`}
                    onClick={() => handleItemClick('services')}
                  >
                    <span>Explorer</span>
                    <ChevronDown
                      size={13}
                      className={`navbar__dropdown-caret ${activeDropdown === 'explorer' ? 'navbar__dropdown-caret--open' : ''}`}
                    />
                  </button>
                </div>
              </div>

              {/* Call To Action Button: Let's Talk */}
              <button
                type="button"
                className="navbar__cta btn btn-primary"
                onClick={() => handleItemClick('contact')}
              >
                <span className="navbar__cta-shimmer" />
                <span>Let's Talk</span>
                <ArrowRight size={15} className="btn-arrow" />
              </button>

              {/* Mobile Hamburger Button */}
              <button
                className="navbar__hamburger"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </nav>

          {/* Liquid Glassmorphism Dropdown Panel Below Navbar */}
          <AnimatePresence>
            {activeDropdown && (
              <motion.div
                className="navbar__clean-dropdown"
                initial={{ opacity: 0, y: -12, clipPath: 'inset(0% 0% 100% 0% round 24px)' }}
                animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0% round 24px)' }}
                exit={{ opacity: 0, y: -8, clipPath: 'inset(0% 0% 100% 0% round 24px)' }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => handleMouseEnterDropdown(activeDropdown)}
                onMouseLeave={handleMouseLeaveDropdown}
              >
                <div className="mega" key={activeDropdown}>
                  {/* Feature panel */}
                  <motion.aside
                    className="mega__feature"
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="mega__feature-orb mega__feature-orb--1" />
                    <div className="mega__feature-orb mega__feature-orb--2" />
                    <div className="mega__feature-grid" />
                    <span className="mega__kicker">
                      <Sparkles size={12} />
                      {activeDropdown === 'about' ? 'Digital Solutions Studio' : 'Engineering & Process'}
                    </span>
                    <h3 className="mega__feature-title">
                      {activeDropdown === 'about' ? (
                        <>Software built <em>around you.</em></>
                      ) : (
                        <>From idea to <em>implementation.</em></>
                      )}
                    </h3>
                    <p className="mega__feature-text">
                      {activeDropdown === 'about'
                        ? 'A developer-led studio from Bangalore, India, turning real business problems into reliable technology.'
                        : 'Explore what we build, how we build it, and the work we have shipped so far.'}
                    </p>
                    <button
                      type="button"
                      className="mega__feature-cta"
                      onClick={() => handleItemClick(activeDropdown === 'about' ? 'about-overview' : 'work')}
                    >
                      {activeDropdown === 'about' ? 'Read our story' : 'See our work'}
                      <ArrowRight size={14} />
                    </button>
                  </motion.aside>

                  {/* Links */}
                  <div
                    className={`mega__grid ${activeDropdown === 'about' ? 'mega__grid--about' : 'mega__grid--explorer'}`}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {(activeDropdown === 'about' ? aboutUsItems : explorerItems).map((item, i) => {
                      const Icon = item.icon
                      const isSelected = currentView === item.view
                      return (
                        <motion.button
                          key={item.label}
                          type="button"
                          className={`mega__item ${isSelected ? 'mega__item--active' : ''}`}
                          style={{ '--item-color': item.color }}
                          onClick={() => handleItemClick(item.view)}
                          onMouseEnter={() => setHoveredItem(item.label)}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: 0.04 + i * 0.03, ease: [0.16, 1, 0.3, 1] }}
                        >
                          {hoveredItem === item.label && (
                            <motion.span
                              layoutId="mega-hover"
                              className="mega__hover-bg"
                              transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                            />
                          )}
                          <span className="mega__icon"><Icon size={18} /></span>
                          <span className="mega__text">
                            <strong>{item.label}</strong>
                            <small>{item.desc}</small>
                          </span>
                          <ArrowUpRight size={15} className="mega__go" />
                        </motion.button>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Theme Toggle Orb */}
        <motion.button
          className="navbar-theme-btn"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title={`${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
        >
          <div className="navbar-theme-btn__glow" />
          <motion.div
            key={theme}
            initial={{ rotate: -120, opacity: 0, scale: 0.4 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 120, opacity: 0, scale: 0.4 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </motion.div>
        </motion.button>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar__mobile-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="navbar__mobile-links">
              {/* About Us Mobile Group */}
              <div className="navbar__mobile-group">
                <span className="navbar__mobile-group-title">✦ About Us</span>
                <div className="navbar__mobile-sublinks">
                  {aboutUsItems.map(item => (
                    <button
                      key={item.label}
                      type="button"
                      className={`navbar__mobile-sublink ${currentView === item.view ? 'navbar__mobile-sublink--active' : ''}`}
                      onClick={() => handleItemClick(item.view)}
                    >
                      <span>• {item.label}</span>
                      <span className="navbar__mobile-tagline">{item.tagline}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Explorer Mobile Group */}
              <div className="navbar__mobile-group">
                <span className="navbar__mobile-group-title">✦ Explorer</span>
                <div className="navbar__mobile-sublinks">
                  {explorerItems.map(item => (
                    <button
                      key={item.label}
                      type="button"
                      className={`navbar__mobile-sublink ${currentView === item.view ? 'navbar__mobile-sublink--active' : ''}`}
                      onClick={() => handleItemClick(item.view)}
                    >
                      <span>• {item.label}</span>
                      <span className="navbar__mobile-tagline">{item.tagline}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary btn-lg navbar__mobile-cta"
                onClick={() => handleItemClick('contact')}
              >
                Let's Talk <ArrowRight size={18} className="btn-arrow" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
