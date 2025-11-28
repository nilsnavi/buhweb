import React from 'react'
import { FEATURES } from '../constants'

const Features = () => {
  return (
    <section id="features" className="features">
      <div className="container">
        <h2 className="section-title">Почему выбирают нас</h2>
        <div className="features-grid">
          {FEATURES.map((feature) => (
            <div key={feature.id} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
