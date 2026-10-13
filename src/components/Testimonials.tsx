import React from 'react';
import { MessageCircle, Star, Quote } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import './Testimonials.css';

/**
 * Stacked review cards ("simple overlap").
 *
 * Pure CSS — no scroll handlers. Each card is `position: sticky` (see
 * Testimonials.css) so it pins near the top of the screen while the next
 * card slides up and covers it. A .stack-spacer between cards provides the
 * scroll distance; see the CSS comments for why spacers are used instead of
 * margins.
 */
const ReviewStack: React.FC = () => {
  const { reviews } = siteConfig.testimonials;

  return (
    <div className="reviews-stack-wrapper">
      <div className="stack-cards">
        {reviews.map((review, index) => (
          <React.Fragment key={review.name + index}>
            <div
              className="stack-card"
              style={{
                top: `calc(var(--stack-top) + ${index} * var(--stack-offset))`,
                zIndex: index + 1,
              }}
            >
              <Quote className="stack-card-quote-icon" />
              <div className="stack-card-rating" aria-label={`${review.rating} out of 5 stars`}>
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="stack-card-star" />
                ))}
              </div>
              <p className="stack-card-text">"{review.text}"</p>
              <div className="stack-card-author">
                <div className="stack-card-avatar">{review.avatar}</div>
                <div>
                  <p className="stack-card-name">{review.name}</p>
                  <p className="stack-card-subtitle">{review.subtitle}</p>
                </div>
              </div>
            </div>
            <div className="stack-spacer" aria-hidden="true" />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const { testimonials, contact } = siteConfig;

  const openGoogleReview = () => {
    if (!testimonials.googleReviewUrl) {
      // Not configured yet — fall back to WhatsApp so the button still does something useful.
      const url = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappMessage)}`;
      window.open(url, '_blank');
      return;
    }
    window.open(testimonials.googleReviewUrl, '_blank');
  };

  return (
    <section id="reviews" className="testimonials-section">
      <div className="testimonials-container">
        {/* Header */}
        <div className="testimonials-header">
          <div className="header-badge">
            <span className="badge-text">{testimonials.badge}</span>
          </div>

          <h2 className="main-title">
            {testimonials.title}
          </h2>
        </div>

        {/* Stacked review cards — content comes from siteConfig.testimonials.reviews */}
        <ReviewStack />

        {/* CTA Section */}
        <div className="reviews-cta-section">
          <div className="reviews-cta-container">
            <h3 className="reviews-cta-title">
              {testimonials.ctaTitle}
            </h3>
            <p className="reviews-cta-description">
              {testimonials.ctaDescription}
            </p>

            <button onClick={openGoogleReview} className="reviews-cta-button">
              {testimonials.ctaButton}
              <div className="button-overlay"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;