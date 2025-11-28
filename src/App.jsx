import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import Features from './components/Features.jsx'
import Calculator from './components/Calculator.jsx'
import Pricing from './components/Pricing.jsx'
import Reviews from './components/Reviews.jsx'
import FAQ from './components/FAQ.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import PWAInstaller from './components/PWAInstaller.jsx'
import FloatingButtons from './components/FloatingButtons.jsx'
import { NotificationProvider } from './components/NotificationSystem.jsx'
import { AnalyticsProvider } from './components/Analytics.jsx'

function App() {
  return (
    <Router>
      <AnalyticsProvider>
        <NotificationProvider>
          <div className="App">
            <Header />
            <main>
              <Hero />
              <Services />
              <Features />
              <Calculator />
              <Pricing />
              <Reviews />
              <FAQ />
              <Contact />
            </main>
            <Footer />

            <PWAInstaller />
            <FloatingButtons />
          </div>
        </NotificationProvider>
      </AnalyticsProvider>
    </Router>
  )
}

export default App
