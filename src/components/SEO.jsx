import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'Бухучет Онлайн - Профессиональные бухгалтерские услуги',
  description = 'Профессиональные бухгалтерские услуги для ИП и ООО. Ведение учета, налоги, кадры. Опытные специалисты, гарантия качества.',
  keywords = 'бухгалтерские услуги, ведение учета, налоги, ИП, ООО, бухгалтер онлайн, бухгалтерия',
  canonical = 'https://buhuchetonline.ru',
  type = 'website',
  image = '/og-image.jpg'
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Бухучет Онлайн" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Бухучет Онлайн" />
      <meta property="og:locale" content="ru_RU" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@buhuchetonline" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#2563eb" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      <meta name="application-name" content="Бухучет Онлайн" />
      <meta name="apple-mobile-web-app-title" content="Бухучет Онлайн" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "Бухучет Онлайн",
          "description": description,
          "url": canonical,
          "telephone": "+7 (495) 123-45-67",
          "email": "info@buhuchetonline.ru",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Москва",
            "addressCountry": "RU"
          },
          "openingHours": "Mo-Fr 09:00-18:00 Sa 10:00-16:00",
          "priceRange": "$$",
          "image": image,
          "sameAs": [
            "https://facebook.com/buhuchetonline",
            "https://instagram.com/buhuchetonline",
            "https://telegram.me/buhuchetonline"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
