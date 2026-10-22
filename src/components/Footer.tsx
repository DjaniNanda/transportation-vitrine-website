import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import { useSectionNav } from '../hooks/useSectionNav';
import { openWhatsApp } from '../utils/whatsapp';
import './Footer.css';

const Footer: React.FC = () => {
  const { business, contact, nav, services, footer } = siteConfig;

  const scrollToSection = useSectionNav();

  const socialLinks = [
    { key: 'facebook', href: contact.socials?.facebook, icon: <Facebook />, label: 'Facebook' },
    { key: 'instagram', href: contact.socials?.instagram, icon: <Instagram />, label: 'Instagram' },
    { key: 'twitter', href: contact.socials?.twitter, icon: <Twitter />, label: 'Twitter' },
    { key: 'linkedin', href: contact.socials?.linkedin, icon: <Linkedin />, label: 'LinkedIn' },
  ].filter((s) => s.href);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img
            className="footer-logo-img"
            src={business.logo}
            alt=""
            width={900}
            height={361}
            loading="lazy"
            decoding="async"
          />
          <h2 className="footer-logo-name">{business.name}</h2>
          <p className="footer-tagline">{business.tagline}</p>
        </div>

        <div className="footer-content">
          <div className="footer-column">
            <h3>Our Services</h3>
            <ul>
              {services.items.map((service) => (
                <li key={service.title}>
                  <Link to={`/services/${service.slug}`}>{service.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column contact-column">
            <h3>Contact Information</h3>
            <ul>
              <li>
                <MapPin />
                <span>
                  {contact.address.line1}, {contact.address.line2}
                </span>
              </li>
              {contact.phones[0] && (
                <li>
                  <a href={contact.phones[0].href}>
                    <Phone />
                    <span>{contact.phones[0].number}</span>
                  </a>
                </li>
              )}
              <li>
                <a href={`mailto:${contact.email}`}>
                  <Mail />
                  <span>{contact.email}</span>
                </a>
              </li>
              <li>
                <Clock />
                <span>
                  {contact.hours
                    .filter((h) => !h.closed)
                    .map((h) => `${h.day} ${h.time}`)
                    .join(' · ')}
                </span>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Connect With Us</h3>
            {socialLinks.length > 0 && (
              <div className="social-icons">
                {socialLinks.map((s) => (
                  <a href={s.href} key={s.key} aria-label={s.label} target="_blank" rel="noreferrer">
                    {s.icon}
                  </a>
                ))}
              </div>
            )}
            <button className="footer-whatsapp" onClick={() => openWhatsApp()}>
              
              <span>Chat on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      <div className="copyright">
        <div className="copyright-container">
          <p>
            Copyright &copy; {new Date().getFullYear()} {footer.copyrightName}. All rights reserved.
          </p>
          <div className="footer-links">
            {footer.legalLinks.map((link) => (
              <span key={link}>{link}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;