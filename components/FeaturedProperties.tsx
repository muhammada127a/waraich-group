'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from '@phosphor-icons/react'

const properties = [
  {
    id: 'belleville',
    name: 'Comfort Inn Belleville',
    location: 'Belleville, ON',
    badge: 'Recently Transformed',
    description:
      'Recently transformed and reopened alongside the Belleville Chamber of Commerce. A flagship revival in the heart of the Bay of Quinte region.',
    tag: 'Grand Reopening',
    href: 'https://lnkd.in/dqyVZhww',
    image: 'https://picsum.photos/seed/belleville-hotel/900/700',
    span: 'large',
  },
  {
    id: 'barrie',
    name: 'Comfort Inn & Suites',
    location: 'Barrie, ON',
    badge: 'Award-Winning Asset',
    description:
      'Recipient of the Legacy of Excellence Award from Tourism Barrie. A benchmark property for hospitality standards in Southern Ontario.',
    tag: 'Legacy of Excellence',
    href: '#',
    image: 'https://picsum.photos/seed/barrie-hotel/700/500',
    span: 'small',
  },
  {
    id: 'buffalo',
    name: 'CenterWay Hotel',
    location: 'Buffalo, NY',
    badge: 'Strategic Acquisition',
    description:
      'Acquired for $2.15M and currently undergoing a multi-million-dollar transformation into a premium Quality Inn. A cross-border expansion milestone.',
    tag: 'Quality Inn Conversion',
    href: '#',
    image: 'https://picsum.photos/seed/buffalo-hotel/700/500',
    span: 'small',
  },
]

interface CardProps {
  property: (typeof properties)[0]
  delay: number
}

function PropertyCard({ property, delay }: CardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay }}
      className={`group relative flex flex-col overflow-hidden bg-parchment ${
        property.span === 'large' ? 'lg:row-span-2' : ''
      }`}
    >
      {/* Image */}
      <div className={`overflow-hidden ${property.span === 'large' ? 'aspect-[4/3]' : 'aspect-[16/10]'}`}>
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-[1.04]"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 md:p-8 gap-4">
        {/* Badge */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] tracking-[0.25em] uppercase text-bronze border border-bronze/40 px-2.5 py-1">
            {property.badge}
          </span>
          {property.href !== '#' && (
            <a
              href={property.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-taupe hover:text-bronze transition-colors duration-300 active:scale-[0.97]"
              aria-label={`View ${property.name}`}
            >
              <ArrowUpRight size={18} />
            </a>
          )}
        </div>

        {/* Name & location */}
        <div>
          <h3 className="font-serif text-xl md:text-2xl text-charcoal leading-snug">
            {property.name}
          </h3>
          <p className="text-xs tracking-[0.2em] uppercase text-taupe mt-1">{property.location}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-warm-slate leading-relaxed flex-1">{property.description}</p>

        {/* Tag */}
        <div className="pt-4 border-t border-taupe/20">
          <span className="text-xs text-taupe tracking-wide">{property.tag}</span>
        </div>
      </div>

      {/* Hover accent line */}
      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-bronze group-hover:w-full transition-all duration-500 will-change-transform" />
    </motion.article>
  )
}

export default function FeaturedProperties() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="properties" className="py-24 md:py-32 bg-cream">
      <div className="max-w-8xl mx-auto px-8 md:px-12">

        {/* Section header */}
        <div ref={ref} className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="w-8 h-px bg-bronze" />
            <span className="text-xs tracking-[0.3em] uppercase text-taupe">Featured Assets</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-charcoal tracking-tight max-w-[28ch]"
          >
            Hospitality Assets with{' '}
            <span className="italic text-bronze">Proven Returns</span>
          </motion.h2>
        </div>

        {/* Asymmetric grid: 2fr left (large), 1fr right (two stacked) */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5 lg:grid-rows-2">
          <PropertyCard property={properties[0]} delay={0} />
          <PropertyCard property={properties[1]} delay={0.1} />
          <PropertyCard property={properties[2]} delay={0.2} />
        </div>

      </div>
    </section>
  )
}
