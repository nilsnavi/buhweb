import React from 'react'
import { COMPANY_INFO } from '../constants'

const navItems = [
  { name: 'Услуги', href: '#services' },
  { name: 'Возможности', href: '#features' },
  { name: 'Калькулятор', href: '#calculator' },
  { name: 'Тарифы', href: '#pricing' },
  { name: 'Отзывы', href: '#reviews' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Партнёры', href: '#partners' },
  { name: 'Контакты', href: '#contact' },
];

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">📊</span>
            <span className="logo-text">{COMPANY_INFO.name}</span>
          </div>
          <nav className="nav">
            {navItems.map((item, index) => (
              <a key={index} href={item.href} className="nav-link">
                {item.name}
              </a>
            ))}
          </nav>
          <div className="header-contact">
            <span className="phone">{COMPANY_INFO.phone}</span>
            <button className="btn-primary">Заказать звонок</button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
