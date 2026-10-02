import { Provider } from '../types';

export const providers: Provider[] = [
  {
    id: 'prov-ahmad-khan',
    name: 'Ahmad Khan Yousafzai',
    role: 'Licensed Senior Heritage Guide & Historian',
    destinationId: 'swat',
    destinationName: 'Swat Valley',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    rating: 4.95,
    tripsCount: 142,
    yearsExperience: 9,
    verifiedBadges: {
      identity: true,
      location: true,
      business: true,
      community: true,
    },
    languages: ['Pashto', 'Urdu', 'English'],
    bio: 'Born in Saidu Sharif, Ahmad studied archaeology and local Pashtun ethnography. Over the last 9 years, he has led over 140 journeys across Swat, from Buddhist monastic ruins to hidden cedar forest homesteads.',
    specialties: ['Archaeological Storytelling', 'Yusufzai History', 'Hiking & Hidden Trails', 'Family-Friendly Tours'],
    dailyRatePKR: 4500,
    recentReview: {
      author: 'Dr. Tariq Masood',
      city: 'Islamabad',
      rating: 5,
      text: 'Ahmad did not just show us Swat; he made us understand the dignity and warmth of Pashtun culture. My teenage kids were fascinated by his stories of the ancient Uddiyana civilization.',
      date: 'September 2026'
    }
  },
  {
    id: 'prov-gul-zarin',
    name: 'Gul Zarin',
    role: 'Mountain Expedition Driver & Alpine Specialist',
    destinationId: 'kalam',
    destinationName: 'Kalam Valley',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    rating: 4.98,
    tripsCount: 215,
    yearsExperience: 14,
    verifiedBadges: {
      identity: true,
      location: true,
      business: true,
      community: true,
    },
    languages: ['Kohistani', 'Pashto', 'Urdu'],
    bio: 'Gul has traversed the rugged passes between Kalam, Mahodand, and Utror in all weather conditions for 14 years. A master mechanic and defensive mountain driver certified by KPK Tourism Authority.',
    specialties: ['High Altitude 4x4', 'River Crossings', 'Off-grid Route Safety', 'Wild Trout Spots'],
    dailyRatePKR: 7500,
    recentReview: {
      author: 'Ayesha & Bilal Qureshi',
      city: 'Lahore',
      rating: 5,
      text: 'Even when the mountain weather changed suddenly, Gul navigated the Mahodand trail with absolute calm and safety. He also introduced us to local shepherds who shared hot chai with us.',
      date: 'August 2026'
    }
  },
  {
    id: 'prov-bibi-maryam',
    name: 'Bibi Maryam',
    role: 'Indigenous Textile Artisan & Culinary Host',
    destinationId: 'chitral',
    destinationName: 'Chitral & Kalash',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
    rating: 4.96,
    tripsCount: 98,
    yearsExperience: 16,
    verifiedBadges: {
      identity: true,
      location: true,
      business: true,
      community: true,
    },
    languages: ['Khowar', 'Kalasha', 'Urdu'],
    bio: 'Leader of the Ayun Women’s Craft Collective. Bibi Maryam preserves Chitrali Patti embroidery and hosts travelers in her family courtyard for traditional Khowar dinners cooked over walnut wood fires.',
    specialties: ['Traditional Patti Weaving', 'Organic Mountain Cooking', 'Kalash Folklore', 'Medicinal Herb Gathering'],
    dailyRatePKR: 3800,
    recentReview: {
      author: 'Fatima Zaidi',
      city: 'Karachi',
      rating: 5,
      text: 'Sitting in Bibi Maryam’s orchard learning how she spins indigenous sheep wool while eating freshly baked Ghalmandi was the highlight of our entire trip to the North.',
      date: 'July 2026'
    }
  },
  {
    id: 'prov-karim-shah',
    name: 'Karim Shah Hunzai',
    role: 'Cultural Historian & Trekking Guide',
    destinationId: 'hunza',
    destinationName: 'Hunza Valley',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
    rating: 4.92,
    tripsCount: 167,
    yearsExperience: 11,
    verifiedBadges: {
      identity: true,
      location: true,
      business: true,
      community: true,
    },
    languages: ['Burushaski', 'Wakhi', 'Urdu', 'English'],
    bio: 'Graduate of Karakoram International University in Cultural Heritage. Karim brings 800-year-old Silk Road stories alive within the stone corridors of Baltit and Altit Forts.',
    specialties: ['Silk Road History', 'Glacier Navigation', 'Village Philosophy & Longevity', 'Stargazing'],
    dailyRatePKR: 5000,
    recentReview: {
      author: 'Hamza Farooq',
      city: 'Peshawar',
      rating: 5,
      text: 'Karim’s deep knowledge of Burushaski language roots and Silk Road treaties blew us away. Truly world-class guidance with genuine humility.',
      date: 'May 2026'
    }
  }
];
