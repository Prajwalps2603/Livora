import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import './ProblemSolution.css'

const problems = ['Spreadsheet chaos', 'Manual billing', 'Scattered records', 'Endless follow-ups', 'Paper registers']

export default function ProblemSolution({ inView = true }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % problems.length), 2600)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      className="ps"
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="ps__label">Have a problem?</span>

      <span className="ps__problem-window">
        <AnimatePresence mode="wait">
          <motion.span
            key={problems[index]}
            className="ps__problem"
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {problems[index]}
            <motion.i
              className="ps__strike"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.9, ease: [0.65, 0, 0.35, 1] }}
            />
          </motion.span>
        </AnimatePresence>
      </span>

      <span className="ps__arrow" aria-hidden="true">
        <span className="ps__arrow-track" />
        <ArrowRight size={14} />
      </span>

      <span className="ps__solution">
        <Sparkles size={14} className="ps__sparkle" />
        Let's build the solution.
      </span>
    </motion.div>
  )
}
