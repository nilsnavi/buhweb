import React, { useState, useEffect, useCallback, useRef } from 'react';
import { gsap } from 'gsap';
import CalculatorSEO from './CalculatorSEO.jsx';

// Компонент анимированного счетчика
const AnimatedPrice = ({ value, duration = 1.5, className = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const valueRef = useRef(value);
  const animationRef = useRef(null);

  useEffect(() => {
    const startValue = valueRef.current;
    const endValue = value;
    const startTime = Date.now();

    // Отменяем предыдущую анимацию
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out-expo)
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      const currentValue = Math.round(startValue + (endValue - startValue) * easeOut);
      setDisplayValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        valueRef.current = endValue;
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, duration]);

  return (
    <span className={className}>
      {displayValue.toLocaleString()} ₽
    </span>
  );
};

// Утилита для дебаунса
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

const Calculator = () => {
  const resultRef = useRef(null);
  const priceRef = useRef(null);

  const [formData, setFormData] = useState({
    entityType: 'zao',
    taxSystem: 'usn',
    employees: 0,
    documents: 10,
    needPayroll: false,
    needReports: true,
    needConsulting: false,
    needRegistration: false,
  });

  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [displayDocuments, setDisplayDocuments] = useState(10);
  const [displayEmployees, setDisplayEmployees] = useState(0);

  const handleInputChange = useCallback((field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }, [])

  // Обработчики для ползунков с мгновенным отображением
  const handleDocumentsChange = useCallback((e) => {
    const value = parseInt(e.target.value)
    setDisplayDocuments(value)
  }, [])

  const handleDocumentsChangeEnd = useCallback((e) => {
    const value = parseInt(e.target.value)
    setFormData((prev) => ({ ...prev, documents: value }))
  }, [])

  const handleEmployeesChange = useCallback((e) => {
    const value = parseInt(e.target.value)
    setDisplayEmployees(value)
  }, [])

  const handleEmployeesChangeEnd = useCallback((e) => {
    const value = parseInt(e.target.value)
    setFormData((prev) => ({ ...prev, employees: value }))
  }, [])

  // Синхронизация display значений с formData
  useEffect(() => {
    setDisplayDocuments(formData.documents)
    setDisplayEmployees(formData.employees)
  }, [formData.documents, formData.employees])

  // Автоматический пересчет при изменении данных
  useEffect(() => {
    calculatePrice();
  }, [formData]);

  // Анимация появления результатов
  useEffect(() => {
    if (result && resultRef.current) {
      gsap.fromTo(
        resultRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out' }
      );

      // Анимация изменения цены
      if (priceRef.current) {
        gsap.fromTo(
          priceRef.current,
          { scale: 1.2, color: '#10b981' },
          { scale: 1, color: 'inherit', duration: 0.4, ease: 'power2.out' }
        );
      }
    }
  }, [result]);

  const calculatePrice = useCallback(() => {
    setIsCalculating(true)

    setTimeout(() => {
      let basePrice = 0
      let services = []

      // Базовая стоимость по типу организации
      if (formData.entityType === 'ip') {
        basePrice = 5000
        services.push({ name: 'Ведение учета ИП', price: 5000, icon: '👤' })
      } else if (formData.entityType === 'ooo') {
        basePrice = 8000
        services.push({ name: 'Ведение учета ООО', price: 8000, icon: '🏢' })
      } else if (formData.entityType === 'zao') {
        basePrice = 12000
        services.push({ name: 'Ведение учета ЗАО', price: 12000, icon: '🏛️' })
      }

      // Надбавка за налоговую систему
      if (formData.taxSystem === 'osn') {
        const osnSurcharge = Math.round(basePrice * 0.5)
        basePrice += osnSurcharge
        services.push({
          name: 'ОСН (доплата)',
          price: osnSurcharge,
          icon: '📊',
        })
      } else if (formData.taxSystem === 'envd') {
        const envdSurcharge = Math.round(basePrice * 0.3)
        basePrice += envdSurcharge
        services.push({
          name: 'ЕНВД (доплата)',
          price: envdSurcharge,
          icon: '💼',
        })
      }

      // Стоимость за документы
      if (formData.documents > 50) {
        const docPrice = (formData.documents - 50) * 50
        services.push({
          name: `Документы свыше 50 шт. (${formData.documents - 50} шт.)`,
          price: docPrice,
          icon: '📄',
        })
      }

      // Кадровый учет
      if (formData.needPayroll && formData.employees > 0) {
        const payrollPrice = formData.employees * 500
        services.push({
          name: `Кадровый учет (${formData.employees} сотр.)`,
          price: payrollPrice,
          icon: '👥',
        })
      }

      // Дополнительная отчетность
      if (formData.needReports) {
        services.push({
          name: 'Дополнительная отчетность',
          price: 2000,
          icon: '📋',
        })
      }

      // Консультации
      if (formData.needConsulting) {
        services.push({
          name: 'Консультационные услуги',
          price: 3000,
          icon: '💡',
        })
      }

      // Регистрация
      if (formData.needRegistration) {
        services.push({
          name: 'Помощь в регистрации',
          price: 15000,
          icon: '📝',
        })
      }

      const totalPrice = services.reduce(
        (sum, service) => sum + service.price,
        0
      )

      setResult({
        totalPrice,
        services,
        monthlyPrice: totalPrice,
        yearlyPrice: totalPrice * 12,
        yearlyDiscount: Math.round(totalPrice * 12 * 0.1),
      })

      setIsCalculating(false)
    }, 300)
  }, [formData])

  return (
    <>
      <CalculatorSEO />
      <section className="calculator">
        <div className="container">
          <div className="calculator-header">
            <h2 className="section-title">
              <i className="fas fa-calculator"></i>
              Калькулятор стоимости
            </h2>
            <p className="section-subtitle">
              Получите предварительный расчет стоимости ведения бухгалтерского
              учета
            </p>
          </div>

          <div className="calculator-wrapper">
            <div className="calculator-form-section">
              <div className="calculator-form">
                <div className="form-section">
                  <h3 className="form-section-title">
                    <i className="fas fa-building"></i>
                    Тип организации
                  </h3>
                  <div className="radio-group">
                    <label className="radio-card">
                      <input
                        type="radio"
                        name="entityType"
                        value="ip"
                        checked={formData.entityType === 'ip'}
                        onChange={(e) =>
                          handleInputChange('entityType', e.target.value)
                        }
                      />
                      <div className="radio-card-content">
                        <div className="radio-card-icon">👤</div>
                        <div className="radio-card-title">ИП</div>
                        <div className="radio-card-desc">
                          Индивидуальный предприниматель
                        </div>
                      </div>
                    </label>
                    <label className="radio-card">
                      <input
                        type="radio"
                        name="entityType"
                        value="ooo"
                        checked={formData.entityType === 'ooo'}
                        onChange={(e) =>
                          handleInputChange('entityType', e.target.value)
                        }
                      />
                      <div className="radio-card-content">
                        <div className="radio-card-icon">🏢</div>
                        <div className="radio-card-title">ООО</div>
                        <div className="radio-card-desc">
                          Общество с ограниченной ответственностью
                        </div>
                      </div>
                    </label>
                    <label className="radio-card">
                      <input
                        type="radio"
                        name="entityType"
                        value="zao"
                        checked={formData.entityType === 'zao'}
                        onChange={(e) =>
                          handleInputChange('entityType', e.target.value)
                        }
                      />
                      <div className="radio-card-content">
                        <div className="radio-card-icon">🏛️</div>
                        <div className="radio-card-title">ЗАО</div>
                        <div className="radio-card-desc">
                          Закрытое акционерное общество
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="form-section-title">
                    <i className="fas fa-percentage"></i>
                    Налоговая система
                  </h3>
                  <div className="select-group">
                    <select
                      value={formData.taxSystem}
                      onChange={(e) =>
                        handleInputChange('taxSystem', e.target.value)
                      }
                      className="modern-select"
                    >
                      <option value="usn">УСН - Упрощенная сис...</option>
                      <option value="osn">
                        ОСН - Общая система налогообложения
                      </option>
                      <option value="patent">Патентная система</option>
                      <option value="envd">
                        ЕНВД - Единый налог на вмененный доход
                      </option>
                    </select>
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="form-section-title">
                    <i className="fas fa-chart-bar"></i>
                    Объем работы
                  </h3>
                  <div className="input-grid">
                    <div className="input-card">
                      <label className="input-label">
                        <i className="fas fa-file-alt"></i>
                        Документов в месяц
                      </label>
                      <div className="input-wrapper">
                        <input
                          type="range"
                          min="1"
                          max="200"
                          value={displayDocuments}
                          onChange={handleDocumentsChange}
                          onMouseUp={handleDocumentsChangeEnd}
                          onTouchEnd={handleDocumentsChangeEnd}
                          className="range-input"
                        />
                        <div className="input-value">
                          {displayDocuments} шт.
                        </div>
                      </div>
                    </div>

                    <div className="input-card">
                      <label className="input-label">
                        <i className="fas fa-users"></i>
                        Количество сотрудников
                      </label>
                      <div className="input-wrapper">
                        <input
                          type="range"
                          min="0"
                          max="50"
                          value={displayEmployees}
                          onChange={handleEmployeesChange}
                          onMouseUp={handleEmployeesChangeEnd}
                          onTouchEnd={handleEmployeesChangeEnd}
                          className="range-input"
                        />
                        <div className="input-value">
                          {displayEmployees} чел.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="form-section-title">
                    <i className="fas fa-plus-circle"></i>
                    Дополнительные услуги
                  </h3>
                  <div className="checkbox-grid">
                    <label className="checkbox-card">
                      <input
                        type="checkbox"
                        checked={formData.needPayroll}
                        onChange={(e) =>
                          handleInputChange('needPayroll', e.target.checked)
                        }
                      />
                      <div className="checkbox-card-content">
                        <div className="checkbox-icon">👥</div>
                        <div className="checkbox-title">Кадровый учет</div>
                        <div className="checkbox-desc">
                          Ведение кадрового делопроизводства
                        </div>
                      </div>
                    </label>

                    <label className="checkbox-card">
                      <input
                        type="checkbox"
                        checked={formData.needReports}
                        onChange={(e) =>
                          handleInputChange('needReports', e.target.checked)
                        }
                      />
                      <div className="checkbox-card-content">
                        <div className="checkbox-icon">📋</div>
                        <div className="checkbox-title">Доп. отчетность</div>
                        <div className="checkbox-desc">
                          Специальные виды отчетности
                        </div>
                      </div>
                    </label>

                    <label className="checkbox-card">
                      <input
                        type="checkbox"
                        checked={formData.needConsulting}
                        onChange={(e) =>
                          handleInputChange('needConsulting', e.target.checked)
                        }
                      />
                      <div className="checkbox-card-content">
                        <div className="checkbox-icon">💡</div>
                        <div className="checkbox-title">Консультации</div>
                        <div className="checkbox-desc">
                          Консультационная поддержка
                        </div>
                      </div>
                    </label>

                    <label className="checkbox-card">
                      <input
                        type="checkbox"
                        checked={formData.needRegistration}
                        onChange={(e) =>
                          handleInputChange('needRegistration', e.target.checked)
                        }
                      />
                      <div className="checkbox-card-content">
                        <div className="checkbox-icon">📝</div>
                        <div className="checkbox-title">Регистрация</div>
                        <div className="checkbox-desc">
                          Помощь в регистрации бизнеса
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="calculator-result-section">
              {result && (
                <div ref={resultRef} className="calculator-result">
                  <div className="result-header">
                    <h3>
                      <i className="fas fa-receipt"></i>
                      Расчет стоимости
                    </h3>
                    {isCalculating && (
                      <div className="calculating-spinner">⏳</div>
                    )}
                  </div>

                  <div className="price-breakdown">
                    {result.services.map((service, index) => (
                      <div key={index} className="price-item">
                        <div className="service-info">
                          <span className="service-icon">{service.icon}</span>
                          <span className="service-name">{service.name}</span>
                        </div>
                        <span className="service-price">
                          <AnimatedPrice value={service.price} duration={0.8} />
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="price-summary">
                    <div className="total-price">
                      <div className="total-label">Итого в месяц:</div>
                      <div ref={priceRef} className="total-amount">
                        <AnimatedPrice value={result.monthlyPrice} duration={1.2} />
                      </div>
                    </div>

                    <div className="yearly-option">
                      <div className="yearly-price">
                        <span>Годовой тариф:</span>
                        <span className="original-price">
                          <AnimatedPrice value={result.yearlyPrice} duration={1.5} />
                        </span>
                        <span className="discounted-price">
                          <AnimatedPrice
                            value={result.yearlyPrice - result.yearlyDiscount}
                            duration={1.8}
                          />
                        </span>
                      </div>
                      <div className="savings">
                        Экономия: <AnimatedPrice value={result.yearlyDiscount} duration={2} />
                      </div>
                    </div>
                  </div>

                  <div className="result-actions">
                    <button className="btn-primary btn-large btn-glow">
                      <i className="fas fa-handshake"></i>
                      Заказать услугу
                    </button>
                    <button className="btn-secondary btn-large">
                      <i className="fas fa-phone"></i>
                      Получить консультацию
                    </button>
                  </div>

                  <p className="price-note">
                    <i className="fas fa-info-circle"></i>
                    Окончательная стоимость определяется после анализа специфики
                    вашего бизнеса
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default React.memo(Calculator)
