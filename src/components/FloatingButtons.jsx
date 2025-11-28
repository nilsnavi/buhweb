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
    <div className="floating-buttons">
      <button
        className="floating-btn call-btn btn-success btn-medium btn-pulse"
        onClick={handleCallClick}
        title="Позвонить"
      >
        <i className="fas fa-phone"></i>
      </button>
      <button
        className="floating-btn whatsapp-btn btn-primary btn-medium btn-glow"
        onClick={handleWhatsAppClick}
        title="WhatsApp"
      >
        <i className="fab fa-whatsapp"></i>
      </button>
      <button
        className="floating-btn calculator-btn btn-secondary btn-medium btn-pulse"
        onClick={handleCalculatorClick}
        title="Калькулятор"
      >
        <i className="fas fa-calculator"></i>
      </button>
    </div>
  )
}

export default FloatingButtons
