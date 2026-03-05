import React from 'react';
import { Helmet } from 'react-helmet-async';

const CalculatorSEO = () => {
  return (
    <Helmet>
      <title>Калькулятор стоимости бухгалтерских услуг - Бухучет Онлайн</title>
      <meta name="description" content="Рассчитайте стоимость бухгалтерских услуг для вашего бизнеса. Учитываем тип организации, налоговую систему, количество сотрудников и документов." />
      <meta name="keywords" content="калькулятор бухгалтерских услуг, стоимость ведения учета, расчет цен бухгалтерия, цены на бухгалтерские услуги" />
      <link rel="canonical" href="https://buhuchetonline.ru/#calculator" />
      
      {/* Open Graph */}
      <meta property="og:title" content="Калькулятор стоимости бухгалтерских услуг" />
      <meta property="og:description" content="Рассчитайте стоимость бухгалтерских услуг онлайн. Быстро, точно, бесплатно." />
      <meta property="og:url" content="https://buhuchetonline.ru/#calculator" />
      
      {/* Twitter */}
      <meta name="twitter:title" content="Калькулятор стоимости бухгалтерских услуг" />
      <meta name="twitter:description" content="Рассчитайте стоимость бухгалтерских услуг онлайн. Быстро, точно, бесплатно." />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Калькулятор бухгалтерских услуг",
          "description": "Онлайн-калькулятор для расчета стоимости бухгалтерских услуг",
          "url": "https://buhuchetonline.ru/#calculator",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "priceCurrency": "RUB",
            "priceRange": "3000-50000"
          }
        })}
      </script>
    </Helmet>
  );
};

export default CalculatorSEO;
