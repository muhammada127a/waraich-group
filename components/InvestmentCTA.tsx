'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from '@phosphor-icons/react'
import MagneticButton from './ui/MagneticButton'

export default function InvestmentCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 md:py-36 bg-charcoal text-cream text-center">
      <div className="max-w-8xl mx-auto px-8 md:px-12">
        <div ref={ref} className="flex flex-col items-center gap-7">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-px bg-bronze" />
            <span className="text-xs tracking-[0.35em] uppercase text-bronze">
              Investment Opportunities
            </span>
            <div className="w-8 h-px bg-bronze" />
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl text-cream tracking-tight max-w-[20ch] leading-[1.08]"
          >
            Have an{' '}
            <span className="italic text-bronze">Investment</span>{' '}
            Opportunity?
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.18 }}
            className="text-base text-cream/55 leading-relaxed max-w-[46ch]"
          >
            We are not raising capital or seeking investors — we are looking for deals.
            If you have a property, business, or development site you'd like to bring to us,
            we'd love to hear from you. We move quickly and close with confidence.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.26 }}
          >
            <MagneticButton>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 bg-bronze text-cream px-10 py-4 text-sm tracking-wide hover:bg-bronze-light transition-colors duration-300 active:scale-[0.97] group"
              >
                Get in Touch
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-1 transition-transform duration-300 will-change-transform"
                />
              </a>
            </MagneticButton>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
