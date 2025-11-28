import React, { createContext, useContext, useState } from 'react'
import { NOTIFICATION_TYPES } from '../constants'

const NotificationContext = createContext()

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider')
  }
  return context
}

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  const addNotification = (
    message,
    type = NOTIFICATION_TYPES.INFO,
    duration = 5000
  ) => {
    const id = Date.now()
    const notification = { id, message, type }

    setNotifications((prev) => [...prev, notification])

    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }
  }

  const removeNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    )
  }

  return (
    <NotificationContext.Provider
      value={{ addNotification, removeNotification }}
    >
      {children}
      <NotificationContainer
        notifications={notifications}
        onRemove={removeNotification}
      />
    </NotificationContext.Provider>
  )
}

const NotificationContainer = ({ notifications, onRemove }) => {
  if (notifications.length === 0) return null

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification notification--${notification.type}`}
        >
          <span className="notification-message">{notification.message}</span>
          <button
            className="notification-close"
            onClick={() => onRemove(notification.id)}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
