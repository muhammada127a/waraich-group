'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from '@phosphor-icons/react'
import MagneticButton from './ui/MagneticButton'

const stats = [
  { value: '$250M+', label: 'Portfolio Value' },
  { value: '25+', label: 'Assets' },
  { value: '15', label: 'Cities' },
  { value: '23+', label: 'Years Investing' },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
}

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-cream">

      {/* ── Video with inward vignette mask ──
          mask-image makes the video itself transparent at all four edges,
          revealing the cream background behind it — no covering divs needed. */}
      <div
        className="absolute inset-0 z-0"
        style={{
          maskImage:
            'radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 100%)',
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          src="/interior_design.mp4"
        />
      </div>

      {/* ── Subtle dark scrim over centre only — keeps text legible ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(30,27,23,0.45) 0%, transparent 100%)',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-20 max-w-8xl mx-auto px-8 md:px-12 w-full pt-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center gap-8 py-28 md:py-36"
        >
          {/* Eyebrow */}
          <motion.div variants={item} className="flex items-center gap-3">
            <div className="w-8 h-px bg-bronze" />
            <span className="text-xs tracking-[0.35em] uppercase text-cream font-medium drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
              Est. 2008 — North America
            </span>
            <div className="w-8 h-px bg-bronze" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="font-serif text-[2.6rem] md:text-[4rem] lg:text-[5rem] leading-[1.05] tracking-tight text-cream max-w-[18ch] drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
          >
            Building Legacy Through{' '}
            <span className="italic text-bronze">Strategic</span>{' '}
            Real Estate Investment.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={item}
            className="text-base md:text-lg text-cream/80 leading-relaxed max-w-[48ch] drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]"
          >
            A family-owned firm managing a $250M+ portfolio across North America.
            We acquire, transform, and steward assets that generate lasting value.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex items-center gap-4 flex-wrap justify-center">
            <MagneticButton>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2.5 bg-bronze text-cream px-8 py-3.5 text-sm tracking-wide hover:bg-bronze-dark transition-colors duration-300 active:scale-[0.97] group"
              >
                View Portfolio
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-1 transition-transform duration-300 will-change-transform"
                />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 border border-cream/60 text-cream px-8 py-3.5 text-sm tracking-wide hover:border-bronze hover:text-bronze transition-all duration-300 active:scale-[0.97] backdrop-blur-sm bg-charcoal/10"
              >
                Book a Call
              </a>
            </MagneticButton>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={item}
            className="grid grid-cols-2 sm:grid-cols-4 mt-8 pt-8 border-t border-cream/20 w-full max-w-2xl"
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center gap-1 py-2 ${
                  i > 0 ? 'sm:border-l sm:border-cream/20' : ''
                } ${i > 1 ? 'mt-4 sm:mt-0' : ''}`}
              >
                <span className="font-serif text-2xl md:text-3xl text-cream tracking-tight drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
                  {stat.value}
                </span>
                <span className="text-[10px] text-cream/55 tracking-widest uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
