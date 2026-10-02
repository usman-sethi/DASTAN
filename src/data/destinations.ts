import { Destination } from '../types';

export const destinations: Destination[] = [
  {
    id: 'swat',
    name: 'Swat Valley',
    tagline: 'The Switzerland of Pakistan',
    urduName: 'وادیٔ سوات',
    region: 'Malakand Division',
    province: 'Khyber Pakhtunkhwa',
    description: 'Ancient kingdom of Uddiyana, cradled by the Hindu Kush. Known for Buddhist archaeological ruins, emerald rivers, cedar-lined valleys, and legendary Yusufzai hospitality.',
    heroImage: '/images/hero_swat_valley.webp',
    heroImageSrcSet: '/images/hero_swat_valley-480w.webp 480w, /images/hero_swat_valley-800w.webp 800w, /images/hero_swat_valley-1200w.webp 1200w, /images/hero_swat_valley.webp 1376w',
    heroImageSizes: '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px',
    rating: 4.88,
    reviewsCount: 342,
    verifiedProvidersCount: 54,
    experiencesCount: 128,
    startingPricePKR: 28000,
    bestSeason: 'April – October (Spring blossoms & Autumn fruit harvest)',
    altitude: '991 m – 2,800 m',
    roadStatus: 'open',
    roadNote: 'Swat Motorway (M-16) fully paved & operational to Chakdara and Mingora.',
    weatherSummary: {
      tempC: 19,
      condition: 'Partly Sunny & Crisp',
      icon: 'Sun',
    },
    highlights: [
      'Malam Jabba alpine peaks & cedar forests',
      'Buddhist rock carvings & Butkara stupas in Saidu Sharif',
      'Fizagat riverfront culinary stops with fresh river trout',
      'White Palace of Marghazar (carved from pure white Swat marble)',
      'Miandam village orchards & terraced stream trails'
    ],
    stays: [
      {
        id: 'swat-stay-1',
        name: 'The Swat Serena Heritage Hotel',
        type: 'Heritage Guesthouse & Gardens',
        pricePerNight: 16500,
        rating: 4.9,
        reviewsCount: 184,
        verified: true,
        location: 'Saidu Sharif, Swat',
        features: ['Traditional wood-carved verandas', 'Organic garden cafe', 'Verified secure host']
      },
      {
        id: 'swat-stay-2',
        name: 'Miandam Pine Retreat',
        type: 'Eco-Lodge & Family Homestay',
        pricePerNight: 8500,
        rating: 4.8,
        reviewsCount: 92,
        verified: true,
        location: 'Miandam, Upper Swat',
        features: ['Valley river view', 'Home-cooked Pashtun breakfast', 'Solar powered']
      },
      {
        id: 'swat-stay-3',
        name: 'Fizagat River Haven',
        type: 'Riverside Boutique Hotel',
        pricePerNight: 6500,
        rating: 4.7,
        reviewsCount: 120,
        verified: true,
        location: 'Mingora Riverbank',
        features: ['Riverside lawn', 'Fresh trout restaurant', '24/7 power backup']
      }
    ],
    movementOptions: [
      {
        id: 'swat-move-1',
        type: 'Private 4x4 Mountain Cruiser with Local Driver',
        providerName: 'Khan Transport Syndicate (Gul Zarin & Team)',
        vehicleModel: 'Toyota Prado TX / Revo 4WD',
        dailyRatePKR: 11000,
        rating: 4.95,
        verified: true
      },
      {
        id: 'swat-move-2',
        type: 'Family Saloon with Verified Driver',
        providerName: 'Malakand Chauffeur Service',
        vehicleModel: 'Toyota Corolla Altis',
        dailyRatePKR: 6500,
        rating: 4.85,
        verified: true
      }
    ],
    culturalCustoms: [
      'Pashtunwali hospitality ("Melmastia") is sacred; guests are honored family members.',
      'Always greet elders first with "Salam alaikum" placing your right hand over your chest.',
      'Dress modestly covering shoulders and knees out of community respect.',
      'Always ask before photographing artisans or local women in traditional villages.'
    ]
  },
  {
    id: 'kalam',
    name: 'Kalam Valley',
    tagline: 'Into the High Mountains & Alpine Lakes',
    urduName: 'کالام',
    region: 'Upper Swat',
    province: 'Khyber Pakhtunkhwa',
    description: 'Where glacial streams converge into the Swat River. Gateway to Mahodand Lake, Ushu Pine Forest, and Matiltan waterfalls surrounded by 6,000m peaks.',
    heroImage: '/images/dest_kalam_mountains.webp',
    heroImageSrcSet: '/images/dest_kalam_mountains-480w.webp 480w, /images/dest_kalam_mountains-800w.webp 800w, /images/dest_kalam_mountains.webp 1200w',
    heroImageSizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px',
    rating: 4.91,
    reviewsCount: 268,
    verifiedProvidersCount: 38,
    experiencesCount: 76,
    startingPricePKR: 32000,
    bestSeason: 'May – September (Pleasant alpine summer)',
    altitude: '2,000 m – 3,200 m',
    roadStatus: 'open',
    roadNote: 'Kalam main artery open; 4x4 recommended beyond Kalam bazaar to Mahodand Lake.',
    weatherSummary: {
      tempC: 14,
      condition: 'Fresh Alpine Breeze',
      icon: 'CloudSun',
    },
    highlights: [
      'Emerald waters of Mahodand & Saifullah Lakes',
      'Dense ancient Ushu deodar and pine forests',
      'Traditional Kohistani wooden architecture in Utror',
      'Matiltan glacier view & mountain waterfall walks',
      'Local riverside wild mint tea and walnut bread'
    ],
    stays: [
      {
        id: 'kalam-stay-1',
        name: 'Greens Hotel Kalam Riverside',
        type: 'Mountain Riverside Lodge',
        pricePerNight: 9500,
        rating: 4.8,
        reviewsCount: 112,
        verified: true,
        location: 'Main Kalam River Road',
        features: ['Direct river sound view', 'Campfire terrace', 'Heating included']
      },
      {
        id: 'kalam-stay-2',
        name: 'Ushu Pine Eco-Cottages',
        type: 'Wooden Alpine Cottage',
        pricePerNight: 12000,
        rating: 4.9,
        reviewsCount: 64,
        verified: true,
        location: 'Ushu Forest Trail',
        features: ['Handcrafted cedar cabins', 'Organic breakfast', 'Stargazing platform']
      }
    ],
    movementOptions: [
      {
        id: 'kalam-move-1',
        type: '4x4 Mountain Jeep with High-Altitude Specialist',
        providerName: 'Kalam Valley 4x4 Cooperative',
        vehicleModel: 'Toyota Land Cruiser Mountain 4x4',
        dailyRatePKR: 9000,
        rating: 4.92,
        verified: true
      }
    ],
    culturalCustoms: [
      'Respect alpine fragile vegetation; leave no plastic behind in Ushu and Mahodand.',
      'Sipping "Shin-chai" (green tea with cardamoms) signifies gratitude and companionship.'
    ]
  },
  {
    id: 'chitral',
    name: 'Chitral & Kalash',
    tagline: 'Where Ancient Cultures Meet',
    urduName: 'چترال و کیلاش',
    region: 'Hindu Kush Range',
    province: 'Khyber Pakhtunkhwa',
    description: 'Under the shadow of 7,708m Tirich Mir. Home to the unique polytheistic Kalash people in Bumburet, Rumbur, and Birir valleys, ancient polo fields, and fragrant walnut orchards.',
    heroImage: '/images/dest_chitral_culture.webp',
    heroImageSrcSet: '/images/dest_chitral_culture-480w.webp 480w, /images/dest_chitral_culture-800w.webp 800w, /images/dest_chitral_culture.webp 1200w',
    heroImageSizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px',
    rating: 4.94,
    reviewsCount: 198,
    verifiedProvidersCount: 31,
    experiencesCount: 64,
    startingPricePKR: 36000,
    bestSeason: 'May – October (Chilimjusht, Uchal & Choimus festivals)',
    altitude: '1,500 m – 3,500 m',
    roadStatus: 'open',
    roadNote: 'Lowari Tunnel operational 24/7 connecting Dir to Chitral year-round.',
    weatherSummary: {
      tempC: 17,
      condition: 'Clear Mountain Sky',
      icon: 'Sun',
    },
    highlights: [
      'Kalash indigenous living heritage in Bumburet & Rumbur',
      'Historic Chitral Shahi Mosque & Royal Fort on Chitral River',
      'Polo matches at Shandur Pass (the roof of the world)',
      'Traditional woolen Patti weaving & Chitrali cap embroidery',
      'Ayun village terraced fruit gardens and mountain streams'
    ],
    stays: [
      {
        id: 'chitral-stay-1',
        name: 'Ayun Fort Heritage Guesthouse',
        type: 'Royal Garden Homestay',
        pricePerNight: 11500,
        rating: 4.95,
        reviewsCount: 104,
        verified: true,
        location: 'Ayun Valley, Lower Chitral',
        features: ['Historic orchard gardens', 'Local Khowar culinary hosts', 'Chitral river view']
      },
      {
        id: 'chitral-stay-2',
        name: 'Kalash Village Heritage Lodge',
        type: 'Community-Run Cultural Lodge',
        pricePerNight: 7000,
        rating: 4.88,
        reviewsCount: 78,
        verified: true,
        location: 'Bumburet Valley, Kalash',
        features: ['Direct support to Kalash community fund', 'Cultural dance evenings', 'Local guides']
      }
    ],
    movementOptions: [
      {
        id: 'chitral-move-1',
        type: 'Rugged Mountain 4x4 with Indigenous Guide Driver',
        providerName: 'Tirich Mir Expeditions (Sardar & Brothers)',
        vehicleModel: 'Toyota Hilux 4x4 Double Cabin',
        dailyRatePKR: 11500,
        rating: 4.96,
        verified: true
      }
    ],
    culturalCustoms: [
      'In Kalash valleys, respect sacred "Bashali" maternity grounds where male visitors are strictly barred.',
      'Purchase handicrafts directly from female artisans to support household education directly.',
      'Enjoy slow-cooked "Ghalmandi" (flatbread filled with cottage cheese and melted walnut butter).'
    ]
  },
  {
    id: 'hunza',
    name: 'Hunza Valley',
    tagline: 'Beyond the Peaks',
    urduName: 'ہنزہ',
    region: 'Gilgit-Baltistan',
    province: 'Gilgit-Baltistan',
    description: 'Encircled by Rakaposhi, Ultar Sar, and Ladyfinger Peak. Renowned for thousand-year-old Baltit and Altit Forts, high literacy, apricot kernel oil, and turquoise Attabad Lake.',
    heroImage: '/images/dest_hunza_passu.webp',
    heroImageSrcSet: '/images/dest_hunza_passu-480w.webp 480w, /images/dest_hunza_passu-800w.webp 800w, /images/dest_hunza_passu.webp 1200w',
    heroImageSizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px',
    rating: 4.96,
    reviewsCount: 412,
    verifiedProvidersCount: 62,
    experiencesCount: 140,
    startingPricePKR: 42000,
    bestSeason: 'March – November (Cherry blossom in spring, golden autumn in Oct)',
    altitude: '2,438 m',
    roadStatus: 'open',
    roadNote: 'Karakoram Highway (N-35) smooth and open all year.',
    weatherSummary: {
      tempC: 16,
      condition: 'Sunny & Golden',
      icon: 'Sun',
    },
    highlights: [
      'Sunset view of Rakaposhi from Duikar Eagle’s Nest',
      'Restored UNESCO heritage Baltit and Altit Forts',
      'Attabad Lake boating and Passu suspension bridge',
      'Traditional apricot soup ("Chamurx") & walnut walnut bread',
      'Women artisans carpet weaving center at Ganish'
    ],
    stays: [
      {
        id: 'hunza-stay-1',
        name: 'Karimabad Heritage Suites',
        type: 'Stone & Wood Boutique Lodge',
        pricePerNight: 14000,
        rating: 4.9,
        reviewsCount: 160,
        verified: true,
        location: 'Karimabad, Central Hunza',
        features: ['Unobstructed Rakaposhi view', 'Rooftop terrace', 'Organic breakfast']
      }
    ],
    movementOptions: [
      {
        id: 'hunza-move-1',
        type: 'Karakoram Highway Cruiser',
        providerName: 'Hunza Local Chauffeur Union',
        vehicleModel: 'Toyota HiAce Grand Cabin / Prado',
        dailyRatePKR: 12000,
        rating: 4.94,
        verified: true
      }
    ],
    culturalCustoms: [
      'Hunzakuts are extraordinarily warm and educated; feel free to engage in conversations on history.',
      'Remove shoes when entering traditional carpeted sitting rooms ("Baipik").'
    ]
  },
  {
    id: 'skardu',
    name: 'Skardu & Deosai',
    tagline: 'Where Earth Meets Sky',
    urduName: 'سکردو',
    region: 'Baltistan',
    province: 'Gilgit-Baltistan',
    description: 'Gateway to K2, Broad Peak, and the world’s second highest alpine plateau — Deosai. High-altitude cold deserts, historic Kharpocho Fort, and pristine Katpana sand dunes.',
    heroImage: '/images/dest_skardu_karakoram.webp',
    heroImageSrcSet: '/images/dest_skardu_karakoram-480w.webp 480w, /images/dest_skardu_karakoram-800w.webp 800w, /images/dest_skardu_karakoram.webp 1200w',
    heroImageSizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px',
    rating: 4.92,
    reviewsCount: 284,
    verifiedProvidersCount: 44,
    experiencesCount: 88,
    startingPricePKR: 48000,
    bestSeason: 'June – October',
    altitude: '2,228 m – 4,114 m',
    roadStatus: 'open',
    roadNote: 'Skardu All-Weather International Highway open; daily direct flights from Islamabad.',
    weatherSummary: {
      tempC: 15,
      condition: 'Bright Mountain Sun',
      icon: 'Sun',
    },
    highlights: [
      'Deosai National Park & Sheosar Lake (Land of Giants)',
      'Katpana Cold Desert sand dunes under snow peaks',
      'Lower Kachura (Shangrila) & Upper Kachura Lake',
      'Ancient Kharpocho Fort overlooking Indus River',
      'Balti culinary traditions: Gyaling and Butter Tea'
    ],
    stays: [
      {
        id: 'skardu-stay-1',
        name: 'Kharpocho View Heritage Lodge',
        type: 'Traditional Balti Stone Lodge',
        pricePerNight: 12500,
        rating: 4.86,
        reviewsCount: 96,
        verified: true,
        location: 'Near Skardu Old Bazaar',
        features: ['Indus river terrace', 'Balti wood stoves', 'Verified local guide desk']
      }
    ],
    movementOptions: [
      {
        id: 'skardu-move-1',
        type: 'Deosai-Certified 4x4 Mountain Jeep',
        providerName: 'Baltistan Mountain Drivers Guild',
        vehicleModel: 'Toyota Land Cruiser 4x4',
        dailyRatePKR: 12500,
        rating: 4.95,
        verified: true
      }
    ],
    culturalCustoms: [
      'Respect the fragile wildlife in Deosai (Himalayan Brown Bear habitat).',
      'Drink plenty of water to acclimatize before ascending above 3,500m.'
    ]
  }
];
