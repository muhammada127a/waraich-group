'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { EnvelopeSimple, Phone, LinkedinLogo, ArrowRight } from '@phosphor-icons/react'
import MagneticButton from './ui/MagneticButton'

const contactDetails = [
  {
    icon: EnvelopeSimple,
    label: 'Email',
    value: 'info@waraichgroup.com',
    href: 'mailto:info@waraichgroup.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 647-333-2204',
    href: 'tel:+16473332204',
  },
  {
    icon: LinkedinLogo,
    label: 'LinkedIn',
    value: 'waraichgroup',
    href: 'https://www.linkedin.com/company/waraichgroup/',
  },
]

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, connect to a form backend
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-charcoal text-cream">
      <div className="max-w-8xl mx-auto px-8 md:px-12">

        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24"
        >

          {/* Left — Info */}
          <div className="flex flex-col gap-10">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                className="flex items-center gap-3 mb-5"
              >
                <div className="w-8 h-px bg-bronze" />
                <span className="text-xs tracking-[0.3em] uppercase text-taupe">Get in Touch</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
                className="font-serif text-4xl md:text-5xl text-cream tracking-tight"
              >
                Have Any{' '}
                <span className="italic text-bronze">Questions?</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.18 }}
                className="text-base text-cream/60 leading-relaxed mt-5 max-w-[45ch]"
              >
                Whether you are looking to co-invest, explore partnership opportunities, or simply
                learn more about our portfolio — we welcome the conversation.
              </motion.p>
            </div>

            {/* Contact details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.26 }}
              className="flex flex-col gap-5"
            >
              {contactDetails.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex items-center gap-4 text-cream/70 hover:text-bronze transition-colors duration-300"
                >
                  <div className="w-10 h-10 border border-cream/15 group-hover:border-bronze/50 flex items-center justify-center transition-colors duration-300">
                    <item.icon size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-cream/30 mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-sm">{item.value}</p>
                  </div>
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ type: 'spring', stiffness: 80, damping: 22, delay: 0.2 }}
          >
            {submitted ? (
              <div className="flex flex-col gap-4 py-12">
                <div className="w-10 h-10 border border-bronze flex items-center justify-center">
                  <ArrowRight size={16} className="text-bronze" />
                </div>
                <h3 className="font-serif text-2xl text-cream">Message Received</h3>
                <p className="text-sm text-cream/60 leading-relaxed max-w-[40ch]">
                  Thank you for reaching out. A member of the Waraich Group team will respond within
                  one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs tracking-[0.2em] uppercase text-cream/40">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="bg-transparent border border-cream/15 focus:border-bronze px-4 py-3.5 text-sm text-cream placeholder-cream/25 outline-none transition-colors duration-300"
                    placeholder="Your full name"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs tracking-[0.2em] uppercase text-cream/40">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="bg-transparent border border-cream/15 focus:border-bronze px-4 py-3.5 text-sm text-cream placeholder-cream/25 outline-none transition-colors duration-300"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs tracking-[0.2em] uppercase text-cream/40">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="bg-transparent border border-cream/15 focus:border-bronze px-4 py-3.5 text-sm text-cream placeholder-cream/25 outline-none transition-colors duration-300 resize-none"
                    placeholder="Tell us about your investment interest..."
                  />
                </div>

                <MagneticButton className="self-start">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-3 bg-bronze text-cream px-8 py-3.5 text-sm tracking-wide hover:bg-bronze-light transition-colors duration-300 active:scale-[0.97] group"
                  >
                    Send Message
                    <ArrowRight
                      size={15}
                      className="group-hover:translate-x-1 transition-transform duration-300 will-change-transform"
                    />
                  </button>
                </MagneticButton>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
