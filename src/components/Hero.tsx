import React, { useEffect, useState } from 'react';
import { MessageCircle, ArrowRight, CheckCircle, Check, Package, Ship } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import './Hero.css';

/* ---------------------------------------------------------------------------
 *  ROUTE MAP DATA
 *  Equirectangular projection: 2 SVG units per degree.
 *  x = (lon + 180) * 2      y = (80 - lat) * 2
 *  The visible window (viewBox) is lon -160..120, lat 70..-50.
 * ------------------------------------------------------------------------- */
type LonLat = [number, number];

const project = ([lon, lat]: LonLat) => ({ x: (lon + 180) * 2, y: (80 - lat) * 2 });

// TODO: set the real shipping origin and the export destinations you serve.
const ORIGIN = { name: 'New York', coord: [-74, 40.7] as LonLat };
const DESTINATIONS: { name: string; coord: LonLat }[] = [
  { name: 'Kingston', coord: [-76.8, 18] },
  { name: 'Rotterdam', coord: [4.5, 51.9] },
  { name: 'Lagos', coord: [3.4, 6.5] },
  { name: 'Mombasa', coord: [39.7, -4] },
  { name: 'Dubai', coord: [55.3, 25.3] },
];

/**
 * Coarse land mask. One entry per 5° latitude band, starting at 80°N.
 * Each [a, b] is an inclusive range of 5° longitude columns (0 = -180°).
 * Every land cell is drawn as 2x2 dots.
 */
const LAND: [number, number][][] = [
  /* 80N */ [[13, 21], [22, 32], [38, 40], [48, 50], [55, 56]],
  /* 75N */ [[2, 7], [12, 32], [40, 41], [50, 71]],
  /* 70N */ [[2, 24], [25, 32], [37, 43], [44, 71]],
  /* 65N */ [[2, 16], [19, 24], [26, 29], [31, 32], [37, 42], [43, 71]],
  /* 60N */ [[4, 17], [20, 24], [27, 28], [35, 35], [37, 42], [43, 66], [67, 69]],
  /* 55N */ [[10, 24], [34, 66], [67, 69]],
  /* 50N */ [[11, 24], [35, 63]],
  /* 45N */ [[11, 24], [34, 41], [44, 45], [48, 63], [64, 65]],
  /* 40N */ [[12, 23], [34, 37], [38, 39], [41, 63], [64, 65]],
  /* 35N */ [[13, 22], [34, 63], [64, 64]],
  /* 30N */ [[14, 22], [34, 41], [44, 62]],
  /* 25N */ [[15, 22], [33, 41], [44, 48], [50, 54], [56, 62]],
  /* 20N */ [[16, 22], [32, 42], [44, 46], [51, 54], [58, 61]],
  /* 15N */ [[18, 21], [32, 44], [52, 53], [58, 61], [65, 66]],
  /* 10N */ [[19, 25], [32, 46], [52, 52], [59, 60], [66, 66]],
  /*  5N */ [[20, 28], [37, 46], [55, 57], [59, 62]],
  /*  0  */ [[20, 29], [38, 46], [55, 57], [59, 62], [63, 67]],
  /*  5S */ [[21, 30], [38, 46], [57, 59], [64, 67]],
  /* 10S */ [[22, 30], [38, 45], [62, 64]],
  /* 15S */ [[22, 29], [38, 46], [60, 65]],
  /* 20S */ [[22, 29], [37, 46], [58, 66]],
  /* 25S */ [[22, 28], [38, 43], [58, 66]],
  /* 30S */ [[22, 27], [39, 42], [58, 66], [70, 71]],
  /* 35S */ [[22, 26], [63, 65], [70, 71]],
  /* 40S */ [[22, 25], [65, 65], [69, 70]],
  /* 45S */ [[22, 24]],
  /* 50S */ [[22, 24]],
  /* 55S */ [],
];

// A single <path> of zero-length segments; round caps turn each into a dot.
const DOTS_PATH = LAND.flatMap((ranges, row) =>
  ranges.flatMap(([from, to]) => {
    const pts: string[] = [];
    for (let col = from; col <= to; col++) {
      for (const dx of [2.5, 7.5]) {
        for (const dy of [2.5, 7.5]) {
          pts.push(`M${col * 10 + dx} ${row * 10 + dy}h0`);
        }
      }
    }
    return pts;
  })
).join('');

const origin = project(ORIGIN.coord);

const ROUTES = DESTINATIONS.map((dest, i) => {
  const to = project(dest.coord);
  const dist = Math.hypot(to.x - origin.x, to.y - origin.y);
  const cx = (origin.x + to.x) / 2;
  const cy = (origin.y + to.y) / 2 - dist * 0.22; // arc bows upward
  const delay = i * 250; // ms
  const draw = Math.round(1400 + dist * 3.5); // ms, longer routes draw slower
  return {
    name: dest.name,
    d: `M${origin.x} ${origin.y}Q${cx} ${cy} ${to.x} ${to.y}`,
    to,
    delay,
    draw,
    arrive: delay + draw,
  };
});

/* ---------------------------------------------------------------------------
 *  ANIMATION CYCLE
 *  0 Loaded -> 1 In transit (routes draw) -> 2 Delivered -> 3 fade, repeat
 * ------------------------------------------------------------------------- */
const PHASE_MS = [2000, 4200, 3400, 900];

const STEPS = [
  { key: 'loaded', title: 'Loaded', detail: 'Cargo secured at origin', Icon: Package },
  { key: 'transit', title: 'In transit', detail: 'At sea…', Icon: Ship },
  { key: 'delivered', title: 'Delivered', detail: 'Arrived at destination', Icon: CheckCircle },
];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Hero: React.FC = () => {
  const [reduceMotion] = useState(prefersReducedMotion);
  // With reduced motion we show the finished state and never animate.
  const [phase, setPhase] = useState(reduceMotion ? 2 : 0);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setTimeout(() => setPhase((p) => (p + 1) % PHASE_MS.length), PHASE_MS[phase]);
    return () => clearTimeout(timer);
  }, [phase, reduceMotion]);

  const openWhatsApp = () => {
    const url = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(siteConfig.contact.whatsappMessage)}`;
    window.open(url, '_blank');
  };

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      const headerHeight = 77; // matches .navbar height in Header.css
      window.scrollTo({ top: element.offsetTop - headerHeight, behavior: 'smooth' });
    }
  };

  const { hero, business } = siteConfig;

  const mapClass = [
    'route-map',
    phase >= 1 ? 'is-drawn' : '',
    phase === 3 ? 'is-fading' : '',
    reduceMotion ? 'is-static' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section id="accueil" className="hero" aria-label={`${business.name} - ${business.tagline}`}>
      {/* Decorative animated map */}
      <div className="hero-map" aria-hidden="true">
        <svg className={mapClass} viewBox="40 20 560 240" preserveAspectRatio="xMidYMid meet" focusable="false">
          <path className="map-dots" d={DOTS_PATH} />

          <g className="map-routes">
            {ROUTES.map((r) => {
              const timing = {
                '--delay': `${r.delay}ms`,
                '--draw': `${r.draw}ms`,
                '--arrive': `${r.arrive}ms`,
              } as React.CSSProperties;
              return (
                <g key={r.name} style={timing}>
                  <path className="route-ghost" d={r.d} />
                  <path className="route-trail" d={r.d} pathLength={1} />
                  <path className="route-head" d={r.d} pathLength={1} />
                  <circle className="dest-ring" cx={r.to.x} cy={r.to.y} r="2.2" />
                  <circle className="dest-core" cx={r.to.x} cy={r.to.y} r="1.7" />
                </g>
              );
            })}
          </g>

          <circle className="origin-ring" cx={origin.x} cy={origin.y} r="2.6" />
          <circle className="origin-core" cx={origin.x} cy={origin.y} r="1.9" />
        </svg>
      </div>
      <div className="hero-scrim" aria-hidden="true" />

      <div className="hero-inner">
        <div className="hero-copy">

          <h1 className="hero-title">
            <span className="title-company">{hero.titleLine1}</span>
            <span className="title-white">{hero.titleLine2}</span>
            <span className="title-accent">{hero.titleLine3}</span>
          </h1>

          <p className="hero-description">
            {hero.description.split(hero.descriptionHighlight).map((part, idx, arr) => (
              <React.Fragment key={idx}>
                {part}
                {idx < arr.length - 1 && <span className="location-highlight">{hero.descriptionHighlight}</span>}
              </React.Fragment>
            ))}
          </p>

          <div className="hero-buttons">
            <button onClick={openWhatsApp} className="btn btn-whatsapp" aria-label={hero.primaryCta}>
              <MessageCircle aria-hidden="true" />
              <span>{hero.primaryCta}</span>
              <ArrowRight className="btn-arrow" aria-hidden="true" />
              <div className="btn-shine"></div>
            </button>
            <button onClick={scrollToServices} className="btn btn-service" aria-label={hero.secondaryCta}>
              <span>{hero.secondaryCta}</span>
              <ArrowRight className="btn-arrow" aria-hidden="true" />
            </button>
          </div>
          
        </div>

        {/* Floating shipment-tracking card (decorative sample) */}
        <aside className="track-card" aria-hidden="true">
          <div className="track-head">
            <span className="track-title">Shipment tracking</span>
            <span className="track-tag">Example</span>
          </div>
          <ol className="track-steps">
            {STEPS.map(({ key, title, detail, Icon }, i) => {
              const state = phase > i ? 'done' : phase === i ? 'active' : 'idle';
              return (
                <li key={key} className={`track-step is-${state}`}>
                  <span className="track-marker">
                    {state === 'done' ? <Check size={14} strokeWidth={3} /> : <Icon size={14} />}
                  </span>
                  <span className="track-text">
                    <span className="track-step-title">{title}</span>
                    <span className="track-step-detail">{detail}</span>
                  </span>
                </li>
              );
            })}
          </ol>
        </aside>
      </div>
    </section>
  );
};

export default Hero;