import React, { useCallback, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { COMPANY_INFO } from '../constants';

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const featuresRef = useRef(null);
  const buttonsRef = useRef(null);
  const graphicsRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline для последовательной анимации
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Анимация заголовка
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
      )
        // Анимация подзаголовка
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        // Анимация фич
        .fromTo(
          featuresRef.current.children,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 },
          '-=0.4'
        )
        // Анимация кнопок
        .fromTo(
          buttonsRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          '-=0.3'
        )
        // Анимация графики
        .fromTo(
          graphicsRef.current.children,
          { opacity: 0, scale: 0.5, rotation: -10 },
          { opacity: 1, scale: 1, rotation: 0, duration: 0.6, stagger: 0.15 },
          '-=0.5'
        );

      // Плавающая анимация для графических элементов
      gsap.to(graphicsRef.current.children, {
        y: -10,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.3,
          from: 'random',
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleConsultation = useCallback(() => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleCalculate = useCallback(() => {
    const calculatorSection = document.getElementById('calculator');
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section ref={heroRef} className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 ref={titleRef} className="hero-title">{COMPANY_INFO.description}</h1>
            <p ref={subtitleRef} className="hero-subtitle">
              Доверьте нам ведение вашего бизнеса и сосредоточьтесь на развитии.
              Гарантируем качество и соблюдение всех сроков.
            </p>
            <div ref={featuresRef} className="hero-features">
              <div className="feature-item">✓ Опыт более 5 лет</div>
              <div className="feature-item">✓ Более 20 довольных клиентов</div>
              <div className="feature-item">✓ Гарантия качества</div>
            </div>
            <div ref={buttonsRef} className="hero-buttons">
              <button
                className="btn-accent btn-lg"
                onClick={handleConsultation}
                aria-label="Перейти к форме для получения консультации"
              >
                Получить консультацию
              </button>
              <button
                className="btn-outline-light btn-lg"
                onClick={handleCalculate}
                aria-label="Перейти к калькулятору стоимости услуг"
              >
                Рассчитать стоимость
              </button>
            </div>
          </div>
          <div className="hero-image" aria-label="Графическое изображение бизнес-метрик">
            <div ref={graphicsRef} className="hero-graphic">
              <div className="graphic-element" role="img" aria-label="Диаграмма">📊</div>
              <div className="graphic-element" role="img" aria-label="График роста">📈</div>
              <div className="graphic-element" role="img" aria-label="Бизнес-кейс">💼</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero
