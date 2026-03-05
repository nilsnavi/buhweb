// Хранилище для rate limiting
const rateLimitStore = new Map();

// Конфигурация rate limiting
export const rateLimitConfig = {
  // Контактная форма: 5 запросов в час
  contact: {
    windowMs: 60 * 60 * 1000, // 1 час
    max: 5,
    message: 'Слишком много запросов. Попробуйте позже.'
  },
  // Калькулятор: 100 запросов в час
  calculator: {
    windowMs: 60 * 60 * 1000, // 1 час
    max: 100,
    message: 'Слишком много расчетов. Попробуйте позже.'
  },
  // Общие API запросы: 1000 в час
  api: {
    windowMs: 60 * 60 * 1000, // 1 час
    max: 1000,
    message: 'Слишком много запросов к API.'
  }
};

// Функция для получения IP адреса (упрощенная версия)
const getClientIdentifier = () => {
  // В реальном приложении здесь может быть IP адрес или fingerprint
  return localStorage.getItem('clientId') || generateClientId();
};

const generateClientId = () => {
  const clientId = Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  localStorage.setItem('clientId', clientId);
  return clientId;
};

// Основная функция rate limiting
export const rateLimit = (type) => {
  const config = rateLimitConfig[type];
  if (!config) {
    throw new Error(`Unknown rate limit type: ${type}`);
  }
  
  const clientId = getClientIdentifier();
  const key = `${type}:${clientId}`;
  const now = Date.now();
  
  // Получаем или создаем запись для клиента
  let record = rateLimitStore.get(key);
  if (!record) {
    record = {
      count: 0,
      resetTime: now + config.windowMs
    };
    rateLimitStore.set(key, record);
  }
  
  // Проверяем, не истекло ли время окна
  if (now > record.resetTime) {
    record.count = 0;
    record.resetTime = now + config.windowMs;
  }
  
  // Увеличиваем счетчик
  record.count++;
  
  // Проверяем лимит
  if (record.count > config.max) {
    const resetIn = Math.ceil((record.resetTime - now) / 1000 / 60); // в минутах
    return {
      allowed: false,
      message: `${config.message} Попробуйте через ${resetIn} минут.`,
      resetIn
    };
  }
  
  return {
    allowed: true,
    remaining: config.max - record.count,
    resetIn: Math.ceil((record.resetTime - now) / 1000 / 60)
  };
};

// Middleware для rate limiting (для использования с fetch)
export const rateLimitMiddleware = (type) => {
  return (url, options = {}) => {
    const result = rateLimit(type);
    
    if (!result.allowed) {
      return Promise.reject(new Error(result.message));
    }
    
    // Добавляем заголовки с информацией о rate limiting
    const headers = {
      ...options.headers,
      'X-RateLimit-Remaining': result.remaining.toString(),
      'X-RateLimit-Reset': result.resetIn.toString()
    };
    
    return fetch(url, { ...options, headers });
  };
};

// Очистка старых записей (вызывать периодически)
export const cleanupRateLimitStore = () => {
  const now = Date.now();
  
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key);
    }
  }
};

// Автоматическая очистка каждые 5 минут
setInterval(cleanupRateLimitStore, 5 * 60 * 1000);
