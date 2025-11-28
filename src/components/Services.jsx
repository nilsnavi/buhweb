import React from 'react'
import { SERVICES } from '../constants'

const Services = () => {
  return (
    <section id="services" className="services">
      <div className="container">
        <h2 className="section-title">Наши услуги</h2>
        <p className="section-subtitle">
          Полный спектр бухгалтерских услуг для вашего бизнеса
        </p>
        <div className="services-grid">
          {SERVICES.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-price">
                <span className="price">{service.price}</span>
                <span className="period">{service.period}</span>
              </div>
              <ul className="service-features">
                {service.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <button className="btn-primary btn-icon">
                <span className="icon">🛒</span>
                Заказать
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
