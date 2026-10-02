import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Compass, Calendar, Wallet, Users, ArrowRight, ArrowUpRight } from 'lucide-react';
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
    <section className="relative min-h-screen flex flex-col justify-between bg-[#0C2B22] text-white overflow-hidden pt-28 pb-12 sm:pb-16">
      {/* Full Viewport Cinematic Background with slow Ken Burns effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src="/images/hero_swat_valley.webp"
          alt="Swat Valley Hindu Kush emerald river terraces, Khyber Pakhtunkhwa"
          className="w-full h-full object-cover object-center scale-105"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          referrerPolicy="no-referrer"
        />
        {/* Cinematic gradient scrims ensuring WCAG AA legibility and moody depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C2B22] via-[#0C2B22]/70 to-[#0C2B22]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C2B22]/90 via-[#0C2B22]/40 to-transparent" />
      </div>

      {/* Main Hero Editorial Body */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="max-w-4xl">
          {/* Eyebrow / Act marker */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase font-bold text-[#E28413] mb-6"
          >
            <span>01 / THE JOURNEY</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span className="text-neutral-300 font-medium">KHYBER PAKHTUNKHWA & NORTHERN PAKISTAN</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span className="font-nastaliq text-sm text-[#FEF3C7] normal-case tracking-normal">داستان</span>
          </motion.div>

          {/* Headline: Huge, editorial, commanding */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black font-display tracking-tight text-white leading-[0.98] mb-6"
            style={{ textWrap: 'balance' }}
          >
            Every place <br />
            <span className="font-editorial italic font-normal text-[#FEF3C7] tracking-normal">
              has a story.
            </span>
          </motion.h1>

          {/* Subheadline: concise, poetic, non-buzzword */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl text-neutral-200 leading-relaxed font-light max-w-2xl mb-10"
          >
            Discover verified places, meet generational custodians, experience authentic culture, and learn the language before you arrive.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 mb-16"
          >
            <button
              onClick={() => onStartJourney({ destinationId: 'swat', travelerType: 'family' })}
              className="px-7 py-4 bg-[#E28413] hover:bg-[#d07409] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center gap-2.5 cursor-pointer group"
            >
              <span>Begin Your Dastan</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreDestinations}
              className="px-6 py-4 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs uppercase tracking-wider rounded-xl border border-white/20 backdrop-blur-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Destinations</span>
              <ArrowUpRight className="w-4 h-4 opacity-70" />
            </button>
          </motion.div>
        </div>

        {/* Minimalist Architectural Planning Console */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#FAF8F5] rounded-2xl p-5 sm:p-6 shadow-2xl border border-neutral-200 text-[#151D1A]"
        >
          <form onSubmit={handlePlanSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-end">
            {/* Field 1: Destination */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#0C2B22]" />
                Where to?
              </label>
              <select
                value={selectedDest}
                onChange={(e) => setSelectedDest(e.target.value as DestinationId)}
                className="w-full bg-white border border-neutral-200 rounded-xl px-3 py-2.5 text-xs font-bold text-neutral-900 focus:border-[#0C2B22] outline-none cursor-pointer"
              >
                <option value="swat">Swat Valley (وادیٔ سوات)</option>
                <option value="kalam">Kalam Valley (کالام)</option>
                <option value="chitral">Chitral & Kalash (چترال)</option>
                <option value="hunza">Hunza Valley (ہنزہ)</option>
                <option value="skardu">Skardu & Deosai (سکردو)</option>
              </select>
            </div>

            {/* Field 2: Season */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#0C2B22]" />
                Season
              </label>
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="w-full bg-white border border-neutral-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-neutral-800 focus:border-[#0C2B22] outline-none cursor-pointer"
              >
                <option value="spring-summer">Spring Blossom (Apr – May)</option>
                <option value="peak-summer">Alpine Summer (Jun – Aug)</option>
                <option value="autumn-gold">Golden Autumn (Sep – Nov)</option>
                <option value="winter-snow">Winter Ski & Snow (Dec – Feb)</option>
              </select>
            </div>

            {/* Field 3: Budget Standard */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                <Wallet className="w-3.5 h-3.5 text-[#0C2B22]" />
                Standard
              </label>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value as 'budget' | 'comfort' | 'luxury')}
                className="w-full bg-white border border-neutral-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-neutral-800 focus:border-[#0C2B22] outline-none cursor-pointer"
              >
                <option value="budget">Explorer Tier (PKR ~25,000)</option>
                <option value="comfort">Comfort Heritage (PKR ~42,000)</option>
                <option value="luxury">Signature Sanctuary (PKR ~78,000)</option>
              </select>
            </div>

            {/* Field 4: Travelers */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#0C2B22]" />
                Party
              </label>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value as 'solo' | 'couple' | 'family' | 'friends')}
                className="w-full bg-white border border-neutral-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-neutral-800 focus:border-[#0C2B22] outline-none cursor-pointer"
              >
                <option value="family">Family Journey</option>
                <option value="couple">Couple Retreat</option>
                <option value="solo">Solo Cultural Seeker</option>
                <option value="friends">Friends Expedition</option>
              </select>
            </div>

            {/* Submit Action Button */}
            <div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#0C2B22] hover:bg-[#144D3C] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Plan Story</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E28413]" />
              </button>
            </div>
          </form>

          {/* Clean unboxed proof metadata */}
          <div className="mt-3.5 pt-3 border-t border-neutral-200/80 flex flex-wrap items-center justify-between text-xs text-neutral-500 gap-2">
            <div className="flex items-center gap-4">
              <span>Verified local family homestays</span>
              <span aria-hidden="true">·</span>
              <span>Dedicated 4x4 mountain transit</span>
              <span aria-hidden="true">·</span>
              <span>Licensed archaeological guides</span>
            </div>
            <div className="text-[11px] text-neutral-400 font-mono">
              DIRECT COMMUNITY BENEFIT: 86%
            </div>
          </div>
        </motion.div>
      </div>

      {/* Hero Bottom Editorial Navigation Ticker */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 flex items-center justify-between text-xs text-neutral-400 font-mono">
        <div>35.22° N, 72.42° E · HINDU KUSH CORRIDOR</div>
        <div className="hidden sm:block">SCROLL TO BEGIN ACT II</div>
      </div>
    </section>
  );
};
