import React from 'react'
import { PRICING_PLANS } from '../constants'

const Pricing = () => {
  return (
    <section id="pricing" className="pricing">
      <div className="container">
        <h2 className="section-title">Тарифы и цены</h2>
        <p className="section-subtitle">
          Выберите подходящий тариф для вашего бизнеса
        </p>
        <div className="pricing-grid">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`pricing-card ${plan.popular ? 'popular' : ''}`}
            >
              {plan.popular && <div className="popular-badge">Популярный</div>}
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-price">
                <span className="price">{plan.price.toLocaleString()} ₽</span>
                <span className="period">/{plan.period}</span>
              </div>
              <p className="plan-description">{plan.description}</p>
              <ul className="plan-features">
                {plan.features.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <span className="check">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="btn-primary btn-large btn-glow btn-icon">
                <span className="icon">⭐</span>
                Выбрать тариф
              </button>
            </div>
          ))}
        </div>
        <div className="pricing-note">
          <p>Все тарифы включают бесплатную консультацию и настройку учета</p>
        </div>
      </div>
    </section>
  )
}

export default Pricing
