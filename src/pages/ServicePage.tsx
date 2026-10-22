import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  Home as HomeIcon, Building2, Route, MapPin, Truck, Package, Boxes, Search,
  ClipboardCheck, FileText, Ship, Globe, ShieldCheck, ArrowRight, ChevronRight,
  MessageCircle, Phone, CheckCircle,
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { getServiceDetail, DetailIcon } from '../config/serviceDetails';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { openWhatsApp } from '../utils/whatsapp';
import './ServicePage.css';

const ICONS: Record<DetailIcon, React.ReactNode> = {
  home: <HomeIcon aria-hidden="true" />,
  building: <Building2 aria-hidden="true" />,
  route: <Route aria-hidden="true" />,
  map: <MapPin aria-hidden="true" />,
  truck: <Truck aria-hidden="true" />,
  package: <Package aria-hidden="true" />,
  boxes: <Boxes aria-hidden="true" />,
  search: <Search aria-hidden="true" />,
  clipboard: <ClipboardCheck aria-hidden="true" />,
  file: <FileText aria-hidden="true" />,
  ship: <Ship aria-hidden="true" />,
  globe: <Globe aria-hidden="true" />,
  shield: <ShieldCheck aria-hidden="true" />,
};

const ServicePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const detail = getServiceDetail(slug);
  const summary = siteConfig.services.items.find((s) => s.slug === slug);

  // Hooks must run on every render, so the unknown-slug redirect comes after.
  useDocumentMeta(
    detail?.metaTitle ?? siteConfig.seo.title,
    detail?.metaDescription ?? siteConfig.seo.description,
  );

  if (!detail || !summary) return <Navigate to="/" replace />;

  const phone = siteConfig.contact.phones[0];
  const otherServices = siteConfig.services.items.filter((s) => s.slug !== detail.slug);

  return (
    <main className="sp">
      {/* ------------------------------ Hero ------------------------------ */}
      <header className="sp-hero">
        {(detail.heroImage ?? summary.image) && (
          <img className="sp-hero-image" src={detail.heroImage ?? summary.image} alt="" decoding="async" />
        )}
        <div className="sp-hero-scrim" aria-hidden="true" />

        <div className="sp-container sp-hero-inner">
          <nav className="sp-breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li><ChevronRight aria-hidden="true" /><Link to="/#services">Services</Link></li>
              <li aria-current="page"><ChevronRight aria-hidden="true" /><span>{detail.eyebrow}</span></li>
            </ol>
          </nav>

          <p className="sp-eyebrow">{detail.eyebrow}</p>
          <h1 className="sp-title">{detail.headline}</h1>
          <p className="sp-lead">{detail.lead}</p>

          <div className="sp-hero-actions">
            <button type="button" className="sp-btn sp-btn-primary" onClick={() => openWhatsApp(summary.title)}>
            
              Request a quote
            </button>
            {phone && (
              <a className="sp-btn sp-btn-ghost" href={phone.href}>
                <Phone aria-hidden="true" />
                Call us
              </a>
            )}
          </div>
        </div>
      </header>

      {/* ---------------------------- Overview ---------------------------- */}
      <section className="sp-section" aria-labelledby="sp-overview-h">
        <div className="sp-container sp-overview">
          <div className="sp-overview-text">
            <h2 id="sp-overview-h" className="sp-h2">Overview</h2>
            {detail.overview.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <aside className="sp-aside" aria-label="Request a quote">
            <h3>Ready to get started?</h3>
            <p>Tell us what you need and we will come back to you with a quote.</p>
            <button type="button" className="sp-btn sp-btn-primary sp-btn-block" onClick={() => openWhatsApp(summary.title)}>
              
              Chat on WhatsApp
            </button>
            {phone && (
              <a className="sp-aside-phone" href={phone.href}>
                <Phone aria-hidden="true" />
                {phone.number}
              </a>
            )}
          </aside>
        </div>
      </section>

      {/* ---------------------------- Included ---------------------------- */}
      <section className="sp-section sp-section-tint" aria-labelledby="sp-included-h">
        <div className="sp-container">
          <header className="sp-section-head">
            <h2 id="sp-included-h" className="sp-h2">{detail.offeringsTitle}</h2>
            <p>{detail.offeringsIntro}</p>
          </header>

          <ul className="sp-offerings">
            {detail.offerings.map((o) => (
              <li key={o.title} className="sp-offering">
                <span className="sp-offering-icon">{ICONS[o.icon]}</span>
                <h3>{o.title}</h3>
                <p>{o.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ----------------------------- Process ---------------------------- */}
      <section className="sp-section" aria-labelledby="sp-process-h">
        <div className="sp-container">
          <header className="sp-section-head">
            <h2 id="sp-process-h" className="sp-h2">{detail.processTitle}</h2>
            <p>{detail.processIntro}</p>
          </header>

          <ol className="sp-steps">
            {detail.process.map((step) => (
              <li key={step.title} className="sp-step">
                <div className="sp-step-body">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* -------------------------- Requirements -------------------------- */}
      <section className="sp-section sp-section-tint" aria-labelledby="sp-req-h">
        <div className="sp-container sp-req">
          <div>
            <h2 id="sp-req-h" className="sp-h2">{detail.requirementsTitle}</h2>
            <p className="sp-req-intro">{detail.requirementsIntro}</p>
          </div>
          <ul className="sp-checklist">
            {detail.requirements.map((item) => (
              <li key={item}>
                <CheckCircle aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------ FAQ ------------------------------- */}
      <section className="sp-section" aria-labelledby="sp-faq-h">
        <div className="sp-container">
          <header className="sp-section-head">
            <h2 id="sp-faq-h" className="sp-h2">Frequently asked questions</h2>
          </header>

          <div className="sp-faq">
            {detail.faqs.map((faq) => (
              <details key={faq.question} className="sp-faq-item">
                <summary>
                  <span>{faq.question}</span>
                  <ChevronRight aria-hidden="true" />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------ Other services + CTA -------------------- */}
      <section className="sp-section sp-section-tint" aria-labelledby="sp-more-h">
        <div className="sp-container">
          <header className="sp-section-head">
            <h2 id="sp-more-h" className="sp-h2">Our other services</h2>
          </header>

          <ul className="sp-more">
            {otherServices.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="sp-more-card">
                  <span>
                    <strong>{s.title}</strong>
                    <small>{s.features[0]}</small>
                  </span>
                  <ArrowRight aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="sp-cta">
            <h2>Need a tailored solution?</h2>
            <p>Contact us with the details of your request and we will propose a solution that fits.</p>
            <div className="sp-cta-actions">
              <button type="button" className="sp-btn sp-btn-primary" onClick={() => openWhatsApp(summary.title)}>
                
                Request a quote
              </button>
              <Link className="sp-btn sp-btn-ghost" to="/#services">
                All services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicePage;
