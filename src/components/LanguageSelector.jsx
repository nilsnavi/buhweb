import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  
  const languages = [
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
  ];
  
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
  
  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    localStorage.setItem('language', languageCode);
  };
  
  return (
    <div className="language-selector">
      <button
        className="language-button"
        onClick={() => {
          const dropdown = document.querySelector('.language-dropdown');
          dropdown.classList.toggle('show');
        }}
        aria-label="Выбрать язык"
      >
        <span className="language-flag">{currentLanguage.flag}</span>
        <span className="language-name">{currentLanguage.name}</span>
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          className="language-arrow"
        >
          <path
            d="M1 1.5L6 6.5L11 1.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      
      <div className="language-dropdown">
        {languages.map((language) => (
          <button
            key={language.code}
            className={`language-option ${language.code === i18n.language ? 'active' : ''}`}
            onClick={() => {
              handleLanguageChange(language.code);
              document.querySelector('.language-dropdown').classList.remove('show');
            }}
            aria-label={`Выбрать ${language.name}`}
          >
            <span className="language-flag">{language.flag}</span>
            <span className="language-name">{language.name}</span>
            {language.code === i18n.language && (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="language-check"
              >
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
