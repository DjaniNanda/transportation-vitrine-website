/**
 * ============================================================================
 *  SITE CONFIG — single source of truth for a "vitrine" website build.
 * ============================================================================
 *  Content below is for: D&TE Translogistics and Services Inc.
 *
 *  IMPORTANT — placeholder data used because it wasn't provided:
 *    - contact.* (phone, WhatsApp, email, address, hours) — all placeholders
 *    - theme.* colors — a suggested navy/amber logistics palette, not the
 *      client's real brand colors
 *    - testimonials.items — generic placeholder quotes, NOT real reviews
 *    - all image paths — files are not included, only referenced paths
 *  Every placeholder is marked with a "TODO" comment below. Search this
 *  file for "TODO" before launch.
 * ============================================================================
 */

export interface ServiceItem {
  icon: 'wrench' | 'car' | 'gauge' | 'zap' | 'settings' | 'shield' | 'truck' | 'package' | 'globe';
  title: string;
  description: string;
  features: string[];
  price: string;
  rating?: number; // optional — omit to hide the star badge on the card
  image?: string; // optional — omit for a plain card with no background photo
}

export interface Review {
  name: string;
  subtitle: string;
  rating: number;
  text: string;
  avatar: string;
}

/**
 * Checklist / service-comparison table (ported from the Lovely Serenity
 * reference site's "cleaning checklist" section). `columns` are the
 * service divisions being compared; each category groups related tasks,
 * and each task's `values` array must have exactly one entry per column,
 * in the same order as `columns`.
 */
export interface ChecklistTask {
  task: string;
  values: (boolean | string)[]; // true/false = check/x mark, string = custom label like "Add-on"
}

export interface ChecklistCategory {
  name: string;
  tasks: ChecklistTask[];
}

export const siteConfig = {
  // ---------------------------------------------------------------------
  // BUSINESS IDENTITY
  // ---------------------------------------------------------------------
  business: {
    name: 'D&TE Translogistics and Services Inc.',
    tagline: 'Moving Goods. Connecting Markets.',
    shortDescription:
      'D&TE Translogistics and Services Inc. provides professional moving, transportation, logistics, and international export services across three specialized divisions.',
    logo: '/logo.png', // TODO: save the uploaded logo image into /public as logo.png (or update this path)
    foundedYear: 2024, // TODO: replace with the actual founding year
  },

  // ---------------------------------------------------------------------
  // CONTACT — TODO: every field here is a placeholder, replace with real info
  // ---------------------------------------------------------------------
  contact: {
    whatsappNumber: '+10000000000', // TODO: real WhatsApp number, digits with country code
    whatsappMessage:
      "Hello, I'd like to request a quote for your moving / tire export / vehicle export services.",
    phones: [
      { label: 'Main', number: '+1 (000) 000-0000', href: 'tel:+10000000000' }, // TODO
    ],
    email: 'info@dtetranslogistics.com', // TODO: real email address
    address: {
      line1: 'Street Address', // TODO
      line2: 'City, State/Country', // TODO
      postal: '', // TODO: add postal/PO box info if applicable, or leave empty
      mapsSearchQuery: 'D&TE Translogistics and Services Inc.', // TODO
      mapsEmbedUrl: '', // TODO: paste a Google Maps embed URL once the address is confirmed
    },
    hours: [
      { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM', closed: false }, // TODO
      { day: 'Saturday', time: '9:00 AM - 1:00 PM', closed: false }, // TODO
      { day: 'Sunday', time: 'Closed', closed: true },
    ],
    // TODO: fill in real social URLs; any left empty are hidden in the footer
    socials: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: '',
    },
  },

  // ---------------------------------------------------------------------
  // NAVIGATION — ids must match the <section id="..."> values hardcoded
  // in Hero.tsx / Services.tsx / About.tsx / Contact.tsx. Don't rename ids.
  // ---------------------------------------------------------------------
  nav: [
    { id: 'accueil', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'checklist', label: 'Checklist' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' },
  ],

  // ---------------------------------------------------------------------
  // HERO SECTION
  // ---------------------------------------------------------------------
  hero: {
    badge: 'Moving, Tire Export & Vehicle Export',
    titleLine1: 'D&TE Translogistics',
    titleLine2: 'Moving Goods.',
    titleLine3: 'Connecting Markets.',
    description:
      'Professional moving, tire export and vehicle export services, delivered safely and on time.',
    descriptionHighlight: 'moving, tire export and vehicle export',
    backgroundImage: '/hero.jpg', // TODO: add image to /public
    trustBadges: ['Trusted Logistics Partner', 'International Reach', 'Reliable & Efficient'],
    primaryCta: 'Request a Quote',
    secondaryCta: 'Our Services',
  },

  // ---------------------------------------------------------------------
  // GALLERY / STATS STRIP
  // ---------------------------------------------------------------------
  // ---------------------------------------------------------------------
  // SERVICES
  // ---------------------------------------------------------------------
  services: {
    // HOW MANY CARDS? Just add or remove entries in `items` below — the
    // section adapts automatically (1 to ~9 cards work well).
    // `columns` = the maximum cards per row on desktop. Extra cards wrap onto
    // a new row and any incomplete last row is centered. Tablets show 2 per
    // row and phones show 1, regardless of this value.
    columns: 3,
    badge: 'Our Services',
    subtitle:
      'Three specialized divisions — moving, tire export, and vehicle export — organized to deliver safe, efficient, and dependable service.',
    ctaTitle: 'Need a custom logistics solution?',
    ctaDescription:
      "Contact us today to discuss your moving, tire export, or vehicle export needs — we'll tailor a solution to fit your requirements.",
    ctaButton: 'Request a Quote',
    items: [
      {
        icon: 'truck',
        title: 'Moving Services',
        description:
          'Reliable transportation solutions for residential and commercial customers — from household items and furniture to office equipment and other goods.',
        features: [
          'Residential & commercial moving',
          'Local & long-distance moves',
          'Loading, unloading & delivery',
        ],
        price: 'Request a Quote', // TODO: add real pricing if applicable
        rating: 4.9, // TODO: placeholder rating — replace once real reviews exist
        image: '/service-moving.jpg', // TODO: add image
      },
      {
        icon: 'package',
        title: 'Tire Export Services',
        description:
          'D&TE specializes in the export of new and used tires to international markets, working with suppliers and customers to coordinate sourcing, transportation, and shipment.',
        features: [
          'Export of new & used tires',
          'Sourcing & procurement',
          'Packaging, logistics & shipping coordination',
        ],
        price: 'Request a Quote',
        rating: 4.9,
        image: '/service-tires.jpg', // TODO: add image
      },
      {
        icon: 'car',
        title: 'Vehicle Export Services',
        description:
          'D&TE provides export services for new and used cars, assisting customers with vehicle sourcing, transportation, documentation, and international shipping coordination.',
        features: [
          'Export of new & used cars',
          'Vehicle sourcing, inspection & preparation',
          'Documentation & international shipping',
        ],
        price: 'Request a Quote',
        rating: 4.9,
        image: '/service-vehicles.jpg', // TODO: add image
      },
    ] as ServiceItem[],
  },

  // ---------------------------------------------------------------------
  // ABOUT SECTION
  // ---------------------------------------------------------------------
  about: {
    badge: 'About Us',
    title: 'Moving Goods. Connecting Markets.',
    intro:
      "D&TE Translogistics and Services Inc. provides professional moving, transportation, logistics, and international export services. Our operations are organized into three primary service areas — {highlight} — delivering safe, efficient, and dependable service tailored to each customer's needs.",
    introHighlight: 'moving, tire export, and vehicle export',
    story: {
      emoji: '🚚',
      title: 'Our Commitment',
      text: 'Whether moving household goods locally or coordinating the international export of tires and vehicles, D&TE Translogistics and Services Inc. is committed to professionalism, reliability, efficiency, and customer satisfaction.',
    },
    ctaButton: 'Contact Us',
    image: '/about.jpg', // TODO: add image to /public
  },

  // ---------------------------------------------------------------------
  // CHECKLIST — service comparison table, ported from the Lovely
  // Serenity reference site's "cleaning checklist" design. Columns are
  // D&TE's three divisions; rows are grouped by capability.
  // ---------------------------------------------------------------------
  checklist: {
    badge: 'Service Comparison',
    title: 'What Each Division Covers',
    subtitle: 'A quick side-by-side of what Moving, Tire Export, and Vehicle Export each include.',
    columns: ['Moving Services', 'Tire Export', 'Vehicle Export'],
    categories: [
      {
        name: 'Core Service',
        tasks: [
          { task: 'Residential & commercial moving', values: [true, false, false] },
          { task: 'Export of new items', values: [false, true, true] },
          { task: 'Export of used items', values: [false, true, true] },
        ],
      },
      {
        name: 'Sourcing & Procurement',
        tasks: [
          { task: 'Sourcing & procurement', values: [false, true, true] },
          { task: 'Inspection & preparation', values: [false, false, true] },
        ],
      },
      {
        name: 'Transportation & Logistics',
        tasks: [
          { task: 'Local & long-distance transport', values: [true, true, true] },
          { task: 'Loading & unloading assistance', values: [true, false, false] },
          { task: 'Pickup & delivery coordination', values: [true, false, true] },
        ],
      },
      {
        name: 'Packaging & Shipping',
        tasks: [
          { task: 'Packaging & preparation for shipment', values: [false, true, false] },
          { task: 'International shipping coordination', values: [false, true, true] },
        ],
      },
      {
        name: 'Documentation & Compliance',
        tasks: [
          { task: 'Export documentation support', values: [false, false, true] },
          { task: 'Customs & import/export compliance', values: [false, true, true] },
        ],
      },
    ] as ChecklistCategory[],
  },

  // ---------------------------------------------------------------------
  // TESTIMONIALS / REVIEWS
  // Shown as a stack of cards that pile up while scrolling. Add, remove or
  // reorder entries in `reviews` below — the stack adapts automatically
  // (2–8 reviews works best).
  // ---------------------------------------------------------------------
  testimonials: {
    badge: 'Client Testimonials',
    title: 'What Our Clients Say',
    // TODO: once you have a Google Business Profile, put your real
    // "write a review" link here — either:
    //   https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID
    // or the short link Google gives you from the Business Profile app
    // ("Ask for reviews" → copy link). Empty = button opens WhatsApp.
    googleReviewUrl: '',
    ctaTitle: 'Enjoyed working with us?',
    ctaDescription: 'Your feedback helps other customers know what to expect — and helps us improve.',
    ctaButton: 'Leave a Review',
    // TODO: the entries below are SAMPLE TEXT with generic names. Replace
    // them with real client reviews before launch — nothing on the page
    // labels them as examples anymore.
    //   name     — reviewer's name (e.g. 'Jean Dupont')
    //   subtitle — service used (e.g. 'Vehicle Export')
    //   rating   — whole number, 1 to 5
    //   text     — the review itself (keep it under ~250 characters)
    //   avatar   — initials shown in the circle (e.g. 'JD')
    reviews: [
      {
        name: 'Client Name',
        subtitle: 'Residential Move',
        rating: 5,
        text: 'D&TE handled our move professionally from start to finish — everything arrived safely and on time.',
        avatar: 'CN',
      },
      {
        name: 'Client Name',
        subtitle: 'Tire Export',
        rating: 5,
        text: 'Sourcing and shipping our tire order internationally was smooth and well-coordinated from start to finish.',
        avatar: 'CN',
      },
      {
        name: 'Client Name',
        subtitle: 'Vehicle Export',
        rating: 5,
        text: 'The team managed our vehicle export documentation and shipping with great efficiency.',
        avatar: 'CN',
      },
      {
        name: 'Client Name',
        subtitle: 'Commercial Moving',
        rating: 5,
        text: 'Great communication throughout our office relocation. Everything was handled with care.',
        avatar: 'CN',
      },
    ] as Review[],
  },

  // ---------------------------------------------------------------------
  // FOOTER
  // ---------------------------------------------------------------------
  footer: {
    copyrightName: 'D&TE Translogistics and Services Inc.',
    legalLinks: ['Legal Notice', 'Privacy Policy', 'Terms of Service'],
  },

  // ---------------------------------------------------------------------
  // SEO / META — everything the browser tab, Google and social networks
  // (WhatsApp, Facebook, LinkedIn...) read. This block is injected into
  // index.html at build time by vite-plugin-site-head.ts, so this is the
  // ONLY place to edit it. Restart `npm run dev` (it restarts itself) or
  // re-run `npm run build` after changing it.
  // ---------------------------------------------------------------------
  seo: {
    title: 'D&TE Translogistics and Services Inc. | Moving, Tire Export & Vehicle Export',
    description:
      'D&TE Translogistics and Services Inc. provides professional moving, transportation, logistics, and international tire and vehicle export services.',
    keywords: [
      'moving services',
      'tire export',
      'vehicle export',
      'car export',
      'logistics',
      'transportation',
      'international shipping',
      'D&TE Translogistics',
    ],
    // TODO: the real domain, e.g. 'https://www.dtetranslogistics.com/'.
    // While this still contains "example.com" (or is empty) the canonical
    // link, og:url and twitter:url tags are simply left out.
    siteUrl: 'https://example.com/',
    // TODO: link-preview image (~1200x630 px). Full URL, or a path such as
    // '/og-image.png' once siteUrl is real. Left out while it's a placeholder.
    ogImage: 'https://example.com/og-image.png',
    locale: 'en_US', // TODO: confirm locale/region. Also sets <html lang>.

    // Analytics & site verification. Leave a value '' to omit that tag.
    // TODO: the three values below were inherited from the previous site
    // (Exact Automobile). Replace them with D&TE's own, or set '' to remove.
    googleAnalyticsId: 'AW-17512970540',
    googleSiteVerification: 'RJRMensGZgPDbQYjzZbsnAXU9E4GqaSm6S1NJ_R6Zqk',
    bingSiteVerification: '7E0B6E587A0AC27CD1679622088403CE',

    // Structured data (JSON-LD) that helps Google understand the business.
    structuredData: {
      // Any https://schema.org LocalBusiness type, e.g. 'MovingCompany',
      // 'LocalBusiness', 'ProfessionalService'.
      type: 'MovingCompany',
      // Keep false until contact.* above holds REAL phone/email/address —
      // otherwise the placeholders would be published to Google.
      includeContact: false,
      // Optional, only used when includeContact is true. schema.org format,
      // e.g. ['Mo-Fr 09:00-18:00', 'Sa 09:00-13:00'].
      openingHours: [] as string[],
    },
  },

  // ---------------------------------------------------------------------
  // THEME — matched to the D&TE logo: dark charcoal (truck body / "D&T"
  // text) + vivid green (swoosh, the "E", the icon badges).
  // ---------------------------------------------------------------------
  theme: {
    primary: '#1C1C1C',
    primaryDark: '#0D0D0D',
    primaryLight: '#3A3A3A',
    primaryPale: '#D9D9D9',
    secondary: '#2E2E2E',
    accent: '#2FAE4E',
    accentDark: '#1F8A38',
    accentLight: '#5BC776',
    accentLighter: '#8FDDA3',
    accentPale: '#D8F5DE',
    teal: '#1E9E5A',
    cyan: '#17A673',
    mint: '#7BE495',
    whatsapp: '#25D366',
    success: '#22C55E',
  },
};

export type SiteConfig = typeof siteConfig;