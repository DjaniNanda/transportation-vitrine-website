import React from 'react';
import { Wrench, Car, Gauge, Zap, Settings, Shield, Truck, Package, Globe, CheckCircle, Star } from 'lucide-react';
import { siteConfig, ServiceItem } from '../config/siteConfig';
import './Services.css';

const ICONS: Record<ServiceItem['icon'], React.ReactNode> = {
  wrench: <Wrench />,
  car: <Car />,
  gauge: <Gauge />,
  zap: <Zap />,
  settings: <Settings />,
  shield: <Shield />,
  truck: <Truck />,
  package: <Package />,
  globe: <Globe />,
};

const Services: React.FC = () => {
  const { services, contact } = siteConfig;

  // Cards per row on desktop: the configured maximum, but never more than the
  // number of cards (so 2 cards fill the row instead of leaving a gap).
  const cols = Math.max(1, Math.min(services.columns, services.items.length));

  const openWhatsApp = () => {
    const url = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="services" className="services">
      <div className="services-background">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>

      <div className="container">
        <div className="services-header fade-in-up">
          <div className="services-badge">
            <Settings className="badge-icon" />
            <span>{services.badge}</span>
          </div>

          <p className="services-subtitle">
            {services.subtitle}
          </p>
          <div className="title-underline"></div>
        </div>

        <div
          className="services-grid"
          data-cols={cols}
          style={
            {
              '--service-cols': cols,
              '--service-cols-tablet': Math.min(cols, 2),
            } as React.CSSProperties
          }
        >
          {services.items.map((service, index) => (
            <div
              key={index}
              className="service-card fade-in-up"
              style={{ animationDelay: `${(index % cols) * 0.1}s` }}
            >
              <div
                className="card-background"
                style={service.image ? { backgroundImage: `url(${service.image})` } : undefined}
              ></div>
              <div className="card-overlay"></div>

              <div className="service-content">
                <div className="service-header">
                  <div className="service-icon">
                    {ICONS[service.icon]}
                  </div>
                  {service.rating !== undefined && (
                    <div className="service-rating">
                      <Star className="star-icon" />
                      <span>{service.rating}</span>
                    </div>
                  )}
                </div>

                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>

                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="feature-item">
                      <CheckCircle className="check-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card-glow"></div>
            </div>
          ))}
        </div>

        <div className="services-cta">
          <div className="cta-content">
            <h3>{services.ctaTitle}</h3>
            <p>{services.ctaDescription}</p>
            <button onClick={openWhatsApp} className="cta-button">
              {services.ctaButton}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;