import React from 'react'
import { FAQ_ITEMS } from '../constants'

const FAQ = () => {
  return (
    <section className="faq">
      <div className="container">
        <h2 className="section-title">Часто задаваемые вопросы</h2>
        <p className="section-subtitle">
          Ответы на популярные вопросы о наших услугах
        </p>
        <div className="faq-list">
          {FAQ_ITEMS.map((item) => (
            <div key={item.id} className="faq-item">
              <h3 className="faq-question">{item.question}</h3>
              <p className="faq-answer">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
