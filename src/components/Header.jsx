import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { COMPANY_INFO } from '../constants';

// Регистрируем плагины
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const navRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Анимация появления хедера
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );

      // Анимация логотипа
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, delay: 0.3, ease: 'power2.out' }
      );

      // Анимация пунктов меню
      gsap.fromTo(
        navRef.current.children,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, delay: 0.4, ease: 'power2.out' }
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // Плавный скролл с GSAP
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: target, offsetY: 80 },
        ease: 'power2.inOut',
      });
    }
  };

  return (
    <header ref={headerRef} className="header">
      <div className="container">
        <div className="header-content">
          <div ref={logoRef} className="logo">
            <span className="logo-icon">📊</span>
            <span className="logo-text">{COMPANY_INFO.name}</span>
          </div>
          <nav ref={navRef} className="nav">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="nav-link"
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.name}
              </a>
            ))}
          </nav>
          <div className="header-contact">
            <span className="phone">{COMPANY_INFO.phone}</span>
            <button
              className="btn-primary"
              aria-label="Заказать обратный звонок"
              onClick={() => {
                const contactSection = document.getElementById('contact')
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              Заказать звонок
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;
