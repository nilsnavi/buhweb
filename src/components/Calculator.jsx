import React, { useState, useEffect } from 'react'

const Calculator = () => {
  const [formData, setFormData] = useState({
    entityType: 'zao',
    taxSystem: 'usn',
    employees: 0,
    documents: 10,
    needPayroll: false,
    needReports: true,
    needConsulting: false,
    needRegistration: false,
  })

  const [result, setResult] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Автоматический пересчет при изменении данных
  useEffect(() => {
    calculatePrice()
  }, [formData])

  const calculatePrice = () => {
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
  }

  return (
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
                        value={formData.documents}
                        onChange={(e) =>
                          handleInputChange(
                            'documents',
                            parseInt(e.target.value)
                          )
                        }
                        className="range-input"
                      />
                      <div className="input-value">
                        {formData.documents} шт.
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
                        value={formData.employees}
                        onChange={(e) =>
                          handleInputChange(
                            'employees',
                            parseInt(e.target.value)
                          )
                        }
                        className="range-input"
                      />
                      <div className="input-value">
                        {formData.employees} чел.
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
              <div className="calculator-result">
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
                        {service.price.toLocaleString()} ₽
                      </span>
                    </div>
                  ))}
                </div>

                <div className="price-summary">
                  <div className="total-price">
                    <div className="total-label">Итого в месяц:</div>
                    <div className="total-amount">
                      {result.monthlyPrice.toLocaleString()} ₽
                    </div>
                  </div>

                  <div className="yearly-option">
                    <div className="yearly-price">
                      <span>Годовой тариф:</span>
                      <span className="original-price">
                        {result.yearlyPrice.toLocaleString()} ₽
                      </span>
                      <span className="discounted-price">
                        {(
                          result.yearlyPrice - result.yearlyDiscount
                        ).toLocaleString()}{' '}
                        ₽
                      </span>
                    </div>
                    <div className="savings">
                      Экономия: {result.yearlyDiscount.toLocaleString()} ₽
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
  )
}

export default Calculator
