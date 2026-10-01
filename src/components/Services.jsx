import React from 'react'
import { motion } from 'framer-motion'
import {
  Globe,
  Smartphone,
  Building2,
  Megaphone,
  Share2,
  FileText,
  Palette,
  GraduationCap,
  ArrowUpRight,
} from 'lucide-react'
import { useInView, fadeInUp, staggerContainer } from '../hooks/useAnimations'
import './Services.css'

const services = [
  {
    num: '01',
    title: 'Web Applications',
    desc: 'Custom, high-speed web applications designed around your exact business processes, customers, and team.',
    icon: Globe,
    tag: 'Full-Stack Web',
  },
  {
    num: '02',
    title: 'Android Applications',
    desc: 'Native and cross-platform Android applications designed for seamless customer and operational workflows.',
    icon: Smartphone,
    tag: 'Mobile Apps',
  },
  {
    num: '03',
    title: 'Internal Business Applications',
    desc: 'Replace spreadsheets, manual entries, and scattered records with a unified, purpose-built control system.',
    icon: Building2,
    tag: 'Enterprise Workflow',
    replaces: ['Excel Files', 'WhatsApp Chats', 'Paper Logs'],
  },
  {
    num: '04',
    title: 'Digital Marketing',
    desc: 'Data-backed digital growth strategies to help your brand reach the right audience and drive conversions.',
    icon: Megaphone,
    tag: 'Growth & Ads',
  },
  {
    num: '05',
    title: 'Social Media Marketing',
    desc: 'High-engagement content pipelines, creative campaigns, and social strategies built for brand authority.',
    icon: Share2,
    tag: 'Content & Social',
  },
  {
    num: '06',
    title: 'ATS Resume Solutions',
    desc: 'Professional ATS-optimized resumes engineered for maximum keyword match and recruiter readability.',
    icon: FileText,
    tag: 'Career Tools',
  },
  {
    num: '07',
    title: 'Stationery & Brand Design',
    desc: 'Premium identity kits, corporate visiting cards, letterheads, brochures, and brand presentation assets.',
    icon: Palette,
    tag: 'Visual Identity',
  },
  {
    num: '08',
    title: 'Academic & Student Solutions',
    desc: 'End-to-end technical project engineering, full-stack websites, Android apps, documentation, and viva support.',
    icon: GraduationCap,
    tag: 'Projects & Guidance',
  },
]

const rowIn = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Services() {
  const [ref, inView] = useInView({ threshold: 0.08 })

  const goToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="services" className="section services" ref={ref}>
      <div className="container">
        <motion.div
          className="services__header"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div>
            <motion.div className="section-badge" variants={fadeInUp}>What We Do</motion.div>
            <motion.h2 className="section-title" variants={fadeInUp}>
              Everything you need to <em>go digital.</em>
            </motion.h2>
          </div>
          <motion.p className="section-subtitle" variants={fadeInUp}>
            From custom software to digital marketing and creative design, LIVORA builds solutions
            that help businesses work smarter and present themselves better.
          </motion.p>
        </motion.div>

        <motion.ul
          className="services__list"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.li key={service.num} className="svc" variants={rowIn} onClick={goToContact}>
                <span className="svc__num">{service.num}</span>

                <div className="svc__head">
                  <span className="svc__icon"><Icon size={22} /></span>
                  <h3 className="svc__title">{service.title}</h3>
                </div>

                <div className="svc__body">
                  <p className="svc__desc">{service.desc}</p>
                  {service.replaces && (
                    <div className="svc__replaces">
                      {service.replaces.map((item) => (
                        <s key={item}>{item}</s>
                      ))}
                      <span>→ One integrated LIVORA system</span>
                    </div>
                  )}
                </div>

                <span className="svc__tag">{service.tag}</span>

                <span className="svc__arrow" aria-hidden="true">
                  <ArrowUpRight size={20} />
                </span>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
