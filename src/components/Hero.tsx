import React, { useState, useEffect } from 'react';
import { MessageCircle, Star, ArrowRight, CheckCircle, ChevronDown } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import './Hero.css';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const openWhatsApp = () => {
    const url = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(siteConfig.contact.whatsappMessage)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      const headerHeight = 77; // matches .navbar height in Header.css
      const elementPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const { hero, business } = siteConfig;

  return (
    <section id="accueil" className="hero">
      {/* Enhanced background with multiple overlays */}
      <div className="hero-background">
        <img
          src={hero.backgroundImage}
          alt={`${business.name} - ${business.tagline}`}
          className="hero-image"
          loading="eager"
          width="1920"
          height="1080"
        />
        <div className="hero-overlay"></div>
      </div>

      <div className="container">
        <div className={`hero-content ${isVisible ? 'animate-in' : ''}`}>
          {/* Enhanced badge */}
          <div className="hero-badge">
            <div className="badge-icon-wrapper">
              <Star className="badge-icon" aria-hidden="true" />
              <Star className="badge-icon badge-icon-ping" aria-hidden="true" />
            </div>
            <span>{hero.badge}</span>
          </div>

          {/* Enhanced title with gradient text */}
          <h1 className="hero-title">
            <span className="title-gradient">{hero.titleLine1}</span>
            <br />
            <span className="title-white">{hero.titleLine2}</span>
            <br />
            <span className="title-accent">{hero.titleLine3}</span>
          </h1>

          {/* Enhanced description */}
          <p className="hero-description">
            {hero.description.split(hero.descriptionHighlight).map((part, idx, arr) => (
              <React.Fragment key={idx}>
                {part}
                {idx < arr.length - 1 && (
                  <span className="location-highlight">{hero.descriptionHighlight}</span>
                )}
              </React.Fragment>
            ))}
          </p>

          {/* Enhanced buttons */}
          <div className="hero-buttons">
            <button
              onClick={openWhatsApp}
              className="btn btn-whatsapp"
              aria-label={hero.primaryCta}
            >
              <MessageCircle aria-hidden="true" />
              <span>{hero.primaryCta}</span>
              <ArrowRight className="btn-arrow" aria-hidden="true" />
              <div className="btn-shine"></div>
            </button>
            <button
              onClick={scrollToServices}
              className="btn btn-service"
              aria-label={hero.secondaryCta}
            >
              <span>{hero.secondaryCta}</span>
              <ArrowRight className="btn-arrow" aria-hidden="true" />
            </button>
          </div>

          {/* Trust indicators */}
          <div className="trust-indicators">
            {hero.trustBadges.map((badge) => (
              <div className="trust-item" key={badge}>
                <CheckCircle className="trust-icon" aria-hidden="true" />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue: signals that the page continues below */}
      <button
        type="button"
        className="scroll-cue"
        onClick={scrollToServices}
        aria-label="Découvrir nos services"
      >
        <ChevronDown aria-hidden="true" />
      </button>
    </section>
  );
};

export default Hero;