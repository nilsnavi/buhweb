import React from 'react'
import { Link } from 'react-router-dom'
import { COMPANY_INFO } from '../constants'

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo" aria-label="Бухучет Онлайн">
            <span className="logo-icon">📊</span>
            <span className="logo-text">{COMPANY_INFO.name}</span>
          </Link>
          <nav className="nav">
            <a href="#services" className="nav-link">
              Услуги
            </a>
            <a href="#features" className="nav-link">
              Преимущества
            </a>
            <a href="#pricing" className="nav-link">
              Цены
            </a>
            <a href="#reviews" className="nav-link">
              Отзывы
            </a>
            <a href="#contact" className="nav-link">
              Контакты
            </a>
            <Link to="/admin" className="nav-link nav-admin">
              Админ-панель
            </Link>
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
