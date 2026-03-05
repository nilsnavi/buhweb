// CSP заголовки для production
export const cspHeaders = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://api.example.com https://www.google-analytics.com",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests"
  ].join('; '),
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-XSS-Protection': '1; mode=block'
};

// Функция для установки CSP заголовков (для использования с серверами)
export const setCSPHeaders = (response) => {
  Object.entries(cspHeaders).forEach(([header, value]) => {
    response.setHeader(header, value);
  });
};

// Проверка CSP для inline скриптов
export const checkInlineScriptAllowed = () => {
  const meta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
  if (meta) {
    const csp = meta.getAttribute('content');
    return csp && csp.includes("'unsafe-inline'");
  }
  return true;
};

// Генерация nonce для inline скриптов
export const generateNonce = () => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// CSP отчет об нарушениях
export const reportCSPViolation = (violation) => {
  if (process.env.NODE_ENV === 'production') {
    // Отправка отчета на сервер или в аналитику
    console.warn('CSP Violation:', violation);
    
    // Здесь можно добавить отправку на сервер
    // fetch('/api/csp-report', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(violation)
    // });
  }
};

// Обработчик CSP нарушений
window.addEventListener('securitypolicyviolation', (event) => {
  reportCSPViolation({
    violatedDirective: event.violatedDirective,
    effectiveDirective: event.effectiveDirective,
    blockedURI: event.blockedURI,
    sourceFile: event.sourceFile,
    lineNumber: event.lineNumber,
    columnNumber: event.columnNumber,
    timeStamp: event.timeStamp
  });
});
