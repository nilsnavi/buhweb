// Конфигурация валидации
export const validationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Zа-яА-ЯёЁ\s\-\']+$/,
    message: 'Имя должно содержать только буквы, пробелы, дефисы и апострофы'
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Введите корректный email адрес'
  },
  phone: {
    required: true,
    pattern: /^[\d\s\-\+\(\)]{10,}$/,
    message: 'Введите корректный номер телефона (минимум 10 цифр)'
  },
  message: {
    required: false,
    minLength: 10,
    maxLength: 1000,
    message: 'Сообщение должно содержать от 10 до 1000 символов'
  },
  company: {
    required: false,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Zа-яА-ЯёЁ0-9\s\-\.\&\"']+$/,
    message: 'Название компании содержит недопустимые символы'
  }
};

// Валидация одного поля
export const validateField = (fieldName, value) => {
  const rule = validationRules[fieldName];
  if (!rule) return { isValid: true, error: '' };
  
  // Проверка на обязательность
  if (rule.required && (!value || value.trim() === '')) {
    return { isValid: false, error: 'Поле обязательно для заполнения' };
  }
  
  // Если поле не обязательное и пустое - считаем валидным
  if (!rule.required && (!value || value.trim() === '')) {
    return { isValid: true, error: '' };
  }
  
  // Проверка минимальной длины
  if (rule.minLength && value.length < rule.minLength) {
    return { 
      isValid: false, 
      error: `Минимальная длина: ${rule.minLength} символов` 
    };
  }
  
  // Проверка максимальной длины
  if (rule.maxLength && value.length > rule.maxLength) {
    return { 
      isValid: false, 
      error: `Максимальная длина: ${rule.maxLength} символов` 
    };
  }
  
  // Проверка по паттерну
  if (rule.pattern && !rule.pattern.test(value)) {
    return { isValid: false, error: rule.message };
  }
  
  return { isValid: true, error: '' };
};

// Валидация всей формы
export const validateForm = (formData) => {
  const errors = {};
  let isValid = true;
  
  Object.keys(formData).forEach(fieldName => {
    const result = validateField(fieldName, formData[fieldName]);
    if (!result.isValid) {
      errors[fieldName] = result.error;
      isValid = false;
    }
  });
  
  return { isValid, errors };
};

// Валидация калькулятора
export const validateCalculatorData = (data) => {
  const errors = {};
  
  // Валидация типа организации
  if (!data.entityType || !['ip', 'ooo', 'zao'].includes(data.entityType)) {
    errors.entityType = 'Выберите корректный тип организации';
  }
  
  // Валидация налоговой системы
  if (!data.taxSystem || !['usn', 'osn', 'patent', 'envd'].includes(data.taxSystem)) {
    errors.taxSystem = 'Выберите корректную налоговую систему';
  }
  
  // Валидация количества документов
  const docs = parseInt(data.documents);
  if (isNaN(docs) || docs < 1 || docs > 1000) {
    errors.documents = 'Количество документов должно быть от 1 до 1000';
  }
  
  // Валидация количества сотрудников
  const employees = parseInt(data.employees);
  if (isNaN(employees) || employees < 0 || employees > 1000) {
    errors.employees = 'Количество сотрудников должно быть от 0 до 1000';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
