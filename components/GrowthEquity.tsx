'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from '@phosphor-icons/react'

const useCases = [
  { label: 'Grow your business', description: 'Capital to scale operations, open a new location, or fund an expansion.' },
  { label: 'Inventory financing', description: 'Short or medium-term capital to purchase inventory and keep momentum.' },
  { label: 'Raise capital for a deal', description: 'Bring us a deal you\'re working on and let\'s structure something together.' },
  { label: 'Find a partner', description: 'Looking for an experienced operator-investor to co-invest alongside you.' },
]

export default function GrowthEquity() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', business: '', amount: '', details: '', email: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="py-24 md:py-32 bg-parchment" id="growth-equity">
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
              <span className="text-xs tracking-[0.3em] uppercase text-taupe">Growth Capital</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl text-charcoal tracking-tight leading-tight"
            >
              Growth{' '}
              <span className="italic text-bronze">Equity</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.18 }}
            className="text-base text-warm-slate leading-relaxed max-w-[60ch] self-end"
          >
            Beyond real estate, we partner with businesses that need capital to grow.
            Whether you're funding inventory, opening a new location, or structuring a deal —
            we're interested in hearing from operators with strong fundamentals and a clear plan.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">

          {/* Left — use cases */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.12 }}
            className="flex flex-col gap-6"
          >
            {useCases.map((uc, i) => (
              <motion.div
                key={uc.label}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.16 + i * 0.07 }}
                className="flex gap-5 group"
              >
                <div className="flex-shrink-0 w-px bg-bronze/30 group-hover:bg-bronze transition-colors duration-300 mt-1" />
                <div>
                  <h3 className="font-serif text-lg text-charcoal mb-1">{uc.label}</h3>
                  <p className="text-sm text-warm-slate leading-relaxed">{uc.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right — submission form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
          >
            {submitted ? (
              <div className="flex flex-col items-start gap-4 py-10">
                <div className="w-8 h-px bg-bronze" />
                <h3 className="font-serif text-2xl text-charcoal">We'll be in touch.</h3>
                <p className="text-sm text-warm-slate leading-relaxed max-w-[40ch]">
                  Thank you for reaching out. We review every submission and will contact you
                  if there's a potential fit.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <p className="text-xs tracking-[0.2em] uppercase text-taupe mb-1">Submit an Opportunity</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] tracking-[0.15em] uppercase text-taupe">Your Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Full name"
                      className="bg-cream border border-taupe/30 px-4 py-3 text-sm text-charcoal placeholder:text-taupe/50 focus:outline-none focus:border-bronze transition-colors duration-200"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] tracking-[0.15em] uppercase text-taupe">Email</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@company.com"
                      className="bg-cream border border-taupe/30 px-4 py-3 text-sm text-charcoal placeholder:text-taupe/50 focus:outline-none focus:border-bronze transition-colors duration-200"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] tracking-[0.15em] uppercase text-taupe">Business / Opportunity Name</label>
                  <input
                    name="business"
                    value={form.business}
                    onChange={handleChange}
                    required
                    placeholder="Company or deal name"
                    className="bg-cream border border-taupe/30 px-4 py-3 text-sm text-charcoal placeholder:text-taupe/50 focus:outline-none focus:border-bronze transition-colors duration-200"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] tracking-[0.15em] uppercase text-taupe">Capital Required</label>
                  <select
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    required
                    className="bg-cream border border-taupe/30 px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-bronze transition-colors duration-200 appearance-none"
                  >
                    <option value="" disabled>Select a range</option>
                    <option>Under $250K</option>
                    <option>$250K – $1M</option>
                    <option>$1M – $5M</option>
                    <option>$5M – $20M</option>
                    <option>$20M+</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] tracking-[0.15em] uppercase text-taupe">Brief Overview</label>
                  <textarea
                    name="details"
                    value={form.details}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Describe the opportunity, use of funds, and timeline..."
                    className="bg-cream border border-taupe/30 px-4 py-3 text-sm text-charcoal placeholder:text-taupe/50 focus:outline-none focus:border-bronze transition-colors duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2.5 bg-bronze text-cream px-8 py-3.5 text-sm tracking-wide hover:bg-bronze-dark transition-colors duration-300 active:scale-[0.97] group self-start"
                >
                  Submit Opportunity
                  <ArrowRight
                    size={15}
                    className="group-hover:translate-x-1 transition-transform duration-300 will-change-transform"
                  />
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
