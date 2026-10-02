import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShieldCheck, MapPin, Compass, Car, Home, BookOpen, AlertCircle, ArrowRight, Sun, Thermometer } from 'lucide-react';
import { Destination } from '../types';
import { experiences } from '../data/experiences';
import { providers } from '../data/providers';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  onBuildTrip: (destinationId: Destination['id']) => void;
  onSelectExperience: (experienceId: string) => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  onClose,
  onBuildTrip,
  onSelectExperience
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'stay' | 'move' | 'experiences' | 'customs'>('overview');

  if (!destination) return null;

  const destExperiences = experiences.filter(e => e.destinationId === destination.id);
  const destProviders = providers.filter(p => p.destinationId === destination.id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25 }}
          className="relative bg-[#FAF8F5] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border border-neutral-200 flex flex-col"
        >
          {/* Header Image with Scrim */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden shrink-0">
            <img
              src={destination.heroImage}
              alt={destination.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F382C] via-[#0F382C]/50 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Destination Title & Nastaliq */}
            <div className="absolute bottom-5 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#FEF3C7] font-medium mb-1">
                  <span className="font-nastaliq text-base">{destination.urduName}</span>
                  <span>·</span>
                  <span>{destination.region}, {destination.province}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
                  {destination.name}
                </h2>
                <p className="text-sm text-neutral-200 mt-0.5">{destination.tagline}</p>
              </div>

              {/* Action Button inside header */}
              <button
                onClick={() => {
                  onClose();
                  onBuildTrip(destination.id);
                }}
                className="px-5 py-2.5 bg-[#E28413] hover:bg-[#d07409] text-white text-sm font-semibold rounded-xl shadow-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Build my {destination.name.split(' ')[0]} trip</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar: Unboxed metadata */}
          <div className="bg-white border-b border-neutral-200 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-6 text-neutral-600">
              <span className="flex items-center gap-1.5 font-semibold text-neutral-900">
                <Star className="w-4 h-4 text-[#E28413] fill-[#E28413]" />
                <span className="tabular-nums">{destination.rating}</span>
                <span className="font-normal text-neutral-500">({destination.reviewsCount} reviews)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0F382C]" />
                <strong>{destination.verifiedProvidersCount}+</strong> Verified Providers
              </span>
              <span className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#0F382C]" />
                <strong>{destination.experiencesCount}+</strong> Experiences
              </span>
            </div>

            <div className="flex items-center gap-3 text-neutral-600">
              <span className="flex items-center gap-1">
                <Thermometer className="w-4 h-4 text-[#E28413]" />
                <span className="tabular-nums font-semibold">{destination.weatherSummary.tempC}°C</span>
                <span className="text-neutral-500">· {destination.weatherSummary.condition}</span>
              </span>
              <span className="text-neutral-300">|</span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="capitalize">{destination.roadStatus} route</span>
              </span>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="px-6 pt-3 border-b border-neutral-200 flex gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'overview'
                  ? 'border-[#0F382C] text-[#0F382C]'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800'
              }`}
            >
              Overview & Highlights
            </button>
            <button
              onClick={() => setActiveTab('stay')}
              className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'stay'
                  ? 'border-[#0F382C] text-[#0F382C]'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800'
              }`}
            >
              Verified Stays ({destination.stays.length})
            </button>
            <button
              onClick={() => setActiveTab('move')}
              className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'move'
                  ? 'border-[#0F382C] text-[#0F382C]'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800'
              }`}
            >
              Move & 4x4 Drivers ({destination.movementOptions.length})
            </button>
            <button
              onClick={() => setActiveTab('experiences')}
              className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'experiences'
                  ? 'border-[#0F382C] text-[#0F382C]'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800'
              }`}
            >
              Local Experiences ({destExperiences.length})
            </button>
            <button
              onClick={() => setActiveTab('customs')}
              className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'customs'
                  ? 'border-[#0F382C] text-[#0F382C]'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800'
              }`}
            >
              Culture & Local Customs
            </button>
          </div>

          {/* Tab Content Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    The Story of {destination.name}
                  </h3>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    {destination.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                    Curated Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {destination.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 bg-white rounded-xl border border-neutral-200 text-xs text-neutral-800 flex items-start gap-2.5"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#EBF3EF] text-[#0F382C] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-snug">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practical Details Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-200">
                  <div className="p-3 bg-white rounded-xl border border-neutral-200">
                    <div className="text-[11px] text-neutral-500 uppercase tracking-wide">Best Season</div>
                    <div className="text-xs font-semibold text-neutral-900 mt-0.5">{destination.bestSeason}</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-neutral-200">
                    <div className="text-[11px] text-neutral-500 uppercase tracking-wide">Altitude</div>
                    <div className="text-xs font-semibold text-neutral-900 mt-0.5 tabular-nums">{destination.altitude}</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-neutral-200">
                    <div className="text-[11px] text-neutral-500 uppercase tracking-wide">Road Highway Status</div>
                    <div className="text-xs font-semibold text-neutral-900 mt-0.5">{destination.roadNote}</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'stay' && (
              <div className="space-y-4">
                <p className="text-xs text-neutral-500">
                  Every stay listed on DASTAN is personally inspected for safety, warmth, clean hygiene, and authentic architectural character.
                </p>
                <div className="space-y-3">
                  {destination.stays.map((stay) => (
                    <div
                      key={stay.id}
                      className="p-4 bg-white rounded-xl border border-neutral-200 hover:border-[#0F382C]/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-neutral-900">{stay.name}</h4>
                          {stay.verified && (
                            <span className="text-[11px] font-semibold text-[#0F382C] flex items-center gap-1">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              Verified
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-neutral-500 flex items-center gap-2">
                          <span>{stay.type}</span>
                          <span>·</span>
                          <span>{stay.location}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-neutral-600">
                          {stay.features.map((feat, i) => (
                            <span key={i} className="text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded text-[11px]">
                              {feat}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="sm:text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0">
                        <div className="text-xs text-neutral-400">Starting from</div>
                        <div className="text-sm font-bold text-[#0F382C] tabular-nums">
                          PKR {stay.pricePerNight.toLocaleString()} <span className="text-xs font-normal text-neutral-500">/ night</span>
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-0.5 flex sm:justify-end items-center gap-1">
                          <Star className="w-3 h-3 text-[#E28413] fill-[#E28413]" />
                          <span>{stay.rating} ({stay.reviewsCount})</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'move' && (
              <div className="space-y-4">
                <p className="text-xs text-neutral-500">
                  Verified mountain drivers possess high-altitude licenses, 4WD experience, and deep familiarity with mountain road conditions.
                </p>
                <div className="space-y-3">
                  {destination.movementOptions.map((opt) => (
                    <div
                      key={opt.id}
                      className="p-4 bg-white rounded-xl border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Car className="w-4 h-4 text-[#0F382C]" />
                          <h4 className="text-sm font-bold text-neutral-900">{opt.type}</h4>
                        </div>
                        <div className="text-xs text-neutral-600">
                          Provider: <strong>{opt.providerName}</strong>
                        </div>
                        <div className="text-xs text-neutral-500">
                          Vehicle: {opt.vehicleModel}
                        </div>
                      </div>
                      <div className="sm:text-right shrink-0">
                        <div className="text-sm font-bold text-[#0F382C] tabular-nums">
                          PKR {opt.dailyRatePKR.toLocaleString()} <span className="text-xs font-normal text-neutral-500">/ day</span>
                        </div>
                        <div className="text-[11px] text-emerald-700 font-semibold flex items-center sm:justify-end gap-1 mt-0.5">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Fuel & Driver Included</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'experiences' && (
              <div className="space-y-3">
                {destExperiences.length === 0 ? (
                  <p className="text-xs text-neutral-500">No experiences listed yet for this region.</p>
                ) : (
                  destExperiences.map((exp) => (
                    <div
                      key={exp.id}
                      className="p-4 bg-white rounded-xl border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#0F382C]/50 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="text-[11px] font-semibold text-[#E28413] uppercase tracking-wider">
                          {exp.categoryLabel}
                        </div>
                        <h4 className="text-sm font-bold text-neutral-900">{exp.title}</h4>
                        <p className="text-xs text-neutral-600 line-clamp-2 max-w-xl">{exp.shortDesc}</p>
                        <div className="text-xs text-neutral-500 pt-1">
                          Hosted by <strong>{exp.hostName}</strong> ({exp.hostRole})
                        </div>
                      </div>
                      <div className="sm:text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                        <div className="text-sm font-bold text-[#0F382C] tabular-nums">
                          PKR {exp.pricePKR.toLocaleString()}
                        </div>
                        <button
                          onClick={() => {
                            onClose();
                            onSelectExperience(exp.id);
                          }}
                          className="px-3 py-1.5 bg-[#0F382C] hover:bg-[#164E3D] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'customs' && (
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-neutral-900">
                  Cultural Norms in {destination.name}
                </h4>
                <div className="space-y-2.5">
                  {destination.culturalCustoms.map((custom, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-white rounded-xl border border-neutral-200 text-xs text-neutral-700 flex items-start gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#FEF3C7] text-[#92400E] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        ✓
                      </span>
                      <p className="leading-relaxed">{custom}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Bottom Sticky Footer */}
          <div className="p-4 bg-white border-t border-neutral-200 flex items-center justify-between gap-4">
            <div className="text-xs text-neutral-500">
              Starting from <strong className="text-neutral-900 font-semibold tabular-nums">PKR {destination.startingPricePKR.toLocaleString()}</strong> for curated 3-day itinerary
            </div>
            <button
              onClick={() => {
                onClose();
                onBuildTrip(destination.id);
              }}
              className="px-5 py-2.5 bg-[#0F382C] hover:bg-[#164E3D] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Build My {destination.name.split(' ')[0]} Trip</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E28413]" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
