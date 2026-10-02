import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, Calendar, Wallet, Users, Sparkles, Check, 
  MapPin, Clock, Utensils, Info, ShieldCheck, ChevronRight, 
  SlidersHorizontal, Bookmark, BookOpen, ArrowRight, RefreshCw, Car, Home, UserCheck
} from 'lucide-react';
import { DestinationId, TripPlanConfig, GeneratedItinerary } from '../types';
import { destinations } from '../data/destinations';
import { generateTripItinerary } from '../data/generator';
import { useToast } from './Toast';

interface TripBuilderProps {
  initialDestinationId?: DestinationId;
  initialTravelerType?: 'solo' | 'couple' | 'family' | 'friends';
  initialBudgetTier?: 'budget' | 'comfort' | 'luxury';
  onBookTrip: (itinerary: GeneratedItinerary) => void;
  onSaveTrip: (itinerary: GeneratedItinerary) => void;
  onNavigateToLearn: (language: string) => void;
}

export const TripBuilder: React.FC<TripBuilderProps> = ({
  initialDestinationId = 'swat',
  initialTravelerType = 'family',
  initialBudgetTier = 'comfort',
  onBookTrip,
  onSaveTrip,
  onNavigateToLearn
}) => {
  const { showToast } = useToast();

  // Multi-step builder state
  const [destinationId, setDestinationId] = useState<DestinationId>(initialDestinationId);
  const [days, setDays] = useState<number>(4);
  const [budgetTier, setBudgetTier] = useState<'budget' | 'comfort' | 'luxury'>(initialBudgetTier);
  const [travelerType, setTravelerType] = useState<'solo' | 'couple' | 'family' | 'friends'>(initialTravelerType);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Culture', 'Food', 'Nature']);

  // Customization toggles
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [customServices, setCustomServices] = useState({
    includeStay: true,
    includeDriver: true,
    includeGuide: true,
    includeExperiences: true
  });

  // Active day expansion in itinerary
  const [expandedDay, setExpandedDay] = useState<number>(1);

  // Synchronize initial props if updated from hero search
  React.useEffect(() => {
    if (initialDestinationId) setDestinationId(initialDestinationId);
    if (initialTravelerType) setTravelerType(initialTravelerType);
    if (initialBudgetTier) setBudgetTier(initialBudgetTier);
  }, [initialDestinationId, initialTravelerType, initialBudgetTier]);

  // Interests list
  const availableInterests = [
    { id: 'Nature', label: 'Alpine Nature & Rivers' },
    { id: 'Food', label: 'Pashtun Culinary & Trout' },
    { id: 'Culture', label: 'Living Heritage & Folklore' },
    { id: 'Adventure', label: '4x4 & High Mountain Trails' },
    { id: 'History', label: 'Gandhara & Ancient Ruins' },
    { id: 'Relaxation', label: 'Peaceful Orchard Homestays' },
  ];

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest)
        ? prev.length > 1 ? prev.filter(i => i !== interest) : prev
        : [...prev, interest]
    );
  };

  // Deterministic Itinerary Computation
  const itinerary = useMemo(() => {
    const config: TripPlanConfig = {
      destinationId,
      days,
      budgetTier,
      travelerType,
      interests: selectedInterests,
      customServices
    };
    return generateTripItinerary(config);
  }, [destinationId, days, budgetTier, travelerType, selectedInterests, customServices]);

  const handleSave = () => {
    onSaveTrip(itinerary);
    showToast(
      'Trip Saved to My Trips',
      `Saved "${itinerary.title}" with ${days} curated days and verified providers.`,
      'success'
    );
  };

  return (
    <section id="trip-builder-section" className="py-20 bg-[#FAF8F5] border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E28413] mb-2">
            <Compass className="w-4 h-4" />
            <span>Interactive Trip Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#151D1A]">
            Build your personalized story
          </h2>
          <p className="text-sm text-neutral-600 mt-2 font-light">
            Every choice adapts your journey in real time. We match you with verified local homestays, licensed high-altitude drivers, and generational storytellers.
          </p>
        </div>

        {/* Builder Interactive Control Console */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-sm mb-12">
          <div className="space-y-8">
            {/* Step 1: Destination Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#0F382C] text-white flex items-center justify-center text-[10px]">1</span>
                Where are you going?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {destinations.map((dest) => {
                  const isSelected = destinationId === dest.id;
                  return (
                    <button
                      key={dest.id}
                      onClick={() => setDestinationId(dest.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#0F382C] text-white border-[#0F382C] shadow-md'
                          : 'bg-[#FAF8F5] text-neutral-800 border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="text-xs font-bold truncate">{dest.name}</div>
                      <div className={`text-[11px] truncate mt-0.5 ${isSelected ? 'text-[#FEF3C7]' : 'text-neutral-500'}`}>
                        {dest.region}
                      </div>
                      <div className={`text-[11px] font-nastaliq mt-1 ${isSelected ? 'text-white/80' : 'text-neutral-400'}`}>
                        {dest.urduName}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Duration (Days) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#0F382C] text-white flex items-center justify-center text-[10px]">2</span>
                  How many days?
                </label>
                <span className="text-xs font-bold text-[#0F382C] bg-[#EBF3EF] px-2.5 py-1 rounded-md">
                  {days} Days / {days - 1} Nights
                </span>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {[2, 3, 4, 5, 7].map((num) => (
                  <button
                    key={num}
                    onClick={() => setDays(num)}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                      days === num
                        ? 'bg-[#0F382C] text-white border-[#0F382C] shadow-xs'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                    }`}
                  >
                    {num} Days
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Budget Tier & Travelers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Budget */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#0F382C] text-white flex items-center justify-center text-[10px]">3</span>
                  What’s your budget tier?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'budget', label: 'Explorer', desc: 'Family Guesthouses' },
                    { id: 'comfort', label: 'Comfort', desc: 'Boutique Lodges' },
                    { id: 'luxury', label: 'Signature', desc: 'Heritage Suites' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setBudgetTier(t.id as any)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        budgetTier === t.id
                          ? 'bg-[#0F382C] text-white border-[#0F382C]'
                          : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="text-xs font-bold">{t.label}</div>
                      <div className={`text-[10px] mt-0.5 ${budgetTier === t.id ? 'text-neutral-200' : 'text-neutral-500'}`}>
                        {t.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Travelers */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#0F382C] text-white flex items-center justify-center text-[10px]">4</span>
                  Who are you traveling with?
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'solo', label: 'Solo' },
                    { id: 'couple', label: 'Couple' },
                    { id: 'family', label: 'Family' },
                    { id: 'friends', label: 'Friends' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setTravelerType(s.id as any)}
                      className={`py-3 px-2 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                        travelerType === s.id
                          ? 'bg-[#0F382C] text-white border-[#0F382C]'
                          : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 5: Interests Filter Badges */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#0F382C] text-white flex items-center justify-center text-[10px]">5</span>
                What do you want to experience?
              </label>
              <div className="flex flex-wrap gap-2">
                {availableInterests.map((interest) => {
                  const isChecked = selectedInterests.includes(interest.id);
                  return (
                    <button
                      key={interest.id}
                      onClick={() => toggleInterest(interest.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer border ${
                        isChecked
                          ? 'bg-[#EBF3EF] text-[#0F382C] border-[#0F382C]/30 font-semibold'
                          : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 text-[#0F382C]" />}
                      <span>{interest.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Real Generated Itinerary Output Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Itinerary Content Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Itinerary Header Bar */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#E28413] font-semibold mb-1">
                  <span className="font-nastaliq text-base">{itinerary.urduTitle}</span>
                  <span>·</span>
                  <span className="uppercase tracking-wider">Verified Itinerary</span>
                </div>
                <h3 className="text-2xl font-bold font-display text-neutral-900">
                  {itinerary.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-neutral-500 mt-1">
                  <span>{days} Days Plan</span>
                  <span>·</span>
                  <span className="capitalize">{travelerType} group</span>
                  <span>·</span>
                  <span className="capitalize">{budgetTier} standard</span>
                </div>
              </div>

              {/* Action Buttons Header */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowCustomizer(!showCustomizer)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-neutral-200 hover:bg-neutral-50 text-neutral-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>{showCustomizer ? 'Hide Services' : 'Customize Services'}</span>
                </button>
                <button
                  onClick={handleSave}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#EBF3EF] text-[#0F382C] hover:bg-[#DCEAE3] flex items-center gap-1.5 cursor-pointer"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Save Trip</span>
                </button>
              </div>
            </div>

            {/* Customizer Drawer if opened */}
            <AnimatePresence>
              {showCustomizer && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-[#FAF8F5] rounded-2xl p-5 border border-neutral-200 space-y-3"
                >
                  <div className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                    Toggle Included Services:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <label className="flex items-center gap-3 p-3 bg-white rounded-xl border border-neutral-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={customServices.includeStay}
                        onChange={(e) => setCustomServices(s => ({ ...s, includeStay: e.target.checked }))}
                        className="rounded text-[#0F382C] focus:ring-[#0F382C] w-4 h-4"
                      />
                      <div>
                        <div className="font-semibold text-neutral-900">Verified Guesthouse / Hotel</div>
                        <div className="text-[11px] text-neutral-500">Traditional accommodations inspected by DASTAN</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 bg-white rounded-xl border border-neutral-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={customServices.includeDriver}
                        onChange={(e) => setCustomServices(s => ({ ...s, includeDriver: e.target.checked }))}
                        className="rounded text-[#0F382C] focus:ring-[#0F382C] w-4 h-4"
                      />
                      <div>
                        <div className="font-semibold text-neutral-900">Private 4x4 & Driver</div>
                        <div className="text-[11px] text-neutral-500">Dedicated mountain vehicle with licensed driver</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 bg-white rounded-xl border border-neutral-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={customServices.includeGuide}
                        onChange={(e) => setCustomServices(s => ({ ...s, includeGuide: e.target.checked }))}
                        className="rounded text-[#0F382C] focus:ring-[#0F382C] w-4 h-4"
                      />
                      <div>
                        <div className="font-semibold text-neutral-900">Licensed Local Guide</div>
                        <div className="text-[11px] text-neutral-500">Archaeologist and cultural historian companion</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 bg-white rounded-xl border border-neutral-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={customServices.includeExperiences}
                        onChange={(e) => setCustomServices(s => ({ ...s, includeExperiences: e.target.checked }))}
                        className="rounded text-[#0F382C] focus:ring-[#0F382C] w-4 h-4"
                      />
                      <div>
                        <div className="font-semibold text-neutral-900">Curated Local Experiences</div>
                        <div className="text-[11px] text-neutral-500">Cooking, rubab music, and artisan workshops</div>
                      </div>
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Day-by-Day Accordion / Story Cards */}
            <div className="space-y-4">
              {itinerary.days.map((day) => {
                const isExpanded = expandedDay === day.dayNumber;
                return (
                  <div
                    key={day.dayNumber}
                    className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs transition-colors"
                  >
                    {/* Day Header Trigger */}
                    <button
                      onClick={() => setExpandedDay(isExpanded ? 0 : day.dayNumber)}
                      className="w-full p-5 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50/80 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#0F382C] text-[#FEF3C7] flex flex-col items-center justify-center shrink-0">
                          <span className="text-[10px] uppercase font-bold tracking-wider leading-none">DAY</span>
                          <span className="text-sm font-extrabold font-display leading-none mt-0.5">
                            0{day.dayNumber}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-neutral-900">
                            {day.title}
                          </h4>
                          <p className="text-xs text-neutral-500 mt-0.5">
                            {day.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="text-neutral-400 p-1">
                        <ChevronRight className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-90 text-[#0F382C]' : ''}`} />
                      </div>
                    </button>

                    {/* Day Details */}
                    {isExpanded && (
                      <div className="px-5 pb-6 pt-2 border-t border-neutral-100 space-y-4 text-xs animate-in fade-in-50 duration-200">
                        {/* Morning */}
                        <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-neutral-150 flex items-start gap-3">
                          <span className="font-semibold text-[#0F382C] shrink-0 w-16">Morning</span>
                          <div className="flex-1 space-y-1">
                            <div className="text-neutral-800 leading-relaxed">{day.morning.activity}</div>
                            <div className="text-neutral-400 text-[11px] flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#E28413]" />
                              <span>{day.morning.location}</span>
                              <span>·</span>
                              <span>{day.morning.time}</span>
                            </div>
                          </div>
                        </div>

                        {/* Afternoon */}
                        <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-neutral-150 flex items-start gap-3">
                          <span className="font-semibold text-[#0F382C] shrink-0 w-16">Afternoon</span>
                          <div className="flex-1 space-y-1">
                            <div className="text-neutral-800 leading-relaxed">{day.afternoon.activity}</div>
                            <div className="text-neutral-400 text-[11px] flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#E28413]" />
                              <span>{day.afternoon.location}</span>
                              <span>·</span>
                              <span>{day.afternoon.time}</span>
                            </div>
                          </div>
                        </div>

                        {/* Evening */}
                        <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-neutral-150 flex items-start gap-3">
                          <span className="font-semibold text-[#0F382C] shrink-0 w-16">Evening</span>
                          <div className="flex-1 space-y-1">
                            <div className="text-neutral-800 leading-relaxed">{day.evening.activity}</div>
                            <div className="text-neutral-400 text-[11px] flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#E28413]" />
                              <span>{day.evening.location}</span>
                              <span>·</span>
                              <span>{day.evening.time}</span>
                            </div>
                          </div>
                        </div>

                        {/* Local Dish & Cultural Insight */}
                        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="p-3 bg-[#EBF3EF] rounded-xl text-[#0F382C]">
                            <div className="font-bold flex items-center gap-1.5 mb-1 text-[11px] uppercase tracking-wider">
                              <Utensils className="w-3.5 h-3.5" />
                              Recommended Local Dish
                            </div>
                            <div className="text-xs text-neutral-800">{day.recommendedLocalDish}</div>
                          </div>

                          <div className="p-3 bg-[#FEF3C7] rounded-xl text-[#92400E]">
                            <div className="font-bold flex items-center gap-1.5 mb-1 text-[11px] uppercase tracking-wider">
                              <Info className="w-3.5 h-3.5 text-[#D97706]" />
                              Cultural Insight
                            </div>
                            <div className="text-xs text-[#78350F]">{day.culturalHighlight}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pricing & Booking Summary Sticky Sidebar (4 Cols) */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-md space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-neutral-400">
                  Estimated Trip Investment
                </span>
                <div className="text-3xl font-extrabold font-display text-[#0F382C] mt-1 tabular-nums">
                  PKR {itinerary.costBreakdown.total.toLocaleString()}
                </div>
                <div className="text-[11px] text-neutral-500 mt-1 italic">
                  Demo pricing — illustrative only
                </div>
              </div>

              {/* Itemized Cost Breakdown */}
              <div className="space-y-2.5 pt-4 border-t border-neutral-100 text-xs">
                <div className="flex items-center justify-between text-neutral-600">
                  <span className="flex items-center gap-1.5">
                    <Home className="w-3.5 h-3.5 text-neutral-400" />
                    Verified Stay ({days - 1} nights)
                  </span>
                  <span className="font-semibold text-neutral-900 tabular-nums">
                    {customServices.includeStay ? `PKR ${itinerary.costBreakdown.stay.toLocaleString()}` : 'Excluded'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-neutral-600">
                  <span className="flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-neutral-400" />
                    Dedicated 4x4 Transport ({days} days)
                  </span>
                  <span className="font-semibold text-neutral-900 tabular-nums">
                    {customServices.includeDriver ? `PKR ${itinerary.costBreakdown.transport.toLocaleString()}` : 'Excluded'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-neutral-600">
                  <span className="flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-neutral-400" />
                    Licensed Local Guide
                  </span>
                  <span className="font-semibold text-neutral-900 tabular-nums">
                    {customServices.includeGuide ? `PKR ${itinerary.costBreakdown.guide.toLocaleString()}` : 'Excluded'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-neutral-600">
                  <span className="flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-neutral-400" />
                    Curated Experiences & Dining
                  </span>
                  <span className="font-semibold text-neutral-900 tabular-nums">
                    {customServices.includeExperiences ? `PKR ${itinerary.costBreakdown.experiences.toLocaleString()}` : 'Excluded'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-neutral-600 pt-1">
                  <span className="flex items-center gap-1.5 text-neutral-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0F382C]" />
                    DASTAN Support & SOS Fee (5%)
                  </span>
                  <span className="font-semibold text-neutral-700 tabular-nums">
                    PKR {itinerary.costBreakdown.dastanFee.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Economic Impact Badge */}
              <div className="p-3.5 bg-[#EBF3EF] rounded-xl text-xs space-y-1.5">
                <div className="font-bold text-[#0F382C] flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  Direct Local Economic Impact
                </div>
                <p className="text-neutral-700 text-[11px] leading-relaxed">
                  <strong>86%</strong> of your payment goes directly into the bank accounts of your local driver, guide, guesthouse family, and village cooks.
                </p>
              </div>

              {/* CTA Booking Button */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => onBookTrip(itinerary)}
                  className="w-full py-3.5 px-4 bg-[#E28413] hover:bg-[#d07409] text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book this journey</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleSave}
                  className="w-full py-2.5 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Save to My Trips</span>
                </button>

                <button
                  onClick={() => onNavigateToLearn(itinerary.destination.id === 'chitral' ? 'Khowar' : 'Pashto')}
                  className="w-full py-2.5 px-4 text-[#0F382C] hover:text-[#164E3D] hover:bg-[#EBF3EF] font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Learn {itinerary.destination.id === 'chitral' ? 'Khowar' : 'Pashto'} for this journey</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
