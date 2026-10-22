import React, { useEffect, useRef } from 'react';
import { MessageCircle, Star, Quote } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import './Testimonials.css';

/** Official multicolor Google "G" mark, inline so there is no extra request. */
const GoogleLogo: React.FC = () => (
  <svg className="reviews-cta-icon" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);

/**
 * Stacked review cards.
 *
 * Each card is `position: sticky` (see Testimonials.css) so it pins near the
 * top while the next card slides up and covers it. A light rAF scroll handler
 * writes `--cover` (0 → 1) on each card telling it how much of the NEXT card
 * has arrived; CSS uses that to shrink and dim the card underneath.
 * Skipped entirely when the visitor prefers reduced motion.
 */
const ReviewStack: React.FC = () => {
  const { reviews } = siteConfig.testimonials;
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const cards = cardRefs.current;
      for (let i = 0; i < cards.length - 1; i++) {
        const card = cards[i];
        const next = cards[i + 1];
        if (!card || !next) continue;
        const pinnedTop = parseFloat(getComputedStyle(card).top) || 0;
        const nextTop = next.getBoundingClientRect().top;
        const cover = Math.min(1, Math.max(0, (vh - nextTop) / (vh - pinnedTop)));
        card.style.setProperty('--cover', cover.toFixed(3));
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reviews.length]);

  return (
    <div className="reviews-stack-wrapper" role="list" aria-label="Customer reviews">
      <div className="stack-cards">
        {reviews.map((review, index) => {
          const rating = Math.max(0, Math.min(5, Math.round(review.rating)));
          return (
            <React.Fragment key={review.name + index}>
              <figure
                role="listitem"
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="stack-card"
                style={{
                  top: `calc(var(--stack-top) + ${index} * var(--stack-offset))`,
                  zIndex: index + 1,
                }}
              >
                <div className="stack-card-top">
                  <Quote className="stack-card-quote-icon" aria-hidden="true" />
                </div>

                <div className="stack-card-rating" role="img" aria-label={`${rating} out of 5 stars`}>
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="stack-card-star" aria-hidden="true" />
                  ))}
                </div>

                <blockquote className="stack-card-text">
                  <p>&ldquo;{review.text}&rdquo;</p>
                </blockquote>

                <figcaption className="stack-card-author">
                  <div className="stack-card-avatar" aria-hidden="true">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="stack-card-name">{review.name}</p>
                    <p className="stack-card-subtitle">{review.subtitle}</p>
                  </div>
                </figcaption>
              </figure>
              <div className="stack-spacer" aria-hidden="true" />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const { testimonials, contact } = siteConfig;

  // A real link (not a button + window.open): works with middle-click,
  // long-press, and screen readers announce it as a link.
  // Falls back to WhatsApp until a Google review URL is configured.
  const reviewHref =
    testimonials.googleReviewUrl ||
    `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappMessage)}`;

  return (
    <section id="reviews" className="testimonials-section" aria-labelledby="reviews-title">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <div className="header-badge">
            <MessageCircle className="badge-icon" aria-hidden="true" />
            <span className="badge-text">{testimonials.badge}</span>
          </div>
          <h2 id="reviews-title" className="main-title">
            {testimonials.title}
          </h2>
        </div>

        <ReviewStack />

        <div className="reviews-cta-section">
          <div className="reviews-cta-container">
            <h3 className="reviews-cta-title">{testimonials.ctaTitle}</h3>
            <p className="reviews-cta-description">{testimonials.ctaDescription}</p>

            <a
              href={reviewHref}
              target="_blank"
              rel="noopener noreferrer"
              className="reviews-cta-button"
            >
              <GoogleLogo />
              <span>{testimonials.ctaButton}</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;