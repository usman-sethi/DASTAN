import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Award, Compass, MapPin } from 'lucide-react';
import { Provider } from '../types';
import { providers } from '../data/providers';
import { useToast } from './Toast';

export const ProviderVerification: React.FC = () => {
  const { showToast } = useToast();
  const [selectedProvider, setSelectedProvider] = useState<Provider>(providers[0]);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [consultationMessage, setConsultationMessage] = useState('');

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setContactModalOpen(false);
    showToast(
      'Inquiry Dispatched to Host',
      `Message forwarded to ${selectedProvider.name}. Typical response time is under 15 minutes.`,
      'success'
    );
    setConsultationMessage('');
  };

  return (
    <section className="py-24 sm:py-32 bg-[#FAF8F5] border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase font-bold text-[#0C2B22] mb-3">
            <span>03 / THE PEOPLE</span>
            <span aria-hidden="true" className="text-neutral-300">·</span>
            <span className="text-neutral-500 font-medium">VERIFIED LOCAL CUSTODIANS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display text-[#151D1A] leading-[1.05]">
            Verified custodians. <br />
            <span className="font-editorial italic font-normal text-[#144D3C]">Generational trust.</span>
          </h2>
          <p className="text-base text-neutral-600 mt-4 leading-relaxed font-light">
            We do not permit anonymous listings. Every guide, high-mountain driver, and family host undergoes physical background inspection, NADRA verification, and oral heritage interviews.
          </p>
        </div>

        {/* 4 Architectural Pillars of Trust */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              index: '01',
              title: 'Identity Verification',
              desc: 'Biometric NADRA CNIC validation and zero anonymous listing policy across all valleys.'
            },
            {
              index: '02',
              title: 'Physical In-Valley Audit',
              desc: 'Field inspection of family guesthouses, clean sanitation, and local residency roots.'
            },
            {
              index: '03',
              title: 'Union & Alpine Licensing',
              desc: 'High-altitude 4WD certifications and KP Tourism Department authorization.'
            },
            {
              index: '04',
              title: 'Direct Escrow Compensation',
              desc: '86% of journey investment paid directly into host bank and digital accounts.'
            },
          ].map((pillar) => (
            <div key={pillar.index} className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-2xs space-y-2">
              <div className="font-mono text-xs font-bold text-[#E28413]">{pillar.index} // PROTOCOL</div>
              <h3 className="text-sm font-bold text-neutral-900">{pillar.title}</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Spotlight Showcase & Dossiers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Custodian Selector (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Featured Regional Custodians:
            </div>
            {providers.map((prov) => {
              const isSelected = selectedProvider.id === prov.id;
              return (
                <button
                  key={prov.id}
                  onClick={() => setSelectedProvider(prov)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-4 ${
                    isSelected
                      ? 'bg-[#0C2B22] text-white border-[#0C2B22] shadow-md'
                      : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <img
                    src={prov.avatarUrl}
                    alt={prov.name}
                    loading="lazy"
                    decoding="async"
                    className="w-12 h-12 rounded-xl object-cover border border-white/20 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-sm font-bold truncate">{prov.name}</span>
                      <span className={`text-xs font-mono ${isSelected ? 'text-[#FEF3C7]' : 'text-neutral-500'}`}>
                        ★ {prov.rating}
                      </span>
                    </div>
                    <div className={`text-xs truncate ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      {prov.role}
                    </div>
                    <div className={`text-[11px] font-mono mt-0.5 ${isSelected ? 'text-white/70' : 'text-neutral-400'}`}>
                      {prov.destinationName.toUpperCase()} · {prov.tripsCount} TRIPS
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Custodian In-Depth Dossier (8 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200 shadow-xs space-y-8">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-6 pb-6 border-b border-neutral-100">
              <div className="flex items-start gap-5">
                <img
                  src={selectedProvider.avatarUrl}
                  alt={selectedProvider.name}
                  loading="lazy"
                  decoding="async"
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-[#0C2B22] shadow-sm shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl sm:text-3xl font-bold font-display text-neutral-900">
                      {selectedProvider.name}
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-500 font-mono mt-0.5">
                    {selectedProvider.role.toUpperCase()} · {selectedProvider.destinationName.toUpperCase()}
                  </p>

                  <div className="flex flex-wrap gap-4 text-xs text-neutral-600 mt-4 font-mono">
                    <span>{selectedProvider.yearsExperience} YEARS EXP</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedProvider.tripsCount} JOURNEYS</span>
                    <span aria-hidden="true">·</span>
                    <span>★ {selectedProvider.rating} RATING</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setContactModalOpen(true)}
                className="px-5 py-2.5 bg-[#0C2B22] hover:bg-[#144D3C] text-white text-xs uppercase font-bold tracking-wider rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-xs shrink-0"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#E28413]" />
                <span>Contact Custodian</span>
              </button>
            </div>

            {/* Provider Bio */}
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 mb-2">
                  BACKGROUND & HERITAGE
                </h4>
                <p className="text-sm text-neutral-700 leading-relaxed font-light">
                  {selectedProvider.bio}
                </p>
              </div>

              {/* Languages & Specialties */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-neutral-200">
                  <div className="text-[11px] font-mono font-bold text-neutral-500 uppercase tracking-wider mb-2">
                    Languages Spoken
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProvider.languages.map((lang, idx) => (
                      <span key={idx} className="bg-white text-neutral-800 px-2.5 py-1 rounded text-xs font-semibold border border-neutral-200">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-neutral-200">
                  <div className="text-[11px] font-mono font-bold text-neutral-500 uppercase tracking-wider mb-2">
                    Core Disciplines
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProvider.specialties.map((spec, idx) => (
                      <span key={idx} className="bg-white text-neutral-800 px-2.5 py-1 rounded text-xs font-medium border border-neutral-200">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Traveler Attributable Review Quote */}
            <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-neutral-200 text-xs">
              <div className="flex items-center justify-between gap-2 mb-2 font-mono">
                <span className="font-bold text-neutral-900">
                  {selectedProvider.recentReview.author} ({selectedProvider.recentReview.city})
                </span>
                <span className="text-neutral-400">{selectedProvider.recentReview.date}</span>
              </div>
              <p className="text-sm font-editorial italic text-neutral-700 leading-relaxed">
                "{selectedProvider.recentReview.text}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Contact Modal */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-neutral-200"
          >
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div>
                <h4 className="text-base font-bold text-neutral-900">Message {selectedProvider.name}</h4>
                <p className="text-xs text-neutral-500">{selectedProvider.role}</p>
              </div>
              <button
                onClick={() => setContactModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 p-1 text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendInquiry} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="font-bold text-neutral-700 block mb-1">
                  Inquiry / Route questions:
                </label>
                <textarea
                  rows={4}
                  required
                  value={consultationMessage}
                  onChange={(e) => setConsultationMessage(e.target.value)}
                  placeholder="e.g., Hello Ahmad, my family is visiting Swat in late October. Is the road to Malam Jabba suitable for elderly travelers?"
                  className="w-full p-3 border border-neutral-200 rounded-xl focus:border-[#0C2B22] outline-none"
                />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setContactModalOpen(false)}
                  className="px-4 py-2 border border-neutral-200 rounded-xl font-semibold text-neutral-600 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0C2B22] hover:bg-[#144D3C] text-white rounded-xl font-bold uppercase tracking-wider"
                >
                  Send Inquiry
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
};
