'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowRight } from '@phosphor-icons/react'
import MagneticButton from './ui/MagneticButton'

type PortfolioItem = {
  id: string
  name: string
  location?: string
  image: string
  comingSoon?: boolean
}

type Category = {
  label: string
  items: PortfolioItem[]
}

const categories: Category[] = [
  {
    label: 'HOSPITALITY',
    items: [
      { id: 'comfort-belleville', name: 'Comfort Inn Belleville', location: 'Belleville, ON', image: '/hotels/Belleville_New.jpeg' },
      { id: 'comfort-barrie', name: 'Comfort Inn & Suites Barrie', location: 'Barrie, ON', image: '/hotels/Barrie_New.jpeg' },
      { id: 'comfort-napanee', name: 'Comfort Inn & Suites Napanee', location: 'Napanee, ON', image: '/hotels/comfort_inn_napanee.jpg' },
      { id: 'comfort-syracuse', name: 'Comfort Inn & Suites Syracuse-Carrier Circle', location: 'East Syracuse, NY', image: '/hotels/Syracuse_New.jpeg' },
      { id: 'quality-east-syracuse', name: 'Quality Inn & Suites East Syracuse', location: 'East Syracuse, NY', image: '/hotels/QualityInnEastSyracuse_New.jpeg' },
      { id: 'quality-newcastle', name: 'Quality Inn & Suites New Castle', location: 'New Castle, PA', image: '/hotels/QualityInnNewCastle_New.jpeg' },
      { id: 'suburban-east-syracuse', name: 'Suburban Studios East Syracuse', location: 'East Syracuse, NY', image: '/hotels/SuburbanStudiousEastSyracuse_New.jpeg' },
      { id: 'hampton-cobourg', name: 'Hampton Inn by Hilton Port Hope Cobourg', location: 'Cobourg, ON', image: '/hotels/hampton_inn_porthope.jpg' },
      { id: 'spark-brockville', name: 'Spark by Hilton Brockville', location: 'Brockville, ON', image: '/hotels/spark_brockville.jpg' },
      { id: 'towneplace', name: 'Towneplace Suites by Marriott', location: 'Canada', image: '/hotels/Townplace_marriott.jpg', comingSoon: true },
      { id: 'candlewood', name: 'Canada', location: 'Coming Soon', image: '/hotels/candlewood_suites.jpg', comingSoon: true },
      { id: 'centerway', name: 'Centerway Hotel', location: 'Buffalo, NY', image: '/hotels/centerway_hotel.jpg' },
      { id: 'holiday-inn-express', name: 'Holiday Inn Express & Suites', location: 'Coming Soon', image: '/hotels/holiday_inn_express_suites.jpg', comingSoon: true },
      { id: 'quality-inn-cs', name: 'Quality Inn', location: 'Coming Soon', image: '/hotels/quality_inn_coming_soon.jpg', comingSoon: true },
      { id: 'fairfield-marriott', name: 'Fairfield Inn & Suites by Marriott', location: 'Coming Soon', image: '/hotels/Fairfield_Marriott.jpg', comingSoon: true },
    ],
  },
  {
    label: 'RETAIL',
    items: [
      { id: 'plaza', name: 'Retail Plaza', location: 'Port Perry, ON', image: '/hotels/plaza.jpg' },
      { id: 'pump-port-perry', name: 'Pump Port Perry', location: 'Port Perry, ON', image: '/hotels/port_perry_pump.jpg' },
      { id: 'esso-bobcaygeon', name: 'Esso Bobcaygeon', location: 'Bobcaygeon, ON', image: '/hotels/esso_bobcaygeon.jpg' },
      { id: 'car-wash', name: 'Car Wash', image: '/hotels/car_wash.jpg' },
    ],
  },
  {
    label: 'RESIDENTIAL',
    items: [
      { id: 'residential-port-perry', name: 'Residential Units', location: 'Port Perry, ON', image: '/hotels/port_perry_residential.jpg' },
      { id: 'residential-oshawa', name: 'Residential Units', location: 'Oshawa, ON', image: '/hotels/oshawa_residential.jpg' },
      { id: 'residential-cicero', name: 'Residential Units', location: 'Cicero, NY', image: '/hotels/cicero_residential.jpg' },
      { id: 'residential-southbrunswick', name: 'Residential Units', location: 'South Brunswick, NJ', image: '/hotels/southbrunswick_residential.jpg' },
    ],
  },
  {
    label: 'DEVELOPMENT SITES',
    items: [
      { id: 'dev-canada', name: 'Development Land', location: 'Canada', image: '/hotels/Development_Land_Canada.jpg' },
      { id: 'dev-usa', name: 'Development Land', location: 'United States', image: '/hotels/Development_Land_USA.jpg' },
    ],
  },
]

const INITIAL_SHOW = 6

interface PortfolioCardProps {
  item: PortfolioItem
  delay: number
}

function PortfolioCard({ item, delay }: PortfolioCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay }}
      className="group relative overflow-hidden bg-cream"
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-[1.04]"
        />
      </div>

      {/* Coming Soon badge */}
      {item.comingSoon && (
        <div className="absolute top-3 right-3 bg-charcoal/80 text-cream text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 backdrop-blur-sm">
          Coming Soon
        </div>
      )}

      {/* Info */}
      <div className="p-5">
        <h3 className="font-serif text-lg text-charcoal tracking-tight leading-snug">{item.name}</h3>
        {item.location && (
          <p className="text-xs tracking-[0.15em] uppercase text-taupe mt-1">{item.location}</p>
        )}
      </div>

      {/* Hover accent */}
      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-bronze group-hover:w-full transition-all duration-500 will-change-transform" />
    </motion.article>
  )
}

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('HOSPITALITY')
  const [showAll, setShowAll] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true, margin: '-100px' })

  const activeCategory = categories.find((c) => c.label === activeTab)!

  const handleTabChange = (label: string) => {
    setActiveTab(label)
    setShowAll(false)
  }

  const visibleItems = showAll
    ? activeCategory.items
    : activeCategory.items.slice(0, INITIAL_SHOW)

  const hasMore = !showAll && activeCategory.items.length > INITIAL_SHOW

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-parchment">
      <div className="max-w-8xl mx-auto px-8 md:px-12">

        {/* Header */}
        <div ref={headerRef} className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="w-8 h-px bg-bronze" />
              <span className="text-xs tracking-[0.3em] uppercase text-taupe">Full Portfolio</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl text-charcoal tracking-tight"
            >
              A Diversified{' '}
              <span className="italic text-bronze">North American</span>{' '}
              Portfolio
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.18 }}
            className="text-base text-warm-slate leading-relaxed max-w-[60ch] self-end"
          >
            From award-winning hospitality brands to retail and residential assets, Waraich Group
            maintains a portfolio built for resilience and compounding growth across key North American markets.
          </motion.p>
        </div>

        {/* Tab bar */}
        <div
          role="tablist"
          className="flex gap-0 flex-wrap border-b border-taupe/20 mb-12 overflow-x-auto"
        >
          {categories.map((cat) => (
            <button
              key={cat.label}
              role="tab"
              aria-selected={activeTab === cat.label}
              onClick={() => handleTabChange(cat.label)}
              className={`px-5 py-3.5 text-[11px] tracking-[0.22em] uppercase whitespace-nowrap transition-all duration-200 ${
                activeTab === cat.label
                  ? 'text-bronze border-b-2 border-bronze -mb-px'
                  : 'text-taupe hover:text-charcoal'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Animated card grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {visibleItems.map((item, i) => (
              <PortfolioCard
                key={item.id}
                item={item}
                delay={Math.min(i * 0.04, 0.24)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View Full Portfolio button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 flex justify-center"
          >
            <MagneticButton>
              <button
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2.5 border border-bronze text-bronze px-8 py-3.5 text-xs tracking-[0.18em] uppercase hover:bg-bronze hover:text-cream transition-all duration-300 active:scale-[0.97] group"
              >
                View Full Portfolio
                <ArrowRight
                  size={13}
                  className="group-hover:translate-x-1 transition-transform duration-300 will-change-transform"
                />
              </button>
            </MagneticButton>
          </motion.div>
        )}

      </div>
    </section>
  )
}
