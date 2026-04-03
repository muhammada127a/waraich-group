'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import MagneticButton from './ui/MagneticButton'

const slides = [
  {
    id: 'brockville',
    name: 'Spark by Hilton Brockville',
    brand: 'Spark by Hilton',
    location: 'Brockville, Ontario',
    description:
      'An iconic revival in the heart of Brockville, Ontario. A modern Hilton brand property delivering premium short-stay experiences in one of Canada\'s oldest cities.',
    image: 'https://picsum.photos/seed/spark-brockville/1600/900',
  },
  {
    id: 'napanee',
    name: 'Comfort Inn & Suites Napanee',
    brand: 'Comfort Inn & Suites',
    location: 'Napanee, Ontario',
    description:
      'A cornerstone of hospitality in the Limestone City corridor. Strategically positioned to serve both leisure and business travellers throughout Eastern Ontario.',
    image: 'https://picsum.photos/seed/napanee-hotel/1600/900',
  },
  {
    id: 'cobourg',
    name: 'Hampton Inn by Hilton Port Hope Cobourg',
    brand: 'Hampton Inn by Hilton',
    location: 'Port Hope / Cobourg, Ontario',
    description:
      'Premium branded hospitality in one of Ontario\'s most storied communities. Award-winning guest satisfaction scores in a region poised for continued growth.',
    image: 'https://picsum.photos/seed/hampton-cobourg/1600/900',
  },
]

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -80 : 80 }),
}

export default function FeaturedCarousel() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Preload all images on mount
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image()
      img.src = slide.image
    })
  }, [])

  const navigate = useCallback((dir: number) => {
    setDirection(dir)
    setIndex((i) => (i + dir + slides.length) % slides.length)
  }, [])

  // Auto-advance — resets whenever index changes (including manual nav)
  useEffect(() => {
    intervalRef.current = setInterval(() => navigate(1), 5000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [index, navigate])

  const pauseAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const resumeAutoPlay = () => {
    intervalRef.current = setInterval(() => navigate(1), 5000)
  }

  return (
    <section
      id="carousel"
      className="relative min-h-[100dvh] overflow-hidden bg-charcoal"
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
    >
      {/* Slides */}
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={slides[index].id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="absolute inset-0"
        >
          {/* Background image */}
          <img
            src={slides[index].image}
            alt={slides[index].name}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(30,27,23,0.90) 0%, rgba(30,27,23,0.35) 50%, rgba(30,27,23,0.15) 100%)',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Content — bottom-left, above slides */}
      <div className="relative z-20 h-full min-h-[100dvh] flex flex-col justify-end">
        <div className="max-w-8xl mx-auto px-8 md:px-12 w-full pb-20 md:pb-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${slides[index].id}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              className="flex flex-col gap-4 max-w-[36rem]"
            >
              {/* Brand badge */}
              <span className="text-[10px] tracking-[0.3em] uppercase text-cream/60 border border-cream/20 px-3 py-1 self-start backdrop-blur-sm">
                {slides[index].brand}
              </span>

              {/* Property name */}
              <h2 className="font-serif text-3xl md:text-5xl text-cream tracking-tight leading-[1.1]">
                {slides[index].name}
              </h2>

              {/* Location */}
              <p className="text-xs tracking-[0.25em] uppercase text-bronze">
                {slides[index].location}
              </p>

              {/* Description */}
              <p className="text-sm md:text-base text-cream/70 leading-relaxed max-w-[48ch]">
                {slides[index].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation row */}
          <div className="flex items-center gap-6 mt-10">
            {/* Prev / Next arrows */}
            <div className="flex items-center gap-3">
              <MagneticButton>
                <button
                  onClick={() => navigate(-1)}
                  aria-label="Previous property"
                  className="w-11 h-11 border border-cream/25 text-cream/60 hover:border-bronze hover:text-bronze flex items-center justify-center transition-all duration-300 active:scale-[0.95]"
                >
                  <ArrowLeft size={16} />
                </button>
              </MagneticButton>
              <MagneticButton>
                <button
                  onClick={() => navigate(1)}
                  aria-label="Next property"
                  className="w-11 h-11 border border-cream/25 text-cream/60 hover:border-bronze hover:text-bronze flex items-center justify-center transition-all duration-300 active:scale-[0.95]"
                >
                  <ArrowRight size={16} />
                </button>
              </MagneticButton>
            </div>

            {/* Dot indicators */}
            <div role="tablist" className="flex items-center gap-2.5">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  role="tab"
                  aria-label={`Go to ${slide.name}`}
                  aria-selected={i === index}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1)
                    setIndex(i)
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    i === index
                      ? 'w-6 h-1.5 bg-bronze'
                      : 'w-1.5 h-1.5 bg-cream/30 hover:bg-cream/60'
                  }`}
                />
              ))}
            </div>

            {/* Slide counter */}
            <span className="text-xs text-cream/30 tracking-widest ml-auto">
              {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Section label — top right */}
      <div className="absolute top-8 right-8 md:right-12 z-20">
        <div className="flex items-center gap-3">
          <span className="text-xs tracking-[0.3em] uppercase text-cream/30">Featured Properties</span>
          <div className="w-8 h-px bg-bronze/40" />
        </div>
      </div>
    </section>
  )
}
