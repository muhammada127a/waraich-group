'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from '@phosphor-icons/react'
import MagneticButton from './ui/MagneticButton'

const services = [
  {
    title: 'New Construction',
    description: 'Ground-up development of hospitality, retail, and mixed-use assets across Canada and the United States.',
  },
  {
    title: 'Renovation & Repositioning',
    description: 'Full-scope renovations that modernize aging assets, meet brand standards, and unlock property value.',
  },
  {
    title: 'Project Management',
    description: 'End-to-end oversight of design, permitting, contractor coordination, and delivery — on time and on budget.',
  },
]

export default function WaraichDevelopment() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 md:py-32 bg-cream">
      <div className="max-w-8xl mx-auto px-8 md:px-12" ref={ref}>

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="w-8 h-px bg-bronze" />
              <span className="text-xs tracking-[0.3em] uppercase text-taupe">Affiliated Company</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl text-charcoal tracking-tight leading-tight"
            >
              Waraich{' '}
              <span className="italic text-bronze">Development</span>{' '}
              Group
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.18 }}
            className="text-base text-warm-slate leading-relaxed max-w-[60ch] self-end"
          >
            Waraich Development Group is the construction and renovation arm of the Waraich family of companies.
            From ground-up builds to full property repositions, we manage every phase of the development
            lifecycle — keeping quality, cost, and timeline under one roof.
          </motion.p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-taupe/15">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 + i * 0.08 }}
              className="bg-cream p-8 md:p-10 flex flex-col gap-4 group"
            >
              <div className="w-8 h-px bg-bronze/50 group-hover:w-14 transition-all duration-500" />
              <h3 className="font-serif text-xl text-charcoal tracking-tight">{service.title}</h3>
              <p className="text-sm text-warm-slate leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.38 }}
          className="mt-12 flex items-center gap-6 flex-wrap"
        >
          <MagneticButton>
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 bg-charcoal text-cream px-8 py-3.5 text-sm tracking-wide hover:bg-bronze transition-colors duration-300 active:scale-[0.97] group"
            >
              Discuss a Project
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform duration-300 will-change-transform"
              />
            </a>
          </MagneticButton>
          <span className="text-xs tracking-[0.2em] uppercase text-taupe/70">
            New builds · Renovations · Repositioning
          </span>
        </motion.div>

      </div>
    </section>
  )
}
