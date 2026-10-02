import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, ShieldCheck, Clock, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { Experience } from '../types';
import { experiences } from '../data/experiences';
import { ExperienceModal } from './ExperienceModal';
import { useToast } from './Toast';

interface ExperienceMarketplaceProps {
  onAddExperienceToTrip: (exp: Experience) => void;
}

export const ExperienceMarketplace: React.FC<ExperienceMarketplaceProps> = ({
  onAddExperienceToTrip
}) => {
  const { showToast } = useToast();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

  const categories = [
    { id: 'all', label: 'All Experiences' },
    { id: 'culinary', label: 'Culinary Masterclasses' },
    { id: 'nature', label: 'Guided Mountain Walks' },
    { id: 'artisan', label: 'Artisan Workshops' },
    { id: 'community', label: 'Cultural Storytelling' },
    { id: 'heritage', label: 'Living Heritage' },
  ];

  const filteredExperiences = activeCategory === 'all'
    ? experiences
    : experiences.filter(e => e.category === activeCategory);

  const handleBookExperience = (exp: Experience) => {
    onAddExperienceToTrip(exp);
    showToast(
      'Experience Added to Plan',
      `"${exp.title}" with host ${exp.hostName} is added to your itinerary.`,
      'success'
    );
  };

  return (
    <section id="experiences-section" className="py-20 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E28413] mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Authentic Cultural Immersion</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#151D1A]">
              Experience something real.
            </h2>
            <p className="text-sm text-neutral-600 mt-2 max-w-xl font-light">
              No tourist traps. Step directly into family kitchens, clay-tandoor ovens, artisan weaving looms, and evening village Hujras.
            </p>
          </div>

          {/* Verification Trust Pill */}
          <div className="flex items-center gap-2 text-xs text-[#0F382C] font-semibold bg-[#EBF3EF] px-3.5 py-2 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-[#0F382C]" />
            <span>100% of hosts verified in-person by DASTAN</span>
          </div>
        </div>

        {/* Functional Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#0F382C] text-white border-[#0F382C] shadow-xs'
                    : 'bg-[#FAF8F5] text-neutral-600 border-neutral-200 hover:border-neutral-300'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              onClick={() => setSelectedExperience(exp)}
              className="group bg-[#FAF8F5] rounded-2xl overflow-hidden border border-neutral-200 hover:border-[#0F382C]/30 hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-52 w-full overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Category & Urdu Script */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-white/90 text-[#0F382C] px-2.5 py-1 rounded-md backdrop-blur-xs">
                    {exp.categoryLabel}
                  </span>
                  <span className="font-nastaliq text-xs text-white/90 bg-black/40 px-2 py-0.5 rounded-md">
                    {exp.urduTitle}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3.5 right-3.5 bg-black/40 text-white px-2 py-1 rounded-md backdrop-blur-xs text-xs font-semibold flex items-center gap-1">
                  <Star className="w-3 h-3 text-[#E28413] fill-[#E28413]" />
                  <span className="tabular-nums">{exp.rating}</span>
                </div>

                {/* Duration & Location Overlay */}
                <div className="absolute bottom-3 left-3.5 right-3.5 text-white flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 text-neutral-300">
                    <MapPin className="w-3.5 h-3.5 text-[#E28413]" />
                    {exp.destinationName}
                  </span>
                  <span className="flex items-center gap-1 text-neutral-300">
                    <Clock className="w-3.5 h-3.5" />
                    {exp.duration}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base font-bold font-display text-neutral-900 group-hover:text-[#0F382C] transition-colors leading-snug">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {exp.shortDesc}
                  </p>
                </div>

                {/* Host Info Line */}
                <div className="flex items-center gap-2.5 pt-2 border-t border-neutral-200/80">
                  <img
                    src={exp.hostAvatar}
                    alt={exp.hostName}
                    className="w-7 h-7 rounded-full object-cover border border-[#0F382C]"
                  />
                  <div className="text-xs">
                    <div className="font-semibold text-neutral-800 flex items-center gap-1">
                      {exp.hostName}
                      {exp.hostVerified && (
                        <ShieldCheck className="w-3 h-3 text-[#0F382C]" />
                      )}
                    </div>
                    <div className="text-[11px] text-neutral-400">{exp.hostRole}</div>
                  </div>
                </div>

                {/* Bottom Pricing & Action */}
                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-neutral-400">Price</div>
                    <div className="text-sm font-bold text-[#0F382C] tabular-nums">
                      PKR {exp.pricePKR.toLocaleString()} <span className="text-[11px] font-normal text-neutral-500">/ person</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookExperience(exp);
                    }}
                    className="px-3.5 py-1.5 bg-[#0F382C] hover:bg-[#164E3D] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Book Experience</span>
                    <ArrowRight className="w-3 h-3 text-[#E28413]" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Experience Details Modal */}
      <ExperienceModal
        experience={selectedExperience}
        onClose={() => setSelectedExperience(null)}
        onBookExperience={handleBookExperience}
      />
    </section>
  );
};
