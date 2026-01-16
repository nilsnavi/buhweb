import React from 'react'
import Header from '../components/Header.jsx'
import Hero from '../components/Hero.jsx'
import Services from '../components/Services.jsx'
import Features from '../components/Features.jsx'
import Calculator from '../components/Calculator.jsx'
import Certificates from '../components/Certificates.jsx'
import Pricing from '../components/Pricing.jsx'
import Reviews from '../components/Reviews.jsx'
import FAQ from '../components/FAQ.jsx'
import Contact from '../components/Contact.jsx'
import Footer from '../components/Footer.jsx'
import PWAInstaller from '../components/PWAInstaller.jsx'
import FloatingButtons from '../components/FloatingButtons.jsx'

const LandingPage = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <Services />
        <Features />
        <Calculator />
        <Certificates />
        <Pricing />
        <Reviews />
        <FAQ />
        <Contact />
      </main>
      <Footer />

      <PWAInstaller />
      <FloatingButtons />
    </div>
  )
}

export default LandingPage
