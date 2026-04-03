import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import VideoScrollCarousel from '@/components/VideoScrollCarousel'
import Portfolio from '@/components/Portfolio'
import WaraichDevelopment from '@/components/WaraichDevelopment'
import GrowthEquity from '@/components/GrowthEquity'
import Foundation from '@/components/Foundation'
import InvestmentCTA from '@/components/InvestmentCTA'
import Careers from '@/components/Careers'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <VideoScrollCarousel />
      <Portfolio />
      <WaraichDevelopment />
      <GrowthEquity />
      <Foundation />
      <InvestmentCTA />
      <Careers />
      <Contact />
      <Footer />
    </main>
  )
}
