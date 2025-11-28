import React from 'react'
import { REVIEWS } from '../constants'

const Reviews = () => {
  return (
    <section id="reviews" className="reviews">
      <div className="container">
        <h2 className="section-title">Отзывы клиентов</h2>
        <div className="reviews-grid">
          {REVIEWS.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="reviewer-avatar">{review.avatar}</div>
                <div className="reviewer-info">
                  <h4 className="reviewer-name">{review.name}</h4>
                  <p className="reviewer-company">{review.company}</p>
                </div>
                <div className="review-rating">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="star">
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
              <p className="review-text">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Reviews
