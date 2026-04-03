'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { List, X } from '@phosphor-icons/react'
import MagneticButton from './ui/MagneticButton'

const navLinks = [
  { label: 'Properties', href: '#carousel' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Foundation', href: '#foundation' },
  { label: 'Careers', href: '#careers' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream/96 backdrop-blur-md shadow-[0_1px_0_rgba(184,149,106,0.12)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-8xl mx-auto px-8 md:px-12 h-20 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 border border-bronze flex items-center justify-center transition-colors duration-300 group-hover:bg-bronze">
            <span className="font-serif text-base text-bronze group-hover:text-cream transition-colors duration-300 tracking-wider">
              WG
            </span>
          </div>
          <span className="hidden sm:block text-xs tracking-[0.25em] uppercase text-warm-slate">
            Waraich Group
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-sm text-warm-slate tracking-wide hover:text-charcoal transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-bronze transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <MagneticButton>
            <a
              href="#contact"
              className="inline-block px-6 py-2.5 border border-bronze text-bronze text-xs tracking-[0.15em] uppercase hover:bg-bronze hover:text-cream transition-all duration-300 active:scale-[0.97]"
            >
              Book a Call
            </a>
          </MagneticButton>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-charcoal p-1"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <List size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <motion.div
        initial={false}
        animate={{ height: menuOpen ? 'auto' : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        className="md:hidden overflow-hidden bg-cream/98 backdrop-blur-md border-t border-taupe/10"
      >
        <div className="px-8 py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-base text-charcoal tracking-wide hover:text-bronze transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="inline-block border border-bronze text-bronze text-xs tracking-[0.15em] uppercase px-6 py-3 text-center hover:bg-bronze hover:text-cream transition-all duration-300"
          >
            Book a Call
          </a>
        </div>
      </motion.div>
    </motion.header>
  )
}
