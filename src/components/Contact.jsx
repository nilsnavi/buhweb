import React, { useState } from 'react'
import { COMPANY_INFO } from '../constants'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Имитация отправки формы
    setTimeout(() => {
      alert('Спасибо! Мы свяжемся с вами в ближайшее время.')
      setFormData({ name: '', email: '', phone: '', message: '' })
      setIsSubmitting(false)
    }, 1000)
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Связаться с нами</h2>
        <p className="section-subtitle">
          Оставьте заявку и мы свяжемся с вами в ближайшее время
        </p>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Контактная информация</h3>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <div>
                <strong>Телефон:</strong>
                <p>{COMPANY_INFO.phone}</p>
                <p>{COMPANY_INFO.workingHours}</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <div>
                <strong>Email:</strong>
                <p>{COMPANY_INFO.email}</p>
                <p>{COMPANY_INFO.supportEmail}</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div>
                <strong>Адрес:</strong>
                <p>{COMPANY_INFO.address}</p>
                <p>Онлайн-сервис для всей России</p>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <h3>Оставьте заявку</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  placeholder="Телефон"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Ваше сообщение"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows="4"
                  className="form-textarea"
                />
              </div>
              <button
                type="submit"
                className="btn-primary btn-large btn-glow"
                disabled={isSubmitting}
              >
                <i className="fas fa-paper-plane"></i>
                {isSubmitting ? 'Отправляем...' : 'Отправить заявку'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
