import React from 'react'

const Hero = () => {
  const handleScrollTo = (id) => {
    const section = document.querySelector(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Профессиональное бухгалтерское обслуживание онлайн
            </h1>
            <p className="hero-subtitle">
              Ведение бухучета для ИП и ООО. Экономьте время и деньги с нашим
              удаленным сервисом бухгалтерского сопровождения.
            </p>
            <div className="hero-features">
              <div className="feature-item">✓ Ответ в течение 24 часов</div>
              <div className="feature-item">✓ Работаем по всей России</div>
              <div className="feature-item">✓ От 7 600₽/месяц</div>
            </div>
            <div className="hero-buttons">
              <button
                className="btn-primary btn-large"
                onClick={() => handleScrollTo('#contact')}
              >
                Получить консультацию
              </button>
              <button
                className="btn-secondary btn-large"
                onClick={() => handleScrollTo('#pricing')}
              >
                Узнать стоимость
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
