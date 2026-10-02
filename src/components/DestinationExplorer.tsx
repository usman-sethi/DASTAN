import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Compass, ShieldCheck, Star } from 'lucide-react';
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
    <section id="explore-section" className="py-24 sm:py-32 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Act II Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase font-bold text-[#E28413] mb-3">
              <span>02 / THE PLACES</span>
              <span aria-hidden="true" className="text-neutral-300">·</span>
              <span className="text-neutral-500 font-medium">LIVING HERITAGE & TOPOLOGY</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display text-[#151D1A] leading-[1.05]">
              Where will your story <br />
              <span className="font-editorial italic font-normal text-[#B44A2D]">take you?</span>
            </h2>
            <p className="text-base text-neutral-600 mt-4 leading-relaxed font-light">
              From the emerald waters of Swat and virgin cedar forests of Kalam, to the high passes of Chitral. Every destination is vetted with generational local hosts.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-xs font-mono text-neutral-500">
            <div>5 ACTIVE HIGH MOUNTAIN CORRIDORS</div>
            <button
              onClick={() => {
                const el = document.getElementById('map-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-[#EBF3EF] hover:bg-[#DCEAE3] text-[#0C2B22] font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <span>Explore Topographic Map</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E28413]" />
            </button>
          </div>
        </div>

        {/* Editorial Asymmetrical Layout: 60/40 Featured Marquee + Clean Offset Cards */}
        <div className="space-y-8">
          {/* Card 01: SWAT (Massive 60/40 Split Editorial Hero Card) */}
          {(() => {
            const dest = destinations[0]; // Swat
            return (
              <div
                onClick={() => setActiveModalDest(dest)}
                onMouseEnter={() => onHoverDestination?.(dest.id)}
                onMouseLeave={() => onHoverDestination?.(null)}
                data-cursor="explore"
                className="group relative bg-[#0C2B22] text-white rounded-3xl overflow-hidden shadow-xl cursor-pointer grid grid-cols-1 lg:grid-cols-12 min-h-[460px] border border-neutral-800 transition-all duration-500 hover:shadow-2xl"
              >
                {/* Visual Half (7 cols) with zoom and dark vignette */}
                <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-full overflow-hidden destination-media bg-[#0C2B22]">
                  <img
                    src={dest.heroImage}
                    srcSet={dest.heroImageSrcSet}
                    sizes={dest.heroImageSizes || '(max-width: 1024px) 100vw, 58vw'}
                    alt={dest.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 lg:from-transparent via-transparent to-black/30" />
                </div>

                {/* Editorial Content Half (5 cols) */}
                <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6 relative z-10 bg-[#0C2B22]">
                  <div>
                    <div className="flex items-center justify-between text-xs tracking-widest font-mono text-[#FEF3C7] mb-4">
                      <span>01 / KHYBER PAKHTUNKHWA</span>
                      <span className="font-nastaliq text-base text-[#E28413]">{dest.urduName}</span>
                    </div>

                    <h3 className="text-4xl sm:text-5xl font-black font-display tracking-tight text-white mb-3">
                      SWAT
                    </h3>

                    <p className="text-sm sm:text-base font-editorial italic text-neutral-300 mb-4">
                      "{dest.tagline}"
                    </p>

                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light line-clamp-3">
                      {dest.description}
                    </p>
                  </div>

                  {/* Clean unboxed metadata */}
                  <div className="pt-6 border-t border-white/10 space-y-4">
                    <div className="flex items-center gap-4 text-xs font-mono text-neutral-300">
                      <span>{dest.verifiedProvidersCount} VERIFIED HOSTS</span>
                      <span aria-hidden="true">·</span>
                      <span>{dest.altitude}</span>
                      <span aria-hidden="true">·</span>
                      <span>★ {dest.rating}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono">From</div>
                        <div className="text-sm font-bold text-[#FEF3C7] tabular-nums">
                          PKR {dest.startingPricePKR.toLocaleString()} <span className="text-[11px] font-normal text-neutral-400">/ 3-day story</span>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#E28413] group-hover:text-white transition-colors">
                        <span>Explore Story</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Cards 02, 03, 04, 05: Asymmetrical 2-Column Offset Editorial Pairs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {destinations.slice(1).map((dest, idx) => {
              const itemNumber = `0${idx + 2}`;
              return (
                <div
                  key={dest.id}
                  onClick={() => setActiveModalDest(dest)}
                  onMouseEnter={() => onHoverDestination?.(dest.id)}
                  onMouseLeave={() => onHoverDestination?.(null)}
                  data-cursor="explore"
                  className="group bg-white rounded-3xl overflow-hidden border border-neutral-200/90 shadow-xs hover:shadow-xl hover:border-[#0C2B22]/30 transition-all duration-500 flex flex-col cursor-pointer"
                >
                  {/* Image Frame with crop & zoom */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden destination-media bg-[#0C2B22]/10">
                    <img
                      src={dest.heroImage}
                      srcSet={dest.heroImageSrcSet}
                      sizes={dest.heroImageSizes || '(max-width: 768px) 100vw, 50vw'}
                      alt={dest.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                    {/* Top Floating Eyebrow */}
                    <div className="absolute top-5 left-5 right-5 flex items-center justify-between text-xs text-white">
                      <span className="font-mono text-[11px] tracking-wider bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md">
                        {itemNumber} / {dest.region.toUpperCase()}
                      </span>
                      <span className="font-nastaliq text-base text-[#FEF3C7]">
                        {dest.urduName}
                      </span>
                    </div>

                    {/* Bottom Image Headline */}
                    <div className="absolute bottom-5 left-5 right-5 text-white">
                      <h3 className="text-3xl font-black font-display tracking-tight">
                        {dest.name}
                      </h3>
                      <p className="text-xs font-editorial italic text-neutral-200 mt-0.5">
                        "{dest.tagline}"
                      </p>
                    </div>
                  </div>

                  {/* Card Editorial Footer */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                      {dest.description}
                    </p>

                    {/* Clean unboxed metadata with typographic dots */}
                    <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3 text-neutral-500 font-mono text-[11px]">
                        <span>{dest.altitude}</span>
                        <span aria-hidden="true">·</span>
                        <span>{dest.verifiedProvidersCount} HOSTS</span>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-[#0C2B22] tabular-nums">
                          PKR {dest.startingPricePKR.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
