'use client'

import { LinkedinLogo, EnvelopeSimple } from '@phosphor-icons/react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-charcoal border-t border-cream/6 py-10">
      <div className="max-w-8xl mx-auto px-8 md:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 border border-bronze/50 flex items-center justify-center">
            <span className="font-serif text-xs text-bronze tracking-wider">WG</span>
          </div>
          <span className="text-xs tracking-[0.2em] uppercase text-cream/30">Waraich Group</span>
        </div>

        {/* Copyright */}
        <p className="text-xs text-cream/25 tracking-wide order-last sm:order-none">
          &copy; {year} Waraich Group. All rights reserved.
        </p>

        {/* Social links */}
        <div className="flex items-center gap-5">
          <a
            href="mailto:info@waraichgroup.com"
            className="text-cream/30 hover:text-bronze transition-colors duration-300"
            aria-label="Email Waraich Group"
          >
            <EnvelopeSimple size={16} />
          </a>
          <a
            href="https://www.linkedin.com/company/waraichgroup/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream/30 hover:text-bronze transition-colors duration-300"
            aria-label="Waraich Group on LinkedIn"
          >
            <LinkedinLogo size={16} />
          </a>
        </div>

      </div>
    </footer>
  )
}
