'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, Buildings, Heart } from '@phosphor-icons/react'
import AnimatedSection from './ui/AnimatedSection'

const pillars = [
  {
    Icon: GraduationCap,
    title: 'Education',
    body: 'Supporting scholarships, mentorship programs, and educational access that open doors for the next generation — in every community we call home.',
  },
  {
    Icon: Buildings,
    title: 'Community Development',
    body: 'Investing in the organizations, infrastructure, and initiatives that strengthen the social fabric of the cities and towns where we operate.',
  },
  {
    Icon: Heart,
    title: 'Local Impact',
    body: 'Partnering with local charities, food programs, and grassroots causes to ensure our success translates into tangible, lasting benefit for real people.',
  },
]

export default function Foundation() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="foundation" className="py-24 md:py-36 bg-cream">
      <div className="max-w-8xl mx-auto px-8 md:px-12">

        {/* Header — centered */}
        <div ref={ref} className="flex flex-col items-center text-center mb-16 md:mb-20 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-px bg-bronze" />
            <span className="text-xs tracking-[0.3em] uppercase text-taupe">Philanthropy</span>
            <div className="w-8 h-px bg-bronze" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-charcoal tracking-tight max-w-[22ch]"
          >
            The Waraich{' '}
            <span className="italic text-bronze">Family</span>{' '}
            Foundation
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.18 }}
            className="text-base text-warm-slate leading-relaxed max-w-[52ch]"
          >
            For us, success is measured not only in portfolio returns, but in the strength
            of the communities we help build. The Waraich Family Foundation is our commitment
            to giving back — with intention, consistency, and care.
          </motion.p>

          {/* Bronze decorative rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.28 }}
            className="w-12 h-px bg-bronze origin-left"
          />
        </div>

        {/* Pillars — gallery-style, no card borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {pillars.map((pillar, i) => (
            <AnimatedSection key={pillar.title} delay={i * 0.1} className="flex flex-col items-center text-center gap-5">
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center border border-bronze/30">
                <pillar.Icon size={22} className="text-bronze" weight="light" />
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl text-charcoal tracking-tight">{pillar.title}</h3>

              {/* Thin rule */}
              <div className="w-8 h-px bg-taupe/30" />

              {/* Body */}
              <p className="text-sm text-warm-slate leading-relaxed max-w-[32ch]">{pillar.body}</p>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  )
}
