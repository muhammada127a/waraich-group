'use client'

/*
 * INDEED INTEGRATION — HOW TO SWAP IN LIVE LISTINGS
 * ─────────────────────────────────────────────────
 * Option A — Indeed Publisher RSS Feed:
 *   1. Sign up at indeed.com/publisher and get your Publisher ID
 *   2. Create a Next.js Route Handler at app/api/jobs/route.ts
 *   3. Fetch your feed: `https://www.indeed.com/rss?q=&l=&publisher=YOUR_PUBLISHER_ID`
 *   4. Parse the XML (use the `fast-xml-parser` package) and return JSON
 *   5. In this component, replace the `jobs` array with a `useSWR` or
 *      server-side fetch from `/api/jobs`
 *   6. Map: item.title → title, item.link → indeedUrl, item.description → description
 *
 * Option B — Indeed Publisher JS Widget:
 *   Replace the job cards below with:
 *   <script>
 *     window.indeed_widget_config = {
 *       publisher: 'YOUR_PUBLISHER_ID',
 *       type: 'column',
 *       numJobs: 3,
 *       locale: 'en_CA',
 *     }
 *   </script>
 *   <script src="https://www.indeed.com/publisher/jobwidget.js" async></script>
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, MapPin, Clock, Briefcase } from '@phosphor-icons/react'
import AnimatedSection from './ui/AnimatedSection'

const jobs = [
  {
    id: 'general-manager',
    title: 'General Manager',
    department: 'Hospitality Operations',
    location: 'Ontario, Canada',
    type: 'Full-Time',
    description:
      'Lead day-to-day operations of a branded hotel property. Responsibilities include staff management, guest experience oversight, revenue optimization, and financial performance tracking against brand and ownership targets.',
    indeedUrl: 'https://ca.indeed.com/jobs?q=general+manager+hospitality&l=Ontario',
  },
  {
    id: 'property-dev-coordinator',
    title: 'Property Development Coordinator',
    department: 'Development',
    location: 'Greater Toronto Area, ON',
    type: 'Full-Time',
    description:
      'Support acquisition due diligence, coordinate with contractors and municipal offices, and track development project timelines across active sites. Ideal for someone with a background in construction management or urban planning.',
    indeedUrl: 'https://ca.indeed.com/jobs?q=property+development+coordinator&l=Toronto',
  },
  {
    id: 'guest-services',
    title: 'Guest Services Associate',
    department: 'Hospitality Operations',
    location: 'Multiple Locations, ON',
    type: 'Part-Time',
    description:
      'Deliver exceptional front-desk and guest-facing service at one of our Ontario hotel properties. Seeking warm, professional communicators who take pride in creating memorable stays.',
    indeedUrl: 'https://ca.indeed.com/jobs?q=guest+services+hotel&l=Ontario',
  },
]

export default function Careers() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true, margin: '-100px' })

  return (
    <section id="careers" className="py-24 md:py-32 bg-cream">
      <div className="max-w-8xl mx-auto px-8 md:px-12">

        {/* Header */}
        <div ref={headerRef} className="mb-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="w-8 h-px bg-bronze" />
            <span className="text-xs tracking-[0.3em] uppercase text-taupe">Careers</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl text-charcoal tracking-tight"
            >
              Join Our{' '}
              <span className="italic text-bronze">Team</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.18 }}
              className="text-base text-warm-slate leading-relaxed max-w-[58ch] self-end"
            >
              We're building something lasting — and we do it with people who care about craft,
              hospitality, and community. Explore open roles across our properties and corporate team.
            </motion.p>
          </div>
        </div>

        {/* Job listings */}
        <div className="flex flex-col gap-4">
          {jobs.map((job, i) => (
            <AnimatedSection key={job.id} delay={i * 0.1}>
              <div className="group border border-taupe/20 hover:border-bronze/40 transition-colors duration-300 p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8 justify-between">

                  {/* Left — job info */}
                  <div className="flex flex-col gap-3 flex-1">
                    <div>
                      <h3 className="font-serif text-xl md:text-2xl text-charcoal tracking-tight group-hover:text-bronze transition-colors duration-300">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2">
                        <span className="flex items-center gap-1.5 text-xs text-taupe">
                          <Briefcase size={12} />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-taupe">
                          <MapPin size={12} />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-taupe">
                          <Clock size={12} />
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-warm-slate leading-relaxed max-w-[60ch]">
                      {job.description}
                    </p>
                  </div>

                  {/* Right — Apply button */}
                  <div className="shrink-0">
                    <a
                      href={job.indeedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-taupe/35 text-warm-slate hover:border-bronze hover:text-bronze px-5 py-2.5 text-xs tracking-[0.15em] uppercase transition-all duration-300 active:scale-[0.97]"
                    >
                      Apply on Indeed
                      <ArrowUpRight size={13} />
                    </a>
                  </div>

                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Footer note */}
        <AnimatedSection delay={0.3} className="mt-8">
          <p className="text-xs text-taupe/60 tracking-wide">
            Don't see the right role? Email us at{' '}
            <a
              href="mailto:info@waraichgroup.com"
              className="text-bronze hover:underline transition-colors duration-200"
            >
              info@waraichgroup.com
            </a>{' '}
            with your resume and area of interest.
          </p>
        </AnimatedSection>

      </div>
    </section>
  )
}
