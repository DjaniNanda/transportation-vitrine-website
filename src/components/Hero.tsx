import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowRight, ChevronRight, Truck, CircleDot, Car } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import './Hero.css';

/* Copy for the quick-contact card. Move into siteConfig if you prefer. */
const quickCard = {
  title: 'Moving or shipping something?',
  text: 'Tell us what you need and we’ll reply on WhatsApp.',
};

/* One entry per division. `target` is the section id each link scrolls to:
   point them at separate ids (e.g. 'moving', 'tires', 'vehicles') if your
   Services section has them. */
const quickServices = [
  { label: 'Moving', detail: 'Residential & commercial', Icon: Truck, target: 'services' },
  { label: 'Tire export', detail: 'New & used tires', Icon: CircleDot, target: 'services' },
  { label: 'Vehicle export', detail: 'New & used cars', Icon: Car, target: 'services' },
];

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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    // Read the live navbar height (77px desktop, 60px phones) from CSS
    const navHeight =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-height'),
        10
      ) || 77;

    const top = element.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const { hero, business } = siteConfig;

  return (
    <>
      <section id="accueil" className="hero">
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

        <div className="hero-inner">
          <div className={`hero-content ${isVisible ? 'animate-in' : ''}`}>
            <h1 className="hero-title">
              <span>{hero.titleLine1}</span>
              <span>{hero.titleLine2}</span>
              <span>{hero.titleLine3}</span>
            </h1>

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
          </div>
        </div>
      </section>

      {/* Quick-contact card: overlaps the bottom of the hero, so the page
          visibly continues below it. Lives outside the hero because the
          hero clips its overflow. */}
      <div className="hero-card-wrap">
        <aside className="hero-card" aria-label="Contact and services">
          <div className="hero-card-intro">
            <p className="hero-card-title">{quickCard.title}</p>
            <p className="hero-card-text">{quickCard.text}</p>
            <button
              type="button"
              onClick={openWhatsApp}
              className="btn btn-whatsapp"
              aria-label={hero.primaryCta}
            >
              <MessageCircle aria-hidden="true" />
              <span>{hero.primaryCta}</span>
              <ArrowRight className="btn-arrow" aria-hidden="true" />
              <div className="btn-shine"></div>
            </button>
          </div>

          <ul className="hero-card-services">
            {quickServices.map(({ label, detail, Icon, target }) => (
              <li key={label}>
                <button
                  type="button"
                  className="hero-service"
                  onClick={() => scrollToSection(target)}
                >
                  <span className="hero-service-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="hero-service-text">
                    <strong>{label}</strong>
                    <small>{detail}</small>
                  </span>
                  <ChevronRight className="hero-service-chevron" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
};

export default Hero;