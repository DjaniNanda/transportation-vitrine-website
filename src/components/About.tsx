import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Clock, Gauge, Handshake, ArrowRight } from 'lucide-react';
import { siteConfig, AboutValue } from '../config/siteConfig';
import { openWhatsApp } from '../utils/whatsapp';
import TeamCarousel from './TeamCarousel';
import './About.css';

const VALUE_ICONS: Record<AboutValue['icon'], React.ReactNode> = {
  shield: <ShieldCheck aria-hidden="true" />,
  clock: <Clock aria-hidden="true" />,
  gauge: <Gauge aria-hidden="true" />,
  handshake: <Handshake aria-hidden="true" />,
};

const About: React.FC = () => {
  const { about, services } = siteConfig;

  return (
    <section id="about" className="about-section" aria-labelledby="about-heading">
      <div className="section-badge">
        <span>{about.badge}</span>
      </div>

      <div className="about-content">
        <div className="about-text">
          <h2 id="about-heading" className="about-title">{about.title}</h2>

          <p className="about-lead">
            {/* The config text contains a {highlight} placeholder, replaced by the bold phrase */}
            {about.intro.split('{highlight}').map((part, idx, arr) => (
              <React.Fragment key={idx}>
                {part}
                {idx < arr.length - 1 && <strong>{about.introHighlight}</strong>}
              </React.Fragment>
            ))}
          </p>

          {about.overview.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="about-image">
          <TeamCarousel members={about.team} />
        </div>
      </div>


      <div className="cta-container">
        <button type="button" className="book-now-button" onClick={() => openWhatsApp()}>
          {about.ctaButton}
        </button>
      </div>
    </section>
  );
};

export default About;
