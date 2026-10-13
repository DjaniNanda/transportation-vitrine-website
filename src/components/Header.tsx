import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import './Header.css';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const phone = siteConfig.contact.phones[0];

  // Close the mobile menu automatically if the viewport grows past the
  // breakpoint where the hamburger menu is used.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 77; // matches .navbar height in Header.css
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        <div className="navbar-inner">
          <a
            className="navbar-brand"
            href="#accueil"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('accueil');
            }}
          >
            <img src={siteConfig.business.logo} alt={`${siteConfig.business.name} Logo`} />
          </a>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-controls="navbarNav"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>

          <div className={`navbar-collapse ${mobileMenuOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav">
              {siteConfig.nav.map((item) => (
                <li className="nav-item" key={item.id}>
                  <a
                    className="nav-link"
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              {phone && (
                <li className="nav-item nav-item-call">
                  <a href={phone.href} className="call-button">
                    <Phone />
                    <span>Call Us</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {phone && (
        <div className="floating-call-wrapper">
          <a href={phone.href} className="floating-call-button" aria-label={`Call ${phone.number}`}>
            <Phone />
            <span>Call Us</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default Header;