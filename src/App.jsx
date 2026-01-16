import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { NotificationProvider } from './components/NotificationSystem.jsx'
import { AnalyticsProvider } from './components/Analytics.jsx'
import LandingPage from './pages/LandingPage.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'

function App() {
  return (
    <Router>
      <AnalyticsProvider>
        <NotificationProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </NotificationProvider>
      </AnalyticsProvider>
    </Router>
  )
}

export default App
