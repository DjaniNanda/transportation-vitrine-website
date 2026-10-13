import React from 'react';
import { Building2 } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import './About.css';

const About: React.FC = () => {
  const { about, contact, business } = siteConfig;

  const openWhatsApp = () => {
    const url = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="about" className="about-section">
      <div className="about-content">
        <div className="about-text">
          <div className="section-badge">
            <span>{about.badge}</span>
          </div>

          <h1>{about.title}</h1>

          <p>
            {about.intro.split(about.introHighlight).map((part, idx, arr) => (
              <React.Fragment key={idx}>
                {part}
                {idx < arr.length - 1 && <strong>{about.introHighlight}</strong>}
              </React.Fragment>
            ))}
          </p>

          <p>{about.story.text}</p>
        </div>

        <div className="about-image">
          <img id="one" src={about.image} alt={`${business.name} team`} />
        </div>
      </div>

      <div className="cta-container">
        <button className="book-now-button" onClick={openWhatsApp}>
          {about.ctaButton}
        </button>
      </div>
    </section>
  );
};

export default About;