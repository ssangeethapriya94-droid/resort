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
  // Opens a Google Maps SEARCH (no invented pin). Replace with the real share link when known.
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sai+Ranga+Shores+Beach+Home+Pondicherry',
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
    blurb: 'A cozy and comfortable room with a beautiful view, perfect for couples or small families.',
    features: ['Wraparound sea-view windows', 'Ceiling fans and AC', 'Marble floors', 'Rooftop pavilion access'],
    images: [
      { name: 'img-4941', alt: 'Deluxe Room Panoramic Bedroom' },
      { name: 'img-4872', alt: 'Spacious Suite Seating and Windows' },
      { name: 'img-4942', alt: 'Ocean Horizon from Bedroom Window' },
      { name: 'window-view', alt: 'Window View of Palms & Sea' },
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
    blurb: 'Spacious and comfortable, ideal for families or groups, with all the essentials for a relaxing stay.',
    features: ['Direct ocean vista', 'Dual king beds', 'Private sit-out', 'High-speed Wi-Fi'],
    images: [
      { name: 'img-4872', alt: 'Sea View Family Room' },
      { name: 'img-4942', alt: 'Ocean Window Vista' },
      { name: 'room-interior', alt: 'Sea View Family Room Bedroom' },
      { name: 'window-view2', alt: 'Family Suite Balcony View' },
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
    blurb: 'More space, more comfort, with a separate living area and stunning views of the ocean.',
    features: ['Panoramic rooftop ocean view', 'Luxury king bedding', 'Breezy pavilion access', 'Dedicated work desk'],
    images: [
      { name: 'img-9382-effects', alt: 'Panoramic Rooftop Ocean View' },
      { name: 'img-9141', alt: 'Rooftop Tower Pavilion' },
      { name: 'window-view2', alt: 'Premium Suite Sit-out' },
      { name: 'img-4941', alt: 'Luxury Suite Bedroom' },
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
    title: 'Heritage Walks',
    tag: 'Culture',
    icon: 'heritage',
    text: 'Explore colonial streets, cafes and culture.',
    alt: 'Traditional fishing boats on coastal beach',
  },
  {
    id: 'boating',
    name: 'img-0414',
    title: 'Boating & Beach Walks',
    tag: 'Adventure',
    icon: 'boat',
    text: 'Sea, sand and authentic coastal boating excursions.',
    alt: 'Coastal boat ride excursion in open blue sea',
  },
  {
    id: 'cuisine',
    name: 'img-2784',
    title: 'Local Food & Markets',
    tag: 'Cuisine',
    icon: 'food',
    text: 'Taste the culture of Pondicherry.',
    alt: 'Golden sunrise over coastal beach dunes',
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
  { name: 'img-9382-effects', cat: 'Resort & Tower', alt: 'Panoramic morning view of Sai Ranga Shores and the ocean' },
  { name: 'image-1', cat: 'Resort & Tower', alt: 'Day and night illuminations of the Sai Ranga Shores tower' },
  { name: 'img-0095', cat: 'Resort & Tower', alt: 'Viewing tower framed by tropical coconut palms' },
  { name: 'img-0125', cat: 'Resort & Tower', alt: 'Resort entrance, car parking & tower with arriving guests' },
  { name: 'img-9141', cat: 'Resort & Tower', alt: 'Breezy rooftop tower pavilion sit-out overlooking the coast' },
  { name: 'tower', cat: 'Resort & Tower', alt: 'Sai Ranga Shores building and blue viewing tower stairs' },

  // 2. Rooms & Suites
  { name: 'img-4941', cat: 'Rooms', alt: 'Panoramic wraparound ocean-view suite bedroom' },
  { name: 'img-4872', cat: 'Rooms', alt: 'Spacious sea-view family room with seating and ocean windows' },
  { name: 'img-4942', cat: 'Rooms', alt: 'Panoramic ocean and palm horizon from bedroom window' },
  { name: 'room-pano', cat: 'Rooms', alt: 'Wide room panorama with wraparound sea-view windows' },
  { name: 'room-interior', cat: 'Rooms', alt: 'Cozy sea-view bedroom sanctuary' },
  { name: 'window-view', cat: 'Rooms', alt: 'Breezy window view of palms and turquoise waters' },
  { name: 'window-view2', cat: 'Rooms', alt: 'Panoramic ocean sit-out view' },

  // 3. Sea & Beach
  { name: 'img-0094', cat: 'Sea & Beach', alt: 'Sweeping panoramic coastline with fishing boats and rolling waves' },
  { name: 'img-0414', cat: 'Sea & Beach', alt: 'Motorboat excursion ride across the open blue sea' },
  { name: 'img-0411', cat: 'Sea & Beach', alt: 'Catamaran boat cruising through turquoise coastal waves' },
  { name: 'img-0113', cat: 'Sea & Beach', alt: 'Pristine ocean waves rolling onto the sand' },
  { name: 'img-0406', cat: 'Sea & Beach', alt: 'Coastal seabird gliding above the gentle waves' },
  { name: 'img-0409', cat: 'Sea & Beach', alt: 'Seagulls soaring over the azure coastline' },
  { name: 'img-4943', cat: 'Sea & Beach', alt: 'Swaying coconut palms framing the turquoise beach' },
  { name: 'beach-pano', cat: 'Sea & Beach', alt: 'Quiet beach with traditional fishing catamarans' },
  { name: 'waves', cat: 'Sea & Beach', alt: 'Turquoise surf rolling onto the peaceful beach' },

  // 4. Sunrise & Sunset
  { name: 'img-9386', cat: 'Sunrise & Sunset', alt: 'Golden sunrise glistening across the ocean horizon' },
  { name: 'img-3413', cat: 'Sunrise & Sunset', alt: 'Morning dawn with sun reflecting on the sea through palm trees' },
  { name: 'img-0330', cat: 'Sunrise & Sunset', alt: 'Golden sunbeams breaking through morning sea clouds' },
  { name: 'img-0331', cat: 'Sunrise & Sunset', alt: 'Radiant morning sun rays over the ocean horizon' },
  { name: 'img-2784', cat: 'Sunrise & Sunset', alt: 'Golden hour sunset over sand dunes and shoreline boat' },
  { name: 'img-4888', cat: 'Sunrise & Sunset', alt: 'Evening sunset glow over the lush coconut canopy' },
  { name: 'sunrise-sea', cat: 'Sunrise & Sunset', alt: 'Golden dawn rising over the Bay of Bengal' },
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
