import React from 'react';
import { MapPin, Clock, Phone, MessageCircle, Mail, Navigation } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import './Contact.css';

const Contact: React.FC = () => {
  const { contact, business } = siteConfig;

  const openWhatsApp = () => {
    const url = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappMessage)}`;
    window.open(url, '_blank');
  };

  const openGoogleMaps = () => {
    const encodedAddress = encodeURIComponent(contact.address.mapsSearchQuery);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="exact-contact">
      <div className="exact-contact-bg-pattern"></div>
      <div className="exact-container">
        <div className="exact-contact-header exact-fade-in-up">
          <div className="exact-header-badge">
            <span>Contact Us</span>
          </div>
          <h2>Contact {business.name}</h2>
          <p>We're here to answer your questions and help with your moving, tire export, or vehicle export needs</p>
        </div>

        <div className="exact-contact-content">
          <div className="exact-contact-info exact-fade-in-up">
            <div className="exact-contact-card exact-location-card">
              <div className="exact-card-glow"></div>
              <div className="exact-contact-icon">
                <MapPin />
              </div>
              <div className="exact-contact-details">
                <h3>Our Address</h3>
                <p>{contact.address.line1}<br />{contact.address.line2}</p>
                {contact.address.postal && (
                  <p className="exact-postal-info">{contact.address.postal}</p>
                )}
                <button onClick={openGoogleMaps} className="exact-contact-link">
                  <Navigation className="exact-link-icon" />
                  View on Google Maps
                </button>
              </div>
            </div>

            <div className="exact-contact-card exact-hours-card">
              <div className="exact-card-glow"></div>
              <div className="exact-contact-icon">
                <Clock />
              </div>
              <div className="exact-contact-details">
                <h3>Business Hours</h3>
                <div className="exact-hours">
                  {contact.hours.map((h) => (
                    <div className={`exact-hour-row ${h.closed ? 'exact-closed' : ''}`} key={h.day}>
                      <span className="exact-day">{h.day}</span>
                      <span className="exact-time">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="exact-contact-card exact-phone-card">
              <div className="exact-card-glow"></div>
              <div className="exact-contact-icon">
                <Phone />
              </div>
              <div className="exact-contact-details">
                <h3>Our Phone Numbers</h3>
                <div className="exact-phone-numbers">
                  {contact.phones.map((phone, idx) => (
                    <a
                      href={phone.href}
                      className={`exact-phone-link ${idx === 0 ? 'exact-primary' : 'exact-secondary'}`}
                      key={phone.href}
                    >
                      <Phone className="exact-phone-icon" />
                      {phone.number}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="exact-contact-card exact-email-card">
              <div className="exact-card-glow"></div>
              <div className="exact-contact-icon">
                <Mail />
              </div>
              <div className="exact-contact-details">
                <h3>Email</h3>
                <a href={`mailto:${contact.email}`} className="exact-email-link">
                  <Mail className="exact-email-icon" />
                  {contact.email}
                </a>
              </div>
            </div>
          </div>

          <div className="exact-contact-map exact-slide-in-right">
            <div className="exact-map-container">
              <div className="exact-map-header">
                <h3>Our Location</h3>
                <p>{contact.address.line1}, {contact.address.line2}</p>
              </div>
              <div className="exact-map-frame">
                <iframe
                  src={contact.address.mapsEmbedUrl}
                  width="100%"
                  height="350"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${business.name} Location`}
                ></iframe>
              </div>
            </div>

            <div className="exact-whatsapp-cta">
              <div className="exact-whatsapp-bg-effect"></div>
              <div className="exact-whatsapp-content">
                <div className="exact-whatsapp-icon-large">
                  <MessageCircle />
                </div>
                <h3>Quick Booking</h3>
                <p>Reach out directly on WhatsApp for a fast, personalized response</p>
                <button onClick={openWhatsApp} className="exact-btn exact-btn-whatsapp">
                  <MessageCircle className="exact-btn-icon" />
                  <span>Contact via WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;