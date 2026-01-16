import React from 'react'
import { CERTIFICATES } from '../constants'

const Certificates = () => {
  return (
    <section className="certificates">
      <div className="container">
        <h2 className="section-title">Лицензии и сертификаты</h2>
        <p className="section-subtitle">
          Подтверждение нашей квалификации и надежности
        </p>
        <div className="certificates-grid">
          {CERTIFICATES.map((certificate) => (
            <div key={certificate.id} className="certificate-card">
              <div className="certificate-icon">{certificate.icon}</div>
              <h3 className="certificate-title">{certificate.title}</h3>
              <p className="certificate-description">{certificate.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certificates
