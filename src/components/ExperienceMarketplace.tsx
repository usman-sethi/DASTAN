import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, MapPin, ArrowRight, ArrowUpRight } from 'lucide-react';
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
    { id: 'all', label: 'All Masterclasses' },
    { id: 'culinary', label: 'Culinary Masterclasses' },
    { id: 'nature', label: 'Mountain Naturalist Walks' },
    { id: 'artisan', label: 'Artisan Workshops' },
    { id: 'community', label: 'Village Hujras & Storytelling' },
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
    <section id="experiences-section" className="py-24 sm:py-32 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase font-bold text-[#E28413] mb-3">
              <span>03 / THE EXPERIENCES</span>
              <span aria-hidden="true" className="text-neutral-300">·</span>
              <span className="text-neutral-500 font-medium">AUTHENTIC CUSTODIAN CRAFT</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display text-[#151D1A] leading-[1.05]">
              Experience something <br />
              <span className="font-editorial italic font-normal text-[#B44A2D]">unadorned and real.</span>
            </h2>
            <p className="text-base text-neutral-600 mt-4 leading-relaxed font-light">
              No tourist stages. Step directly into family clay-tandoor kitchens, centenarian cedar paths, handloom wool workshops, and evening village Hujras.
            </p>
          </div>

          <div className="text-xs font-mono text-neutral-500 flex items-center gap-3">
            <span>100% DIRECT CUSTODIAN COMPENSATION</span>
          </div>
        </div>

        {/* Clean Segmented Controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-neutral-100">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0C2B22] text-white shadow-xs'
                    : 'bg-[#FAF8F5] text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExperiences.map((exp, idx) => (
            <div
              key={exp.id}
              onClick={() => setSelectedExperience(exp)}
              data-cursor="explore"
              className="group bg-[#FAF8F5] rounded-3xl overflow-hidden border border-neutral-200 hover:border-[#0C2B22]/30 hover:shadow-xl transition-all duration-500 flex flex-col cursor-pointer"
            >
              {/* Media Frame */}
              <div className="relative h-60 w-full overflow-hidden destination-media bg-[#0C2B22]/10">
                <img
                  src={exp.image}
                  srcSet={exp.imageSrcSet}
                  sizes={exp.imageSizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px'}
                  alt={exp.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Eyebrow & Script */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="font-mono text-[10px] uppercase tracking-wider bg-black/40 backdrop-blur-md px-2.5 py-1 rounded">
                    {exp.categoryLabel}
                  </span>
                  <span className="font-nastaliq text-base text-[#FEF3C7]">
                    {exp.urduTitle}
                  </span>
                </div>

                {/* Bottom Overlay Location */}
                <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-neutral-200">
                    <MapPin className="w-3.5 h-3.5 text-[#E28413]" />
                    {exp.destinationName}
                  </span>
                  <span className="flex items-center gap-1.5 text-neutral-200">
                    <Clock className="w-3.5 h-3.5" />
                    {exp.duration}
                  </span>
                </div>
              </div>

              {/* Editorial Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold font-display text-neutral-900 group-hover:text-[#0C2B22] transition-colors leading-snug">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {exp.shortDesc}
                  </p>
                </div>

                {/* Host Line */}
                <div className="flex items-center gap-3 pt-3 border-t border-neutral-200/70">
                  <img
                    src={exp.hostAvatar}
                    alt={exp.hostName}
                    loading="lazy"
                    decoding="async"
                    className="w-8 h-8 rounded-full object-cover border border-[#0C2B22]"
                  />
                  <div className="text-xs">
                    <div className="font-bold text-neutral-900">{exp.hostName}</div>
                    <div className="text-[11px] text-neutral-400">{exp.hostRole}</div>
                  </div>
                </div>

                {/* Bottom Pricing & Action */}
                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-mono tracking-wider text-neutral-400">Price</div>
                    <div className="text-sm font-bold text-[#0C2B22] tabular-nums">
                      PKR {exp.pricePKR.toLocaleString()} <span className="text-[11px] font-normal text-neutral-500">/ guest</span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#E28413] group-hover:text-[#0C2B22] transition-colors">
                    <span>Reserve</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
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
