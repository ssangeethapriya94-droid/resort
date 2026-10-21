// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE to change contact details, rooms, photos, text.
//  Nothing else in the code needs to be touched for content changes.
// ─────────────────────────────────────────────────────────────

export const SITE = {
  name: 'Sai Ranga Shores',
  sub: 'Beach Home',
  place: 'Pondicherry',
  tagline: 'Dancing with waves',

  // WhatsApp number in international format, digits only (91 + 10 digits).
  whatsapp: '919940038363',
  phones: [
    { label: '', display: '+91 99400 38363', tel: '+919940038363' },
  ],
  // TODO: add the client's real email; the contact card hides it while empty.
  email: '',
  // TODO: replace with the exact address once the client confirms it.
  addressLine: 'Beachfront, near Pondicherry',
  // Verified Google Maps pin location
  mapsUrl: 'https://maps.google.com/maps?q=12.3083674%2C80.0370708&z=17&hl=en',
  instagram: '',
  facebook: '',
};

export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/stay', label: 'Stay' },
  { to: '/experiences', label: 'Experiences' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

// Amenities shown on the Home page strip. TODO: confirm WiFi / parking with the client.
export const AMENITIES = [
  { icon: 'sea', title: 'Sea View Rooms', text: 'Wake up to the horizon' },
  { icon: 'beach', title: 'Beach Access', text: 'Sand a short walk away' },
  { icon: 'wifi', title: 'Free WiFi', text: 'Stay connected' },
  { icon: 'parking', title: 'Parking', text: 'Space for your car' },
  { icon: 'food', title: 'Local Experiences', text: 'Boats, food and heritage' },
];

// price: null shows "Rates on request". Use a number (rupees per night) to show "From ₹X / night".
export const ROOMS = [
  {
    id: 'deluxe-room',
    title: 'Deluxe Room',
    guests: 'Up to 2 Guests',
    bed: '1 King Bed',
    view: 'Sea View',
    ac: 'AC',
    wifi: 'Wi-Fi',
    price: 3500,
    image: 'img-4941',
    blurb: 'A cozy and comfortable deluxe sea view room in Pondicherry with wraparound windows and coastal breezes, perfect for couples or small families.',
    features: ['Wraparound sea-view windows', 'Ceiling fans and AC', 'Marble floors', 'Rooftop pavilion access'],
    images: [
      { name: 'img-4941', alt: 'Deluxe sea view room panoramic bedroom with ocean windows' },
      { name: 'img-4872', alt: 'Deluxe sea view room seating and coastal windows' },
      { name: 'img-4942', alt: 'Ocean horizon viewed from deluxe sea view bedroom window' },
      { name: 'window-view', alt: 'Deluxe room window view of coconut palms and sea' },
    ],
  },
  {
    id: 'family-room',
    title: 'Family Room',
    guests: 'Up to 4 Guests',
    bed: '1 King + 1 Twin Bed',
    view: 'Sea View',
    ac: 'AC',
    wifi: 'Wi-Fi',
    price: 5500,
    image: 'img-4872',
    blurb: 'A spacious family room at our Pondicherry beach resort, offering an ideal beach house for family vacations with ocean vistas and generous space.',
    features: ['Direct ocean vista', 'Dual king beds', 'Private sit-out', 'High-speed Wi-Fi'],
    images: [
      { name: 'img-4872', alt: 'Spacious family room at Pondicherry beach resort' },
      { name: 'img-4942', alt: 'Ocean window vista from family room' },
      { name: 'room-interior', alt: 'Sea view family room bedroom interior' },
      { name: 'window-view2', alt: 'Family beach stay balcony view of the sea' },
    ],
  },
  {
    id: 'suite-room',
    title: 'Suite Room',
    guests: 'Up to 4 Guests',
    bed: '1 King Bed + Living Area',
    view: 'Sea View',
    ac: 'AC',
    wifi: 'Wi-Fi',
    price: 7500,
    image: 'img-9382-effects',
    blurb: 'An expansive suite room in Pondicherry with a separate living area, panoramic sea views, and direct rooftop observation tower access.',
    features: ['Panoramic rooftop ocean view', 'Luxury king bedding', 'Breezy pavilion access', 'Dedicated work desk'],
    images: [
      { name: 'img-9382-effects', alt: 'Panoramic rooftop ocean view from suite room pavilion' },
      { name: 'img-9141', alt: 'Rooftop observation tower pavilion sit-out' },
      { name: 'window-view2', alt: 'Suite room ocean sit-out view' },
      { name: 'img-4941', alt: 'Spacious suite room bedroom with panoramic sea vista' },
    ],
  },
];

export const FACILITIES = [
  { icon: 'beach', title: 'Beach Access', text: 'Sand a short walk away' },
  { icon: 'roof', title: 'Rooftop Pavilion', text: 'Sunrise coffee and ocean views' },
  { icon: 'wifi', title: 'Free Wi-Fi', text: 'Stay connected throughout the property' },
  { icon: 'parking', title: 'Parking Space', text: 'Secure on-site parking for vehicles' },
  { icon: 'guests', title: 'Family Friendly Rooms', text: 'Comfortable suites for family stays' },
  { icon: 'spark', title: 'Housekeeping Services', text: 'Daily fresh linens and tidying' },
  { icon: 'chair', title: 'Seating Areas', text: 'Relaxing outdoor verandas and sit-outs' },
];

export const EXPERIENCES = [
  {
    id: 'heritage',
    name: 'beach-pano',
    title: 'Heritage Walk in Pondicherry',
    tag: 'Culture & History',
    icon: 'heritage',
    text: 'Explore colonial French Quarter streets, heritage villas, art galleries, and quiet cafes in Pondicherry town.',
    alt: 'French Quarter heritage walk destination and coastal shoreline in Pondicherry',
  },
  {
    id: 'boating',
    name: 'img-0414',
    title: 'Boating & Beach Walks',
    tag: 'Coastal Exploration',
    icon: 'boat',
    text: 'Enjoy peaceful morning beach walks along the shoreline and discover nearby coastal boating excursions in Pondicherry.',
    alt: 'Coastal boating excursion and beach walk shoreline in Pondicherry',
  },
  {
    id: 'cuisine',
    name: 'img-2784',
    title: 'Pondicherry Local Food & Markets',
    tag: 'Cuisine & Crafts',
    icon: 'food',
    text: 'Savor fresh coastal seafood, French bakeries, and browse bustling Goubert Market and local artisan craft bazaars.',
    alt: 'Pondicherry sunrise view and coastal market culinary charm',
  },
];

// Nearby places (no photos yet; add images later by giving an `image` name).
export const NEARBY = [
  { icon: 'heritage', title: 'Heritage Quarter', text: 'French-era streets, colourful villas and quiet cafés in Pondicherry town.' },
  { icon: 'temple', title: 'Auroville', text: 'Peace, spirituality and the golden Matrimandir dome.' },
  { icon: 'food', title: 'Local Food', text: 'Seafood, Tamil meals and French-inspired bakeries.' },
  { icon: 'shop', title: 'Shopping & Streets', text: 'Handicrafts, boutiques and evening strolls.' },
];

// DAY CYCLE (Home page)
export const DAY_CYCLE = [
  { name: 'img-9382-effects', label: 'Dawn', text: 'Golden sunrise breaks over the ocean.', alt: 'Panoramic dawn over Sai Ranga Shores' },
  { name: 'img-4943', label: 'Day', text: 'Turquoise water and lush coconut palms.', alt: 'Coconut palms framing the blue sea' },
  { name: 'img-2784', label: 'Dusk', text: 'Warm golden sunset on the shore.', alt: 'Golden dune sunset with fishing boats' },
  { name: 'img-0243', label: 'Night', text: 'Moonlight shimmering on the waves.', alt: 'Silver moonlight on rolling surf' },
];

// GALLERY. category must be one of GALLERY_FILTERS
export const GALLERY_FILTERS = ['All', 'Resort & Tower', 'Rooms', 'Sea & Beach', 'Sunrise & Sunset', 'Night & Moon', 'Garden'];
export const GALLERY = [
  // 1. Resort & Tower
  { name: 'img-9382-effects', cat: 'Resort & Tower', alt: 'Sai Ranga Shores photos: panoramic morning view of the resort and ocean' },
  { name: 'image-1', cat: 'Resort & Tower', alt: 'Sai Ranga Shores observation tower view illuminated at twilight' },
  { name: 'img-0095', cat: 'Resort & Tower', alt: 'Observation tower view Pondicherry framed by tropical coconut palms' },
  { name: 'img-0125', cat: 'Resort & Tower', alt: 'Beachfront resort Pondicherry gallery: entrance, parking & observation tower' },
  { name: 'img-9141', cat: 'Resort & Tower', alt: 'Observation tower view Pondicherry from breezy rooftop pavilion sit-out' },
  { name: 'tower', cat: 'Resort & Tower', alt: 'Sai Ranga Shores observation tower and coastal building' },

  // 2. Rooms & Suites
  { name: 'img-4941', cat: 'Rooms', alt: 'Sea view room photos Pondicherry: panoramic suite bedroom with wraparound ocean windows' },
  { name: 'img-4872', cat: 'Rooms', alt: 'Sea view room photos Pondicherry: spacious family room with ocean vista windows' },
  { name: 'img-4942', cat: 'Rooms', alt: 'Sea view room photo of ocean and palm horizon from bedroom window' },
  { name: 'room-pano', cat: 'Rooms', alt: 'Pondicherry beach resort room panorama with wraparound sea-view windows' },
  { name: 'room-interior', cat: 'Rooms', alt: 'Cozy sea view room bedroom interior at Sai Ranga Shores' },
  { name: 'window-view', cat: 'Rooms', alt: 'Sea view room window view of coconut palms and turquoise waters' },
  { name: 'window-view2', cat: 'Rooms', alt: 'Sea view room panoramic ocean sit-out view' },

  // 3. Sea & Beach
  { name: 'img-0094', cat: 'Sea & Beach', alt: 'Pondicherry beach resort photos: sweeping coastline with fishing boats and waves' },
  { name: 'img-0414', cat: 'Sea & Beach', alt: 'Coastal motorboat excursion ride across the blue sea in Pondicherry' },
  { name: 'img-0411', cat: 'Sea & Beach', alt: 'Catamaran boat cruising through coastal waves near Pondicherry beach' },
  { name: 'img-0113', cat: 'Sea & Beach', alt: 'Gentle ocean waves rolling onto quiet beach in Pondicherry' },
  { name: 'img-0406', cat: 'Sea & Beach', alt: 'Coastal seabird gliding above gentle ocean waves' },
  { name: 'img-0409', cat: 'Sea & Beach', alt: 'Seagulls soaring over the azure coastline' },
  { name: 'img-4943', cat: 'Sea & Beach', alt: 'Swaying coconut palms framing quiet beach near Sai Ranga Shores' },
  { name: 'beach-pano', cat: 'Sea & Beach', alt: 'Quiet Pondicherry beach stay shoreline with traditional fishing catamarans' },
  { name: 'waves', cat: 'Sea & Beach', alt: 'Turquoise ocean surf rolling onto peaceful beach' },

  // 4. Sunrise & Sunset
  { name: 'img-9386', cat: 'Sunrise & Sunset', alt: 'Pondicherry sunrise photos: golden sunrise glistening across ocean horizon' },
  { name: 'img-3413', cat: 'Sunrise & Sunset', alt: 'Pondicherry sunrise photos: morning dawn reflecting on sea through palm canopy' },
  { name: 'img-0330', cat: 'Sunrise & Sunset', alt: 'Pondicherry sunrise view: golden sunbeams breaking through morning sea clouds' },
  { name: 'img-0331', cat: 'Sunrise & Sunset', alt: 'Radiant morning sun rays over the Bay of Bengal ocean horizon' },
  { name: 'img-2784', cat: 'Sunrise & Sunset', alt: 'Golden hour sunset over sand dunes and shoreline boat near Pondicherry' },
  { name: 'img-4888', cat: 'Sunrise & Sunset', alt: 'Evening sunset glow over coastal coconut palm canopy' },
  { name: 'sunrise-sea', cat: 'Sunrise & Sunset', alt: 'Pondicherry sunrise photos: golden dawn rising over the Bay of Bengal' },
  { name: 'sunset-dunes', cat: 'Sunrise & Sunset', alt: 'Dusk turning to embers over the coastal dunes' },

  // 5. Night & Moon
  { name: 'img-0243', cat: 'Night & Moon', alt: 'Silver moonlight shimmering across gentle ocean waves' },
  { name: 'img-0292', cat: 'Night & Moon', alt: 'Radiant full moon rising over the dark ocean horizon' },
  { name: 'img-0232', cat: 'Night & Moon', alt: 'Moonlight piercing dramatic night clouds above the surf' },
  { name: 'img-0047-effects', cat: 'Night & Moon', alt: 'Clear moonlit starry sky and illuminated night greenery' },
  { name: 'img-4291', cat: 'Night & Moon', alt: 'Night ambiance of illuminated tower and moonlit rooftop' },
  { name: 'img-8755', cat: 'Night & Moon', alt: 'Brilliant full moon photographed from Sai Ranga Shores' },
  { name: 'moonrise', cat: 'Night & Moon', alt: 'Moonrise over the quiet coast' },

  // 6. Garden & Flora
  { name: 'img-0250', cat: 'Garden', alt: 'Fresh crape jasmine blossoms in the resort garden' },
  { name: 'img-0251', cat: 'Garden', alt: 'Rain-dipped pink ruellia tropical blossoms' },
  { name: 'img-0252', cat: 'Garden', alt: 'Blooming flower bush along the garden walkway' },
  { name: 'img-0254', cat: 'Garden', alt: 'Vibrant scarlet oleander blossoms in the sea breeze' },
  { name: 'jasmine', cat: 'Garden', alt: 'Sweet white jasmine flowers' },
  { name: 'ruellia', cat: 'Garden', alt: 'Pink ruellia flowers with raindrops' },
  { name: 'oleander', cat: 'Garden', alt: 'Red oleander flower in the garden' },
];
