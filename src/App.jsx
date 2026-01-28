import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
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
import AdminLayout from './admin/AdminLayout.jsx'
import Dashboard from './admin/Dashboard.jsx'
import TextManager from './admin/TextManager.jsx'
import ImageManager from './admin/ImageManager.jsx'
import BlockManager from './admin/BlockManager.jsx'
import './styles/admin.css'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Админ-панель */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="texts" element={<TextManager />} />
            <Route path="images" element={<ImageManager />} />
            <Route path="blocks" element={<BlockManager />} />
          </Route>
          
          {/* Основной сайт */}
          <Route path="/*" element={
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
          } />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
