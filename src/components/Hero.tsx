import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, Calendar, Wallet, Users, ArrowRight, ShieldCheck, HeartHandshake, BookOpen } from 'lucide-react';
import { DestinationId } from '../types';

interface HeroProps {
  onStartJourney: (prefill?: {
    destinationId?: DestinationId;
    budgetTier?: 'budget' | 'comfort' | 'luxury';
    travelerType?: 'solo' | 'couple' | 'family' | 'friends';
  }) => void;
  onExploreDestinations: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartJourney, onExploreDestinations }) => {
  const [selectedDest, setSelectedDest] = useState<DestinationId>('swat');
  const [selectedSeason, setSelectedSeason] = useState('spring-summer');
  const [selectedBudget, setSelectedBudget] = useState<'budget' | 'comfort' | 'luxury'>('comfort');
  const [selectedStyle, setSelectedStyle] = useState<'solo' | 'couple' | 'family' | 'friends'>('family');

  const handlePlanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartJourney({
      destinationId: selectedDest,
      budgetTier: selectedBudget,
      travelerType: selectedStyle
    });
  };

  return (
    <section className="relative overflow-hidden bg-[#0F382C] text-white">
      {/* Background Cinematic Image with measured gradient scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_swat_valley_1790930745484.jpg"
          alt="Swat Valley emerald river terraced mountain landscape in Khyber Pakhtunkhwa"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Measured dark scrim for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F382C] via-[#0F382C]/75 to-[#0F382C]/55" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="max-w-3xl">
          {/* Authentic subtitle / cultural motto */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 text-xs sm:text-sm font-medium tracking-wide text-[#E28413] mb-4"
          >
            <span className="font-nastaliq text-base sm:text-lg text-[#FEF3C7]">
              داستان — ہر جگہ کی ایک کہانی ہے
            </span>
            <span aria-hidden="true" className="text-neutral-400">·</span>
            <span className="uppercase tracking-wider text-[11px] text-neutral-300 font-semibold">
              Khyber Pakhtunkhwa & Northern Pakistan
            </span>
          </motion.div>

          {/* Hero Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.1] mb-6"
            style={{ textWrap: 'balance' }}
          >
            Your next journey <br />
            <span className="text-[#FEF3C7] italic font-serif">has a story.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-neutral-200 leading-relaxed mb-8 max-w-2xl font-light"
          >
            Don’t just visit a place. <strong className="text-white font-semibold">Understand it.</strong> Discover verified local places, meet generational custodians, experience authentic culture, and learn the language before you arrive.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mb-14"
          >
            <button
              onClick={() => onStartJourney({ destinationId: 'swat', travelerType: 'family' })}
              className="px-6 py-3.5 bg-[#E28413] hover:bg-[#d07409] text-white font-semibold rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer text-sm"
            >
              <Compass className="w-4 h-4" />
              <span>Start your journey</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={onExploreDestinations}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl border border-white/20 backdrop-blur-xs transition-colors flex items-center gap-2 cursor-pointer text-sm"
            >
              <span>Explore destinations</span>
            </button>
          </motion.div>
        </div>

        {/* Sophisticated Search & Quick Trip Planner Bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xl border border-neutral-200/80 text-[#18201D]"
        >
          <form onSubmit={handlePlanSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-end">
            {/* Field 1: Destination */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#0F382C]" />
                Where to?
              </label>
              <select
                value={selectedDest}
                onChange={(e) => setSelectedDest(e.target.value as DestinationId)}
                className="w-full bg-[#FAF8F5] border border-neutral-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-neutral-800 focus:border-[#0F382C] focus:bg-white transition-colors cursor-pointer"
              >
                <option value="swat">Swat Valley (وادیٔ سوات)</option>
                <option value="kalam">Kalam Valley (کالام)</option>
                <option value="chitral">Chitral & Kalash (چترال)</option>
                <option value="hunza">Hunza Valley (ہنزہ)</option>
                <option value="skardu">Skardu & Deosai (سکردو)</option>
              </select>
            </div>

            {/* Field 2: When / Season */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#0F382C]" />
                When?
              </label>
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-neutral-200 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-800 focus:border-[#0F382C] focus:bg-white transition-colors cursor-pointer"
              >
                <option value="spring-summer">Spring Blossom (Apr – May)</option>
                <option value="peak-summer">Alpine Summer (Jun – Aug)</option>
                <option value="autumn-gold">Golden Autumn (Sep – Nov)</option>
                <option value="winter-snow">Winter Snow & Ski (Dec – Feb)</option>
              </select>
            </div>

            {/* Field 3: Budget Tier */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                <Wallet className="w-3.5 h-3.5 text-[#0F382C]" />
                Budget
              </label>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value as 'budget' | 'comfort' | 'luxury')}
                className="w-full bg-[#FAF8F5] border border-neutral-200 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-800 focus:border-[#0F382C] focus:bg-white transition-colors cursor-pointer"
              >
                <option value="budget">Authentic Explorer (PKR ~25,000)</option>
                <option value="comfort">Comfort Heritage (PKR ~42,000)</option>
                <option value="luxury">Signature Sanctuary (PKR ~78,000)</option>
              </select>
            </div>

            {/* Field 4: Travel Style */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#0F382C]" />
                Travel Style
              </label>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value as 'solo' | 'couple' | 'family' | 'friends')}
                className="w-full bg-[#FAF8F5] border border-neutral-200 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-800 focus:border-[#0F382C] focus:bg-white transition-colors cursor-pointer"
              >
                <option value="family">Family Gathering</option>
                <option value="couple">Couple Retreat</option>
                <option value="solo">Solo Cultural Seeker</option>
                <option value="friends">Friends Expedition</option>
              </select>
            </div>

            {/* Field 5: Action Button */}
            <div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#0F382C] hover:bg-[#164E3D] text-white rounded-xl text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Plan my trip</span>
                <ArrowRight className="w-4 h-4 text-[#E28413]" />
              </button>
            </div>
          </form>

          {/* Micro trust indicators below search */}
          <div className="mt-3.5 pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between text-xs text-neutral-500 gap-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-neutral-600">
                <ShieldCheck className="w-4 h-4 text-[#0F382C]" />
                100% Verified Local Hosts
              </span>
              <span className="flex items-center gap-1.5 text-neutral-600">
                <HeartHandshake className="w-4 h-4 text-[#E28413]" />
                Direct Community Income
              </span>
              <span className="hidden sm:flex items-center gap-1.5 text-neutral-600">
                <BookOpen className="w-4 h-4 text-[#0F382C]" />
                Dialect Audio Phrases Included
              </span>
            </div>
            <span className="text-[11px] text-neutral-400">
              Deterministic planner engine active
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
