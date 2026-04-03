'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function VideoScroll() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    let trigger: ScrollTrigger | undefined

    const initTrigger = () => {
      // Prime the video buffer on iOS (requires muted + playsInline already set)
      video.play().then(() => video.pause()).catch(() => {})

      trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          if (video.readyState >= 2) {
            video.currentTime = self.progress * video.duration
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
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-charcoal">
        <video
          ref={videoRef}
          src="/Interior_Design_Exploding_View.mp4"
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        />

        {/* Subtle top fade to blend with Hero above */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-charcoal/60 to-transparent pointer-events-none" />

        {/* Scroll hint — fades out once user starts scrolling via CSS */}
        <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-[10px] tracking-[0.35em] uppercase text-cream/35">
            Scroll to Explore
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-bronze/50 to-transparent" />
        </div>
      </div>
    </section>
  )
}
