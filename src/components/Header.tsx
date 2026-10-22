import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { useSectionNav } from '../hooks/useSectionNav';
import './Header.css';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLLIElement>(null);
  const phone = siteConfig.contact.phones[0];

  // Close the Services dropdown on outside click / Escape.
  useEffect(() => {
    if (!servicesOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setServicesOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [servicesOpen]);

  // Hover opens/closes the menu on desktop mice only (touch uses taps).
  const canHover = () => window.innerWidth > 1100 && window.matchMedia('(hover: hover)').matches;

  const closeAllMenus = () => {
    setServicesOpen(false);
    setMobileMenuOpen(false);
  };

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

  const goToSection = useSectionNav();

  const scrollToSection = (sectionId: string) => {
    goToSection(sectionId);
    closeAllMenus();
  };

  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        <div className="navbar-inner">
          <a
            className="navbar-brand"
            href="/#accueil"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('accueil');
            }}
          >
            <img
              src={siteConfig.business.logo}
              alt={`${siteConfig.business.name} — home`}
              width={900}
              height={361}
              decoding="async"
            />
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
              {siteConfig.nav.map((item) =>
                item.id === 'services' ? (
                  <li
                    className={`nav-item nav-item-dropdown${servicesOpen ? ' open' : ''}`}
                    onMouseEnter={() => canHover() && setServicesOpen(true)}
                    onMouseLeave={() => canHover() && setServicesOpen(false)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setServicesOpen(false);
                    }}
                    key={item.id}
                    ref={servicesRef}
                  >
                    <button
                      type="button"
                      className="nav-link nav-dropdown-toggle"
                      aria-haspopup="true"
                      aria-expanded={servicesOpen}
                      aria-controls="services-menu"
                      onClick={() => setServicesOpen((o) => !o)}
                    >
                      {item.label}
                      <ChevronDown className="nav-chevron" aria-hidden="true" />
                    </button>
                    <ul className="dropdown-menu" id="services-menu">
                      {siteConfig.services.items.map((service) => (
                        <li key={service.slug}>
                          <Link
                            className="dropdown-link"
                            to={`/services/${service.slug}`}
                            onClick={closeAllMenus}
                          >
                            {service.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item" key={item.id}>
                    <a
                      className="nav-link"
                      href={`/#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.id);
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ),
              )}
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