import React from 'react'
import { COMPANY_INFO } from '../constants'

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">{COMPANY_INFO.description}</h1>
            <p className="hero-subtitle">
              Доверьте нам ведение вашего бизнеса и сосредоточьтесь на развитии.
              Гарантируем качество и соблюдение всех сроков.
            </p>
            <div className="hero-features">
              <div className="feature-item">✓ Опыт более 5 лет</div>
              <div className="feature-item">✓ Более 20 довольных клиентов</div>
              <div className="feature-item">✓ Гарантия качества</div>
            </div>
            <div className="hero-buttons">
              <button className="btn-primary btn-large">
                Получить консультацию
              </button>
              <button className="btn-secondary btn-large">
                Рассчитать стоимость
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-graphic">
              <div className="graphic-element">📊</div>
              <div className="graphic-element">📈</div>
              <div className="graphic-element">💼</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
