/**
 * ============================================================================
 *  SERVICE DETAIL PAGES — content for /services/:slug
 * ============================================================================
 *  One entry per service. The `slug` MUST match the `slug` of the matching
 *  item in siteConfig.services.items (that is how the card links to the page).
 *
 *  To add a 4th service: add an item in siteConfig.services.items, then add a
 *  matching entry here with the same slug. The route, the card link, the
 *  footer link and the "other services" block all pick it up automatically.
 *
 *  REVIEW BEFORE LAUNCH: the copy below is built from the service descriptions
 *  you provided. Process steps, "what we need from you" lists and FAQ answers
 *  are written to be accurate for the industry, but only you know exactly how
 *  D&TE works — search for "VERIFY" to find the statements worth double-checking.
 * ============================================================================
 */

export type DetailIcon =
  | 'home'
  | 'building'
  | 'route'
  | 'map'
  | 'truck'
  | 'package'
  | 'boxes'
  | 'search'
  | 'clipboard'
  | 'file'
  | 'ship'
  | 'globe'
  | 'shield';

export interface DetailOffering {
  icon: DetailIcon;
  title: string;
  description: string;
}

export interface DetailStep {
  title: string;
  description: string;
}

export interface DetailFaq {
  question: string;
  answer: string;
}

export interface ServiceDetail {
  slug: string;
  /** <title> and meta description while this page is open */
  metaTitle: string;
  metaDescription: string;
  /**
   * Optional background photo for THIS page's hero, e.g. '/moving-hero.jpg'
   * (put the file in /public). Leave it out to reuse the card image from
   * siteConfig.services.items[].image.
   */
  heroImage?: string;
  /** Small label above the page title */
  eyebrow: string;
  /** Page <h1> */
  headline: string;
  /** One-sentence summary under the title */
  lead: string;
  /** Paragraphs of the introduction */
  overview: string[];
  offeringsTitle: string;
  offeringsIntro: string;
  offerings: DetailOffering[];
  processTitle: string;
  processIntro: string;
  process: DetailStep[];
  requirementsTitle: string;
  requirementsIntro: string;
  requirements: string[];
  faqs: DetailFaq[];
}

export const serviceDetails: ServiceDetail[] = [
  // -------------------------------------------------------------------------
  // MOVING
  // -------------------------------------------------------------------------
  {
    slug: 'moving',
     heroImage: '/moving-hero.jpg',
    metaTitle: 'Moving Services — Residential & Commercial | D&TE Translogistics',
    metaDescription:
      'Residential and commercial moving, local and long-distance, with loading, unloading, pickup and delivery. Request a quote from D&TE Translogistics and Services Inc.',
    eyebrow: 'Moving Services',
    headline: 'Moving that is planned carefully and delivered reliably',
    lead: 'Residential and commercial moving, local and long-distance — from the first quote to the final unloading.',
    overview: [
      'D&TE Translogistics and Services Inc. provides reliable moving solutions for residential and commercial customers. We help families, individuals and businesses transport household goods, furniture, equipment and other items from one location to another, whether the move is across the city or over a long distance.',
      'Every move starts with understanding what is being moved, where it is going and when it needs to arrive. From there we plan loading, transport and unloading so that moving day runs smoothly and your belongings are handled with care. Our focus is on safe, efficient and dependable moving services tailored to each customer’s needs.',
    ],
    offeringsTitle: 'What our moving services include',
    offeringsIntro:
      'Choose the full move or only the part you need — each service can be arranged on its own or combined.',
    offerings: [
      {
        icon: 'home',
        title: 'Residential moving',
        description:
          'Apartments, houses and family homes. Furniture, appliances, boxes and personal belongings are moved to your new address.',
      },
      {
        icon: 'building',
        title: 'Commercial & office moving',
        description:
          'Offices, shops and small businesses. Desks, equipment, files and stock are relocated, with the schedule planned around your working hours wherever possible.',
      },
      {
        icon: 'map',
        title: 'Local moves',
        description:
          'Moves within the same city or area, organized so that loading, transport and unloading are completed efficiently.',
      },
      {
        icon: 'route',
        title: 'Long-distance moves',
        description:
          'Moves between cities or regions, with the route and delivery timing planned in advance and confirmed with you.',
      },
      {
        icon: 'boxes',
        title: 'Loading & unloading assistance',
        description:
          'Help getting your items safely onto the truck at pickup and into the right place at delivery.',
      },
      {
        icon: 'truck',
        title: 'Pickup & delivery services',
        // VERIFY: "smaller loads" assumes you accept partial loads — adjust if not.
        description:
          'Collection from one address and delivery to another — suited to individual items, equipment or smaller loads.',
      },
    ],
    processTitle: 'How a move works',
    processIntro: 'A clear sequence, so you always know what happens next.',
    process: [
      {
        title: 'Request a quote',
        description:
          'Contact us with your pickup and delivery addresses, preferred date and a description of what needs to be moved.',
      },
      {
        title: 'Plan the move',
        description:
          'We confirm the details together: access at both addresses, large or fragile items, the date and the services you need.',
      },
      {
        title: 'Load and secure',
        description:
          'Your belongings are loaded and secured for transport so that they stay protected on the road.',
      },
      {
        title: 'Transport',
        description:
          'Your goods travel to the destination, locally or over a long distance, according to the agreed plan.',
      },
      {
        title: 'Unload and deliver',
        description:
          'Items are unloaded and delivered at the new location, and we confirm the delivery with you.',
      },
    ],
    requirementsTitle: 'What we need to prepare your quote',
    requirementsIntro:
      'The more precise the information, the more accurate and faster the quote. Send what you have — we will ask for the rest.',
    requirements: [
      'Pickup and delivery addresses, including floors, stairs, elevator and parking access',
      'Your preferred moving date and how flexible it is',
      'A list or description of the items — especially large, heavy or fragile pieces',
      'Whether you need loading help, unloading help, or both',
      'Any special requirements, such as tight access or time restrictions',
    ],
    faqs: [
      {
        question: 'What types of moves do you handle?',
        answer:
          'We handle residential and commercial moves, both local and long-distance. We also offer pickup and delivery for individual items and the transportation of household and commercial goods.',
      },
      {
        question: 'Do you help with loading and unloading?',
        answer:
          'Yes. Loading and unloading assistance is part of our moving services, and you can request it at pickup, at delivery, or both.',
      },
      {
        question: 'How is the price of a move determined?',
        answer:
          'The price depends on factors such as the volume of goods, the distance, access at both addresses, the date and the additional services you need. Contact us with the details and we will provide a quote.',
      },
      {
        question: 'How should I prepare for moving day?',
        answer:
          'Label your boxes by room, keep valuables and important documents with you, clear access to the items being moved, and make sure parking or loading access is available at both addresses. If you have unusually heavy or fragile items, tell us in advance so we can plan for them.',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // TIRE EXPORT
  // -------------------------------------------------------------------------
  {
    slug: 'tire-export',
    heroImage: '/tire-export-hero.jfif',
    metaTitle: 'Tire Export Services — New & Used Tires | D&TE Translogistics',
    metaDescription:
      'Export of new and used tires to international markets: sourcing, packaging, logistics and shipping coordination. Request a quote from D&TE Translogistics and Services Inc.',
    eyebrow: 'Tire Export Services',
    headline: 'Tire export, from sourcing to shipment',
    lead: 'New and used tires for international markets, with sourcing, packaging and shipping coordinated by one team.',
    overview: [
      'D&TE Translogistics and Services Inc. specializes in the export of new and used tires to international markets. We work with suppliers and customers to facilitate the sourcing, transportation and shipment of tires, so that buyers abroad receive the products they ordered.',
      'Tires are bulky, and how they are selected, packed, loaded and documented matters as much as the price. We coordinate each stage of the export, and we aim to provide reliable solutions while complying with applicable transportation, customs, environmental, and import/export requirements.',
    ],
    offeringsTitle: 'What our tire export services include',
    offeringsIntro:
      'From finding the right product to getting it onto a vessel, every stage is covered.',
    offerings: [
      {
        icon: 'package',
        title: 'Export of new tires',
        description:
          'New tires supplied and exported for international customers, distributors and resellers.',
      },
      {
        icon: 'package',
        title: 'Export of used tires',
        description:
          'Used tires exported to markets where they are in demand, in line with the rules that apply at the destination.',
      },
      {
        icon: 'search',
        title: 'Tire sourcing & procurement',
        description:
          'We work with suppliers to locate the tires that match your specifications, quantities and budget.',
      },
      {
        icon: 'boxes',
        title: 'Packaging & preparation for shipment',
        description:
          'Tires are prepared and arranged for safe, space-efficient transport and handling.',
      },
      {
        icon: 'truck',
        title: 'Transportation & logistics coordination',
        description:
          'Inland transport from the supplier to the port or loading point is planned and coordinated.',
      },
      {
        icon: 'ship',
        title: 'International shipping coordination',
        description:
          'We coordinate the shipment to the destination country and keep you informed along the way.',
      },
    ],
    processTitle: 'How a tire export works',
    processIntro: 'A structured process from the first inquiry to delivery abroad.',
    process: [
      {
        title: 'Share your requirements',
        description:
          'Tell us the tire types and sizes, quantities, whether you need new or used, and the destination country.',
      },
      {
        title: 'Sourcing and quotation',
        description:
          'We source the products with our suppliers and send you a quotation based on your requirements.',
      },
      {
        title: 'Confirm the order',
        description:
          'Once you approve the quotation, the specifications, quantities and shipping terms are confirmed.',
      },
      {
        title: 'Packaging and preparation',
        description:
          'The tires are prepared and arranged for transport and loading.',
      },
      {
        title: 'Transport and shipping',
        description:
          'We coordinate transportation to the port and the international shipment to your destination.',
      },
      {
        title: 'Documentation and follow-up',
        description:
          'Export paperwork is prepared in line with the requirements of the route, and we follow the shipment through to arrival.',
      },
    ],
    requirementsTitle: 'Information that helps us quote accurately',
    requirementsIntro:
      'You do not need everything at once — start with what you know and we will guide you through the rest.',
    requirements: [
      'Tire types, sizes and any brand or specification requirements',
      'New or used, and your expectations for the condition of used tires',
      'Quantity, and whether this is a one-time order or a recurring supply',
      'Destination country and preferred port of arrival',
      'Consignee (receiver) details and any import requirements you are aware of',
    ],
    faqs: [
      {
        question: 'Do you export both new and used tires?',
        answer:
          'Yes. D&TE exports both new and used tires to international markets.',
      },
      {
        question: 'Can you source specific tires for me?',
        answer:
          'Yes. Tire sourcing and procurement is part of our service. Send us the types, sizes and quantities you need, and we will work with suppliers to match your requirements.',
      },
      {
        question: 'Are there restrictions on importing used tires?',
        answer:
          'Many countries regulate or restrict the import of used tires — for example by condition, age or inspection requirements. Tell us your destination early so these rules can be taken into account before the order is confirmed.',
      },
      // VERIFY: document list is the typical industry set — confirm against what you actually prepare.
      {
        question: 'What documents are needed for a tire export?',
        answer:
          'Export shipments typically involve a commercial invoice, a packing list and a transport document such as a bill of lading. Some destinations require additional paperwork. We prepare and coordinate the documents according to the destination.',
      },
      {
        question: 'How long does it take for the shipment to arrive?',
        answer:
          'Transit time depends on the destination, the shipping schedule and customs processing. We will give you an estimate with your quotation and keep you updated once the shipment is on its way.',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // VEHICLE EXPORT
  // -------------------------------------------------------------------------
  {
    slug: 'vehicle-export',
    heroImage: '/vehicle-export-hero.jfif',
    metaTitle: 'Vehicle Export Services — New & Used Cars | D&TE Translogistics',
    metaDescription:
      'Export of new and used cars: vehicle sourcing, inspection, transportation, export documentation and international shipping coordination. D&TE Translogistics and Services Inc.',
    eyebrow: 'Vehicle Export Services',
    headline: 'Vehicle export, handled from purchase to port',
    lead: 'New and used cars exported internationally, with sourcing, inspection, documentation and shipping coordination in one place.',
    overview: [
      'D&TE Translogistics and Services Inc. provides export services for new and used cars. We assist customers with vehicle sourcing, transportation, documentation and international shipping coordination, so that buying a vehicle abroad does not mean managing every step alone.',
      'Exporting a vehicle involves more than shipping: the right car has to be found, checked, prepared, documented and moved to the port. We coordinate these stages for you, and we aim to deliver reliable export solutions while complying with applicable customs, import, export and transportation regulations.',
    ],
    offeringsTitle: 'What our vehicle export services include',
    offeringsIntro:
      'Every stage between choosing a car and seeing it shipped is covered by the same team.',
    offerings: [
      {
        icon: 'truck',
        title: 'Export of new cars',
        description:
          'New vehicles supplied and exported to customers, dealers and resellers in international markets.',
      },
      {
        icon: 'truck',
        title: 'Export of used cars',
        description:
          'Used vehicles exported to international buyers, taking into account the import rules of the destination.',
      },
      {
        icon: 'search',
        title: 'Vehicle sourcing & procurement',
        description:
          'We help locate vehicles that match the make, model, year and budget you have in mind.',
      },
      {
        icon: 'clipboard',
        title: 'Vehicle inspection & preparation',
        description:
          'Vehicles are inspected and prepared for export before they are shipped.',
      },
      {
        icon: 'route',
        title: 'Transportation & delivery coordination',
        description:
          'Transport of the vehicle to the port or loading point is arranged and coordinated.',
      },
      {
        icon: 'file',
        title: 'Export documentation support',
        description:
          'We help prepare and organize the paperwork required to export the vehicle.',
      },
      {
        icon: 'ship',
        title: 'International shipping coordination',
        description:
          'We coordinate the shipment to the destination country and keep you informed on its progress.',
      },
    ],
    processTitle: 'How a vehicle export works',
    processIntro: 'From the first conversation to the vehicle leaving port.',
    process: [
      {
        title: 'Tell us what you need',
        description:
          'Share the vehicle you are looking for — make, model, year, budget — and the country it is going to.',
      },
      {
        title: 'Sourcing and selection',
        description:
          'We help you find suitable vehicles, new or used, and agree on the one you want to export.',
      },
      {
        title: 'Inspection and preparation',
        description:
          'The vehicle is inspected and prepared so it is ready for transport and shipping.',
      },
      {
        title: 'Documentation',
        description:
          'We support the preparation of the export documents, checked against the requirements of the route.',
      },
      {
        title: 'Transport to port and shipping',
        description:
          'The vehicle is moved to the port and the international shipping is coordinated.',
      },
      {
        title: 'Follow-up to arrival',
        description:
          'We stay in contact until the shipment reaches its destination.',
      },
    ],
    requirementsTitle: 'What we need to get started',
    requirementsIntro:
      'Share what you know today. We will tell you what else is needed for your destination.',
    requirements: [
      'The vehicle you want: make, model, year, new or used, and your budget',
      'The destination country and preferred port of arrival',
      'Buyer or consignee details, including identification',
      'Any age, emission or steering-side (left/right-hand drive) rules you know apply at the destination',
      'If the vehicle is already identified: its details and ownership documents',
    ],
    faqs: [
      {
        question: 'Do you export both new and used cars?',
        answer: 'Yes. We provide export services for both new and used cars.',
      },
      {
        question: 'Can you help me find the vehicle?',
        answer:
          'Yes. Vehicle sourcing and procurement is part of our service. Tell us what you are looking for and we will help you locate suitable options.',
      },
      // VERIFY: confirm inspection is done for every vehicle, and by whom.
      {
        question: 'Do you inspect vehicles before they are shipped?',
        answer:
          'Yes. Vehicle inspection and preparation is included in our vehicle export services, so the car is checked and made ready before shipment.',
      },
      // VERIFY: document list is the typical industry set — confirm against what you actually prepare.
      {
        question: 'What documents are required to export a vehicle?',
        answer:
          'Requirements vary by origin and destination, but typically include proof of ownership, a bill of sale, export and customs paperwork, and a transport document such as a bill of lading. We support you with the export documentation and tell you what applies to your shipment.',
      },
      {
        question: 'Are there restrictions on importing vehicles into my country?',
        answer:
          'Many countries limit vehicle imports by age, emissions standards or steering side. Please share your destination early so we can take these rules into account before you commit to a vehicle.',
      },
    ],
  },
];

export const getServiceDetail = (slug: string | undefined): ServiceDetail | undefined =>
  serviceDetails.find((s) => s.slug === slug);
