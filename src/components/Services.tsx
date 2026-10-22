import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Wrench, Car, Gauge, Zap, Settings, Shield, Truck, Package, Globe, CheckCircle, ArrowRight,
} from 'lucide-react';
import { siteConfig, ServiceItem } from '../config/siteConfig';
import { openWhatsApp } from '../utils/whatsapp';
import './Services.css';

const ICONS: Record<ServiceItem['icon'], React.ReactNode> = {
  wrench: <Wrench aria-hidden="true" />,
  car: <Car aria-hidden="true" />,
  gauge: <Gauge aria-hidden="true" />,
  zap: <Zap aria-hidden="true" />,
  settings: <Settings aria-hidden="true" />,
  shield: <Shield aria-hidden="true" />,
  truck: <Truck aria-hidden="true" />,
  package: <Package aria-hidden="true" />,
  globe: <Globe aria-hidden="true" />,
};

/** Flips to true once, the first time the element scrolls into view. */
function useRevealOnce<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || revealed) return;

    if (typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [revealed]);

  return [ref, revealed] as const;
}

const Services: React.FC = () => {
  const { services } = siteConfig;
  const [gridRef, revealed] = useRevealOnce<HTMLUListElement>();

  // Cards per row on desktop: the configured maximum, but never more than the
  // number of cards (so 2 cards fill the row instead of leaving a gap).
  const cols = Math.max(1, Math.min(services.columns, services.items.length));

  return (
    <section id="services" className="services" aria-labelledby="services-heading">
      <div className="services-background" aria-hidden="true" />

      <div className="services-container">
        <header className="services-header">
          <div className="services-badge">
            <Settings className="badge-icon" aria-hidden="true" />
            <h2 id="services-heading" className="services-badge-text">
              {services.badge}
            </h2>
          </div>

          <p className="services-subtitle">{services.subtitle}</p>
          <div className="title-underline" aria-hidden="true" />
        </header>

        <ul
          ref={gridRef}
          className="services-grid"
          data-cols={cols}
          data-reveal={revealed ? 'done' : 'pending'}
          style={
            {
              '--service-cols': cols,
              '--service-cols-tablet': Math.min(cols, 2),
            } as React.CSSProperties
          }
        >
          {services.items.map((service, index) => (
            <li
              key={service.title}
              className="service-item"
              style={{ '--i': index % cols } as React.CSSProperties}
            >
              <article className="service-card">
                {service.image && (
                  <img
                    className="card-image"
                    src={service.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <div className="card-overlay" aria-hidden="true" />

                <div className="service-content">
                  <div className="service-header">
                    <div className="service-icon">
                      {ICONS[service.icon] ?? <Settings aria-hidden="true" />}
                    </div>
                  </div>

                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>

                  <ul className="service-features">
                    {service.features.map((feature) => (
                      <li key={feature} className="feature-item">
                        <CheckCircle className="check-icon" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="service-footer">
                    {/* The ::after of this link covers the whole card, so the card is
                        clickable while keeping a single, properly labelled link. */}
                    <Link to={`/services/${service.slug}`} className="service-button service-link">
                      {services.learnMore}
                      <span className="sr-only"> — {service.title}</span>
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="services-cta">
          <div className="cta-content">
            <h3>{services.ctaTitle}</h3>
            <p>{services.ctaDescription}</p>
            <button type="button" onClick={() => openWhatsApp()} className="cta-button">
              {services.ctaButton}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;