import React, { createContext, useContext, useState } from 'react'

const AnalyticsContext = createContext()

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext)
  if (!context) {
    throw new Error('useAnalytics must be used within AnalyticsProvider')
  }
  return context
}

export const AnalyticsProvider = ({ children }) => {
  const [sessionId] = useState(() => Date.now().toString())

  const trackEvent = (eventName, properties = {}) => {
    const event = {
      sessionId,
      eventName,
      properties,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    }

    // Сохранить в localStorage
    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]')
    events.push(event)
    localStorage.setItem('analytics_events', JSON.stringify(events))

    console.log('Analytics Event:', event)
  }

  const trackPageView = (pageName) => {
    trackEvent('page_view', { pageName })
  }

  const trackButtonClick = (buttonName, section) => {
    trackEvent('button_click', { buttonName, section })
  }

  const trackFormSubmit = (formName, formData) => {
    trackEvent('form_submit', { formName, ...formData })
  }

  const getAnalyticsData = () => {
    return JSON.parse(localStorage.getItem('analytics_events') || '[]')
  }

  return (
    <AnalyticsContext.Provider
      value={{
        trackEvent,
        trackPageView,
        trackButtonClick,
        trackFormSubmit,
        getAnalyticsData,
        sessionId,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  )
}
