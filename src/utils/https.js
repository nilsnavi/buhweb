// HTTPS редирект middleware для production
export const httpsRedirect = () => {
  if (process.env.NODE_ENV === 'production' && window.location.protocol === 'http:') {
    window.location.href = window.location.href.replace('http:', 'https:');
  }
};

// Проверка HTTPS соединения
export const isHTTPS = () => {
  return window.location.protocol === 'https:' || 
         window.location.hostname === 'localhost' || 
         window.location.hostname === '127.0.0.1';
};

// Получение базового URL с правильным протоколом
export const getBaseURL = () => {
  const protocol = isHTTPS() ? 'https:' : 'http:';
  return `${protocol}//${window.location.host}`;
};

// Проверка безопасного соединения
export const checkSecureConnection = () => {
  if (process.env.NODE_ENV === 'production' && !isHTTPS()) {
    console.warn('Небезопасное соединение! Рекомендуется использовать HTTPS.');
    return false;
  }
  return true;
};

// Автоматический HTTPS редирект при загрузке страницы
if (process.env.NODE_ENV === 'production') {
  httpsRedirect();
}
