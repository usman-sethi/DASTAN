import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Star, CheckCircle, MessageSquare, Award, Compass, MapPin } from 'lucide-react';
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
      'Inquiry Sent to Verified Host',
      `Your message has been dispatched to ${selectedProvider.name}. Typical response time is under 15 minutes.`,
      'success'
    );
    setConsultationMessage('');
  };

  return (
    <section className="py-20 bg-[#FAF8F5] border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0F382C] mb-2">
            <ShieldCheck className="w-4 h-4 text-[#0F382C]" />
            <span>The DASTAN Standard of Trust</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#151D1A]">
            Verified people. Generational trust.
          </h2>
          <p className="text-sm text-neutral-600 mt-2 font-light">
            We don’t allow anonymous listings. Every guide, driver, and homestay host undergoes background verification, in-person interviews, and safety inspections.
          </p>
        </div>

        {/* 4 Pillars of Verification */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {[
            { title: 'Identity Verified', desc: 'Government CNIC & biometric verification with NADRA records' },
            { title: 'Location Verified', desc: 'Physical residence & territory inspected by regional field teams' },
            { title: 'Business Verified', desc: 'KPK Tourism Department or regional transport union certifications' },
            { title: 'Community Vetted', desc: 'Real traveler reviews with zero fake rating tolerance' },
          ].map((pillar, i) => (
            <div key={i} className="p-4 bg-white rounded-xl border border-neutral-200/90 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-[#EBF3EF] text-[#0F382C] flex items-center justify-center mb-3">
                <CheckCircle className="w-5 h-5 text-[#0F382C]" />
              </div>
              <h3 className="text-xs font-bold text-neutral-900">{pillar.title}</h3>
              <p className="text-[11px] text-neutral-500 mt-1 leading-snug">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Spotlight Showcase & Provider Selectors */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Provider List Selector (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Featured Verified Custodians
            </div>
            {providers.map((prov) => {
              const isSelected = selectedProvider.id === prov.id;
              return (
                <button
                  key={prov.id}
                  onClick={() => setSelectedProvider(prov)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3.5 ${
                    isSelected
                      ? 'bg-[#0F382C] text-white border-[#0F382C] shadow-md'
                      : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <img
                    src={prov.avatarUrl}
                    alt={prov.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/20 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-sm font-bold truncate">{prov.name}</span>
                      <span className={`text-xs font-semibold flex items-center gap-1 ${isSelected ? 'text-[#FEF3C7]' : 'text-neutral-700'}`}>
                        <Star className="w-3 h-3 text-[#E28413] fill-[#E28413]" />
                        {prov.rating}
                      </span>
                    </div>
                    <div className={`text-xs truncate ${isSelected ? 'text-neutral-200' : 'text-neutral-500'}`}>
                      {prov.role}
                    </div>
                    <div className={`text-[11px] flex items-center gap-1 mt-0.5 ${isSelected ? 'text-white/70' : 'text-neutral-400'}`}>
                      <MapPin className="w-3 h-3 text-[#E28413]" />
                      <span>{prov.destinationName}</span>
                      <span>·</span>
                      <span>{prov.tripsCount} journeys</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Provider Detailed Dossier (8 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-6 pb-6 border-b border-neutral-100">
              <div className="flex items-start gap-4">
                <img
                  src={selectedProvider.avatarUrl}
                  alt={selectedProvider.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-[#0F382C] shadow-sm shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold font-display text-neutral-900">
                      {selectedProvider.name}
                    </h3>
                    <span className="text-xs font-bold text-[#0F382C] bg-[#EBF3EF] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">{selectedProvider.role} · {selectedProvider.destinationName}</p>

                  <div className="flex flex-wrap gap-4 text-xs text-neutral-600 mt-3">
                    <span className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-[#E28413]" />
                      <strong>{selectedProvider.yearsExperience} Years</strong> Experience
                    </span>
                    <span className="flex items-center gap-1">
                      <Compass className="w-4 h-4 text-[#0F382C]" />
                      <strong>{selectedProvider.tripsCount}</strong> Completed Journeys
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-[#E28413] fill-[#E28413]" />
                      <strong>{selectedProvider.rating}</strong> (100% verified reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setContactModalOpen(true)}
                className="px-4 py-2.5 bg-[#0F382C] hover:bg-[#164E3D] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-xs shrink-0"
              >
                <MessageSquare className="w-4 h-4 text-[#E28413]" />
                <span>Contact Host</span>
              </button>
            </div>

            {/* Provider Bio */}
            <div className="py-6 space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                  Biography & Heritage Roots
                </h4>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  {selectedProvider.bio}
                </p>
              </div>

              {/* Languages & Specialties */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-neutral-200">
                  <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1.5">
                    Spoken Languages
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProvider.languages.map((lang, idx) => (
                      <span key={idx} className="bg-white text-neutral-800 px-2.5 py-1 rounded-md text-xs font-semibold border border-neutral-200">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-neutral-200">
                  <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1.5">
                    Core Specialties
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProvider.specialties.map((spec, idx) => (
                      <span key={idx} className="bg-white text-neutral-800 px-2.5 py-1 rounded-md text-xs font-normal border border-neutral-200">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Traveler Review Quote */}
            <div className="p-4 bg-[#EBF3EF] rounded-xl border border-[#D0E4DC] text-xs">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-1.5 font-bold text-[#0F382C]">
                  <span>{selectedProvider.recentReview.author}</span>
                  <span className="font-normal text-neutral-500">({selectedProvider.recentReview.city})</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-neutral-500">
                  <Star className="w-3 h-3 text-[#E28413] fill-[#E28413]" />
                  <span>{selectedProvider.recentReview.date}</span>
                </div>
              </div>
              <p className="text-neutral-700 italic leading-relaxed">
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
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-200"
          >
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <img
                  src={selectedProvider.avatarUrl}
                  alt={selectedProvider.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#0F382C]"
                />
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">Message {selectedProvider.name}</h4>
                  <p className="text-[11px] text-neutral-500">{selectedProvider.role}</p>
                </div>
              </div>
              <button
                onClick={() => setContactModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 p-1 text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendInquiry} className="space-y-4 pt-4">
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  Your Inquiry / Questions about Swat or Kalam:
                </label>
                <textarea
                  rows={4}
                  required
                  value={consultationMessage}
                  onChange={(e) => setConsultationMessage(e.target.value)}
                  placeholder="e.g., Hello Ahmad, my family is visiting in late October. Is the road to Malam Jabba suitable for elderly parents?"
                  className="w-full text-xs p-3 border border-neutral-200 rounded-xl focus:border-[#0F382C] focus:ring-1 focus:ring-[#0F382C] outline-none"
                />
              </div>

              <div className="text-[11px] text-neutral-500 bg-[#FAF8F5] p-2.5 rounded-lg border border-neutral-200">
                🔒 DASTAN Privacy: Host direct WhatsApp and mobile coordination number is shared upon confirmed booking.
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setContactModalOpen(false)}
                  className="px-4 py-2 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0F382C] hover:bg-[#164E3D] text-white rounded-xl text-xs font-bold cursor-pointer"
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
