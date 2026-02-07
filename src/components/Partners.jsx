import React from 'react';
import './Partners.css';

const PARTNERS = [
  {
    id: 1,
    name: 'Т БАНК',
    logo: '🏦',
    description: 'Крупнейший частный банк России с полным спектром финансовых услуг',
    website: 'https://www.tbank.ru',
    products: [
      {
        name: 'РКО',
        description: 'Расчетно-кассовое обслуживание',
        link: 'https://www.tbank.ru/business/rko/form?utm_medium=ptr.act&utm_campaign=sme.partners&partnerId=5-348L6ELKP&agentId=5-F48BQEXK&agentSsoId=16501ffc-3fbf-4fc6-99e6-638e6728cbec&utm_source=partner_rko_a_sme'
      },
      {
        name: 'Аренда торгового эквайринга',
        description: 'Платежные терминалы для бизнеса',
        link: 'https://www.tbank.ru/business/acquiring/form/rent?utm_medium=ptr.act&utm_campaign=sme.partners&partnerId=5-348L6ELKP&agentId=5-F48BQEXK&agentSsoId=16501ffc-3fbf-4fc6-99e6-638e6728cbec&utm_source=partner_rko_a_sme'
      },
      {
        name: 'Зарплатный проект',
        description: 'Автоматизированная система выплаты зарплат',
        link: 'https://www.tbank.ru/corporate/payout/salary?utm_medium=ptr.act&utm_campaign=sme.partners&partnerId=5-348L6ELKP&agentId=5-F48BQEXK&agentSsoId=16501ffc-3fbf-4fc6-99e6-638e6728cbec&utm_source=partner_rko_a_sme'
      },
      {
        name: 'Регистрация ИП',
        description: 'Регистрация индивидуального предпринимателя',
        link: 'https://www.tbank.ru/business/registration-ip/?utm_medium=ptr.act&utm_campaign=sme.partners&partnerId=5-348L6ELKP&agentId=5-F48BQEXK&agentSsoId=16501ffc-3fbf-4fc6-99e6-638e6728cbec&utm_source=partner_rko_a_sme'
      },
      {
        name: 'Регистрация ООО',
        description: 'Регистрация общества с ограниченной ответственностью',
        link: 'https://www.tbank.ru/business/registration-ooo/form?utm_medium=ptr.act&utm_campaign=sme.partners&partnerId=5-348L6ELKP&agentId=5-F48BQEXK&agentSsoId=16501ffc-3fbf-4fc6-99e6-638e6728cbec&utm_source=partner_rko_a_sme'
      },
      {
        name: 'Оборотный кредит',
        description: 'Кредит на пополнение оборотных средств',
        link: 'https://www.tbank.ru/business/turnover/form?utm_medium=ptr.act&utm_campaign=sme.partners&partnerId=5-348L6ELKP&agentId=5-F48BQEXK&agentSsoId=16501ffc-3fbf-4fc6-99e6-638e6728cbec&utm_source=partner_rko_a_sme'
      },
      {
        name: 'ВЭД',
        description: 'Внешний экономический деятельность и отчетность',
        link: 'https://www.tbank.ru/corporate/currency/form/partners?utm_medium=ptr.act&utm_campaign=sme.partners&partnerId=5-348L6ELKP&agentId=5-F48BQEXK&agentSsoId=16501ffc-3fbf-4fc6-99e6-638e6728cbec&utm_source=partner_rko_a_sme'
      }
    ]
  },
  {
    id: 2,
    name: 'Контур',
    logo: '📋',
    description: 'Экосистема цифровых сервисов для бизнеса и бухгалтерии',
    website: 'https://kontur.ru',
    products: [
      {
        name: 'Логистика. Электронные ТН',
        description: 'Электронная транспортная накладная',
        link: 'https://kontur.ru/logistika/price?p=w17669'
      },
      {
        name: 'Диадок. ЭДО',
        description: 'Электронный документооборот',
        link: 'https://kontur.ru/diadoc/features?p=w17669'
      },
      {
        name: 'Все возможности Контура',
        description: 'Полный спектр сервисов для бизнеса',
        link: 'https://kontur.ru?p=w17669'
      }
    ]
  }
];

const Partners = () => {
  return (
    <section className="partners" id="partners">
      <div className="container">
        <div className="partners-header">
          <h2 className="section-title">Наши партнёры</h2>
          <p className="section-subtitle">
            Работаем с ведущими финансовыми и технологическими компаниями России
          </p>
        </div>

        <div className="partners-grid">
          {PARTNERS.map((partner) => (
            <div key={partner.id} className="partner-card">
              <div className="partner-header">
                <div className="partner-logo">{partner.logo}</div>
                <h3 className="partner-name">{partner.name}</h3>
                <a 
                  href={partner.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="partner-website"
                >
                  {partner.website}
                </a>
              </div>
              
              <p className="partner-description">{partner.description}</p>
              
              <div className="partner-products">
                <h4>Продукты и услуги:</h4>
                <div className="products-list">
                  {partner.products.map((product, index) => (
                    <div key={index} className="product-item">
                      <div className="product-info">
                        <h5 className="product-name">{product.name}</h5>
                        <p className="product-description">{product.description}</p>
                      </div>
                      <a 
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="product-link"
                      >
                        <span>Подробнее</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 17L17 7M17 7L7 17" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
