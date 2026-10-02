/**
 * Dynamic SEO & Metadata Manager for DASTAN
 * Manages document.title, meta descriptions, canonical URLs, and dynamic JSON-LD injection.
 */

export interface SEOMetadataConfig {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  breadcrumbs?: { name: string; path: string }[];
  touristDestination?: {
    name: string;
    description: string;
    region: string;
    altitude: string;
  };
}

export const SEO_PRESETS: Record<string, SEOMetadataConfig> = {
  home: {
    title: 'DASTAN — Discover Pakistan. Experience It Locally.',
    description: 'Discover Pakistan through verified local stays, guides, transport and authentic cultural experiences. Plan your journey with DASTAN.',
    canonicalPath: '/',
    breadcrumbs: [
      { name: 'Home', path: '/' }
    ]
  },
  swat: {
    title: 'Swat Travel Guide & Local Experiences | DASTAN',
    description: 'Explore Swat Valley with verified local guides. Experience ancient Buddhist stupas, emerald rivers, trout cuisine, and Yusufzai Pashtun hospitality.',
    canonicalPath: '/destinations/swat',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Destinations', path: '/destinations' },
      { name: 'Swat Valley', path: '/destinations/swat' }
    ],
    touristDestination: {
      name: 'Swat Valley',
      description: 'Ancient kingdom of Uddiyana, cradled by the Hindu Kush. Known for Buddhist archaeological ruins, emerald rivers, cedar-lined valleys, and Yusufzai hospitality.',
      region: 'Khyber Pakhtunkhwa',
      altitude: '991m – 2,800m'
    }
  },
  kalam: {
    title: 'Kalam Travel Guide & Local Experiences | DASTAN',
    description: 'Plan your journey to Kalam Valley. Explore Mahodand Lake, Ushu pine forest trails, and Falak Sar views with verified mountain 4x4 drivers and guides.',
    canonicalPath: '/destinations/kalam',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Destinations', path: '/destinations' },
      { name: 'Kalam Valley', path: '/destinations/kalam' }
    ],
    touristDestination: {
      name: 'Kalam Valley',
      description: 'Where glacial streams converge into the Swat River. Gateway to Mahodand Lake, Ushu Pine Forest, and waterfalls surrounded by 6,000m peaks.',
      region: 'Khyber Pakhtunkhwa',
      altitude: '2,000m – 3,200m'
    }
  },
  chitral: {
    title: 'Chitral Travel Guide & Cultural Experiences | DASTAN',
    description: 'Discover Chitral and the Kalash Valleys under Tirich Mir. Experience ancient polytheistic culture, traditional Patti weaving, and royal fort heritage.',
    canonicalPath: '/destinations/chitral',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Destinations', path: '/destinations' },
      { name: 'Chitral & Kalash', path: '/destinations/chitral' }
    ],
    touristDestination: {
      name: 'Chitral & Kalash',
      description: 'Home to the unique polytheistic Kalash people in Bumburet, Rumbur, and Birir valleys, ancient polo fields, and fragrant walnut orchards.',
      region: 'Khyber Pakhtunkhwa',
      altitude: '1,500m – 3,500m'
    }
  },
  hunza: {
    title: 'Hunza Valley Travel Guide & Living Heritage | DASTAN',
    description: 'Experience Hunza Valley, Baltit and Altit Forts, Passu Cones, and Attabad Lake with verified indigenous guides along the Karakoram Highway.',
    canonicalPath: '/destinations/hunza',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Destinations', path: '/destinations' },
      { name: 'Hunza Valley', path: '/destinations/hunza' }
    ],
    touristDestination: {
      name: 'Hunza Valley',
      description: 'Encircled by Rakaposhi and Ultar Sar. Renowned for thousand-year-old forts, high literacy, and turquoise Attabad Lake.',
      region: 'Gilgit-Baltistan',
      altitude: '2,438m'
    }
  },
  skardu: {
    title: 'Skardu & Deosai Travel Guide & Expeditions | DASTAN',
    description: 'Gateway to K2, the Deosai alpine plateau, and Katpana Cold Desert. Connect with verified Balti mountain drivers and cultural historians.',
    canonicalPath: '/destinations/skardu',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Destinations', path: '/destinations' },
      { name: 'Skardu & Deosai', path: '/destinations/skardu' }
    ],
    touristDestination: {
      name: 'Skardu & Deosai',
      description: 'Gateway to K2, Broad Peak, and world’s second highest alpine plateau — Deosai. High-altitude cold deserts and Balti culinary traditions.',
      region: 'Gilgit-Baltistan',
      altitude: '2,228m – 4,114m'
    }
  },
  experiences: {
    title: 'Authentic Cultural Experiences in Pakistan | DASTAN',
    description: 'Book authentic culinary masterclasses, pine forest treks, village Hujra evenings, and artisan wool weaving directly with verified local hosts.',
    canonicalPath: '/experiences',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Experiences', path: '/experiences' }
    ]
  },
  learn: {
    title: 'Learn Pashto & Local Culture Before You Travel | DASTAN',
    description: 'Learn essential Pashto and Khowar phrases with authentic pronunciation audio, script, and cultural etiquette before traveling to Pakistan.',
    canonicalPath: '/learn',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Language & Culture', path: '/learn' }
    ]
  },
  safety: {
    title: 'Live Pakistan Mountain Road Status & Travel Safety | DASTAN',
    description: 'Real-time road pass status for Swat Motorway, Kalam, and Lowari Tunnel with 24/7 KPK Tourism Police (1422) and emergency rescue contacts.',
    canonicalPath: '/safety',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Travel Advisory & Safety', path: '/safety' }
    ]
  },
  hosts: {
    title: 'Become a Local Host in Pakistan | DASTAN',
    description: 'Turn your indigenous knowledge into sustainable income. Join the DASTAN verified provider guild for local guides, drivers, artisans, and guesthouses.',
    canonicalPath: '/hosts',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'For Hosts', path: '/hosts' }
    ]
  },
  planner: {
    title: 'Interactive Pakistan Trip Studio & Custom Itineraries | DASTAN',
    description: 'Design and customize your Pakistan itinerary in real-time. Calculate verified costs for family, couple, and solo travel with direct community benefit.',
    canonicalPath: '/trips',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Trip Studio', path: '/trips' }
    ]
  }
};

export function updatePageSEO(config: SEOMetadataConfig) {
  if (typeof document === 'undefined') return;

  // 1. Update Document Title
  document.title = config.title;

  // 2. Update Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', config.description);

  // 3. Update Canonical Tag
  const origin = window.location.origin || 'https://dastan.pk';
  const fullCanonical = `${origin}${config.canonicalPath}`;
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', fullCanonical);

  // 4. Update OpenGraph Tags
  updateMetaProperty('og:title', config.title);
  updateMetaProperty('og:description', config.description);
  updateMetaProperty('og:url', fullCanonical);
  if (config.ogType) updateMetaProperty('og:type', config.ogType);

  // 5. Update Twitter Card Tags
  updateMetaProperty('twitter:title', config.title);
  updateMetaProperty('twitter:description', config.description);

  // 6. Dynamic JSON-LD Structured Data Injection for BreadcrumbList & TouristDestination
  updateDynamicStructuredData(config, fullCanonical);
}

function updateMetaProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(property.startsWith('og:') ? 'property' : 'name', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function updateDynamicStructuredData(config: SEOMetadataConfig, fullCanonical: string) {
  const SCRIPT_ID = 'dastan-dynamic-jsonld';
  let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  const jsonLdGraph: Record<string, unknown>[] = [];

  // Breadcrumbs Schema
  if (config.breadcrumbs && config.breadcrumbs.length > 0) {
    jsonLdGraph.push({
      '@type': 'BreadcrumbList',
      'itemListElement': config.breadcrumbs.map((b, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': b.name,
        'item': b.path.startsWith('http') ? b.path : `https://dastan.pk${b.path}`
      }))
    });
  }

  // TouristDestination Schema
  if (config.touristDestination) {
    jsonLdGraph.push({
      '@type': 'TouristDestination',
      'name': config.touristDestination.name,
      'description': config.touristDestination.description,
      'address': {
        '@type': 'PostalAddress',
        'addressRegion': config.touristDestination.region,
        'addressCountry': 'PK'
      },
      'url': fullCanonical
    });
  }

  if (jsonLdGraph.length > 0) {
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': jsonLdGraph
    });
  } else {
    script.textContent = '';
  }
}
