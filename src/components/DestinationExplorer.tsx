import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, ShieldCheck, ArrowRight, Compass, Sparkles } from 'lucide-react';
import { Destination } from '../types';
import { destinations } from '../data/destinations';
import { DestinationModal } from './DestinationModal';

interface DestinationExplorerProps {
  onBuildTrip: (destinationId: Destination['id']) => void;
  onSelectExperience: (experienceId: string) => void;
  onHoverDestination?: (destinationId: Destination['id'] | null) => void;
}

export const DestinationExplorer: React.FC<DestinationExplorerProps> = ({
  onBuildTrip,
  onSelectExperience,
  onHoverDestination
}) => {
  const [activeModalDest, setActiveModalDest] = useState<Destination | null>(null);

  return (
    <section id="explore-section" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E28413] mb-2">
              <Compass className="w-4 h-4" />
              <span>Destinations & Living Heritage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#151D1A]">
              Where will your story take you?
            </h2>
            <p className="text-sm text-neutral-600 mt-2 max-w-xl font-light">
              From the emerald rivers of Swat and ancient cedar forests of Kalam, to the sacred valleys of Chitral. Every destination is vetted with generational local hosts.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              <span>5 Active Mountain Corridors</span>
            </div>
            <button
              onClick={() => {
                const el = document.getElementById('map-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-1.5 bg-[#EBF3EF] hover:bg-[#DCEAE3] text-[#0F382C] font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <Compass className="w-3.5 h-3.5 text-[#E28413]" />
              <span>Interactive Map View</span>
            </button>
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, index) => {
            const isFeatured = index === 0; // Swat is marquee
            return (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onClick={() => setActiveModalDest(dest)}
                onMouseEnter={() => onHoverDestination?.(dest.id)}
                onMouseLeave={() => onHoverDestination?.(null)}
                className={`group relative bg-white rounded-2xl overflow-hidden border border-neutral-200/90 shadow-xs hover:shadow-xl hover:border-[#0F382C]/30 transition-all duration-300 flex flex-col cursor-pointer ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {/* Image Container */}
                <div className={`relative overflow-hidden ${isFeatured ? 'h-72 sm:h-80' : 'h-60'}`}>
                  <img
                    src={dest.heroImage}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Top Nastaliq Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="font-nastaliq text-base text-white/95 bg-black/30 px-2.5 py-0.5 rounded-lg backdrop-blur-xs font-semibold">
                      {dest.urduName}
                    </span>
                    {isFeatured && (
                      <span className="text-[11px] font-semibold tracking-wider uppercase bg-[#E28413] text-white px-2.5 py-0.5 rounded-lg flex items-center gap-1 shadow-xs">
                        <Sparkles className="w-3 h-3" />
                        Featured Story
                      </span>
                    )}
                  </div>

                  {/* Rating & Verified Indicator inside photo */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/40 text-white px-2.5 py-1 rounded-lg backdrop-blur-xs text-xs font-semibold">
                    <Star className="w-3.5 h-3.5 text-[#E28413] fill-[#E28413]" />
                    <span className="tabular-nums">{dest.rating}</span>
                  </div>

                  {/* Bottom Image Overlay Details */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-xs text-neutral-300 font-medium">
                      {dest.region}, {dest.province}
                    </div>
                    <h3 className="text-2xl font-bold font-display text-white">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-neutral-200 mt-0.5 italic">
                      "{dest.tagline}"
                    </p>
                  </div>
                </div>

                {/* Card Content & Metadata */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {dest.description}
                  </p>

                  {/* Highlights Bullet Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {dest.highlights.slice(0, 3).map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded font-normal"
                      >
                        {item.split(' ')[0]} {item.split(' ')[1]}
                      </span>
                    ))}
                    {dest.highlights.length > 3 && (
                      <span className="text-[11px] text-neutral-400 self-center">
                        +{dest.highlights.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Card Bottom Bar: Starting price + Verified Count + Action */}
                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-neutral-400">
                        {dest.verifiedProvidersCount} Verified Hosts
                      </div>
                      <div className="text-xs font-bold text-[#0F382C] tabular-nums">
                        PKR {dest.startingPricePKR.toLocaleString()} <span className="font-normal text-neutral-500 text-[11px]">/ 3 days</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#0F382C] group-hover:text-[#E28413] transition-colors flex items-center gap-1">
                        Explore Story
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Destination Detail Modal */}
      <DestinationModal
        destination={activeModalDest}
        onClose={() => setActiveModalDest(null)}
        onBuildTrip={(destId) => {
          setActiveModalDest(null);
          onBuildTrip(destId);
        }}
        onSelectExperience={onSelectExperience}
      />
    </section>
  );
};
