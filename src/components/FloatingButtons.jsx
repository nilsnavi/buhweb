import React from 'react'

const FloatingButtons = () => {
  const handleCallClick = () => {
    window.open('tel:+74951234567', '_self')
  }

  const handleWhatsAppClick = () => {
    window.open(
      'https://wa.me/79999999999?text=Здравствуйте! Интересует ведение бухучета',
      '_blank'
    )
  }

  const handleCalculatorClick = () => {
    const calculatorSection = document.querySelector('.calculator')
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="floating-buttons" role="region" aria-label="Быстрые действия">
      <button
        className="floating-btn call-btn btn-success btn-medium btn-pulse"
        onClick={handleCallClick}
        title="Позвонить"
        aria-label="Позвонить по телефону"
      >
        <i className="fas fa-phone" aria-hidden="true"></i>
      </button>
      <button
        className="floating-btn whatsapp-btn btn-primary btn-medium btn-glow"
        onClick={handleWhatsAppClick}
        title="Написать в WhatsApp"
        aria-label="Написать в WhatsApp"
      >
        <i className="fab fa-whatsapp" aria-hidden="true"></i>
      </button>
      <button
        className="floating-btn calculator-btn btn-secondary btn-medium btn-pulse"
        onClick={handleCalculatorClick}
        title="Открыть калькулятор"
        aria-label="Перейти к калькулятору стоимости"
      >
        <i className="fas fa-calculator" aria-hidden="true"></i>
      </button>
    </div>
  )
}

export default FloatingButtons
