import Cookies from 'js-cookie';

// Генерация CSRF токена
export const generateCSRFToken = () => {
  const token = Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  Cookies.set('csrf-token', token, {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: 1 // 1 день
  });
  
  return token;
};

// Получение CSRF токена
export const getCSRFToken = () => {
  return Cookies.get('csrf-token');
};

// Проверка CSRF токена
export const validateCSRFToken = (token) => {
  const storedToken = getCSRFToken();
  return storedToken && token === storedToken;
};

// Удаление CSRF токена
export const removeCSRFToken = () => {
  Cookies.remove('csrf-token');
};

// Добавление CSRF токена к заголовкам
export const addCSRFHeader = (headers = {}) => {
  const token = getCSRFToken();
  if (token) {
    headers['X-CSRF-Token'] = token;
  }
  return headers;
};
