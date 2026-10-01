import React, { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import PageSkeleton from './components/PageSkeleton'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustStrip from './components/TrustStrip'
import Orbit from './components/Orbit'
import ConnectedSystems from './components/ConnectedSystems'
import Automation from './components/Automation'
import Industries from './components/Industries'
import Services from './components/Services'
import BusinessSolutions from './components/BusinessSolutions'
import BeforeAfter from './components/BeforeAfter'
import WhyLivora from './components/WhyLivora'
import Process from './components/Process'
import TryBeforeCommit from './components/TryBeforeCommit'
import Portfolio from './components/Portfolio'
import Technology from './components/Technology'
import About from './components/About'
import Team from './components/Team'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import SubPageLayout from './components/SubPageLayout'
import PurposeView from './components/PurposeView'
import MotivationView from './components/MotivationView'
import MissionVisionView from './components/MissionVisionView'
import PhilosophyView from './components/PhilosophyView'
import QualityView from './components/QualityView'
import AboutPage from './components/AboutPage'
import WhatsAppButton from './components/WhatsAppButton'
import CustomCursor from './components/CustomCursor'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname
      if (path.includes('/about-overview') || path.includes('/overview')) return 'about-overview'
      if (path.includes('/purpose')) return 'purpose'
      if (path.includes('/motivation') || path.includes('/motive')) return 'motivation'
      if (path.includes('/mission-vision') || path.includes('/mission')) return 'mission-vision'
      if (path.includes('/philosophy')) return 'philosophy'
      if (path.includes('/quality')) return 'quality'
      if (path.includes('/what-we-build')) return 'what-we-build'
      if (path.includes('/team') || path.includes('/people')) return 'team'
      if (path.includes('/contact')) return 'contact'
      if (path.includes('/services')) return 'services'
      if (path.includes('/solutions')) return 'solutions'
      if (path.includes('/process')) return 'process'
      if (path.includes('/work')) return 'work'
    }
    return 'home'
  })

  useEffect(() => {
    // Initial sleek skeleton reveal
    const timer = setTimeout(() => {
      setLoading(false)
    }, 750)
    return () => clearTimeout(timer)
  }, [])

  // Listen to browser forward/back buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
      if (path === '/' || path === '') {
        setCurrentView('home')
      } else if (path.includes('/about-overview') || path.includes('/overview')) {
        setCurrentView('about-overview')
      } else if (path.includes('/purpose')) {
        setCurrentView('purpose')
      } else if (path.includes('/motivation') || path.includes('/motive')) {
        setCurrentView('motivation')
      } else if (path.includes('/mission-vision') || path.includes('/mission')) {
        setCurrentView('mission-vision')
      } else if (path.includes('/philosophy')) {
        setCurrentView('philosophy')
      } else if (path.includes('/quality')) {
        setCurrentView('quality')
      } else if (path.includes('/what-we-build')) {
        setCurrentView('what-we-build')
      } else if (path.includes('/team') || path.includes('/people')) {
        setCurrentView('team')
      } else if (path.includes('/contact')) {
        setCurrentView('contact')
      } else if (path.includes('/services')) {
        setCurrentView('services')
      } else if (path.includes('/solutions')) {
        setCurrentView('solutions')
      } else if (path.includes('/process')) {
        setCurrentView('process')
      } else if (path.includes('/work')) {
        setCurrentView('work')
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const handleNavigate = (viewKey) => {
    setCurrentView(viewKey)
    const urlMap = {
      'home': '/',
      'about-overview': '/about/overview',
      'overview': '/about/overview',
      'about': '/about/overview',
      'purpose': '/about/purpose',
      'motivation': '/about/motivation',
      'mission-vision': '/about/mission-vision',
      'philosophy': '/about/philosophy',
      'quality': '/about/quality',
      'what-we-build': '/about/what-we-build',
      'team': '/about/team',
      'contact': '/contact',
      'services': '/explorer/services',
      'solutions': '/explorer/solutions',
      'process': '/explorer/process',
      'work': '/explorer/work',
    }
    const path = urlMap[viewKey] || `/${viewKey}`
    window.history.pushState({}, '', path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <CustomCursor />
      
      {/* Theme-Aware Page Skeleton */}
      <AnimatePresence>
        {loading && <PageSkeleton />}
      </AnimatePresence>

      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      {/* --- Multi-Page View Routing --- */}
      {currentView === 'home' && (
        <main>
          <Hero />
          <TrustStrip />
          <Orbit />
          <Services />
          <ConnectedSystems />
          <Industries />
          <Automation />
          <WhyLivora />
          <Process />
          <TryBeforeCommit />
          <Portfolio />
          <Technology />
          <About onNavigateFullStory={() => handleNavigate('purpose')} />
          <Team />
          <Testimonials />
          <FAQ />
          <Contact />
        </main>
      )}

      {/* 0. Full About Overview Page */}
      {(currentView === 'about-overview' || currentView === 'overview') && (
        <AboutPage
          onNavigateHome={() => handleNavigate('home')}
          onNavigateContact={() => handleNavigate('contact')}
          onNavigateServices={() => handleNavigate('services')}
        />
      )}

      {/* 1. Our Purpose */}
      {currentView === 'purpose' && (
        <SubPageLayout
          badge="The LIVORA Purpose"
          title="Why LIVORA Exists"
          titleAccent="& Our Purpose"
          subtitle="Technology should solve problems — not create new ones. We build custom digital solutions around how people actually work."
          breadcrumbParent="About Us"
          breadcrumbCurrent="Our Purpose"
          onNavigateHome={() => handleNavigate('home')}
          onNavigateContact={() => handleNavigate('contact')}
        >
          <PurposeView />
        </SubPageLayout>
      )}

      {/* 2. Our Motivation */}
      {currentView === 'motivation' && (
        <SubPageLayout
          badge="What Drives Us"
          title="Our Motivation"
          titleAccent="& Driving Catalysts"
          subtitle="Driven by the urge to eliminate manual chaos, spreadsheet fragmentation, and rigid software."
          breadcrumbParent="About Us"
          breadcrumbCurrent="Our Motivation"
          onNavigateHome={() => handleNavigate('home')}
          onNavigateContact={() => handleNavigate('contact')}
        >
          <MotivationView />
        </SubPageLayout>
      )}

      {/* 3. Our Mission & Vision */}
      {currentView === 'mission-vision' && (
        <SubPageLayout
          badge="Mission, Vision & Strategic Principles"
          title="Our Mission"
          titleAccent="& Strategic Directives"
          subtitle="To build reliable, user-focused digital solutions that help businesses work smarter and grow in a modern digital world."
          breadcrumbParent="About Us"
          breadcrumbCurrent="Mission & Vision"
          onNavigateHome={() => handleNavigate('home')}
          onNavigateContact={() => handleNavigate('contact')}
        >
          <MissionVisionView />
        </SubPageLayout>
      )}

      {/* 4. Our Philosophy */}
      {currentView === 'philosophy' && (
        <SubPageLayout
          badge="Core Architectural Philosophy"
          title="Technology Should"
          titleAccent="Adapt To You"
          subtitle="We study your workflow first, then build custom software around it — never forcing your team into rigid templates."
          breadcrumbParent="About Us"
          breadcrumbCurrent="Our Philosophy"
          onNavigateHome={() => handleNavigate('home')}
          onNavigateContact={() => handleNavigate('contact')}
        >
          <PhilosophyView />
        </SubPageLayout>
      )}

      {/* 5. Commitment to Quality */}
      {currentView === 'quality' && (
        <SubPageLayout
          badge="Engineering Rigor & Guarantees"
          title="Commitment to"
          titleAccent="Uncompromising Quality"
          subtitle="Zero technical debt, sub-second performance, cross-device testing, and the Try-Before-Commit guarantee."
          breadcrumbParent="About Us"
          breadcrumbCurrent="Quality Commitment"
          onNavigateHome={() => handleNavigate('home')}
          onNavigateContact={() => handleNavigate('contact')}
        >
          <QualityView />
        </SubPageLayout>
      )}

      {/* 6. What We Build */}
      {currentView === 'what-we-build' && (
        <SubPageLayout
          badge="Solutions Portfolio"
          title="From Ideas to"
          titleAccent="Digital Solutions"
          subtitle="Our work spans web applications, Android systems, internal business automation, custom dashboards, and digital branding."
          breadcrumbParent="About Us"
          breadcrumbCurrent="What We Build"
          onNavigateHome={() => handleNavigate('home')}
          onNavigateContact={() => handleNavigate('contact')}
        >
          <Services />
          <BusinessSolutions />
        </SubPageLayout>
      )}

      {/* 7. Our People */}
      {currentView === 'team' && (
        <SubPageLayout
          badge="Leadership & Engineering"
          title="The People"
          titleAccent="Behind LIVORA"
          subtitle="A focused team of co-founders and full-stack software engineers dedicated to turning real problems into reliable technology."
          breadcrumbParent="About Us"
          breadcrumbCurrent="Our People"
          onNavigateHome={() => handleNavigate('home')}
          onNavigateContact={() => handleNavigate('contact')}
        >
          <Team />
        </SubPageLayout>
      )}

      {/* 8. Contact */}
      {currentView === 'contact' && (
        <SubPageLayout
          badge="Direct Developer Access"
          title="Let's Build Something"
          titleAccent="Extraordinary"
          subtitle="Have an idea, an operational bottleneck, or a project to launch? Connect directly with the developers."
          breadcrumbParent="About Us"
          breadcrumbCurrent="Contact"
          onNavigateHome={() => handleNavigate('home')}
          onNavigateContact={() => handleNavigate('contact')}
        >
          <Contact />
          <FAQ />
        </SubPageLayout>
      )}

      {/* Explorer Pages */}
      {currentView === 'services' && (
        <SubPageLayout
          badge="Engineering Capabilities"
          title="Our Services"
          titleAccent="& Software Solutions"
          subtitle="End-to-end custom digital engineering built with speed, modern architecture, and precision design."
          breadcrumbParent="Explorer"
          breadcrumbCurrent="Services"
          onNavigateHome={() => handleNavigate('home')}
          onNavigateContact={() => handleNavigate('contact')}
        >
          <Services />
          <Technology />
        </SubPageLayout>
      )}

      {currentView === 'solutions' && (
        <SubPageLayout
          badge="Workflow Upgrades"
          title="Business Solutions"
          titleAccent="& Transformations"
          subtitle="See how manual spreadsheets, repetitive tasks, and fragmented tools transform into seamless automated systems."
          breadcrumbParent="Explorer"
          breadcrumbCurrent="Solutions"
          onNavigateHome={() => handleNavigate('home')}
          onNavigateContact={() => handleNavigate('contact')}
        >
          <BusinessSolutions />
          <BeforeAfter />
        </SubPageLayout>
      )}

      {currentView === 'process' && (
        <SubPageLayout
          badge="Methodology & Milestones"
          title="4-Step Thinking"
          titleAccent="& 6-Phase Engineering"
          subtitle="From requirement discovery to milestone demo, risk-free validation, and production deployment."
          breadcrumbParent="Explorer"
          breadcrumbCurrent="Process"
          onNavigateHome={() => handleNavigate('home')}
          onNavigateContact={() => handleNavigate('contact')}
        >
          <Process />
          <TryBeforeCommit />
        </SubPageLayout>
      )}

      {currentView === 'work' && (
        <SubPageLayout
          badge="Portfolio & Proof"
          title="Featured Projects"
          titleAccent="& Live Demos"
          subtitle="Explore the digital systems, web applications, and internal tools we've engineered."
          breadcrumbParent="Explorer"
          breadcrumbCurrent="Work"
          onNavigateHome={() => handleNavigate('home')}
          onNavigateContact={() => handleNavigate('contact')}
        >
          <Portfolio />
          <Technology />
          <Testimonials />
        </SubPageLayout>
      )}

      <Footer />
      <WhatsAppButton />
    </>
  )
}
