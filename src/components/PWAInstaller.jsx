import React, { useState, useEffect } from 'react'

const PWAInstaller = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstallButton, setShowInstallButton] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallButton(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      )
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      console.log('PWA установлено')
    }

    setDeferredPrompt(null)
    setShowInstallButton(false)
  }

  if (!showInstallButton) return null

  return (
    <div className="pwa-installer">
      <div className="pwa-prompt">
        <span className="pwa-icon">📱</span>
        <span>Установите приложение для быстрого доступа</span>
        <button
          onClick={handleInstallClick}
          className="btn-primary btn-medium btn-pulse"
        >
          <i className="fas fa-download"></i>
          Установить
        </button>
        <button
          onClick={() => setShowInstallButton(false)}
          className="btn-ghost btn-small"
          aria-label="Закрыть предложение установки"
          title="Закрыть"
        >
          <i className="fas fa-times" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  )
}

export default PWAInstaller
