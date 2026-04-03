'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const VIDEO_SCRUB_FRACTION = 0.72

// Turntable config
const N = 3
const SPREAD = 360 / N          // 120° between cards
const TRANSLATE_Z = 220         // tighter radius — cards closer together, more curved
const ROT_SPEED = 12            // degrees per second (slow, premium)
const TILT_X = 0                // no tilt — cards rotate on a flat vertical plane

const slides = [
  {
    id: 'brockville',
    name: 'Spark by Hilton Brockville',
    brand: 'Spark by Hilton',
    location: 'Brockville, Ontario',
    description: "An iconic revival in the heart of Brockville, Ontario. Modern Hilton brand delivering premium short-stay experiences.",
    image: '/hotels/spark_brockville.jpg',
  },
  {
    id: 'napanee',
    name: 'Comfort Inn & Suites Napanee',
    brand: 'Comfort Inn & Suites',
    location: 'Napanee, Ontario',
    description: "A cornerstone of hospitality in the Limestone City corridor, serving leisure and business travellers across Eastern Ontario.",
    image: '/hotels/comfort_inn_napanee.jpg',
  },
  {
    id: 'cobourg',
    name: 'Hampton Inn by Hilton Port Hope Cobourg',
    brand: 'Hampton Inn by Hilton',
    location: 'Port Hope / Cobourg, Ontario',
    description: "Premium branded hospitality in one of Ontario's most storied communities, with award-winning guest satisfaction.",
    image: '/hotels/hampton_inn_porthope.jpg',
  },
]

// ─── Turntable Carousel ──────────────────────────────────────────────────────

function TurntableCarousel() {
  const angleRef = useRef(0)           // master rotation angle
  const snapTargetRef = useRef<number | null>(null)  // null = free-spin
  const rafRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number | null>(null)
  const pausedRef = useRef(false)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const infoRefs = useRef<(HTMLDivElement | null)[]>([])
  const activeIndexRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    slides.forEach(s => { const img = new Image(); img.src = s.image })

    const tick = (now: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = now
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05)
      lastTimeRef.current = now

      if (snapTargetRef.current !== null) {
        // Lerp toward snap target (ease-out feel)
        const diff = snapTargetRef.current - angleRef.current
        angleRef.current += diff * Math.min(dt * 8, 1)
        if (Math.abs(diff) < 0.05) {
          angleRef.current = snapTargetRef.current
          snapTargetRef.current = null
        }
      } else if (!pausedRef.current) {
        angleRef.current = (angleRef.current + ROT_SPEED * dt) % 360
      }

      const ga = angleRef.current

      slides.forEach((_, i) => {
        const card = cardRefs.current[i]
        const info = infoRefs.current[i]
        if (!card) return

        const cardAngle = i * SPREAD + ga
        const rad = (cardAngle * Math.PI) / 180
        // cos = 1 when facing viewer, -1 when behind
        const cosVal = Math.cos(rad)

        // "Frontness": 0..1 where 1 = perfectly facing viewer
        const frontness = (cosVal + 1) / 2
        const isFront = frontness > 0.85

        // Scale: front card larger
        const scale = 0.78 + frontness * 0.28

        // Opacity: back cards fade a bit but stay visible (turntable feel)
        const opacity = 0.45 + frontness * 0.55

        // Z-index: highest when facing viewer
        const zIdx = Math.round(frontness * 10)

        card.style.transform = `rotateY(${cardAngle}deg) translateZ(${TRANSLATE_Z}px) scale(${scale})`
        card.style.opacity = String(Math.min(opacity, 1))
        card.style.zIndex = String(zIdx)

        if (info) {
          info.style.opacity = isFront ? '1' : '0'
          info.style.pointerEvents = isFront ? 'auto' : 'none'
        }

        if (isFront && activeIndexRef.current !== i) {
          activeIndexRef.current = i
          setActiveIndex(i)
        }
      })

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  const snapToCard = (i: number) => {
    const target = ((-i * SPREAD) % 360 + 360) % 360
    const current = (angleRef.current % 360 + 360) % 360
    let delta = target - current
    if (delta > 180) delta -= 360
    if (delta < -180) delta += 360
    snapTargetRef.current = angleRef.current + delta
    pausedRef.current = true
    setTimeout(() => { pausedRef.current = false }, 2800)
  }

  return (
    <div className="relative w-full flex flex-col items-center select-none"
      style={{ height: 'clamp(400px, 58vh, 560px)' }}
      onMouseEnter={() => { pausedRef.current = true }}
      onMouseLeave={() => { pausedRef.current = false }}
    >
      {/* Section label — sits in normal flow, strictly above 3D stage */}
      <div className="flex items-center gap-3 mb-6 relative z-50 bg-transparent" style={{ marginTop: '-24px' }}>
        <div className="w-8 h-px bg-bronze/60" />
        <span className="text-[13px] tracking-[0.32em] uppercase text-cream/70 font-medium">
          Featured Properties
        </span>
        <div className="w-8 h-px bg-bronze/60" />
      </div>

      {/* 3D turntable stage — clipped so cards never escape upward into the label */}
      <div
        className="relative flex-1 w-full flex items-center justify-center overflow-hidden"
        style={{
          perspective: '1000px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* Rotating wheel — tilted like a lazy susan */}
        <div
          style={{
            position: 'relative',
            width: 0,
            height: 0,
            transformStyle: 'preserve-3d',
            transform: `rotateX(${TILT_X}deg)`,
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              ref={el => { cardRefs.current[i] = el }}
              onClick={() => snapToCard(i)}
              style={{
                position: 'absolute',
                width: 'clamp(260px, 34vw, 460px)',
                aspectRatio: '3/2',
                top: '50%',
                left: '50%',
                marginTop: 'calc(clamp(260px, 34vw, 460px) * -1 / 3)',
                marginLeft: 'calc(clamp(260px, 34vw, 460px) / -2)',
                cursor: 'pointer',
                overflow: 'hidden',
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                borderRadius: '2px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.65)',
                transformStyle: 'preserve-3d',
              }}
            >
              <img
                src={slide.image}
                alt={slide.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {/* Gradient */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(30,27,23,0.90) 0%, rgba(30,27,23,0.25) 55%, transparent 100%)',
              }} />

              {/* Text info — only front card */}
              <div
                ref={el => { infoRefs.current[i] = el }}
                style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '1.25rem 1.5rem',
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                }}
              >
                <span style={{
                  fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase',
                  color: 'rgba(250,248,245,0.55)', border: '1px solid rgba(250,248,245,0.2)',
                  padding: '3px 8px', display: 'inline-block',
                }}>
                  {slide.brand}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                  color: '#FAF8F5', lineHeight: 1.1, letterSpacing: '-0.01em',
                  marginTop: '0.5rem',
                }}>
                  {slide.name}
                </h3>
                <p style={{
                  fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: '#B8956A', marginTop: '0.25rem',
                }}>
                  {slide.location}
                </p>
                <p style={{
                  fontSize: '0.75rem', color: 'rgba(250,248,245,0.6)',
                  lineHeight: 1.5, marginTop: '0.4rem', maxWidth: '40ch',
                }}>
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Subtle elliptical shadow — "table surface" */}
        <div style={{
          position: 'absolute',
          bottom: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '70%',
          height: '18px',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.45) 0%, transparent 70%)',
          filter: 'blur(6px)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />
      </div>

      {/* Dot indicators + arrows */}
      <div className="flex items-center gap-4 pb-2 z-20 relative mt-2">
        {/* Left arrow */}
        <button
          aria-label="Previous property"
          onClick={() => snapToCard((activeIndexRef.current - 1 + N) % N)}
          className="w-6 h-6 flex items-center justify-center text-cream/50 hover:text-bronze transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2.5">
          {slides.map((s, i) => (
            <button
              key={s.id}
              aria-label={`Go to ${s.name}`}
              onClick={() => snapToCard(i)}
              className={`rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? 'w-5 h-1.5 bg-bronze'
                  : 'w-1.5 h-1.5 bg-cream/25 hover:bg-cream/50'
              }`}
            />
          ))}
        </div>

        {/* Right arrow */}
        <button
          aria-label="Next property"
          onClick={() => snapToCard((activeIndexRef.current + 1) % N)}
          className="w-6 h-6 flex items-center justify-center text-cream/50 hover:text-bronze transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

// ─── Main Section (GSAP scrub — unchanged) ───────────────────────────────────

export default function VideoScrollCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const carouselWrapRef = useRef<HTMLDivElement>(null)
  const videoScrimRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const carouselVisibleRef = useRef(false)
  const targetVideoTimeRef = useRef(0)
  const videoRafRef = useRef<number | null>(null)

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    const carouselWrap = carouselWrapRef.current
    const videoScrim = videoScrimRef.current
    const scrollHint = scrollHintRef.current
    if (!video || !section || !carouselWrap || !videoScrim) return

    let trigger: ScrollTrigger | undefined

    const initTrigger = () => {
      video.play().then(() => video.pause()).catch(() => {})

      // Lerp video.currentTime in a separate rAF so scrubbing never stutters
      const videoTick = () => {
        if (video.readyState >= 2) {
          const diff = targetVideoTimeRef.current - video.currentTime
          if (Math.abs(diff) > 0.01) {
            video.currentTime += diff * 0.18
          }
        }
        videoRafRef.current = requestAnimationFrame(videoTick)
      }
      videoRafRef.current = requestAnimationFrame(videoTick)

      trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress

          if (video.readyState >= 2) {
            const videoProgress = Math.min(p / VIDEO_SCRUB_FRACTION, 1)
            targetVideoTimeRef.current = videoProgress * video.duration
          }

          const inCarouselZone = p >= VIDEO_SCRUB_FRACTION

          if (inCarouselZone && !carouselVisibleRef.current) {
            carouselVisibleRef.current = true
            gsap.to(carouselWrap, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
            gsap.to(videoScrim, { opacity: 1, duration: 0.6 })
            if (scrollHint) gsap.to(scrollHint, { opacity: 0, duration: 0.3 })
          } else if (!inCarouselZone && carouselVisibleRef.current) {
            carouselVisibleRef.current = false
            gsap.to(carouselWrap, { opacity: 0, y: 24, duration: 0.4, ease: 'power2.in' })
            gsap.to(videoScrim, { opacity: 0, duration: 0.4 })
            if (scrollHint) gsap.to(scrollHint, { opacity: 1, duration: 0.3 })
          }
        },
      })
    }

    if (video.readyState >= 1) {
      initTrigger()
    } else {
      video.addEventListener('loadedmetadata', initTrigger, { once: true })
    }

    return () => {
      trigger?.kill()
      video.removeEventListener('loadedmetadata', initTrigger)
      if (videoRafRef.current) cancelAnimationFrame(videoRafRef.current)
    }
  }, [])

  return (
    <section ref={sectionRef} id="carousel" className="relative h-[500vh]">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-charcoal">

        {/* Video */}
        <video
          ref={videoRef}
          src="/Interior_Design_Exploding_View.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Top edge fade */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-charcoal/70 to-transparent pointer-events-none z-10" />

        {/* Scrim behind carousel */}
        <div
          ref={videoScrimRef}
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ opacity: 0, background: 'rgba(30,27,23,0.62)' }}
        />

        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
          className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-2 pointer-events-none z-20"
        >
          <span className="text-[10px] tracking-[0.35em] uppercase text-cream/35">
            Scroll to Explore
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-bronze/50 to-transparent" />
        </div>

        {/* Turntable carousel — centred in viewport, well above bottom edge */}
        <div
          ref={carouselWrapRef}
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
          style={{ opacity: 0, transform: 'translateY(24px)', paddingTop: '5vh' }}
        >
          <div className="w-full max-w-5xl mx-auto px-4 pointer-events-auto">
            <TurntableCarousel />
          </div>
        </div>

      </div>
    </section>
  )
}
