// ─────────────────────────────────────────────────────────────
//  Page-Wise SEO Configuration & Structured Data
//  Base canonical domain: https://sai-rangashores.vercel.app
// ─────────────────────────────────────────────────────────────

export const SITE_URL = 'https://sai-rangashores.vercel.app';

export const BUSINESS_INFO = {
  name: 'Sai Ranga Shores Beach Home',
  legalName: 'Sai Ranga Shores Beach Home',
  telephone: '+919940038363',
  displayPhone: '+91 99400 38363',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Beachfront, near Pondicherry on ECR',
    addressLocality: 'Pondicherry / ECR',
    addressRegion: 'Tamil Nadu / Pondicherry',
    postalCode: '605014',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 12.3083674,
    longitude: 80.0370708,
  },
  priceRange: '₹3,500 - ₹7,500',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, UPI, Bank Transfer',
  checkinTime: '12:00',
  checkoutTime: '11:00',
  image: `${SITE_URL}/img/hero-sunset-1280.webp`,
  logo: `${SITE_URL}/favicon.svg`,
  mapsUrl: 'https://maps.google.com/maps?q=12.3083674%2C80.0370708&z=17&hl=en',
};

export const SEO_PAGES = {
  '/': {
    title: 'Beach Resort Near Pondicherry on ECR | Sai Ranga Shores Beach Home',
    description:
      'Experience a peaceful beach resort near Pondicherry on ECR at Sai Ranga Shores. Enjoy beachfront stays, panoramic sea view rooms, rooftop horizons & warm hospitality.',
    canonical: `${SITE_URL}/`,
    ogImage: `${SITE_URL}/img/hero-sunset-1280.webp`,
    ogType: 'website',
    primaryKeyword: 'Beach resort near Pondicherry on ECR',
    supportingKeywords: [
      'Beach resort in Pondicherry',
      'Beachfront resort near Pondicherry on ECR',
      'Resorts on ECR near Pondicherry',
      'Beach house near Pondicherry on ECR',
      'Pondicherry beach stay',
      'Sea view resort Pondicherry',
    ],
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': ['LodgingBusiness', 'Resort', 'BedAndBreakfast'],
          '@id': `${SITE_URL}/#resort`,
          name: BUSINESS_INFO.name,
          description:
            'A tranquil beach resort and coastal retreat near Pondicherry on ECR featuring sea view rooms, a 360° observation tower pavilion, and direct beach access.',
          url: `${SITE_URL}/`,
          telephone: BUSINESS_INFO.telephone,
          priceRange: BUSINESS_INFO.priceRange,
          image: [
            `${SITE_URL}/img/hero-sunset-1280.webp`,
            `${SITE_URL}/img/tower-1280.webp`,
            `${SITE_URL}/img/palms-sea-1280.webp`,
          ],
          address: BUSINESS_INFO.address,
          geo: BUSINESS_INFO.geo,
          hasMap: BUSINESS_INFO.mapsUrl,
          checkinTime: BUSINESS_INFO.checkinTime,
          checkoutTime: BUSINESS_INFO.checkoutTime,
          petsAllowed: false,
          amenityFeature: [
            { '@type': 'LocationFeatureSpecification', name: 'Beachfront Location', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'Direct Beach Access', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'Sea View Rooms', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'Observation Tower Pavilion', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'Free Wi-Fi', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'On-site Parking', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning', value: true },
          ],
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: `${SITE_URL}/`,
          name: BUSINESS_INFO.name,
          publisher: { '@id': `${SITE_URL}/#resort` },
        },
      ],
    },
  },

  '/stay': {
    title: 'Sea View Rooms in Pondicherry | Sai Ranga Shores Stay',
    description:
      'Book sea view rooms in Pondicherry at Sai Ranga Shores. Choose deluxe rooms, family beach house suites & rooms near the beach with AC, Wi-Fi & ocean vistas.',
    canonical: `${SITE_URL}/stay`,
    ogImage: `${SITE_URL}/img/img-4941-1280.webp`,
    ogType: 'website',
    primaryKeyword: 'Sea view rooms in Pondicherry',
    supportingKeywords: [
      'Deluxe sea view room Pondicherry',
      'Family room Pondicherry beach resort',
      'Suite room in Pondicherry',
      'Beach house for family in Pondicherry',
      'Rooms near beach in Pondicherry',
    ],
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Stay', item: `${SITE_URL}/stay` },
          ],
        },
        {
          '@type': 'ItemPage',
          '@id': `${SITE_URL}/stay#webpage`,
          url: `${SITE_URL}/stay`,
          name: 'Sea View Rooms & Accommodations in Pondicherry',
          description:
            'Deluxe rooms, family suites and beachfront accommodations near the beach in Pondicherry.',
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: [
              {
                '@type': 'HotelRoom',
                name: 'Deluxe Sea View Room',
                description:
                  'A cozy and comfortable deluxe sea view room in Pondicherry, ideal for couples with wraparound ocean windows.',
                occupancy: { '@type': 'QuantitativeValue', maxValue: 2 },
                bed: { '@type': 'BedDetails', typeOfBed: 'King Bed' },
                offers: {
                  '@type': 'Offer',
                  price: 3500,
                  priceCurrency: 'INR',
                  availability: 'https://schema.org/InStock',
                },
              },
              {
                '@type': 'HotelRoom',
                name: 'Family Room - Beach Resort Stay',
                description:
                  'Spacious family room at our Pondicherry beach resort, featuring dual king beds and direct coastal horizon vistas.',
                occupancy: { '@type': 'QuantitativeValue', maxValue: 4 },
                bed: { '@type': 'BedDetails', typeOfBed: '1 King + 1 Twin Bed' },
                offers: {
                  '@type': 'Offer',
                  price: 5500,
                  priceCurrency: 'INR',
                  availability: 'https://schema.org/InStock',
                },
              },
              {
                '@type': 'HotelRoom',
                name: 'Suite Room in Pondicherry',
                description:
                  'Premium sea-view suite room with living area, panoramic coastal vistas, and direct rooftop pavilion access.',
                occupancy: { '@type': 'QuantitativeValue', maxValue: 4 },
                bed: { '@type': 'BedDetails', typeOfBed: '1 King Bed + Living Area' },
                offers: {
                  '@type': 'Offer',
                  price: 7500,
                  priceCurrency: 'INR',
                  availability: 'https://schema.org/InStock',
                },
              },
            ],
          },
        },
      ],
    },
  },

  '/experiences': {
    title: 'Things to Do in Pondicherry | Sightseeing & Beach Walks',
    description:
      'Discover top things to do in Pondicherry during your beach stay. Explore sunrise ocean views, quiet beach walks, French Quarter heritage walks & local cuisine.',
    canonical: `${SITE_URL}/experiences`,
    ogImage: `${SITE_URL}/img/beach-pano-1280.webp`,
    ogType: 'website',
    primaryKeyword: 'Things to do in Pondicherry',
    supportingKeywords: [
      'Heritage walk Pondicherry',
      'Boating in Pondicherry',
      'Pondicherry sunrise view',
      'Beach walks in Pondicherry',
      'Pondicherry local food and markets',
    ],
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Experiences', item: `${SITE_URL}/experiences` },
          ],
        },
        {
          '@type': 'ItemPage',
          '@id': `${SITE_URL}/experiences#webpage`,
          url: `${SITE_URL}/experiences`,
          name: 'Things to Do in Pondicherry & Coastal Experiences',
          description:
            'A guide to coastal beach walks, sunrise viewing, French Quarter heritage trails, and local culinary experiences around Pondicherry.',
        },
      ],
    },
  },

  '/gallery': {
    title: 'Sai Ranga Shores Photos | Pondicherry Beach Resort Gallery',
    description:
      'View authentic Sai Ranga Shores photos: explore our sea view rooms, golden Pondicherry sunrise views, observation tower panorama & beachfront resort gallery.',
    canonical: `${SITE_URL}/gallery`,
    ogImage: `${SITE_URL}/img/img-9382-effects-1280.webp`,
    ogType: 'website',
    primaryKeyword: 'Sai Ranga Shores photos',
    supportingKeywords: [
      'Pondicherry beach resort photos',
      'Sea view room photos Pondicherry',
      'Pondicherry sunrise photos',
      'Beachfront resort Pondicherry gallery',
      'Observation tower view Pondicherry',
    ],
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Gallery', item: `${SITE_URL}/gallery` },
          ],
        },
        {
          '@type': 'ImageGallery',
          '@id': `${SITE_URL}/gallery#gallery`,
          url: `${SITE_URL}/gallery`,
          name: 'Sai Ranga Shores Beach Home Photo Gallery',
          description:
            'Real resort photos of Sai Ranga Shores Beach Home in Pondicherry, including observation tower views, sea view room photos, and golden sunrise horizons.',
        },
      ],
    },
  },

  '/about': {
    title: 'Sai Ranga Shores Beach Home | Peaceful Retreat Pondicherry',
    description:
      'Discover Sai Ranga Shores Beach Home, a peaceful beachfront homestay and coastal escape in Pondicherry offering warm hospitality just steps from the sea.',
    canonical: `${SITE_URL}/about`,
    ogImage: `${SITE_URL}/img/tower-1280.webp`,
    ogType: 'website',
    primaryKeyword: 'Sai Ranga Shores Beach Home',
    supportingKeywords: [
      'Beach home in Pondicherry',
      'Beachfront homestay Pondicherry',
      'Peaceful beach retreat Pondicherry',
      'Coastal escape in Pondicherry',
      'Sai Ranga Shores Pondicherry',
    ],
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/about` },
          ],
        },
        {
          '@type': 'AboutPage',
          '@id': `${SITE_URL}/about#webpage`,
          url: `${SITE_URL}/about`,
          name: 'About Sai Ranga Shores Beach Home Pondicherry',
          description:
            'The story and vision behind Sai Ranga Shores Beach Home, a peaceful seaside retreat and coastal homestay near Pondicherry on ECR.',
          mainEntity: {
            '@type': 'LodgingBusiness',
            name: BUSINESS_INFO.name,
            url: `${SITE_URL}/`,
            telephone: BUSINESS_INFO.telephone,
            address: BUSINESS_INFO.address,
          },
        },
      ],
    },
  },

  '/contact': {
    title: 'Contact & Booking | Sai Ranga Shores Beach Home Pondicherry',
    description:
      'Contact Sai Ranga Shores Beach Home in Pondicherry for room inquiries, direct booking & tariffs. Reach us via phone, WhatsApp or our quick online enquiry form.',
    canonical: `${SITE_URL}/contact`,
    ogImage: `${SITE_URL}/img/tower-1280.webp`,
    ogType: 'website',
    primaryKeyword: 'Contact Sai Ranga Shores Pondicherry',
    supportingKeywords: [
      'Sai Ranga Shores booking',
      'Pondicherry beach resort contact',
      'Pondicherry beach home phone number',
    ],
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_URL}/contact` },
          ],
        },
        {
          '@type': 'ContactPage',
          '@id': `${SITE_URL}/contact#webpage`,
          url: `${SITE_URL}/contact`,
          name: 'Contact & Room Enquiries - Sai Ranga Shores Beach Home',
          description:
            'Contact Sai Ranga Shores Beach Home for room booking inquiries, availability checks, and directions.',
          mainEntity: {
            '@type': 'LodgingBusiness',
            name: BUSINESS_INFO.name,
            telephone: BUSINESS_INFO.telephone,
            address: BUSINESS_INFO.address,
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: BUSINESS_INFO.telephone,
              contactType: 'reservations',
              availableLanguage: ['English', 'Tamil'],
            },
          },
        },
      ],
    },
  },
};
