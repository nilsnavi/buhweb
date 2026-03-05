import DOMPurify from 'dompurify';

// Базовая санитизация HTML
export const sanitizeHTML = (html) => {
  if (typeof html !== 'string') return '';
  
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'i', 'b',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li',
      'a', 'span', 'div'
    ],
    ALLOWED_ATTR: ['href', 'title', 'class', 'id'],
    ALLOW_DATA_ATTR: false
  });
};

// Санитизация текста (удаление HTML)
export const sanitizeText = (text) => {
  if (typeof text !== 'string') return '';
  
  return DOMPurify.sanitize(text, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });
};

// Санитизация URL
export const sanitizeURL = (url) => {
  if (typeof url !== 'string') return '';
  
  try {
    const parsed = new URL(url);
    // Разрешаем только http и https протоколы
    if (['http:', 'https:'].includes(parsed.protocol)) {
      return parsed.toString();
    }
  } catch (e) {
    // Если URL невалидный, возвращаем пустую строку
    return '';
  }
  
  return '';
};

// Санитизация email
export const sanitizeEmail = (email) => {
  if (typeof email !== 'string') return '';
  
  // Базовая валидация email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return '';
  
  return sanitizeText(email.toLowerCase().trim());
};

// Санитизация телефона
export const sanitizePhone = (phone) => {
  if (typeof phone !== 'string') return '';
  
  // Оставляем только цифры, +, -, пробелы и скобки
  return phone.replace(/[^\d\+\-\s\(\)]/g, '').trim();
};

// Санитизация имени
export const sanitizeName = (name) => {
  if (typeof name !== 'string') return '';
  
  // Оставляем только буквы, пробелы, дефисы и апострофы
  return name.replace(/[^a-zA-Zа-яА-ЯёЁ\s\-\']/g, '').trim();
};

// Общая функция санитизации данных формы
export const sanitizeFormData = (data) => {
  const sanitized = {};
  
  Object.keys(data).forEach(key => {
    const value = data[key];
    
    switch (key) {
      case 'email':
        sanitized[key] = sanitizeEmail(value);
        break;
      case 'phone':
        sanitized[key] = sanitizePhone(value);
        break;
      case 'name':
        sanitized[key] = sanitizeName(value);
        break;
      case 'message':
      case 'description':
        sanitized[key] = sanitizeHTML(value);
        break;
      default:
        sanitized[key] = sanitizeText(value);
    }
  });
  
  return sanitized;
};
