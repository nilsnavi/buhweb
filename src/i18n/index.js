import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Переводы для русского языка
const ru = {
  translation: {
    // Общие
    'loading': 'Загрузка...',
    'error': 'Ошибка',
    'success': 'Успех',
    'warning': 'Предупреждение',
    'info': 'Информация',
    'close': 'Закрыть',
    'cancel': 'Отмена',
    'save': 'Сохранить',
    'edit': 'Редактировать',
    'delete': 'Удалить',
    'add': 'Добавить',
    'search': 'Поиск',
    'filter': 'Фильтр',
    'sort': 'Сортировка',
    'more': 'Ещё',
    'less': 'Меньше',
    'back': 'Назад',
    'next': 'Далее',
    'previous': 'Предыдущий',
    'submit': 'Отправить',
    'reset': 'Сброс',
    'clear': 'Очистить',
    'select': 'Выбрать',
    'all': 'Все',
    'none': 'Нет',
    'yes': 'Да',
    'no': 'Нет',
    
    // Навигация
    'nav.home': 'Главная',
    'nav.services': 'Услуги',
    'nav.calculator': 'Калькулятор',
    'nav.pricing': 'Тарифы',
    'nav.reviews': 'Отзывы',
    'nav.faq': 'FAQ',
    'nav.contact': 'Контакты',
    'nav.admin': 'Админ-панель',
    
    // Hero секция
    'hero.title': 'Профессиональные бухгалтерские услуги для ИП и ООО',
    'hero.subtitle': 'Доверьте нам ведение вашего бизнеса и сосредоточьтесь на развитии. Гарантируем качество и соблюдение всех сроков.',
    'hero.features.experience': 'Опыт более 5 лет',
    'hero.features.clients': 'Более 20 довольных клиентов',
    'hero.features.quality': 'Гарантия качества',
    'hero.consultation': 'Получить консультацию',
    'hero.calculate': 'Рассчитать стоимость',
    
    // Услуги
    'services.title': 'Наши услуги',
    'services.accounting.title': 'Ведение бухучета',
    'services.accounting.description': 'Полное ведение бухгалтерского учета для ИП и ООО с подготовкой всей отчетности',
    'services.accounting.price': 'от 7 600₽',
    'services.accounting.period': 'в месяц',
    'services.tax.title': 'Налоговый учет',
    'services.tax.description': 'Ведение налогового учета и своевременная подача деклараций',
    'services.tax.price': 'от 5 400₽',
    'services.tax.period': 'в месяц',
    'services.payroll.title': 'Кадровый учет',
    'services.payroll.description': 'Ведение кадрового делопроизводства и расчет заработной платы',
    'services.payroll.price': 'от 3 200₽',
    'services.payroll.period': 'в месяц',
    
    // Преимущества
    'features.title': 'Наши преимущества',
    'features.experience.title': 'Опытные специалисты',
    'features.experience.description': 'Команда сертифицированных бухгалтеров с опытом работы более 15 лет',
    'features.guarantee.title': 'Гарантия качества',
    'features.guarantee.description': 'Несем полную материальную ответственность за свою работу',
    'features.remote.title': 'Удаленная работа',
    'features.remote.description': 'Работаем с клиентами по всей России через современные технологии',
    
    // Калькулятор
    'calculator.title': 'Калькулятор стоимости',
    'calculator.subtitle': 'Получите предварительный расчет стоимости ведения бухгалтерского учета',
    'calculator.entityType': 'Тип организации',
    'calculator.ip': 'ИП',
    'calculator.ip.desc': 'Индивидуальный предприниматель',
    'calculator.ooo': 'ООО',
    'calculator.ooo.desc': 'Общество с ограниченной ответственностью',
    'calculator.zao': 'ЗАО',
    'calculator.zao.desc': 'Закрытое акционерное общество',
    'calculator.taxSystem': 'Налоговая система',
    'calculator.tax.usn': 'УСН - Упрощенная система налогообложения',
    'calculator.tax.osn': 'ОСН - Общая система налогообложения',
    'calculator.tax.patent': 'Патентная система',
    'calculator.tax.envd': 'ЕНВД - Единый налог на вмененный доход',
    'calculator.volume': 'Объем работы',
    'calculator.documents': 'Документов в месяц',
    'calculator.employees': 'Количество сотрудников',
    'calculator.additional': 'Дополнительные услуги',
    'calculator.payroll': 'Кадровый учет',
    'calculator.payroll.desc': 'Ведение кадрового делопроизводства',
    'calculator.reports': 'Доп. отчетность',
    'calculator.reports.desc': 'Специальные виды отчетности',
    'calculator.consulting': 'Консультации',
    'calculator.consulting.desc': 'Консультационная поддержка',
    'calculator.registration': 'Регистрация',
    'calculator.registration.desc': 'Помощь в регистрации бизнеса',
    'calculator.result.title': 'Расчет стоимости',
    'calculator.result.monthly': 'Итого в месяц:',
    'calculator.result.yearly': 'Годовой тариф:',
    'calculator.result.savings': 'Экономия:',
    'calculator.result.order': 'Заказать услугу',
    'calculator.result.consultation': 'Получить консультацию',
    'calculator.result.note': 'Окончательная стоимость определяется после анализа специфики вашего бизнеса',
    
    // Тарифы
    'pricing.title': 'Тарифы и цены',
    'pricing.subtitle': 'Выберите подходящий тариф для вашего бизнеса',
    'pricing.basic': 'Базовый',
    'pricing.basic.desc': 'Для малого бизнеса с небольшим количеством операций',
    'pricing.standard': 'Стандартный',
    'pricing.standard.desc': 'Оптимальное решение для среднего бизнеса',
    'pricing.popular': 'Популярный',
    'pricing.select': 'Выбрать тариф',
    'pricing.note': 'Все тарифы включают бесплатную консультацию и настройку учета',
    
    // Отзывы
    'reviews.title': 'Отзывы клиентов',
    
    // FAQ
    'faq.title': 'Часто задаваемые вопросы',
    
    // Контакты
    'contact.title': 'Свяжитесь с нами',
    'contact.info': 'Контактная информация',
    'contact.phone': 'Телефон',
    'contact.email': 'Email',
    'contact.address': 'Адрес',
    'contact.hours': 'Режим работы',
    'contact.form.title': 'Оставьте заявку',
    'contact.form.name': 'Ваше имя *',
    'contact.form.email': 'Email *',
    'contact.form.phone': 'Телефон *',
    'contact.form.message': 'Ваше сообщение',
    'contact.form.submit': 'Отправить заявку',
    'contact.form.sending': 'Отправка...',
    'contact.form.required': '* Обязательные поля для заполнения',
    'contact.success': 'Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.',
    'contact.error': 'Произошла ошибка при отправке заявки. Попробуйте позже.',
    
    // Футер
    'footer.rights': 'Все права защищены',
    
    // Тема
    'theme.light': 'Светлая тема',
    'theme.dark': 'Темная тема',
    'theme.toggle': 'Переключить на {theme} тему',
    
    // Язык
    'lang.ru': 'Русский',
    'lang.en': 'English',
    'lang.de': 'Deutsch',
    'lang.fr': 'Français',
  }
};

// Переводы для английского языка
const en = {
  translation: {
    // Общие
    'loading': 'Loading...',
    'error': 'Error',
    'success': 'Success',
    'warning': 'Warning',
    'info': 'Information',
    'close': 'Close',
    'cancel': 'Cancel',
    'save': 'Save',
    'edit': 'Edit',
    'delete': 'Delete',
    'add': 'Add',
    'search': 'Search',
    'filter': 'Filter',
    'sort': 'Sort',
    'more': 'More',
    'less': 'Less',
    'back': 'Back',
    'next': 'Next',
    'previous': 'Previous',
    'submit': 'Submit',
    'reset': 'Reset',
    'clear': 'Clear',
    'select': 'Select',
    'all': 'All',
    'none': 'None',
    'yes': 'Yes',
    'no': 'No',
    
    // Навигация
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.calculator': 'Calculator',
    'nav.pricing': 'Pricing',
    'nav.reviews': 'Reviews',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin Panel',
    
    // Hero секция
    'hero.title': 'Professional Accounting Services for Sole Proprietors and LLCs',
    'hero.subtitle': 'Trust us with your business management and focus on growth. We guarantee quality and compliance with all deadlines.',
    'hero.features.experience': 'Over 5 years of experience',
    'hero.features.clients': 'More than 20 satisfied clients',
    'hero.features.quality': 'Quality guarantee',
    'hero.consultation': 'Get Consultation',
    'hero.calculate': 'Calculate Cost',
    
    // Услуги
    'services.title': 'Our Services',
    'services.accounting.title': 'Accounting Services',
    'services.accounting.description': 'Full accounting services for sole proprietors and LLCs with complete reporting',
    'services.accounting.price': 'from 7,600₽',
    'services.accounting.period': 'per month',
    'services.tax.title': 'Tax Accounting',
    'services.tax.description': 'Tax accounting and timely filing of tax returns',
    'services.tax.price': 'from 5,400₽',
    'services.tax.period': 'per month',
    'services.payroll.title': 'Payroll Services',
    'services.payroll.description': 'Personnel records management and payroll calculation',
    'services.payroll.price': 'from 3,200₽',
    'services.payroll.period': 'per month',
    
    // Преимущества
    'features.title': 'Our Advantages',
    'features.experience.title': 'Experienced Specialists',
    'features.experience.description': 'Team of certified accountants with over 15 years of experience',
    'features.guarantee.title': 'Quality Guarantee',
    'features.guarantee.description': 'We bear full financial responsibility for our work',
    'features.remote.title': 'Remote Work',
    'features.remote.description': 'We work with clients across Russia using modern technologies',
    
    // Калькулятор
    'calculator.title': 'Cost Calculator',
    'calculator.subtitle': 'Get a preliminary calculation of accounting services cost',
    'calculator.entityType': 'Entity Type',
    'calculator.ip': 'Sole Proprietor',
    'calculator.ip.desc': 'Individual Entrepreneur',
    'calculator.ooo': 'LLC',
    'calculator.ooo.desc': 'Limited Liability Company',
    'calculator.zao': 'JSC',
    'calculator.zao.desc': 'Joint-Stock Company',
    'calculator.taxSystem': 'Tax System',
    'calculator.tax.usn': 'STS - Simplified Tax System',
    'calculator.tax.osn': 'GTS - General Tax System',
    'calculator.tax.patent': 'Patent System',
    'calculator.tax.envd': 'UTII - Unified Tax on Imputed Income',
    'calculator.volume': 'Work Volume',
    'calculator.documents': 'Documents per month',
    'calculator.employees': 'Number of Employees',
    'calculator.additional': 'Additional Services',
    'calculator.payroll': 'Payroll Services',
    'calculator.payroll.desc': 'Personnel records management',
    'calculator.reports': 'Additional Reporting',
    'calculator.reports.desc': 'Special types of reporting',
    'calculator.consulting': 'Consultations',
    'calculator.consulting.desc': 'Consulting support',
    'calculator.registration': 'Registration',
    'calculator.registration.desc': 'Business registration assistance',
    'calculator.result.title': 'Cost Calculation',
    'calculator.result.monthly': 'Total per month:',
    'calculator.result.yearly': 'Annual plan:',
    'calculator.result.savings': 'Savings:',
    'calculator.result.order': 'Order Service',
    'calculator.result.consultation': 'Get Consultation',
    'calculator.result.note': 'Final cost is determined after analyzing your business specifics',
    
    // Тарифы
    'pricing.title': 'Pricing',
    'pricing.subtitle': 'Choose the right plan for your business',
    'pricing.basic': 'Basic',
    'pricing.basic.desc': 'For small businesses with low transaction volume',
    'pricing.standard': 'Standard',
    'pricing.standard.desc': 'Optimal solution for medium businesses',
    'pricing.popular': 'Popular',
    'pricing.select': 'Select Plan',
    'pricing.note': 'All plans include free consultation and setup',
    
    // Отзывы
    'reviews.title': 'Customer Reviews',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    
    // Контакты
    'contact.title': 'Contact Us',
    'contact.info': 'Contact Information',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.address': 'Address',
    'contact.hours': 'Working Hours',
    'contact.form.title': 'Leave a Request',
    'contact.form.name': 'Your Name *',
    'contact.form.email': 'Email *',
    'contact.form.phone': 'Phone *',
    'contact.form.message': 'Your Message',
    'contact.form.submit': 'Send Request',
    'contact.form.sending': 'Sending...',
    'contact.form.required': '* Required fields',
    'contact.success': 'Thank you! Your request has been successfully sent. We will contact you shortly.',
    'contact.error': 'An error occurred while sending the request. Please try again later.',
    
    // Футер
    'footer.rights': 'All rights reserved',
    
    // Тема
    'theme.light': 'Light Theme',
    'theme.dark': 'Dark Theme',
    'theme.toggle': 'Switch to {theme} theme',
    
    // Язык
    'lang.ru': 'Russian',
    'lang.en': 'English',
    'lang.de': 'German',
    'lang.fr': 'French',
  }
};

// Переводы для немецкого языка
const de = {
  translation: {
    // Общие
    'loading': 'Laden...',
    'error': 'Fehler',
    'success': 'Erfolg',
    'warning': 'Warnung',
    'info': 'Information',
    'close': 'Schließen',
    'cancel': 'Abbrechen',
    'save': 'Speichern',
    'edit': 'Bearbeiten',
    'delete': 'Löschen',
    'add': 'Hinzufügen',
    'search': 'Suchen',
    'filter': 'Filter',
    'sort': 'Sortieren',
    'more': 'Mehr',
    'less': 'Weniger',
    'back': 'Zurück',
    'next': 'Weiter',
    'previous': 'Vorherige',
    'submit': 'Absenden',
    'reset': 'Zurücksetzen',
    'clear': 'Löschen',
    'select': 'Auswählen',
    'all': 'Alle',
    'none': 'Keine',
    'yes': 'Ja',
    'no': 'Nein',
    
    // Навигация
    'nav.home': 'Startseite',
    'nav.services': 'Dienstleistungen',
    'nav.calculator': 'Rechner',
    'nav.pricing': 'Preise',
    'nav.reviews': 'Bewertungen',
    'nav.faq': 'FAQ',
    'nav.contact': 'Kontakt',
    'nav.admin': 'Admin-Panel',
    
    // Hero секция
    'hero.title': 'Professionelle Buchhaltungsdienstleistungen für Einzelunternehmer und GmbHs',
    'hero.subtitle': 'Vertrauen Sie uns die Geschäftsführung an und konzentrieren Sie sich auf das Wachstum. Wir garantieren Qualität und Einhaltung aller Fristen.',
    'hero.features.experience': 'Über 5 Jahre Erfahrung',
    'hero.features.clients': 'Mehr als 20 zufriedene Kunden',
    'hero.features.quality': 'Qualitätsgarantie',
    'hero.consultation': 'Beratung erhalten',
    'hero.calculate': 'Kosten berechnen',
    
    // Услуги
    'services.title': 'Unsere Dienstleistungen',
    'services.accounting.title': 'Buchhaltungsdienstleistungen',
    'services.accounting.description': 'Vollständige Buchhaltungsdienstleistungen für Einzelunternehmer und GmbHs mit vollständiger Berichterstattung',
    'services.accounting.price': 'ab 7.600₽',
    'services.accounting.period': 'pro Monat',
    'services.tax.title': 'Steuerbuchhaltung',
    'services.tax.description': 'Steuerbuchhaltung und rechtzeitige Einreichung von Steuererklärungen',
    'services.tax.price': 'ab 5.400₽',
    'services.tax.period': 'pro Monat',
    'services.payroll.title': 'Lohnabrechnung',
    'services.payroll.description': 'Personalverwaltung und Lohnberechnung',
    'services.payroll.price': 'ab 3.200₽',
    'services.payroll.period': 'pro Monat',
    
    // Преимущества
    'features.title': 'Unsere Vorteile',
    'features.experience.title': 'Erfahrene Spezialisten',
    'features.experience.description': 'Team von zertifizierten Buchhaltern mit über 15 Jahren Erfahrung',
    'features.guarantee.title': 'Qualitätsgarantie',
    'features.guarantee.description': 'Wir übernehmen die volle finanzielle Verantwortung für unsere Arbeit',
    'features.remote.title': 'Fernarbeit',
    'features.remote.description': 'Wir arbeiten mit Kunden in ganz Russland mit modernen Technologien',
    
    // Калькулятор
    'calculator.title': 'Kostenrechner',
    'calculator.subtitle': 'Erhalten Sie eine vorläufige Berechnung der Buchhaltungskosten',
    'calculator.entityType': 'Unternehmensart',
    'calculator.ip': 'Einzelunternehmer',
    'calculator.ip.desc': 'Individueller Unternehmer',
    'calculator.ooo': 'GmbH',
    'calculator.ooo.desc': 'Gesellschaft mit beschränkter Haftung',
    'calculator.zao': 'AG',
    'calculator.zao.desc': 'Aktiengesellschaft',
    'calculator.taxSystem': 'Steuersystem',
    'calculator.tax.usn': 'VSS - Vereinfachtes Steuersystem',
    'calculator.tax.osn': 'GSS - Allgemeines Steuersystem',
    'calculator.tax.patent': 'Patentsystem',
    'calculator.tax.envd': 'EStV - Einheitliche Steuer auf geschätztes Einkommen',
    'calculator.volume': 'Arbeitsvolumen',
    'calculator.documents': 'Dokumente pro Monat',
    'calculator.employees': 'Anzahl der Mitarbeiter',
    'calculator.additional': 'Zusätzliche Dienstleistungen',
    'calculator.payroll': 'Lohnabrechnung',
    'calculator.payroll.desc': 'Personalverwaltung',
    'calculator.reports': 'Zusätzliche Berichterstattung',
    'calculator.reports.desc': 'Spezielle Arten der Berichterstattung',
    'calculator.consulting': 'Beratungen',
    'calculator.consulting.desc': 'Beratungsunterstützung',
    'calculator.registration': 'Registrierung',
    'calculator.registration.desc': 'Hilfe bei der Unternehmensregistrierung',
    'calculator.result.title': 'Kostenberechnung',
    'calculator.result.monthly': 'Gesamt pro Monat:',
    'calculator.result.yearly': 'Jahresplan:',
    'calculator.result.savings': 'Ersparnis:',
    'calculator.result.order': 'Dienstleistung bestellen',
    'calculator.result.consultation': 'Beratung erhalten',
    'calculator.result.note': 'Die Endkosten werden nach Analyse Ihrer Geschäftsspezifika bestimmt',
    
    // Тарифы
    'pricing.title': 'Preise',
    'pricing.subtitle': 'Wählen Sie den passenden Tarif für Ihr Unternehmen',
    'pricing.basic': 'Basic',
    'pricing.basic.desc': 'Für kleine Unternehmen mit geringem Transaktionsvolumen',
    'pricing.standard': 'Standard',
    'pricing.standard.desc': 'Optimale Lösung für mittelständische Unternehmen',
    'pricing.popular': 'Beliebt',
    'pricing.select': 'Tarif auswählen',
    'pricing.note': 'Alle Tarife enthalten kostenlose Beratung und Einrichtung',
    
    // Отзывы
    'reviews.title': 'Kundenbewertungen',
    
    // FAQ
    'faq.title': 'Häufig gestellte Fragen',
    
    // Контакты
    'contact.title': 'Kontaktieren Sie uns',
    'contact.info': 'Kontaktinformationen',
    'contact.phone': 'Telefon',
    'contact.email': 'E-Mail',
    'contact.address': 'Adresse',
    'contact.hours': 'Öffnungszeiten',
    'contact.form.title': 'Anfrage senden',
    'contact.form.name': 'Ihr Name *',
    'contact.form.email': 'E-Mail *',
    'contact.form.phone': 'Telefon *',
    'contact.form.message': 'Ihre Nachricht',
    'contact.form.submit': 'Anfrage senden',
    'contact.form.sending': 'Wird gesendet...',
    'contact.form.required': '* Pflichtfelder',
    'contact.success': 'Vielen Dank! Ihre Anfrage wurde erfolgreich gesendet. Wir werden uns bald mit Ihnen in Verbindung setzen.',
    'contact.error': 'Beim Senden der Anfrage ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.',
    
    // Футер
    'footer.rights': 'Alle Rechte vorbehalten',
    
    // Тема
    'theme.light': 'Helles Thema',
    'theme.dark': 'Dunkles Thema',
    'theme.toggle': 'Zu {theme} Thema wechseln',
    
    // Язык
    'lang.ru': 'Russisch',
    'lang.en': 'Englisch',
    'lang.de': 'Deutsch',
    'lang.fr': 'Französisch',
  }
};

// Переводы для французского языка
const fr = {
  translation: {
    // Общие
    'loading': 'Chargement...',
    'error': 'Erreur',
    'success': 'Succès',
    'warning': 'Avertissement',
    'info': 'Information',
    'close': 'Fermer',
    'cancel': 'Annuler',
    'save': 'Enregistrer',
    'edit': 'Modifier',
    'delete': 'Supprimer',
    'add': 'Ajouter',
    'search': 'Rechercher',
    'filter': 'Filtrer',
    'sort': 'Trier',
    'more': 'Plus',
    'less': 'Moins',
    'back': 'Retour',
    'next': 'Suivant',
    'previous': 'Précédent',
    'submit': 'Soumettre',
    'reset': 'Réinitialiser',
    'clear': 'Effacer',
    'select': 'Sélectionner',
    'all': 'Tout',
    'none': 'Aucun',
    'yes': 'Oui',
    'no': 'Non',
    
    // Навигация
    'nav.home': 'Accueil',
    'nav.services': 'Services',
    'nav.calculator': 'Calculateur',
    'nav.pricing': 'Tarifs',
    'nav.reviews': 'Avis',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.admin': 'Panneau d\'administration',
    
    // Hero секция
    'hero.title': 'Services de comptabilité professionnelle pour les entrepreneurs individuels et les SARL',
    'hero.subtitle': 'Confiez-nous la gestion de votre entreprise et concentrez-vous sur la croissance. Nous garantissons la qualité et le respect de tous les délais.',
    'hero.features.experience': 'Plus de 5 ans d\'expérience',
    'hero.features.clients': 'Plus de 20 clients satisfaits',
    'hero.features.quality': 'Garantie de qualité',
    'hero.consultation': 'Obtenir une consultation',
    'hero.calculate': 'Calculer le coût',
    
    // Услуги
    'services.title': 'Nos Services',
    'services.accounting.title': 'Services Comptables',
    'services.accounting.description': 'Services comptables complets pour les entrepreneurs individuels et les SARL avec reporting complet',
    'services.accounting.price': 'à partir de 7 600₽',
    'services.accounting.period': 'par mois',
    'services.tax.title': 'Comptabilité Fiscale',
    'services.tax.description': 'Comptabilité fiscale et dépôt timely des déclarations fiscales',
    'services.tax.price': 'à partir de 5 400₽',
    'services.tax.period': 'par mois',
    'services.payroll.title': 'Services Paie',
    'services.payroll.description': 'Gestion du personnel et calcul des salaires',
    'services.payroll.price': 'à partir de 3 200₽',
    'services.payroll.period': 'par mois',
    
    // Преимущества
    'features.title': 'Nos Avantages',
    'features.experience.title': 'Spécialistes Expérimentés',
    'features.experience.description': 'Équipe de comptables certifiés avec plus de 15 ans d\'expérience',
    'features.guarantee.title': 'Garantie de Qualité',
    'features.guarantee.description': 'Nous assumons l\'entière responsabilité financière de notre travail',
    'features.remote.title': 'Travail à Distance',
    'features.remote.description': 'Nous travaillons avec des clients dans toute la Russie utilisant des technologies modernes',
    
    // Калькулятор
    'calculator.title': 'Calculateur de Coût',
    'calculator.subtitle': 'Obtenez un calcul préliminaire du coût des services comptables',
    'calculator.entityType': 'Type d\'Entité',
    'calculator.ip': 'Entrepreneur Individuel',
    'calculator.ip.desc': 'Entrepreneur Individuel',
    'calculator.ooo': 'SARL',
    'calculator.ooo.desc': 'Société à Responsabilité Limitée',
    'calculator.zao': 'SA',
    'calculator.zao.desc': 'Société Anonyme',
    'calculator.taxSystem': 'Système Fiscal',
    'calculator.tax.usn': 'STS - Système Fiscal Simplifié',
    'calculator.tax.osn': 'GTS - Système Fiscal Général',
    'calculator.tax.patent': 'Système de Brevet',
    'calculator.tax.envd': 'UTII - Impôt Unique sur le Revenu Imputé',
    'calculator.volume': 'Volume de Travail',
    'calculator.documents': 'Documents par mois',
    'calculator.employees': 'Nombre d\'Employés',
    'calculator.additional': 'Services Additionnels',
    'calculator.payroll': 'Services Paie',
    'calculator.payroll.desc': 'Gestion du personnel',
    'calculator.reports': 'Reporting Additionnel',
    'calculator.reports.desc': 'Types spéciaux de reporting',
    'calculator.consulting': 'Consultations',
    'calculator.consulting.desc': 'Support consultatif',
    'calculator.registration': 'Enregistrement',
    'calculator.registration.desc': 'Assistance à l\'enregistrement d\'entreprise',
    'calculator.result.title': 'Calcul des Coûts',
    'calculator.result.monthly': 'Total par mois :',
    'calculator.result.yearly': 'Plan annuel :',
    'calculator.result.savings': 'Économies :',
    'calculator.result.order': 'Commander le Service',
    'calculator.result.consultation': 'Obtenir une Consultation',
    'calculator.result.note': 'Le coût final est déterminé après analyse des spécificités de votre entreprise',
    
    // Тарифы
    'pricing.title': 'Tarifs',
    'pricing.subtitle': 'Choisissez le plan adapté à votre entreprise',
    'pricing.basic': 'Basic',
    'pricing.basic.desc': 'Pour les petites entreprises avec faible volume de transactions',
    'pricing.standard': 'Standard',
    'pricing.standard.desc': 'Solution optimale pour les entreprises moyennes',
    'pricing.popular': 'Populaire',
    'pricing.select': 'Sélectionner le Plan',
    'pricing.note': 'Tous les plans incluent consultation gratuite et configuration',
    
    // Отзывы
    'reviews.title': 'Avis Clients',
    
    // FAQ
    'faq.title': 'Questions Fréquemment Posées',
    
    // Контакты
    'contact.title': 'Contactez-nous',
    'contact.info': 'Informations de Contact',
    'contact.phone': 'Téléphone',
    'contact.email': 'Email',
    'contact.address': 'Adresse',
    'contact.hours': 'Heures d\'Ouverture',
    'contact.form.title': 'Laisser une Demande',
    'contact.form.name': 'Votre Nom *',
    'contact.form.email': 'Email *',
    'contact.form.phone': 'Téléphone *',
    'contact.form.message': 'Votre Message',
    'contact.form.submit': 'Envoyer la Demande',
    'contact.form.sending': 'Envoi en cours...',
    'contact.form.required': '* Champs obligatoires',
    'contact.success': 'Merci ! Votre demande a été envoyée avec succès. Nous vous contacterons prochainement.',
    'contact.error': 'Une erreur s\'est produite lors de l\'envoi de la demande. Veuillez réessayer plus tard.',
    
    // Футер
    'footer.rights': 'Tous droits réservés',
    
    // Тема
    'theme.light': 'Thème Clair',
    'theme.dark': 'Thème Sombre',
    'theme.toggle': 'Basculer vers le thème {theme}',
    
    // Язык
    'lang.ru': 'Russe',
    'lang.en': 'Anglais',
    'lang.de': 'Allemand',
    'lang.fr': 'Français',
  }
};

// Ресурсы
const resources = {
  ru: ru,
  en: en,
  de: de,
  fr: fr,
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru', // Язык по умолчанию
    fallbackLng: 'ru',
    
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // React уже экранирует
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    
    react: {
      useSuspense: false,
    },
  });

export default i18n;
