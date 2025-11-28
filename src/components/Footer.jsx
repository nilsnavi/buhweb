import React from 'react'
import { COMPANY_INFO } from '../constants'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>{COMPANY_INFO.name}</h4>
            <p>{COMPANY_INFO.description}</p>
            <p>ИНН: {COMPANY_INFO.inn}</p>
          </div>

          <div className="footer-section">
            <h4>Услуги</h4>
            <ul>
              <li>
                <a href="#services">Ведение бухучета</a>
              </li>
              <li>
                <a href="#services">Налоговый учет</a>
              </li>
              <li>
                <a href="#services">Кадровый учет</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Информация</h4>
            <ul>
              <li>
                <a href="#features">О нас</a>
              </li>
              <li>
                <a href="#pricing">Цены</a>
              </li>
              <li>
                <a href="#reviews">Отзывы</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Контакты</h4>
            <p>{COMPANY_INFO.phone}</p>
            <p>{COMPANY_INFO.email}</p>
            <p>{COMPANY_INFO.workingHours}</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 {COMPANY_INFO.name}. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
