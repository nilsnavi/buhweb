import React, { useState, useContext, useEffect } from 'react';
import { COMPANY_INFO } from '../constants';
import { NotificationContext } from './NotificationSystem.jsx';
import { sanitizeFormData } from '../utils/sanitize.js';
import { validateForm } from '../utils/validation.js';
import { generateCSRFToken, addCSRFHeader } from '../utils/csrf.js';
import { rateLimit } from '../utils/rateLimit.js';
import { checkSecureConnection } from '../utils/https.js';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addNotification } = useContext(NotificationContext);

  // Проверка безопасности и генерация CSRF токена
  useEffect(() => {
    checkSecureConnection();
    generateCSRFToken();
  }, []);

  // Валидация полей
  const validateField = (field, value) => {
    const newErrors = { ...errors };

    switch (field) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Имя обязательно для заполнения';
        } else if (value.trim().length < 2) {
          newErrors.name = 'Имя должно содержать минимум 2 символа';
        } else {
          delete newErrors.name;
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          newErrors.email = 'Email обязателен для заполнения';
        } else if (!emailRegex.test(value)) {
          newErrors.email = 'Введите корректный email';
        } else {
          delete newErrors.email;
        }
        break;

      case 'phone':
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        if (!value.trim()) {
          newErrors.phone = 'Телефон обязателен для заполнения';
        } else if (!phoneRegex.test(value)) {
          newErrors.phone = 'Введите корректный номер телефона';
        } else {
          delete newErrors.phone;
        }
        break;

      case 'message':
        if (value.trim() && value.trim().length < 10) {
          newErrors.message = 'Сообщение должно содержать минимум 10 символов';
        } else {
          delete newErrors.message;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Валидация при вводе
    if (errors[field]) {
      validateField(field, value);
    }
  };

  const handleBlur = field => {
    validateField(field, formData[field]);
  };

  const validateAllFields = () => {
    const fields = ['name', 'email', 'phone', 'message'];
    let isValid = true;

    fields.forEach(field => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });

    return isValid;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Rate limiting проверка
    const rateLimitResult = rateLimit('contact');
    if (!rateLimitResult.allowed) {
      addNotification(rateLimitResult.message, 'error');
      return;
    }

    // Валидация формы
    const isFormValid = validateAllFields();
    if (!isFormValid) {
      addNotification('Пожалуйста, исправьте ошибки в форме', 'error');
      return;
    }

    // Санитизация данных
    const sanitizedData = sanitizeFormData(formData);

    setIsSubmitting(true);

    try {
      // Отправка на сервер с CSRF защитой
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...addCSRFHeader()
        },
        body: JSON.stringify(sanitizedData)
      });

      if (!response.ok) {
        throw new Error('Ошибка сервера');
      }

      const result = await response.json();

      addNotification(
        'Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.',
        'success',
      );

      // Очистка формы
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
      addNotification('Произошла ошибка при отправке заявки. Попробуйте позже.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id='contact'
      className='contact'
    >
      <div className='container'>
        <h2 className='section-title'>Свяжитесь с нами</h2>
        <div className='contact-content'>
          <div className='contact-info'>
            <h3>Контактная информация</h3>
            <div className='contact-item'>
              <span className='contact-icon'>📞</span>
              <div>
                <strong>Телефон:</strong>
                <p>
                  <a href={`tel:${COMPANY_INFO.phone}`}>{COMPANY_INFO.phone}</a>
                </p>
              </div>
            </div>
            <div className='contact-item'>
              <span className='contact-icon'>✉️</span>
              <div>
                <strong>Email:</strong>
                <p>
                  <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>
                </p>
              </div>
            </div>
            <div className='contact-item'>
              <span className='contact-icon'>📍</span>
              <div>
                <strong>Адрес:</strong>
                <p>{COMPANY_INFO.address}</p>
              </div>
            </div>
            <div className='contact-item'>
              <span className='contact-icon'>🕐</span>
              <div>
                <strong>Режим работы:</strong>
                <p>{COMPANY_INFO.workingHours}</p>
              </div>
            </div>
          </div>

          <div className='contact-form'>
            <h3>Оставьте заявку</h3>
            <form
              onSubmit={handleSubmit}
              noValidate
            >
              <div className='form-group'>
                <label htmlFor='name' className='form-label'>
                  Ваше имя *
                </label>
                <input
                  id='name'
                  type='text'
                  placeholder='Ваше имя *'
                  value={formData.name}
                  onChange={e => handleInputChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  aria-required='true'
                />
                {errors.name && (
                  <span
                    id='name-error'
                    className='error-message'
                  >
                    {errors.name}
                  </span>
                )}
              </div>

              <div className='form-group'>
                <label htmlFor='email' className='form-label'>
                  Email *
                </label>
                <input
                  id='email'
                  type='email'
                  placeholder='Email *'
                  value={formData.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  aria-required='true'
                />
                {errors.email && (
                  <span
                    id='email-error'
                    className='error-message'
                  >
                    {errors.email}
                  </span>
                )}
              </div>

              <div className='form-group'>
                <label htmlFor='phone' className='form-label'>
                  Телефон *
                </label>
                <input
                  id='phone'
                  type='tel'
                  placeholder='Телефон *'
                  value={formData.phone}
                  onChange={e => handleInputChange('phone', e.target.value)}
                  onBlur={() => handleBlur('phone')}
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  aria-required='true'
                />
                {errors.phone && (
                  <span
                    id='phone-error'
                    className='error-message'
                  >
                    {errors.phone}
                  </span>
                )}
              </div>

              <div className='form-group'>
                <label htmlFor='message' className='form-label'>
                  Ваше сообщение
                </label>
                <textarea
                  id='message'
                  placeholder='Ваше сообщение'
                  value={formData.message}
                  onChange={e => handleInputChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  rows='4'
                  className={`form-textarea ${errors.message ? 'error' : ''}`}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <span
                    id='message-error'
                    className='error-message'
                  >
                    {errors.message}
                  </span>
                )}
              </div>

              <button
                type='submit'
                className='btn-primary btn-large btn-glow'
                disabled={isSubmitting}
                aria-label={isSubmitting ? 'Идет отправка формы' : 'Отправить заявку на консультацию'}
                aria-busy={isSubmitting}
              >
                <i className='fas fa-paper-plane' aria-hidden='true'></i>
                {isSubmitting ? 'Отправляем...' : 'Отправить заявку'}
              </button>

              <p className='form-note'>* Обязательные поля для заполнения</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
