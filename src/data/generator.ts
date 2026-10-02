import { destinations } from './destinations';
import { TripPlanConfig, GeneratedItinerary, ItineraryDay } from '../types';

export function generateTripItinerary(config: TripPlanConfig): GeneratedItinerary {
  const dest = destinations.find(d => d.id === config.destinationId) || destinations[0];
  const { days, budgetTier, travelerType, interests, customServices } = config;

  // Base daily rates (in PKR) depending on budget tier
  const tierMultiplier = budgetTier === 'budget' ? 0.75 : budgetTier === 'luxury' ? 1.75 : 1.0;
  
  // Traveler size multiplier
  let travelerMultiplier = 1.0;
  if (travelerType === 'couple') travelerMultiplier = 1.6;
  if (travelerType === 'family') travelerMultiplier = 2.5;
  if (travelerType === 'friends') travelerMultiplier = 2.2;

  // Calculate realistic cost breakdown based on services toggled
  const baseStayPerNight = (dest.stays[0]?.pricePerNight || 9000) * (budgetTier === 'budget' ? 0.6 : budgetTier === 'luxury' ? 1.4 : 1.0);
  const stayCost = customServices.includeStay ? Math.round(baseStayPerNight * (days - 1 || 1) * (travelerType === 'family' ? 1.6 : 1.0)) : 0;

  const baseDailyTransport = (dest.movementOptions[0]?.dailyRatePKR || 8000) * (travelerType === 'family' ? 1.25 : 1.0);
  const transportCost = customServices.includeDriver ? Math.round(baseDailyTransport * days * tierMultiplier) : 0;

  const baseDailyGuide = 4000;
  const guideCost = customServices.includeGuide ? Math.round(baseDailyGuide * Math.min(days, 3) * (budgetTier === 'luxury' ? 1.4 : 1.0)) : 0;

  const experienceCostPerDay = 3000 * travelerMultiplier;
  const experiencesCost = customServices.includeExperiences ? Math.round(experienceCostPerDay * Math.max(1, Math.round(days * 0.65))) : 0;

  const subtotal = stayCost + transportCost + guideCost + experiencesCost;
  const dastanFee = Math.round(subtotal * 0.05); // 5% platform commission
  const total = subtotal + dastanFee;

  // Generate itinerary days based on destination and selected interests
  const generatedDays: ItineraryDay[] = [];

  for (let i = 1; i <= days; i++) {
    generatedDays.push(createDayPlan(dest.id, i, days, interests));
  }

  const travelerLabel = travelerType === 'solo' ? 'Solo Traveler' : travelerType === 'couple' ? 'Couple Journey' : travelerType === 'family' ? 'Family Heritage Story' : 'Friends Expedition';

  return {
    id: `DST-${dest.id.toUpperCase()}-${days}D-${Date.now().toString().slice(-4)}`,
    title: `Your ${days}-Day ${dest.name} Story`,
    urduTitle: `آپ کی ${days} روزہ داستانِ ${dest.name}`,
    destination: dest,
    days: generatedDays,
    costBreakdown: {
      stay: stayCost,
      transport: transportCost,
      guide: guideCost,
      experiences: experiencesCost,
      dastanFee,
      total
    },
    economicDistribution: {
      localProvidersPct: 86,
      communityFundPct: 9,
      dastanPlatformPct: 5
    }
  };
}

function createDayPlan(destinationId: string, dayNum: number, totalDays: number, interests: string[]): ItineraryDay {
  const isFirstDay = dayNum === 1;
  const isLastDay = dayNum === totalDays;

  // Destination-specific customized day plans
  if (destinationId === 'swat') {
    if (isFirstDay) {
      return {
        dayNumber: dayNum,
        title: 'Arrival in the Ancient Kingdom of Uddiyana',
        subtitle: 'Scenic Swat Expressway, Mingora Riverfront & Warm Pashtun Welcome',
        morning: {
          time: '08:30 AM – 11:30 AM',
          activity: 'Scenic transit through Swat Expressway (M-16), crossing the Chakdara hills into the verdant valley of Lower Swat.',
          location: 'Swat Motorway & River Gateway'
        },
        afternoon: {
          time: '12:30 PM – 03:30 PM',
          activity: 'Check into your verified riverside heritage guesthouse. Traditional welcome with green cardamom tea followed by a visit to Butkara I Buddhist stupa.',
          location: 'Saidu Sharif & Butkara Stupas'
        },
        evening: {
          time: '05:30 PM – 08:30 PM',
          activity: 'Swati Kitchen Welcome Dinner: Fresh grilled trout from Fizagat alongside Shinwari lamb Karahi with host Ahmad Khan.',
          location: 'Fizagat Riverfront & Traditional Kitchen'
        },
        culturalHighlight: 'Pashtuns view guests as a sacred blessing ("Mehman da Allah Rahmat de"). You will experience this immediately upon arrival.',
        recommendedLocalDish: 'Pan-fried Swat River Trout with pomegranate dry chutney & hot Roghani Naan'
      };
    }

    if (isLastDay) {
      return {
        dayNumber: dayNum,
        title: 'Bazaar Traditions & Departure with Warm Memories',
        subtitle: 'Mingora Handicrafts, Herbal Bazaars & Return Journey',
        morning: {
          time: '08:00 AM – 10:30 AM',
          activity: 'Rooftop morning breakfast overlooking Swat River. Walk through Mingora’s historic bazaar for genuine woolen shawls, wild honey, and dried apricots.',
          location: 'Mingora Heritage Cloth Market'
        },
        afternoon: {
          time: '11:30 AM – 02:30 PM',
          activity: 'Farewell stop at the White Palace of Marghazar (built in 1940 with white Swat marble). Photo session among ancient walnut groves.',
          location: 'White Palace, Marghazar'
        },
        evening: {
          time: '04:00 PM – 07:30 PM',
          activity: 'Comfortable return drive along the motorway towards Islamabad/Peshawar with scenic sunset over Malakand pass.',
          location: 'Swat Expressway Transit'
        },
        culturalHighlight: 'Hosts will pack a small bundle of roasted walnuts and dried mountain herbs as "Zikray" (gift of remembrance).',
        recommendedLocalDish: 'Sweet rice Zarda with crushed Swat walnuts & saffron Kahwa'
      };
    }

    if (dayNum === 2) {
      return {
        dayNumber: dayNum,
        title: 'Alpine Heights of Malam Jabba & Cedar Forests',
        subtitle: 'Mountain Ridge Views, Chairlift & Traditional Shepherds',
        morning: {
          time: '09:00 AM – 12:00 PM',
          activity: 'Scenic mountain climb to Malam Jabba (2,804m). Panoramic chairlift ride overlooking the snow-dusted Hindu Kush peaks and pristine pine slopes.',
          location: 'Malam Jabba Ski Resort & Ridge'
        },
        afternoon: {
          time: '01:00 PM – 04:00 PM',
          activity: 'Forest walk along ancient shepherd trails. Meet a local Gujjar nomad family tending mountain cows and taste freshly churned butter with cornbread.',
          location: 'Upper Cedar Forest Trail'
        },
        evening: {
          time: '06:00 PM – 08:30 PM',
          activity: 'Warm clay-pot dinner in village homestead with acoustic Pashto Rubab music by local folk instrumentalists.',
          location: 'Malam Jabba Village Hujra'
        },
        culturalHighlight: 'Listen to the 18-stringed Rubab, often called the "Lion of Instruments" in Afghan and Pashtun classical poetry.',
        recommendedLocalDish: 'Slow-cooked mutton Rosh with whole baby potatoes and cumin salt'
      };
    }

    // Default middle days for Swat
    return {
      dayNumber: dayNum,
      title: 'Journey to Upper Swat & Miandam Orchards',
      subtitle: 'Terraced Valleys, Mountain Brooks & Village Crafts',
      morning: {
        time: '08:30 AM – 11:30 AM',
        activity: 'Drive along the turquoise Swat River towards the peaceful village of Miandam, renowned for hillside apple and persimmon orchards.',
        location: 'Miandam Valley'
      },
      afternoon: {
        time: '01:00 PM – 04:00 PM',
        activity: 'Hands-on woodworking and embroidery session with local artisans carving traditional Swati architectural floral motifs.',
        location: 'Miandam Crafts Center'
      },
      evening: {
        time: '05:30 PM – 08:30 PM',
        activity: 'Sunset tea by the mountain stream, accompanied by storytelling on the historical travels of Chinese monk Xuanzang through Swat.',
        location: 'Miandam Stream Terrace'
      },
      culturalHighlight: 'Swati wood-carving techniques trace directly back to Gandharan Greco-Buddhist friezes preserved in local homes.',
      recommendedLocalDish: 'Doday (thick sweet corn flatbread) served with fresh clotted mountain cream'
    };
  }

  // Kalam day plans
  if (destinationId === 'kalam') {
    if (isFirstDay) {
      return {
        dayNumber: dayNum,
        title: 'Ascent into the Alpine Heart of Kalam',
        subtitle: 'River Gorges, Cedar Suspension Bridges & Mountain Air',
        morning: {
          time: '08:00 AM – 12:00 PM',
          activity: 'Drive from Bahrain to Kalam along the dramatic rock-cut Swat River gorge. Stop at Madyan for fresh mountain river chai.',
          location: 'Bahrain to Kalam Alpine Artery'
        },
        afternoon: {
          time: '01:30 PM – 04:30 PM',
          activity: 'Arrive in Kalam (2,000m). Settle into your riverside lodge with direct views of Falak Sar peak (5,918m).',
          location: 'Kalam Riverside Lodge'
        },
        evening: {
          time: '06:00 PM – 08:30 PM',
          activity: 'Walk through Kalam bazaar to meet mountain guide Gul Zarin; briefing for the upcoming alpine lake expedition around a pine campfire.',
          location: 'Kalam Old Bazaar & Campfire'
        },
        culturalHighlight: 'Kalam is the cultural nexus of Kohistani and Pashto cultures, known for deep forest woodcraft.',
        recommendedLocalDish: 'Kalam Karahi prepared with wild black cumin and mountain ginger'
      };
    }

    if (dayNum === 2) {
      return {
        dayNumber: dayNum,
        title: '4x4 Expedition to Mahodand & Saifullah Lakes',
        subtitle: 'Ushu Pine Forests, Glacial Springs & Emerald Alpine Waters',
        morning: {
          time: '07:30 AM – 11:30 AM',
          activity: 'Board a rugged 4x4 cruiser with Gul Zarin through the ancient Ushu deodar forest and past Matiltan glacier waterfalls.',
          location: 'Ushu Forest & Matiltan Valley'
        },
        afternoon: {
          time: '12:00 PM – 03:30 PM',
          activity: 'Reach Mahodand Lake (2,865m). Wooden boat ride across the glacial turquoise waters surrounded by wildflowers and snow peaks.',
          location: 'Mahodand & Saifullah Lakes'
        },
        evening: {
          time: '05:00 PM – 08:00 PM',
          activity: 'Picnic trout lunch prepared by lake shores, followed by a scenic return drive as golden light illuminates the granite pinnacles.',
          location: 'Mahodand Shores'
        },
        culturalHighlight: 'Mahodand translates to "Lake of Fishes" in the local Pashto dialect, fed directly by Hindu Kush snowmelt.',
        recommendedLocalDish: 'Charcoal-grilled Mahodand trout seasoned with wild dried mint'
      };
    }

    return {
      dayNumber: dayNum,
      title: 'Utror Valleys & Alpine Meadow Walk',
      subtitle: 'Traditional Kohistani Architecture & Mountain Wildflower Trails',
      morning: {
        time: '08:30 AM – 11:30 AM',
        activity: 'Morning excursion to Utror village. Visit historic flat-roofed timber houses built to withstand heavy winter avalanches.',
        location: 'Utror Valley'
      },
      afternoon: {
        time: '01:00 PM – 04:00 PM',
        activity: 'Gentle nature hike along the Gabral River with naturalists, identifying medicinal herbs and wild alpine berries.',
        location: 'Gabral River Meadow'
      },
      evening: {
        time: '06:00 PM – 08:30 PM',
        activity: 'Farewell feast with local elders sharing folklore of the fairy spirits ("Peri") said to inhabit the high peaks.',
        location: 'Kalam Lodge Terrace'
      },
      culturalHighlight: 'Kohistani folklore weaves ancient animist mountain legends with rich hospitality traditions.',
      recommendedLocalDish: 'Local goat stew simmered with dried mountain morel mushrooms (Gucchi)'
    };
  }

  // Chitral day plans
  if (destinationId === 'chitral') {
    if (isFirstDay) {
      return {
        dayNumber: dayNum,
        title: 'Through Lowari Tunnel into Legendary Chitral',
        subtitle: 'Under the Gaze of 7,708m Tirich Mir',
        morning: {
          time: '08:00 AM – 12:00 PM',
          activity: 'Transit through the 10.4km Lowari Tunnel, emerging into the dramatic arid and fruit-rich Hindu Kush mountain kingdom of Chitral.',
          location: 'Lowari Pass & Ayun Gateway'
        },
        afternoon: {
          time: '01:30 PM – 04:30 PM',
          activity: 'Arrive at Ayun Fort Heritage Guesthouse. Savor fresh walnuts, mulberries, and apricot juice in royal gardens.',
          location: 'Ayun Valley'
        },
        evening: {
          time: '06:00 PM – 08:30 PM',
          activity: 'Welcome dinner hosted by Bibi Maryam featuring traditional Khowar flatbreads and slow-churned mountain butter.',
          location: 'Ayun Orchard Dining'
        },
        culturalHighlight: 'Chitralis speak Khowar, an ancient Indo-Aryan language filled with lyrical courtly poetry.',
        recommendedLocalDish: 'Ghalmandi (warm layered flatbread filled with fresh cottage cheese and melted walnut oil)'
      };
    }

    if (dayNum === 2) {
      return {
        dayNumber: dayNum,
        title: 'Living Heritage of the Kalash Valleys',
        subtitle: 'Ancient Polytheistic Customs, Wood Architecture & Music in Bumburet',
        morning: {
          time: '08:30 AM – 12:00 PM',
          activity: 'Drive to Bumburet, the largest of the three sacred Kalash valleys. Walk through cedar log hamlets and visit the Kalasha Dur Museum.',
          location: 'Bumburet Valley, Kalash'
        },
        afternoon: {
          time: '01:00 PM – 04:00 PM',
          activity: 'Meet Kalash women artisans weaving beaded cowrie shell headpieces ("Kupas"). Learn about their sacred seasonal festivals and community dances.',
          location: 'Brun Village, Bumburet'
        },
        evening: {
          time: '06:00 PM – 08:30 PM',
          activity: 'Traditional evening storytelling session around a hearth, respecting the boundaries of sacred Kalash sanctuaries.',
          location: 'Kalash Heritage Lodge'
        },
        culturalHighlight: 'The Kalash are the last remaining indigenous polytheistic society in the Hindu Kush, preserving thousands of years of oral traditions.',
        recommendedLocalDish: 'Khowar mutton pilaf flavored with dried wild mountain leeks'
      };
    }

    return {
      dayNumber: dayNum,
      title: 'Chitral Shahi Mosque, Royal Fort & Polo Grounds',
      subtitle: 'Silk Road Splendor & Mountain Polo Culture',
      morning: {
        time: '09:00 AM – 12:00 PM',
        activity: 'Visit the 1901 Shahi Mosque with its delicate pink and white minarets alongside the historic Chitral Fort on the riverbank.',
        location: 'Chitral Town Center'
      },
      afternoon: {
        time: '01:30 PM – 04:00 PM',
        activity: 'Watch local horsemen practicing freestyle mountain polo at the Chitral polo ground (the historic origin of the game).',
        location: 'Chitral Shahi Polo Ground'
      },
      evening: {
        time: '05:30 PM – 08:00 PM',
        activity: 'Hands-on Chitrali Patti wool spinning workshop with women weavers; take home your own hand-woven keepsake.',
        location: 'Ayun Weavers Cooperative'
      },
      culturalHighlight: 'Polo in Chitral is played without modern referee whistles, under original high-mountain warrior rules.',
      recommendedLocalDish: 'Sanabachi (delicate mountain dumplings stuffed with wild mountain greens and spiced curd)'
    };
  }

  // Hunza & Skardu fallback
  return {
    dayNumber: dayNum,
    title: `Day ${dayNum}: Exploring ${destinations.find(d => d.id === destinationId)?.name || 'the Valley'}`,
    subtitle: 'Living Heritage, Ancient Forts & High Altitude Panoramas',
    morning: {
      time: '09:00 AM – 12:00 PM',
      activity: 'Guided exploration of historical village quarters with a verified local community historian.',
      location: 'Heritage Quarter & Viewpoint'
    },
    afternoon: {
      time: '01:30 PM – 04:30 PM',
      activity: 'Cultural exchange and craft workshop with indigenous artisans preserving regional weaving and culinary recipes.',
      location: 'Local Artisan Cooperative'
    },
    evening: {
      time: '06:00 PM – 08:30 PM',
      activity: 'Traditional family dinner with storytelling under clear starry mountain skies.',
      location: 'Riverside Lodge Terrace'
    },
    culturalHighlight: 'Mountain hospitality creates friendships that cross all cultural and linguistic borders.',
    recommendedLocalDish: 'Slow-simmered organic mountain stew served with stone-ground flatbread'
  };
}
